import { siteUrl } from '@/lib/siteConfig'

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mitchell Bryson',
    url: siteUrl,
    description:
      "I'm Mitchell, a full-stack AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.",
    author: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: `${siteUrl}/about`,
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
      image: `${siteUrl}/api/og?title=${encodeURIComponent('Mitchell Bryson')}&description=${encodeURIComponent('Full-stack AI Software Engineer')}&type=home`,
      jobTitle: 'Full-stack AI Software Engineer',
      description:
        'Full-stack AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.',
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
    image: `${siteUrl}/api/og?title=${encodeURIComponent('Mitchell Bryson')}&description=${encodeURIComponent('Full-stack AI Software Engineer')}&type=home`,
    jobTitle: 'Full-stack AI Software Engineer',
    description:
      "I'm Mitchell Bryson, a full-stack AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.",
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

export function ArticleJsonLd({ article, url }) {
  const articleUrl = url || `${siteUrl}/articles/${article.slug}`
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
    dateModified: article.modifiedDate || article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Mitchell Bryson',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: `${siteUrl}/about`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '[data-speakable="headline"]',
        '[data-speakable="description"]',
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

export function NewsArticleJsonLd({ article, url }) {
  const articleUrl = url || `${siteUrl}/news/${article.slug}`
  const imageUrl = article.ogImage
    ? `${siteUrl}${article.ogImage}`
    : `${siteUrl}/api/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description || '')}&type=article`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    url: articleUrl,
    image: imageUrl,
    inLanguage: 'en',
    datePublished: article.date,
    dateModified: article.modifiedDate || article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Mitchell Bryson',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: `${siteUrl}/about`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '[data-speakable="headline"]',
        '[data-speakable="description"]',
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

export function SoftwareApplicationJsonLd({ name, description, url }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'DeveloperApplication',
    author: {
      '@type': 'Person',
      name: 'Mitchell Bryson',
      url: `${siteUrl}/about`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function CollectionPageJsonLd({ name, description, url }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mitchell Bryson',
      url: siteUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function FAQPageJsonLd({ faqs }) {
  if (!faqs || faqs.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PlaceJsonLd({
  name,
  description,
  url,
  locality,
  region,
  country,
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    description,
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressRegion: region,
      addressCountry: country,
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
