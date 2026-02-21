import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Mitchell Bryson'
  const description =
    searchParams.get('description') || 'Full-stack AI Software Engineer'
  const type = searchParams.get('type') || 'article'

  // Truncate long titles and descriptions
  const truncatedTitle =
    title.length > 80 ? title.substring(0, 77) + '...' : title
  const truncatedDescription =
    description.length > 150
      ? description.substring(0, 147) + '...'
      : description

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backgroundColor: '#18181b',
        backgroundImage:
          'radial-gradient(circle at 25% 25%, #27272a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1f2937 0%, transparent 50%)',
        padding: '60px',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(to right, #14b8a6, #2dd4bf, #5eead4)',
        }}
      />

      {/* Content type badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            color: '#14b8a6',
            fontSize: '20px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {type === 'article' ? '📝 Article' : '✨ Mitchell Bryson'}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          display: 'flex',
          fontSize: '56px',
          fontWeight: 700,
          color: '#fafafa',
          lineHeight: 1.2,
          marginBottom: '24px',
          maxWidth: '1000px',
        }}
      >
        {truncatedTitle}
      </div>

      {/* Description */}
      <div
        style={{
          display: 'flex',
          fontSize: '24px',
          color: '#a1a1aa',
          lineHeight: 1.4,
          maxWidth: '900px',
          marginBottom: '40px',
        }}
      >
        {truncatedDescription}
      </div>

      {/* Footer with author info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Author avatar placeholder */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: '#18181b',
          }}
        >
          M
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              color: '#fafafa',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            Mitchell Bryson
          </span>
          <span
            style={{
              color: '#71717a',
              fontSize: '16px',
            }}
          >
            mitchellbryson.com
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control':
          'public, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  )
}
