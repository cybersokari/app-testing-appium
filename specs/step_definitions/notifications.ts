import {Given, Then, When} from "@wdio/cucumber-framework";
import {Navigation} from "../pages/navigation.ts";
import {HomePage} from "../pages/home/home.ts";
import {ProfilePage} from "../pages/profile.ts";
import {browser, driver, expect} from "@wdio/globals";

Given(/^wait for the home screen to be visible$/, async function () {
    await new HomePage().waitForLoading()
    await new Navigation().homeBtn.waitForDisplayed()
});
Then(/^the push notification toggle should be disabled$/, async function () {
    const notificationToggle = new ProfilePage().notificationToggle
    await notificationToggle.waitForDisplayed()
    let value = await (driver.isIOS
        ? notificationToggle.getValue()
        : notificationToggle.getAttribute('checked'))
    await expect(value).toEqual(driver.isIOS ? '0' : 'false')
});
When(/^I enable push notifications from profile screen$/,async function () {
    const profilePage = new ProfilePage()
    await profilePage.enablePushNotification()
    await profilePage.delay(2000)
});
Then(/^the push notification toggle should be enabled$/, async function () {
    const profilePage = new ProfilePage()
    const notificationToggle = profilePage.notificationToggle
    let value = await (driver.isIOS
        ? notificationToggle.getValue()
        : notificationToggle.getAttribute('checked'))
    expect(value).toEqual(browser.isIOS ? '1' : 'true')
});