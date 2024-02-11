import { saveIcons } from './build.js';
import { cloneRepo } from './fetch.js';
import { shouldIncludeBootstrapIcons } from './constants.js';
import { createDirectories } from './prepare.js';

console.log('Creating directories...');
await createDirectories();

if (shouldIncludeBootstrapIcons) {
    console.log('Cloning bootstrap repo...');
    cloneRepo();
}

saveIcons();
