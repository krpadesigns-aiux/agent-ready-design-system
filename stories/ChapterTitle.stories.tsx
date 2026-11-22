import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "05 Body Sections/Chapter Title",
  parameters: { patternId: "case-study-chapter-title" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<h2 className="pds-case-study-chapter-title">How I evaluated the experience</h2>),
};
