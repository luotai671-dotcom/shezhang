@echo off
chcp 65001 >nul
title 机场社长 - 本地静态预览启动器
echo ========================================================
echo   🚀 正在启动「机场社长」2026 高速专线评测博客预览环境...
echo ========================================================
echo.
echo [1/2] 正在启动 Astro 本地静态服务器 (端口 4321)...
echo [2/2] 即将在默认浏览器中自动打开: http://localhost:4321
echo.
start "" cmd /c "timeout /t 2 >nul && start http://localhost:4321"
call npm run preview
pause
