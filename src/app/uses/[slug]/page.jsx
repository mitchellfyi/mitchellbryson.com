import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ContentParagraphs } from '@/components/ContentParagraphs'
import { ArrowTopRightIcon } from '@/components/Icons'
import { SimpleLayout } from '@/components/SimpleLayout'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { CATEGORY_LABELS, getAllToolSlugs, getTool, tools } from '@/lib/tools'

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}

  return buildMetadata({
    title: tool.name,
    description: tool.description,
    url: `${siteUrl}/uses/${slug}`,
  })
}

export default async function ToolPage({ params }) {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = tools.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug,
  )

  return (
    <>
    <BreadcrumbJsonLd
      items={[
        { name: 'Home', url: siteUrl },
        { name: 'Uses', url: `${siteUrl}/uses` },
        { name: tool.name, url: `${siteUrl}/uses/${slug}` },
      ]}
    />
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
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            Visit website
            <ArrowTopRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <ContentParagraphs content={tool.content} />

        {relatedTools.length > 0 && (
          <section className="max-w-4xl border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Other {CATEGORY_LABELS[tool.category] || tool.category} tools
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((related) => (
                <Link
                  key={related.slug}
                  href={`/uses/${related.slug}`}
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
            href="/uses"
            className="text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            ← Back to all tools
          </Link>
        </div>
      </div>
    </SimpleLayout>
    </>
  )
}
