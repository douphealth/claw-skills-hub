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

function toMarkdown(skill: Skill): string {
  return `---
name: ${skill.name}
slug: ${skill.slug}
category: ${skill.category}
author: ${skill.author}
version: ${skill.version}
rating: ${skill.rating}
security: ${skill.securityStatus}
install: ${skill.installCmd}
lastUpdated: ${skill.lastUpdated}
---

# ${skill.name}

${skill.description}

## About

${skill.longDescription}

## Installation

\`\`\`bash
${skill.installCmd}
\`\`\`

## Use Cases

${skill.useCases.map((uc, i) => `${i + 1}. ${uc}`).join("\n")}

## Compatibility

| Platform | Status |
|----------|--------|
| macOS | Full Support |
| Linux | Full Support |
| Windows (WSL) | Supported |

## Tools & Permissions

- system.run
- file.read
- file.write
- web.search

## Metadata

- **Author:** ${skill.author}
- **Version:** ${skill.version}
- **Rating:** ${skill.rating}/5
- **Security:** ${skill.securityStatus}
- **Last Updated:** ${skill.lastUpdated}
- **License:** MIT
${skill.faqs?.length ? `\n## FAQ\n\n${skill.faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}` : ""}
`;
}

function toYaml(skill: Skill): string {
  return `name: "${skill.name}"
slug: "${skill.slug}"
category: "${skill.category}"
categorySlug: "${skill.categorySlug}"
author: "${skill.author}"
version: "${skill.version}"
rating: ${skill.rating}
securityStatus: "${skill.securityStatus}"
installCmd: "${skill.installCmd}"
lastUpdated: "${skill.lastUpdated}"
description: "${skill.description}"
longDescription: |
  ${skill.longDescription}
useCases:
${skill.useCases.map((uc) => `  - "${uc}"`).join("\n")}
compatibility:
  macOS: "Full Support"
  Linux: "Full Support"
  Windows_WSL: "Supported"
tools:
  - system.run
  - file.read
  - file.write
  - web.search
${skill.faqs?.length ? `faqs:\n${skill.faqs.map((f) => `  - question: "${f.question}"\n    answer: "${f.answer}"`).join("\n")}` : ""}
relatedSlugs:
${skill.relatedSlugs.map((s) => `  - "${s}"`).join("\n")}
`;
}

function toPlainText(skill: Skill): string {
  return `${skill.name}
${"=".repeat(skill.name.length)}

${skill.description}

${skill.longDescription}

INSTALL: ${skill.installCmd}

CATEGORY: ${skill.category}
AUTHOR: ${skill.author}
VERSION: ${skill.version}
RATING: ${skill.rating}/5
SECURITY: ${skill.securityStatus}
LAST UPDATED: ${skill.lastUpdated}
LICENSE: MIT

USE CASES:
${skill.useCases.map((uc, i) => `  ${i + 1}. ${uc}`).join("\n")}

COMPATIBILITY:
  macOS — Full Support
  Linux — Full Support
  Windows (WSL) — Supported

TOOLS & PERMISSIONS:
  system.run, file.read, file.write, web.search
${skill.faqs?.length ? `\nFAQ:\n${skill.faqs.map((f) => `  Q: ${f.question}\n  A: ${f.answer}`).join("\n\n")}` : ""}
`;
}

function toJson(skill: Skill): string {
  return JSON.stringify(
    {
      name: skill.name,
      slug: skill.slug,
      category: skill.category,
      categorySlug: skill.categorySlug,
      description: skill.description,
      longDescription: skill.longDescription,
      installCmd: skill.installCmd,
      author: skill.author,
      version: skill.version,
      rating: skill.rating,
      securityStatus: skill.securityStatus,
      lastUpdated: skill.lastUpdated,
      license: "MIT",
      useCases: skill.useCases,
      compatibility: { macOS: "Full Support", Linux: "Full Support", "Windows (WSL)": "Supported" },
      tools: ["system.run", "file.read", "file.write", "web.search"],
      faqs: skill.faqs || [],
      relatedSlugs: skill.relatedSlugs,
    },
    null,
    2
  );
}

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
