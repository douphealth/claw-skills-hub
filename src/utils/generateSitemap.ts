import { skills, categories } from "@/data/skills";
import { articles } from "@/data/articles";
import { tutorials } from "@/data/tutorials";

const BASE_URL = "https://clawskills.com";

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
    { loc: "/articles", changefreq: "weekly", priority: 0.8 },
    { loc: "/tutorials", changefreq: "weekly", priority: 0.8 },
  ];

  // Category pages
  categories.forEach((cat) => {
    entries.push({
      loc: `/skills?category=${cat.slug}`,
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
