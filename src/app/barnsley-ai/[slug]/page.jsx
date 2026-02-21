import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ContactCTA } from '@/components/ContactCTA'
import { ContentParagraphs } from '@/components/ContentParagraphs'
import { IntegrationCard } from '@/components/IntegrationCard'
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getToolIcon, getToolColor } from '@/components/ProjectIcons'
import {
  aiIntegrations,
  allBarnsleyPages,
  businessTypes,
  getBarnsleyPage,
  getRandomItems,
} from '@/lib/barnsleyPages'
import { getProjectTool } from '@/lib/projectTools'
import { RELEVANT_TOOLS } from '@/lib/relevantTools'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export async function generateStaticParams() {
  return allBarnsleyPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getBarnsleyPage(slug)
  if (!page) return {}

  const metaDescription =
    page.description.length >= 140
      ? page.description
      : `${page.title} for Barnsley businesses. ${page.description}`

  return buildMetadata({
    title: `${page.title} Barnsley | AI Development`,
    description: metaDescription,
    url: `${siteUrl}/barnsley-ai/${slug}`,
    ogTitle: `${page.title} Barnsley | AI Software Engineer`,
    keywords: [
      `${page.title} Barnsley`,
      'AI Barnsley',
      'AI South Yorkshire',
      page.category === 'ai'
        ? 'AI integration Barnsley'
        : 'AI consultant Barnsley',
    ],
  })
}

export default async function BarnsleySubPage({ params }) {
  const { slug } = await params
  const page = getBarnsleyPage(slug)

  if (!page) {
    notFound()
  }

  const featuredBusinessTypes = getRandomItems(businessTypes, 3)
  const featuredAiIntegrations = getRandomItems(aiIntegrations, 3)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'AI in Barnsley', url: `${siteUrl}/barnsley-ai` },
          { name: page.title, url: `${siteUrl}/barnsley-ai/${slug}` },
        ]}
      />
      {page.faqs && <FAQPageJsonLd faqs={page.faqs} />}
      <SimpleLayout title={page.title} intro={page.description}>
        <div className="space-y-8">
          <ContentParagraphs content={page.content} />

          {page.integrations && (
            <section className="max-w-4xl">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Example AI integrations
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                AI services and tools I've integrated for Barnsley businesses
                include:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.integrations.map((integration) => (
                  <IntegrationCard
                    key={integration.url}
                    integration={integration}
                    pages={[]}
                    showContext
                  />
                ))}
              </div>
            </section>
          )}

          {RELEVANT_TOOLS[slug] && (
            <section className="max-w-2xl pt-6">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Try these free tools
              </h2>
              <div className="mt-3 space-y-3">
                {RELEVANT_TOOLS[slug].map((entry) => {
                  const tool = getProjectTool(entry.slug)
                  if (!tool) return null
                  const ToolIcon = getToolIcon(entry.slug)
                  const toolColor = getToolColor(entry.slug)
                  return (
                    <Link
                      key={entry.slug}
                      href={`/projects/tools/${entry.slug}`}
                      className="flex items-start gap-4 rounded-xl border border-zinc-100 p-4 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700/40 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-zinc-700/50">
                        <ToolIcon className={`h-4 w-4 ${toolColor}`} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {tool.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                          {entry.reason}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {page.category === 'ai' && (
            <section className="prose max-w-2xl pt-6 dark:prose-invert">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Types of Barnsley businesses I work with on AI
              </h2>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                {featuredBusinessTypes.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/barnsley-ai/${item.slug}`}
                      className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      {item.title}
                    </Link>
                    {' - '}
                    {item.description}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                <Link
                  href="/barnsley-ai/business-types"
                  className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  View all business types →
                </Link>
              </p>
            </section>
          )}

          {page.category === 'businesses' && (
            <section className="prose max-w-2xl pt-6 dark:prose-invert">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                AI product integrations for Barnsley
              </h2>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                {featuredAiIntegrations.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/barnsley-ai/${item.slug}`}
                      className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      {item.title}
                    </Link>
                    {' - '}
                    {item.description}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                <Link
                  href="/barnsley-ai/integration-types"
                  className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  View all integration types →
                </Link>
              </p>
            </section>
          )}

          {page.faqs && page.faqs.length > 0 && (
            <section className="max-w-2xl pt-6">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Frequently asked questions
              </h2>
              <dl className="mt-4 space-y-3">
                {page.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-lg border border-zinc-100 dark:border-zinc-700/40"
                  >
                    <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-zinc-800 select-none hover:text-teal-700 dark:text-zinc-200 dark:hover:text-teal-400">
                      {faq.question}
                    </summary>
                    <dd className="px-4 pb-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {faq.answer}
                    </dd>
                  </details>
                ))}
              </dl>
            </section>
          )}
          <ContactCTA />
        </div>
      </SimpleLayout>
    </>
  )
}
