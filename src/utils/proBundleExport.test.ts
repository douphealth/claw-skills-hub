import { describe, expect, it } from "vitest";
import { skills } from "@/data/skills";
import {
  PRO_BUNDLE_SKILL_COUNT,
  buildPowerShellInstaller,
  buildProBundleManifest,
  buildShellInstaller,
  getProBundleDownload,
} from "@/utils/proBundleExport";

describe("Pro Bundle exports", () => {
  it("keeps the paid bundle count tied to the documented skill dataset", () => {
    expect(PRO_BUNDLE_SKILL_COUNT).toBe(skills.length);

    const manifest = JSON.parse(buildProBundleManifest());
    expect(manifest.skillCount).toBe(skills.length);
    expect(manifest.skills).toHaveLength(skills.length);
    expect(manifest.skills[0]).toMatchObject({
      slug: skills[0].slug,
      installCommand: skills[0].installCmd,
    });
  });

  it("generates shell and PowerShell installers from safe skill slugs", () => {
    const shell = buildShellInstaller();
    const powershell = buildPowerShellInstaller();

    expect(shell).toContain("set -euo pipefail");
    expect(shell).toContain("npx clawhub@latest install");
    expect(powershell).toContain('$ErrorActionPreference = "Stop"');
    expect(powershell).toContain("npx clawhub@latest install");

    for (const skill of skills) {
      expect(skill.slug).toMatch(/^[a-z0-9-]+$/);
      expect(shell).toContain(skill.slug);
      expect(powershell).toContain(skill.slug);
    }
  });

  it("returns stable filenames for every paid download", () => {
    expect(getProBundleDownload("manifest").filename).toBe("clawskills-pro-bundle-manifest.json");
    expect(getProBundleDownload("shell").filename).toBe("clawskills-install-all.sh");
    expect(getProBundleDownload("powershell").filename).toBe("clawskills-install-all.ps1");
  });
});
