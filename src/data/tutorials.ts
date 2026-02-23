export interface Tutorial {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  heroDescription: string;
  sections: TutorialSection[];
}

export interface TutorialSection {
  heading: string;
  content: string;
  codeBlock?: { language: string; code: string };
}

export const tutorials: Tutorial[] = [
  {
    slug: "how-to-install-first-openclaw-skill",
    title: "How to Install Your First OpenClaw Skill (Step-by-Step)",
    metaTitle: "How to Install Your First OpenClaw Skill — Step-by-Step Guide (2026)",
    metaDescription: "Learn how to install your first OpenClaw skill with this beginner-friendly step-by-step guide. From setup to your first skill in under 5 minutes.",
    difficulty: "Beginner",
    readTime: "5 min read",
    publishedDate: "2026-02-18",
    updatedDate: "2026-02-23",
    heroDescription: "New to OpenClaw? This step-by-step guide will take you from zero to your first installed skill in under 5 minutes. No prior experience required.",
    sections: [
      {
        heading: "Prerequisites",
        content: "Before you begin, make sure you have the following installed on your system:\n\n- **Node.js 18+** — OpenClaw's CLI tool runs on Node.js. Download it from nodejs.org if you haven't already.\n- **A terminal** — Command Prompt on Windows, Terminal on macOS, or any Linux shell.\n- **OpenClaw installed** — If you haven't installed OpenClaw yet, run the command below first.",
        codeBlock: { language: "bash", code: "npm install -g openclaw@latest" },
      },
      {
        heading: "Step 1: Browse Available Skills",
        content: "The OpenClaw skills ecosystem has over 5,700 skills across 10 categories. You can browse them right here on ClawSkills, or use the CLI to search:\n\nThe search command returns a list of matching skills with their descriptions, ratings, and install commands. It's the fastest way to find what you need.",
        codeBlock: { language: "bash", code: "npx clawhub@latest search \"notion\"" },
      },
      {
        heading: "Step 2: Install a Skill",
        content: "Once you've found a skill you want, installing it is a single command. Let's install **Notion Sync** as our first skill — it's one of the most popular skills and a great starting point.\n\nThe installer will:\n1. Download the skill's markdown file\n2. Validate its security signature\n3. Place it in your OpenClaw skills directory\n4. Configure any required environment variables (it will prompt you)",
        codeBlock: { language: "bash", code: "npx clawhub@latest install notion-sync" },
      },
      {
        heading: "Step 3: Verify the Installation",
        content: "After installation, verify that the skill is loaded correctly by listing your installed skills:\n\nYou should see `notion-sync` in the list with a ✓ status indicating it's active and ready to use.",
        codeBlock: { language: "bash", code: "openclaw skills list" },
      },
      {
        heading: "Step 4: Use Your New Skill",
        content: "Now you can use the skill in your OpenClaw conversations. Simply mention what you want to do and OpenClaw will automatically invoke the appropriate skill:\n\nThe agent will use the Notion Sync skill to create the page in your workspace. You'll see the skill being invoked in the response, along with a link to the created page.",
        codeBlock: { language: "text", code: '> "Create a new page in my Notion workspace called \'Project Ideas\' with a table of project names and statuses"' },
      },
      {
        heading: "Next Steps",
        content: "Congratulations — you've installed and used your first OpenClaw skill! Here's what to explore next:\n\n- **Install more skills** — Check our Skills Directory for the full catalog\n- **Build a custom skill** — Read our tutorial on building skills from scratch\n- **Set up multi-agent workflows** — Learn how to share skills across agents\n- **Security best practices** — Review our security checklist before installing community skills\n\nThe OpenClaw ecosystem is growing fast. New skills are published daily, and the community is incredibly active on Discord and Telegram."
      },
    ],
  },
  {
    slug: "build-custom-openclaw-skill",
    title: "How to Build a Custom OpenClaw Skill from Scratch",
    metaTitle: "How to Build a Custom OpenClaw Skill from Scratch (2026 Guide)",
    metaDescription: "Learn how to build and publish your own OpenClaw skill from scratch. Complete tutorial with examples, best practices, and publishing instructions.",
    difficulty: "Intermediate",
    readTime: "12 min read",
    publishedDate: "2026-02-15",
    updatedDate: "2026-02-23",
    heroDescription: "OpenClaw skills are just markdown files — but well-crafted ones can turn a basic AI agent into a specialized powerhouse. Here's how to build your own from scratch.",
    sections: [
      {
        heading: "What is an OpenClaw Skill?",
        content: "At its core, an OpenClaw skill is a **markdown file** that teaches the AI agent how to use a specific tool, API, or workflow. Skills follow a structured format that includes:\n\n- **Description** — What the skill does and when to use it\n- **Instructions** — Step-by-step guidance for the AI agent\n- **Tool definitions** — API endpoints, CLI commands, or function signatures\n- **Examples** — Input/output examples that help the AI understand expected behavior\n- **Security constraints** — What the skill can and cannot do\n\nThis simplicity is what makes the OpenClaw ecosystem so powerful — anyone who can write markdown can create a skill."
      },
      {
        heading: "Step 1: Set Up Your Skill Project",
        content: "Start by creating a new directory for your skill and initializing it with the OpenClaw skill template:\n\nThis creates a `my-custom-skill/` directory with the standard skill file structure.",
        codeBlock: { language: "bash", code: "npx clawhub@latest create-skill my-custom-skill\ncd my-custom-skill" },
      },
      {
        heading: "Step 2: Define Your Skill's Metadata",
        content: "Open `skill.md` and start with the frontmatter metadata block. This tells OpenClaw (and the skills directory) everything it needs to know about your skill:",
        codeBlock: {
          language: "markdown",
          code: `---
name: My Custom Skill
slug: my-custom-skill
version: 1.0.0
author: your-username
category: productivity
description: A brief description of what your skill does
security: community
tags: [automation, workflow, custom]
---

# My Custom Skill

## Description
Explain what your skill does in 2-3 sentences. Be specific about
the problem it solves and who it's for.

## Instructions
When the user asks you to [specific action], follow these steps:
1. First, check if [prerequisite]
2. Then, call the [tool/API] with [parameters]
3. Format the response as [format]

## Tools
\\\`\\\`\\\`json
{
  "name": "my_tool",
  "description": "What this tool does",
  "parameters": {
    "input": { "type": "string", "required": true }
  }
}
\\\`\\\`\\\`

## Examples
**User:** "Do X with Y"
**Agent:** [Expected behavior and output]`,
        },
      },
      {
        heading: "Step 3: Write Clear Instructions",
        content: "The **Instructions** section is the most critical part of your skill. This is what the AI agent reads to understand how to use your skill. Follow these best practices:\n\n- **Be explicit** — Don't assume the AI knows context. Spell out every step.\n- **Use numbered steps** — Sequential instructions are easier for the AI to follow.\n- **Include error handling** — Tell the AI what to do when things go wrong.\n- **Add constraints** — Specify what the skill should NOT do (security boundaries).\n- **Give examples** — Input/output examples dramatically improve accuracy.\n\nThink of it as writing instructions for a very capable but very literal assistant."
      },
      {
        heading: "Step 4: Test Your Skill Locally",
        content: "Before publishing, test your skill locally with OpenClaw:\n\nThis loads your skill in a test environment where you can interact with it and verify it works as expected. Test edge cases, error scenarios, and various input formats.",
        codeBlock: { language: "bash", code: "openclaw test-skill ./skill.md" },
      },
      {
        heading: "Step 5: Publish Your Skill",
        content: "When you're satisfied with your skill, publish it to the OpenClaw skills registry:\n\nThis will:\n1. Validate your skill's format and metadata\n2. Run automated security checks\n3. Submit it for community review\n4. Make it available via `clawhub install your-skill-slug`\n\nCommunity-submitted skills start with a \"community\" security status and can be promoted to \"verified\" after review by the OpenClaw security team.",
        codeBlock: { language: "bash", code: "npx clawhub@latest publish" },
      },
      {
        heading: "Best Practices for High-Quality Skills",
        content: "The difference between a mediocre skill and a great one comes down to craft:\n\n1. **Single responsibility** — Each skill should do one thing well. Don't create Swiss Army knife skills.\n2. **Comprehensive examples** — Include at least 5 input/output examples covering different scenarios.\n3. **Version your skill** — Use semantic versioning and document breaking changes.\n4. **Security first** — Request only the permissions you need. Document what data the skill accesses.\n5. **Maintain it** — Respond to community issues and update when APIs change.\n6. **Write a great description** — This is your skill's first impression in the directory. Make it count."
      },
    ],
  },
  {
    slug: "openclaw-skill-security-checklist",
    title: "OpenClaw Skill Security: What to Check Before Installing",
    metaTitle: "OpenClaw Skill Security Checklist — Stay Safe Installing Skills (2026)",
    metaDescription: "Essential security checklist before installing any OpenClaw skill. Learn how to evaluate community skills, check permissions, and protect your data.",
    difficulty: "All Levels",
    readTime: "6 min read",
    publishedDate: "2026-02-12",
    updatedDate: "2026-02-23",
    heroDescription: "OpenClaw skills are powerful — but installing the wrong one can expose your data. Here's the security checklist every user should follow before installing any skill.",
    sections: [
      {
        heading: "Understanding Security Levels",
        content: "Every OpenClaw skill has one of three security statuses:\n\n- **🟢 Verified** — Audited by the OpenClaw security team. These skills have been reviewed for malicious behavior, data leaks, and permission overreach. Safest to install.\n- **🟡 Community** — Published by community members and not yet audited. These skills are generally safe but haven't been formally reviewed. Use with moderate caution.\n- **🔴 Unreviewed** — Newly published or flagged for review. Exercise caution and inspect the skill file manually before installing.\n\nAlways prefer verified skills when available. If you must use a community skill, follow the checklist below."
      },
      {
        heading: "The 7-Point Security Checklist",
        content: "Before installing any non-verified skill, check these seven things:\n\n**1. Read the skill file** — Skills are markdown. Open the `.md` file and read the instructions section. Look for anything suspicious like unexpected API calls or data exfiltration.\n\n**2. Check the author** — Who published this skill? Do they have other verified skills? A reputable author is a strong trust signal.\n\n**3. Review permissions** — What tools/APIs does the skill access? Does it need access to your file system, browser, or external services? Ensure permissions match the stated purpose.\n\n**4. Look for data handling** — Does the skill send data to external servers? Check for URLs in the tool definitions that aren't from the expected service.\n\n**5. Check community feedback** — Look at the skill's rating and reviews on the directory. Low ratings or security warnings are red flags.\n\n**6. Test in sandbox first** — Use OpenClaw's sandbox mode to test the skill in an isolated environment before giving it access to your real data.\n\n**7. Keep skills updated** — Outdated skills may have unpatched vulnerabilities. Enable auto-updates or check regularly."
      },
      {
        heading: "How to Inspect a Skill File",
        content: "You can inspect any skill's source before installing it:\n\nThis downloads and displays the skill's markdown file without installing it. Read through the instructions, tool definitions, and examples carefully. Look for:\n- External URLs you don't recognize\n- File system access beyond what's needed\n- Instructions to disable security features\n- Requests for credentials beyond the stated service",
        codeBlock: { language: "bash", code: "npx clawhub@latest inspect notion-sync" },
      },
      {
        heading: "Using Sandbox Mode",
        content: "OpenClaw's sandbox mode runs skills in an isolated environment with no access to your real data:\n\nIn sandbox mode:\n- File system access is limited to a temporary directory\n- API calls are logged but not executed against real services\n- Credential access is blocked\n- You can see exactly what the skill would do without any risk",
        codeBlock: { language: "bash", code: "openclaw --sandbox\n> \"Use the notion-sync skill to create a test page\"" },
      },
      {
        heading: "Reporting Suspicious Skills",
        content: "If you find a skill that seems malicious or has a security vulnerability, report it immediately:\n\nThe OpenClaw security team reviews reports within 24 hours and can remove dangerous skills from the registry. You can also report issues directly on the skill's GitHub page or in the OpenClaw Discord #security channel.",
        codeBlock: { language: "bash", code: "npx clawhub@latest report suspicious-skill-name --reason \"description of the issue\"" },
      },
    ],
  },
  {
    slug: "openclaw-take-the-wheel-long-form-writing",
    title: "How to Use OpenClaw's 'Take the Wheel' Skill for Long-Form Writing",
    metaTitle: "How to Use OpenClaw Take the Wheel for Long-Form Writing (2026)",
    metaDescription: "Master the Take the Wheel skill for autonomous long-form writing. Learn how to configure it for blog posts, articles, and documentation.",
    difficulty: "Intermediate",
    readTime: "8 min read",
    publishedDate: "2026-02-10",
    updatedDate: "2026-02-23",
    heroDescription: "Take the Wheel is OpenClaw's most popular writing skill. Learn how to configure it for maximum quality and let it handle everything from research to final draft.",
    sections: [
      {
        heading: "What Makes Take the Wheel Different",
        content: "Unlike simple AI writing tools that generate text from a prompt, Take the Wheel operates **autonomously**. You give it a topic and constraints, and it:\n\n1. **Researches** the topic using available search skills\n2. **Creates an outline** based on top-performing content in the niche\n3. **Writes the first draft** section by section\n4. **Self-critiques** each section and identifies weaknesses\n5. **Revises** until it meets quality thresholds\n6. **Formats** the final output for your target platform\n\nThis multi-step process produces dramatically better content than single-pass generation. In our testing, Take the Wheel articles scored 40% higher on content quality benchmarks compared to single-prompt alternatives."
      },
      {
        heading: "Installation & Setup",
        content: "Install Take the Wheel and its recommended companion skills:\n\nThe Deep Research skill is optional but highly recommended — it gives Take the Wheel access to real-time research capabilities, which significantly improves factual accuracy.",
        codeBlock: { language: "bash", code: "npx clawhub@latest install take-the-wheel\nnpx clawhub@latest install deep-research  # recommended companion" },
      },
      {
        heading: "Basic Usage: Your First Article",
        content: "The simplest way to use Take the Wheel is with a topic prompt:\n\nThis will generate a complete article with an introduction, multiple sections, examples, and a conclusion. The default output is markdown, ready to paste into any CMS.",
        codeBlock: { language: "text", code: '> "Take the wheel and write a comprehensive guide about setting up a home lab for AI development. Target audience: intermediate developers. Length: 2000-2500 words. Tone: technical but approachable."' },
      },
      {
        heading: "Advanced Configuration: Style Guides",
        content: "For consistent brand voice, you can provide a style guide that Take the Wheel will follow for all content:\n\nCreate a style guide file and reference it in your prompts. The skill will adapt its writing to match your specified voice, formatting preferences, and content rules.",
        codeBlock: {
          language: "markdown",
          code: `<!-- style-guide.md -->
# Brand Voice Guide

## Tone
- Professional but conversational
- Use "you" to address the reader directly
- Avoid jargon; explain technical terms on first use

## Formatting
- Use H2 for main sections, H3 for subsections
- Include code blocks for any commands or configurations
- Add a TL;DR at the top of every article
- Use bullet points for lists of 3+ items

## Content Rules
- Every claim must be supported with data or a source
- Include at least one real-world example per section
- End with actionable next steps, not just a summary`,
        },
      },
      {
        heading: "Chaining with Other Skills",
        content: "Take the Wheel becomes even more powerful when chained with other skills:\n\n- **Deep Research → Take the Wheel** — Research first, then write with real data and citations\n- **Take the Wheel → Prompt Optimizer** — Write the draft, then optimize the output for specific LLM post-processing\n- **Take the Wheel → Browser Pilot** — Write and automatically publish to your CMS\n- **GA4 Analytics → Take the Wheel** — Generate data-driven content based on your analytics insights\n\nUse GPT Prompt Chainer to build these multi-step pipelines into reusable workflows."
      },
      {
        heading: "Tips for Best Results",
        content: "After extensive testing, here are our top tips for getting the best output from Take the Wheel:\n\n1. **Be specific about your audience** — 'developers' is vague; 'senior backend engineers who work with Python' is specific and produces better content.\n2. **Set word count ranges** — Give a range (2000-2500) rather than an exact number for more natural writing.\n3. **Provide examples of content you like** — Reference URLs or paste excerpts of articles whose style you want to emulate.\n4. **Use the revision flag** — Add `--revisions 3` to force additional self-critique cycles for higher quality.\n5. **Review and iterate** — Take the Wheel's first output is good; asking it to improve specific sections makes it great."
      },
    ],
  },
  {
    slug: "openclaw-multi-agent-shared-skills-setup",
    title: "OpenClaw Multi-Agent Setup: Using Shared vs Per-Agent Skills",
    metaTitle: "OpenClaw Multi-Agent Setup — Shared vs Per-Agent Skills Guide (2026)",
    metaDescription: "Learn how to configure shared and per-agent skills in OpenClaw multi-agent environments. Complete setup guide with best practices.",
    difficulty: "Advanced",
    readTime: "10 min read",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-23",
    heroDescription: "Running multiple OpenClaw agents? Learn how to share skills across agents, isolate sensitive skills, and build efficient multi-agent architectures.",
    sections: [
      {
        heading: "Why Multi-Agent?",
        content: "As your OpenClaw usage grows, you'll likely want specialized agents for different tasks: one for development workflows, another for content creation, and perhaps a third for data analysis. Multi-agent setups offer several advantages:\n\n- **Specialization** — Each agent has skills tailored to its domain\n- **Security isolation** — Sensitive skills (like payment processing) can be restricted to specific agents\n- **Performance** — Agents with fewer skills load faster and make better tool selection decisions\n- **Team collaboration** — Different team members can have personalized agents while sharing common skills\n\nOpenClaw supports two skill modes: **shared** (available to all agents) and **per-agent** (restricted to specific agents)."
      },
      {
        heading: "Setting Up Multiple Agents",
        content: "First, create your agent configurations:\n\nEach agent gets its own configuration file in the `.openclaw/agents/` directory. You can create as many agents as you need.",
        codeBlock: {
          language: "bash",
          code: "openclaw agent create dev-agent --description \"Development workflow agent\"\nopenclaw agent create content-agent --description \"Content creation agent\"\nopenclaw agent create data-agent --description \"Data analysis agent\"",
        },
      },
      {
        heading: "Shared vs Per-Agent Skills",
        content: "**Shared skills** are installed globally and available to all agents:\n\n**Per-agent skills** are installed only for a specific agent:\n\nUse shared skills for common utilities (search, file management) and per-agent skills for domain-specific tools (GitHub for the dev agent, CMS tools for the content agent).",
        codeBlock: {
          language: "bash",
          code: "# Shared skill — all agents can use it\nnpx clawhub@latest install deep-research --shared\n\n# Per-agent skill — only dev-agent can use it\nnpx clawhub@latest install github-manager --agent dev-agent\n\n# Per-agent skill — only content-agent can use it\nnpx clawhub@latest install take-the-wheel --agent content-agent",
        },
      },
      {
        heading: "Security Isolation",
        content: "One of the most important reasons for per-agent skills is security isolation. Skills that access sensitive data or services should be restricted:\n\nYou can also set up **approval workflows** where certain skill invocations require human approval before executing:",
        codeBlock: {
          language: "yaml",
          code: "# .openclaw/agents/dev-agent/config.yaml\nname: dev-agent\nskills:\n  shared: true  # inherit shared skills\n  private:\n    - github-manager\n    - vercel-deploy\n  blocked:\n    - file-system-write  # prevent accidental file modifications\n  require_approval:\n    - vercel-deploy  # require human approval before deploying",
        },
      },
      {
        heading: "Inter-Agent Communication",
        content: "Agents can delegate tasks to each other using the `@agent` syntax:\n\nThis enables powerful workflows where a coordinator agent can orchestrate specialized agents. For example, a project manager agent could create tasks for the dev agent and content briefs for the content agent, all from a single conversation.",
        codeBlock: {
          language: "text",
          code: '> "@dev-agent Create a PR that fixes the login bug described in Linear issue DEV-1234"\n> "@content-agent Write a changelog entry for the v2.5 release based on the last 10 merged PRs"',
        },
      },
      {
        heading: "Best Practices for Multi-Agent Architectures",
        content: "After working with dozens of teams running multi-agent setups, here are the patterns that work best:\n\n1. **Start with 2-3 agents max** — Don't over-engineer. Add agents as you discover genuine specialization needs.\n2. **Share utility skills broadly** — Search, research, and communication skills should be shared.\n3. **Isolate write-access skills** — Skills that modify external services should be per-agent with approval workflows.\n4. **Use descriptive agent names** — `dev-agent` is better than `agent-1`. It helps the AI understand the agent's role.\n5. **Review shared skill access quarterly** — As your team grows, regularly audit which skills are shared vs. isolated.\n6. **Log everything** — Enable comprehensive logging for multi-agent setups to debug delegation failures and unexpected behavior."
      },
    ],
  },
];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.slug === slug);
}
