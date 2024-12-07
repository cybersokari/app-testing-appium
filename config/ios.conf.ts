import {config as env} from 'dotenv'
import {generateAllureReports, getBuildVersion} from './wdio.hooks.ts'
import {PLATFORM} from '../specs/util/util.ts'
import {driver} from '@wdio/globals'
import {PickleResult, PickleStep} from '@wdio/types/build/Frameworks'
import {Pickle} from '@cucumber/messages'
import {ITestCaseHookParameter} from "@wdio/cucumber-framework";
import {IOS_REPORTS_DIR} from "../specs/util/constants.ts";

env({path: '.env.ios'})
export const config: WebdriverIO.Config = {
  runner: 'local',

  port: 4723,

  specs: ['../specs/**/*.feature'],
  // specs: ['../specs/deposit.feature'],
  // Patterns to exclude.
  // exclude: ['../specs/util/**', '../specs/pages/**'],
  maxInstances: 1,

  capabilities: [
    {
      // capabilities for local Appium web tests on an iOS Emulator
      platformName: 'iOS',
      'appium:fullReset': false,
      'appium:noReset': false,
      // 'appium:autoAcceptAlerts': true,
      // 'appium:deviceName': process.env.DEVICE_NAME,
      // 'appium:platformVersion': process.env.DEVICE_OS_VERSION,
      'appium:automationName': 'XCUITest',
      'appium:app': process.env.APP_PATH,
    },
  ],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'warn',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //   webdriver: 'warn',
  //   '@wdio/appium-service': 'warn',
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 5,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'http://localhost:8080',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  waitforInterval: 1000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  services: ['appium'],

  framework: 'cucumber',

  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: [
    'spec',
    [
      'video',
      {
        saveAllVideos: false, // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        outputDir: `${IOS_REPORTS_DIR}/videos`,
        videoRenderTimeout: 15000, // Seconds
        onlyRecordLastFailure: true,
      },
    ],
    [
      'allure',
      {
        outputDir: `${IOS_REPORTS_DIR}/allure-results`,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true,
        reportedEnvironmentVars: {
          os_platform: 'iOS',
          build_version: process.env.buildversion,
        },
      },
    ],
  ],

  cucumberOpts: {
    // retry: 1,
    // <boolean> show full backtrace for errors
    backtrace: false,
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
    require: ['./specs/step_definitions/**/*.ts'],
    // Setting to true breaks Allure reporter when useCucumberStepReporter is true
    scenarioLevelReporter: false,
    order: 'defined',
    // <string> specify a custom snippet syntax
    snippetSyntax: undefined,
    // <boolean> fail if there are any undefined or pending steps
    strict: true,
    // <boolean> add cucumber tags to feature or scenario name
    tagsInTitle: false,
    // <number> timeout for step definitions
    timeout: 20000,
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
  onComplete: async () => {
    // return generateAllureReports(IOS_REPORTS_DIR)
  },
  onPrepare: async () => {
    process.env.buildversion = await getBuildVersion(PLATFORM.IOS)
  },
  afterScenario: async (world: ITestCaseHookParameter, _result: PickleResult, _context: Object) => {
    if(!world.willBeRetried){
      await driver.reloadSession()
    }
  }
}
