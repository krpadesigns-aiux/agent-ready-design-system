import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
const local = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-a11y"],
  staticDirs: [
    { from: local("../catalog/agent/contracts/"), to: "/contracts" },
    { from: local("../catalog/agent/registry.json"), to: "/registry.json" },
  ],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      esbuild: { jsx: "automatic" },
      resolve: {
        alias: {
          "next/link": local("./adapters/next-link.tsx"),
          "next/image": local("./adapters/next-image.tsx"),
        },
        dedupe: ["react", "react-dom"],
      },
    });
  },
} satisfies StorybookConfig;
