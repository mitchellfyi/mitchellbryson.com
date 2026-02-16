import { SimpleLayout } from '@/components/SimpleLayout'
import { ToolsList } from '@/components/ToolsList'

const tools = [
  {
    name: 'Claude Code',
    category: 'ai-coding',
    description:
      'My daily driver for AI-assisted coding and running agentic teams. Claude works directly in the codebase via terminal, IDE, or web - great for multi-step tasks and autonomous workflows.',
    url: 'https://www.anthropic.com/claude-code',
  },
  {
    name: 'Cursor',
    category: 'ai-coding',
    description:
      'AI-powered IDE built on VS Code. I use it mainly for codebase exploration - understanding unfamiliar repos, navigating large codebases, and quick edits with strong context awareness.',
    url: 'https://cursor.com',
  },
  {
    name: 'Codex',
    category: 'ai-coding',
    description:
      'OpenAI’s coding agent for background tasks like issue triage, CI monitoring, and automated workflows. Runs headless or via CLI without blocking the main workflow.',
    url: 'https://openai.com/codex',
  },
  {
    name: 'n8n',
    category: 'automation',
    description:
      'Self-hostable workflow automation. Connects APIs, databases, and services with a visual editor. I use it for data pipelines, webhooks, and glue between tools.',
    url: 'https://n8n.io',
  },
  {
    name: 'Metabase',
    category: 'data',
    description:
      'Open-source BI and data visualisation. Build dashboards, run ad-hoc queries, and share insights without writing SQL. Works well with Postgres, MySQL, and more.',
    url: 'https://www.metabase.com',
  },
  {
    name: 'Supabase',
    category: 'data',
    description:
      'Hosted Postgres with auth, storage, and realtime. Open-source Firebase alternative. I use it for backend-as-a-service and vector search via pgvector when I need a database without managing servers.',
    url: 'https://supabase.com',
  },
  {
    name: 'Upstash',
    category: 'data',
    description:
      'Serverless Redis with per-request pricing. No connection limits, works at the edge. I use it for caching, rate limiting, vector search, and session storage in serverless apps.',
    url: 'https://upstash.com',
  },
  {
    name: 'Wispr Flow',
    category: 'productivity',
    description:
      'Voice-to-text that actually works for code. Handles camelCase, acronyms, and dev jargon. I use it for docs, notes, and long-form writing when typing is slow.',
    url: 'https://wisprflow.ai',
  },
  {
    name: 'Obsidian',
    category: 'productivity',
    description:
      'Markdown-based note-taking with local-first storage and a graph view. My second brain for projects, meeting notes, and knowledge bases that link together.',
    url: 'https://obsidian.md',
  },
  {
    name: 'Warp',
    category: 'productivity',
    description:
      'Modern terminal with AI, blocks, and a polished UX. Better autocomplete, command palette, and split panes. Replaced iTerm as my default shell.',
    url: 'https://warp.dev',
  },
  {
    name: 'Rectangle',
    category: 'productivity',
    description:
      'Open-source Mac window manager. Keyboard shortcuts and snap zones to tile, maximise, and arrange windows. Replaced Spectacle for me - free and actively maintained.',
    url: 'https://rectangleapp.com',
  },
  {
    name: 'GitLens',
    category: 'ai-coding',
    description:
      'Git superpowers for VS Code and Cursor. Inline blame, commit graph, worktrees, and AI commit messages. Makes Git history and collaboration much easier.',
    url: 'https://www.gitkraken.com/gitlens',
  },
  {
    name: 'DigitalOcean',
    category: 'hosting',
    description:
      'Cloud hosting for VPS, managed databases, and app platforms. Simple pricing, good docs, and Droplets that scale. I use it for side projects and self-hosted services.',
    url: 'https://www.digitalocean.com',
  },
  {
    name: 'Vercel',
    category: 'hosting',
    description:
      'Frontend and serverless hosting optimised for Next.js. Zero-config deploys, edge functions, and preview URLs per branch. My go-to for static sites and JAMstack apps.',
    url: 'https://vercel.com',
  },
  {
    name: 'Dokku',
    category: 'hosting',
    description:
      'Self-hosted Heroku-style PaaS. Git push to deploy, buildpacks, and one-command app management. Runs on any VPS - great for small teams who want control without Kubernetes.',
    url: 'https://dokku.com',
  },
  {
    name: 'Cloudflare',
    category: 'infrastructure',
    description:
      'DNS, CDN, and edge security. Fast propagation, free tier, and DDoS protection. I use it for domain management, SSL, and sometimes Workers for lightweight edge logic.',
    url: 'https://www.cloudflare.com',
  },
  {
    name: 'Namecheap',
    category: 'infrastructure',
    description:
      'Domain registrar with competitive pricing and straightforward management. I use it to register and renew domains, then point them at Cloudflare or hosting.',
    url: 'https://www.namecheap.com',
  },
  {
    name: 'Resend',
    category: 'infrastructure',
    description:
      'Transactional email API built for developers. Simple SDK, React Email support, and good deliverability. Powers contact forms, notifications, and password resets.',
    url: 'https://resend.com',
  },
]

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'
const defaultOgImage = `${siteUrl}/api/og?title=${encodeURIComponent('Tools')}&description=${encodeURIComponent('Software and tools I use for development, automation, and productivity.')}&type=home`

export const metadata = {
  title: 'Tools',
  description: 'Software and tools I use for development, automation, and productivity.',
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
  openGraph: {
    title: 'Tools - Mitchell Bryson',
    description: 'Software and tools I use for development, automation, and productivity.',
    url: `${siteUrl}/tools`,
    siteName: 'Mitchell Bryson',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Tools - Mitchell Bryson',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools - Mitchell Bryson',
    description: 'Software and tools I use for development, automation, and productivity.',
    images: [defaultOgImage],
  },
}

export default function Tools() {
  return (
    <SimpleLayout
      title="Tools I use"
      intro="Software and tools that power my daily workflow - from AI coding agents and automations to hosting, DNS, and email."
    >
      <ToolsList tools={tools} />
    </SimpleLayout>
  )
}
