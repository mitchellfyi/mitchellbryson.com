import { describe, it, expect } from 'vitest'

// Since these functions rely heavily on file system operations,
// we'll create integration tests that work with real test files
describe('projects module', () => {
  it('module exports getAllProjects function', async () => {
    const { getAllProjects } = await import('./projects')
    expect(typeof getAllProjects).toBe('function')
  })

  it('getAllProjects returns an array', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()
    expect(Array.isArray(projects)).toBe(true)
  })

  it('projects have expected properties', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    if (projects.length > 0) {
      const project = projects[0]
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('content')
    }
  })

  it('projects are sorted alphabetically by title', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    if (projects.length > 1) {
      for (let i = 1; i < projects.length; i++) {
        const currentTitle = projects[i].title.toLowerCase()
        const previousTitle = projects[i - 1].title.toLowerCase()
        expect(previousTitle <= currentTitle).toBe(true)
      }
    }
  })

  it('project slugs match expected format', async () => {
    const { getAllProjects } = await import('./projects')
    const projects = await getAllProjects()

    if (projects.length > 0) {
      projects.forEach((project) => {
        // Slugs should not contain spaces or special characters
        expect(project.slug).toMatch(/^[a-z0-9-]+$/)
        // Slugs should not be [slug] (the dynamic route)
        expect(project.slug).not.toBe('[slug]')
      })
    }
  })
})
