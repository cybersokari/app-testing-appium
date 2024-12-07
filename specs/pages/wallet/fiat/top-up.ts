import {Page} from '../../page.ts'

class TopUpPage extends Page {
  get fiatInput() { return this.$('fiat-topup-input') }
  get fiatContinueBtn() { return this.$('fiat-continue-btn') }
  get fiatConfirmBtn() { return this.$('fiat-confirm-btn') }
}
export default new TopUpPage()
