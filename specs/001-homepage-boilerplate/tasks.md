---

description: "Task list template for feature implementation"
---

# Tasks: Homepage Boilerplate

**Input**: Design documents from `/specs/001-homepage-boilerplate/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Included. plan.md's Constitution Check calls for smoke tests (Pragmatic
Testing + Working, Correct Implementation principles) covering the content most
likely to break silently — the welcome heading, the image, the logo, the 3 nav
items, and routing to the placeholder pages.

**Organization**: Tasks are grouped by user story (from spec.md) to enable
independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in each description

## Path Conventions

Single frontend project at the repository root, per plan.md's Project Structure:
`src/`, `tests/unit/` at repo root — no backend directory.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Stand up the Vite + React project and its tooling

- [X] T001 Scaffold a Vite + React (JavaScript) app at the repository root — `npm create vite@latest . -- --template react` — producing `index.html`, `vite.config.js`, `package.json`, `src/main.jsx`, `src/App.jsx`
- [X] T002 [P] Add `react-router-dom` as a dependency (`npm install react-router-dom`)
- [X] T003 [P] Add Vitest + `@testing-library/react` + `jsdom` as dev dependencies, configure a `test` script in `package.json`, and add a `tests/unit/` jsdom test environment in `vite.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Routing skeleton that every user story's pages plug into

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 [P] Add placeholder image assets `src/assets/logo-placeholder.svg` and `src/assets/home-placeholder.svg` (per data-model.md LogoAsset/HomePageImage, research.md placeholder-asset decision)
- [X] T005 Wrap the app in a router: update `src/main.jsx` to render `<App />` inside `<BrowserRouter>`
- [X] T006 Create `src/App.jsx` with an empty `<Routes>` block ready to receive route entries (no routes defined yet — user stories below add their own)

**Checkpoint**: Routing skeleton in place — user story phases can now add pages and routes.

---

## Phase 3: User Story 1 - Visitor sees the welcome message and image (Priority: P1) 🎯 MVP

**Goal**: Home page displays the heading "Welcome to The Cool Company" and an image.

**Independent Test**: Load the home page (`/`) and verify the heading text and an image are both visible — no header/nav required for this checkpoint.

### Tests for User Story 1 ⚠️

> Write these first; they should fail until the implementation tasks below are done.

- [X] T007 [P] [US1] Smoke test in `tests/unit/Home.test.jsx` asserting the rendered `Home` component shows the exact heading text "Welcome to The Cool Company" and an `<img>` with non-empty `alt` text (per contracts/ui-contract.md Home guarantees)

### Implementation for User Story 1

- [X] T008 [P] [US1] Create `src/pages/Home.jsx` rendering the heading "Welcome to The Cool Company" and an `<img>` sourced from `src/assets/home-placeholder.svg` with descriptive `alt` text
- [X] T009 [P] [US1] Create `src/pages/Home.css` with basic layout styling for the heading and image
- [X] T010 [US1] Add the `/` route in `src/App.jsx` rendering `<Home />` (depends on T006, T008)

**Checkpoint**: User Story 1 is fully functional and testable independently — home page shows the welcome heading and image.

---

## Phase 4: User Story 2 - Visitor sees branding and site navigation (Priority: P2)

**Goal**: Logo appears top-left; a centered nav with Home/Products/About Us appears on every page; Home nav item works.

**Independent Test**: Load the home page and verify the logo is top-left, the nav shows exactly the 3 items centered in order, and selecting "Home" keeps/returns the visitor to the home page.

### Tests for User Story 2 ⚠️

- [X] T011 [P] [US2] Smoke test in `tests/unit/Header.test.jsx` asserting the `Header` component renders a logo and exactly 3 nav items with labels "Home", "Products", "About Us" in that order (per contracts/ui-contract.md Header guarantees)
- [X] T012 [P] [US2] Smoke test in `tests/unit/App.test.jsx` asserting that clicking the "Home" nav item keeps the visitor on (or returns them to) the home page

### Implementation for User Story 2

- [X] T013 [P] [US2] Create a nav items config (Home → `/`, Products → `/products`, About Us → `/about-us`) and `src/components/NavMenu.jsx` rendering the 3 links in order
- [X] T014 [P] [US2] Create `src/components/NavMenu.css` for a horizontally centered menu layout
- [X] T015 [US2] Create `src/components/Header.jsx` rendering the logo (from `src/assets/logo-placeholder.svg`, top-left) plus `<NavMenu />` (depends on T013)
- [X] T016 [P] [US2] Create `src/components/Header.css` positioning the logo top-left and the nav centered, remaining usable at both ~375px and ~1280px+ widths (FR-008, SC-002)
- [X] T017 [US2] Render `<Header />` in `src/App.jsx`, persistent above the routed page content on every route (depends on T006, T015)

**Checkpoint**: User Stories 1 AND 2 both work — home page has working header, logo, and nav; "Home" nav item functions correctly.

---

## Phase 5: User Story 3 - Visitor explores navigation items for pages not yet built (Priority: P3)

**Goal**: Selecting "Products" or "About Us" shows a placeholder page instead of a dead link or error.

**Independent Test**: From the home page, select "Products" then "About Us" and verify each shows a non-error placeholder page (per FR-007, SC-004).

### Tests for User Story 3 ⚠️

- [X] T018 [P] [US3] Smoke test (extend `tests/unit/App.test.jsx`) asserting that selecting "Products" and "About Us" each render the `ComingSoon` placeholder with the matching title, with no error thrown

### Implementation for User Story 3

- [X] T019 [P] [US3] Create `src/pages/ComingSoon.jsx` accepting a `title` prop and rendering a "coming soon" style message for that section (per contracts/ui-contract.md ComingSoon guarantees)
- [X] T020 [P] [US3] Create `src/pages/ComingSoon.css` with basic placeholder-page styling
- [X] T021 [US3] Add `/products` and `/about-us` routes in `src/App.jsx` rendering `<ComingSoon title="Products" />` and `<ComingSoon title="About Us" />` respectively (depends on T006, T019)

**Checkpoint**: All user stories are independently functional — every nav item leads to a valid, non-error page.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the whole feature works end-to-end and is documented

- [X] T022 [P] Walk through quickstart.md's manual validation steps (welcome content, header/branding, all 3 nav items, responsive check at ~375px and ~1280px) and fix any layout issues found in `src/components/Header.css`, `src/components/NavMenu.css`, or `src/pages/Home.css`
- [X] T023 Run `npm run build` and confirm the production build completes without errors
- [X] T024 [P] Add a root `README.md` documenting how to install, run the dev server, run tests, and build, per quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational only; independently testable without US3 (nav to Products/About Us just won't have a route yet until US3 lands)
- **User Story 3 (Phase 5)**: Depends on Foundational only; independently addable once US2's `NavMenu` exists (nav items already link to `/products`/`/about-us` from T013)
- **Polish (Phase 6)**: Depends on all three user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependencies on US2/US3 — can be built and validated alone (home page only, no header).
- **US2 (P2)**: No dependencies on US1's internals, but is more meaningfully demoed once US1 exists (a page for the header to sit above).
- **US3 (P3)**: Reuses the nav links `NavMenu` (US2) already points at `/products`/`/about-us`; only needs to add the routes/pages those links resolve to.

### Parallel Opportunities

- T002 and T003 (Setup) can run in parallel.
- T004, T005/T006 (Foundational) — T004 can run in parallel with T005/T006.
- Within each user story, tasks marked `[P]` (different files) can run in parallel; the final wiring task in `src/App.jsx` (T010, T017, T021) is sequential since all three touch the same file.
- Once Foundational (Phase 2) is done, US1, US2, and US3 implementation work could be staffed in parallel — but all three still edit `src/App.jsx`, so those specific wiring tasks (T010, T017, T021) must be applied one at a time.

---

## Parallel Example: User Story 1

```bash
# Launch the test and the two independent implementation files together:
Task: "Smoke test in tests/unit/Home.test.jsx asserting heading + image render"
Task: "Create src/pages/Home.jsx rendering the welcome heading and image"
Task: "Create src/pages/Home.css with basic layout styling"
# Then, sequentially (same file as Foundational's App.jsx):
Task: "Add the / route in src/App.jsx rendering <Home />"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (routing skeleton)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: `npm run dev`, confirm the welcome heading + image render at `/`, run `npm run test`
5. This is a demoable MVP: a working home page, even without header/nav yet

### Incremental Delivery

1. Setup + Foundational → routing skeleton ready
2. Add US1 → validate → demo (MVP: home content works)
3. Add US2 → validate → demo (branding + working nav)
4. Add US3 → validate → demo (Products/About Us no longer dead links)
5. Polish (Phase 6) → final responsive/build/docs pass

---

## Notes

- `[P]` tasks touch different files and have no dependencies on each other.
- `[Story]` labels map each task to its user story for traceability back to spec.md.
- T010, T017, and T021 all edit `src/App.jsx` — do these one at a time, in phase order, even if other tasks in their phases run in parallel.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently before moving to the next.
