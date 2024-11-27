import {Page} from './page.ts'
import {driver} from '@wdio/globals'

export class Navigation extends Page {
  public homeBtn = driver.isAndroid
    ? this.androidSelector('home-tab-btn')
    : this.XCUIElementTypeButton('Home, tab, 1 of 4')

  public profileBtn = driver.isAndroid
    ? this.androidSelector('profile-tab-btn')
    : this.XCUIElementTypeButton('ProfileStack, tab, 4 of 4')

  public walletBtn = driver.isAndroid
    ? this.androidSelector('wallet-tab-btn')
    : this.XCUIElementTypeButton('WalletStack, tab, 2 of 4')

  public loanBtn = driver.isAndroid
    ? this.androidSelector('loan-tab-btn')
    : this.XCUIElementTypeButton('LoanStack, tab, 3 of 4')

  public async openWalletTab() {
    await this.walletBtn.click()
    await this.waitForLoading()
  }
  public async openLoanTab(waitMs: number = 3000) {
    await this.loanBtn.click()
    await this.delay(waitMs)
  }
  public async openProfileTab(waitMs: number = 1000) {
    await this.profileBtn.click()
    await this.delay(waitMs)
  }
  public async openHomeTab(waitMs: number = 3000) {
    await this.homeBtn.click()
    await this.delay(waitMs)
  }
}
