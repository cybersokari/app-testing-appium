import {Page} from '../../page.ts'

export class SendCryptoConfirmationPage extends Page {
  public confirmTransactionBtn = this.$('confirm-crypto-send-btn')
  public amountText = this.$('confirm-crypto-amount-text')
  public notesText = this.$('confirm-crypto-notes-text')
}
