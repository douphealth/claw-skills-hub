import type { Plugin } from "vite";
import { skills, categories } from "./src/data/skills";
import { articles } from "./src/data/articles";
import { tutorials } from "./src/data/tutorials";
import { glossaryEntries } from "./src/data/glossary";

const BASE_URL = "https://openclaw-skillshub.com";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: number;
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/skills", changefreq: "daily", priority: 0.9 },
    { loc: "/skills/compare", changefreq: "weekly", priority: 0.7 },
    { loc: "/articles", changefreq: "weekly", priority: 0.8 },
    { loc: "/tutorials", changefreq: "weekly", priority: 0.8 },
    { loc: "/glossary", changefreq: "weekly", priority: 0.8 },
    { loc: "/privacy", changefreq: "monthly", priority: 0.3 },
    { loc: "/terms", changefreq: "monthly", priority: 0.3 },
  ];

  categories.forEach((cat) => {
    entries.push({
      loc: `/skills/${cat.slug}/`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  skills.forEach((skill) => {
    entries.push({
      loc: `/skills/${skill.categorySlug}/${skill.slug}/`,
      lastmod: skill.lastUpdated,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  articles.forEach((article) => {
    entries.push({
      loc: `/articles/${article.slug}`,
      lastmod: article.updatedDate,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  tutorials.forEach((tutorial) => {
    entries.push({
      loc: `/tutorials/${tutorial.slug}`,
      lastmod: tutorial.updatedDate,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  glossaryEntries.forEach((entry) => {
    entries.push({
      loc: `/glossary/${entry.slug}`,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}

function toXML(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${BASE_URL}${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export default function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    generateBundle(_options: unknown, bundle: Record<string, unknown>) {
      const entries = buildEntries();
      const xml = toXML(entries);
      (bundle as Record<string, unknown>)["sitemap.xml"] = {
        type: "asset",
        fileName: "sitemap.xml",
        source: xml,
        name: undefined,
        needsCodeReference: false,
      };
      console.log(`[Sitemap] Generated sitemap.xml with ${entries.length} URLs`);
    },
  } as unknown as Plugin;
}
