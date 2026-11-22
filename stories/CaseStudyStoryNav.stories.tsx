import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CaseStudyStoryNav } from "../catalog/source/CaseStudyStoryNav";

const meta = {
  title: "02 Navigation/Right Edge Story Navigation",
  parameters: { patternId: "case-study-story-nav" },
} satisfies Meta;
export default meta;

export const Example: StoryObj<typeof meta> = {
  render: () => (<div className="caseStudyReview"><CaseStudyStoryNav projectSlug="storybook-demo" items={[{id:"overview",label:"Overview"},{id:"evaluation",label:"Evaluation"}]} /><section id="overview" style={{minHeight:560}}><h2>Overview</h2></section><section id="evaluation" style={{minHeight:560}}><h2>Evaluation</h2></section></div>),
};
