export const tools = [
  {
    name: 'Claude Code',
    slug: 'claude-code',
    category: 'ai-coding',
    description:
      'My daily driver for AI-assisted coding and running agentic teams. Claude works directly in the codebase via terminal, IDE, or web - great for multi-step tasks and autonomous workflows.',
    url: 'https://www.anthropic.com/claude-code',
    content:
      'Claude Code is Anthropic\'s agentic coding tool that operates directly in your terminal, IDE, or through the web interface. Unlike chat-based AI assistants, Claude Code understands your full codebase context and can make multi-file changes, run tests, and execute complex workflows autonomously.\n\nI use Claude Code as my primary AI coding tool for day-to-day development. It handles everything from writing new features and debugging issues to refactoring code and managing git workflows. The ability to run it in agentic mode means I can kick off a task and let it work through multi-step problems without hand-holding.\n\nWhat makes it stand out is the depth of context it works with. It reads your project files, understands the architecture, and makes changes that respect existing patterns and conventions. I run teams of Claude Code agents in parallel for larger tasks - each working on different parts of a feature or codebase simultaneously.',
  },
  {
    name: 'Cursor',
    slug: 'cursor',
    category: 'ai-coding',
    description:
      'AI-powered IDE built on VS Code. I use it mainly for codebase exploration - understanding unfamiliar repos, navigating large codebases, and quick edits with strong context awareness.',
    url: 'https://cursor.com',
    content:
      'Cursor is an AI-native IDE built on top of VS Code that brings intelligent code understanding directly into the editor. It supports all VS Code extensions while adding AI-powered features like inline completions, codebase-aware chat, and multi-file editing.\n\nI use Cursor primarily for codebase exploration and navigation. When I\'m diving into an unfamiliar repo or working with a large codebase, Cursor\'s ability to index and understand the full project makes it much faster to find what I need. The inline AI completions are good for quick edits where you want contextual suggestions without switching to a separate tool.\n\nThe chat feature is useful for asking questions about how specific parts of the codebase work, and the multi-file editing capabilities let you make coordinated changes across several files at once. It fits well alongside Claude Code - I tend to use Cursor for exploration and quick edits, and Claude Code for heavier autonomous work.',
  },
  {
    name: 'Codex',
    slug: 'codex',
    category: 'ai-coding',
    description:
      'OpenAI\'s coding agent for background tasks like issue triage, CI monitoring, and automated workflows. Runs headless or via CLI without blocking the main workflow.',
    url: 'https://openai.com/codex',
    content:
      'Codex is OpenAI\'s coding agent designed for autonomous background tasks. It can be run headless or via CLI, making it well-suited for automated workflows that don\'t need constant human oversight.\n\nI use Codex for tasks like issue triage, CI monitoring, and repetitive maintenance work. It\'s good at picking up a well-defined task, executing it, and reporting back - the kind of work that would otherwise interrupt your main flow.\n\nThe headless execution model is what makes it useful in a multi-agent setup. You can dispatch tasks to Codex and continue working on other things while it handles the background work. It fits into a broader workflow where different AI tools handle different types of tasks based on their strengths.',
  },
  {
    name: 'n8n',
    slug: 'n8n',
    category: 'automation',
    description:
      'Self-hostable workflow automation. Connects APIs, databases, and services with a visual editor. I use it for data pipelines, webhooks, and glue between tools.',
    url: 'https://n8n.io',
    content:
      'n8n is an open-source workflow automation platform that you can self-host. It provides a visual editor for building workflows that connect APIs, databases, and services together without writing boilerplate integration code.\n\nI use n8n for building data pipelines, handling webhooks, and creating the glue logic between different tools and services. The visual editor makes it straightforward to build and debug multi-step workflows, and self-hosting means you keep full control over your data and execution environment.\n\nWhat sets n8n apart from alternatives like Zapier or Make is the self-hosting option and the ability to write custom code nodes when you need more control. The community maintains hundreds of integrations, and you can extend it with your own nodes for internal services.',
  },
  {
    name: 'Metabase',
    slug: 'metabase',
    category: 'data',
    description:
      'Open-source BI and data visualisation. Build dashboards, run ad-hoc queries, and share insights without writing SQL. Works well with Postgres, MySQL, and more.',
    url: 'https://www.metabase.com',
    content:
      'Metabase is an open-source business intelligence tool for building dashboards and running ad-hoc queries against your databases. It supports Postgres, MySQL, and many other data sources out of the box.\n\nI use Metabase for data visualisation and reporting. It lets non-technical team members explore data and build their own dashboards without needing to write SQL, while still giving power users direct query access when they need it.\n\nThe self-hosted option makes it easy to connect directly to your production or replica databases. You can set up automated reports, embed dashboards in other tools, and share insights across a team without building custom reporting infrastructure.',
  },
  {
    name: 'Supabase',
    slug: 'supabase',
    category: 'data',
    description:
      'Hosted Postgres with auth, storage, and realtime. Open-source Firebase alternative. I use it for backend-as-a-service and vector search via pgvector when I need a database without managing servers.',
    url: 'https://supabase.com',
    content:
      'Supabase is an open-source Firebase alternative built on top of Postgres. It provides a hosted database with authentication, file storage, realtime subscriptions, and edge functions all in one platform.\n\nI use Supabase when I need a backend without managing servers. The Postgres foundation means you get a proper relational database with full SQL support, and the built-in auth and storage save a lot of setup time. The pgvector extension is particularly useful for AI projects that need vector search and similarity matching.\n\nThe developer experience is strong - good client libraries, a clean dashboard, and row-level security policies that let you define access control directly in the database. It works well for side projects and MVPs where you want to move fast without sacrificing the ability to scale later.',
  },
  {
    name: 'Upstash',
    slug: 'upstash',
    category: 'data',
    description:
      'Serverless Redis with per-request pricing. No connection limits, works at the edge. I use it for caching, rate limiting, vector search, and session storage in serverless apps.',
    url: 'https://upstash.com',
    content:
      'Upstash provides serverless Redis and Kafka with per-request pricing. There are no connection limits, and it works natively at the edge - making it a natural fit for serverless and edge-first architectures.\n\nI use Upstash for caching, rate limiting, vector search, and session storage in serverless applications. Traditional Redis requires persistent connections, which doesn\'t work well with serverless functions that spin up and down. Upstash solves this with an HTTP-based API that works anywhere.\n\nThe pricing model is straightforward - you pay per request rather than for provisioned capacity. This makes it cost-effective for applications with variable traffic. They also offer QStash for message queues and Upstash Vector for vector similarity search, which rounds out the serverless data layer.',
  },
  {
    name: 'Wispr Flow',
    slug: 'wispr-flow',
    category: 'productivity',
    description:
      'Voice-to-text that actually works for code. Handles camelCase, acronyms, and dev jargon. I use it for docs, notes, and long-form writing when typing is slow.',
    url: 'https://wisprflow.ai',
    content:
      'Wispr Flow is a voice-to-text tool that understands developer language. Unlike general dictation tools, it handles camelCase, acronyms, technical jargon, and code-related terminology accurately.\n\nI use Wispr Flow for writing documentation, notes, and long-form content where typing would be slower. It\'s particularly useful for writing up project descriptions, commit messages, and technical explanations where you want to think out loud rather than type.\n\nThe accuracy on technical terms is what makes it practical for developer workflows. You can dictate function names, library names, and technical concepts without constantly correcting the output. It runs locally and integrates with any text field, so you can use it across different apps and editors.',
  },
  {
    name: 'Obsidian',
    slug: 'obsidian',
    category: 'productivity',
    description:
      'Markdown-based note-taking with local-first storage and a graph view. My second brain for projects, meeting notes, and knowledge bases that link together.',
    url: 'https://obsidian.md',
    content:
      'Obsidian is a markdown-based knowledge management tool with local-first storage. All your notes are plain markdown files on your filesystem, which means you own your data and can use any tool to access it.\n\nI use Obsidian as my second brain for projects, meeting notes, and knowledge bases. The bidirectional linking and graph view make it easy to build connections between ideas and find related notes. Over time, the knowledge graph becomes a map of how different projects, concepts, and decisions relate to each other.\n\nThe plugin ecosystem is extensive - from daily notes and templates to Kanban boards and dataview queries. Because everything is markdown, notes work well with git version control and can be read by any text editor if you ever want to move away.',
  },
  {
    name: 'Warp',
    slug: 'warp',
    category: 'productivity',
    description:
      'Modern terminal with AI, blocks, and a polished UX. Better autocomplete, command palette, and split panes. Replaced iTerm as my default shell.',
    url: 'https://warp.dev',
    content:
      'Warp is a modern terminal application with AI-powered features, command blocks, and a refined user experience. It organises command output into blocks, provides intelligent autocomplete, and includes a command palette for quick access to features.\n\nI switched from iTerm to Warp for the productivity improvements. The block-based output makes it easy to copy, share, and reference previous command results. The autocomplete is noticeably better than standard shell completions, and the AI integration helps with unfamiliar commands and flags.\n\nThe split panes, themes, and collaborative features round it out as a daily-driver terminal. It\'s fast enough that you don\'t notice the extra features, and the workflow improvements add up over a full day of terminal use.',
  },
  {
    name: 'Rectangle',
    slug: 'rectangle',
    category: 'productivity',
    description:
      'Open-source Mac window manager. Keyboard shortcuts and snap zones to tile, maximise, and arrange windows. Replaced Spectacle for me - free and actively maintained.',
    url: 'https://rectangleapp.com',
    content:
      'Rectangle is an open-source window management tool for macOS. It provides keyboard shortcuts and snap zones for tiling, maximising, and arranging windows across your screen.\n\nI use Rectangle constantly throughout the day to manage my workspace. Quick keyboard shortcuts to snap windows to halves, thirds, or corners means I rarely need to manually drag and resize. It\'s the kind of tool that becomes invisible once you\'ve set it up - you just use the shortcuts without thinking.\n\nRectangle replaced Spectacle for me when that project stopped being maintained. It\'s free, open-source, and actively developed. The configuration is minimal - set your preferred shortcuts once and you\'re done.',
  },
  {
    name: 'GitLens',
    slug: 'gitlens',
    category: 'ai-coding',
    description:
      'Git superpowers for VS Code and Cursor. Inline blame, commit graph, worktrees, and AI commit messages. Makes Git history and collaboration much easier.',
    url: 'https://www.gitkraken.com/gitlens',
    content:
      'GitLens is a VS Code and Cursor extension that adds powerful Git capabilities directly into the editor. It provides inline blame annotations, a visual commit graph, worktree management, and AI-assisted commit messages.\n\nI use GitLens to understand code history and navigate changes. The inline blame is useful for quickly seeing who changed a line and why, and the commit graph gives a visual overview of branch history that\'s easier to parse than terminal output.\n\nWorktree support lets you work on multiple branches simultaneously without stashing or switching, which is valuable when you need to context-switch between features or review PRs. The AI commit message feature generates meaningful commit descriptions based on your staged changes.',
  },
  {
    name: 'DigitalOcean',
    slug: 'digitalocean',
    category: 'hosting',
    description:
      'Cloud hosting for VPS, managed databases, and app platforms. Simple pricing, good docs, and Droplets that scale. I use it for side projects and self-hosted services.',
    url: 'https://www.digitalocean.com',
    content:
      'DigitalOcean provides cloud infrastructure including virtual servers (Droplets), managed databases, Kubernetes, and an app platform. The pricing is straightforward and the documentation is consistently well-written.\n\nI use DigitalOcean for side projects and self-hosted services where I want a VPS with predictable costs. Droplets are easy to spin up and scale, and managed databases remove the operational overhead of running Postgres or MySQL yourself.\n\nThe app platform offers Heroku-style deployments for when you don\'t want to manage infrastructure directly. Combined with their marketplace of one-click apps, it\'s a practical choice for getting services running quickly without over-engineering the infrastructure.',
  },
  {
    name: 'Vercel',
    slug: 'vercel',
    category: 'hosting',
    description:
      'Frontend and serverless hosting optimised for Next.js. Zero-config deploys, edge functions, and preview URLs per branch. My go-to for static sites and JAMstack apps.',
    url: 'https://vercel.com',
    content:
      'Vercel is a hosting platform optimised for frontend and serverless applications, with first-class support for Next.js. It offers zero-configuration deployments, edge functions, and automatic preview URLs for every branch and pull request.\n\nI use Vercel for static sites and JAMstack applications - including this website. The deployment workflow is seamless: push to git and get a production deployment within seconds. Preview URLs for every PR make it easy to review changes before they go live.\n\nEdge functions let you run server-side logic close to users without managing servers, and the built-in analytics and speed insights help you monitor performance. The free tier is generous enough for personal projects and small apps.',
  },
  {
    name: 'Dokku',
    slug: 'dokku',
    category: 'hosting',
    description:
      'Self-hosted Heroku-style PaaS. Git push to deploy, buildpacks, and one-command app management. Runs on any VPS - great for small teams who want control without Kubernetes.',
    url: 'https://dokku.com',
    content:
      'Dokku is a self-hosted platform-as-a-service that gives you Heroku-style deployments on your own infrastructure. It supports git push deployments, buildpacks, Docker containers, and simple command-line app management.\n\nI use Dokku on DigitalOcean Droplets for applications where I want the convenience of PaaS deployments with full control over the server. You get features like automatic SSL via Let\'s Encrypt, zero-downtime deploys, and plugin support for databases, caching, and more.\n\nIt\'s a good fit for small teams and solo developers who don\'t need the complexity of Kubernetes but want something more structured than manual server management. A single VPS running Dokku can comfortably host multiple applications with proper isolation and resource management.',
  },
  {
    name: 'Cloudflare',
    slug: 'cloudflare',
    category: 'infrastructure',
    description:
      'DNS, CDN, and edge security. Fast propagation, free tier, and DDoS protection. I use it for domain management, SSL, and sometimes Workers for lightweight edge logic.',
    url: 'https://www.cloudflare.com',
    content:
      'Cloudflare provides DNS, CDN, DDoS protection, and edge computing services. DNS propagation is fast, the free tier covers most personal and small business needs, and the security features protect against common web threats.\n\nI use Cloudflare for domain management and SSL across all my projects. Pointing nameservers to Cloudflare gives you automatic SSL, caching, and security without additional configuration. The dashboard makes it straightforward to manage DNS records, page rules, and security settings.\n\nCloudflare Workers offer lightweight edge computing for when you need server-side logic without a full backend. The edge network is extensive, so your DNS and cached content resolve quickly worldwide.',
  },
  {
    name: 'Namecheap',
    slug: 'namecheap',
    category: 'infrastructure',
    description:
      'Domain registrar with competitive pricing and straightforward management. I use it to register and renew domains, then point them at Cloudflare or hosting.',
    url: 'https://www.namecheap.com',
    content:
      'Namecheap is a domain registrar with competitive pricing and a clean management interface. They offer domain registration, renewal, and transfer services along with optional extras like email and SSL.\n\nI use Namecheap to register and renew domains, then point the nameservers at Cloudflare for DNS management and CDN. The pricing is transparent - no hidden fees or aggressive upselling during checkout like some registrars.\n\nThe management dashboard is functional without being cluttered. Domain auto-renewal, WHOIS privacy (included free), and bulk management make it easy to handle multiple domains without much overhead.',
  },
  {
    name: 'Resend',
    slug: 'resend',
    category: 'infrastructure',
    description:
      'Transactional email API built for developers. Simple SDK, React Email support, and good deliverability. Powers contact forms, notifications, and password resets.',
    url: 'https://resend.com',
    content:
      'Resend is a transactional email API built for developers. It provides a simple SDK, supports React Email for building email templates with React components, and focuses on deliverability.\n\nI use Resend for contact forms, notifications, and transactional emails. The SDK is minimal - sending an email is a single function call with a clean API. React Email integration means you can build and preview email templates using the same component patterns as your frontend.\n\nDeliverability is solid, which is the most important thing for transactional email. The dashboard gives you visibility into delivery status, opens, and bounces. The free tier handles most personal project volumes, and pricing scales reasonably as you send more.',
  },
]

export function getTool(slug) {
  return tools.find((tool) => tool.slug === slug)
}

export function getAllToolSlugs() {
  return tools.map((tool) => tool.slug)
}
