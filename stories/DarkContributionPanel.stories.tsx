import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "05 Body Sections/Dark Contribution Panel",
  parameters: { patternId: "dark-contribution-panel" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<div className="pds-dark-contribution pds-dark-contribution--compact"><h3>My contribution</h3><ul><li>Mapped investigation steps and decision points.</li><li>Designed a way to review evidence before action.</li></ul></div>),
};
