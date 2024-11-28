#!/bin/bash
# This builds the Finna iOS app from the finna-mobile-app project directory, which must be
# in the same parent directory as this project in other for this script to work
ARCHIVE_PATH=../../appium/build/ios
pushd ../finna-mobile-app/ios || exit
xcodebuild archive -workspace Finna.xcworkspace -scheme FinnaStg -archivePath $ARCHIVE_PATH -destination "generic/platform=iOS Simulator"
popd || exit