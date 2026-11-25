import { describe, expect, it } from "vitest";
import { checkoutAvailable, decryptKit, findSessionByEmail, isSessionId, judgeSession, maskEmail, verifySession } from "./proBundle";

const PRICE = "price_test_123";
const env = { STRIPE_SECRET_KEY: "rk_test_x", PRO_BUNDLE_PRICE_ID: PRICE };
const paid = (over: Record<string, unknown> = {}) => ({
  id: "cs_test_abcdefghijklmnop",
  status: "complete",
  payment_status: "paid",
  created: 1795600000,
  livemode: false,
  customer_details: { email: "buyer@example.com" },
  line_items: { data: [{ price: { id: PRICE } }] },
  payment_intent: { latest_charge: { refunded: false, amount: 799, amount_refunded: 0, payment_method_details: { card: { last4: "4242" } } } },
  ...over,
});
const fakeFetch = (status: number, body: unknown) =>
  (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

describe("judgeSession", () => {
  it("accepts a paid session for our price", () => {
    expect(judgeSession(paid(), PRICE)).toMatchObject({ ok: true, email: "buyer@example.com" });
  });
  it("rejects unpaid, other products and refunds", () => {
    expect(judgeSession(paid({ payment_status: "unpaid" }), PRICE)).toMatchObject({ ok: false, status: 402 });
    expect(judgeSession(paid({ status: "open" }), PRICE)).toMatchObject({ ok: false, status: 402 });
    expect(judgeSession(paid({ line_items: { data: [{ price: { id: "price_other" } }] } }), PRICE)).toMatchObject({ ok: false, status: 403 });
    expect(judgeSession(paid({ payment_intent: { latest_charge: { refunded: true } } }), PRICE)).toMatchObject({ ok: false, status: 410 });
    expect(judgeSession(paid({ payment_intent: { latest_charge: { amount: 799, amount_refunded: 799 } } }), PRICE)).toMatchObject({ ok: false, status: 410 });
  });
});

describe("verifySession", () => {
  it("refuses when not configured or the id is malformed, without calling Stripe", async () => {
    const boom = (async () => { throw new Error("should not fetch"); }) as unknown as typeof fetch;
    expect(await verifySession({}, "cs_test_abcdefghijklmnop", boom)).toMatchObject({ ok: false, status: 503 });
    expect(await verifySession(env, "cs_test_../../x", boom)).toMatchObject({ ok: false, status: 400 });
    expect(isSessionId("pi_123")).toBe(false);
  });
  it("maps Stripe responses", async () => {
    expect(await verifySession(env, "cs_test_abcdefghijklmnop", fakeFetch(200, paid()))).toMatchObject({ ok: true });
    expect(await verifySession(env, "cs_test_abcdefghijklmnop", fakeFetch(404, { error: {} }))).toMatchObject({ ok: false, status: 404 });
    expect(await verifySession(env, "cs_test_abcdefghijklmnop", fakeFetch(500, {}))).toMatchObject({ ok: false, status: 502 });
  });
});

describe("findSessionByEmail", () => {
  it("needs the right last 4 digits", async () => {
    const list = fakeFetch(200, { data: [paid()] });
    expect(await findSessionByEmail(env, "buyer@example.com", "4242", list)).toMatchObject({ ok: true, sessionId: "cs_test_abcdefghijklmnop" });
    expect(await findSessionByEmail(env, "buyer@example.com", "1111", list)).toMatchObject({ ok: false, status: 404 });
    expect(await findSessionByEmail(env, "not-an-email", "4242", list)).toMatchObject({ ok: false, status: 400 });
  });
});

describe("decryptKit", () => {
  it("round-trips AES-256-GCM with the 12-byte IV prefix", async () => {
    const keyBytes = crypto.getRandomValues(new Uint8Array(32));
    const key = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plain = new TextEncoder().encode("PK fake zip bytes");
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));
    const blob = new Uint8Array(12 + ct.length); blob.set(iv); blob.set(ct, 12);
    const b64 = btoa(String.fromCharCode(...keyBytes));
    expect(new TextDecoder().decode(await decryptKit(blob.buffer, b64))).toBe("PK fake zip bytes");
    const wrong = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    await expect(decryptKit(blob.buffer, wrong)).rejects.toBeTruthy();
  });
});

it("masks emails", () => {
  expect(maskEmail("buyer@example.com")).toBe("bu•••@example.com");
  expect(maskEmail(null)).toBeNull();
});

describe("checkoutAvailable", () => {
  const full = { ...env, PRO_BUNDLE_KEY: "k", PRO_BUNDLE_PAYMENT_LINK: "https://buy.stripe.com/test_abc" };
  it("needs Stripe, the price, the kit key and a Stripe payment link", () => {
    expect(checkoutAvailable(full)).toBe(true);
    expect(checkoutAvailable({ ...full, PRO_BUNDLE_KEY: undefined })).toBe(false);
    expect(checkoutAvailable({ ...full, STRIPE_SECRET_KEY: undefined })).toBe(false);
    expect(checkoutAvailable({ ...full, PRO_BUNDLE_PAYMENT_LINK: "https://evil.example/pay" })).toBe(false);
  });
});
