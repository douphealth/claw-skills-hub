export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  tag: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  heroDescription: string;
  sections: ArticleSection[];
  skills: ArticleSkill[];
}

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface ArticleSkill {
  name: string;
  slug: string;
  description: string;
  installCmd: string;
  whyPicked: string;
  rating: number;
}

export const articles: Article[] = [
  // ═══════════════════════════════════════════════════════════════
  // 1. AI & LLMs — Comprehensive Guide
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-ai-llm-skills-openclaw",
    title: "12 Best AI & LLM Skills for OpenClaw in 2026",
    metaTitle: "12 Best AI & LLM Skills for OpenClaw (2026) — Enterprise Guide",
    metaDescription: "Complete guide to the best OpenClaw AI and LLM skills. Build multi-agent pipelines, RAG systems, and production AI workflows with verified skills.",
    tag: "AI & LLMs",
    readTime: "18 min read",
    publishedDate: "2026-01-15",
    updatedDate: "2026-02-22",
    heroDescription: "The definitive guide to building enterprise-grade AI workflows with OpenClaw. From prompt chaining and model routing to RAG pipelines and multi-agent orchestration — these 12 skills transform OpenClaw into a production-ready AI platform.",
    sections: [
      {
        heading: "Why AI Skills Are the Foundation of Every OpenClaw Workflow",
        content: "Every serious OpenClaw deployment starts with AI. Whether you're building a [[customer support chatbot|/skills/ai-llms/rag-pipeline]], automating [[content generation|/skills/ai-llms/take-the-wheel]], or creating [[multi-agent research systems|/skills/ai-llms/agent-orchestrator]], the AI & LLM skills form the backbone of your automation stack.\n\nIn 2026, the landscape has shifted dramatically. Models are cheaper, context windows are larger, and the tooling has matured. But with **287+ AI skills** in the [[OpenClaw directory|/skills]], choosing the right combination is critical. A poorly chosen skill stack leads to wasted tokens, unreliable outputs, and spiraling costs.\n\nThis guide covers the 12 essential AI skills that every OpenClaw power user needs, from foundational tools like [[prompt optimization|/skills/ai-llms/prompt-optimizer]] to advanced capabilities like [[fine-tuning|/skills/ai-llms/fine-tune-studio]] and [[model evaluation|/skills/ai-llms/model-evaluator]]."
      },
      {
        heading: "Building Production AI Pipelines: Architecture Patterns",
        content: "The most effective OpenClaw AI setups follow a layered architecture. At the base, you need **routing and optimization** — [[LLM Router|/skills/ai-llms/llm-router]] ensures every prompt goes to the right model, while [[Prompt Optimizer|/skills/ai-llms/prompt-optimizer]] reduces costs by up to 40%.\n\nThe middle layer handles **context and retrieval**. [[Context Window Manager|/skills/ai-llms/context-window-manager]] ensures large documents fit into model limits, [[Embeddings Manager|/skills/ai-llms/embeddings-manager]] powers semantic search, and [[RAG Pipeline|/skills/ai-llms/rag-pipeline]] ties retrieval to generation.\n\nAt the top, **orchestration and evaluation** skills like [[Agent Orchestrator|/skills/ai-llms/agent-orchestrator]] coordinate multi-agent teams, while [[Model Evaluator|/skills/ai-llms/model-evaluator]] ensures quality doesn't degrade over time. For teams building custom models, [[Fine-Tune Studio|/skills/ai-llms/fine-tune-studio]] brings MLOps into OpenClaw.\n\nFor a deeper dive into multi-agent architectures, see our guide on [[building multi-agent systems|/articles/multi-agent-orchestration-guide]]."
      },
      {
        heading: "Cost Optimization: Cutting AI Spend by 70%",
        content: "The biggest mistake teams make is using the same model for every task. A simple classification doesn't need GPT-5 — that's a job for [[Flash Lite|/skills/ai-llms/llm-router]]. Combine [[LLM Router|/skills/ai-llms/llm-router]] with [[Token Counter|/skills/ai-llms/token-counter]] for real-time cost tracking, and [[Prompt Optimizer|/skills/ai-llms/prompt-optimizer]] for automatic compression.\n\nReal-world results: teams using this three-skill stack report **60-70% cost reduction** with no measurable quality drop. The router handles model selection, the optimizer reduces token count, and the counter provides visibility into spend.\n\nFor vision-heavy workflows, [[Vision Analyzer|/skills/ai-llms/vision-analyzer]] processes images and documents without expensive OCR pipelines. Combined with [[RAG Pipeline|/skills/ai-llms/rag-pipeline]], you can build document Q&A systems that handle PDFs, images, and structured data at scale."
      },
    ],
    skills: [
      { name: "GPT Prompt Chainer", slug: "gpt-prompt-chainer", description: "Chain multiple prompts together with context passing for complex multi-step workflows.", installCmd: "npx clawhub@latest install gpt-prompt-chainer", whyPicked: "The foundation skill for any multi-step AI workflow. Chain prompts together with automatic context passing, branching logic, and error recovery. Essential for building reliable AI pipelines.", rating: 4.8 },
      { name: "LLM Router", slug: "llm-router", description: "Route prompts to the best model based on complexity, cost, and latency.", installCmd: "npx clawhub@latest install llm-router", whyPicked: "Saves 60-70% on AI costs by routing simple tasks to cheaper models. Supports GPT-5, Claude 4, Gemini, Mistral, and local models with automatic fallback during outages.", rating: 4.9 },
      { name: "RAG Pipeline", slug: "rag-pipeline", description: "Build production Retrieval-Augmented Generation systems with document ingestion and hybrid search.", installCmd: "npx clawhub@latest install rag-pipeline", whyPicked: "The gold standard for grounding AI responses in your own data. Hybrid search (semantic + keyword), reranking, and citation tracking make it enterprise-ready.", rating: 4.9 },
      { name: "Agent Orchestrator", slug: "agent-orchestrator", description: "Coordinate multiple AI agents with role assignment and handoff protocols.", installCmd: "npx clawhub@latest install agent-orchestrator", whyPicked: "Run up to 10 specialist agents in parallel with conflict resolution, resource allocation, and guardrails. The conductor of your AI workforce.", rating: 4.8 },
      { name: "Context Window Manager", slug: "context-window-manager", description: "Intelligently manage context windows with chunking, summarization, and relevance scoring.", installCmd: "npx clawhub@latest install context-window-manager", whyPicked: "Process documents larger than any model's context limit. Semantic relevance scoring ensures the right information is always prioritized.", rating: 4.7 },
      { name: "Embeddings Manager", slug: "embeddings-manager", description: "Generate, store, and search vector embeddings for semantic search and recommendations.", installCmd: "npx clawhub@latest install embeddings-manager", whyPicked: "Complete embedding lifecycle management. Supports Pinecone, Qdrant, pgvector, and local models. Essential for building any semantic search or recommendation system.", rating: 4.8 },
      { name: "Prompt Optimizer", slug: "prompt-optimizer", description: "Optimize and compress prompts for better results and lower costs.", installCmd: "npx clawhub@latest install prompt-optimizer", whyPicked: "Reduce token usage by up to 40% while improving output quality. Uses proven prompt engineering patterns and smart compression techniques.", rating: 4.6 },
      { name: "Vision Analyzer", slug: "vision-analyzer", description: "Analyze images, screenshots, and documents using multimodal AI.", installCmd: "npx clawhub@latest install vision-analyzer", whyPicked: "Extract data from charts, read handwriting, analyze designs — all with structured output. Supports GPT-4V, Gemini Vision, and Claude Vision.", rating: 4.7 },
      { name: "Token Counter", slug: "token-counter", description: "Count tokens accurately, estimate costs, and track usage across workflows.", installCmd: "npx clawhub@latest install token-counter", whyPicked: "Precise tokenization for every major provider. Set budget alerts, track spending, and compare efficiency across models. Essential for cost management.", rating: 4.5 },
      { name: "Fine-Tune Studio", slug: "fine-tune-studio", description: "Fine-tune models with your data — manage datasets, training, and deployment.", installCmd: "npx clawhub@latest install fine-tune-studio", whyPicked: "When prompting isn't enough, fine-tune. Supports OpenAI, Together AI, and self-hosted training. 100 high-quality examples can produce excellent results.", rating: 4.5 },
      { name: "Model Evaluator", slug: "model-evaluator", description: "Benchmark and compare models with automated evaluation and A/B testing.", installCmd: "npx clawhub@latest install model-evaluator", whyPicked: "Detect quality regressions, validate fine-tuned models, and run statistically significant A/B tests. Critical for maintaining production quality.", rating: 4.6 },
      { name: "Take the Wheel", slug: "take-the-wheel", description: "Autonomous long-form content writing with research and revision cycles.", installCmd: "npx clawhub@latest install take-the-wheel", whyPicked: "Give it a topic and get publication-ready content in minutes. Handles research, drafting, editing, and polishing. Perfect for content teams scaling output.", rating: 4.6 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. Search & Research
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-search-research-skills-openclaw",
    title: "7 Best Search & Research Skills for OpenClaw in 2026",
    metaTitle: "7 Best Search & Research Skills for OpenClaw (2026)",
    metaDescription: "Deep research, academic search, web scraping, and knowledge synthesis. The best OpenClaw skills for researchers, analysts, and knowledge workers.",
    tag: "Search & Research",
    readTime: "14 min read",
    publishedDate: "2026-01-20",
    updatedDate: "2026-02-20",
    heroDescription: "Turn OpenClaw into a research powerhouse. From multi-source deep research with citation tracking to semantic search over your own data — these 7 skills cover every research workflow, from academic literature reviews to competitive intelligence.",
    sections: [
      {
        heading: "The Research Stack: From Raw Data to Actionable Insights",
        content: "Research in 2026 is about synthesis, not just search. The best OpenClaw research setups combine **discovery** skills like [[Deep Research|/skills/search-research/deep-research]] and [[Academic Search|/skills/search-research/academic-search]] with **understanding** skills like [[Knowledge Graph|/skills/search-research/knowledge-graph]] and [[Semantic Search|/skills/search-research/semantic-search]].\n\nThe key insight: raw search results are just the starting point. You need [[Web Scraper Pro|/skills/search-research/web-scraper-pro]] to extract structured data, [[News Aggregator|/skills/search-research/news-aggregator]] for real-time monitoring, and [[Knowledge Graph|/skills/search-research/knowledge-graph]] to map relationships between entities.\n\nFor AI-powered analysis on top of your research, pair these with [[RAG Pipeline|/skills/ai-llms/rag-pipeline]] from our [[AI & LLM skills guide|/articles/best-ai-llm-skills-openclaw]]."
      },
      {
        heading: "Academic Research Workflows",
        content: "Academic researchers get the most value from the [[Academic Search|/skills/search-research/academic-search]] + [[ArXiv Explorer|/skills/search-research/arxiv-explorer]] combination. Academic Search provides unified access across Google Scholar, Semantic Scholar, PubMed, and CORE, while ArXiv Explorer specializes in preprints with AI-generated summaries.\n\nAdd [[Deep Research|/skills/search-research/deep-research]] for automated literature reviews that synthesize findings across sources with proper citations. The fact verification feature cross-references claims across at least 3 independent sources — critical for maintaining research integrity.\n\nFor patent-heavy fields, [[Patent Search|/skills/search-research/patent-search]] covers USPTO, EPO, WIPO, and national offices with AI-powered prior art discovery and claim mapping."
      },
    ],
    skills: [
      { name: "Deep Research", slug: "deep-research", description: "Multi-source research with synthesis, citations, and fact verification.", installCmd: "npx clawhub@latest install deep-research", whyPicked: "The most comprehensive research skill available. Searches academic databases, news, and the web simultaneously, then synthesizes findings with proper citations and fact verification.", rating: 4.9 },
      { name: "Academic Search", slug: "academic-search", description: "Search papers across Google Scholar, arXiv, PubMed, and Semantic Scholar.", installCmd: "npx clawhub@latest install academic-search", whyPicked: "Unified access to the world's academic knowledge with citation graph exploration, BibTeX export, and automatic formatting in APA, MLA, Chicago, and IEEE.", rating: 4.8 },
      { name: "Web Scraper Pro", slug: "web-scraper-pro", description: "Extract structured data from any website with AI content detection.", installCmd: "npx clawhub@latest install web-scraper-pro", whyPicked: "AI-powered content extraction handles JavaScript-rendered pages and anti-bot measures ethically. Outputs JSON, CSV, or Markdown.", rating: 4.7 },
      { name: "Semantic Search", slug: "semantic-search", description: "Search documents by meaning using vector embeddings and hybrid search.", installCmd: "npx clawhub@latest install semantic-search", whyPicked: "Find conceptually relevant results, not just keyword matches. Sub-100ms for collections up to 1M documents.", rating: 4.7 },
      { name: "Knowledge Graph", slug: "knowledge-graph", description: "Build knowledge graphs from unstructured data with entity and relationship extraction.", installCmd: "npx clawhub@latest install knowledge-graph", whyPicked: "Automatically extract entities and relationships from text. Discover hidden connections between people, companies, and concepts across large corpora.", rating: 4.6 },
      { name: "News Aggregator", slug: "news-aggregator", description: "Aggregate and summarize news from 50,000+ sources with AI clustering.", installCmd: "npx clawhub@latest install news-aggregator", whyPicked: "Real-time monitoring of 50,000+ sources with AI topic clustering, breaking news detection, and sentiment analysis. Essential for market intelligence.", rating: 4.5 },
      { name: "Patent Search", slug: "patent-search", description: "Search and analyze patents from USPTO, EPO, and WIPO.", installCmd: "npx clawhub@latest install patent-search", whyPicked: "Covers 100M+ patent documents with AI-powered prior art discovery and semantic patent matching that keyword search would miss.", rating: 4.4 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. Web & Frontend Dev
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-web-frontend-skills-openclaw",
    title: "6 Best Web & Frontend Dev Skills for OpenClaw in 2026",
    metaTitle: "6 Best Web & Frontend Dev Skills for OpenClaw (2026)",
    metaDescription: "Build faster with OpenClaw. React scaffolding, CSS generation, component libraries, Lighthouse audits, and more for frontend developers.",
    tag: "Web & Frontend",
    readTime: "12 min read",
    publishedDate: "2026-01-25",
    updatedDate: "2026-02-22",
    heroDescription: "Accelerate frontend development with OpenClaw. Generate production-ready React components, create CSS from natural language, access 200+ pre-built UI components, and maintain performance with automated Lighthouse audits.",
    sections: [
      {
        heading: "The Modern Frontend Developer's OpenClaw Stack",
        content: "Frontend development in 2026 is about velocity without sacrificing quality. The [[React Scaffolder|/skills/web-frontend/react-scaffolder]] generates complete components with TypeScript, tests, and Storybook stories from descriptions. [[CSS Generator|/skills/web-frontend/css-generator]] turns mockups into pixel-perfect Tailwind or vanilla CSS.\n\nFor teams building design systems, [[Component Library|/skills/web-frontend/component-library]] provides 200+ accessible components built on Radix UI. And [[Lighthouse Audit|/skills/web-frontend/lighthouse-audit]] catches performance regressions before they ship.\n\nPair with [[GitHub Manager|/skills/coding-agents/github-manager]] for PR automation and [[Vercel Deploy|/skills/devops-cloud/vercel-deploy]] for one-command deployments. See our [[DevOps guide|/articles/best-devops-cloud-skills-openclaw]] for the complete deployment stack."
      },
      {
        heading: "From Design to Deployed: The Complete Workflow",
        content: "The most productive teams chain these skills together. Start with [[CSS Generator|/skills/web-frontend/css-generator]] to convert Figma screenshots to code. Use [[React Scaffolder|/skills/web-frontend/react-scaffolder]] to create components with proper typing and tests. Pull from [[Component Library|/skills/web-frontend/component-library]] for complex patterns like data tables and date pickers.\n\nBefore merging, [[Responsive Tester|/skills/web-frontend/responsive-tester]] checks layouts across 50+ device viewports with visual diff analysis. [[Lighthouse Audit|/skills/web-frontend/lighthouse-audit]] ensures Core Web Vitals stay green. Then [[Code Reviewer|/skills/coding-agents/code-reviewer]] catches bugs and security issues — see our [[coding agents guide|/articles/best-coding-agent-skills-openclaw]] for more."
      },
    ],
    skills: [
      { name: "React Scaffolder", slug: "react-scaffolder", description: "Generate React components with TypeScript, tests, and Storybook stories.", installCmd: "npx clawhub@latest install react-scaffolder", whyPicked: "Complete component generation from descriptions — TypeScript types, unit tests, Storybook stories, and CSS modules. Supports React 18+, Next.js App Router, and Server Components.", rating: 4.7 },
      { name: "Component Library", slug: "component-library", description: "200+ pre-built accessible UI components for React with Tailwind and Radix.", installCmd: "npx clawhub@latest install component-library", whyPicked: "Every component is WCAG 2.1 AA accessible, responsive, and fully themeable. Includes data tables, command palettes, rich text editors, and dashboard layouts.", rating: 4.8 },
      { name: "CSS Generator", slug: "css-generator", description: "Generate CSS and Tailwind from descriptions or design screenshots.", installCmd: "npx clawhub@latest install css-generator", whyPicked: "Turn design screenshots into matching CSS or Tailwind code. Supports Grid, Flexbox, animations, and responsive patterns.", rating: 4.4 },
      { name: "Lighthouse Audit", slug: "lighthouse-audit", description: "Run performance audits and track scores with AI optimization recommendations.", installCmd: "npx clawhub@latest install lighthouse-audit", whyPicked: "Automated performance, accessibility, and SEO audits with score tracking and AI-powered code fix recommendations. Catches regressions before production.", rating: 4.6 },
      { name: "API Mocker", slug: "api-mocker", description: "Generate realistic mock APIs for frontend development.", installCmd: "npx clawhub@latest install api-mocker", whyPicked: "Develop frontend features before the backend is ready. Type-safe mock handlers from OpenAPI specs with configurable delays and error scenarios.", rating: 4.5 },
      { name: "Responsive Tester", slug: "responsive-tester", description: "Test across devices with visual comparison and layout analysis.", installCmd: "npx clawhub@latest install responsive-tester", whyPicked: "50+ preset devices with pixel-diff comparison and AI-powered layout issue detection. Catches responsive bugs before users do.", rating: 4.4 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. DevOps & Cloud
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-devops-cloud-skills-openclaw",
    title: "8 Best DevOps & Cloud Skills for OpenClaw in 2026",
    metaTitle: "8 Best DevOps & Cloud Skills for OpenClaw (2026)",
    metaDescription: "Manage infrastructure, deployments, and CI/CD with OpenClaw. Docker, Kubernetes, Terraform, AWS, Cloudflare, and more.",
    tag: "DevOps & Cloud",
    readTime: "16 min read",
    publishedDate: "2026-02-01",
    updatedDate: "2026-02-22",
    heroDescription: "From container orchestration to infrastructure-as-code — manage your entire cloud infrastructure through OpenClaw. These 8 skills cover deployments, CI/CD pipelines, container management, and multi-cloud operations for DevOps teams of any size.",
    sections: [
      {
        heading: "Infrastructure Management Through Conversation",
        content: "The DevOps revolution isn't about new tools — it's about making existing tools accessible through natural language. [[Kubernetes Pilot|/skills/devops-cloud/kubernetes-pilot]] lets you manage clusters without memorizing kubectl commands. [[Terraform Manager|/skills/devops-cloud/terraform-manager]] generates IaC from descriptions. [[AWS Toolkit|/skills/devops-cloud/aws-toolkit]] covers 200+ AWS services.\n\nFor deployment workflows, [[Vercel Deploy|/skills/devops-cloud/vercel-deploy]] handles frontend deployments, while [[Docker Compose|/skills/devops-cloud/docker-compose]] manages containerized applications. [[CI/CD Pipeline|/skills/devops-cloud/ci-cd-pipeline]] generates and optimizes build workflows across GitHub Actions, GitLab CI, and CircleCI.\n\nPair with [[GitHub Manager|/skills/coding-agents/github-manager]] for complete Git-to-deploy automation. See our [[coding agents guide|/articles/best-coding-agent-skills-openclaw]] for the developer side of the workflow."
      },
      {
        heading: "Incident Response and Observability",
        content: "When things break, speed matters. [[Log Analyzer|/skills/devops-cloud/log-analyzer]] ingests logs from any source and applies AI-powered root cause analysis. It correlates events across microservices, detects anomalies, and generates runbooks automatically.\n\nCombined with [[Kubernetes Pilot|/skills/devops-cloud/kubernetes-pilot]] for pod troubleshooting and [[Data Pipeline|/skills/devops-cloud/data-pipeline]] for data flow monitoring, you get a complete observability stack inside OpenClaw. For alerting, add [[Notification Hub|/skills/productivity/notification-hub]] from our [[productivity guide|/articles/best-productivity-skills-openclaw]] to route alerts to Slack, PagerDuty, or WhatsApp."
      },
    ],
    skills: [
      { name: "Kubernetes Pilot", slug: "kubernetes-pilot", description: "Manage K8s clusters with natural language — deploy, scale, and troubleshoot.", installCmd: "npx clawhub@latest install kubernetes-pilot", whyPicked: "AI-powered K8s management for EKS, GKE, AKS, and self-managed clusters. Troubleshoot CrashLoopBackOff pods, manage Helm charts, and monitor cluster health conversationally.", rating: 4.8 },
      { name: "Docker Compose", slug: "docker-compose", description: "Manage containers and compose stacks with natural language.", installCmd: "npx clawhub@latest install docker-compose", whyPicked: "Generate Dockerfiles, build images, manage multi-container stacks, and optimize images for size and build speed. Understands Docker best practices.", rating: 4.7 },
      { name: "Terraform Manager", slug: "terraform-manager", description: "Generate and apply Terraform configs for multi-cloud infrastructure.", installCmd: "npx clawhub@latest install terraform-manager", whyPicked: "Infrastructure as Code through conversation. Supports AWS, GCP, Azure with security best practice enforcement and drift detection.", rating: 4.6 },
      { name: "AWS Toolkit", slug: "aws-toolkit", description: "Manage 200+ AWS services with natural language.", installCmd: "npx clawhub@latest install aws-toolkit", whyPicked: "Comprehensive AWS management: EC2, S3, Lambda, RDS, CloudFront, and more. Includes cost analysis, security auditing, and resource optimization.", rating: 4.7 },
      { name: "CI/CD Pipeline", slug: "ci-cd-pipeline", description: "Create and manage CI/CD workflows for GitHub Actions, GitLab CI, and CircleCI.", installCmd: "npx clawhub@latest install ci-cd-pipeline", whyPicked: "Generate optimized CI/CD workflows from project descriptions. Debug failed builds, optimize with caching, and set up deployment automation.", rating: 4.6 },
      { name: "Vercel Deploy", slug: "vercel-deploy", description: "Deploy and monitor Vercel projects with zero-config.", installCmd: "npx clawhub@latest install vercel-deploy", whyPicked: "One-command deployments with environment variable management, instant rollbacks, and Core Web Vitals monitoring. Perfect for frontend teams.", rating: 4.6 },
      { name: "Cloudflare Worker", slug: "cloudflare-worker", description: "Deploy Workers, manage KV, R2, D1, and Pages.", installCmd: "npx clawhub@latest install cloudflare-worker", whyPicked: "Full Cloudflare ecosystem management. Deploy edge functions, manage storage, and monitor analytics — all conversationally.", rating: 4.5 },
      { name: "Log Analyzer", slug: "log-analyzer", description: "AI-powered log analysis with anomaly detection and root cause analysis.", installCmd: "npx clawhub@latest install log-analyzer", whyPicked: "Ingest logs from any source, detect anomalies, correlate events across services, and get AI-generated root cause analysis with runbooks.", rating: 4.6 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. Browser & Automation
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-browser-automation-skills-openclaw",
    title: "6 Best Browser & Automation Skills for OpenClaw in 2026",
    metaTitle: "6 Best Browser & Automation Skills for OpenClaw (2026)",
    metaDescription: "Automate web tasks with OpenClaw. Browser control, form filling, screenshots, PDF generation, email automation, and E2E testing.",
    tag: "Browser & Automation",
    readTime: "11 min read",
    publishedDate: "2026-02-05",
    updatedDate: "2026-02-21",
    heroDescription: "Give OpenClaw eyes and hands on the web. From visual browser control and intelligent form filling to PDF generation and email automation — these 6 skills handle everything that requires interacting with websites and documents.",
    sections: [
      {
        heading: "Web Automation That Actually Works",
        content: "Browser automation has always been fragile. [[Browser Pilot|/skills/browser-automation/browser-pilot]] changes that with AI-powered visual understanding. Instead of brittle CSS selectors, it sees the page like a human — finding buttons, reading text, and navigating dynamic content reliably.\n\nFor specific use cases, specialized skills outperform general-purpose ones. [[Form Filler|/skills/browser-automation/form-filler]] handles complex multi-step wizards with dropdowns, file uploads, and CAPTCHAs. [[Screenshot Tool|/skills/browser-automation/screenshot-tool]] captures pixel-perfect screenshots for documentation and visual testing. [[PDF Generator|/skills/browser-automation/pdf-generator]] creates professional documents from templates.\n\nCombine with [[Web Scraper Pro|/skills/search-research/web-scraper-pro]] for data extraction — see our [[research skills guide|/articles/best-search-research-skills-openclaw]] for the complete data collection stack."
      },
      {
        heading: "Testing and Quality Assurance Automation",
        content: "[[Test Runner|/skills/browser-automation/test-runner]] generates E2E tests from natural language descriptions and runs them across browsers. Paired with [[Screenshot Tool|/skills/browser-automation/screenshot-tool]] for visual regression testing and [[Responsive Tester|/skills/web-frontend/responsive-tester]] for cross-device validation, you get a comprehensive QA pipeline.\n\nFor developers, pair with [[Test Generator|/skills/coding-agents/test-generator]] to create unit and integration tests — covered in our [[coding agents guide|/articles/best-coding-agent-skills-openclaw]]. And [[Email Automator|/skills/browser-automation/email-automator]] handles notification testing and email-triggered workflow validation."
      },
    ],
    skills: [
      { name: "Browser Pilot", slug: "browser-pilot", description: "Full browser automation with visual understanding and AI element detection.", installCmd: "npx clawhub@latest install browser-pilot", whyPicked: "The most reliable browser automation skill. AI-powered visual understanding navigates dynamic sites, handles CAPTCHAs, and works with authenticated pages including 2FA.", rating: 4.8 },
      { name: "Form Filler", slug: "form-filler", description: "Intelligently fill complex web forms with AI.", installCmd: "npx clawhub@latest install form-filler", whyPicked: "Handles multi-step wizards, conditional fields, dropdowns, date pickers, and file uploads. Perfect for automating job applications and government forms.", rating: 4.5 },
      { name: "Test Runner", slug: "test-runner", description: "Generate and run E2E tests from natural language with Playwright/Cypress.", installCmd: "npx clawhub@latest install test-runner", whyPicked: "Describe a user flow in plain English and get cross-browser E2E tests. Supports visual regression, accessibility, and performance assertions.", rating: 4.7 },
      { name: "PDF Generator", slug: "pdf-generator", description: "Generate professional PDFs from HTML, Markdown, or templates.", installCmd: "npx clawhub@latest install pdf-generator", whyPicked: "Production-quality PDF generation with headers, footers, charts, custom fonts, and watermarks. Merge, split, and manipulate existing PDFs.", rating: 4.6 },
      { name: "Screenshot Tool", slug: "screenshot-tool", description: "Full-page screenshots with annotation, diffs, and batch capture.", installCmd: "npx clawhub@latest install screenshot-tool", whyPicked: "Pixel-perfect captures from 320px to 4K. Visual diff comparison, annotation tools, and scheduled batch captures for monitoring.", rating: 4.4 },
      { name: "Email Automator", slug: "email-automator", description: "Send, receive, and process emails programmatically.", installCmd: "npx clawhub@latest install email-automator", whyPicked: "Complete email automation: templated sends, inbox monitoring, AI classification, attachment extraction, and workflow triggers. Supports Gmail, Outlook, and SMTP.", rating: 4.5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. Productivity & Tasks
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-productivity-skills-openclaw",
    title: "9 Best Productivity & Task Management Skills for OpenClaw in 2026",
    metaTitle: "9 Best Productivity Skills for OpenClaw (2026)",
    metaDescription: "Notion, Linear, Todoist, Slack, Calendar, WhatsApp, and more. The best OpenClaw productivity skills for teams and individuals.",
    tag: "Productivity",
    readTime: "15 min read",
    publishedDate: "2026-02-08",
    updatedDate: "2026-02-22",
    heroDescription: "Connect every tool in your productivity stack through OpenClaw. From Notion and Linear to Slack and WhatsApp — these 9 skills unify task management, communication, calendar, and notification workflows into a single conversational interface.",
    sections: [
      {
        heading: "The Unified Productivity Hub",
        content: "Most knowledge workers use 5-10 tools daily. [[Notion Sync|/skills/productivity/notion-sync]] connects your knowledge base. [[Linear Integration|/skills/productivity/linear-integration]] handles project management. [[Slack Connector|/skills/productivity/slack-connector]] manages team communication. [[Calendar Manager|/skills/productivity/calendar-manager]] coordinates scheduling.\n\nThe magic happens when these connect through OpenClaw. A Slack message creates a Linear issue, which syncs to Notion, and schedules time in your calendar — all through one conversation. Add [[Notification Hub|/skills/productivity/notification-hub]] to route alerts across channels based on urgency and user preferences.\n\nFor automation beyond productivity tools, see our [[browser automation guide|/articles/best-browser-automation-skills-openclaw]] and [[DevOps guide|/articles/best-devops-cloud-skills-openclaw]]."
      },
      {
        heading: "Smart Home and Personal Automation",
        content: "[[Home Assistant Bridge|/skills/productivity/home-assistant-bridge]] brings smart home control into OpenClaw. Create complex automation routines, monitor sensors, and integrate home events with your work workflows. [[WhatsApp Connector|/skills/productivity/whatsapp-connector]] extends your reach to WhatsApp for personal alerts and team notifications.\n\n[[Time Tracker|/skills/productivity/time-tracker]] automatically logs time from Linear issues, GitHub commits, and calendar events — generating client-ready timesheets without manual tracking. Pair with [[PDF Generator|/skills/browser-automation/pdf-generator]] from our [[automation guide|/articles/best-browser-automation-skills-openclaw]] for automatic invoice generation."
      },
    ],
    skills: [
      { name: "Notion Sync", slug: "notion-sync", description: "Bi-directional Notion sync for databases, pages, and tasks.", installCmd: "npx clawhub@latest install notion-sync", whyPicked: "Seamless bridge between OpenClaw and Notion. Full CRUD on databases, natural language queries, and automatic meeting note generation.", rating: 4.8 },
      { name: "Linear Integration", slug: "linear-integration", description: "Full Linear project management with AI-powered triage.", installCmd: "npx clawhub@latest install linear-integration", whyPicked: "Create issues, manage sprints, and auto-triage bugs based on content analysis. AI learns your team's assignment patterns.", rating: 4.7 },
      { name: "Slack Connector", slug: "slack-connector", description: "Slack messaging, bots, and AI-powered conversation analysis.", installCmd: "npx clawhub@latest install slack-connector", whyPicked: "Build AI bots, summarize threads, extract action items, and send notifications. Supports interactive messages, modals, and slash commands.", rating: 4.7 },
      { name: "Calendar Manager", slug: "calendar-manager", description: "Google Calendar and Outlook management with smart scheduling.", installCmd: "npx clawhub@latest install calendar-manager", whyPicked: "Find mutual free slots, auto-resolve conflicts, and get daily schedule briefings. Works with Google, Outlook, and CalDAV.", rating: 4.6 },
      { name: "Todoist Sync", slug: "todoist-sync", description: "Task sync with AI prioritization and productivity analytics.", installCmd: "npx clawhub@latest install todoist-sync", whyPicked: "Create tasks from conversations, auto-prioritize by urgency, and sync across tools. AI-powered productivity insights.", rating: 4.5 },
      { name: "Notification Hub", slug: "notification-hub", description: "Unified multi-channel notifications — Slack, email, WhatsApp, SMS, push.", installCmd: "npx clawhub@latest install notification-hub", whyPicked: "Single API for all notification channels with urgency-based routing, scheduling, and delivery tracking.", rating: 4.5 },
      { name: "Time Tracker", slug: "time-tracker", description: "Auto-track time from Linear, GitHub, and calendar events.", installCmd: "npx clawhub@latest install time-tracker", whyPicked: "Automatic time inference from Git commits and issue transitions. Generate client timesheets and analyze productivity patterns.", rating: 4.4 },
      { name: "WhatsApp Connector", slug: "whatsapp-connector", description: "WhatsApp messaging for notifications and conversational workflows.", installCmd: "npx clawhub@latest install whatsapp-connector", whyPicked: "Automated alerts, customer support bots, and two-way conversational flows via WhatsApp Business API.", rating: 4.3 },
      { name: "Home Assistant Bridge", slug: "home-assistant-bridge", description: "Smart home control through OpenClaw.", installCmd: "npx clawhub@latest install home-assistant-bridge", whyPicked: "Natural language control of your entire smart home. Create routines, monitor sensors, and integrate with work workflows.", rating: 4.4 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. Marketing & Sales
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-marketing-sales-skills-openclaw",
    title: "6 Best Marketing & Sales Skills for OpenClaw in 2026",
    metaTitle: "6 Best Marketing & Sales Skills for OpenClaw (2026)",
    metaDescription: "Analytics, social media, SEO, email campaigns, lead scoring, and CRM. The best OpenClaw skills for marketing and sales teams.",
    tag: "Marketing & Sales",
    readTime: "13 min read",
    publishedDate: "2026-02-10",
    updatedDate: "2026-02-22",
    heroDescription: "Automate your entire marketing and sales pipeline with OpenClaw. From GA4 analytics and social media management to lead scoring and CRM automation — these 6 skills cover the complete revenue operations stack.",
    sections: [
      {
        heading: "The AI-Powered Marketing Stack",
        content: "Marketing in 2026 demands data-driven decisions at speed. [[GA4 Analytics|/skills/marketing-sales/ga4-analytics]] queries traffic and conversion data with natural language — no more clicking through the GA4 interface. [[SEO Optimizer|/skills/marketing-sales/seo-optimizer]] provides keyword research, content scoring, and technical audits.\n\n[[Social Media Manager|/skills/marketing-sales/social-media-manager]] handles multi-platform publishing with AI-generated, platform-optimized content. For email, [[Email Campaign|/skills/marketing-sales/email-campaign]] manages the entire workflow from design to A/B testing.\n\nPair with [[Take the Wheel|/skills/ai-llms/take-the-wheel]] from our [[AI guide|/articles/best-ai-llm-skills-openclaw]] for content generation, and [[News Aggregator|/skills/search-research/news-aggregator]] from our [[research guide|/articles/best-search-research-skills-openclaw]] for competitive monitoring."
      },
      {
        heading: "Sales Pipeline Automation",
        content: "[[Lead Scorer|/skills/marketing-sales/lead-scorer]] uses AI to analyze behavioral signals, firmographic fit, and intent data to prioritize leads automatically. High-score leads trigger alerts to sales reps via [[Notification Hub|/skills/productivity/notification-hub]].\n\n[[CRM Connector|/skills/marketing-sales/crm-connector]] unifies HubSpot, Salesforce, and Pipedrive management. AI features include automated data entry from emails, deal stage predictions, and pipeline analytics. Connect with [[Email Automator|/skills/browser-automation/email-automator]] for automated outreach sequences."
      },
    ],
    skills: [
      { name: "GA4 Analytics", slug: "ga4-analytics", description: "Query GA4 data with natural language and generate automated reports.", installCmd: "npx clawhub@latest install ga4-analytics", whyPicked: "Raw GA4 Data API access with natural language queries. Automated weekly reports, anomaly detection, and AI-powered optimization recommendations.", rating: 4.5 },
      { name: "SEO Optimizer", slug: "seo-optimizer", description: "Keyword research, content scoring, and technical SEO audits.", installCmd: "npx clawhub@latest install seo-optimizer", whyPicked: "Comprehensive SEO toolkit: keyword research, content quality scoring, technical audits, meta tag generation, and daily rank tracking.", rating: 4.7 },
      { name: "Social Media Manager", slug: "social-media-manager", description: "Multi-platform social media scheduling, publishing, and analytics.", installCmd: "npx clawhub@latest install social-media-manager", whyPicked: "Publish to Twitter/X, LinkedIn, Instagram, TikTok, and more. AI-generated platform-optimized content with engagement analytics.", rating: 4.6 },
      { name: "Email Campaign", slug: "email-campaign", description: "Design, send, and analyze email marketing campaigns with AI.", installCmd: "npx clawhub@latest install email-campaign", whyPicked: "Complete email marketing: responsive templates, AI copy, audience segmentation, A/B testing, and GDPR-compliant unsubscribe handling.", rating: 4.5 },
      { name: "Lead Scorer", slug: "lead-scorer", description: "AI-powered lead scoring with behavior, fit, and intent analysis.", installCmd: "npx clawhub@latest install lead-scorer", whyPicked: "Automatically prioritize leads based on website visits, email engagement, and firmographic data. Triggers nurture sequences for low-score leads.", rating: 4.4 },
      { name: "CRM Connector", slug: "crm-connector", description: "HubSpot, Salesforce, and Pipedrive management with AI assistance.", installCmd: "npx clawhub@latest install crm-connector", whyPicked: "Unified CRM access with AI-powered data entry, deal predictions, and pipeline analytics across HubSpot, Salesforce, and Pipedrive.", rating: 4.6 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. Coding Agents & IDEs
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-coding-agent-skills-openclaw",
    title: "6 Best Coding Agent & IDE Skills for OpenClaw in 2026",
    metaTitle: "6 Best Coding Agent Skills for OpenClaw (2026)",
    metaDescription: "GitHub management, AI code review, refactoring, debugging, test generation, and documentation. The best OpenClaw skills for developers.",
    tag: "Coding Agents",
    readTime: "12 min read",
    publishedDate: "2026-02-12",
    updatedDate: "2026-02-22",
    heroDescription: "Transform OpenClaw into your AI coding partner. From GitHub PR management and AI code reviews to intelligent refactoring and automatic test generation — these 6 skills supercharge every part of the software development lifecycle.",
    sections: [
      {
        heading: "The AI-Augmented Developer Workflow",
        content: "The best developers in 2026 don't write more code — they leverage AI to write better code faster. [[GitHub Manager|/skills/coding-agents/github-manager]] handles the Git workflow: PR creation with AI descriptions, branch management, and Actions monitoring. [[Code Reviewer|/skills/coding-agents/code-reviewer]] catches bugs, security issues, and anti-patterns before they reach production.\n\n[[Test Generator|/skills/coding-agents/test-generator]] creates comprehensive test suites with intelligent edge case detection. [[Docs Generator|/skills/coding-agents/docs-generator]] produces API documentation, README files, and OpenAPI specs from your codebase.\n\nFor deployment, pair with [[Vercel Deploy|/skills/devops-cloud/vercel-deploy]] and [[CI/CD Pipeline|/skills/devops-cloud/ci-cd-pipeline]] from our [[DevOps guide|/articles/best-devops-cloud-skills-openclaw]]. For frontend-specific tooling, see our [[web dev guide|/articles/best-web-frontend-skills-openclaw]]."
      },
      {
        heading: "Debugging and Refactoring at Scale",
        content: "[[Debug Assistant|/skills/coding-agents/debug-assistant]] goes beyond pasting errors into ChatGPT. It has access to your codebase context, traces through files, and provides fixes that account for your specific patterns and architecture.\n\n[[Refactor Agent|/skills/coding-agents/refactor-agent]] handles large-scale code transformations safely. Extract functions, rename symbols across files, modernize legacy patterns — all with AST analysis and automatic test verification. For log-based debugging, pair with [[Log Analyzer|/skills/devops-cloud/log-analyzer]] from our [[DevOps guide|/articles/best-devops-cloud-skills-openclaw]]."
      },
    ],
    skills: [
      { name: "GitHub Manager", slug: "github-manager", description: "Full GitHub integration — repos, PRs, issues, and Actions.", installCmd: "npx clawhub@latest install github-manager", whyPicked: "The most comprehensive GitHub skill. AI-generated PR descriptions, intelligent code review, Actions management, and GitHub Enterprise support.", rating: 4.9 },
      { name: "Code Reviewer", slug: "code-reviewer", description: "AI code reviews with bug, security, and quality detection.", installCmd: "npx clawhub@latest install code-reviewer", whyPicked: "Context-aware code analysis that understands business logic, not just syntax. Auto-generates fix patches for detected issues across 10+ languages.", rating: 4.8 },
      { name: "Test Generator", slug: "test-generator", description: "Generate unit, integration, and E2E tests with edge case detection.", installCmd: "npx clawhub@latest install test-generator", whyPicked: "Analyze code and generate comprehensive test suites. Supports Jest, Vitest, Pytest, and more with automatic mocking.", rating: 4.6 },
      { name: "Debug Assistant", slug: "debug-assistant", description: "AI debugging with error analysis, bug tracing, and fix suggestions.", installCmd: "npx clawhub@latest install debug-assistant", whyPicked: "Codebase-aware debugging that traces through files and understands your architecture. Far more effective than general-purpose AI assistants.", rating: 4.7 },
      { name: "Refactor Agent", slug: "refactor-agent", description: "Intelligent codebase refactoring with AST analysis and test verification.", installCmd: "npx clawhub@latest install refactor-agent", whyPicked: "Safe, large-scale refactoring using AST analysis and type checking. Verifies behavior preservation by running existing tests.", rating: 4.6 },
      { name: "Docs Generator", slug: "docs-generator", description: "Generate API docs, READMEs, and OpenAPI specs from code.", installCmd: "npx clawhub@latest install docs-generator", whyPicked: "Automatic documentation from code: API references, README files, JSDoc comments, and OpenAPI specs. Updates automatically in CI.", rating: 4.5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. Notes & PKM
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-notes-pkm-skills-openclaw",
    title: "5 Best Notes & PKM Skills for OpenClaw in 2026",
    metaTitle: "5 Best Notes & PKM Skills for OpenClaw (2026)",
    metaDescription: "Obsidian, Roam, Logseq, Zettelkasten, and bookmark management. The best OpenClaw skills for personal knowledge management.",
    tag: "Notes & PKM",
    readTime: "10 min read",
    publishedDate: "2026-02-14",
    updatedDate: "2026-02-22",
    heroDescription: "Build a second brain with OpenClaw. Connect to Obsidian, Roam Research, and Logseq. Implement the Zettelkasten method with AI-generated links. Manage bookmarks with full-text search and dead link detection.",
    sections: [
      {
        heading: "Your AI-Powered Second Brain",
        content: "Personal knowledge management is about connecting ideas, not just storing them. [[Obsidian Vault|/skills/notes-pkm/obsidian-vault]] is the most popular choice — it connects OpenClaw to your vault for AI-powered search, automatic backlinking, and hidden connection discovery.\n\nFor block-based thinkers, [[Roam Research|/skills/notes-pkm/roam-research]] and [[Logseq Bridge|/skills/notes-pkm/logseq-bridge]] integrate with their respective platforms. [[Zettelkasten|/skills/notes-pkm/zettelkasten]] implements the method across any note-taking app.\n\nFor research-heavy PKM workflows, combine with [[Deep Research|/skills/search-research/deep-research]] and [[Knowledge Graph|/skills/search-research/knowledge-graph]] from our [[research guide|/articles/best-search-research-skills-openclaw]]. And [[Bookmark Manager|/skills/notes-pkm/bookmark-manager]] ensures nothing you've read gets lost."
      },
    ],
    skills: [
      { name: "Obsidian Vault", slug: "obsidian-vault", description: "AI-powered Obsidian vault search, writing, and knowledge graph navigation.", installCmd: "npx clawhub@latest install obsidian-vault", whyPicked: "The most popular PKM skill. Natural language search, automatic backlinking, and AI-discovered connections between notes.", rating: 4.7 },
      { name: "Zettelkasten", slug: "zettelkasten", description: "AI-augmented Zettelkasten method with atomic notes and emergent insights.", installCmd: "npx clawhub@latest install zettelkasten", whyPicked: "Implement the Zettelkasten method with AI-generated links and tags. Surface emergent ideas and identify knowledge gaps.", rating: 4.5 },
      { name: "Roam Research", slug: "roam-research", description: "Roam graph interaction with block references and natural language queries.", installCmd: "npx clawhub@latest install roam-research", whyPicked: "Full Roam graph access: create blocks, traverse linked references, and generate summaries from scattered notes.", rating: 4.3 },
      { name: "Logseq Bridge", slug: "logseq-bridge", description: "Logseq integration for journals, pages, and Datalog queries.", installCmd: "npx clawhub@latest install logseq-bridge", whyPicked: "Seamless Logseq integration with Markdown and Org-mode support. Run Datalog queries and organize notes with AI.", rating: 4.2 },
      { name: "Bookmark Manager", slug: "bookmark-manager", description: "Smart bookmarks with AI tagging, full-text search, and link rot detection.", installCmd: "npx clawhub@latest install bookmark-manager", whyPicked: "Save pages with content extraction, AI tagging, and full-text search. Detects dead links and exports to Notion or Obsidian.", rating: 4.3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. Health & Fitness
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-health-fitness-skills-openclaw",
    title: "4 Best Health & Fitness Skills for OpenClaw in 2026",
    metaTitle: "4 Best Health & Fitness Skills for OpenClaw (2026)",
    metaDescription: "Workout planning, nutrition tracking, sleep analysis, and meditation. The best OpenClaw skills for health and wellness.",
    tag: "Health & Fitness",
    readTime: "9 min read",
    publishedDate: "2026-02-16",
    updatedDate: "2026-02-22",
    heroDescription: "Optimize your health with AI-powered OpenClaw skills. Personalized workout programs, nutrition tracking from meal photos, sleep quality analysis, and guided meditation — all through natural language.",
    sections: [
      {
        heading: "The AI Health Coach in Your Terminal",
        content: "Health optimization is increasingly data-driven, and OpenClaw skills make that data actionable. [[Workout Planner|/skills/health-fitness/workout-planner]] generates personalized programs with progressive overload, exercise alternatives, and recovery scheduling.\n\n[[Nutrition Tracker|/skills/health-fitness/nutrition-tracker]] logs meals from natural language descriptions or photos, tracking calories, macros, and micronutrients. [[Sleep Analyzer|/skills/health-fitness/sleep-analyzer]] integrates with wearables to identify factors affecting sleep quality.\n\nFor mental wellness, [[Meditation Guide|/skills/health-fitness/meditation-guide]] provides AI-personalized meditation scripts and breathing exercises. Pair with [[Notification Hub|/skills/productivity/notification-hub]] from our [[productivity guide|/articles/best-productivity-skills-openclaw]] for mindfulness reminders."
      },
    ],
    skills: [
      { name: "Workout Planner", slug: "workout-planner", description: "Personalized workout programs with progressive overload and recovery.", installCmd: "npx clawhub@latest install workout-planner", whyPicked: "Generates programs for any goal: strength, hypertrophy, endurance. Adapts based on feedback and supports bodyweight, home gym, and full gym setups.", rating: 4.5 },
      { name: "Nutrition Tracker", slug: "nutrition-tracker", description: "Track calories and macros from descriptions and meal photos.", installCmd: "npx clawhub@latest install nutrition-tracker", whyPicked: "Log meals by describing them or snapping a photo. Generates meal plans, identifies nutritional gaps, and supports all dietary restrictions.", rating: 4.4 },
      { name: "Sleep Analyzer", slug: "sleep-analyzer", description: "Sleep tracking and AI recommendations for better rest.", installCmd: "npx clawhub@latest install sleep-analyzer", whyPicked: "Integrates with Apple Watch, Fitbit, Oura Ring, Whoop, and Garmin. Identifies sleep quality factors and calculates optimal bedtimes.", rating: 4.3 },
      { name: "Meditation Guide", slug: "meditation-guide", description: "AI-personalized meditation and breathing exercises.", installCmd: "npx clawhub@latest install meditation-guide", whyPicked: "Custom guided meditation scripts adapted to mood, goals, and experience. Includes box breathing, 4-7-8, and Wim Hof techniques.", rating: 4.2 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. Multi-Agent Orchestration Deep Dive
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "multi-agent-orchestration-guide",
    title: "How to Build Multi-Agent AI Systems with OpenClaw",
    metaTitle: "Multi-Agent AI Systems with OpenClaw — Complete Guide (2026)",
    metaDescription: "Learn to build multi-agent AI systems with OpenClaw. Coordinate specialist agents, manage handoffs, and run parallel workstreams.",
    tag: "Advanced Guide",
    readTime: "14 min read",
    publishedDate: "2026-02-18",
    updatedDate: "2026-02-22",
    heroDescription: "Multi-agent AI is the next frontier. Learn how to coordinate specialist AI agents — researchers, writers, coders, reviewers — working together on complex tasks. This guide covers architecture patterns, handoff protocols, and production deployment strategies.",
    sections: [
      {
        heading: "Why Multi-Agent Systems Outperform Single-Agent Approaches",
        content: "A single AI agent trying to do everything is like a solo developer building an entire company's software. Multi-agent systems decompose complex tasks into specialized roles. The [[Agent Orchestrator|/skills/ai-llms/agent-orchestrator]] manages this coordination — assigning tasks, handling handoffs, and resolving conflicts.\n\nThe key insight: **specialist agents outperform generalists** on every measurable dimension. A research agent using [[Deep Research|/skills/search-research/deep-research]] produces better citations than asking a general agent to research. A coding agent with [[Code Reviewer|/skills/coding-agents/code-reviewer]] catches more bugs than a general-purpose review.\n\nCombine [[GPT Prompt Chainer|/skills/ai-llms/gpt-prompt-chainer]] for pipeline sequencing with [[LLM Router|/skills/ai-llms/llm-router]] for cost-efficient model selection. Use [[Context Window Manager|/skills/ai-llms/context-window-manager]] to manage information flow between agents."
      },
      {
        heading: "Production Architecture: The Five-Agent Pattern",
        content: "The most successful multi-agent deployments follow a five-agent pattern:\n\n**1. Coordinator Agent** — Powered by [[Agent Orchestrator|/skills/ai-llms/agent-orchestrator]], it decomposes tasks and manages the team.\n\n**2. Research Agent** — Uses [[Deep Research|/skills/search-research/deep-research]], [[Academic Search|/skills/search-research/academic-search]], and [[Web Scraper Pro|/skills/search-research/web-scraper-pro]] to gather information.\n\n**3. Analysis Agent** — Processes data with [[RAG Pipeline|/skills/ai-llms/rag-pipeline]] and [[Knowledge Graph|/skills/search-research/knowledge-graph]], producing structured insights.\n\n**4. Execution Agent** — Takes action using specialized skills: [[GitHub Manager|/skills/coding-agents/github-manager]] for code, [[Email Automator|/skills/browser-automation/email-automator]] for communication, or [[CRM Connector|/skills/marketing-sales/crm-connector]] for sales.\n\n**5. Quality Agent** — Validates output using [[Model Evaluator|/skills/ai-llms/model-evaluator]], [[Code Reviewer|/skills/coding-agents/code-reviewer]], or [[Test Generator|/skills/coding-agents/test-generator]].\n\nSee our [[AI & LLM skills guide|/articles/best-ai-llm-skills-openclaw]] for the foundational skills and our [[coding agents guide|/articles/best-coding-agent-skills-openclaw]] for the developer-focused workflow."
      },
    ],
    skills: [
      { name: "Agent Orchestrator", slug: "agent-orchestrator", description: "Coordinate specialist AI agents with handoff protocols.", installCmd: "npx clawhub@latest install agent-orchestrator", whyPicked: "The conductor of multi-agent systems. Manages 10 parallel agents with role assignment, conflict resolution, and guardrails.", rating: 4.8 },
      { name: "GPT Prompt Chainer", slug: "gpt-prompt-chainer", description: "Chain prompts with context passing for multi-step pipelines.", installCmd: "npx clawhub@latest install gpt-prompt-chainer", whyPicked: "Essential for sequencing agent interactions. Context passing and branching logic enable complex workflows.", rating: 4.8 },
      { name: "LLM Router", slug: "llm-router", description: "Route each agent to the optimal model for their task.", installCmd: "npx clawhub@latest install llm-router", whyPicked: "Use GPT-5 for the coordinator and analysis agents, Flash for simple extraction tasks. Saves 60-70% on multi-agent costs.", rating: 4.9 },
      { name: "RAG Pipeline", slug: "rag-pipeline", description: "Ground agent responses in your data with retrieval-augmented generation.", installCmd: "npx clawhub@latest install rag-pipeline", whyPicked: "Ensures agents work with accurate, grounded information rather than hallucinating. Citation tracking maintains accountability.", rating: 4.9 },
      { name: "Model Evaluator", slug: "model-evaluator", description: "Validate multi-agent output quality with automated evaluation.", installCmd: "npx clawhub@latest install model-evaluator", whyPicked: "Quality assurance for multi-agent systems. Detect regressions and validate output against defined rubrics.", rating: 4.6 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. Content Creators Guide
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "best-skills-content-creators",
    title: "Best OpenClaw Skills for Content Creators in 2026",
    metaTitle: "Best OpenClaw Skills for Content Creators (2026)",
    metaDescription: "Content writing, SEO, social media, research, and analytics. The best OpenClaw skills for bloggers, YouTubers, and content teams.",
    tag: "Content Creators",
    readTime: "11 min read",
    publishedDate: "2026-02-19",
    updatedDate: "2026-02-22",
    heroDescription: "Scale your content operation without scaling your team. From AI-powered writing and SEO optimization to social media scheduling and analytics — the essential OpenClaw skill stack for creators who want to produce more, better content.",
    sections: [
      {
        heading: "The Content Creator's Workflow",
        content: "Content creation follows a predictable pipeline: research → write → optimize → publish → analyze. OpenClaw skills automate every step.\n\n**Research**: [[Deep Research|/skills/search-research/deep-research]] gathers sources with citations. [[News Aggregator|/skills/search-research/news-aggregator]] tracks trending topics in your niche.\n\n**Writing**: [[Take the Wheel|/skills/ai-llms/take-the-wheel]] drafts publication-ready content. [[Prompt Optimizer|/skills/ai-llms/prompt-optimizer]] ensures high-quality AI output.\n\n**Optimization**: [[SEO Optimizer|/skills/marketing-sales/seo-optimizer]] handles keyword research and content scoring. [[Lighthouse Audit|/skills/web-frontend/lighthouse-audit]] checks page performance.\n\n**Publishing**: [[Social Media Manager|/skills/marketing-sales/social-media-manager]] distributes across platforms. [[Email Campaign|/skills/marketing-sales/email-campaign]] notifies subscribers.\n\n**Analytics**: [[GA4 Analytics|/skills/marketing-sales/ga4-analytics]] tracks traffic and conversions automatically."
      },
    ],
    skills: [
      { name: "Take the Wheel", slug: "take-the-wheel", description: "Autonomous long-form content writing.", installCmd: "npx clawhub@latest install take-the-wheel", whyPicked: "Publication-ready blog posts in 3-5 minutes. Handles research, drafting, editing, and polishing. Supports brand voice customization.", rating: 4.6 },
      { name: "Deep Research", slug: "deep-research", description: "Multi-source research with citations and fact verification.", installCmd: "npx clawhub@latest install deep-research", whyPicked: "Every great article starts with research. Multi-source synthesis with proper citations ensures authoritative, well-sourced content.", rating: 4.9 },
      { name: "SEO Optimizer", slug: "seo-optimizer", description: "Keyword research, content scoring, and technical SEO.", installCmd: "npx clawhub@latest install seo-optimizer", whyPicked: "Research keywords, score content quality, generate meta tags, and track rankings. Essential for any content that needs to rank.", rating: 4.7 },
      { name: "Social Media Manager", slug: "social-media-manager", description: "Multi-platform publishing with AI content generation.", installCmd: "npx clawhub@latest install social-media-manager", whyPicked: "Publish to all major platforms with platform-optimized formatting. AI generates hashtags, optimal timing, and engagement-optimized copy.", rating: 4.6 },
      { name: "GA4 Analytics", slug: "ga4-analytics", description: "Natural language analytics queries and automated reports.", installCmd: "npx clawhub@latest install ga4-analytics", whyPicked: "Query traffic data conversationally. Automated weekly reports and AI-powered content performance insights.", rating: 4.5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. Enterprise Security & Compliance
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "security-audit-checklist-openclaw-skills",
    title: "Enterprise Security Checklist for OpenClaw Skills",
    metaTitle: "OpenClaw Security Audit Checklist — Enterprise Guide (2026)",
    metaDescription: "5-point security audit checklist for evaluating OpenClaw skills. Verify permissions, data handling, and compliance before installing.",
    tag: "Security",
    readTime: "8 min read",
    publishedDate: "2026-02-20",
    updatedDate: "2026-02-22",
    heroDescription: "Before installing any OpenClaw skill in a production environment, you need to verify its security posture. This checklist covers permission scoping, data handling, network access, dependency auditing, and compliance verification.",
    sections: [
      {
        heading: "The 5-Point Security Audit",
        content: "Every skill in the [[OpenClaw directory|/skills]] has a security status: **verified** (audited by the OpenClaw security team), **community** (peer-reviewed), or **unreviewed** (use at your own risk). But even verified skills need evaluation for your specific compliance requirements.\n\n**1. Permission Scoping** — Check what APIs and data the skill can access. Skills like [[GitHub Manager|/skills/coding-agents/github-manager]] need repo access but shouldn't need billing access.\n\n**2. Data Handling** — Where does data go? Skills like [[RAG Pipeline|/skills/ai-llms/rag-pipeline]] process your documents. Ensure they don't send data to external endpoints you haven't approved.\n\n**3. Network Access** — Skills like [[Browser Pilot|/skills/browser-automation/browser-pilot]] access external websites. Review what domains they contact.\n\n**4. Dependency Audit** — Check the skill's dependency tree for known vulnerabilities.\n\n**5. Compliance Mapping** — Map skill behavior against SOC 2, HIPAA, or GDPR requirements as applicable."
      },
      {
        heading: "Recommended Secure Skill Stacks",
        content: "For **HIPAA-compliant** workflows, use only verified skills with local processing: [[Context Window Manager|/skills/ai-llms/context-window-manager]] for document handling, [[Embeddings Manager|/skills/ai-llms/embeddings-manager]] with local models, and [[PDF Generator|/skills/browser-automation/pdf-generator]] for report generation.\n\nFor **SOC 2** environments, pair [[Log Analyzer|/skills/devops-cloud/log-analyzer]] with [[Notification Hub|/skills/productivity/notification-hub]] for security event monitoring and alerting. Use [[Code Reviewer|/skills/coding-agents/code-reviewer]] to scan for security vulnerabilities before deployment.\n\nSee our [[DevOps guide|/articles/best-devops-cloud-skills-openclaw]] for infrastructure security tooling and our [[AI guide|/articles/best-ai-llm-skills-openclaw]] for secure AI pipeline architecture."
      },
    ],
    skills: [
      { name: "Code Reviewer", slug: "code-reviewer", description: "AI code review with security vulnerability detection.", installCmd: "npx clawhub@latest install code-reviewer", whyPicked: "Detects OWASP Top 10 vulnerabilities, hardcoded secrets, SQL injection, XSS, and other security anti-patterns with auto-fix patches.", rating: 4.8 },
      { name: "Log Analyzer", slug: "log-analyzer", description: "Security event monitoring with anomaly detection.", installCmd: "npx clawhub@latest install log-analyzer", whyPicked: "Detect suspicious patterns in application and access logs. Generate security incident reports with root cause analysis.", rating: 4.6 },
      { name: "RAG Pipeline", slug: "rag-pipeline", description: "Document processing with data residency controls.", installCmd: "npx clawhub@latest install rag-pipeline", whyPicked: "Process documents with configurable data residency. Supports on-premise vector databases and local embedding models for sensitive data.", rating: 4.9 },
      { name: "Notification Hub", slug: "notification-hub", description: "Security alert routing across channels.", installCmd: "npx clawhub@latest install notification-hub", whyPicked: "Route security alerts to the right team members via Slack, email, PagerDuty, or SMS based on severity and on-call schedules.", rating: 4.5 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. Complete Beginner's Guide
  // ═══════════════════════════════════════════════════════════════
  {
    slug: "getting-started-openclaw-skills-beginner",
    title: "Getting Started with OpenClaw Skills: A Beginner's Guide",
    metaTitle: "Getting Started with OpenClaw Skills — Beginner Guide (2026)",
    metaDescription: "New to OpenClaw? Start here. Learn how to install, configure, and use skills with step-by-step examples for common workflows.",
    tag: "Getting Started",
    readTime: "10 min read",
    publishedDate: "2026-02-21",
    updatedDate: "2026-02-22",
    heroDescription: "New to OpenClaw? This guide walks you through installing your first skills, setting up common workflows, and understanding the skill ecosystem. In 15 minutes, you'll go from zero to a working AI-powered automation.",
    sections: [
      {
        heading: "What Are OpenClaw Skills?",
        content: "OpenClaw skills are modular capabilities you install to extend what OpenClaw can do. Think of them like apps on your phone — each skill adds a specific superpower. The [[skills directory|/skills]] has over 5,705 skills across 10 categories.\n\nSkills are installed with a single command: `npx clawhub@latest install <skill-name>`. They're configured through conversation — no YAML files or config editing required. Every skill listed in the directory includes an install command ready to copy and paste."
      },
      {
        heading: "Your First 5 Skills: The Starter Stack",
        content: "We recommend starting with five foundational skills that work great together:\n\n1. **[[GPT Prompt Chainer|/skills/ai-llms/gpt-prompt-chainer]]** — The backbone for any AI workflow. Chain prompts together with context passing.\n\n2. **[[Deep Research|/skills/search-research/deep-research]]** — Turn OpenClaw into a research powerhouse with multi-source synthesis.\n\n3. **[[Browser Pilot|/skills/browser-automation/browser-pilot]]** — Give OpenClaw the ability to navigate and interact with websites.\n\n4. **[[Notion Sync|/skills/productivity/notion-sync]]** or **[[Todoist Sync|/skills/productivity/todoist-sync]]** — Connect your task management tool.\n\n5. **[[LLM Router|/skills/ai-llms/llm-router]]** — Save money by routing prompts to the right model automatically.\n\nFor deeper exploration, check our category guides: [[AI skills|/articles/best-ai-llm-skills-openclaw]], [[research skills|/articles/best-search-research-skills-openclaw]], [[productivity skills|/articles/best-productivity-skills-openclaw]], and [[coding skills|/articles/best-coding-agent-skills-openclaw]]."
      },
    ],
    skills: [
      { name: "GPT Prompt Chainer", slug: "gpt-prompt-chainer", description: "Chain AI prompts with context passing.", installCmd: "npx clawhub@latest install gpt-prompt-chainer", whyPicked: "The foundation skill for beginners. Simple to use, powerful results. Chain two prompts together and watch the magic happen.", rating: 4.8 },
      { name: "Deep Research", slug: "deep-research", description: "Multi-source research with automatic synthesis.", installCmd: "npx clawhub@latest install deep-research", whyPicked: "The most immediately useful skill. Ask a research question and get a synthesized report with citations in minutes.", rating: 4.9 },
      { name: "Browser Pilot", slug: "browser-pilot", description: "Visual browser automation for any website.", installCmd: "npx clawhub@latest install browser-pilot", whyPicked: "The 'wow' skill. Watch OpenClaw navigate websites, fill forms, and extract data visually. Instant productivity gains.", rating: 4.8 },
      { name: "LLM Router", slug: "llm-router", description: "Smart model routing for cost optimization.", installCmd: "npx clawhub@latest install llm-router", whyPicked: "Install this early to save money from day one. Automatic model selection means you never overpay for simple tasks.", rating: 4.9 },
      { name: "Notion Sync", slug: "notion-sync", description: "Connect OpenClaw to your Notion workspace.", installCmd: "npx clawhub@latest install notion-sync", whyPicked: "If you use Notion, this skill is a must. Create and query pages with natural language.", rating: 4.8 },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
