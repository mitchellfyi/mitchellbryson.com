'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

function CodeBlock({ language, children }) {
  const [highlighter, setHighlighter] = useState(null)

  useEffect(() => {
    Promise.all([
      import('react-syntax-highlighter').then((mod) => mod.Prism),
      import('react-syntax-highlighter/dist/esm/styles/prism').then(
        (mod) => mod.atomDark,
      ),
    ]).then(([Component, style]) => {
      setHighlighter({ Component, style })
    })
  }, [])

  if (!highlighter) {
    return (
      <pre>
        <code className={`language-${language}`}>{children}</code>
      </pre>
    )
  }

  const { Component, style } = highlighter
  return (
    <Component style={style} language={language} PreTag="div">
      {children}
    </Component>
  )
}

export function MarkdownContent({
  content,
  children,
  rehypeRaw: useRehypeRaw = false,
}) {
  if (!content) return children || null

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={useRehypeRaw ? [rehypeRaw] : []}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <CodeBlock language={match[1]}>
              {String(children).replace(/\n$/, '')}
            </CodeBlock>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
