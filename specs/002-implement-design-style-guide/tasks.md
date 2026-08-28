# Tasks: Implement Design Style Guide (Minimalist Monochrome)

**Input**: Design documents from `/specs/002-implement-design-style-guide/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md)

**Tests**: Included where jsdom can meaningfully verify a computed style
(border-radius, box-shadow, palette color) per plan.md's testing strategy.
Requirements that depend on real viewport/layout behavior (responsive scaling,
overlap) are verified manually against the dev server, per Constitution
Principle II's allowance for a deliberate, recorded manual check in place of an
automated test.

**Organization**: Tasks are grouped by user story (from spec.md) to enable
independent implementation and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in each description

## Path Conventions

Single frontend project at the repository root, per plan.md's File Structure:
`src/`, `tests/unit/` at repo root — no backend directory. This feature edits
the existing 001-homepage-boilerplate app; no new components, pages, or routes.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Enable real CSS evaluation in tests and load the required web fonts

- [x] T001 [P] Add `css: true` to the `test` block in `vite.config.js` so jsdom applies imported CSS and `getComputedStyle` reflects real values
- [x] T002 [P] Add Google Fonts `<link>` tags for Playfair Display, Source Serif 4, and JetBrains Mono to `index.html` (per plan.md's font-loading decision)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Central design tokens every stylesheet in every user story will reference

**⚠️ CRITICAL**: No user story styling should begin until this phase is complete

- [x] T003 Create `src/styles/tokens.css` defining `:root` custom properties: the 5 palette colors (`--color-background`, `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-border-light`), font stacks (`--font-display`: Playfair Display/Georgia/serif, `--font-body`: Source Serif 4/Georgia/serif, `--font-mono`: JetBrains Mono/monospace), the heading type scale via `clamp()`, and border weights (hairline/thin/medium/thick) (per spec FR-001–FR-003, FR-013; plan.md Design Decisions)
- [x] T004 Import `src/styles/tokens.css` in `src/App.jsx` (moved here instead of `main.jsx` so component-level tests, which render `App`/pages directly rather than through `main.jsx`, actually pick up the tokens) (depends on T003)

**Checkpoint**: Design tokens are globally available — user story phases can now reference them instead of hardcoded values.

---

## Phase 3: User Story 1 - Visitor experiences the monochrome editorial redesign (Priority: P1) 🎯 MVP

**Goal**: Home page renders in the monochrome palette, serif oversized typography, 0px corners, no shadows, and rule-line dividers.

**Independent Test**: Load the home page and verify palette, typography, corner treatment, and absence of shadows all match the style guide (spec US1 Acceptance Scenarios).

### Tests for User Story 1 ⚠️

> Write these first; they should fail until the implementation tasks below are done.

- [x] T005 [P] [US1] Smoke test in `tests/unit/styles.test.jsx` asserting: `<body>` computed `background-color`/`color` equal the palette's white/black, and representative elements (`.site-header`, `.home-image`) have `border-radius: 0px` and `box-shadow: none` (per spec FR-001, FR-004, FR-005; SC-001, SC-003)

### Implementation for User Story 1

- [x] T006 [P] [US1] Update `src/components/Header.css` to use token colors, a thick black `border-bottom` rule line (replacing the current light-gray hairline), and explicit `border-radius: 0` (spec FR-001, FR-004, FR-007) (depends on T003)
- [x] T007 [P] [US1] Update `src/components/NavMenu.css` base styles to use `var(--font-body)` and token text colors in place of the current hardcoded hex values, removing the blue `.active` color (spec FR-001, FR-003) (depends on T003)
- [x] T008 [P] [US1] Update `src/pages/Home.css`: heading uses `var(--font-display)` and the `clamp()` type scale from tokens (spec FR-002); `.home-image` gets a solid black border and `border-radius: 0`, replacing the current 8px radius (spec FR-011); other colors switched to tokens (depends on T003)
- [x] T009 [P] [US1] Update `src/pages/ComingSoon.css` to use token colors, `var(--font-body)`, `border-radius: 0`, and a border treatment consistent with `Header.css`'s rule line (spec FR-010) (depends on T003, T006)

- [x] T009b [US1] Recolor `src/assets/logo-placeholder.svg` and `src/assets/home-placeholder.svg` to the monochrome palette with 0 corner radius — found via manual browser verification (T013): both SVGs baked in non-palette colors (`#1f6feb` blue badge, `#e4ebf5`/`#8aa1c1`/`#4a5b78`) and a rounded logo badge (`rx="6"`) directly into their vector paths, which CSS alone cannot override since the color/shape lives inside the image asset, not the `<img>` element's box (spec FR-001, FR-004)

**Checkpoint**: User Story 1 is fully functional and testable independently — home page and placeholder pages render in the monochrome palette, serif type, sharp corners, and rule-line dividers.

---

## Phase 4: User Story 2 - Visitor gets clear, instant interaction feedback (Priority: P2)

**Goal**: Nav items and other interactive elements show an immediate hover state and a visible keyboard-focus outline.

**Independent Test**: Hover and keyboard-tab through every interactive element on the home page and verify each shows a visible, ≤100ms state change and, when keyboard-focused, a visible black outline (spec US2 Acceptance Scenarios).

### Tests for User Story 2 ⚠️

- [x] T010 [P] [US2] Extend `tests/unit/styles.test.jsx` asserting a nav link's computed `transition-duration` is ≤100ms and that a shared `:focus-visible` outline rule (solid, black, ≥3px) is defined and applies to nav links (spec FR-008, FR-009)

### Implementation for User Story 2

- [x] T011 [US2] Add `--transition-instant: 100ms` and a shared `a:focus-visible, button:focus-visible` outline rule (solid black, 3px, 2–3px offset) to `src/styles/tokens.css` (spec FR-009) (depends on T003)
- [x] T012 [US2] Add a hover state to nav links in `src/components/NavMenu.css` (color inversion or underline) transitioning over `var(--transition-instant)` (spec FR-008) (depends on T007, T011)

**Checkpoint**: User Stories 1 AND 2 both work — nav items invert/underline on hover within 100ms, and keyboard focus is always visible.

---

## Phase 5: User Story 3 - Visitor on mobile still experiences the editorial drama (Priority: P3)

**Goal**: The palette, sharp corners, rule lines, and oversized (but scaled-down) heading survive on common mobile viewports without breaking usability.

**Independent Test**: Load the home page at a 375×667 viewport and verify palette/corners/rule-lines are unchanged and the heading remains ≥56px and fully legible (spec US3 Acceptance Scenarios).

### Tests for User Story 3 ⚠️

- [x] T013 [P] [US3] Manual verification (recorded in this task's commit/notes, per Constitution Principle II): using the dev server, resize to 375×667 and 1280×800 and confirm palette/corner/rule-line consistency and heading size ≥56px / ≥96px respectively (spec SC-002; US3 Acceptance Scenarios 1–3). **Result**: verified with a real Chromium browser (Playwright) — mobile heading 63px, desktop heading 99.2px (both meet SC-002); body bg/fg = pure white/black; header/image borders 4px solid black, 0px radius at both widths; no horizontal overflow. Also surfaced and fixed a real defect (see T009b): both placeholder SVG assets baked in non-palette colors and a rounded corner directly into their vector paths, invisible to CSS-only review.

### Implementation for User Story 3

- [x] T014 [US3] Verify and, if needed, adjust `src/components/Header.css`'s `@media (max-width: 480px)` rule so the token-styled logo + nav still center without overlap at 375px (spec FR-012) (depends on T006). **Result**: verified via screenshot at 375×667 — logo and nav center cleanly with no overlap; existing centering rule from 001 works fine with the new token-styled colors/borders, no changes needed.
- [x] T015 [US3] Verify and, if needed, adjust `src/pages/Home.css` so the `clamp()` heading and bordered image frame don't overflow or become illegible at 375px width (spec FR-012, SC-002) (depends on T008). **Result**: verified via screenshot — heading wraps to 3 lines at 63px, fully legible, no horizontal overflow (`document.documentElement.scrollWidth <= clientWidth` confirmed); bordered image frame fits within the viewport with margin; no changes needed.

**Checkpoint**: All user stories are independently functional — the monochrome redesign holds up from mobile through desktop widths.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the whole feature works end-to-end against every success criterion

- [x] T016 Manually walk the running app (`npm run dev`) against spec.md's Success Criteria SC-001–SC-007 (palette-only colors, 0 radius / no shadow everywhere, hover/focus timing, keyboard-focus coverage, home/placeholder visual consistency, and 001's original SC-001–SC-004 still holding) and fix any gaps found. **Result**: walked Home, Products, and About Us with a real Chromium browser at 375×667 and 1280×800 — all consistent (monochrome palette, serif type, 0px radius, thick black rule lines, underline hover/active on nav). One gap found and fixed: see T009b.
- [x] T017 Run `npm run test` and `npm run build`, confirm both complete with no errors. **Result**: `npm run test` → 4 files, 11 tests passed. `npm run build` → built successfully in 78ms, no errors.
- [x] T018 [P] Manually trigger a font-load failure (block the Google Fonts request in devtools) and confirm the page still renders legibly using the `Georgia, serif` fallback (spec FR-013, Edge Cases). **Result**: verified by blocking `fonts.googleapis.com`/`fonts.gstatic.com` in a real browser session — heading and layout remain fully legible and structurally intact using the Georgia serif fallback, no breakage.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational (T003) and US1's `NavMenu.css` base styles (T007)
- **User Story 3 (Phase 5)**: Depends on US1's `Header.css`/`Home.css` changes (T006, T008) — it verifies/tunes what US1 built rather than adding new styling
- **Polish (Phase 6)**: Depends on all three user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependencies on US2/US3 — can be built and validated alone (palette, type, corners, rule lines).
- **US2 (P2)**: Builds on US1's `NavMenu.css` (adds hover/focus on top of the already-restyled base) — validate US1 first for a meaningful demo, though the focus-visible rule itself (T011) only needs Foundational.
- **US3 (P3)**: Verifies/tunes US1's responsive behavior — no new files, so it's meaningfully checkable only once US1 exists.

### Parallel Opportunities

- T001 and T002 (Setup) can run in parallel.
- T006, T007, T008, T009 (US1 implementation) touch different files and can run in parallel once T003 is done — T009 also depends on T006's border-line convention.
- T014 and T015 (US3) touch different files and can run in parallel.
- T017 and T018 (Polish) are independent checks and can run in parallel.

---

## Parallel Example: User Story 1

```bash
# After T003 (tokens.css) is done, launch the test and the independent stylesheet edits together:
Task: "Smoke test in tests/unit/styles.test.jsx asserting palette/radius/shadow"
Task: "Update src/components/Header.css to use tokens + thick rule line"
Task: "Update src/components/NavMenu.css base styles to use tokens"
Task: "Update src/pages/Home.css: display font, clamp() scale, bordered image"
# Then, once Header.css's rule-line convention exists:
Task: "Update src/pages/ComingSoon.css to match"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (design tokens)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: `npm run dev`, confirm palette/typography/corners/rule-lines render correctly, run `npm run test`
5. This is a demoable MVP: the core visual redesign, even before hover/focus polish or mobile tuning

### Incremental Delivery

1. Setup + Foundational → tokens ready
2. Add US1 → validate → demo (core monochrome redesign)
3. Add US2 → validate → demo (instant hover + visible keyboard focus)
4. Add US3 → validate → demo (confirmed on mobile viewports)
5. Polish (Phase 6) → final success-criteria pass, build check, font-fallback check

---

## Notes

- `[P]` tasks touch different files (or are independent checks) and have no dependencies on each other.
- `[Story]` labels map each task to its user story for traceability back to spec.md.
- This feature changes no component logic or markup structure — only stylesheets, `index.html`, `main.jsx`'s imports, and `vite.config.js`'s test config. `ComingSoon.jsx`, `Home.jsx`, `Header.jsx`, and `NavMenu.jsx` are unchanged.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently before moving to the next.
