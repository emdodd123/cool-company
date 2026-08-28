# Implementation Plan: Homepage Boilerplate

**Branch**: `001-homepage-boilerplate` | **Date**: 2026-08-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-homepage-boilerplate/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Stand up a boilerplate React single-page app with a shared header (logo top-left,
centered 3-item nav: Home / Products / About Us) and one fully-built Home page
showing the heading "Welcome to The Cool Company" plus an image. Products and
About Us route to simple "coming soon" placeholder pages (per spec FR-007) so the
nav is fully clickable even though only Home has real content yet. Built with
Vite + React + React Router, plain CSS, no backend/storage — matches Simplicity
First since there's no data beyond static UI content.

## Technical Context

**Language/Version**: JavaScript (ES2020+), React 18

**Primary Dependencies**: React 18, react-router-dom (client-side routing for Home/Products/About Us), Vite (dev server + build)

**Storage**: N/A — static content only, no persistence

**Testing**: Vitest + React Testing Library — smoke tests that assert key content actually renders (welcome heading, image, logo, all 3 nav items, placeholder pages)

**Target Platform**: Modern desktop and mobile browsers, served as a static site

**Project Type**: Single frontend web application (no backend)

**Performance Goals**: Home page fully rendered within ~2s on a standard broadband connection (matches spec SC-003)

**Constraints**: No backend/API calls; layout must stay usable/legible from mobile widths (375px) up through desktop (spec SC-002)

**Scale/Scope**: 1 shared header/nav component + 1 real page (Home) + 2 placeholder pages (Products, About Us); no auth, no multi-user concerns

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Simplicity First**: PASS. Vite + React + react-router-dom is the minimal standard toolchain for a multi-route React app; no state-management library, CSS framework, or backend added since nothing in the spec needs them.
- **II. Pragmatic Testing**: PASS. This is UI that can break silently (wrong/missing heading text, missing nav item, broken image) without a crash, so a small set of smoke tests is warranted rather than skipped — but full TDD/exhaustive coverage isn't required for a boilerplate page.
- **III. Clear Documentation**: PASS. quickstart.md records how to run/validate the app; any non-obvious choice (e.g., placeholder image/logo strategy) is noted in research.md rather than left implicit.
- **IV. Working, Correct Implementation (NON-NEGOTIABLE)**: PASS (plan intent). Plan requires running the dev server and smoke tests to confirm actual rendering — not just writing code and assuming it works.

No violations — Complexity Tracking table not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-homepage-boilerplate/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
# Option 1 (adapted): Single frontend project — no backend exists or is needed
index.html
vite.config.js
package.json

src/
├── main.jsx                # App entry point, router setup
├── App.jsx                 # Top-level layout: renders Header + routed page
├── components/
│   ├── Header.jsx           # Logo (top-left) + NavMenu (centered)
│   ├── Header.css
│   ├── NavMenu.jsx
│   └── NavMenu.css
├── pages/
│   ├── Home.jsx              # Welcome heading + image
│   ├── Home.css
│   ├── ComingSoon.jsx        # Shared placeholder for Products / About Us
│   └── ComingSoon.css
└── assets/
    ├── logo-placeholder.svg
    └── home-placeholder.svg

tests/
└── unit/
    ├── Header.test.jsx       # logo + 3 nav items render, in order
    ├── Home.test.jsx         # welcome heading text + image render
    └── App.test.jsx          # nav clicks route to Home/ComingSoon correctly
```

**Structure Decision**: Single-project frontend (no backend directory) — the repo
root *is* the app. There's no existing project scaffold, so this plan creates one
from scratch with Vite's standard `src/` layout, split into `components/` (shared
header/nav) and `pages/` (route-level views), matching the natural seams in the
spec (header is shared across all pages; Home/Products/About Us are separate
pages).

## Complexity Tracking

*No violations — section not applicable.*
