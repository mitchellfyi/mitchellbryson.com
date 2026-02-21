'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { QuizShell } from '@/components/tools/QuizShell'
import { useQuiz } from '@/hooks/useQuiz'

// ── Questions ───────────────────────────────────────

const QUESTIONS = [
  {
    question: 'How complex is what you need?',
    options: [
      {
        text: 'Simple CRUD — basic forms, lists, and data entry',
        weights: { build: 3, buy: 3, ai: 0 },
      },
      {
        text: 'Moderate logic — workflows, rules, integrations',
        weights: { build: 2, buy: 3, ai: 1 },
      },
      {
        text: 'Complex with AI — classification, extraction, generation',
        weights: { build: 1, buy: 1, ai: 3 },
      },
      {
        text: 'Highly custom — unique domain, proprietary algorithms',
        weights: { build: 3, buy: 0, ai: 2 },
      },
    ],
  },
  {
    question: 'What does your engineering team look like?',
    options: [
      {
        text: 'No developers — we rely on off-the-shelf tools',
        weights: { build: 0, buy: 3, ai: 1 },
      },
      {
        text: 'Small team of generalists',
        weights: { build: 1, buy: 2, ai: 2 },
      },
      {
        text: 'Mid-size team with specialists',
        weights: { build: 2, buy: 1, ai: 2 },
      },
      {
        text: 'Large team with AI/ML experience',
        weights: { build: 3, buy: 0, ai: 3 },
      },
    ],
  },
  {
    question: 'When do you need this?',
    options: [
      { text: 'ASAP — within weeks', weights: { build: 0, buy: 3, ai: 1 } },
      { text: '1-3 months', weights: { build: 1, buy: 2, ai: 2 } },
      { text: '3-6 months', weights: { build: 2, buy: 1, ai: 3 } },
      {
        text: '6+ months — we can invest time to get it right',
        weights: { build: 3, buy: 1, ai: 2 },
      },
    ],
  },
  {
    question: "What's your budget?",
    options: [
      { text: 'Under \u00a35k', weights: { build: 0, buy: 3, ai: 1 } },
      { text: '\u00a35-20k', weights: { build: 1, buy: 2, ai: 2 } },
      { text: '\u00a320-50k', weights: { build: 2, buy: 1, ai: 3 } },
      { text: '\u00a350k+', weights: { build: 3, buy: 1, ai: 2 } },
    ],
  },
  {
    question: 'How strategic is owning this?',
    options: [
      {
        text: 'Not strategic — a commodity tool we just need to work',
        weights: { build: 0, buy: 3, ai: 0 },
      },
      {
        text: 'Somewhat — nice to customise but not critical',
        weights: { build: 1, buy: 2, ai: 1 },
      },
      {
        text: 'Important — we need control over the roadmap',
        weights: { build: 2, buy: 1, ai: 2 },
      },
      {
        text: 'Critical differentiator — this is core to our product',
        weights: { build: 3, buy: 0, ai: 3 },
      },
    ],
  },
]

// ── Recommendation data ─────────────────────────────

const RECOMMENDATIONS = {
  build: {
    label: 'Build it yourself',
    summary:
      'Your needs are complex enough and strategic enough that building a custom solution gives you the most control and long-term value.',
    reasoning:
      'Building makes sense when you have the engineering capacity, the timeline allows for proper development, and the solution is a competitive advantage. You keep full control over the architecture, data, and roadmap. The trade-off is higher upfront cost and a longer time-to-market.',
    estimates: {
      cost: '\u00a320k-100k+',
      timeline: '3-9 months',
      maintenance: 'Ongoing internal team or retainer',
    },
    alsoConsider:
      'If speed matters more than control, consider buying an off-the-shelf tool and customising it later.',
  },
  buy: {
    label: 'Buy off-the-shelf',
    summary:
      'An existing product covers your needs well. Buying saves time and lets you focus your resources on your core business.',
    reasoning:
      'Buying is the fastest path to a working solution when your requirements match what existing tools offer. You benefit from ongoing vendor updates, support, and a community of users. The trade-off is less flexibility and potential vendor lock-in.',
    estimates: {
      cost: '\u00a3100-2,000/month',
      timeline: 'Days to weeks',
      maintenance: 'Vendor-managed with subscription',
    },
    alsoConsider:
      'If you find yourself outgrowing the tool or needing heavy customisation, a custom build may eventually be more cost-effective.',
  },
  ai: {
    label: 'Build with AI',
    summary:
      'Your problem is a strong fit for AI. An AI-powered solution — using LLMs, computer vision, or machine learning — can deliver capabilities that traditional software cannot.',
    reasoning:
      'AI is the right approach when your problem involves understanding language, classifying content, generating text, or processing unstructured data. Modern AI APIs and frameworks mean you can build powerful solutions without a full ML team. The trade-off is ongoing API costs and the need to manage model accuracy.',
    estimates: {
      cost: '\u00a310k-50k build + API costs',
      timeline: '4-12 weeks for PoC',
      maintenance: 'Model monitoring + API costs',
    },
    alsoConsider:
      'If your problem is well-defined and an existing SaaS already uses AI for it, buying may be faster than building your own AI layer.',
  },
}

// ── Suggested tools per recommendation ──────────────

const SUGGESTED_TOOLS = {
  build: [
    {
      name: 'Claude Code',
      description: 'AI-assisted coding for building custom solutions',
      href: '/uses/claude-code',
    },
    {
      name: 'Cursor',
      description: 'AI-powered IDE for codebase exploration and fast editing',
      href: '/uses/cursor',
    },
    {
      name: 'Supabase',
      description: 'Managed Postgres with auth, storage, and realtime built in',
      href: '/uses/supabase',
    },
  ],
  buy: [
    {
      name: 'n8n',
      description: 'Connect and automate SaaS tools without custom code',
      href: '/uses/n8n',
    },
    {
      name: 'Workflow automation',
      description: 'AI-powered automations that link existing tools together',
      href: '/barnsley-ai/workflow-automation',
    },
    {
      name: 'AI ROI Calculator',
      description: 'Estimate the return before committing to a purchase',
      href: '/projects/tools/ai-roi-calculator',
    },
  ],
  ai: [
    {
      name: 'Which AI Integration?',
      description: 'Find the right AI approach for your specific bottleneck',
      href: '/projects/tools/which-ai-integration',
    },
    {
      name: 'LLM Cost Calculator',
      description: 'Compare model costs before building your AI layer',
      href: '/projects/tools/llm-cost-calculator',
    },
    {
      name: 'RAG Architecture Decision Tree',
      description:
        'Choose the right vector DB, embeddings, and chunking strategy',
      href: '/projects/tools/rag-decision-tree',
    },
  ],
}

// ── Scoring helpers ─────────────────────────────────

function computeScores(answers) {
  const scores = { build: 0, buy: 0, ai: 0 }
  for (const [qIndex, optionIndex] of Object.entries(answers)) {
    const option = QUESTIONS[qIndex]?.options[optionIndex]
    if (!option) continue
    for (const [key, points] of Object.entries(option.weights)) {
      scores[key] += points
    }
  }
  return scores
}

function getWinner(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}

function getRunnerUp(scores, winner) {
  return Object.entries(scores)
    .filter(([key]) => key !== winner)
    .sort((a, b) => b[1] - a[1])[0][0]
}

// ── Sub-components ──────────────────────────────────

function QuizResults({ scores, answers, onRestart }) {
  const winner = getWinner(scores)
  const runnerUp = getRunnerUp(scores, winner)
  const primary = RECOMMENDATIONS[winner]
  const all = ['build', 'buy', 'ai']

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Primary recommendation */}
      <div className="rounded-2xl border-2 border-teal-500 bg-teal-50 p-6 dark:border-teal-400 dark:bg-teal-500/10">
        <p className="text-xs font-semibold tracking-wide text-teal-600 uppercase dark:text-teal-400">
          Our recommendation
        </p>
        <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {primary.label}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {primary.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {primary.reasoning}
        </p>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
        <table
          className="w-full text-sm"
          aria-label="Build vs Buy vs AI comparison"
        >
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th
                scope="col"
                className="p-4 text-left font-medium text-zinc-500 dark:text-zinc-400"
              />
              {all.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className={clsx(
                    'p-4 text-left font-semibold',
                    key === winner
                      ? 'text-teal-700 dark:text-teal-400'
                      : 'text-zinc-900 dark:text-zinc-100',
                  )}
                >
                  {RECOMMENDATIONS[key].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <th
                scope="row"
                className="p-4 text-left font-medium text-zinc-500 dark:text-zinc-400"
              >
                Cost
              </th>
              {all.map((key) => (
                <td key={key} className="p-4 text-zinc-700 dark:text-zinc-300">
                  {RECOMMENDATIONS[key].estimates.cost}
                </td>
              ))}
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <th
                scope="row"
                className="p-4 text-left font-medium text-zinc-500 dark:text-zinc-400"
              >
                Timeline
              </th>
              {all.map((key) => (
                <td key={key} className="p-4 text-zinc-700 dark:text-zinc-300">
                  {RECOMMENDATIONS[key].estimates.timeline}
                </td>
              ))}
            </tr>
            <tr>
              <th
                scope="row"
                className="p-4 text-left font-medium text-zinc-500 dark:text-zinc-400"
              >
                Maintenance
              </th>
              {all.map((key) => (
                <td key={key} className="p-4 text-zinc-700 dark:text-zinc-300">
                  {RECOMMENDATIONS[key].estimates.maintenance}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Also consider */}
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Also consider: {RECOMMENDATIONS[runnerUp].label}
        </h4>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {primary.alsoConsider}
        </p>
      </div>

      {/* Suggested tools */}
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Useful tools for this approach
        </h4>
        <div className="mt-3 space-y-3">
          {SUGGESTED_TOOLS[winner].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
            >
              <div className="min-w-0">
                <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {tool.name}
                </h5>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {tool.description}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-teal-600 dark:text-teal-400">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      <EmailReport
        toolName="Build vs Buy vs AI"
        reportEndpoint="/api/build-buy-report"
        reportData={{
          winner,
          primary: { label: primary.label, summary: primary.summary },
          allEstimates: Object.fromEntries(
            all.map((key) => [
              key,
              {
                label: RECOMMENDATIONS[key].label,
                estimates: RECOMMENDATIONS[key].estimates,
              },
            ]),
          ),
          suggestedTools: SUGGESTED_TOOLS[winner],
          scores,
          answers,
        }}
      />

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onRestart}>
          Start again
        </Button>
        <CopyLinkButton />
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────

export function BuildVsBuyVsAI() {
  return (
    <Suspense fallback={null}>
      <BuildVsBuyVsAIInner />
    </Suspense>
  )
}

function BuildVsBuyVsAIInner() {
  const quiz = useQuiz(QUESTIONS.length)

  if (quiz.showResults) {
    const scores = computeScores(quiz.answers)
    return (
      <QuizResults
        scores={scores}
        answers={quiz.answers}
        onRestart={quiz.handleRestart}
      />
    )
  }

  return (
    <QuizShell
      question={QUESTIONS[quiz.currentQuestion]}
      currentQuestion={quiz.currentQuestion}
      total={QUESTIONS.length}
      selectedOption={quiz.selectedOption}
      isLastQuestion={quiz.isLastQuestion}
      onSelect={quiz.handleSelect}
      onNext={quiz.handleNext}
      onBack={quiz.handleBack}
    />
  )
}
