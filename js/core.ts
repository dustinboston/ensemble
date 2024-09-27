/**
 * @file Provides all of the core functions for the language.
 */

import * as printer from './printer.ts';
import * as reader from './reader.ts';
import * as types from './types.ts';

const { readTextFileSync, writeFileSync, readDirSync } = Deno;

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

const nsValues: Array<[string, types.Closure]> = [
  ['=', eq],
  ['throw', throwError],
  ['nil?', isNil],
  ['true?', isTrue],
  ['false?', isFalse],
  ['symbol', symbol],
  ['Symbol.new', symbol],
  ['symbol?', isSymbolNode],
  ['keyword', keyword],
  ['keyword?', isKeyword],
  ['number?', isNumber],
  ['macro?', isMacro],

  // Input/Output
  ['pr-str', printEscapedString],
  ['str', printUnescapedString],
  ['prn', printEscapedStringToScreen],
  ['println', printUnescapedStringToScreen],
  ['console.log', printUnescapedStringToScreen],
  ['read-string', readString],
  ['readline', readln],
  ['readir', readir],
  ['slurp', slurp],
  ['readFile', slurp],
  ['spit', spit],
  ['writeFile', spit],

  // Strings
  ['string?', isString],
  ['trim', trim],

  // Operators
  ['<', lt],
  ['<=', lte],
  ['>', gt],
  ['>=', gte],
  ['+', add],
  ['-', subtract],
  ['*', multiply],
  ['/', divide],
  ['time-ms', timeMs],

  // Maps
  ['assoc', assoc],
  ['contains?', contains],
  ['dissoc', dissoc],
  ['get', get],
  ['hash-map', hashMap],
  ['keys', keys],
  ['map?', isMap],
  ['vals', vals],

  // We treat lists similar to functions
  ['list', list],
  ['list?', isListNode],
  ['apply', apply],
  ['fn?', isFn],

  // Arrays
  ['concat', concat],
  ['conj', conj],
  ['cons', cons],
  ['count', length],
  ['empty?', empty],
  ['first', firstNodeInList],
  ['join', join],
  ['map', applyToSequence],
  ['nth', nth],
  ['rest', rest],
  ['seq', seq],
  ['sequential?', isSequentialNode],
  ['vec', vec],
  ['vector', vector],
  ['vector?', isVector],

  ['meta', meta],
  ['with-meta', withMeta],
  ['atom', atom],
  ['atom?', isAtom],
  ['deref', deref],
  ['reset!', reset],
  ['swap!', swap],

  // JavaScript functions
  // ====================

  // Operators
  ['===', eq],
  ['!==', notEqualTo],
  ['??', nullishCoalesce],

  ['**', power],
  ['%', remainder],
  ['>>', rightShift],
  ['<<', leftShift],
  ['>>>', unsignedRightShift],
  ['/&', bitwiseAnd],
  ['/|', bitwiseOr],
  ['/^', bitwiseXor],
  ['/~', bitwiseNot],

  ['&&', and],
  ['||', or],
  ['!', not],

  ['++', increment],
  ['--', decrement],

  // JavScript control flow
  ['switch', switchCase],

  // Maps
  ['Map.entries', from],
  ['Map.get', get],
  ['Map.has', contains],
  ['Map.keys', keys],
  ['Map.new', hashMap],
  ['Map.remove', dissoc],
  ['Map.set', assoc],
  ['Map.size', length],
  ['Map.values', vals],

  // Arrays
  ['Array.at', nth],
  ['Array.concat', concat],
  ['Array.every', every],
  ['Array.filter', filter],
  ['Array.from', from],
  ['Array.includes', contains],
  ['Array.isArray', isVector],
  ['Array.join', join],
  ['Array.length', length],
  ['Array.map', applyToSequence],
  ['Array.new', vector],
  ['Array.push', conj],
  ['Array.reduce', reduce],
  ['Array.shift', firstNodeInList],
  ['Array.slice', slice],
  ['Array.some', some],
  ['Array.unshift', cons],

  // Strings
  ['String.includes', includes],
  ['String.trim', trim],

  // Math
  ['Math.abs', abs],
  ['Math.acos', acos],
  ['Math.acosh', acosh],
  ['Math.asin', asin],
  ['Math.asinh', asinh],
  ['Math.atan', atan],
  ['Math.atan2', atan2],
  ['Math.atanh', atanh],
  ['Math.cbrt', cbrt],
  ['Math.ceil', ceil],
  ['Math.clz32', clz32],
  ['Math.cos', cos],
  ['Math.cosh', cosh],
  ['Math.exp', exp],
  ['Math.expm1', expm1],
  ['Math.floor', floor],
  ['Math.fround', fround],
  ['Math.hypot', hypot],
  ['Math.imul', imul],
  ['Math.log', log],
  ['Math.log10', log10],
  ['Math.log1p', log1p],
  ['Math.log2', log2],
  ['Math.max', max],
  ['Math.min', min],
  ['Math.pow', pow],
  ['Math.random', random],
  ['Math.round', round],
  ['Math.sign', sign],
  ['Math.sin', sin],
  ['Math.sinh', sinh],
  ['Math.sqrt', sqrt],
  ['Math.tan', tan],
  ['Math.tanh', tanh],
  ['Math.trunc', trunc],

  // Math constants
  ['Math.E', getMathE],
  ['Math.LN10', getMathLn10],
  ['Math.LN2', getMathLn2],
  ['Math.LOG10E', getMathLog10e],
  ['Math.LOG2E', getMathLog2e],
  ['Math.PI', getMathPi],
  ['Math.SQRT1_2', getMathSqrt12],
  ['Math.SQRT2', getMathSqrt2],

  // Type checking
  ['typeOf', typeOf],
  ['instanceOf', instanceOf],
  ['js-eval', jsEval],

  // Backend
  ['serve', serve],

  // HTML

  ['a', tag('a')],
  ['abbr', tag('abbr')],
  ['address', tag('address')],
  ['area', tag('area')],
  ['article', tag('article')],
  ['aside', tag('aside')],
  ['audio', tag('audio')],
  ['b', tag('b')],
  ['base', tag('base')],
  ['bdi', tag('bdi')],
  ['bdo', tag('bdo')],
  ['blockquote', tag('blockquote')],
  ['body', tag('body')],
  ['br', tag('br')],
  ['button', tag('button')],
  ['canvas', tag('canvas')],
  ['caption', tag('caption')],
  ['cite', tag('cite')],
  ['code', tag('code')],
  ['col', tag('col')],
  ['colgroup', tag('colgroup')],
  ['data', tag('data')],
  ['datalist', tag('datalist')],
  ['dd', tag('dd')],
  ['del', tag('del')],
  ['details', tag('details')],
  ['dfn', tag('dfn')],
  ['dialog', tag('dialog')],
  ['div', tag('div')],
  ['dl', tag('dl')],
  ['!doctype', tag('!doctype')],
  ['dt', tag('dt')],
  ['em', tag('em')],
  ['embed', tag('embed')],
  ['fieldset', tag('fieldset')],
  ['figcaption', tag('figcaption')],
  ['figure', tag('figure')],
  ['footer', tag('footer')],
  ['form', tag('form')],
  ['h1', tag('h1')],
  ['h2', tag('h2')],
  ['h3', tag('h3')],
  ['h4', tag('h4')],
  ['h5', tag('h5')],
  ['h6', tag('h6')],
  ['head', tag('head')],
  ['header', tag('header')],
  ['hgroup', tag('hgroup')],
  ['hr', tag('hr')],
  ['html', tag('html')],
  ['i', tag('i')],
  ['iframe', tag('iframe')],
  ['img', tag('img')],
  ['imgmap', tag('imgmap')], // Renamed from map to avoid conflict with core map function
  ['input', tag('input')],
  ['kbd', tag('kbd')],
  ['label', tag('label')],
  ['legend', tag('legend')],
  ['li', tag('li')],
  ['link', tag('link')],
  ['main', tag('main')],
  ['mark', tag('mark')],
  ['menu', tag('menu')],
  ['meter', tag('meter')],
  ['nav', tag('nav')],
  ['noscript', tag('noscript')],
  ['object', tag('object')],
  ['ol', tag('ol')],
  ['optgroup', tag('optgroup')],
  ['option', tag('option')],
  ['output', tag('output')],
  ['p', tag('p')],
  ['picture', tag('picture')],
  ['pre', tag('pre')],
  ['portal', tag('portal')],
  ['progress', tag('progress')],
  ['q', tag('q')],
  ['rp', tag('rp')],
  ['rt', tag('rt')],
  ['ruby', tag('ruby')],
  ['s', tag('s')],
  ['samp', tag('samp')],
  ['script', tag('script')],
  ['search', tag('search')],
  ['section', tag('section')],
  ['select', tag('select')],
  ['slot', tag('slot')],
  ['small', tag('small')],
  ['source', tag('source')],
  ['span', tag('span')],
  ['strong', tag('strong')],
  ['style', tag('style')],
  ['sub', tag('sub')],
  ['summary', tag('summary')],
  ['sup', tag('sup')],
  ['table', tag('table')],
  ['tbody', tag('tbody')],
  ['td', tag('td')],
  ['template', tag('template')],
  ['textarea', tag('textarea')],
  ['tfoot', tag('tfoot')],
  ['th', tag('th')],
  ['thead', tag('thead')],
  ['time', tag('time')],
  ['title', tag('title')],
  ['tr', tag('tr')],
  ['track', tag('track')],
  ['u', tag('u')],
  ['ul', tag('ul')],
  ['var', tag('var')],
  ['video', tag('video')],
  ['wbr', tag('wbr')],

  // DOM
  ['document.querySelector', querySelector],
];

for (const [sym, fn] of nsValues) {
  ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
}

/**
 * Dangerously evaluates a javascript expression with Function.
 * @param args - The expression to evaluate.
 * @returns Result of the evaluated expression or an Err.
 * @example (js-eval "console.log('give me a donut');")
 */
export function jsEval(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);
  try {
    // eslint-disable-next-line no-new-func
    const result: unknown = new Function(
      `'use strict'; return (${args[0].value})`,
    )();
    return types.toAst(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return types.createErrorNode(types.createStringNode(error.message));
    }

    return types.createErrorNode(types.createStringNode(JSON.stringify(error)));
  }
}

/**
 * `=` determines if two AST nodes are equal by comparing them using the
 * `isEqualTo` method.
 * @param args - An array with two Ast nodes to be compared.
 * @returns - A Bool node representing whether the two AST nodes are equal.
 * @throws Will throw an error if the number of arguments is not exactly two.
 * @see types.isEqualTo()
 * @example
 * ```typescript
 * eq(
 *   makeList([makeNum(1), makeNum(2), makeNum(3)]),
 *   makeList([makeNum(1), makeNum(2), makeNum(3)])
 * );
 * //=> returns types.Bool with true value
 * ```
 */
export function eq(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  return types.isEqualTo(args[0], args[1]);
}

/**
 * `pr-str` converts nodes to escaped strings and returns the result.
 *
 * This function takes multiple arguments of type Ast, converts each to a
 * string, ensuring characters are escaped properly, then joins these strings
 * with a space separator, and returns the entire concatenated string as a Str.
 * @param args - The AST nodes to be converted to strings.
 * @returns The concatenated string result, with args separated by a space.
 * @see printer.printString - The function used for converting AST nodes
 * to strings.
 * @example
 * // Mal language usage
 * (pr-str "abc\ndef\nghi") ;=> "\"abc\\ndef\\nghi\""
 */
export function printEscapedString(...args: types.AstNode[]): types.AstNode {
  const result = args.map((arg) => printer.printString(arg, true)).join(' ');
  return types.createStringNode(result);
}

/**
 * `str` converts nodes to strings as-is and prints the result.
 * @description Calls printString on each argument with printReadably set \
 * to false, concatenates the results together, and returns the new string.
 * @param args - Types.Ast[].
 * @returns Types.Str.
 * @example (str "abc\ndef\nghi") ;=> "abc\ndef\nghi"
 */
export function printUnescapedString(...args: types.AstNode[]): types.AstNode {
  const result = args.map((arg) => printer.printString(arg, false)).join('');
  return types.createStringNode(result);
}

/**
 * `prn` converts nodes to escaped strings, prints the result & returns nil;.
 * @description Calls printString on each argument with printReadably set \
 * to true and joins the results with a space. Then it prints the string to \
 * the screen and returns nil.
 * @param args - Types.Ast[].
 * @returns Types.Nil.
 * @example
 * ```mal
 * (prn "abc\ndef\nghi")
 * ;/"abc\\ndef\\nghi"
 * ;=>nil
 * ```
 */
export function printEscapedStringToScreen(
  ...args: types.AstNode[]
): types.AstNode {
  const result = args.map((arg) => printer.printString(arg, true)).join(' ');
  console.log(result);
  return types.createNilNode();
}

/**
 * `println` converts nodes strings as-is, prints the result and returns nil.
 * @description Calls printString on each argument with printReadably set \
 * to false and joins the results with a space. Then it prints the string to \
 * the screen and returns nil.
 * @param args - The ast nodes to be printed.
 * @returns The stringified Ast.
 * @example
 * ```mal
 * (println "abc\ndef\nghi")
 * ;/abc
 * ;/def
 * ;/ghi
 * ;=>nil
 * @param args types.Ast[]
 * @returns types.Nil
 */
export function printUnescapedStringToScreen(
  ...args: types.AstNode[]
): types.AstNode {
  const result = args.map((arg) => printer.printString(arg, false)).join(' ');
  console.log(result);
  return types.createNilNode();
}

/**
 * `read-string` Exposes the readString function to read in user-code.
 * @param args - [types.Str].
 * @returns Types.Ast.
 * @example (read-string "(+ 2 3)") ;=>(+ 2 3)
 */
export function readString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const code = args[0];
  types.assertStringNode(code);
  return reader.readString(code.value);
}

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
  for (const entry of readDirSync(args[0].value)) {
    const map = new Map<string, types.AstNode>();
    map.set(':file', types.createBooleanNode(entry.isFile));
    map.set(':directory', types.createBooleanNode(entry.isDirectory));
    map.set(':symlink', types.createBooleanNode(entry.isSymlink));
    map.set(':name', types.createStringNode(entry.name));

    const firstDotIndex = entry.name.indexOf('.');
    const slug = entry.name.slice(0, firstDotIndex);
    const ext = entry.name.slice(firstDotIndex + 1);

    map.set(':slug', types.createStringNode(slug));
    map.set(':ext', types.createStringNode(ext));
    files.push(types.createMapNode(map));
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

  const content = readTextFileSync(filePath.value);
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
  writeFileSync(filePath.value, data);
  return types.createNilNode();
}

export function serve(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);
  types.assertDomNode(args[0]);
  // args[1] is null (like EOF)
  Deno.serve((_req) =>
    new Response(printer.printHtml(args[0]), {
      headers: { 'Content-Type': 'text/html' },
    })
  );
  return types.createNilNode();
}

/**
 * Trims whitespace from the start and end of a string.
 * @param args - An array containing the string to trim as the first element.
 * @returns A new string with whitespace trimmed from the start and end.
 * @example (trim "  space  ") ;=>"space"
 */
export function trim(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const string_ = args[0];
  types.assertStringNode(string_);
  return types.createStringNode(string_.value.trim());
}

/**
 * `<` Checks if "a" is less than "b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (< (2 1)) ;=>true
 */
export function lt(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createBooleanNode(a.value < b.value);
}

/**
 * `<=` Checks if "a" is less than or equal to "b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (<= (2 1)) ;=>false
 */
export function lte(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createBooleanNode(a.value <= b.value);
}

/**
 * `>` Checks if "a" is greater than "b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (> (2 1)) ;=>true
 */
export function gt(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createBooleanNode(a.value > b.value);
}

/**
 * `>=` Checks if "a" is greater than or equal to"b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (>= (2 1)) ;=>true
 */
export function gte(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createBooleanNode(a.value >= b.value);
}

/**
 * `+` Add two numbers and return the sum.
 * @param args - The two numbers to add.
 * @returns The sum of both numbers.
 * @example (+ 2 1) ;=>3
 */
export function add(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createNumberNode(a.value + b.value);
}

/**
 * `-` Subtract two numbers and return the difference.
 * @param args - The two numbers to subtract.
 * @returns The difference between the two numbers.
 * @example (- 2 1) ;=>1
 */
export function subtract(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createNumberNode(a.value - b.value);
}

/**
 * `*` Multiply two numbers and return the product.
 * @param args - The two numbers to be multiplied.
 * @returns The product of multiplying the numbers.
 * @example (* 2 1) ;=>2
 */
export function multiply(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createNumberNode(a.value * b.value);
}

/**
 * `/` Divide two numbers and return the quotient.
 * @param args - The two numbers to divide.
 * @returns The quotient.
 * @example (/ 2 1) ;=>1
 */
export function divide(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const a = args[0];
  types.assertNumberNode(a);
  const b = args[1];
  types.assertNumberNode(b);
  return types.createNumberNode(a.value / b.value);
}

/**
 * `time-ms` Return a unix timestamp.
 * @param args - No arguments should be specified.
 * @returns A high-resolution timestamp (requires --allow-hrtime).
 * @example (time-ms) ;=> 1689952214357
 */
export function timeMs(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 0);
  return types.createNumberNode(performance.timeOrigin + performance.now());
}

/**
 * `list` Takes N args and returns them as a list.
 * @param args - N Ast values to add to a list.
 * @returns A list populated with the arguments.
 * @example (list 2 1) ;=>(2 1)
 */
export function list(...args: types.AstNode[]): types.AstNode {
  for (const arg of args) {
    types.assertAstNode(arg);
  }

  return types.createListNode(args);
}

/**
 * `list?` Determine if an types.Ast node is a types.List.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (list? (2 1)) ;=>true
 */
export function isListNode(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isListNode(args[0]));
}

/**
 * `cons` prepend a value to the front of a list.
 * @param args - [types.Ast, types.List].
 * @returns Types.List.
 * @example (cons foo (1 2 3)) ;=> (foo 1 2 3)
 */
export function cons(...args: types.AstNode[]): types.ListNode {
  types.assertArgumentCount(args.length, 2);
  types.assertSequential(args[1]);
  return types.createListNode([args[0], ...args[1].value]);
}

/**
 * `concat` concatenates multiple sequences (lists or vectors) into one list.
 * @param args - The sequences to concatenate. Each argument
 * should be a list or a vector.
 * @returns A new list containing all elements from the input
 * sequences, in the order they appear in the input.
 * @throws Will throw an error if any of the input arguments is not a sequence.
 * @example
 * (concat (list 1 2 3) (list 4 5 6)) ;=> (1 2 3 4 5 6)
 */
export function concat(...args: types.AstNode[]): types.AstNode {
  const resultList = [];

  for (const arg of args) {
    types.assertSequential(arg);
    resultList.push(...arg.value);
  }

  return types.createListNode(resultList);
}

/**
 * `vec` turn a list into a vector.
 * @description Returns a Vec if the arg is a types.List, else original node.
 * @param args - [types.List].
 * @returns Types.Vec | types.Ast.
 * @example (vec (1 2 3)) ;=> [1 2 3]
 */
export function vec(...args: types.AstNode[]): types.AstNode {
  return types.isListNode(args[0]) ? types.createVectorNode(args[0].value) : args[0];
}

/**
 * `nth` returns the nth item from a list.
 * @param args - [Seq, types.Num].
 * @returns Types.Ast.
 * @throws If there are not enough arguments.
 * @example (nth (a b c) 0) ;=> a
 */
export function nth(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  if (
    types.isSequentialNode(args[0]) &&
    types.isNumberNode(args[1])
  ) {
    const index = args[1].value;
    const list = args[0];
    const length = args[0].value.length;
    if (length > 0 && index < length) {
      const value: types.AstNode = list.value[index];
      return value;
    }
  }

  throw new Error('out of range');
}

/**
 * `first` gets the first item of a list.
 * @description Returns types.Ast else types.Nil if the list is empty.
 * @param args - [types.List].
 * @returns Types.Ast | types.Nil.
 * @example (first (+ 2 4) ;=> +
 */
export function firstNodeInList(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  if (types.isSequentialNode(args[0]) && args[0].value.length > 0) {
    return args[0].value[0];
  }

  return types.createNilNode();
}

/**
 * `rest` returns a new list excluding the first element of the list passed.
 * @description If the argument passed does not have at least one item
 * an error will be thrown. If the list only has one item (presumably a fn),
 * an empty list will be returned.
 * @param args - A spread of `types.Ast[]` arguments where the first argument is
 * expected to be a sequential type (like a list).
 * @returns A new list excluding the first element of the first argument, or an
 * empty list if there is only one item in the original list.
 * @throws When there isn't at least one argument passed in.
 * ```mal
 * (rest (+ 2 3 4)) ;=> (2 3 4)
 * ```
 */
export function rest(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  if (types.isSequentialNode(args[0])) {
    return types.createListNode(args[0].value.slice(1));
  }

  return types.createListNode([]);
}

/**
 * `slice` returns a new list containing a portion of the first argument.
 * @description This function slices the first argument (expected to be a sequential type)
 * from the specified `start` index to the optional `end` index. If no `start` is provided, it defaults to 0.
 * If the argument passed does not have at least one item, an error will be thrown.
 * If the list is empty, an empty list will be returned.
 * @param args - A spread of `types.Ast[]` arguments
 * @param args.0 - The vector to slice.
 * @param args.1 - Optional `start` value, defaults to 0
 * @param args.2 - Optional `end`, defaults to the length of the list, can be negative
 * @returns A new list containing the sliced portion of the first argument.
 * @throws When there isn't at least one argument passed in.
 * ```mal
 * (slice (+ 2 3 4) 1 3) ;=> (3 4)
 * ```
 */
export function slice(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 3);
  types.assertVectorNode(args[0]);

  let start = 0;
  if (args[1] !== undefined) {
    types.assertNumberNode(args[1]);
    start = args[1].value;
  }

  let end = args[0].value.length;
  if (args[2] !== undefined) {
    types.assertNumberNode(args[2]);
    end = args[2].value;
  }

  return types.createVectorNode(args[0].value.slice(start, end));
}

/**
 * `empty?` Determine if a types.List or types.Vec is empty.
 * @param args - [Seq].
 * @returns Types.Bool.
 * @example (empty? ()) ;=>true
 */
export function empty(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);

  const list = args[0];
  types.assertSequential(list);

  return types.createBooleanNode(list.value.length === 0);
}

/**
 * `count` Counts the number of values in a Seq node.
 * @param args - [Seq].
 * @returns Types.Num.
 * @example (count (1 2 3)) ;=> 3
 */
export function length(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);

  const value = args[0];
  if (types.isNilNode(value)) {
    return types.createNumberNode(0);
  }

  if (types.isMapNode(args[0])) {
    return types.createNumberNode(args[0].value.size);
  } else if (types.isSequentialNode(args[0])) {
    return types.createNumberNode(args[0].value.length);
  } else {
    throw new TypeError('Invalid argument type');
  }
}

/**
 * `atom` Create an types.Atom that "points" to the given node.
 * @param args - [types.Ast].
 * @returns Types.Atom - An types.Atom with the referenced node.
 * @example (def! a (atom 2)) ;=>(atom 2)
 */
export function atom(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const value = args[0];
  return types.createAtomNode(value);
}

/**
 * `atom?` Tests whether an node is an node of types.Atom.
 * @param args - [types.Ast].
 * @returns Types.Bool - indicating whether the the node is an types.Atom.
 * @example (atom? a) ;=> true
 */
export function isAtom(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const node = args[0];
  return types.createBooleanNode(types.isAtomNode(node));
}

/**
 * `deref` Returns the types.Ast node referenced in an types.Atom.
 * @param args - [types.Atom].
 * @returns Types.Ast.
 * @example (deref a) ;=> 2
 */
export function deref(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const atom = args[0];
  types.assertAtomNode(atom);

  // TODO: Coerce JS values into AstNodes?
  // if (atom.value instanceof types.AstNode === false) {
  // 	return types.toAst(atom.value);
  // }

  return atom.value;
}

/**
 * `reset!` Set an Atoms' value to the given node.
 * @param args - [types.Atom, types.Ast].
 * @returns Types.Atom - The types.Atom with a new value.
 * @example (reset! a 3) ;=>3
 */
export function reset(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const atom = args[0];
  const node = args[1];
  types.assertAtomNode(atom);

  atom.value = node;
  return node;
}

/**
 * `swap` Swap an Atoms' value with the result of the function.
 * @description The function is called with the Atoms' value as the first \
 * argument, and any specified optional parameters after.
 * @param args - [types.Atom, types.Func, ...types.Ast[]]
 * - args[0]: types.Atom - the node that will have its value swapped
 * - args[1]: types.Func  - a function that returns an types.Ast node
 * - ...rest: types.Ast[]  - additional parameters to the function.
 * @returns Types.Ast - The Atoms' new value.
 * @example (swap! a (fn* (a) (* 2 a))) ;=>12
 */
export function swap(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 2);

  const atom = args[0];
  types.assertAtomNode(atom);

  const fn = args[1];
  types.assertFunctionNode(fn);

  const rest = args.slice(2);

  // TODO: Coerce JS values into AstNodes?
  // let value: types.AstNode;
  // if (atom.value instanceof types.AstNode) {
  // 	value = atom.value;
  // } else {
  // 	value = types.toAst(atom.value);
  // }
  // atom.value = fn.value(value, ...rest);
  // return value;

  atom.value = fn.value(atom.value, ...rest);
  return atom.value;
}

/**
 * `throw` throws an types.Err object.
 * @param args - [types.Ast].
 * @throws Types.Err.
 * @example (throw "foo") ;/"foo"
 */
export function throwError(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertAstNode(args[0]);
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw types.createErrorNode(args[0]);
}

/**
 * `apply` call a function with arguments in a list.
 * @description Calls types.Func with Seq. Concatenates types.Ast[] to Seq.
 * @param args - [types.Func, ...types.Ast[]?, Seq].
 * @returns Types.Ast.
 * @example (apply + (list 2 3)) ;=> 5
 */
export function apply(...args: types.AstNode[]): types.AstNode {
  const count = args.length;
  types.assertMinimumArgumentCount(count, 2);
  types.assertFunctionNode(args[0]);

  const lastList = args[count - 1];
  types.assertSequential(lastList);

  return args[0].value(...args.slice(1, -1), ...lastList.value);
}

/**
 * `map` call a function against each item in a list.
 * @param args - [types.Func, Seq].
 * @returns Types.List.
 * @example (map double (1 2 3)) ;=> (2 4 6)
 */
export function applyToSequence(...args: types.AstNode[]): types.AstNode {
  const count = args.length;
  types.assertArgumentCount(count, 2);
  types.assertFunctionNode(args[0]);
  types.assertSequential(args[1]);

  const fn = args[0];
  const list = args[1];
  const result = list.value.map((item) => fn.value(item));
  return types.createListNode(result);
}

/**
 * `every` checks if a predicate function returns true for every element in a vector.
 * @todo Write tests
 * @param args - [types.Func, Vec].
 * @returns Types.Boolean.
 * @example (every isEven [2, 4, 6]) ;=> true
 * @example (every isEven [2, 3, 6]) ;=> false
 */
export function every(...args: types.AstNode[]): types.AstNode {
  const count = args.length;
  types.assertArgumentCount(count, 2);
  types.assertFunctionNode(args[0]);
  types.assertVectorNode(args[1]);

  const fn = args[0];
  const vec = args[1];
  const result = vec.value.every((item) => fn.value(item));
  return types.createBooleanNode(result);
}

/**
 * `some` checks if a predicate function returns true for at least one element in a vector.
 * @todo Write tests
 * @param args - [types.Func, Vec].
 * @returns Types.Boolean.
 * @example (some isEven [1, 3, 4]) ;=> true
 * @example (some isEven [1, 3, 5]) ;=> false
 */
export function some(...args: types.AstNode[]): types.AstNode {
  const count = args.length;
  types.assertArgumentCount(count, 2);
  types.assertFunctionNode(args[0]);
  types.assertVectorNode(args[1]);

  const fn = args[0];
  const vec = args[1];
  const result = vec.value.some((item) => fn.value(item));
  return types.createBooleanNode(result);
}

/**
 * `conj` conjoins elements to a sequence.
 * @description
 * If the first argument is a List, it will prepend the remaining arguments
 * in reverse order to the List value. If it is a Vec, it will append
 * the arguments in order.
 * @param args - The first argument should be a sequence (either a List or
 * Vec), followed by a variadic list of elements to be conjoined to the
 * sequence.
 * @returns
 * Returns a new sequence with the elements conjoined. The type of the output
 * sequence matches the type of the input sequence.
 * @throws
 * Will throw an error if fewer than two arguments are passed or if the first
 * argument is not a sequence.
 * @example
 * (conj [1, 2, 3] 4 5)
 * //=> [1, 2, 3, 4, 5]
 * @example
 * (conj (list 1, 2, 3) 4 5)
 * //=> (5, 4, 1, 2, 3)
 */
export function conj(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 2);
  types.assertSequential(args[0]);
  const [seq, ...rest] = args;

  if (types.isListNode(seq)) {
    return types.createListNode([...rest.reverse(), ...seq.value]);
  }

  // Explicitly state that seq is a Vec here, to preserve type information
  return types.createVectorNode([...args[0].value, ...rest]);
}

/**
 * `seq`
 * Converts a vec to list, and string to a list of chars.
 * @param args - [types.List|types.Vec|types.Str|types.Nil].
 * @returns Types.List|types.Nil.
 * @example (seq (list 1 2 3)) ;=> (1 2 3)
 * @example (seq [1 2 3]) ;=> (1 2 3)
 * @example (seq "foo") ;=> ("f" "o" "o")
 * @example (seq nil) ;=> nil
 * @example (seq ()) ;=> nil
 * @example (seq []) ;=> nil
 */
export function seq(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const ast = args[0];
  if (types.isListNode(ast) && ast.value.length > 0) {
    return ast;
  }

  if (types.isVectorNode(ast) && ast.value.length > 0) {
    return types.createListNode([...ast.value]);
  }

  if (types.isStringNode(ast) && ast.value.length > 0) {
    return types.createListNode(
      ast.value.split('').map((char) => types.createStringNode(char)),
    );
  }

  return types.createNilNode();
}

/**
 * `from`
 * Converts a list, vector, or string into a vector of elements or characters.
 * @todo Add test for map to vector conversion.
 * @param args - [types.List|types.Vec|types.Str|types.Nil].
 * @returns Types.Vector|types.Nil.
 * @example (seq (list 1 2 3)) ;=> [1 2 3]
 * @example (seq [1 2 3]) ;=> [1 2 3]
 * @example (seq "foo") ;=> ["f" "o" "o"]
 * @example (seq nil) ;=> nil
 * @example (seq ()) ;=> nil
 * @example (seq []) ;=> nil
 */
export function from(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const ast = args[0];

  // Return the same value for ListNode, but in a VectorNode format
  if (types.isListNode(ast)) {
    if (ast.value.length > 0) {
      return types.createVectorNode([...ast.value]);
    }
  }

  // Convert VectorNode to a createVectorNode (like Array.from)
  if (types.isVectorNode(ast) && ast.value.length > 0) {
    return types.createVectorNode([...ast.value]);
  }

  // Convert StringNode to a vector of characters (Array.from behavior)
  if (types.isStringNode(ast) && ast.value.length > 0) {
    return types.createVectorNode(
      ast.value.split('').map((char) => types.createStringNode(char)),
    );
  }

  if (types.isMapNode(ast) && ast.value.size > 0) {
    const entries = Array.from<[string, types.AstNode]>(ast.value.entries()).map(([k, v]) => types.createVectorNode([types.createStringNode(k), v]));
    return types.createVectorNode(entries);
  }

  // Return NilNode if input is empty or doesn't match other types
  return types.createNilNode();
}

/**
 * `meta`
 * Returns the value of the metadata element.
 * @param args - [MetadataTypes].
 * @returns Types.Ast.
 * @example (meta (with-meta (fn* (a) a) {"b" 1})) ;=> {"b" 1}
 */
export function meta(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMetadataType(args[0]);
  return args[0].metadata;
}

/**
 * `with-meta`
 * Sets the metadata value of the first argument to the second argument.
 * @param args - [MetadataTypes, types.Ast].
 * @returns MetadataTypes.
 * @example (with-meta (fn* (a) a) {"b" 1})
 */
export function withMeta(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertMetadataType(args[0]);
  types.assertAstNode(args[1]);

  const copy = types.copy(args[0]) as types.MetadataTypes;
  copy.metadata = args[1];
  return copy;
}

/**
 * `nil?` determines if a node is types.Nil.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (nil? nil) ;=> true
 */
export function isNil(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isNilNode(args[0]));
}

/**
 * `true?` determines if a node is types.Bool(true).
 * @param args - [types.Bool].
 * @returns Types.Bool.
 * @example (true? true) ;=> true
 */
export function isTrue(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(
    types.isBooleanNode(args[0]) && args[0].value,
  );
}

/**
 * `false?` determines if a node is types.Bool(false).
 * @param args - [types.Bool].
 * @returns Types.Bool.
 * @example (false? false) ;=> true
 */
export function isFalse(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(
    types.isBooleanNode(args[0]) && !args[0].value,
  );
}

/**
 * `string?` determines if a node is a types.Str/string.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (string? "foobar") ;=> true
 */
export function isString(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isStringNode(args[0]));
}

/**
 * `symbol` Creates a new types.Sym with the value of a types.Str.
 * @param args - [types.Str].
 * @returns Types.Sym.
 * @example (symbol 'abc) ;=> true
 */
export function symbol(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);
  return types.createSymbolNode(args[0].value);
}

/**
 * `symbol?` determines if a node is a symbol.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (symbol? :abc) ;=> false
 * @example (symbol? 'abc) ;=> true
 * @example (symbol? "abc") ;=> false
 * @example (symbol? (symbol "abc")) ;=> true
 */
export function isSymbolNode(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isSymbolNode(args[0]));
}

/**
 * `keyword` creates a new types.Key with the value of a types.Str.
 * @param args - [types.DictKeys].
 * @returns Types.Key.
 * @example (keyword "pie") ;=> :pie
 */
export function keyword(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMapKeyNode(args[0]);

  const key = args[0];
  if (types.isKeywordNode(key)) {
    return key;
  }

  const string_ = args[0];
  return types.createKeywordNode(`:${string_.value}`);
}

/**
 * `keyword?` determines if a node is a keyword.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (keyword? :abc) ;=> true
 * @example (keyword? 'abc) ;=> false
 * @example (keyword? "abc") ;=> false
 * @example (keyword? (keyword "abc")) ;=> true
 */
export function isKeyword(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isKeywordNode(args[0]));
}

/**
 * `number?` determines if a node is a number.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (number? 2) ;=> true
 */
export function isNumber(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isNumberNode(args[0]));
}

/**
 * `fn?` determines if a node is a function.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (fn? (fn* )) ;=> true
 */
export function isFn(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(
    types.isFunctionNode(args[0]) && !args[0].isMacro,
  );
}

/**
 * `macro?` determines if a node is a macro.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (macro? ) ;=> true
 */
export function isMacro(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(
    types.isFunctionNode(args[0]) ? args[0].isMacro : false,
  );
}

/**
 * `vector` Creates a vector from an arbitrary number of types.Ast args.
 * @param args - Types.Ast[].
 * @returns Types.Vec.
 * @example (vector 1 2 3 4) ;=> [1 2 3 4]
 */
export function vector(...args: types.AstNode[]): types.AstNode {
  return types.createVectorNode(args);
}

/**
 * `vector?` Determines if a node is a types.Vec.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (vector? [1 2 3]) ;=> true
 */
export function isVector(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isVectorNode(args[0]));
}

/**
 * `hash-map` Create a types.Dict from alternating DictKey/types.Ast args.
 * @param args - (DictKey|types.Ast)[].
 * @returns Types.Dict.
 * @example (hash-map "foo" 1 "bar" 2) ;=> {"foo" 1 "bar" 2}
 */
export function hashMap(...args: types.AstNode[]): types.MapNode {
  if (args.length === 0) {
    return types.createMapNode();
  }

  types.assertEvenArgumentCount(args.length);

  const dict = types.createMapNode();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    types.assertMapKeyNode(key);
    types.setMapElement(dict.value, key, args[i + 1]);
  }

  return dict;
}

/**
 * `isMap` determine if a node is a types.Dict.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (map? {:foo 1 :bar 2}) ;=> true
 */
export function isMap(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isMapNode(args[0]));
}

/**
 * `assoc` Merge key/value pairs into a types.Dict (associate).
 * @param args - [types.Dict, ...(DictKey|types.Ast)[]].
 * @returns Types.Dict.
 * @example (assoc {} 'foo 1 'bar 2) ;=> {'foo 1 'bar 2}
 */
export function assoc(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);
  const rest = args.slice(1);

  // Clone the map from the incoming types.Dict
  const dict = types.createMapNode(
    new Map<string, types.AstNode>(args[0].value),
  );
  const pairs = hashMap(...rest);
  for (const [key, value] of pairs.value.entries()) {
    dict.value.set(key, value);
  }

  return dict;
}

/**
 * `dissoc` remove elements from a dict (disassociate).
 * @param args - [types.Dict, DictKey].
 * @returns Types.Dict.
 * @example ({:foo 1 :bar 2}, :foo) ;=> {:bar 2}
 */
export function dissoc(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);

  const dict = types.createMapNode(
    new Map<string, types.AstNode>(args[0].value),
  );
  for (const dictKey of args.splice(1)) {
    types.assertMapKeyNode(dictKey);
    types.deleteMapElement(dict.value, dictKey);
  }

  return dict;
}

/**
 * `get` get a value from a MapNode by key.
 * @param args - [mapNode: MapNode, key: StringNode]
 * @returns Types.Ast | types.Nil.
 * @example (get {:foo 1 :bar 2} :bar) ;=> 2
 */
export function get(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);

  const mapNode = args[0];
  if (!(types.isMapNode(mapNode))) {
    return types.createNilNode();
  }

  const key = args[1];
  types.assertMapKeyNode(key);

  const value = types.getMapElement(mapNode.value, key);
  if (value !== undefined) {
    return value;
  }

  return types.createNilNode();
}

/**
 * `contains?` determines whether the given key exists in the map or array.
 * @param args - [types.Dict, DictKey].
 * @returns Types.Bool.
 * @example (contains? {:foo 1 :bar 2} :bar) ;=> true
 */
export function contains(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const dict = args[0];
  const key = args[1];
  types.assertMapNode(dict);
  types.assertMapKeyNode(key);

  return types.createBooleanNode(types.hasMapElement(dict.value, key));
}

/**
 * `keys` gets a list of all of the keys in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (keys {:foo 1 :bar 2}) ;=> (:foo :bar)
 */
export function keys(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);
  return types.getMapKeys(args[0].value);
}

/**
 * `vals` gets a list of all of the values in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (vals {:foo 1 :bar 2}) ;=> (1 2)
 */
export function vals(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);
  return types.createListNode([...args[0].value.values()]);
}

/**
 * `sequential?` Determines if a node is a types.List or types.Vec.
 * @param args - Arguments to the function.
 * @param args."0" - The node to check.
 * @returns True if the Ast is a List or Vec.
 * @example (sequential? [1 2 3])
 */
export function isSequentialNode(...args: types.AstNode[]): types.AstNode {
  return types.createBooleanNode(types.isSequentialNode(args[0]));
}

/**
 * `join` - * Join elements of a vec or list with a separator.
 * @param args - [types.Vec|types.List,types.Str|undefined]
 * - args[0] the vec or list to join
 * - args[1] the delimiter to join elements with.
 * @returns The result of joining the elements.
 * @example (join [1 2 3] '#') ;=> 1#2#3
 */
export function join(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 2);
  types.assertSequential(args[0]);
  const delim = types.isStringNode(args[1]) ? args[1].value : ' ';
  const joined = args[0].value
    .map((ast) => printer.printString(ast, false))
    .join(delim);
  return types.createStringNode(joined);
}

/**
 * `includes` checks if a vector includes a specified element.
 * @todo Write tests
 * @param args - [types.Vec, types.AstNode].
 * @returns Types.Boolean.
 * @example (includes [1, 2, 3] 2) ;=> true
 * @example (includes [1, 2, 3] 4) ;=> false
 */
export function includes(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[1]);
  types.assertAstNode(args[2]);

  if (types.isStringNode(args[0])) {
    types.assertStringNode(args[0]);
    types.assertStringNode(args[1]);

    const str = args[0].value;
    const substring = args[1].value;
    const result = str.includes(substring);
    return types.createBooleanNode(result);
  }

  if (types.isVectorNode(args[0])) {
    types.assertVectorNode(args[0]);

    const vec = args[0];
    const element = args[1];

    const result = vec.value.some((item) => types.isEqualTo(item, element).value);
    return types.createBooleanNode(result);
  }

  throw new TypeError('Invalid argument type');
}

/**
 * `filter` filters elements in a vector based on a predicate function.
 * @todo Write tests
 * @param args - [types.Func, types.Vec].
 * @returns Types.Vector.
 * @example (filter isEven [1, 2, 3, 4]) ;=> [2, 4]
 */
export function filter(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertFunctionNode(args[0]);
  types.assertVectorNode(args[1]);

  const fn = args[0];
  const vec = args[1];

  const filtered = vec.value.filter((item) => Boolean(fn.value(item).value));
  return types.createVectorNode(filtered);
}

/**
 * `reduce` reduces elements in a vector based on a reducer function and an initial value.
 * @todo Write tests
 * @param args - [types.Func, types.Vec, initialValue].
 * @returns Types.AstNode.
 * @example (reduce (lambda (acc x) (+ acc x)) [1, 2, 3, 4] 0) ;=> 10
 */
export function reduce(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 3);
  types.assertFunctionNode(args[0]);
  types.assertVectorNode(args[1]);

  const fn = args[0];
  const vec = args[1];
  let accumulator = args[2];

  for (const item of vec.value) {
    accumulator = fn.value(accumulator, item);
  }

  return accumulator;
}

/**
 * A JavasScript switch statement.
 * @param args [types.Ast,...types.List[], types.List]
 * args[0] - The expression to be matched
 * args[1...n-1] - Case clause matched against the expression (value statement)
 * 	each case clause should have a statement to match and a value to return
 * args[n] - Default clause (statement)
 */
export function switchCase(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 2);
  const [expr, ...clauses] = args;

  const defaultClause = clauses.pop();
  types.assertDefined(defaultClause);
  types.assertFunctionNode(defaultClause);

  const length = clauses.length;
  for (let i = 0; i < length; i++) {
    const clause = clauses[i];
    types.assertListNode(clause);
    types.assertArgumentCount(clause.value.length, 2);
    types.assertFunctionNode(clause.value[1]);

    const result = types.isEqualTo(expr, clause.value[0]);
    if (result.value) {
      return clause.value[1].value();
    }
  }

  return defaultClause.value();
}

/**
 * Tests whether a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export function and(...args: types.AstNode[]): types.BooleanNode {
  for (const arg of args) {
    const isTruthy = types.isAstTruthy(arg);
    if (!isTruthy) {
      return types.createBooleanNode(false);
    }
  }

  return types.createBooleanNode(true);
}

/**
 * Tests whether any of a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export function or(...args: types.AstNode[]): types.BooleanNode {
  for (const arg of args) {
    const isTruthy = types.isAstTruthy(arg);
    if (isTruthy) {
      return types.createBooleanNode(true);
    }
  }

  return types.createBooleanNode(false);
}

/**
 * `!==` Determine if two nodes are not equal
 * @example (!== (8 2 3) (1 2 3)) ;=> true
 * @param args [types.Ast, types.Ast]
 * @returns types.Bool
 * @see types.isEqualTo()
 */
export function notEqualTo(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const bool = types.isEqualTo(args[0], args[1]);
  return types.createBooleanNode(!bool.value);
}

/**
 * `++` Increment a numeric value by one
 *
 * @description
 * Postfix is the default. In this position the counter will be incremented, but
 * the value will remain the same. The affix can be set explicitly by passing
 * "prefix" or "postfix" as the second argument. In the "postfix" position, the
 * returned value will have the counter and the value incremented by one. The
 * result is returned as a vector with the new counter value as the first element,
 * and the value before the increment as the second element.
 *
 * @example Default postfix
 * ```
 * (++ 1) ;=>[2, 1]
 * ```
 *
 * @example Explicit postfix
 * ```
 * (++ 1 "postfix") ;=>[2, 1]
 * ```
 *
 * @example Explicit prefix
 * ```
 * (++ 1 "prefix") ;=>[2, 2]
 * ```
 */
export function increment(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 2);
  types.assertNumberNode(args[0]);

  let affix = 'postfix';
  if (args[1] !== undefined) {
    types.assertStringNode(args[1]);
    if (args[1].value !== 'prefix' && args[1].value !== 'postfix') {
      throw new TypeError(
        `Invalid affix ${String(args[1].value)}. The affix must be "prefix" or "postfix"`,
      );
    } else {
      affix = args[1].value;
    }
  }

  if (affix === 'postfix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value + 1),
      types.createNumberNode(args[0].value),
    ]);
  }

  // ++x returns [counter - 1, counter - 1]
  if (affix === 'prefix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value + 1),
      types.createNumberNode(args[0].value + 1),
    ]);
  }

  throw new Error('Unhandled error in decrement');
}

/**
 * `--` Decrement a numeric value by one
 *
 * @description
 * Postfix is the default. In this position the counter will be decremented, but
 * the value will remain the same. The affix can be set explicitly by passing
 * "prefix" or "postfix" as the second argument. In the "postfix" position, the
 * returned value will have the counter and the value decremented by one. The
 * result is returned as a vector with the new counter value as the first element,
 * and the value before the increment as the second element.
 *
 * @example Default postfix
 * ```
 * (-- 1)
 * ;=>[0, 1]
 * ```
 *
 * @example Explicit postfix
 * ```
 * (-- 1 "postfix")
 * ;=>[0, 1]
 * ```
 *
 * @example Explicit prefix
 * ```
 * (-- 1 "prefix")
 * ;=>[0, 0]
 * ```
 */
export function decrement(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 2);
  types.assertNumberNode(args[0]);

  let affix = 'postfix';
  if (args[1] !== undefined) {
    types.assertStringNode(args[1]);
    if (args[1].value !== 'prefix' && args[1].value !== 'postfix') {
      throw new TypeError(
        `Invalid affix ${String(args[1].value)}. The affix must be "prefix" or "postfix"`,
      );
    } else {
      affix = args[1].value;
    }
  }

  if (affix === 'postfix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value - 1),
      types.createNumberNode(args[0].value),
    ]);
  }

  if (affix === 'prefix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value - 1),
      types.createNumberNode(args[0].value - 1),
    ]);
  }

  throw new Error('Unhandled error in decrement');
}

/**
 * Wraps typeof
 * @param object AstNode
 * @param typeString Must be: undefined, object, boolean, number, string, function, symbol, bigint
 * @returns types.BooleanNode
 */
export function typeOf(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[0]); // object
  types.assertStringNode(args[1]); // typeString

  const obj = typeof args[0].value;
  if (
    obj !== 'bigint' &&
    obj !== 'boolean' &&
    obj !== 'function' &&
    obj !== 'number' &&
    obj !== 'object' &&
    obj !== 'string' &&
    obj !== 'symbol' &&
    obj !== 'undefined'
  ) {
    throw new Error(
      `Invalid type: "${args[1].value}". Type must be one of bigint, boolean, function, number, object, string, symbol, or undefined`,
    );
  }

  return types.createBooleanNode(obj === args[1].value);
}

/**
 * Wraps instanceof
 * @returns types.BooleanNode
 */
export function instanceOf(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[0]); // object
  if (
    types.isStringNode(args[1]) === false ||
    types.isSymbolNode(args[1]) === false
  ) {
    throw new TypeError(
      `Instance type must be a string or symbol. Got "${String(args[1].value)}"`,
    );
  }
  types.assertStringNode(args[1]); // instance

  if (typeof args[1].value !== 'string') {
    throw new TypeError(
      `Instance type must be a string. Got "${String(args[1].value)}"`,
    );
  }

  const a = args[0].value;
  const b = args[1].value;
  let instance = undefined;

  if (
    b === 'AstNode' ||
    b === 'SymbolNode' ||
    b === 'ListNode' ||
    b === 'VectorNode' ||
    b === 'AtomNode' ||
    b === 'BooleanNode' ||
    b === 'MapNode' ||
    b === 'ErrorNode' ||
    b === 'KeywordNode' ||
    b === 'NilNode' ||
    b === 'NumberNode' ||
    b === 'StringNode' ||
    b === 'FunctionNode'
  ) {
    // deno-lint-ignore no-explicit-any
    instance = (types as any)[args[1].value];
  } else if (Object.hasOwn(globalThis, args[1].value)) {
    // deno-lint-ignore no-explicit-any
    instance = (globalThis as any)[args[1].value];
  } else {
    throw new TypeError(`Unknown instance: "${args[1].value}"`);
  }

  return types.createBooleanNode(a instanceof instance);
}

/**
 * Implements the nullish coalesce operator (??)
 * @param a Object to check if a is null or undefined
 * @param b Result if a is null or undefined
 * @returns types.AstNode
 */
export function nullishCoalesce(
  a: types.AstNode,
  b: types.AstNode,
): types.AstNode {
  return a.value == null ? b : a;
}

// MARK: MATH

/**
 * @param base
 * @param exponent
 * @returns types.NumberNode
 * @throws TypeError
 */
export function power(
  base: types.AstNode,
  exponent: types.AstNode,
): types.NumberNode {
  if (
    types.isNumberNode(base) && types.isNumberNode(exponent)
  ) {
    return types.createNumberNode(base.value ** exponent.value);
  }
  throw new TypeError('not a number');
}

/**
 * AKA modulo
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function remainder(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(((a.value % b.value) + b.value) % b.value);
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function bitwiseAnd(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value & b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function bitwiseOr(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value | b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function bitwiseXor(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value ^ b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a - The number.
 * @returns types.NumberNode The result of the bitwise NOT operation.
 * @throws TypeError If the argument is not a number.
 */
export function bitwiseNot(a: types.AstNode): types.NumberNode {
  if (types.isNumberNode(a)) {
    return types.createNumberNode(~a.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function leftShift(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value << b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function rightShift(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value >> b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function unsignedRightShift(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value >>> b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @returns types.AstNode
 */
export function not(a: types.AstNode): types.AstNode {
  return types.createBooleanNode(!a.value);
}

export function abs(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.abs(args[0].value));
}

export function acos(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.acos(args[0].value));
}

export function acosh(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.acosh(args[0].value));
}

export function asin(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.asin(args[0].value));
}

export function asinh(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.asinh(args[0].value));
}

export function atan(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.atan(args[0].value));
}

export function atan2(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  return types.createNumberNode(Math.atan2(args[0].value, args[0].value));
}

export function atanh(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.atanh(args[0].value));
}

export function cbrt(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.cbrt(args[0].value));
}

export function ceil(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.ceil(args[0].value));
}

export function clz32(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.clz32(args[0].value));
}

export function cos(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.cos(args[0].value));
}

export function cosh(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.cosh(args[0].value));
}

export function exp(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.exp(args[0].value));
}
export function expm1(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.expm1(args[0].value));
}

export function floor(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.floor(args[0].value));
}

export function fround(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.fround(args[0].value));
}

export function hypot(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.hypot(args[0].value));
}

export function imul(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  return types.createNumberNode(Math.imul(args[0].value, args[1].value));
}

export function log(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.log(args[0].value));
}

export function log10(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.log10(args[0].value));
}

export function log1p(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.log1p(args[0].value));
}

export function log2(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.log2(args[0].value));
}

export function max(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.max(args[0].value));
}

export function min(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.min(args[0].value));
}

export function pow(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertNumberNode(args[0]);
  types.assertNumberNode(args[1]);
  return types.createNumberNode(Math.pow(args[0].value, args[1].value));
}

export function random(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.random());
}

export function round(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.round(args[0].value));
}

export function sign(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.sign(args[0].value));
}

export function sin(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.sin(args[0].value));
}

export function sinh(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.sinh(args[0].value));
}

export function sqrt(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.sqrt(args[0].value));
}

export function tan(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.tan(args[0].value));
}

export function tanh(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.tanh(args[0].value));
}

export function trunc(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return types.createNumberNode(Math.trunc(args[0].value));
}

export function getMathE(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.E);
}

export function getMathLn10(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.LN10);
}

export function getMathLn2(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.LN2);
}

export function getMathLog10e(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.LOG10E);
}

export function getMathLog2e(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.LOG2E);
}

export function getMathPi(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.PI);
}

export function getMathSqrt12(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.SQRT1_2);
}

export function getMathSqrt2(..._args: types.AstNode[]): types.AstNode {
  return types.createNumberNode(Math.SQRT2);
}

/**
 * Injects the tag into the node() arguments
 * @param tag A symbol to be merged into the args
 * @returns anonymous function
 */
export function tag(tag: string) {
  return (...args: types.AstNode[]): types.AstNode => node(types.createSymbolNode(tag), ...args);
}

/**
 * Create a node from a list of args
 * @param args [DictKey, types.Dict?, types.List|types.Str?]
 * - args[0] {DictKey} tagName
 * - args[1] {types.Dict} [attributes]
 * - args[2] {types.List|types.Str} [children]
 * @example (node div {:id "foo"} (p (strong "text")))
 * @return Node
 */
export function node(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);

  const tagName = args[0];
  types.assertSymbolNode(tagName);

  // Set the attributes and determine where to start collecting children
  const attributes = new Map<string, types.AstNode>();
  const children: types.AstNode[] = [];

  if (types.isMapNode(args[1])) {
    args[1].value.forEach((value, key) => attributes.set(key, value));
    args.slice(2).forEach((child) => children.push(child));
  } else {
    args.slice(1).forEach((child) => children.push(child)); // No attributes
  }

  return types.createDomNode(tagName.value, attributes, children);
}

export function querySelector(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);

  const selector = args[0].value;
  const element = document.querySelector(selector);
  if (element === null) {
    return types.createNilNode();
  }

  const nodeMap = Array.from(element.attributes);
  const attributes: Map<string, types.AstNode> = nodeMap.reduce((map, attr) => {
    return map.set(attr.name, types.createStringNode(attr.value));
  }, new Map<string, types.AstNode>());

  return types.createDomNode(element.tagName, attributes, []);
}
