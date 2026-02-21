/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/barnsley', destination: '/barnsley-ai', permanent: true },
      { source: '/barnsley/ai-integrations', destination: '/barnsley-ai/ai-integrations', permanent: true },
      { source: '/barnsley/integration-types', destination: '/barnsley-ai/integration-types', permanent: true },
      { source: '/barnsley/business-types', destination: '/barnsley-ai/business-types', permanent: true },
      { source: '/barnsley/:slug*', destination: '/barnsley-ai/:slug*', permanent: true },
      { source: '/tools', destination: '/uses', permanent: true },
      { source: '/tools/:slug*', destination: '/uses/:slug*', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons',
      },
    ],
  },
}

export default nextConfig
