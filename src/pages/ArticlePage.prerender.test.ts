import { it, expect } from "vitest";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

type Pick = { name: string; slug: string; description: string; whyPicked: string; installCmd: string };
type Article = { slug: string; skills: Pick[] };

// What a crawler that does not run JavaScript reads: the text inside the prerendered block.
const crawlerText = (html: string) => {
  const block = html.split('<div class="prerendered-content">')[1] ?? "";
  return block.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
};

it("prerenders every article with the skill picks visitors see, not just the introduction", () => {
  const fixture = mkdtempSync(join(tmpdir(), "openclaw-article-prerender-"));
  try {
    for (const d of ["scripts", "dist", "src/data"]) mkdirSync(join(fixture, d), { recursive: true });
    copyFileSync("scripts/prerender.mjs", join(fixture, "scripts/prerender.mjs"));
    copyFileSync(".prerender-data.json", join(fixture, ".prerender-data.json"));
    copyFileSync("src/data/proBundleStats.json", join(fixture, "src/data/proBundleStats.json"));
    copyFileSync("index.html", join(fixture, "dist/index.html"));
    execFileSync(process.execPath, [join(fixture, "scripts/prerender.mjs")], { cwd: fixture, timeout: 15000, env: { ...process.env, PRO_BUNDLE_LIVE: "" } });
    const articles = (JSON.parse(readFileSync(".prerender-data.json", "utf8")) as { articles: Article[] }).articles;
    expect(articles.length).toBeGreaterThan(40);
    const thin: string[] = [];
    for (const article of articles) {
      const text = crawlerText(readFileSync(join(fixture, "dist/articles", article.slug, "index.html"), "utf8"));
      for (const pick of article.skills) {
        expect(text, `${article.slug}: ${pick.name}`).toContain(pick.name);
        expect(text, `${article.slug}: why ${pick.name} was picked`).toContain(pick.whyPicked.replace(/\s+/g, " "));
        expect(text, `${article.slug}: install command for ${pick.name}`).toContain(pick.installCmd);
      }
      if (text.split(" ").filter(Boolean).length < 300) thin.push(article.slug);
    }
    expect(thin).toEqual([]);
    // The roundup that gave crawlers 112 words before this was fixed.
    const pkm = readFileSync(join(fixture, "dist/articles/best-notes-pkm-skills-openclaw/index.html"), "utf8");
    expect(pkm).toContain("<h2>Skills covered in this guide</h2>");
    expect(pkm).toContain('<a href="/skills/notes-pkm/obsidian-vault/">Full skill review</a>');
    expect(crawlerText(pkm)).not.toMatch(/\b4\.\d\b/); // no unverified star ratings in the crawler copy
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
