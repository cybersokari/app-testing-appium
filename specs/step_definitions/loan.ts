import {Given, Then, When} from "@wdio/cucumber-framework";
import {Navigation} from "../pages/navigation.ts";
import {LoanHomePage} from "../pages/loan/home.ts";
import {GetLoanPage} from "../pages/loan/get-loan.ts";
import {browser} from "@wdio/globals";
import {AcceptLoanPage} from "../pages/loan/accept-loan.ts";
import {LoanPinPage} from "../pages/loan/transaction-pin.ts";
import {LoanInfoPage} from "../pages/loan/loan.ts";
import {RepayLoanPage} from "../pages/loan/repay-loan.ts";

async function reviewUpdatedLoanInfo() {
    const loanPainPage = new LoanPinPage()
    const approvedLoanDetailsBtn = loanPainPage.approvedLoanDetailsBtn
    const closeLoanDetailsBtn = loanPainPage.closeLoanDetailsBtn
    const approveLoanDoneBtn = loanPainPage.approveLoanDoneBtn

    await approvedLoanDetailsBtn.waitForDisplayed()
    await approvedLoanDetailsBtn.click()

    await closeLoanDetailsBtn.waitForDisplayed()
    await closeLoanDetailsBtn.click()

    await approveLoanDoneBtn.waitForDisplayed()
    await approveLoanDoneBtn.click()
}

Given(/^I am on loan section$/, async function () {
    await new Navigation().openLoanTab()
    const loanHomePage = new LoanHomePage()
    if (browser.isIOS) {
        await loanHomePage.waitForLoading()
    } else {
        await loanHomePage.delay(3000)
    }
    // await loanHomePage.applyNowBtn.waitForDisplayed()
});
When(/^I apply for a loan of (.*)$/, async function (amount: number) {
    const loanHomePage = new LoanHomePage()
    const applyLoanBtn = loanHomePage.applyNowBtn
    await applyLoanBtn.click()
    const getLoanPage = new GetLoanPage()
    const loanAmountInput = getLoanPage.amountToBorrowInput
    await loanAmountInput.waitForDisplayed()
    await loanAmountInput.setValue(amount)
    // Close iOS Number Keyboard
    if (browser.isIOS && (await browser.isKeyboardShown())) {
        await loanHomePage.closeIOSKeyboard()
    }
    await getLoanPage.loanSummaryView.waitForDisplayed()
    const loanContinueBtn = getLoanPage.loanContinueBtn
    await loanContinueBtn.waitForEnabled()
    await loanContinueBtn.click()

    // Accept loan screen
    const acceptLoanPage = new AcceptLoanPage()
    const acceptLoanCheckbox = acceptLoanPage.acceptLoanCheckbox
    await acceptLoanCheckbox.waitForDisplayed()
    await acceptLoanCheckbox.click()
    const acceptLoanBtn = acceptLoanPage.acceptLoanBtn
    await acceptLoanBtn.waitForEnabled()
    await acceptLoanBtn.click()
});

When(/^I enter a valid transaction pin for the loan$/, async function () {
    // Enter pin screen
    const loanPinPage = new LoanPinPage()
    await loanPinPage.getFirstInputFieldFromPage().setValue(1234)
    if (browser.isIOS) {
        // Click outside to close iOS number keyboard
        await loanPinPage.tapXYPositionOnIOS(200, 200)
    }
    const pinContinueBtn = loanPinPage.pinContinueBtn
    await loanPinPage.delay(1000)
    await pinContinueBtn.click()
    await loanPinPage.delay(1000)
    await pinContinueBtn.click()
});

Then(/^loan should be approved$/,{wrapperOptions: {}}, async function () {
    await reviewUpdatedLoanInfo()
});

When(/^I repay the latest loan in full$/, async function () {
    const loanHomePage = new LoanHomePage()
    const latestLoan = loanHomePage.latestLoanView
    await latestLoan.waitForDisplayed({timeout: 20000, interval: 2000})
    await latestLoan.click()
    // Repay loan screen
    const loanInfoPage = new LoanInfoPage()
    const repayLoanBtn = loanInfoPage.repayLoanBtn
    await repayLoanBtn.waitForDisplayed()
    await repayLoanBtn.click()

    // Amount to repay screen
    const amountToRepayActionBtn = new RepayLoanPage().continueBtn
    await loanInfoPage.delay(2000)
    await amountToRepayActionBtn.click()
});
Then(/^loan repayment should be approved$/, async function () {
    await reviewUpdatedLoanInfo()
});
