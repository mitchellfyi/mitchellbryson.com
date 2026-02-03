import Link from 'next/link'
import { getProjectIcon, getProjectColor } from '@/components/ProjectIcons'

function CodeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8.5 14.5 4 10l4.5-4.5M15.5 9.5 20 14l-4.5 4.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ExternalLinkIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15 3h6v6M10 14 21 3M21 3v6M21 3h-6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Project({ project }) {
  const Icon = getProjectIcon(project)
  const color = getProjectColor(project)
  return (
    <li className="flex gap-4 items-start">
      <div className="relative flex flex-none items-start justify-center">
        <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Project</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <Link 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`${project.name} (opens in new tab)`}
            className="hover:text-teal-500 transition-colors"
          >
            {project.name}
          </Link>
        </dd>
        <dt className="sr-only">Description</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {project.description}
        </dd>
      </dl>
    </li>
  )
}

export function Projects({ projects }) {

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CodeIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Projects</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {projects.map((project, projectIndex) => (
          <Project key={projectIndex} project={project} />
        ))}
      </ol>
      <Link 
        href="/projects"
        aria-label="View all projects"
        className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none cursor-pointer bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
      >
        View all projects
        <ExternalLinkIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Link>
    </div>
  )
}
