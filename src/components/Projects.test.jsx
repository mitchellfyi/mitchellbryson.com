import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

const mockProjects = [
  {
    name: 'launchonomy',
    description: 'Orchestrate AI agents to complete missions.',
  },
  {
    name: 'lofield.fm',
    description: 'Create lofi beats using natural language.',
  },
  {
    name: 'inbox-triage-extension',
    description: 'AI-powered email summaries.',
  },
]

describe('Projects', () => {
  it('renders all project names', () => {
    render(<Projects projects={mockProjects} />)
    expect(screen.getByText('launchonomy')).toBeInTheDocument()
    expect(screen.getByText('lofield.fm')).toBeInTheDocument()
    expect(screen.getByText('inbox-triage-extension')).toBeInTheDocument()
  })

  it('renders all project descriptions', () => {
    render(<Projects projects={mockProjects} />)
    for (const project of mockProjects) {
      expect(screen.getByText(project.description)).toBeInTheDocument()
    }
  })

  it('links each project to its internal detail page', () => {
    render(<Projects projects={mockProjects} />)
    const launchonomyLink = screen.getByRole('link', { name: 'launchonomy' })
    expect(launchonomyLink).toHaveAttribute('href', '/projects/launchonomy')
  })

  it('converts dots to hyphens in project slugs', () => {
    render(<Projects projects={mockProjects} />)
    const lofieldLink = screen.getByRole('link', { name: 'lofield.fm' })
    expect(lofieldLink).toHaveAttribute('href', '/projects/lofield-fm')
  })

  it('renders the "View all projects" link', () => {
    render(<Projects projects={mockProjects} />)
    const viewAllLink = screen.getByRole('link', { name: 'View all projects' })
    expect(viewAllLink).toHaveAttribute('href', '/projects')
  })

  it('renders a heading', () => {
    render(<Projects projects={mockProjects} />)
    expect(
      screen.getByRole('heading', { name: 'Projects' }),
    ).toBeInTheDocument()
  })

  it('renders an ordered list of projects', () => {
    render(<Projects projects={mockProjects} />)
    const list = screen.getByRole('list')
    const items = screen.getAllByRole('listitem')
    expect(list.tagName).toBe('OL')
    expect(items).toHaveLength(mockProjects.length)
  })

  it('does not link externally to GitHub', () => {
    render(<Projects projects={mockProjects} />)
    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link.getAttribute('href')).not.toMatch(/github\.com/)
      expect(link).not.toHaveAttribute('target', '_blank')
    }
  })
})
