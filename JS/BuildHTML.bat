echo off
cls
:loop
phantomjs.exe toHTML.js %1
goto loop