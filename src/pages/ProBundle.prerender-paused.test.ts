import { it, expect } from "vitest";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

it("renders the checkout pause in actual no-JavaScript bundle HTML", () => {
  // Execute the real generator and real repository data in an isolated temp root.
  // No app server, credential, payment provider, or external request is used.
  const fixture = mkdtempSync(join(tmpdir(), "openclaw-checkout-prerender-"));
  try {
    mkdirSync(join(fixture, "scripts"));
    mkdirSync(join(fixture, "dist"));
    copyFileSync("scripts/prerender.mjs", join(fixture, "scripts/prerender.mjs"));
    copyFileSync(".prerender-data.json", join(fixture, ".prerender-data.json"));
    copyFileSync("index.html", join(fixture, "dist/index.html"));
    execFileSync(process.execPath, [join(fixture, "scripts/prerender.mjs")], { cwd: fixture, timeout: 15000 });
    const html = readFileSync(join(fixture, "dist/pro-bundle/index.html"), "utf8");
    expect(html).toContain("Checkout temporarily unavailable");
    expect(html).toContain("Purchases are paused while we verify the replacement. Free tools remain available.");
    expect(html).toContain('"availability":"https://schema.org/OutOfStock"');
    expect(html).not.toContain('href="/pro-bundle/#checkout"');
    expect(html).toContain('href="/install/"');
    expect(html).toContain('href="/skills/"');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
