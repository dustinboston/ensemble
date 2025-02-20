#!/bin/bash

BIN_DIR="./bin"
ENSEMBLE_SRC_DIR="./src/ensemble"
ENSEMBLE_BINARY_FILE="$BIN_DIR/ensemble"
ENSEMBLE_BUILD_DIR="$ENSEMBLE_SRC_DIR/build"
ENSEMBLE_BUNDLE_FILE="$BIN_DIR/ensemble.js"

if [ -d "$ENSEMBLE_BUILD_DIR" ]; then
  cd "$ENSEMBLE_SRC_DIR"
  tsc --build --clean
fi

if [ -f "$ENSEMBLE_BUNDLE_FILE" ]; then
  rm "$ENSEMBLE_BUNDLE_FILE"
fi

if [ -f "$ENSEMBLE_BINARY_FILE" ]; then
  rm "$ENSEMBLE_BINARY_FILE"
fi
