import { describe, it, expect } from 'vitest'
import { RELEVANT_TOOLS } from './relevantTools'

describe('RELEVANT_TOOLS', () => {
  it('is a non-empty object', () => {
    expect(typeof RELEVANT_TOOLS).toBe('object')
    expect(Object.keys(RELEVANT_TOOLS).length).toBeGreaterThan(0)
  })

  it('every entry is an array of tool recommendations', () => {
    for (const [slug, tools] of Object.entries(RELEVANT_TOOLS)) {
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBeGreaterThan(0)

      for (const tool of tools) {
        expect(tool).toHaveProperty('slug')
        expect(tool).toHaveProperty('reason')
        expect(typeof tool.slug).toBe('string')
        expect(typeof tool.reason).toBe('string')
        expect(tool.slug.length).toBeGreaterThan(0)
        expect(tool.reason.length).toBeGreaterThan(0)
      }
    }
  })

  it('includes expected page slugs', () => {
    expect(RELEVANT_TOOLS).toHaveProperty('chatbots-and-conversational-ai')
    expect(RELEVANT_TOOLS).toHaveProperty('search-and-retrieval')
    expect(RELEVANT_TOOLS).toHaveProperty('document-processing')
    expect(RELEVANT_TOOLS).toHaveProperty('workflow-automation')
  })

  it('recommendations reference valid tool slugs', () => {
    const validSlugs = [
      'ai-readiness-score',
      'ai-roi-calculator',
      'which-ai-integration',
      'llm-cost-calculator',
      'rag-decision-tree',
      'ai-poc-scope-template',
      'build-vs-buy-vs-ai',
      'tech-stack-picker',
    ]

    for (const tools of Object.values(RELEVANT_TOOLS)) {
      for (const tool of tools) {
        expect(validSlugs).toContain(tool.slug)
      }
    }
  })
})
