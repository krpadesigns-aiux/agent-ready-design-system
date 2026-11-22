"use client";

import type { CSSProperties } from "react";

export type ProofMetric = {
  id: string;
  value: string;
  label: string;
  detail?: string;
};

export type ProofStripProps = {
  items: readonly ProofMetric[];
  ariaLabel?: string;
  layout?: "cards" | "inline";
  className?: string;
  style?: CSSProperties;
};

/** Display an evidence-grounded set of portfolio proof points.
 * Consumers own the metric claims; this component does not verify them.
 */
export function ProofStrip({ items, ariaLabel = "Portfolio proof points", layout = "cards", className = "", style }: ProofStripProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={["pds-proof-strip", "pds-proof-strip--"+layout, className].filter(Boolean).join(" ")}
      style={style}
    >
      {items.map((metric) => (
        <article className="pds-proof-card" key={metric.id}>
          <strong className="pds-proof-value">{metric.value}</strong>
          <p className="pds-proof-label">{metric.label}</p>
          {metric.detail ? <small className="pds-proof-detail">{metric.detail}</small> : null}
        </article>
      ))}
    </div>
  );
}
