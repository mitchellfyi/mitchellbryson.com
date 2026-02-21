# mitchellbryson.com

Personal website and blog of Mitchell Bryson - writings on AI agents, autonomous systems, and the future of work.

**Live site:** [mitchellbryson.com](https://mitchellbryson.com)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Hosting:** [Vercel](https://vercel.com)
- **Template:** Based on [Tailwind Plus Spotlight](https://tailwindcss.com/plus)

## Content

### Articles

Essays and thought pieces on:

- AI agent ecosystems and agent-to-agent interactions
- Autonomous finance and AI CFOs
- Synthetic organizations and AI-first agencies
- Human-AI collaboration and oversight
- Enterprise AI implementation

### Projects

Showcases of open-source and experimental projects.

## Prerequisites

- Node.js >= 22 (see `.nvmrc`)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Format
npm run format

# Run tests
npm run test

# Run all checks (format, lint, test, e2e, build)
npm run validate
```

Open [http://localhost:3003](http://localhost:3003) to view locally.

### Environment Variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://mitchellbryson.com   # Public site URL for meta tags
RESEND_API_KEY=your_resend_api_key                # Resend API key for contact form emails
CONTACT_EMAIL=your-email@example.com              # Recipient for contact form submissions
OPENAI_API_KEY=your-openai-api-key                # OpenAI key for article generation script
CLAUDE_CODE_OAUTH_TOKEN=your-token                # Claude Code token for article generation CI
GH_PAT=your-github-pat                            # GitHub PAT for article generation PR creation
```

## CI/CD

| Workflow              | Trigger        | Purpose                                 |
| --------------------- | -------------- | --------------------------------------- |
| **CI**                | PRs to `main`  | Lint, build, security audit             |
| **Deploy Production** | Push to `main` | CI + deploy summary                     |
| **Self-Healing CI**   | CI failure     | Auto-creates issues, assigns to Copilot |
| **Rollback**          | Manual         | Rollback to known-good commit           |

Deployments are handled by Vercel's Git integration.

## License

Site template licensed under [Tailwind Plus license](https://tailwindcss.com/plus/license).
Content © Mitchell Bryson.
