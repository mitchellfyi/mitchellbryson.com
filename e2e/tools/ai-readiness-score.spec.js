import { test, expect } from '@playwright/test'

const TOOL_URL = '/projects/tools/ai-readiness-score'

test.describe('AI Readiness Score', () => {
  test('quiz loads showing question 1 of 6', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByText('Question 1 of 6')).toBeVisible()
  })

  test('selecting an option advances to next question', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByText('Question 1 of 6')).toBeVisible()

    const options = page.getByRole('radio')
    await options.first().click()

    await expect(page.getByText('Question 2 of 6')).toBeVisible()
  })

  test('completing all 6 questions shows results', async ({ page }) => {
    await page.goto(TOOL_URL)

    for (let i = 0; i < 6; i++) {
      await expect(page.getByText(`Question ${i + 1} of 6`)).toBeVisible()
      const options = page.getByRole('radio')
      await options.first().click()
    }

    await expect(page.getByText(/your recommendation/i)).toBeVisible()
    await expect(page.getByText(/next steps/i)).toBeVisible()
  })

  test('results show score and restart button', async ({ page }) => {
    await page.goto(TOOL_URL)

    for (let i = 0; i < 6; i++) {
      const options = page.getByRole('radio')
      await options.first().click()
    }

    await expect(page.getByText('out of 18')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Start again' }),
    ).toBeVisible()
  })

  test('permalink loads results directly', async ({ page }) => {
    await page.goto(`${TOOL_URL}?r=012301`)
    await expect(page.getByText(/your recommendation/i)).toBeVisible()
  })

  test('restart button returns to question 1', async ({ page }) => {
    await page.goto(TOOL_URL)

    // Complete the quiz first
    for (let i = 0; i < 6; i++) {
      const options = page.getByRole('radio')
      await options.first().click()
    }

    await expect(
      page.getByRole('button', { name: 'Start again' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Start again' }).click()
    await expect(page.getByText('Question 1 of 6')).toBeVisible()
  })
})
