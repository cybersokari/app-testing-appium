import {PLATFORM} from '../specs/util/util.ts'
const allure = require('allure-commandline')
import util = require('node:util')
import AdbHelper from "../specs/util/adb-helper.ts";

const exec = util.promisify(require('child_process').exec)

async function generateAllureReports(baseDir: string) {
  const timeOutMs = 30000
  // Create new ./allure-results/history directory for report regeneration
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
    const generationTimeout = setTimeout(() => reject(reportError), timeOutMs)

    generation.on('exit', async function (exitCode: number) {
      clearTimeout(generationTimeout)
      if (exitCode !== 0) {
        return reject(reportError)
      }
      return resolve('Allure report successfully generated')
    })
  })
}

async function getBuildVersion(platform: PLATFORM): Promise<string> {
  let version = ''
  try {
    if (platform === PLATFORM.ANDROID && process.env.PACKAGE_NAME) {
      const info = await AdbHelper.adb.getPackageInfo(process.env.PACKAGE_NAME)
      version = info.versionName ?? ''
      console.log(`Android build version ${info.versionName}`)
    } else if (platform === PLATFORM.IOS && process.env.APP_PATH) {
      const {stdout} = await exec(
        `/usr/libexec/PlistBuddy -c print ${escapeSpacesInPath(process.env.APP_PATH)}/Info.plist | grep CFBundleShortVersionString`,
      )
      const array = stdout.toString().split(' ')
      version = array[array.length -1]
      console.log(`iOS build version ${version}`)
    }
  } catch (e) {
    console.log(`Error getting build info ${e}`)
  }
  return version
}

async function disableClipboardEditorOverlayOnAndroid(){
  try {
    await AdbHelper.adb.shell('appops set com.android.systemui READ_CLIPBOARD ignore')
  }catch (e) {
    console.log(`Disabling clipboard overlay failed ${e}`)
  }
}

function escapeSpacesInPath(path: string): string {
  return path.replace(/ /g, '\\ ');
}

export {getBuildVersion, generateAllureReports, disableClipboardEditorOverlayOnAndroid}
