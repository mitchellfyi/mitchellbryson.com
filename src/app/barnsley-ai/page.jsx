import Link from 'next/link'

import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { IntegrationCard } from '@/components/IntegrationCard'
import { NeuralNetworkBg } from '@/components/NeuralNetworkBg'
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from '@/components/JsonLd'
import { getToolIcon, getToolColor } from '@/components/ProjectIcons'
import {
  aiIntegrations,
  businessTypes,
  getRandomIntegrations,
  getRandomItems,
} from '@/lib/barnsleyPages'
import { projectTools } from '@/lib/projectTools'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'AI Software Engineer Barnsley | AI Development South Yorkshire',
  description:
    'AI Software Engineer in Barnsley, South Yorkshire. AI chatbots, document processing, AI search, and workflow automation for local businesses.',
  url: `${siteUrl}/barnsley-ai`,
  ogTitle: 'AI Software Engineer Barnsley | AI Development',
  keywords: [
    'AI Barnsley',
    'AI developer Barnsley',
    'AI software Barnsley',
    'artificial intelligence Barnsley',
    'AI consultant South Yorkshire',
    'AI chatbots Barnsley',
    'AI developer Sheffield',
    'AI developer Wakefield',
    'AI developer Rotherham',
    'AI developer Doncaster',
    'AI developer Huddersfield',
    'AI developer Leeds',
  ],
})

export default function BarnsleyPage() {
  const featuredIntegrations = getRandomIntegrations(3)
  const featuredAiTypes = getRandomItems(aiIntegrations, 3)
  const featuredBusinessTypes = getRandomItems(businessTypes, 3)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          {
            name: 'AI Software Engineer Barnsley',
            url: `${siteUrl}/barnsley-ai`,
          },
        ]}
      />
      <LocalBusinessJsonLd />
      <Container className="-mt-16 pt-16 sm:-mt-32 sm:pt-32">
        <div className="relative -mx-4 px-4 py-24 sm:-mx-8 sm:px-8 sm:py-32">
          <NeuralNetworkBg />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white dark:from-zinc-900" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-zinc-900" />
          <header className="relative max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              AI Software Engineer in Barnsley
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I&apos;m a full-stack AI Software Engineer based in Barnsley,
              South Yorkshire, and work with Barnsley businesses and across the
              UK to design and ship practical AI systems that cut manual work
              and improve margins.
            </p>
          </header>
        </div>
        <div className="mt-6 sm:mt-8">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="prose max-w-2xl space-y-12 dark:prose-invert">
              <p className="text-zinc-600 dark:text-zinc-400">
                Whether you&apos;re a Barnsley-based business looking to
                automate workflows with AI, integrate AI into your product, or
                explore what&apos;s possible with modern AI tooling in Barnsley,
                I&apos;d be happy to chat. Remote work is the norm, but I&apos;m
                in the Barnsley area for in-person AI discussions when it helps.
              </p>

              <div className="rounded-lg border border-teal-200 bg-teal-50/50 px-8 dark:border-teal-800/50 dark:bg-teal-900/10">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Barnsley was named the UK&apos;s first government-backed{' '}
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
                  I help Barnsley businesses integrate AI into existing products
                  or build new AI-powered features from scratch. Typical AI work
                  includes:
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
                  I&apos;ve worked across sectors and team sizes. Barnsley and
                  South Yorkshire have a strong mix of traditional and digital
                  businesses adopting AI - here&apos;s who I typically help with
                  AI:
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

              <section>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  Areas I serve across South Yorkshire
                </h2>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Based in Barnsley, I work with businesses across South
                  Yorkshire and the wider region. Whether you need on-site
                  collaboration or remote support, I&apos;m set up for both.
                </p>
                <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>
                    <strong>Sheffield</strong> — advanced manufacturing, health
                    tech, and university spin-outs adopting AI
                  </li>
                  <li>
                    <strong>Wakefield</strong> — logistics, distribution, and
                    retail businesses streamlining operations with AI
                  </li>
                  <li>
                    <strong>Rotherham</strong> — engineering, construction, and
                    supply chain firms using AI to cut costs
                  </li>
                  <li>
                    <strong>Doncaster</strong> — transport, warehousing, and
                    e-commerce companies automating workflows
                  </li>
                  <li>
                    <strong>Huddersfield</strong> — textiles, precision
                    engineering, and professional services exploring AI
                  </li>
                  <li>
                    <strong>Leeds</strong> — fintech, legal tech, and digital
                    agencies integrating AI into products
                  </li>
                </ul>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  I also work remotely with businesses across the UK. Get in
                  touch to discuss your project wherever you&apos;re based.
                </p>
              </section>

              <p className="text-zinc-600 dark:text-zinc-400">
                Have questions about working with an AI consultant?{' '}
                <Link
                  href="/barnsley-ai/faq"
                  className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Read the FAQ →
                </Link>
              </p>
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

              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Free AI tools
                </h2>
                <ul className="space-y-2">
                  {projectTools.map((tool) => {
                    const ToolIcon = getToolIcon(tool.slug)
                    const toolColor = getToolColor(tool.slug)
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={`/projects/tools/${tool.slug}`}
                          className="group flex items-center gap-3 rounded-lg border border-zinc-100 px-3 py-2.5 transition hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                            <ToolIcon className={`h-4 w-4 ${toolColor}`} />
                          </span>
                          <span className="text-sm font-medium text-zinc-700 transition group-hover:text-teal-700 dark:text-zinc-300 dark:group-hover:text-teal-400">
                            {tool.name}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <Link
                  href="/projects/tools"
                  className="block text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  View all tools →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <ContactCTA />
          </div>
        </div>
      </Container>
    </>
  )
}
