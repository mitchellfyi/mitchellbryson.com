import { test, expect } from '@playwright/test'

const TOOL_URL = '/projects/tools/ai-roi-calculator'

test.describe('AI ROI Calculator', () => {
  test('calculator loads with result cards', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByText('Annual savings').first()).toBeVisible()
    await expect(page.getByText('Payback period').first()).toBeVisible()
  })

  test('changing inputs updates result values', async ({ page }) => {
    await page.goto(TOOL_URL)

    // Get all the bold value text elements (text-2xl font-bold)
    const valueElements = page.locator('.text-2xl.font-bold')
    const initialValue = await valueElements.first().textContent()

    // Change staff count from default 5 to 50
    const staffInput = page.getByRole('spinbutton').first()
    await staffInput.fill('50')
    await staffInput.press('Tab')

    // Wait for the value to change
    await expect(async () => {
      const newValue = await valueElements.first().textContent()
      expect(newValue).not.toBe(initialValue)
    }).toPass({ timeout: 2000 })
  })

  test('permalink restores correct values', async ({ page }) => {
    await page.goto(`${TOOL_URL}?s=10&h=20&c=50&e=80&i=25000`)
    const spinbuttons = page.getByRole('spinbutton')
    await expect(spinbuttons.nth(0)).toHaveValue('10')
    await expect(spinbuttons.nth(1)).toHaveValue('20')
    await expect(spinbuttons.nth(2)).toHaveValue('50')
  })

  test('copy link button is present', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByRole('button', { name: /copy link/i })).toBeVisible()
  })
})
