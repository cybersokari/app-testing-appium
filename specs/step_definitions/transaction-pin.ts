import {Then, When} from "@wdio/cucumber-framework";
import {Navigation} from "../pages/navigation.ts";
import {ProfilePage} from "../pages/profile.ts";
import {browser, expect} from "@wdio/globals";
import {SecurityPage} from "../pages/account/security.ts";
import {ResetPinPage} from "../pages/account/security/pin/reset-pin.ts";
import {CurrentPinPage} from "../pages/account/security/pin/current-pin.ts";
import {getFirstInputFromCurrentScreen} from "../util/util.ts";
import {NewPinPage} from "../pages/account/security/pin/new-pin.ts";
import {RepeatPinPage} from "../pages/account/security/pin/repeat-pin.ts";
import {Page, ToastStatus} from "../pages/page.ts";

When(/^I navigate to security settings$/, async function () {

    await new Navigation().profileBtn.click()
    const profilePage = new ProfilePage()
    if (browser.isAndroid) {
        await profilePage.androidScrollTextToView('Control your security and privacy')
        await profilePage.securityMenuBtn.click()
    } else {
        await profilePage.securityMenuBtn.click()
    }
});
When(/^I initiate transaction pin change$/, async function () {

    const pinUpdateSetupBtn = new SecurityPage().changePinMenuBtn
    await pinUpdateSetupBtn.waitForDisplayed()
    await pinUpdateSetupBtn.click()

    const changePinBtn = new ResetPinPage().changePinBtn
    await changePinBtn.waitForDisplayed()
    await changePinBtn.click()

    const enterCurrentPinContinueBtn = new CurrentPinPage().continueBtn
    await enterCurrentPinContinueBtn.waitForDisplayed()

});
When(/^I enter current pin (.*)$/, async function (pin : number) {

    await getFirstInputFromCurrentScreen().setValue(pin)
    const enterCurrentPinContinueBtn = new CurrentPinPage().continueBtn
    await enterCurrentPinContinueBtn.waitForEnabled()
    await new Page().tapXYPositionOnIOS(200, 200)
    await enterCurrentPinContinueBtn.click()
});
When(/^I enter new pin (.*)$/, async function (pin: number ) {
    const enterNewPinContinueBtn = new NewPinPage().continueBtn
    await enterNewPinContinueBtn.waitForDisplayed()
    await getFirstInputFromCurrentScreen().setValue(pin)
    await enterNewPinContinueBtn.waitForEnabled()
    await new Page().tapXYPositionOnIOS(200, 200)
    await enterNewPinContinueBtn.click()

});
When(/^I confirm new pin (.*)$/, async function (pin: number) {
    const repeatPinPage = new RepeatPinPage()
    const repeatNewPinContinueBtn = repeatPinPage.continueBtn
    await repeatNewPinContinueBtn.waitForDisplayed()
    await getFirstInputFromCurrentScreen().setValue(pin)
    await repeatNewPinContinueBtn.waitForEnabled()
    await new Page().tapXYPositionOnIOS(200, 200)
    await repeatNewPinContinueBtn.click()
});
Then(/^I should see an error message indicating invalid pin change$/, async function () {
    expect(await new RepeatPinPage().getToastStatus()).toEqual(ToastStatus.ERROR)
});