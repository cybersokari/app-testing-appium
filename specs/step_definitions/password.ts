import {Given, Then, When} from "@wdio/cucumber-framework";
import {browser} from "@wdio/globals";
import {Navigation} from "../pages/navigation.ts";
import ProfilePage from "../pages/profile.ts";
import {SecurityPage} from "../pages/account/security.ts";
import {ChangePasswordPage} from "../pages/account/change-password.ts";
import {Page, ToastStatus} from "../pages/page.ts";
import {expect} from 'chai'


Given(/^I navigate to change password screen$/, async function () {
    await new Navigation().profileBtn.click()
    if (browser.isAndroid) {
        await ProfilePage.androidScrollTextToView('Control your security and privacy')
        await ProfilePage.securityMenuBtn.click()
    } else {
        await ProfilePage.securityMenuBtn.click()
    }

    const changePasswordMenu = new SecurityPage().changePasswordMenuBtn
    await changePasswordMenu.waitForDisplayed()
    await changePasswordMenu.click()

    const changePasswordPage = new ChangePasswordPage()
    await changePasswordPage.confirmChangePasswordBtn.waitForDisplayed()
});

When(/^I enter (.*) as the current password$/, async function (currentPassword: string) {
    const changePasswordPage = new ChangePasswordPage()
    await changePasswordPage.currentPasswordInput.setValue(currentPassword)
    // if (browser.isIOS) {
    //     await changePasswordPage.closeIOSKeyboard()
    // }
});
When(/^I enter (.*) as the new password$/, async function (newPassword) {
    const changePasswordPage = new ChangePasswordPage()
    await changePasswordPage.newPasswordInput.setValue(newPassword)
    // if (browser.isIOS) {
    //     await changePasswordPage.closeIOSKeyboard()
    // }
});
When(/^I enter (.*) as the new password confirmation and click continue$/, async function (newPassword) {
    const changePasswordPage = new ChangePasswordPage()
    await changePasswordPage.repeatPasswordInput.setValue(newPassword)
    if (browser.isIOS) {
        await changePasswordPage.closeIOSKeyboard()
    }
    await changePasswordPage.confirmChangePasswordBtn.click()
});
Then(/^I should see an error toast message$/, async function () {
    expect(await new Page().getToastStatus()).to.equal(ToastStatus.ERROR)
});