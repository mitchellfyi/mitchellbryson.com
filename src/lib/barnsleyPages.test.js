import { describe, it, expect } from 'vitest'
import {
  aiIntegrations,
  businessTypes,
  allBarnsleyPages,
  getBarnsleyPage,
  integrationSlug,
  getAllIntegrationsWithPages,
  getIntegrationBySlug,
  getAllIntegrationSlugs,
  getRandomIntegrations,
  getRandomItems,
  getContextForPage,
  integrationFilterCategories,
} from './barnsleyPages'

describe('integrationSlug', () => {
  it('converts spaces to hyphens and lowercases', () => {
    expect(integrationSlug('Vercel AI SDK')).toBe('vercel-ai-sdk')
  })

  it('strips leading and trailing hyphens', () => {
    expect(integrationSlug('.Dotted Name.')).toBe('dotted-name')
  })

  it('replaces non-alphanumeric chars with hyphens', () => {
    expect(integrationSlug('Copy.ai')).toBe('copy-ai')
  })

  it('handles empty string', () => {
    expect(integrationSlug('')).toBe('')
  })

  it('collapses consecutive special chars into single hyphen', () => {
    expect(integrationSlug('a   b')).toBe('a-b')
  })
})

describe('getBarnsleyPage', () => {
  it('returns a page for a valid slug', () => {
    const page = getBarnsleyPage('chatbots-and-conversational-ai')
    expect(page).toBeDefined()
    expect(page.slug).toBe('chatbots-and-conversational-ai')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getBarnsleyPage('nonexistent-page')).toBeUndefined()
  })

  it('returns page with expected shape', () => {
    const page = getBarnsleyPage('search-and-retrieval')
    expect(page).toHaveProperty('slug')
    expect(page).toHaveProperty('title')
    expect(page).toHaveProperty('description')
    expect(page).toHaveProperty('content')
    expect(page).toHaveProperty('category')
    expect(page).toHaveProperty('faqs')
    expect(page).toHaveProperty('integrations')
  })
})

describe('getAllIntegrationsWithPages', () => {
  it('returns a non-empty array', () => {
    const integrations = getAllIntegrationsWithPages()
    expect(integrations.length).toBeGreaterThan(0)
  })

  it('each integration has the correct shape', () => {
    const integrations = getAllIntegrationsWithPages()
    for (const i of integrations) {
      expect(i).toHaveProperty('slug')
      expect(i).toHaveProperty('name')
      expect(i).toHaveProperty('url')
      expect(i).toHaveProperty('description')
      expect(i).toHaveProperty('pages')
      expect(Array.isArray(i.pages)).toBe(true)
      expect(i.pages.length).toBeGreaterThan(0)
    }
  })

  it('is sorted alphabetically by name', () => {
    const integrations = getAllIntegrationsWithPages()
    for (let i = 1; i < integrations.length; i++) {
      expect(
        integrations[i - 1].name.localeCompare(integrations[i].name),
      ).toBeLessThanOrEqual(0)
    }
  })

  it('deduplicates integrations by URL', () => {
    const integrations = getAllIntegrationsWithPages()
    const urls = integrations.map((i) => i.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('merges page refs for integrations appearing on multiple pages', () => {
    // LangChain appears on workflow-automation, data-pipelines, and b2b-saas
    const langchain = getAllIntegrationsWithPages().find(
      (i) => i.name === 'LangChain',
    )
    expect(langchain).toBeDefined()
    expect(langchain.pages.length).toBeGreaterThan(1)
  })

  it('Unstructured.io appears once despite being on multiple pages', () => {
    const unstructured = getAllIntegrationsWithPages().filter(
      (i) => i.name === 'Unstructured.io',
    )
    expect(unstructured).toHaveLength(1)
    expect(unstructured[0].pages.length).toBeGreaterThan(1)
  })
})

describe('getIntegrationBySlug', () => {
  it('returns an integration for a valid slug', () => {
    const integration = getIntegrationBySlug('langchain')
    expect(integration).toBeDefined()
    expect(integration.name).toBe('LangChain')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getIntegrationBySlug('nonexistent')).toBeUndefined()
  })
})

describe('getAllIntegrationSlugs', () => {
  it('returns an array of strings', () => {
    const slugs = getAllIntegrationSlugs()
    expect(Array.isArray(slugs)).toBe(true)
    slugs.forEach((s) => expect(typeof s).toBe('string'))
  })

  it('all slugs are unique', () => {
    const slugs = getAllIntegrationSlugs()
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('count matches getAllIntegrationsWithPages', () => {
    expect(getAllIntegrationSlugs().length).toBe(
      getAllIntegrationsWithPages().length,
    )
  })
})

describe('getRandomIntegrations', () => {
  it('returns the requested count', () => {
    const result = getRandomIntegrations(3)
    expect(result).toHaveLength(3)
  })

  it('returns fewer when n exceeds total', () => {
    const total = getAllIntegrationsWithPages().length
    const result = getRandomIntegrations(total + 10)
    expect(result.length).toBeLessThanOrEqual(total)
  })

  it('returns empty array for n=0', () => {
    expect(getRandomIntegrations(0)).toHaveLength(0)
  })

  it('returns items from the integrations list', () => {
    const all = getAllIntegrationsWithPages()
    const allNames = new Set(all.map((i) => i.name))
    const result = getRandomIntegrations(5)
    result.forEach((r) => expect(allNames.has(r.name)).toBe(true))
  })
})

describe('getRandomItems', () => {
  it('returns the requested count from a given array', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(getRandomItems(arr, 3)).toHaveLength(3)
  })

  it('returns empty for n=0', () => {
    expect(getRandomItems([1, 2, 3], 0)).toHaveLength(0)
  })
})

describe('getContextForPage', () => {
  it('returns a context sentence for a valid integration+page combo', () => {
    const ctx = getContextForPage('Voiceflow', 'chatbots-and-conversational-ai')
    expect(typeof ctx).toBe('string')
    expect(ctx.length).toBeGreaterThan(0)
  })

  it('returns null for an unknown page slug', () => {
    expect(getContextForPage('Voiceflow', 'nonexistent')).toBeNull()
  })

  it('returns null for an unknown integration name on a valid page', () => {
    expect(
      getContextForPage('FakeIntegration', 'chatbots-and-conversational-ai'),
    ).toBeNull()
  })
})

describe('data integrity', () => {
  it('allBarnsleyPages contains all AI and business pages', () => {
    expect(allBarnsleyPages.length).toBe(
      aiIntegrations.length + businessTypes.length,
    )
  })

  it('all pages have required fields', () => {
    for (const page of allBarnsleyPages) {
      expect(page.slug).toBeTruthy()
      expect(page.title).toBeTruthy()
      expect(page.description).toBeTruthy()
      expect(page.content).toBeTruthy()
      expect(['ai', 'businesses']).toContain(page.category)
      expect(Array.isArray(page.faqs)).toBe(true)
      expect(Array.isArray(page.integrations)).toBe(true)
      expect(page.integrations.length).toBeGreaterThan(0)
    }
  })

  it('all pages have unique slugs', () => {
    const slugs = allBarnsleyPages.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('AI pages have category "ai"', () => {
    aiIntegrations.forEach((p) => expect(p.category).toBe('ai'))
  })

  it('business pages have category "businesses"', () => {
    businessTypes.forEach((p) => expect(p.category).toBe('businesses'))
  })

  it('integrationFilterCategories has two groups', () => {
    expect(integrationFilterCategories).toHaveLength(2)
    expect(integrationFilterCategories[0].group).toBe('AI integration types')
    expect(integrationFilterCategories[1].group).toBe('Business types')
  })

  it('integrationFilterCategories options match page counts', () => {
    expect(integrationFilterCategories[0].options).toHaveLength(
      aiIntegrations.length,
    )
    expect(integrationFilterCategories[1].options).toHaveLength(
      businessTypes.length,
    )
  })
})
