// GET /api/pro-bundle/buy -> 303 to this environment's Stripe Payment Link, only when delivery is configured.
import { checkoutAvailable, type ProBundleEnv } from "../../../src/server/proBundle";

export const onRequestGet = async ({ env, request }: { env: ProBundleEnv; request: Request }) => {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (!checkoutAvailable(env)) {
    return new Response(null, { status: 303, headers: { ...headers, Location: new URL("/pro-bundle/?checkout=unavailable", request.url).toString() } });
  }
  return new Response(null, { status: 303, headers: { ...headers, Location: env.PRO_BUNDLE_PAYMENT_LINK! } });
};
