import clsx from 'clsx'

export function ProgressBar({ current, total, label = 'Question' }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {label} {current + 1} of {total}
      </p>
      <div
        className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`${label} ${current + 1} of ${total}`}
      >
        <div
          className="h-1.5 rounded-full bg-teal-500 transition-all duration-300 dark:bg-teal-400"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
