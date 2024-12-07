import {Page} from './page.ts'

class WelcomePage extends Page {
  get loginBtn(){return this.$('walkthrough-login-bt')}
  get getStartedBtn() {return  this.$('walkthrough-get-started-bt')}
}
export default new WelcomePage()

