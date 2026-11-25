// GET /api/pro-bundle/verify?session_id=cs_... -> { ok, email (masked) } for the success page.
import { json, maskEmail, verifySession, type ProBundleEnv } from "../../../src/server/proBundle";

export const onRequestGet = async ({ env, request }: { env: ProBundleEnv; request: Request }) => {
  const id = new URL(request.url).searchParams.get("session_id") || "";
  const v = await verifySession(env, id);
  if (!v.ok) return json({ ok: false, reason: v.reason }, v.status);
  return json({ ok: true, email: maskEmail(v.email), purchased: v.created, test: !v.livemode });
};
