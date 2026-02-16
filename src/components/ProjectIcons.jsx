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

export function getProjectIcon(project) {
  const name = (project?.name || project?.title || '').toLowerCase()
  if (name.includes('launchonomy')) return RocketIcon
  if (name.includes('pitch')) return VideoIcon
  // inbox-triage-extension uses MailSparkIcon (from inbox-triage-app)
  if (name.includes('inbox') || name.includes('triage')) return MailSparkIcon
  if (name.includes('commerce') || name.includes('protocol')) return CartIcon
  if (name.includes('phone') || name.includes('validator'))
    return PhoneCheckIcon
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
  if (name.includes('lofield')) return 'text-violet-600 dark:text-violet-400'
  return 'text-zinc-600 dark:text-zinc-400'
}
