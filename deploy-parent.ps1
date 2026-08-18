#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Deploy Firebase Parent Project (PowerShell)
.DESCRIPTION
    Wrapper script for Node.js-based Firebase deployment
.PARAMETER ProjectName
    Name of the project to deploy
.EXAMPLE
    .\deploy-parent.ps1 -ProjectName Amenosa
    .\deploy-parent.ps1 Amenosa
#>

param(
    [Parameter(Position = 0, Mandatory = $true)]
    [string]$ProjectName
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Check if fnm is available and switch to Node 22
if (Get-Command fnm -ErrorAction SilentlyContinue) {
    fnm use 22
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to switch to Node 22"
        exit 1
    }
} else {
    Write-Host "ERROR: fnm not found. Please install fnm or Node.js version manager."
    exit 1
}

# Run Node.js deploy script
node "$ScriptDir/deploy-parent.js" $ProjectName

exit $LASTEXITCODE
