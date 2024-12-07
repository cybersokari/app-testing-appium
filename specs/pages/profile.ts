import {Page} from './page.ts'

class ProfilePage extends Page {
  get logoutBtn(){return this.$('logout-btn')}
  get profileMenuBtn() {return this.$('accounts-profile-menu')}

  get identityMenuBtn(){return this.$('accounts-identity-menu')}

  get paymentMethodMenuBtn (){return this.$('accounts-payment-method-menu')}

  public hideBalanceToggle = this.$('accounts-hide-balance-toggle')

  get securityMenuBtn (){return this.$('accounts-security-menu')}
  get notificationToggle () {return this.$('accounts-notifications-toggle')}

  public async enablePushNotification() {
    const toggle = this.notificationToggle
    let value = await (this.isIOS ? toggle.getValue() : toggle.getAttribute('checked'))
    const isDisabled = value === '0' || value === 'false'
    if (isDisabled) {
      await toggle.click()
      await this.handleNativeNotificationPermissionRequest(true)
    }
  }
  public async disablePushNotification() {
    const toggle = this.notificationToggle
    const value = await toggle.getValue()
    const isEnabled = value === '1' || value === 'true'
    if (isEnabled) {
      await toggle.click()
    }
  }
}
export default new ProfilePage()
