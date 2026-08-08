# Nabil Fatih's portfolio

The source for [nabilfatih.com](https://nabilfatih.com), a small portfolio focused on product engineering, full-stack systems, and applied AI work.

## Architecture

This repository is a pnpm and Turborepo monorepo:

- `apps/www` contains the production Next.js application.
- `packages/design-system` contains the shared shadcn Base UI components and Nakafa theme system.
- `packages/typescript-config` contains shared strict TypeScript settings.

The app uses Next.js 16, React 19, Tailwind CSS 4, shadcn, Base UI, Hugeicons, Vitest, Biome, and Ultracite.

## Local development

Requirements:

- Node.js 24
- pnpm 11.20.0

Install dependencies and start the app:

```bash
pnpm install
pnpm dev
```

The portfolio runs at [http://localhost:3100](http://localhost:3100). Port 3000 is intentionally not used.

## Quality checks

```bash
pnpm check
pnpm react-doctor
pnpm security:audit
pnpm shadcn:diff
```

`pnpm check` runs linting, type checks, tests, and a production build across the workspace.

`pnpm react-doctor` runs React Doctor against the web app. Agent-friendly routes are available at `/llms.txt`, `/llms-full.txt`, `/index.md`, `/work.md`, and `/privacy.md`. Each matching HTML page also returns Markdown when a request sends `Accept: text/markdown`. With the production app running on port 3100, use `pnpm agent-docs` to validate the full setup with AFDocs.

To refresh dependencies and the lockfile:

```bash
pnpm bump-deps
```

## Security

The portfolio has no required environment variables, user input, authentication, or private runtime data. Response headers restrict framing, browser permissions, referrers, content types, and content sources.

The Content Security Policy permits inline scripts and styles because Next.js needs them for its static bootstrap and generated styles. A nonce-based policy would make these static pages render dynamically, so this project keeps the smaller static output while allowing no remote script sources. See the [Next.js Content Security Policy guide](https://nextjs.org/docs/app/guides/content-security-policy) for that tradeoff.

## Vercel

The connected Vercel project uses `apps/www` as its Root Directory and Node.js 24. Vercel detects the repository workspace and installs from the root lockfile.

Automatic Git deployments are disabled in `apps/www/vercel.json`. This keeps merges separate from releases. Run a deliberate deployment from Vercel only after the target commit has passed the repository checks.

## License

All rights reserved.
