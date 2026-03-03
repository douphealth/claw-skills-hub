import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, source_page, utm_source, utm_medium, utm_campaign } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status, confirmation_token")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing?.status === "confirmed") {
      return new Response(JSON.stringify({ message: "You're already subscribed! 🎉" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let token: string;

    if (existing) {
      // Re-send confirmation for pending subscriber
      token = existing.confirmation_token;
    } else {
      // Insert new subscriber
      const { data: newSub, error: insertError } = await supabase
        .from("subscribers")
        .insert({
          email: email.toLowerCase().trim(),
          source_page: source_page || null,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          status: "pending",
        })
        .select("confirmation_token")
        .single();

      if (insertError) throw insertError;
      token = newSub.confirmation_token;
    }

    // Send confirmation email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const confirmUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/confirm?token=${token}`;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClawSkills <hello@clawskills.com>",
        to: [email],
        subject: "Confirm your subscription to ClawSkills 🐾",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 40px;text-align:center;">
          <h1 style="color:#f8fafc;font-size:24px;margin:0;">🐾 ClawSkills</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="color:#0f172a;font-size:20px;margin:0 0 16px;">Hey there!</h2>
          <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
            Thanks for signing up for <strong>Skill of the Week</strong> — you're one click away from getting the best OpenClaw skills delivered straight to your inbox.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 32px;">
            Just confirm your email below and you're all set. No spam, ever. Just genuinely useful stuff.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td style="background:#3b82f6;border-radius:8px;">
              <a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;">
                Yes, subscribe me ✓
              </a>
            </td></tr>
          </table>
          <p style="color:#94a3b8;font-size:13px;text-align:center;margin:32px 0 0;">
            If you didn't sign up for ClawSkills, just ignore this email.
          </p>
        </td></tr>
        <tr><td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">
            ClawSkills — The Definitive OpenClaw Skills Directory
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      throw new Error("Failed to send confirmation email");
    }

    // Track the event
    await supabase.from("email_events").insert({
      subscriber_id: existing?.id || undefined,
      event_type: "confirmation_sent",
      email_subject: "Confirm your subscription to ClawSkills 🐾",
    });

    return new Response(
      JSON.stringify({ message: "Check your inbox! We've sent you a confirmation email." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Subscribe error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
