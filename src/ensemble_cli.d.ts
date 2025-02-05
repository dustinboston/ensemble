import { rep } from './ensemble.ts';
import * as env from './env.ts';
import * as types from './types.ts';
export { rep };
declare global {
    const std: any;
    const os: any;
    const scriptArgs: string[];
}
export declare function writeToFile(text: string, filePath: string): void;
/**
 * `readline` Exposes the readline function to read in user-code.
 * A handler must be registered to capture user input.
 * @description If readline is already running, only the prompt will change.
 * @param {[types.StringNode]} args - A prompt to display to the user.
 * @returns {types.NilNode|types.StringNode} - The user input or null.
 * @example (readline ">>> ")
 */
export declare function readln(...args: types.AstNode[]): types.AstNode;
/**
 * Lists the contents of directory.
 * @param args - [types.Str]
 * - args[0] {Str} The directory to examine.
 * @returns A Dict with details about each item in the directory.
 * @example (readdir "./path/to/file.txt")
 */
export declare function readir(...args: types.AstNode[]): types.AstNode;
/**
 * `slurp` Read a file and return the contents as a string.
 * @param args - [types.Str].
 * @returns Types.Str the contents of a file.
 * @throws An error when file doesn't exist or reading a directory.
 * @example (slurp "../tests/test.txt") ;=>"A line of text\n"
 */
export declare function slurp(...args: types.AstNode[]): types.AstNode;
/**
 * `spit` Write text to a file.
 * @param args - [types.Str, types.Str]
 * - args[0] the path to a file
 * - args[1] contents to write to the file.
 * @returns Nil.
 * @throws An error when the operation fails.
 * @example (spit "../tests/test.txt")
 */
export declare function spit(...args: types.AstNode[]): types.AstNode;
export declare function displayPrompt(promptText?: string): void;
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
export declare function readline(promptText?: string): Generator<string>;
/**
 * Serve the HTML shell for a SPA.
 * @param args
 * @returns types.NilNode
 */
/**
 * Load a file into the REPL environment.
 * Duplicates: `(def! load-file (fn* (f) (eval (read-string (str "(do " (slurp f) "\nnil)")))))`
 * @param {[types.StringNode]} args - A path to a file. Will be converted to Posix.
 * @example
 * ```ensemble
 * (load-file "./path/to/file.ensmbl")
 * ```
 */
export declare function loadFileWithEnv(appEnv: env.Env): (...args: types.AstNode[]) => types.AstNode;
export declare function initMain(): env.Env;
export declare function toPosixPath(filePath?: string): string;
/**
 * Main program entry point.
 * @description Init the environment and register the readline event handlers.
 * If arguments are passed, the first one will be used as a filepath to a mal
 * program. Any additional arguments are loaded into the environment as *ARGV*.
 * @param args - [filepath: string, ...argv: any[]].
 * @example `deno run ./step0_repl.ts`
 */
export declare function main(...args: string[]): Promise<void>;
