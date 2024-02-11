import { defineConfig } from "vite";
import type { UserConfig } from 'vite';
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export const config: UserConfig = {
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: 'DashIcons',
      fileName: 'dash-icons'
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    dedupe: ["vue"],
  },
}

export default defineConfig(config);
