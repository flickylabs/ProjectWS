@echo off
setlocal

set "WORKDIR=%~dp0"
if "%WORKDIR:~-1%"=="\" set "WORKDIR=%WORKDIR:~0,-1%"

set "PORT=5184"
set "URL=http://127.0.0.1:%PORT%/index-pc.html"

if /I "%~1"=="--skip-build" set "SKIP_BUILD=1"
if /I "%~1"=="--no-open" set "NO_OPEN=1"
if /I "%~2"=="--skip-build" set "SKIP_BUILD=1"
if /I "%~2"=="--no-open" set "NO_OPEN=1"

echo ============================================================
echo Solomon Court Beat visual test
echo Workspace: %WORKDIR%
echo URL:       %URL%
echo.
echo Purpose:
echo   - Build the PC client.
echo   - Start a dedicated PC dev server.
echo   - Manually verify Court Beat VFX/SFX:
echo       statement-vs-evidence clash
echo       evidence row highlight
echo       phrase fracture
echo       reused character portrait reaction
echo       notebook / judicial stamp destination pulse
echo.
echo Options:
echo   CourtBeat_Test_260504.bat --skip-build
echo   CourtBeat_Test_260504.bat --no-open
echo ============================================================
echo.

if not exist "%WORKDIR%\package.json" (
  echo [ERROR] package.json not found in %WORKDIR%
  pause
  exit /b 1
)

cd /d "%WORKDIR%" || (
  echo [ERROR] Failed to enter %WORKDIR%
  pause
  exit /b 1
)

if not "%SKIP_BUILD%"=="1" (
  echo [1/2] Running build:pc...
  call npm.cmd run build:pc
  if errorlevel 1 (
    echo.
    echo [ERROR] build:pc failed.
    pause
    exit /b 1
  )
) else (
  echo [1/2] Skipping build:pc.
)

echo.
echo [2/2] Starting PC dev server for Court Beat manual test...
echo Open: %URL%
echo.
echo Manual check:
echo   1. Enter the PC game.
echo   2. Present evidence against a party statement.
echo   3. Confirm the Court Beat card shows both the statement and evidence.
echo   4. Confirm the highlighted evidence row fractures the specific statement phrase.
echo   5. Confirm hit/miss/stamp SFX and destination pulse play.
echo.
echo Press Ctrl+C in this window to stop the server.
echo.

if "%NO_OPEN%"=="1" (
  call npm.cmd run dev:pc -- --host 127.0.0.1 --port %PORT% --strictPort
) else (
  call npm.cmd run dev:pc -- --host 127.0.0.1 --port %PORT% --strictPort --open /index-pc.html
)

endlocal
