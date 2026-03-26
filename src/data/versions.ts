export interface OpenClawVersion {
  version: string;
  codename: string;
  releaseDate: string;
  githubUrl: string;
  isLatest?: boolean;
  highlights: string[];
  stats: {
    skills: number;
    mcpServers: number;
    contributors: number;
    downloads: string;
  };
  features: {
    skillMarketplace: boolean;
    mcpSupport: boolean;
    multiAgent: boolean;
    localModels: boolean;
    browserAutomation: boolean;
    pluginSandbox: boolean;
    streamingOutput: boolean;
    skillChaining: boolean;
    gitOps: boolean;
    openShellCompliance: boolean;
    gpuAcceleration: boolean;
    nativeWindows: boolean;
  };
  breakingChanges?: string[];
  migrationNotes?: string;
}

export const openclawVersions: OpenClawVersion[] = [
  {
    version: "0.30.x",
    codename: "Apex",
    releaseDate: "2026-03-15",
    githubUrl: "https://github.com/openclaw-ai/openclaw/releases/tag/v0.30.0",
    isLatest: true,
    highlights: [
      "GPU-accelerated skill execution via CUDA/ROCm",
      "OpenShell v2 compliance for cross-agent interoperability",
      "Native Windows support (no WSL required)",
      "Skill chaining with typed connectors",
      "Real-time collaborative multi-agent orchestration",
    ],
    stats: { skills: 5705, mcpServers: 312, contributors: 1840, downloads: "2.1M" },
    features: {
      skillMarketplace: true,
      mcpSupport: true,
      multiAgent: true,
      localModels: true,
      browserAutomation: true,
      pluginSandbox: true,
      streamingOutput: true,
      skillChaining: true,
      gitOps: true,
      openShellCompliance: true,
      gpuAcceleration: true,
      nativeWindows: true,
    },
  },
  {
    version: "0.29.x",
    codename: "Talon",
    releaseDate: "2026-01-22",
    githubUrl: "https://github.com/openclaw-ai/openclaw/releases/tag/v0.29.0",
    highlights: [
      "OpenShell v1 compliance — unified agent protocol",
      "Streaming output for long-running skills",
      "GitOps-based skill deployment pipelines",
      "Improved plugin sandboxing with Deno isolates",
      "50% faster cold-start for MCP servers",
    ],
    stats: { skills: 4980, mcpServers: 275, contributors: 1620, downloads: "1.7M" },
    features: {
      skillMarketplace: true,
      mcpSupport: true,
      multiAgent: true,
      localModels: true,
      browserAutomation: true,
      pluginSandbox: true,
      streamingOutput: true,
      skillChaining: false,
      gitOps: true,
      openShellCompliance: true,
      gpuAcceleration: false,
      nativeWindows: false,
    },
    breakingChanges: [
      "SKILL.md v3 frontmatter format required",
      "Deprecated `claw run` in favor of `claw exec`",
    ],
    migrationNotes: "Run `npx clawhub@latest migrate` to update SKILL.md files to v3 format.",
  },
  {
    version: "0.28.x",
    codename: "Prowl",
    releaseDate: "2025-10-08",
    githubUrl: "https://github.com/openclaw-ai/openclaw/releases/tag/v0.28.0",
    highlights: [
      "Multi-agent orchestration with supervisor patterns",
      "Browser automation skills (Playwright integration)",
      "Plugin sandbox for untrusted skills",
      "Community skill rating system",
      "Ollama integration for zero-cost local LLMs",
    ],
    stats: { skills: 4200, mcpServers: 210, contributors: 1380, downloads: "1.2M" },
    features: {
      skillMarketplace: true,
      mcpSupport: true,
      multiAgent: true,
      localModels: true,
      browserAutomation: true,
      pluginSandbox: true,
      streamingOutput: false,
      skillChaining: false,
      gitOps: false,
      openShellCompliance: false,
      gpuAcceleration: false,
      nativeWindows: false,
    },
    breakingChanges: [
      "MCP server protocol updated to JSON-RPC 2.0",
      "Removed legacy `skills.yaml` config format",
    ],
    migrationNotes: "Update MCP server configs to JSON-RPC 2.0 format. See migration guide in docs.",
  },
  {
    version: "0.27.x",
    codename: "Strike",
    releaseDate: "2025-07-14",
    githubUrl: "https://github.com/openclaw-ai/openclaw/releases/tag/v0.27.0",
    highlights: [
      "MCP (Model Context Protocol) server support",
      "Skill marketplace with verified badges",
      "Local model support via Ollama & LM Studio",
      "One-command skill installation: npx clawhub install",
      "Security audit framework for SKILL.md files",
    ],
    stats: { skills: 3100, mcpServers: 120, contributors: 980, downloads: "780K" },
    features: {
      skillMarketplace: true,
      mcpSupport: true,
      multiAgent: false,
      localModels: true,
      browserAutomation: false,
      pluginSandbox: false,
      streamingOutput: false,
      skillChaining: false,
      gitOps: false,
      openShellCompliance: false,
      gpuAcceleration: false,
      nativeWindows: false,
    },
  },
  {
    version: "0.26.x",
    codename: "Pounce",
    releaseDate: "2025-04-02",
    githubUrl: "https://github.com/openclaw-ai/openclaw/releases/tag/v0.26.0",
    highlights: [
      "SKILL.md v2 specification with typed permissions",
      "ClawHub registry for publishing skills",
      "Multi-provider LLM support (OpenAI, Anthropic, Google)",
      "Interactive skill scaffolding wizard",
      "Community contribution guidelines",
    ],
    stats: { skills: 1800, mcpServers: 0, contributors: 520, downloads: "340K" },
    features: {
      skillMarketplace: true,
      mcpSupport: false,
      multiAgent: false,
      localModels: false,
      browserAutomation: false,
      pluginSandbox: false,
      streamingOutput: false,
      skillChaining: false,
      gitOps: false,
      openShellCompliance: false,
      gpuAcceleration: false,
      nativeWindows: false,
    },
  },
  {
    version: "0.25.x",
    codename: "Claw",
    releaseDate: "2025-01-10",
    githubUrl: "https://github.com/openclaw-ai/openclaw/releases/tag/v0.25.0",
    highlights: [
      "Initial public release of OpenClaw",
      "SKILL.md v1 specification",
      "OpenAI GPT-4 integration",
      "Basic skill installation via npx",
      "MIT license — fully open source",
    ],
    stats: { skills: 450, mcpServers: 0, contributors: 120, downloads: "45K" },
    features: {
      skillMarketplace: false,
      mcpSupport: false,
      multiAgent: false,
      localModels: false,
      browserAutomation: false,
      pluginSandbox: false,
      streamingOutput: false,
      skillChaining: false,
      gitOps: false,
      openShellCompliance: false,
      gpuAcceleration: false,
      nativeWindows: false,
    },
  },
];

export const featureLabels: Record<string, string> = {
  skillMarketplace: "Skill Marketplace",
  mcpSupport: "MCP Server Support",
  multiAgent: "Multi-Agent Orchestration",
  localModels: "Local Models (Ollama)",
  browserAutomation: "Browser Automation",
  pluginSandbox: "Plugin Sandbox",
  streamingOutput: "Streaming Output",
  skillChaining: "Skill Chaining",
  gitOps: "GitOps Deployment",
  openShellCompliance: "OpenShell Compliance",
  gpuAcceleration: "GPU Acceleration",
  nativeWindows: "Native Windows",
};
