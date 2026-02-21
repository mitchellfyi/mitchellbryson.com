---
title: 'Inbox Triage Extension'
description: 'Triage your inbox with AI-powered email summaries, attachment analysis, and reply drafts - all processed locally for complete privacy.'
author: Mitchell Bryson
date: '2025-05-01'
link:
  href: 'https://github.com/mitchellfyi/inbox-triage-extension'
  label: 'View on GitHub'
---

Inbox Triage is a Chrome extension that summarises email threads, analyses attachments, and generates reply drafts — all using on-device AI so nothing leaves your machine.

## How it works

Content scripts extract email data from Gmail and Outlook. A service worker coordinates the AI processing, and a side panel provides the interface. It uses Chrome's built-in AI APIs (Summarizer, Prompt, Translator) for local processing, with optional cloud model support if you prefer.

## Key features

- **Thread summaries** — automatic summarisation with key point extraction for any email thread
- **Reply drafts** — three tailored drafts per email in multiple tones and styles, injected directly into Gmail/Outlook compose windows
- **Attachment analysis** — image analysis with OCR via a single button
- **Voice input** — customise draft guidance using voice-based input
- **Multilingual** — local translation across 15+ languages via Chrome Translator API
- **Works offline** — fully functional once the on-device models are downloaded
- **Session restore** — previous summaries persist across browser sessions

## Privacy first

Everything runs through Chrome's built-in AI APIs by default. Your emails never leave the browser. If you want cloud-based models, you can optionally configure API keys for OpenAI, Anthropic, or Google Gemini — but it's entirely opt-in.

## Stack

Chrome Manifest V3 extension architecture, Chrome Summarizer API, Chrome Prompt API, and Chrome Translator API. Optional integrations with OpenAI, Anthropic Claude, and Google Gemini.
