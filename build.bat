@echo off
npx quartz build

git add .

git commit --allow-empty -m "auto update %date% %time%"
git push