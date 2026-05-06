@echo off
setlocal EnableExtensions
title Solomon Server

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
set "SERVER_DIR=%ROOT%\server"

echo ============================================
echo   Solomon Game Server
echo ============================================
echo.

if not exist "%SERVER_DIR%\package.json" (
    echo ERROR: server\package.json not found.
    pause
    exit /b 1
)

cd /d "%SERVER_DIR%"

if exist ".env" (
    call :load_env ".env"
    echo [env] Loaded server\.env
) else (
    echo [env] WARNING: server\.env is missing.
    echo [env] Copy server\.env.example to server\.env and fill secrets for local API tests.
)

if not defined STEAM_APP_ID echo [env] WARNING: STEAM_APP_ID is not set.
if not defined STEAM_AUTH_IDENTITY echo [env] WARNING: STEAM_AUTH_IDENTITY is not set.
if not defined STEAM_WEB_API_KEY echo [env] WARNING: STEAM_WEB_API_KEY is not set.
if not defined STEAM_SESSION_SECRET echo [env] WARNING: STEAM_SESSION_SECRET is not set.
if not defined OPENAI_API_KEY echo [env] WARNING: OPENAI_API_KEY is not set.
if /I "%NODE_ENV%"=="production" if "%STEAM_AUTH_MOCK%"=="1" echo [env] WARNING: STEAM_AUTH_MOCK=1 is blocked when NODE_ENV=production.
echo.

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

node index.js
set "EXITCODE=%ERRORLEVEL%"

pause
exit /b %EXITCODE%

:load_env
for /f "usebackq eol=# tokens=1,* delims==" %%A in ("%~1") do (
    if not "%%A"=="" set "%%A=%%B"
)
exit /b 0
