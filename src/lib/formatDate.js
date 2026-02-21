export function formatDate(dateString) {
  if (!dateString) {
    return 'Invalid Date'
  }

  const date = new Date(`${dateString}T00:00:00Z`)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  const year = date.getUTCFullYear()
  const month = date.toLocaleDateString('en-GB', {
    month: 'short',
    timeZone: 'UTC',
  })
  const day = date.getUTCDate()
  return `${day} ${month} ${year}`
}
