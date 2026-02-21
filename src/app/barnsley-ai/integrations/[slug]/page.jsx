import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ContentParagraphs } from '@/components/ContentParagraphs'
import { ExternalLinkIcon } from '@/components/Icons'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  getAllIntegrationSlugs,
  getAllIntegrationsWithPages,
  getContextForPage,
  getIntegrationBySlug,
} from '@/lib/barnsleyPages'
import { integrationContent } from '@/lib/integrationContent'
import { buildMetadata, getFaviconUrl, siteUrl } from '@/lib/siteConfig'

export async function generateStaticParams() {
  return getAllIntegrationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const integration = getIntegrationBySlug(slug)
  if (!integration) return {}

  return buildMetadata({
    title: `${integration.name} AI Integration Barnsley`,
    description: `${integration.name} - ${integration.description} AI integration for Barnsley businesses by Mitchell Bryson.`,
    url: `${siteUrl}/barnsley-ai/integrations/${slug}`,
  })
}

export default async function IntegrationPage({ params }) {
  const { slug } = await params
  const integration = getIntegrationBySlug(slug)

  if (!integration) {
    notFound()
  }

  const faviconUrl = getFaviconUrl(integration.url, integration.logoDomain)
  const content = integrationContent[slug]

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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'AI in Barnsley', url: `${siteUrl}/barnsley-ai` },
          { name: 'Integrations', url: `${siteUrl}/barnsley-ai/ai-integrations` },
          { name: integration.name, url: `${siteUrl}/barnsley-ai/integrations/${slug}` },
        ]}
      />
      <SimpleLayout
        title={
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
              <Image
                src={faviconUrl}
                alt={integration.name}
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
          </span>
          {integration.name}
        </span>
      }
      intro={integration.description}
    >
      <div className="space-y-10">
        <div>
          <Link
            href={integration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-600 transition hover:bg-teal-500/20 dark:text-teal-400"
          >
            Visit website
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {content && <ContentParagraphs content={content} />}

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
                      className="text-base font-semibold text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
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
            className="text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            ← Back to all integrations
          </Link>
        </div>
      </div>
    </SimpleLayout>
    </>
  )
}
