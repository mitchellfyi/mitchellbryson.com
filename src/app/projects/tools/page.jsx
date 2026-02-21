import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getToolIcon, getToolColor } from '@/components/ProjectIcons'
import { BreadcrumbJsonLd, CollectionPageJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { projectTools } from '@/lib/projectTools'

export const metadata = buildMetadata({
  title: 'Tools',
  description:
    'Interactive AI tools and calculators — ROI calculators, architecture decision trees, cost comparisons, and more.',
  url: `${siteUrl}/projects/tools`,
})

export default function ProjectToolsIndex() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Projects', url: `${siteUrl}/projects` },
          { name: 'Tools', url: `${siteUrl}/projects/tools` },
        ]}
      />
      <CollectionPageJsonLd
        name="Tools"
        description="Interactive AI tools and calculators — ROI calculators, architecture decision trees, cost comparisons, and more."
        url={`${siteUrl}/projects/tools`}
      />
      <SimpleLayout
        title="Tools"
        intro="Interactive AI tools and calculators. ROI calculators, architecture decision trees, cost comparisons, and scope templates."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projectTools.map((tool) => {
            const ToolIcon = getToolIcon(tool.slug)
            const toolColor = getToolColor(tool.slug)
            return (
              <li key={tool.slug}>
                <Link
                  href={`/projects/tools/${tool.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-100 p-6 transition hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <ToolIcon className={`h-5 w-5 ${toolColor}`} />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-zinc-800 group-hover:text-teal-700 dark:text-zinc-100 dark:group-hover:text-teal-400">
                    {tool.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {tool.description}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </SimpleLayout>
    </>
  )
}
