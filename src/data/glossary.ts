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
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}
