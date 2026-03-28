import { skills, categories } from "@/data/skills";
import { articles } from "@/data/articles";
import { tutorials } from "@/data/tutorials";
import { glossaryEntries } from "@/data/glossary";
import { intentHubs } from "@/data/intentHubs";

const BASE_URL = "https://openclaw-skillshub.com";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
}

export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/skills", changefreq: "daily", priority: 0.9 },
    { loc: "/install", changefreq: "weekly", priority: 0.85 },
    { loc: "/versions", changefreq: "weekly", priority: 0.85 },
    { loc: "/skills/compare", changefreq: "weekly", priority: 0.7 },
    { loc: "/articles", changefreq: "weekly", priority: 0.8 },
    { loc: "/tutorials", changefreq: "weekly", priority: 0.8 },
    { loc: "/glossary", changefreq: "weekly", priority: 0.8 },
    { loc: "/trust-methodology", changefreq: "monthly", priority: 0.7 },
    { loc: "/privacy", changefreq: "monthly", priority: 0.3 },
    { loc: "/terms", changefreq: "monthly", priority: 0.3 },
  ];

  // Intent hub pages
  intentHubs.forEach((hub) => {
    entries.push({
      loc: `/use-cases/${hub.slug}`,
      changefreq: "weekly",
      priority: 0.85,
    });
  });

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

  // Glossary pages
  glossaryEntries.forEach((entry) => {
    entries.push({
      loc: `/glossary/${entry.slug}`,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}

export function generateSitemapXML(): string {
  const entries = generateSitemapEntries();
  const urls = entries
    .map(
      (e) =>
        `  <url>
    <loc>${BASE_URL}${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
