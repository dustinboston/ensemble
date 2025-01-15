/**
 * @file Provides all of the core functions for the language.
 */

import * as printer from '@/printer.ts';
import * as reader from '@/reader.ts';
import * as types from '@/types.ts';

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
  ['last', lastNodeInList],
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
];

for (const [sym, fn] of nsValues) {
  ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
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
  types.assertArgumentCount(args.length, 2, `\nargs: ${JSON.stringify(args, null, '  ')}`);
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
  return new types.ListNode([args[0], ...args[1].value]);
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

export function lastNodeInList(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  if (types.isSequentialNode(args[0]) && args[0].value.length > 0) {
    return args[0].value[args[0].value.length - 1];
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
 * `meta`
 * Returns the value of the metadata element.
 * @param args - [MetadataTypes].
 * @returns Types.Ast.
 * @example (meta (with-meta (fn* (a) a) {"b" 1})) ;=> {"b" 1}
 */
export function meta(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMetadataType(args[0]);
  return args[0].metadata ?? types.createNilNode();
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

  // Create a MapNode from another MapNode
  if (args.length === 1 && types.isMapNode(args[0])) {
    return types.createMapNode(new Map(args[0].value));
  }

  // Create a new MapNode from key/value pairs.
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
 * `join` - Join elements of a vec or list with a separator.
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

// function getProp(node: types.MapNode, keyPath: types.StringNode): types.AstNode {
//   const obj = types.toJs(node) as Record<string, any>;
//   const path = keyPath.value;

//   const result = path.split('.').reduce((current, key) => {
//     if (current && key in current) {
//       return current[key];
//     }
//     return undefined;
//   }, obj);

//   return types.toAst(result);
// }
