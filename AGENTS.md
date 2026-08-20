# Portfolio repository guide

## Scope

This repository is Nabil Fatih's public portfolio. Keep the existing restrained layout and composition. The shared design system owns visual tokens, themes, and reusable UI primitives.

## Architecture

- `apps/www` is the deployable Next.js application.
- `apps/www/content` is the single source for portfolio prose written in MDX.
- `apps/www/components/mdx` owns the custom components used by that content.
- `packages/design-system` owns shadcn components, theme state, and shared styling.
- `packages/typescript-config` owns shared TypeScript compiler settings.

## Commands

Use Node 24 and pnpm from the root.

- `pnpm dev` starts the portfolio on port 3100.
- `pnpm check` validates filenames, lint, type checks, tests, and the production build.
- `pnpm filenames` enforces the repository filename convention.
- `pnpm react-doctor` checks the React application for health and maintenance issues.
- `pnpm bump-deps` updates workspace dependencies, then refreshes the lockfile.
- `pnpm shadcn:diff` checks installed shadcn primitives against the current registry.
- `pnpm --filter www generate:docs` refreshes agent-facing Markdown from the MDX source.

## Guardrails

Keep code direct, readable, and package-owned. Source and asset filenames may use at most two hyphen-separated words, excluding conventional test and config suffixes. Action links and buttons use normal font weight. Do not duplicate design tokens inside the app. Do not publish private details from source documents. Do not deploy without explicit authorization.

Do not edit the generated Markdown and text files in `apps/www/public`. Change the MDX source or its semantic agent component, then regenerate the documents.

## Vendored source

`repos/effect` is a read-only Git subtree pinned to the same Effect v4 release used by `apps/www`. Use it to inspect implementation, tests, and migration behavior. Do not import from it, edit it, or run its repository-wide checks as part of portfolio validation. Update the subtree and the installed `effect` and `@effect/vitest` versions together.
