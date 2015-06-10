echo off
cls
:loop
phantomjs.exe Crawl.js %1
goto loop