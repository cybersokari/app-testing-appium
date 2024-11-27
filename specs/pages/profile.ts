import {Page} from './page.ts'

export class ProfilePage extends Page {
  public logoutBtn = this.$('logout-btn')
  public profileMenuBtn = this.$('accounts-profile-menu')

  public identityMenuBtn = this.$('accounts-identity-menu')

  public paymentMethodMenuBtn = this.$('accounts-payment-method-menu')

  public hideBalanceToggle = this.$('accounts-hide-balance-toggle')

  public securityMenuBtn = this.$('accounts-security-menu')
  public notificationToggle = this.$('accounts-notifications-toggle')

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
