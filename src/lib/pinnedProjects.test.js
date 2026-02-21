import { describe, it, expect } from 'vitest'
import { pinnedProjects, toSlug } from './pinnedProjects'

describe('toSlug', () => {
  it('replaces dots with hyphens', () => {
    expect(toSlug('lofield.fm')).toBe('lofield-fm')
  })

  it('returns names without dots unchanged', () => {
    expect(toSlug('launchonomy')).toBe('launchonomy')
    expect(toSlug('inbox-triage-extension')).toBe('inbox-triage-extension')
  })

  it('handles multiple dots', () => {
    expect(toSlug('a.b.c')).toBe('a-b-c')
  })
})

describe('pinnedProjects', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(pinnedProjects)).toBe(true)
    expect(pinnedProjects.length).toBeGreaterThan(0)
  })

  it('every project has name and description', () => {
    for (const project of pinnedProjects) {
      expect(typeof project.name).toBe('string')
      expect(project.name.length).toBeGreaterThan(0)
      expect(typeof project.description).toBe('string')
      expect(project.description.length).toBeGreaterThan(0)
    }
  })

  it('every project name produces a valid slug', () => {
    for (const project of pinnedProjects) {
      const slug = toSlug(project.name)
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('project names produce unique slugs', () => {
    const slugs = pinnedProjects.map((p) => toSlug(p.name))
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
