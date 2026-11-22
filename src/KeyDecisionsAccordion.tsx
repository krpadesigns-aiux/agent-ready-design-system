"use client";

import { useState, type ReactNode } from "react";

export type KeyDecisionAccordionItem = {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  content?: ReactNode;
  contentHtml?: string;
  defaultOpen?: boolean;
  className?: string;
  summaryClassName?: string;
  bodyClassName?: string;
  chevronClassName?: string;
};

export type KeyDecisionsAccordionProps = {
  items: KeyDecisionAccordionItem[];
  ariaLabel?: string;
  className?: string;
};

export function KeyDecisionsAccordion({
  items,
  ariaLabel = "Key decisions",
  className = "",
}: KeyDecisionsAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, Boolean(item.defaultOpen)])),
  );

  return (
    <div
      className={`pds-key-decisions-accordion ${className}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const open = Boolean(openItems[item.id]);

        return (
          <details
            key={item.id}
            className={`pds-key-decision ${item.className ?? ""}`.trim()}
            open={open}
            onToggle={(event) => {
              const nextOpen = event.currentTarget.open;
              setOpenItems((current) =>
                current[item.id] === nextOpen
                  ? current
                  : { ...current, [item.id]: nextOpen },
              );
            }}
          >
            <summary
              className={`pds-key-decision-summary ${item.summaryClassName ?? ""}`.trim()}
            >
              <div className="pds-key-decision-heading">
                <small>{item.eyebrow}</small>
                <h3>{item.title}</h3>
              </div>
              <span
                className={`pds-key-decision-chevron ${item.chevronClassName ?? ""}`.trim()}
                aria-hidden="true"
              />
            </summary>

            {item.contentHtml != null ? (
              <div
                className={`pds-key-decision-body ${item.bodyClassName ?? ""}`.trim()}
                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
              />
            ) : (
              <div className={`pds-key-decision-body ${item.bodyClassName ?? ""}`.trim()}>
                {item.content}
              </div>
            )}
          </details>
        );
      })}
    </div>
  );
}
