import {Page} from '../../page.ts'

class TopUpAccountPage extends Page {
  get madePaymentBtn() { return this.$('fiat-made-payment-btn') }
  get cancelPaymentBtn() { return this.$('fiat-cancel-payment-btn') }
  get fiatNubanCpyBtn() { return this.$('fiat-nuban-copy-btn') }
  get doneBtn() { return this.$('fiat-done-btn') }
  get viewDetailsBtn() { return this.$('fiat-view-details-btn') }
  get dismissPushRequestBtn() { return this.$('dismiss-push-btn') }
}
export default new TopUpAccountPage()
