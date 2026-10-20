/**
 * Regenerates public/llms-full.txt from the TypeScript data files so the
 * full-text reference for AI crawlers never goes stale.
 * Run: node scripts/generate-llms-full.mjs
 *
 * Loads data exactly like scripts/extract-data.mjs (esbuild bundle + import).
 * Writes to public/ (source of truth) and dist/ (so the current build ships
 * the fresh copy — vite copies public/ into dist/ before this script runs).
 */

import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://openclaw-skillshub.com';

async function loadData() {
  const dataFiles = {
    skills: 'src/data/skills.ts',
    articles: 'src/data/articles.ts',
    tutorials: 'src/data/tutorials.ts',
    glossary: 'src/data/glossary.ts',
  };
  const result = {};
  for (const [key, filePath] of Object.entries(dataFiles)) {
    const outfile = path.join(ROOT, `.tmp-llms-${key}.mjs`);
    await build({
      entryPoints: [path.join(ROOT, filePath)],
      bundle: true,
      format: 'esm',
      platform: 'browser',
      outfile,
      external: [],
      alias: { '@': path.join(ROOT, 'src') },
      loader: { '.jpg': 'empty', '.png': 'empty', '.svg': 'empty', '.webp': 'empty' },
    });
    const mod = await import(pathToFileURL(outfile).href);
    if (key === 'skills') {
      result.skills = mod.skills;
      result.categories = mod.categories;
    } else if (key === 'articles') {
      result.articles = mod.articles;
    } else if (key === 'tutorials') {
      result.tutorials = mod.tutorials;
    } else if (key === 'glossary') {
      result.glossaryEntries = mod.glossaryEntries;
    }
    fs.unlinkSync(outfile);
  }
  return result;
}

function generate({ skills, categories, articles, tutorials, glossaryEntries }) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push('# OpenClaw Complete Skill Catalog & Knowledge Base');
  lines.push(`> Last updated: ${today}`);
  lines.push(`> Total skills listed: ${skills.length} | Categories: ${categories.length} | Articles: ${articles.length} | Tutorials: ${tutorials.length} | Glossary terms: ${glossaryEntries.length}`);
  lines.push('');
  lines.push('## Site Information');
  lines.push('- Name: ClawSkills');
  lines.push(`- URL: ${BASE_URL}`);
  lines.push('- Purpose: A directory of OpenClaw AI agent skills with install guides and Trust Scores');
  lines.push('- Install any skill: `npx clawhub@latest install <skill-name>`');
  lines.push('- Independent and unaffiliated with OpenClaw.');
  lines.push('');
  lines.push('## Quick Facts');
  lines.push('- Framework: OpenClaw (open-source, MIT license, 150K+ GitHub stars)');
  lines.push('- Supported OS: macOS, Linux, Windows WSL');
  lines.push('- Supported LLMs: OpenAI, Anthropic, Google, Mistral, Cohere, Ollama');
  lines.push('- Status labels: Verified, Community, Unreviewed (as recorded in each skill\'s data)');
  lines.push('- Total skills cataloged in the wider registry: 5,705+ across 10 categories');
  lines.push('');
  lines.push('## Install Guide (4 steps)');
  lines.push('1. Install Node.js v18 or newer.');
  lines.push('2. Run `npm install -g clawhub@latest`.');
  lines.push('3. Run `clawhub init my-project`.');
  lines.push('4. Run `npx clawhub@latest install <skill-name>` — e.g. `npx clawhub@latest install gpt-prompt-chainer`.');
  lines.push('Troubleshooting: if you get "clawhub: command not found", run it via `npx clawhub@latest` instead of the global binary, or add npm\'s global bin folder to your PATH. On Windows, use PowerShell or Windows WSL with Node.js v18+.');
  lines.push('');
  lines.push('## Trust Score Methodology (summary)');
  lines.push('Every detail page shows a Trust Score from 0 to 100, calculated from six dimensions scored 0-10 each and normalized against a 60-point maximum:');
  lines.push('1. Security Audit (measured) — verified 10, community 6, unreviewed 2');
  lines.push('2. Update Recency (measured) — under 2 months 10, under 6 months 7, otherwise 4');
  lines.push('3. Community Trust (measured) — the skill rating multiplied by 2');
  lines.push('4. Documentation Quality (derived) — verified 9, otherwise 6 (not independently assessed)');
  lines.push('5. Permission Scope (derived) — verified 9, community 7, unreviewed 4 (no permission manifest is inspected)');
  lines.push('6. Open Source (derived) — always 10');
  lines.push('Honest limits, as stated on the methodology page: the score is primarily a restatement of audit status and how recently a skill was updated. It is not an assessment of what a skill does or whether its code is safe.');
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const cat of categories) {
    lines.push(`## ${cat.name} (${cat.count} skills)`);
    lines.push(cat.description);
    lines.push('');
    for (const s of skills.filter((x) => x.categorySlug === cat.slug)) {
      lines.push(`### ${s.name}`);
      lines.push(`- **Install**: \`${s.installCmd}\``);
      lines.push(`- **Rating**: ${s.rating}/5 | **Security**: ${s.securityStatus} | **Version**: ${s.version}`);
      lines.push(`- **Author**: ${s.author} | **Updated**: ${s.lastUpdated}`);
      lines.push(`- **Description**: ${s.description}`);
      if (s.useCases?.length) lines.push(`- **Use cases**: ${s.useCases.join('; ')}`);
      lines.push(`- **URL**: ${BASE_URL}/skills/${s.categorySlug}/${s.slug}`);
      lines.push('');
    }
  }

  lines.push('## Articles & Guides');
  lines.push('');
  for (const a of articles) {
    lines.push(`- [${a.title}](${BASE_URL}/articles/${a.slug}): ${a.metaDescription}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Tutorials');
  lines.push('');
  for (const t of tutorials) {
    lines.push(`- [${t.title}](${BASE_URL}/tutorials/${t.slug}): ${t.metaDescription} (${t.difficulty})`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Glossary');
  lines.push('');
  for (const g of glossaryEntries) {
    lines.push(`- **${g.term}**: ${g.shortDefinition} → ${BASE_URL}/glossary/${g.slug}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Contact & Links');
  lines.push(`- Website: ${BASE_URL}`);
  lines.push('- GitHub: https://github.com/openclaw');
  lines.push('- Twitter/X: https://twitter.com/openclaw');
  lines.push('- Discord: https://discord.gg/openclaw');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const data = await loadData();
  const content = generate(data);
  const pubPath = path.join(ROOT, 'public', 'llms-full.txt');
  fs.writeFileSync(pubPath, content);
  const distPath = path.join(ROOT, 'dist', 'llms-full.txt');
  if (fs.existsSync(path.join(ROOT, 'dist'))) {
    fs.writeFileSync(distPath, content);
  }
  console.log(`✅ llms-full.txt regenerated: ${data.skills.length} skills, ${data.articles.length} articles, ${data.tutorials.length} tutorials, ${data.glossaryEntries.length} glossary terms`);
}

main().catch((e) => { console.error(e); process.exit(1); });
