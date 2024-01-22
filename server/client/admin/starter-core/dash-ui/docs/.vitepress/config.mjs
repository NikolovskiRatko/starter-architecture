import path from "node:path";
import { defineConfig } from "vitepress";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  lang: "en-US",
  title: "Dash UI",
  description: "Just playing around.",
  themeConfig: {
    sidebar: [
      {
        text: "Introduction",
        children: [
          { text: "What is My Lib?", link: "/" },
          { text: "Getting Started", link: "/guide/" },
        ],
      },
      {
        text: "Components",
        children: [
          { text: "Content loader", link: "/components/content-loader" },
          { text: "Portlet", link: "/components/portlet" },
        ],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "@starter-core/dash-ui": path.resolve(__dirname, "./dist"),
      },
      dedupe: ["vue"], // avoid error when using dependencies that also use Vue
    },
  },
});
