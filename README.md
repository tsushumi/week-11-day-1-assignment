# Week 11 Day 1: GitHub Actions Basics

![CI](https://github.com/tsushumi/week-11-day-1-assignment/actions/workflows/ci.yml/badge.svg)
![PR Check](https://github.com/tsushumi/week-11-day-1-assignment/actions/workflows/pr-check.yml/badge.svg)
![Scheduled Health Check](https://github.com/tsushumi/week-11-day-1-assignment/actions/workflows/scheduled.yml/badge.svg)

A small Express API with three GitHub Actions workflows.

## Workflows

| File | Trigger | What it does |
| --- | --- | --- |
| `.github/workflows/ci.yml` | every push, any branch | Lints on Node 18 and 20, on ubuntu and macOS (4 matrix jobs) |
| `.github/workflows/pr-check.yml` | pull requests into `main` | `lint` job, then `test` job (`needs: lint`, `NODE_ENV=test`) |
| `.github/workflows/scheduled.yml` | Mondays 06:00 UTC (9:00 AM EAT) and manual | Curls the health endpoint, logs the result, posts to Discord if a webhook secret is set |

## Scripts

```bash
npm install
npm start      # run the API on PORT (default 3000)
npm run lint   # ESLint
npm test       # Vitest (single run)
```

`GET /api/health` returns `{ "status": "ok", ... }` and is what the scheduled workflow checks once deployed.

## Configuring the scheduled workflow

In the repo go to **Settings > Secrets and variables > Actions**:

- **Variable** `HEALTH_CHECK_URL`: your deployed health URL, e.g. `https://your-api.railway.app/api/health`. If unset, the workflow uses a placeholder URL, reports "unhealthy", and still passes.
- **Secret** `DISCORD_WEBHOOK_URL` (optional): when set, the result is posted to Discord.

Test it any time from **Actions > Scheduled Health Check > Run workflow**.

## Testing the PR workflow

```bash
git checkout -b test-pr-workflow
# make a small change, then
git commit -am "Test PR workflow"
git push -u origin test-pr-workflow
# open a pull request into main on GitHub
```
