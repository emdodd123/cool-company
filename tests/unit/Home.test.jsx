import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from '../../src/pages/Home.jsx'

describe('Home', () => {
  it('renders the welcome heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'Welcome to The Cool Company' }),
    ).toBeInTheDocument()
  })

  it('renders an image with alt text', () => {
    render(<Home />)
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('alt')).not.toBe('')
  })
})
