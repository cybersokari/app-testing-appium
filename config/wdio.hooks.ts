import {PLATFORM} from '../specs/util/util.ts'
import util = require('node:util')
import AdbHelper from "../specs/util/adb-helper.ts";
const exec = util.promisify(require('child_process').exec)

async function getBuildVersion(platform: PLATFORM): Promise<string> {
  let version = ''
  try {
    if (platform === PLATFORM.ANDROID && process.env.PACKAGE_NAME) {

      const androidHome = process.env.ANDROID_HOME
      const apkPath = process.env.APK_PATH

      if(apkPath && androidHome) {
        const command = `${androidHome}/cmdline-tools/latest/bin/apkanalyzer manifest version-name ${apkPath}`;
        const {stdout, stderr} = await exec(command);
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        } else {
          version = stdout.trim();
          console.log(`App version: ${version}`);
        }
      }

    } else if (platform === PLATFORM.IOS && process.env.APP_PATH) {
      const {stdout} = await exec(
        `/usr/libexec/PlistBuddy -c print ${escapeSpacesInPath(process.env.APP_PATH)}/Info.plist | grep CFBundleShortVersionString`
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
    await (await AdbHelper.connect()).shell('appops set com.android.systemui READ_CLIPBOARD ignore')
  }catch (e) {
    console.log(`Disabling clipboard overlay failed ${e}`)
  }
}

function escapeSpacesInPath(path: string): string {
  return path.replace(/ /g, '\\ ');
}

export {getBuildVersion, disableClipboardEditorOverlayOnAndroid}
