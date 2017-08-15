#!/bin/sh
echo "Committing patch and incrementing version"
cp README.md dist\README.md
cp LICENSE dist\LICENSE
git add .
git commit -m "Bugfixes"
npm version patch
cd dist/
npm version patch
cd ..
npm run test
npm run build
npm run publish