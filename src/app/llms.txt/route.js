import { getAllArticles } from '@/lib/articles'
import { getAllNews } from '@/lib/news'
import { tools } from '@/lib/tools'

import { siteUrl } from '@/lib/siteConfig'

export async function GET() {
  const articles = await getAllArticles()
  const news = (await getAllNews()).filter((item) => item.type !== 'links')

  const articleList = articles
    .map(
      (a) => `- [${a.title}](${siteUrl}/articles/${a.slug}): ${a.description}`,
    )
    .join('\n')

  const toolCategories = [...new Set(tools.map((t) => t.category))]
  const toolList = toolCategories
    .map((cat) => {
      const catTools = tools.filter((t) => t.category === cat)
      return catTools
        .map(
          (t) => `- [${t.name}](${siteUrl}/uses/${t.slug}): ${t.description}`,
        )
        .join('\n')
    })
    .join('\n')

  const newsList = news
    .map(
      (n) =>
        `- [${n.title}](${siteUrl}/news/${n.slug}): ${n.description || ''}`,
    )
    .join('\n')

  const content = `# Mitchell Bryson

> Full-stack AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.

## About

Mitchell Bryson is a full-stack AI Software Engineer based in Barnsley, South Yorkshire, UK. He designs, develops and ships practical AI systems that cut manual work and improve margins. He has been making websites and apps since 2000.

Specialities: product strategy, modern web stacks (Next.js, React, Rails, Tailwind), and applied AI (LLMs in real SaaS workflows — search, support, data/ops).

- Website: ${siteUrl}
- GitHub: https://github.com/mitchellfyi
- LinkedIn: https://www.linkedin.com/in/mitchellfyi
- Email: website@mitchellbryson.com

## Expertise

- **Applied AI**: Integrating LLMs into SaaS workflows — search, support, document processing, data pipelines, and workflow automation. Building AI agents that handle real business tasks with human oversight.
- **Product engineering**: End-to-end product development from strategy to shipped software. Next.js, React, Ruby on Rails, Tailwind CSS. Full-stack with a bias toward shipping.
- **AI for UK businesses**: AI consulting and development for businesses in Barnsley, South Yorkshire, and across the UK. Specialising in practical AI that cuts manual work and improves margins for manufacturing, professional services, e-commerce, SaaS, healthcare, logistics, and education.
- **AI agent systems**: Multi-agent orchestration, tool-calling agents, RAG pipelines, and autonomous workflows. Experience with LangChain, CrewAI, Vercel AI SDK, and direct model APIs (OpenAI, Anthropic, open-source).
- **Computer vision & voice AI**: Visual inspection, defect detection, speech-to-text, and voice assistants for hands-free and industrial environments.
- **Data pipelines**: LLM-powered data cleaning, enrichment, and analytics from messy or unstructured sources.

## Frequently asked questions

Q: Who is Mitchell Bryson?
A: Mitchell Bryson is a full-stack AI Software Engineer based in Barnsley, South Yorkshire, UK. He builds practical AI systems for businesses — from chatbots and document processing to workflow automation and predictive analytics. He has been building websites and apps since 2000.

Q: What AI services does Mitchell Bryson offer?
A: Mitchell builds AI-powered chatbots, semantic search, document processing pipelines, workflow automation agents, computer vision systems, voice AI, predictive analytics, and custom AI product features. He works with businesses across the UK, with a focus on South Yorkshire.

Q: Is there an AI developer in Barnsley, South Yorkshire?
A: Yes. Mitchell Bryson is a Full-stack AI Software Engineer based in Barnsley, South Yorkshire. He works with local businesses on practical AI implementations — manufacturing, professional services, e-commerce, SaaS, healthcare, logistics, and education.

Q: What technology stack does Mitchell Bryson use?
A: Next.js, React, Ruby on Rails, Tailwind CSS for web development. For AI: OpenAI, Anthropic Claude, LangChain, Vercel AI SDK, vector databases (Pinecone, Weaviate, Qdrant), and open-source models via Replicate and Together AI. Full stack listed at ${siteUrl}/uses.

Q: Can Mitchell Bryson help add AI to an existing product?
A: Yes. He integrates AI features — search, recommendations, content generation, assistive writing, automation — into existing apps and SaaS products via APIs. The AI layer sits alongside your codebase without requiring a rebuild.

Q: What open-source projects has Mitchell Bryson built?
A: Notable projects include Launchonomy (AI agent orchestration), PitchPlease (AI pitch deck to video), Inbox Triage Extension (AI email analysis), Agentic Commerce Protocol (RFC for agent-to-agent commerce), and Lofield.fm (AI music generation). All available on GitHub at https://github.com/mitchellfyi.

## Pages

- [Home](${siteUrl}): Portfolio home page with recent articles and projects
- [About](${siteUrl}/about): Background, skills, and experience
- [Articles](${siteUrl}/articles): Long-form writing on AI, programming, and product development
- [News](${siteUrl}/news): AI industry news, editorials, and digests
- [Projects](${siteUrl}/projects): Open-source projects and side projects
- [Uses](${siteUrl}/uses): Software and tools used for development, automation, and productivity
- [Contact](${siteUrl}/contact): Get in touch
- [AI in Barnsley](${siteUrl}/barnsley-ai): AI development services for businesses in South Yorkshire

## Articles

${articleList}

## News

${newsList}

## Uses

${toolList}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
