import React from "react";
import type {Meta,StoryObj} from "@storybook/react-vite";
import {CatalogFooter} from "../catalog/Showcase";
const meta={title:"08 Footer/Contact and Navigation",parameters:{catalogStatus:"Portfolio-derived composition; not packaged",sourceFile:"src/components/home-v2/HomeV2Contact.tsx; src/components/layout/Footer.tsx"}} satisfies Meta;
export default meta;type Story=StoryObj<typeof meta>;
export const ContactFooter:Story={render:()=><CatalogFooter/>};
