import { test, expect } from '@playwright/test'

test.describe('Contact page', () => {
  test('contact form is visible with all fields', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(
      page.getByRole('button', { name: /send message/i }),
    ).toBeVisible()
  })

  test('required fields prevent empty submission', async ({ page }) => {
    await page.goto('/contact')
    const nameInput = page.getByLabel(/name/i)
    // HTML5 required attribute should be present
    await expect(nameInput).toHaveAttribute('required', '')
    await expect(page.getByLabel(/email/i)).toHaveAttribute('required', '')
    await expect(page.getByLabel(/message/i)).toHaveAttribute('required', '')
  })

  test('filling and submitting form shows feedback', async ({ page }) => {
    await page.goto('/contact')

    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/message/i).fill('Hello from Playwright')

    // Mock the API response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Success' }),
      })
    })

    await page.getByRole('button', { name: /send message/i }).click()

    await expect(page.getByText(/thank you for your message/i)).toBeVisible()
  })
})
