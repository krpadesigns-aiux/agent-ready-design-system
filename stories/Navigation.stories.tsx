import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navigation } from "../catalog/source/Navigation";

const meta = {
  title: "02 Navigation/Global Navigation",
  parameters: { patternId: "portfolio-navigation" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<Navigation />),
};
