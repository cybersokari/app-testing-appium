import {Page} from "../../page.ts";

export class SwapAmountPage extends Page{
    public currencyToggleBtn = this.$('swap-currency-toggle-btn')
    public swapDirectionToggle = this.$('swap-direction-toggle')
    public availableBalanceTxt(currency: string){
        return this.$(`${currency}-available-balance-btn`)
    }
    public continueBtn = this.$('swap-continue-btn')
    public maxBtn = this.$('max-txt-btn')
}