/**
 * Calculate estimated reading time for content
 * @param {string} content - The text content (markdown/plain text)
 * @returns {string} - Formatted reading time (e.g., "5 min read")
 */
export function calculateReadingTime(content) {
  if (!content) return '1 min read'
  
  // Strip markdown syntax for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Keep link text
    .replace(/[#*_~>\-|]/g, '') // Remove markdown symbols
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length
  
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  
  // Minimum 1 minute
  const readTime = Math.max(1, minutes)
  
  return `${readTime} min read`
}
