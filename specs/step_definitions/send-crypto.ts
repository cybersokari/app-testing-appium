import {When} from "@wdio/cucumber-framework";
import {Navigation} from "../pages/navigation.ts";
import {WalletHomePage} from "../pages/wallet/home.ts";
import {SendCryptoPage} from "../pages/wallet/crypto/send-crypto.ts";
import {SendCryptoConfirmationPage} from "../pages/wallet/crypto/confirmation.ts";
import {$, driver} from "@wdio/globals";
import {Page} from "../pages/page.ts";
import {getFirstInputFromCurrentScreen} from "../util/util.ts";
import {page} from "./hooks.ts";

When(/^I navigate to the wallet section$/, async function () {
    await new Navigation().openWalletTab()
});
When(/^I click on the wallet's page send button$/, async function () {
    await new WalletHomePage().sendBtn.click()
});
When(/^I select USDT as the asset$/, async function () {
    const assetBtn = new WalletHomePage().usdtAssetModalBtn
    await assetBtn.waitForDisplayed()
    await assetBtn.click()
});
When(/^I confirm the transaction details$/, async function () {
    const confirmCryptoSendBt = new SendCryptoConfirmationPage().confirmTransactionBtn
    await confirmCryptoSendBt.waitForDisplayed()
    await confirmCryptoSendBt.click()
});
When(/^I enter (.*) as amount (.*) as address and (.*) as message$/, async function (amount: number, walletAddress: string, message: string) {
    const sendCryptoPage = new SendCryptoPage()
    const sendCryptoAmountInput = sendCryptoPage.amountInputField
    await sendCryptoAmountInput.waitForDisplayed()
    await sendCryptoAmountInput.setValue(amount)
    await sendCryptoPage.addressInputField.setValue(walletAddress)
    await sendCryptoPage.msgInputField.setValue(message)
    if (sendCryptoPage.isIOS) {
        //wait for keyboard close
        await sendCryptoPage.closeIOSKeyboard()
    }
    await sendCryptoPage.continueBtn.doubleClick()
});
When(/^I click on (.*) button$/, async function (buttonText: string) {
    const button = page.$(buttonText)
    await button.waitForDisplayed()
    await button.click()
});
When(/^I enter a valid transaction pin and click (.*) button$/, async function (buttonLabel: string) {
    const firstInputOnPage = getFirstInputFromCurrentScreen()
    await firstInputOnPage.waitForDisplayed()
    await firstInputOnPage.setValue('1234')
    if(driver.isIOS)(
        // Tap top of the screen to close keyboard
        await new Page().tapXYPositionOnIOS(0, 100)
    )
    const button = page.$(buttonLabel)
    if(await button.isExisting()) {
        await button.click()
    } else if (driver.isAndroid) {
        await $(`~${buttonLabel}`).click()
    }
});
When(/^I click (.*) button and wait for loading to finish$/, async function (buttonLabel: string) {
    await page.$(buttonLabel).click()
    await page.waitForLoading()
});