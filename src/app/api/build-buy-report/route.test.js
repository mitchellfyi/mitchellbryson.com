import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'Build vs Buy',
  routePath: '@/app/api/build-buy-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'Build vs Buy vs AI',
    permalink: 'https://example.com/tools/build-buy',
    winner: 'ai',
    primary: { label: 'AI-Augmented', summary: 'AI is the best approach.' },
    allEstimates: {
      build: {
        label: 'Build',
        estimates: {
          cost: '£50k',
          timeline: '6 months',
          maintenance: '£10k/yr',
        },
      },
      buy: {
        label: 'Buy',
        estimates: {
          cost: '£20k',
          timeline: '2 months',
          maintenance: '£5k/yr',
        },
      },
      ai: {
        label: 'AI-Augmented',
        estimates: { cost: '£15k', timeline: '1 month', maintenance: '£3k/yr' },
      },
    },
    suggestedTools: [],
  },
  htmlContains: ['AI-Augmented'],
  expectedSubjectContains: 'AI-Augmented',
})
