import {Page} from '../page.ts'

export class SetupPinPage extends Page {
  public setupPinNextBtn = this.$('setup-pin-next-btn')
  public enterPinContinueBtn = this.$('enter-pin-continue-btn')
  public confirmPinFinishBtn = this.$('confirm-pin-finish-btn')
  public closeDialogBtn = this.$('dialog-primary-btn')
  public enterPinInput = this.$('enter-pin-input')
  public confirmPinInput = this.$('confirm-pin-input')
}
