import {Page} from '../page.ts'

class WalletHomePage extends Page {
  get sendBtn() { return this.$('wallet-send-btn') }
  get receiveBtn() { return this.$('wallet-receive-btn') }
  get usdtAssetModalBtn() { return this.$('asset-USDT') }
  get ngnAssetModalBtn() { return this.$('asset-NGN') }
  get swapBtn() {
    return this.$('wallet-swap-btn')
  }
}
export default new WalletHomePage()