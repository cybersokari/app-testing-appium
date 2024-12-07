import {Page} from '../page.ts'

class HomePage extends Page {
  get depositBtn (){return this.$('home-options-Deposit')}
  get swapBtn () {return this.$('home-options-Swap')}
  get usdCBtn () {return this.$('asset-USDC')}
  get usdTBtn () {return this.$('asset-USDT')}
}
export default new HomePage()
