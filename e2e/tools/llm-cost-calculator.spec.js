import { test, expect } from '@playwright/test'

const TOOL_URL = '/projects/tools/llm-cost-calculator'

test.describe('LLM Cost Calculator', () => {
  test('calculator loads with default values and model table', async ({
    page,
  }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByText('GPT-4o', { exact: true })).toBeVisible()
    await expect(page.getByText('Claude 3.5 Sonnet')).toBeVisible()
    await expect(page.getByText('Gemini 1.5 Pro')).toBeVisible()
  })

  test('adjusting inputs updates costs', async ({ page }) => {
    await page.goto(TOOL_URL)

    const table = page.locator('table').first()
    const initialText = await table.textContent()

    const inputs = page.getByRole('spinbutton')
    await inputs.first().fill('5000')
    await inputs.first().press('Tab')

    await expect(async () => {
      const newText = await table.textContent()
      expect(newText).not.toBe(initialText)
    }).toPass()
  })

  test('table shows Monthly column header', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(
      page.getByRole('columnheader', { name: 'Monthly' }),
    ).toBeVisible()
  })

  test('permalink params restore state', async ({ page }) => {
    await page.goto(`${TOOL_URL}?it=2000&ot=500&rpd=100`)
    const inputs = page.getByRole('spinbutton')
    await expect(inputs.nth(0)).toHaveValue('2000')
    await expect(inputs.nth(1)).toHaveValue('500')
    await expect(inputs.nth(2)).toHaveValue('100')
  })
})
