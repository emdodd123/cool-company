# Quickstart: Homepage Boilerplate

Validates the feature end-to-end once implemented. See [data-model.md](./data-model.md)
for content shapes and [contracts/ui-contract.md](./contracts/ui-contract.md) for
the exact render guarantees being checked.

## Prerequisites

- Node.js (LTS) and npm installed

## Setup

```bash
npm install
```

## Run the app

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## Manual validation (maps to spec Acceptance Scenarios)

1. **Home content** (US1): Page loads showing the heading "Welcome to The Cool
   Company" and an image.
2. **Header/branding** (US2): Logo visible in the top-left corner; a centered
   menu shows exactly "Home", "Products", "About Us" in that order.
3. **Navigation works** (US2, US3):
   - Click "Home" → stays on / returns to the home page.
   - Click "Products" → shows a "coming soon"-style placeholder, no error/blank page.
   - Click "About Us" → same, placeholder for About Us.
4. **Responsive check** (SC-002): Resize the browser (or use dev tools device
   toolbar) to ~375px wide and to a standard desktop width (~1280px) — logo, nav,
   heading, and image all remain visible without horizontal scrolling.

## Run automated smoke tests

```bash
npm run test
```

Expected: all tests in `tests/unit/` pass (`Header.test.jsx`, `Home.test.jsx`,
`App.test.jsx`), confirming the render guarantees in the UI contract — not just
that the app compiles.

## Build check

```bash
npm run build
```

Expected: production build completes without errors (confirms the app is
deployable as a static site, per Technical Context's "static hosting" target).
