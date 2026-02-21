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
npm run audit         # npm audit (production deps only)
npm run test:ci       # Vitest (all tests, single run)
npm run build         # Next.js production build
```

Run all checks at once:

```bash
npm run ci            # CI pipeline: format:check + lint + audit + build + test:ci + test:e2e (report-only, no fixes)
npm run validate      # Local dev: format + lint:fix + audit:fix + test:ci + test:e2e + build (auto-fixes)
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. See `.env.example` for the full list.

## Core Guidelines

- **Code Quality** — KISS, YAGNI, DRY, SOLID principles
- **Testing** — Write tests for new logic in `src/lib/` and `src/components/`
- **Security** — OWASP Top 10 awareness, no secrets in code

## Language and Copy

All user-facing text must use **British English (en-GB)**.

### Spelling rules

- **-ise** not -ize (organise, optimise, recognise, summarise, analyse, prioritise)
- **-our** not -or (colour, labour, behaviour, favour, honour)
- **-re** not -er (centre, metre, fibre)
- **-ence** not -ense (licence noun, defence, offence)
- **-lled/-lling** not -led/-ling (modelling, travelling, labelled, fulfil)
- **Exception:** Keep American spelling when quoting named American concepts (e.g. "data as labor" from AEA literature)

### Formatting conventions

- **Dates:** day month year — "21 Feb 2026", never "Feb 21, 2026"
- **Headings:** Sentence case, not Title Case — "The economics of delegation", not "The Economics of Delegation"
- **`<html>` tag:** `lang="en-GB"`
- **OG locale:** `en_GB`

### Anti-AI-tell rules

Never use these words in generated content: additionally, crucial, delve, enhance, foster, garner, groundbreaking, landscape, nestled, pivotal, showcase, tapestry, testament, underscore, vibrant, vital role.

Avoid these structures: "serves as" / "stands as", "not just X — it's Y", em dash overuse, sycophantic openers, generic conclusions, vague attribution, synonym cycling.

Cut filler: "It's worth noting that", "In today's world", "At the end of the day", "Let's dive in".

See `prompts/article-generation/style-guide.md` and `prompts/news-generation/style-guide.md` for the full reference.

## Commit Messages

Format: `type(scope): description`

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
