'use client'

import { Suspense } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { EmailReport } from '@/components/tools/EmailReport'
import { CopyLinkButton } from '@/components/tools/CopyLinkButton'
import { ProgressBar } from '@/components/tools/ProgressBar'
import { OptionCard } from '@/components/tools/OptionCard'
import { useQuiz } from '@/hooks/useQuiz'

// ── Data ─────────────────────────────────────────────

const QUESTIONS = [
  {
    category: 'data',
    question: 'How is most of your important business information stored today?',
    options: [
      { score: 0, text: "Mostly on paper, in people's heads, or scattered across personal files" },
      { score: 1, text: 'In spreadsheets and shared drives, but not always up to date' },
      { score: 2, text: "In a central system (like a CRM, accounting software, or database) but we don't do much with it" },
      { score: 3, text: 'In well-organised digital systems, and we already use it for reports or dashboards' },
    ],
  },
  {
    category: 'processes',
    question: 'Think about the most repetitive task in your business. How would you describe it?',
    options: [
      { score: 0, text: "We don't really have any clearly defined processes — everyone just gets on with it" },
      { score: 1, text: 'There are a few repetitive tasks, but they change a lot depending on the situation' },
      { score: 2, text: 'We have clear, repeatable workflows that staff follow consistently' },
      { score: 3, text: 'We have documented, step-by-step processes that are already partly automated (e.g. email templates, form workflows)' },
    ],
  },
  {
    category: 'team',
    question: 'How would your team react if you introduced a new digital tool tomorrow?',
    options: [
      { score: 0, text: 'Most people would resist it or struggle to learn it' },
      { score: 1, text: 'A few people would try it, but most would need a lot of support' },
      { score: 2, text: 'The team is generally open to new tools and picks them up fairly quickly' },
      { score: 3, text: 'We\'ve already adopted several new tools recently and the team actively looks for better ways to work' },
    ],
  },
  {
    category: 'budget',
    question: 'How much could you realistically invest in an AI project over the next 12 months?',
    options: [
      { score: 0, text: "Nothing right now — we'd need to see results before spending anything" },
      { score: 1, text: "A small amount (under \u00A32,000) to test something low-risk" },
      { score: 2, text: "A reasonable budget (\u00A32,000\u2013\u00A310,000) if the business case is clear" },
      { score: 3, text: "We have budget set aside (\u00A310,000+) and are actively looking to invest in AI or automation" },
    ],
  },
  {
    category: 'techStack',
    question: 'What does your current technology setup look like?',
    options: [
      { score: 0, text: 'We mostly use basic tools — email, phone, maybe a simple website' },
      { score: 1, text: 'We use some cloud software (e.g. Xero, Mailchimp, Google Workspace) but nothing connected' },
      { score: 2, text: 'We have several cloud tools and some of them are connected or share data' },
      { score: 3, text: 'We have an integrated tech stack with APIs, automations, or custom software already in place' },
    ],
  },
  {
    category: 'strategy',
    question: 'What would you most want AI to do for your business?',
    options: [
      { score: 0, text: "I'm not sure yet — I just know everyone's talking about it" },
      { score: 1, text: 'I have a general idea (e.g. "save us time" or "help with marketing") but nothing specific' },
      { score: 2, text: 'I can point to one or two specific tasks or bottlenecks where AI might help' },
      { score: 3, text: "I have a clear problem, I know what success looks like, and I'm ready to act on it" },
    ],
  },
]

const CATEGORY_LABELS = {
  data: 'Data',
  processes: 'Processes',
  team: 'Team',
  budget: 'Budget',
  techStack: 'Tech stack',
  strategy: 'Strategy',
}

const TIERS = [
  {
    min: 0,
    max: 5,
    label: 'Early Explorer',
    color: 'red',
    recommendation:
      "Your business isn't quite ready for AI yet, but that's okay — most businesses start here. The best next step is to get your key information into a simple digital system and document your most time-consuming manual processes. Once you've got a clearer picture of where time is being spent, you'll be in a much stronger position to spot where AI can make a real difference. Focus on foundations first, and the opportunities will become obvious.",
  },
  {
    min: 6,
    max: 9,
    label: 'Building Foundations',
    color: 'amber',
    recommendation:
      "You've got some of the building blocks in place, but there are a few gaps to close before AI will deliver reliable results. Consider tidying up your data — make sure your core business information is in one place and reasonably up to date. Then pick one repetitive, well-defined task and explore whether a simple automation (not necessarily AI) could handle it. That small win will build confidence and set you up for a more ambitious AI project down the line.",
  },
  {
    min: 10,
    max: 13,
    label: 'Ready for a Quick Win',
    color: 'teal',
    recommendation:
      "Your business is in a strong position to benefit from AI right now. You've got decent data, clear processes, and a team that's open to change. The smartest move is to start small: pick one specific, well-understood bottleneck and run a focused AI pilot. Something like automating customer enquiry responses, summarising documents, or extracting data from invoices. A quick win will prove the value and build momentum for bigger projects.",
  },
  {
    min: 14,
    max: 18,
    label: 'Ready for an AI Pilot',
    color: 'emerald',
    recommendation:
      "You're in an excellent position to move fast with AI. Your data is organised, your team is tech-savvy, and you have a clear idea of what you want to achieve. Rather than starting small, you could consider a more ambitious integration — a custom AI workflow, an intelligent assistant for your team, or a data pipeline that feeds insights directly into your decision-making. The key now is choosing the right partner and getting started before your competitors do.",
  },
]

const TIER_STYLES = {
  red: {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/20',
    barFill: 'bg-red-500 dark:bg-red-400',
    stroke: 'stroke-red-500 dark:stroke-red-400',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/20',
    barFill: 'bg-amber-500 dark:bg-amber-400',
    stroke: 'stroke-amber-500 dark:stroke-amber-400',
  },
  teal: {
    text: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-500/10',
    border: 'border-teal-200 dark:border-teal-500/20',
    barFill: 'bg-teal-500 dark:bg-teal-400',
    stroke: 'stroke-teal-500 dark:stroke-teal-400',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20',
    barFill: 'bg-emerald-500 dark:bg-emerald-400',
    stroke: 'stroke-emerald-500 dark:stroke-emerald-400',
  },
}

const NEXT_STEPS = {
  red: [
    'Pick one manual process that takes the most time each week and write down every step involved',
    'Move your most important business data (customers, orders, stock) into a simple digital system',
    'Talk to your team about which tasks feel most repetitive — their answers will surprise you',
  ],
  amber: [
    'Audit your data: is your core business information in one place and up to date?',
    'Try automating one small task with a no-code tool like Zapier or Make',
    'Research AI tools in your industry — many offer free trials you can test without commitment',
  ],
  teal: [
    'Identify your single biggest bottleneck and scope a focused AI pilot around it',
    'Set a clear success metric (e.g. "reduce invoice processing from 2 hours to 15 minutes")',
    'Speak to an AI developer about what a proof of concept would look like for your use case',
  ],
  emerald: [
    'Define your AI project scope: what problem, what data, what does success look like?',
    'Evaluate build vs buy — do you need a custom solution or can an existing tool solve it?',
    'Engage an AI partner to start a proof of concept within the next 30 days',
  ],
}

const IMPROVEMENT_TODOS = {
  data: [
    { current: 0, text: 'Move key business information out of paper files and into a digital system' },
    { current: 1, text: 'Consolidate scattered spreadsheets into a single, up-to-date source of truth' },
    { current: 2, text: 'Start using your existing data for simple reports or dashboards to spot patterns' },
    { current: 3, text: 'Audit your data for gaps or inconsistencies before feeding it into an AI system' },
  ],
  processes: [
    { current: 0, text: 'Document your top 3 most time-consuming tasks step by step' },
    { current: 1, text: 'Standardise your most common workflows so they run the same way every time' },
    { current: 2, text: 'Automate one repeatable process with templates, forms, or a simple workflow tool' },
    { current: 3, text: 'Identify which automated workflows would benefit most from AI decision-making' },
  ],
  team: [
    { current: 0, text: 'Run a short training session on a simple digital tool to build confidence' },
    { current: 1, text: 'Identify one or two team champions who can trial new tools and share feedback' },
    { current: 2, text: 'Encourage the team to suggest tools or improvements — make it part of the culture' },
    { current: 3, text: 'Brief the team on AI basics so they can help identify the best use cases' },
  ],
  budget: [
    { current: 0, text: 'Calculate the cost of one manual process (hours x hourly rate x 52 weeks) to build a business case' },
    { current: 1, text: 'Set aside a small test budget and look for low-cost AI tools with free tiers' },
    { current: 2, text: 'Build a formal business case for AI investment with projected ROI and timeline' },
    { current: 3, text: 'Allocate budget for a proof of concept with clear success criteria and a defined timeline' },
  ],
  techStack: [
    { current: 0, text: 'Adopt at least one cloud-based tool for a core business function (accounting, CRM, or email marketing)' },
    { current: 1, text: 'Connect your existing cloud tools so data flows between them automatically' },
    { current: 2, text: 'Explore whether your current tools have AI features or API integrations you\'re not using yet' },
    { current: 3, text: 'Map out your tech stack and identify where an AI layer would add the most value' },
  ],
  strategy: [
    { current: 0, text: 'List your three biggest business pain points and consider which might benefit from automation' },
    { current: 1, text: 'Pick one specific task and define exactly what "better" looks like (faster, cheaper, fewer errors)' },
    { current: 2, text: 'Write a one-paragraph problem statement: what you want AI to solve and how you\'ll measure success' },
    { current: 3, text: 'Create a shortlist of AI partners or solutions and schedule introductory calls this month' },
  ],
}

function getTier(score) {
  return TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0]
}

// ── Sub-components ───────────────────────────────────

function ScoreRing({ score, maxScore, color }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const progress = score / maxScore
  const offset = circumference * (1 - progress)
  const styles = TIER_STYLES[color]

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" className="-rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-zinc-200 dark:stroke-zinc-700"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={clsx('transition-all duration-700', styles.stroke)}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: 160, height: 160 }}>
        <span className={clsx('text-4xl font-bold', styles.text)}>{score}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">out of {maxScore}</span>
      </div>
    </div>
  )
}

function CategoryBreakdown({ answers }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {QUESTIONS.map((q, i) => {
        const score = answers[i] ?? 0
        return (
          <div
            key={q.category}
            className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-700/40"
          >
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {CATEGORY_LABELS[q.category]}
            </p>
            <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {score}<span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">/3</span>
            </p>
            <div className="mt-1.5 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-1 rounded-full bg-teal-500 transition-all dark:bg-teal-400"
                style={{ width: `${(score / 3) * 100}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function QuizResults({ answers, onRestart }) {
  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0)
  const tier = getTier(totalScore)
  const styles = TIER_STYLES[tier.color]
  const nextSteps = NEXT_STEPS[tier.color]

  // Build to-do list — one item per category, sorted by lowest score first, limited to 3
  const scoredTodos = QUESTIONS
    .map((q, i) => {
      const score = answers[i] ?? 0
      const todo = IMPROVEMENT_TODOS[q.category]?.find((t) => t.current === score)
      if (!todo) return null
      return { category: CATEGORY_LABELS[q.category], text: todo.text, score }
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  const todos = [
    ...scoredTodos,
    { category: 'Next step', text: 'Reach out to an AI service provider to discuss your options and learn what\u2019s possible for your business' },
  ]

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-col items-center rounded-2xl border border-zinc-100 p-8 dark:border-zinc-700/40">
        <div className="relative">
          <ScoreRing score={totalScore} maxScore={18} color={tier.color} />
        </div>
        <h3 className={clsx('mt-4 text-xl font-bold', styles.text)}>
          {tier.label}
        </h3>
      </div>

      <div className={clsx('rounded-2xl border p-6', styles.border, styles.bg)}>
        <h4 className={clsx('text-sm font-semibold', styles.text)}>
          Your recommendation
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {tier.recommendation}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Next steps
        </h4>
        <ol className="mt-3 space-y-3">
          {nextSteps.map((step, i) => (
            <li
              key={i}
              className={clsx(
                'flex gap-3 rounded-xl border p-4',
                i === 0
                  ? 'border-teal-200 bg-teal-50/50 dark:border-teal-500/20 dark:bg-teal-500/5'
                  : 'border-zinc-100 dark:border-zinc-700/40',
              )}
            >
              <span
                className={clsx(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  i === 0
                    ? 'bg-teal-500 text-white dark:bg-teal-400 dark:text-zinc-900'
                    : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400',
                )}
              >
                {i + 1}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {todos.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Your checklist
          </h4>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {totalScore >= 18
              ? 'You scored top marks — here are actions to maintain your edge and move fast.'
              : 'Based on your scores — work through these to improve your readiness.'}
          </p>
          <ul className="mt-3 space-y-2">
            {todos.map((todo, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-zinc-100 p-4 dark:border-zinc-700/40"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-zinc-300 dark:border-zinc-600" />
                <div>
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {todo.category}
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {todo.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <EmailReport
        toolName="AI Readiness Score"
        reportEndpoint="/api/readiness-report"
        reportData={{
          totalScore,
          tierLabel: tier.label,
          tierColor: tier.color,
          recommendation: tier.recommendation,
          nextSteps,
          todos,
          categories: QUESTIONS.map((q, i) => ({
            label: CATEGORY_LABELS[q.category],
            score: answers[i] ?? 0,
          })),
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

// ── Main component ───────────────────────────────────

export function AIReadinessScore() {
  return (
    <Suspense fallback={null}>
      <AIReadinessScoreInner />
    </Suspense>
  )
}

function AIReadinessScoreInner() {
  const quiz = useQuiz(QUESTIONS.length)

  if (quiz.showResults) {
    return <QuizResults answers={quiz.answers} onRestart={quiz.handleRestart} />
  }

  const question = QUESTIONS[quiz.currentQuestion]

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <ProgressBar current={quiz.currentQuestion} total={QUESTIONS.length} />

        <fieldset className="mt-6">
          <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {question.question}
          </legend>

          <div className="mt-4 space-y-3" role="radiogroup">
            {question.options.map((option, i) => (
              <OptionCard
                key={option.score}
                text={option.text}
                index={i}
                selected={quiz.selectedOption === i}
                onSelect={quiz.handleSelect}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between">
          {quiz.currentQuestion > 0 ? (
            <Button variant="secondary" onClick={quiz.handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button
            onClick={quiz.handleNext}
            disabled={quiz.selectedOption === undefined}
          >
            {quiz.isLastQuestion ? 'See your results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}
