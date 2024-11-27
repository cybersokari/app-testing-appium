import {Page} from '../../page.ts'

export class TopUpAccountPage extends Page {
  public madePaymentBtn = this.$('fiat-made-payment-btn')
  public cancelPaymentBtn = this.$('fiat-cancel-payment-btn')
  public fiatNubanCpyBtn = this.$('fiat-nuban-copy-btn')
  public doneBtn = this.$('fiat-done-btn')
  public viewDetailsBtn = this.$('fiat-view-details-btn')
  public dismissPushRequestBtn = this.$('dismiss-push-btn')
}
