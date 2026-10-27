import { readFileSync } from 'node:fs';

/** Parse dotenv text into a Map of KEY -> value. Ignores comments and blanks. */
export function parseEnv(text) {
  const out = new Map();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.replace(/^export\s+/, '').match(/^([A-Za-z_][A-Za-z0-9_.-]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);
    else value = value.replace(/\s+#.*$/, '');
    out.set(m[1], value);
  }
  return out;
}

/** Compare an env against its example. Returns lists of problems. */
export function compare(example, env) {
  const missing = [];
  const empty = [];
  const extra = [];
  for (const [key, exampleValue] of example) {
    if (!env.has(key)) missing.push(key);
    else if (env.get(key) === '' && exampleValue === '') empty.push(key);
  }
  for (const key of env.keys()) if (!example.has(key)) extra.push(key);
  return { missing, empty, extra, ok: missing.length === 0 };
}

export function checkFiles(examplePath, envPath) {
  return compare(parseEnv(readFileSync(examplePath, 'utf8')), parseEnv(readFileSync(envPath, 'utf8')));
}
