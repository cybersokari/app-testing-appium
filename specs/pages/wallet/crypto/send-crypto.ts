import {Page} from '../../page.ts'

export class SendCryptoPage extends Page {
  public amountInputField = this.$('send-crypto-amount-input')
  public addressInputField = this.$('send-crypto-address-input')
  public msgInputField = this.$('send-crypto-msg-input')
  public continueBtn = this.$('send-crypto-continue-btn')
}
