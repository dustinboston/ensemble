const defaultPrompt = 'user> ';

// export function prompt(promptText = defaultPrompt): void {
//   const rl = createInterface({
//     prompt: promptText,
//     input: stdin,
//     output: stdout,
//   });

//   rl.prompt(true);

//   const input = stdin;
//   console.log(input);
//   console.log(promptText);
// }

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
export function* readline(promptText = defaultPrompt): Generator<string> {
  while (true) {
    std.out.puts(promptText);
    const input = std.in.getline()?.trim();

    if (!input) {
      continue;
    }

    yield input;
  }
}
