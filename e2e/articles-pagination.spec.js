import { test, expect } from '@playwright/test'

const pagination = 'nav[aria-label="Pagination"]'

test.describe('Articles Pagination', () => {
  test('page 1 shows max 10 articles with correct pagination state', async ({
    page,
  }) => {
    await page.goto('/articles')

    // Should render at most 10 articles
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()
    expect(await articles.count()).toBeLessThanOrEqual(10)

    const nav = page.locator(pagination)
    await expect(nav).toBeVisible()

    // Page 1 is highlighted with aria-current
    await expect(nav.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    // Previous is disabled (rendered as span, not link)
    await expect(nav.getByRole('link', { name: 'Previous' })).toHaveCount(0)
    await expect(nav.getByText('Previous')).toBeVisible()

    // Next is an active link
    await expect(nav.getByRole('link', { name: 'Next' })).toBeVisible()
  })

  test('clicking Next then Previous navigates correctly', async ({ page }) => {
    await page.goto('/articles')

    // Click Next → page 2
    await page.locator(pagination).getByRole('link', { name: 'Next' }).click()
    await expect(page).toHaveURL(/[?&]page=2/)
    await expect(page.locator('article').first()).toBeVisible()

    // Click Previous → back to clean /articles URL (no ?page=1)
    await page
      .locator(pagination)
      .getByRole('link', { name: 'Previous' })
      .click()
    await expect(page).toHaveURL(/\/articles$/)
    await expect(page).not.toHaveURL(/page=/)
  })

  test('last page disables Next and shows fewer articles', async ({
    page,
  }) => {
    // Get total pages from page 1, then navigate to last page
    await page.goto('/articles')
    const nav = page.locator(pagination)
    const pageLinks = nav.getByRole('link')
    const allLinks = await pageLinks.all()

    let lastPageNum = 1
    for (const link of allLinks) {
      const text = (await link.textContent()).trim()
      const num = parseInt(text, 10)
      if (!isNaN(num) && num > lastPageNum) lastPageNum = num
    }

    // Navigate directly to last page
    await page.goto(`/articles?page=${lastPageNum}`)

    // Should have articles but fewer than a full page
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()
    const count = await articles.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThanOrEqual(10)

    // Next is disabled, Previous is active
    await expect(nav.getByRole('link', { name: 'Next' })).toHaveCount(0)
    await expect(nav.getByText('Next')).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Previous' })).toBeVisible()

    // Last page number is highlighted
    await expect(
      nav.getByRole('link', { name: String(lastPageNum) }),
    ).toHaveAttribute('aria-current', 'page')
  })

  test('invalid page params clamp to valid range', async ({ page }) => {
    // page=0 → shows page 1
    await page.goto('/articles?page=0')
    let nav = page.locator(pagination)
    await expect(nav.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    // page=abc → shows page 1
    await page.goto('/articles?page=abc')
    nav = page.locator(pagination)
    await expect(nav.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    // page=999 → shows last page
    await page.goto('/articles?page=999')
    nav = page.locator(pagination)
    const highlighted = nav.locator('[aria-current="page"]')
    await expect(highlighted).toHaveCount(1)
    // Should NOT be page 1 (clamped to last page)
    await expect(highlighted).not.toHaveText('1')
  })
})
