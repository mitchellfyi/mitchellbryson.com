import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IntegrationsFilter } from './IntegrationsFilter'

// Mock IntegrationCard as a simple stub
vi.mock('@/components/IntegrationCard', () => ({
  IntegrationCard: ({ integration }) => (
    <div data-testid="integration-card">{integration.name}</div>
  ),
}))

const filterCategories = [
  {
    group: 'Type',
    options: [
      { slug: 'automation', title: 'Automation' },
      { slug: 'analytics', title: 'Analytics' },
      { slug: 'empty-cat', title: 'Empty Category' },
    ],
  },
]

const integrations = [
  {
    name: 'Zapier',
    url: 'https://zapier.com',
    pages: [{ slug: 'automation', title: 'Automation' }],
  },
  {
    name: 'Make',
    url: 'https://make.com',
    pages: [{ slug: 'automation', title: 'Automation' }],
  },
  {
    name: 'Mixpanel',
    url: 'https://mixpanel.com',
    pages: [{ slug: 'analytics', title: 'Analytics' }],
  },
]

describe('IntegrationsFilter', () => {
  describe('filtering behaviour', () => {
    it('shows all integrations when no filter active', () => {
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )
      const cards = screen.getAllByTestId('integration-card')
      expect(cards).toHaveLength(3)
    })

    it('shows only matching integrations after clicking a filter button', async () => {
      const user = userEvent.setup()
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )

      // Click the Analytics desktop button
      const buttons = screen.getAllByRole('button', { name: /analytics/i })
      // Use the desktop button (the one with aria-pressed)
      const desktopBtn = buttons.find((b) => b.hasAttribute('aria-pressed'))
      await user.click(desktopBtn)

      const cards = screen.getAllByTestId('integration-card')
      expect(cards).toHaveLength(1)
      expect(cards[0]).toHaveTextContent('Mixpanel')
    })

    it('clicking active filter again clears it (toggles off)', async () => {
      const user = userEvent.setup()
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )

      const buttons = screen.getAllByRole('button', { name: /analytics/i })
      const desktopBtn = buttons.find((b) => b.hasAttribute('aria-pressed'))
      await user.click(desktopBtn) // activate
      await user.click(desktopBtn) // deactivate

      const cards = screen.getAllByTestId('integration-card')
      expect(cards).toHaveLength(3)
    })

    it('updates status text with count', async () => {
      const user = userEvent.setup()
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )

      const buttons = screen.getAllByRole('button', { name: /analytics/i })
      const desktopBtn = buttons.find((b) => b.hasAttribute('aria-pressed'))
      await user.click(desktopBtn)

      expect(screen.getByRole('status')).toHaveTextContent(
        'Showing 1 integration',
      )
    })
  })

  describe('category view', () => {
    it('renders category section headings', () => {
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )
      expect(
        screen.getByRole('heading', { name: 'Automation' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'Analytics' }),
      ).toBeInTheDocument()
    })

    it('groups integrations under correct heading', () => {
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )
      const automationSection = screen
        .getByRole('heading', { name: 'Automation' })
        .closest('section')
      const cards = within(automationSection).getAllByTestId('integration-card')
      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent('Zapier')
      expect(cards[1]).toHaveTextContent('Make')
    })

    it('does not render categories with zero matches', () => {
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )
      expect(
        screen.queryByRole('heading', { name: 'Empty Category' }),
      ).not.toBeInTheDocument()
    })
  })

  describe('button row', () => {
    it('All button has aria-pressed=true initially', () => {
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )
      // Desktop button row has aria-pressed attribute
      const allButtons = screen.getAllByRole('button', { name: 'All' })
      const desktopAll = allButtons.find((b) => b.hasAttribute('aria-pressed'))
      expect(desktopAll).toHaveAttribute('aria-pressed', 'true')
    })

    it('selected category button has aria-pressed=true', async () => {
      const user = userEvent.setup()
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )

      const buttons = screen.getAllByRole('button', { name: /analytics/i })
      const desktopBtn = buttons.find((b) => b.hasAttribute('aria-pressed'))
      await user.click(desktopBtn)

      expect(desktopBtn).toHaveAttribute('aria-pressed', 'true')
    })

    it('shows count in parentheses on category buttons', () => {
      render(
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={filterCategories}
        />,
      )
      const buttons = screen.getAllByRole('button', { name: /automation/i })
      const desktopBtn = buttons.find((b) => b.hasAttribute('aria-pressed'))
      expect(desktopBtn).toHaveTextContent('(2)')
    })
  })
})
