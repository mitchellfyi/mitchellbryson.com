// Maps barnsley-ai page slugs to relevant tool recommendations
export const RELEVANT_TOOLS = {
  // AI integration types
  'chatbots-and-conversational-ai': [
    { slug: 'which-ai-integration', reason: 'Find the best AI integration for your business' },
    { slug: 'ai-readiness-score', reason: 'Check if your business is ready for a chatbot' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of automating customer support' },
  ],
  'search-and-retrieval': [
    { slug: 'rag-decision-tree', reason: 'Choose the right vector DB, embeddings, and chunking strategy' },
    { slug: 'llm-cost-calculator', reason: 'Compare model costs for your search pipeline' },
    { slug: 'tech-stack-picker', reason: 'Get a full stack recommendation for your AI search product' },
  ],
  'document-processing': [
    { slug: 'which-ai-integration', reason: 'Find the best AI approach for your documents' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a proof of concept for document automation' },
    { slug: 'ai-roi-calculator', reason: 'Calculate the savings from automating document processing' },
  ],
  'workflow-automation': [
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build, buy, or automate with AI' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of automating this workflow' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for your workflows' },
  ],
  'data-pipelines-and-analytics': [
    { slug: 'rag-decision-tree', reason: 'Choose the right architecture for your data pipeline' },
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your analytics platform' },
    { slug: 'llm-cost-calculator', reason: 'Estimate ongoing API costs for AI-powered analytics' },
  ],
  'custom-product-features': [
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build, buy, or use AI for your feature' },
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your AI product' },
    { slug: 'llm-cost-calculator', reason: 'Compare model costs for your product feature' },
  ],
  'computer-vision-and-image-ai': [
    { slug: 'ai-poc-scope-template', reason: 'Scope a proof of concept for computer vision' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build or buy your vision solution' },
    { slug: 'ai-readiness-score', reason: 'Check if your data and team are ready for computer vision' },
  ],
  'voice-and-speech-ai': [
    { slug: 'which-ai-integration', reason: 'Find the right AI approach for voice and speech' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a proof of concept for voice AI' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of automating voice workflows' },
  ],
  'predictive-analytics-and-forecasting': [
    { slug: 'ai-readiness-score', reason: 'Check if your data is ready for predictive analytics' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a forecasting proof of concept' },
    { slug: 'tech-stack-picker', reason: 'Get a recommended stack for your ML pipeline' },
  ],
  // Business types
  'manufacturing-and-engineering': [
    { slug: 'ai-readiness-score', reason: 'Assess your factory or workshop\'s readiness for AI' },
    { slug: 'ai-roi-calculator', reason: 'Calculate savings from automating manual processes' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for manufacturing' },
  ],
  'professional-services': [
    { slug: 'ai-roi-calculator', reason: 'Estimate the value of automating billable admin work' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for your practice' },
    { slug: 'ai-readiness-score', reason: 'Check if your firm is ready for AI' },
  ],
  'e-commerce-and-retail': [
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for your shop or store' },
    { slug: 'ai-roi-calculator', reason: 'Estimate the ROI of AI-powered customer service' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build or buy your e-commerce AI' },
  ],
  'b2b-saas-and-tech': [
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your SaaS product' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build, buy, or automate with AI' },
    { slug: 'llm-cost-calculator', reason: 'Compare model costs for your AI features' },
  ],
  'startups-and-scale-ups': [
    { slug: 'tech-stack-picker', reason: 'Get a recommended tech stack for your startup' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide the fastest path to your MVP' },
    { slug: 'ai-poc-scope-template', reason: 'Scope your first AI proof of concept' },
  ],
  'agencies-and-service-providers': [
    { slug: 'ai-roi-calculator', reason: 'Estimate the value of automating client delivery' },
    { slug: 'which-ai-integration', reason: 'Find AI tools to offer as part of your services' },
    { slug: 'build-vs-buy-vs-ai', reason: 'Decide whether to build or resell AI solutions' },
  ],
  'healthcare-and-life-sciences': [
    { slug: 'ai-readiness-score', reason: 'Assess your organisation\'s readiness for healthcare AI' },
    { slug: 'ai-poc-scope-template', reason: 'Scope a compliant AI proof of concept' },
    { slug: 'ai-roi-calculator', reason: 'Estimate savings from automating clinical admin' },
  ],
  'logistics-and-supply-chain': [
    { slug: 'ai-readiness-score', reason: 'Check if your operations are ready for AI' },
    { slug: 'ai-roi-calculator', reason: 'Calculate the ROI of automating logistics workflows' },
    { slug: 'which-ai-integration', reason: 'Find the right AI approach for supply chain' },
  ],
  'education-and-training': [
    { slug: 'ai-readiness-score', reason: 'Assess your institution\'s readiness for AI' },
    { slug: 'which-ai-integration', reason: 'Find the right AI integration for education' },
    { slug: 'ai-poc-scope-template', reason: 'Scope an AI pilot for your learning platform' },
  ],
}
