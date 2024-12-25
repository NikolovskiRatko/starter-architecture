import { existsSync, mkdirSync, readdirSync, copyFile } from 'fs';
import { join, extname } from "path";
import { promisify } from 'util';
import { SRC_PATH, ICONS_GROUPS, TEMP_PATH } from "./constants.js";

const copyFilePromise = promisify(copyFile);

export const createDirectories = async () => {
    // Create source folder
    if (!existsSync(SRC_PATH)) {
        mkdirSync(SRC_PATH);
    }

    // Create icon group specific folders in src
    ICONS_GROUPS.forEach(iconGroup => {
        if (!existsSync(iconGroup.distPath)) {
            mkdirSync(iconGroup.distPath);
        }
    })

    // Move .ts files from /temp dir to /src
    // Vue types and exports
    const filePromises: Promise<void>[] = readdirSync(TEMP_PATH).reduce((acc, file) => {
        const extension = extname(file);
        const destPath = join(SRC_PATH, file);
        if (extension === '.ts' && !existsSync(destPath)) {
            const promise = copyFilePromise(join(TEMP_PATH, file), destPath);
            acc.push(promise)
        }
        return acc;
    }, [] as Promise<void>[]);

    await Promise.all(filePromises);
}