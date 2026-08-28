import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Header from '../../src/components/Header.jsx'

describe('Header', () => {
  it('renders a logo', () => {
    render(<Header />, { wrapper: MemoryRouter })
    expect(screen.getByAltText('The Cool Company')).toBeInTheDocument()
  })

  it('renders exactly 3 nav items in order', () => {
    render(<Header />, { wrapper: MemoryRouter })
    const links = screen.getAllByRole('link').filter((link) => link !== screen.getByAltText('The Cool Company').closest('a'))
    const labels = links.map((link) => link.textContent)
    expect(labels).toEqual(['Home', 'Products', 'About Us'])
  })
})
