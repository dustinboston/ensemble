import { initEnv, rep } from '@/ensemble.ts';
import * as printer from '@/printer.ts';
import * as readline from '@/readline.ts';
import * as types from '@/types.ts';

export { rep };

/**
 * `readline` Exposes the readline function to read in user-code.
 * @description If readline is already running, only the prompt will change.
 * @param args - [types.Str] display prompt.
 * @returns Types.Nil - A handler must be registered to capture user input.
 * @see stepA_mal.ts
 * @example (readline "prompt$") ;=>
 */
export function readln(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const cmdPrompt = args[0];
  types.assertStringNode(cmdPrompt);

  const input = prompt(cmdPrompt.value);
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
export function readir(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);
  const files: types.MapNode[] = [];
  for (const entry of Deno.readDirSync(args[0].value)) {
    const map = types.toAst(entry);
    if (types.isMapNode(map)) {
      files.push(map);
    }
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
export function slurp(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const filePath = args[0];
  types.assertStringNode(filePath);

  const content = Deno.readTextFileSync(filePath.value);
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
export function spit(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const filePath = args[0];
  types.assertStringNode(filePath);
  const content = args[1];
  types.assertStringNode(content);

  const encoder = new TextEncoder();
  const data = encoder.encode(content.value);
  Deno.writeFileSync(filePath.value, data);
  return types.createNilNode();
}

/**
 * Serve the HTML shell for a SPA.
 * @param args
 * @returns types.NilNode
 */
export function serve(...args: types.AstNode[]): types.NilNode {
  types.assertMinimumArgumentCount(args.length, 1);
  types.assertDomNode(args[0]);
  const body = printer.printHtml(args[0]);
  const headers = { 'Content-Type': 'text/html' };

  Deno.serve((_req) => new Response(body, { headers }));
  return types.createNilNode();
}

export function initMain() {
  const replEnv = initEnv();

  replEnv.set(types.createSymbolNode('readln'), types.createFunctionNode(readln));
  replEnv.set(types.createSymbolNode('readir'), types.createFunctionNode(readir));
  replEnv.set(types.createSymbolNode('readFile'), types.createFunctionNode(slurp));
  replEnv.set(types.createSymbolNode('slurp'), types.createFunctionNode(slurp));
  replEnv.set(types.createSymbolNode('spit'), types.createFunctionNode(spit));
  replEnv.set(types.createSymbolNode('writeFile'), types.createFunctionNode(spit));
  replEnv.set(types.createSymbolNode('serve'), types.createFunctionNode(serve));

  rep(`(def! load-file (fn* (f) (eval (read-string (str "(do " (slurp f) "\nnil)")))))`, replEnv);

  return replEnv;
}

/**
 * Main program entry point.
 * @description Init the environment and register the readline event handlers.
 * If arguments are passed, the first one will be used as a filepath to a mal
 * program. Any additional arguments are loaded into the environment as *ARGV*.
 * @param args - [filepath: string, ...argv: any[]].
 * @example `deno run ./step0_repl.ts`
 */
export async function main(...args: string[]) {
  const replEnv = initMain();
  // Process the arguments
  const userScriptPath: string | undefined = args[0];
  const hostEnvArgs: types.StringNode[] = args
    .slice(1)
    .map((arg) => types.createStringNode(arg));

  replEnv.set(
    types.createSymbolNode('*ARGV*'),
    types.createListNode(hostEnvArgs),
  );

  replEnv.set(
    types.createSymbolNode('*host-language*'),
    types.createStringNode('ENSEMBLE'),
  );

  // Run a user program and exit
  if (userScriptPath) {
    rep(`(load-file "${userScriptPath}")`, replEnv);
    return;
  }

  // Show an interactive repl
  // rep('(println (str "Mal [" *host-language* "]"))', replEnv);

  for await (const input of readline.readline('user> ')) {
    if (input === '') {
      continue;
    }

    try {
      const result = rep(input, replEnv);
      console.log(result);
    } catch (error: unknown) {
      if (types.isErrorNode(error)) {
        console.error(`error: ${printer.printString(error, false)}`);
      } else if (error instanceof Error) {
        console.error(error);
      }
    }
  }
}

if (import.meta.main) {
  await main(...Deno.args);
}
