import { execSync } from 'child_process';

export const cloneRepo = () => execSync('git clone https://github.com/twbs/icons.git repo', { stdio: [0, 1, 2] });
