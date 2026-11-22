import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackToTop } from "../catalog/source/BackToTop";

const meta = {
  title: "02 Navigation/Back to Top",
  parameters: { patternId: "back-to-top" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<><p>Scroll down to reveal Back to top.</p><div style={{minHeight: "150vh"}} /><p>End of the example</p><BackToTop /></>),
};
