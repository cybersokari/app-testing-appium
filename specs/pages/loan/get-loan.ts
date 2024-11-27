import {Page} from '../page.ts'

export class GetLoanPage extends Page{
    public amountToBorrowInput = this.$('loan-amount-input')
    public loanSummaryView = this.$('get-loan-summary')
    public loanContinueBtn = this.$('loan-continue-btn')

}