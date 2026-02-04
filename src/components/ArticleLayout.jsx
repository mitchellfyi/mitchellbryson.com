'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Newsletter } from '@/components/Newsletter'
import { Prose } from '@/components/Prose'
import { ArticleToggle } from '@/components/ArticleToggle'
import { formatDate } from '@/lib/formatDate'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({ article, children }) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)
  const [isDraft, setIsDraft] = useState(false)
  
  // Only show toggle if draft content exists
  const hasDraft = article.draftContent && article.draftContent.trim().length > 0

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition cursor-pointer lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <div className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <time dateTime={article.date} className="ml-3">
                  {formatDate(article.date)}
                </time>
                {article.readingTime && (
                  <>
                    <span className="mx-2">·</span>
                    <span>{article.readingTime}</span>
                  </>
                )}
              </div>
            </header>
            {article.coverImage && (
              <div className="mt-8 lg:-mx-14">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  width={1200}
                  height={630}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}
            {hasDraft && (
              <div className="mt-8 mb-6">
                <ArticleToggle 
                  isDraft={isDraft}
                  onToggle={setIsDraft}
                />
              </div>
            )}
            <Prose className="mt-8" data-mdx-content>
              {article.content ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {isDraft && hasDraft ? article.draftContent : article.content}
                </ReactMarkdown>
              ) : (
                children
              )}
              <hr />
            </Prose>
          </article>
          <div className="mt-16">
            <Newsletter />
          </div>
        </div>
      </div>
    </Container>
  )
}
