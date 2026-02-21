import { getAllArticles } from '@/lib/articles'
import { tools } from '@/lib/tools'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'

export async function GET() {
  const articles = await getAllArticles()

  const articleList = articles
    .map((a) => `- [${a.title}](${siteUrl}/articles/${a.slug}): ${a.description}`)
    .join('\n')

  const toolCategories = [...new Set(tools.map((t) => t.category))]
  const toolList = toolCategories
    .map((cat) => {
      const catTools = tools.filter((t) => t.category === cat)
      return catTools.map((t) => `- [${t.name}](${siteUrl}/tools/${t.slug}): ${t.description}`).join('\n')
    })
    .join('\n')

  const content = `# Mitchell Bryson

> AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.

## About

Mitchell Bryson is a full-stack AI Software Engineer based in Barnsley, South Yorkshire, UK. He builds engaging products and practical systems that ship fast, reduce manual work, and create measurable value. He has been making websites and apps since 2000.

Specialities: product strategy, modern web stacks (Next.js, React, Rails, Tailwind), and applied AI (LLMs in real SaaS workflows — search, support, data/ops).

- Website: ${siteUrl}
- GitHub: https://github.com/mitchellfyi
- LinkedIn: https://www.linkedin.com/in/mitchellfyi
- Email: website@mitchellbryson.com

## Pages

- [Home](${siteUrl}): Portfolio home page with recent articles and projects
- [About](${siteUrl}/about): Background, skills, and experience
- [Articles](${siteUrl}/articles): Long-form writing on AI, programming, and product development
- [Projects](${siteUrl}/projects): Open-source projects and side projects
- [Tools](${siteUrl}/tools): Software and tools used for development, automation, and productivity
- [Contact](${siteUrl}/contact): Get in touch
- [AI in Barnsley](${siteUrl}/barnsley-ai): AI development services for businesses in South Yorkshire

## Articles

${articleList}

## Tools

${toolList}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
