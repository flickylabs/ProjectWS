@echo off
setlocal EnableExtensions
title Solomon PC Dev

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
set "PORT=5174"
set "URL=http://127.0.0.1:%PORT%/index-pc.html"
set "START_LOCAL_SERVER=1"

if /I "%~1"=="--no-server" set "START_LOCAL_SERVER=0"
if /I "%~2"=="--no-server" set "START_LOCAL_SERVER=0"

cd /d "%ROOT%"

echo ============================================
echo   Solomon PC Dev
echo ============================================
echo.
echo   PC URL:     %URL%
echo   API proxy:  http://localhost:3001/api
echo   Server env: server\.env
echo.

if "%START_LOCAL_SERVER%"=="1" (
    call :check_server
    if errorlevel 1 (
        echo [server] Starting local API server in new window...
        start "Solomon Server" cmd /c ""%ROOT%\start-server.bat""
        timeout /t 8 /nobreak >nul
    ) else (
        echo [server] Local API server already running.
    )
) else (
    echo [server] Skipping local API server (--no-server).
)

if not exist "node_modules\" (
    echo [client] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed.
        pause
        exit /b 1
    )
)

echo.
echo Starting PC dev server...
echo If the browser does not open, use:
echo   %URL%
echo.

call npm run dev:pc -- --host 127.0.0.1 --open /index-pc.html
set "EXITCODE=%ERRORLEVEL%"

pause
exit /b %EXITCODE%

:check_server
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/api/health' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500) { exit 0 } } catch {}; exit 1"
exit /b %ERRORLEVEL%
