import { getAllArticles } from '@/lib/articles'
import { allBarnsleyPages, getAllIntegrationsWithPages } from '@/lib/barnsleyPages'
import { siteUrl } from '@/lib/siteConfig'
import { tools } from '@/lib/tools'

export default async function sitemap() {
  const articles = await getAllArticles()

  const articleUrls = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const barnsleySubUrls = allBarnsleyPages.map((page) => ({
    url: `${siteUrl}/barnsley-ai/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/barnsley-ai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/barnsley-ai/ai-integrations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/barnsley-ai/integration-types`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/barnsley-ai/business-types`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  const toolUrls = tools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const integrationUrls = getAllIntegrationsWithPages().map((integration) => ({
    url: `${siteUrl}/barnsley-ai/integrations/${integration.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...barnsleySubUrls, ...integrationUrls, ...toolUrls, ...articleUrls]
}
