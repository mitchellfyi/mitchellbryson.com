const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

export const metadata = {
  title: 'Contact',
  description:
    "Get in touch with me at website@mitchellbryson.com. I'd love to hear from you.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
}

export default function ContactLayout({ children }) {
  return children
}
