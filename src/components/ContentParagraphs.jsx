export function ContentParagraphs({ content }) {
  const paragraphs = content.split('\n\n').filter(Boolean)
  return (
    <div className="prose max-w-2xl space-y-6 dark:prose-invert">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-zinc-600 dark:text-zinc-400">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
