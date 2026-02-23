export interface Skill {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription: string;
  installCmd: string;
  rating: number;
  securityStatus: "verified" | "community" | "unreviewed";
  useCases: string[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  author: string;
  version: string;
  lastUpdated: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
  color: string;
  description: string;
}

export const categories: Category[] = [
  { name: "AI & LLMs", slug: "ai-llms", count: 287, icon: "Brain", color: "174 100% 45%", description: "Skills for integrating large language models, prompt engineering, and AI-powered automation into your workflows." },
  { name: "Search & Research", slug: "search-research", count: 253, icon: "Search", color: "200 90% 50%", description: "Deep research, web scraping, academic search, and knowledge synthesis skills." },
  { name: "Web & Frontend Dev", slug: "web-frontend", count: 202, icon: "Globe", color: "260 80% 60%", description: "Build, deploy, and manage web applications with frontend framework integrations." },
  { name: "DevOps & Cloud", slug: "devops-cloud", count: 212, icon: "Cloud", color: "30 95% 55%", description: "Infrastructure management, CI/CD, container orchestration, and cloud provider skills." },
  { name: "Browser & Automation", slug: "browser-automation", count: 139, icon: "Monitor", color: "340 80% 55%", description: "Browser control, web scraping, form filling, and UI testing automation." },
  { name: "Productivity & Tasks", slug: "productivity", count: 135, icon: "ListChecks", color: "140 70% 45%", description: "Task management, calendar sync, note-taking, and workflow optimization skills." },
  { name: "Marketing & Sales", slug: "marketing-sales", count: 143, icon: "Megaphone", color: "50 90% 55%", description: "Email campaigns, social media management, analytics, and sales pipeline skills." },
  { name: "Coding Agents & IDEs", slug: "coding-agents", count: 133, icon: "Code2", color: "210 90% 55%", description: "Code generation, refactoring, IDE integrations, and developer tooling skills." },
  { name: "Notes & PKM", slug: "notes-pkm", count: 100, icon: "BookOpen", color: "280 70% 55%", description: "Personal knowledge management, note-taking apps, and second brain tools." },
  { name: "Health & Fitness", slug: "health-fitness", count: 55, icon: "HeartPulse", color: "0 80% 55%", description: "Health tracking, workout planning, nutrition analysis, and wellness automation." },
];

// Sample skills data — in production this would come from Supabase
export const skills: Skill[] = [
  // AI & LLMs
  {
    name: "GPT Prompt Chainer",
    slug: "gpt-prompt-chainer",
    category: "AI & LLMs",
    categorySlug: "ai-llms",
    description: "Chain multiple GPT prompts together with context passing for complex multi-step AI workflows.",
    longDescription: "GPT Prompt Chainer is a powerful skill that enables you to build sophisticated AI pipelines by chaining multiple prompts together. Each step in the chain receives the output of the previous step as context, allowing you to decompose complex tasks into manageable sub-tasks. Perfect for research workflows, content pipelines, and data transformation tasks that require multiple AI reasoning steps.",
    installCmd: "npx clawhub@latest install gpt-prompt-chainer",
    rating: 4.8,
    securityStatus: "verified",
    useCases: [
      "Build multi-step content generation pipelines",
      "Create research workflows that synthesize multiple sources",
      "Automate data extraction and transformation chains",
      "Design conversational flows with branching logic",
    ],
    faqs: [
      { question: "What does GPT Prompt Chainer do?", answer: "It allows you to chain multiple AI prompts together, passing context from one step to the next. This lets you break complex tasks into smaller, more reliable steps." },
      { question: "Is GPT Prompt Chainer safe to install?", answer: "Yes — it's verified by the OpenClaw security team. It only accesses the AI models you configure and doesn't store any data externally." },
      { question: "Does it work with models other than GPT?", answer: "Yes, it works with any OpenAI-compatible API including Claude, Gemini, and local models via Ollama." },
    ],
    relatedSlugs: ["llm-router", "prompt-optimizer", "context-window-manager"],
    author: "openclaw-core",
    version: "2.4.1",
    lastUpdated: "2026-02-15",
  },
  {
    name: "LLM Router",
    slug: "llm-router",
    category: "AI & LLMs",
    categorySlug: "ai-llms",
    description: "Automatically route prompts to the best model based on task complexity, cost, and latency requirements.",
    longDescription: "LLM Router intelligently routes your AI requests to the most appropriate model based on the task at hand. It analyzes prompt complexity, your cost preferences, and latency requirements to choose between models like GPT-5, Claude 4, Gemini 2.5, or local models. Save up to 70% on API costs while maintaining quality by using cheaper models for simple tasks.",
    installCmd: "npx clawhub@latest install llm-router",
    rating: 4.9,
    securityStatus: "verified",
    useCases: [
      "Reduce AI API costs by routing simple tasks to cheaper models",
      "Ensure low-latency responses by using fast models for real-time features",
      "Automatically fall back to alternative models during outages",
      "A/B test different models for quality comparison",
    ],
    faqs: [
      { question: "What does LLM Router do?", answer: "It analyzes each prompt and routes it to the most cost-effective and capable model based on rules you define." },
      { question: "Which models does it support?", answer: "OpenAI, Anthropic, Google, Mistral, Cohere, and any OpenAI-compatible endpoint including Ollama." },
    ],
    relatedSlugs: ["gpt-prompt-chainer", "prompt-optimizer", "token-counter"],
    author: "openclaw-core",
    version: "3.1.0",
    lastUpdated: "2026-02-20",
  },
  {
    name: "Prompt Optimizer",
    slug: "prompt-optimizer",
    category: "AI & LLMs",
    categorySlug: "ai-llms",
    description: "Automatically optimize and compress prompts for better results and lower token costs.",
    longDescription: "Prompt Optimizer uses advanced techniques to refine your prompts before sending them to AI models. It removes redundancy, clarifies instructions, adds proven prompt engineering patterns, and compresses context to fit within token limits — all while improving output quality. Studies show optimized prompts produce 23% better results on average.",
    installCmd: "npx clawhub@latest install prompt-optimizer",
    rating: 4.6,
    securityStatus: "verified",
    useCases: [
      "Reduce token usage by up to 40% with smart compression",
      "Improve AI output quality with proven prompt patterns",
      "Automatically format prompts for specific model strengths",
      "Batch-optimize prompts for production pipelines",
    ],
    faqs: [
      { question: "Will Prompt Optimizer change my prompt's meaning?", answer: "No — it preserves intent while removing redundancy and adding clarity. You can review changes before sending." },
      { question: "Does it work offline?", answer: "The basic compression works offline. Advanced optimization requires an API connection for analysis." },
    ],
    relatedSlugs: ["gpt-prompt-chainer", "llm-router", "token-counter"],
    author: "prompt-lab",
    version: "1.8.3",
    lastUpdated: "2026-02-10",
  },
  // Search & Research
  {
    name: "Deep Research",
    slug: "deep-research",
    category: "Search & Research",
    categorySlug: "search-research",
    description: "Conduct multi-source research with automatic synthesis, citation tracking, and fact verification.",
    longDescription: "Deep Research transforms OpenClaw into a powerful research assistant. It searches across academic databases, news sources, and the open web simultaneously, then synthesizes findings into coherent reports with proper citations. Built-in fact verification cross-references claims across sources, and the citation tracker ensures you never lose a reference.",
    installCmd: "npx clawhub@latest install deep-research",
    rating: 4.9,
    securityStatus: "verified",
    useCases: [
      "Academic literature reviews with automatic citation formatting",
      "Market research and competitive analysis reports",
      "Fact-checking and source verification for journalism",
      "Technical documentation research across multiple codebases",
    ],
    faqs: [
      { question: "What sources does Deep Research access?", answer: "It searches Google Scholar, Semantic Scholar, arXiv, PubMed, news APIs, and the general web. You can configure additional sources." },
      { question: "How accurate is the fact verification?", answer: "It cross-references claims across at least 3 independent sources and flags confidence levels. It's a tool to assist verification, not replace human judgment." },
    ],
    relatedSlugs: ["web-scraper-pro", "academic-search", "news-aggregator"],
    author: "openclaw-core",
    version: "4.0.2",
    lastUpdated: "2026-02-18",
  },
  {
    name: "Web Scraper Pro",
    slug: "web-scraper-pro",
    category: "Search & Research",
    categorySlug: "search-research",
    description: "Extract structured data from any website with intelligent content detection and anti-bot bypass.",
    longDescription: "Web Scraper Pro is an advanced web scraping skill that uses AI to intelligently identify and extract the content you need. It handles JavaScript-rendered pages, bypasses common anti-bot measures ethically, and outputs clean structured data in JSON, CSV, or Markdown formats. Perfect for data collection, price monitoring, and content aggregation.",
    installCmd: "npx clawhub@latest install web-scraper-pro",
    rating: 4.7,
    securityStatus: "community",
    useCases: [
      "Extract product data and pricing from e-commerce sites",
      "Monitor competitor content and pricing changes",
      "Aggregate news and blog content for analysis",
      "Build datasets for machine learning from web sources",
    ],
    faqs: [
      { question: "Does Web Scraper Pro respect robots.txt?", answer: "Yes, by default it respects robots.txt and rate limits. You can configure aggressive mode at your own risk." },
      { question: "Can it handle JavaScript-heavy sites?", answer: "Yes, it uses a headless browser engine for full JavaScript rendering before extraction." },
    ],
    relatedSlugs: ["deep-research", "news-aggregator", "data-pipeline"],
    author: "scrape-labs",
    version: "2.9.1",
    lastUpdated: "2026-02-12",
  },
  // Productivity
  {
    name: "Notion Sync",
    slug: "notion-sync",
    category: "Productivity & Tasks",
    categorySlug: "productivity",
    description: "Bi-directional sync between OpenClaw and Notion — manage databases, pages, and tasks seamlessly.",
    longDescription: "Notion Sync creates a seamless bridge between OpenClaw and your Notion workspace. It enables bi-directional synchronization of databases, pages, and tasks. Use natural language to create, update, and query your Notion content. Perfect for teams that use Notion as their central knowledge base and want to automate workflows around it.",
    installCmd: "npx clawhub@latest install notion-sync",
    rating: 4.8,
    securityStatus: "verified",
    useCases: [
      "Create and update Notion pages using natural language",
      "Sync task lists between OpenClaw agents and Notion databases",
      "Auto-generate meeting notes and push to Notion",
      "Query Notion databases and build reports",
    ],
    faqs: [
      { question: "Does Notion Sync require a Notion API key?", answer: "Yes, you need to create a Notion integration and provide the API key during setup. A step-by-step guide is included." },
      { question: "Does it support Notion databases?", answer: "Yes — full CRUD operations on databases including filtering, sorting, and relation properties." },
    ],
    relatedSlugs: ["linear-integration", "todoist-sync", "calendar-manager"],
    author: "openclaw-core",
    version: "3.2.0",
    lastUpdated: "2026-02-19",
  },
  {
    name: "Linear Integration",
    slug: "linear-integration",
    category: "Productivity & Tasks",
    categorySlug: "productivity",
    description: "Full Linear project management integration — create issues, manage sprints, and track progress with AI.",
    longDescription: "Linear Integration brings full project management capabilities to OpenClaw. Create and manage issues, plan sprints, track cycle progress, and generate status reports — all through natural language commands. The AI understands your team's workflow and can automatically triage, label, and assign incoming issues based on learned patterns.",
    installCmd: "npx clawhub@latest install linear-integration",
    rating: 4.7,
    securityStatus: "verified",
    useCases: [
      "Create and assign Linear issues from chat or other tools",
      "Auto-triage incoming bug reports based on content analysis",
      "Generate weekly sprint summaries and progress reports",
      "Sync Linear issues with GitHub PRs and deployments",
    ],
    faqs: [
      { question: "What Linear permissions does it need?", answer: "It needs read/write access to issues, projects, and cycles. Admin access is optional but enables team management features." },
      { question: "Can it auto-assign issues?", answer: "Yes — it learns from your team's assignment patterns and can auto-assign based on issue content and team member expertise." },
    ],
    relatedSlugs: ["notion-sync", "github-manager", "slack-connector"],
    author: "devtools-lab",
    version: "2.1.4",
    lastUpdated: "2026-02-14",
  },
  // DevOps & Cloud
  {
    name: "Vercel Deploy",
    slug: "vercel-deploy",
    category: "DevOps & Cloud",
    categorySlug: "devops-cloud",
    description: "Deploy, manage, and monitor Vercel projects directly from OpenClaw with zero-config deployments.",
    longDescription: "Vercel Deploy gives OpenClaw full control over your Vercel deployments. Trigger builds, manage environment variables, rollback to previous deployments, and monitor performance metrics — all through natural language. It integrates with Git workflows to enable smart deployment strategies like preview deploys for PRs and automatic production deploys on merge.",
    installCmd: "npx clawhub@latest install vercel-deploy",
    rating: 4.6,
    securityStatus: "verified",
    useCases: [
      "Deploy to Vercel with a single command from any conversation",
      "Manage environment variables across preview and production",
      "Auto-deploy previews for pull requests with comments",
      "Monitor deployment status and Core Web Vitals",
    ],
    faqs: [
      { question: "Does it support monorepo deployments?", answer: "Yes — you can target specific projects within a monorepo and configure independent build settings." },
      { question: "Can it roll back deployments?", answer: "Yes, instant rollback to any previous deployment with one command." },
    ],
    relatedSlugs: ["github-manager", "docker-compose", "cloudflare-worker"],
    author: "deploy-tools",
    version: "1.9.0",
    lastUpdated: "2026-02-17",
  },
  // Marketing
  {
    name: "GA4 Analytics",
    slug: "ga4-analytics",
    category: "Marketing & Sales",
    categorySlug: "marketing-sales",
    description: "Query Google Analytics 4 data using natural language and generate automated performance reports.",
    longDescription: "GA4 Analytics connects OpenClaw to your Google Analytics 4 property, allowing you to query traffic data, conversion metrics, and user behavior using plain English. Generate automated weekly reports, set up anomaly alerts, and get AI-powered insights about your website performance — all without touching the GA4 interface.",
    installCmd: "npx clawhub@latest install ga4-analytics",
    rating: 4.5,
    securityStatus: "verified",
    useCases: [
      "Generate weekly traffic and conversion reports automatically",
      "Detect anomalies in traffic patterns and alert immediately",
      "Compare performance across custom date ranges and segments",
      "Get AI-powered recommendations for improving key metrics",
    ],
    faqs: [
      { question: "Does it access raw GA4 data or just reports?", answer: "It uses the GA4 Data API for raw data access, allowing custom queries beyond standard reports." },
      { question: "Can it modify GA4 settings?", answer: "No — it's read-only by default. It queries data but doesn't change your GA4 configuration." },
    ],
    relatedSlugs: ["social-media-manager", "seo-optimizer", "email-campaign"],
    author: "marketing-tools",
    version: "2.3.1",
    lastUpdated: "2026-02-11",
  },
  // Browser & Automation
  {
    name: "Browser Pilot",
    slug: "browser-pilot",
    category: "Browser & Automation",
    categorySlug: "browser-automation",
    description: "Full browser automation with visual understanding — navigate, click, fill forms, and extract data from any website.",
    longDescription: "Browser Pilot gives OpenClaw eyes and hands on the web. It can navigate to any URL, understand page layouts visually, interact with elements (click, type, scroll), fill out forms, and extract data — all while handling dynamic content, popups, and CAPTCHAs intelligently. Built on Playwright with AI-powered element detection, it's the most reliable browser automation skill available.",
    installCmd: "npx clawhub@latest install browser-pilot",
    rating: 4.8,
    securityStatus: "verified",
    useCases: [
      "Automate repetitive web tasks like form submissions",
      "Test web applications across browsers automatically",
      "Extract data from sites that block traditional scrapers",
      "Automate social media posting and engagement workflows",
    ],
    faqs: [
      { question: "How does Browser Pilot handle CAPTCHAs?", answer: "It uses AI-powered CAPTCHA solving for common types. For reCAPTCHA v3, it maintains a high trust score through natural browsing patterns." },
      { question: "Does it work with authenticated pages?", answer: "Yes — it can store session cookies and handle multi-step login flows including 2FA." },
    ],
    relatedSlugs: ["web-scraper-pro", "form-filler", "screenshot-tool"],
    author: "openclaw-core",
    version: "3.5.0",
    lastUpdated: "2026-02-21",
  },
  // Home Automation
  {
    name: "Home Assistant Bridge",
    slug: "home-assistant-bridge",
    category: "Productivity & Tasks",
    categorySlug: "productivity",
    description: "Control your Home Assistant smart home setup through OpenClaw with natural language commands.",
    longDescription: "Home Assistant Bridge connects OpenClaw to your Home Assistant instance, enabling natural language control of your entire smart home. Turn on lights, adjust thermostats, trigger automations, check sensor readings, and create complex routines — all through conversational commands. It supports all Home Assistant integrations and entities.",
    installCmd: "npx clawhub@latest install home-assistant-bridge",
    rating: 4.4,
    securityStatus: "community",
    useCases: [
      "Control smart home devices with natural language",
      "Create complex automation routines through conversation",
      "Monitor sensor data and get alerts for anomalies",
      "Integrate smart home events with other OpenClaw workflows",
    ],
    faqs: [
      { question: "What Home Assistant version is required?", answer: "Version 2024.1 or later. It uses the WebSocket API for real-time communication." },
      { question: "Does it work with all HA integrations?", answer: "Yes — any entity registered in Home Assistant is accessible through this skill." },
    ],
    relatedSlugs: ["whatsapp-connector", "calendar-manager", "notification-hub"],
    author: "home-auto-dev",
    version: "1.6.2",
    lastUpdated: "2026-01-28",
  },
  {
    name: "WhatsApp Connector",
    slug: "whatsapp-connector",
    category: "Productivity & Tasks",
    categorySlug: "productivity",
    description: "Send and receive WhatsApp messages through OpenClaw for notifications, alerts, and conversational workflows.",
    longDescription: "WhatsApp Connector enables OpenClaw to send and receive messages via WhatsApp Business API. Use it for automated notifications, customer support flows, team alerts, and conversational workflows. It supports text, images, documents, and template messages with full delivery tracking.",
    installCmd: "npx clawhub@latest install whatsapp-connector",
    rating: 4.3,
    securityStatus: "community",
    useCases: [
      "Send automated alerts and notifications via WhatsApp",
      "Build customer support chatbots on WhatsApp",
      "Share reports and documents through WhatsApp groups",
      "Create personal assistant workflows triggered by WhatsApp messages",
    ],
    faqs: [
      { question: "Does it require WhatsApp Business API?", answer: "Yes, you need a WhatsApp Business API account. The skill guides you through the setup process." },
      { question: "Can it receive messages?", answer: "Yes — it supports webhooks for incoming messages, enabling two-way conversational flows." },
    ],
    relatedSlugs: ["home-assistant-bridge", "slack-connector", "notification-hub"],
    author: "messaging-tools",
    version: "1.2.0",
    lastUpdated: "2026-02-05",
  },
  // Coding
  {
    name: "GitHub Manager",
    slug: "github-manager",
    category: "Coding Agents & IDEs",
    categorySlug: "coding-agents",
    description: "Full GitHub integration — manage repos, PRs, issues, actions, and code reviews from OpenClaw.",
    longDescription: "GitHub Manager provides comprehensive GitHub integration for OpenClaw. Create repos, manage pull requests, review code diffs, trigger GitHub Actions, and handle issues — all through natural language. The AI understands code context and can provide intelligent code review suggestions, auto-generate PR descriptions, and manage complex branching strategies.",
    installCmd: "npx clawhub@latest install github-manager",
    rating: 4.9,
    securityStatus: "verified",
    useCases: [
      "Create and manage pull requests with AI-generated descriptions",
      "Auto-review code changes and suggest improvements",
      "Trigger and monitor GitHub Actions workflows",
      "Manage issues, labels, and milestones across repositories",
    ],
    faqs: [
      { question: "What GitHub permissions does it need?", answer: "Repo read/write, issues, pull requests, and optionally Actions. You control the scope through GitHub App permissions." },
      { question: "Does it support GitHub Enterprise?", answer: "Yes — configure your enterprise URL during setup and it works identically." },
    ],
    relatedSlugs: ["linear-integration", "vercel-deploy", "code-reviewer"],
    author: "openclaw-core",
    version: "4.1.0",
    lastUpdated: "2026-02-22",
  },
  // Notes & PKM
  {
    name: "Obsidian Vault",
    slug: "obsidian-vault",
    category: "Notes & PKM",
    categorySlug: "notes-pkm",
    description: "Read, write, and search your Obsidian vault with AI-powered knowledge graph navigation.",
    longDescription: "Obsidian Vault connects OpenClaw to your Obsidian knowledge base, enabling AI-powered note creation, search, and knowledge graph navigation. Ask questions about your notes, create new entries with automatic backlinking, and discover connections between ideas you never knew existed. It respects your vault's folder structure and tagging conventions.",
    installCmd: "npx clawhub@latest install obsidian-vault",
    rating: 4.7,
    securityStatus: "community",
    useCases: [
      "Search your entire vault using natural language questions",
      "Create new notes with automatic tagging and backlinking",
      "Discover hidden connections between notes using AI",
      "Generate summaries of note clusters on specific topics",
    ],
    faqs: [
      { question: "Does it modify my vault files directly?", answer: "Yes — it reads and writes markdown files in your vault. All changes are tracked through Obsidian's built-in file versioning." },
      { question: "Does it work with Obsidian plugins?", answer: "It works with the vault's file system directly, so plugin-specific features may not be supported. Dataview queries are partially supported." },
    ],
    relatedSlugs: ["notion-sync", "roam-research", "logseq-bridge"],
    author: "pkm-tools",
    version: "2.0.1",
    lastUpdated: "2026-02-08",
  },
  // Take the Wheel (writing skill)
  {
    name: "Take the Wheel",
    slug: "take-the-wheel",
    category: "AI & LLMs",
    categorySlug: "ai-llms",
    description: "Let OpenClaw autonomously write long-form content — blog posts, articles, and documentation with minimal guidance.",
    longDescription: "Take the Wheel is OpenClaw's autonomous writing skill. Give it a topic, outline, or brief, and it will research, draft, edit, and polish long-form content end-to-end. It handles blog posts, technical documentation, marketing copy, and even academic-style articles. The skill manages its own research, fact-checking, and revision cycles, producing publication-ready content with minimal human intervention.",
    installCmd: "npx clawhub@latest install take-the-wheel",
    rating: 4.6,
    securityStatus: "verified",
    useCases: [
      "Generate SEO-optimized blog posts from a single topic prompt",
      "Write technical documentation from code and API references",
      "Create marketing landing page copy with A/B variants",
      "Draft long-form research reports with citations",
    ],
    faqs: [
      { question: "How long does it take to write an article?", answer: "A typical 2,000-word blog post takes 3-5 minutes including research and revision cycles." },
      { question: "Can I control the writing style?", answer: "Yes — you can provide style guides, example articles, brand voice documents, and specific tone instructions." },
      { question: "Does it check for plagiarism?", answer: "It generates original content and can optionally run plagiarism checks against web content before finalizing." },
    ],
    relatedSlugs: ["gpt-prompt-chainer", "deep-research", "seo-optimizer"],
    author: "openclaw-core",
    version: "2.8.0",
    lastUpdated: "2026-02-16",
  },
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function getSkillsByCategory(categorySlug: string): Skill[] {
  return skills.filter((s) => s.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedSkills(skill: Skill): Skill[] {
  return skill.relatedSlugs
    .map((slug) => getSkillBySlug(slug))
    .filter(Boolean) as Skill[];
}
