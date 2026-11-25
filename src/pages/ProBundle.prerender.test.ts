import { it, expect } from "vitest";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const run = (live: boolean) => {
  const fixture = mkdtempSync(join(tmpdir(), "openclaw-kit-prerender-"));
  try {
    for (const d of ["scripts", "dist", "src/data"]) mkdirSync(join(fixture, d), { recursive: true });
    copyFileSync("scripts/prerender.mjs", join(fixture, "scripts/prerender.mjs"));
    copyFileSync(".prerender-data.json", join(fixture, ".prerender-data.json"));
    copyFileSync("src/data/proBundleStats.json", join(fixture, "src/data/proBundleStats.json"));
    copyFileSync("index.html", join(fixture, "dist/index.html"));
    const env = { ...process.env, PRO_BUNDLE_LIVE: live ? "1" : "", PRO_BUNDLE_PAYMENT_LINK: live ? "https://buy.stripe.com/test_abc123" : "" };
    execFileSync(process.execPath, [join(fixture, "scripts/prerender.mjs")], { cwd: fixture, timeout: 15000, env });
    const read = (r: string) => readFileSync(join(fixture, "dist", r, "index.html"), "utf8");
    return { page: read("pro-bundle"), success: read("pro-bundle/success"), restore: read("pro-bundle/restore") };
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
};

it("prerenders the kit offer honestly and keeps checkout off until PRO_BUNDLE_LIVE=1", () => {
  const off = run(false);
  expect(off.page).toContain("OpenClaw Skill Safety Kit");
  expect(off.page).toContain('"availability":"https://schema.org/OutOfStock"');
  expect(off.page).toContain("Checkout opens soon");
  expect(off.page).not.toContain('href="/api/pro-bundle/buy"');
  for (const claim of ["60+", "Security Audited", "1 year of updates", "money-back"]) expect(off.page).not.toContain(claim);
  for (const p of [off.success, off.restore]) expect(p).toContain('<meta name="robots" content="noindex, follow"');

  const on = run(true);
  expect(on.page).toContain('"availability":"https://schema.org/InStock"');
  expect(on.page).toContain('href="https://buy.stripe.com/test_abc123"');
});
