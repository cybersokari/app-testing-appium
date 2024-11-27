#!/bin/bash
BUILD_DIR=../finna-mobile-app/android/app/build/outputs/apk/stg/release/app-stg-release.apk
pushd ../finna-mobile-app/android || exit
rm -r ./app/build
./gradlew assembleStgRelease
popd || exit
mkdir -p "build/android" && cp $BUILD_DIR build/android/finna.apk