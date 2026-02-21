import { Button } from '@/components/Button'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { OptionCard } from '@/components/tools/OptionCard'

export function QuizShell({
  question,
  currentQuestion,
  total,
  selectedOption,
  isLastQuestion,
  onSelect,
  onNext,
  onBack,
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <ProgressBar current={currentQuestion} total={total} />

        <fieldset className="mt-6">
          <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {question.question}
          </legend>

          <div className="mt-4 space-y-3" role="radiogroup">
            {question.options.map((option, i) => (
              <OptionCard
                key={i}
                text={option.text}
                index={i}
                selected={selectedOption === i}
                onSelect={onSelect}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between">
          {currentQuestion > 0 ? (
            <Button variant="secondary" onClick={onBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={onNext} disabled={selectedOption === undefined}>
            {isLastQuestion ? 'See your results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}
