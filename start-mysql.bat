@echo off
set BIN=%~dp0.tools\mariadb\bin
set INI=%~dp0.tools\mariadb-data\my.ini
netstat -ano | findstr ":3307" >nul
if errorlevel 1 (
  echo Starting local MySQL on port 3307...
  start "" /B "%BIN%\mysqld.exe" --defaults-file="%INI%"
  timeout /t 3 /nobreak >nul
) else (
  echo MySQL already running on 3307
)
