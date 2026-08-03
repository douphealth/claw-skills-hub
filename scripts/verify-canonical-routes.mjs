import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const dataPath = path.join(root, ".prerender-data.json");

const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};

const read = (file) => fs.readFileSync(path.join(dist, file), "utf8");
const canonicalFrom = (html) => html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? "";
const firstH1From = (html) => html.match(/<h1[^>]*>([^<]*)<\/h1>/i)?.[1]?.trim() ?? "";

if (!fs.existsSync(dist) || !fs.existsSync(dataPath)) {
  fail("Build output or .prerender-data.json is missing; run npm run build first.");
} else {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const sitemap = read("sitemap.xml");
  const redirects = fs.existsSync(path.join(dist, "_redirects")) ? read("_redirects") : "";
  const skills = data.skills ?? [];
  const categories = data.categories ?? [];

  if (!redirects.includes("/skills/:category/:skill /skills/:category/:skill/ 301")) {
    fail("Dynamic skill 301 redirect rule is missing from dist/_redirects.");
  }

  for (const skill of skills) {
    const route = `/skills/${skill.categorySlug}/${skill.slug}/`;
    const file = `skills/${skill.categorySlug}/${skill.slug}/index.html`;
    if (!fs.existsSync(path.join(dist, file))) {
      fail(`Missing prerendered skill route: ${route}`);
      continue;
    }

    const html = read(file);
    const canonical = canonicalFrom(html);
    const h1 = firstH1From(html);
    if (canonical !== `https://openclaw-skillshub.com${route}`) {
      fail(`Skill canonical mismatch for ${route}: ${canonical || "missing"}`);
    }
    if (h1 !== skill.name) {
      fail(`Skill H1 mismatch for ${route}: ${h1 || "missing"}`);
    }
    if (html.includes("Install: undefined")) {
      fail(`Skill prerender contains an undefined install command: ${route}`);
    }
    if (!sitemap.includes(`<loc>https://openclaw-skillshub.com${route}</loc>`)) {
      fail(`Skill route missing from sitemap: ${route}`);
    }
    if (sitemap.includes(`<loc>https://openclaw-skillshub.com${route.slice(0, -1)}</loc>`)) {
      fail(`Noncanonical skill URL remains in sitemap: ${route.slice(0, -1)}`);
    }
  }

  for (const category of categories) {
    const route = `/skills/${category.slug}/`;
    const file = `skills/${category.slug}/index.html`;
    if (!fs.existsSync(path.join(dist, file))) {
      fail(`Missing prerendered category route: ${route}`);
      continue;
    }
    if (canonicalFrom(read(file)) !== `https://openclaw-skillshub.com${route}`) {
      fail(`Category canonical mismatch for ${route}`);
    }
  }

  const notFound = read("404.html");
  if (!/<meta name="robots" content="noindex, follow"/i.test(notFound)) {
    fail("dist/404.html is not marked noindex,follow.");
  }

  if (process.exitCode !== 1) {
    console.log(`✅ Canonical route contract verified: ${skills.length} skills, ${categories.length} categories, 404 noindex.`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
