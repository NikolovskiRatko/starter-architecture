import fs from 'fs';
import path from 'path';
import format from 'prettier-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_PATH = path.join(__dirname, '../src');
const ICON_DIST_PATH = path.join(__dirname, '../src/icons');
const ICON_REPO_PATH = path.join(__dirname, '../repo/icons');

const formatOptions: Partial<format.Options> = {
    eslintConfig: {
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            }
        },
        rules: {
            quotes: ['error', 'single'],
            indent: ['error', 4, { SwitchCase: 1 }],
            'comma-dangle': ['error', 'never']
        }
    },
    prettierOptions: {
        parser: 'typescript'
    }
};

const saveType = () => new Promise((resolve) => {
    const typeBase = `
        export interface IconProps extends React.SVGProps<SVGSVGElement> {
            size?: number;
        }
    `;
    const typeExport = `export { IconProps } from './types';\n`

    format({ text: typeBase, ...formatOptions }).then((formatted) => {
        fs.writeFileSync(path.join(ICON_DIST_PATH, 'types.ts'), formatted, 'utf8');
        fs.appendFileSync(path.join(ICON_DIST_PATH, 'index.ts'), typeExport, 'utf8');
        resolve(true);
    });
});

const saveIcon = async (iconName: string, iconContents: string) => {
    const content = iconContents.replace(/<svg[^>]*>|<\/svg>/g, '');
    const kebabCaseName = iconName.replace('.svg', '');
    const name = `Icon${kebabCaseName.split('-').reduce((acc, cur) => acc + cur.charAt(0).toUpperCase() + cur.slice(1), '')}`;

    const componentBase = `
            /* eslint-disable max-len */
            import React from 'react';
            import type { IconProps } from './types';

            export default function ${name}({ size = 16, ...rest }: IconProps) {
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        {...rest}
                    >
                        ${content}
                    </svg>
                );
            }
        `;

    const formatted = await format({ text: componentBase, ...formatOptions });
    const exportBase = `export { default as ${name} } from './${name}';\n`;

    fs.appendFileSync(path.join(ICON_DIST_PATH, 'index.ts'), exportBase, 'utf8');
    fs.writeFileSync(path.join(ICON_DIST_PATH, `${name}.tsx`), formatted, 'utf8');
};

export const saveIcons = async () => {
    if (!fs.existsSync(SRC_PATH)) {
        fs.mkdirSync(SRC_PATH);
    }

    if (!fs.existsSync(ICON_DIST_PATH)) {
        fs.mkdirSync(ICON_DIST_PATH);
    }

    const icons: string[] = fs.readdirSync(ICON_REPO_PATH);
    await saveType();

    for (const iconName of icons) {
        const iconContents = fs.readFileSync(path.join(ICON_REPO_PATH, iconName), 'utf8');
        // eslint-disable-next-line no-await-in-loop
        await saveIcon(iconName, iconContents);
    }

    console.log(`Saved ${icons.length} icons`);
};
