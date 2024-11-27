import {Page} from '../../page.ts'

export class TopUpPage extends Page {
  public fiatInput = this.$('fiat-topup-input')
  public fiatContinueBtn = this.$('fiat-continue-btn')
  public fiatConfirmBtn = this.$('fiat-confirm-btn')
}
