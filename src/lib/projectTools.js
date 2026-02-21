export const TOOL_CATEGORIES = {
  local: 'For local businesses',
  technical: 'For developers',
  startup: 'For startups',
}

export const projectTools = [
  {
    slug: 'ai-roi-calculator',
    name: 'AI ROI Calculator',
    description:
      'Input staff count, hours per week on a manual task, and average hourly cost to see projected annual savings from AI automation.',
    category: 'local',
    status: 'Coming soon',
    longDescription:
      'A simple, visceral calculator that shows the potential return on investment from automating a manual workflow with AI. Enter your team size, how many hours per week are spent on a repetitive task, and the average hourly cost of that work. The calculator projects annual savings, payback period, and time freed up for higher-value work. Designed for business owners considering AI automation but unsure of the numbers.',
  },
  {
    slug: 'ai-readiness-score',
    name: 'AI Readiness Score',
    description:
      'A 5-7 question quiz that assesses how ready your business is for AI and gives a personalised recommendation.',
    category: 'local',
    status: 'Coming soon',
    longDescription:
      "Answer a short set of questions about your data, processes, team, and goals. The tool generates a readiness score with a one-paragraph recommendation tailored to your situation — whether you should start with a quick win, invest in data foundations, or jump straight into an AI pilot. Useful for businesses that know AI is relevant but aren't sure where to begin.",
  },
  {
    slug: 'which-ai-integration',
    name: 'Which AI Integration Fits Your Business?',
    description:
      'An interactive quiz that matches your industry and pain points to the right AI integration type.',
    category: 'local',
    status: 'Coming soon',
    longDescription:
      'A branching questionnaire that asks about your industry, team size, biggest manual bottleneck, and data situation. Based on your answers, it recommends the most relevant AI integration type — chatbots, document processing, search, workflow automation, or others — and links directly to detailed information about that approach. Built on real integration data from working with businesses across South Yorkshire.',
  },
  {
    slug: 'llm-cost-calculator',
    name: 'LLM Cost Calculator',
    description:
      'Compare monthly costs across GPT-4o, Claude, Gemini, and open-source models based on your usage pattern.',
    category: 'technical',
    status: 'Coming soon',
    longDescription:
      'Input your expected tokens per request, requests per day, and select which models to compare. The calculator generates a monthly cost comparison table across major LLM providers — OpenAI GPT-4o, Anthropic Claude, Google Gemini, Mistral, and popular open-source options via Replicate and Together AI. Includes input vs output token breakdowns, batch pricing, and a shareable results link. Useful for architects and engineers choosing a model for production.',
  },
  {
    slug: 'rag-decision-tree',
    name: 'RAG Architecture Decision Tree',
    description:
      'An interactive flowchart that recommends vector DB, embedding model, and chunking strategy based on your requirements.',
    category: 'technical',
    status: 'Coming soon',
    longDescription:
      'Walk through a series of decisions about your retrieval-augmented generation setup: How much data? How fresh does it need to be? What accuracy threshold? What latency budget? The tool recommends a specific architecture — vector database (Pinecone, Weaviate, Qdrant, pgvector), embedding model, chunking strategy, and reranking approach. Each recommendation includes rationale and links to relevant documentation.',
  },
  {
    slug: 'ai-poc-scope-template',
    name: 'AI Proof of Concept Scope Template',
    description:
      'Fill in an interactive form to generate a one-page AI proof of concept scope document.',
    category: 'technical',
    status: 'Coming soon',
    longDescription:
      'An interactive form that guides you through scoping an AI proof of concept. Enter the problem statement, success metric, data source, timeline, and preferred tech stack. The tool generates a clean one-page scope document that you can share with stakeholders, use to brief engineers, or attach to a budget request. Designed to turn vague AI ambitions into concrete, time-boxed experiments.',
  },
  {
    slug: 'build-vs-buy-vs-ai',
    name: 'Build vs Buy vs AI Calculator',
    description:
      'Input feature complexity, team size, and timeline to get a recommendation on whether to build custom, buy SaaS, or automate with AI.',
    category: 'startup',
    status: 'Coming soon',
    longDescription:
      'A decision tool for product teams and founders facing the classic build-vs-buy question — with AI as a third option. Enter the feature complexity, your team size and skill set, timeline pressure, and budget constraints. The calculator weighs the trade-offs and recommends an approach with reasoning: build custom for full control, buy a SaaS tool for speed, or use AI to automate the workflow entirely. Includes cost and timeline estimates for each path.',
  },
  {
    slug: 'tech-stack-picker',
    name: 'Tech Stack Picker',
    description:
      "Describe what you're building plus your constraints, and get a recommended tech stack with rationale.",
    category: 'startup',
    status: 'Coming soon',
    longDescription:
      "Answer questions about what you're building (web app, API, mobile, AI product), your constraints (budget, team size, timeline, scale expectations), and your preferences (languages, hosting). The tool recommends a specific tech stack — framework, database, hosting, CI/CD, and AI layer — with a short rationale for each choice. Built on experience shipping products across Next.js, Rails, React, and various AI stacks.",
  },
]

export function getProjectTool(slug) {
  return projectTools.find((t) => t.slug === slug)
}

export function getAllProjectToolSlugs() {
  return projectTools.map((t) => t.slug)
}
