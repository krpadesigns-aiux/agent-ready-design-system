import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "05 Body Sections/Chapter Label",
  parameters: { patternId: "case-study-chapter-label" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<p className="pds-case-study-chapter-label">06 · Evaluation</p>),
};
