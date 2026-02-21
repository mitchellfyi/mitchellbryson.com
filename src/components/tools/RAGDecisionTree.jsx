'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'

// ── Recommendation metadata ─────────────────────────

const RECOMMENDATIONS = {
  vectorDb: {
    pinecone: { name: 'Pinecone', description: 'Fully managed vector database with enterprise-grade scalability', rationale: 'Best for teams that want zero infrastructure management with reliable performance at scale.' },
    weaviate: { name: 'Weaviate', description: 'Open-source vector database with built-in hybrid search', rationale: 'Great when you need both vector and keyword search in one system, with the option to self-host.' },
    qdrant: { name: 'Qdrant', description: 'High-performance open-source vector search engine', rationale: 'Ideal for teams that want fast, efficient vector search with full control over deployment.' },
    pgvector: { name: 'pgvector', description: 'Vector search extension for PostgreSQL', rationale: 'Perfect when you already use Postgres and want to avoid adding another database to your stack.' },
    chroma: { name: 'Chroma', description: 'Lightweight embedding database for prototyping and small-scale apps', rationale: 'Best for rapid prototyping and smaller datasets where simplicity matters more than scale.' },
  },
  embedding: {
    openai: { name: 'OpenAI text-embedding-3-small', description: 'High-quality embeddings via API with excellent cost/performance ratio', rationale: 'Best general-purpose embedding model — easy to integrate, strong accuracy, reasonable cost.' },
    cohere: { name: 'Cohere Embed v3', description: 'Multilingual embedding model with compression support', rationale: 'Strong choice for multilingual content or when you need smaller embedding dimensions.' },
    selfhosted: { name: 'Self-hosted (BGE/E5)', description: 'Open-source models you run on your own infrastructure', rationale: 'Best when data privacy is critical or you want to eliminate per-request API costs.' },
  },
  chunking: {
    fixed: { name: 'Fixed-size chunking', description: 'Split text into equal-sized chunks by character or token count', rationale: 'Simplest approach — works well for uniform content like articles or documentation.' },
    recursive: { name: 'Recursive chunking', description: 'Split by paragraphs, then sentences, then characters as needed', rationale: 'Good default for most text content — preserves natural boundaries while controlling size.' },
    semantic: { name: 'Semantic chunking', description: 'Group text by meaning using embedding similarity', rationale: 'Best when content topics shift frequently and you need each chunk to be self-contained.' },
    document: { name: 'Document-aware chunking', description: 'Use document structure like headings, sections, and tables', rationale: 'Ideal for structured documents where hierarchy and sections carry important meaning.' },
  },
  reranking: {
    cohere: { name: 'Cohere Rerank', description: 'API-based reranking that significantly improves retrieval accuracy', rationale: 'Best accuracy boost for the least effort — add it as a post-retrieval step via API.' },
    crossencoder: { name: 'Cross-encoder reranking', description: 'Self-hosted model that scores query-document pairs for relevance', rationale: 'Best when you need reranking without API costs or want to keep data on-premises.' },
    none: { name: 'No reranking', description: 'Skip reranking and rely on vector similarity alone', rationale: 'Fine for simple use cases where speed matters more than precision, or data is small.' },
  },
}

const CATEGORIES = ['vectorDb', 'embedding', 'chunking', 'reranking']
const CATEGORY_LABELS = {
  vectorDb: 'Vector Database',
  embedding: 'Embedding Model',
  chunking: 'Chunking Strategy',
  reranking: 'Reranking',
}

// ── Questions ───────────────────────────────────────

// ── Suggested tools based on results ────────────────

const TOOL_SUGGESTIONS = {
  vectorDb: {
    pinecone: { name: 'Pinecone', href: '/barnsley-ai/integrations/pinecone' },
    weaviate: { name: 'Weaviate', href: '/barnsley-ai/integrations/weaviate' },
    qdrant: { name: 'Qdrant', href: '/barnsley-ai/integrations/qdrant' },
    pgvector: { name: 'Supabase (pgvector)', href: '/uses/supabase' },
  },
  embedding: {
    openai: { name: 'OpenAI', href: '/barnsley-ai/integrations/openai' },
  },
  general: [
    { name: 'Search and retrieval', description: 'Full guide to AI-powered search and retrieval systems', href: '/barnsley-ai/search-and-retrieval' },
    { name: 'LLM Cost Calculator', description: 'Estimate the API costs for your embedding and LLM calls', href: '/projects/tools/llm-cost-calculator' },
  ],
}

function getSuggestedTools(winners) {
  const tools = []
  const vdb = TOOL_SUGGESTIONS.vectorDb[winners.vectorDb]
  if (vdb) tools.push({ ...vdb, description: `Learn more about ${vdb.name} on this site` })
  const emb = TOOL_SUGGESTIONS.embedding[winners.embedding]
  if (emb) tools.push({ ...emb, description: `Learn more about ${emb.name} integrations on this site` })
  tools.push(...TOOL_SUGGESTIONS.general)
  return tools.slice(0, 3)
}

// ── Questions ───────────────────────────────────────

const QUESTIONS = [
  {
    question: 'How much data will your RAG system need to index?',
    options: [
      {
        text: 'Small — under 10k documents',
        weights: [
          { cat: 'vectorDb', id: 'chroma', points: 3 },
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'chunking', id: 'fixed', points: 2 },
          { cat: 'reranking', id: 'none', points: 2 },
        ],
      },
      {
        text: 'Medium — 10k to 100k documents',
        weights: [
          { cat: 'vectorDb', id: 'pgvector', points: 3 },
          { cat: 'vectorDb', id: 'weaviate', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'chunking', id: 'recursive', points: 2 },
          { cat: 'reranking', id: 'cohere', points: 2 },
        ],
      },
      {
        text: 'Large — 100k to 1M documents',
        weights: [
          { cat: 'vectorDb', id: 'pinecone', points: 3 },
          { cat: 'vectorDb', id: 'qdrant', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'chunking', id: 'recursive', points: 2 },
          { cat: 'reranking', id: 'cohere', points: 3 },
        ],
      },
      {
        text: 'Very large — millions of documents',
        weights: [
          { cat: 'vectorDb', id: 'pinecone', points: 3 },
          { cat: 'vectorDb', id: 'qdrant', points: 3 },
          { cat: 'embedding', id: 'selfhosted', points: 2 },
          { cat: 'chunking', id: 'semantic', points: 2 },
          { cat: 'reranking', id: 'crossencoder', points: 2 },
        ],
      },
    ],
  },
  {
    question: 'What type of content will you be indexing?',
    options: [
      {
        text: 'Text documents — articles, docs, knowledge base',
        weights: [
          { cat: 'chunking', id: 'recursive', points: 3 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'reranking', id: 'cohere', points: 1 },
        ],
      },
      {
        text: 'Structured data — CSVs, databases, JSON',
        weights: [
          { cat: 'chunking', id: 'document', points: 3 },
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'reranking', id: 'none', points: 2 },
        ],
      },
      {
        text: 'Mixed — documents, tables, images, PDFs',
        weights: [
          { cat: 'chunking', id: 'document', points: 3 },
          { cat: 'vectorDb', id: 'weaviate', points: 2 },
          { cat: 'embedding', id: 'cohere', points: 2 },
          { cat: 'reranking', id: 'cohere', points: 2 },
        ],
      },
      {
        text: 'Code — repositories, documentation, READMEs',
        weights: [
          { cat: 'chunking', id: 'semantic', points: 3 },
          { cat: 'vectorDb', id: 'qdrant', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'reranking', id: 'crossencoder', points: 2 },
        ],
      },
    ],
  },
  {
    question: 'How fresh does the indexed data need to be?',
    options: [
      {
        text: 'Static — rarely changes after initial indexing',
        weights: [
          { cat: 'vectorDb', id: 'chroma', points: 2 },
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
          { cat: 'chunking', id: 'fixed', points: 2 },
          { cat: 'embedding', id: 'openai', points: 1 },
        ],
      },
      {
        text: 'Daily — batch updates once a day',
        weights: [
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
          { cat: 'vectorDb', id: 'pinecone', points: 2 },
          { cat: 'chunking', id: 'recursive', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
        ],
      },
      {
        text: 'Near real-time — updates within minutes',
        weights: [
          { cat: 'vectorDb', id: 'pinecone', points: 3 },
          { cat: 'vectorDb', id: 'weaviate', points: 2 },
          { cat: 'chunking', id: 'recursive', points: 1 },
          { cat: 'embedding', id: 'openai', points: 2 },
        ],
      },
      {
        text: 'Real-time — streaming updates as data changes',
        weights: [
          { cat: 'vectorDb', id: 'weaviate', points: 3 },
          { cat: 'vectorDb', id: 'qdrant', points: 2 },
          { cat: 'chunking', id: 'fixed', points: 1 },
          { cat: 'embedding', id: 'selfhosted', points: 2 },
        ],
      },
    ],
  },
  {
    question: 'What matters more: accuracy or latency?',
    options: [
      {
        text: 'Accuracy first — every result must be highly relevant',
        weights: [
          { cat: 'reranking', id: 'cohere', points: 3 },
          { cat: 'reranking', id: 'crossencoder', points: 2 },
          { cat: 'chunking', id: 'semantic', points: 3 },
          { cat: 'embedding', id: 'openai', points: 2 },
        ],
      },
      {
        text: 'Mostly accuracy — but reasonable response times',
        weights: [
          { cat: 'reranking', id: 'cohere', points: 3 },
          { cat: 'chunking', id: 'recursive', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'vectorDb', id: 'pinecone', points: 1 },
        ],
      },
      {
        text: 'Balanced — good enough results, fast enough response',
        weights: [
          { cat: 'reranking', id: 'none', points: 2 },
          { cat: 'chunking', id: 'recursive', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
        ],
      },
      {
        text: 'Speed first — sub-second responses are critical',
        weights: [
          { cat: 'reranking', id: 'none', points: 3 },
          { cat: 'chunking', id: 'fixed', points: 2 },
          { cat: 'vectorDb', id: 'qdrant', points: 3 },
          { cat: 'embedding', id: 'selfhosted', points: 2 },
        ],
      },
    ],
  },
  {
    question: 'What is your infrastructure preference?',
    options: [
      {
        text: 'Fully managed — minimal ops, pay for convenience',
        weights: [
          { cat: 'vectorDb', id: 'pinecone', points: 3 },
          { cat: 'embedding', id: 'openai', points: 3 },
          { cat: 'reranking', id: 'cohere', points: 2 },
        ],
      },
      {
        text: 'Self-hosted — full control, our own servers',
        weights: [
          { cat: 'vectorDb', id: 'qdrant', points: 3 },
          { cat: 'vectorDb', id: 'weaviate', points: 2 },
          { cat: 'embedding', id: 'selfhosted', points: 3 },
          { cat: 'reranking', id: 'crossencoder', points: 3 },
        ],
      },
      {
        text: 'Serverless — scale to zero, pay per use',
        weights: [
          { cat: 'vectorDb', id: 'pinecone', points: 2 },
          { cat: 'vectorDb', id: 'chroma', points: 2 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'reranking', id: 'cohere', points: 2 },
        ],
      },
      {
        text: 'Existing Postgres — leverage what we already run',
        weights: [
          { cat: 'vectorDb', id: 'pgvector', points: 3 },
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'chunking', id: 'recursive', points: 1 },
          { cat: 'reranking', id: 'cohere', points: 1 },
        ],
      },
    ],
  },
  {
    question: 'How sensitive are you to ongoing API costs?',
    options: [
      {
        text: 'Very — we need to minimise per-request costs',
        weights: [
          { cat: 'embedding', id: 'selfhosted', points: 3 },
          { cat: 'reranking', id: 'none', points: 3 },
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
          { cat: 'vectorDb', id: 'chroma', points: 2 },
        ],
      },
      {
        text: 'Moderate — cost matters but quality comes first',
        weights: [
          { cat: 'embedding', id: 'openai', points: 2 },
          { cat: 'reranking', id: 'cohere', points: 2 },
          { cat: 'vectorDb', id: 'pgvector', points: 2 },
        ],
      },
      {
        text: 'Flexible — willing to pay for the best tools',
        weights: [
          { cat: 'embedding', id: 'openai', points: 3 },
          { cat: 'reranking', id: 'cohere', points: 3 },
          { cat: 'vectorDb', id: 'pinecone', points: 2 },
        ],
      },
      {
        text: 'Enterprise — budget is set, predictability matters',
        weights: [
          { cat: 'embedding', id: 'selfhosted', points: 2 },
          { cat: 'reranking', id: 'crossencoder', points: 2 },
          { cat: 'vectorDb', id: 'pinecone', points: 2 },
          { cat: 'vectorDb', id: 'weaviate', points: 2 },
        ],
      },
    ],
  },
]

// ── Scoring helpers ─────────────────────────────────

function emptyScores() {
  const scores = {}
  for (const cat of CATEGORIES) {
    scores[cat] = {}
    for (const id of Object.keys(RECOMMENDATIONS[cat])) {
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
    for (const { cat, id, points } of option.weights) {
      if (scores[cat] && scores[cat][id] !== undefined) {
        scores[cat][id] += points
      }
    }
  }
  return scores
}

function getWinners(scores) {
  const winners = {}
  for (const cat of CATEGORIES) {
    const entries = Object.entries(scores[cat])
    entries.sort((a, b) => b[1] - a[1])
    winners[cat] = entries[0][0]
  }
  return winners
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
  const winners = getWinners(scores)

  const results = CATEGORIES.map((cat, i) => ({
    cat,
    label: CATEGORY_LABELS[cat],
    ...RECOMMENDATIONS[cat][winners[cat]],
    accent: i === 0,
  }))

  const suggestedTools = getSuggestedTools(winners)

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={result.cat}
            className={clsx(
              'rounded-2xl border p-6',
              result.accent
                ? 'border-2 border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-500/10'
                : 'border-zinc-100 dark:border-zinc-700/40',
            )}
          >
            <p
              className={clsx(
                'text-xs font-semibold uppercase tracking-wide',
                result.accent
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-zinc-500 dark:text-zinc-400',
              )}
            >
              {result.label}
            </p>
            <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {result.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {result.description}
            </p>
            <div className="mt-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Why this choice
              </p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                {result.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested tools */}
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Explore further
        </h4>
        <div className="mt-3 space-y-3">
          {suggestedTools.map((tool) => (
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
        toolName="RAG Architecture Decision Tree"
        reportEndpoint="/api/rag-report"
        reportData={{
          results: results.map((r) => ({
            category: r.label,
            name: r.name,
            description: r.description,
            rationale: r.rationale,
          })),
          suggestedTools,
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

export function RAGDecisionTree() {
  return (
    <Suspense fallback={null}>
      <RAGDecisionTreeInner />
    </Suspense>
  )
}

function RAGDecisionTreeInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

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
