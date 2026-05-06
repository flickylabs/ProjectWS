@echo off
setlocal EnableExtensions
title Solomon - Full Local Start

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

echo ============================================
echo   Solomon Game - Full Local Start
echo ============================================
echo.
echo   Server env: server\.env
echo   Client dev env: Vite defaults and root VITE_* env only
echo.

cd /d "%ROOT%"

call :check_server
if errorlevel 1 (
    echo [1/2] Starting server in new window...
    start "Solomon Server" cmd /c ""%ROOT%\start-server.bat""
    echo Waiting for server...
    timeout /t 8 /nobreak >nul
) else (
    echo [1/2] Server already running.
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
echo   Game:     http://localhost:5173
echo   WebAdmin: http://localhost:3001/admin
echo ============================================
echo.

start "" http://localhost:3001/admin
start "" http://localhost:5173

call npm run dev
set "EXITCODE=%ERRORLEVEL%"

pause
exit /b %EXITCODE%

:check_server
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/api/health' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500) { exit 0 } } catch {}; exit 1"
exit /b %ERRORLEVEL%
