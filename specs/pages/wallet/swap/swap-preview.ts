import {Page} from "../../page.ts";

export class SwapPreviewPage extends Page{
    public confirmTransactionBtn = this.$('confirm-transaction')
    public swapSuccessText = this.$('swap-success-title')
    public gotoWalletBtn = this.$('swap-preview-got-to-wallet-btn')
}