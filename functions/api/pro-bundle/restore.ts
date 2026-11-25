// POST /api/pro-bundle/restore { email, last4 } -> { ok, session_id }. "last4" holds the card's last 4 digits OR the Stripe receipt number.
import { findSessionByEmail, json, type ProBundleEnv } from "../../../src/server/proBundle";

export const onRequestPost = async ({ env, request }: { env: ProBundleEnv; request: Request }) => {
  let body: { email?: unknown; last4?: unknown } = {};
  try { body = await request.json(); } catch { /* handled below */ }
  const v = await findSessionByEmail(env, String(body.email ?? ""), String(body.last4 ?? ""));
  if (!v.ok) return json({ ok: false, reason: v.reason }, v.status);
  return json({ ok: true, session_id: v.sessionId });
};
