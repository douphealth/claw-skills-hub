import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  publishedDate?: string;
  updatedDate?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead = ({
  title,
  description,
  canonical,
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

    setMeta("description", safeDesc);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", safeDesc, true);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

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
  }, [fullTitle, safeDesc, canonical, jsonLd]);

  return null;
};

export default SEOHead;
