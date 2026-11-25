/**
 * Pro Bundle (OpenClaw Skill Safety Kit) fulfilment, shared by the Pages Functions in
 * functions/api/pro-bundle/. Runs on Cloudflare Workers (fetch + WebCrypto, no Node APIs).
 *
 * Flow: Stripe Payment Link -> /pro-bundle/success/?session_id=cs_... -> /api/pro-bundle/download
 * verifies the Checkout Session with Stripe (complete, paid, our price, not refunded) and only
 * then decrypts the kit (AES-256-GCM; the ciphertext is a public static asset, the key is a
 * Pages secret) and streams it.
 *
 * Required Pages env (per environment; preview uses Stripe test mode):
 *   STRIPE_SECRET_KEY       restricted key: read Checkout Sessions, PaymentIntents, Charges
 *   PRO_BUNDLE_PRICE_ID     price_... that a session must contain
 *   PRO_BUNDLE_PAYMENT_LINK https://buy.stripe.com/... (the buy button redirects here)
 *   PRO_BUNDLE_KEY          base64 of the 32-byte AES key used by scripts/encrypt-pro-bundle.mjs
 */

export interface ProBundleEnv {
  STRIPE_SECRET_KEY?: string;
  PRO_BUNDLE_PRICE_ID?: string;
  PRO_BUNDLE_PAYMENT_LINK?: string;
  PRO_BUNDLE_KEY?: string;
  ASSETS?: { fetch: (input: Request | string | URL) => Promise<Response> };
}

export const KIT_ASSET_PATH = "/pro-bundle-assets/openclaw-skill-safety-kit.enc";
export const KIT_FILENAME = "openclaw-skill-safety-kit.zip";
const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

export type Verdict =
  | { ok: true; sessionId: string; email: string | null; created: number; livemode: boolean }
  | { ok: false; status: number; reason: string };

export const isSessionId = (s: unknown): s is string => typeof s === "string" && SESSION_RE.test(s);

export function maskEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const [user, domain] = email.split("@");
  if (!domain) return null;
  return `${user.slice(0, 2)}${"•".repeat(Math.max(1, Math.min(6, user.length - 2)))}@${domain}`;
}

type Fetch = typeof fetch;

async function stripeGet(env: ProBundleEnv, path: string, params: [string, string][], fetchImpl: Fetch) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetchImpl(`https://api.stripe.com/v1/${path}${qs ? `?${qs}` : ""}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  return { status: res.status, body };
}

interface StripeSession {
  id: string;
  status?: string;
  payment_status?: string;
  created?: number;
  livemode?: boolean;
  customer_details?: { email?: string | null } | null;
  line_items?: { data?: { price?: { id?: string } | null }[] };
  payment_intent?: {
    latest_charge?: { refunded?: boolean; amount?: number; amount_refunded?: number; payment_method_details?: { card?: { last4?: string } } } | null;
  } | string | null;
}

/** Is this session a completed, paid, unrefunded purchase of our price? */
export function judgeSession(s: StripeSession, priceId: string): Verdict {
  if (s.status !== "complete" || s.payment_status !== "paid") return { ok: false, status: 402, reason: "This checkout has not been paid." };
  const prices = (s.line_items?.data || []).map((li) => li.price?.id);
  if (!prices.includes(priceId)) return { ok: false, status: 403, reason: "This checkout was not for the Pro Bundle." };
  const charge = typeof s.payment_intent === "object" ? s.payment_intent?.latest_charge : null;
  if (charge && (charge.refunded || (charge.amount && charge.amount_refunded && charge.amount_refunded >= charge.amount))) {
    return { ok: false, status: 410, reason: "This purchase was refunded." };
  }
  return { ok: true, sessionId: s.id, email: s.customer_details?.email ?? null, created: s.created ?? 0, livemode: !!s.livemode };
}

export function configured(env: ProBundleEnv): boolean {
  return !!(env.STRIPE_SECRET_KEY && env.PRO_BUNDLE_PRICE_ID);
}

/** Selling is on only when payment, verification and delivery are all configured. */
export function checkoutAvailable(env: ProBundleEnv): boolean {
  return configured(env) && !!env.PRO_BUNDLE_KEY && /^https:\/\/buy\.stripe\.com\//.test(env.PRO_BUNDLE_PAYMENT_LINK || "");
}

export async function verifySession(env: ProBundleEnv, sessionId: string, fetchImpl: Fetch = fetch): Promise<Verdict> {
  if (!configured(env)) return { ok: false, status: 503, reason: "Downloads are not configured yet." };
  if (!isSessionId(sessionId)) return { ok: false, status: 400, reason: "Invalid order reference." };
  const r = await stripeGet(env, `checkout/sessions/${sessionId}`, [["expand[]", "line_items"], ["expand[]", "payment_intent.latest_charge"]], fetchImpl);
  if (r.status === 404) return { ok: false, status: 404, reason: "Order not found." };
  if (r.status !== 200 || !r.body) return { ok: false, status: 502, reason: "Could not reach the payment provider. Try again in a minute." };
  return judgeSession(r.body as unknown as StripeSession, env.PRO_BUNDLE_PRICE_ID!);
}

/** Restore: find a paid session for this email whose card ends in last4. */
export async function findSessionByEmail(env: ProBundleEnv, email: string, last4: string, fetchImpl: Fetch = fetch): Promise<Verdict> {
  if (!configured(env)) return { ok: false, status: 503, reason: "Restore is not configured yet." };
  const cleanEmail = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 254 || !/^\d{4}$/.test(last4)) {
    return { ok: false, status: 400, reason: "Enter the email you paid with and the last 4 digits of the card." };
  }
  const variants = Array.from(new Set([cleanEmail, cleanEmail.toLowerCase()]));
  for (const e of variants) {
    const r = await stripeGet(env, "checkout/sessions", [
      ["customer_details[email]", e], ["status", "complete"], ["limit", "20"],
      ["expand[]", "data.line_items"], ["expand[]", "data.payment_intent.latest_charge"],
    ], fetchImpl);
    if (r.status !== 200 || !r.body) return { ok: false, status: 502, reason: "Could not reach the payment provider. Try again in a minute." };
    const sessions = ((r.body as { data?: StripeSession[] }).data || []);
    for (const s of sessions) {
      const v = judgeSession(s, env.PRO_BUNDLE_PRICE_ID!);
      const card = typeof s.payment_intent === "object" ? s.payment_intent?.latest_charge?.payment_method_details?.card?.last4 : undefined;
      if (v.ok && card === last4) return v;
    }
  }
  return { ok: false, status: 404, reason: "No paid order matches that email and card. Check both, or reply to your Stripe receipt." };
}

function b64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64.trim());
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Ciphertext layout: 12-byte IV || AES-GCM ciphertext+tag. */
export async function decryptKit(encrypted: ArrayBuffer, keyB64: string): Promise<ArrayBuffer> {
  const raw = b64ToBytes(keyB64);
  if (raw.length !== 32) throw new Error("PRO_BUNDLE_KEY must be 32 bytes (base64).");
  const key = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["decrypt"]);
  const bytes = new Uint8Array(encrypted);
  return crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes.slice(0, 12) }, key, bytes.slice(12));
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" },
  });
