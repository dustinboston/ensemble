import * as fs from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { exit, stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
const userHomePath = homedir();
const historyPath = join(userHomePath, 'history');
const historySize = 2000;
const defaultPrompt = 'user> ';
export function prompt(promptText = defaultPrompt) {
    const rl = createInterface({
        prompt: promptText,
        input: stdin,
        output: stdout,
    });
    rl.prompt(true);
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
export async function* readline(promptText = defaultPrompt) {
    const history = await readHistory();
    const rl = createInterface({
        prompt: promptText,
        input: stdin,
        output: stdout,
        history,
        historySize,
    });
    rl.on('SIGINT', () => {
        rl.close();
        exit(0);
    });
    rl.prompt(true);
    for await (const input of rl) {
        yield input;
        rl.prompt(true);
        history.unshift(input);
        await saveHistory(input);
    }
}
/**
 * Reads and returns the command history from a file.
 *
 * @remarks
 * This function retrieves the command history to provide context for user input. It ensures that previous commands are available for reference and reuse.
 *
 * @returns A promise that resolves to an array of command history lines.
 *
 * @example
 * ```typescript
 * const history = await readHistory();
 * console.log(history); // Outputs an array of command history lines
 * ```
 */
async function readHistory() {
    await checkHistory();
    const data = await fs.readFile(historyPath, 'utf8');
    return data.split('\n').reverse();
}
/**
 * Saves a command to the command history file.
 *
 * @remarks
 * This function appends a given command to the history file to maintain a record of executed commands. It ensures that the command history is updated for future reference.
 *
 * @param command - The command to be saved to the history.
 * @returns A promise that resolves when the command has been successfully saved.
 *
 * @example
 * ```typescript
 * await saveHistory('ls -la');
 * console.log('Command saved to history');
 * ```
 */
async function saveHistory(command) {
    await checkHistory();
    await fs.appendFile(historyPath, command + '\n', 'utf8');
}
/**
 * Ensures the command history file and directory exist.
 *
 * @remarks
 * This function checks for the existence of the command history file and its directory, creating them if necessary. It guarantees that the history file is ready for reading and writing commands.
 *
 * @returns A promise that resolves when the history file and directory are confirmed to exist.
 *
 * @example
 * ```typescript
 * await checkHistory();
 * console.log('History file and directory are ready');
 * ```
 */
async function checkHistory() {
    try {
        await fs.mkdir(dirname(historyPath), {
            recursive: true,
        });
        await fs.access(historyPath);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(historyPath, '', 'utf8');
        }
    }
}
