import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function importMarkdownArticle(articleDir) {
  const contentPath = path.join('./src/app/articles', articleDir, 'content.md')
  const draftPath = path.join('./src/app/articles', articleDir, 'content_draft.md')
  
  if (!fs.existsSync(contentPath)) {
    console.warn(`No content.md found for article directory: ${articleDir}`)
    return null
  }

  const fileContents = fs.readFileSync(contentPath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)

  // Check if draft exists
  let draftContent = null
  if (fs.existsSync(draftPath)) {
    let draftFileContents = fs.readFileSync(draftPath, 'utf8')
    draftFileContents = draftFileContents.replace(/\n/g, "<br>")
    const { content: draft } = matter(draftFileContents)
    draftContent = draft
  }

  // Auto-detect cover image based on slug
  const coverImagePath = `/images/articles/${articleDir}.png`
  const coverImageExists = fs.existsSync(path.join('./public/images/articles', `${articleDir}.png`))

  return {
    slug: articleDir,
    ...frontmatter,
    content,
    draftContent,
    coverImage: coverImageExists ? coverImagePath : frontmatter.coverImage,
    // Ensure date is a string
    date: frontmatter.date ? frontmatter.date.toString() : frontmatter.date,
  }
}

export async function getAllArticles() {
  // Get all article directories with content.md files (excluding the [slug] dynamic route)
  let articleDirs = await glob('*/content.md', {
    cwd: './src/app/articles',
  }).then(files => files.map(file => path.dirname(file)).filter(dir => dir !== '[slug]'))

  let articles = await Promise.all(articleDirs.map(importMarkdownArticle))
  
  // Filter out any failed imports
  articles = articles.filter(article => article !== null)

  // Filter out articles with dates on or after today
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
  
  const publishedArticles = articles.filter(article => {
    const articleDate = new Date(article.date)
    articleDate.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
    return articleDate <= today
  })

  if (process.env.NODE_ENV === 'development') {
    return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
  }

  return publishedArticles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
