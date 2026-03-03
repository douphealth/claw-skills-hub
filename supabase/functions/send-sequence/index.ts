import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Automated Email Sequence — triggered after confirmation.
 * 
 * Step 0: Welcome email (sent immediately on confirm)
 * Step 1: Top 5 skills deep-dive (sent 2 days later)
 * Step 2: Power-user playbook (sent 5 days later)
 * Step 3: Community + what's next (sent 7 days later)
 */

const brandColor = "#06b6d4";
const darkBg = "#0f172a";
const cardBg = "#ffffff";
const textDark = "#0f172a";
const textBody = "#334155";
const textMuted = "#64748b";
const textLight = "#94a3b8";
const surfaceBg = "#f8fafc";
const footerBg = "#f1f5f9";

const emailWrapper = (content: string, unsubUrl: string) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${surfaceBg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${surfaceBg};padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:${cardBg};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        ${content}
        <tr><td style="background:${footerBg};padding:24px 40px;text-align:center;">
          <p style="color:${textLight};font-size:12px;line-height:1.6;margin:0 0 8px;">
            You're receiving this because you subscribed at ClawSkills.<br/>
            <a href="${unsubUrl}" style="color:${textLight};text-decoration:underline;">Unsubscribe anytime</a> — no hard feelings.
          </p>
          <p style="color:${textLight};font-size:11px;margin:0;">
            Made with ❤️ by the ClawSkills team
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const headerBand = (emoji: string, title: string) => `
<tr><td style="background:linear-gradient(135deg,${darkBg} 0%,#1e293b 100%);padding:36px 40px;text-align:center;">
  <p style="font-size:36px;margin:0 0 8px;">${emoji}</p>
  <h1 style="color:#f8fafc;font-size:22px;font-weight:700;margin:0;letter-spacing:-0.3px;">${title}</h1>
</td></tr>`;

const ctaButton = (url: string, label: string) => `
<table cellpadding="0" cellspacing="0" style="margin:28px 0;">
  <tr><td style="background:${brandColor};border-radius:8px;padding:14px 32px;">
    <a href="${url}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;display:inline-block;">${label}</a>
  </td></tr>
</table>`;

const divider = () => `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">`;

const skillCard = (num: number, name: string, desc: string, why: string, cmd: string, color: string) => `
<div style="margin-bottom:24px;padding:20px;background:${surfaceBg};border-radius:12px;border-left:4px solid ${color};">
  <p style="margin:0 0 4px;font-weight:700;font-size:16px;color:${textDark};">${num}. ${name}</p>
  <p style="margin:0 0 10px;color:${textMuted};font-size:14px;line-height:1.6;">${desc}</p>
  <p style="margin:0 0 10px;color:${textBody};font-size:14px;line-height:1.6;"><strong>Why people love it:</strong> ${why}</p>
  <code style="display:inline-block;background:#0f172a;color:${brandColor};padding:8px 14px;border-radius:6px;font-size:13px;font-family:'SF Mono',Monaco,Consolas,monospace;">${cmd}</code>
</div>`;

const tipBlock = (emoji: string, title: string, body: string, example: string) => `
<div style="margin-bottom:24px;">
  <h3 style="color:${textDark};font-size:17px;margin:0 0 8px;">${emoji} ${title}</h3>
  <p style="color:${textBody};font-size:15px;line-height:1.7;margin:0 0 10px;">${body}</p>
  ${example ? `<div style="background:${surfaceBg};border-radius:8px;padding:14px 16px;border:1px solid #e2e8f0;">
    <p style="margin:0;color:${textMuted};font-size:13px;line-height:1.6;"><strong>Example:</strong> ${example}</p>
  </div>` : ''}
</div>`;

const SEQUENCE = [
  {
    step: 0,
    delay_days: 0,
    subject: "Welcome aboard — here's exactly what to expect 🐾",
    html: (_email: string, unsubUrl: string) => emailWrapper(`
      ${headerBand("🐾", "Welcome to ClawSkills")}
      <tr><td style="padding:40px;">
        <p style="color:${textBody};font-size:17px;line-height:1.7;margin:0 0 20px;">
          Hey there! 👋
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 20px;">
          I'm genuinely excited you're here. You just joined a community of developers, builders, and AI enthusiasts who are using OpenClaw skills to make their agents <em>actually useful</em> — not just impressive demos, but tools that save real hours every week.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 20px;">
          <strong>Here's my promise to you:</strong> every email I send will be worth your time. No filler, no fluff, no "just checking in" emails. Only actionable stuff you can use immediately.
        </p>
        ${divider()}
        <p style="color:${textDark};font-size:17px;font-weight:700;margin:0 0 16px;">What's coming your way:</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;width:100%;">
          <tr>
            <td style="padding:12px 16px;background:${surfaceBg};border-radius:8px;margin-bottom:8px;">
              <p style="margin:0;color:${textBody};font-size:15px;line-height:1.6;">
                📧 <strong>In 2 days</strong> — The 5 most-installed skills (with exact install commands and real use cases from the community)
              </p>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px 16px;background:${surfaceBg};border-radius:8px;">
              <p style="margin:0;color:${textBody};font-size:15px;line-height:1.6;">
                🔥 <strong>In 5 days</strong> — 3 power-user techniques that most people discover way too late
              </p>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px 16px;background:${surfaceBg};border-radius:8px;">
              <p style="margin:0;color:${textBody};font-size:15px;line-height:1.6;">
                🌍 <strong>In 7 days</strong> — How to get involved with the community and shape the future of OpenClaw
              </p>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px 16px;background:${surfaceBg};border-radius:8px;">
              <p style="margin:0;color:${textBody};font-size:15px;line-height:1.6;">
                📬 <strong>Every Thursday</strong> — Skill of the Week: one hand-picked skill, fully reviewed, with a mini-tutorial
              </p>
            </td>
          </tr>
        </table>
        ${divider()}
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 16px;">
          <strong>Quick win to start right now:</strong> Head to the skills directory and search for something you need today. Every skill page has a one-line install command — just copy, paste, done. No config files, no YAML.
        </p>
        ${ctaButton("https://claw-compass.lovable.app/skills", "Browse the Skills Directory →")}
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 0;">
          And hey — if you ever have a question or just want to share a cool skill you found, just reply to this email. I read every one.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:20px 0 0;">
          Talk soon,<br/>
          <strong>The ClawSkills Team</strong>
        </p>
      </td></tr>
    `, unsubUrl),
  },
  {
    step: 1,
    delay_days: 2,
    subject: "The 5 skills everyone installs first (with commands)",
    html: (_email: string, unsubUrl: string) => emailWrapper(`
      ${headerBand("🏆", "Top 5 Skills — The Starting Lineup")}
      <tr><td style="padding:40px;">
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 8px;">
          As promised — here are the 5 most popular OpenClaw skills. These aren't just popular by downloads; they're the ones people <em>keep using</em> daily.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 24px;">
          I've included the install command for each so you can try them in under 60 seconds.
        </p>

        ${skillCard(1, "Web Search Pro", "Real-time web search with source attribution and citation formatting.", "It transforms any AI agent from a knowledge-cutoff chatbot into something that actually knows what happened yesterday. Essential for research, fact-checking, and staying current.", "openclaw install web-search-pro", "#3b82f6")}

        ${skillCard(2, "Code Interpreter", "Execute Python, analyze datasets, generate charts and visualizations on the fly.", "People use this to go from 'here's a CSV' to 'here's a full analysis with charts' in one agent conversation. Data teams love it.", "openclaw install code-interpreter", "#10b981")}

        ${skillCard(3, "File Manager", "Read, write, organize, and transform files across formats.", "It's the bridge between your agent and your filesystem. Without it, your agent can talk but can't actually do anything with your files.", "openclaw install file-manager", "#f59e0b")}

        ${skillCard(4, "API Connector", "Connect to any REST API with built-in auth handling and retry logic.", "Build integrations in minutes instead of hours. One user connected 12 APIs in an afternoon — Stripe, GitHub, Notion, you name it.", "openclaw install api-connector", "#8b5cf6")}

        ${skillCard(5, "Memory Store", "Persistent memory across sessions with semantic search and context recall.", "This is the one that makes people say 'whoa.' Your agent finally remembers what you talked about last week, what you prefer, and what you're working on.", "openclaw install memory-store", "#ec4899")}

        ${divider()}
        <p style="color:${textDark};font-size:17px;font-weight:700;margin:0 0 12px;">💡 Pro tip: Stack them together</p>
        <p style="color:${textBody};font-size:15px;line-height:1.7;margin:0 0 20px;">
          Try <strong>Web Search + Code Interpreter + Memory Store</strong> together. Your agent can research a topic, crunch the numbers, <em>and</em> remember the results next time. That's a compound capability most people don't discover until month two.
        </p>
        ${ctaButton("https://claw-compass.lovable.app/skills", "Explore All 5,700+ Skills →")}
        <p style="color:${textBody};font-size:15px;line-height:1.7;margin:0;">
          In 3 days, I'm sending you the power-user playbook — techniques that took me months to figure out, condensed into one email. You'll want to bookmark that one.
        </p>
      </td></tr>
    `, unsubUrl),
  },
  {
    step: 2,
    delay_days: 5,
    subject: "The power-user playbook (3 techniques that change everything) 🔥",
    html: (_email: string, unsubUrl: string) => emailWrapper(`
      ${headerBand("🔥", "The Power-User Playbook")}
      <tr><td style="padding:40px;">
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 8px;">
          These three techniques are the difference between "I have some AI skills installed" and "my AI agent actually runs half my workflow." They took me months of experimenting to figure out.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 28px;">
          You're getting them in 3 minutes.
        </p>

        ${tipBlock(
          "🧩",
          "Technique 1: The Skill Chain Pattern",
          "Don't think of skills as isolated tools — think of them as Lego blocks. The real magic happens when you chain 2-3 skills into a pipeline. The agent uses one skill's output as another skill's input, automatically.",
          "Web Search finds relevant articles → Code Interpreter extracts key data points → File Manager saves a formatted report. One prompt, three skills, done in 30 seconds."
        )}

        ${tipBlock(
          "🛡️",
          "Technique 2: The 10-Second Security Check",
          "Every skill on ClawSkills has a security badge. Before you install anything, take 10 seconds to check it. Green = audited and safe. Yellow = community-reviewed. Red = proceed with caution. This isn't paranoia — it's just good practice when you're giving tools to an AI agent.",
          "I personally won't install anything rated Red unless I've read the source code. For Yellow-rated skills, I check the community reviews first. Takes 10 seconds and has saved me from two sketchy skills so far."
        )}

        ${tipBlock(
          "⚡",
          "Technique 3: The One-Line Workflow",
          "Stop manually configuring skills. Every skill page on ClawSkills has a copy-paste install command. But here's what most people miss: you can chain installs. Install three skills in one command, and they auto-configure to work together.",
          '<code style="background:#0f172a;color:#06b6d4;padding:6px 10px;border-radius:4px;font-size:13px;">openclaw install web-search-pro code-interpreter memory-store</code> — That one line gives your agent research + analysis + memory. Under 60 seconds.'
        )}

        ${divider()}
        <p style="color:${textDark};font-size:17px;font-weight:700;margin:0 0 12px;">Your homework (optional but worth it):</p>
        <p style="color:${textBody};font-size:15px;line-height:1.7;margin:0 0 24px;">
          Pick one workflow you do manually this week. Find 2-3 skills that could handle parts of it. Chain them together. Then reply to this email and tell me what you built — I genuinely love hearing about creative setups, and I'll feature the best ones in the newsletter.
        </p>
        ${ctaButton("https://claw-compass.lovable.app/tutorials", "Read the Step-by-Step Tutorials →")}
        <p style="color:${textBody};font-size:15px;line-height:1.7;margin:0;">
          One more email coming in 2 days — it's about the community and what's coming next. Short and sweet, I promise.
        </p>
      </td></tr>
    `, unsubUrl),
  },
  {
    step: 3,
    delay_days: 7,
    subject: "You're part of something bigger — here's what's next 🌍",
    html: (_email: string, unsubUrl: string) => emailWrapper(`
      ${headerBand("🌍", "Welcome to the Community")}
      <tr><td style="padding:40px;">
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 20px;">
          Quick one today. You've been on ClawSkills for a week now, and I wanted to take a moment to say thanks — not in a generic auto-email way, but genuinely.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 24px;">
          The best part of building ClawSkills has been watching people discover skills they didn't know existed and build things I never imagined. That's you now.
        </p>

        ${divider()}
        <p style="color:${textDark};font-size:17px;font-weight:700;margin:0 0 16px;">Three ways to get more out of this:</p>

        <div style="margin-bottom:20px;padding:20px;background:${surfaceBg};border-radius:12px;">
          <p style="margin:0 0 8px;font-weight:700;font-size:15px;color:${textDark};">⭐ Rate the skills you've tried</p>
          <p style="margin:0;color:${textBody};font-size:14px;line-height:1.7;">Your ratings help other people avoid the mediocre stuff and find the gems faster. Even a quick thumbs-up helps. The community runs on real feedback, not marketing copy.</p>
        </div>

        <div style="margin-bottom:20px;padding:20px;background:${surfaceBg};border-radius:12px;">
          <p style="margin:0 0 8px;font-weight:700;font-size:15px;color:${textDark};">💡 Suggest skills we should cover</p>
          <p style="margin:0;color:${textBody};font-size:14px;line-height:1.7;">Built something cool? Found an amazing skill we haven't listed? Reply to any email and let me know. The best suggestions end up featured in the weekly newsletter, with credit to you.</p>
        </div>

        <div style="margin-bottom:24px;padding:20px;background:${surfaceBg};border-radius:12px;">
          <p style="margin:0 0 8px;font-weight:700;font-size:15px;color:${textDark};">📚 Dive into the tutorials</p>
          <p style="margin:0;color:${textBody};font-size:14px;line-height:1.7;">These aren't generic "getting started" docs. They're step-by-step walkthroughs written by people who actually use the skills daily. Real workflows, real screenshots, real results.</p>
        </div>

        ${divider()}
        <p style="color:${textDark};font-size:17px;font-weight:700;margin:0 0 12px;">📬 What happens from here:</p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 20px;">
          Every <strong>Thursday</strong>, you'll get <strong>Skill of the Week</strong> — one carefully selected skill with a full review, use cases, security notes, and a mini-tutorial. It takes 3 minutes to read and often saves hours of searching.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0 0 24px;">
          That's it. One email a week. No spam, no upsells, no "we miss you" guilt trips. Just genuinely useful stuff.
        </p>

        ${ctaButton("https://claw-compass.lovable.app/skills", "Explore the Full Directory →")}

        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:0;">
          Thanks for being here. Seriously. This thing only works because people like you show up and actually use it.
        </p>
        <p style="color:${textBody};font-size:16px;line-height:1.8;margin:20px 0 0;">
          See you Thursday 👋<br/>
          <strong>The ClawSkills Team</strong>
        </p>
      </td></tr>
    `, unsubUrl),
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

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClawSkills <hello@openclaw-skillshub.com>",
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

    await supabase.from("email_events").insert({
      subscriber_id,
      event_type: `sequence_step_${step}`,
      email_subject: seqItem.subject,
      metadata: { step, delay_days: seqItem.delay_days },
    });

    console.log(`✅ Sent sequence step ${step} to ${email}`);

    const nextStep = step + 1;
    if (nextStep < SEQUENCE.length) {
      const nextItem = SEQUENCE[nextStep];
      const delayMs = (nextItem.delay_days - seqItem.delay_days) * 24 * 60 * 60 * 1000;

      console.log(`📅 Next step ${nextStep} scheduled in ${nextItem.delay_days - seqItem.delay_days} days for ${email}`);

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
