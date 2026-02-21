'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { InputGroup } from '@/components/tools/InputGroup'

// ── Model pricing (USD per 1M tokens, early 2025) ───

const MODELS = [
  { name: 'GPT-4o', provider: 'OpenAI', inputPer1M: 2.5, outputPer1M: 10.0 },
  {
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    inputPer1M: 0.15,
    outputPer1M: 0.6,
  },
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputPer1M: 3.0,
    outputPer1M: 15.0,
  },
  {
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputPer1M: 0.8,
    outputPer1M: 4.0,
  },
  {
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    inputPer1M: 1.25,
    outputPer1M: 5.0,
  },
  {
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputPer1M: 0.075,
    outputPer1M: 0.3,
  },
  {
    name: 'Mistral Large',
    provider: 'Mistral',
    inputPer1M: 2.0,
    outputPer1M: 6.0,
  },
  {
    name: 'Llama 3.1 70B',
    provider: 'Together AI',
    inputPer1M: 0.88,
    outputPer1M: 0.88,
  },
  {
    name: 'Llama 3.1 8B',
    provider: 'Together AI',
    inputPer1M: 0.18,
    outputPer1M: 0.18,
  },
]

// ── Helpers ──────────────────────────────────────────

function calculateCosts(inputTokens, outputTokens, requestsPerDay) {
  return MODELS.map((model) => {
    const perRequest =
      (inputTokens / 1_000_000) * model.inputPer1M +
      (outputTokens / 1_000_000) * model.outputPer1M
    const daily = perRequest * requestsPerDay
    const monthly = daily * 30
    return { ...model, perRequest, daily, monthly }
  }).sort((a, b) => a.monthly - b.monthly)
}

function formatUSD(amount) {
  if (amount < 0.01) return `$${amount.toFixed(4)}`
  if (amount < 1) return `$${amount.toFixed(3)}`
  if (amount < 100) return `$${amount.toFixed(2)}`
  return `$${Math.round(amount).toLocaleString('en-US')}`
}

// ── Main component ───────────────────────────────────

export function LLMCostCalculator() {
  return (
    <Suspense fallback={null}>
      <LLMCostCalculatorInner />
    </Suspense>
  )
}

function LLMCostCalculatorInner() {
  const searchParams = useSearchParams()
  const [inputTokens, setInputTokens] = useState(1000)
  const [outputTokens, setOutputTokens] = useState(500)
  const [requestsPerDay, setRequestsPerDay] = useState(100)

  // Load from permalink on mount
  useEffect(() => {
    const it = searchParams.get('it')
    const ot = searchParams.get('ot')
    const rpd = searchParams.get('rpd')
    if (it)
      setInputTokens(Math.min(10000, Math.max(100, parseInt(it, 10) || 1000)))
    if (ot)
      setOutputTokens(Math.min(10000, Math.max(100, parseInt(ot, 10) || 500)))
    if (rpd)
      setRequestsPerDay(Math.min(10000, Math.max(1, parseInt(rpd, 10) || 100)))
  }, [searchParams])

  // Keep URL in sync
  useEffect(() => {
    const timer = setTimeout(() => {
      const url = new URL(window.location.pathname, window.location.origin)
      url.searchParams.set('it', inputTokens)
      url.searchParams.set('ot', outputTokens)
      url.searchParams.set('rpd', requestsPerDay)
      window.history.replaceState(null, '', url.toString())
    }, 300)
    return () => clearTimeout(timer)
  }, [inputTokens, outputTokens, requestsPerDay])

  const costs = calculateCosts(inputTokens, outputTokens, requestsPerDay)
  const cheapest = costs[0]

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Inputs */}
        <div className="space-y-6 lg:sticky lg:top-8 lg:col-span-2 lg:self-start">
          <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Your usage
            </h3>
            <div className="mt-5 space-y-6">
              <InputGroup
                label="Input tokens per request"
                description="The size of your prompt — including system prompts, context, and user input"
                value={inputTokens}
                onChange={setInputTokens}
                min={100}
                max={10000}
                step={100}
              />
              <InputGroup
                label="Output tokens per request"
                description="The size of the model's response"
                value={outputTokens}
                onChange={setOutputTokens}
                min={100}
                max={10000}
                step={100}
              />
              <InputGroup
                label="Requests per day"
                description="How many API calls you expect to make daily"
                value={requestsPerDay}
                onChange={setRequestsPerDay}
                min={1}
                max={10000}
              />
            </div>
          </div>
        </div>

        {/* Cost comparison table */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Cost comparison
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table
                className="w-full text-sm"
                aria-label="LLM cost comparison"
              >
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th
                      scope="col"
                      className="px-4 pb-2 text-left font-medium text-zinc-500 dark:text-zinc-400"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="pr-4 pb-2 text-right font-medium text-zinc-500 dark:text-zinc-400"
                    >
                      Per request
                    </th>
                    <th
                      scope="col"
                      className="pr-4 pb-2 text-right font-medium text-zinc-500 dark:text-zinc-400"
                    >
                      Daily
                    </th>
                    <th
                      scope="col"
                      className="pr-4 pb-2 text-right font-medium text-zinc-500 dark:text-zinc-400"
                    >
                      Monthly
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((model, i) => (
                    <tr
                      key={model.name}
                      className={clsx(
                        'border-b border-zinc-100 dark:border-zinc-800',
                        i === 0 && 'bg-teal-50 dark:bg-teal-500/10',
                      )}
                    >
                      <td className="px-4 py-2.5">
                        <div
                          className={clsx(
                            'font-medium',
                            i === 0
                              ? 'text-teal-700 dark:text-teal-400'
                              : 'text-zinc-900 dark:text-zinc-100',
                          )}
                        >
                          {model.name}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {model.provider}
                        </div>
                      </td>
                      <td
                        className={clsx(
                          'py-2.5 pr-4 text-right tabular-nums',
                          i === 0
                            ? 'text-teal-700 dark:text-teal-400'
                            : 'text-zinc-700 dark:text-zinc-300',
                        )}
                      >
                        {formatUSD(model.perRequest)}
                      </td>
                      <td
                        className={clsx(
                          'py-2.5 pr-4 text-right tabular-nums',
                          i === 0
                            ? 'text-teal-700 dark:text-teal-400'
                            : 'text-zinc-700 dark:text-zinc-300',
                        )}
                      >
                        {formatUSD(model.daily)}
                      </td>
                      <td
                        className={clsx(
                          'py-2.5 pr-4 text-right tabular-nums',
                          i === 0
                            ? 'font-semibold text-teal-700 dark:text-teal-400'
                            : 'text-zinc-700 dark:text-zinc-300',
                        )}
                      >
                        {formatUSD(model.monthly)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              Prices are approximate and based on publicly listed API pricing as
              of early 2025. Actual costs may vary with volume discounts,
              batching, and caching.
            </p>

            <div className="mt-4">
              <CopyLinkButton />
            </div>
          </div>
        </div>
      </div>

      <EmailReport
        toolName="LLM Cost Calculator"
        reportEndpoint="/api/llm-cost-report"
        reportData={{
          cheapestModel: cheapest.name,
          cheapestProvider: cheapest.provider,
          cheapestMonthly: formatUSD(cheapest.monthly),
          inputTokens,
          outputTokens,
          requestsPerDay,
          costs: costs.map((m) => ({
            name: m.name,
            provider: m.provider,
            perRequest: formatUSD(m.perRequest),
            daily: formatUSD(m.daily),
            monthly: formatUSD(m.monthly),
          })),
        }}
      />
    </>
  )
}
