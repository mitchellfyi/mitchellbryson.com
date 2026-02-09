# Spotlight

Spotlight is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the required environment variables:

```
NEXT_PUBLIC_SITE_URL=https://example.com
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your-email@example.com
```

**Environment Variables:**
- `NEXT_PUBLIC_SITE_URL`: Your site's public URL
- `RESEND_API_KEY`: Your Resend API key for sending emails (get one at [resend.com](https://resend.com))
- `CONTACT_EMAIL`: The email address where contact form submissions will be sent

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## CI/CD

### Workflows

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| **CI** | `ci.yml` | Push to `main`, PRs targeting `main` | Runs lint, build, and security audit |
| **Deploy Production** | `deploy-production.yml` | Push to `main` | Runs CI then records a deploy summary |
| **Rollback Production** | `rollback-production.yml` | Manual dispatch | Validates and builds a specific commit SHA for rollback |

### Running checks locally

```bash
# Install dependencies
npm ci

# Lint
npm run lint

# Build
npm run build

# Security audit
npm audit --audit-level=critical
```

### How deploys work

Deployments to production are handled by **Vercel's Git integration**, which deploys automatically on every push to `main`. The `deploy-production.yml` workflow ensures that CI (lint, build, security audit) passes before the deploy is recorded as safe.

**Branch protection rules** should be configured on `main` to require:
- All CI status checks to pass before merging
- At least one approval on pull requests
- No force pushes
- Linear history (squash or rebase merges preferred)

### Rollback

If a bad deploy reaches production, trigger a rollback via the **Rollback Production** workflow:

1. Go to **Actions → Rollback Production → Run workflow**
2. Enter the commit SHA of a known-good commit on `main`
3. The workflow validates the commit, builds it, and provides instructions for completing the rollback via Vercel

Alternatively, use the Vercel dashboard to promote a previous deployment.

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
