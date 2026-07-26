const SITE = "https://openclaw-skillshub.com";
const SENDER = { name: "OpenClaw Skills Hub", email: "hello@openclaw-skillshub.com" };
const LIST_ID = 9;
const VERSION = "2026-07-26.1";

const sequence = [
  {
    step: 0,
    delayDays: 0,
    subject: "Welcome to OpenClaw Skills Hub — start here",
    heading: "Welcome to OpenClaw Skills Hub",
    intro: "Your subscription is confirmed. Here is the fastest way to start finding useful, security-reviewed OpenClaw skills.",
    bullets: [
      "Browse skills by category and use case.",
      "Check the Trust Score and security notes before installing.",
      "Copy the install command only after reviewing the skill page."
    ],
    cta: "Browse the skills directory",
    url: `${SITE}/skills`
  },
  {
    step: 1,
    delayDays: 2,
    subject: "How to evaluate an OpenClaw skill before installing it",
    heading: "A safer 3-minute skill check",
    intro: "Before adding a skill to your agent, verify what it can access and what it will execute.",
    bullets: [
      "Review requested permissions, shell commands, and external endpoints.",
      "Prefer skills with clear documentation, scoped access, and reversible setup.",
      "Treat unknown scripts and broad credentials as high risk until reviewed."
    ],
    cta: "Read the security guide",
    url: `${SITE}/articles/openclaw-skill-security-checklist`
  },
  {
    step: 2,
    delayDays: 5,
    subject: "Build a useful OpenClaw workflow without tool sprawl",
    heading: "Start with one outcome, not ten tools",
    intro: "A small, well-defined workflow is easier to verify, maintain, and improve than a large pile of overlapping skills.",
    bullets: [
      "Choose one repeated task with a measurable result.",
      "Install the smallest set of skills needed for that task.",
      "Test failure handling and review outputs before automating it."
    ],
    cta: "Explore practical tutorials",
    url: `${SITE}/tutorials`
  },
  {
    step: 3,
    delayDays: 7,
    subject: "Your OpenClaw Skills Hub quick-reference",
    heading: "Keep these resources handy",
    intro: "You now have the core directory, security checklist, and tutorials needed to choose skills deliberately.",
    bullets: [
      "Use directory filters to narrow by real use case.",
      "Recheck security notes when a skill changes.",
      "Remove skills you no longer use to reduce attack surface."
    ],
    cta: "Return to OpenClaw Skills Hub",
    url: SITE
  }
];

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra }
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

async function hash(value) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map(x => x.toString(16).padStart(2, "0")).join("");
}

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 ? email : null;
}

function token() {
  return crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
}

function store(env) {
  const id = env.SUBSCRIBER_STORE.idFromName("openclaw-email");
  const stub = env.SUBSCRIBER_STORE.get(id);
  return {
    async get(key, type) {
      const response = await stub.fetch(`https://store/get?key=${encodeURIComponent(key)}`);
      const data = await response.json();
      if (!data.found) return null;
      return type === "json" ? JSON.parse(data.value) : data.value;
    },
    async put(key, value, options = {}) {
      const response = await stub.fetch("https://store/put", {
        method: "POST",
        body: JSON.stringify({ key, value, expirationTtl: options.expirationTtl || null })
      });
      if (!response.ok) throw new Error("Subscriber store put failed");
    },
    async delete(key) {
      const response = await stub.fetch(`https://store/delete?key=${encodeURIComponent(key)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Subscriber store delete failed");
    },
    async list({ prefix }) {
      const response = await stub.fetch(`https://store/list?prefix=${encodeURIComponent(prefix || "")}`);
      if (!response.ok) throw new Error("Subscriber store list failed");
      const data = await response.json();
      return { keys: data.keys.map(name => ({ name })), list_complete: true };
    }
  };
}

export class SubscriberStore {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/get") {
      const key = url.searchParams.get("key");
      if (!key) return json({ error: "Missing key" }, 400);
      const item = await this.ctx.storage.get(key);
      if (!item) return json({ found: false });
      if (item.expiresAt && item.expiresAt <= Date.now()) {
        await this.ctx.storage.delete(key);
        return json({ found: false });
      }
      return json({ found: true, value: item.value });
    }
    if (request.method === "POST" && url.pathname === "/put") {
      const { key, value, expirationTtl } = await request.json();
      if (!key || typeof value !== "string") return json({ error: "Invalid store item" }, 400);
      const expiresAt = expirationTtl ? Date.now() + Number(expirationTtl) * 1000 : null;
      await this.ctx.storage.put(key, { value, expiresAt });
      return json({ ok: true });
    }
    if (request.method === "DELETE" && url.pathname === "/delete") {
      const key = url.searchParams.get("key");
      if (!key) return json({ error: "Missing key" }, 400);
      await this.ctx.storage.delete(key);
      return json({ ok: true });
    }
    if (request.method === "GET" && url.pathname === "/list") {
      const prefix = url.searchParams.get("prefix") || "";
      const entries = await this.ctx.storage.list({ prefix });
      const keys = [];
      for (const [key, item] of entries) {
        if (item.expiresAt && item.expiresAt <= Date.now()) await this.ctx.storage.delete(key);
        else keys.push(key);
      }
      return json({ keys });
    }
    return json({ error: "Not found" }, 404);
  }
}

function emailHtml(item, unsubscribeUrl) {
  const bullets = item.bullets.map(x => `<li style="margin:0 0 10px;line-height:1.6">${escapeHtml(x)}</li>`).join("");
  return `<!doctype html><html lang="en"><body style="margin:0;background:#f3f6fa;font-family:Arial,sans-serif;color:#172033"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="padding:28px 34px;background:#0b1220;color:#fff"><div style="font-size:13px;color:#67e8f9;font-weight:700">OPENCLAW SKILLS HUB</div><h1 style="font-size:24px;line-height:1.3;margin:8px 0 0">${escapeHtml(item.heading)}</h1></td></tr><tr><td style="padding:32px 34px"><p style="font-size:16px;line-height:1.7;margin:0 0 22px">${escapeHtml(item.intro)}</p><ul style="padding-left:22px;margin:0 0 26px">${bullets}</ul><a href="${item.url}" style="display:inline-block;background:#0891b2;color:#fff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:8px">${escapeHtml(item.cta)}</a></td></tr><tr><td style="padding:22px 34px;background:#eef2f7;color:#667085;font-size:12px;line-height:1.6">You received this because you confirmed a subscription at OpenClaw Skills Hub.<br><a href="${unsubscribeUrl}" style="color:#475467">Unsubscribe</a> · <a href="${SITE}/privacy/" style="color:#475467">Privacy</a></td></tr></table></td></tr></table></body></html>`;
}

function emailText(item, unsubscribeUrl) {
  return `${item.heading}\n\n${item.intro}\n\n${item.bullets.map(x => `- ${x}`).join("\n")}\n\n${item.cta}: ${item.url}\n\nUnsubscribe: ${unsubscribeUrl}\nPrivacy: ${SITE}/privacy/`;
}

function enforceBrevoIsolation(path, options) {
  const method = String(options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  if (path === "/smtp/email" && method === "POST") {
    if (body.sender?.email !== SENDER.email) throw new Error("Blocked non-OpenClaw sender");
    return;
  }
  if (path === "/contacts" && method === "POST") {
    if (JSON.stringify(body.listIds) !== JSON.stringify([LIST_ID]) || body.updateEnabled !== true) {
      throw new Error("Blocked non-OpenClaw contact mutation");
    }
    return;
  }
  if (path.startsWith("/contacts/") && method === "PUT") {
    if (JSON.stringify(body) !== JSON.stringify({ unlinkListIds: [LIST_ID] })) {
      throw new Error("Blocked cross-list contact mutation");
    }
    return;
  }
  throw new Error(`Blocked Brevo operation: ${method} ${path}`);
}

async function brevo(env, path, options = {}) {
  enforceBrevoIsolation(path, options);
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    ...options,
    headers: { "api-key": env.BREVO_API_KEY, "content-type": "application/json", accept: "application/json", ...(options.headers || {}) }
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Brevo ${path} returned ${response.status}: ${body.slice(0, 160)}`);
  return body ? JSON.parse(body) : {};
}

async function upsertContact(env, email, active) {
  if (active) {
    await brevo(env, "/contacts", {
      method: "POST",
      body: JSON.stringify({ email, listIds: [LIST_ID], updateEnabled: true })
    });
  } else {
    await brevo(env, `/contacts/${encodeURIComponent(email)}`, {
      method: "PUT",
      body: JSON.stringify({ unlinkListIds: [LIST_ID] })
    }).catch(() => null);
  }
}

async function sendMessage(env, subscriber, item) {
  const unsubscribeUrl = `${SITE}/api/email/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribeToken)}`;
  return brevo(env, "/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: subscriber.email }],
      subject: item.subject,
      htmlContent: emailHtml(item, unsubscribeUrl),
      textContent: emailText(item, unsubscribeUrl),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Campaign": `openclaw-onboarding-${item.step}`
      },
      tags: ["openclaw-onboarding", `step-${item.step}`]
    })
  });
}

async function sendConfirmation(env, subscriber) {
  const confirmUrl = `${SITE}/api/email/confirm?token=${encodeURIComponent(subscriber.confirmToken)}`;
  const html = `<!doctype html><html lang="en"><body style="margin:0;background:#f3f6fa;font-family:Arial,sans-serif;color:#172033"><table role="presentation" width="100%"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" style="max-width:600px;background:#fff;border-radius:14px"><tr><td style="padding:30px 34px;background:#0b1220;color:#fff"><h1 style="margin:0;font-size:24px">Confirm your subscription</h1></td></tr><tr><td style="padding:34px"><p style="font-size:16px;line-height:1.7">Confirm that you want to receive the OpenClaw Skills Hub onboarding series.</p><a href="${confirmUrl}" style="display:inline-block;background:#0891b2;color:#fff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:8px">Confirm subscription</a><p style="margin-top:24px;color:#667085;font-size:13px">If you did not request this, ignore this email. You will not be subscribed.</p></td></tr></table></td></tr></table></body></html>`;
  return brevo(env, "/smtp/email", {
    method: "POST",
    body: JSON.stringify({ sender: SENDER, to: [{ email: subscriber.email }], subject: "Confirm your OpenClaw Skills Hub subscription", htmlContent: html, textContent: `Confirm your subscription: ${confirmUrl}\n\nIf you did not request this, ignore this email.`, tags: ["openclaw-confirmation"] })
  });
}

async function subscribe(request, env) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const rateKey = `rate:${await hash(ip)}`;
  const used = Number((await store(env).get(rateKey)) || 0);
  if (used >= 5) return json({ error: "Too many requests. Please try again later." }, 429);
  await store(env).put(rateKey, String(used + 1), { expirationTtl: 3600 });

  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  if (body.website) return json({ message: "Check your inbox to confirm." });
  const email = normalizeEmail(body.email);
  if (!email) return json({ error: "Valid email required" }, 400);
  const id = await hash(email);
  const key = `sub:${id}`;
  const existing = await store(env).get(key, "json");
  if (existing?.status === "confirmed") return json({ message: "You're already subscribed." });

  const subscriber = {
    id, email, status: "pending", confirmToken: token(), unsubscribeToken: existing?.unsubscribeToken || token(),
    sourcePage: String(body.source_page || "/").slice(0, 300),
    utmSource: String(body.utm_source || "website").slice(0, 100),
    utmMedium: String(body.utm_medium || "newsletter").slice(0, 100),
    utmCampaign: String(body.utm_campaign || "openclaw-onboarding").slice(0, 100),
    createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString(), sequenceStep: 0
  };
  await store(env).put(key, JSON.stringify(subscriber));
  await store(env).put(`confirm:${subscriber.confirmToken}`, id, { expirationTtl: 7 * 86400 });
  await store(env).put(`unsub:${subscriber.unsubscribeToken}`, id);
  try {
    await sendConfirmation(env, subscriber);
    subscriber.confirmationSentAt = new Date().toISOString();
    await store(env).put(key, JSON.stringify(subscriber));
  } catch (error) {
    console.error("confirmation_send_failed", error.message);
    return json({ error: "We could not send the confirmation email. Please try again later." }, 502);
  }
  return json({ message: "Check your inbox to confirm your subscription." });
}

async function confirm(request, env) {
  const value = new URL(request.url).searchParams.get("token");
  if (!value) return new Response("Missing token", { status: 400 });
  const id = await store(env).get(`confirm:${value}`);
  if (!id) return new Response("Invalid or expired token", { status: 404 });
  const key = `sub:${id}`;
  const subscriber = await store(env).get(key, "json");
  if (!subscriber) return new Response("Subscriber not found", { status: 404 });
  if (subscriber.status === "unsubscribed") return Response.redirect(`${SITE}/?unsubscribed=already`, 302);
  subscriber.status = "confirmed";
  subscriber.confirmedAt ||= new Date().toISOString();
  subscriber.updatedAt = new Date().toISOString();
  subscriber.nextDueAt ||= subscriber.confirmedAt;
  await store(env).put(key, JSON.stringify(subscriber));
  await upsertContact(env, subscriber.email, true);
  await processSubscriber(env, key, subscriber);
  await store(env).delete(`confirm:${value}`);
  return Response.redirect(`${SITE}/?confirmed=true`, 302);
}

async function unsubscribe(request, env) {
  const value = new URL(request.url).searchParams.get("token");
  if (!value) return new Response("Missing token", { status: 400 });
  const id = await store(env).get(`unsub:${value}`);
  if (!id) return new Response("Invalid token", { status: 404 });
  const key = `sub:${id}`;
  const subscriber = await store(env).get(key, "json");
  if (subscriber) {
    subscriber.status = "unsubscribed";
    subscriber.unsubscribedAt = new Date().toISOString();
    subscriber.updatedAt = subscriber.unsubscribedAt;
    await store(env).put(key, JSON.stringify(subscriber));
    await upsertContact(env, subscriber.email, false);
  }
  return Response.redirect(`${SITE}/?unsubscribed=true`, 302);
}

async function processSubscriber(env, key, subscriber) {
  if (subscriber.status !== "confirmed") return false;
  const step = Number(subscriber.sequenceStep || 0);
  const item = sequence[step];
  if (!item) return false;
  const due = new Date(subscriber.nextDueAt || subscriber.confirmedAt).getTime();
  if (!Number.isFinite(due) || due > Date.now()) return false;
  const leaseKey = `lease:${subscriber.id}:${step}`;
  if (await store(env).get(leaseKey)) return false;
  await store(env).put(leaseKey, "1", { expirationTtl: 600 });
  try {
    const result = await sendMessage(env, subscriber, item);
    subscriber.lastMessageId = result.messageId || null;
    subscriber.lastSentAt = new Date().toISOString();
    subscriber.sequenceStep = step + 1;
    const next = sequence[step + 1];
    subscriber.nextDueAt = next ? new Date(new Date(subscriber.confirmedAt).getTime() + next.delayDays * 86400000).toISOString() : null;
    subscriber.sequenceComplete = !next;
    await store(env).put(key, JSON.stringify(subscriber));
    return true;
  } finally {
    await store(env).delete(leaseKey);
  }
}

async function runSequence(env) {
  let cursor;
  let processed = 0;
  do {
    const page = await store(env).list({ prefix: "sub:", cursor, limit: 100 });
    for (const item of page.keys) {
      const subscriber = await store(env).get(item.name, "json");
      try { if (subscriber && await processSubscriber(env, item.name, subscriber)) processed++; }
      catch (error) { console.error("sequence_send_failed", item.name.slice(0, 12), error.message); }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return processed;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/api\/email/, "");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "access-control-allow-origin": SITE, "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type" } });
    if (request.method === "GET" && path === "/health") return json({ ok: true, service: "openclaw-email", version: VERSION });
    if (request.method === "POST" && path === "/subscribe") return subscribe(request, env);
    if (request.method === "GET" && path === "/confirm") return confirm(request, env);
    if ((request.method === "GET" || request.method === "POST") && path === "/unsubscribe") return unsubscribe(request, env);
    return json({ error: "Not found" }, 404);
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runSequence(env));
  }
};
