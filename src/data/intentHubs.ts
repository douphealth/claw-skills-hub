import { skills, type Skill } from "./skills";

export interface IntentHub {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  keyFacts: string[];
  categoryFilters?: string[];
  skillSlugs?: string[];
  bestFor: string;
  icon: string;
  faqs: { question: string; answer: string }[];
}

export const intentHubs: IntentHub[] = [
  {
    slug: "best-openclaw-skills-for-coding",
    title: "Best OpenClaw Skills for Coding",
    seoTitle: "Best OpenClaw Skills for Coding in 2026: Tested Picks by Workflow",
    metaDescription: "Discover the top 10 OpenClaw skills for coding — code generation, test automation, refactoring, and more. Verified picks with install commands.",
    h1: "Best OpenClaw Skills for Coding in 2026",
    directAnswer: "The best OpenClaw coding skills are Code Reviewer, Test Generator, and GPT Prompt Chainer. They automate code review, generate tests from specs, and chain complex dev workflows — all installable in one command via ClawHub.",
    keyFacts: [
      "10+ verified coding skills available",
      "One-command install via npx clawhub@latest",
      "Works with VS Code, JetBrains, and terminal workflows",
      "Compatible with macOS, Linux, and Windows WSL",
    ],
    categoryFilters: ["coding-agents", "ai-llms"],
    bestFor: "Developers who want to automate repetitive coding tasks, improve code quality, and accelerate development cycles.",
    icon: "Code2",
    faqs: [
      { question: "What are the best OpenClaw skills for coding?", answer: "The top picks are Code Reviewer (automated PR reviews), Test Generator (spec-to-test automation), GPT Prompt Chainer (multi-step AI workflows), and Prompt Optimizer (better AI outputs). All are verified and free to install." },
      { question: "Can OpenClaw skills replace my IDE?", answer: "No — they enhance your existing IDE. Skills integrate with VS Code, JetBrains, and terminal workflows to add AI-powered capabilities like code review, test generation, and refactoring." },
      { question: "Are coding skills safe to use on production code?", answer: "Verified coding skills have passed security audits. They run locally and don't send code to external servers unless you configure an LLM provider. Always review permissions before installing." },
    ],
  },
  {
    slug: "best-openclaw-skills-for-productivity",
    title: "Best OpenClaw Skills for Productivity",
    seoTitle: "Best OpenClaw Skills for Productivity: Automate Tasks & Save Hours",
    metaDescription: "Top OpenClaw productivity skills for task management, calendar sync, note-taking, and workflow automation. Free, verified, one-click install.",
    h1: "Best OpenClaw Skills for Productivity",
    directAnswer: "The best OpenClaw productivity skills are Notion Sync, Calendar Manager, and Task Orchestrator. They automate daily workflows, sync your tools, and manage tasks with AI — saving 5+ hours per week for most users.",
    keyFacts: [
      "15+ productivity skills across task management and automation",
      "Integrates with Notion, Google Calendar, Todoist, and more",
      "Most skills are verified and free to use",
      "Average user saves 5+ hours per week",
    ],
    categoryFilters: ["productivity", "notes-pkm"],
    bestFor: "Knowledge workers, managers, and freelancers who want to automate repetitive tasks and streamline daily workflows.",
    icon: "ListChecks",
    faqs: [
      { question: "What OpenClaw skills help with productivity?", answer: "Top picks include Notion Sync (bi-directional sync), Calendar Manager (smart scheduling), Task Orchestrator (AI task prioritization), and Email Drafter (context-aware email composition)." },
      { question: "Do productivity skills work with my existing tools?", answer: "Yes — most integrate with popular tools like Notion, Google Workspace, Todoist, Slack, and Microsoft 365 via official APIs." },
    ],
  },
  {
    slug: "best-openclaw-skills-for-beginners",
    title: "Best OpenClaw Skills for Beginners",
    seoTitle: "OpenClaw Skills for Beginners: Start Here (2026 Guide)",
    metaDescription: "New to OpenClaw? These 7 beginner-friendly skills are easy to install, well-documented, and verified safe. Perfect starting point.",
    h1: "OpenClaw Skills for Beginners: Where to Start",
    directAnswer: "Start with GPT Prompt Chainer, Deep Research, Browser Pilot, Notion Sync, and LLM Router. These five verified skills cover the most common AI agent use cases, have excellent documentation, and are safe to install on any system.",
    keyFacts: [
      "All recommended skills are security-verified",
      "Average setup time: under 2 minutes per skill",
      "No coding required for basic usage",
      "Works on macOS, Linux, and Windows WSL",
    ],
    bestFor: "First-time OpenClaw users who want a safe, guided introduction to AI agent skills.",
    icon: "GraduationCap",
    faqs: [
      { question: "What is the easiest OpenClaw skill to start with?", answer: "GPT Prompt Chainer is the easiest to start with. Install it with one command, and it immediately lets you build multi-step AI workflows without any configuration." },
      { question: "Are beginner skills safe?", answer: "All skills on this list are verified by the ClawSkills security team. They've passed audits for permission scoping, data handling, and dependency safety." },
      { question: "Do I need to know how to code?", answer: "No. Most beginner skills work through natural language instructions. You describe what you want, and the skill handles the technical execution." },
    ],
  },
  {
    slug: "safe-openclaw-skills",
    title: "Safest OpenClaw Skills to Install",
    seoTitle: "Safest OpenClaw Skills: Verified & Audited Picks for 2026",
    metaDescription: "Security-verified OpenClaw skills with full audit reports. Avoid risky installs — browse only verified, safe skills with transparent trust scores.",
    h1: "Safest OpenClaw Skills to Install in 2026",
    directAnswer: "The safest OpenClaw skills are those with 'Verified' status — meaning they've passed the ClawSkills security audit covering permission scope, data handling, prompt injection resistance, and dependency safety. Currently 40+ skills carry verified status.",
    keyFacts: [
      "40+ skills have passed full security audits",
      "Three-tier trust model: Verified, Community, Unreviewed",
      "All verified skills use minimal permission scoping",
      "No verified skill has had a security incident",
    ],
    bestFor: "Security-conscious developers, enterprise teams, and anyone who wants zero-risk AI skill installation.",
    icon: "ShieldCheck",
    faqs: [
      { question: "How do I know if an OpenClaw skill is safe?", answer: "Check the security badge on each skill page. Verified skills have passed a full security audit. Community skills have peer reviews. Unreviewed skills should be audited before production use." },
      { question: "What does the OpenClaw security audit cover?", answer: "The audit checks permission scoping (system.run, file access, network), data handling practices, dependency safety, prompt injection resistance, and code quality." },
      { question: "Can I audit skills myself?", answer: "Yes. Every skill's SKILL.md file is open-source. Review the permissions section, check which tools it requests, and test in a sandbox before using in production." },
    ],
  },
  {
    slug: "best-openclaw-skills-for-research",
    title: "Best OpenClaw Skills for Research",
    seoTitle: "Best OpenClaw Skills for Research & Knowledge Synthesis (2026)",
    metaDescription: "Top OpenClaw research skills for deep web search, academic analysis, and knowledge synthesis. Verified, free, instant install.",
    h1: "Best OpenClaw Skills for Research & Knowledge Synthesis",
    directAnswer: "The best research skills are Deep Research (multi-source synthesis), Scholar Search (academic papers), and Web Scraper Pro (structured data extraction). They turn hours of manual research into minutes of AI-powered analysis.",
    keyFacts: [
      "8+ research-focused skills available",
      "Deep Research can synthesize 20+ sources per query",
      "Academic, web, and data extraction workflows covered",
      "All top picks are verified safe",
    ],
    categoryFilters: ["search-research"],
    bestFor: "Researchers, analysts, journalists, and students who need to gather and synthesize information from multiple sources quickly.",
    icon: "Search",
    faqs: [
      { question: "Can OpenClaw skills replace manual research?", answer: "For many use cases, yes. Deep Research can synthesize findings from 20+ sources in minutes. However, critical research still benefits from human verification of AI-gathered results." },
      { question: "Do research skills work with academic databases?", answer: "Scholar Search integrates with Google Scholar, Semantic Scholar, and arXiv. Other skills can scrape any publicly accessible research database." },
    ],
  },
  {
    slug: "best-openclaw-skills-for-marketing",
    title: "Best OpenClaw Skills for Marketing",
    seoTitle: "Best OpenClaw Skills for Marketing & Sales in 2026",
    metaDescription: "Top OpenClaw marketing skills for SEO, email campaigns, social media, and sales pipelines. AI-powered automation for growth teams.",
    h1: "Best OpenClaw Skills for Marketing & Sales",
    directAnswer: "The best marketing skills are SEO Analyzer (technical SEO audits), Email Drafter (AI-powered campaigns), Social Publisher (multi-platform posting), and Lead Scorer (AI lead qualification). They automate 80% of repetitive marketing tasks.",
    keyFacts: [
      "12+ marketing and sales skills available",
      "Covers SEO, email, social media, and lead management",
      "Integrates with HubSpot, Mailchimp, and Google Analytics",
      "Most skills are verified or community-reviewed",
    ],
    categoryFilters: ["marketing-sales"],
    bestFor: "Marketing teams, growth hackers, solopreneurs, and sales teams who want to automate campaigns and scale outreach.",
    icon: "Megaphone",
    faqs: [
      { question: "Can OpenClaw skills help with SEO?", answer: "Yes. SEO Analyzer performs technical audits, keyword analysis, and content optimization. Combined with Deep Research, you can automate competitive analysis and content gap identification." },
      { question: "Do marketing skills integrate with my CRM?", answer: "Lead Scorer and CRM Sync skills integrate with HubSpot, Salesforce, and Pipedrive. Email skills work with Mailchimp, SendGrid, and Gmail." },
    ],
  },
];

export function getHubBySlug(slug: string): IntentHub | undefined {
  return intentHubs.find((h) => h.slug === slug);
}

export function getHubSkills(hub: IntentHub): Skill[] {
  if (hub.skillSlugs?.length) {
    return hub.skillSlugs.map((s) => skills.find((sk) => sk.slug === s)).filter(Boolean) as Skill[];
  }
  if (hub.categoryFilters?.length) {
    return skills.filter((s) => hub.categoryFilters!.includes(s.categorySlug));
  }
  return [];
}
