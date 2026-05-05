/**
 * Build-time authors snapshot.
 *
 * Reads blog/authors.yml — Docusaurus' blog author registry — and writes
 * src/data/authors.json so frontend components (e.g. the contributor
 * marquee on /sozluk) can match a contributor name against the author
 * roster without parsing YAML at runtime.
 *
 * The YAML schema we depend on is tiny:
 *   key:
 *     name: ...
 *     title: ...
 *     url: ...
 *     image_url: ...
 *
 * We parse just that shape with a small line-based parser — no js-yaml
 * dep needed. If the YAML grows nested values someday, swap in js-yaml.
 */

import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'blog', 'authors.yml');
const OUT = join(__dirname, '..', 'src', 'data', 'authors.json');

function parseAuthors(yaml) {
  const lines = yaml.split('\n');
  const authors = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const top = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (top) {
      if (current) authors.push(current);
      current = {key: top[1]};
      continue;
    }
    const field = line.match(/^\s+([A-Za-z_]+):\s*(.*)$/);
    if (field && current) {
      let value = field[2].trim();
      // Strip surrounding quotes if present.
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      current[field[1]] = value;
    }
  }
  if (current) authors.push(current);
  return authors;
}

const yaml = readFileSync(SRC, 'utf8');
const authors = parseAuthors(yaml);

writeFileSync(OUT, JSON.stringify(authors, null, 2) + '\n', 'utf8');
console.log(`[authors] Wrote ${authors.length} authors to ${OUT}`);
