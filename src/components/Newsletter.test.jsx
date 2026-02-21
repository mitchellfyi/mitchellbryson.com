import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Newsletter } from './Newsletter'

// Mock next/link used by Button
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

describe('Newsletter', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders email input and Subscribe button', () => {
    render(<Newsletter />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /subscribe/i }),
    ).toBeInTheDocument()
  })

  it('email input is type email and required', () => {
    render(<Newsletter />)
    const input = screen.getByLabelText(/email address/i)
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeRequired()
  })

  it('submits POST to /api/newsletter with correct payload', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    )

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(global.fetch).toHaveBeenCalledWith('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
      }),
    })
  })

  it('shows success alert on 200 response', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }))

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /thank you for subscribing/i,
    )
  })

  it('clears email field after success', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }))

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    await screen.findByRole('alert')
    expect(screen.getByLabelText(/email address/i)).toHaveValue('')
  })

  it('shows error alert on non-ok response', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }))

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/error/i)
  })

  it('shows error alert when fetch throws', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/error/i)
  })

  it('button disabled and shows Subscribing... while submitting', async () => {
    const user = userEvent.setup()
    let resolveResponse
    global.fetch = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveResponse = resolve
        }),
    )

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    const btn = screen.getByRole('button', { name: /subscribing/i })
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Subscribing...')

    resolveResponse({ ok: true })
  })

  it('button re-enables after submission completes', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }))

    render(<Newsletter />)

    await user.type(screen.getByLabelText(/email address/i), 'a@b.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))

    await screen.findByRole('alert')
    const btn = screen.getByRole('button', { name: /subscribe/i })
    expect(btn).not.toBeDisabled()
  })
})
