import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import { aiIntegrations } from '@/lib/barnsleyPages'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

const metaDescription =
  'AI product integrations for Barnsley - AI chatbots, AI search, document processing, workflow automation, data pipelines, and custom AI product features.'

function getOgImage(title, description) {
  return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`
}

export const metadata = {
  title: 'Types of AI Integrations Barnsley | AI Development South Yorkshire',
  description: metaDescription,
  keywords: [
    'AI integrations Barnsley',
    'AI development Barnsley',
    'AI product features South Yorkshire',
    'AI chatbots Barnsley',
  ],
  alternates: {
    canonical: `${siteUrl}/barnsley-ai/integration-types`,
  },
  openGraph: {
    title: 'Types of AI Integrations Barnsley | AI Software Engineer - Mitchell Bryson',
    description: metaDescription,
    url: `${siteUrl}/barnsley-ai/integration-types`,
    siteName: 'Mitchell Bryson',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: getOgImage('Types of AI Integrations Barnsley', metaDescription),
        width: 1200,
        height: 630,
        alt: 'Types of AI Integrations Barnsley - Mitchell Bryson',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Types of AI Integrations Barnsley | AI Development - Mitchell Bryson',
    description: metaDescription,
  },
}

export default function BarnsleyIntegrationTypesPage() {
  return (
    <SimpleLayout
      title="Types of AI integrations"
      intro="I help Barnsley businesses integrate AI into existing products or build new AI-powered features from scratch. Each AI integration type links to a page with more detail and example AI tools."
    >
      <div className="max-w-4xl space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiIntegrations.map((item) => (
            <Link
              key={item.slug}
              href={`/barnsley-ai/${item.slug}`}
              className="group flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-teal-300 hover:bg-teal-50/30 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
            >
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
              <span className="mt-2 inline-flex items-center text-sm font-medium text-teal-500 transition group-hover:text-teal-600 dark:text-teal-400 dark:group-hover:text-teal-300">
                Read more
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
