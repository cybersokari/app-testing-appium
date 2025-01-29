import {Page} from './page.ts'
import {$} from '@wdio/globals'

export class NotificationPermissionPage extends Page {
  private enableNotificationsBtn = $('~Enable notifications')

  private notNowBtn = $('~Not Now')

  public async acceptRequest() {
    if(await this.enableNotificationsBtn.isDisplayed()) {
      await this.enableNotificationsBtn.click()
      await this.handleNativeNotificationPermissionRequest(true)
    }
  }
  public async dismissRequest() {
    if(await this.notNowBtn.isDisplayed()) {
      await this.notNowBtn.click()
    }
  }
}
