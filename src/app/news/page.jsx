import { SimpleLayout } from '@/components/SimpleLayout'
import { WritingNav } from '@/components/WritingNav'
import { getAllNews, getAllSourceLinks } from '@/lib/news'
import { BreadcrumbJsonLd, CollectionPageJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { NewsFeed } from '@/components/NewsFeed'
import { Newsletter } from '@/components/Newsletter'

export const metadata = buildMetadata({
  title: 'News',
  description:
    'Daily AI editorials and a weekly Friday roundup — commentary on the stories that matter for product builders.',
  url: `${siteUrl}/news`,
})

export default async function NewsIndex() {
  let allNews = await getAllNews()
  let news = allNews.filter((item) => item.type !== 'links')
  let sourceLinks = await getAllSourceLinks()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'News', url: `${siteUrl}/news` },
        ]}
      />
      <CollectionPageJsonLd
        name="News"
        description="Daily AI editorials and a weekly Friday roundup — commentary on the stories that matter for product builders."
        url={`${siteUrl}/news`}
      />
      <SimpleLayout
        title="AI news, commentary, and curated roundups."
        intro="New editorials every morning on the AI stories that matter for product builders. Weekly roundup every Friday with curated links and commentary."
      >
        <div className="mt-6 mb-10 flex justify-center">
          <WritingNav />
        </div>
        <NewsFeed news={news} sourceLinks={sourceLinks} />
        <div className="mx-auto mt-16 max-w-lg">
          <Newsletter />
        </div>
      </SimpleLayout>
    </>
  )
}
