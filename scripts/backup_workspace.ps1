# Backup workspace to ./backup/auto_backup_YYYYMMDD_HHMMSS
# Excludes: backup, node_modules, build, .git, .vscode

$source = (Get-Location).Path
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$destRoot = Join-Path $source "backup"
$dest = Join-Path $destRoot "auto_backup_$timestamp"

# Ensure folder exists
New-Item -ItemType Directory -Path $dest -Force | Out-Null

# Directories to exclude
$excludeDirs = @("backup","node_modules","build",".git",".vscode")

Write-Output "Copying files to $dest (excluding: $($excludeDirs -join ', '))..."

function IsExcludedPath($fullPath, $excludes) {
  foreach ($ex in $excludes) {
    if ($fullPath -like "*\\$ex\\*" -or $fullPath -like "*\\$ex") { return $true }
  }
  return $false
}

$files = Get-ChildItem -Path $source -Recurse -File -Force -ErrorAction SilentlyContinue

$copied = 0
foreach ($f in $files) {
  if (IsExcludedPath $f.FullName $excludeDirs) { continue }
  $rel = $f.FullName.Substring($source.Length).TrimStart('\')
  $target = Join-Path $dest $rel
  $tDir = Split-Path $target
  if (!(Test-Path $tDir)) { New-Item -ItemType Directory -Path $tDir -Force | Out-Null }
  Copy-Item -Path $f.FullName -Destination $target -Force
  $copied++
}

Write-Output "Backup completed to: $dest"
Write-Output "Total files copied: $copied"
