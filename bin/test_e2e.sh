#!/bin/bash

PYTHON="python"
BIN_DIR="./bin"
ENSEMBLE_TESTS_DIR="./src/ensemble/tests"
RUNTEST_SCRIPT="$BIN_DIR/runtest.py"
STEP_A_MAL_FILE="$ENSEMBLE_TESTS_DIR/stepA_mal.mal"
RUN_BINARY="$BIN_DIR/run"

# Execute the command
$PYTHON "$RUNTEST_SCRIPT" --deferrable --optional "$STEP_A_MAL_FILE" -- "$RUN_BINARY"
