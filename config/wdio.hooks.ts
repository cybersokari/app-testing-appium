import {PLATFORM} from '../specs/util/util.ts'
import util = require('node:util')
import AdbHelper from "../specs/util/adb-helper.ts";

const exec = util.promisify(require('child_process').exec)

async function getBuildVersion(platform: PLATFORM): Promise<string> {
  let version = ''
  try {
    if (platform === PLATFORM.ANDROID && process.env.PACKAGE_NAME) {
      const info = await AdbHelper.adb.getPackageInfo(process.env.PACKAGE_NAME)
      version = info.versionName ?? ''
      console.log(`Android build version: ${version}`)
      console.log(`Android build isInstalled: ${info.isInstalled}`)
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

export {getBuildVersion, disableClipboardEditorOverlayOnAndroid}
