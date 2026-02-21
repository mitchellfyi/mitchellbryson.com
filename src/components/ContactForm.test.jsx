import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

// Mock next/link used by Button
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

// Mock SimpleLayout to render children directly
vi.mock('@/components/SimpleLayout', () => ({
  SimpleLayout: ({ children }) => <div>{children}</div>,
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders name, email, message fields and submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Send Message' }),
    ).toBeInTheDocument()
  })

  it('has required attributes on fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeRequired()
    expect(screen.getByLabelText(/email/i)).toBeRequired()
    expect(screen.getByLabelText(/message/i)).toBeRequired()
  })

  it('submits to /api/contact with correct payload', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    )

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello there')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello there',
      }),
    })
  })

  it('shows success message on 200 and clears form', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }))

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(
      await screen.findByText(/Thank you for your message/),
    ).toBeInTheDocument()

    // Form should be cleared
    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/message/i)).toHaveValue('')
  })

  it('shows error message on failure', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }))

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(
      await screen.findByText(/error sending your message/),
    ).toBeInTheDocument()
  })

  it('button is disabled while submitting', async () => {
    const user = userEvent.setup()
    let resolveResponse
    global.fetch = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveResponse = resolve
        }),
    )

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled()

    resolveResponse({ ok: true })
  })
})
