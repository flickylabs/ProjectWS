@echo off
title Solomon - Full Start

echo ============================================
echo   Solomon Game - Full Start
echo ============================================
echo.

cd /d %~dp0

echo [1/2] Starting server in new window...
start "Solomon Server" cmd /c "%~dp0start-server.bat"

echo Waiting for server (8s)...
timeout /t 8 /nobreak >nul

echo [2/2] Starting frontend...
echo.

cd /d %~dp0
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo   Game:     http://localhost:5173
echo   WebAdmin: http://localhost:3001/admin
echo ============================================
echo.

start "" http://localhost:3001/admin
start "" http://localhost:5173

call npm run dev

pause
