# Промо-тексты для envguard

Репозиторий: https://github.com/dimadevnov/envguard

## Hacker News (Show HN)
**Show HN: envguard – zero-dependency CLI that diffs .env against .env.example**
I kept hitting "works on my machine" bugs caused by a missing variable in someone's .env. envguard compares .env with .env.example, reports missing / empty / undocumented keys, and exits 1 in CI. No dependencies, Node 18+. Feedback welcome.

## Reddit (r/node, r/webdev, r/devops)
Title: I made a tiny CLI that catches missing env variables before they break prod
Body: `npx envguard-cli --strict` — compares .env to .env.example, zero deps, JSON output, CI exit codes. MIT. Would love feedback and feature ideas.

## X / Twitter
"Works on my machine" = your teammate forgot STRIPE_KEY in .env 😅
envguard checks .env vs .env.example: missing / empty / undocumented vars. Zero deps, CI-ready.
https://github.com/dimadevnov/envguard  #nodejs #devtools #opensource

## Русскоязычные площадки (Habr, vc.ru, Telegram-чаты по Node/DevOps)
Сделал маленькую утилиту envguard: сверяет .env с .env.example и показывает пропущенные, пустые и недокументированные переменные. Без зависимостей, подходит для CI. Буду рад звёздам и идеям: https://github.com/dimadevnov/envguard

## Что ещё сделать для роста
- Добавить GitHub Topics: env, dotenv, cli, nodejs, devtools
- Опубликовать в npm: `npm publish` (имя пакета envguard-cli)
- Добавить в awesome-nodejs / awesome-dotenv списками через PR
