# Nabil Fatih's portfolio

The source for [nabilfatih.com](https://nabilfatih.com), a small portfolio focused on product engineering, full-stack systems, and applied AI work.

## Architecture

This repository is a Bun and Turborepo monorepo:

- `apps/www` contains the production TanStack Start application, prerendered to static files, and the Alchemy stack that deploys it to Cloudflare.
- `packages/design-system` contains the shared shadcn Base UI components and Nakafa theme system.
- `packages/typescript-config` contains shared strict TypeScript settings.

The app uses TanStack Start, Vite, React 19, Tailwind CSS 4, shadcn, Base UI, Hugeicons, EvilCharts, Recharts, MDX, Effect, Vitest, Biome, and Ultracite.

Portfolio copy lives in `apps/www/src/content` as local MDX. Route files in `apps/www/src/routes` provide metadata and layout only. Custom MDX components live in `apps/www/src/components/mdx`, and `registry.tsx` there provides the shared component registry. Keep measured evidence in typed modules so prose can reference verified values without duplicating them.

Every page is a static file. The build also writes the social images and reads the GitHub contribution data, which `apps/www/src/content/contributions.json` keeps, so the site has no server, no server functions, and no runtime data fetching. A route must never add a server function or a loader that needs a server, because nothing answers it in production.

## Local development

Requirements:

- Node.js 24
- Bun 1.4.4

Install dependencies and start the app:

```bash
bun install
bun run dev
```

The portfolio runs at [http://localhost:3100](http://localhost:3100). Port 3000 is intentionally not used.

## Quality checks

```bash
bun run check
bun run react-doctor
bun run security:audit
bun run shadcn:diff
```

`bun run check` runs linting, type checks, tests, and a production build across the workspace. The build fails when a listed page is missing or incomplete.

`bun run react-doctor` runs React Doctor against the web app. Agent-friendly routes are available at `/llms.txt`, `/llms-full.txt`, and matching `.md` routes for every public content page. In production, a Cloudflare Transform Rule on the zone also answers each matching HTML page with its Markdown when a request sends `Accept: text/markdown`. `bun run agent-docs` validates the live site with AFDocs, and the deploy workflow runs it after every deploy.

The Markdown and text files are generated from the same MDX before development and production builds. Run this command after changing content when you need to inspect them directly:

```bash
bun run --filter www generate:docs
```

Do not edit generated files in `apps/www/public` by hand.

To refresh dependencies and the lockfile:

```bash
bun run bump-deps
```

## Security

The portfolio has no required environment variables, user input, authentication, or private runtime data. Response headers restrict framing, browser permissions, referrers, content types, and content sources.

Response headers live in `apps/www/public/_headers`. The Content Security Policy permits inline scripts and styles because the static pages carry their hydration data and theme bootstrap inline, and a static file cannot use a per-request nonce. It allows no remote script sources.

## Deployment

Alchemy deploys the site to Cloudflare, as it deploys Nakafa. `apps/www/alchemy.run.ts` is the stack, and `apps/www/deploy` holds its stage rules and the `nabilfatih.com` zone resources.

The site is a `Website.StaticSite` with no `main`, so Alchemy uploads no Worker code and Cloudflare's asset layer answers every request. Static asset requests are free and unlimited on every plan, so traffic costs nothing. Do not add `main`, `script`, `runWorkerFirst`, or Workers Cache, and do not switch to `Website.Vite`, which would run the server bundle as a Worker: each of these turns free requests into billed ones.

Connect Cloudflare once, then deploy production:

From `apps/www`:

```bash
bun run alchemy profile edit --add Cloudflare
```

Then, from the repository root:

```bash
bun run deploy:prod
```

`bun run --filter www plan` shows the changes without applying them. Every deploy rebuilds the site, so it also refreshes the GitHub contribution data.

The Deploy workflow runs on every push to `main` and once a day. It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets and the `DEPLOY_ENABLED` variable set to `true`, and skips itself without them.

## License

All rights reserved.
