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
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

// ── Relevant tools per page slug ────────────────────

const RELEVANT_TOOLS = {
  // AI integration types
  'chatbots-and-conversational-ai': [
    { slug: 'which-ai-integration', reason: 'Find the best AI integration for your business' },
    { slug: 'ai-readiness-score', reason: 'Check if your business is ready for a chatbot' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of automating customer support' },
  ],
  'search-and-retrieval': [
    { slug: 'rag-decision-tree', reason: 'Choose the right vector DB, embeddings, and chunking strategy' },
    { slug: 'llm-cost-calculator', reason: 'Compare model costs for your search pipeline' },
    { slug: 'tech-stack-picker', reason: 'Get a full stack recommendation for your AI search product' },
  ],
  'document-processing': [
    { slug: 'which-ai-integration', reason: 'Find the best AI approach for your documents' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a proof of concept for document automation' },
    { slug: 'ai-roi-calculator', reason: 'Calculate the savings from automating document processing' },
  ],
  'workflow-automation': [
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build, buy, or automate with AI' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of automating this workflow' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for your workflows' },
  ],
  'data-pipelines-and-analytics': [
    { slug: 'rag-decision-tree', reason: 'Choose the right architecture for your data pipeline' },
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your analytics platform' },
    { slug: 'llm-cost-calculator', reason: 'Estimate ongoing API costs for AI-powered analytics' },
  ],
  'custom-product-features': [
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build, buy, or use AI for your feature' },
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your AI product' },
    { slug: 'llm-cost-calculator', reason: 'Compare model costs for your product feature' },
  ],
  'computer-vision-and-image-ai': [
    { slug: 'ai-poc-scope-template', reason: 'Scope a proof of concept for computer vision' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build or buy your vision solution' },
    { slug: 'ai-readiness-score', reason: 'Check if your data and team are ready for computer vision' },
  ],
  'voice-and-speech-ai': [
    { slug: 'which-ai-integration', reason: 'Find the right AI approach for voice and speech' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a proof of concept for voice AI' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of automating voice workflows' },
  ],
  'predictive-analytics-and-forecasting': [
    { slug: 'ai-readiness-score', reason: 'Check if your data is ready for predictive analytics' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a forecasting proof of concept' },
    { slug: 'tech-stack-picker', reason: 'Get a recommended stack for your ML pipeline' },
  ],
  // Business types
  'manufacturing-and-engineering': [
    { slug: 'ai-readiness-score', reason: 'Assess your factory or workshop\'s readiness for AI' },
    { slug: 'ai-roi-calculator', reason: 'Calculate savings from automating manual processes' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for manufacturing' },
  ],
  'professional-services': [
    { slug: 'ai-roi-calculator', reason: 'Estimate the value of automating billable admin work' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for your practice' },
    { slug: 'ai-readiness-score', reason: 'Check if your firm is ready for AI' },
  ],
  'e-commerce-and-retail': [
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for your shop or store' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of AI-powered customer service' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build or buy your e-commerce AI' },
  ],
  'b2b-saas-and-tech': [
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your SaaS product' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build, buy, or automate with AI' },
    { slug: 'llm-cost-calculator', reason: 'Compare model costs for your AI features' },
  ],
  'startups-and-scale-ups': [
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your startup' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide the fastest path to your MVP' },
    { slug: 'ai-poc-scope-template', reason: 'Scope your first AI proof of concept' },
  ],
  'agencies-and-service-providers': [
    { slug: 'ai-roi-calculator', reason: 'Estimate the value of automating client delivery' },
    { slug: 'which-ai-integration', reason: 'Find AI tools to offer as part of your services' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build or resell AI solutions' },
  ],
  'healthcare-and-life-sciences': [
    { slug: 'ai-readiness-score', reason: 'Assess your organisation\'s readiness for healthcare AI' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a compliant AI proof of concept' },
    { slug: 'ai-roi-calculator', reason: 'Estimate savings from automating clinical admin' },
  ],
  'logistics-and-supply-chain': [
    { slug: 'ai-readiness-score', reason: 'Check if your operations are ready for AI' },
    { slug: 'ai-roi-calculator', reason: 'Calculate the ROI of automating logistics workflows' },
    { slug: 'which-ai-integration', reason: 'Find the right AI approach for supply chain' },
  ],
  'education-and-training': [
    { slug: 'ai-readiness-score', reason: 'Assess your institution\'s readiness for AI' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for education' },
    { slug: 'ai-poc-scope-template', reason: 'Scope an AI pilot for your learning platform' },
  ],
}

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
      page.category === 'ai' ? 'AI integration Barnsley' : 'AI consultant Barnsley',
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
          <section className="prose dark:prose-invert max-w-2xl pt-6">
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
          <section className="prose dark:prose-invert max-w-2xl pt-6">
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
