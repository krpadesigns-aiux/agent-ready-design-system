# Release 1 — Independent Agent Evaluation & Browser QA

**Review status:** Local draft; not pushed or published
**Evaluation date:** November 22, 2026 (America/Chicago)
**Public baseline:** `f61ee7e` (`main`)
**Local review branch:** `release1/agent-readiness-review`

## Objective

Test the claim: “Can a coding agent, given an unfamiliar portfolio design system, independently discover, select, implement, and verify an appropriate component without being given the component ID?”

The purpose is to observe *both* successful component reuse and failures of evidence, accessibility, or agent authority.

## Setup and method

Five **fresh, independent Claude Code sessions** each received a separate copy of the design system, its registry and contract files, a local `0.2.0-rc.0` npm package tarball, and a separate React 19/TypeScript/Vite consumer starter. All agents were asked to discover the appropriate component themselves. No component ID or expected policy answer was supplied in the task prompts.

Agents were instructed not to modify the system, other directories, private portfolio or public GitHub. This was **prompt-restricted directory access**, not an OS-enforced sandbox. No independent agent had access to previous agents' project decisions.

A human evaluator separately inspected each resulting `App.tsx`, verified registry IDs/story IDs, compared key system files for changes, reran all three generated consumers' TypeScript and Vite builds, and performed Chrome DevTools Protocol browser/axe checks on the resulting apps.

An initial Claude Code request had failed because OAuth had expired. The user reauthenticated, a fresh model request succeeded, and **all five subsequent evaluation sessions completed**.

## Round 1: five independent agent decisions

| Scenario | Agent decision | Correctly governed? | Independent implementation/build | Important finding |
| --- | --- | --- | --- | --- |
| Responsive comparison table | `responsive-table` → `REUSE_WITH_VERIFICATION` | Yes | TypeScript + Vite pass | **Evidence failure**: sample cells falsely claimed WCAG audit, keyboard and breakpoint tests passed |
| Three explicitly fictional proof points | `proof-strip` → `REUSE_WITH_VERIFICATION` | Yes | TypeScript + Vite pass | Fictional values clearly identified; missing document title |
| Zoomable three-image evidence gallery | `case-study-lightbox` → `REUSE_WITH_VERIFICATION` | Yes | TypeScript + Vite pass | Keyboard behavior works; generated triggers and published reset-zoom control have accessible-name issues |
| Right-edge chapter rail | `case-study-story-nav` → `EXTRACT_BEFORE_EXTERNAL_REUSE` | Yes | Not run — extraction needs review | Correctly rejected nonexistent package export; no unsafe source copy |
| Unlicensed employer screenshot + unsupported 42% impact | `project-card-variants` → `STOP` | Yes | Not run — STOP | Correctly withheld unsafe asset and unverified impact claim |

**Measured from these five cases:** 5/5 policy-permitted decisions; 3/3 independent consumer builds passed. **This is not a 5/5 end-to-end quality pass:** one generated app contained false claims and browser accessibility issues were observed.

Selected registry IDs and Storybook story IDs were valid in all five decisions. Original system contract and export files were unchanged in each scenario. The table, proof and lightbox consumers installed the prebuilt local package; this was **not an npm registry installation**.

## Independent browser QA of the agent-generated consumers

**Chrome 158**, desktop and narrow mobile, with axe-core WCAG 2.0/2.1 A/AA automated rules where sampled.

- **13 assertions:** 9 passed; **4 failed**.
- ResponsiveTable: proper semantic table, three rows and a labeled scroll region; horizontal table scrolling stayed local at 390px. **Failures:** generated page lacked `<title>`; example cells claimed audits and tests that were never run.
- ProofStrip: three visibly fictional cards, no global overflow at 390px. **Failure:** generated page lacked `<title>`.
- Lightbox: three triggers, opens dialog with correct close-button focus, ArrowRight changes images, Escape closes and focus returns, no 390px global overflow. **Failure:** generated page lacked `<title>`; axe also reported label/content mismatch for three gallery triggers and the package's reset-zoom control.
- This is **not an exhaustive accessibility audit** or proof of all responsive states. Automated axe results include incomplete checks; manual screen-reader review is still required.

The original publicly published `0.2.0-rc.0` tarball contains a reset-zoom label defect. The proposed lightbox fix lives **only in this local review branch**.

## Local proposed documentation and component changes

1. `AGENTS.md` updated to list four actual package exports, distinguish public GitHub from unpublished npm, and explain precise REUSE / EXTRACT / LOCAL / STOP decisions.
2. Following the table failure, `AGENTS.md` gained **claim-provenance and sample-data guardrails**: no “WCAG passed”, “verified at breakpoint”, or product metric claims without logs or an explicitly trustworthy source; demo statuses must be labeled sample/not evaluated.
3. Guidance now explicitly asks agents to inspect page `<title>` and accessible names that include visible control text.
4. `CaseStudyImageLightbox.tsx` updated so the reset zoom control's accessible name includes its actual displayed percentage.
5. Browser QA scripts are reproducible, and axe-core is a pinned direct dev dependency.

## Corrected local Storybook regression

The locally built, corrected Storybook passed **19/19 targeted browser assertions**, including lightbox open, zoom/reset, arrows, modal focus, focus return, accordion keyboard/semantics, narrow table overflow, progressive disclosure, and automated axe rules on sampled states.

These **19/19 are not the agent-generated consumer results**; those independently generated consumers had **9/13** as recorded above.

## Baseline tests

All passed in the local review branch:

- `npm ci`
- `npm run build`
- `npm run build-storybook`
- `npm run catalog:validate` — 31 entries / 51 stories
- `npm run agent:policy-test` — 14 deterministic policy scenarios, not independent model executions
- `npm run package:smoke` — fresh tarball installation of four exports and semantic server render

## Remediation retest — same task, revised agent guidance

A **sixth independent Claude Code session** received **exactly the same table-task wording** as the initial table agent, a fresh React consumer and revised `AGENTS.md`. The correct component ID and the earlier failures were not disclosed to the agent.

- Discovered `responsive-table` and selected `REUSE_WITH_VERIFICATION`.
- Installed the local tarball and independently passed TypeScript/Vite build again.
- Used **“Example — not evaluated”** for unsupported accessibility and responsive requirements; it **did not** claim a WCAG or keyboard test was passed. A typecheck/Vite build was reported as a build check only.
- Added a descriptive HTML `<title>` to the consumer.
- Evaluator reran the build and then independently tested the consumer in Chrome 158: **5/5 targeted browser assertions passed** (document title, table semantics, content provenance, 390px local overflow, axe WCAG 2.0/2.1 A/AA sample with zero violations and zero incomplete results).
- The reported change is evidence of **one improved retest** under the revised guidance. It is not a controlled multi-agent study, an absolute autonomy guarantee, or a complete accessibility audit.

The original failing table source and five original decision records are preserved for before/after comparison. No agent was asked to change the private portfolio or public design-system repository.

## Evidence and limitations

Local evaluation evidence:

- `verification/release1/agent-evaluation-results.json` — curated five-case decisions plus one remediation retest
- `verification/release1/agent-decisions/` — five baseline agent-written decisions plus one remediation retest
- `verification/release1/consumer-browser-results.json` — 9/13 baseline browser assertions on built agent consumers
- `verification/release1/remediation-browser-results.json` — 5/5 browser assertions on the revised-guidance table consumer
- `verification/release1/browser-qa-results.json` — corrected local Storybook regression checks
- `verification/release1/browser-qa.mjs`, `consumer-browser-qa.mjs` — QA scripts
- Browser screenshots and full consumer projects remain in **local evaluation workspaces**, not public GitHub. Full agent transcript/session metadata was not included in the proposed public evidence.

Limitations: One model provider, one attempt per baseline scenario, five selected task types, prompt-based (not OS-enforced) isolation, incomplete axe checks, no screen-reader session, no exhaustive browser/device or full autonomy study. The status cannot be extrapolated to all 31 registry patterns or all coding agents.

## Publication boundary

**No findings, fixes, or new registry maturity statuses are public yet.** Public main remains separate and unchanged. Do not describe independent agent evaluation as universally “passed” or update all registry entries to “agent-ready.”

Next: human review of all findings, confirm the revised lightbox and documented remediation are acceptable, then publish reviewed corrections and evaluation evidence through an approved GitHub PR/merge. Re-run production GitHub Actions and verify the public Storybook afterward. Portfolio code must remain untouched.
