import { initEnv, rep } from "./ensemble.js";
import * as env from "./env.js";
import * as printer from "./printer.js";
import * as types from "./types.js";
export { rep };
const defaultPrompt = 'user> ';
export function writeToFile(text, filePath) {
    let file = null;
    try {
        file = std.open(filePath, "w"); // Open file for writing ("w" mode)    
        file.puts(text); // Write content to the file
    }
    catch (e) {
        if (file !== null)
            file.close(); // Always close the file
        throw new Error(`Error writing to file: ${e}`);
    }
}
/**
 * `readline` Exposes the readline function to read in user-code.
 * A handler must be registered to capture user input.
 * @description If readline is already running, only the prompt will change.
 * @param {[types.StringNode]} args - A prompt to display to the user.
 * @returns {types.NilNode|types.StringNode} - The user input or null.
 * @example (readline ">>> ")
 */
export function readln(...args) {
    types.assertArgumentCount(args.length, 1);
    const cmdPrompt = args[0];
    types.assertStringNode(cmdPrompt);
    const input = displayPrompt(cmdPrompt.value);
    if (input === null || input === undefined) {
        return types.createNilNode();
    }
    return types.createStringNode(input);
}
/**
 * Lists the contents of directory.
 * @param args - [types.Str]
 * - args[0] {Str} The directory to examine.
 * @returns A Dict with details about each item in the directory.
 * @example (readdir "./path/to/file.txt")
 */
export function readir(...args) {
    types.assertArgumentCount(args.length, 1);
    types.assertStringNode(args[0]);
    const files = [];
    const [entries, errorCode] = os.readdir(args[0].value);
    if (+errorCode > 0) {
        throw new Error(`Error reading directory: ${errorCode}`);
    }
    for (const entry of entries) { // Last entry is the error code
        if (entry === '.' || entry === '..') {
            continue;
        }
        files.push(types.createStringNode(entry));
    }
    return types.createVectorNode(files);
}
/**
 * `slurp` Read a file and return the contents as a string.
 * @param args - [types.Str].
 * @returns Types.Str the contents of a file.
 * @throws An error when file doesn't exist or reading a directory.
 * @example (slurp "../tests/test.txt") ;=>"A line of text\n"
 */
export function slurp(...args) {
    types.assertArgumentCount(args.length, 1);
    const filePath = args[0];
    types.assertStringNode(filePath);
    const content = std.loadFile(filePath.value);
    if (content === null) {
        throw new Error(`No such file or directory. xxx`);
    }
    return types.createStringNode(content);
}
/**
 * `spit` Write text to a file.
 * @param args - [types.Str, types.Str]
 * - args[0] the path to a file
 * - args[1] contents to write to the file.
 * @returns Nil.
 * @throws An error when the operation fails.
 * @example (spit "../tests/test.txt")
 */
export function spit(...args) {
    types.assertArgumentCount(args.length, 2);
    const filePath = args[0];
    types.assertStringNode(filePath);
    const content = args[1];
    types.assertStringNode(content);
    writeToFile(content.value, filePath.value);
    return types.createNilNode();
}
export function displayPrompt(promptText = defaultPrompt) {
    std.out.puts(promptText);
    const input = std.in.getline()?.trim();
    console.log(input);
    console.log(promptText);
}
/**
 * Asynchronously reads lines from the standard input.
 *
 * @remarks
 * This function provides an asynchronous generator for reading user input line by line.
 * It maintains a history of inputs and handles interruptions gracefully.
 *
 * Why not use Deno's built-in `prompt` function? The node readline module provides much
 * more functionality, including history management, line editing, and more.
 *
 * @returns An asynchronous generator yielding user input lines.
 *
 * @example
 * ```typescript
 * for await (const line of readline()) {
 *   console.log(`Received: ${line}`);
 * }
 * ```
 */
export function* readline(promptText = defaultPrompt) {
    while (true) {
        std.out.puts(promptText);
        const input = std.in.getline()?.trim();
        if (!input) {
            continue;
        }
        yield input;
    }
}
/**
 * Serve the HTML shell for a SPA.
 * @param args
 * @returns types.NilNode
 */
// function serve(...args: types.AstNode[]): types.NilNode {
//   types.assertMinimumArgumentCount(args.length, 1);
//   types.assertDomNode(args[0]);
//   const body = printer.printHtml(args[0]);
//   const headers = { 'Content-Type': 'text/html' };
//   Deno.serve((_req) => new Response(body, { headers }));
//   return types.createNilNode();
// }
/**
 * Load a file into the REPL environment.
 * Duplicates: `(def! load-file (fn* (f) (eval (read-string (str "(do " (slurp f) "\nnil)")))))`
 * @param {[types.StringNode]} args - A path to a file. Will be converted to Posix.
 * @example
 * ```ensemble
 * (load-file "./path/to/file.ensmbl")
 * ```
 */
export function loadFileWithEnv(appEnv) {
    return function loadFile(...args) {
        types.assertArgumentCount(args.length, 1);
        types.assertStringNode(args[0]);
        const text = slurp(args[0]);
        types.assertStringNode(text);
        // Create a new environment for evaluating the loaded file
        const fileEnv = new env.Env(appEnv); //New Env based on appEnv
        const result = rep(`(do ${text.value})\nnil`, fileEnv);
        return types.createStringNode(result);
    };
}
export function initMain() {
    const replEnv = initEnv();
    const appImport = loadFileWithEnv(replEnv);
    const nsValues = [
        ['readFile', slurp],
        ['slurp', slurp],
        ['load-file', appImport],
        ['import', appImport],
        ['readln', readln],
        ['prompt', readln],
        ['readir', readir],
        ['spit', spit],
        ['writeFile', spit],
        // ['serve', serve],
    ];
    for (const [name, value] of nsValues) {
        replEnv.set(types.createSymbolNode(name), types.createFunctionNode(value));
    }
    return replEnv;
}
export function toPosixPath(filePath = '') {
    return filePath.replace(/\\/g, '/');
}
/**
 * Main program entry point.
 * @description Init the environment and register the readline event handlers.
 * If arguments are passed, the first one will be used as a filepath to a mal
 * program. Any additional arguments are loaded into the environment as *ARGV*.
 * @param args - [filepath: string, ...argv: any[]].
 * @example `deno run ./step0_repl.ts`
 */
export async function main(...args) {
    const replEnv = initMain();
    // Process the arguments
    const userScriptPath = toPosixPath(args[0]);
    const hostEnvArgs = args
        .slice(1)
        .map((arg) => types.createStringNode(arg));
    replEnv.set(types.createSymbolNode('*ARGV*'), types.createListNode(hostEnvArgs));
    replEnv.set(types.createSymbolNode('*host-language*'), types.createStringNode('Ensemble'));
    // Run a user program and exit
    if (userScriptPath) {
        rep(`(import "${userScriptPath}")`, replEnv);
        return;
    }
    // Show an interactive repl
    rep('(println (str "Welcome to " *host-language* "! Press Ctrl/Cmd+C to exit."))', replEnv);
    for await (const input of readline('user> ')) {
        if (input === '' || input === null) {
            continue;
        }
        try {
            const result = rep(input, replEnv);
            console.log(result);
        }
        catch (error) {
            if (types.isErrorNode(error)) {
                console.log(`error: ${printer.printString(error, false)}`);
            }
            else if (error instanceof Error) {
                console.log(error);
            }
        }
    }
}
