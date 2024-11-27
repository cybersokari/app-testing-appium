import {Page} from './page.ts'

export class WelcomePage extends Page {
  public loginBtn = this.$('walkthrough-login-bt')
  public getStartedBtn = this.$('walkthrough-get-started-bt')
}
