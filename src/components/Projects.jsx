import Link from 'next/link'
import { ArrowTopRightIcon, CodeIcon } from '@/components/Icons'
import { getProjectIcon, getProjectColor } from '@/components/ProjectIcons'
import { toSlug } from '@/lib/pinnedProjects'

function renderProjectIcon(project) {
  const Icon = getProjectIcon(project)
  const color = getProjectColor(project)
  return <Icon className={`h-5 w-5 ${color}`} />
}

function Project({ project }) {
  return (
    <li className="flex items-start gap-4">
      <div className="relative flex flex-none items-start justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          {renderProjectIcon(project)}
        </div>
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Project</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <Link
            href={`/projects/${toSlug(project.name)}`}
            aria-label={project.name}
            className="transition-colors hover:text-teal-700"
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
        className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70"
      >
        View all projects
        <ArrowTopRightIcon className="h-4 w-4 text-zinc-400 transition group-active:text-zinc-600 dark:group-hover:text-zinc-50 dark:group-active:text-zinc-50" />
      </Link>
    </div>
  )
}
