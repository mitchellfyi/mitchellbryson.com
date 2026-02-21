import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'Tech Stack',
  routePath: '@/app/api/stack-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'Tech Stack Picker',
    permalink: 'https://example.com/tools/stack',
    results: [
      {
        category: 'Framework',
        name: 'Next.js',
        rationale: 'Full-stack React framework',
        siteLink: '/uses#nextjs',
        docs: 'https://nextjs.org/docs',
      },
      {
        category: 'Database',
        name: 'Supabase',
        rationale: 'Hosted Postgres with auth',
        siteLink: '/uses#supabase',
        docs: 'https://supabase.com/docs',
      },
    ],
  },
  htmlContains: ['Next.js'],
  expectedSubjectContains: 'Tech Stack',
})
