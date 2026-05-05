@echo off
echo Construyendo sitio...
call npx quartz build

echo Copiando archivos...
xcopy public docs /E /I /Y

echo Listo 🚀
pause