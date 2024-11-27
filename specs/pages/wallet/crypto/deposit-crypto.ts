import {Page} from '../../page.ts'

export class DepositCryptoPage extends Page {
  public addressCopyBtn = this.$('deposit-crypto-address-copy-btn')
  public addressShareBtn = this.$('deposit-crypto-address-share-btn')
  public networkSelectBtn = this.$('deposit-crypto-network-select')
  public networkTRXBtn = this.$('deposit-crypto-network-TRX')
  public networkBSCBtn = this.$('deposit-crypto-network-BSC')
  public dismissPushRequestBtn = this.$('dismiss-push-btn')
}
