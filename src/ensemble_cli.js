import { initEnv, rep } from "./ensemble.js";
import * as env from "./env.js";
import * as printer from "./printer.js";
import * as readline from "./readline_qjs.js";
import * as types from "./types.js";
export { rep };
/**
 * `readline` Exposes the readline function to read in user-code.
 * A handler must be registered to capture user input.
 * @description If readline is already running, only the prompt will change.
 * @param {[types.StringNode]} args - A prompt to display to the user.
 * @returns {types.NilNode|types.StringNode} - The user input or null.
 * @example (readline ">>> ")
 */
// function readln(...args: types.AstNode[]): types.AstNode {
//   types.assertArgumentCount(args.length, 1);
//   const cmdPrompt = args[0];
//   types.assertStringNode(cmdPrompt);
//   const input = prompt(cmdPrompt.value);
//   if (input === null || input === undefined) {
//     return types.createNilNode();
//   }
//   return types.createStringNode(input);
// }
/**
 * Lists the contents of directory.
 * @param args - [types.Str]
 * - args[0] {Str} The directory to examine.
 * @returns A Dict with details about each item in the directory.
 * @example (readdir "./path/to/file.txt")
 */
// function readir(...args: types.AstNode[]): types.AstNode {
//   types.assertArgumentCount(args.length, 1);
//   types.assertStringNode(args[0]);
//   const files: types.MapNode[] = [];
//   for (const entry of Deno.readDirSync(args[0].value)) {
//     const map = types.toAst(entry);
//     if (types.isMapNode(map)) {
//       files.push(map);
//     }
//   }
//   return types.createVectorNode(files);
// }
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
// function spit(...args: types.AstNode[]): types.AstNode {
//   types.assertArgumentCount(args.length, 2);
//   const filePath = args[0];
//   types.assertStringNode(filePath);
//   const content = args[1];
//   types.assertStringNode(content);
//   // const encoder = new TextEncoder();
//   // const data = encoder.encode(content.value);
//   // Deno.writeFileSync(filePath.value, data);
//   return types.createNilNode();
// }
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
        // ['readln', readln],
        // ['prompt', readln],
        // ['readir', readir],
        // ['spit', spit],
        // ['writeFile', spit],
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
    for await (const input of readline.readline('user> ')) {
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
main(...scriptArgs.slice(1));
