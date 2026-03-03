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
    description: "The definitive directory for OpenClaw AI agent skills. Discover, compare, and install 5,705+ skills.",
    sameAs: [
      "https://github.com/openclaw",
      "https://twitter.com/openclaw",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/`,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClawSkills",
    url: SITE_URL,
    description: "The definitive directory for OpenClaw AI agent skills. Discover, compare, and install 5,705+ skills.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/skills?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
    author: { "@type": "Organization", name: "ClawSkills" },
    publisher: {
      "@type": "Organization",
      name: "ClawSkills",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/articles/${article.slug}`,
    },
  };
}

export function howToJsonLd(tutorial: Tutorial) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.metaDescription,
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
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}
