import {config as env} from "dotenv";
import {copyDirToDir, PLATFORM} from "../specs/util/util.ts";
import {ANDROID_REPORTS_DIR, IOS_REPORTS_DIR} from "../specs/util/constants.ts";
import {promisify} from "node:util";
const allure = require('allure-commandline')
const firebase = require('firebase-tools')
const exec = promisify(require('child_process').exec)
env({path: ['.env.ios', '.env.android']})

async function main() {
    const arg = process.argv[2].toLowerCase()
    console.log(`Deploying ${arg} report to Firebase Hosting`)
    const platform : PLATFORM = arg === 'ios' ? PLATFORM.IOS : PLATFORM.ANDROID
    // Create new ./allure-results/history directory for report regeneration
    const baseDir = platform === PLATFORM.IOS ? IOS_REPORTS_DIR : ANDROID_REPORTS_DIR
    const reportsBaseDir = `${baseDir}/allure-report`
    const resultsBaseDir = `${baseDir}/allure-results`

    const destination = `${resultsBaseDir}/history`
    const source = `${reportsBaseDir}/history`
    try {
        await exec(`rm -rf ${destination} && mkdir -p ${destination}`)
        await exec(`cp -r ${source} ${resultsBaseDir} --preserve=timestamps 2>/dev/null`)
    } catch (e) {
        console.log(`Allure history cloning failed: ${e}`)
    }
    // Generate new Allure report
    const generation = allure([
        'generate',
        resultsBaseDir,
        '--report-dir',
        reportsBaseDir,
        '--clean',
    ])
    return new Promise((resolve, reject) => {
        const reportError = new Error('Could not generate Allure report')
        const generationTimeout = setTimeout(() => reject(reportError), 60000)

        generation.on('exit', async function (exitCode: number) {
            if (exitCode !== 0) {
                clearTimeout(generationTimeout)
                return reject(reportError)
            }

            // Deploy reports to Firebase Hosting
            if (process.env.FIREBASE_TOKEN) {
                const firebaseHostingConfig = `./firebase-hosting/${
                    platform === PLATFORM.IOS ? 'ios' : 'android'
                }`
                // Copy Firebase hosting init files to report directory
                // This needs to be done because 'allure generate --clean' recreates
                // the '/allure-reports' directory
                await copyDirToDir({from: firebaseHostingConfig, to: reportsBaseDir, filesOnly: true})
                // Try to publish
                try {
                    await publishReportToFirebaseHosting(`${reportsBaseDir}/firebase.json`)
                } catch (e) {
                    console.log(`Publishing to Firebase hosting failed: ${e}`)
                }
            }
            clearTimeout(generationTimeout)
            resolve('Allure report successfully generated')
        })
    })
}

async function publishReportToFirebaseHosting(firebaseJsonPath: string) {
    await firebase.deploy({
        only: 'hosting',
        config: firebaseJsonPath,
        project: 'finna-app',
        token: process.env.FIREBASE_TOKEN,
    })
}

// Only call main if this file is being run directly
if (require.main === module) {
    main();
}