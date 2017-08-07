@echo off
echo.
echo "Committing patch and incrementing version"
git add .
git commit -m "Bugfixes"
npm version patch
cd dist/
npm version patch
cd ..
npm run test
npm run build
exit