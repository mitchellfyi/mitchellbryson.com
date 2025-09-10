import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function importArticle(articleFilename) {
  try {
    let { article } = await import(`../app/articles/${articleFilename}`)

    return {
      slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
      ...article,
    }
  } catch (error) {
    console.warn(`Failed to import MDX article ${articleFilename}:`, error.message)
    return null
  }
}

async function importMarkdownArticle(articleDir) {
  const contentPath = path.join('./src/app/articles', articleDir, 'content.md')
  
  if (!fs.existsSync(contentPath)) {
    // Fallback to old MDX structure
    return importArticle(`${articleDir}/page.mdx`)
  }

  const fileContents = fs.readFileSync(contentPath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)

  // Auto-detect cover image based on slug
  const coverImagePath = `/images/articles/${articleDir}.png`
  const coverImageExists = fs.existsSync(path.join('./public/images/articles', `${articleDir}.png`))

  return {
    slug: articleDir,
    ...frontmatter,
    content,
    coverImage: coverImageExists ? coverImagePath : frontmatter.coverImage,
    // Ensure date is a string
    date: frontmatter.date ? frontmatter.date.toString() : frontmatter.date,
  }
}

export async function getAllArticles() {
  // Get all article directories (excluding the [slug] dynamic route)
  let articleDirs = await glob('*/content.md', {
    cwd: './src/app/articles',
  }).then(files => files.map(file => path.dirname(file)).filter(dir => dir !== '[slug]'))

  // Also get any remaining MDX-only articles (excluding the [slug] dynamic route)
  let mdxFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  }).then(files => files.filter(file => {
    const dir = path.dirname(file)
    return dir !== '[slug]' && !articleDirs.includes(dir)
  }))

  let markdownArticles = await Promise.all(articleDirs.map(importMarkdownArticle))
  let mdxArticles = await Promise.all(mdxFilenames.map(importArticle))
  
  // Filter out any failed imports
  let articles = [...markdownArticles, ...mdxArticles].filter(article => article !== null)

  // Filter out articles with dates on or after today
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
  
  const publishedArticles = articles.filter(article => {
    const articleDate = new Date(article.date)
    articleDate.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
    return articleDate < today
  })

  if (process.env.NODE_ENV === 'development') {
    return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
  }

  return publishedArticles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
