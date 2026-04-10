@echo off
setlocal

cd /d "%~dp0"
title Solomon PC Dev

echo Starting Solomon PC dev server...
echo Browser target will open automatically.
echo If it does not open, use:
echo   http://127.0.0.1:5174/index-pc.html
echo.

call npm run dev:pc -- --host 127.0.0.1 --open /index-pc.html
