import format from "prettier-eslint";
import fs from "fs";
import path from "path";
import { parse } from 'node-html-parser';
import { SRC_PATH, FORMAT_OPTIONS } from "./constants.js";
import type { IconGroup } from "./constants.js";

interface IconObject {
    width: string;
    height: string;
    viewBox: string;
    content: string;
}

const prepareIconName = (iconName: string) => {
    const kebabCaseName = iconName.replace('.svg', '').replace(/[^a-zA-Z0-9]/g,'');
    return `Icon${kebabCaseName.split('-').reduce((acc, cur) => acc + cur.charAt(0).toUpperCase() + cur.slice(1), '')}`;
}

type GetIconContent = (iconContents: string) => IconObject | null;
const getIconContent: GetIconContent = (iconContents) => {
    const root = parse(iconContents);
    const iconDOM = root.querySelector('svg');
    const elementsToRemove = ['title', 'desc', 'defs']

    if (!iconDOM) {
        return null;
    }

    const { width, height, viewBox } = iconDOM.attributes ?? {
        width: '16',
        height: '16',
        viewBox: '0 0 16 16'
    }

    iconDOM.querySelectorAll(':scope > *').forEach((element) => {
        if (elementsToRemove.includes(element.rawTagName)) {
            element.remove();
        }
    })
    iconDOM.querySelectorAll('*[id]:not([id=""])').forEach((element) => {
        element.removeAttribute('id')
    })

    return {
        content: iconDOM.innerHTML,
        width,
        height,
        viewBox
    };
}

const getComponentBase = (icon: IconObject) => (`
    <script setup lang="ts">
      import {
        computed,
        type SVGAttributes,
        CSSProperties,
        ComputedRef,
      } from "vue";
      interface Props extends /* @vue-ignore */ SVGAttributes {
        size?: string;
      }
    
      const { size, ...rest } = defineProps<Props>();
      const style: ComputedRef<CSSProperties> = computed(() => ({
        width: size ? \`\${size}px\` : "16px",
        height: size ? \`\${size}px\` : "16px",
      }));
    </script>
    <template>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :style="style"
            viewBox="${icon.viewBox}"
            fill="currentColor"
            v-bind="rest ?? {}"
        >
            ${icon.content}
        </svg>            
    </template>
`)

interface SaveIconProps {
    iconName: string;
    iconGroup: IconGroup;
}
export const saveIcon = async ({
    iconName,
    iconGroup
}: SaveIconProps) => {
    const contents = fs.readFileSync(path.join(iconGroup.svgPath, iconName), 'utf8');
    const icon = getIconContent(contents);
    const name = prepareIconName(iconName);

    if (!icon) {
        return null;
    }

    const formatted = await format({ text: getComponentBase(icon), ...FORMAT_OPTIONS });
    const exportBase = `export { default as ${name} } from './${iconGroup.distFolder}/${name}.vue';\n`;

    fs.appendFileSync(path.join(SRC_PATH, iconGroup.entryFile), exportBase, 'utf8');
    fs.writeFileSync(path.join(iconGroup.distPath, `${name}.vue`), formatted, 'utf8');
};
