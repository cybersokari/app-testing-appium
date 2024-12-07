#!/bin/bash
# Get only the IP:PORT entries from adb devices output
# Filter out empty lines and the "List of devices attached" header
# Only keep entries that match IP:PORT pattern
DEVICES=$(adb devices | grep -E "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+" | cut -f 1)

# Replace newlines with commas and remove trailing comma if exists
ANDROID_DEVICES=$(echo "$DEVICES" | tr '\n' ',' | sed 's/,$//')

# Export the variable if we found any devices
if [ ! -z "$ANDROID_DEVICES" ]; then
    export ANDROID_DEVICES
    echo "Exported ANDROID_DEVICES=$ANDROID_DEVICES"
else
    echo "No Android devices with IP addresses found"
fi

docker-compose up --build
