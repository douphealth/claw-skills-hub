import { categories, skills } from "@/data/skills";

export type ProBundleDownloadKind = "manifest" | "shell" | "powershell";

export const PRO_BUNDLE_PRICE_USD = 7.99;
export const PRO_BUNDLE_PRODUCT_NAME = "ClawSkills Pro Bundle";

const SITE_URL = "https://openclaw-skillshub.com";

function assertSafeSlug(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Unsafe skill slug: ${slug}`);
  }
  return slug;
}

function skillSlugs() {
  return skills.map((skill) => assertSafeSlug(skill.slug));
}

export function buildProBundleManifest() {
  const generatedAt = new Date().toISOString();

  return JSON.stringify(
    {
      schemaVersion: 1,
      product: PRO_BUNDLE_PRODUCT_NAME,
      generatedAt,
      source: {
        site: SITE_URL,
        directory: `${SITE_URL}/skills`,
        note: "This export is generated from the same documented-skill dataset used by ClawSkills at download time.",
      },
      skillCount: skills.length,
      categoryCount: categories.length,
      install: {
        singleSkill: "npx clawhub@latest install <skill-slug>",
        updateInstalledSkills: "npx clawhub@latest update",
        verifyCli: "clawhub --version",
      },
      categories: categories.map((category) => ({
        name: category.name,
        slug: category.slug,
        documentedSkillCount: skills.filter((skill) => skill.categorySlug === category.slug).length,
      })),
      skills: skills.map((skill) => ({
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
        categorySlug: skill.categorySlug,
        description: skill.description,
        installCommand: skill.installCmd,
        version: skill.version,
        lastUpdated: skill.lastUpdated,
        trustLabel: skill.securityStatus,
        rating: skill.rating,
        guideUrl: `${SITE_URL}/skills/${skill.categorySlug}/${skill.slug}`,
      })),
    },
    null,
    2,
  );
}

export function buildShellInstaller() {
  const slugs = skillSlugs().join(" ");

  return `#!/usr/bin/env bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install Node.js 18+ first." >&2
  exit 1
fi

echo "Installing ${skills.length} documented ClawSkills entries with clawhub..."
npx clawhub@latest install ${slugs}

echo
echo "Installation command completed."
echo "Verify with: clawhub --version"
echo "Update later with: npx clawhub@latest update"
`;
}

export function buildPowerShellInstaller() {
  const slugs = skillSlugs().join(" ");

  return `$ErrorActionPreference = "Stop"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js is required. Install Node.js 18+ first."
}

Write-Host "Installing ${skills.length} documented ClawSkills entries with clawhub..."
npx clawhub@latest install ${slugs}

if ($LASTEXITCODE -ne 0) {
  throw "clawhub installation command failed with exit code $LASTEXITCODE"
}

Write-Host ""
Write-Host "Installation command completed."
Write-Host "Verify with: clawhub --version"
Write-Host "Update later with: npx clawhub@latest update"
`;
}

export function getProBundleDownload(kind: ProBundleDownloadKind) {
  switch (kind) {
    case "manifest":
      return {
        filename: "clawskills-pro-bundle-manifest.json",
        mimeType: "application/json",
        content: buildProBundleManifest(),
      };
    case "shell":
      return {
        filename: "clawskills-install-all.sh",
        mimeType: "text/x-shellscript",
        content: buildShellInstaller(),
      };
    case "powershell":
      return {
        filename: "clawskills-install-all.ps1",
        mimeType: "text/plain",
        content: buildPowerShellInstaller(),
      };
  }
}

export function downloadProBundle(kind: ProBundleDownloadKind) {
  const file = getProBundleDownload(kind);
  const blob = new Blob([file.content], { type: file.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = file.filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
