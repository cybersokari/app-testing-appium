import {Page} from "../../page.ts";
import {extractNumberFromText} from "../../../util/util.ts";
import {driver} from "@wdio/globals";

export class SwapAmountPage extends Page{
    public currencyToggleBtn = this.$('swap-currency-toggle-btn')
    public swapDirectionToggle = this.$('swap-direction-toggle')
    public availableBalanceTxt(currency: string){
        return this.$(`${currency}-available-balance-btn`)
    }
    public continueBtn = this.$('swap-continue-btn')
    public maxBtn = this.$('max-txt-btn')
    public async getBalance(currency: string) {
        await this.availableBalanceTxt(currency).waitForDisplayed()
        if(driver.isIOS){
            return extractNumberFromText(await this.availableBalanceTxt(currency).getValue())
        }else {
            return extractNumberFromText(await this.availableBalanceTxt(currency).getText())
        }
    }

}