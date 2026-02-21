import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'Readiness',
  routePath: '@/app/api/readiness-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'AI Readiness Score',
    permalink: 'https://example.com/tools/readiness',
    totalScore: 14,
    tierLabel: 'Ready to scale',
    tierColor: 'emerald',
    recommendation: 'Your business is well-positioned for AI.',
    nextSteps: ['Identify a pilot project', 'Set up data pipelines'],
    todos: [{ category: 'Data', text: 'Audit existing datasets' }],
    categories: [
      { label: 'Data', score: 3 },
      { label: 'Team', score: 2 },
      { label: 'Process', score: 3 },
    ],
  },
  htmlContains: ['14', 'Ready to scale'],
  expectedSubjectContains: '14',
})
