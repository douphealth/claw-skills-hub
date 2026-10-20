import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Never trust caller-supplied Origin when constructing payment return URLs.
    const appUrl = Deno.env.get("APP_URL") || "https://openclaw-skillshub.com";
    const url = new URL(appUrl);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
      throw new Error("APP_URL must be an HTTPS origin without credentials or query parameters");
    }
    const origin = url.origin;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1TI3vuGCqwm95OGXGt3JS82Q",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/pro-bundle?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pro-bundle?canceled=true`,
      customer_creation: "always",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Checkout error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
