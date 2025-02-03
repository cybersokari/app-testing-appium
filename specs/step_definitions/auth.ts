import {Given, Then, When} from "@wdio/cucumber-framework";
import WelcomePage from "../pages/walkthrough.ts";
import {LoginPage} from "../pages/auth/login.ts";
import {Navigation} from "../pages/navigation.ts";
import {NotificationPermissionPage} from "../pages/notification-permission.ts";
import ProfilePage from "../pages/profile.ts";
import {SignupPage} from "../pages/auth/signup.ts";
import {driver} from "@wdio/globals";
import {VerifyPage} from "../pages/auth/verify.ts";
import {SetupPinPage} from "../pages/auth/setup-pin.ts";
import {BiometricsPage} from "../pages/auth/biometrics.ts";
import MailosaurClient from "mailosaur";

Given(/^I am on the login page$/, async function () {
    await WelcomePage.loginBtn.click()
    await new LoginPage().emailInput.waitForDisplayed()
});
When(/^I enter (.*) as email and (.*) as password and clicks login button$/, async function (email: string, password: string) {
    const loginPage = new LoginPage()
    await loginPage.emailInput.setValue(email)
    await loginPage.passwordInput.setValue(password)
    if (loginPage.isIOS) {
        await loginPage.closeIOSKeyboard()
    }
    await loginPage.continueButton.click()
    await loginPage.waitForLoading()
});
When(/^I dismiss push notification permission request$/, async function () {
    await new NotificationPermissionPage().dismissRequest()
});
When(/^I accept push notification permission request$/, async function () {
    await new NotificationPermissionPage().acceptRequest()
});
Then(/^I should see the home screen$/, async function () {
    await new Navigation().homeBtn.waitForDisplayed({timeout: 20000})
});
When(/^I navigate to the profile screen$/, async function () {
    await new Navigation().profileBtn.click()
    await ProfilePage.profileMenuBtn.waitForDisplayed()
});
When(/^clicks on logout button$/, async function () {
    await ProfilePage.scrollDown()
    await ProfilePage.logoutBtn.click()
});
Then(/^I can see the login page$/, async function () {
    await new LoginPage().emailInput.waitForDisplayed()
});
Given(/^I am on the signup screen$/, async function () {
    await WelcomePage.getStartedBtn.waitForDisplayed()
    await WelcomePage.getStartedBtn.click()
});
When(/^I enter a new email and (.*) and click continue$/, async function (validPassword: string) {
    const signupPage = new SignupPage()
    await signupPage.emailInput.waitForDisplayed()
    const mailosaur = new MailosaurClient(process.env.MAILOSAUR_KEY!)
    const tempEmail = mailosaur.servers.generateEmailAddress(process.env.MAILOSAUR_ID!)
    await signupPage.emailInput.setValue(tempEmail)
    await signupPage.passwordInput.setValue(validPassword)
    if (driver.isIOS) {
        await signupPage.closeIOSKeyboard()
    }
    await signupPage.continueBtn.click()
    this.newEmail = tempEmail
    await signupPage.waitForLoading()
});
When(/^verify my account with a valid OTP sent to my email$/, async function () {
    const verifyPage = new VerifyPage()
    await verifyPage.verifyBtn.waitForDisplayed()
    const mailosaur = new MailosaurClient(process.env.MAILOSAUR_KEY!)
    const message = await mailosaur.messages.get( process.env.MAILOSAUR_ID!, {sentTo: this.newEmail}, {timeout: 20000})
    const otp = message.html!.codes![0].value!
    await verifyPage.getFirstInputFieldFromPage().setValue(otp)
    await verifyPage.verifyBtn.click()
});
Then(/^I can setup my transaction pin$/, async function () {
    // Start pin setup
    const setupPinPage = new SetupPinPage()
    await setupPinPage.setupPinNextBtn.waitForDisplayed()
    await setupPinPage.setupPinNextBtn.click()
    // Enter pin
    await setupPinPage.enterPinContinueBtn.waitForDisplayed()
    await setupPinPage.enterPinInput.setValue(1234)
    if (driver.isIOS) {
        await setupPinPage.tapXYPositionOnIOS(200, 200)
    }
    await setupPinPage.enterPinContinueBtn.click()

    // Confirm pin
    await setupPinPage.confirmPinFinishBtn.waitForDisplayed()
    await setupPinPage.confirmPinInput.setValue(1234)
    if (driver.isIOS) {
        await setupPinPage.tapXYPositionOnIOS(200, 200)
    }
    await setupPinPage.confirmPinFinishBtn.click()

    // Close "Pin setup complete" Dialog
    await setupPinPage.closeDialogBtn.waitForDisplayed()
    await setupPinPage.closeDialogBtn.click()
});
Then(/^skip Biometric setup$/, async function () {
    // Skip Biometrics setup
    const biometricPage = new BiometricsPage()
    await biometricPage.notNowBtn.waitForDisplayed()
    await biometricPage.notNowBtn.click()

    // Close "You're all set" Dialog
    const setupPinPage = new SetupPinPage()
    await setupPinPage.closeDialogBtn.waitForDisplayed()
    await setupPinPage.closeDialogBtn.click()
});