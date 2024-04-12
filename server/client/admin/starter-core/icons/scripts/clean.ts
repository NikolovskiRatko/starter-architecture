import { rimraf } from 'rimraf'
import { SRC_PATH, BOOTSTRAP_PATH, DIST_PATH } from "./constants.js";

const processArguments = JSON.parse(JSON.stringify(process.argv));
const isAfterBuildClean = processArguments.includes('after-build');

const cleanBeforeStart = async () => {
    await rimraf([SRC_PATH, BOOTSTRAP_PATH, DIST_PATH])
}

const cleanAfterBuild = async () => {
    await rimraf([SRC_PATH, BOOTSTRAP_PATH])
}

if (isAfterBuildClean) {
    console.log('Clean after build...');
    cleanAfterBuild()
} else {
    console.log('Clean before start...');
    cleanBeforeStart()
}