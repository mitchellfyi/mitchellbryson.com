export function WebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PersonJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
