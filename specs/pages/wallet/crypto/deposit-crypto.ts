import {Page} from '../../page.ts'

class DepositCryptoPage extends Page {
  get addressCopyBtn() { return this.$('deposit-crypto-address-copy-btn') }
  get addressShareBtn() { return this.$('deposit-crypto-address-share-btn') }
  get networkSelectBtn() { return this.$('deposit-crypto-network-select') }
  get networkTRXBtn() { return this.$('deposit-crypto-network-TRX') }
  get networkBSCBtn() { return this.$('deposit-crypto-network-BSC') }
  get dismissPushRequestBtn() { return this.$('dismiss-push-btn') }
}
export default new DepositCryptoPage()
