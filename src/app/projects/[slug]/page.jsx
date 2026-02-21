import { notFound } from 'next/navigation'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { ProjectLayout } from '@/components/ProjectLayout'
import { getAllProjects } from '@/lib/projects'
import { getOgImage, siteName, siteUrl } from '@/lib/siteConfig'

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const projects = await getAllProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `${siteUrl}/projects/${slug}`,
      siteName,
      locale: 'en_GB',
      authors: [project.author],
      images: project.coverImage
        ? [
            {
              url: `${siteUrl}${project.coverImage}`,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [
            {
              url: getOgImage(
                project.title,
                project.description || '',
                'article',
              ),
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.coverImage
        ? [`${siteUrl}${project.coverImage}`]
        : [getOgImage(project.title, project.description || '', 'article')],
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const projects = await getAllProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Projects', url: `${siteUrl}/projects` },
          { name: project.title, url: `${siteUrl}/projects/${slug}` },
        ]}
      />
      <ProjectLayout project={project} />
    </>
  )
}
