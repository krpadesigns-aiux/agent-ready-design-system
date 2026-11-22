"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useState } from "react";

export type ArchitectureLogo = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
};

export type ArchitectureNode = {
  label: string;
  title: string;
  technology?: string;
  description?: ReactNode;
  details?: ReactNode[];
  expandedContent?: ReactNode;
  logos?: ArchitectureLogo[];
  tone?: "default" | "authority" | "outcome" | "accent";
};

export type ExpandableArchitectureProps = {
  id?: string;
  title?: string;
  nodes: ArchitectureNode[];
  ariaLabel: string;
  initiallyExpanded?: boolean;
  accentColor?: string;
  className?: string;
  showDescriptionsInHeader?: boolean;
};

export function ExpandableArchitecture({
  id,
  title,
  nodes,
  ariaLabel,
  initiallyExpanded = false,
  accentColor = "var(--pds-yellow)",
  className = "",
  showDescriptionsInHeader = false,
}: ExpandableArchitectureProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const style = {
    "--pds-architecture-columns": Math.max(1, nodes.length),
    "--pds-architecture-accent": accentColor,
  } as CSSProperties;

  return (
    <section id={id} className={`pds-runtime-architecture ${className}`.trim()} style={style}>
      {title ? <h3 className="pds-runtime-architecture-title">{title}</h3> : null}
      <div className={`pds-runtime-architecture-wrap${expanded ? " is-expanded" : ""}`}>
        <div className="pds-runtime-label-row" aria-hidden="true">
          {nodes.map((node, index) => <span key={`${node.label}-${index}`}>{node.label}{showDescriptionsInHeader && node.description ? <span className="pds-runtime-header-description">{node.description}</span> : null}</span>)}
        </div>

        <div className="pds-runtime-grid" aria-label={ariaLabel}>
          {nodes.map((node, index) => (
            <article
              key={`${node.label}-${node.title}-${index}`}
              className={`pds-runtime-node pds-runtime-node--${node.tone ?? "default"}`}
            >
              <small>{node.label}</small>
              <div className="pds-runtime-heading">
                {node.logos?.length ? (
                  <span className="pds-runtime-logos" aria-hidden="true">
                    {node.logos.map((logo, logoIndex) => (
                      <Image
                        key={`${logo.src}-${logoIndex}`}
                        src={logo.src}
                        alt={logo.alt ?? ""}
                        width={logo.width ?? 22}
                        height={logo.height ?? 22}
                        className={logo.rounded ? "is-rounded" : undefined}
                      />
                    ))}
                  </span>
                ) : null}
                <h3>{node.title}</h3>
              </div>
              {node.technology ? <div className="pds-runtime-tech">{node.technology}</div> : null}
              {node.description && !showDescriptionsInHeader ? <div className="pds-runtime-responsibility">{node.description}</div> : null}
              {node.details?.length ? (
                <ul>
                  {node.details.map((detail, detailIndex) => <li key={detailIndex}>{detail}</li>)}
                </ul>
              ) : null}
              {node.expandedContent ? (
                <div className="pds-runtime-expanded-content">{node.expandedContent}</div>
              ) : null}
            </article>
          ))}
        </div>

        {nodes.some(node => node.details?.length || node.expandedContent) ? (
          <div className="pds-runtime-toggle-row">
            <button
              className="pds-runtime-toggle"
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded(value => !value)}
            >
              {expanded ? "Show less" : "See more"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
