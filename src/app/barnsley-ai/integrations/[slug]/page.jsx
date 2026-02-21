import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SimpleLayout } from '@/components/SimpleLayout'
import {
  allBarnsleyPages,
  getAllIntegrationSlugs,
  getAllIntegrationsWithPages,
  getIntegrationBySlug,
} from '@/lib/barnsleyPages'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

export async function generateStaticParams() {
  return getAllIntegrationSlugs().map((slug) => ({ slug }))
}

function getOgImage(title, description) {
  return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const integration = getIntegrationBySlug(slug)
  if (!integration) return {}

  const pageUrl = `${siteUrl}/barnsley-ai/integrations/${slug}`
  const metaTitle = `${integration.name} AI Integration Barnsley`
  const metaDescription = `${integration.name} - ${integration.description} AI integration for Barnsley businesses by Mitchell Bryson.`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${metaTitle} - Mitchell Bryson`,
      description: metaDescription,
      url: pageUrl,
      siteName: 'Mitchell Bryson',
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: getOgImage(integration.name, metaDescription),
          width: 1200,
          height: 630,
          alt: `${integration.name} - Mitchell Bryson`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metaTitle} - Mitchell Bryson`,
      description: metaDescription,
    },
  }
}

function getFaviconUrl(url, logoDomain) {
  const domain = logoDomain || new URL(url).hostname.replace(/^www\./, '')
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

export default async function IntegrationPage({ params }) {
  const { slug } = await params
  const integration = getIntegrationBySlug(slug)

  if (!integration) {
    notFound()
  }

  const faviconUrl = getFaviconUrl(integration.url, integration.logoDomain)

  const allIntegrations = getAllIntegrationsWithPages()
  const siblingIntegrations = allIntegrations.filter(
    (i) =>
      i.slug !== integration.slug &&
      i.pages?.some((p) =>
        integration.pages?.some((ip) => ip.slug === p.slug),
      ),
  )
  const related = siblingIntegrations.slice(0, 6)

  return (
    <SimpleLayout
      title={integration.name}
      intro={integration.description}
    >
      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
            <Image
              src={faviconUrl}
              alt=""
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={integration.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-600 transition hover:bg-teal-500/20 dark:text-teal-400"
            >
              Visit website
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {integration.pages && integration.pages.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              How I use {integration.name} for Barnsley businesses
            </h2>
            <div className="mt-4 space-y-4">
              {integration.pages.map((page) => {
                const contextForPage = getContextForPage(
                  integration.name,
                  page.slug,
                )
                return (
                  <div
                    key={page.slug}
                    className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700"
                  >
                    <Link
                      href={`/barnsley-ai/${page.slug}`}
                      className="text-base font-semibold text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      {page.title}
                    </Link>
                    {contextForPage && (
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {contextForPage}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Related integrations
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/barnsley-ai/integrations/${rel.slug}`}
                  className="group rounded-xl border border-zinc-200 p-4 transition hover:border-teal-300 hover:bg-teal-50/30 dark:border-zinc-700 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
                >
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {rel.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
          <Link
            href="/barnsley-ai/ai-integrations"
            className="text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
          >
            ← Back to all integrations
          </Link>
        </div>
      </div>
    </SimpleLayout>
  )
}

/** Find the contextSentence for a specific integration on a specific page */
function getContextForPage(integrationName, pageSlug) {
  const page = allBarnsleyPages.find((p) => p.slug === pageSlug)
  if (!page?.integrations) return null
  const match = page.integrations.find((i) => i.name === integrationName)
  return match?.contextSentence || null
}
