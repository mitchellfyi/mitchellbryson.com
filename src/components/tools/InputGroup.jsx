'use client'

import { useId } from 'react'
import clsx from 'clsx'

export function InputGroup({
  label,
  description,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}) {
  const id = useId()
  const numberId = `${id}-number`
  const descId = description ? `${id}-desc` : undefined

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={numberId}
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          {label}
        </label>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {prefix}
          {value.toLocaleString('en-GB')}
          {suffix}
        </span>
      </div>
      {description && (
        <p id={descId} className="text-xs text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-describedby={descId}
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
            id={numberId}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (v >= min && v <= max) onChange(v)
            }}
            aria-describedby={descId}
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
