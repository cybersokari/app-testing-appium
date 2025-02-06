import {Given, Then, When} from '@wdio/cucumber-framework'
import WelcomePage from '../pages/walkthrough.ts'
import {LoginPage} from '../pages/auth/login.ts'
import DepositCryptoPage from '../pages/wallet/crypto/deposit-crypto.ts'
import {$, driver} from '@wdio/globals'
import {expect, should} from 'chai'
import WalletHomePage from "../pages/wallet/home.ts";
import {Navigation} from "../pages/navigation.ts";
import TopUpPage from "../pages/wallet/fiat/top-up.ts";
import TopUpAccountPage from "../pages/wallet/fiat/topup-account.ts";
import HomePage from "../pages/home/home.ts";
import {page} from "./hooks.ts";


Given(/^I am logged into the application$/, async function () {
  await WelcomePage.loginBtn.waitForDisplayed({timeout: 30000})
  await WelcomePage.loginBtn.click()
  await new LoginPage().loginWithDefaultUser()
})
When(/^I am on the deposit screen$/, async function () {
  await HomePage.depositBtn.click()
  await HomePage.usdCBtn.waitForDisplayed()
})
When(/^when I try to deposit (.*)$/, async function (token: string) {
  switch (token){
    case 'USDC':
      await HomePage.usdCBtn.click()
          break
    default : await HomePage.usdTBtn.click()
  }
  await HomePage.waitForLoading(15000)
  await DepositCryptoPage.networkSelectBtn.waitForDisplayed()
  await DepositCryptoPage.networkSelectBtn.click()
  const networkBtn = async () => {
    const ntwk = DepositCryptoPage.networkTRXBtn
    if (await ntwk.isExisting()) {
      return ntwk
    }
    return DepositCryptoPage.networkBSCBtn
  }
  await (await networkBtn()).click()
})
When(/^I can copy the wallet address to device clipboard$/, async function () {
  await DepositCryptoPage.waitForLoading()
  await DepositCryptoPage.addressCopyBtn.click()
  // dismiss push notification permission nudge request
  if(await DepositCryptoPage.dismissPushRequestBtn.isDisplayed()){
    // dismiss push notification permission nudge request
    await DepositCryptoPage.dismissPushRequestBtn.click()
  }
  const ff = await driver.getClipboard('plaintext')
  expect(ff.length).to.be.greaterThan(1)
})
When(/^share the wallet address as text$/, async function () {
  await DepositCryptoPage.addressShareBtn.scrollIntoView()
  await DepositCryptoPage.addressShareBtn.click()
  // Confirm native share modal visible
  if (driver.isIOS) {
    const iOSShareModal = $('~UICloseButtonBackground')
    // await expect(iOSShareModal).toBeExisting()
    should().exist(iOSShareModal, 'iOS modal should be visible')
    await iOSShareModal.click()
  } else {
    const isDisplayed = await page.$('android:id/content').isDisplayed()
    expect(isDisplayed).to.be.true
  }
})

When(/^I initiate a Naira deposit$/, async function () {
  await WalletHomePage.waitForLoading(15000)
  await new Navigation().openWalletTab()
  await WalletHomePage.receiveBtn.click()
  await WalletHomePage.ngnAssetModalBtn.waitForDisplayed()
  await WalletHomePage.ngnAssetModalBtn.click()
});
When(/^I enter a deposit amount of (\d+)$/, async function (amount : number) {
  await TopUpPage.fiatInput.waitForDisplayed()
  await TopUpPage.fiatInput.setValue(amount)
  if (driver.isIOS) {
    await TopUpPage.closeIOSKeyboard()
  }
  await TopUpPage.fiatContinueBtn.waitForEnabled()
  await TopUpPage.fiatContinueBtn.click()
});
When(/^I confirm the deposit details$/, async function () {

  await TopUpPage.fiatConfirmBtn.waitForDisplayed()
  await TopUpPage.fiatConfirmBtn.click()
  await TopUpPage.waitForLoading()

});
When(/^I copy the NUBAN account number$/, async function () {
  await TopUpAccountPage.fiatNubanCpyBtn.click()

  if(await TopUpAccountPage.dismissPushRequestBtn.isDisplayed()){
    // dismiss push notification permission nudge request
    await TopUpAccountPage.dismissPushRequestBtn.click()
  }
  await TopUpAccountPage.madePaymentBtn.scrollIntoView()
  await TopUpAccountPage.madePaymentBtn.doubleClick()
  await TopUpAccountPage.waitForLoading()

  await TopUpAccountPage.doneBtn.waitForDisplayed()
  await TopUpAccountPage.doneBtn.click()
});
Then(/^the copied account number should be available on device clipboard$/, async function () {
  const accountNumber = await driver.getClipboard('plaintext')
  expect(accountNumber.length).to.be.greaterThan(1)
});