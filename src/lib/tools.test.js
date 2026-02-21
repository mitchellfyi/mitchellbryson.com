import { describe, it, expect } from 'vitest'
import {
  tools,
  CATEGORY_LABELS,
  TOOL_CATEGORIES,
  getTool,
  getAllToolSlugs,
} from './tools'

describe('CATEGORY_LABELS', () => {
  it('has expected category keys', () => {
    const keys = Object.keys(CATEGORY_LABELS)
    expect(keys).toContain('ai-coding')
    expect(keys).toContain('data')
    expect(keys).toContain('automation')
    expect(keys).toContain('productivity')
    expect(keys).toContain('hosting')
    expect(keys).toContain('infrastructure')
  })

  it('all values are non-empty strings', () => {
    Object.values(CATEGORY_LABELS).forEach((label) => {
      expect(typeof label).toBe('string')
      expect(label.length).toBeGreaterThan(0)
    })
  })
})

describe('TOOL_CATEGORIES', () => {
  it('first entry is "all"', () => {
    expect(TOOL_CATEGORIES[0]).toEqual({ id: 'all', label: 'All' })
  })

  it('remaining entries match CATEGORY_LABELS keys', () => {
    const remaining = TOOL_CATEGORIES.slice(1)
    const labelKeys = Object.keys(CATEGORY_LABELS)
    expect(remaining.map((c) => c.id)).toEqual(labelKeys)
  })
})

describe('tools', () => {
  it('is a non-empty array', () => {
    expect(tools.length).toBeGreaterThan(0)
  })

  it('every tool has required fields', () => {
    tools.forEach((tool) => {
      expect(typeof tool.name).toBe('string')
      expect(typeof tool.slug).toBe('string')
      expect(typeof tool.category).toBe('string')
      expect(typeof tool.description).toBe('string')
      expect(typeof tool.url).toBe('string')
      expect(typeof tool.content).toBe('string')
    })
  })

  it('has unique slugs', () => {
    const slugs = tools.map((t) => t.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all categories reference valid CATEGORY_LABELS keys', () => {
    const validKeys = Object.keys(CATEGORY_LABELS)
    tools.forEach((tool) => {
      expect(validKeys).toContain(tool.category)
    })
  })

  it('all URLs start with https', () => {
    tools.forEach((tool) => {
      expect(tool.url).toMatch(/^https:\/\//)
    })
  })
})

describe('getTool', () => {
  it('returns a tool by slug', () => {
    const tool = getTool('cursor')
    expect(tool).toBeDefined()
    expect(tool.name).toBe('Cursor')
  })

  it('returns undefined for unknown slug', () => {
    expect(getTool('nonexistent')).toBeUndefined()
  })
})

describe('getAllToolSlugs', () => {
  it('returns an array of strings', () => {
    const slugs = getAllToolSlugs()
    expect(Array.isArray(slugs)).toBe(true)
    slugs.forEach((s) => expect(typeof s).toBe('string'))
  })

  it('count matches tools array', () => {
    expect(getAllToolSlugs().length).toBe(tools.length)
  })
})
