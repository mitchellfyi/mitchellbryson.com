import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function importMarkdownProject(projectDir) {
  const contentPath = path.join('./src/app/projects', projectDir, 'content.md')

  if (!fs.existsSync(contentPath)) {
    console.warn(`No content.md found for project directory: ${projectDir}`)
    return null
  }

  const fileContents = fs.readFileSync(contentPath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)

  // Auto-detect cover image based on slug
  const coverImagePath = `/images/projects/${projectDir}.png`
  const coverImageExists = fs.existsSync(
    path.join('./public/images/projects', `${projectDir}.png`),
  )

  return {
    slug: projectDir,
    ...frontmatter,
    content,
    coverImage: coverImageExists ? coverImagePath : frontmatter.coverImage,
  }
}

export async function getAllProjects() {
  // Get all project directories with content.md files (excluding the [slug] dynamic route)
  let projectDirs = await glob('*/content.md', {
    cwd: './src/app/projects',
  }).then((files) =>
    files.map((file) => path.dirname(file)).filter((dir) => dir !== '[slug]'),
  )

  let projects = await Promise.all(projectDirs.map(importMarkdownProject))

  // Filter out any failed imports
  projects = projects.filter((project) => project !== null)

  // Sort alphabetically by title
  return projects.sort((a, z) => a.title.localeCompare(z.title))
}
