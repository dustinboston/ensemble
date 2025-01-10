#!/usr/bin/bash
# ---------------------------------------------------------------------------
# e2e.sh - Run end-to-end tests

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License at <http://www.gnu.org/licenses/> for
# more details.

# Usage: e2e.sh [-h|--help] [-f|--full]

# Revision history:
# 2024-07-30 Created by new_script ver. 3.3
# ---------------------------------------------------------------------------

PROGNAME=${0##*/}
VERSION="0.1"

clean_up() { # Perform pre-exit housekeeping
  return
}

error_exit() {
  echo -e "${PROGNAME}: ${1:-"Unknown Error"}" >&2
  clean_up
  exit 1
}

graceful_exit() {
  clean_up
  exit
}

signal_exit() { # Handle trapped signals
  case $1 in
    INT)
      error_exit "Program interrupted by user" ;;
    TERM)
      echo -e "\n$PROGNAME: Program terminated" >&2
      graceful_exit ;;
    *)
      error_exit "$PROGNAME: Terminating on unknown signal" ;;
  esac
}

usage() {
  echo -e "Usage: $PROGNAME [-h|--help] [-f|--full]"
}

help_message() {
  cat <<- _EOF_
  $PROGNAME ver. $VERSION
  Run end-to-end tests

  $(usage)

  Options:
  -h, --help  Display this help message and exit.
  -f, --full  Display full output from tests.

_EOF_
  return
}

# Trap signals
trap "signal_exit TERM" TERM HUP
trap "signal_exit INT"  INT

full_output=0

# Parse command-line
while [[ -n $1 ]]; do
  case $1 in
    -h | --help)
      help_message; graceful_exit ;;
    -f | --full)
      full_output=1 ;;
    -* | --*)
      usage
      error_exit "Unknown option $1" ;;
    *)
      echo "" ;;
  esac
  shift
done

# Function to run tests
run_tests() {
  local step="$1"
  local test_file="$2"
  if [[ "$full_output" -eq 1 ]]; then
    STEP="$step" MAL_IMPL=ensemble python scripts/runtest.py  --deferrable --optional "$test_file" -- ./scripts/run
  else
    STEP="$step" MAL_IMPL=ensemble python scripts/runtest.py  --deferrable --optional "$test_file" -- ./scripts/run | tail -n 7
  fi
  echo '----------------------------------------------'
}

# Main logic
for step in "step2_eval" "step3_env" "step4_if_fn_do" "step5_tco" "step6_file" "step7_quote" "step8_macros" "step9_try" "stepA_mal"; do

  if [[ "$step" == "stepA_mal" ]]; then
    run_tests "$step" "tests/$step.mal" # &
  fi

  run_tests "$step" "tests/mal/$step.mal" # &
done

# Wait for all background processes to complete
wait

graceful_exit

