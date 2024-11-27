import {Page} from '../page.ts'

export class HomePage extends Page {
  public depositBtn = this.$('home-options-Deposit')
  public usdCBtn = this.$('asset-USDC')
  public usdTBtn = this.$('asset-USDT')
}
