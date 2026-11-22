import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "../catalog/source/Container";

const meta = {
  title: "05 Body Sections/Container",
  parameters: { patternId: "page-container" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<div className="catalog-layout-demo"><Container><div className="catalog-sample">Content follows the shared width and gutters.</div></Container></div>),
};
