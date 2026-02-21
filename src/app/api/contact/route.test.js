import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSend = vi.fn()

vi.mock('@/lib/email', () => ({
  getResend: () => ({ emails: { send: mockSend } }),
  C: {
    TEAL: '#14b8a6',
    HEADING: '#333',
    SUBHEADING: '#555',
    TEXT: '#666',
    BG: '#f8f9fa',
    WHITE: '#fff',
    BORDER: '#e9ecef',
  },
  validateEmail: (email) => {
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address'
    return null
  },
}))

describe('contact API route', () => {
  let POST

  beforeEach(async () => {
    vi.resetModules()
    mockSend.mockReset()
    mockSend.mockResolvedValue({ error: null })
    const mod = await import('./route')
    POST = mod.POST
  })

  it('module exports POST function', () => {
    expect(typeof POST).toBe('function')
  })

  it('POST function is async', () => {
    expect(POST.constructor.name).toBe('AsyncFunction')
  })

  it('validates required fields', async () => {
    const mockRequest = {
      json: async () => ({
        name: '',
        email: 'test@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response.status).toBe(400)
  })

  it('returns error message for missing fields', async () => {
    const mockRequest = {
      json: async () => ({
        name: '',
        email: 'test@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    const body = await response.json()
    expect(body.error).toBe('All fields are required')
  })

  it('validates email format', async () => {
    const mockRequest = {
      json: async () => ({
        name: 'Test User',
        email: 'not-an-email',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response.status).toBe(400)
  })

  it('returns error message for bad email', async () => {
    const mockRequest = {
      json: async () => ({
        name: 'Test User',
        email: 'not-an-email',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    const body = await response.json()
    expect(body.error).toBe('Invalid email address')
  })

  it('returns 200 with success message for valid submission', async () => {
    const mockRequest = {
      json: async () => ({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.message).toBe('Email sent successfully')
  })

  it('handles JSON parsing errors', async () => {
    const mockRequest = {
      json: async () => {
        throw new Error('Invalid JSON')
      },
    }

    const response = await POST(mockRequest)
    expect(response.status).toBe(500)
  })

  it('returns 500 when Resend API fails', async () => {
    mockSend.mockResolvedValue({ error: 'API error' })
    const mockRequest = {
      json: async () => ({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response.status).toBe(500)
  })
})
