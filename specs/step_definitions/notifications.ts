import {Given, Then, When} from "@wdio/cucumber-framework";
import {Navigation} from "../pages/navigation.ts";
import HomePage from "../pages/home/home.ts";
import ProfilePage from "../pages/profile.ts";
import {browser, driver} from "@wdio/globals";
import {expect} from 'chai'


Given(/^wait for the home screen to be visible$/, async function () {
    await HomePage.waitForLoading()
    await new Navigation().homeBtn.waitForDisplayed()
});
Then(/^the push notification toggle should be disabled$/, async function () {
    const notificationToggle = ProfilePage.notificationToggle
    await notificationToggle.scrollIntoView()
    // await notificationToggle.waitForDisplayed()
    let value = await (driver.isIOS
        ? notificationToggle.getValue()
        : notificationToggle.getAttribute('checked'))
    if(driver.isAndroid && process.env.CI === 'true') {

        console.log(`Skipping notification status asserting because value is ${value}`)
        // Auto accept permission cannot be disabled on Github Action
        // Android emulators for now
        //TODO: Find a way to disable this behaviour in Github Action
        this.pushstatus = value
        return
    } else {
        expect(value).to.equal(driver.isIOS ? '0' : 'false')
    }

});
When(/^I enable push notifications from profile screen$/,async function () {
    if(driver.isAndroid && process.env.CI === 'true') {

        console.log(`Skipping enabling push notification because status is ${this.pushstatus}`)
        // Auto accept permission cannot be disabled on Github Action
        // Android emulators for now
        //TODO: Find a way to disable this behaviour in Github Action
    } else {
        await ProfilePage.enablePushNotification()
        await ProfilePage.delay(5000)
    }

});
Then(/^the push notification toggle should be enabled$/, async function () {
    const notificationToggle = ProfilePage.notificationToggle
    await notificationToggle.scrollIntoView()
    let value = await (driver.isIOS
        ? notificationToggle.getValue()
        : notificationToggle.getAttribute('checked'))
    expect(value).to.equal(browser.isIOS ? '1' : 'true')
});