'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { QuizShell } from '@/components/tools/QuizShell'
import { useQuiz } from '@/hooks/useQuiz'

// ── Tech metadata ───────────────────────────────────

const TECH = {
  framework: {
    nextjs: {
      name: 'Next.js',
      category: 'Framework',
      rationale: 'Full-stack React with SSR, API routes, and a huge ecosystem',
      docs: 'https://nextjs.org/docs',
    },
    django: {
      name: 'Django',
      category: 'Framework',
      rationale:
        'Batteries-included Python framework with ORM, admin, and auth built in',
      docs: 'https://docs.djangoproject.com',
    },
    rails: {
      name: 'Rails',
      category: 'Framework',
      rationale:
        'Rapid development with convention over configuration and mature tooling',
      docs: 'https://guides.rubyonrails.org',
    },
    fastapi: {
      name: 'FastAPI',
      category: 'Framework',
      rationale:
        'Modern Python API framework with automatic docs and async support',
      docs: 'https://fastapi.tiangolo.com',
    },
  },
  database: {
    postgresql: {
      name: 'PostgreSQL',
      category: 'Database',
      rationale:
        'Battle-tested relational database with excellent extension ecosystem',
      docs: 'https://www.postgresql.org/docs',
    },
    supabase: {
      name: 'Supabase',
      category: 'Database',
      rationale:
        'Managed Postgres with auth, real-time, and instant APIs built in',
      docs: 'https://supabase.com/docs',
      siteLink: '/uses/supabase',
    },
    mongodb: {
      name: 'MongoDB',
      category: 'Database',
      rationale:
        'Flexible document database ideal for rapidly evolving schemas',
      docs: 'https://www.mongodb.com/docs',
    },
    planetscale: {
      name: 'PlanetScale',
      category: 'Database',
      rationale:
        'Serverless MySQL with branching, zero-downtime schema changes',
      docs: 'https://planetscale.com/docs',
    },
  },
  hosting: {
    vercel: {
      name: 'Vercel',
      category: 'Hosting',
      rationale:
        'Zero-config deploys optimised for Next.js with edge functions',
      docs: 'https://vercel.com/docs',
      siteLink: '/uses/vercel',
    },
    railway: {
      name: 'Railway',
      category: 'Hosting',
      rationale:
        'Simple cloud platform that deploys anything from a Dockerfile or repo',
      docs: 'https://docs.railway.app',
    },
    aws: {
      name: 'AWS',
      category: 'Hosting',
      rationale:
        'Full cloud provider with maximum flexibility and enterprise-grade scale',
      docs: 'https://docs.aws.amazon.com',
    },
    render: {
      name: 'Render',
      category: 'Hosting',
      rationale:
        'Easy managed infrastructure with built-in SSL, auto-deploys, and free tier',
      docs: 'https://render.com/docs',
    },
  },
  cicd: {
    github: {
      name: 'GitHub Actions',
      category: 'CI/CD',
      rationale:
        'Integrated directly into GitHub with thousands of community actions',
      docs: 'https://docs.github.com/en/actions',
    },
    vercelci: {
      name: 'Vercel CI',
      category: 'CI/CD',
      rationale:
        'Automatic preview deploys and checks on every push — zero config',
      docs: 'https://vercel.com/docs/deployments/preview-deployments',
    },
    gitlab: {
      name: 'GitLab CI',
      category: 'CI/CD',
      rationale:
        'Powerful pipeline DSL with built-in container registry and runners',
      docs: 'https://docs.gitlab.com/ee/ci',
    },
  },
  aiLayer: {
    vercelai: {
      name: 'Vercel AI SDK',
      category: 'AI Layer',
      rationale: 'Streaming-first SDK for building AI-powered UIs with React',
      docs: 'https://sdk.vercel.ai/docs',
      siteLink: '/barnsley-ai/integrations/vercel-ai-sdk',
    },
    langchain: {
      name: 'LangChain',
      category: 'AI Layer',
      rationale:
        'Comprehensive framework for chaining LLM calls, tools, and retrieval',
      docs: 'https://js.langchain.com/docs',
      siteLink: '/barnsley-ai/integrations/langchain',
    },
    openaiapi: {
      name: 'OpenAI API',
      category: 'AI Layer',
      rationale:
        'Direct API access for maximum control with minimal abstraction',
      docs: 'https://platform.openai.com/docs',
      siteLink: '/barnsley-ai/integrations/openai',
    },
    none: {
      name: 'No AI layer needed',
      category: 'AI Layer',
      rationale: 'Your project does not require an AI component',
      docs: null,
    },
  },
}

const STACK_CATEGORIES = ['framework', 'database', 'hosting', 'cicd', 'aiLayer']

// ── Questions ───────────────────────────────────────

const QUESTIONS = [
  {
    question: 'What are you building?',
    options: [
      {
        text: 'Web app or SaaS product',
        weights: {
          framework: { nextjs: 3, django: 1, rails: 1, fastapi: 0 },
          database: { postgresql: 1, supabase: 3, mongodb: 1, planetscale: 2 },
          hosting: { vercel: 3, railway: 1, aws: 1, render: 1 },
          cicd: { github: 2, vercelci: 3, gitlab: 1 },
          aiLayer: { vercelai: 1, langchain: 0, openaiapi: 0, none: 2 },
        },
      },
      {
        text: 'API or backend service',
        weights: {
          framework: { nextjs: 0, django: 2, rails: 1, fastapi: 3 },
          database: { postgresql: 3, supabase: 1, mongodb: 2, planetscale: 1 },
          hosting: { vercel: 0, railway: 3, aws: 2, render: 2 },
          cicd: { github: 3, vercelci: 0, gitlab: 2 },
          aiLayer: { vercelai: 0, langchain: 1, openaiapi: 2, none: 2 },
        },
      },
      {
        text: 'Mobile app with a backend',
        weights: {
          framework: { nextjs: 1, django: 2, rails: 1, fastapi: 2 },
          database: { postgresql: 1, supabase: 3, mongodb: 2, planetscale: 1 },
          hosting: { vercel: 1, railway: 2, aws: 2, render: 2 },
          cicd: { github: 3, vercelci: 1, gitlab: 1 },
          aiLayer: { vercelai: 0, langchain: 1, openaiapi: 2, none: 2 },
        },
      },
      {
        text: 'AI-powered product',
        weights: {
          framework: { nextjs: 2, django: 1, rails: 0, fastapi: 3 },
          database: { postgresql: 2, supabase: 2, mongodb: 1, planetscale: 0 },
          hosting: { vercel: 2, railway: 2, aws: 2, render: 1 },
          cicd: { github: 3, vercelci: 1, gitlab: 1 },
          aiLayer: { vercelai: 3, langchain: 3, openaiapi: 2, none: 0 },
        },
      },
    ],
  },
  {
    question: 'How big will this get?',
    options: [
      {
        text: 'Under 1,000 users',
        weights: {
          framework: { nextjs: 2, django: 1, rails: 2, fastapi: 1 },
          database: { postgresql: 1, supabase: 3, mongodb: 1, planetscale: 1 },
          hosting: { vercel: 3, railway: 2, aws: 0, render: 2 },
          cicd: { github: 2, vercelci: 2, gitlab: 1 },
          aiLayer: { vercelai: 1, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
      {
        text: '1,000 to 10,000 users',
        weights: {
          framework: { nextjs: 2, django: 2, rails: 1, fastapi: 2 },
          database: { postgresql: 2, supabase: 2, mongodb: 2, planetscale: 2 },
          hosting: { vercel: 2, railway: 2, aws: 1, render: 2 },
          cicd: { github: 2, vercelci: 2, gitlab: 2 },
          aiLayer: { vercelai: 1, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
      {
        text: '10,000 to 100,000 users',
        weights: {
          framework: { nextjs: 2, django: 2, rails: 1, fastapi: 2 },
          database: { postgresql: 3, supabase: 1, mongodb: 2, planetscale: 2 },
          hosting: { vercel: 1, railway: 1, aws: 3, render: 1 },
          cicd: { github: 2, vercelci: 1, gitlab: 2 },
          aiLayer: { vercelai: 1, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
      {
        text: '100,000+ users',
        weights: {
          framework: { nextjs: 2, django: 2, rails: 0, fastapi: 2 },
          database: { postgresql: 3, supabase: 0, mongodb: 2, planetscale: 2 },
          hosting: { vercel: 1, railway: 0, aws: 3, render: 0 },
          cicd: { github: 2, vercelci: 1, gitlab: 2 },
          aiLayer: { vercelai: 1, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
    ],
  },
  {
    question: 'What does your team know best?',
    options: [
      {
        text: 'JavaScript / TypeScript',
        weights: {
          framework: { nextjs: 3, django: 0, rails: 0, fastapi: 0 },
          database: { postgresql: 1, supabase: 3, mongodb: 2, planetscale: 2 },
          hosting: { vercel: 3, railway: 1, aws: 1, render: 1 },
          cicd: { github: 2, vercelci: 3, gitlab: 1 },
          aiLayer: { vercelai: 3, langchain: 2, openaiapi: 2, none: 1 },
        },
      },
      {
        text: 'Python',
        weights: {
          framework: { nextjs: 0, django: 3, rails: 0, fastapi: 3 },
          database: { postgresql: 3, supabase: 1, mongodb: 2, planetscale: 1 },
          hosting: { vercel: 0, railway: 3, aws: 2, render: 2 },
          cicd: { github: 3, vercelci: 0, gitlab: 2 },
          aiLayer: { vercelai: 0, langchain: 3, openaiapi: 3, none: 1 },
        },
      },
      {
        text: 'Go or Rust',
        weights: {
          framework: { nextjs: 0, django: 0, rails: 0, fastapi: 1 },
          database: { postgresql: 3, supabase: 1, mongodb: 2, planetscale: 1 },
          hosting: { vercel: 0, railway: 2, aws: 3, render: 2 },
          cicd: { github: 3, vercelci: 0, gitlab: 2 },
          aiLayer: { vercelai: 0, langchain: 0, openaiapi: 2, none: 2 },
        },
      },
      {
        text: 'Flexible — we can learn',
        weights: {
          framework: { nextjs: 2, django: 1, rails: 1, fastapi: 1 },
          database: { postgresql: 2, supabase: 2, mongodb: 1, planetscale: 1 },
          hosting: { vercel: 2, railway: 2, aws: 1, render: 1 },
          cicd: { github: 2, vercelci: 1, gitlab: 1 },
          aiLayer: { vercelai: 1, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
    ],
  },
  {
    question: 'Does this need AI/ML?',
    options: [
      {
        text: 'No AI needed',
        weights: {
          framework: { nextjs: 1, django: 1, rails: 2, fastapi: 0 },
          database: { postgresql: 2, supabase: 2, mongodb: 1, planetscale: 2 },
          hosting: { vercel: 2, railway: 2, aws: 1, render: 2 },
          cicd: { github: 2, vercelci: 2, gitlab: 1 },
          aiLayer: { vercelai: 0, langchain: 0, openaiapi: 0, none: 3 },
        },
      },
      {
        text: 'Basic chatbot or text generation',
        weights: {
          framework: { nextjs: 2, django: 1, rails: 0, fastapi: 1 },
          database: { postgresql: 2, supabase: 2, mongodb: 1, planetscale: 1 },
          hosting: { vercel: 2, railway: 2, aws: 1, render: 1 },
          cicd: { github: 2, vercelci: 1, gitlab: 1 },
          aiLayer: { vercelai: 3, langchain: 1, openaiapi: 2, none: 0 },
        },
      },
      {
        text: 'Moderate — RAG, search, or document processing',
        weights: {
          framework: { nextjs: 1, django: 2, rails: 0, fastapi: 2 },
          database: { postgresql: 3, supabase: 1, mongodb: 1, planetscale: 0 },
          hosting: { vercel: 1, railway: 2, aws: 2, render: 1 },
          cicd: { github: 2, vercelci: 1, gitlab: 1 },
          aiLayer: { vercelai: 1, langchain: 3, openaiapi: 2, none: 0 },
        },
      },
      {
        text: 'Heavy — custom models, fine-tuning, pipelines',
        weights: {
          framework: { nextjs: 0, django: 2, rails: 0, fastapi: 3 },
          database: { postgresql: 3, supabase: 0, mongodb: 2, planetscale: 0 },
          hosting: { vercel: 0, railway: 1, aws: 3, render: 1 },
          cicd: { github: 2, vercelci: 0, gitlab: 2 },
          aiLayer: { vercelai: 0, langchain: 3, openaiapi: 2, none: 0 },
        },
      },
    ],
  },
  {
    question: 'Where do you want to host?',
    options: [
      {
        text: 'Serverless — auto-scaling, pay per use',
        weights: {
          framework: { nextjs: 3, django: 0, rails: 0, fastapi: 1 },
          database: { postgresql: 1, supabase: 3, mongodb: 1, planetscale: 3 },
          hosting: { vercel: 3, railway: 1, aws: 2, render: 1 },
          cicd: { github: 2, vercelci: 3, gitlab: 1 },
          aiLayer: { vercelai: 2, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
      {
        text: 'Cloud VMs — persistent servers we manage',
        weights: {
          framework: { nextjs: 1, django: 2, rails: 2, fastapi: 2 },
          database: { postgresql: 3, supabase: 1, mongodb: 2, planetscale: 1 },
          hosting: { vercel: 0, railway: 2, aws: 3, render: 2 },
          cicd: { github: 2, vercelci: 0, gitlab: 2 },
          aiLayer: { vercelai: 0, langchain: 2, openaiapi: 1, none: 1 },
        },
      },
      {
        text: 'On-premises — our own data centre',
        weights: {
          framework: { nextjs: 0, django: 2, rails: 1, fastapi: 2 },
          database: { postgresql: 3, supabase: 0, mongodb: 2, planetscale: 0 },
          hosting: { vercel: 0, railway: 0, aws: 1, render: 0 },
          cicd: { github: 1, vercelci: 0, gitlab: 3 },
          aiLayer: { vercelai: 0, langchain: 2, openaiapi: 1, none: 1 },
        },
      },
      {
        text: 'No preference — whatever works best',
        weights: {
          framework: { nextjs: 2, django: 1, rails: 1, fastapi: 1 },
          database: { postgresql: 2, supabase: 2, mongodb: 1, planetscale: 1 },
          hosting: { vercel: 2, railway: 2, aws: 1, render: 2 },
          cicd: { github: 2, vercelci: 2, gitlab: 1 },
          aiLayer: { vercelai: 1, langchain: 1, openaiapi: 1, none: 1 },
        },
      },
    ],
  },
]

// ── Scoring helpers ─────────────────────────────────

function emptyScores() {
  const scores = {}
  for (const cat of STACK_CATEGORIES) {
    scores[cat] = {}
    for (const id of Object.keys(TECH[cat])) {
      scores[cat][id] = 0
    }
  }
  return scores
}

function computeScores(answers) {
  const scores = emptyScores()
  for (const [qIndex, optionIndex] of Object.entries(answers)) {
    const option = QUESTIONS[qIndex]?.options[optionIndex]
    if (!option) continue
    for (const cat of STACK_CATEGORIES) {
      if (option.weights[cat]) {
        for (const [id, points] of Object.entries(option.weights[cat])) {
          if (scores[cat][id] !== undefined) {
            scores[cat][id] += points
          }
        }
      }
    }
  }
  return scores
}

function getWinners(scores) {
  const winners = {}
  for (const cat of STACK_CATEGORIES) {
    const entries = Object.entries(scores[cat])
    entries.sort((a, b) => b[1] - a[1])
    winners[cat] = entries[0][0]
  }
  return winners
}

// ── Sub-components ──────────────────────────────────

function StackDiagram({ results }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h4 className="mb-6 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Your stack at a glance
      </h4>
      <div className="flex flex-col items-center">
        {results.map((result, i) => (
          <div key={result.cat} className="flex flex-col items-center">
            <div
              className={clsx(
                'w-full max-w-[260px] rounded-xl border-2 px-5 py-3 text-center',
                i === 0
                  ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-500/10'
                  : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/50',
              )}
            >
              <p
                className={clsx(
                  'text-[10px] font-bold tracking-wider uppercase',
                  i === 0
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-zinc-400 dark:text-zinc-500',
                )}
              >
                {result.category}
              </p>
              <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {result.name}
              </p>
            </div>
            {i < results.length - 1 && (
              <div
                className="flex flex-col items-center py-0.5"
                aria-hidden="true"
              >
                <div className="h-3 w-0.5 bg-zinc-300 dark:bg-zinc-600" />
                <svg
                  className="h-2 w-3 text-zinc-300 dark:text-zinc-600"
                  viewBox="0 0 12 8"
                  fill="currentColor"
                >
                  <path d="M6 8L0 0h12z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function QuizResults({ scores, answers, onRestart }) {
  const winners = getWinners(scores)

  const results = STACK_CATEGORIES.map((cat) => ({
    cat,
    ...TECH[cat][winners[cat]],
  }))

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <StackDiagram results={results} />

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((result) => (
          <div
            key={result.cat}
            className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-700/40"
          >
            <p className="text-xs font-semibold tracking-wide text-teal-600 uppercase dark:text-teal-400">
              {result.category}
            </p>
            <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {result.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {result.rationale}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {result.siteLink && (
                <Link
                  href={result.siteLink}
                  className="text-sm font-medium text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  How I use it &rarr;
                </Link>
              )}
              {result.docs && (
                <a
                  href={result.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Docs &rarr;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <EmailReport
        toolName="Tech Stack Picker"
        reportEndpoint="/api/stack-report"
        reportData={{
          results: results.map((r) => ({
            category: r.category,
            name: r.name,
            rationale: r.rationale,
            docs: r.docs,
            siteLink: r.siteLink || null,
          })),
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

export function TechStackPicker() {
  return (
    <Suspense fallback={null}>
      <TechStackPickerInner />
    </Suspense>
  )
}

function TechStackPickerInner() {
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
