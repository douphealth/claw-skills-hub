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
    relatedTerms: ["what-are-openclaw-skills", "openclaw-vs-other-frameworks", "what-is-ai-agent"],
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
    relatedTerms: ["what-is-openclaw", "openclaw-vs-other-frameworks", "what-is-prompt-chaining"],
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
  {
    slug: "what-is-rag-pipeline",
    term: "RAG Pipeline",
    metaTitle: "What is a RAG Pipeline? — Retrieval-Augmented Generation Explained | ClawSkills",
    metaDescription: "A RAG pipeline combines document retrieval with LLM generation for accurate, grounded AI responses. Learn how RAG works and how to build one with OpenClaw.",
    shortDefinition: "A RAG (Retrieval-Augmented Generation) pipeline is an AI architecture that retrieves relevant documents from a knowledge base and feeds them as context to a large language model to produce accurate, grounded responses.",
    sections: [
      {
        heading: "What is a RAG Pipeline?",
        content: "**Retrieval-Augmented Generation (RAG)** is an AI architecture pattern that combines information retrieval with text generation. Instead of relying solely on an LLM's training data, a RAG pipeline first searches a knowledge base for relevant documents, then passes those documents as context to the LLM for response generation.\n\nThis approach dramatically reduces hallucinations, enables the AI to answer questions about proprietary or recent data, and provides citations for generated content.",
      },
      {
        heading: "How RAG Pipelines Work",
        content: "A typical RAG pipeline has three stages:\n\n- **Indexing** — Documents are split into chunks, converted to vector embeddings, and stored in a vector database (e.g., Pinecone, Weaviate, pgvector)\n- **Retrieval** — When a user asks a question, the query is embedded and used to find the most semantically similar document chunks\n- **Generation** — The retrieved chunks are inserted into the LLM prompt as context, and the model generates a grounded response\n\n**Advanced RAG techniques** include query rewriting, hybrid search (combining keyword + semantic search), re-ranking retrieved results, and multi-hop retrieval for complex questions.",
      },
      {
        heading: "Building RAG with OpenClaw",
        content: "OpenClaw provides several skills for building production RAG pipelines:\n\n- **RAG Pipeline** (`npx clawhub@latest install rag-pipeline`) — End-to-end retrieval-augmented generation with support for multiple vector stores\n- **Deep Research** (`npx clawhub@latest install deep-research`) — Multi-source research with RAG-enhanced synthesis\n- **Doc Ingestor** — Chunk and embed documents from PDFs, web pages, and databases\n\nThese skills handle the complexity of chunking strategies, embedding model selection, and prompt engineering so developers can focus on their specific use case.",
      },
    ],
    relatedTerms: ["what-is-openclaw", "what-is-vector-embedding", "what-is-llm-routing"],
    faqs: [
      { question: "What is the difference between RAG and fine-tuning?", answer: "RAG retrieves external knowledge at query time without modifying the model, while fine-tuning permanently adjusts model weights with new data. RAG is better for frequently updated knowledge bases; fine-tuning is better for teaching new behaviors or styles." },
      { question: "What vector databases work with OpenClaw RAG skills?", answer: "OpenClaw RAG skills support Pinecone, Weaviate, Qdrant, ChromaDB, pgvector (PostgreSQL), and Milvus. You can also use local in-memory stores for development." },
      { question: "How do I reduce hallucinations with RAG?", answer: "Use specific, well-chunked documents; implement re-ranking to surface the most relevant results; set temperature to 0 for factual queries; and instruct the LLM to only answer based on provided context." },
    ],
  },
  {
    slug: "what-is-prompt-chaining",
    term: "Prompt Chaining",
    metaTitle: "What is Prompt Chaining? — Multi-Step AI Workflows Explained | ClawSkills",
    metaDescription: "Prompt chaining connects multiple LLM calls in sequence, passing outputs as inputs. Learn how prompt chaining works and how to implement it with OpenClaw skills.",
    shortDefinition: "Prompt chaining is an AI workflow pattern where the output of one LLM prompt is used as input for the next, enabling complex multi-step reasoning and task decomposition.",
    sections: [
      {
        heading: "What is Prompt Chaining?",
        content: "**Prompt chaining** is a technique for building complex AI workflows by connecting multiple LLM calls in sequence. Each step in the chain takes the output of the previous step as input, enabling sophisticated multi-step reasoning that a single prompt cannot achieve.\n\nFor example, a content creation chain might: (1) research a topic, (2) create an outline, (3) write each section, (4) edit for tone and accuracy, and (5) format the final output. Each step is a separate, focused LLM call.",
      },
      {
        heading: "Why Use Prompt Chaining?",
        content: "**Improved accuracy** — Breaking complex tasks into smaller steps reduces errors and hallucinations. Each step can be validated before proceeding.\n\n**Better control** — You can insert conditional logic, human review, or tool calls between steps. This makes workflows more predictable and debuggable.\n\n**Specialized prompts** — Each step can use a different system prompt, model, or temperature setting optimized for that specific subtask.\n\n**Cost optimization** — Use cheaper/faster models for simple steps and more capable models only where needed.",
      },
      {
        heading: "Prompt Chaining with OpenClaw",
        content: "OpenClaw's **GPT Prompt Chainer** skill (`npx clawhub@latest install gpt-prompt-chainer`) provides a declarative way to build prompt chains:\n\n- Define steps as YAML or JSON configurations\n- Pass context between steps automatically\n- Add branching logic and conditional paths\n- Include tool calls (web search, file read, API calls) between LLM steps\n- Monitor execution with built-in tracing\n\nThe skill supports all major LLM providers and can mix models within a single chain.",
      },
    ],
    relatedTerms: ["what-is-openclaw", "what-are-openclaw-skills", "what-is-llm-routing"],
    faqs: [
      { question: "What is the difference between prompt chaining and agents?", answer: "Prompt chaining follows a pre-defined sequence of steps, while agents dynamically decide what to do next based on observations. Chains are more predictable; agents are more flexible. OpenClaw supports both patterns." },
      { question: "How many steps can a prompt chain have?", answer: "There's no hard limit. Practical chains typically have 3-10 steps. Very long chains may accumulate errors, so it's better to design modular sub-chains that can be composed together." },
      { question: "Can I use different LLM models in the same chain?", answer: "Yes. OpenClaw's prompt chaining skill supports using different models per step — for example, GPT-4o for complex reasoning steps and GPT-4o-mini for simple formatting steps." },
    ],
  },
  {
    slug: "what-is-ai-agent",
    term: "AI Agent",
    metaTitle: "What is an AI Agent? — Autonomous AI Systems Explained | ClawSkills",
    metaDescription: "An AI agent is an autonomous software system that perceives its environment, makes decisions, and takes actions to achieve goals. Learn how AI agents work in 2026.",
    shortDefinition: "An AI agent is an autonomous software system powered by large language models that can perceive its environment, reason about tasks, use tools, and take actions to achieve specified goals with minimal human intervention.",
    sections: [
      {
        heading: "What is an AI Agent?",
        content: "An **AI agent** is a software system that uses large language models (LLMs) as its reasoning engine to autonomously accomplish tasks. Unlike simple chatbots that respond to single prompts, agents can plan multi-step strategies, use external tools, remember context across interactions, and adapt their approach based on results.\n\nIn 2026, AI agents are used in production by thousands of companies for tasks ranging from customer support to code review to data analysis.",
      },
      {
        heading: "How Do AI Agents Work?",
        content: "Modern AI agents follow a **perceive → reason → act** loop:\n\n- **Perceive** — The agent receives input from its environment (user messages, API responses, file contents, web pages)\n- **Reason** — The LLM analyzes the input, considers available tools, and plans the next action\n- **Act** — The agent executes an action (call an API, write a file, run a command, search the web)\n- **Observe** — The agent reviews the result and decides whether to continue, retry, or report back\n\nThis loop continues until the task is complete or the agent determines it cannot proceed.",
      },
      {
        heading: "AI Agents vs Chatbots vs Copilots",
        content: "**Chatbots** respond to individual messages without memory or tool access. They're reactive and stateless.\n\n**Copilots** assist humans in real-time (like GitHub Copilot for code). They suggest actions but don't execute autonomously.\n\n**Agents** operate autonomously with minimal supervision. They can plan, use tools, and execute multi-step workflows independently. OpenClaw specializes in building production-grade agents with its skill-based architecture.",
      },
      {
        heading: "Building AI Agents with OpenClaw",
        content: "OpenClaw provides the infrastructure for building, deploying, and managing AI agents:\n\n- **5,705+ pre-built skills** give agents specific capabilities without custom code\n- **Skill composition** lets you combine capabilities into complex workflows\n- **Security model** ensures third-party skills are reviewed and safe\n- **Production features** include retry logic, rate limiting, and observability\n\nInstall OpenClaw and start building: `npx clawhub@latest install`",
      },
    ],
    relatedTerms: ["what-is-openclaw", "what-are-openclaw-skills", "what-is-prompt-chaining"],
    faqs: [
      { question: "Are AI agents safe to use in production?", answer: "Yes, when properly configured with guardrails. OpenClaw provides security scanning, permission systems, and human-in-the-loop options to ensure agents operate safely in production environments." },
      { question: "What is the difference between AI agents and RPA?", answer: "RPA (Robotic Process Automation) follows rigid, pre-defined rules. AI agents use LLMs for flexible reasoning and can handle ambiguous situations, adapt to changes, and process unstructured data." },
      { question: "How much do AI agents cost to run?", answer: "Costs depend on LLM usage. A typical OpenClaw agent workflow costs $0.01-$0.50 per execution depending on the models and skills used. Local models via Ollama can reduce costs to near-zero." },
    ],
  },
  {
    slug: "what-is-llm-routing",
    term: "LLM Routing",
    metaTitle: "What is LLM Routing? — Intelligent Model Selection Explained | ClawSkills",
    metaDescription: "LLM routing automatically selects the best language model for each query based on complexity, cost, and latency. Learn how to implement smart model routing with OpenClaw.",
    shortDefinition: "LLM routing is a technique that automatically selects the optimal language model for each query based on factors like complexity, cost, latency requirements, and task type.",
    sections: [
      {
        heading: "What is LLM Routing?",
        content: "**LLM routing** (also called model routing or intelligent model selection) is a technique that automatically directs each query to the most appropriate language model. Instead of sending every request to the most expensive model, a router analyzes the query's complexity and routes simple questions to fast, cheap models while sending complex reasoning tasks to more capable models.\n\nThis approach can reduce AI API costs by 50-80% while maintaining response quality.",
      },
      {
        heading: "How LLM Routing Works",
        content: "An LLM router typically uses one of these strategies:\n\n- **Classifier-based** — A small classification model predicts which LLM is best for each query\n- **Cascade** — Try a cheap model first; if confidence is low, escalate to a more capable model\n- **Rule-based** — Route based on task type, token count, or user tier\n- **Embedding-based** — Compare the query embedding to a bank of examples to determine the optimal model\n\n**Key routing factors:**\n\n- Query complexity and reasoning requirements\n- Latency requirements (real-time vs. batch)\n- Cost constraints\n- Required capabilities (vision, code, math, multilingual)",
      },
      {
        heading: "LLM Routing with OpenClaw",
        content: "OpenClaw's **LLM Router** skill (`npx clawhub@latest install llm-router`) provides intelligent model selection:\n\n- Supports OpenAI, Anthropic, Google, Mistral, and local models\n- Configurable routing policies (cost-optimized, quality-optimized, latency-optimized)\n- Automatic fallback if a provider is unavailable\n- Usage analytics and cost tracking per model\n\nThe router integrates seamlessly with other OpenClaw skills, so any skill that makes LLM calls can benefit from intelligent routing.",
      },
    ],
    relatedTerms: ["what-is-openclaw", "what-is-prompt-chaining", "what-is-rag-pipeline"],
    faqs: [
      { question: "How much can LLM routing save on API costs?", answer: "Typical savings range from 50-80%. By routing simple queries to models like GPT-4o-mini instead of GPT-4o, you pay 10-20x less per token for those requests without noticeable quality loss." },
      { question: "Does LLM routing add latency?", answer: "The routing decision itself adds 10-50ms of latency. However, by directing queries to faster models when appropriate, overall average latency often decreases." },
      { question: "Can I route to local models with OpenClaw?", answer: "Yes. The LLM Router skill supports local models via Ollama, llama.cpp, and vLLM. You can route privacy-sensitive queries to local models and other queries to cloud APIs." },
    ],
  },
  {
    slug: "what-is-vector-embedding",
    term: "Vector Embedding",
    metaTitle: "What is a Vector Embedding? — AI Representations Explained | ClawSkills",
    metaDescription: "Vector embeddings are numerical representations of text, images, or data that capture semantic meaning. Learn how embeddings power search, RAG, and AI agents.",
    shortDefinition: "A vector embedding is a dense numerical representation (array of floating-point numbers) that captures the semantic meaning of text, images, or other data, enabling similarity search and machine learning operations.",
    sections: [
      {
        heading: "What is a Vector Embedding?",
        content: "A **vector embedding** is a way of representing data (text, images, audio) as an array of numbers (typically 256-3072 dimensions) that captures its semantic meaning. Similar concepts produce similar vectors, enabling machines to understand meaning rather than just matching keywords.\n\nFor example, the sentences \"How do I fix this bug?\" and \"Debug my code\" would have very similar embeddings despite using different words, because they express the same intent.",
      },
      {
        heading: "How Embeddings Are Used",
        content: "Embeddings power many modern AI applications:\n\n- **Semantic Search** — Find documents by meaning, not just keywords\n- **RAG Pipelines** — Retrieve relevant context for LLM generation\n- **Recommendation Systems** — Find similar items, content, or users\n- **Classification** — Categorize text by comparing embeddings to labeled examples\n- **Clustering** — Group similar documents automatically\n- **Anomaly Detection** — Identify outliers in data\n\n**Popular embedding models:**\n\n- OpenAI `text-embedding-3-small` (1536 dimensions)\n- Cohere `embed-v3` (1024 dimensions)\n- Open-source: `all-MiniLM-L6-v2` (384 dimensions)",
      },
      {
        heading: "Vector Embeddings in OpenClaw",
        content: "Several OpenClaw skills use vector embeddings under the hood:\n\n- **RAG Pipeline** — Embeds documents and queries for semantic retrieval\n- **Deep Research** — Uses embeddings to cluster and deduplicate research sources\n- **Semantic Search** — Build custom search engines over any document collection\n\nOpenClaw skills abstract away the complexity of embedding model selection, vector storage, and similarity algorithms, so developers can focus on their application logic.",
      },
    ],
    relatedTerms: ["what-is-rag-pipeline", "what-is-openclaw", "what-is-ai-agent"],
    faqs: [
      { question: "What is the difference between embeddings and tokens?", answer: "Tokens are the raw units of text that LLMs process (words or subwords). Embeddings are dense numerical vectors that represent the meaning of a sequence of tokens. Tokenization is a preprocessing step; embedding captures semantic content." },
      { question: "How do I choose an embedding model?", answer: "Consider three factors: dimension size (higher = more precise but slower), cost (open-source models are free; API models charge per token), and benchmark performance on your specific use case (e.g., MTEB benchmark for text retrieval)." },
      { question: "Where are vector embeddings stored?", answer: "Embeddings are stored in vector databases like Pinecone, Weaviate, Qdrant, ChromaDB, or pgvector (PostgreSQL extension). For small datasets, in-memory storage works. For production, use a managed vector database." },
    ],
  },

  // ═══════════════ NEW ENTRIES ═══════════════

  {
    slug: "what-is-skill-md",
    term: "SKILL.md",
    metaTitle: "What is SKILL.md? — OpenClaw Skill Manifest Explained | ClawSkills",
    metaDescription: "SKILL.md is the manifest file that defines an OpenClaw skill's capabilities, permissions, and behavior. Learn the format, required fields, and security implications.",
    shortDefinition: "SKILL.md is the declarative manifest file that defines an OpenClaw skill's name, description, permissions, tools, and behavioral instructions.",
    sections: [
      { heading: "What is SKILL.md?", content: "**SKILL.md** is the standardized manifest format used by OpenClaw to define AI agent skills. Every skill in the OpenClaw ecosystem is described by a single SKILL.md file that declares what the skill does, what permissions it needs, what tools it provides, and how the agent should behave when using it.\n\nThe format is human-readable Markdown with structured frontmatter, making it easy to audit, version-control, and share. When you run `npx clawhub@latest install <skill-name>`, the SKILL.md file is downloaded and added to your OpenClaw configuration." },
      { heading: "SKILL.md Structure", content: "A typical SKILL.md file contains:\n\n- **Name & Description** — Human-readable identity of the skill\n- **Permissions** — Filesystem, network, and system access declarations\n- **Tools** — Named functions the skill exposes to the AI agent\n- **Instructions** — Behavioral guidelines for how the agent should use the skill\n- **Input/Output Schema** — Optional structured data definitions\n\nThe permission declarations are critical for security. They tell users exactly what system resources the skill will access, enabling informed trust decisions before installation." },
      { heading: "Security Implications", content: "SKILL.md's transparency is a key security feature. Unlike opaque plugin binaries, SKILL.md files are plain text that anyone can read and audit. The ClawSkills directory uses SKILL.md content to generate security ratings and permission summaries.\n\nFor a detailed guide on auditing SKILL.md files, see our security audit article." },
    ],
    relatedTerms: ["what-are-openclaw-skills", "what-is-openclaw"],
    faqs: [
      { question: "Is SKILL.md the same as a README?", answer: "No. A README documents a project for humans. SKILL.md is a machine-readable manifest that OpenClaw parses to understand a skill's capabilities and constraints. It's closer to a package.json than a README." },
      { question: "Can I write my own SKILL.md?", answer: "Yes. Any developer can create a SKILL.md file and publish it as an OpenClaw skill. See our guide on how to create OpenClaw skills for templates and examples." },
      { question: "What happens if SKILL.md declares wrong permissions?", answer: "If a skill accesses resources not declared in its SKILL.md, it's a red flag. Verified skills in the ClawSkills directory have been audited for permission accuracy." },
    ],
  },

  {
    slug: "what-is-mcp-server",
    term: "MCP Server",
    metaTitle: "What is an MCP Server? — Model Context Protocol Explained | ClawSkills",
    metaDescription: "An MCP server exposes tools and data to AI agents via the Model Context Protocol. Learn how MCP servers work, how they compare to OpenClaw skills, and when to use each.",
    shortDefinition: "An MCP (Model Context Protocol) server is a standalone process that exposes tools, resources, and prompts to AI agents via a standardized JSON-RPC protocol.",
    sections: [
      { heading: "What is an MCP Server?", content: "**MCP (Model Context Protocol)** servers are standalone processes that expose capabilities to AI agents through a standardized protocol developed by Anthropic. Each MCP server runs as its own process, communicating with AI agents via JSON-RPC over stdin/stdout or HTTP.\n\nMCP servers can provide **tools** (executable functions), **resources** (data sources), and **prompts** (reusable templates). This separation of concerns allows AI agents to access external systems — databases, APIs, file systems — through a unified interface." },
      { heading: "MCP vs OpenClaw Skills", content: "While both extend AI agent capabilities, they take fundamentally different approaches:\n\n- **MCP servers** run as separate processes with OS-level isolation. They're language-agnostic and can be written in Python, TypeScript, Rust, etc.\n- **OpenClaw skills** are declarative SKILL.md files that run within the OpenClaw process. They're simpler to install and audit but less isolated.\n\nFor a detailed comparison, see our MCP vs Skills article." },
      { heading: "When to Use MCP Servers", content: "MCP servers are ideal when you need:\n\n- **Process isolation** — The tool runs in its own sandbox\n- **Language flexibility** — Write server logic in any language\n- **Shared infrastructure** — Multiple AI agents can connect to the same MCP server\n- **Stateful operations** — Long-running connections to databases or APIs" },
    ],
    relatedTerms: ["what-are-openclaw-skills", "what-is-openclaw"],
    faqs: [
      { question: "Do MCP servers work with OpenClaw?", answer: "Yes. OpenClaw supports MCP servers as tool providers alongside native skills. You can use both simultaneously in the same agent configuration." },
      { question: "Are MCP servers more secure than skills?", answer: "MCP servers provide process-level isolation, which limits the blast radius of vulnerabilities. However, skills offer transparency through auditable SKILL.md declarations. Both approaches have trade-offs." },
      { question: "How do I install an MCP server?", answer: "MCP servers are typically installed via npm (npx) or pip, then configured in your AI client's MCP settings file. The setup varies by server and client." },
    ],
  },

  {
    slug: "what-is-agent-sandboxing",
    term: "Agent Sandboxing",
    metaTitle: "What is Agent Sandboxing? — AI Safety Explained | ClawSkills",
    metaDescription: "Agent sandboxing isolates AI agents from critical systems to prevent unintended actions. Learn sandboxing techniques for OpenClaw and other AI agent frameworks.",
    shortDefinition: "Agent sandboxing is the practice of isolating AI agents within restricted execution environments to prevent unintended or malicious actions on the host system.",
    sections: [
      { heading: "What is Agent Sandboxing?", content: "**Agent sandboxing** refers to the security practice of running AI agents in isolated, restricted environments where they cannot access critical system resources without explicit permission. This is crucial for production AI deployments where agents execute code, access databases, or interact with external APIs.\n\nSandboxing techniques include containerization (Docker), virtual machines, restricted shell environments, and permission-based access control like OpenClaw's SKILL.md declarations." },
      { heading: "Sandboxing in OpenClaw", content: "OpenClaw implements sandboxing through its **permission model**. Each skill declares the system resources it needs in its SKILL.md file — filesystem paths, network endpoints, environment variables. The OpenClaw runtime can enforce these boundaries, rejecting undeclared access attempts.\n\nFor higher isolation, OpenClaw agents can run inside Docker containers or cloud sandboxes like E2B, Fly.io Machines, or Modal." },
    ],
    relatedTerms: ["what-is-openclaw", "what-is-skill-md", "what-is-ai-agent"],
    faqs: [
      { question: "Can OpenClaw agents escape their sandbox?", answer: "If properly configured, OpenClaw's permission model prevents undeclared resource access. However, no sandbox is 100% escape-proof — defense-in-depth with container isolation is recommended for high-security environments." },
      { question: "What sandboxing solutions work with OpenClaw?", answer: "Docker containers, E2B sandboxes, Fly.io Machines, and Modal are popular choices. OpenClaw's own SKILL.md permission system also provides application-level sandboxing." },
    ],
  },

  {
    slug: "what-is-prompt-injection",
    term: "Prompt Injection",
    metaTitle: "What is Prompt Injection? — AI Security Threat Explained | ClawSkills",
    metaDescription: "Prompt injection is an attack that manipulates AI agent behavior by inserting malicious instructions. Learn how it works and how to defend your OpenClaw agents.",
    shortDefinition: "Prompt injection is an attack technique where malicious instructions are inserted into an AI agent's input to manipulate its behavior, bypass safety controls, or exfiltrate data.",
    sections: [
      { heading: "What is Prompt Injection?", content: "**Prompt injection** is the most prevalent security vulnerability in AI agent systems. It occurs when an attacker crafts input that causes an AI model to interpret malicious instructions as part of its system prompt or task instructions.\n\nFor AI agents like those built with OpenClaw, prompt injection is especially dangerous because agents have access to tools — a successful injection could cause the agent to delete files, send emails, or access restricted APIs." },
      { heading: "Types of Prompt Injection", content: "**Direct injection** — The attacker directly provides malicious instructions in the prompt input.\n\n**Indirect injection** — Malicious instructions are hidden in data the agent processes — web pages, documents, emails, or database records. The agent reads the poisoned content and follows the embedded instructions." },
      { heading: "Defenses for OpenClaw Agents", content: "No defense is perfect, but layered approaches reduce risk:\n\n- **Input sanitization** — Strip known injection patterns\n- **Output filtering** — Validate agent actions before execution\n- **Least-privilege permissions** — Use SKILL.md to restrict capabilities\n- **Human-in-the-loop** — Require approval for sensitive actions\n- **Guardrail models** — Use a secondary model to classify inputs as safe/unsafe" },
    ],
    relatedTerms: ["what-is-agent-sandboxing", "what-is-ai-agent", "what-is-openclaw"],
    faqs: [
      { question: "Can prompt injection affect OpenClaw skills?", answer: "Yes. If a skill processes untrusted input (web content, user messages, documents), prompt injection is a risk. Limiting skill permissions via SKILL.md reduces the potential damage." },
      { question: "Is there a complete defense against prompt injection?", answer: "No. Prompt injection is an inherent challenge of language model architecture. The best approach is defense-in-depth: input filtering, output validation, permission restrictions, and human oversight for critical actions." },
    ],
  },

  {
    slug: "what-is-tool-calling",
    term: "Tool Calling",
    metaTitle: "What is Tool Calling in AI? — Function Calling Explained | ClawSkills",
    metaDescription: "Tool calling (function calling) lets AI models invoke external tools and APIs. Learn how OpenClaw uses tool calling to give agents real-world capabilities.",
    shortDefinition: "Tool calling (also called function calling) is the ability of an LLM to invoke external functions, APIs, or system commands as part of its reasoning and response generation.",
    sections: [
      { heading: "What is Tool Calling?", content: "**Tool calling** is the mechanism that allows AI models to go beyond text generation and interact with the real world. When an LLM has access to tools, it can decide to invoke them during a conversation — searching the web, querying a database, running code, or calling an API.\n\nOpenAI calls this 'function calling,' Anthropic calls it 'tool use,' and Google calls it 'function declarations.' The concept is the same: the model outputs a structured request (function name + arguments), the runtime executes the function, and the result is fed back to the model." },
      { heading: "Tool Calling in OpenClaw", content: "OpenClaw skills are fundamentally a tool-calling abstraction. Each skill declares tools in its SKILL.md manifest, and OpenClaw registers them with the connected LLM. When the agent needs a capability, the LLM generates a tool call, OpenClaw executes it, and returns the result." },
    ],
    relatedTerms: ["what-is-ai-agent", "what-is-openclaw", "what-are-openclaw-skills"],
    faqs: [
      { question: "Do all LLMs support tool calling?", answer: "No. Tool calling requires specific model training. Most major commercial models (GPT-4, Claude 3, Gemini) support it, as do some open-source models (Llama 3, Mistral)." },
      { question: "What's the difference between tool calling and RAG?", answer: "Tool calling lets the model invoke functions to perform actions. RAG retrieves relevant documents to augment context. They're complementary — an agent might use RAG to find information and tool calling to act on it." },
    ],
  },

  {
    slug: "what-is-agent-memory",
    term: "Agent Memory",
    metaTitle: "What is Agent Memory? — AI Agent Context & Persistence | ClawSkills",
    metaDescription: "Agent memory allows AI agents to retain context across conversations and tasks. Learn about short-term, long-term, and episodic memory in OpenClaw agents.",
    shortDefinition: "Agent memory is the ability of an AI agent to store, retrieve, and use information from past interactions, enabling contextual awareness and learning over time.",
    sections: [
      { heading: "What is Agent Memory?", content: "**Agent memory** enables AI agents to retain and recall information beyond a single conversation turn. Without memory, every interaction starts from scratch — the agent has no knowledge of past tasks, user preferences, or accumulated context.\n\nIn the OpenClaw ecosystem, memory is implemented through skills that provide storage and retrieval capabilities." },
      { heading: "Types of Agent Memory", content: "**Short-term (working) memory** — The current conversation context. Limited by the model's context window.\n\n**Long-term memory** — Persistent storage using vector databases, key-value stores, or structured databases.\n\n**Episodic memory** — Records of past interactions and outcomes.\n\n**Semantic memory** — Factual knowledge stored as embeddings for semantic similarity search." },
    ],
    relatedTerms: ["what-is-ai-agent", "what-is-rag-pipeline", "what-is-vector-embedding"],
    faqs: [
      { question: "Do OpenClaw agents have memory by default?", answer: "OpenClaw agents have short-term memory (conversation context) by default. For long-term memory, you need to install a memory skill or configure a vector database." },
      { question: "How much memory can an agent have?", answer: "Short-term memory is limited by the LLM's context window. Long-term memory is limited only by your storage infrastructure." },
    ],
  },

  {
    slug: "what-is-llm-orchestration",
    term: "LLM Orchestration",
    metaTitle: "What is LLM Orchestration? — Multi-Step AI Workflows | ClawSkills",
    metaDescription: "LLM orchestration coordinates multiple AI model calls, tool invocations, and decision points into coherent workflows. Learn how OpenClaw handles orchestration.",
    shortDefinition: "LLM orchestration is the coordination of multiple language model calls, tool invocations, and control flow decisions into coherent multi-step AI agent workflows.",
    sections: [
      { heading: "What is LLM Orchestration?", content: "**LLM orchestration** is the process of managing complex AI workflows that involve multiple steps, model calls, tool invocations, and decision points. Orchestration frameworks like OpenClaw handle the complexity of sequencing these steps, managing errors, retrying failures, and maintaining context across the workflow." },
      { heading: "How OpenClaw Orchestrates", content: "OpenClaw's orchestration is **skill-driven**. Developers install skills that give the agent capabilities, and the LLM decides the optimal sequence of actions. OpenClaw handles tool sequencing, error recovery, context management, and output formatting." },
    ],
    relatedTerms: ["what-is-ai-agent", "what-is-openclaw", "what-is-prompt-chaining"],
    faqs: [
      { question: "Is OpenClaw an orchestration framework?", answer: "Yes. OpenClaw is primarily an LLM orchestration framework that uses skills to define agent capabilities and lets the LLM orchestrate multi-step workflows autonomously." },
      { question: "How is orchestration different from prompt chaining?", answer: "Prompt chaining is a specific technique where outputs from one LLM call feed into the next. Orchestration is broader — it includes prompt chaining plus tool calling, error handling, branching logic, and state management." },
    ],
  },

  {
    slug: "what-is-clawhub",
    term: "ClawHub",
    metaTitle: "What is ClawHub? — OpenClaw Skill Registry Explained | ClawSkills",
    metaDescription: "ClawHub is the official registry for distributing and installing OpenClaw skills. Learn how it works, how it relates to ClawSkills, and how to publish skills.",
    shortDefinition: "ClawHub is the official package registry for OpenClaw skills, providing centralized distribution, versioning, and discovery of SKILL.md-based agent capabilities.",
    sections: [
      { heading: "What is ClawHub?", content: "**ClawHub** is the official registry and distribution platform for OpenClaw skills. It serves as the centralized repository where skill authors publish their SKILL.md files and where developers discover and install skills using `npx clawhub@latest install <skill-name>`.\n\nThink of ClawHub as the npm registry for AI agent skills." },
      { heading: "ClawHub vs ClawSkills", content: "**ClawHub** is the registry — it stores and distributes skills. Think of it as the warehouse.\n\n**ClawSkills** (this site) is the curated directory — we review, analyze, compare, and recommend skills. Think of it as the buyer's guide.\n\nClawSkills adds independent security reviews, curated skill stacks, comparison tools, editorial guides, and structured data for AI discoverability." },
    ],
    relatedTerms: ["what-is-openclaw", "what-are-openclaw-skills", "what-is-skill-md"],
    faqs: [
      { question: "Is ClawHub free?", answer: "Yes. ClawHub is free to use for both installing and publishing skills. The OpenClaw ecosystem is open-source." },
      { question: "How do I publish a skill to ClawHub?", answer: "Create a SKILL.md file, test it locally with OpenClaw, then publish using the ClawHub CLI." },
      { question: "What's the difference between ClawHub and ClawSkills?", answer: "ClawHub is the registry (stores/distributes skills). ClawSkills is the curated directory (reviews, compares, and recommends skills)." },
    ],
  },

  {
    slug: "what-is-openclaw-permissions",
    term: "OpenClaw Permissions",
    metaTitle: "What are OpenClaw Permissions? — Skill Security Model | ClawSkills",
    metaDescription: "OpenClaw permissions control what system resources AI agent skills can access. Learn about filesystem, network, and environment variable permissions in SKILL.md.",
    shortDefinition: "OpenClaw permissions are declarations in SKILL.md files that specify which system resources (filesystem, network, environment variables) a skill is allowed to access.",
    sections: [
      { heading: "What are OpenClaw Permissions?", content: "**OpenClaw permissions** are security declarations in SKILL.md files that explicitly state what system resources a skill needs to function. Permissions cover filesystem access, network endpoints, and environment variables." },
      { heading: "Why Permissions Matter", content: "Without declared permissions, an AI skill could silently access any system resource. OpenClaw's permission model provides transparency, auditability, and least-privilege enforcement. The ClawSkills directory uses permission analysis to generate security ratings." },
    ],
    relatedTerms: ["what-is-skill-md", "what-is-openclaw", "what-is-agent-sandboxing"],
    faqs: [
      { question: "Can a skill access resources not listed in its permissions?", answer: "Permission declarations are advisory — they document intent but aren't enforced at the OS level. Container-based sandboxing can enforce hard boundaries." },
      { question: "What permissions should raise red flags?", answer: "Be cautious of skills requesting broad filesystem access, unrestricted network access, access to sensitive environment variables, or shell execution permissions." },
    ],
  },

  {
    slug: "what-is-multi-agent-system",
    term: "Multi-Agent System",
    metaTitle: "What is a Multi-Agent System? — AI Agent Collaboration | ClawSkills",
    metaDescription: "Multi-agent systems coordinate multiple specialized AI agents to solve complex tasks. Learn how OpenClaw supports multi-agent architectures.",
    shortDefinition: "A multi-agent system is an AI architecture where multiple specialized agents collaborate, delegate tasks, and communicate to solve problems beyond a single agent's capability.",
    sections: [
      { heading: "What is a Multi-Agent System?", content: "**Multi-agent systems (MAS)** deploy multiple AI agents, each with specialized skills and roles, that work together to accomplish complex tasks. This mirrors how human teams work — a project might involve a researcher, writer, designer, and reviewer." },
      { heading: "Multi-Agent Patterns", content: "**Supervisor pattern** — A boss agent routes tasks to specialists.\n\n**Peer-to-peer pattern** — Agents communicate directly.\n\n**Pipeline pattern** — Agents arranged in sequence, each enriching output.\n\n**Debate pattern** — Agents propose solutions and critique each other." },
    ],
    relatedTerms: ["what-is-ai-agent", "what-is-openclaw", "what-is-llm-orchestration"],
    faqs: [
      { question: "When should I use multi-agent vs single agent?", answer: "Use multi-agent when the task requires diverse expertise, parallel processing, or review/critique steps. Use single agent for focused tasks that one set of skills can handle." },
      { question: "Does OpenClaw support multi-agent systems?", answer: "OpenClaw supports running multiple agent instances with different skill configurations. For coordination, pair OpenClaw with frameworks like CrewAI or AutoGen." },
    ],
  },

  {
    slug: "what-is-context-window",
    term: "Context Window",
    metaTitle: "What is a Context Window? — LLM Token Limits Explained | ClawSkills",
    metaDescription: "The context window is the maximum text an LLM can process at once. Learn how context windows affect OpenClaw agents and strategies for managing them.",
    shortDefinition: "The context window is the maximum number of tokens that a language model can process in a single interaction, including both input and output.",
    sections: [
      { heading: "What is a Context Window?", content: "The **context window** defines how much information an LLM can 'see' at once. It includes the system prompt, conversation history, tool definitions, tool results, and the model's response.\n\nContext window sizes vary: GPT-4o has 128K tokens, Claude 3.5 Sonnet has 200K, Gemini 1.5 Pro has 1M+, and Llama 3 (8B) has 8K tokens." },
      { heading: "Context Windows and OpenClaw", content: "When running OpenClaw with multiple installed skills, each skill's instructions consume context tokens. An agent with 20 skills might use 10-20K tokens just for skill definitions.\n\nOptimization strategies include installing only needed skills, using larger-context models, enabling dynamic skill selection, and summarizing long conversations." },
    ],
    relatedTerms: ["what-is-ai-agent", "what-is-llm-routing", "what-is-agent-memory"],
    faqs: [
      { question: "What happens when the context window is full?", answer: "The model either truncates older messages, throws an error, or the framework automatically summarizes the conversation. OpenClaw handles context management automatically for most use cases." },
      { question: "Do bigger context windows mean better agents?", answer: "Not necessarily. Larger windows can increase latency and cost, and models tend to lose focus in very long contexts. Right-sized context is often better than maximum context." },
    ],
  },

  {
    slug: "what-are-ai-guardrails",
    term: "AI Guardrails",
    metaTitle: "What are AI Guardrails? — Safety Controls for AI Agents | ClawSkills",
    metaDescription: "AI guardrails are safety mechanisms that constrain AI agent behavior to prevent harmful outputs and actions. Learn how to implement guardrails in OpenClaw agents.",
    shortDefinition: "AI guardrails are safety mechanisms — input validators, output filters, and behavioral constraints — that prevent AI agents from producing harmful outputs or taking dangerous actions.",
    sections: [
      { heading: "What are AI Guardrails?", content: "**AI guardrails** are safety systems that monitor and constrain AI agent behavior. They act as checkpoints that validate inputs before processing and outputs before execution." },
      { heading: "Types of Guardrails", content: "**Input guardrails** — Validate and sanitize inputs. Detect prompt injection or offensive content.\n\n**Output guardrails** — Check outputs before execution. Validate code safety and API authorization.\n\n**Behavioral guardrails** — System-level constraints: rate limiting, spending caps, approval workflows.\n\n**Content guardrails** — Filter responses for harmful, biased, or confidential content." },
    ],
    relatedTerms: ["what-is-prompt-injection", "what-is-agent-sandboxing", "what-is-ai-agent"],
    faqs: [
      { question: "Are guardrails built into OpenClaw?", answer: "OpenClaw provides basic guardrails through its permission model. For advanced guardrails (content filtering, spending caps), install dedicated safety skills or integrate third-party services." },
      { question: "Do guardrails slow down AI agents?", answer: "Guardrails add 50-200ms per check, negligible compared to LLM response times of 1-10 seconds. Critical safety is worth the small performance cost." },
    ],
  },
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}
