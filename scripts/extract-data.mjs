/**
 * Extracts data from TypeScript source files into JSON for the prerender script.
 * Run: node scripts/extract-data.mjs
 * 
 * This uses a simple regex-based approach to avoid needing ts-node in CI.
 * It compiles the TS files with esbuild (bundled with Vite) and evaluates them.
 */

import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function extract() {
  // Bundle each data file into a standalone CJS module we can evaluate
  const dataFiles = {
    skills: 'src/data/skills.ts',
    articles: 'src/data/articles.ts',
    tutorials: 'src/data/tutorials.ts',
    glossary: 'src/data/glossary.ts',
  };

  const result = {};

  for (const [key, filePath] of Object.entries(dataFiles)) {
    const outfile = path.join(ROOT, `.tmp-${key}.mjs`);
    
    await build({
      entryPoints: [path.join(ROOT, filePath)],
      bundle: true,
      format: 'esm',
      platform: 'browser',
      outfile,
      external: [],
      alias: {
        '@': path.join(ROOT, 'src'),
      },
      // Ignore image imports
      loader: {
        '.jpg': 'empty',
        '.png': 'empty',
        '.svg': 'empty',
        '.webp': 'empty',
      },
    });

    const mod = await import(outfile);
    
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

  fs.writeFileSync(
    path.join(ROOT, '.prerender-data.json'),
    JSON.stringify(result)
  );

  console.log(`✅ Extracted data: ${result.skills?.length} skills, ${result.articles?.length} articles, ${result.tutorials?.length} tutorials, ${result.glossaryEntries?.length} glossary entries`);
}

extract().catch(console.error);
