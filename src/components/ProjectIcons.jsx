// Minimal themed icons for projects. Icons use currentColor for strokes
// so parent text color utilities will style them.

function BaseIcon({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function RocketIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 15c0-2.5 1.5-5.5 4-8s5.5-4 8-4c-1 2.5-2.5 5.5-5 8s-5.5 5-8 5" />
      <path d="M10 10l4 4" />
      <path d="M5 19c1.5 0 3-1.5 3-3 0 1.5 1.5 3 3 3-1.5 0-3 1.5-3 3 0-1.5-1.5-3-3-3Z" />
    </BaseIcon>
  )
}

export function VideoIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 10l6-3v10l-6-3v-4Z" />
      <circle cx="9" cy="12" r="2" />
    </BaseIcon>
  )
}

export function MailSparkIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="m3 7 9 6 9-6" />
      <path d="M9 4l1 2M12 3l.5 2.5M15 4l-1 2" />
    </BaseIcon>
  )
}

export function PuzzleIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 7a2 2 0 1 1 4 0h3a2 2 0 0 1 2 2v3h-2a2 2 0 1 0 0 4h2v3a2 2 0 0 1-2 2h-3v-2a2 2 0 1 0-4 0v2H7a2 2 0 0 1-2-2v-3h2a2 2 0 1 0 0-4H5V9a2 2 0 0 1 2-2h3Z" />
    </BaseIcon>
  )
}

export function CartIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 5h2l2 10h9l2-6H7" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </BaseIcon>
  )
}

export function PhoneCheckIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M10 6h4M12 18h0" />
      <path d="M3.5 13.5l2 2L9 12" />
    </BaseIcon>
  )
}

export function CodeIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 14.5 4 10l4.5-4.5M15.5 9.5 20 14l-4.5 4.5" />
    </BaseIcon>
  )
}

export function TerminalIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </BaseIcon>
  )
}

export function MusicIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
    </BaseIcon>
  )
}

// Tool icons

export function CalculatorIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h2M8 14h2M8 18h2M14 10h2M14 14h2M14 18h2" />
    </BaseIcon>
  )
}

export function GaugeIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
      <path d="M12 12l4-4" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M7 17h10" />
    </BaseIcon>
  )
}

export function QuestionTreeIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4M8 14l-3 2.5M16 14l3 2.5" />
      <path d="M8 14h8" />
    </BaseIcon>
  )
}

export function CoinsIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </BaseIcon>
  )
}

export function FlowchartIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="8.5" y="16" width="7" height="5" rx="1" />
      <path d="M6.5 8v3h11V8M12 11v5" />
    </BaseIcon>
  )
}

export function ClipboardIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 3h6a1 1 0 0 1 1 1H8a1 1 0 0 1 1-1Z" />
      <rect x="5" y="5" width="14" height="17" rx="2" />
      <path d="M9 10h6M9 14h6M9 18h3" />
    </BaseIcon>
  )
}

export function ScaleIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v18M5 7l7-4 7 4" />
      <path d="M5 7l-2 8h6L5 7ZM19 7l-2 8h6l-4-8Z" />
    </BaseIcon>
  )
}

export function LayersIcon(props) {
  return (
    <BaseIcon
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 2 10 5-10 5L2 7l10-5Z" />
      <path d="m2 12 10 5 10-5" />
      <path d="m2 17 10 5 10-5" />
    </BaseIcon>
  )
}

const TOOL_ICON_MAP = {
  'ai-roi-calculator': CalculatorIcon,
  'ai-readiness-score': GaugeIcon,
  'which-ai-integration': QuestionTreeIcon,
  'llm-cost-calculator': CoinsIcon,
  'rag-decision-tree': FlowchartIcon,
  'ai-poc-scope-template': ClipboardIcon,
  'build-vs-buy-vs-ai': ScaleIcon,
  'tech-stack-picker': LayersIcon,
}

const TOOL_COLOR_MAP = {
  'ai-roi-calculator': 'text-emerald-600 dark:text-emerald-400',
  'ai-readiness-score': 'text-blue-600 dark:text-blue-400',
  'which-ai-integration': 'text-purple-600 dark:text-purple-400',
  'llm-cost-calculator': 'text-amber-600 dark:text-amber-400',
  'rag-decision-tree': 'text-cyan-600 dark:text-cyan-400',
  'ai-poc-scope-template': 'text-rose-600 dark:text-rose-400',
  'build-vs-buy-vs-ai': 'text-orange-600 dark:text-orange-400',
  'tech-stack-picker': 'text-indigo-600 dark:text-indigo-400',
}

export function getToolIcon(slug) {
  return TOOL_ICON_MAP[slug] || CodeIcon
}

export function getToolColor(slug) {
  return TOOL_COLOR_MAP[slug] || 'text-zinc-600 dark:text-zinc-400'
}

export function getProjectIcon(project) {
  const name = (project?.name || project?.title || '').toLowerCase()
  if (name.includes('launchonomy')) return RocketIcon
  if (name.includes('pitch')) return VideoIcon
  // inbox-triage-extension uses MailSparkIcon (from inbox-triage-app)
  if (name.includes('inbox') || name.includes('triage')) return MailSparkIcon
  if (name.includes('commerce') || name.includes('protocol')) return CartIcon
  if (name.includes('phone') || name.includes('validator'))
    return PhoneCheckIcon
  if (name.includes('doyaken')) return TerminalIcon
  if (name.includes('lofield')) return MusicIcon
  return CodeIcon
}

export function getProjectColor(project) {
  const name = (project?.name || project?.title || '').toLowerCase()
  if (name.includes('launchonomy'))
    return 'text-indigo-600 dark:text-indigo-400'
  if (name.includes('pitch')) return 'text-pink-600 dark:text-pink-400'
  if (name.includes('extension'))
    return 'text-emerald-600 dark:text-emerald-400'
  if (name.includes('inbox') || name.includes('triage'))
    return 'text-amber-600 dark:text-amber-400'
  if (name.includes('commerce') || name.includes('protocol'))
    return 'text-teal-600 dark:text-teal-400'
  if (name.includes('phone') || name.includes('validator'))
    return 'text-rose-600 dark:text-rose-400'
  if (name.includes('doyaken')) return 'text-orange-600 dark:text-orange-400'
  if (name.includes('lofield')) return 'text-violet-600 dark:text-violet-400'
  return 'text-zinc-600 dark:text-zinc-400'
}
