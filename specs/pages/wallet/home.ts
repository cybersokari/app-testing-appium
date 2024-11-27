import {Page} from '../page.ts'

export class WalletHomePage extends Page {
  public sendBtn = this.$('wallet-send-btn')
  public receiveBtn = this.$('wallet-receive-btn')
  public swapBtn() {
    return this.$('wallet-swap-btn')
  }
  public usdtAssetModalBtn = this.$('asset-USDT')
  public ngnAssetModalBtn = this.$('asset-NGN')
}
