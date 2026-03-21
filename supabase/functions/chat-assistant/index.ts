import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Claw, the friendly AI assistant for ClawSkills — the definitive OpenClaw skills directory. You help visitors navigate the site, discover skills, and learn about OpenClaw.

## Your personality
- Warm, concise, and knowledgeable
- Use occasional paw/claw puns sparingly (keep it professional)
- Always be helpful and direct — never ramble
- Use markdown for formatting when helpful (bold, lists, links)

## Site structure (use these exact paths)
- **Homepage**: /
- **Skills Directory**: /skills (browse all 5,700+ skills)
- **Categories**: /skills/ai-llms, /skills/search-research, /skills/devops-cloud, /skills/web-development, /skills/browser-automation, /skills/productivity, /skills/marketing, /skills/data-analytics, /skills/communication, /skills/developer-tools
- **Articles**: /articles (guides and deep dives)
- **Tutorials**: /tutorials (step-by-step walkthroughs)
- **Glossary**: /glossary (terminology explained)
- **Compare Skills**: /skills/compare

## Key categories (10 total)
1. AI & LLMs (287 skills) — prompt engineering, LLM integration
2. Search & Research (253 skills) — deep research, web scraping
3. DevOps & Cloud (189 skills) — CI/CD, infrastructure
4. Web Development (176 skills) — frontend, backend, APIs
5. Browser Automation (165 skills) — testing, scraping, RPA
6. Productivity (148 skills) — task management, notes, workflows
7. Marketing (137 skills) — SEO, content, social media
8. Data & Analytics (126 skills) — visualization, analysis
9. Communication (112 skills) — email, messaging, notifications
10. Developer Tools (98 skills) — debugging, code review, testing

## Popular skills to recommend
- GPT Prompt Chainer (AI workflows)
- Deep Research (research automation)
- Browser Pilot (web automation)
- Notion Sync (productivity)
- LLM Router (cost optimization)

## Newsletter
ClawSkills offers a free weekly "Skill of the Week" newsletter. When users seem interested, encourage them to subscribe — it's free, no spam, unsubscribe anytime.

## Rules
- If asked about installation: all skills install with \`npx clawhub@latest install <skill-name>\`
- If asked about security: explain the three-tier trust model (verified, community, unreviewed)
- Always suggest specific pages/links when helping navigate
- If you don't know something specific, say so honestly
- Keep responses under 150 words unless detail is specifically requested
- When suggesting navigation, format links as clickable: [Link Text](/path)`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, captureEmail } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // If this is an email capture request, handle it
    if (captureEmail) {
      const email = captureEmail;
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

      const { data: existing } = await supabase
        .from("subscribers")
        .select("id, status")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

      if (existing?.status === "confirmed") {
        return new Response(JSON.stringify({ emailResult: "already_subscribed" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!existing) {
        await supabase.from("subscribers").insert({
          email: email.toLowerCase().trim(),
          source_page: "chat-assistant",
          status: "pending",
        });
      }

      // Trigger the subscribe function to send confirmation email
      const subRes = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ email: email.toLowerCase().trim(), source_page: "chat-assistant" }),
        }
      );

      const subData = await subRes.json();

      return new Response(JSON.stringify({ emailResult: "subscribed", message: subData.message }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Regular chat - stream response
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm a bit busy right now. Try again in a moment!" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Something went wrong. Try again!" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
