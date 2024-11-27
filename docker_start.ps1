<#
.SYNOPSIS
This script extracts the APK_PATH variable from an environment file and exports it for use. It also fetches Android devices connected via ADB and starts a Docker Compose build.

.DESCRIPTION
- Reads an environment file (default: `.env.android`).
- Extracts and exports `APK_PATH`.
- Detects Android devices connected via ADB with IP:PORT format.
- Runs `docker-compose up --build`.
#>

# Function to display an error message and exit
function Error-Message {
    param (
        [string]$Message
    )
    Write-Error "Error: $Message"
    exit 1
}

# Function to display usage information
function Show-Usage {
    Write-Output "Usage: .\script.ps1 [source_env_file]"
    Write-Output "If no argument is provided, defaults to .env.android."
    exit 1
}

# Parse arguments
param (
[string]$SourceEnv = ".env.android"
)

if ($Args -contains "--help") {
    Show-Usage
}

# Check if the source environment file exists
if (-not (Test-Path -Path $SourceEnv)) {
    Error-Message "Source file $SourceEnv does not exist."
}

# Read the APK_PATH line
$APKPathLine = Get-Content $SourceEnv | Select-String -Pattern "^APK_PATH=" | ForEach-Object { $_.Line }

if (-not $APKPathLine) {
    Error-Message "APK_PATH variable not found in $SourceEnv."
}

# Extract the APK_PATH value
$APKPath = $APKPathLine -replace "^APK_PATH=", "" -replace "^\s+|\s+$", ""

if (-not $APKPath) {
    Error-Message "Failed to extract APK_PATH value."
}

# Export APK_PATH
$env:APK_PATH = $APKPath
Write-Output "APK_PATH exported successfully!"
Write-Output "Value: $APKPath"

# Detect Android devices connected via ADB with IP:PORT format
$Devices = adb devices | Select-String -Pattern "\d+\.\d+\.\d+\.\d+:\d+" | ForEach-Object { ($_ -split "\t")[0] }
$AndroidDevices = ($Devices -join ",").TrimEnd(",")

if (-not [string]::IsNullOrWhiteSpace($AndroidDevices)) {
    $env:ANDROID_DEVICES = $AndroidDevices
    Write-Output "Exported ANDROID_DEVICES=$AndroidDevices"
} else {
    Write-Output "No Android devices with IP addresses found."
}

# Run Docker Compose
docker-compose up --build