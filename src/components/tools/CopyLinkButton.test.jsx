import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CopyLinkButton } from './CopyLinkButton'

// Mock next/link used by Button
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

describe('CopyLinkButton', () => {
  it('renders with default label', () => {
    render(<CopyLinkButton />)
    expect(screen.getByText('Copy link to these results')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<CopyLinkButton label="Share" />)
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('clicking triggers clipboard write and shows Copied feedback', async () => {
    const user = userEvent.setup()
    render(<CopyLinkButton />)
    await user.click(screen.getByText('Copy link to these results'))

    // The component shows "Copied!" only after clipboard.writeText resolves,
    // confirming the clipboard write occurred
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('shows "Copied!" feedback then resets after 2 seconds', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<CopyLinkButton />)

    await user.click(screen.getByText('Copy link to these results'))
    expect(screen.getByText('Copied!')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByText('Copy link to these results')).toBeInTheDocument()

    vi.useRealTimers()
  })
})
