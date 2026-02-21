import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  WebSiteJsonLd,
  ProfilePageJsonLd,
  PersonJsonLd,
  ArticleJsonLd,
  SoftwareApplicationJsonLd,
  CollectionPageJsonLd,
  FAQPageJsonLd,
  PlaceJsonLd,
  LocalBusinessJsonLd,
  BreadcrumbJsonLd,
} from './JsonLd'

function getJsonLd(container) {
  const script = container.querySelector('script[type="application/ld+json"]')
  return JSON.parse(script.textContent)
}

describe('WebSiteJsonLd', () => {
  it('has @type WebSite', () => {
    const { container } = render(<WebSiteJsonLd />)
    expect(getJsonLd(container)['@type']).toBe('WebSite')
  })

  it('includes url', () => {
    const { container } = render(<WebSiteJsonLd />)
    expect(getJsonLd(container).url).toBe('http://localhost:3000')
  })

  it('includes author.name', () => {
    const { container } = render(<WebSiteJsonLd />)
    expect(getJsonLd(container).author.name).toBe('Mitchell Bryson')
  })
})

describe('ProfilePageJsonLd', () => {
  it('has @type ProfilePage', () => {
    const { container } = render(<ProfilePageJsonLd />)
    expect(getJsonLd(container)['@type']).toBe('ProfilePage')
  })

  it('mainEntity is a Person', () => {
    const { container } = render(<ProfilePageJsonLd />)
    expect(getJsonLd(container).mainEntity['@type']).toBe('Person')
  })

  it('includes sameAs array', () => {
    const { container } = render(<ProfilePageJsonLd />)
    const data = getJsonLd(container)
    expect(Array.isArray(data.mainEntity.sameAs)).toBe(true)
    expect(data.mainEntity.sameAs.length).toBeGreaterThan(0)
  })
})

describe('PersonJsonLd', () => {
  it('has @type Person', () => {
    const { container } = render(<PersonJsonLd />)
    expect(getJsonLd(container)['@type']).toBe('Person')
  })

  it('includes sameAs array', () => {
    const { container } = render(<PersonJsonLd />)
    const data = getJsonLd(container)
    expect(Array.isArray(data.sameAs)).toBe(true)
    expect(data.sameAs.length).toBeGreaterThan(0)
  })
})

describe('ArticleJsonLd', () => {
  const article = {
    title: 'Test Article',
    description: 'A test',
    slug: 'test-article',
    date: '2024-01-01',
  }

  it('has @type Article', () => {
    const { container } = render(<ArticleJsonLd article={article} />)
    expect(getJsonLd(container)['@type']).toBe('Article')
  })

  it('sets headline from article title', () => {
    const { container } = render(<ArticleJsonLd article={article} />)
    expect(getJsonLd(container).headline).toBe('Test Article')
  })

  it('uses fallback url from slug when no url prop', () => {
    const { container } = render(<ArticleJsonLd article={article} />)
    expect(getJsonLd(container).url).toBe(
      'http://localhost:3000/articles/test-article',
    )
  })

  it('uses url prop when provided', () => {
    const { container } = render(
      <ArticleJsonLd article={article} url="/custom" />,
    )
    expect(getJsonLd(container).url).toBe('/custom')
  })

  it('uses coverImage when provided', () => {
    const withCover = { ...article, coverImage: '/images/cover.jpg' }
    const { container } = render(<ArticleJsonLd article={withCover} />)
    expect(getJsonLd(container).image).toBe(
      'http://localhost:3000/images/cover.jpg',
    )
  })

  it('falls back to OG image when no coverImage', () => {
    const { container } = render(<ArticleJsonLd article={article} />)
    expect(getJsonLd(container).image).toContain('/api/og?')
  })
})

describe('SoftwareApplicationJsonLd', () => {
  const props = {
    name: 'TestApp',
    description: 'A test app',
    url: 'https://example.com',
  }

  it('maps props correctly', () => {
    const { container } = render(<SoftwareApplicationJsonLd {...props} />)
    const data = getJsonLd(container)
    expect(data['@type']).toBe('SoftwareApplication')
    expect(data.name).toBe('TestApp')
    expect(data.description).toBe('A test app')
  })

  it('offers has price 0', () => {
    const { container } = render(<SoftwareApplicationJsonLd {...props} />)
    expect(getJsonLd(container).offers.price).toBe('0')
  })
})

describe('CollectionPageJsonLd', () => {
  const props = {
    name: 'Articles',
    description: 'All articles',
    url: '/articles',
  }

  it('maps props correctly', () => {
    const { container } = render(<CollectionPageJsonLd {...props} />)
    const data = getJsonLd(container)
    expect(data['@type']).toBe('CollectionPage')
    expect(data.name).toBe('Articles')
  })

  it('isPartOf is a WebSite', () => {
    const { container } = render(<CollectionPageJsonLd {...props} />)
    expect(getJsonLd(container).isPartOf['@type']).toBe('WebSite')
  })
})

describe('FAQPageJsonLd', () => {
  it('returns null for empty faqs', () => {
    const { container } = render(<FAQPageJsonLd faqs={[]} />)
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toBeNull()
  })

  it('returns null for undefined faqs', () => {
    const { container } = render(<FAQPageJsonLd />)
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toBeNull()
  })

  it('has @type FAQPage', () => {
    const faqs = [{ question: 'Q1?', answer: 'A1' }]
    const { container } = render(<FAQPageJsonLd faqs={faqs} />)
    expect(getJsonLd(container)['@type']).toBe('FAQPage')
  })

  it('question count matches input', () => {
    const faqs = [
      { question: 'Q1?', answer: 'A1' },
      { question: 'Q2?', answer: 'A2' },
      { question: 'Q3?', answer: 'A3' },
    ]
    const { container } = render(<FAQPageJsonLd faqs={faqs} />)
    expect(getJsonLd(container).mainEntity).toHaveLength(3)
  })

  it('answer text is correct', () => {
    const faqs = [{ question: 'What?', answer: 'This answer' }]
    const { container } = render(<FAQPageJsonLd faqs={faqs} />)
    const data = getJsonLd(container)
    expect(data.mainEntity[0].acceptedAnswer.text).toBe('This answer')
  })
})

describe('PlaceJsonLd', () => {
  const props = {
    name: 'Office',
    description: 'Main office',
    url: '/office',
    locality: 'London',
    region: 'England',
    country: 'GB',
  }

  it('has @type Place', () => {
    const { container } = render(<PlaceJsonLd {...props} />)
    expect(getJsonLd(container)['@type']).toBe('Place')
  })

  it('maps address fields correctly', () => {
    const { container } = render(<PlaceJsonLd {...props} />)
    const address = getJsonLd(container).address
    expect(address.addressLocality).toBe('London')
    expect(address.addressRegion).toBe('England')
    expect(address.addressCountry).toBe('GB')
  })

  it('address has PostalAddress type', () => {
    const { container } = render(<PlaceJsonLd {...props} />)
    expect(getJsonLd(container).address['@type']).toBe('PostalAddress')
  })
})

describe('LocalBusinessJsonLd', () => {
  it('has @type ProfessionalService', () => {
    const { container } = render(<LocalBusinessJsonLd />)
    expect(getJsonLd(container)['@type']).toBe('ProfessionalService')
  })

  it('includes address with Barnsley locality', () => {
    const { container } = render(<LocalBusinessJsonLd />)
    const address = getJsonLd(container).address
    expect(address['@type']).toBe('PostalAddress')
    expect(address.addressLocality).toBe('Barnsley')
    expect(address.addressCountry).toBe('GB')
  })

  it('includes areaServed with multiple towns', () => {
    const { container } = render(<LocalBusinessJsonLd />)
    const areas = getJsonLd(container).areaServed
    expect(Array.isArray(areas)).toBe(true)
    expect(areas).toContain('Barnsley')
    expect(areas).toContain('Sheffield')
    expect(areas.length).toBeGreaterThanOrEqual(7)
  })

  it('includes hasOfferCatalog with services', () => {
    const { container } = render(<LocalBusinessJsonLd />)
    const catalog = getJsonLd(container).hasOfferCatalog
    expect(catalog['@type']).toBe('OfferCatalog')
    expect(catalog.itemListElement.length).toBeGreaterThan(0)
  })

  it('includes sameAs array', () => {
    const { container } = render(<LocalBusinessJsonLd />)
    const data = getJsonLd(container)
    expect(Array.isArray(data.sameAs)).toBe(true)
    expect(data.sameAs.length).toBe(2)
  })
})

describe('BreadcrumbJsonLd', () => {
  const items = [
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
    { name: 'Post', url: '/articles/post' },
  ]

  it('has @type BreadcrumbList', () => {
    const { container } = render(<BreadcrumbJsonLd items={items} />)
    expect(getJsonLd(container)['@type']).toBe('BreadcrumbList')
  })

  it('list length matches items', () => {
    const { container } = render(<BreadcrumbJsonLd items={items} />)
    expect(getJsonLd(container).itemListElement).toHaveLength(3)
  })

  it('positions are 1-based', () => {
    const { container } = render(<BreadcrumbJsonLd items={items} />)
    const elements = getJsonLd(container).itemListElement
    expect(elements[0].position).toBe(1)
    expect(elements[1].position).toBe(2)
    expect(elements[2].position).toBe(3)
  })
})
