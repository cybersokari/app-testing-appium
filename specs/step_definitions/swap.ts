import {Given, Then, When} from "@wdio/cucumber-framework";
import {page} from "./hooks.ts";
import {getFirstInputFromCurrentScreen} from "../util/util.ts";
import {SwapPreviewPage} from "../pages/wallet/swap/swap-preview.ts";
import {SwapAmountPage} from "../pages/wallet/swap/swap-amount.ts";
import HomePage from "../pages/home/home.ts";
import {expect} from 'chai'

Given(/^I initiate a (.*) swap$/, async function (token: string) {
    const homePage = HomePage
    await homePage.swapBtn.waitForDisplayed()
    await homePage.swapBtn.click()
    const tokenBtn = page.$(`asset-${token}`)
    await tokenBtn.waitForDisplayed()
    await tokenBtn.click()
    this.swapToken = token
    await page.waitForLoading()
});
Given(/^I enter an amount greater than my current balance$/, async function () {
    const swapAmountPage = new SwapAmountPage()
    const availableBalance = await swapAmountPage.getBalance(this.swapToken)
    await getFirstInputFromCurrentScreen().setValue(availableBalance + 0.001)
    await page.delay(5000)
    await swapAmountPage.continueBtn.click()
});
Given(/^my available (.*) balance is not below (.*)$/, async function (token: string, amount: string) {
    const swapAmountPage = new SwapAmountPage()
    const balance = await swapAmountPage.getBalance(token)
    expect(balance).to.be.greaterThanOrEqual(parseFloat(amount))
});
When(/^I enter (.*) as amount to swap$/, async function (amount: number) {
    await getFirstInputFromCurrentScreen().setValue(amount)
    await page.delay(5000)
});
Then(/^I should be able to complete the swap$/, async function () {
    await new SwapAmountPage().continueBtn.click()
    const swapPreviewPage = new SwapPreviewPage()
    await swapPreviewPage.confirmTransactionBtn.waitForDisplayed()
    await swapPreviewPage.confirmTransactionBtn.click()
    await swapPreviewPage.swapSuccessText.waitForDisplayed()
    await swapPreviewPage.gotoWalletBtn.click()
});
Then(/^I should not see the swap confirmation screen$/, async function () {
    const isDisplayed  =  await new SwapPreviewPage().confirmTransactionBtn.isDisplayed()
    expect(isDisplayed).not.be.true
});