#!/usr/bin/env bash

echo "compile ezappx-plugin-es..."
npm run build
echo "copy dist/ezappx-plugin-es.min.js to /E/JavaProjects/Ezappx/EzappxDesigner/src/main/resources/static/js"
cp dist/ezappx-plugin-es.min.js /E/JavaProjects/Ezappx/EzappxDesigner/src/main/resources/static/js
echo "done"