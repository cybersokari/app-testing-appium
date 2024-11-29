import {Page} from '../page.ts'

export class HomePage extends Page {
  public depositBtn = this.$('home-options-Deposit')
  public swapBtn = this.$('home-options-Swap')
  public usdCBtn = this.$('asset-USDC')
  public usdTBtn = this.$('asset-USDT')
}
