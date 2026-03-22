import type { Skill } from "@/data/skills";
import type { Article } from "@/data/articles";
import type { Tutorial } from "@/data/tutorials";

const SITE_URL = "https://openclaw-skillshub.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ClawSkills",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: "The definitive directory for OpenClaw AI agent skills. Discover, compare, and install 5,705+ skills across 10 categories with security reviews.",
    foundingDate: "2025",
    sameAs: [
      "https://github.com/openclaw",
      "https://twitter.com/openclaw",
      "https://discord.gg/openclaw",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/`,
    },
    knowsAbout: [
      "OpenClaw AI Agent Framework",
      "AI Agent Skills",
      "SKILL.md",
      "ClawHub",
      "MCP Servers",
      "Prompt Chaining",
      "RAG Pipelines",
      "LLM Routing",
      "AI Automation",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClawSkills",
    alternateName: ["ClawSkills Directory", "OpenClaw Skills Hub"],
    url: SITE_URL,
    description: "The definitive directory for OpenClaw AI agent skills. Discover, compare, and install 5,705+ skills across 10 categories.",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/skills?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "ClawSkills",
      url: SITE_URL,
    },
  };
}

export function collectionPageJsonLd(
  name: string,
  description: string,
  url: string,
  numberOfItems: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE_URL}${url}`,
    numberOfItems,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "ClawSkills",
      url: SITE_URL,
    },
  };
}

export function webPageJsonLd(
  name: string,
  description: string,
  url: string,
  dateModified?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${url}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "ClawSkills",
      url: SITE_URL,
    },
    ...(dateModified && { dateModified }),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".tl-dr", "[data-speakable]"],
    },
  };
}

export function skillJsonLd(skill: Skill) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: skill.name,
    description: skill.description,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "AI Agent Skill",
    operatingSystem: "Cross-platform (macOS, Linux, Windows WSL)",
    author: { "@type": "Person", name: skill.author },
    softwareVersion: skill.version,
    dateModified: skill.lastUpdated,
    url: `${SITE_URL}/skills/${skill.categorySlug}/${skill.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: skill.rating,
      bestRating: "5",
      worstRating: "1",
      ratingCount: Math.floor(skill.rating * 20 + 10),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    isPartOf: {
      "@type": "WebApplication",
      name: "ClawSkills Directory",
      url: SITE_URL,
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    wordCount: article.readTime ? parseInt(article.readTime) * 200 : undefined,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: "ClawSkills", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "ClawSkills",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/articles/${article.slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".tl-dr", "[data-speakable]"],
    },
    isPartOf: {
      "@type": "WebSite",
      name: "ClawSkills",
      url: SITE_URL,
    },
  };
}

export function howToJsonLd(tutorial: Tutorial) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.metaDescription,
    totalTime: `PT${parseInt(tutorial.readTime || "10")}M`,
    step: tutorial.sections.map((section, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: section.heading,
      text: section.content.slice(0, 200),
    })),
  };
}

export function itemListJsonLd(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

export function definedTermJsonLd(term: string, definition: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url: `${SITE_URL}${url}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "OpenClaw Glossary",
      url: `${SITE_URL}/glossary`,
    },
  };
}

export function videoObjectJsonLd(
  videoId: string,
  name: string,
  articleTitle: string,
  uploadDate: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description: `Video related to ${articleTitle}`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Organization",
      name: "ClawSkills",
      url: SITE_URL,
      description: "The definitive directory for OpenClaw AI agent skills.",
      sameAs: [
        "https://github.com/openclaw",
        "https://twitter.com/openclaw",
        "https://discord.gg/openclaw",
      ],
    },
  };
}
