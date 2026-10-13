@echo off
setlocal
cd /d "%~dp0" || goto fail
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 goto fail
)
echo Starting library...
call npm run dev
if errorlevel 1 goto fail
goto end
:fail
echo Startup failed. Check Node.js installation.
pause
exit /b 1
:end
pause
