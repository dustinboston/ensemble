#!/bin/bash

# Collect coverage data
deno test -A --coverage=tmp --clean ./src/*_test.ts

# Generate HTML report
rm -rf coverage 
deno coverage tmp --html 
mv tmp/html coverage

# Clean up temporary files
rm -rf tmp