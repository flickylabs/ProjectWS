@echo off
title Solomon - DB Reset

echo ============================================
echo   Solomon Database Reset
echo ============================================
echo.
echo   WARNING: This will delete ALL data and
echo   recreate the database from scratch.
echo.

set /p confirm="Are you sure? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cancelled.
    pause
    exit /b 0
)

cd /d %~dp0server

echo.
echo Deleting database...
if exist "solomon.db" del /f "solomon.db"
if exist "solomon.db-shm" del /f "solomon.db-shm"
if exist "solomon.db-wal" del /f "solomon.db-wal"

echo Recreating database with seed data...
node db/seed.js

if errorlevel 1 (
    echo ERROR: DB seed failed.
) else (
    echo.
    echo Database reset complete.
)

pause
