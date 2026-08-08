# UN Blockchain Week

This repository is an npm-workspaces Turborepo. The Next.js website lives in
`apps/web`.

## Commands

Run these from the repository root:

```bash
npm install
npm run dev
npm run lint
npm run build:site
npm run build
```

- `npm run build:site` builds the current local content and can use Turbo's cache.
- `npm run build` synchronizes WordPress first and is intentionally never cached.
- App-specific scripts can run with
  `npm run <script> --workspace=@unblockchainweek/web`.

## Vercel

Set the Vercel project Root Directory to `apps/web`. The app-level
`vercel.json` retains the daily WordPress deployment cron. Configure production
environment variables from `apps/web/.env.example` in the Vercel project.
