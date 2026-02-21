import clsx from 'clsx'

export function OptionCard({ text, index, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(index)}
      className={clsx(
        'flex w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition',
        'focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-zinc-900',
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
        {text}
      </span>
    </button>
  )
}
