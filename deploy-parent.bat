@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================
REM Deploy Firebase Parent Project (Wrapper)
REM Usage:
REM     deploy-parent.bat <ten_project>
REM Example:
REM     deploy-parent.bat Amenosa
REM ============================================================

REM Switch to Node 22 (required by Firebase CLI)
call fnm use 22

REM Run Node.js deploy script
node "%~dp0deploy-parent.js" %*

exit /b %errorlevel%
