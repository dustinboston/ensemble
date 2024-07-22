import * as std from "std";
import { rep, initEnv } from "./ensemble.js";
import { formatError, printString } from "./printer.js";

const replEnv = initEnv();

// First argument is the binary path, last must be a .js file if passed.
// If no arguments are passed, the repl is started.
const args = scriptArgs.slice(1);
const userScriptPath = args.at(-1);
const hostEnvArgs = args.length > 2 ? args.slice(1, -1) : [];

replEnv.set(Symbol.for("*ARGV*"), hostEnvArgs);
replEnv.set(Symbol.for("*host-language*"), "ENSEMBLE");

// Run a user program and exit
if (userScriptPath) {
    console.log(`Loading user script: ${userScriptPath}`);
    // rep(`(load-file "${userScriptPath}")`, replEnv);
    const userScript = std.loadFile(userScriptPath);
    if (userScript === null || userScript === undefined) {
        throw new Error(`Could not load file: ${userScriptPath}`);
    }
    console.log('userScript:', userScript);

    rep(userScript, replEnv);
    std.exit(0);
}

const prompt = '> ';
std.puts('Ensemble REPL\n');

for (;;) {
    std.puts(prompt);
    const input = std.in.getline();

    if (input === null || input === undefined) {
        break;
    }

    if (input === "") {
        continue;
    }

    try {
        const result = rep(input, replEnv);
        console.log(result);
    }
    catch (error) {
        console.error('REPL Error: ', formatError(error));
        // console.error(error);
        // if (error instanceof Error) {
        //     console.error(`error: ${printString(error, false)}`);
        // } else {
        //     console.error(String(error));
        // }
    }
}


