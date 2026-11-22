import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExpandableArchitecture } from "../catalog/source/ExpandableArchitecture";

const meta = {
  title: "04 Metrics and Evidence/Architecture Diagram",
  parameters: { patternId: "runtime-architecture" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<div className="caseStudyReview"><ExpandableArchitecture ariaLabel="Example agent architecture" nodes={[{label:"Interpret",title:"Read context", details:["Check what the person meant."]},{label:"Decide",title:"Apply policy",details:["Check authority before acting."]}]} /></div>),
};
