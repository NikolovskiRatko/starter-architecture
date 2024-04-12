import {build, type UserConfig} from "vite";
// import { config } from '../vite.config.js';
// import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { type IconGroup, ICONS_GROUPS, SRC_PATH } from "./constants.js";

export const getConfig = (group: IconGroup): UserConfig => ({
    plugins: [],
    build: {
        emptyOutDir: false,
        target: "esnext",
        lib: {
            entry: resolve(SRC_PATH, group.entryFile),
            name: `${group.distFolder}Icons`,
            fileName: `${group.distFolder}-icons`
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
})

for (const group of ICONS_GROUPS) {
    build(getConfig(group)).then(() => {
        console.log(`${group.entryFile} is done!`)
    });
}

// export default defineConfig(config);
