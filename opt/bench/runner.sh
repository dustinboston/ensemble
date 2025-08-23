#!/bin/bash

# --- Configuration ---
# Check if a file argument is provided. If not, show usage and exit.
if [ -z "$1" ]; then
  echo "Error: No benchmark file specified."
  echo "Usage: $0 <path_to_benchmark_file.js>"
  exit 1
fi

# Set BENCH_FILE to the first command-line argument
BENCH_FILE="$1"
ITERATIONS=1000

echo "🚀 Starting benchmark for '$BENCH_FILE'..."

# --- Execution Loop ---
total_duration=0
for (( i=1; i<=$ITERATIONS; i++ ))
do
  # Execute the JS file in a new, isolated QuickJS process
  # The output of console.log() is captured into the 'duration' variable
  duration=$(./bin/qjs --std "$BENCH_FILE")

  # Add the result to our running total using 'bc' for float arithmetic
  total_duration=$(echo "$total_duration + $duration" | bc)

  # Optional: show live progress (unit updated to ms)
  echo -ne "Run $i/$ITERATIONS: ${duration}ms\033[0K\r"
done

# --- Results ---
echo -e "\n\n📊 Benchmark Complete"
average=$(echo "scale=3; $total_duration / $ITERATIONS" | bc)

echo "Total Runs:   $ITERATIONS"
# Unit updated to ms
echo "Average Time: ${average}ms"
