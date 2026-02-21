import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ArticleToggle } from './ArticleToggle'

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

describe('ArticleToggle', () => {
  it('renders AI Formatted and Draft buttons', () => {
    render(<ArticleToggle isDraft={false} onToggle={() => {}} />)
    expect(
      screen.getByRole('button', { name: /ai formatted/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /draft/i })).toBeInTheDocument()
  })

  it('AI Formatted has aria-pressed=true when isDraft=false', () => {
    render(<ArticleToggle isDraft={false} onToggle={() => {}} />)
    expect(
      screen.getByRole('button', { name: /ai formatted/i }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /draft/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('Draft has aria-pressed=true when isDraft=true', () => {
    render(<ArticleToggle isDraft={true} onToggle={() => {}} />)
    expect(screen.getByRole('button', { name: /draft/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('button', { name: /ai formatted/i }),
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('clicking AI Formatted calls onToggle(false)', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ArticleToggle isDraft={true} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: /ai formatted/i }))
    expect(onToggle).toHaveBeenCalledWith(false)
  })

  it('clicking Draft calls onToggle(true)', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ArticleToggle isDraft={false} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: /draft/i }))
    expect(onToggle).toHaveBeenCalledWith(true)
  })

  it('shows draft description text when isDraft=true', () => {
    render(<ArticleToggle isDraft={true} onToggle={() => {}} />)
    expect(screen.getByText(/original draft/i)).toBeInTheDocument()
  })

  it('shows AI-enhanced description text when isDraft=false', () => {
    render(<ArticleToggle isDraft={false} onToggle={() => {}} />)
    expect(screen.getByText(/AI-enhanced version/i)).toBeInTheDocument()
  })

  it('renders link to /contact', () => {
    render(<ArticleToggle isDraft={false} onToggle={() => {}} />)
    const link = screen.getByRole('link', { name: /contact me/i })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
