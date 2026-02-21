'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { OptionCard } from '@/components/tools/OptionCard'

// ── Steps ───────────────────────────────────────────

const STEPS = [
  {
    key: 'problem',
    label: 'Problem statement',
    type: 'textarea',
    placeholder:
      'What manual process or bottleneck are you trying to solve? Describe the current pain point in a few sentences.',
  },
  {
    key: 'metric',
    label: 'Success metric',
    type: 'textarea',
    placeholder:
      'How will you measure whether the PoC is successful? e.g. "Reduce processing time from 4 hours to 30 minutes"',
  },
  {
    key: 'dataSource',
    label: 'Data source',
    type: 'options',
    options: [
      'Existing database',
      'Documents and files',
      'API or third-party',
      'Customer interactions',
      "We'd need to collect it",
    ],
  },
  {
    key: 'timeline',
    label: 'Timeline',
    type: 'options',
    options: ['2 weeks', '4 weeks', '6 weeks', '8+ weeks'],
  },
  {
    key: 'techPref',
    label: 'Tech preference',
    type: 'options',
    options: ['Python / FastAPI', 'Node / Next.js', 'No preference', 'Other'],
  },
  {
    key: 'budget',
    label: 'Budget range',
    type: 'options',
    options: [
      'Under \u00a35k',
      '\u00a35\u201310k',
      '\u00a310\u201325k',
      '\u00a325k+',
    ],
  },
]

// ── Contextual checklist ────────────────────────────

function getChecklist(values) {
  const items = []

  // Data source advice
  const ds = values.dataSource
  if (ds === 4) {
    items.push(
      'Identify what data you need and start collecting it now — data is usually the longest lead time in an AI project',
    )
  } else if (ds === 1) {
    items.push(
      'Audit your documents for quality and consistency — messy data leads to unreliable AI output',
    )
  } else if (ds === 2) {
    items.push(
      'Confirm API access and rate limits for your third-party data sources before building',
    )
  } else {
    items.push(
      'Verify your data source is accessible programmatically and check for any privacy or compliance requirements',
    )
  }

  // Timeline advice
  const tl = values.timeline
  if (tl === 0) {
    items.push(
      'With a 2-week timeline, focus on a single use case and use pre-built APIs rather than custom models',
    )
  } else if (tl === 3) {
    items.push(
      'Use the first 2 weeks to validate the approach with a throwaway prototype before committing to the full build',
    )
  } else {
    items.push(
      'Set a mid-point checkpoint to evaluate accuracy and decide whether to continue, pivot, or stop',
    )
  }

  // Budget and tech advice
  const budget = values.budget
  if (budget === 0) {
    items.push(
      'Stick to API-based models to avoid infrastructure costs — open-source models need GPU hosting which adds up fast',
    )
  } else {
    items.push(
      'Define a clear success metric now so you know exactly when the PoC is "done" and ready for a go/no-go decision',
    )
  }

  return items.slice(0, 3)
}

// ── Permalink helpers ───────────────────────────────

function encodeText(text) {
  try {
    return btoa(encodeURIComponent(text))
  } catch {
    return ''
  }
}

function decodeText(encoded) {
  try {
    return decodeURIComponent(atob(encoded))
  } catch {
    return ''
  }
}

function encodeState(values) {
  const url = new URL(window.location.pathname, window.location.origin)
  if (values.problem) url.searchParams.set('p', encodeText(values.problem))
  if (values.metric) url.searchParams.set('m', encodeText(values.metric))
  if (values.dataSource !== undefined)
    url.searchParams.set('d', values.dataSource)
  if (values.timeline !== undefined) url.searchParams.set('t', values.timeline)
  if (values.techPref !== undefined) url.searchParams.set('k', values.techPref)
  if (values.budget !== undefined) url.searchParams.set('b', values.budget)
  return url.toString()
}

function decodeState(searchParams) {
  const p = searchParams.get('p')
  const m = searchParams.get('m')
  const d = searchParams.get('d')
  const t = searchParams.get('t')
  const k = searchParams.get('k')
  const b = searchParams.get('b')

  if (!p && !m && d === null) return null

  const values = {}
  if (p) values.problem = decodeText(p)
  if (m) values.metric = decodeText(m)
  if (d !== null) values.dataSource = parseInt(d, 10)
  if (t !== null) values.timeline = parseInt(t, 10)
  if (k !== null) values.techPref = parseInt(k, 10)
  if (b !== null) values.budget = parseInt(b, 10)

  return values
}

// ── Sub-components ──────────────────────────────────

function ScopeResults({ values, onRestart }) {
  const checklist = getChecklist(values)

  const stepLabels = {
    problem: 'Problem statement',
    metric: 'Success metric',
    dataSource: 'Data source',
    timeline: 'Timeline',
    techPref: 'Tech preference',
    budget: 'Budget range',
  }

  function getDisplayValue(key, value) {
    const step = STEPS.find((s) => s.key === key)
    if (step.type === 'options') {
      return step.options[value] || 'Not specified'
    }
    return value || 'Not specified'
  }

  function getCopyText() {
    return STEPS.map(
      (step) =>
        `## ${stepLabels[step.key]}\n${getDisplayValue(step.key, values[step.key])}`,
    ).join('\n\n')
  }

  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(getCopyText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-2xl border-2 border-teal-500 bg-teal-50 p-6 dark:border-teal-400 dark:bg-teal-500/10">
        <p className="text-xs font-semibold tracking-wide text-teal-600 uppercase dark:text-teal-400">
          Your AI PoC scope document
        </p>

        <div className="mt-4 space-y-5">
          {STEPS.map((step) => (
            <div key={step.key}>
              <h4 className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                {stepLabels[step.key]}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">
                {getDisplayValue(step.key, values[step.key])}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy as markdown'}
          </Button>
        </div>
      </div>

      {/* Contextual checklist */}
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          What to do next
        </h4>
        <ul className="mt-3 space-y-3">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white dark:bg-teal-400 dark:text-zinc-900">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <EmailReport
        toolName="AI PoC Scope Template"
        reportEndpoint="/api/poc-report"
        reportData={{
          sections: STEPS.map((step) => ({
            label: stepLabels[step.key],
            value: getDisplayValue(step.key, values[step.key]),
          })),
          checklist,
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

export function AIPocScopeTemplate() {
  return (
    <Suspense fallback={null}>
      <AIPocScopeTemplateInner />
    </Suspense>
  )
}

function AIPocScopeTemplateInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const decoded = decodeState(searchParams)
  const [currentStep, setCurrentStep] = useState(0)
  const [values, setValues] = useState(() => decoded || {})
  const [showResults, setShowResults] = useState(() => !!decoded)
  const [textValue, setTextValue] = useState('')

  // Update URL when results are shown
  useEffect(() => {
    if (showResults && Object.keys(values).length === STEPS.length) {
      window.history.replaceState(null, '', encodeState(values))
    }
  }, [showResults, values])

  const step = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1

  function handleOptionSelect(optionIndex) {
    const newValues = { ...values, [step.key]: optionIndex }
    setValues(newValues)
    setTimeout(() => {
      if (isLastStep) {
        setShowResults(true)
      } else {
        setCurrentStep((prev) => prev + 1)
        const nextStep = STEPS[currentStep + 1]
        if (nextStep?.type === 'textarea') {
          setTextValue(newValues[nextStep.key] || '')
        }
      }
    }, 300)
  }

  function handleTextNext() {
    const trimmed = textValue.trim()
    if (!trimmed) return
    const newValues = { ...values, [step.key]: trimmed }
    setValues(newValues)
    if (isLastStep) {
      setShowResults(true)
    } else {
      setCurrentStep((prev) => prev + 1)
      const nextStep = STEPS[currentStep + 1]
      if (nextStep?.type === 'textarea') {
        setTextValue(newValues[nextStep.key] || '')
      }
    }
  }

  function handleBack() {
    const prevStep = currentStep - 1
    setCurrentStep(prevStep)
    const prev = STEPS[prevStep]
    if (prev?.type === 'textarea') {
      setTextValue(values[prev.key] || '')
    }
  }

  function handleOptionNext() {
    if (values[step.key] === undefined) return
    if (isLastStep) {
      setShowResults(true)
    } else {
      setCurrentStep((prev) => prev + 1)
      const nextStep = STEPS[currentStep + 1]
      if (nextStep?.type === 'textarea') {
        setTextValue(values[nextStep.key] || '')
      }
    }
  }

  function handleRestart() {
    setCurrentStep(0)
    setValues({})
    setShowResults(false)
    setTextValue('')
    router.replace(window.location.pathname, { scroll: false })
  }

  if (showResults) {
    return <ScopeResults values={values} onRestart={handleRestart} />
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <ProgressBar current={currentStep} total={STEPS.length} label="Step" />

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {step.label}
          </h3>

          {step.type === 'textarea' ? (
            <div className="mt-4 space-y-4">
              <textarea
                rows={4}
                aria-label={step.label}
                placeholder={step.placeholder}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className={clsx(
                  'w-full rounded-xl border p-4 text-sm leading-relaxed',
                  'outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10',
                  'border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400',
                  'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10',
                )}
              />
            </div>
          ) : (
            <div className="mt-4 space-y-3" role="radiogroup">
              {step.options.map((text, i) => (
                <OptionCard
                  key={i}
                  text={text}
                  index={i}
                  selected={values[step.key] === i}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          {currentStep > 0 ? (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step.type === 'textarea' && (
            <Button onClick={handleTextNext} disabled={!textValue.trim()}>
              {isLastStep ? 'Generate scope' : 'Next'}
            </Button>
          )}
          {step.type === 'options' && (
            <Button
              onClick={handleOptionNext}
              disabled={values[step.key] === undefined}
            >
              {isLastStep ? 'Generate scope' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
