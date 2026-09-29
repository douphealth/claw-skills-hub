import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const SITE_URL = "https://openclaw-skillshub.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": SITE_URL,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function getRequestOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin || origin === SITE_URL) return SITE_URL;

  try {
    const url = new URL(origin);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return origin;
    }
  } catch {
    // Fall through to the production origin.
  }

  return SITE_URL;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const priceId = Deno.env.get("STRIPE_PRO_BUNDLE_PRICE_ID");

    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    if (!priceId) throw new Error("STRIPE_PRO_BUNDLE_PRICE_ID is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const origin = getRequestOrigin(req);

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/pro-bundle?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pro-bundle?canceled=true`,
      customer_creation: "always",
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata: {
        product: "clawskills-pro-bundle",
        source: "openclaw-skillshub.com",
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Checkout error:", errorMessage);

    return new Response(JSON.stringify({ error: "Unable to start checkout" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
