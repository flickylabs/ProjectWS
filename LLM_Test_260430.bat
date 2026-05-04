@echo off
setlocal

set "WORKDIR=D:\ProjectWS-llm"
set "PORT=5181"
set "URL=http://127.0.0.1:%PORT%/index-pc.html"

echo [LLM Test] Workspace: %WORKDIR%
echo [LLM Test] URL: %URL%
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

echo [1/4] Running qa:free-interrogation...
call npm.cmd run qa:free-interrogation
if errorlevel 1 (
  echo.
  echo [ERROR] qa:free-interrogation failed.
  pause
  exit /b 1
)

echo.
echo [2/4] Running build:pc...
call npm.cmd run build:pc
if errorlevel 1 (
  echo.
  echo [ERROR] build:pc failed.
  pause
  exit /b 1
)

echo.
echo [3/4] Running qa:fast...
call npm.cmd run qa:fast
if errorlevel 1 (
  echo.
  echo [ERROR] qa:fast failed.
  pause
  exit /b 1
)

echo.
echo [4/4] Starting PC dev server...
echo Open: %URL%
echo Press Ctrl+C to stop this server.
echo.
call npm.cmd run dev:pc -- --host 127.0.0.1 --port %PORT%

endlocal
