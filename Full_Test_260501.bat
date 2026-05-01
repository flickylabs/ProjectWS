@echo off
setlocal

set "WORKDIR=%~dp0"
if "%WORKDIR:~-1%"=="\" set "WORKDIR=%WORKDIR:~0,-1%"

powershell -NoProfile -ExecutionPolicy Bypass -File "%WORKDIR%\scripts\run-full-local-test.ps1"
exit /b %ERRORLEVEL%
