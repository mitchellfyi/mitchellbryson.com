import { siteUrl } from '@/lib/siteConfig'

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mitchell Bryson',
    url: siteUrl,
    description:
      "I'm Mitchell, an AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.",
    author: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/articles?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ProfilePageJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: siteUrl,
      image: `${siteUrl}/api/og?title=${encodeURIComponent('Mitchell Bryson')}&description=${encodeURIComponent('AI Software Engineer')}&type=home`,
      jobTitle: 'AI Software Engineer',
      description:
        "Full-stack AI Software Engineer. I build engaging products and practical systems that ship fast and create measurable value.",
      sameAs: [
        'https://github.com/mitchellfyi',
        'https://www.linkedin.com/in/mitchellfyi',
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Large Language Models',
        'Next.js',
        'React',
        'Ruby on Rails',
        'Product Development',
        'AI Agents',
        'Workflow Automation',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mitchell Bryson',
    url: siteUrl,
    image: `${siteUrl}/api/og?title=${encodeURIComponent('Mitchell Bryson')}&description=${encodeURIComponent('AI Software Engineer')}&type=home`,
    jobTitle: 'AI Software Engineer',
    description:
      "I'm Mitchell Bryson, a full-stack AI Software Engineer. I build engaging products and practical systems that ship fast and create measurable value.",
    sameAs: [
      'https://github.com/mitchellfyi',
      'https://www.linkedin.com/in/mitchellfyi',
    ],
    email: 'website@mitchellbryson.com',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ArticleJsonLd({ article }) {
  const articleUrl = `${siteUrl}/articles/${article.slug}`
  const imageUrl = article.coverImage
    ? `${siteUrl}${article.coverImage}`
    : `${siteUrl}/api/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description || '')}&type=article`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: articleUrl,
    image: imageUrl,
    inLanguage: 'en',
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Mitchell Bryson',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: siteUrl,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="headline"]', '[data-speakable="description"]'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
