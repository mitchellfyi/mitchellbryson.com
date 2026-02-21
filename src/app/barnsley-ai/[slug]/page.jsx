import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ContentParagraphs } from '@/components/ContentParagraphs'
import { IntegrationCard } from '@/components/IntegrationCard'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  aiIntegrations,
  allBarnsleyPages,
  businessTypes,
  getBarnsleyPage,
  getRandomItems,
} from '@/lib/barnsleyPages'
import { getOgImage, siteUrl } from '@/lib/siteConfig'

export async function generateStaticParams() {
  return allBarnsleyPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getBarnsleyPage(slug)
  if (!page) return {}

  const pageUrl = `${siteUrl}/barnsley-ai/${slug}`
  const metaDescription =
    page.description.length >= 140
      ? page.description
      : `${page.title} for Barnsley businesses. ${page.description}`

  return {
    title: `${page.title} Barnsley | AI Development`,
    description: metaDescription,
    keywords: [
      `${page.title} Barnsley`,
      'AI Barnsley',
      'AI South Yorkshire',
      page.category === 'ai' ? 'AI integration Barnsley' : 'AI consultant Barnsley',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${page.title} Barnsley | AI Software Engineer - Mitchell Bryson`,
      description: metaDescription,
      url: pageUrl,
      siteName: 'Mitchell Bryson',
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: getOgImage(`${page.title} Barnsley`, metaDescription),
          width: 1200,
          height: 630,
          alt: `${page.title} Barnsley - Mitchell Bryson`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} Barnsley | AI Development - Mitchell Bryson`,
      description: metaDescription,
    },
  }
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
    <SimpleLayout
      title={page.title}
      intro={page.description}
    >
      <div className="space-y-8">
        <ContentParagraphs content={page.content} />

        {page.integrations && (
          <section className="max-w-4xl">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Example AI integrations
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              AI services and tools I've integrated for Barnsley businesses include:
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

        {page.category === 'ai' && (
          <section className="prose dark:prose-invert max-w-2xl pt-6">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Types of Barnsley businesses I work with on AI
            </h2>
            <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
              {featuredBusinessTypes.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/barnsley-ai/${item.slug}`}
                    className="font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
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
                className="font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              >
                View all business types →
              </Link>
            </p>
          </section>
        )}

        {page.category === 'businesses' && (
          <section className="prose dark:prose-invert max-w-2xl pt-6">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              AI product integrations for Barnsley
            </h2>
            <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
              {featuredAiIntegrations.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/barnsley-ai/${item.slug}`}
                    className="font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
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
                className="font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              >
                View all integration types →
              </Link>
            </p>
          </section>
        )}
      </div>
    </SimpleLayout>
  )
}
