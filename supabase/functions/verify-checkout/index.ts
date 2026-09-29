import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const SITE_URL = "https://openclaw-skillshub.com";
const corsHeaders = {
  "Access-Control-Allow-Origin": SITE_URL,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const expectedPriceId = Deno.env.get("STRIPE_PRO_BUNDLE_PRICE_ID");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    if (!expectedPriceId) throw new Error("STRIPE_PRO_BUNDLE_PRICE_ID is not set");

    const { session_id } = await req.json();
    if (typeof session_id !== "string" || !session_id.startsWith("cs_")) {
      return new Response(JSON.stringify({ verified: false, error: "Invalid session" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price"],
    });

    const lineItems = session.line_items?.data ?? [];
    const hasExpectedProduct = lineItems.some((item) => item.price?.id === expectedPriceId);
    const verified =
      session.mode === "payment" &&
      session.payment_status === "paid" &&
      session.status === "complete" &&
      hasExpectedProduct;

    return new Response(
      JSON.stringify({
        verified,
        customerEmail: verified ? session.customer_details?.email ?? null : null,
        paymentStatus: session.payment_status,
        status: session.status,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: verified ? 200 : 402,
      },
    );
  } catch (error) {
    console.error("Checkout verification error:", error instanceof Error ? error.message : String(error));
    return new Response(JSON.stringify({ verified: false, error: "Unable to verify payment" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
