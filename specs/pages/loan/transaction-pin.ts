import {Page} from '../page.ts'

export class LoanPinPage extends Page {
  public pinContinueBtn = this.$('loan-pin-btn')
  public approvedLoanDetailsBtn = this.$('open-approved-loan-details-btn')
  public closeLoanDetailsBtn = this.$('close-approved-loan-details-btn')
  public approveLoanDoneBtn = this.$('approved-loan-done-btn')
}
