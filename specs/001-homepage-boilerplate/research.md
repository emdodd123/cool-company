# Research: Homepage Boilerplate

No open `NEEDS CLARIFICATION` items from Technical Context — all choices below
are reasonable defaults for a boilerplate React app, recorded here for the record
per Constitution Principle III (Clear Documentation).

## Build tooling

- **Decision**: Vite (`npm create vite@latest`)
- **Rationale**: Fastest, lowest-config way to stand up a React app today; near-zero
  boilerplate config, fast dev server/HMR. Directly serves Simplicity First.
- **Alternatives considered**: Create React App (unmaintained, slower dev loop);
  Next.js (adds server-side rendering/routing conventions this static boilerplate
  doesn't need — rejected as unnecessary complexity for a spec with no backend).

## Language

- **Decision**: Plain JavaScript (JSX), not TypeScript
- **Rationale**: The spec has no complex data shapes or logic worth statically
  typing yet (a nav list, a heading, an image). Adding TypeScript now would be
  config/tooling for a hypothetical future need, which Simplicity First advises
  against. Can be introduced later if/when real data models show up (e.g., a
  Products catalog).
- **Alternatives considered**: TypeScript — common default for new React apps,
  but rejected for now as premature given current scope.

## Routing

- **Decision**: `react-router-dom` (v6+), with routes for `/`, `/products`, `/about-us`
- **Rationale**: FR-005–FR-007 require a real, clickable 3-item nav where Products
  and About Us resolve to actual (placeholder) pages rather than dead links —
  this is exactly what client-side routing is for. It's the standard, minimal way
  to do this in a React SPA.
- **Alternatives considered**: Conditional rendering with local state instead of
  a router — rejected because it doesn't give pages real, shareable/bookmarkable
  URLs, which is expected default behavior for a multi-page site.

## Styling

- **Decision**: Plain CSS files per component (e.g., `Header.css`), no CSS
  framework or CSS-in-JS library
- **Rationale**: The layout needs (top-left logo, centered nav, responsive
  header) are achievable with plain flexbox CSS. Adding Tailwind/styled-components
  would be a dependency not justified by current needs (Simplicity First).
- **Alternatives considered**: Tailwind CSS (fast to build with, but an added
  dependency/build step not yet needed); CSS Modules (marginal benefit at this
  scale, since there's no class-name collision risk yet).

## Testing

- **Decision**: Vitest + `@testing-library/react` for a small set of smoke tests
- **Rationale**: Per constitution Principle II (Pragmatic Testing) and Principle
  IV (Working, Correct Implementation), UI content like the welcome heading, the
  3 nav items, and the image aren't safely verifiable by inspection alone (a typo
  or missing element won't crash anything) — a few rendering assertions catch
  silent breakage cheaply. Vitest is the natural pairing with Vite (shares config,
  fast).
- **Alternatives considered**: Jest (extra config to work with Vite, no benefit
  over Vitest here); no automated tests (rejected — contradicts Principle IV,
  since visual-only inspection wouldn't reliably catch a missing nav item).

## Placeholder assets (logo, home image)

- **Decision**: Ship simple local placeholder SVGs (`assets/logo-placeholder.svg`,
  `assets/home-placeholder.svg`) referenced by the Logo and Home components, to be
  swapped for the user-supplied files later.
- **Rationale**: Per spec Assumptions, the real logo and home page image are not
  yet supplied. Placeholders let the layout be built and verified now without
  blocking on external assets, and the swap-in point is a single file replacement.
- **Alternatives considered**: Remote placeholder image service (e.g.,
  placeholder.com) — rejected: adds an external network dependency for something
  a trivial local SVG solves, and would silently break if the page is used
  offline or the service goes down.
