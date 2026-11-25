// GET /api/pro-bundle/status -> { available } so the page only offers checkout when delivery works.
import { checkoutAvailable, json, type ProBundleEnv } from "../../../src/server/proBundle";

export const onRequestGet = async ({ env }: { env: ProBundleEnv }) => json({ available: checkoutAvailable(env) });
