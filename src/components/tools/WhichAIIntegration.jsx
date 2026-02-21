'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { aiIntegrations } from '@/lib/barnsleyPages'

// ── Integration metadata ────────────────────────────

const INTEGRATION_META = Object.fromEntries(
  aiIntegrations.map((i) => [i.slug, { title: i.title, description: i.description }]),
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
    question: 'If AI could do one thing for your business tomorrow, what would it be?',
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

function encodeAnswers(answers) {
  return QUESTIONS.map((_, i) => answers[i] ?? 0).join('')
}

function decodeAnswers(str) {
  if (!str || str.length !== QUESTIONS.length) return null
  const answers = {}
  for (let i = 0; i < str.length; i++) {
    const v = parseInt(str[i], 10)
    if (isNaN(v) || v < 0 || v > 3) return null
    answers[i] = v
  }
  return answers
}

// ── Sub-components ──────────────────────────────────

function ProgressBar({ current, total }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Question {current + 1} of {total}
      </p>
      <div
        className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-1.5 rounded-full bg-teal-500 transition-all duration-300 dark:bg-teal-400"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  )
}

function OptionCard({ option, index, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(index)}
      className={clsx(
        'flex w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900',
        selected
          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20 dark:border-teal-400 dark:bg-teal-500/10 dark:ring-teal-400/20'
          : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50',
      )}
    >
      <span
        className={clsx(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition',
          selected
            ? 'border-teal-500 bg-teal-500 dark:border-teal-400 dark:bg-teal-400'
            : 'border-zinc-300 dark:border-zinc-600',
        )}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <span
        className={clsx(
          'text-sm',
          selected
            ? 'font-medium text-teal-900 dark:text-teal-100'
            : 'text-zinc-700 dark:text-zinc-300',
        )}
      >
        {option.text}
      </span>
    </button>
  )
}

function QuizResults({ scores, answers, onRestart }) {
  const ranked = getRankedResults(scores)
  const primary = ranked[0]
  const alsoExplore = ranked.slice(1)

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Primary recommendation */}
      <div className="rounded-2xl border-2 border-teal-500 bg-teal-50 p-6 dark:border-teal-400 dark:bg-teal-500/10">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
          Recommended for your business
        </p>
        <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {primary.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {primary.description}
        </p>
        <div className="mt-4">
          <Button href={`/barnsley-ai/${primary.slug}`}>
            Learn more
          </Button>
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  // Load from permalink on mount
  useEffect(() => {
    const r = searchParams.get('r')
    if (r) {
      const decoded = decodeAnswers(r)
      if (decoded) {
        setAnswers(decoded)
        setShowResults(true)
      }
    }
  }, [searchParams])

  // Update URL when results are shown
  useEffect(() => {
    if (showResults && Object.keys(answers).length === QUESTIONS.length) {
      const url = new URL(window.location.pathname, window.location.origin)
      url.searchParams.set('r', encodeAnswers(answers))
      window.history.replaceState(null, '', url.toString())
    }
  }, [showResults, answers])

  const question = QUESTIONS[currentQuestion]
  const selectedOption = answers[currentQuestion]
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1

  function handleSelect(optionIndex) {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }))
    setTimeout(() => {
      if (currentQuestion === QUESTIONS.length - 1) {
        setShowResults(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
      }
    }, 300)
  }

  function handleNext() {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  function handleBack() {
    setCurrentQuestion((prev) => prev - 1)
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    router.replace(window.location.pathname, { scroll: false })
  }

  if (showResults) {
    const scores = computeScores(answers)
    return <QuizResults scores={scores} answers={answers} onRestart={handleRestart} />
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <ProgressBar current={currentQuestion} total={QUESTIONS.length} />

        <fieldset className="mt-6">
          <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {question.question}
          </legend>

          <div className="mt-4 space-y-3" role="radiogroup">
            {question.options.map((option, i) => (
              <OptionCard
                key={i}
                option={option}
                index={i}
                selected={selectedOption === i}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between">
          {currentQuestion > 0 ? (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={handleNext} disabled={selectedOption === undefined}>
            {isLastQuestion ? 'See your results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}
