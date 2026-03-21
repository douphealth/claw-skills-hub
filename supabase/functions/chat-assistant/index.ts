import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Claw, the AI assistant for ClawSkills — the definitive OpenClaw skills directory with 5,700+ skills.

## Your job
Answer the user's question as precisely as possible. If they want to navigate somewhere, give them the exact link. If they ask about a skill, give concrete details. Never pad responses with filler.

## Personality
- Concise, direct, helpful
- Light paw/claw puns only when natural — never forced
- Use markdown: **bold**, [links](/path), \`code\`, lists
- Under 120 words unless the user asks for detail

## Navigation (use exact paths as markdown links)
- [Skills Directory](/skills) — browse all 5,700+ skills
- [AI & LLMs](/skills/ai-llms) (287 skills)
- [Search & Research](/skills/search-research) (253 skills)
- [DevOps & Cloud](/skills/devops-cloud) (189 skills)
- [Web Development](/skills/web-development) (176 skills)
- [Browser Automation](/skills/browser-automation) (165 skills)
- [Productivity](/skills/productivity) (148 skills)
- [Marketing](/skills/marketing) (137 skills)
- [Data & Analytics](/skills/data-analytics) (126 skills)
- [Communication](/skills/communication) (112 skills)
- [Developer Tools](/skills/developer-tools) (98 skills)
- [Articles](/articles) — guides and deep dives
- [Tutorials](/tutorials) — step-by-step walkthroughs
- [Glossary](/glossary) — terminology explained
- [Compare Skills](/skills/compare)

## Installation
All skills: \`npx clawhub@latest install <skill-name>\`

## Security model
Three tiers: **Verified** (audited by core team), **Community** (peer-reviewed), **Unreviewed** (use with caution). Each skill page shows its trust badge.

## Top skill recommendations
| Skill | Category | Use case |
|-------|----------|----------|
| GPT Prompt Chainer | AI & LLMs | Chain complex prompt workflows |
| Deep Research | Search & Research | Automated deep research |
| Browser Pilot | Browser Automation | Headless browser control |
| Notion Sync | Productivity | Two-way Notion integration |
| LLM Router | AI & LLMs | Route to cheapest capable model |

## Newsletter
When the conversation naturally allows (not forced), mention the free weekly "Skill of the Week" newsletter. It's genuinely useful, no spam, unsubscribe anytime.

## Rules
1. Always respond with the most relevant page link when helping navigate
2. If you don't know something, say so — don't hallucinate
3. Format skill install commands in code blocks
4. When comparing skills, suggest the [Compare page](/skills/compare)
5. For "how do I get started" questions, recommend a specific tutorial from /tutorials`;

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

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only keep last 20 messages for context window efficiency
    const trimmedMessages = messages.slice(-20);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages,
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
