import Link from 'next/link'

import { IntegrationCard } from '@/components/IntegrationCard'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  aiIntegrations,
  businessTypes,
  getRandomIntegrations,
  getRandomItems,
} from '@/lib/barnsleyPages'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

const placeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Mitchell Bryson - AI Software Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barnsley',
    addressRegion: 'South Yorkshire',
    addressCountry: 'GB',
  },
  url: `${siteUrl}/barnsley-ai`,
  description:
    'AI Software Engineer based in Barnsley, South Yorkshire. AI chatbots, document processing, AI search, and workflow automation for Barnsley businesses.',
}

export const metadata = buildMetadata({
  title: 'AI Software Engineer Barnsley | AI Development South Yorkshire',
  description:
    'AI Software Engineer in Barnsley, South Yorkshire. AI chatbots, document processing, AI search, and workflow automation for manufacturing, retail, and professional services.',
  url: `${siteUrl}/barnsley-ai`,
  ogTitle: 'AI Software Engineer Barnsley | AI Development',
  keywords: [
    'AI Barnsley',
    'AI developer Barnsley',
    'AI software Barnsley',
    'artificial intelligence Barnsley',
    'AI consultant South Yorkshire',
    'AI chatbots Barnsley',
  ],
})

export default function BarnsleyPage() {
  const featuredIntegrations = getRandomIntegrations(3)
  const featuredAiTypes = getRandomItems(aiIntegrations, 3)
  const featuredBusinessTypes = getRandomItems(businessTypes, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <SimpleLayout
        title="AI Software Engineer in Barnsley"
        intro="I'm an AI developer based in Barnsley, South Yorkshire, and work with Barnsley businesses and across the UK to design and ship practical AI systems that cut manual work and improve margins."
      >
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="prose dark:prose-invert max-w-2xl space-y-12">
          <p className="text-zinc-600 dark:text-zinc-400">
            Whether you're a Barnsley-based business looking to automate
            workflows with AI, integrate AI into your product, or explore what's
            possible with modern AI tooling in Barnsley, I'd be happy to chat. Remote work
            is the norm, but I'm in the Barnsley area for in-person AI discussions when it
            helps.
          </p>

          <div className="rounded-lg border border-teal-200 bg-teal-50/50 px-8 dark:border-teal-800/50 dark:bg-teal-900/10">
            <p className="text-zinc-600 dark:text-zinc-400">
              Barnsley was named the UK's first government-backed{' '}
              <a
                href="https://www.bbc.com/news/articles/c8j3dvjld94o"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Tech Town
              </a>{' '}
              in February 2026, with plans to roll out AI across schools,
              businesses, and public services. Read more on{' '}
              <a
                href="https://www.gov.uk/government/news/barnsley-becomes-uks-first-government-backed-tech-town"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
              >
                GOV.UK
              </a>
              .
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
              AI product integrations and development
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              I help Barnsley businesses integrate AI into existing products or build new
              AI-powered features from scratch. Typical AI work includes:
            </p>
            <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {featuredAiTypes.map((item) => (
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

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
              Types of businesses I work with
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              I've worked across sectors and team sizes. Barnsley and South
              Yorkshire have a strong mix of traditional and digital businesses
              adopting AI - here's who I typically help with AI:
            </p>
            <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
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
          </div>

          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <div className="space-y-6">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Featured AI integrations
              </h2>
              <div className="space-y-4">
                {featuredIntegrations.map((integration) => (
                  <IntegrationCard
                    key={integration.url}
                    integration={integration}
                    pages={integration.pages}
                  />
                ))}
              </div>
              <Link
                href="/barnsley-ai/ai-integrations"
                className="block text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
              >
                View all integrations →
              </Link>
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
