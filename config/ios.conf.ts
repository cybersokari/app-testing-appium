import {getVersion, getVersionCode} from "./wdio.hooks.ts";
import {PLATFORM} from "../specs/util/util.ts";
import {baseConfig} from "./base.conf.ts";

export const config: WebdriverIO.Config = {
    ...baseConfig,
    bail: 5,
    capabilities: [
        {
            platformName: 'iOS',
            'appium:fullReset': false,
            'appium:noReset': false,
            'appium:deviceName': process.env.DEVICE_NAME,
            'appium:platformVersion': process.env.OS_VERSION,
            'appium:automationName': 'XCUITest',
            'appium:app': process.env.APP_PATH,
            'appium:newCommandTimeout': 700,
        },
    ],
    onPrepare: async () => {
        await Promise.all([
            process.env.BUILD_NUMBER = await getVersionCode(PLATFORM.IOS),
            process.env.BUILD_VERSION = await getVersion(PLATFORM.IOS),
        ]);
    },
};