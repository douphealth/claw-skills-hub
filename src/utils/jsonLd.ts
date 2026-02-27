import type { Skill } from "@/data/skills";
import type { Article } from "@/data/articles";
import type { Tutorial } from "@/data/tutorials";

const SITE_URL = "https://clawskills.com";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClawSkills",
    url: SITE_URL,
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
    operatingSystem: "Cross-platform",
    author: { "@type": "Person", name: skill.author },
    softwareVersion: skill.version,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: skill.rating,
      bestRating: "5",
      worstRating: "1",
      ratingCount: Math.floor(skill.rating * 20 + 10),
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
    publisher: {
      "@type": "Organization",
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
    step: tutorial.sections.map((section, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: section.heading,
      text: section.content.slice(0, 200),
    })),
  };
}
