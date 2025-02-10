/// <reference path="./qjs.d.ts" />

// Main entry point for the program. This function is called when the program
// is run from the command line. It is separate to make it easier to test the
// io functions (by isolating them). There are no tests for this specific file.

import io from "./io.ts";

io.main(...scriptArgs);
