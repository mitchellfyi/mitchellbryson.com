'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'

function InputGroup({ label, description, value, onChange, min, max, step = 1, prefix, suffix }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {label}
        </label>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {prefix}{value.toLocaleString('en-GB')}{suffix}
        </span>
      </div>
      {description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      )}
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-teal-500 dark:bg-zinc-700"
        />
        <div className="relative flex items-center">
          {prefix && (
            <span className="pointer-events-none absolute left-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              {prefix}
            </span>
          )}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (v >= min && v <= max) onChange(v)
            }}
            className={clsx(
              'w-24 rounded-md bg-white px-3 py-1.5 text-sm shadow-sm',
              'outline outline-zinc-900/10 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500',
              'dark:bg-zinc-800 dark:text-zinc-200 dark:outline-zinc-700 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400',
              prefix && 'pl-6',
            )}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultCard({ label, value, detail, accent }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border p-5',
        accent
          ? 'border-teal-200 bg-teal-50 dark:border-teal-500/20 dark:bg-teal-500/10'
          : 'border-zinc-100 bg-white dark:border-zinc-700/40 dark:bg-zinc-800/50',
      )}
    >
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p
        className={clsx(
          'mt-1 text-2xl font-bold tracking-tight',
          accent
            ? 'text-teal-700 dark:text-teal-400'
            : 'text-zinc-900 dark:text-zinc-100',
        )}
      >
        {value}
      </p>
      {detail && (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{detail}</p>
      )}
    </div>
  )
}

function formatCurrency(amount) {
  if (amount >= 1_000_000) {
    return `£${(amount / 1_000_000).toFixed(1)}m`
  }
  if (amount >= 10_000) {
    return `£${Math.round(amount).toLocaleString('en-GB')}`
  }
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function formatPayback(months) {
  if (months <= 0) return 'Immediate'
  if (months < 1) return `${Math.round(months * 30)} days`
  if (months > 60) return '5+ years'
  if (months >= 12) {
    const years = Math.floor(months / 12)
    const remaining = Math.round(months % 12)
    return remaining > 0
      ? `${years} yr${years > 1 ? 's' : ''} ${remaining} mo`
      : `${years} yr${years > 1 ? 's' : ''}`
  }
  return `${Math.round(months)} month${Math.round(months) === 1 ? '' : 's'}`
}

export function AIROICalculator() {
  return (
    <Suspense fallback={null}>
      <AIROICalculatorInner />
    </Suspense>
  )
}

function AIROICalculatorInner() {
  const searchParams = useSearchParams()
  const [staff, setStaff] = useState(5)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyCost, setHourlyCost] = useState(25)
  const [efficiency, setEfficiency] = useState(70)
  const [implementationCost, setImplementationCost] = useState(15000)

  // Load from permalink on mount
  useEffect(() => {
    const s = searchParams.get('s')
    const h = searchParams.get('h')
    const c = searchParams.get('c')
    const e = searchParams.get('e')
    const i = searchParams.get('i')
    if (s) setStaff(Math.min(100, Math.max(1, parseInt(s, 10) || 5)))
    if (h) setHoursPerWeek(Math.min(40, Math.max(1, parseInt(h, 10) || 10)))
    if (c) setHourlyCost(Math.min(200, Math.max(5, parseInt(c, 10) || 25)))
    if (e) setEfficiency(Math.min(100, Math.max(10, parseInt(e, 10) || 70)))
    if (i) setImplementationCost(Math.min(100000, Math.max(0, parseInt(i, 10) || 15000)))
  }, [searchParams])

  // Keep URL in sync with inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      const url = new URL(window.location.pathname, window.location.origin)
      url.searchParams.set('s', staff)
      url.searchParams.set('h', hoursPerWeek)
      url.searchParams.set('c', hourlyCost)
      url.searchParams.set('e', efficiency)
      url.searchParams.set('i', implementationCost)
      window.history.replaceState(null, '', url.toString())
    }, 300)
    return () => clearTimeout(timer)
  }, [staff, hoursPerWeek, hourlyCost, efficiency, implementationCost])

  const currentAnnualCost = staff * hoursPerWeek * 52 * hourlyCost
  const annualSavings = currentAnnualCost * (efficiency / 100)
  const hoursFreed = staff * hoursPerWeek * 52 * (efficiency / 100)
  const paybackMonths =
    annualSavings > 0 ? implementationCost / (annualSavings / 12) : Infinity
  const threeYearNet = annualSavings * 3 - implementationCost

  return (
    <>
    <div className="grid gap-10 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Your team
          </h3>
          <div className="mt-5 space-y-6">
            <InputGroup
              label="Staff on this task"
              description="How many people currently work on the task you'd automate?"
              value={staff}
              onChange={setStaff}
              min={1}
              max={100}
            />
            <InputGroup
              label="Hours per week per person"
              description="Average hours each person spends on this task weekly"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              min={1}
              max={40}
            />
            <InputGroup
              label="Average hourly cost"
              description="Fully loaded cost including salary, benefits, and overheads"
              value={hourlyCost}
              onChange={setHourlyCost}
              min={5}
              max={200}
              prefix="£"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            AI automation
          </h3>
          <div className="mt-5 space-y-6">
            <InputGroup
              label="Automation efficiency"
              description="What percentage of this task can realistically be automated? Most AI projects achieve 50-80%."
              value={efficiency}
              onChange={setEfficiency}
              min={10}
              max={100}
              suffix="%"
            />
            <InputGroup
              label="Implementation cost"
              description="One-off cost to build and deploy the AI solution"
              value={implementationCost}
              onChange={setImplementationCost}
              min={0}
              max={100000}
              step={500}
              prefix="£"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 lg:sticky lg:top-8 lg:self-start">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Projected results
          </h3>

          <ResultCard
            label="Annual savings"
            value={formatCurrency(annualSavings)}
            detail={`From a current annual cost of ${formatCurrency(currentAnnualCost)}`}
            accent
          />

          <ResultCard
            label="Hours freed per year"
            value={`${Math.round(hoursFreed).toLocaleString('en-GB')} hrs`}
            detail={`${Math.round(hoursFreed / 52)} hours per week back for higher-value work`}
          />

          <ResultCard
            label="Payback period"
            value={formatPayback(paybackMonths)}
            detail={
              implementationCost === 0
                ? 'No upfront investment'
                : `On an investment of ${formatCurrency(implementationCost)}`
            }
            accent
          />

          <ResultCard
            label="3-year net benefit"
            value={formatCurrency(Math.max(0, threeYearNet))}
            detail={
              threeYearNet < 0
                ? 'Investment does not break even within 3 years'
                : 'Total savings minus implementation cost over 3 years'
            }
          />

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Estimates are illustrative. Actual results depend on process
            complexity, data quality, and implementation approach.
          </p>

          <CopyLinkButton />
        </div>
      </div>
    </div>

    <EmailReport
      toolName="AI ROI Calculator"
      reportEndpoint="/api/roi-report"
      reportData={{
        annualSavings: formatCurrency(annualSavings),
        currentAnnualCost: formatCurrency(currentAnnualCost),
        hoursFreed: `${Math.round(hoursFreed).toLocaleString('en-GB')} hrs`,
        hoursPerWeek: `${Math.round(hoursFreed / 52)} hours per week`,
        paybackPeriod: formatPayback(paybackMonths),
        implementationCost: formatCurrency(implementationCost),
        threeYearNet: formatCurrency(Math.max(0, threeYearNet)),
        threeYearBreaksEven: threeYearNet >= 0,
      }}
    />
    </>
  )
}
