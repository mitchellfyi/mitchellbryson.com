import { describe, it, expect } from 'vitest'
import { pinnedProjects, toSlug } from './pinnedProjects'

describe('projects module', () => {
  it('module exports getAllProjects function', async () => {
    const { getAllProjects } = await import('./projects')
    expect(typeof getAllProjects).toBe('function')
  })

  it('getAllProjects returns all 6 projects', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()
    expect(projects).toHaveLength(6)
  })

  it('every project has required properties', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    for (const project of projects) {
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('author')
      expect(project).toHaveProperty('date')
      expect(project).toHaveProperty('content')
      expect(project).toHaveProperty('link')
      expect(project.link).toHaveProperty('href')
      expect(project.link).toHaveProperty('label')
    }
  })

  it('every project has a GitHub link', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    for (const project of projects) {
      expect(project.link.href).toMatch(/^https:\/\/github\.com\//)
      expect(project.link.label).toBe('View on GitHub')
    }
  })

  it('every project has non-empty content', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    for (const project of projects) {
      expect(project.content.trim().length).toBeGreaterThan(0)
    }
  })

  it('projects are sorted alphabetically by title', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    for (let i = 1; i < projects.length; i++) {
      const current = projects[i].title.toLowerCase()
      const previous = projects[i - 1].title.toLowerCase()
      expect(previous <= current).toBe(true)
    }
  })

  it('project slugs match expected format', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/)
      expect(project.slug).not.toBe('[slug]')
    }
  })

  it('project slugs are unique', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('contains the expected projects', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()
    const slugs = projects.map((p) => p.slug)

    expect(slugs).toContain('doyaken-cli')
    expect(slugs).toContain('launchonomy')
    expect(slugs).toContain('pitchplease')
    expect(slugs).toContain('inbox-triage-extension')
    expect(slugs).toContain('agentic-commerce-protocol')
    expect(slugs).toContain('lofield-fm')
  })

  it('every pinned project has a matching content.md page', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()
    const contentSlugs = projects.map((p) => p.slug)

    for (const pinned of pinnedProjects) {
      const slug = toSlug(pinned.name)
      expect(
        contentSlugs,
        `pinned project "${pinned.name}" (slug: "${slug}") has no content.md`,
      ).toContain(slug)
    }
  })
})
