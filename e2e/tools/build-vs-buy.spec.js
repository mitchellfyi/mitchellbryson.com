import { test, expect } from '@playwright/test'

const TOOL_URL = '/projects/tools/build-vs-buy-vs-ai'

test.describe('Build vs Buy vs AI', () => {
  test('quiz completes showing recommendation', async ({ page }) => {
    await page.goto(TOOL_URL)
    await expect(page.getByText('Question 1 of 5')).toBeVisible()

    for (let i = 0; i < 5; i++) {
      const options = page.getByRole('radio')
      await options.first().click()
    }

    await expect(page.getByText(/our recommendation/i)).toBeVisible()
  })

  test('results show comparison table with columns', async ({ page }) => {
    await page.goto(TOOL_URL)

    for (let i = 0; i < 5; i++) {
      const options = page.getByRole('radio')
      await options.first().click()
    }

    // Check comparison table column headers using role-based selectors
    await expect(
      page.getByRole('columnheader', { name: 'Build it yourself' }),
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Buy off-the-shelf' }),
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Build with AI' }),
    ).toBeVisible()
  })

  test('permalink restores results', async ({ page }) => {
    await page.goto(`${TOOL_URL}?r=01230`)
    await expect(
      page.getByRole('button', { name: 'Start again' }),
    ).toBeVisible()
  })

  test('restart returns to question 1', async ({ page }) => {
    await page.goto(TOOL_URL)

    // Complete the quiz first
    for (let i = 0; i < 5; i++) {
      const options = page.getByRole('radio')
      await options.first().click()
    }

    await expect(
      page.getByRole('button', { name: 'Start again' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Start again' }).click()
    await expect(page.getByText('Question 1 of 5')).toBeVisible()
  })
})
