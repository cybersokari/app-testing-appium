import {Page} from '../page.ts'

export class BiometricsPage extends Page {
  public notNowBtn = this.$('biometrics-skip-btn')
  public closeDialogBtn = this.$('dialog-primary-btn')
}
