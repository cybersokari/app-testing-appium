import {config as env} from 'dotenv'
import {
    disableClipboardEditorOverlayOnAndroid,
    getBuildVersion
} from './wdio.hooks.ts'
import {PLATFORM} from '../specs/util/util.ts'
import {driver} from '@wdio/globals'
import {PickleResult, PickleStep} from '@wdio/types/build/Frameworks'
import {Pickle} from '@cucumber/messages'
import {ITestCaseHookParameter} from "@wdio/cucumber-framework";
import {ANDROID_REPORTS_DIR} from "../specs/util/constants.ts";
import AdbHelper from "../specs/util/adb-helper.ts";
import {AllureReporterOptions} from "@wdio/allure-reporter";

env({path: '.env.android'})
export const config: WebdriverIO.Config = {
    runner: 'local',

    services: [['appium', {
        command: 'appium'
    }]],

    port: 4723,

    specs: ['../specs/**/*.feature'],
    // specs: ['../specs/deposit.feature'],
    // Patterns to exclude.
    // exclude: ['../specs/util/**', '../specs/pages/**'],
    maxInstances: 1,

    capabilities: [
        {
            // capabilities for local Appium web tests on an Android Emulator
            platformName: 'Android',
            'appium:fullReset': false,
            'appium:noReset': false,
            'appium:autoGrantPermissions': false,
            // 'appium:deviceName': process.env.DEVICE_NAME,
            // 'appium:platformVersion': process.env.DEVICE_OS_VERSION,
            'appium:automationName': 'UiAutomator2',
            'appium:app': process.env.APK_PATH,
            'appium:uiautomator2ServerInstallTimeout': 60000,
            'appium:deviceReadyTimeout': 300,
        },
    ],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'warn',
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    waitforInterval: 1000,
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 45000,
    //
    // Default request retries count
    connectionRetryCount: 3,

    framework: 'cucumber',

    specFileRetries: 0,
    //
    // Delay in seconds between the spec file retry attempts
    specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    reporters: [
        'spec',
        // [
        //   'video',
        //   {
        //     saveAllVideos: false, // If true, also saves videos for successful test cases
        //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        //     outputDir: `${ANDROID_REPORTS_DIR}/videos`,
        //     videoRenderTimeout: 10000, // Seconds
        //     onlyRecordLastFailure: true,
        //   },
        // ],
        [
            'allure',
            <AllureReporterOptions>{
                outputDir: `${ANDROID_REPORTS_DIR}/allure-results`,
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
                issueLinkTemplate: 'https://linear.app/finnaprotocol/issue/{}',
                reportedEnvironmentVars: {
                    "OS": 'Android',
                    "OS version": process.env.OS_VERSION,
                    "Build version": process.env.BUILD_VERSION,
                    "Device Name": process.env.DEVICE_NAME,
                },
            },
        ],
    ],

    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: true,
        // <string[]> module used for processing required features
        requireModule: [],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: true,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <string[]> (file/dir) require files before executing features
        require: ['./specs/step_definitions/*.ts'],
        // Setting to true, breaks Allure reporter
        scenarioLevelReporter: false,
        order: 'defined',
        // <string> specify a custom snippet syntax
        snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: false,
        // <number> timeout for step definitions
        timeout: 30000,
    },

    afterStep: async (
        _step: PickleStep,
        _scenario: Pickle,
        result: PickleResult,
        _context: Object,
    ) => {
        if (result.error) {
            await driver.takeScreenshot()
        }
    },

    // afterTest: afterTest,
    onComplete: async () => {
        await AdbHelper.disconnect()
        // return generateAllureReports(ANDROID_REPORTS_DIR)
    },

    onPrepare: async () => {
        await AdbHelper.connect()
        process.env.BUILD_VERSION = await getBuildVersion(PLATFORM.ANDROID)
        await disableClipboardEditorOverlayOnAndroid()
    },
    afterScenario: async (world: ITestCaseHookParameter, _result: PickleResult, _context: Object) => {
        if (!world.willBeRetried) {
            await driver.reloadSession()
        }
    }
}
