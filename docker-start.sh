#!/bin/bash
## This script exports the APK_PATH in .env file and runs
## the docker-compose.yaml file

# Function to display error messages
error_message() {
    echo "Error: $1" >&2
    exit 1
}

# Function to display usage information
usage() {
    echo "Usage: $0 [source_env_file]"
    echo "If no argument provided, defaults to .env as source"
    echo "Script will export APK_PATH variable from the env file"
    exit 1
}

# Set source env file
SOURCE_ENV="${1:-.env.android}"

# Show help if requested
if [ "$1" = "--help" ]; then
    usage
fi

# Check if source file exists
if [ ! -f "$SOURCE_ENV" ]; then
    error_message "Source file $SOURCE_ENV does not exist"
fi

# Find and export APK_PATH
APK_PATH_LINE=$(grep -E "^APK_PATH=" "$SOURCE_ENV")

if [ -z "$APK_PATH_LINE" ]; then
    error_message "APK_PATH variable not found in $SOURCE_ENV"
fi

# Remove leading/trailing whitespace and export
APK_PATH=$(echo "$APK_PATH_LINE" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
# Android apk file path
export "$APK_PATH"

echo "APK_PATH exported successfully!"
echo "Value: $APK_PATH"


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
