# Implementation Plan: Implement Design Style Guide (Minimalist Monochrome)

**Branch**: `002-implement-design-style-guide` | **Date**: 2026-08-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-implement-design-style-guide/spec.md`

## Summary

Restyle the existing homepage app (`001-homepage-boilerplate`) to the Minimalist
Monochrome design system: pure black/white palette, serif display + body
typography, 0px border-radius everywhere, no shadows, rule-line dividers instead
of color blocks, an oversized responsive heading scale, and instant (≤100ms)
hover/focus transitions with visible keyboard-focus outlines. This is a pure
CSS/markup restyle — no new routes, components, dependencies, or data. Design
tokens (colors, type scale, border weights) are centralized as CSS custom
properties so every existing stylesheet (`Header.css`, `NavMenu.css`, `Home.css`,
`ComingSoon.css`) references them instead of hardcoded values, matching
Simplicity First (one small new file, no CSS framework added).

## Technical Context

**Language/Version**: JavaScript (ES2020+), React 18 — unchanged from 001

**Primary Dependencies**: None added. Reuses the existing Vite + React +
react-router-dom stack. Fonts (Playfair Display, Source Serif 4, JetBrains Mono)
are loaded via a Google Fonts `<link>` tag in `index.html` — no font-loading
library or build plugin needed.

**Storage**: N/A — unchanged, static content only

**Testing**: Vitest + React Testing Library, extended with `test.css: true` in
`vite.config.js` so jsdom actually applies imported CSS and `getComputedStyle`
reflects real values. A small number of smoke tests assert the token-driven
values that matter functionally (0px border-radius, no box-shadow on key
elements, palette colors on `<body>`); full visual fidelity (oversized type
rhythm, rule-line placement, hover choreography) is verified manually via the
dev server per Constitution Principle IV, since pixel-level visual-regression
tooling would be disproportionate for a learning project (Simplicity First).

**Target Platform**: Modern desktop and mobile browsers, static site — unchanged

**Project Type**: Single frontend web application (no backend) — unchanged

**Performance Goals**: No regression vs. 001's ~2s render budget; web fonts use
`font-display: swap` so text is never blocked on font load

**Constraints**: No new dependencies (Simplicity First); must not change any
functional behavior already verified in 001 (routes, nav labels/order, heading
text) — restyle only; must preserve legibility from 375px mobile through
desktop widths

**Scale/Scope**: 1 new global tokens/fonts stylesheet + edits to 4 existing
component/page stylesheets + 1 `index.html` font `<link>` + 1 test-config change;
no new components, pages, or routes

## Design Decisions

- **Design tokens as CSS custom properties**: `src/styles/tokens.css` defines
  `:root` variables for the 5 palette colors, the type scale (mobile + desktop
  heading sizes via `clamp()`), font stacks, border weights (hairline/thin/
  medium/thick), and the 100ms transition duration. Every other stylesheet
  reads these variables rather than hardcoding hex values or px sizes, so the
  palette/scale stays single-sourced (spec FR-001–FR-003, FR-013).
- **`clamp()` for the oversized heading** instead of separate mobile/desktop
  media-query rules: `font-size: clamp(3.5rem, 4rem + 4vw, 6rem)` satisfies
  spec FR-002 (≥56px mobile, ≥96px desktop) with one declaration and scales
  smoothly in between, rather than jumping at a breakpoint.
- **Google Fonts `<link>` in `index.html`** rather than `@import` in CSS or a
  self-hosting/build-plugin approach: simplest option that still allows a
  `font-display: swap`-equivalent (Google's served CSS sets this), keeping
  FR-013's fallback-on-failure requirement satisfied without adding tooling.
- **`:focus-visible` for keyboard-only outlines** (spec FR-009): applied once,
  generically, to interactive elements (nav links, the future placeholder-page
  links) via a shared selector in `tokens.css`, rather than repeating the same
  outline rule in each component's stylesheet.
- **Rule lines via `border` on existing elements**, not new wrapper `<div>`s:
  the header/content boundary and the placeholder-page framing reuse the
  `Header.css` / `ComingSoon.css` elements' existing `border-bottom`/`border`
  properties, just switched to the token's thick black rule — avoids adding
  markup for a purely visual change (Simplicity First).
- **Image framing via `border` + `box-sizing`**, not a new `<figure>` wrapper:
  `.home-image` gets a solid black border and `border-radius: 0` directly;
  no new component needed since `Home.jsx` already renders a single `<img>`.
- **`ComingSoon.jsx` markup unchanged**, only `ComingSoon.css` restyled: FR-010
  needs a consistent look, not new content, so the placeholder page's existing
  heading + text structure is kept.
- **No new dependency for textures/noise**: the style guide's decorative
  textures (noise, grid, diagonal lines) are implemented as inline CSS
  `background-image` gradients directly in the relevant stylesheet where used,
  per the spec's Assumptions (optional polish, ≤3% opacity) — skipped
  entirely if they'd meaningfully complicate a given component, since they're
  non-functional.

## Constitution Check

- **I. Simplicity First**: PASS. No new runtime dependency; one new small CSS
  file (tokens) plus edits to existing files; fonts loaded via a plain `<link>`
  tag.
- **II. Pragmatic Testing**: PASS. Adds smoke tests for the token-driven values
  that could silently regress (border-radius, box-shadow, palette color) via
  `getComputedStyle`; does not attempt automated pixel-perfect visual testing,
  which would be disproportionate — full visual fidelity is manually verified
  against the running dev server instead.
- **III. Clear Documentation**: PASS. Non-obvious choices (why `clamp()`, why
  `<link>` fonts over `@import`, why textures are optional) are recorded above
  rather than left implicit.
- **IV. Working, Correct Implementation (NON-NEGOTIABLE)**: PASS (plan intent).
  Plan requires running the dev server and visually confirming the palette,
  type scale, sharp corners, rule lines, and hover/focus states actually render
  as specified — not just that the CSS compiles.

No violations — Complexity Tracking table not needed.

## File Structure

```text
index.html                        # + <link> tags for Playfair Display, Source Serif 4, JetBrains Mono
vite.config.js                    # + test.css: true

src/
├── main.jsx                      # + import './styles/tokens.css'
├── styles/
│   └── tokens.css                # NEW — palette, type scale, border weights, focus-visible rule, transition duration
├── components/
│   ├── Header.css                # MODIFIED — token colors, thick bottom rule, 0 radius
│   └── NavMenu.css                # MODIFIED — token colors/font, hover invert/underline, focus-visible outline
├── pages/
│   ├── Home.css                  # MODIFIED — display font + clamp() heading scale, image black border/0 radius
│   └── ComingSoon.css             # MODIFIED — token colors/font, consistent border treatment

tests/
└── unit/
    └── styles.test.jsx           # NEW — smoke tests: 0 border-radius, no box-shadow, body uses palette colors
```

**Structure Decision**: No structural change to the app — same single-project
Vite layout from 001. Adds one new `src/styles/` directory for shared tokens
(the natural seam for cross-component values, avoiding duplication across the
4 existing stylesheets) and one new test file; every other change is an edit
to an existing file, consistent with this being a restyle rather than a new
feature.

## Complexity Tracking

*No violations — section not applicable.*
