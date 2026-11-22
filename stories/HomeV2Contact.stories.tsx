import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeV2Contact } from "../catalog/source/HomeV2Contact";

const meta = {
  title: "08 Footer/Portfolio Contact",
  parameters: { patternId: "portfolio-contact" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<div className="homeV2"><HomeV2Contact /></div>),
};
