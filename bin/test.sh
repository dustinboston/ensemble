#!/bin/bash

ENSEMBLE_BUILD_DIR="./src/ensemble/build"
QJS_BINARY_FILE="./bin/qjs.exe"

# Find all *_test.js files in the build directory and execute them with QuickJS
find "$ENSEMBLE_BUILD_DIR" -type f -name '*_test.js' -exec "$QJS_BINARY_FILE" {} \;
