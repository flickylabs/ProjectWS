@echo off
setlocal

set "WORKDIR=D:\ProjectWS"
set "PORT=5180"
set "URL=http://127.0.0.1:%PORT%/index-pc.html"

echo [UI/VFX Test] Workspace: %WORKDIR%
echo [UI/VFX Test] URL: %URL%
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

echo [1/2] Running build:pc...
call npm.cmd run build:pc
if errorlevel 1 (
  echo.
  echo [ERROR] build:pc failed.
  pause
  exit /b 1
)

echo.
echo [2/2] Starting PC dev server...
echo Open: %URL%
echo Press Ctrl+C to stop this server.
echo.
call npm.cmd run dev:pc -- --host 127.0.0.1 --port %PORT%

endlocal
