import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getToolIcon, getToolColor } from '@/components/ProjectIcons'
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { getAllProjectToolSlugs, getProjectTool } from '@/lib/projectTools'
import { AIReadinessScore } from '@/components/tools/AIReadinessScore'
import { AIROICalculator } from '@/components/tools/AIROICalculator'
import { WhichAIIntegration } from '@/components/tools/WhichAIIntegration'
import { LLMCostCalculator } from '@/components/tools/LLMCostCalculator'
import { RAGDecisionTree } from '@/components/tools/RAGDecisionTree'
import { AIPocScopeTemplate } from '@/components/tools/AIPocScopeTemplate'
import { BuildVsBuyVsAI } from '@/components/tools/BuildVsBuyVsAI'
import { TechStackPicker } from '@/components/tools/TechStackPicker'
import { ContactCTA } from '@/components/ContactCTA'

export async function generateStaticParams() {
  return getAllProjectToolSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = getProjectTool(slug)
  if (!tool) return {}

  return buildMetadata({
    title: tool.name,
    description: tool.description,
    url: `${siteUrl}/projects/tools/${slug}`,
  })
}

export default async function ProjectToolPage({ params }) {
  const { slug } = await params
  const tool = getProjectTool(slug)

  if (!tool) {
    notFound()
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Projects', url: `${siteUrl}/projects` },
          { name: 'Tools', url: `${siteUrl}/projects/tools` },
          { name: tool.name, url: `${siteUrl}/projects/tools/${slug}` },
        ]}
      />
      <SoftwareApplicationJsonLd
        name={tool.name}
        description={tool.description}
        url={`${siteUrl}/projects/tools/${slug}`}
      />
      <SimpleLayout
        title={
          <span className="flex items-start gap-4">
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {(() => {
                const ToolIcon = getToolIcon(slug)
                const toolColor = getToolColor(slug)
                return <ToolIcon className={`h-6 w-6 ${toolColor}`} />
              })()}
            </span>
            {tool.name}
          </span>
        }
        intro={
          <>
            <Link
              href="/projects/tools"
              className="mb-4 inline-block text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              &larr; Back to all tools
            </Link>
            <br />
            {tool.description}
          </>
        }
      >
        <div className="space-y-10">
          <div className="max-w-2xl space-y-4 text-base text-zinc-600 dark:text-zinc-400">
            <p>{tool.longDescription}</p>
          </div>

          {slug === 'ai-roi-calculator' ? (
            <AIROICalculator />
          ) : slug === 'ai-readiness-score' ? (
            <AIReadinessScore />
          ) : slug === 'which-ai-integration' ? (
            <WhichAIIntegration />
          ) : slug === 'llm-cost-calculator' ? (
            <LLMCostCalculator />
          ) : slug === 'rag-decision-tree' ? (
            <RAGDecisionTree />
          ) : slug === 'ai-poc-scope-template' ? (
            <AIPocScopeTemplate />
          ) : slug === 'build-vs-buy-vs-ai' ? (
            <BuildVsBuyVsAI />
          ) : slug === 'tech-stack-picker' ? (
            <TechStackPicker />
          ) : (
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 dark:border-teal-500/20 dark:bg-teal-500/5">
              <p className="text-sm font-medium text-teal-800 dark:text-teal-400">
                Want to be notified when this tool launches?{' '}
                <Link
                  href="/contact"
                  className="underline transition hover:text-teal-900 dark:hover:text-teal-300"
                >
                  Get in touch
                </Link>
                .
              </p>
            </div>
          )}

          <ContactCTA />

          <div className="flex items-center gap-6">
            <Link
              href="/projects/tools"
              className="text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              &larr; Back to all tools
            </Link>
            <Link
              href="/barnsley-ai"
              className="text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              AI for Barnsley businesses &rarr;
            </Link>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
