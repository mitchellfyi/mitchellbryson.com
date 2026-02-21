import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getProjectIcon, getProjectColor } from '@/components/ProjectIcons'
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { pinnedProjects } from '@/lib/pinnedProjects'

export const metadata = buildMetadata({
  title: 'Projects',
  description: "Things I've made trying to put my dent in the universe.",
  url: `${siteUrl}/projects`,
})

export default async function Projects() {
  const projects = pinnedProjects.map((project) => ({
    slug: project.name,
    title: project.name,
    description: project.description,
    html_url: project.html_url,
  }))

  return (
    <>
    <BreadcrumbJsonLd
      items={[
        { name: 'Home', url: siteUrl },
        { name: 'Projects', url: `${siteUrl}/projects` },
      ]}
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
      title="Things I've made trying to put my dent in the universe."
      intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => {
          const Icon = getProjectIcon(project)
          const color = getProjectColor(project)
          return (
            <Card as="li" key={project.slug}>
              <Card.Link
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {project.title}
                </h2>
                <Card.Description>{project.description}</Card.Description>
                <p className="relative z-10 mt-6 text-sm font-medium text-zinc-400 transition group-hover:text-teal-700 dark:text-zinc-200">
                  View on GitHub
                </p>
              </Card.Link>
            </Card>
          )
        })}
      </ul>
    </SimpleLayout>
    </>
  )
}
