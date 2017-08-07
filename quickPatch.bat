@echo off
echo.
echo "Committing patch and incrementing version"
copy README.md dist\README.md
copy LICENSE dist\LICENSE
git add .
git commit -m "Bugfixes"
npm version patch
cd dist\
npm version patch
cd ..
npm run test
npm run build
npm run publish
exit