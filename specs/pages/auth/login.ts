import {Page} from '../page.ts'
import {NotificationPermissionPage} from '../notification-permission.ts'
import {Navigation} from '../navigation.ts'
export class LoginPage extends Page {
  public emailInput = this.$('login-email-field')

  public passwordInput = this.$('login-password-field')

  public continueButton = this.$('login-continue-bt')

  private async login(
    data: {acceptPushNotification: boolean} = {acceptPushNotification: false},
  ): Promise<void> {
    if (this.isIOS) {
      await this.closeIOSKeyboard()
    }
    await this.continueButton.click()
    await this.waitForLoading()
    if (data.acceptPushNotification) {
      await new NotificationPermissionPage().acceptRequest()
    } else {
      await new NotificationPermissionPage().dismissRequest()
    }
    await new Navigation().homeBtn.waitForDisplayed()
    await this.waitForLoading()
  }

  public async loginWithDefaultUser() {
    await this.emailInput.setValue(process.env.FINNA_USER_EMAIL!)
    await this.passwordInput.setValue(process.env.FINNA_USER_PASSWORD!)
    await this.login()
  }
}
