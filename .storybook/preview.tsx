import React from "react";
import type { Preview } from "@storybook/react-vite";
import "@krpadesigns/portfolio-design-system/styles.css";
import "../catalog/source-styles/case-study.css";
import "../catalog/source-styles/case-study-chapter-label.css";
import "../catalog/source-styles/case-study-chapter-title.css";
import "../catalog/source-styles/case-study-dark-contribution.css";
import "../catalog/styles.css";
import { PatternUsageForStory } from "../stories/PatternUsage";
import "./catalog.css";

export default {
  decorators: [(Story, context) => (
    <div style={{fontFamily:"Plus Jakarta Sans, system-ui, sans-serif"}}>
      <PatternUsageForStory storyId={context.id} explicitId={typeof context.parameters.patternId==="string"?context.parameters.patternId:undefined}/>
      <Story/>
    </div>
  )],
} satisfies Preview;
