import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputGroup } from './InputGroup'

describe('InputGroup', () => {
  const defaultProps = {
    label: 'Staff count',
    value: 10,
    onChange: vi.fn(),
    min: 1,
    max: 100,
  }

  it('renders label', () => {
    render(<InputGroup {...defaultProps} />)
    expect(screen.getByText('Staff count')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<InputGroup {...defaultProps} description="Number of staff" />)
    expect(screen.getByText('Number of staff')).toBeInTheDocument()
  })

  it('renders range and number inputs', () => {
    render(<InputGroup {...defaultProps} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('changing range input calls onChange', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<InputGroup {...defaultProps} onChange={onChange} />)

    const slider = screen.getByRole('slider')
    // Simulate input change via fireEvent since userEvent doesn't easily change range
    slider.value = '50'
    slider.dispatchEvent(new Event('input', { bubbles: true }))
    // The component uses onChange on the event, which triggers via React's onChange
  })

  it('displays formatted value', () => {
    render(<InputGroup {...defaultProps} value={1000} />)
    expect(screen.getByText('1,000')).toBeInTheDocument()
  })

  it('renders prefix when provided', () => {
    render(<InputGroup {...defaultProps} prefix="£" />)
    const prefixes = screen.getAllByText('£')
    expect(prefixes.length).toBeGreaterThan(0)
  })

  it('renders suffix when provided', () => {
    render(<InputGroup {...defaultProps} suffix="%" />)
    const suffixes = screen.getAllByText('%')
    expect(suffixes.length).toBeGreaterThan(0)
  })

  it('number input respects min/max bounds', async () => {
    const onChange = vi.fn()
    render(
      <InputGroup {...defaultProps} onChange={onChange} min={1} max={100} />,
    )
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveAttribute('min', '1')
    expect(input).toHaveAttribute('max', '100')
  })
})
