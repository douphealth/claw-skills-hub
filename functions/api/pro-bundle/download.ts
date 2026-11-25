// GET /api/pro-bundle/download?session_id=cs_... -> the decrypted kit, only for a paid, unrefunded session.
import { decryptKit, json, KIT_ASSET_PATH, KIT_FILENAME, verifySession, type ProBundleEnv } from "../../../src/server/proBundle";

export const onRequestGet = async ({ env, request }: { env: ProBundleEnv; request: Request }) => {
  const id = new URL(request.url).searchParams.get("session_id") || "";
  const v = await verifySession(env, id);
  if (!v.ok) return json({ ok: false, reason: v.reason }, v.status);
  if (!env.PRO_BUNDLE_KEY || !env.ASSETS) return json({ ok: false, reason: "Downloads are not configured yet." }, 503);
  const asset = await env.ASSETS.fetch(new URL(KIT_ASSET_PATH, request.url));
  if (!asset.ok) return json({ ok: false, reason: "The kit file is missing. Reply to your Stripe receipt and we will send it." }, 500);
  try {
    const zip = await decryptKit(await asset.arrayBuffer(), env.PRO_BUNDLE_KEY);
    return new Response(zip, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${KIT_FILENAME}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return json({ ok: false, reason: "The kit could not be unpacked. Reply to your Stripe receipt and we will send it." }, 500);
  }
};
