import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'LLM Cost',
  routePath: '@/app/api/llm-cost-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'LLM Cost Calculator',
    permalink: 'https://example.com/tools/llm-cost',
    cheapestModel: 'Claude Haiku',
    cheapestProvider: 'Anthropic',
    cheapestMonthly: '$12.50',
    inputTokens: 1000,
    outputTokens: 500,
    requestsPerDay: 100,
    costs: [
      {
        name: 'Claude Haiku',
        provider: 'Anthropic',
        perRequest: '$0.0004',
        daily: '$0.04',
        monthly: '$12.50',
      },
    ],
  },
  htmlContains: ['Claude Haiku'],
  expectedSubjectContains: 'Claude Haiku',
})
