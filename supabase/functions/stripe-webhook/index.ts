import Stripe from "https://esm.sh/stripe@22.6.0?target=denonext";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");

if (!stripeKey || !webhookSecret || !supabaseUrl || !secretKeys) {
  throw new Error("Webhook configuration is incomplete.");
}

const stripe = new Stripe(stripeKey, { apiVersion: "2026-08-26.dahlia" });
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const secretKeyMap = JSON.parse(secretKeys);
const supabase = createClient(supabaseUrl, secretKeyMap.default);

async function upsertPaidSession(session: Stripe.Checkout.Session) {
  if (session.payment_status === "unpaid") return;

  const email = session.customer_details?.email ?? session.customer_email ?? null;
  const amountTotal = session.amount_total ?? 0;
  const currency = session.currency ?? "usd";
  const productKey = session.metadata?.product_key ?? "openclaw_pro_bundle";

  const { error } = await supabase.from("pro_bundle_purchases").upsert(
    {
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null,
      customer_email: email,
      product_key: productKey,
      amount_total: amountTotal,
      currency,
      payment_status: session.payment_status,
      fulfilled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_checkout_session_id" },
  );

  if (error) throw error;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = request.headers.get("Stripe-Signature");
  if (!signature) return new Response("Missing Stripe-Signature", { status: 400 });

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await upsertPaidSession(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { error } = await supabase.from("pro_bundle_purchases").upsert(
          {
            stripe_checkout_session_id: session.id,
            customer_email: session.customer_details?.email ?? session.customer_email ?? null,
            product_key: session.metadata?.product_key ?? "openclaw_pro_bundle",
            amount_total: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            payment_status: "unpaid",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_checkout_session_id" },
        );
        if (error) throw error;
        break;
      }
      default:
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
});
