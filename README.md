# envguard

> "Works on my machine" — because your teammate forgot to add `STRIPE_KEY` to their `.env`.

`envguard` compares your `.env` with `.env.example` and tells you what is **missing**, **empty** or **undocumented**. Zero dependencies, one file of logic, CI-friendly exit codes.

## Use

```bash
git clone https://github.com/dimadevnov/envguard && cd envguard
node bin/envguard.js --env path/to/.env --example path/to/.env.example
```

Once published to npm you will be able to run it with `npx @dimadevtop/envguard-cli`.

```bash
npx @dimadevtop/envguard-cli                         # .env vs .env.example
npx @dimadevtop/envguard-cli --env .env.production --strict
npx @dimadevtop/envguard-cli --json                  # for scripts
```

```
✖ missing   DATABASE_URL
! empty     API_KEY
+ undocumented DEBUG_TMP

envguard: FAILED
```

Exit codes: `0` ok, `1` problems found, `2` file not found.

## CI

```yaml
- run: npx @dimadevtop/envguard-cli --example .env.example --env .env.ci --strict
```

## Why
- No dependencies, nothing to audit
- Handles comments, quotes, `export KEY=...`, inline `# comments`
- Node 18+

## Develop
```bash
npm test
```

MIT © DimaDev
