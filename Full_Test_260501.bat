@echo off
setlocal

set "WORKDIR=%~dp0"
if "%WORKDIR:~-1%"=="\" set "WORKDIR=%WORKDIR:~0,-1%"

powershell -NoProfile -ExecutionPolicy Bypass -File "%WORKDIR%\scripts\run-full-local-test.ps1"
set "EXITCODE=%ERRORLEVEL%"

echo.
echo ============================================================
echo Full_Test_260501.bat finished with exit code %EXITCODE%.
echo Press any key to close this window.
echo ============================================================
pause >nul
exit /b %EXITCODE%
