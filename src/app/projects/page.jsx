import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  getProjectIcon,
  getProjectColor,
  getToolIcon,
  getToolColor,
} from '@/components/ProjectIcons'
import {
  BreadcrumbJsonLd,
  CollectionPageJsonLd,
  SoftwareApplicationJsonLd,
} from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { pinnedProjects } from '@/lib/pinnedProjects'
import { projectTools } from '@/lib/projectTools'

export const metadata = buildMetadata({
  title: 'Projects',
  description: "Things I've built that solve real problems.",
  url: `${siteUrl}/projects`,
})

export default async function Projects() {
  const projects = pinnedProjects.map((project) => ({
    slug: project.name,
    title: project.name,
    description: project.description,
    html_url: project.html_url,
    detail: project.detail,
  }))

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Projects', url: `${siteUrl}/projects` },
        ]}
      />
      <CollectionPageJsonLd
        name="Projects"
        description="Things I've built that solve real problems."
        url={`${siteUrl}/projects`}
      />
      {projects.map((project) => (
        <SoftwareApplicationJsonLd
          key={project.slug}
          name={project.title}
          description={project.description}
          url={project.html_url || `${siteUrl}/projects/${project.slug}`}
        />
      ))}
      <SimpleLayout
        title="Things I've built that solve real problems."
        intro="I've worked on tons of projects over the years, but these are the ones I'm most proud of. Many are open-source, so if something catches your eye, check out the code and contribute."
      >
        <section>
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Tools
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Interactive AI tools and calculators — ROI calculators, architecture
            decision trees, cost comparisons, and more.
          </p>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projectTools.map((tool) => {
              const ToolIcon = getToolIcon(tool.slug)
              const toolColor = getToolColor(tool.slug)
              return (
                <Card as="li" key={tool.slug}>
                  <Card.Link href={`/projects/tools/${tool.slug}`}>
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                      <ToolIcon className={`h-6 w-6 ${toolColor}`} />
                    </div>
                    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                      {tool.name}
                    </h2>
                    <Card.Description>{tool.description}</Card.Description>
                    <p className="relative z-10 mt-6 text-sm font-medium text-zinc-400 transition group-hover:text-teal-700 dark:text-zinc-200">
                      Use this tool
                    </p>
                  </Card.Link>
                </Card>
              )
            })}
          </ul>
        </section>

        <section className="mt-16 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Open Source
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Open-source projects, apps and libraries. Check out the code,
            contribute, or use them in your own work.
          </p>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => {
              const Icon = getProjectIcon(project)
              const color = getProjectColor(project)
              const href = project.detail
                ? `/projects/${project.slug}`
                : project.html_url
              const linkProps = project.detail
                ? {}
                : { target: '_blank', rel: 'noopener noreferrer' }
              return (
                <Card as="li" key={project.slug}>
                  <Card.Link href={href} {...linkProps}>
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                      <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                      {project.title}
                    </h2>
                    <Card.Description>{project.description}</Card.Description>
                    <p className="relative z-10 mt-6 text-sm font-medium text-zinc-400 transition group-hover:text-teal-700 dark:text-zinc-200">
                      {project.detail ? 'View project' : 'View on GitHub'}
                    </p>
                  </Card.Link>
                </Card>
              )
            })}
          </ul>
        </section>
      </SimpleLayout>
    </>
  )
}
