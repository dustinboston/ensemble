#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
BENCH_DIR="$(dirname "$0")"
PROJECT_ROOT="$(dirname "$(dirname "$BENCH_DIR")")"
ENSEMBLE_BINARY="$PROJECT_ROOT/bin/ensemble"
RESULTS_DIR="$BENCH_DIR/results"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
SCRIPTS_DIR="$BENCH_DIR/scripts"
SUMMARY_FILE="$RESULTS_DIR/summary_$TIMESTAMP.md"
WARMUP_RUNS=3
MIN_RUNS=10

# --- Setup ---
echo "Ensemble Performance Benchmark Suite"
echo "===================================="
mkdir -p "$RESULTS_DIR"

if [ ! -f "$ENSEMBLE_BINARY" ]; then
    echo "Error: Ensemble binary not found at $ENSEMBLE_BINARY" >&2
    exit 1
fi

# --- Benchmarking ---
echo "Running benchmarks (warmup: $WARMUP_RUNS, runs: $MIN_RUNS)..."

# Use 'hyperfine' to run all *.ensmbl scripts and export a report.
# It automatically handles warm-up, multiple runs, and statistical analysis.
hyperfine --warmup "$WARMUP_RUNS" --min-runs "$MIN_RUNS" \
  --command-name "Benchmark Utils" "$ENSEMBLE_BINARY $SCRIPTS_DIR/benchmark.ensmbl" \
  --command-name "Basic Macros"    "$ENSEMBLE_BINARY $SCRIPTS_DIR/perf1.ensmbl" \
  --command-name "Math/Recursion"  "$ENSEMBLE_BINARY $SCRIPTS_DIR/perf2.ensmbl" \
  --command-name "Atom Operations" "$ENSEMBLE_BINARY $SCRIPTS_DIR/perf3.ensmbl" \
  --export-markdown "$SUMMARY_FILE"

echo
echo "Benchmark suite completed successfully!"
echo "Summary report saved to: $SUMMARY_FILE"

# --- Code Metrics ---
echo "Analyzing TypeScript files in src/ensemble (excluding tests)..."

# Add a new section header to the Markdown report
echo -e "\n## Code Metrics (Lines of Code)\n" >> "$SUMMARY_FILE"

# Run cloc, excluding test directories and files ending in _test.ts
cloc --include-lang=TypeScript \
     --exclude-dir=tests \
     --not-match-f=_test\.ts$ \
     --md "${PROJECT_ROOT}/src/ensemble" >> "$SUMMARY_FILE"
