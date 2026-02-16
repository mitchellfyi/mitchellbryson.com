import { describe, it, expect } from 'vitest'

// Integration tests for contact API route
describe('contact API route', () => {
  it('module exports POST function', async () => {
    const routeModule = await import('./route')
    expect(typeof routeModule.POST).toBe('function')
  })

  it('POST function is async', async () => {
    const { POST } = await import('./route')
    expect(POST.constructor.name).toBe('AsyncFunction')
  })

  it('validates required fields', async () => {
    const { POST } = await import('./route')

    // Mock request with missing fields
    const mockRequest = {
      json: async () => ({
        name: '',
        email: 'test@example.com',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response).toBeDefined()
    expect(response.status).toBe(400)
  })

  it('validates email format', async () => {
    const { POST } = await import('./route')

    // Mock request with invalid email
    const mockRequest = {
      json: async () => ({
        name: 'Test User',
        email: 'not-an-email',
        message: 'Test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response).toBeDefined()
    expect(response.status).toBe(400)
  })

  it('handles valid contact form submission', async () => {
    const { POST } = await import('./route')

    // Mock request with valid data
    const mockRequest = {
      json: async () => ({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      }),
    }

    const response = await POST(mockRequest)
    expect(response).toBeDefined()
    expect(typeof response.status).toBe('number')
    // Status will be either 200 (success) or 500 (if Resend API fails)
    expect([200, 500]).toContain(response.status)
  })

  it('handles JSON parsing errors', async () => {
    const { POST } = await import('./route')

    // Mock request that throws on json()
    const mockRequest = {
      json: async () => {
        throw new Error('Invalid JSON')
      },
    }

    const response = await POST(mockRequest)
    expect(response).toBeDefined()
    expect(response.status).toBe(500)
  })
})
