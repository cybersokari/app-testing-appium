class DefaultUser {
    constructor(email: string, password: string, transactionPin: string) {
        this.email = email
        this.password = password
        this.transactionPin = transactionPin
    }
  public email : string
  public password: string
  public transactionPin: string
}
export const defaultUser = new DefaultUser('kparobo@finnaprotocol.io', 'Password1#', '1234')

export const IOS_REPORTS_DIR = './reports/ios'
export const ANDROID_REPORTS_DIR = './reports/android'