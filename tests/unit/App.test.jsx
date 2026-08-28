import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../../src/App.jsx'

describe('App navigation', () => {
  it('shows the home page by default and stays there when Home is clicked', () => {
    render(<App />, { wrapper: MemoryRouter })
    expect(
      screen.getByRole('heading', { name: 'Welcome to The Cool Company' }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Home' }))

    expect(
      screen.getByRole('heading', { name: 'Welcome to The Cool Company' }),
    ).toBeInTheDocument()
  })

  it('shows a Products placeholder page with no error when Products is clicked', () => {
    render(<App />, { wrapper: MemoryRouter })
    fireEvent.click(screen.getByRole('link', { name: 'Products' }))
    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument()
  })

  it('shows an About Us placeholder page with no error when About Us is clicked', () => {
    render(<App />, { wrapper: MemoryRouter })
    fireEvent.click(screen.getByRole('link', { name: 'About Us' }))
    expect(screen.getByRole('heading', { name: 'About Us' })).toBeInTheDocument()
  })
})
