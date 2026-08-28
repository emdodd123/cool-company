<!--
Sync Impact Report
- Version change: none → 1.0.0 (initial ratification)
- Modified principles: n/a (first adoption)
- Added sections:
  - Core Principles: I. Simplicity First, II. Pragmatic Testing, III. Clear Documentation
    (template's Principles IV and V omitted — this is a lightweight learning/practice
    project and does not need library-first/CLI-interface/integration-testing/
    observability-versioning ceremony; revisit if the project grows into something
    with real deployment or multi-consumer surfaces)
  - Workflow & Tooling (replaces template's two generic "Additional Constraints" /
    "Development Workflow" slots, merged into one section since a minimal project
    doesn't need both)
  - Governance
- Removed sections: template's [SECTION_3_NAME] slot (merged into Workflow & Tooling)
- Follow-up TODOs: none
-->

# Cool Company Constitution

## Core Principles

### I. Simplicity First
Prefer the simplest solution that actually works over the "correct" or extensible
one. Do not add abstractions, frameworks, or configuration for hypothetical future
needs. Any added complexity (a new dependency, a new layer, a new pattern) MUST be
justified by a concrete, present need — not by "we might need it later."

**Rationale**: This is a learning/practice project. Its value comes from
understanding what was built and why, not from anticipating requirements that may
never arrive. Unjustified complexity slows learning without adding capability.

### II. Pragmatic Testing
Write tests for logic that could break silently, gets reused, or is hard to verify
by inspection (parsing, calculations, state transitions, edge cases). Throwaway
exploration, one-off scripts, and UI wiring that's easy to eyeball MAY skip formal
tests. Full TDD ceremony (tests-first, red-green-refactor) is NOT required.

**Rationale**: The goal is confidence where it matters, not process for its own
sake. Mandating tests everywhere on a learning project creates friction that
discourages experimentation without a matching payoff in safety.

### III. Clear Documentation
When a decision, workaround, or non-obvious behavior would confuse a future reader
(including future-you), record the *why* — in a short code comment, commit
message, or the relevant spec/plan artifact. Do not document what the code already
says; document what it doesn't.

**Rationale**: Learning projects are revisited sporadically. Context that lives
only in a single session's memory is lost by the next session; a brief, targeted
note is cheap insurance against re-deriving the same reasoning twice.

## Workflow & Tooling

Nontrivial features (anything more than a small fix or pure exploration) SHOULD
flow through the Spec Kit pipeline (`/speckit-specify` → `/speckit-plan` →
`/speckit-tasks` → `/speckit-implement`) so intent and design are captured before
code is written. Small fixes, spikes, and pure learning experiments MAY be done
directly without spec artifacts. There is no fixed technology stack mandated by
this constitution; choose tools appropriate to what's being learned or built, in
keeping with Simplicity First.

## Governance

This constitution documents the working agreements for this project; it is a
lightweight guide, not a compliance regime. Amendments are made by directly
editing this file via `/speckit-constitution` and take effect immediately upon
being committed — no separate approval process is required for a project of this
scope.

**Versioning policy**: Semantic versioning applies to this document.
- MAJOR: a principle is removed or redefined in a way that reverses prior guidance.
- MINOR: a principle or section is added, or existing guidance is materially expanded.
- PATCH: wording, clarification, or typo fixes with no semantic change.

**Compliance review**: When following Spec Kit artifacts (plan.md, tasks.md),
check that the approach doesn't contradict the principles above. There is no
separate audit step — reasonableness at review time is sufficient.

**Version**: 1.0.0 | **Ratified**: 2026-08-28 | **Last Amended**: 2026-08-28
