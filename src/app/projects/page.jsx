import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
// import { getAllProjects } from '@/lib/projects'
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import { getProjectIcon, getProjectColor } from '@/components/ProjectIcons'

// Logo mapping for all projects
const logoMap = {
  planetaria: logoPlanetaria,
  animaginary: logoAnimaginary,
  'helio-stream': logoHelioStream,
  cosmos: logoCosmos,
  'open-shuttle': logoOpenShuttle,
}

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Projects',
  description: 'Things I\'ve made trying to put my dent in the universe.',
}

// Hardcoded pinned projects (reference from GitHub profile)
const pinned = [
  {
    name: 'launchonomy',
    description:
      'A system for orchestrating AI agents to complete "missions" through consensus driven decision-making and workflow automation.',
    html_url: 'https://github.com/mitchellfyi/launchonomy',
  },
  {
    name: 'pitchplease',
    description:
      'A Next.js app and Agentic AI workflow for uploading a pitch deck and turning it into a AI generated video, with voiceover and narrator.',
    html_url: 'https://github.com/mitchellfyi/pitchplease',
  },
  {
    name: 'inbox-triage-app',
    description:
      "A web-based email triage companion that helps you summarise email threads, understand attachments and generate reply drafts — all running primarily on-device using Chrome's built-in AI.",
    html_url: 'https://github.com/mitchellfyi/inbox-triage-app',
  },
  {
    name: 'inbox-triage-extension',
    description:
      'Triage your inbox with AI-powered email summaries, attachment analysis, and reply drafts—all processed locally for complete privacy.',
    html_url: 'https://github.com/mitchellfyi/inbox-triage-extension',
  },
  {
    name: 'agentic-commerce-protocol',
    description:
      'RFC: Fulfilment for the Agentic Commerce Protocol — defines the fulfilment lifecycle (order confirmation, shipment, delivery, returns), agent↔merchant messages, and state transitions.',
    html_url: 'https://github.com/mitchellfyi/agentic-commerce-protocol/blob/63cce68aaafbd7ab3b0cd0cfa5154305a952f40d/rfcs/rfc.fulfilment.md',
  },
  
]

export default async function Projects() {
  const [markdownProjects, githubProjects] = await Promise.all([
    Promise.resolve([]), // remove example/template markdown projects
    Promise.resolve(pinned),
  ])
  
  // Add logos to markdown projects
  const allMarkdownProjects = markdownProjects.map(project => ({
    ...project,
    logo: logoMap[project.slug],
  }))

  // Convert GitHub projects to the same format as markdown projects
  const githubProjectsFormatted = githubProjects.map(project => ({
    slug: project.name,
    title: project.name,
    description: project.description,
    logo: null, // We'll use a default icon
    html_url: project.html_url,
    homepage: project.homepage,
    language: project.language,
    stargazers_count: project.stargazers_count,
    forks_count: project.forks_count,
  }))

  // Combine both types of projects
  const allProjects = [...allMarkdownProjects, ...githubProjectsFormatted]

  return (
    <SimpleLayout
      title="Things I've made trying to put my dent in the universe."
      intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {allProjects.map((project) => {
          const Icon = getProjectIcon(project)
          const color = getProjectColor(project)
          return (
          <Card as="li" key={project.slug}>
            {project.html_url ? (
              <Card.Link href={project.html_url} target="_blank" rel="noopener noreferrer">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      alt=""
                      className="h-8 w-8"
                      unoptimized
                    />
                  ) : (
                    <Icon className={`h-6 w-6 ${color}`} />
                  )}
                </div>
                <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {project.title}
                </h2>
                <Card.Description>{project.description}</Card.Description>
                <p className="relative z-10 mt-6 text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                  View on GitHub
                </p>
              </Card.Link>
            ) : (
              <Card.Link href={`/projects/${project.slug}`}>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <Image
                    src={project.logo}
                    alt=""
                    className="h-8 w-8"
                    unoptimized
                  />
                </div>
                <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {project.title}
                </h2>
                <Card.Description>{project.description}</Card.Description>
                <p className="relative z-10 mt-6 text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                  Read more
                </p>
              </Card.Link>
            )}
          </Card>
        )})}
      </ul>
    </SimpleLayout>
  )
}
