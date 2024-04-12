import fs from 'fs';
import { ICONS_GROUPS } from "./constants.js";
import { saveIcon } from './save-icons.js';

export const saveIcons = async () => {
    for (const group of ICONS_GROUPS) {
        console.log(`Saving ${group.distFolder} icons...`)
        const icons: string[] = fs.readdirSync(group.svgPath);
        for (const iconName of icons) {
            // eslint-disable-next-line no-await-in-loop
            await saveIcon({
                iconName,
                iconGroup: group
            });
        }

        console.log(`Saved ${icons.length} ${group.distFolder} icons`);
    }
};
