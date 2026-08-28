# UI Contract: Homepage Boilerplate

This app has no backend API, so the "interface" worth contracting is the
component/route boundary — what each piece guarantees to render, so tests and
implementation agree on the same surface. Traces back to spec FR-001–FR-008.

## Routes

| Path         | Renders     | Spec ref    |
|--------------|-------------|-------------|
| `/`          | `Home`      | FR-001–003  |
| `/products`  | `ComingSoon` (title: "Products") | FR-007 |
| `/about-us`  | `ComingSoon` (title: "About Us") | FR-007 |
| any other    | Redirect or fallback to `/` (not otherwise specified) | — |

## `App`

- Renders `Header` once, persistent across all routes (FR-004).
- Renders the routed page below the header.

## `Header`

**Props**: none (logo + nav are fixed content, not passed in from outside).

**Guarantees**:
- Renders `LogoAsset` positioned top-left (FR-004).
- Renders exactly 3 `NavigationItem`s, horizontally centered, in order Home →
  Products → About Us (FR-005).
- Each nav item is a link; selecting "Home" routes to `/` (FR-006); selecting
  "Products"/"About Us" routes to their `ComingSoon` page (FR-007).
- Layout remains usable at both 375px and 1280px+ viewport widths (FR-008, SC-002).

## `Home`

**Props**: none.

**Guarantees**:
- Renders a heading with the exact text "Welcome to The Cool Company" (FR-002).
- Renders one `HomePageImage` with non-empty `alt` text (FR-003).

## `ComingSoon`

**Props**: `title: string` — the section name to display (e.g., "Products").

**Guarantees**:
- Renders a message indicating the page isn't built yet, without erroring or
  showing a blank/broken screen (FR-007).
- Never a browser 404 — matches spec SC-004 ("always a valid, non-error page").

## Test mapping

Each guarantee above is exercised by a corresponding test named in plan.md's
`tests/unit/` layout (`Header.test.jsx`, `Home.test.jsx`, `App.test.jsx`) — see
quickstart.md for how to run them.
