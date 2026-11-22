import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponsiveTable } from "@krpadesigns/portfolio-design-system";

const meta = {
  title: "04 Metrics and Evidence/Responsive Table",
  component: ResponsiveTable,
  parameters: { patternId: "responsive-table" },
  args: {
    ariaLabel: "Evaluation results",
    columns: [{ label: "Check" }, { label: "Result" }],
    rows: [
      { key: "keyboard", cells: ["Keyboard access", "Verified"] },
      { key: "layout", cells: ["Narrow viewport", "Verified"] },
    ],
    firstColumnIsRowHeader: true,
  },
} satisfies Meta<typeof ResponsiveTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const ProgressiveDisclosure: Story = { args: { initialVisibleRows: 1 } };
export const NarrowContainer: Story = {
  render: args => <div style={{ maxWidth: 390 }}><ResponsiveTable {...args} /></div>,
};
