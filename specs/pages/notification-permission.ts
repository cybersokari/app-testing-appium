import {Page} from './page.ts'
import {$} from '@wdio/globals'

export class NotificationPermissionPage extends Page {
  private enableNotificationsBtn = $('~Enable notifications')

  private notNowBtn = $('~Not Now')

  public async acceptRequest() {
    await this.enableNotificationsBtn.click()
    await this.handleNativeNotificationPermissionRequest(true)
  }
  public async dismissRequest() {
    await this.notNowBtn.click()
  }
}
