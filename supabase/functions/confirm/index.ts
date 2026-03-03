import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Find subscriber by token
  const { data: subscriber, error: findErr } = await supabase
    .from("subscribers")
    .select("id, email, status")
    .eq("confirmation_token", token)
    .maybeSingle();

  if (findErr || !subscriber) {
    return new Response("Invalid or expired token", { status: 404 });
  }

  if (subscriber.status === "confirmed") {
    // Already confirmed — redirect
    return new Response(null, {
      status: 302,
      headers: { Location: "https://claw-compass.lovable.app/?confirmed=already" },
    });
  }

  // Confirm subscriber
  const { error: updateErr } = await supabase
    .from("subscribers")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("id", subscriber.id);

  if (updateErr) {
    console.error("Confirm error:", updateErr);
    return new Response("Failed to confirm", { status: 500 });
  }

  // Track confirmation event
  await supabase.from("email_events").insert({
    subscriber_id: subscriber.id,
    event_type: "confirmed",
    email_subject: null,
  });

  // Trigger the welcome email sequence
  try {
    const seqUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-sequence`;
    await fetch(seqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        subscriber_id: subscriber.id,
        email: subscriber.email,
        sequence_step: 0,
      }),
    });
  } catch (seqErr) {
    console.error("Failed to trigger sequence:", seqErr);
    // Don't block confirmation on sequence failure
  }

  // Redirect to success page
  return new Response(null, {
    status: 302,
    headers: { Location: "https://claw-compass.lovable.app/?confirmed=true" },
  });
});
