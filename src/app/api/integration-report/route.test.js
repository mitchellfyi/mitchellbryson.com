import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'Integration',
  routePath: '@/app/api/integration-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'Which AI Integration',
    permalink: 'https://example.com/tools/integration',
    recommended: {
      title: 'Chatbots and conversational AI',
      slug: 'chatbots-and-conversational-ai',
      description: 'Customer support and lead qualification',
    },
    alsoExplore: [
      {
        title: 'Search and retrieval',
        slug: 'search-and-retrieval',
        description: 'Semantic search over documents',
      },
    ],
  },
  htmlContains: ['Chatbots and conversational AI'],
  expectedSubjectContains: 'Chatbots',
})
