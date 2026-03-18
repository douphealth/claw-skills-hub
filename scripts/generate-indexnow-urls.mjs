/**
 * Generates a JSON file with all site URLs for IndexNow submission.
 * Run after extract-data.mjs: node scripts/generate-indexnow-urls.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://openclaw-skillshub.com';

const data = JSON.parse(fs.readFileSync(path.join(ROOT, '.prerender-data.json'), 'utf-8'));

const urls = [
  `${BASE}/`,
  `${BASE}/skills`,
  `${BASE}/articles`,
  `${BASE}/tutorials`,
  `${BASE}/glossary`,
  `${BASE}/privacy`,
  `${BASE}/terms`,
  `${BASE}/skills/compare`,
];

// Categories
(data.categories || []).forEach(c => urls.push(`${BASE}/skills/${c.slug}`));

// Skills (batch — IndexNow supports up to 10,000)
(data.skills || []).forEach(s => urls.push(`${BASE}/skills/${s.categorySlug}/${s.slug}`));

// Articles
(data.articles || []).forEach(a => urls.push(`${BASE}/articles/${a.slug}`));

// Tutorials
(data.tutorials || []).forEach(t => urls.push(`${BASE}/tutorials/${t.slug}`));

// Glossary
(data.glossaryEntries || []).forEach(g => urls.push(`${BASE}/glossary/${g.slug}`));

// Write the JSON array for the deploy pipeline
fs.writeFileSync(path.join(ROOT, 'dist', 'indexnow-urls.json'), JSON.stringify(urls));
console.log(`✅ IndexNow URL list: ${urls.length} URLs`);
