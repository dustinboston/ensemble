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
	['string?', isString],
	['symbol', symbol],
	['symbol?', isSymbolNode],
	['keyword', keyword],
	['keyword?', isKeyword],
	['number?', isNumber],
	['fn?', isFn],
	['macro?', isMacro],

	['pr-str', printEscapedString],
	['str', printUnescapedString],
	['prn', printEscapedStringToScreen],
	['println', printUnescapedStringToScreen],
	['read-string', readString],
	['readline', readln],
	['readir', readir],
	['slurp', slurp],
	['spit', spit],
	['trim', trim],
	['<', lt],
	['<=', lte],
	['>', gt],
	['>=', gte],

	['+', add],
	['-', subtract],
	['*', multiply],
	['/', divide],
	['time-ms', timeMs],

	['list', list],
	['list?', isListNode],
	['vector', vector],
	['vector?', isVector],
	['hash-map', hashMap],
	['dict', hashMap],
	['map?', isMap],
	['assoc', assoc],
	['dissoc', dissoc],
	['get', get],
	['contains?', contains],
	['keys', keys],
	['vals', vals],
	['sequential?', isSequentialNode],
	['join', join],

	['cons', cons],
	['concat', concat],
	['vec', vec],
	['nth', nth],
	['first', firstNodeInList],
	['rest', rest],
	['empty?', empty],
	['count', count],
	['apply', apply],
	['map', applyToSequence],

	['conj', conj],
	['seq', seq],

	['meta', meta],
	['with-meta', withMeta],
	['atom', atom],
	['atom?', isAtom],
	['deref', deref],
	['reset!', reset],
	['swap!', swap],
];

for (const [sym, fn] of nsValues) {
	ns.set(new types.SymbolNode(sym), new types.FunctionNode(fn));
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
	return new types.StringNode(result);
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
	return new types.StringNode(result);
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
	return new types.NilNode();
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
	return new types.NilNode();
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
		return new types.NilNode();
	}

	return new types.StringNode(input);
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
		map.set(':file', new types.BooleanNode(entry.isFile));
		map.set(':directory', new types.BooleanNode(entry.isDirectory));
		map.set(':symlink', new types.BooleanNode(entry.isSymlink));
		map.set(':name', new types.StringNode(entry.name));

		const firstDotIndex = entry.name.indexOf('.');
		const slug = entry.name.slice(0, firstDotIndex);
		const ext = entry.name.slice(firstDotIndex + 1);

		map.set(':slug', new types.StringNode(slug));
		map.set(':ext', new types.StringNode(ext));
		files.push(new types.MapNode(map));
	}

	return new types.VectorNode(files);
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
	return new types.StringNode(content);
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
	return new types.NilNode();
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
	return new types.StringNode(string_.value.trim());
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
	return new types.BooleanNode(a.value < b.value);
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
	return new types.BooleanNode(a.value <= b.value);
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
	return new types.BooleanNode(a.value > b.value);
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
	return new types.BooleanNode(a.value >= b.value);
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
	return new types.NumberNode(a.value + b.value);
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
	return new types.NumberNode(a.value - b.value);
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
	return new types.NumberNode(a.value * b.value);
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
	return new types.NumberNode(a.value / b.value);
}

/**
 * `time-ms` Return a unix timestamp.
 * @param args - No arguments should be specified.
 * @returns A high-resolution timestamp (requires --allow-hrtime).
 * @example (time-ms) ;=> 1689952214357
 */
export function timeMs(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 0);
	return new types.NumberNode(performance.timeOrigin + performance.now());
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

	return new types.ListNode(args);
}

/**
 * `list?` Determine if an types.Ast node is a types.List.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (list? (2 1)) ;=>true
 */
export function isListNode(...args: types.AstNode[]): types.BooleanNode {
	types.assertArgumentCount(args.length, 1);
	return new types.BooleanNode(args[0] instanceof types.ListNode);
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

	return new types.ListNode(resultList);
}

/**
 * `vec` turn a list into a vector.
 * @description Returns a Vec if the arg is a types.List, else original node.
 * @param args - [types.List].
 * @returns Types.Vec | types.Ast.
 * @example (vec (1 2 3)) ;=> [1 2 3]
 */
export function vec(...args: types.AstNode[]): types.AstNode {
	return args[0] instanceof types.ListNode
		? new types.VectorNode(args[0].value)
		: args[0];
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
		args[1] instanceof types.NumberNode
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

	return new types.NilNode();
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
		return new types.ListNode(args[0].value.slice(1));
	}

	return new types.ListNode([]);
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

	return new types.BooleanNode(list.value.length === 0);
}

/**
 * `count` Counts the number of values in a Seq node.
 * @param args - [Seq].
 * @returns Types.Num.
 * @example (count (1 2 3)) ;=> 3
 */
export function count(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);

	const value = args[0];
	if (value instanceof types.NilNode) {
		return new types.NumberNode(0);
	}

	const list = args[0];
	types.assertSequential(list);
	return new types.NumberNode(list.value.length);
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
	return new types.AtomNode(value);
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
	return new types.BooleanNode(node instanceof types.AtomNode);
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

	if (atom.value instanceof types.AstNode === false) {
		// Best effort - it could still throw an error.
		return types.toAst(atom.value);
	}

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

	let value: types.AstNode;
	if (atom.value instanceof types.AstNode) {
		value = atom.value;
	} else {
		// Best effort - it could still throw an error.
		value = types.toAst(atom.value);
	}

	atom.value = fn.value(value, ...rest);
	return value;
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
	throw new types.ErrorNode(args[0]);
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
	return new types.ListNode(result);
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

	if (seq instanceof types.ListNode) {
		return new types.ListNode([...rest.reverse(), ...seq.value]);
	}

	// Explicitly state that seq is a Vec here, to preserve type information
	const vecSeq = seq;
	return new types.VectorNode([...vecSeq.value, ...rest]);
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
	if (ast instanceof types.ListNode && ast.value.length > 0) {
		return ast;
	}

	if (ast instanceof types.VectorNode && ast.value.length > 0) {
		return new types.ListNode([...ast.value]);
	}

	if (ast instanceof types.StringNode && ast.value.length > 0) {
		return new types.ListNode(
			ast.value.split('').map((char) => new types.StringNode(char)),
		);
	}

	return new types.NilNode();
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
	return new types.BooleanNode(args[0] instanceof types.NilNode);
}

/**
 * `true?` determines if a node is types.Bool(true).
 * @param args - [types.Bool].
 * @returns Types.Bool.
 * @example (true? true) ;=> true
 */
export function isTrue(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return new types.BooleanNode(
		args[0] instanceof types.BooleanNode && args[0].value,
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
	return new types.BooleanNode(
		args[0] instanceof types.BooleanNode && !args[0].value,
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
	return new types.BooleanNode(args[0] instanceof types.StringNode);
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
	return new types.SymbolNode(args[0].value);
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
	return new types.BooleanNode(args[0] instanceof types.SymbolNode);
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
	if (key instanceof types.KeywordNode) {
		return key;
	}

	const string_ = args[0];
	return new types.KeywordNode(`:${string_.value}`);
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
	return new types.BooleanNode(args[0] instanceof types.KeywordNode);
}

/**
 * `number?` determines if a node is a number.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (number? 2) ;=> true
 */
export function isNumber(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return new types.BooleanNode(args[0] instanceof types.NumberNode);
}

/**
 * `fn?` determines if a node is a function.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (fn? (fn* )) ;=> true
 */
export function isFn(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	return new types.BooleanNode(
		args[0] instanceof types.FunctionNode && !args[0].isMacro,
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
	return new types.BooleanNode(
		args[0] instanceof types.FunctionNode ? args[0].isMacro : false,
	);
}

/**
 * `vector` Creates a vector from an arbitrary number of types.Ast args.
 * @param args - Types.Ast[].
 * @returns Types.Vec.
 * @example (vector 1 2 3 4) ;=> [1 2 3 4]
 */
export function vector(...args: types.AstNode[]): types.AstNode {
	return new types.VectorNode(args);
}

/**
 * `vector?` Determines if a node is a types.Vec.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (vector? [1 2 3]) ;=> true
 */
export function isVector(...args: types.AstNode[]): types.BooleanNode {
	types.assertArgumentCount(args.length, 1);
	return new types.BooleanNode(args[0] instanceof types.VectorNode);
}

/**
 * `hash-map` Create a types.Dict from alternating DictKey/types.Ast args.
 * @param args - (DictKey|types.Ast)[].
 * @returns Types.Dict.
 * @example (hash-map "foo" 1 "bar" 2) ;=> {"foo" 1 "bar" 2}
 */
export function hashMap(...args: types.AstNode[]): types.MapNode {
	if (args.length === 0) {
		return new types.MapNode();
	}

	types.assertEvenArgumentCount(args.length);

	const dict = new types.MapNode();
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
	return new types.BooleanNode(args[0] instanceof types.MapNode);
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
	const dict = new types.MapNode(
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

	const dict = new types.MapNode(
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
	if (!(mapNode instanceof types.MapNode)) {
		return new types.NilNode();
	}

	const key = args[1];
	types.assertMapKeyNode(key);

	const value = types.getMapElement(mapNode.value, key);
	if (value !== undefined) {
		return value;
	}

	return new types.NilNode();
}

/**
 * `contains?` determines whether the given key exists in the dict.
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

	return new types.BooleanNode(types.hasMapElement(dict.value, key));
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
	return new types.ListNode([...args[0].value.values()]);
}

/**
 * `sequential?` Determines if a node is a types.List or types.Vec.
 * @param args - Arguments to the function.
 * @param args."0" - The node to check.
 * @returns True if the Ast is a List or Vec.
 * @example (sequential? [1 2 3])
 */
export function isSequentialNode(...args: types.AstNode[]): types.AstNode {
	return new types.BooleanNode(types.isSequentialNode(args[0]));
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
	const delim = args[1] instanceof types.StringNode ? args[1].value : ' ';
	const joined = args[0].value
		.map((ast) => printer.printString(ast, false))
		.join(delim);
	return new types.StringNode(joined);
}
