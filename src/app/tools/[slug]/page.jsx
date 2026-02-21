import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllToolSlugs, getTool, tools } from '@/lib/tools'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }))
}

function getOgImage(title, description) {
  return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}

  const pageUrl = `${siteUrl}/tools/${slug}`
  const ogImage = getOgImage(tool.name, tool.description)

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${tool.name} - Mitchell Bryson`,
      description: tool.description,
      url: pageUrl,
      siteName: 'Mitchell Bryson',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Mitchell Bryson`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Mitchell Bryson`,
      description: tool.description,
      images: [ogImage],
    },
  }
}

const CATEGORY_LABELS = {
  'ai-coding': 'AI & Coding',
  data: 'Data',
  automation: 'Automation',
  productivity: 'Productivity',
  hosting: 'Hosting',
  infrastructure: 'Infrastructure',
}

export default async function ToolPage({ params }) {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool) {
    notFound()
  }

  const paragraphs = tool.content.split('\n\n').filter(Boolean)

  const relatedTools = tools.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug,
  )

  return (
    <SimpleLayout title={tool.name} intro={tool.description}>
      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-600 dark:text-teal-400">
            {CATEGORY_LABELS[tool.category] || tool.category}
          </span>
          <Link
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            Visit website
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                d="M15 3h6v6M10 14 21 3M21 3v6M21 3h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="prose dark:prose-invert max-w-2xl space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-zinc-600 dark:text-zinc-400">
              {paragraph}
            </p>
          ))}
        </div>

        {relatedTools.length > 0 && (
          <section className="max-w-4xl border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Other {CATEGORY_LABELS[tool.category] || tool.category} tools
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((related) => (
                <Link
                  key={related.slug}
                  href={`/tools/${related.slug}`}
                  className="group rounded-2xl border border-zinc-100 p-5 transition hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
                >
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    {related.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 line-clamp-2 dark:text-zinc-400">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
          <Link
            href="/tools"
            className="text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
          >
            ← Back to all tools
          </Link>
        </div>
      </div>
    </SimpleLayout>
  )
}
