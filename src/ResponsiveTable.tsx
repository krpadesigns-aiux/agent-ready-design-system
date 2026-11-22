"use client";

import { type ReactNode, useState } from "react";

export type ResponsiveTableColumn = {
  label: ReactNode;
  scope?: "col" | "row";
};

export type ResponsiveTableRow = {
  key: string;
  cells: ReactNode[];
};

export type ResponsiveTableProps = {
  id?: string;
  columns: ResponsiveTableColumn[];
  rows: ResponsiveTableRow[];
  ariaLabel: string;
  initialVisibleRows?: number;
  minWidth?: number;
  className?: string;
  showMoreLabel?: string;
  firstColumnIsRowHeader?: boolean;
};

export function ResponsiveTable({
  id,
  columns,
  rows,
  ariaLabel,
  initialVisibleRows,
  minWidth = 720,
  className = "",
  showMoreLabel,
  firstColumnIsRowHeader = false,
}: ResponsiveTableProps) {
  const expandable = Boolean(initialVisibleRows && rows.length > initialVisibleRows);
  const [expanded, setExpanded] = useState(false);
  const visibleRows = expandable && !expanded ? rows.slice(0, initialVisibleRows) : rows;

  return (
    <div
      id={id}
      className={`pds-table-wrap ${className}`.trim()}
      role="region"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <table className="pds-table" style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((column, index) => <th key={index} scope="col">{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map(row => (
            <tr key={row.key}>
              {row.cells.map((cell, index) => (
                index === 0 && firstColumnIsRowHeader
                  ? <th key={index} scope="row">{cell}</th>
                  : <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {expandable ? (
          <tfoot>
            <tr>
              <td className="pds-table-toggle-cell" colSpan={columns.length}>
                <button
                  className="pds-table-toggle"
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpanded(value => !value)}
                >
                  {expanded ? "Show less" : showMoreLabel ?? `See more (${rows.length})`}
                </button>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
