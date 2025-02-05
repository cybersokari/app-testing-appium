import {disableClipboardEditorOverlayOnAndroid, getVersion, getVersionCode} from "./wdio.hooks.ts";
import {PLATFORM} from "../specs/util/util.ts";
import {baseConfig} from "./base.conf.ts";

export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [
        {
            platformName: 'Android',
            'appium:fullReset': false,
            'appium:noReset': false,
            'appium:autoGrantPermissions': false,
            'appium:app': process.env.APK_PATH,
            'appium:uiautomator2ServerInstallTimeout': 60000,
            'appium:deviceReadyTimeout': 300,
        },
    ],
    reporters: baseConfig.reporters?.map((reporter) => {
        if (Array.isArray(reporter) && reporter[0] === 'video') {
            reporter[1].outputDir = `${process.env.ANDROID_REPORTS_DIR}/video`;
        } else if (Array.isArray(reporter) && reporter[0] === 'allure') {
            reporter[1].outputDir = `${process.env.ANDROID_REPORTS_DIR}/allure-results`;
            reporter[1].issueLinkTemplate = 'https://linear.app/finnaprotocol/issue/{}';
        }
        return reporter;
    }),
    onPrepare: async () => {
        await Promise.all([
            process.env.BUILD_VERSION = await getVersion(PLATFORM.ANDROID),
            process.env.BUILD_NUMBER = await getVersionCode(PLATFORM.ANDROID),
            disableClipboardEditorOverlayOnAndroid(),
        ]);
    },
};