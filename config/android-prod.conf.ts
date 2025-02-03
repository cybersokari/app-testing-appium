import {config as androidConfig} from "./android.conf";

androidConfig.cucumberOpts!.tags = '@prod'
export const config: WebdriverIO.Config = androidConfig