import type { Skill } from "@/data/skills";

export type ExportFormat = "markdown" | "json" | "yaml" | "txt";

const formatLabels: Record<ExportFormat, string> = {
  markdown: "Markdown (.md)",
  json: "JSON (.json)",
  yaml: "YAML (.yaml)",
  txt: "Plain Text (.txt)",
};

const formatExtensions: Record<ExportFormat, string> = {
  markdown: "md",
  json: "json",
  yaml: "yaml",
  txt: "txt",
};

const formatMimeTypes: Record<ExportFormat, string> = {
  markdown: "text/markdown",
  json: "application/json",
  yaml: "text/yaml",
  txt: "text/plain",
};

/* ── Helpers ── */

const TOOLS = [
  { id: "system.run", description: "Execute shell commands in a sandboxed environment", risk: "medium" },
  { id: "file.read", description: "Read files from the agent workspace", risk: "low" },
  { id: "file.write", description: "Write or modify files in the agent workspace", risk: "medium" },
  { id: "web.search", description: "Search the web for real-time information", risk: "low" },
  { id: "web.fetch", description: "Fetch content from URLs", risk: "low" },
  { id: "llm.call", description: "Invoke LLM completions via configured providers", risk: "low" },
];

const COMPAT = [
  { platform: "macOS", arch: "arm64 / x86_64", status: "Full Support", minVersion: "13.0+" },
  { platform: "Linux", arch: "x86_64 / arm64", status: "Full Support", minVersion: "Ubuntu 22.04+ / Fedora 38+" },
  { platform: "Windows (WSL 2)", arch: "x86_64", status: "Supported", minVersion: "WSL 2 + Ubuntu 22.04+" },
];

function securityLabel(s: Skill["securityStatus"]) {
  return s === "verified" ? "✅ Verified by OpenClaw Security Team" : s === "community" ? "🟡 Community-reviewed" : "⚠️ Unreviewed — use with caution";
}

function generateExampleConfig(skill: Skill): string {
  return JSON.stringify({
    skill: skill.slug,
    version: skill.version,
    provider: "openai",
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 4096,
    retry: { attempts: 3, backoff: "exponential" },
    timeout: 30000,
    logging: { level: "info", destination: "stdout" },
  }, null, 2);
}

function generateExampleUsage(skill: Skill): string {
  return `# Basic usage
openclaw run ${skill.slug}

# With custom config
openclaw run ${skill.slug} --config ./${skill.slug}.config.json

# Piped input
echo "your input here" | openclaw run ${skill.slug}

# Verbose mode for debugging
openclaw run ${skill.slug} --verbose --log-level debug

# Dry run (validate without executing)
openclaw run ${skill.slug} --dry-run`;
}

/* ── Markdown ── */

function toMarkdown(skill: Skill): string {
  const cfg = generateExampleConfig(skill);
  const usage = generateExampleUsage(skill);

  return `---
name: "${skill.name}"
slug: "${skill.slug}"
category: "${skill.category}"
categorySlug: "${skill.categorySlug}"
author: "${skill.author}"
version: "${skill.version}"
rating: ${skill.rating}
security: "${skill.securityStatus}"
license: "MIT"
install: "${skill.installCmd}"
lastUpdated: "${skill.lastUpdated}"
openclaw_spec: "1.0"
---

# ${skill.name}

> ${skill.description}

**Security:** ${securityLabel(skill.securityStatus)}  
**Author:** ${skill.author} · **Version:** ${skill.version} · **Rating:** ⭐ ${skill.rating}/5  
**Last Updated:** ${skill.lastUpdated} · **License:** MIT

---

## Overview

${skill.longDescription}

---

## Quick Start

### 1. Install

\`\`\`bash
${skill.installCmd}
\`\`\`

### 2. Verify Installation

\`\`\`bash
openclaw skills list --installed | grep ${skill.slug}
openclaw skills info ${skill.slug}
\`\`\`

### 3. Run

\`\`\`bash
${usage}
\`\`\`

---

## Configuration

Create \`${skill.slug}.config.json\` in your project root:

\`\`\`json
${cfg}
\`\`\`

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| \`OPENCLAW_API_KEY\` | Yes | Your OpenClaw API key |
| \`OPENAI_API_KEY\` | Conditional | Required if using OpenAI models |
| \`ANTHROPIC_API_KEY\` | Conditional | Required if using Claude models |
| \`OPENCLAW_LOG_LEVEL\` | No | Log level: debug, info, warn, error |

---

## Use Cases

${skill.useCases.map((uc, i) => `### ${i + 1}. ${uc}`).join("\n\n")}

---

## Compatibility

| Platform | Architecture | Status | Minimum Version |
|----------|-------------|--------|-----------------|
${COMPAT.map((c) => `| ${c.platform} | ${c.arch} | ${c.status} | ${c.minVersion} |`).join("\n")}

### Prerequisites

- **OpenClaw CLI** ≥ 1.0.0
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **bun** ≥ 1.0.0

---

## Tools & Permissions

This skill requests the following OpenClaw tool permissions during execution:

| Permission | Description | Risk Level |
|------------|-------------|------------|
${TOOLS.map((t) => `| \`${t.id}\` | ${t.description} | ${t.risk} |`).join("\n")}

You will be prompted to approve these permissions on first run. Use \`--trust\` to auto-approve for CI/CD.

---

## Changelog

### v${skill.version} — ${skill.lastUpdated}

- Latest stable release
- Improved output formatting and reliability
- Enhanced error handling and retry logic
- Performance optimizations

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| \`SKILL_NOT_FOUND\` | Run \`openclaw skills update\` to refresh the registry |
| \`PERMISSION_DENIED\` | Ensure your API key has the required scopes |
| \`TIMEOUT_ERROR\` | Increase \`timeout\` in config or use \`--timeout 60000\` |
| \`MODEL_UNAVAILABLE\` | Check provider status or configure a fallback model |

---

## Uninstall

\`\`\`bash
openclaw skills uninstall ${skill.slug}
\`\`\`

---

${skill.faqs?.length ? `## FAQ\n\n${skill.faqs.map((f) => `**Q: ${f.question}**\n\n${f.answer}`).join("\n\n---\n\n")}\n\n---\n\n` : ""}## Related Skills

${skill.relatedSlugs.map((s) => `- [\`${s}\`](https://openclaw-skillshub.com/skills/${skill.categorySlug}/${s})`).join("\n")}

---

## Links

- **Registry:** https://openclaw-skillshub.com/skills/${skill.categorySlug}/${skill.slug}
- **Issues:** https://github.com/openclaw-skills/${skill.slug}/issues
- **OpenClaw Docs:** https://docs.openclaw.dev

---

*Generated by ClawSkills · openclaw_spec v1.0 · ${new Date().toISOString().split("T")[0]}*
`;
}

/* ── JSON ── */

function toJson(skill: Skill): string {
  return JSON.stringify(
    {
      $schema: "https://schemas.openclaw.dev/skill/v1.json",
      openclaw_spec: "1.0",
      name: skill.name,
      slug: skill.slug,
      category: skill.category,
      categorySlug: skill.categorySlug,
      description: skill.description,
      longDescription: skill.longDescription,
      author: skill.author,
      version: skill.version,
      license: "MIT",
      rating: skill.rating,
      securityStatus: skill.securityStatus,
      lastUpdated: skill.lastUpdated,
      install: {
        command: skill.installCmd,
        verify: `openclaw skills info ${skill.slug}`,
        uninstall: `openclaw skills uninstall ${skill.slug}`,
      },
      runtime: {
        engine: "openclaw",
        minVersion: "1.0.0",
        node: ">=18.0.0",
        timeout: 30000,
        retry: { attempts: 3, backoff: "exponential" },
      },
      config: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 4096,
        logging: { level: "info", destination: "stdout" },
      },
      permissions: TOOLS.map((t) => ({
        tool: t.id,
        description: t.description,
        riskLevel: t.risk,
      })),
      compatibility: COMPAT.map((c) => ({
        platform: c.platform,
        architecture: c.arch,
        status: c.status,
        minVersion: c.minVersion,
      })),
      prerequisites: [
        { name: "OpenClaw CLI", version: ">=1.0.0" },
        { name: "Node.js", version: ">=18.0.0" },
      ],
      useCases: skill.useCases,
      faqs: (skill.faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
      relatedSlugs: skill.relatedSlugs,
      changelog: [
        {
          version: skill.version,
          date: skill.lastUpdated,
          changes: [
            "Latest stable release",
            "Improved output formatting and reliability",
            "Enhanced error handling and retry logic",
          ],
        },
      ],
      links: {
        registry: `https://openclaw-skillshub.com/skills/${skill.categorySlug}/${skill.slug}`,
        issues: `https://github.com/openclaw-skills/${skill.slug}/issues`,
        docs: "https://docs.openclaw.dev",
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

/* ── YAML ── */

function toYaml(skill: Skill): string {
  const indent = (s: string, n: number) => s.split("\n").map((l) => " ".repeat(n) + l).join("\n");

  return `# ══════════════════════════════════════════════════════════════
# OpenClaw Skill Manifest — ${skill.name}
# Spec: openclaw_spec v1.0
# Generated: ${new Date().toISOString().split("T")[0]}
# ══════════════════════════════════════════════════════════════

openclaw_spec: "1.0"

# ── Identity ──────────────────────────────────────────────────
name: "${skill.name}"
slug: "${skill.slug}"
category: "${skill.category}"
categorySlug: "${skill.categorySlug}"
author: "${skill.author}"
version: "${skill.version}"
license: "MIT"
rating: ${skill.rating}
securityStatus: "${skill.securityStatus}"
lastUpdated: "${skill.lastUpdated}"

# ── Description ───────────────────────────────────────────────
description: "${skill.description}"
longDescription: |
  ${skill.longDescription}

# ── Installation ──────────────────────────────────────────────
install:
  command: "${skill.installCmd}"
  verify: "openclaw skills info ${skill.slug}"
  uninstall: "openclaw skills uninstall ${skill.slug}"

# ── Runtime ───────────────────────────────────────────────────
runtime:
  engine: "openclaw"
  minVersion: "1.0.0"
  node: ">=18.0.0"
  timeout: 30000
  retry:
    attempts: 3
    backoff: "exponential"

# ── Default Configuration ────────────────────────────────────
config:
  provider: "openai"
  model: "gpt-4o"
  temperature: 0.7
  max_tokens: 4096
  logging:
    level: "info"
    destination: "stdout"

# ── Permissions ───────────────────────────────────────────────
permissions:
${TOOLS.map((t) => `  - tool: "${t.id}"
    description: "${t.description}"
    risk: "${t.risk}"`).join("\n")}

# ── Compatibility ────────────────────────────────────────────
compatibility:
${COMPAT.map((c) => `  - platform: "${c.platform}"
    architecture: "${c.arch}"
    status: "${c.status}"
    minVersion: "${c.minVersion}"`).join("\n")}

prerequisites:
  - name: "OpenClaw CLI"
    version: ">=1.0.0"
  - name: "Node.js"
    version: ">=18.0.0"

# ── Use Cases ─────────────────────────────────────────────────
useCases:
${skill.useCases.map((uc) => `  - "${uc}"`).join("\n")}

# ── FAQ ───────────────────────────────────────────────────────
${skill.faqs?.length ? `faqs:\n${skill.faqs.map((f) => `  - question: "${f.question}"\n    answer: "${f.answer}"`).join("\n")}` : "faqs: []"}

# ── Related Skills ────────────────────────────────────────────
relatedSlugs:
${skill.relatedSlugs.map((s) => `  - "${s}"`).join("\n")}

# ── Changelog ─────────────────────────────────────────────────
changelog:
  - version: "${skill.version}"
    date: "${skill.lastUpdated}"
    changes:
      - "Latest stable release"
      - "Improved output formatting and reliability"
      - "Enhanced error handling and retry logic"

# ── Links ─────────────────────────────────────────────────────
links:
  registry: "https://openclaw-skillshub.com/skills/${skill.categorySlug}/${skill.slug}"
  issues: "https://github.com/openclaw-skills/${skill.slug}/issues"
  docs: "https://docs.openclaw.dev"
`;
}

/* ── Plain Text ── */

function toPlainText(skill: Skill): string {
  const hr = "═".repeat(64);
  const sr = "─".repeat(64);

  return `${hr}
  ${skill.name.toUpperCase()}
  OpenClaw Skill Manifest · v${skill.version}
${hr}

SECURITY: ${securityLabel(skill.securityStatus)}

${skill.description}

${sr}
  OVERVIEW
${sr}

${skill.longDescription}

${sr}
  QUICK START
${sr}

1. INSTALL
   ${skill.installCmd}

2. VERIFY
   openclaw skills info ${skill.slug}

3. RUN
   openclaw run ${skill.slug}

4. WITH CONFIG
   openclaw run ${skill.slug} --config ./${skill.slug}.config.json

5. VERBOSE / DEBUG
   openclaw run ${skill.slug} --verbose --log-level debug

6. DRY RUN
   openclaw run ${skill.slug} --dry-run

${sr}
  CONFIGURATION
${sr}

Default config (${skill.slug}.config.json):

${generateExampleConfig(skill)}

Environment Variables:
  OPENCLAW_API_KEY     (required)  Your OpenClaw API key
  OPENAI_API_KEY       (conditional) If using OpenAI models
  ANTHROPIC_API_KEY    (conditional) If using Claude models
  OPENCLAW_LOG_LEVEL   (optional)  debug | info | warn | error

${sr}
  USE CASES
${sr}

${skill.useCases.map((uc, i) => `  ${i + 1}. ${uc}`).join("\n")}

${sr}
  COMPATIBILITY
${sr}

  Platform          Architecture      Status          Minimum
  ────────          ────────────      ──────          ───────
${COMPAT.map((c) => `  ${c.platform.padEnd(18)}${c.arch.padEnd(18)}${c.status.padEnd(16)}${c.minVersion}`).join("\n")}

Prerequisites:
  • OpenClaw CLI ≥ 1.0.0
  • Node.js ≥ 18.0.0
  • npm ≥ 9.0.0 or bun ≥ 1.0.0

${sr}
  PERMISSIONS
${sr}

${TOOLS.map((t) => `  ${t.id.padEnd(16)} ${t.description.padEnd(50)} [${t.risk}]`).join("\n")}

${sr}
  TROUBLESHOOTING
${sr}

  SKILL_NOT_FOUND    → Run 'openclaw skills update'
  PERMISSION_DENIED  → Check API key scopes
  TIMEOUT_ERROR      → Increase timeout in config
  MODEL_UNAVAILABLE  → Check provider or set fallback

${sr}
  UNINSTALL
${sr}

  openclaw skills uninstall ${skill.slug}

${skill.faqs?.length ? `${sr}\n  FAQ\n${sr}\n\n${skill.faqs.map((f) => `  Q: ${f.question}\n  A: ${f.answer}`).join("\n\n")}\n\n` : ""}${sr}
  METADATA
${sr}

  Name:         ${skill.name}
  Slug:         ${skill.slug}
  Category:     ${skill.category}
  Author:       ${skill.author}
  Version:      ${skill.version}
  Rating:       ${skill.rating}/5
  Security:     ${skill.securityStatus}
  License:      MIT
  Updated:      ${skill.lastUpdated}
  Spec:         openclaw_spec v1.0

${sr}
  RELATED SKILLS
${sr}

${skill.relatedSlugs.map((s) => `  • ${s}`).join("\n")}

${hr}
  Generated by ClawSkills · ${new Date().toISOString().split("T")[0]}
${hr}
`;
}

/* ── Public API ── */

export function generateSkillContent(skill: Skill, format: ExportFormat): string {
  switch (format) {
    case "markdown": return toMarkdown(skill);
    case "json": return toJson(skill);
    case "yaml": return toYaml(skill);
    case "txt": return toPlainText(skill);
  }
}

export function downloadSkill(skill: Skill, format: ExportFormat) {
  const content = generateSkillContent(skill, format);
  const blob = new Blob([content], { type: formatMimeTypes[format] });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${skill.slug}.${formatExtensions[format]}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export { formatLabels, formatExtensions };
