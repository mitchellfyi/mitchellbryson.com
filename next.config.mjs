/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/barnsley', destination: '/barnsley-ai', permanent: true },
      {
        source: '/barnsley/ai-integrations',
        destination: '/barnsley-ai/ai-integrations',
        permanent: true,
      },
      {
        source: '/barnsley/integration-types',
        destination: '/barnsley-ai/integration-types',
        permanent: true,
      },
      {
        source: '/barnsley/business-types',
        destination: '/barnsley-ai/business-types',
        permanent: true,
      },
      {
        source: '/barnsley/:slug*',
        destination: '/barnsley-ai/:slug*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
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
