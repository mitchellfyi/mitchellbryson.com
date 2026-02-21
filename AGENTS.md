# AI Agent Instructions

This file is the source of truth for all AI coding agents working on this project.

## Project Overview

Personal website and blog for Mitchell Bryson — writings on AI agents, autonomous systems, and the future of work.

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel
- **Testing:** Vitest + React Testing Library (unit), Playwright (e2e)
- **Node.js:** 22 (see `.nvmrc`)

## File Structure

```
src/
  app/          # Pages and API routes (Next.js App Router)
  components/   # React components
  hooks/        # Custom React hooks
  images/       # Static images
  lib/          # Shared utilities and helpers
  styles/       # Global styles
  test/         # Test setup
e2e/            # Playwright end-to-end tests
scripts/        # Build and generation scripts
```

## Quality Gate Commands

All code must pass before commit:

```bash
npm run lint          # ESLint
npm run format:check  # Prettier check
npm run test:ci       # Vitest (all tests, single run)
npm run build         # Next.js production build
```

Run all checks at once:

```bash
npm run validate      # format + lint:fix + test:ci + test:e2e + build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. See `.env.example` for the full list.

## Core Guidelines

- **Code Quality** — KISS, YAGNI, DRY, SOLID principles
- **Testing** — Write tests for new logic in `src/lib/` and `src/components/`
- **Security** — OWASP Top 10 awareness, no secrets in code

## Commit Messages

Format: `type(scope): description`

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
