#!/usr/bin/env bash

echo "compile ezappx-plugin-ajaxdemo..."
npm run build
echo "copy dist/ezappx-plugin-ajaxdemo.min.js to //E/JavaProjects/Ezappx/EzappxDesigner/src/main/resources/static/js"
cp dist/ezappx-plugin-ajaxdemo.min.js //E/JavaProjects/Ezappx/EzappxDesigner/src/main/resources/static/js
echo "done"