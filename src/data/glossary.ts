export interface GlossaryEntry {
  slug: string;
  term: string;
  metaTitle: string;
  metaDescription: string;
  shortDefinition: string;
  sections: { heading: string; content: string }[];
  relatedTerms: string[];
  faqs: { question: string; answer: string }[];
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "what-is-openclaw",
    term: "OpenClaw",
    metaTitle: "What is OpenClaw? — AI Agent Framework Explained | ClawSkills",
    metaDescription: "OpenClaw is an open-source AI agent framework with 150K+ GitHub stars. Learn what it does, how it works, and why developers choose it for building autonomous AI workflows.",
    shortDefinition: "OpenClaw is an open-source framework for building, deploying, and managing autonomous AI agents that execute complex workflows across tools and services.",
    sections: [
      {
        heading: "What is OpenClaw?",
        content: "**OpenClaw** is an open-source AI agent framework that enables developers to build autonomous AI employees — software agents that can monitor systems, research data, compile reports, and execute multi-step workflows without constant human supervision.\n\nWith over **150,000 GitHub stars** and a thriving global community, OpenClaw has become the de facto standard for teams building production-grade AI agent pipelines. It runs on macOS, Linux, and Windows WSL, and integrates with all major LLM providers including OpenAI, Anthropic, Google, and open-source models.",
      },
      {
        heading: "How Does OpenClaw Work?",
        content: "At its core, OpenClaw provides a **skill-based architecture**. Each skill is a self-contained plugin that gives an AI agent a specific capability — from running SEO audits to analyzing financial data to generating code.\n\nDevelopers install skills via the CLI (`npx clawhub@latest install <skill-name>`), compose them into workflows, and deploy agents that run continuously or on-demand. OpenClaw handles orchestration, error recovery, rate limiting, and output formatting automatically.\n\n**Key architectural principles:**\n\n- **Skill Composition** — Combine multiple skills into complex, multi-step agent workflows\n- **Security-First** — Every skill undergoes community review and optional VirusTotal scanning\n- **Provider Agnostic** — Works with any LLM provider or local model\n- **Observable** — Built-in logging, tracing, and monitoring for production deployments",
      },
      {
        heading: "Why Choose OpenClaw?",
        content: "**Open Source & Community-Driven** — Unlike proprietary agent frameworks, OpenClaw is fully open-source under the MIT license. The community contributes skills, reviews code, and drives the roadmap.\n\n**Production-Ready** — OpenClaw is used by thousands of companies in production, handling millions of agent executions per day. It includes enterprise features like retry logic, circuit breakers, and structured output validation.\n\n**Massive Skill Ecosystem** — With 5,705+ skills available in the ClawSkills directory, developers rarely need to build capabilities from scratch. Skills cover categories including AI & LLMs, Web & Frontend, DevOps, Data & Analytics, Security, and more.\n\n**Developer Experience** — Install a skill in seconds, test locally, and deploy to production with zero configuration changes.",
      },
    ],
    relatedTerms: ["what-are-openclaw-skills", "openclaw-vs-other-frameworks"],
    faqs: [
      { question: "Is OpenClaw free to use?", answer: "Yes. OpenClaw is fully open-source under the MIT license. There are no usage fees, API costs, or premium tiers for the framework itself. Individual skills may have their own licensing terms." },
      { question: "What programming languages does OpenClaw support?", answer: "OpenClaw skills are primarily written in TypeScript/JavaScript and Python. The framework itself is TypeScript-based but can orchestrate tools written in any language." },
      { question: "How many GitHub stars does OpenClaw have?", answer: "OpenClaw has over 150,000 GitHub stars as of 2026, making it one of the most popular AI agent frameworks in the open-source ecosystem." },
      { question: "Can OpenClaw run locally without cloud services?", answer: "Yes. OpenClaw can run entirely locally using open-source LLMs via Ollama or similar tools. No cloud API keys are required for local development and testing." },
    ],
  },
  {
    slug: "what-are-openclaw-skills",
    term: "OpenClaw Skills",
    metaTitle: "What Are OpenClaw Skills? — Plugin System Explained | ClawSkills",
    metaDescription: "OpenClaw Skills are modular plugins that give AI agents specific capabilities. Learn how skills work, how to install them, and how to build your own.",
    shortDefinition: "OpenClaw Skills are modular, composable plugins that extend AI agent capabilities with specific tools, integrations, and workflows.",
    sections: [
      {
        heading: "What Are OpenClaw Skills?",
        content: "**OpenClaw Skills** are self-contained plugins that give AI agents specific capabilities. Think of them as apps for your AI — each skill teaches the agent how to perform a particular task, from running an SEO audit to summarizing a PDF to deploying a Docker container.\n\nSkills are the fundamental building blocks of the OpenClaw ecosystem. They follow a standardized interface, making them composable, testable, and shareable across the community.",
      },
      {
        heading: "How to Install and Use Skills",
        content: "Installing a skill is a single CLI command:\n\n`npx clawhub@latest install <skill-name>`\n\nOnce installed, the skill is automatically available to your AI agents. You can configure skills via YAML manifests, chain them into multi-step workflows, and set triggers for automated execution.\n\n**Common skill operations:**\n\n- **Install** — `npx clawhub@latest install seo-audit-pro`\n- **List installed** — `npx clawhub@latest list`\n- **Update** — `npx clawhub@latest update <skill-name>`\n- **Remove** — `npx clawhub@latest remove <skill-name>`",
      },
      {
        heading: "Skill Categories",
        content: "The ClawSkills directory organizes 5,705+ skills into categories:\n\n- **AI & LLMs** — Prompt engineering, model routing, context management\n- **Web & Frontend** — Component generation, accessibility auditing, performance testing\n- **DevOps & Cloud** — CI/CD automation, infrastructure monitoring, deployment\n- **Data & Analytics** — Data pipelines, visualization, statistical analysis\n- **Security & Privacy** — Vulnerability scanning, compliance checking, secret management\n- **Productivity & Automation** — Email handling, calendar management, document processing",
      },
      {
        heading: "Building Custom Skills",
        content: "Any developer can create and publish OpenClaw skills. The skill development process involves:\n\n- **Scaffolding** — Use `npx clawhub@latest create-skill <name>` to generate a skill template\n- **Development** — Implement the skill interface with input/output schemas, tool definitions, and execution logic\n- **Testing** — Run `npx clawhub@latest test` to validate your skill against the standard test suite\n- **Publishing** — Submit your skill to the community registry for review and listing\n\nAll skills undergo community review before appearing in the public directory. Skills with verified security audits receive a \"Verified\" badge.",
      },
    ],
    relatedTerms: ["what-is-openclaw", "openclaw-vs-other-frameworks"],
    faqs: [
      { question: "How many OpenClaw skills are available?", answer: "As of 2026, there are over 5,705 skills available in the ClawSkills directory, with new skills being published daily by the community." },
      { question: "Are OpenClaw skills free?", answer: "The vast majority of OpenClaw skills are free and open-source. Some enterprise-focused skills may have commercial licenses, which are clearly labeled in the directory." },
      { question: "Can I use multiple skills together?", answer: "Yes. OpenClaw's skill composition system lets you chain multiple skills into complex workflows. For example, you can combine a web scraper skill with a data analysis skill and a report generation skill into a single automated pipeline." },
    ],
  },
  {
    slug: "openclaw-vs-other-frameworks",
    term: "OpenClaw vs Other AI Agent Frameworks",
    metaTitle: "OpenClaw vs Other AI Frameworks — Comparison Guide | ClawSkills",
    metaDescription: "Compare OpenClaw with LangChain, AutoGPT, CrewAI and other AI agent frameworks. See how OpenClaw's skill-based architecture differs from alternatives.",
    shortDefinition: "OpenClaw differentiates from other AI agent frameworks through its modular skill-based architecture, massive community ecosystem, and production-first design philosophy.",
    sections: [
      {
        heading: "OpenClaw vs Other AI Agent Frameworks",
        content: "The AI agent framework landscape in 2026 includes several major players. Here's how OpenClaw compares to the most popular alternatives on key dimensions that matter for production deployments.",
      },
      {
        heading: "Architecture Comparison",
        content: "**OpenClaw** uses a **skill-based architecture** where each capability is an independent, composable plugin. This means agents are built by assembling pre-built, tested components rather than writing custom orchestration code.\n\n**LangChain** uses a chain/graph-based architecture. While flexible, it requires more custom code and has a steeper learning curve for production deployments.\n\n**AutoGPT** focuses on fully autonomous agents with less human oversight. It's powerful for experimentation but can be unpredictable in production.\n\n**CrewAI** specializes in multi-agent collaboration patterns. It excels at role-based agent teams but has a smaller ecosystem of pre-built capabilities.",
      },
      {
        heading: "Key Differentiators",
        content: "**Ecosystem Size** — OpenClaw's 5,705+ skill directory is the largest pre-built capability ecosystem in the AI agent space. This means less custom development and faster time-to-production.\n\n**Security Model** — OpenClaw is the only major framework with built-in security auditing (VirusTotal scanning, community reviews, security badges) for third-party plugins.\n\n**Developer Experience** — Single-command installation (`npx clawhub@latest install`), standardized interfaces, and comprehensive documentation make OpenClaw the most accessible framework for teams of all sizes.\n\n**Production Readiness** — Built-in retry logic, circuit breakers, structured output validation, and observability features make OpenClaw production-ready out of the box.",
      },
    ],
    relatedTerms: ["what-is-openclaw", "what-are-openclaw-skills"],
    faqs: [
      { question: "Is OpenClaw better than LangChain?", answer: "It depends on your use case. OpenClaw excels at rapid agent development using pre-built skills, while LangChain offers more flexibility for custom chain architectures. Many teams use both: LangChain for custom LLM orchestration and OpenClaw for pre-built agent capabilities." },
      { question: "Can I migrate from another framework to OpenClaw?", answer: "Yes. OpenClaw provides migration guides for teams coming from LangChain, AutoGPT, and CrewAI. The skill-based architecture makes it possible to incrementally adopt OpenClaw alongside existing frameworks." },
      { question: "Which framework has the largest community?", answer: "OpenClaw has the largest community by GitHub stars (150K+) and active contributors. It also has the largest ecosystem of pre-built, community-reviewed plugins (skills)." },
    ],
  },
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}
