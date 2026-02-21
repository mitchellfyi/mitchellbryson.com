import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmailReport } from './EmailReport'

// Mock next/link used by Button
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

describe('EmailReport', () => {
  const defaultProps = {
    toolName: 'AI ROI Calculator',
    reportEndpoint: '/api/tools/ai-roi-calculator/report',
    reportData: { score: 85 },
  }

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders email input, send button, and subscribe checkbox', () => {
    render(<EmailReport {...defaultProps} />)
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('submits with valid email and calls fetch with correct payload', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    )

    render(<EmailReport {...defaultProps} />)

    await user.type(screen.getByLabelText('Email address'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/tools/ai-roi-calculator/report',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('test@example.com'),
      }),
    )
  })

  it('shows "Sending..." while in flight', async () => {
    const user = userEvent.setup()
    let resolveResponse
    global.fetch = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveResponse = resolve
        }),
    )

    render(<EmailReport {...defaultProps} />)

    await user.type(screen.getByLabelText('Email address'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(screen.getByText('Sending...')).toBeInTheDocument()

    resolveResponse({ ok: true, json: () => Promise.resolve({}) })
  })

  it('shows success message on successful send', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    )

    render(<EmailReport {...defaultProps} />)

    await user.type(screen.getByLabelText('Email address'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(
      await screen.findByText(/Report sent! Check your inbox/),
    ).toBeInTheDocument()
  })

  it('shows error alert on failure', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }))

    render(<EmailReport {...defaultProps} />)

    await user.type(screen.getByLabelText('Email address'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(
      await screen.findByText(/error sending the report/),
    ).toBeInTheDocument()
  })

  it('checkbox toggles subscription', async () => {
    const user = userEvent.setup()
    render(<EmailReport {...defaultProps} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
