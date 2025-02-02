#!/bin/bash
# This builds the Finna Android apk from the finna-mobile-app project directory, which must be
# in the same parent directory as this project in other for this script to work
BUILD_DIR=../finna-mobile-app/android/app/build/outputs/apk/stg/release/app-stg-release.apk
pushd ../finna-mobile-app/android || exit
rm -r ./app/build
./gradlew bundleStgRelease
popd || exit
mkdir -p "build/android" && cp $BUILD_DIR build/android/finna.apk