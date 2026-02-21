'use client'

import { Suspense, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { QuizShell } from '@/components/tools/QuizShell'
import { useQuiz } from '@/hooks/useQuiz'
import { aiIntegrations } from '@/lib/barnsleyPages'

// ── Integration metadata ────────────────────────────

const INTEGRATION_META = Object.fromEntries(
  aiIntegrations.map((i) => [
    i.slug,
    { title: i.title, description: i.description },
  ]),
)

const ALL_SLUGS = aiIntegrations.map((i) => i.slug)

function emptyScores() {
  return Object.fromEntries(ALL_SLUGS.map((s) => [s, 0]))
}

// ── Questions ───────────────────────────────────────

const QUESTIONS = [
  {
    question: "What's your biggest day-to-day bottleneck?",
    options: [
      {
        text: 'Answering the same customer questions over and over',
        weights: [{ slug: 'chatbots-and-conversational-ai', points: 3 }],
      },
      {
        text: 'Manually entering data from documents, forms, or emails',
        weights: [{ slug: 'document-processing', points: 3 }],
      },
      {
        text: 'Repetitive admin tasks that follow the same steps every time',
        weights: [{ slug: 'workflow-automation', points: 3 }],
      },
      {
        text: 'Finding the right information buried in files or systems',
        weights: [{ slug: 'search-and-retrieval', points: 3 }],
      },
    ],
  },
  {
    question: 'What kind of data does your business work with most?',
    options: [
      {
        text: 'Customer conversations — emails, chats, phone calls',
        weights: [
          { slug: 'chatbots-and-conversational-ai', points: 2 },
          { slug: 'voice-and-speech-ai', points: 2 },
        ],
      },
      {
        text: 'Documents — invoices, contracts, forms, reports',
        weights: [
          { slug: 'document-processing', points: 2 },
          { slug: 'search-and-retrieval', points: 1 },
        ],
      },
      {
        text: 'Numbers — sales figures, forecasts, stock levels, KPIs',
        weights: [
          { slug: 'data-pipelines-and-analytics', points: 2 },
          { slug: 'predictive-analytics-and-forecasting', points: 2 },
        ],
      },
      {
        text: 'Images or video — product photos, inspections, CCTV',
        weights: [{ slug: 'computer-vision-and-image-ai', points: 3 }],
      },
    ],
  },
  {
    question: 'Who would benefit most from AI in your business?',
    options: [
      {
        text: 'Customers — faster responses, better self-service',
        weights: [
          { slug: 'chatbots-and-conversational-ai', points: 2 },
          { slug: 'custom-product-features', points: 1 },
        ],
      },
      {
        text: 'Admin and operations — less manual work, fewer errors',
        weights: [
          { slug: 'workflow-automation', points: 2 },
          { slug: 'document-processing', points: 1 },
        ],
      },
      {
        text: 'Management — better insights and decision-making',
        weights: [
          { slug: 'data-pipelines-and-analytics', points: 2 },
          { slug: 'predictive-analytics-and-forecasting', points: 2 },
        ],
      },
      {
        text: 'Your product or service — a smarter offering for clients',
        weights: [{ slug: 'custom-product-features', points: 3 }],
      },
    ],
  },
  {
    question: 'What does your current technology setup look like?',
    options: [
      {
        text: 'Basic — email, phone, maybe a simple website',
        weights: [
          { slug: 'chatbots-and-conversational-ai', points: 1 },
          { slug: 'voice-and-speech-ai', points: 1 },
        ],
      },
      {
        text: 'Some cloud tools — Xero, Mailchimp, Google Workspace — but not connected',
        weights: [
          { slug: 'workflow-automation', points: 1 },
          { slug: 'document-processing', points: 1 },
        ],
      },
      {
        text: 'Several connected cloud tools with some automations already',
        weights: [
          { slug: 'data-pipelines-and-analytics', points: 1 },
          { slug: 'search-and-retrieval', points: 1 },
          { slug: 'workflow-automation', points: 1 },
        ],
      },
      {
        text: 'Integrated stack with APIs, custom software, or developer support',
        weights: [
          { slug: 'custom-product-features', points: 2 },
          { slug: 'predictive-analytics-and-forecasting', points: 1 },
          { slug: 'data-pipelines-and-analytics', points: 1 },
        ],
      },
    ],
  },
  {
    question:
      'If AI could do one thing for your business tomorrow, what would it be?',
    options: [
      {
        text: 'Handle customer enquiries without my team having to respond to each one',
        weights: [{ slug: 'chatbots-and-conversational-ai', points: 3 }],
      },
      {
        text: 'Read and extract data from paperwork automatically',
        weights: [{ slug: 'document-processing', points: 3 }],
      },
      {
        text: 'Predict demand, spot trends, or flag risks before they happen',
        weights: [{ slug: 'predictive-analytics-and-forecasting', points: 3 }],
      },
      {
        text: 'Automate a manual workflow end-to-end',
        weights: [
          { slug: 'workflow-automation', points: 2 },
          { slug: 'data-pipelines-and-analytics', points: 1 },
        ],
      },
    ],
  },
]

// ── Scoring helpers ─────────────────────────────────

function computeScores(answers) {
  const scores = emptyScores()
  for (const [qIndex, optionIndex] of Object.entries(answers)) {
    const option = QUESTIONS[qIndex]?.options[optionIndex]
    if (!option) continue
    for (const { slug, points } of option.weights) {
      scores[slug] += points
    }
  }
  return scores
}

function getRankedResults(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slug, score]) => ({ slug, score, ...INTEGRATION_META[slug] }))
}

// ── Sub-components ──────────────────────────────────

function QuizResults({ scores, answers, onRestart }) {
  const resultsRef = useRef(null)
  useEffect(() => {
    resultsRef.current?.focus()
  }, [])

  const ranked = getRankedResults(scores)
  const primary = ranked[0]
  const alsoExplore = ranked.slice(1)

  return (
    <div
      ref={resultsRef}
      tabIndex={-1}
      aria-label="Quiz results"
      className="mx-auto max-w-2xl space-y-8"
    >
      {/* Primary recommendation */}
      <div className="rounded-2xl border-2 border-teal-500 bg-teal-50 p-6 dark:border-teal-400 dark:bg-teal-500/10">
        <p className="text-xs font-semibold tracking-wide text-teal-600 uppercase dark:text-teal-400">
          Recommended for your business
        </p>
        <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {primary.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {primary.description}
        </p>
        <div className="mt-4">
          <Button href={`/barnsley-ai/${primary.slug}`}>Learn more</Button>
        </div>
      </div>

      {/* Also worth exploring */}
      {alsoExplore.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Also worth exploring
          </h4>
          <div className="mt-3 space-y-3">
            {alsoExplore.map((result) => (
              <div
                key={result.slug}
                className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
              >
                <div className="min-w-0">
                  <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {result.title}
                  </h5>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {result.description}
                  </p>
                </div>
                <Link
                  href={`/barnsley-ai/${result.slug}`}
                  className="shrink-0 text-sm font-medium text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <EmailReport
        toolName="Which AI Integration?"
        reportEndpoint="/api/integration-report"
        reportData={{
          recommended: primary,
          alsoExplore,
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

export function WhichAIIntegration() {
  return (
    <Suspense fallback={null}>
      <WhichAIIntegrationInner />
    </Suspense>
  )
}

function WhichAIIntegrationInner() {
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
