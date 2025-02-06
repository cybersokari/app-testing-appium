import {ChainablePromiseElement} from 'webdriverio'
import {$, $$, driver} from '@wdio/globals'
import {extractNumberFromText} from "../util/util.ts";

export class Page {
  public isAndroid: boolean
  public isIOS: boolean
  public constructor() {
    this.isAndroid = driver.isAndroid
    this.isIOS = driver.isIOS
  }
  public $(resourceId: string) {
    return driver.isAndroid ? $(`//*[@resource-id="${resourceId}"]`) : $(`~${resourceId}`)
  }
  public androidSelector(resourceId: string): ChainablePromiseElement {
    return $(`//*[@resource-id="${resourceId}"]`)
  }
  public XCUIElementTypeButton(name: string): ChainablePromiseElement {
    return $(`//XCUIElementTypeButton[@name="${name}"]`)
  }
  public async androidScrollTextToView(
    text: string,
    duration = 300,
  ): Promise<ChainablePromiseElement> {
    const element = $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`,
    )
    await this.delay(duration)
    return element
  }
  public getFirstInputFieldFromPage(): ChainablePromiseElement {
    return $(this.isAndroid ? 'android.widget.EditText' : 'XCUIElementTypeTextField')
  }
  public getInputFieldsFromPage() {
    return $$(this.isAndroid ? 'android.widget.EditText' : 'XCUIElementTypeTextField')
  }

  protected async handleNativeNotificationPermissionRequest(accept: boolean = true) {
    if (this.isAndroid) {
      await driver.execute(accept ? 'mobile:acceptAlert' : 'mobile:dismissAlert')
    } else {
      const args = {
        action: accept ? 'accept' : 'dismiss',
        buttonLabel: accept ? 'Allow' : "Don't Allow",
      }
      await driver.execute('mobile:alert', args)
    }
  }
  public async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Wait for an element's value to change from its initial value
   * @param element
   * @param {string} initialValue - Initial value to wait to change from
   * @param {number} timeout - Maximum time to wait in milliseconds
   * @returns {Promise<boolean>} - Returns true if value changed, false if timeout reached
   */
  public async waitForValueChange(
    element: ChainablePromiseElement,
    initialValue: string,
    timeout: number = 10000,
  ): Promise<boolean> {
    try {
      // Wait for element to exist first
      await element.waitForExist({timeout})

      // Wait for value to change from initial value
      await driver.waitUntil(
        async () => {
          const currentValue = await element.getValue()
          return currentValue !== initialValue
        },
        {
          timeout,
          timeoutMsg: `Expected element ${element} value to change from "${initialValue}" within ${timeout}ms`,
          interval: 500, // Check every 500ms
        },
      )
      return true
    } catch (error: any) {
      console.error(`Error waiting for value change: ${error.message}`)
      return false
    }
  }

  public async getNumberElement(element: ChainablePromiseElement): Promise<number> {
    if(driver.isIOS){
      return extractNumberFromText(await element.getValue())
    }else {
      return extractNumberFromText(await element.getText())
    }
  }

  public async closeIOSKeyboard() {
    const doneBtn = this.XCUIElementTypeButton('Done')
    const nextBtn = this.XCUIElementTypeButton('Next:')
    const returnBtn = this.XCUIElementTypeButton('Return')
    if (await returnBtn.isDisplayed()) {
      await returnBtn.click()
    } else if (await nextBtn.isDisplayed()) {
      await nextBtn.click()
    } else if (await doneBtn.isDisplayed()) {
      await doneBtn.click()
    }
    await this.delay(500)}

  public async getToastStatus(): Promise<ToastStatus> {
    const resultToastTitle = this.$('toastText1')
    await resultToastTitle.waitForDisplayed()
    const resultStatus = await resultToastTitle.getText()
    if (resultStatus === 'SUCCESS') {
      return ToastStatus.SUCCESS
    }
    return ToastStatus.ERROR
  }

  public async getToastMessage(): Promise<string> {
    const resultToastMsg = this.$('toastText2')
    await resultToastMsg.waitForDisplayed()
    return await resultToastMsg.getText()
  }
  get progressIndicator(){return driver
      .$(this.isIOS ? 'XCUIElementTypeActivityIndicator' : 'android.widget.ProgressBar')}

    public async waitForLoading(timeOut = 20000) {
        try {
            await this.progressIndicator.waitForDisplayed({interval: 100, timeout: 2000}) // Wait for the indicator to be visible
            await this.progressIndicator.waitForDisplayed({timeout: timeOut, reverse: true}) // Wait for the indicator to be invisible
        }catch (e) {
            console.log(`Progress indicator not found: ${e}`)
        }
    }

  public async tapXYPositionOnIOS(x: number, y: number) {
    if(!driver.isIOS) return
    await driver.execute('mobile: tap', {x: x, y: y})
  }

  public async iOSScrollDown() {
    await driver.execute('mobile: scroll', {direction: 'down'})
  }

  public async iOSScrollUp() {
    await driver.execute('mobile: scroll', {direction: 'up'})
  }
  public async androidScrollDown(scrollDuration = 300) {
    const startPercentage = 90
    const endPercentage = 10
    const anchorPercentage = 50

    const {width, height} = await driver.getWindowSize()
    const density = (await driver.getDisplayDensity()) / 100
    const anchor = (width * anchorPercentage) / 100
    const startPoint = (height * startPercentage) / 100
    const endPoint = (height * endPercentage) / 100

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: {pointerType: 'touch'},
        actions: [
          {type: 'pointerMove', duration: 0, x: anchor, y: startPoint},
          {type: 'pointerDown', button: 0},
          {type: 'pause', duration: 100},
          {
            type: 'pointerMove',
            duration: scrollDuration,
            origin: 'pointer',
            x: 0,
            y: -endPoint * density,
          },
          {type: 'pointerUp', button: 0},
          {type: 'pause', duration: scrollDuration},
        ],
      },
    ])
  }
  public async scrollDown() {
    if (driver.isIOS) {
      await this.iOSScrollDown()
    } else {
      await this.androidScrollDown()
    }
  }
}
export enum ToastStatus {
  ERROR,
  SUCCESS,
}
