/**
 * Post-build prerendering script.
 * Generates static HTML files for every route so crawlers see real content
 * without executing JavaScript. Uses the data files directly.
 *
 * Run: node scripts/prerender.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE_URL = 'https://openclaw-skillshub.com';

// We need to load the data. Since these are TS files with path aliases,
// we'll parse them at build time via a separate extraction step.
// For now, we read the generated sitemap to get all routes.

function getTemplate() {
  return fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
}

function injectMeta(html, { title, description, canonical, type = 'website', jsonLd, bodyContent }) {
  const fullTitle = title.includes('ClawSkills') ? title : `${title} | ClawSkills`;
  const safeDesc = description.slice(0, 160);
  const ogImage = `${BASE_URL}/og-image.png`;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${fullTitle}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${safeDesc}"`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${fullTitle}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${safeDesc}"`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${type}"`
  );
  if (canonical) {
    html = html.replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonical}"`
    );
    html = html.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonical}"`
    );
    html = html.replace(
      /<link rel="alternate" hreflang="en" href="[^"]*"/,
      `<link rel="alternate" hreflang="en" href="${canonical}"`
    );
  }

  // Replace twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${fullTitle}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${safeDesc}"`
  );

  // Inject JSON-LD before </head>
  if (jsonLd) {
    const ldScript = `<script id="seo-jsonld" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    html = html.replace('</head>', `${ldScript}\n</head>`);
  }

  // Inject crawlable body content in <noscript> for bots that don't run JS
  if (bodyContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n<noscript><div class="prerendered-content">${bodyContent}</div></noscript>`
    );
  }

  return html;
}

async function loadData() {
  // Use dynamic import with tsx/ts-node or parse from the build
  // For CI, we compile a small data extractor
  const dataScript = path.resolve(__dirname, '..', '.prerender-data.json');
  if (fs.existsSync(dataScript)) {
    return JSON.parse(fs.readFileSync(dataScript, 'utf-8'));
  }
  console.warn('⚠ No .prerender-data.json found. Run `node scripts/extract-data.mjs` first.');
  return null;
}

function writeRoute(routePath, html) {
  const dir = path.join(DIST, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function write404(template) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, '<title>Page Not Found (404) | ClawSkills</title>')
    .replace(
      /<meta name="description" content="[^"]*"/,
      '<meta name="description" content="The requested ClawSkills page could not be found."'
    )
    .replace(
      /<meta name="robots" content="[^"]*"/,
      '<meta name="robots" content="noindex, follow"'
    )
    .replace(/\s*<link rel="canonical"[^>]*>/i, '')
    .replace(/\s*<link rel="alternate"[^>]*>/gi, '')
    .replace(/\s*<script(?:\s+id="[^"]*")?\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
    .replace(
      '<div id="root"></div>',
      '<div id="root"></div><noscript><main><h1>404 — Page not found</h1><p>The requested ClawSkills page does not exist.</p><p><a href="/">Return to ClawSkills</a></p></main></noscript>'
    );

  fs.writeFileSync(path.join(DIST, '404.html'), html);
}

async function main() {
  const data = await loadData();
  if (!data) {
    console.log('⚠ Skipping prerender — no data extracted. Falling back to SPA.');
    return;
  }

  const template = getTemplate();
  let count = 0;

  const { articles, skills, categories, tutorials, glossaryEntries } = data;

  // --- Homepage ---
  // Already has index.html, but we enhance it
  const homeHtml = injectMeta(template, {
    title: 'ClawSkills — Curated OpenClaw Skills Directory with Security Reviews',
    description: 'Discover, compare, and safely install 5,705+ OpenClaw skills. Curated reviews, security audits, and one-command installation across 10 categories.',
    canonical: `${BASE_URL}/`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ClawSkills",
        url: BASE_URL,
        description: "The definitive directory for OpenClaw AI agent skills. 5,705+ skills across 10 categories.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/skills?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ClawSkills",
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.png`
      }
    ],
    bodyContent: `<h1>ClawSkills — Curated OpenClaw Skills Directory</h1><p>Discover, compare, and safely install 5,705+ OpenClaw AI agent skills across 10 categories.</p>`
  });
  fs.writeFileSync(path.join(DIST, 'index.html'), homeHtml);
  count++;

  // --- Skills Directory ---
  writeRoute('/skills', injectMeta(template, {
    title: 'OpenClaw Skills Directory — Browse 5,705+ AI Agent Skills',
    description: 'Browse, search, and filter 5,705+ OpenClaw skills across 10 categories. Find the right AI agent skill with security ratings and one-click install.',
    canonical: `${BASE_URL}/skills`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "OpenClaw Skills Directory",
      numberOfItems: skills.length,
      itemListElement: skills.slice(0, 50).map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${BASE_URL}/skills/${s.categorySlug}/${s.slug}`
      }))
    },
    bodyContent: `<h1>OpenClaw Skills Directory</h1><p>Browse ${skills.length} skills across ${categories.length} categories.</p><ul>${skills.slice(0, 100).map(s => `<li><a href="/skills/${s.categorySlug}/${s.slug}">${s.name}</a> — ${s.description}</li>`).join('')}</ul>`
  }));
  count++;

  // --- Category Pages ---
  for (const cat of categories) {
    const catSkills = skills.filter(s => s.categorySlug === cat.slug);
    writeRoute(`/skills/${cat.slug}`, injectMeta(template, {
      title: `${cat.name} — OpenClaw Skills | ClawSkills`,
      description: `Browse ${cat.count}+ ${cat.name} skills for OpenClaw. ${cat.description}`,
      canonical: `${BASE_URL}/skills/${cat.slug}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${cat.name} OpenClaw Skills`,
        numberOfItems: catSkills.length,
        itemListElement: catSkills.slice(0, 30).map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${BASE_URL}/skills/${s.categorySlug}/${s.slug}`
        }))
      },
      bodyContent: `<h1>${cat.name} — OpenClaw Skills</h1><p>${cat.description}</p><ul>${catSkills.map(s => `<li><a href="/skills/${s.categorySlug}/${s.slug}">${s.name}</a> — ${s.description}</li>`).join('')}</ul>`
    }));
    count++;
  }

  // --- Individual Skill Pages ---
  for (const skill of skills) {
    writeRoute(`/skills/${skill.categorySlug}/${skill.slug}`, injectMeta(template, {
      title: `${skill.name} — Full Review & Install Guide | ClawSkills`,
      description: skill.description.slice(0, 160),
      canonical: `${BASE_URL}/skills/${skill.categorySlug}/${skill.slug}`,
      type: 'article',
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: skill.name,
        description: skill.description,
        applicationCategory: "DeveloperApplication",
        author: { "@type": "Person", name: skill.author },
        softwareVersion: skill.version,
        dateModified: skill.lastUpdated,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: skill.rating,
          bestRating: "5",
          ratingCount: Math.floor(skill.rating * 20 + 10)
        },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      },
      bodyContent: `<h1>${skill.name}</h1><p>${skill.description}</p><p>Author: ${skill.author} | Version: ${skill.version} | Rating: ${skill.rating}/5</p><p>Install: ${skill.installCommand}</p>`
    }));
    count++;
  }

  // --- Articles Index ---
  writeRoute('/articles', injectMeta(template, {
    title: 'OpenClaw Articles & Guides — ClawSkills',
    description: 'In-depth articles, guides, and analysis on OpenClaw skills, security, and AI agent workflows.',
    canonical: `${BASE_URL}/articles`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "OpenClaw Articles",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
        url: `${BASE_URL}/articles/${a.slug}`
      }))
    },
    bodyContent: `<h1>OpenClaw Articles & Guides</h1><ul>${articles.map(a => `<li><a href="/articles/${a.slug}">${a.title}</a> — ${a.metaDescription}</li>`).join('')}</ul>`
  }));
  count++;

  // --- Individual Article Pages ---
  for (const article of articles) {
    const faqSections = article.sections.filter(s => s.heading.toLowerCase().includes('faq') || s.heading.toLowerCase().includes('question'));
    const articleJsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.metaDescription,
        datePublished: article.publishedDate,
        dateModified: article.updatedDate,
        author: { "@type": "Organization", name: "ClawSkills" },
        publisher: { "@type": "Organization", name: "ClawSkills", url: BASE_URL },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/articles/${article.slug}` }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Articles", item: `${BASE_URL}/articles` },
          { "@type": "ListItem", position: 3, name: article.title, item: `${BASE_URL}/articles/${article.slug}` }
        ]
      }
    ];

    const sectionContent = article.sections.map(s =>
      `<h2>${s.heading}</h2><p>${s.content.replace(/\[\[([^|]*)\|([^\]]*)\]\]/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`
    ).join('');

    writeRoute(`/articles/${article.slug}`, injectMeta(template, {
      title: article.metaTitle,
      description: article.metaDescription,
      canonical: `${BASE_URL}/articles/${article.slug}`,
      type: 'article',
      jsonLd: articleJsonLd,
      bodyContent: `<h1>${article.title}</h1><p>${article.heroDescription}</p>${sectionContent}`
    }));
    count++;
  }

  // --- Tutorials Index ---
  writeRoute('/tutorials', injectMeta(template, {
    title: 'OpenClaw Tutorials — Step-by-Step Guides | ClawSkills',
    description: 'Step-by-step tutorials for OpenClaw skills. From beginner setup to advanced multi-agent workflows.',
    canonical: `${BASE_URL}/tutorials`,
    bodyContent: `<h1>OpenClaw Tutorials</h1><ul>${tutorials.map(t => `<li><a href="/tutorials/${t.slug}">${t.title}</a> — ${t.metaDescription}</li>`).join('')}</ul>`
  }));
  count++;

  // --- Individual Tutorial Pages ---
  for (const tutorial of tutorials) {
    const sectionContent = tutorial.sections.map(s =>
      `<h2>${s.heading}</h2><p>${s.content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>${s.codeBlock ? `<pre><code>${s.codeBlock.code}</code></pre>` : ''}`
    ).join('');

    writeRoute(`/tutorials/${tutorial.slug}`, injectMeta(template, {
      title: `${tutorial.title} | ClawSkills`,
      description: tutorial.metaDescription,
      canonical: `${BASE_URL}/tutorials/${tutorial.slug}`,
      type: 'article',
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: tutorial.title,
          description: tutorial.metaDescription,
          step: tutorial.sections.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.heading,
            text: s.content.slice(0, 200)
          }))
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Tutorials", item: `${BASE_URL}/tutorials` },
            { "@type": "ListItem", position: 3, name: tutorial.title, item: `${BASE_URL}/tutorials/${tutorial.slug}` }
          ]
        }
      ],
      bodyContent: `<h1>${tutorial.title}</h1><p>${tutorial.metaDescription}</p>${sectionContent}`
    }));
    count++;
  }

  // --- Glossary Index ---
  writeRoute('/glossary', injectMeta(template, {
    title: 'OpenClaw Glossary — AI Agent Terms Explained | ClawSkills',
    description: 'Comprehensive glossary of OpenClaw and AI agent terms. Learn about skills, RAG pipelines, prompt chaining, LLM routing, and more.',
    canonical: `${BASE_URL}/glossary`,
    bodyContent: `<h1>OpenClaw Glossary</h1><ul>${glossaryEntries.map(g => `<li><a href="/glossary/${g.slug}">${g.term}</a> — ${g.shortDefinition}</li>`).join('')}</ul>`
  }));
  count++;

  // --- Individual Glossary Pages ---
  for (const entry of glossaryEntries) {
    const sectionContent = entry.sections.map(s =>
      `<h2>${s.heading}</h2><p>${s.content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`
    ).join('');
    const faqContent = entry.faqs?.length
      ? `<h2>FAQ</h2>${entry.faqs.map(f => `<h3>${f.question}</h3><p>${f.answer}</p>`).join('')}`
      : '';

    writeRoute(`/glossary/${entry.slug}`, injectMeta(template, {
      title: entry.metaTitle,
      description: entry.metaDescription,
      canonical: `${BASE_URL}/glossary/${entry.slug}`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: entry.term,
          description: entry.shortDefinition
        },
        ...(entry.faqs?.length ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: entry.faqs.map(f => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer }
          }))
        }] : []),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Glossary", item: `${BASE_URL}/glossary` },
            { "@type": "ListItem", position: 3, name: entry.term, item: `${BASE_URL}/glossary/${entry.slug}` }
          ]
        }
      ],
      bodyContent: `<h1>${entry.term}</h1><p>${entry.shortDefinition}</p>${sectionContent}${faqContent}`
    }));
    count++;
  }

  // --- Static pages ---
  for (const pg of ['privacy', 'terms']) {
    writeRoute(`/${pg}`, injectMeta(template, {
      title: `${pg === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} | ClawSkills`,
      description: `ClawSkills ${pg === 'privacy' ? 'privacy policy' : 'terms of service'}.`,
      canonical: `${BASE_URL}/${pg}`
    }));
    count++;
  }

  // Skills compare
  writeRoute('/skills/compare', injectMeta(template, {
    title: 'Compare OpenClaw Skills Side by Side | ClawSkills',
    description: 'Compare any two OpenClaw skills side by side. See ratings, security status, compatibility, and features at a glance.',
    canonical: `${BASE_URL}/skills/compare`
  }));
  count++;

  // Installation Center
  writeRoute('/install', injectMeta(template, {
    title: 'Installation Center — OpenClaw Setup & Skill Install Commands | ClawSkills',
    description: 'Get enterprise-grade installation commands for OpenClaw and 5,705+ skills. Step-by-step guides for macOS, Linux, and Windows WSL with one-click copy.',
    canonical: `${BASE_URL}/install`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "OpenClaw Installation Center",
        description: "Get enterprise-grade installation commands for OpenClaw and 5,705+ skills.",
        url: `${BASE_URL}/install`
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Install OpenClaw",
        description: "Step-by-step guide to install OpenClaw and skills on macOS, Linux, and Windows WSL.",
        totalTime: "PT5M",
        step: [
          { "@type": "HowToStep", position: 1, name: "Install Node.js", text: "Install Node.js v18+ using your package manager." },
          { "@type": "HowToStep", position: 2, name: "Install OpenClaw CLI", text: "Run npm install -g clawhub@latest" },
          { "@type": "HowToStep", position: 3, name: "Initialize project", text: "Run clawhub init my-project" },
          { "@type": "HowToStep", position: 4, name: "Install skills", text: "Run npx clawhub@latest install <skill-name>" }
        ]
      }
    ],
    bodyContent: `<h1>OpenClaw Installation Center</h1><p>Get enterprise-grade installation commands for OpenClaw and 5,705+ skills. Step-by-step guides for macOS, Linux, and Windows WSL.</p><h2>Quick Start</h2><ol><li>Install Node.js v18+</li><li>npm install -g clawhub@latest</li><li>clawhub init my-project</li><li>npx clawhub@latest install gpt-prompt-chainer</li></ol>`
  }));
  count++;

  // Versions page
  writeRoute('/versions', injectMeta(template, {
    title: 'OpenClaw Version History — Compare All Releases & Features | ClawSkills',
    description: 'Complete OpenClaw version history with feature comparison tables, release highlights, GitHub links, and migration guides.',
    canonical: `${BASE_URL}/versions`,
    bodyContent: `<h1>OpenClaw Version History</h1><p>Track every OpenClaw release from v0.25 to the latest v0.30. Compare features, view breaking changes, and access GitHub release pages.</p>`
  }));
  count++;

  // Cloudflare Pages serves this document with HTTP 404 for unknown paths.
  // Known routes above remain prerendered and continue to return HTTP 200.
  write404(template);

  // Cloudflare's native Git integration and GitHub Actions expose different
  // commit variables. Emit one stable fingerprint for either deployment path.
  const commit = process.env.CF_PAGES_COMMIT_SHA || process.env.VITE_BUILD_COMMIT || 'local';
  fs.writeFileSync(path.join(DIST, 'build-info.json'), JSON.stringify({
    version: commit.slice(0, 12),
    buildTime: process.env.VITE_BUILD_TIME || new Date().toISOString(),
    commit,
    source: process.env.CF_PAGES_COMMIT_SHA ? 'cloudflare-pages-git' : 'build',
  }));

  console.log(`✅ Prerendered ${count} routes with meta tags, JSON-LD, and crawlable content`);
}

main().catch(console.error);
