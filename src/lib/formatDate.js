export function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00Z`)
  const year = date.getUTCFullYear()
  const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
  const day = date.getUTCDate()
  return `${month} ${day}, ${year}`
}
