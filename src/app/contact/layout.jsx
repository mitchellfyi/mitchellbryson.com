const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'
const defaultOgImage = `${siteUrl}/api/og?title=${encodeURIComponent('Contact')}&description=${encodeURIComponent("Get in touch with Mitchell Bryson.")}&type=article`

export const metadata = {
  title: 'Contact',
  description:
    "Get in touch with me at website@mitchellbryson.com. I'd love to hear from you.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact - Mitchell Bryson',
    description:
      "Get in touch with me at website@mitchellbryson.com. I'd love to hear from you.",
    url: `${siteUrl}/contact`,
    siteName: 'Mitchell Bryson',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Contact - Mitchell Bryson',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Mitchell Bryson',
    description:
      "Get in touch with me at website@mitchellbryson.com. I'd love to hear from you.",
    images: [defaultOgImage],
  },
}

export default function ContactLayout({ children }) {
  return children
}
