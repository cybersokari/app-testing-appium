// Base configuration shared by both Android and iOS
import {driver} from "@wdio/globals";
import {PickleResult, PickleStep} from '@wdio/types/build/Frameworks'
import {Pickle} from '@cucumber/messages'
import {ITestCaseHookParameter} from "@wdio/cucumber-framework";
import {CucumberOptions} from "@wdio/cucumber-framework/build/types";

export const baseConfig: Partial<WebdriverIO.Config> = {
    runner: 'local',
    port: 4723,
    maxInstances: 1,
    specs: ['../specs/**/*.feature'],
    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 10000,
    waitforInterval: 1000,
    connectionRetryTimeout: 45000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    services: [['appium', {
        command: 'appium'
    }]],

    cucumberOpts:<CucumberOptions> {
        backtrace: true,
        failAmbiguousDefinitions: true,
        failFast: false,
        ignoreUndefinedDefinitions: true,
        snippets: true,
        source: true,
        profile: [],
        require: ['./specs/step_definitions/**/*.ts'],
        scenarioLevelReporter: false,
        order: 'defined',
        strict: true,
        tagsInTitle: false,
        timeout: 60000,
    },

    afterStep: async (
        _step: PickleStep,
        _scenario: Pickle,
        result: PickleResult,
        _context: Object,
    ) => {
        if (result.error) {
            // await driver.takeScreenshot()
        }
    },

    afterScenario: async (world: ITestCaseHookParameter) => {
        if (!world.willBeRetried) {
            await driver.reloadSession();
        }
    },

    reporters: [
        'spec',
        ['video', { saveAllVideos: true, videoSlowdownMultiplier: 3, videoRenderTimeout: 15 }],
        ['allure', {
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: true,
            reportedEnvironmentVars: {
                Environment: process.env.PROD === 'true' ? 'Production' : 'Staging',
            },
        }],
    ],
};


