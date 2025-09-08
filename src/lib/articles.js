import glob from 'fast-glob'

async function importArticle(articleFilename) {
  let { article } = await import(`../app/articles/${articleFilename}`)

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  // Filter out articles with dates on or after today
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
  
  const publishedArticles = articles.filter(article => {
    const articleDate = new Date(article.date)
    articleDate.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
    return articleDate < today
  })

  return publishedArticles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
