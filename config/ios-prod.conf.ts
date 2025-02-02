import {config as iOSConfig} from "./ios.conf";

iOSConfig.cucumberOpts!.tags = '@prod'
export const config: WebdriverIO.Config = iOSConfig