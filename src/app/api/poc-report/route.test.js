import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'PoC Scope',
  routePath: '@/app/api/poc-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'AI PoC Scope Template',
    permalink: 'https://example.com/tools/poc',
    sections: [
      { label: 'Problem', value: 'Manual data entry takes too long' },
      { label: 'Solution', value: 'AI-powered document extraction' },
    ],
    checklist: ['Define success criteria', 'Gather sample data'],
  },
  htmlContains: ['Problem', 'Manual data entry takes too long'],
  expectedSubjectContains: 'PoC Scope',
})
