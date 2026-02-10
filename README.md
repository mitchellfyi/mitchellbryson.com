# mitchellbryson.com

Personal website and blog of Mitchell Bryson — writings on AI agents, autonomous systems, and the future of work.

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
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SITE_URL=https://mitchellbryson.com
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your-email@example.com
```

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | PRs to `main` | Lint, build, security audit |
| **Deploy Production** | Push to `main` | CI + deploy summary |
| **Self-Healing CI** | CI failure | Auto-creates issues, assigns to Copilot |
| **Rollback** | Manual | Rollback to known-good commit |

Deployments are handled by Vercel's Git integration.

### Local Checks

```bash
npm run lint        # ESLint
npm run build       # Production build
npm audit --audit-level=critical  # Security audit
```

## License

Site template licensed under [Tailwind Plus license](https://tailwindcss.com/plus/license).
Content © Mitchell Bryson.
