import {disableClipboardEditorOverlayOnAndroid, getVersion, getVersionCode} from "./wdio.hooks.ts";
import {PLATFORM} from "../specs/util/util.ts";
import {baseConfig} from "./base.conf.ts";

export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:fullReset': false,
            'appium:noReset': false,
            'appium:autoGrantPermissions': false,
            'appium:app': process.env.APK_PATH,
            'appium:uiautomator2ServerInstallTimeout': 60000,
            'appium:deviceReadyTimeout': 300,
        },
    ],
    onPrepare: async () => {
        await Promise.all([
            process.env.BUILD_VERSION = await getVersion(PLATFORM.ANDROID),
            process.env.BUILD_NUMBER = await getVersionCode(PLATFORM.ANDROID),
            disableClipboardEditorOverlayOnAndroid(),
        ]);
    },
};