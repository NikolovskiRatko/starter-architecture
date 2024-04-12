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
    nav: [
      {
        text: "Introduction",
        items: [
          { text: "What is My Lib?", link: "/" },
          { text: "Getting Started", link: "/guide/" },
        ],
      },
      {
        text: "Components",
        items: [
          { text: "Content loader", link: "/components/content-loader" },
          { text: "Portlet", link: "/components/portlet" },
          { text: "Menu", link: "/components/menu" },
          { text: "Button", link: "/components/button" },
          { text: "Form", link: "/components/form" },
        ],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../../src"),
      },
      dedupe: ["vue"], // avoid error when using dependencies that also use Vue
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/vite-resources.scss";
        `,
        },
      },
    },
  },
});
