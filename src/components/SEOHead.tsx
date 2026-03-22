import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  publishedDate?: string;
  updatedDate?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://openclaw-skillshub.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const SEOHead = ({
  title,
  description,
  canonical,
  type = "website",
  publishedDate,
  updatedDate,
  ogImage,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title.includes("ClawSkills") ? title : `${title} | ClawSkills`;
  const safeDesc = description.slice(0, 160);

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("description", safeDesc);
    setMeta("author", "ClawSkills");

    // Open Graph
    const ogImg = ogImage || DEFAULT_OG_IMAGE;
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", safeDesc, true);
    setMeta("og:type", type, true);
    setMeta("og:image", ogImg, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:site_name", "ClawSkills", true);
    setMeta("og:locale", "en_US", true);
    if (canonical) {
      setMeta("og:url", canonical, true);
    }

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", safeDesc);
    setMeta("twitter:image", ogImg);
    setMeta("twitter:site", "@openclaw");

    // Article dates
    if (type === "article") {
      if (publishedDate) setMeta("article:published_time", publishedDate, true);
      if (updatedDate) setMeta("article:modified_time", updatedDate, true);
      setMeta("article:author", "ClawSkills", true);
      setMeta("article:section", "Technology", true);
    }

    // Robots
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);

      // hreflang
      let hreflang = document.querySelector('link[rel="alternate"][hreflang="en"]') as HTMLLinkElement | null;
      if (!hreflang) {
        hreflang = document.createElement("link");
        hreflang.setAttribute("rel", "alternate");
        hreflang.setAttribute("hreflang", "en");
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute("href", canonical);

      // x-default hreflang
      let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement | null;
      if (!xDefault) {
        xDefault = document.createElement("link");
        xDefault.setAttribute("rel", "alternate");
        xDefault.setAttribute("hreflang", "x-default");
        document.head.appendChild(xDefault);
      }
      xDefault.setAttribute("href", canonical);
    }

    // JSON-LD
    if (jsonLd) {
      const id = "seo-jsonld";
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [fullTitle, safeDesc, canonical, type, publishedDate, updatedDate, ogImage, jsonLd]);

  return null;
};

export default SEOHead;
