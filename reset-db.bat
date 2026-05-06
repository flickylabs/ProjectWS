@echo off
setlocal EnableExtensions
title Solomon - DB Reset

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
set "SERVER_DIR=%ROOT%\server"

echo ============================================
echo   Solomon Database Reset
echo ============================================
echo.
echo   WARNING: This will delete ALL local server data
echo   and recreate the database from seed data.
echo.

set /p confirm="Are you sure? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cancelled.
    pause
    exit /b 0
)

cd /d "%SERVER_DIR%"
if errorlevel 1 (
    echo ERROR: Failed to enter server directory.
    pause
    exit /b 1
)

echo.
echo Deleting database...
if exist "solomon.db" del /f "solomon.db"
if exist "solomon.db-shm" del /f "solomon.db-shm"
if exist "solomon.db-wal" del /f "solomon.db-wal"

echo Recreating database with seed data...
node db/seed.js
set "EXITCODE=%ERRORLEVEL%"

if not "%EXITCODE%"=="0" (
    echo ERROR: DB seed failed.
) else (
    echo.
    echo Database reset complete.
)

pause
exit /b %EXITCODE%
