import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'ROI',
  routePath: '@/app/api/roi-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'AI ROI Calculator',
    permalink: 'https://example.com/tools/roi',
    annualSavings: '£48,000',
    currentAnnualCost: '£120,000',
    hoursFreed: '960',
    hoursPerWeek: '20 hrs/week',
    paybackPeriod: '4 months',
    implementationCost: '£15,000',
    threeYearNet: '£129,000',
    threeYearBreaksEven: true,
  },
  htmlContains: ['£48,000', '4 months', '960'],
  expectedSubjectContains: '£48,000',
})
