export interface OpenClawVersion {
  version: string;
  codename: string;
  releaseDate: string;
  type: "stable" | "beta" | "pre-release";
  githubUrl: string;
  isLatest?: boolean;
  riskLevel: "low" | "medium" | "high";
  mainFocus: string;
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
    openaiGateway: boolean;
    containerCli: boolean;
    cspHardening: boolean;
    clawhubFirstInstall: boolean;
  };
  breakingChanges?: string[];
  migrationNotes?: string;
}

export const openclawVersions: OpenClawVersion[] = [
  {
    version: "2026.3.24",
    codename: "Apex",
    releaseDate: "2026-03-24",
    type: "stable",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.3.24",
    isLatest: true,
    riskLevel: "low",
    mainFocus: "OpenAI-compatible gateway endpoints, better tools visibility, Control UI and skills UX upgrades, Teams improvements, container CLI support, and several delivery/security fixes",
    highlights: [
      "OpenAI-compatible gateway: /v1/models, /v1/embeddings, model override forwarding",
      "Improved skill status visibility and one-click install recipes in UI and CLI",
      "Container CLI support with --container command",
      "Better Node-version prechecks and preflight checks",
      "Teams improvements and Control UI upgrades",
    ],
    stats: { skills: 5705, mcpServers: 312, contributors: 1840, downloads: "2.1M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: true,
      gitOps: true, openShellCompliance: true, gpuAcceleration: true, nativeWindows: true,
      openaiGateway: true, containerCli: true, cspHardening: true, clawhubFirstInstall: true,
    },
  },
  {
    version: "2026.3.24-beta.2",
    codename: "Apex β2",
    releaseDate: "2026-03-23",
    type: "pre-release",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.3.24-beta.2",
    riskLevel: "medium",
    mainFocus: "Small fix pass: outbound media behavior, Node 22.14 support floor, update preflight, and audit-test isolation",
    highlights: [
      "Outbound media behavior fixes",
      "Node 22.14 minimum support floor enforced",
      "Update preflight improvements",
      "Audit-test isolation for CI pipelines",
    ],
    stats: { skills: 5680, mcpServers: 310, contributors: 1835, downloads: "2.0M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: true,
      gitOps: true, openShellCompliance: true, gpuAcceleration: true, nativeWindows: true,
      openaiGateway: true, containerCli: true, cspHardening: true, clawhubFirstInstall: true,
    },
  },
  {
    version: "2026.3.24-beta.1",
    codename: "Apex β1",
    releaseDate: "2026-03-22",
    type: "pre-release",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.3.24-beta.1",
    riskLevel: "medium",
    mainFocus: "Full March 24 feature drop including major UI, channel, and tooling changes plus many fixes",
    highlights: [
      "Initial rollout of OpenAI-compatible gateway endpoints",
      "Major UI and channel improvements",
      "New tooling and skill management changes",
      "Foundation for 2026.3.24 stable",
    ],
    stats: { skills: 5650, mcpServers: 308, contributors: 1830, downloads: "1.95M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: true,
      gitOps: true, openShellCompliance: true, gpuAcceleration: true, nativeWindows: true,
      openaiGateway: true, containerCli: false, cspHardening: true, clawhubFirstInstall: true,
    },
  },
  {
    version: "2026.3.23",
    codename: "Talon",
    releaseDate: "2026-03-23",
    type: "stable",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.3.23",
    riskLevel: "medium",
    mainFocus: "Qwen/Model Studio expansion, UI clarity work, CSP hardening, and many fixes around auth, ClawHub, plugins, browser attach, and provider behavior",
    highlights: [
      "Qwen and Model Studio provider expansion",
      "CSP hardening for improved security",
      "Auth and ClawHub plugin fixes",
      "Browser attach behavior improvements",
      "Provider behavior stabilization",
    ],
    stats: { skills: 5400, mcpServers: 295, contributors: 1780, downloads: "1.85M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: true,
      gitOps: true, openShellCompliance: true, gpuAcceleration: true, nativeWindows: true,
      openaiGateway: false, containerCli: false, cspHardening: true, clawhubFirstInstall: true,
    },
    breakingChanges: [
      "CSP policy changes may block custom inline scripts",
      "Auth token refresh flow updated — old sessions may require re-login",
    ],
    migrationNotes: "Clear browser cache and re-authenticate after upgrading. Review CSP headers if using custom extensions.",
  },
  {
    version: "2026.3.22",
    codename: "Strike",
    releaseDate: "2026-03-22",
    type: "stable",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.3.22",
    riskLevel: "high",
    mainFocus: "Major platform migration: ClawHub-first installs, Chrome relay removal, legacy env removal, old state-dir fallback removal, new plugin SDK expectations, and new sandbox backends",
    highlights: [
      "ClawHub-first install and update flows with bundle discovery",
      "Chrome relay removal — direct browser attach",
      "Legacy CLAWDBOT_* and MOLTBOT_* env vars removed",
      "Old .moltbot state-dir fallback removed",
      "New plugin SDK expectations and sandbox backends",
      "Default model changed to openai/gpt-5.4",
    ],
    stats: { skills: 5200, mcpServers: 280, contributors: 1720, downloads: "1.7M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: false,
      gitOps: true, openShellCompliance: true, gpuAcceleration: false, nativeWindows: false,
      openaiGateway: false, containerCli: false, cspHardening: false, clawhubFirstInstall: true,
    },
    breakingChanges: [
      "Chrome relay removed — use direct browser attach instead",
      "Legacy CLAWDBOT_* and MOLTBOT_* environment variables no longer supported",
      "Old .moltbot state directory fallback removed",
      "Plugin SDK v2 required — old plugins must be updated",
      "Default model changed from gpt-4o to openai/gpt-5.4",
    ],
    migrationNotes: "Run `npx clawhub@latest migrate` to update config files. Remove all CLAWDBOT_* and MOLTBOT_* env vars. Update plugins to SDK v2.",
  },
  {
    version: "2026.3.11",
    codename: "Prowl",
    releaseDate: "2026-03-11",
    type: "stable",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.3.11",
    riskLevel: "low",
    mainFocus: "Local-first Ollama integration, CoinFello skill, and stability improvements",
    highlights: [
      "Local-first Ollama integration for zero-cost LLMs",
      "CoinFello skill for crypto portfolio tracking",
      "Stability and performance improvements",
      "Microsoft Teams SDK integration",
    ],
    stats: { skills: 4980, mcpServers: 275, contributors: 1620, downloads: "1.5M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: false,
      gitOps: true, openShellCompliance: true, gpuAcceleration: false, nativeWindows: false,
      openaiGateway: false, containerCli: false, cspHardening: false, clawhubFirstInstall: false,
    },
  },
  {
    version: "2026.2.21",
    codename: "Pounce",
    releaseDate: "2026-02-21",
    type: "stable",
    githubUrl: "https://github.com/openclaw/openclaw/releases/tag/v2026.2.21",
    riskLevel: "low",
    mainFocus: "Fallback chains, provider resilience, and security updates",
    highlights: [
      "Fallback chain support for model providers",
      "Provider resilience improvements",
      "Security hardening and audit fixes",
      "Improved error handling across skills",
    ],
    stats: { skills: 4600, mcpServers: 250, contributors: 1500, downloads: "1.2M" },
    features: {
      skillMarketplace: true, mcpSupport: true, multiAgent: true, localModels: true,
      browserAutomation: true, pluginSandbox: true, streamingOutput: true, skillChaining: false,
      gitOps: true, openShellCompliance: false, gpuAcceleration: false, nativeWindows: false,
      openaiGateway: false, containerCli: false, cspHardening: false, clawhubFirstInstall: false,
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
  openaiGateway: "OpenAI-Compatible Gateway",
  containerCli: "Container CLI",
  cspHardening: "CSP Hardening",
  clawhubFirstInstall: "ClawHub-First Install",
};
