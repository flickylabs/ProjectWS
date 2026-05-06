@echo off
setlocal EnableExtensions
title Solomon - Full Local Start

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
set "PORT=5174"
set "URL=http://127.0.0.1:%PORT%/index-pc.html"
set "START_LOCAL_SERVER=1"

if /I "%~1"=="--no-server" set "START_LOCAL_SERVER=0"
if /I "%~2"=="--no-server" set "START_LOCAL_SERVER=0"

echo ============================================
echo   Solomon PC - Full Local Start
echo ============================================
echo.
echo   Server env: server\.env
echo   PC URL:     %URL%
echo   API proxy:  http://localhost:3001/api
echo.

cd /d "%ROOT%"

if "%START_LOCAL_SERVER%"=="1" (
    call :check_server
    if errorlevel 1 (
        echo [1/2] Starting server in new window...
        start "Solomon Server" cmd /c ""%ROOT%\start-server.bat""
        echo Waiting for server...
        timeout /t 8 /nobreak >nul
    ) else (
        echo [1/2] Server already running.
    )
) else (
    echo [1/2] Skipping local API server: --no-server
)

echo [2/2] Starting frontend...
echo.

if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed.
        pause
        exit /b 1
    )
)

echo.
echo   Game:     %URL%
echo   WebAdmin: http://localhost:3001/admin
echo ============================================
echo.

start "" http://localhost:3001/admin

call npm run dev:pc -- --host 127.0.0.1 --open /index-pc.html
set "EXITCODE=%ERRORLEVEL%"

pause
exit /b %EXITCODE%

:check_server
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/api/health' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500) { exit 0 } } catch {}; exit 1"
exit /b %ERRORLEVEL%
