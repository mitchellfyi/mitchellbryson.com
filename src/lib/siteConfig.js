export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

export const siteName = 'Mitchell Bryson'

export function getOgImage(title, description, type = 'home') {
  return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=${type}`
}

export function buildMetadata({
  title,
  description,
  url,
  locale = 'en_GB',
  ogTitle,
  ogDescription,
  keywords,
  type = 'website',
}) {
  const ogImage = getOgImage(ogTitle || title, ogDescription || description)
  return {
    title,
    description,
    ...(keywords && { keywords }),
    authors: [{ name: siteName, url: `${siteUrl}/about` }],
    creator: siteName,
    alternates: { canonical: url },
    openGraph: {
      title: `${ogTitle || title} - ${siteName}`,
      description: ogDescription || description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${ogTitle || title} - ${siteName}`,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ogTitle || title} - ${siteName}`,
      description: ogDescription || description,
      images: [ogImage],
    },
  }
}

export function getFaviconUrl(url, logoDomain) {
  const domain = logoDomain || new URL(url).hostname.replace(/^www\./, '')
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}
