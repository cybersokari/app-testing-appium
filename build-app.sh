#!/bin/bash
ARCHIVE_PATH=../../appium/build/ios
pushd ../finna-mobile-app/ios || exit
xcodebuild archive -workspace Finna.xcworkspace -scheme FinnaStg -archivePath $ARCHIVE_PATH -destination "generic/platform=iOS Simulator"
popd || exit