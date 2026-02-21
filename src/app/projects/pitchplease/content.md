---
title: 'PitchPlease'
description: 'A Next.js app and Agentic AI workflow for uploading a pitch deck and turning it into a AI generated video, with voiceover and narrator.'
author: Mitchell Bryson
date: '2025-04-01'
link:
  href: 'https://github.com/mitchellfyi/pitchplease'
  label: 'View on GitHub'
---

PitchPlease takes a static PDF pitch deck and turns it into a narrated video presentation with talking avatars, slide animations, and professional voice synthesis. Upload a deck, wait for the pipeline, get a shareable video.

## The pipeline

Every deck flows through five stages:

1. **Upload & extract** — PDF parsing pulls content and structure from each slide
2. **Narration** — AI generates a presenter script, then a talking avatar delivers it via Sievedata/VEED.io with lip-sync
3. **Visual enhancement** — fal.ai adds slide animations and transitions between sections
4. **Voice synthesis** — ElevenLabs produces multiple voice style options for the narration
5. **Compilation** — everything gets stitched into a distributable video format

Real-time progress tracking shows exactly where a deck is in the pipeline.

## Key features

- **Drag-and-drop interface** — upload PDFs up to 10MB with a responsive web UI
- **Talking avatars** — lip-synced AI presenters narrate each slide
- **Multiple voice options** — choose from premium ElevenLabs voice styles
- **OAuth authentication** — sign in with GitHub or Google
- **One-click deploy** — ships to Vercel with minimal configuration

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui and Framer Motion on the frontend. Vercel Postgres with Drizzle ORM, Supabase, and Vercel Blob on the backend. ElevenLabs, fal.ai, Sievedata, and OpenAI for the AI pipeline.
