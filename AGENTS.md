# Portfolio repository guide

## Scope

This repository is Nabil Fatih's public portfolio. Keep the existing restrained layout and composition. The shared design system owns visual tokens, themes, and reusable UI primitives.

## Architecture

- `apps/www` is the deployable Next.js application.
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

## Guardrails

Keep code direct, readable, and package-owned. Source and asset filenames may use at most two hyphen-separated words, excluding conventional test and config suffixes. Action links and buttons use normal font weight. Do not duplicate design tokens inside the app. Do not publish private details from source documents. Do not deploy without explicit authorization.
