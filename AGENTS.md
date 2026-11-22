# Agent-Ready Portfolio Design System — Agent Instructions

Scope: a reusable **portfolio and case-study storytelling system**. This is not a general-purpose app component library. Do not invent generic forms, alerts or toasts.

## Source of truth
1. Read \`catalog/agent/registry.json\` and \`tokens/foundations.json\`.
2. Locate the entry by semantic purpose. Read \`catalog/agent/contracts/<id>.json\`, its implementation \`path\`, and its Storybook story.
3. Inspect \`catalog_status\` and the actual package exports. Only \`ResponsiveTable\` and \`KeyDecisionsAccordion\` are currently independently packaged as v0.1.0.
4. \`reference-demo-not-packaged\` is a visual/behavioral demonstration, **not a stable public API**. Do not import or describe it as a released package component.
5. React implementation is appropriate for interactive components and layout compositions. Foundations stay in design tokens/CSS; a React wrapper is not required.

## Decision protocol
- **REUSE** — contract fits, the component is available in the authorized target project, and verification requirements can be satisfied.
- **EXTEND** — the shared public API needs an approved change. Submit a plan and request human review before changing shared code.
- **LOCAL** — project-specific semantics, content, images, and release-bound variants remain local; avoid premature abstraction.
- **STOP** — permission/IP ambiguity, contradictory rules, unverified outcome claims, inaccessible interaction, or unresolved implementation mismatch.

## Required workflow
Discover → read contract/source/story → record REUSE / EXTEND / LOCAL / STOP and rationale → implement in authorized scope → run relevant checks → inspect diff → human approval.

## Validation
Run \`npm run catalog:validate\`, \`npm run build\`, and \`npm run build-storybook\`.
Check interactive stories with keyboard (Tab, Enter, Space, Escape, arrows where relevant); check at 1440, 768 and 390px and with reduced-motion preference. Review semantic roles, accessible labels, focus return, and mobile overflow. A static build is not a substitute for an accessibility audit.

Never modify the private portfolio source from this catalog. Never push, make a repository public, deploy, or publish a package without explicit release approval.

The \`catalog/agent/registry.json\` records existing local-source snapshots and proposed **LOCAL** catalog candidates; it is not an assertion that an autonomous agent completed independent reuse.
