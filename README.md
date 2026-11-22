# Agent-Ready Design System

An evolving **React + TypeScript portfolio design system** for long-form product storytelling and agent-assisted development. It brings together reusable components, design tokens, Storybook examples, machine-readable contracts and explicit rules for agent discovery and reuse.

**Status:** Public-release candidate `0.2.0-rc.0`. This repo is prepared for publication but is not yet a stable, fully agent-validated component library.

## What's included

| Capability | Evidence and limitation |
| --- | --- |
| Storybook | **51** visual examples across **8** categories |
| Registry | **31** machine-readable entries, each linked to a Storybook example and JSON contract |
| React package | **4** exported components: `ResponsiveTable`, `KeyDecisionsAccordion`, `ProofStrip`, `CaseStudyImageLightbox` |
| Additional patterns | Source snapshots, design-token/CSS patterns and explicitly labeled Storybook demonstrations—not package exports |
| Consumer checks | Fresh React package installation and server-rendering smoke tests |
| Agent rules | REUSE / EXTEND / LOCAL / STOP guidance; **14 deterministic policy checks** |
| Independent AI agent evaluation | **Not yet run**; deterministic policy tests are not autonomous-agent success evidence |

### Storybook categories

1. Foundations
2. Navigation
3. Hero & CTA
4. Metrics & Evidence
5. Body Sections
6. Interactive Storytelling
7. Project Cards
8. Footer

## Quick start

Use Node.js 22 or newer.

```bash
npm ci
npm run storybook
```

The local Storybook opens on the port reported by Storybook. For a static build:

```bash
npm run build-storybook
npm run catalog:validate
npm run agent:policy-test
npm run package:smoke
```

### Package consumer example

```tsx
import { ResponsiveTable, ProofStrip } from "@krpadesigns/portfolio-design-system";
import "@krpadesigns/portfolio-design-system/styles.css";

const metrics = [
  { id: "example", value: "3 examples", label: "Illustrative proof" }
];

export function Example() {
  return (
    <div>
      <ProofStrip items={metrics} />
      <ResponsiveTable
        ariaLabel="Illustrative evaluation data"
        columns={[{ label: "Criterion" }, { label: "Status" }]}
        rows={[{ key: "grounding", cells: ["Evidence", "Documented"] }]}
      />
    </div>
  );
}
```

The package is currently `private: true` and is **not published to npm**. Import examples are for locally installed package archives and future versioned releases.

## For coding agents

Start with [AGENTS.md](./AGENTS.md), [the registry](./catalog/agent/registry.json) and each pattern's JSON contract under [catalog/agent/contracts](./catalog/agent/contracts). Every Storybook example maps to a stable registry ID and a permitted decision.

- **REUSE_WITH_VERIFICATION:** an exported package component; verify it in the consumer first.
- **EXTRACT_BEFORE_EXTERNAL_REUSE:** source exists, but no stable standalone package API.
- **LOCAL_EXAMPLE_ONLY:** a demonstration, CSS recipe or composition that must not be treated as a published React export.
- **STOP:** no matching component, security/privacy violation, unauthorized source or unsupported claim.

Do not claim independent autonomous-agent success until an external agent has performed and passed the documented scenarios. The [evaluation protocol](./verification/AGENT_EVALUATION_PROTOCOL.md) describes how to test it.

## Architecture and boundaries

This repository is an **independent, public-safe candidate**. It does not import from or build against a private portfolio repository. Case-study narratives, employer assets and portfolio-specific behaviors remain owned by their original projects. Some Storybook stories are illustrative versions, not pixel-identical production components.

A separate private portfolio can consume versioned releases from this repository **after reviewing and testing a migration**. Publishing this repository does not change the portfolio or automatically synchronize two codebases.

### Source layout

- `src/` — four packaged React exports
- `styles.css`, `tokens/` — shared CSS and foundation tokens
- `stories/`, `.storybook/` — demos, variants and agent metadata
- `catalog/` — source snapshots, sample compositions, registry and contracts
- `contracts/` — contracts for the original packaged components
- `verification/` — scenarios, evaluation protocol and independent consumer smoke fixture
- `scripts/` — static registry validation, policy checks and package-install smoke test
- `.github/workflows/storybook-pages.yml` — automated GitHub Pages build and deployment

## Publication and licensing

The project is currently `UNLICENSED` pending explicit ownership and license selection. Public visibility does not grant reuse rights. The publication process includes a final code, attribution and asset review before a license is applied.

The current package release is a **release candidate**, not a production stability guarantee.
