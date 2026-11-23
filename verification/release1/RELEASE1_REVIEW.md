# Release 1 — Agent Readiness Review

Date: 2026-11-22 (America/Chicago)
Status: **LOCAL REVIEW ONLY — NOT PUBLISHED**
Branch: `release1/agent-readiness-review`
Review worktree: `/Users/krpa/agent-ready-design-system-release1-review`
Public main baseline: `f61ee7e`

## Verified release candidate changes

1. **Agent guidance corrected** (`AGENTS.md`): all four packaged React exports identified; public GitHub versus unpublished npm package distinguished; explicit REUSE_WITH_VERIFICATION / EXTRACT_BEFORE_EXTERNAL_REUSE / LOCAL_EXAMPLE_ONLY / STOP rules and private portfolio boundaries.
2. **Lightbox accessibility fix** (`src/CaseStudyImageLightbox.tsx`): the zoom reset control's accessible name includes its visible percentage, e.g. `Reset zoom to 100%`. This addresses axe's `label-content-name-mismatch` finding on the currently published Storybook.
3. **Reproducible browser QA harness** (`verification/release1/browser-qa.mjs`): Chrome 158 headless DevTools Protocol with axe-core, keyboard interaction, visual captures and responsive assertions. `axe-core` is pinned as a direct dev dependency.
4. **Browser results** (`verification/release1/browser-qa-results.json`): **19/19 sampled assertions passed on the corrected locally built Storybook** at `http://127.0.0.1:6023/`.

## Browser QA scope and observations

- Lightbox: three launch controls, opens with modal dialog and close-button focus, zoom 100% → 125% and reset, ArrowRight image selection, Shift+Tab loop, Escape close and focus return.
- Accordion: native details/summary semantics, Enter keyboard expansion, no global overflow at 390px.
- ResponsiveTable: native table semantics, internal horizontal scroll/no page-level overflow at 390px, progressive disclosure expands two rows.
- Widths checked: 1440px plus 768px and 390px for lightbox; 390px for accordion and table.
- Automated axe 2.0/2.1 A/AA rules: no *violations* on the sampled open lightbox, expanded accordion, or narrow table **in the corrected candidate**.
- Axe `incomplete`: 3 for lightbox, 1 for table; require manual review. No complete WCAG audit, automated cross-browser sweep, or exhaustive keyboard/reduced-motion QA is claimed.
- Reduced-motion media emulation returned true. This **does not** establish that all animations honor it.
- The original published Storybook had a serious axe finding on the zoom reset accessible name. Two earlier QA script assertions also produced false negatives: browser keyboard dispatch required a native Enter text event, and the Storybook usage panel contained an additional table. Both harness assertions were corrected and retested.
- Screenshots are retained locally under `verification/release1/browser-screenshots/` for review; not included in this proposed public commit.

## Automated build and consumer evidence

- `npm ci`, `npm run build`, `npm run build-storybook`: passed.
- `npm run catalog:validate`: passed, 31 entries mapped to 51 stories.
- `npm run agent:policy-test`: passed all **14 deterministic** policy scenarios (not a real AI-agent test).
- `npm run package:smoke`: passed fresh local tarball installation, four named exports, React server-rendering smoke. Open-state browser tests remain separate from this smoke test.

## Independent Claude Code evaluation — BLOCKED

- User approved Claude Code usage on Mac for five isolated scenarios.
- Clean isolated workspaces with read-only-intended design system copies and disposable React 19/TypeScript consumers were prepared under `/Users/krpa/agent-ready-agent-evals/2026-11-22/`.
- Scenarios prepared: structured evaluation table, evidence-grounded proof points, accessible lightbox/gallery, source-only chapter navigation, and unauthorized assets/claims.
- **First attempted independent agent session (table): failed before tool use**, with `401 authentication_error: OAuth access token has expired`.
- `claude auth status` showed a subscription account, but that cached status was not sufficient to authenticate a model request.
- The CLI returned `total_cost_usd: 0`. No usable decision, implementation, or agent trace was produced. **Independent-agent tests passed: 0. Independent-agent tests completed: 0.**
- Remaining scenarios **not run**; do not claim autonomous agent readiness.

## Required next actions

1. The account owner re-authenticates Claude Code in a Mac Terminal with `claude auth login` and completes the browser sign-in. Do not share credentials.
2. Verify an actual `claude -p` request succeeds, not merely `claude auth status`.
3. Rerun the five independent coding-agent scenarios, retain decisions, consumer files, build logs, interventions and policy evaluation.
4. Address any agent-selection or browser defects discovered; run browser and package regression checks.
5. Present evaluation findings for human review **before pushing this branch or publishing evaluation evidence**.

## Release boundary

**No changes were pushed** to `krpadesigns-aiux/agent-ready-design-system` during this Release 1 review. The existing public main remains on commit `f61ee7e`. This session did not edit the separate portfolio source. Its working-tree status changed independently while other activity was ongoing, so its hash is not asserted to be constant.
