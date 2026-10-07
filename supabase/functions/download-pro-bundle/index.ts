import Stripe from "https://esm.sh/stripe@22.6.0?target=denonext";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const allowedOrigins = new Set([
  "https://openclaw-skillshub.com",
  "https://www.openclaw-skillshub.com",
]);

function resolveOrigin(request: Request) {
  const origin = request.headers.get("origin") ?? "https://openclaw-skillshub.com";
  return allowedOrigins.has(origin) ? origin : "https://openclaw-skillshub.com";
}

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

Deno.serve(async (request) => {
  const origin = resolveOrigin(request);
  const headers = corsHeaders(origin);

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const sessionId = typeof body?.session_id === "string" ? body.session_id : "";
    if (!/^cs_/.test(sessionId)) {
      return new Response(JSON.stringify({ error: "Invalid session." }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
    const bucket = Deno.env.get("PRO_BUNDLE_STORAGE_BUCKET") ?? "pro-bundle";
    const objectPath = Deno.env.get("PRO_BUNDLE_STORAGE_PATH") ?? "openclaw-pro-bundle.zip";

    if (!stripeKey || !supabaseUrl || !secretKeys) {
      throw new Error("Download configuration is incomplete.");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2026-08-26.dahlia" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      session.payment_status === "unpaid" ||
      session.metadata?.product_key !== "openclaw_pro_bundle"
    ) {
      return new Response(JSON.stringify({ error: "Payment not verified." }), {
        status: 403,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const secretKeyMap = JSON.parse(secretKeys);
    const supabase = createClient(supabaseUrl, secretKeyMap.default);

    const { data: purchase, error: purchaseError } = await supabase
      .from("pro_bundle_purchases")
      .select("stripe_checkout_session_id, payment_status")
      .eq("stripe_checkout_session_id", sessionId)
      .maybeSingle();

    if (purchaseError) throw purchaseError;

    if (!purchase || purchase.payment_status === "unpaid") {
      return new Response(JSON.stringify({ error: "Purchase fulfillment is still processing." }), {
        status: 409,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(objectPath, 300, {
      download: "openclaw-pro-bundle.zip",
    });

    if (error || !data?.signedUrl) throw error ?? new Error("Signed URL was not created.");

    return new Response(JSON.stringify({ url: data.signedUrl, expires_in: 300 }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Pro bundle download error", error);
    return new Response(JSON.stringify({ error: "Download could not be prepared." }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
});
