/**
 * Skill profiles rebuilt from the public ClawHub registry (2026-11-25).
 *
 * Every number below comes from https://clawhub.ai/api/v1/skills/<slug>?owner=<handle>
 * and every description from the listing's own SKILL.md. Nothing here is a rating,
 * test result or review of ours: we have not installed or run these skills.
 *
 * A skill whose slug has an entry here is rendered from this data, is indexable and
 * is listed in the sitemap. Every other skill page stays `noindex` until it is rebuilt
 * the same way. To refresh: rerun fetch_rebuild_stats.py and update the numbers and
 * `checked` date together.
 */
import type { Skill } from "./skills";

export interface RegistryListing {
  /** ClawHub owner handle; install with `clawhub install @owner/slug`. */
  owner: string;
  displayName: string;
  version: string;
  downloads: number;
  installs: number;
  stars: number;
  /** Date the listing was first published on ClawHub (YYYY-MM-DD). */
  listedSince: string;
  /** Licence. ClawHub licenses every published skill MIT-0 (docs/skill-format.md); null = the version record omits it. */
  license: string | null;
  /** ClawHub's automated moderation verdict; null = no verdict shown. */
  reviewVerdict: string | null;
  /** Language the SKILL.md is written in. */
  language: string;
  /** Plain description of what the SKILL.md does. */
  summary: string;
  /** What you need before it works (keys, binaries, accounts). */
  requires: string[];
  /** Things to know before installing, found by reading the SKILL.md. */
  caveats: string[];
  /** External homepage the listing declares, if any. */
  homepage?: string;
}

export interface RegistryProfile {
  /** Date the registry data was fetched (YYYY-MM-DD). */
  checked: string;
  /** Listings using this slug, most downloaded first. */
  listings: RegistryListing[];
  /** Field overrides applied to the skill record, replacing the old unsourced text. */
  record: Pick<Skill, "description" | "longDescription" | "useCases" | "faqs"> & Partial<Pick<Skill, "name">>;
}

export const REGISTRY_CHECKED = "2026-11-25";

export const clawhubUrl = (owner: string, slug: string) => `https://clawhub.ai/${owner}/skills/${slug}`;
export const installCommand = (owner: string, slug: string) => `clawhub install @${owner}/${slug}`;

const installFaq = (slug: string, owners: string[]) => ({
  question: `How do I install ${slug} from ClawHub?`,
  answer:
    `Install the ClawHub CLI with "npm i -g clawhub", then run ${owners
      .map((o) => `"${installCommand(o, slug)}"`)
      .join(" or ")}. Naming the owner matters: ClawHub resolves the latest version for that owner and extracts the skill into ./skills/${slug}. Run "clawhub inspect @owner/${slug}" first to see its files without installing.`,
});

const safetyFaq = (name: string) => ({
  question: `Is ${name} safe to install?`,
  answer:
    `We have not audited or run it. ClawHub runs its own automated moderation, and its verdict (where one is published) is shown in the listing details on this page. That is ClawHub's automated check, not a guarantee. Read the SKILL.md and any bundled scripts on ClawHub, note which keys and network services it uses, and try it in a sandbox first.`,
});

export const registryProfiles: Record<string, RegistryProfile> = {
  "pdf-generator": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "ivangdavila",
        displayName: "Pdf Generator",
        version: "1.0.1",
        downloads: 14071,
        installs: 417,
        stars: 16,
        listedSince: "2026-02-19",
        license: null,
        reviewVerdict: null,
        language: "English",
        homepage: "https://clawic.com/skills/pdf-generator",
        summary:
          "An instruction-only skill that teaches your agent how to produce PDFs. It maps each source to a library: Markdown to pandoc, HTML/CSS to WeasyPrint (its default recommendation), structured data to ReportLab and plain text to fpdf2. It also covers print CSS (explicit page breaks, keeping headings with their content) and setting document metadata, with reference files for tools, document templates and advanced operations.",
        requires: [
          "No API keys or binaries declared",
          "Whichever PDF library you choose (for example pandoc or WeasyPrint) installed where your agent runs code",
          "Declared for Linux, macOS and Windows",
        ],
        caveats: [
          "Its SKILL.md says it never executes code, generates files itself or makes network requests. The code is reference patterns that you or your agent run.",
        ],
      },
    ],
    record: {
      name: "PDF Generator",
      description:
        "ClawHub's most-downloaded pdf-generator skill (@ivangdavila): guidance for making PDFs from Markdown, HTML, data or code with pandoc, WeasyPrint, ReportLab or fpdf2.",
      longDescription:
        "The pdf-generator skill on ClawHub is published by @ivangdavila and is an instruction-only skill: it gives your OpenClaw agent rules and code patterns for producing PDFs rather than running anything itself. It recommends pandoc for Markdown, WeasyPrint for HTML/CSS, ReportLab for data-driven documents and fpdf2 for simple text, and covers print CSS and document metadata.",
      useCases: [
        "Turn a Markdown report into a PDF with pandoc",
        "Render an HTML/CSS invoice or contract to PDF with WeasyPrint",
        "Generate data-driven PDFs (tables, figures) with ReportLab",
        "Fix page breaks and orphaned headings in printed output",
      ],
      faqs: [
        {
          question: "Who publishes the pdf-generator skill?",
          answer:
            "On ClawHub the pdf-generator slug is published by @ivangdavila (display name \"Pdf Generator\", version 1.0.1). As of 25 November 2026 it showed 14,071 downloads, 417 installs and 16 stars.",
        },
        {
          question: "Does pdf-generator create the PDF by itself?",
          answer:
            "No. Its SKILL.md states that it never executes code, generates files or makes network requests. It provides tool choices and code patterns; your agent or you run them with a library such as WeasyPrint or pandoc.",
        },
        installFaq("pdf-generator", ["ivangdavila"]),
        safetyFaq("pdf-generator"),
      ],
    },
  },

  "github-manager": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "shiiyyo",
        displayName: "AutoGitHub",
        version: "1.0.0",
        downloads: 1487,
        installs: 40,
        stars: 0,
        listedSince: "2026-03-12",
        license: "MIT-0",
        reviewVerdict: "clean",
        language: "Chinese",
        summary:
          "A GitHub repository management skill covering pull-request review, deployment pipelines, changelog generation, GitHub Actions CI/CD templates, issue triage and project boards. Its SKILL.md documents these as commands under a `github` command name, for example `github repos list`, `github review pr --number 123` and `github deploy prod --tag v1.0.0`.",
        requires: ["A GitHub personal access token with repo scope", "Your GitHub username"],
        caveats: [
          "The SKILL.md is written in Chinese.",
          "The `github` commands it documents are not the official GitHub CLI, which is `gh`. Check the skill's files on ClawHub to see what actually runs them before relying on them.",
          "A repo-scoped token can push and delete. Use a fine-grained token limited to the repositories you need.",
        ],
      },
      {
        owner: "thcjp",
        displayName: "github-manager",
        version: "1.0.0",
        downloads: 218,
        installs: 0,
        stars: 0,
        listedSince: "2026-08-02",
        license: "MIT-0",
        reviewVerdict: "clean",
        language: "Chinese",
        summary:
          "Presented as a \"Pro edition\" GitHub manager: batch issue and pull-request operations (close, label, assign, migrate) with a dry-run mode, GraphQL queries across repositories, scheduled automations, team dashboards, webhook management and token audits, documented under a `gh-manager` command. Setup starts with `gh auth login`.",
        requires: ["The GitHub CLI (`gh`) signed in to your account"],
        caveats: [
          "The SKILL.md is written in Chinese and framed as a paid edition, with a free-versus-paid feature table.",
          "No installs recorded on ClawHub as of 25 November 2026.",
        ],
      },
    ],
    record: {
      description:
        "Two ClawHub skills use the github-manager slug: @shiiyyo's AutoGitHub (repo, PR and deploy commands) and @thcjp's batch issue/PR manager. Both are documented in Chinese.",
      longDescription:
        "There is no single \"GitHub Manager\" skill on ClawHub: the github-manager slug is published by two owners. @shiiyyo's AutoGitHub is the more downloaded and covers PR review, deploys, changelogs and CI/CD. @thcjp's listing focuses on batch issue and pull-request operations, GraphQL queries and webhooks, and builds on the official gh CLI. Both SKILL.md files are written in Chinese.",
      useCases: [
        "Review and triage pull requests from an agent conversation",
        "Generate changelogs and release notes from commits",
        "Batch-label, close or reassign issues (with a dry run first)",
        "Set up GitHub Actions workflow templates",
      ],
      faqs: [
        {
          question: "Which github-manager skill should I install?",
          answer:
            "Two owners publish under the github-manager slug. @shiiyyo's AutoGitHub had 1,487 downloads and 40 installs on 25 November 2026; @thcjp's had 218 downloads and 0 installs. If you already use the official gh CLI, @thcjp's builds on it; check what runs the `github` commands in @shiiyyo's before relying on them. Both are documented in Chinese.",
        },
        {
          question: "What access does a GitHub manager skill need?",
          answer:
            "@shiiyyo's asks for a GitHub personal access token with repo scope; @thcjp's uses a signed-in gh CLI. Either way the agent acts with your GitHub permissions, so prefer a fine-grained token limited to specific repositories.",
        },
        installFaq("github-manager", ["shiiyyo", "thcjp"]),
        safetyFaq("github-manager"),
      ],
    },
  },

  "deep-research": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "9438190",
        displayName: "Deep Research",
        version: "1.0.0",
        downloads: 2613,
        installs: 13,
        stars: 0,
        listedSince: "2026-07-13",
        license: "MIT-0",
        reviewVerdict: null,
        language: "Chinese",
        summary:
          "A seven-stage research workflow: two or three scoping questions, an outline you approve, up to five research tasks run one after another (search, crawl, interim findings), a gap review, then a long-form report saved as a Markdown file, with an optional HTML version. It says it was migrated from DuMate's qianfan-deepresearch skill.",
        requires: ["Web search and page-fetch tools available to your agent"],
        caveats: [
          "The SKILL.md and its trigger keywords are mostly in Chinese.",
          "Default report length is 6,000-10,000 Chinese characters, so expect long runs.",
        ],
      },
      {
        owner: "samber",
        displayName: "deep-research",
        version: "1.2.0",
        downloads: 819,
        installs: 5,
        stars: 0,
        listedSince: "2026-08-20",
        license: "MIT-0",
        reviewVerdict: "clean",
        language: "English",
        homepage: "https://github.com/samber/cc-skills",
        summary:
          "Broad parallel web searches with multi-source validation and confidence tracking, producing a cited Markdown report. It supports 11 research types (market, domain, technical, competitive, product, academic, person/org, financial, legal, trend, community) and an optional PDF export.",
        requires: [
          "Internet access (web search and page fetching)",
          "curl; pandoc and md-to-pdf only for the optional PDF export",
        ],
        caveats: [
          "Its compatibility note says it was designed for Claude Code, Codex or a similar harness, and it uses sub-agents for parallel searches.",
        ],
      },
    ],
    record: {
      description:
        "Two deep-research skills on ClawHub: @9438190's seven-stage report workflow (Chinese) and @samber's cited, multi-source research skill (English, 11 research types).",
      longDescription:
        "The deep-research slug on ClawHub is published by two owners. @9438190's is the more downloaded: a seven-stage workflow with an approved outline and a long Markdown report, documented in Chinese. @samber's is in English: parallel searches, cross-source validation, confidence tracking and a cited report, with optional PDF export.",
      useCases: [
        "Produce a sourced report on a market, product or technology",
        "Run a competitive or literature review with citations",
        "Get an outline approved before the agent starts researching",
        "Export a research report to Markdown, HTML or PDF",
      ],
      faqs: [
        {
          question: "Which deep-research skill should I use?",
          answer:
            "If you want English instructions and citations with confidence notes, @samber's deep-research (v1.2.0) is built for that. @9438190's (v1.0.0) is the more downloaded (2,613 vs 819 on 25 November 2026) and follows a fixed seven-stage workflow, but its instructions are in Chinese.",
        },
        {
          question: "Does deep-research need an API key?",
          answer:
            "Neither listing declares an API key. Both rely on the web search and page-fetching tools your agent already has, so the quality of results depends on those tools.",
        },
        installFaq("deep-research", ["9438190", "samber"]),
        safetyFaq("deep-research"),
      ],
    },
  },

  "knowledge-graph": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "safatinaztepe",
        displayName: "Knowledge Graph",
        version: "1.0.0",
        downloads: 7837,
        installs: 257,
        stars: 6,
        listedSince: "2026-02-06",
        license: null,
        reviewVerdict: null,
        language: "English",
        summary:
          "A file-based memory graph maintained by a bundled Python script (kg.py). It adds atomic facts to an entity's items.json under life/areas/<kind>/<slug>/, supersedes old facts instead of deleting them, and regenerates each entity's summary.md from the active facts, with IDs that auto-increment per entity.",
        requires: ["python3"],
        caveats: ["Facts are stored as plain JSON files in your workspace; there is no query language."],
      },
      {
        owner: "paudyyin",
        displayName: "knowledge-graph",
        version: "1.0.0",
        downloads: 548,
        installs: 0,
        stars: 0,
        listedSince: "2026-08-03",
        license: "MIT-0",
        reviewVerdict: "clean",
        language: "Chinese",
        summary:
          "Combines a general agent-memory graph (typed entities and relations in an append-only graph.jsonl, managed with scripts/ontology.py) with OWL semantic reasoning: RDFS, OWL Lite and OWL RL inference, SPARQL and mixed natural-language queries.",
        requires: ["python3"],
        caveats: ["The SKILL.md is written in Chinese.", "No installs recorded on ClawHub as of 25 November 2026."],
      },
      {
        owner: "thcjp",
        displayName: "图谱",
        version: "1.0.1",
        downloads: 537,
        installs: 1,
        stars: 0,
        listedSince: "2026-08-10",
        license: "MIT-0",
        reviewVerdict: "clean",
        language: "Chinese",
        summary:
          "Its summary repeats the @safatinaztepe listing's description almost word for word (\"maintain the compounding knowledge graph under life/areas/**\"), but the SKILL.md body is a generic template rather than instructions for that workflow.",
        requires: ["An API key in an environment variable named API_KEY (the service is not named)"],
        caveats: [
          "Its paid-feature table lists image features (high-resolution output, batch generation, style presets) that have nothing to do with knowledge graphs.",
          "It does not say which service the API key is for.",
        ],
      },
    ],
    record: {
      description:
        "Three ClawHub skills use the knowledge-graph slug. @safatinaztepe's (257 installs) keeps agent memory as JSON facts with a Python script; @paudyyin's adds OWL reasoning and SPARQL.",
      longDescription:
        "The knowledge-graph slug on ClawHub is published by three owners. @safatinaztepe's is by far the most used: a small Python script that records atomic facts per entity, supersedes rather than deletes them, and rebuilds summaries. @paudyyin's is a larger Chinese-language skill that adds OWL inference and SPARQL. @thcjp's copies the first one's description over a generic template.",
      useCases: [
        "Give an agent a persistent memory of people, projects and decisions",
        "Record facts with history instead of overwriting them",
        "Regenerate a readable summary for each entity",
        "Run SPARQL or OWL inference over an ontology (@paudyyin's listing)",
      ],
      faqs: [
        {
          question: "Which knowledge-graph skill do most people install?",
          answer:
            "@safatinaztepe's: 7,837 downloads and 257 installs on 25 November 2026, against 548/0 for @paudyyin's and 537/1 for @thcjp's.",
        },
        {
          question: "Where does the knowledge-graph skill store data?",
          answer:
            "@safatinaztepe's writes plain files in your workspace: items.json (facts) and summary.md per entity under life/areas/. @paudyyin's uses an append-only memory/ontology/graph.jsonl. Neither declares a hosted service.",
        },
        installFaq("knowledge-graph", ["safatinaztepe", "paudyyin"]),
        safetyFaq("knowledge-graph"),
      ],
    },
  },

  "llm-router": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "baofeng-tech",
        displayName: "LLM Router",
        version: "1.0.0",
        downloads: 1047,
        installs: 18,
        stars: 0,
        listedSince: "2026-04-22",
        license: "MIT-0",
        reviewVerdict: null,
        language: "English",
        summary:
          "Model routing and provider setup through AIsa, with a focus on access to Chinese models such as Qwen. It ships a Python client (scripts/llm_router_client.py) for configuring a provider path, listing routed models and choosing a model for a task.",
        requires: ["python3", "An AISA_API_KEY for AIsa's hosted API"],
        caveats: [
          "This is not a local or self-hosted router: it depends on AIsa's API and your AIsa account.",
          "Its SKILL.md frontmatter says Apache-2.0, but ClawHub licenses every published skill MIT-0 and does not support per-skill licence overrides.",
        ],
      },
    ],
    record: {
      description:
        "The llm-router skill on ClawHub (@baofeng-tech) routes model calls through AIsa's API, with a focus on Chinese models such as Qwen. Needs python3 and an AISA_API_KEY.",
      longDescription:
        "The only llm-router skill on ClawHub is published by @baofeng-tech. It uses AIsa for model routing, provider setup and Chinese LLM access, through a bundled Python client. It needs an AIsa API key; it does not route between providers on your own machine.",
      useCases: [
        "Configure AIsa as a model provider for OpenClaw",
        "List the models AIsa can route to",
        "Pick a model for Chinese long-form analysis",
      ],
      faqs: [
        {
          question: "Does llm-router work without an AIsa account?",
          answer:
            "No. The skill requires the AISA_API_KEY environment variable, and its requests go through AIsa's hosted API.",
        },
        {
          question: "Is llm-router a cost-optimisation router across OpenAI, Anthropic and Google?",
          answer:
            "Not according to its SKILL.md. It describes AIsa provider setup, model selection and Chinese-model access, all through AIsa's API.",
        },
        installFaq("llm-router", ["baofeng-tech"]),
        safetyFaq("llm-router"),
      ],
    },
  },

  "social-media-manager": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "tryan310",
        displayName: "Social Media Manager",
        version: "1.1.0",
        downloads: 3305,
        installs: 84,
        stars: 0,
        listedSince: "2026-02-16",
        license: null,
        reviewVerdict: "clean",
        language: "English",
        summary:
          "Creates and schedules social posts through the Postiz API, so it can target any platform connected in Postiz (TikTok, Instagram, X, LinkedIn, Facebook, YouTube, Pinterest, Reddit, Threads). The workflow covers hook ideas, AI-generated images and captions, per-platform formats (for example 1024x1536 six-slide carousels for TikTok and Instagram), draft or scheduled posting, and a review ping to you.",
        requires: ["A Postiz account with your social profiles connected", "A Postiz API key", "Access to an image-generation model for visuals"],
        caveats: [
          "It can publish to your real accounts. Its draft mode (SELF_ONLY) lets you review before anything goes out.",
        ],
      },
    ],
    record: {
      description:
        "The social-media-manager skill on ClawHub (@tryan310) drafts and schedules posts to TikTok, Instagram, X, LinkedIn and more through the Postiz API. Needs a Postiz API key.",
      longDescription:
        "The only social-media-manager skill on ClawHub is published by @tryan310. It turns post ideas into captions and AI-generated visuals, adapts them per platform and schedules them through Postiz, which acts as the publishing layer for every connected network.",
      useCases: [
        "Draft a TikTok or Instagram carousel with AI images and captions",
        "Cross-post the same content to several networks at once",
        "Queue posts as drafts for review before publishing",
        "Schedule posts for set times through Postiz",
      ],
      faqs: [
        {
          question: "Which social networks does social-media-manager support?",
          answer:
            "Whatever you connect in Postiz. The SKILL.md lists TikTok, Instagram, X/Twitter, LinkedIn, Facebook, YouTube, Pinterest, Reddit and Threads.",
        },
        {
          question: "Will it post without asking me?",
          answer:
            "It can schedule and publish through Postiz. Use its draft mode (SELF_ONLY) and the review ping so nothing goes live until you approve it.",
        },
        installFaq("social-media-manager", ["tryan310"]),
        safetyFaq("social-media-manager"),
      ],
    },
  },

  "data-pipeline": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "pagoda111king",
        displayName: "Data Pipeline",
        version: "1.1.0",
        downloads: 1223,
        installs: 23,
        stars: 0,
        listedSince: "2026-04-25",
        license: "MIT-0",
        reviewVerdict: null,
        language: "Chinese",
        summary:
          "A JavaScript library for composable in-memory data pipelines. You build a Pipeline from named stages with per-stage retries and timeouts, using built-in transformers (filter, map, reduce, groupBy, sort, dedup, flatten, paginate, pick, rename, merge) and validators, and read run metrics afterwards.",
        requires: ["Node.js"],
        caveats: [
          "The SKILL.md is written in Chinese; the code examples are in JavaScript.",
          "It processes data in memory inside your agent's Node.js runtime. It is not a scheduler or a cloud ETL service.",
        ],
      },
    ],
    record: {
      description:
        "The data-pipeline skill on ClawHub (@pagoda111king) is a JavaScript library for chaining filter, map, group, sort and dedup stages over in-memory data, with retries and metrics.",
      longDescription:
        "The only data-pipeline skill on ClawHub is published by @pagoda111king. It gives your agent a small JavaScript pipeline engine for cleaning, transforming, validating and aggregating arrays of records, with built-in transformers and per-stage retry and timeout options.",
      useCases: [
        "Clean and deduplicate a list of records",
        "Group and aggregate rows before reporting",
        "Validate data shape before passing it on",
        "Paginate or limit large result sets",
      ],
      faqs: [
        {
          question: "Is data-pipeline an ETL tool like Airflow?",
          answer:
            "No. It is an in-memory JavaScript library: you compose stages and run them over data your agent already has. There is no scheduler, connector catalogue or hosted runtime.",
        },
        {
          question: "What does data-pipeline need to run?",
          answer: "Node.js. No API keys are declared. The documentation is in Chinese, with JavaScript examples.",
        },
        installFaq("data-pipeline", ["pagoda111king"]),
        safetyFaq("data-pipeline"),
      ],
    },
  },

  "logseq-bridge": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "ham-5on",
        displayName: "Logseq Bridge",
        version: "2.0.0",
        downloads: 926,
        installs: 14,
        stars: 0,
        listedSince: "2026-04-25",
        license: "MIT-0",
        reviewVerdict: null,
        language: "English",
        summary:
          "Reads and writes a local Logseq graph by editing its Markdown files directly: append to today's journal, read journals and pages, search and manage pages. No Logseq plugin, HTTP API or open port is involved; Logseq shows the changes after a reload (Cmd/Ctrl+R).",
        requires: ["Logseq installed and opened at least once", "Read/write access to your graph folder, set in an LQ environment variable"],
        caveats: ["It writes straight into your notes. Back up or version your graph folder before letting an agent edit it."],
      },
    ],
    record: {
      description:
        "The logseq-bridge skill on ClawHub (@ham-5on, v2.0.0) lets an agent read and write your Logseq journals and pages as local Markdown files, with no plugin or API.",
      longDescription:
        "The only logseq-bridge skill on ClawHub is published by @ham-5on. It works purely on the filesystem: the agent reads and appends to the .md files in your Logseq graph's journals/ and pages/ folders, and Logseq picks the changes up on reload.",
      useCases: [
        "Append notes or tasks to today's Logseq journal",
        "Read a journal entry or knowledge page into the conversation",
        "Search pages in a local graph",
        "Work with Logseq on WSL or Linux without running a plugin",
      ],
      faqs: [
        {
          question: "Does logseq-bridge need the Logseq HTTP API?",
          answer:
            "No. It reads and writes the graph's Markdown files directly. You point it at the graph folder with the LQ environment variable and reload Logseq to see changes.",
        },
        installFaq("logseq-bridge", ["ham-5on"]),
        safetyFaq("logseq-bridge"),
      ],
    },
  },

  "vision-analyzer": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "kawummuwe-stack",
        displayName: "Vision Analyzer",
        version: "1.0.1",
        downloads: 1053,
        installs: 19,
        stars: 0,
        listedSince: "2026-04-08",
        license: "MIT-0",
        reviewVerdict: null,
        language: "English",
        summary:
          "Describes images, or answers a question about one, by sending it to the Kimi K2.5 vision model on Ollama Cloud through a bundled Python script (vision_analyze.py). Supports JPG, PNG, GIF and WebP.",
        requires: ["python3", "An Ollama API key in OLLAMA_API_KEY"],
        caveats: [
          "Your images are sent to Ollama Cloud; nothing runs locally.",
          "The API key requirement is in the SKILL.md but not declared in the registry metadata.",
          "Its example file paths are for ChromeOS (/mnt/chromeos/...); adjust them for your system.",
        ],
      },
    ],
    record: {
      description:
        "The vision-analyzer skill on ClawHub (@kawummuwe-stack) describes images with the Kimi K2.5 model on Ollama Cloud. Needs python3 and an OLLAMA_API_KEY.",
      longDescription:
        "The only vision-analyzer skill on ClawHub is published by @kawummuwe-stack. It passes a local image and an optional prompt to Kimi K2.5 on Ollama Cloud and returns a plain-language description, which is useful for screenshots, charts, diagrams and text in images.",
      useCases: [
        "Describe a photo or screenshot",
        "Ask what UI elements a screenshot shows",
        "Read text or numbers off a chart or diagram",
      ],
      faqs: [
        {
          question: "Does vision-analyzer run the model locally?",
          answer: "No. It calls the Ollama Cloud API with your OLLAMA_API_KEY, so each image is uploaded to that service.",
        },
        installFaq("vision-analyzer", ["kawummuwe-stack"]),
        safetyFaq("vision-analyzer"),
      ],
    },
  },

  "vercel-deploy": {
    checked: REGISTRY_CHECKED,
    listings: [
      {
        owner: "alexbloch-ia",
        displayName: "Vercel Deploy — BLOCKED, failed & 404 deploys, 4.5 MB limit",
        version: "1.0.1",
        downloads: 389,
        installs: 0,
        stars: 0,
        listedSince: "2026-09-30",
        license: "MIT-0",
        reviewVerdict: null,
        language: "English",
        summary:
          "A troubleshooting skill for Vercel deploys that fail quietly. It reads each deployment's real state from the Vercel API, explains BLOCKED production deploys, checks vercel.json root keys against Vercel's live schema, covers Next.js static-export 404s and rewrites, gives a webhook relay for the 4.5 MB 413 FUNCTION_PAYLOAD_TOO_LARGE limit, and verifies DNS outside your local resolver.",
        requires: ["The vercel CLI, curl and python3", "A VERCEL_TOKEN scoped to one team, passed as an environment variable"],
        caveats: [
          "It diagnoses; it does not deploy. Its API calls are read-only GETs and every deploy command is left to you.",
          "No installs recorded on ClawHub as of 25 November 2026.",
        ],
      },
    ],
    record: {
      description:
        "The vercel-deploy skill on ClawHub (@alexbloch-ia) diagnoses Vercel deploys that fail quietly: BLOCKED prod, vercel.json errors, static-export 404s and the 4.5 MB limit.",
      longDescription:
        "The only vercel-deploy skill on ClawHub is published by @alexbloch-ia. Rather than deploying, it helps an agent find out why a deploy did not go live, starting from the deployment state in the Vercel API and working through config, routing, payload-size and DNS causes.",
      useCases: [
        "Find out why a production deploy shows BLOCKED or UNKNOWN",
        "Check vercel.json for keys Vercel will reject",
        "Fix 404s and no-op rewrites on a Next.js static export",
        "Work around 413 FUNCTION_PAYLOAD_TOO_LARGE for large webhooks",
      ],
      faqs: [
        {
          question: "Does vercel-deploy deploy my project?",
          answer:
            "No. It is a diagnosis skill: its Vercel API calls are read-only, and the SKILL.md leaves every deploy command to you.",
        },
        installFaq("vercel-deploy", ["alexbloch-ia"]),
        safetyFaq("vercel-deploy"),
      ],
    },
  },
};

export const getRegistryProfile = (slug: string): RegistryProfile | undefined => registryProfiles[slug];
