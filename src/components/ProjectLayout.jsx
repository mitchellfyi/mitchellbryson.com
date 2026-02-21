'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { ArrowLeftIcon, LinkIcon } from '@/components/Icons'
import { MarkdownContent } from '@/components/MarkdownContent'
import { Newsletter } from '@/components/Newsletter'
import { Prose } from '@/components/Prose'

export function ProjectLayout({ project, children }) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to projects"
              className="group mb-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {project.title}
              </h1>
            </header>
            {project.coverImage && (
              <div className="mt-8 lg:-mx-14">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={1200}
                  height={630}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}
            <Prose className="mt-8" data-mdx-content>
              <MarkdownContent content={project.content}>
                {children}
              </MarkdownContent>
              <hr />
            </Prose>
            {project.link && (
              <div className="mt-8">
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {project.link.label}
                </a>
              </div>
            )}
          </article>
          <div className="mt-16">
            <Newsletter />
          </div>
        </div>
      </div>
    </Container>
  )
}
