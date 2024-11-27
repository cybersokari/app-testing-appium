import {ChainablePromiseElement} from 'webdriverio'
import {browser} from '@wdio/globals'
import {promisify} from 'node:util'
const exec = promisify(require('child_process').exec)

export function getFirstInputFromCurrentScreen(): ChainablePromiseElement {
  return browser.$(browser.isAndroid ? 'android.widget.EditText' : 'XCUIElementTypeTextField')
}

interface CopyDirOptions {
  from: string
  to: string
  filesOnly?: boolean
}

export async function copyDirToDir({to, from, filesOnly = false}: CopyDirOptions) {
  const source = filesOnly ? `${from}/.` : `${from}`
  return await exec(`cp -r ${source} ${to}`)
}

export enum PLATFORM {
  IOS,
  ANDROID,
}
