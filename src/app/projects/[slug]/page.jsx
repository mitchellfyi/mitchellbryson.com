import { notFound } from 'next/navigation'
import { ProjectLayout } from '@/components/ProjectLayout'
import { getAllProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const projects = await getAllProjects()
  const project = projects.find(p => p.slug === slug)
  
  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      authors: [project.author],
      images: project.coverImage ? [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const projects = await getAllProjects()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectLayout project={project} />
}
