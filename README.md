# Finna Mobile App E2E Testing Guide

## Environment Setup
Note: All commands must be run from the [appium](.) directory

1. Copy `.env.example` to create either:
    - `.env.ios` for iOS testing
    - `.env.android` for Android testing
    - or both if testing both platforms

## Running Tests with Docker Appium Host (Recommended)
Using this method enables you to skip the [Appium setup](https://webdriver.io/docs/appium/) process

### Requirements
- Android device running OS 11 or newer
- Android APK file
- [Mailosaur](https://mailosaur.com/) account credentials. Required for successful user signup test cases

### Environment Configuration
1. In `.env.android`, set:
    - `APK_PATH`: Absolute path of your Android APK file
    - `MAILOSAUR_ID`: Your Mailosaur server ID
    - `MAILOSAUR_KEY`: Your Mailosaur API key

### Setting Up Android Tools
If you don't have Android Studio installed, you'll need Android SDK platform tools:
- Download from [Android's official website](https://developer.android.com/tools/releases/platform-tools)
- Or install via Homebrew: `brew install android-platform-tools`

### Connect Device and Run Test

1. Connect Android Device
    - Enable wireless debugging on your Android device
    - Connect device via Wi-Fi following [Android's wireless setup guide](https://developer.android.com/tools/adb#wireless-android11-command-line)
    - Verify connection by running: `adb devices`

2. Start Docker Container
    - Run `./docker-start.sh` on MAC/Linux or `./docker_start.ps1` on Windows to build and start the docker container
    - Verify container is running: `docker ps` (look for `appium-android`)

3. Run `docker exec -it appium-android adb devices` to verify that connected devices on host machine 
is also connected to the docker container.

4. Run Android tests cases on connected device.
   ```shell
   npm run android
   ```

## Viewing Test Reports
Reports are autogenerate after every test run.
- Local access: Run `npm run android-report` or `npm run ios-report` to view in local web browser
- [Remote Android Report](https://android-test-report.web.app/#)
- [Remote iOS Report](https://ios-test-report.web.app/#)

## Running Tests with Appium on local machine (Android/iOS)
(Section to be completed)