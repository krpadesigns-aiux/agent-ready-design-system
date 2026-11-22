import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from "../catalog/source/Section";

const meta = {
  title: "05 Body Sections/Section",
  parameters: { patternId: "page-section" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<Section className="catalog-layout-demo"><div className="catalog-sample"><h2>Section heading</h2><p>Shared spacing with contained content.</p></div></Section>),
};
