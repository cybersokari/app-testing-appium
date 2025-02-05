import {ReporterEntry} from "@wdio/types/build/Reporters";
import {getVersion, getVersionCode} from "./wdio.hooks.ts";
import {PLATFORM} from "../specs/util/util.ts";
import {baseConfig} from "./base.conf.ts";

export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [
        {
            platformName: 'iOS',
            'appium:fullReset': false,
            'appium:noReset': false,
            'appium:deviceName': process.env.DEVICE_NAME,
            'appium:platformVersion': process.env.OS_VERSION,
            'appium:automationName': 'XCUITest',
            'appium:app': process.env.APP_PATH,
            'appium:newCommandTimeout': 400,
        },
    ],
    reporters: baseConfig.reporters?.map((reporter: ReporterEntry):ReporterEntry => {
        if (Array.isArray(reporter) && reporter[0] === 'video') {
            reporter[1].outputDir = `${process.env.IOS_REPORTS_DIR}/video`;
        } else if (Array.isArray(reporter) && reporter[0] === 'allure') {
            reporter[1].outputDir = `${process.env.IOS_REPORTS_DIR}/allure-results`;
        }
        return reporter;
    }),
    onPrepare: async () => {
        await Promise.all([
            process.env.BUILD_NUMBER = await getVersionCode(PLATFORM.IOS),
            process.env.BUILD_VERSION = await getVersion(PLATFORM.IOS),
        ]);
    },
};