#!/bin/bash

BIN_DIR="./bin"
ENSEMBLE_SRC_DIR="./src/ensemble"
ENSEMBLE_BUILD_DIR="$ENSEMBLE_SRC_DIR/build"
ENSEMBLE_BUNDLE_FILE="$BIN_DIR/ensemble.js"
ENSEMBLE_BINARY_FILE="$BIN_DIR/ensemble"
QJS_BINARY_FILE="$BIN_DIR/qjs.exe"
NODE="npx -y"

# Bundle Typescript into a single file
$NODE esbuild "$ENSEMBLE_SRC_DIR/cli.ts" --outfile="$ENSEMBLE_BUNDLE_FILE" --bundle --format=esm --minify --platform=neutral --target=esnext --external:qjs:* --main-fields=main,module

# Compile the ensemble.js interpreter into a standalone binary
"$QJS_BINARY_FILE" --std --module --out "$ENSEMBLE_BINARY_FILE" --compile "$ENSEMBLE_BUNDLE_FILE"

# Compile all of the Typescript files to JavaScript in the build directory
cd "$ENSEMBLE_SRC_DIR" && $NODE tsc --build
