---
title: 'Launchonomy'
description: 'A system for orchestrating AI agents to complete "missions" through consensus driven decision-making and workflow automation.'
author: Mitchell Bryson
date: '2025-06-01'
link:
  href: 'https://github.com/mitchellfyi/launchonomy'
  label: 'View on GitHub'
---

Launchonomy deploys a team of specialised AI agents to build and operate businesses autonomously. Each agent handles a different function — strategy, marketing, finance, growth — and they coordinate through a shared mission loop.

## How it works

A C-Suite orchestration model drives the system. Executive agents (CEO, CRO, CTO, CFO) define strategy, then operational agents execute workflows in sequence: scanning markets, deploying products, running campaigns, tracking analytics, managing finances. Leadership reviews results, adjusts strategy, and the cycle repeats.

A mission-scoped RAG memory system lets agents learn from past decisions and retrieve relevant context using vector search, so knowledge compounds across iterations.

## Mission workspaces

Each mission gets its own workspace with automatic file storage, asset tracking, and manifest management. Missions are resumable — pause an operation and pick it back up later with full context intact.

## Key features

- **Persistent vector memory** — ChromaDB-backed storage scoped per mission, surviving restarts
- **Financial guardrails** — real-world cost tracking with compliance monitoring and budget limits
- **Comprehensive logging** — strategic decisions, financial metrics, and token usage all recorded
- **CLI tooling** — workspace management and status monitoring from the terminal

## Stack

Python 3.8+, Microsoft AutoGen for multi-agent orchestration, OpenAI APIs, and ChromaDB for vector storage.
