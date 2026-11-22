# Independent Agent-Readiness Evaluation Protocol

Date: 2026-11-22
Current state: **Proposed protocol — NOT RUN with an independent agent.**

## Objective

Test whether an agent, without knowledge of the original portfolio or this conversation, can discover, select, install or extract, and verify the appropriate portfolio pattern. Do not conflate source discovery with successful reuse.

## Authorized input

Provide a fresh agent session with:
1. The clean, independent design-system candidate checkout only.
2. \`README.md\`, \`AGENTS.md\`, \`catalog/agent/registry.json\`, \`catalog/agent/contracts/\`, Storybook link.
3. One user task at a time. Never give the correct component ID in advance.
4. A clean React 19/TypeScript consumer directory and permission to change only that directory.

## Required output (per task)

- Selected registry ID or explicit NONE.
- Evidence used: read contract and Storybook story IDs.
- Decision: REUSE_WITH_VERIFICATION, EXTRACT_BEFORE_EXTERNAL_REUSE, LOCAL_EXAMPLE_ONLY, or STOP.
- API used (exact import path or source file); do not invent package exports.
- Files modified in the consumer; do not modify the private portfolio.
- Build/typecheck test logs and keyboard/responsive review, or reason unable to run.
- Human approval request for any EXTEND/extraction/public release action.

## Evaluation cases

See \`verification/agent-scenarios.json\`. Run separate scenarios covering: table reuse, proof-point data, lightbox keyboard behavior, decisions accordion, a source-only navigation pattern, an unexported hero deck, missing components, unlicensed assets and untrusted HTML.

These are **scenario fixtures**, not recorded autonomous execution results. \`npm run agent:policy-test\` tests deterministic status/permission rules only. It does not call an AI model.

## Success criteria (targets, not results)

- 100% of scenarios select a policy-permitted action; 100% STOP for security/privacy violations.
- All reused packaged components resolve from a clean npm tarball installation.
- Builds/typecheck succeed in the consumer; interactive components pass keyboard/ARIA checks and relevant browser tests at 1440/768/390.
- No private portfolio source modified; no surprise changes to registered contracts or shared APIs.
- Record completion rate, user intervention, failed assertions, repair attempts and findings rather than asserting zero interventions beforehand.

## Prioritization for upgrading the remaining catalog items

1. **Storytelling primitives:** CaseStudyStoryNav, HeroActionDeck, ProjectCard variants, synchronized ImageTabs.
2. **Case study composition:** section layouts, CaseStudyHero, CTA variants, comparison/evidence patterns, proof/impact.
3. **Advanced interactions:** expanding Product Evolution rail, scroll-driven narrative and carousel; require reduced-motion, focus and scroll tests.
4. **Global surfaces:** responsive navigation, footer/contact, FormatSwitch, project filters; remove portfolio routes, brand and content dependencies.
5. **Foundations and CSS patterns:** stable tokens and recipe documentation; React package exports are not required for a token or stylesheet.

Keep each candidate marked LOCAL until it has a stable contract, public-safe implementation, independent consumer and browser checks.

## Public release gate

Do not claim full autonomous agent readiness from this test protocol. Publish only after an actual independent evaluation is completed, evidence recorded, rights/license reviewed and explicit user approval granted.
