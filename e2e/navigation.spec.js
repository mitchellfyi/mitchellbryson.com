import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('homepage loads with title and key sections', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Mitchell Bryson/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('main nav links work', async ({ page }) => {
    await page.goto('/')

    // Articles
    const articlesLink = page
      .locator('nav')
      .getByRole('link', { name: 'Articles' })
      .first()
    await articlesLink.click()
    await expect(page).toHaveURL(/\/articles/)

    // Projects
    const projectsLink = page
      .locator('nav')
      .getByRole('link', { name: 'Projects' })
      .first()
    await projectsLink.click()
    await expect(page).toHaveURL(/\/projects/)

    // Contact
    const contactLink = page
      .locator('nav')
      .getByRole('link', { name: 'Contact' })
      .first()
    await contactLink.click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('article page loads and renders content', async ({ page }) => {
    await page.goto('/articles')
    // Click the first article link
    const firstArticle = page.locator('article a[href*="/articles/"]').first()
    await expect(firstArticle).toBeVisible()
    await firstArticle.click()
    // Should navigate to an article page with content
    await expect(page).toHaveURL(/\/articles\//)
  })

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByText('Page not found')).toBeVisible()
  })
})
