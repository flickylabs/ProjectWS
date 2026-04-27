@echo off
setlocal EnableExtensions

set "RUN_DEEP=1"
set "OPEN_REPORT=1"
set "QA_EXIT=0"
set "VISUAL_EXIT=0"

:parse_args
if "%~1"=="" goto args_done
if /I "%~1"=="--visual-only" set "RUN_DEEP=0"
if /I "%~1"=="/visual-only" set "RUN_DEEP=0"
if /I "%~1"=="--no-open" set "OPEN_REPORT=0"
if /I "%~1"=="/no-open" set "OPEN_REPORT=0"
if /I "%~1"=="--help" goto help
if /I "%~1"=="/?" goto help
shift
goto parse_args

:help
echo Usage: simulator.bat [--visual-only] [--no-open]
echo.
echo   default       Run npm run qa:deep, generate the visual report, then open it.
echo   --visual-only Skip qa:deep and regenerate the visual report from existing results.
echo   --no-open     Do not open the generated HTML report.
exit /b 0

:args_done
cd /d "%~dp0"
if errorlevel 1 exit /b 1

where npm >nul 2>nul
if errorlevel 1 goto npm_missing

if not "%RUN_DEEP%"=="1" goto skip_deep
echo [simulator] Running deep QA...
call npm run qa:deep
set "QA_EXIT=%ERRORLEVEL%"
goto after_deep

:skip_deep
echo [simulator] Skipping deep QA (--visual-only).

:after_deep
echo [simulator] Generating visual report...
call npm run qa:visual
set "VISUAL_EXIT=%ERRORLEVEL%"

set "REPORT=%CD%\tmp\qa-visual-report\index.html"
if not exist "%REPORT%" goto report_missing

echo [simulator] Report: %REPORT%
if "%OPEN_REPORT%"=="1" start "" "%REPORT%"

if not "%QA_EXIT%"=="0" goto deep_failed
if not "%VISUAL_EXIT%"=="0" goto visual_failed

echo [simulator] Done.
exit /b 0

:npm_missing
echo [simulator] npm was not found on PATH.
exit /b 1

:report_missing
echo [simulator] Visual report was not generated: %REPORT%
if not "%QA_EXIT%"=="0" exit /b %QA_EXIT%
if not "%VISUAL_EXIT%"=="0" exit /b %VISUAL_EXIT%
exit /b 1

:deep_failed
echo [simulator] Deep QA failed with exit code %QA_EXIT%. Report was still generated if possible.
exit /b %QA_EXIT%

:visual_failed
echo [simulator] Visual report generation failed with exit code %VISUAL_EXIT%.
exit /b %VISUAL_EXIT%
