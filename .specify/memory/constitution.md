<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Modified principles:
  - I. Simplicity First — rationale expanded to acknowledge possible eventual
    publishing (simplicity still wins, but not at the cost of correctness)
  - II. Pragmatic Testing — scope narrowed: exploration/spikes may still skip
    formal tests, but code intended to survive (i.e., not thrown away) must be
    verified to actually work, by test or by deliberate manual check
- Added principles:
  - IV. Working, Correct Implementation — new non-negotiable: shipped code must
    actually work and be verified, not merely "look right"; known-broken
    behavior is never an acceptable stopping point
- Added sections: none
- Removed sections: none
- Follow-up TODOs: none
-->

# Cool Company Constitution

## Core Principles

### I. Simplicity First
Prefer the simplest solution that actually works over the "clever" or extensible
one. Do not add abstractions, frameworks, or configuration for hypothetical future
needs. Any added complexity (a new dependency, a new layer, a new pattern) MUST be
justified by a concrete, present need — not by "we might need it later."

**Rationale**: This is currently a learning/practice project, though it may later
be published as a finished product. Its near-term value comes from understanding
what was built and why, not from anticipating requirements that may never arrive.
Simplicity and correctness are not in tension: a simple solution still MUST work
(see Principle IV) — simplicity governs *how much* is built, not whether it works.

### II. Pragmatic Testing
Write tests for logic that could break silently, gets reused, or is hard to verify
by inspection (parsing, calculations, state transitions, edge cases). Pure
throwaway exploration and one-off scripts that will be discarded MAY skip formal
tests. Full TDD ceremony (tests-first, red-green-refactor) is NOT required. Any
code that is kept (i.e., not thrown away) MUST still satisfy Principle IV — it
must be verified to work, whether that verification takes the form of an
automated test or a deliberate, recorded manual check.

**Rationale**: The goal is confidence where it matters, not process for its own
sake. Mandating tests everywhere on a learning project creates friction that
discourages experimentation without a matching payoff in safety — but "no formal
test" must never quietly become "never verified at all."

### III. Clear Documentation
When a decision, workaround, or non-obvious behavior would confuse a future reader
(including future-you), record the *why* — in a short code comment, commit
message, or the relevant spec/plan artifact. Do not document what the code already
says; document what it doesn't.

**Rationale**: Learning projects are revisited sporadically. Context that lives
only in a single session's memory is lost by the next session; a brief, targeted
note is cheap insurance against re-deriving the same reasoning twice.

### IV. Working, Correct Implementation (NON-NEGOTIABLE)
Code that is kept MUST actually work: it MUST be run or otherwise exercised, and
its behavior MUST be verified against what it's supposed to do — not just read
over and judged plausible. Known-incorrect or known-broken behavior is never an
acceptable place to stop; if something can't be finished correctly right now,
that MUST be stated explicitly (e.g., a TODO with the specific gap) rather than
left silently wrong. "Working" means correct on the paths that matter, including
realistic edge cases — not merely "runs without crashing on the happy path."

**Rationale**: This project may end up published as a finished product, not just
kept as a personal exercise. A learning project can tolerate rough edges; it
cannot tolerate silently wrong behavior presented as done, because that erodes
trust in the eventual result and in the process used to build it. Correctness is
therefore not negotiable even where scope, polish, or architecture are.

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

**Version**: 1.1.0 | **Ratified**: 2026-08-28 | **Last Amended**: 2026-08-28
