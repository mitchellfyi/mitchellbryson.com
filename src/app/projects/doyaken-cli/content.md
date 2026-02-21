---
title: 'doyaken-cli'
description: 'A standalone multi-project autonomous agent CLI that delivers working code through an 8-phase pipeline. Install once, use on any project.'
author: Mitchell Bryson
date: '2026-02-21'
link:
  href: 'https://github.com/mitchellfyi/doyaken-cli'
  label: 'View on GitHub'
---

Most AI coding tools generate code and hope for the best. Doyaken takes a different approach: it runs an 8-phase pipeline that expands your prompt, triages tasks, plans the implementation, writes the code, tests it, documents it, reviews it, and verifies everything passes — retrying with error context when something breaks.

```
npm install -g doyaken
doyaken run "add user authentication with JWT"
```

One command. Working code.

## The pipeline

Every prompt flows through eight phases with automatic verification gates between them:

1. **Expand** — turns a short prompt into a full specification
2. **Triage** — breaks the spec into ordered, dependency-aware tasks
3. **Plan** — generates implementation plans per task
4. **Implement** — writes the code using your chosen AI agent
5. **Test** — runs the test suite and captures failures
6. **Docs** — updates documentation to match changes
7. **Review** — code review against quality standards
8. **Verify** — build, lint, test, and format checks; failures loop back with context

The verify gate is where most agents fall down. Doyaken treats it as a first-class concern — if the build breaks or tests fail, the agent gets the error output and tries again, up to a configurable retry limit.

## Works with any agent

Doyaken isn't tied to a single AI provider. It works with Claude Code, Cursor, OpenAI Codex, Google Gemini, GitHub Copilot, and OpenCode. Switch agents per project or per task — the pipeline stays the same.

Configuration sync generates and maintains config files for all supported agents from a single source, so your project conventions stay consistent regardless of which agent runs the work.

## Built-in skills and prompts

The CLI ships with 40+ reusable skills (security audits, code reviews, CI fixes, vendor-specific tasks) and 25+ prompt templates covering code quality, planning, and development methodologies. Skills can be composed into custom workflows, and Claude Code users get auto-generated slash commands from every skill and prompt.

## Self-healing

Production agent workflows need resilience. Doyaken handles model fallback when a provider is down, crash recovery to resume interrupted pipelines, and automatic rate-limit backoff. The goal is unattended operation — start a task, walk away, come back to working code.

## MCP integration

Connects to GitHub, Linear, Slack, and Jira through the Model Context Protocol, so the agent can read issues, post updates, and close tickets as part of the pipeline — not just write code in isolation.
