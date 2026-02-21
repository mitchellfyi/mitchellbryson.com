---
title: 'lofield.fm'
description: 'Create lofi beats using natural language. Just describe what you want, and AI generates the music for you.'
author: Mitchell Bryson
date: '2025-08-01'
link:
  href: 'https://github.com/mitchellfyi/lofield.fm'
  label: 'View on GitHub'
---

lofield.fm lets you create lofi beats by describing what you want in plain English. No music theory or DAW experience needed — just type a description and the AI turns it into playable music running in your browser.

## How it works

You describe the sound you're after in natural language. The AI converts your prompt into executable Tone.js code, which runs in the browser to produce real-time audio. You can refine beats iteratively through conversation, adjusting the generated code or tweaking performance controls until it sounds right.

## Key features

- **Text to music** — describe a vibe and get playable Tone.js code
- **Performance controls** — tempo (60–200 BPM), swing, filters, reverb, and delay, all adjustable in real time
- **Multi-layer composition** — independent drum, bass, melody, and pad tracks
- **Automation recording** — capture parameter changes during playback
- **Version history** — every revision tracked with diffs and one-click restore
- **Export options** — WAV rendering, shareable public links, and raw code export
- **Code editor** — CodeMirror 6 with syntax highlighting and error detection
- **Visual timeline** — 32-bar view with playback position and section markers

## Stack

Next.js, React 19, and Tailwind CSS on the frontend. Tone.js for audio synthesis. OpenAI GPT-4o via Vercel AI SDK for prompt-to-code generation. Supabase for auth, database, and storage. CodeMirror 6 for the code editor.
