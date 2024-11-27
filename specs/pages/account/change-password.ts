import {Page} from '../page.ts'

export class ChangePasswordPage extends Page {
  public confirmChangePasswordBtn = this.$('change-password-confirm-btn')

  public currentPasswordInput = this.$('change-password-current-password')

  public newPasswordInput = this.$('change-password-new-password')

  public repeatPasswordInput = this.$('change-password-repeat-password')
}
