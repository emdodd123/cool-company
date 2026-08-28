# Data Model: Homepage Boilerplate

This feature has no persisted or dynamic data — no database, no API responses,
no user input. The "entities" from the spec are static UI content/config,
documented here as the shapes the components consume.

## NavigationItem

Represents one entry in the header's nav menu (spec: FR-005, FR-006).

| Field   | Type   | Notes                                                        |
|---------|--------|---------------------------------------------------------------|
| label   | string | Display text — one of "Home", "Products", "About Us"          |
| path    | string | Route it links to — `/`, `/products`, `/about-us`             |

- **Cardinality**: Exactly 3, fixed order (Home, Products, About Us) — spec FR-005.
- **Source**: Hardcoded config array in the app (e.g., `src/components/NavMenu.jsx`); not user-editable, not fetched from anywhere.
- **Validation**: None beyond what's fixed at build time — no runtime input.

## LogoAsset

Represents the company logo shown top-left in the header (spec: FR-004).

| Field       | Type   | Notes                                                    |
|-------------|--------|-----------------------------------------------------------|
| src         | string | Path to the image file (placeholder until supplied)       |
| altText     | string | Accessible alt text, e.g., "The Cool Company"              |

- **State transitions**: `placeholder → final` — a one-time manual swap when the
  real logo file is provided (research.md → Placeholder assets).

## HomePageImage

Represents the image shown on the Home page (spec: FR-003).

| Field       | Type   | Notes                                                    |
|-------------|--------|-------------------------------------------------------------|
| src         | string | Path to the image file (placeholder until supplied)        |
| altText     | string | Accessible alt text describing the image                   |

- **State transitions**: `placeholder → final`, same as LogoAsset.

## Relationships

- `Header` renders one `LogoAsset` + the fixed list of `NavigationItem`s.
- `Home` page renders one `HomePageImage` alongside the welcome heading.
- No entity relates to user accounts, sessions, or any backend store — all three
  are static, build-time content.
