// GET /api/pro-bundle/status -> { available } so the page only offers checkout when delivery works.
import { checkoutAvailable, json, type ProBundleEnv } from "../../../src/server/proBundle";

// The link is returned so the page can send buyers straight to Stripe: the production Worker in front
// of Pages follows redirects itself, so a 303 from /api/pro-bundle/buy would never reach the browser.
export const onRequestGet = async ({ env }: { env: ProBundleEnv }) => {
  const available = checkoutAvailable(env);
  return json({ available, link: available ? env.PRO_BUNDLE_PAYMENT_LINK : null });
};
