import { fileURLToPath } from "url";
import path from "path";
import format from "prettier-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INCLUDE_BOOTSTRAP_ARG = 'includeBootstrap';

const processArguments = JSON.parse(JSON.stringify(process.argv));
export const shouldIncludeBootstrapIcons = processArguments.includes(INCLUDE_BOOTSTRAP_ARG);

export const DIST_PATH = path.join(__dirname, '../dist');
export const SRC_PATH = path.join(__dirname, '../src');
export const TEMP_PATH = path.join(__dirname, '../temp')
export const BOOTSTRAP_PATH = path.join(TEMP_PATH, 'bootstrap');

export interface IconGroup {
    svgPath: string;
    distPath: string;
    distFolder: string;
    entryFile: string;
}
export const ICONS_GROUPS: IconGroup[] = [
    ...shouldIncludeBootstrapIcons ? [{
        svgPath: path.join(BOOTSTRAP_PATH, 'icons'),
        distPath: path.join(SRC_PATH, 'bootstrap'),
        distFolder: 'bootstrap',
        entryFile: 'bootstrap.ts'
    }] : [],
    {
        svgPath: path.join(TEMP_PATH, 'admin'),
        distPath: path.join(SRC_PATH, 'admin'),
        distFolder: 'admin',
        entryFile: 'index.ts'
    }
]

export const FORMAT_OPTIONS: Partial<format.Options> = {
    eslintConfig: {
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            quotes: ['error', 'single'],
            indent: ['error', 4, { SwitchCase: 1 }],
            'comma-dangle': ['error', 'never']
        }
    },
    prettierOptions: {
        parser: 'vue'
    }
};
