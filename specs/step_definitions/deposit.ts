import {Given, Then, When} from '@wdio/cucumber-framework'
import {WelcomePage} from '../pages/walkthrough.ts'
import {LoginPage} from '../pages/auth/login.ts'
import {DepositCryptoPage} from '../pages/wallet/crypto/deposit-crypto.ts'
import {$, driver, expect} from '@wdio/globals'
import {WalletHomePage} from "../pages/wallet/home.ts";
import {Navigation} from "../pages/navigation.ts";
import {TopUpPage} from "../pages/wallet/fiat/top-up.ts";
import {TopUpAccountPage} from "../pages/wallet/fiat/topup-account.ts";
import { homePage } from './hooks.ts'


Given(/^I am logged into the application$/, async function () {
  await new WelcomePage().loginBtn.click()
  await new LoginPage().loginWithDefaultUser()
})
When(/^user navigate to deposit screen$/, async function () {
  await homePage.waitForLoading()
  await homePage.depositBtn.click()
  const assetBtn = homePage.usdCBtn
  await assetBtn.waitForDisplayed()
  await homePage.usdCBtn.click()
  await homePage.waitForLoading(15000)
})
When(/^select prefer network$/, async function () {
  const cryptoPage = new DepositCryptoPage()
  const cryptoSelect = cryptoPage.networkSelectBtn
  await cryptoSelect.waitForDisplayed()
  await cryptoSelect.click()
})
When(/^clicks on copy address button$/, async function () {
  const cryptoPage = new DepositCryptoPage()
  const networkBtn = async () => {
    const ntwk = cryptoPage.networkTRXBtn
    if (await ntwk.isExisting()) {
      return ntwk
    }
    return cryptoPage.networkBSCBtn
  }
  await (await networkBtn()).click()
  await cryptoPage.waitForLoading()
  await cryptoPage.addressCopyBtn.click()
  // dismiss push notification permission nudge request
  if(await cryptoPage.dismissPushRequestBtn.isDisplayed()){
    // dismiss push notification permission nudge request
    await cryptoPage.dismissPushRequestBtn.click()
  }
})
When(/^clicks on share button$/, async function () {
  const cryptoPage = new DepositCryptoPage()
  await cryptoPage.scrollDown()
  const cryptoShare = cryptoPage.addressShareBtn
  await cryptoShare.click()
})
Then(/^the wallet address should be copied to device clipboard$/, async function () {
  const ff = await driver.getClipboard('plaintext')
  expect(ff.length).toBeGreaterThan(1)
})
Then(/^the share modal should be visible$/, async function () {
  if (driver.isIOS) {
    await $('~UICloseButtonBackground').click()
  }
  //TODO: SHARE MODAL ANDORID
})
When(/^I initiate a Naira deposit$/, async function () {

  const walletHome = new WalletHomePage()
  await walletHome.waitForLoading(15000)
  await new Navigation().openWalletTab()
  await walletHome.receiveBtn.click()

  await walletHome.ngnAssetModalBtn.waitForDisplayed()
  await walletHome.ngnAssetModalBtn.click()



});
When(/^I enter a deposit amount of (\d+)$/, async function (amount : number) {

  const topUpPage = new TopUpPage()
  const amountInput = topUpPage.fiatInput
  await amountInput.waitForDisplayed()
  await amountInput.setValue(amount)
  if (driver.isIOS) {
    await topUpPage.closeIOSKeyboard()
  }
  await topUpPage.fiatContinueBtn.waitForEnabled()
  await topUpPage.fiatContinueBtn.click()
});
When(/^I confirm the deposit details$/, async function () {

  const topUpPage = new TopUpPage()
  await topUpPage.fiatConfirmBtn.waitForDisplayed()
  await topUpPage.fiatConfirmBtn.click()
  await topUpPage.waitForLoading()

});
When(/^I copy the NUBAN account number$/, async function () {
  const topAccountPage = new TopUpAccountPage()
  await topAccountPage.fiatNubanCpyBtn.click()

  if(await topAccountPage.dismissPushRequestBtn.isDisplayed()){
    // dismiss push notification permission nudge request
    await topAccountPage.dismissPushRequestBtn.click()
  }
  await topAccountPage.scrollDown()
  await topAccountPage.madePaymentBtn.click()
  await topAccountPage.waitForLoading()

  const doneBtn = topAccountPage.doneBtn
  await doneBtn.waitForDisplayed()
  await doneBtn.click()
});
Then(/^the copied account number should be available on device clipboard$/, async function () {
  const accountNumber = await driver.getClipboard()
  expect(accountNumber.length).toBeGreaterThan(0)
});