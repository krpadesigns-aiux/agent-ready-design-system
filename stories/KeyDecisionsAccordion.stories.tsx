import type { Meta, StoryObj } from "@storybook/react-vite";
import { KeyDecisionsAccordion } from "@krpadesigns/portfolio-design-system";

const item = {
  id: "review",
  eyebrow: "Decision 01",
  title: "Request approval before a consequential action",
  content: "Show the proposed action and let the person decide whether it should proceed.",
};
const meta = {
  title: "06 Interactive Storytelling/Key Decisions Accordion",
  component: KeyDecisionsAccordion,
  parameters: { patternId: "key-decisions-accordion" },
  args: { items: [item] },
} satisfies Meta<typeof KeyDecisionsAccordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Collapsed: Story = {};
export const Expanded: Story = { args: { items: [{ ...item, defaultOpen: true }] } };
