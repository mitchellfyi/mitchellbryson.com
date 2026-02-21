import { test, expect } from '@playwright/test'

test.describe('Articles Pagination', () => {
  test('shows pagination when there are more than 10 articles', async ({
    page,
  }) => {
    await page.goto('/articles')
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()
    expect(await articles.count()).toBeLessThanOrEqual(10)

    const pagination = page.locator('nav[aria-label="Pagination"]')
    await expect(pagination).toBeVisible()
  })

  test('page 1 has no active Previous link', async ({ page }) => {
    await page.goto('/articles')
    const pagination = page.locator('nav[aria-label="Pagination"]')
    // Previous should be a span (disabled), not a link
    const previousLink = pagination.getByRole('link', { name: 'Previous' })
    await expect(previousLink).toHaveCount(0)
    await expect(pagination.getByText('Previous')).toBeVisible()
  })

  test('clicking Next navigates to page 2', async ({ page }) => {
    await page.goto('/articles')
    const nextLink = page
      .locator('nav[aria-label="Pagination"]')
      .getByRole('link', { name: 'Next' })
    await nextLink.click()
    await expect(page).toHaveURL(/[?&]page=2/)
  })

  test('direct navigation to page 2 works', async ({ page }) => {
    await page.goto('/articles?page=2')
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()

    // Page 2 should have a Previous link
    const previousLink = page
      .locator('nav[aria-label="Pagination"]')
      .getByRole('link', { name: 'Previous' })
    await expect(previousLink).toBeVisible()
  })

  test('last page has no active Next link', async ({ page }) => {
    // Navigate to the last page by finding the highest page number link
    await page.goto('/articles')
    const pageLinks = page
      .locator('nav[aria-label="Pagination"]')
      .getByRole('link')
    const allLinks = await pageLinks.all()

    // Find the highest page number from the page number links
    let lastPageUrl = null
    for (const link of allLinks) {
      const text = await link.textContent()
      if (/^\d+$/.test(text.trim())) {
        lastPageUrl = await link.getAttribute('href')
      }
    }

    if (lastPageUrl) {
      await page.goto(lastPageUrl)
    }

    // Next should be a span (disabled), not a link
    const pagination = page.locator('nav[aria-label="Pagination"]')
    const nextLink = pagination.getByRole('link', { name: 'Next' })
    await expect(nextLink).toHaveCount(0)
    await expect(pagination.getByText('Next')).toBeVisible()
  })
})
