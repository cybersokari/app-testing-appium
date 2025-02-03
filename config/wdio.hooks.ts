import {PLATFORM} from '../specs/util/util.ts'
import util from 'node:util'
import AdbHelper from "../specs/util/adb-helper.ts";

const exec = util.promisify(require('child_process').exec);

const extractVersionInfo = async (platform: PLATFORM, type: 'code' | 'name'): Promise<string> => {
  try {
    if (platform === PLATFORM.ANDROID && process.env.APK_PATH) {
      const {ANDROID_HOME, APK_PATH} = process.env;
      if (APK_PATH && ANDROID_HOME) {
        const command = `${ANDROID_HOME}/cmdline-tools/latest/bin/apkanalyzer manifest version-${type === 'code' ? 'code' : 'name'} ${APK_PATH}`;
        const {stdout} = await exec(command);
        console.log(`App ${type} version: ${stdout}`);
        return stdout.trim();
      }
    } else if (platform === PLATFORM.IOS && process.env.APP_PATH) {
      const grepKey = type === 'code' ? 'CFBundleVersion' : 'CFBundleShortVersionString';
      const {stdout} = await exec(
          `/usr/libexec/PlistBuddy -c print ${escapeSpacesInPath(process.env.APP_PATH)}/Info.plist | grep ${grepKey}`
      );
      const version = stdout.toString().split(' ').pop()?.trim() || '';
      console.log(`iOS ${type} version: ${version}`);
      return version;
    }
  } catch (e) {
    console.error(`Error getting build info: ${e}`);
  }
  return '';
};

const getVersionCode = (platform: PLATFORM) => extractVersionInfo(platform, 'code');
const getVersion = (platform: PLATFORM) => extractVersionInfo(platform, 'name');

const disableClipboardEditorOverlayOnAndroid = async () => {
  try {
    await (await AdbHelper.connect()).shell('appops set com.android.systemui READ_CLIPBOARD ignore');
    await AdbHelper.disconnect();
  } catch (e) {
    console.error(`Disabling clipboard overlay failed: ${e}`);
  }
};

const escapeSpacesInPath = (path: string): string => path.replace(/ /g, '\\ ');

export {getVersionCode, getVersion, disableClipboardEditorOverlayOnAndroid};