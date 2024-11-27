import {Page} from '../page.ts'

export class AcceptLoanPage extends Page {
    public acceptLoanCheckbox = this.$('accept-loan-check')
    public acceptLoanBtn = this.$('accept-loan-btn')
}