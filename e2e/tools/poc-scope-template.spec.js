import { test, expect } from '@playwright/test'

const TOOL_URL = '/projects/tools/ai-poc-scope-template'

test.describe('PoC Scope Template', () => {
  test('multi-step form shows Step 1 of 6', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByText('Step 1 of 6')).toBeVisible()
  })

  test('text inputs work for problem/metric steps', async ({ page }) => {
    await page.goto(TOOL_URL)

    // Step 1: problem statement textarea
    const textarea = page.getByRole('textbox').first()
    await textarea.fill('We need to automate invoice processing')

    // Click Next (exact match to avoid Next.js dev tools button)
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Should advance to step 2
    await expect(page.getByText('Step 2 of 6')).toBeVisible()
  })

  test('option cards work for selection steps', async ({ page }) => {
    await page.goto(TOOL_URL)

    // Step 1: problem statement
    await page.getByRole('textbox').first().fill('Test problem')
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 2: success metric
    await page.getByRole('textbox').first().fill('Test metric')
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 3: data source (option cards)
    const options = page.getByRole('radio')
    await expect(options.first()).toBeVisible()
    await options.first().click()
  })

  test('completing all steps shows scope document', async ({ page }) => {
    await page.goto(TOOL_URL)

    // Step 1: problem statement (textarea)
    await page.getByRole('textbox').first().fill('Automate invoices')
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 2: success metric (textarea)
    await page
      .getByRole('textbox')
      .first()
      .fill('Reduce processing time by 50%')
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 3: data source (options) — select and click Next
    await page.getByRole('radio').first().click()
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 4: timeline (options)
    await page.getByRole('radio').first().click()
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 5: tech preference (options)
    await page.getByRole('radio').first().click()
    await page.getByRole('button', { name: 'Next', exact: true }).click()

    // Step 6: budget range (options) — last step, button says "Generate scope"
    await page.getByRole('radio').first().click()
    await page.getByRole('button', { name: 'Generate scope' }).click()

    // Results should show scope document
    await expect(page.getByText(/your ai poc scope document/i)).toBeVisible()
  })
})
