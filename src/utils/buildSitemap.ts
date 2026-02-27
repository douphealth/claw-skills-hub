import { generateSitemapXML } from "@/utils/generateSitemap";

/**
 * Generate and download the dynamic sitemap.
 * In a build step or SSR context, this would write to public/sitemap.xml.
 * For the SPA, we expose it as a downloadable utility.
 */
export function printSitemap() {
  console.log(generateSitemapXML());
}

// Auto-generate on import in dev
if (import.meta.env.DEV) {
  // Write to console for copying
  console.log("[Sitemap] Generated dynamic sitemap with", generateSitemapXML().match(/<url>/g)?.length, "URLs");
}
