#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { checkFiles } from '../src/index.js';

const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf(name);
  return i === -1 ? def : args[i + 1];
};

if (args.includes('-h') || args.includes('--help')) {
  console.log(`envguard — check .env against .env.example

Usage: envguard [--example .env.example] [--env .env] [--strict] [--json]

  --strict   also fail on variables not documented in the example
  --json     machine-readable output
Exit code 1 when required variables are missing (CI friendly).`);
  process.exit(0);
}

const examplePath = flag('--example', '.env.example');
const envPath = flag('--env', '.env');
for (const p of [examplePath, envPath]) {
  if (!existsSync(p)) {
    console.error(`envguard: file not found: ${p}`);
    process.exit(2);
  }
}

const r = checkFiles(examplePath, envPath);
const strict = args.includes('--strict');
const failed = !r.ok || (strict && r.extra.length > 0);

if (args.includes('--json')) {
  console.log(JSON.stringify({ ...r, ok: !failed }, null, 2));
} else {
  for (const k of r.missing) console.log(`\x1b[31m✖ missing\x1b[0m   ${k}`);
  for (const k of r.empty) console.log(`\x1b[33m! empty\x1b[0m     ${k}`);
  for (const k of r.extra) console.log(`\x1b[36m+ undocumented\x1b[0m ${k}`);
  console.log(failed ? '\nenvguard: FAILED' : '\nenvguard: all good ✔');
}
process.exit(failed ? 1 : 0);
