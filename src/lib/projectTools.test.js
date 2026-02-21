import { describe, it, expect } from 'vitest'
import {
  projectTools,
  TOOL_CATEGORIES,
  getProjectTool,
  getAllProjectToolSlugs,
} from './projectTools'

describe('TOOL_CATEGORIES', () => {
  it('has expected category keys', () => {
    expect(TOOL_CATEGORIES).toHaveProperty('local')
    expect(TOOL_CATEGORIES).toHaveProperty('technical')
    expect(TOOL_CATEGORIES).toHaveProperty('startup')
  })
})

describe('projectTools', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(projectTools)).toBe(true)
    expect(projectTools.length).toBeGreaterThan(0)
  })

  it('every tool has required fields', () => {
    for (const tool of projectTools) {
      expect(tool).toHaveProperty('slug')
      expect(tool).toHaveProperty('name')
      expect(tool).toHaveProperty('description')
      expect(tool).toHaveProperty('category')
      expect(typeof tool.slug).toBe('string')
      expect(typeof tool.name).toBe('string')
      expect(typeof tool.description).toBe('string')
      expect(Object.keys(TOOL_CATEGORIES)).toContain(tool.category)
    }
  })

  it('has unique slugs', () => {
    const slugs = projectTools.map((t) => t.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('getProjectTool', () => {
  it('returns a tool by slug', () => {
    const tool = getProjectTool('ai-roi-calculator')
    expect(tool).toBeDefined()
    expect(tool.name).toBe('AI ROI Calculator')
  })

  it('returns undefined for unknown slug', () => {
    expect(getProjectTool('nonexistent')).toBeUndefined()
  })
})

describe('getAllProjectToolSlugs', () => {
  it('returns an array of slug strings', () => {
    const slugs = getAllProjectToolSlugs()
    expect(Array.isArray(slugs)).toBe(true)
    expect(slugs.length).toBe(projectTools.length)
    for (const slug of slugs) {
      expect(typeof slug).toBe('string')
    }
  })
})
