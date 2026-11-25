// POST /api/pro-bundle/restore { email, last4 } -> { ok, session_id } so a buyer can download again.
import { findSessionByEmail, json, type ProBundleEnv } from "../../../src/server/proBundle";

export const onRequestPost = async ({ env, request }: { env: ProBundleEnv; request: Request }) => {
  let body: { email?: unknown; last4?: unknown } = {};
  try { body = await request.json(); } catch { /* handled below */ }
  const v = await findSessionByEmail(env, String(body.email ?? ""), String(body.last4 ?? ""));
  if (!v.ok) return json({ ok: false, reason: v.reason }, v.status);
  return json({ ok: true, session_id: v.sessionId });
};
