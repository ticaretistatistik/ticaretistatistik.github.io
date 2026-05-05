/**
 * Build-time team snapshot.
 *
 * Reads blog/team.yml (the topluluk/Ekibimiz roster — yönetim kurulu,
 * birim üyeleri, akademik danışmanlar) and writes src/data/team.json
 * for the /topluluk/ekibimiz page to consume without parsing YAML at
 * runtime. Mirrors scripts/build-authors.mjs' shape and parser; new
 * fields (group, unit, role_rank, bio, email) flow through generically.
 */

import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'blog', 'team.yml');
const OUT = join(__dirname, '..', 'src', 'data', 'team.json');

function parseTeam(yaml) {
  const lines = yaml.split('\n');
  const members = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const top = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (top) {
      if (current) members.push(current);
      current = {key: top[1]};
      continue;
    }
    const field = line.match(/^\s+([A-Za-z_]+):\s*(.*)$/);
    if (field && current) {
      let value = field[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // role_rank should be numeric for stable sorting.
      if (field[1] === 'role_rank' && /^\d+$/.test(value)) {
        current[field[1]] = Number(value);
      } else if (value === 'true' || value === 'false') {
        current[field[1]] = value === 'true';
      } else {
        current[field[1]] = value;
      }
    }
  }
  if (current) members.push(current);
  return members;
}

const yaml = readFileSync(SRC, 'utf8');
const members = parseTeam(yaml);

writeFileSync(OUT, JSON.stringify(members, null, 2) + '\n', 'utf8');
console.log(`[team] Wrote ${members.length} members to ${OUT}`);
