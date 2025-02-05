import {Page} from '../page.ts'
import {NotificationPermissionPage} from '../notification-permission.ts'
import {Navigation} from '../navigation.ts'
export class LoginPage extends Page {
  public emailInput = this.$('login-email-field')

  public passwordInput = this.$('login-password-field')

  public continueButton = this.$('login-continue-bt')

  private async login(acceptPushNotification = false,
  ): Promise<void> {
    if (this.isIOS) {
      await this.closeIOSKeyboard()
    }
    await this.continueButton.click()
    await this.waitForLoading()
    if (acceptPushNotification) {
      await new NotificationPermissionPage().acceptRequest()
    } else {
      await new NotificationPermissionPage().dismissRequest()
    }
    await new Navigation().homeBtn.waitForDisplayed()
    await this.waitForLoading()
  }

  public async loginWithDefaultUser() {
    const email = process.env.FINNA_USER_EMAIL!
    for (const char of email) {
      // add one at a time to avoid https://github.com/webdriverio/webdriverio/issues/11577
      await this.emailInput.addValue(char)
    }
    await this.passwordInput.setValue(process.env.FINNA_USER_PASSWORD!)
    await this.login()
  }
}
