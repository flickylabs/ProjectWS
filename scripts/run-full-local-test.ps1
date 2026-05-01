$ErrorActionPreference = 'Continue'

$Root = Split-Path -Parent $PSScriptRoot
$Port = if ($env:PORT) { [int]$env:PORT } else { 5180 }
$Url = "http://127.0.0.1:$Port/index-pc.html"

function Get-Flag([string]$Name, [string]$Default) {
  $value = [Environment]::GetEnvironmentVariable($Name)
  if ([string]::IsNullOrWhiteSpace($value)) { return $Default }
  return $value
}

$PlaytestOnly = Get-Flag 'PLAYTEST_ONLY' '0'
$RunBrowser = Get-Flag 'RUN_BROWSER' '1'
$RunScriptAudit = Get-Flag 'RUN_SCRIPT_AUDIT' '1'
$RunQaFast = Get-Flag 'RUN_QA_FAST' '1'
$RunDeep = Get-Flag 'RUN_DEEP' '0'
$StartServer = Get-Flag 'START_SERVER' '1'

$strictDefault = if ($PlaytestOnly -eq '1') { '0' } else { '1' }
$StrictBrowser = Get-Flag 'STRICT_BROWSER' '1'
$StrictScript = Get-Flag 'STRICT_SCRIPT' $strictDefault
$StrictQaFast = Get-Flag 'STRICT_QA_FAST' $strictDefault

$script:FailCount = 0
$script:WarnCount = 0
$script:BuildOk = $false
$script:LastTestExit = 0

function Invoke-TestCommand {
  param(
    [Parameter(Mandatory=$true)][string]$Label,
    [Parameter(Mandatory=$true)][string]$FilePath,
    [string[]]$Arguments = @(),
    [switch]$Audit
  )

  Write-Host ''
  Write-Host '------------------------------------------------------------'
  if ($Audit) {
    Write-Host "[AUDIT] $Label"
  } else {
    Write-Host "[RUN] $Label"
  }
  Write-Host ("[CMD] {0} {1}" -f $FilePath, ($Arguments -join ' '))
  Write-Host '------------------------------------------------------------'

  & $FilePath @Arguments
  $exit = if ($null -eq $LASTEXITCODE) { 0 } else { $LASTEXITCODE }
  $script:LastTestExit = $exit

  if ($exit -eq 0) {
    Write-Host "[PASS] $Label"
  } elseif ($Audit) {
    Write-Host "[WARN] $Label exit=$exit"
    $script:WarnCount += 1
  } else {
    Write-Host "[FAIL] $Label exit=$exit"
    $script:FailCount += 1
  }

  # Keep the exit code in script state instead of returning it on the
  # success stream; otherwise command output can corrupt callers that
  # compare the return value.
}

Write-Host '============================================================'
Write-Host 'ProjectWS local full test'
Write-Host "Workspace: $Root"
Write-Host "URL:       $Url"
Write-Host ''
Write-Host 'Required smoke gates:'
Write-Host '  build:pc'
Write-Host '  qa:free-interrogation'
Write-Host ''
Write-Host 'Optional/audit gates:'
Write-Host "  PLAYTEST_ONLY=$PlaytestOnly"
Write-Host "  RUN_BROWSER=$RunBrowser       STRICT_BROWSER=$StrictBrowser"
Write-Host "  RUN_SCRIPT_AUDIT=$RunScriptAudit STRICT_SCRIPT=$StrictScript"
Write-Host "  RUN_QA_FAST=$RunQaFast       STRICT_QA_FAST=$StrictQaFast"
Write-Host "  RUN_DEEP=$RunDeep"
Write-Host "  START_SERVER=$StartServer"
Write-Host ''
Write-Host 'Notes:'
Write-Host '  Default mode is strict release parity. Script audit and qa:fast failures are blockers.'
Write-Host '  Set PLAYTEST_ONLY=1 to demote script/qa-fast findings to WARN for manual playtesting.'
Write-Host '============================================================'
Write-Host ''

if (!(Test-Path (Join-Path $Root 'package.json'))) {
  Write-Host "[ERROR] package.json not found in $Root"
  exit 1
}

Set-Location $Root

Invoke-TestCommand 'Node version' 'node' @('--version')
Invoke-TestCommand 'NPM version' 'npm.cmd' @('--version')

Invoke-TestCommand 'UI/PC production build' 'npm.cmd' @('run', 'build:pc')
if ($script:LastTestExit -eq 0) { $script:BuildOk = $true }

Invoke-TestCommand 'LLM free-question policy corpus' 'npm.cmd' @('run', 'qa:free-interrogation')

if ($RunBrowser -eq '1') {
  Invoke-TestCommand 'UI browser harness' 'npm.cmd' @('run', 'qa:browser') -Audit:($StrictBrowser -ne '1')
} else {
  Write-Host '[SKIP] Browser UI harness disabled.'
}

if ($RunScriptAudit -eq '1') {
  foreach ($caseId in @('spouse-01', 'family-01', 'friend-01')) {
    $audit = $StrictScript -ne '1'
    Invoke-TestCommand "Script semantic quality $caseId" 'node' @('scripts\validate-scripted-semantic-quality.cjs', '--case', $caseId) -Audit:$audit
    Invoke-TestCommand "Script template coverage $caseId" 'node' @('scripts\validate-scripted-template-coverage.cjs', '--case', $caseId) -Audit:$audit
    Invoke-TestCommand "Runtime template coverage $caseId" 'node' @('scripts\validate-runtime-template-coverage.cjs', '--case', $caseId) -Audit:$audit
  }
} else {
  Write-Host '[SKIP] Script audit disabled.'
}

if ($RunQaFast -eq '1') {
  Invoke-TestCommand 'QA fast static+route release gate' 'npm.cmd' @('run', 'qa:fast') -Audit:($StrictQaFast -ne '1')
} else {
  Write-Host '[SKIP] qa:fast disabled.'
}

if ($RunDeep -eq '1') {
  Invoke-TestCommand 'QA deep' 'npm.cmd' @('run', 'qa:deep') -Audit
  Invoke-TestCommand 'QA visual report' 'npm.cmd' @('run', 'qa:visual') -Audit
  Invoke-TestCommand 'QA route exhaustive' 'npm.cmd' @('run', 'qa:route:exhaustive') -Audit
} else {
  Write-Host '[SKIP] Deep/visual/exhaustive QA disabled. Set RUN_DEEP=1 to enable.'
}

Write-Host ''
Write-Host '============================================================'
if ($script:FailCount -eq 0) {
  Write-Host 'Smoke result: PASS'
} else {
  Write-Host "Smoke result: FAIL count=$script:FailCount"
}
Write-Host "Audit warnings: $script:WarnCount"
Write-Host ''
Write-Host 'Interpretation:'
Write-Host '  FAIL = local integrated build/playtest blocker.'
Write-Host '  WARN = audit-only finding. In default release-parity mode, script/qa-fast findings are FAIL.'
Write-Host '============================================================'
Write-Host ''

if ($StartServer -eq '1') {
  if ($script:BuildOk) {
    Write-Host 'Starting PC dev server for manual UI/LLM/script playtest.'
    Write-Host "Open: $Url"
    Write-Host 'Press Ctrl+C to stop this server.'
    Write-Host ''
    $serverArgs = @('/c', 'npm.cmd', 'run', 'dev:pc', '--', '--host', '127.0.0.1', '--port', "$Port")
    $server = Start-Process -FilePath 'cmd.exe' -ArgumentList $serverArgs -WorkingDirectory $Root -PassThru
    $ready = $false
    for ($i = 0; $i -lt 60; $i += 1) {
      Start-Sleep -Milliseconds 500
      if ($server.HasExited) { break }
      try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
          $ready = $true
          break
        }
      } catch {
        # Server is still starting.
      }
    }
    if ($ready) {
      Start-Process $Url
      Write-Host ''
      Write-Host 'Dev server is running in a separate window.'
      Write-Host 'Close that server window or press Ctrl+C there when finished.'
    } else {
      Write-Host '[WARN] Dev server did not respond yet. It may still be starting in a separate window.'
      Write-Host "Try opening manually: $Url"
    }
    exit $script:FailCount
  }
  Write-Host '[SKIP] Dev server not started because build:pc failed.'
} else {
  Write-Host '[SKIP] Dev server disabled. Set START_SERVER=1 to enable.'
}

exit $script:FailCount
