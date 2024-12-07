import ADB from "appium-adb";

class AdbHelper {
    private _adb: ADB | null = null
    public static instance: AdbHelper

    public static getInstance(){
        if(!AdbHelper.instance){
            AdbHelper.instance = new AdbHelper()
        }
        return AdbHelper.instance
    }

    get adb() {
        if(!this._adb){
            throw new Error('ADB not connected, call connect()')
        }
        return this._adb
    }
    public async connect(){
        if(this._adb) return
        this._adb = await ADB.createADB()
    }
    public async disconnect(){
        await this._adb?.killServer()
        this._adb = null
    }
}
export default AdbHelper.getInstance()