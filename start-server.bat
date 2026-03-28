@echo off
title Solomon Server

echo ============================================
echo   Solomon Game Server
echo ============================================
echo.

cd /d %~dp0server

if not exist "node_modules\" (
    echo [1/3] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed.
        pause
        exit /b 1
    )
    echo.
) else (
    echo [1/3] Dependencies OK
)

if not exist "solomon.db" (
    echo [2/3] Initializing database...
    node db/seed.js
    if errorlevel 1 (
        echo ERROR: DB seed failed.
        pause
        exit /b 1
    )
    echo.
) else (
    echo [2/3] Database OK
)

echo [3/3] Starting server...
echo.
echo   API:      http://localhost:3001/api/health
echo   WebAdmin: http://localhost:3001/admin
echo.
echo   Press Ctrl+C to stop.
echo ============================================
echo.

start "" http://localhost:3001/admin

node index.js

pause
