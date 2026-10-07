import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@22.6.0?target=denonext";

const allowedOrigins = new Set([
  "https://openclaw-skillshub.com",
  "https://www.openclaw-skillshub.com",
]);

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

function resolveOrigin(request: Request) {
  const origin = request.headers.get("origin") ?? "https://openclaw-skillshub.com";
  return allowedOrigins.has(origin) ? origin : "https://openclaw-skillshub.com";
}

function randomLetters(length = 8) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
}

serve(async (req) => {
  const origin = resolveOrigin(req);
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const priceId = Deno.env.get("STRIPE_PRO_BUNDLE_PRICE_ID");

    if (!stripeKey || !priceId) {
      throw new Error("Payment configuration is incomplete.");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2026-08-26.dahlia" });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_creation: "always",
      success_url: `${origin}/pro-bundle?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pro-bundle?canceled=true`,
      metadata: {
        product_key: "openclaw_pro_bundle",
      },
      integration_identifier: `openclaw_pro_${randomLetters()}`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Checkout failed";
    console.error("Checkout error:", errorMessage);
    return new Response(JSON.stringify({ error: "Checkout could not be started." }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
});
