# Agent-Ready Portfolio Design System — Agent Instructions

This repository is a public React + TypeScript **portfolio and case-study storytelling system**, not a generic app UI kit. Do not invent forms, alerts, or toasts that do not exist in the registry.

## Source of truth and discovery

1. Read `catalog/agent/registry.json` and `tokens/foundations.json`.
2. Search the registry **by semantic purpose**, not by assuming a component name. Read the corresponding `catalog/agent/contracts/<id>.json`, implementation path, and linked Storybook story ID.
3. Check `catalog_status`, `agent_readiness.allowed_action`, and the actual exports in `src/index.ts`. The published GitHub source currently packages **four React exports** in the local `0.2.0-rc.0` candidate:
   - `ResponsiveTable`
   - `KeyDecisionsAccordion`
   - `ProofStrip`
   - `CaseStudyImageLightbox`
4. The original package smoke test alone is **not** an independent agent evaluation or full accessibility certification. Selected independent Claude Code evaluations and browser findings are recorded in `verification/release1/RELEASE1_REVIEW.md`, with failures and limits preserved. The package is `private: true` and is **not published on npm**. For independent consumption, build and install a local tarball or otherwise use an explicitly authorized package source.
5. `source-snapshot-in-catalog` is not a package export. `reference-demo-not-packaged` and `public-safe-adaptation` are illustrative compositions or patterns, not stable standalone package APIs. Foundations are tokens/CSS; they need no gratuitous React wrappers.
6. Use the canonical public repository for shared design-system source. Never import private portfolio paths or copy unlicensed employer assets.

## Decisions and scope

- **REUSE_WITH_VERIFICATION** — a matching exported component with documented API; install in the authorized consumer and verify behavior.
- **EXTRACT_BEFORE_EXTERNAL_REUSE** — suitable source exists but is not portable; request human approval before changing the shared component/package.
- **LOCAL_EXAMPLE_ONLY** — a reference story, style recipe or portfolio-specific composition; implement project-specific needs locally only when authorized. Do not claim it is exported.
- **STOP** — missing component, untrusted HTML, private/unlicensed assets, unsupported business claims, contradictory contracts, or unresolved permission/ownership.
- **EXTEND** — modifying shared public APIs or published contracts requires explicit human review. Never silently change them.

A reader-friendly shorthand is REUSE / EXTEND / LOCAL / STOP, but report the precise allowed action from the component's registry entry.

## Required agent workflow

Discover → inspect registry + contract + story + source → record selection and reason → REUSE / EXTRACT / LOCAL / STOP → implement only in the authorized workspace → build and verify → inspect diff → request human approval for shared changes or publication.

Provide the contract ID, Storybook story ID, installed import path, modified files, actual commands and outcomes, any interventions, and open accessibility issues. A successful command without a working consumer is not proof of reuse.

### Claim provenance and generated sample data

- **Never write “passed”, “verified”, “audited”, “WCAG compliant”, “tested at 390/768/1440px”, or a quantified product outcome in an example merely because the component supports those capabilities.** Only state test outcomes you personally ran in this consumer and can tie to actual check logs or an explicit trustworthy user-supplied source.
- For demonstration rows, use visibly fictional **sample** content with status **“Example — not evaluated”** (or equivalent). Distinguish intended criteria from test results; do not use “Met” or “Pass” as a sample status without corresponding evidence.
- An actual successful TypeScript/Vite build supports only a build/type-check claim; it does not establish keyboard, WCAG, responsive, screen-reader, or product-impact outcomes.
- Before reporting a consumer as complete, check document `<title>`, accessible names including visible button text, and whether any sample data asserts unrun validations. Record absent checks as limitations, not success claims.


## Verification

```bash
npm ci
npm run build
npm run build-storybook
npm run catalog:validate
npm run agent:policy-test
npm run package:smoke
```

For interactive components: check desktop/tablet/mobile (1440/768/390px), keyboard (Tab/Shift+Tab/Enter/Space/Escape/arrows), accessible labels, modal focus and focus return, reduced-motion behavior and overflow. Record findings; build-only tests do not establish accessible behavior.

`verification/agent-scenarios.json` remains a deterministic **policy fixture**, not a coding-agent test report. `verification/release1/RELEASE1_REVIEW.md` now contains a narrow five-scenario independent Claude Code evaluation and one remediation retest. Do not generalize these selected results to all components or all agent models.

## Publication and boundaries

The GitHub repository and Storybook are public, licensed MIT for code the owner is authorized to release. This **does not** authorize publishing private portfolio source, private screenshots, third-party assets, user data, or secrets. The portfolio is a separate codebase and currently uses many local shared components rather than importing all components from this release candidate.

Coding agents must not push, create releases, publish packages, deploy, or modify private portfolio sources without explicit user authorization and review. Independent evaluations must run in isolated consumer workspaces.

**Maturity:** four packaged React exports; 31 registry entries; 51 Storybook examples. Five selected independent-agent scenarios and one remediation retest are documented; component selection was policy-permitted in all five initial tasks, but one generated app contained false evidence claims and the generated consumers had browser accessibility failures. Broader agent evaluation and accessibility testing remain incomplete.
