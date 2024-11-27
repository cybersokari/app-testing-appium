import {Page} from '../page.ts'

export class LoanHomePage extends Page{
  public applyNowBtn = this.$('apply-loan-btn')
  public latestLoanView = this.$('latest-active-loan-view')
}