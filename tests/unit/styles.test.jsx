import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../../src/App.jsx'

const tokensSource = readFileSync(
  resolve(process.cwd(), 'src/styles/tokens.css'),
  'utf-8',
)

// jsdom's getComputedStyle does not resolve `var(...)` references inside a
// property value (e.g. `background-color: var(--color-background)` reports
// back the literal string, not the resolved color), so palette assertions
// read the custom property itself off :root instead of a property that
// consumes it via var(). Full visual application is verified manually
// against the dev server (see plan.md's testing strategy).
describe('Minimalist Monochrome design tokens', () => {
  it('defines the palette custom properties per spec FR-001', () => {
    render(<App />, { wrapper: MemoryRouter })
    const rootStyle = getComputedStyle(document.documentElement)

    expect(rootStyle.getPropertyValue('--color-background').trim()).toBe('#ffffff')
    expect(rootStyle.getPropertyValue('--color-foreground').trim()).toBe('#000000')
    expect(rootStyle.getPropertyValue('--color-muted').trim()).toBe('#f5f5f5')
    expect(rootStyle.getPropertyValue('--color-muted-foreground').trim()).toBe('#525252')
    expect(rootStyle.getPropertyValue('--color-border-light').trim()).toBe('#e5e5e5')
  })

  it('renders the header and home image with zero border-radius and no box-shadow', () => {
    render(<App />, { wrapper: MemoryRouter })
    const header = document.querySelector('.site-header')
    const image = document.querySelector('.home-image')

    expect(getComputedStyle(header).borderRadius).toBe('0px')
    expect(getComputedStyle(header).boxShadow).toBe('none')
    expect(getComputedStyle(image).borderRadius).toBe('0px')
    expect(getComputedStyle(image).boxShadow).toBe('none')
  })

  it('defines a 100ms instant-transition token per spec FR-008', () => {
    render(<App />, { wrapper: MemoryRouter })
    const rootStyle = getComputedStyle(document.documentElement)

    expect(rootStyle.getPropertyValue('--transition-instant').trim()).toBe('100ms')
  })

  // jsdom does not resolve `var(...)` inside the `outline` shorthand when
  // computing outlineStyle/outlineColor/outlineWidth, so this asserts the
  // rule exists in source rather than the (unobservable-in-jsdom) rendered
  // outcome; the actual keyboard-focus outline is confirmed by manually
  // tabbing through the page (spec FR-009, task T013's manual check).
  it('defines a shared, solid black focus-visible outline for links and buttons', () => {
    expect(tokensSource).toMatch(
      /a:focus-visible,\s*\n?button:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--color-foreground\);[^}]*outline-offset:\s*3px;/,
    )
  })
})
