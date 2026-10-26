# migrate-vscode-to-e.ps1
# Script to backup and move VS Code user data (extensions and roaming) from C: to E:
# Usage: Run in PowerShell (elevated). The script makes a local backup and creates junctions.

param(
  [switch]$DoRemoveOld = $false
)

function Assert-Admin {
  $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
  if (-not $isAdmin) {
    Write-Host "Script requires Administrator privileges. Re-run in an elevated PowerShell." -ForegroundColor Red
    exit 1
  }
}

Assert-Admin

$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$backupRoot = "E:\VSCode_Backups\VSCodeData_backup_$timestamp"
$destRoot = "E:\VSCodeData"
$destVscode = Join-Path $destRoot '.vscode'
$destRoaming = Join-Path $destRoot 'Roaming\Code'
$srcVscode = Join-Path $env:USERPROFILE '.vscode'
$srcRoaming = Join-Path $env:APPDATA 'Code'

Write-Host "Backup root: $backupRoot"
Write-Host "Destination root: $destRoot"
Write-Host "Source .vscode: $srcVscode"
Write-Host "Source AppData Roaming\Code: $srcRoaming"

# Create backup directory
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
New-Item -ItemType Directory -Path $destRoot -Force | Out-Null

# Stop VS Code processes
Write-Host "Stopping Code.exe processes (if any)..."
Get-Process -Name Code -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Backup and copy function with error handling
function Safe-Copy {
  param($source, $dest)
  if (-not (Test-Path $source)) {
    Write-Host "Source not found: $source -- skipping." -ForegroundColor Yellow
    return $false
  }
  Write-Host "Copying from $source to $dest" -ForegroundColor Cyan
  try {
    Copy-Item -Path $source -Destination $dest -Recurse -Force -ErrorAction Stop
    return $true
  } catch {
    Write-Host "Error copying $source -> $dest : $_" -ForegroundColor Red
    return $false
  }
}

# Backup originals to E:\VSCode_Backups
Write-Host "Backing up sources to $backupRoot..." -ForegroundColor Cyan
if (Test-Path $srcVscode) { Safe-Copy $srcVscode (Join-Path $backupRoot '.vscode') }
if (Test-Path $srcRoaming) { Safe-Copy $srcRoaming (Join-Path $backupRoot 'Roaming_Code') }

# Optional cache cleanup to save space before copying
Write-Host "Cleaning cache directories (CachedData, Cache, GPUCache, Crashpad) inside AppData\Roaming\Code..." -ForegroundColor Cyan
$cacheDirs = @("CachedData","Cache","GPUCache","Crashpad")
foreach ($d in $cacheDirs) {
  $path = Join-Path $srcRoaming $d
  if (Test-Path $path) {
    Write-Host "Removing $path" -ForegroundColor Yellow
    Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
  }
}

# Copy to E:
Write-Host "Copying to E:..." -ForegroundColor Cyan
if (Test-Path $srcVscode) { Safe-Copy $srcVscode $destVscode } else { Write-Host ".vscode not found, skipped" }
if (Test-Path $srcRoaming) { Safe-Copy $srcRoaming $destRoaming } else { Write-Host "Roaming Code not found, skipped" }

# Compare sizes
function Get-SizeMB { param($path) if (-not (Test-Path $path)) { return 0 } ; $sum = (Get-ChildItem -Path $path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum; return [math]::Round($sum / 1MB, 2) }
$origVsize = Get-SizeMB $srcVscode
$origRsize = Get-SizeMB $srcRoaming
$newVsize = Get-SizeMB $destVscode
$newRsize = Get-SizeMB $destRoaming

Write-Host "Sizes (MB):" -ForegroundColor Cyan
Write-Host "Original .vscode: $origVsize MB"; Write-Host "New .vscode: $newVsize MB"
Write-Host "Original Roaming\Code: $origRsize MB"; Write-Host "New Roaming\Code: $newRsize MB"

# Rename originals to .old (safe rollback)
if (Test-Path $srcVscode) { Write-Host "Renaming $srcVscode -> ${srcVscode}_old"; Rename-Item -Path $srcVscode -NewName "$($env:USERNAME)_vscode_old" -ErrorAction SilentlyContinue }
if (Test-Path $srcRoaming) { Write-Host "Renaming $srcRoaming -> ${srcRoaming}_old"; Rename-Item -Path $srcRoaming -NewName "Code_old" -ErrorAction SilentlyContinue }

# Create junctions
Write-Host "Creating junctions with mklink..." -ForegroundColor Cyan
$mk1 = "cmd /c mklink /J `"$srcVscode`" `"$destVscode`""
$mk2 = "cmd /c mklink /J `"$srcRoaming`" `"$destRoaming`""
Write-Host "Executing: $mk1"; Invoke-Expression $mk1
Write-Host "Executing: $mk2"; Invoke-Expression $mk2

# Validate junctions
Write-Host "Validating junctions and checking extension list..." -ForegroundColor Cyan
if (Test-Path $srcVscode) { Get-ChildItem -Path $srcVscode -Force | Select-Object -First 10 | Format-Table -AutoSize }
if (Test-Path $srcRoaming) { Get-ChildItem -Path $srcRoaming -Force | Select-Object -First 10 | Format-Table -AutoSize }

# List installed extensions using code CLI (if available)
try { $extensions = code --list-extensions; Write-Host "Installed extensions count: $($extensions | Measure-Object).Count" } catch { Write-Host "code CLI not found or returned error; please check PATH or reopen VS Code" }

# Report disk space
Get-PSDrive C, E | Select-Object Name, Used, Free | Format-Table -AutoSize

Write-Host "Migration steps completed. Please open Visual Studio Code, verify extensions and settings." -ForegroundColor Green
Write-Host "If everything is OK, run this script with -DoRemoveOld to delete old backups and free space (or remove manually)." -ForegroundColor Yellow

# Save log summary
$log = Join-Path $backupRoot "migration_log_$timestamp.txt"
@"
Migration log: $(Get-Date)
BackupFolder: $backupRoot
DestRoot: $destRoot
Original Vscode MB: $origVsize
New Vscode MB: $newVsize
Original Roaming MB: $origRsize
New Roaming MB: $newRsize
"@ | Out-File -FilePath $log -Encoding UTF8
Write-Host "Log saved: $log" -ForegroundColor Green

if ($DoRemoveOld) {
  Write-Host "Removing old folders as requested..." -ForegroundColor Yellow
  if (Test-Path "$env:USERPROFILE\${env:USERNAME}_vscode_old") { Remove-Item "$env:USERPROFILE\${env:USERNAME}_vscode_old" -Recurse -Force -ErrorAction SilentlyContinue }
  if (Test-Path "$env:APPDATA\Code_old") { Remove-Item "$env:APPDATA\Code_old" -Recurse -Force -ErrorAction SilentlyContinue }
  Write-Host "Old folders removed." -ForegroundColor Green
}

Write-Host "Done." -ForegroundColor Green
