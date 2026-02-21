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
  locale = 'en_US',
  ogTitle,
  keywords,
}) {
  const ogImage = getOgImage(ogTitle || title, description)
  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    openGraph: {
      title: `${ogTitle || title} - ${siteName}`,
      description,
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
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ogTitle || title} - ${siteName}`,
      description,
      images: [ogImage],
    },
  }
}

export function getFaviconUrl(url, logoDomain) {
  const domain = logoDomain || new URL(url).hostname.replace(/^www\./, '')
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}
