import { createReportRouteTests } from '@/test/reportRouteFactory'

createReportRouteTests({
  name: 'RAG Architecture',
  routePath: '@/app/api/rag-report/route',
  requestBody: {
    email: 'test@example.com',
    toolName: 'RAG Decision Tree',
    permalink: 'https://example.com/tools/rag',
    results: [
      {
        category: 'Vector DB',
        name: 'Pinecone',
        description: 'Managed vector database',
        rationale: 'Good for production workloads',
      },
      {
        category: 'Embedding',
        name: 'OpenAI Ada',
        description: 'Text embedding model',
        rationale: 'Cost-effective embeddings',
      },
    ],
    suggestedTools: [],
  },
  htmlContains: ['Pinecone'],
  expectedSubjectContains: 'Pinecone',
})
