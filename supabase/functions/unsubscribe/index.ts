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

  const { data: subscriber, error: findErr } = await supabase
    .from("subscribers")
    .select("id, status")
    .eq("confirmation_token", token)
    .maybeSingle();

  if (findErr || !subscriber) {
    return new Response("Invalid token", { status: 404 });
  }

  if (subscriber.status === "unsubscribed") {
    return new Response(null, {
      status: 302,
      headers: { Location: "https://claw-compass.lovable.app/?unsubscribed=already" },
    });
  }

  const { error: updateErr } = await supabase
    .from("subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("id", subscriber.id);

  if (updateErr) {
    console.error("Unsubscribe error:", updateErr);
    return new Response("Failed to unsubscribe", { status: 500 });
  }

  await supabase.from("email_events").insert({
    subscriber_id: subscriber.id,
    event_type: "unsubscribed",
  });

  return new Response(null, {
    status: 302,
    headers: { Location: "https://claw-compass.lovable.app/?unsubscribed=true" },
  });
});
