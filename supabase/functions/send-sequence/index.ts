import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Automated Email Sequence — triggered after confirmation.
 * 
 * Step 0: Welcome email (sent immediately on confirm)
 * Step 1: Top 5 skills email (sent 2 days later via cron or re-invocation)
 * Step 2: Power-user tips (sent 5 days later)
 * Step 3: Community invite (sent 7 days later)
 * 
 * Each step is idempotent — tracked via email_events to prevent duplicates.
 */

const SEQUENCE = [
  {
    step: 0,
    delay_days: 0,
    subject: "Welcome to ClawSkills — here's what to expect 🐾",
    html: (email: string, unsubUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 40px;text-align:center;">
          <h1 style="color:#f8fafc;font-size:24px;margin:0;">🐾 Welcome to ClawSkills</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#0f172a;font-size:18px;font-weight:600;margin:0 0 16px;">You're in! Here's the deal:</p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px;">
            Every week, I personally pick the single best new OpenClaw skill and break it down for you — what it does, how to install it, when to use it, and whether it's actually worth your time.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px;">
            No fluff. No sponsored picks. Just genuinely useful tools that make your AI agents smarter.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px;">
            <strong>What's coming your way:</strong>
          </p>
          <ul style="color:#475569;font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
            <li>🔧 Weekly skill spotlight with install commands</li>
            <li>⚡ Quick tutorials you can follow in under 5 minutes</li>
            <li>🛡️ Security notes so you know exactly what you're installing</li>
            <li>💡 Real use cases from the community</li>
          </ul>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 8px;">
            In a couple days, I'll send you our top 5 most-installed skills to get you started.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 0;">
            Talk soon,<br/>
            <strong>The ClawSkills Team</strong>
          </p>
        </td></tr>
        <tr><td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">
            You're getting this because you signed up at ClawSkills.
            <a href="${unsubUrl}" style="color:#94a3b8;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    step: 1,
    delay_days: 2,
    subject: "The 5 OpenClaw skills everyone installs first",
    html: (email: string, unsubUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 40px;text-align:center;">
          <h1 style="color:#f8fafc;font-size:24px;margin:0;">🏆 Top 5 Skills</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 24px;">
            As promised, here are the 5 most popular OpenClaw skills — the ones people install first and keep using daily:
          </p>

          <div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #3b82f6;">
            <p style="margin:0 0 4px;font-weight:700;color:#0f172a;">1. Web Search Pro</p>
            <p style="margin:0;color:#64748b;font-size:14px;">Real-time search with source attribution. The must-have for any research agent.</p>
          </div>

          <div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #10b981;">
            <p style="margin:0 0 4px;font-weight:700;color:#0f172a;">2. Code Interpreter</p>
            <p style="margin:0;color:#64748b;font-size:14px;">Run Python, analyze data, generate charts. Turns any agent into a data scientist.</p>
          </div>

          <div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #f59e0b;">
            <p style="margin:0 0 4px;font-weight:700;color:#0f172a;">3. File Manager</p>
            <p style="margin:0;color:#64748b;font-size:14px;">Read, write, and organize files. Essential for any workflow automation.</p>
          </div>

          <div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #8b5cf6;">
            <p style="margin:0 0 4px;font-weight:700;color:#0f172a;">4. API Connector</p>
            <p style="margin:0;color:#64748b;font-size:14px;">Connect to any REST API with auth handling. Build integrations in minutes.</p>
          </div>

          <div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #ec4899;">
            <p style="margin:0 0 4px;font-weight:700;color:#0f172a;">5. Memory Store</p>
            <p style="margin:0;color:#64748b;font-size:14px;">Persistent memory across sessions. Your agent finally remembers context.</p>
          </div>

          <p style="color:#475569;font-size:16px;line-height:1.7;margin:24px 0 0;">
            Browse them all at <a href="https://claw-compass.lovable.app/skills" style="color:#3b82f6;font-weight:600;">ClawSkills →</a>
          </p>
        </td></tr>
        <tr><td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">
            <a href="${unsubUrl}" style="color:#94a3b8;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    step: 2,
    delay_days: 5,
    subject: "3 power-user tricks most people miss 🔥",
    html: (email: string, unsubUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 40px;text-align:center;">
          <h1 style="color:#f8fafc;font-size:24px;margin:0;">🔥 Power-User Tips</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 24px;">
            You've been on ClawSkills for a few days now. Here are three things most people don't discover until way later:
          </p>

          <h3 style="color:#0f172a;font-size:17px;margin:0 0 8px;">💡 Tip 1: Stack skills together</h3>
          <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 20px;">
            Skills aren't isolated — Web Search + Code Interpreter together means your agent can research data and instantly visualize it. Try combining 2-3 skills for compound capabilities.
          </p>

          <h3 style="color:#0f172a;font-size:17px;margin:0 0 8px;">🔒 Tip 2: Always check the security badge</h3>
          <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 20px;">
            Every skill on ClawSkills has a security rating. Green means audited and safe. Yellow means community-reviewed. Red means use with caution. Don't skip this — it takes 2 seconds and saves headaches.
          </p>

          <h3 style="color:#0f172a;font-size:17px;margin:0 0 8px;">⚡ Tip 3: Use the one-line installer</h3>
          <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">
            Every skill page has a copy-paste install command. One line, done. No config files, no YAML, no dependencies to manage manually.
          </p>

          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0;">
            Found a great skill combo? Reply to this email — I love hearing about creative setups.
          </p>
        </td></tr>
        <tr><td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">
            <a href="${unsubUrl}" style="color:#94a3b8;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  {
    step: 3,
    delay_days: 7,
    subject: "You're part of something bigger 🌍",
    html: (email: string, unsubUrl: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:32px 40px;text-align:center;">
          <h1 style="color:#f8fafc;font-size:24px;margin:0;">🌍 The Community</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px;">
            Quick one today. ClawSkills isn't just a directory — it's built by a community of people who actually use these tools every day.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px;">
            Here's how you can get more out of it:
          </p>
          <ul style="color:#475569;font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
            <li><strong>Rate skills</strong> you've used — your reviews help everyone find the good stuff faster</li>
            <li><strong>Suggest new skills</strong> — if you've built or found something great, we want to know</li>
            <li><strong>Read the tutorials</strong> — step-by-step guides written by people who actually use the skills</li>
          </ul>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px;">
            From here on out, you'll get <strong>Skill of the Week</strong> every Thursday — one hand-picked skill with everything you need to know.
          </p>
          <p style="color:#475569;font-size:16px;line-height:1.7;margin:0;">
            Thanks for being here. Seriously.<br/><br/>
            <strong>— The ClawSkills Team</strong>
          </p>
        </td></tr>
        <tr><td style="background:#f1f5f9;padding:20px 40px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">
            <a href="${unsubUrl}" style="color:#94a3b8;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
];

serve(async (req) => {
  try {
    const { subscriber_id, email, sequence_step } = await req.json();
    const step = sequence_step ?? 0;

    if (!subscriber_id || !email) {
      return new Response(JSON.stringify({ error: "subscriber_id and email required" }), {
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check subscriber is still active
    const { data: sub } = await supabase
      .from("subscribers")
      .select("status, confirmation_token")
      .eq("id", subscriber_id)
      .single();

    if (!sub || sub.status === "unsubscribed") {
      return new Response(JSON.stringify({ message: "Subscriber inactive, skipping" }), { status: 200 });
    }

    const seqItem = SEQUENCE[step];
    if (!seqItem) {
      return new Response(JSON.stringify({ message: "Sequence complete" }), { status: 200 });
    }

    // Check for duplicate sends
    const { data: alreadySent } = await supabase
      .from("email_events")
      .select("id")
      .eq("subscriber_id", subscriber_id)
      .eq("event_type", `sequence_step_${step}`)
      .maybeSingle();

    if (alreadySent) {
      return new Response(JSON.stringify({ message: `Step ${step} already sent` }), { status: 200 });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const unsubUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/unsubscribe?token=${sub.confirmation_token}`;

    // Send the email
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClawSkills <hello@clawskills.com>",
        to: [email],
        subject: seqItem.subject,
        html: seqItem.html(email, unsubUrl),
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error(`Resend error (step ${step}):`, errText);
      throw new Error(`Failed to send step ${step}`);
    }

    // Track the send
    await supabase.from("email_events").insert({
      subscriber_id,
      event_type: `sequence_step_${step}`,
      email_subject: seqItem.subject,
      metadata: { step, delay_days: seqItem.delay_days },
    });

    console.log(`✅ Sent sequence step ${step} to ${email}`);

    // Schedule next step if exists
    const nextStep = step + 1;
    if (nextStep < SEQUENCE.length) {
      const nextItem = SEQUENCE[nextStep];
      const delayMs = (nextItem.delay_days - seqItem.delay_days) * 24 * 60 * 60 * 1000;

      // For immediate or short delays, use setTimeout-like approach via edge function re-invocation
      // For production, you'd use pg_cron. For now, log the next step info.
      console.log(`📅 Next step ${nextStep} scheduled in ${nextItem.delay_days - seqItem.delay_days} days for ${email}`);

      // Store the pending next step info so a cron job can pick it up
      await supabase.from("email_events").insert({
        subscriber_id,
        event_type: `sequence_pending_${nextStep}`,
        metadata: {
          step: nextStep,
          send_after: new Date(Date.now() + delayMs).toISOString(),
          email,
        },
      });
    }

    return new Response(JSON.stringify({ success: true, step }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Sequence error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
