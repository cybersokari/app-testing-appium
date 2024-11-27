import {Page} from '../page.ts'

export class SignupPage extends Page {
  public emailInput = this.$('signup-email-field')
  public passwordInput = this.$('signup-password-field')
  public continueBtn = this.$('signup-continue-bt')
}
