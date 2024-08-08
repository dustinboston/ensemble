#!/usr/bin/zsh
# ---------------------------------------------------------------------------
# test.sh - Run the test suite

# Copyright 2024, Dustin Boston,,, <db@aeonprime>

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License at <http://www.gnu.org/licenses/> for
# more details.

# Usage: test.sh [-h|--help] [-e|--e2e] [-f|--fun] [-u|--unit] [TEST_FILE]

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
  echo -e "Usage: $PROGNAME [-h|--help] [-e|--e2e] [-f|--fun] [-u|--unit] [TEST_FILE]"
}

help_message() {
  cat <<- _EOF_
  $PROGNAME ver. $VERSION
  Run the test suite

  $(usage)

  Options:
  -h, --help  Display this help message and exit.
  -e, --e2e  Run end-to-end tests.
  -f, --fun  Run functional tests.
  -u, --unit  Run unit tests.

_EOF_
  return
}

# Trap signals
trap "signal_exit TERM" TERM HUP
trap "signal_exit INT"  INT

run_e2e=0
run_fun=0
run_unit=0
run_all=1

# Parse command-line
while [[ -n $1 ]]; do
  case $1 in
    -h | --help)
      help_message; graceful_exit ;;
    -e | --e2e)
      run_e2e=1; run_all=0 ;;
    -f | --fun)
      run_fun=1; run_all=0 ;;
    -u | --unit)
      run_unit=1; run_all=0 ;;
    -* | --*)
      usage
       ;;
    *)
      echo "" ;;
  esac
  shift
done

if [[ "$run_all" -eq 1 ]]; then
  run_e2e=1
  run_fun=1
  run_unit=1
fi

# Main logic
if [[ "$run_e2e" -eq 1 ]]; then
  ./e2e.sh
fi

if [[ "$run_fun" -eq 1 ]]; then
  deno test -A --reporter=pretty --parallel ../tests/*_test.ts
fi

if [[ "$run_unit" -eq 1 ]]; then
  deno test -A --reporter=pretty --parallel ../*_test.ts
fi

graceful_exit

