import type { Plugin } from "vite";
import { skills, categories } from "./src/data/skills";
import { articles } from "./src/data/articles";
import { tutorials } from "./src/data/tutorials";

const BASE_URL = "https://clawskills.com";

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
    { loc: "/articles", changefreq: "weekly", priority: 0.8 },
    { loc: "/tutorials", changefreq: "weekly", priority: 0.8 },
  ];

  // Category landing pages
  categories.forEach((cat) => {
    entries.push({
      loc: `/skills/${cat.slug}`,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  // Individual skill pages
  skills.forEach((skill) => {
    entries.push({
      loc: `/skills/${skill.categorySlug}/${skill.slug}`,
      lastmod: skill.lastUpdated,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  // Article pages
  articles.forEach((article) => {
    entries.push({
      loc: `/articles/${article.slug}`,
      lastmod: article.updatedDate,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  // Tutorial pages
  tutorials.forEach((tutorial) => {
    entries.push({
      loc: `/tutorials/${tutorial.slug}`,
      lastmod: tutorial.updatedDate,
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
    generateBundle() {
      const entries = buildEntries();
      const xml = toXML(entries);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: xml,
      });
      console.log(`[Sitemap] Generated sitemap with ${entries.length} URLs`);
    },
  };
}
