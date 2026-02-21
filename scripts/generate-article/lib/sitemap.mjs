import fs from 'fs'
import path from 'path'
import { getExistingArticles } from './articles.mjs'

const SRC_DIR = path.resolve('src')

/**
 * Build a complete site map of all linkable pages for internal linking.
 * Returns a formatted string for use in prompts.
 */
export function buildSiteMap() {
  const pages = [
    ...getStaticPages(),
    ...getArticlePages(),
    ...getProjectToolPages(),
    ...getBarnsleyPages(),
  ]

  console.log(`[sitemap] Built site map: ${pages.length} linkable pages`)

  return pages
    .map((p) => `- ${p.url} — ${p.title}: ${p.description}`)
    .join('\n')
}

function getStaticPages() {
  return [
    {
      url: '/about',
      title: 'About',
      description: 'About Mitchell Bryson — AI software engineer',
    },
    {
      url: '/contact',
      title: 'Contact',
      description: 'Get in touch for AI consulting and engineering',
    },
    {
      url: '/projects',
      title: 'Projects',
      description: 'Open-source projects and interactive tools',
    },
    {
      url: '/projects/tools',
      title: 'Tools',
      description: 'Interactive AI tools and calculators',
    },
    {
      url: '/articles',
      title: 'Articles',
      description: 'Articles on AI, product engineering, and technology',
    },
    {
      url: '/barnsley-ai',
      title: 'Barnsley AI',
      description: 'AI integration services for South Yorkshire businesses',
    },
  ]
}

function getArticlePages() {
  return getExistingArticles().map((a) => ({
    url: `/articles/${a.slug}`,
    title: a.title,
    description: a.description,
  }))
}

function getProjectToolPages() {
  try {
    const toolsPath = path.join(SRC_DIR, 'lib', 'projectTools.js')
    const raw = fs.readFileSync(toolsPath, 'utf8')

    // Parse the projectTools array from the source file
    const tools = []
    const regex =
      /\{\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*\n?\s*'([^']+)'/g
    let match
    while ((match = regex.exec(raw)) !== null) {
      tools.push({
        url: `/projects/tools/${match[1]}`,
        title: match[2],
        description: match[3],
      })
    }

    // Fallback: try a simpler parse if regex didn't match
    if (tools.length === 0) {
      const slugs = [...raw.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
      const names = [...raw.matchAll(/name:\s*'([^']+)'/g)].map((m) => m[1])
      const descs = [...raw.matchAll(/description:\s*\n?\s*'([^']+)'/g)].map(
        (m) => m[1],
      )
      for (let i = 0; i < slugs.length; i++) {
        tools.push({
          url: `/projects/tools/${slugs[i]}`,
          title: names[i] || slugs[i],
          description: descs[i] || '',
        })
      }
    }

    if (tools.length === 0) {
      console.warn(
        '[sitemap]   Warning: parsed 0 project tools from projectTools.js',
      )
    } else {
      console.log(`[sitemap]   Project tools: ${tools.length}`)
    }
    return tools
  } catch (err) {
    console.warn(`[sitemap]   Could not read project tools: ${err.message}`)
    return []
  }
}

function getBarnsleyPages() {
  try {
    const pagesPath = path.join(SRC_DIR, 'lib', 'barnsleyPages.js')
    const raw = fs.readFileSync(pagesPath, 'utf8')

    const pages = []
    const slugs = [...raw.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
    const titles = [...raw.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1])
    const descs = [...raw.matchAll(/(?:description:\s*\n?\s*)'([^']+)'/g)].map(
      (m) => m[1],
    )

    for (let i = 0; i < slugs.length; i++) {
      pages.push({
        url: `/barnsley-ai/${slugs[i]}`,
        title: titles[i] || slugs[i],
        description: descs[i] || '',
      })
    }

    if (pages.length === 0) {
      console.warn(
        '[sitemap]   Warning: parsed 0 Barnsley pages from barnsleyPages.js',
      )
    } else {
      console.log(`[sitemap]   Barnsley AI pages: ${pages.length}`)
    }
    return pages
  } catch (err) {
    console.warn(`[sitemap]   Could not read Barnsley pages: ${err.message}`)
    return []
  }
}
