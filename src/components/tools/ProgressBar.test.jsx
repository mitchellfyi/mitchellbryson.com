import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders "Question X of Y" text', () => {
    render(<ProgressBar current={0} total={6} />)
    expect(screen.getByText('Question 1 of 6')).toBeInTheDocument()
  })

  it('uses custom label', () => {
    render(<ProgressBar current={2} total={5} label="Step" />)
    expect(screen.getByText('Step 3 of 5')).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<ProgressBar current={2} total={6} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '3')
    expect(bar).toHaveAttribute('aria-valuemin', '1')
    expect(bar).toHaveAttribute('aria-valuemax', '6')
  })

  it('progress bar width matches current/total ratio', () => {
    const { container } = render(<ProgressBar current={1} total={4} />)
    const inner = container.querySelector('[style]')
    expect(inner.style.width).toBe('50%')
  })

  it('shows 100% on last question', () => {
    const { container } = render(<ProgressBar current={5} total={6} />)
    const inner = container.querySelector('[style]')
    expect(inner.style.width).toBe('100%')
  })
})
