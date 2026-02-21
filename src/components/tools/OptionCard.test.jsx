import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OptionCard } from './OptionCard'

describe('OptionCard', () => {
  it('renders option text', () => {
    render(
      <OptionCard
        text="Option A"
        index={0}
        selected={false}
        onSelect={() => {}}
      />,
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('calls onSelect with correct index when clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <OptionCard
        text="Option B"
        index={2}
        selected={false}
        onSelect={onSelect}
      />,
    )
    await user.click(screen.getByRole('radio'))
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('has aria-checked false when not selected', () => {
    render(
      <OptionCard
        text="Option"
        index={0}
        selected={false}
        onSelect={() => {}}
      />,
    )
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false')
  })

  it('has aria-checked true when selected', () => {
    render(
      <OptionCard
        text="Option"
        index={0}
        selected={true}
        onSelect={() => {}}
      />,
    )
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true')
  })

  it('applies teal border styling when selected', () => {
    const { container } = render(
      <OptionCard
        text="Option"
        index={0}
        selected={true}
        onSelect={() => {}}
      />,
    )
    const button = container.querySelector('button')
    expect(button.className).toContain('border-teal-500')
  })
})
