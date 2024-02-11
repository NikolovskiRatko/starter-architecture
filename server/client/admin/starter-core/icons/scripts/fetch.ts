import { execSync } from 'child_process';
import { BOOTSTRAP_PATH } from './constants.js'

export const cloneRepo = () => execSync(`git clone https://github.com/twbs/icons.git ${BOOTSTRAP_PATH}`, { stdio: [0, 1, 2] });
