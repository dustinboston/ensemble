/**
 * @file Provides a mechanism for interacting with JavaScript. It currently
 * uses eval, but it would be better to implement the interfaces to functions
 * instead so that we can avoid eval and limit the scope of the function.
 *
 * Provides defintions of language features that are not achievable without
 * extra syntax or functions.
 *
 * **List of language features to implement**
 *
 * @todo ['+=', additionAssignment],
 * @todo ['-=', subtractionAssignment],
 * @todo ['*=', multiplicationAssignment],
 * @todo ['**=', exponentiationAssignment],
 * @todo ['/=', divisionAssignment],
 * @todo ['%=', remainderAssignment],
 * @todo ['&=', bitwiseAndAssignment],
 * @todo ['|=', bitwiseOrAssignment],
 * @todo ['^=', bitwiseXorAssignment],
 * @todo ['<<=', leftShiftAssignment],
 * @todo ['>>=', rightShiftAssignment],
 * @todo ['>>>=', unsignedRightShiftAssignment],
 * @todo ['&&=', logicalAndAssignment],
 * @todo ['||=', logicalOrAssignment],
 * @todo ['??=', nullishCoalesceAssignment],
 * @todo ['-', unaryNegation] (overload the - operator. If only one value it's unary negation)
 * @todo ['+', unaryPlus] (overload the + operator. If only one value it's unary plus)
 * @todo ['...', spread],
 *
 * **Implemented in Core**
 *
 * Possibly merge these.
 *
 * - ['equals', equals],
 * - ['lessThan', lessThan],
 * - ['lessThanOrEqual', lessThanOrEqual],
 * - ['greaterThan', greaterThan],
 * - ['greaterThanOrEqual', greaterThanOrEqual],
 * - ['nullish', nullishCoalesce],
 * - ['+', add],
 * - ['-', subtract],
 * - ['*', multiply],
 * - ['/', divide],
 * - ['<', lessThan],
 * - ['<=', lessThanOrEqual],
 * - ['>', greaterThan],
 * - ['>=', greaterThanOrEqual],
 */
import * as types from './types.ts';
import * as core from './core.ts';

/**
 * Globals (the ones available in Deno)
 * Go to https://docs.deno.com/api/web/all_symbols and run this snippet in the console.
 *
 * ```javascript
 * globalThis.out = '';
 * document.querySelectorAll(".namespaceItem:has(.text-Variable, .text-Function, .text-Namespace, .text-Class) .namespaceItemContent > a").forEach((el) => globalThis.out += `"${el.innerText}": ${el.innerText},\n`);
 * console.log(globalThis.out);
 * ```
 */
export const nsInterop = new Map<types.SymbolNode, types.AstNode>();
const interopFns: Array<[string, types.Closure]> = [
	['typeOf', typeOf],
	['instanceOf', instanceOf],

	['===', core.eq],
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

	['prop', getIn],
	['getIn', getIn],
	['global', getGlobal],
	//['new', callNew],

	// Possibly the same as cond
	['switch', switchCase],
	// ...Object.entries(collectGlobalFunctions()),

	// ...Object.getOwnPropertyNames(globalThis).map((key) => {
	// 	return [key, (...args: AstNode[]) => globalThis[key]];
	// });
];

for (const [sym, fn] of interopFns) {
	nsInterop.set(new types.SymbolNode(sym), new types.FunctionNode(fn));
}

// for (const globalKey of globals.basicGlobals.values()) {
// 	const globalSymbol = new types.SymbolNode(globalKey);
// 	nsInterop.set(
// 		globalSymbol,
// 		new types.FunctionNode(
// 			(...args: types.AstNode[]) => {
// 				return getGlobal(...[globalSymbol, ...args]);
// 			},
// 		),
// 		// types.curriedFunction(
// 		// 	new types.FunctionNode(getGlobal),
// 		// 	new types.SymbolNode(globalKey),
// 		// ),
// 	);
// }

/**
 * Dangerously evaluates a javascript expression with Function.
 * @param args - The expression to evaluate.
 * @returns Result of the evaluated expression or an Err.
 * @example (js-eval "console.log('give me a donut');")
 */
export function _jsEval(...args: types.AstNode[]): types.AstNode {
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
			return new types.ErrorNode(new types.StringNode(error.message));
		}

		return new types.ErrorNode(new types.StringNode(JSON.stringify(error)));
	}
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
			return new types.BooleanNode(false);
		}
	}

	return new types.BooleanNode(true);
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
			return new types.BooleanNode(true);
		}
	}

	return new types.BooleanNode(false);
}

/**
 * `!==` Determine if two nodes are not equal
 * @example (!== (8 2 3) (1 2 3)) ;=> true
 * @param args [types.Ast, types.Ast]
 * @returns types.Bool
 * @see types.types.isEqualTo()
 */
export function notEqualTo(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	const bool = types.isEqualTo(args[0], args[1]);
	return new types.BooleanNode(!bool.value);
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
		return new types.VectorNode([
			new types.NumberNode(args[0].value + 1),
			new types.NumberNode(args[0].value),
		]);
	}

	// ++x returns [counter - 1, counter - 1]
	if (affix === 'prefix') {
		return new types.VectorNode([
			new types.NumberNode(args[0].value + 1),
			new types.NumberNode(args[0].value + 1),
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
		return new types.VectorNode([
			new types.NumberNode(args[0].value - 1),
			new types.NumberNode(args[0].value),
		]);
	}

	if (affix === 'prefix') {
		return new types.VectorNode([
			new types.NumberNode(args[0].value - 1),
			new types.NumberNode(args[0].value - 1),
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
			`Invalid type: "${
				args[1].value
			}". Type must be one of bigint, boolean, function, number, object, string, symbol, or undefined`,
		);
	}

	return new types.BooleanNode(obj === args[1].value);
}

/**
 * Wraps instanceof
 * @returns types.BooleanNode
 */
export function instanceOf(...args: types.AstNode[]): types.BooleanNode {
	types.assertArgumentCount(args.length, 2);
	types.assertAstNode(args[0]); // object
	if (
		args[1] instanceof types.StringNode === false ||
		args[1] instanceof types.SymbolNode === false
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

	return new types.BooleanNode(a instanceof instance);
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
		base instanceof types.NumberNode && exponent instanceof types.NumberNode
	) {
		return new types.NumberNode(base.value ** exponent.value);
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(((a.value % b.value) + b.value) % b.value);
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(a.value & b.value); // eslint-disable-line no-bitwise
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(a.value | b.value); // eslint-disable-line no-bitwise
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(a.value ^ b.value); // eslint-disable-line no-bitwise
	}
	throw new TypeError('not a number');
}

/**
 * @param a - The number.
 * @returns types.NumberNode The result of the bitwise NOT operation.
 * @throws TypeError If the argument is not a number.
 */
export function bitwiseNot(a: types.AstNode): types.NumberNode {
	if (a instanceof types.NumberNode) {
		return new types.NumberNode(~a.value); // eslint-disable-line no-bitwise
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(a.value << b.value); // eslint-disable-line no-bitwise
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(a.value >> b.value); // eslint-disable-line no-bitwise
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
	if (a instanceof types.NumberNode && b instanceof types.NumberNode) {
		return new types.NumberNode(a.value >>> b.value); // eslint-disable-line no-bitwise
	}
	throw new TypeError('not a number');
}

/**
 * @param a
 * @returns types.AstNode
 */
export function not(a: types.AstNode): types.AstNode {
	return new types.BooleanNode(!a.value);
}

/**
 * @param args
 * @param args.0 A string containing the name of the global variable to get.
 * @param args.1 An optional vector of keys to get a nested property.
 * @returns An AstNode representing the value of the global variable.
 */
function getGlobal(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertMinimumArgumentCount(args.length, 1);
		types.assertSymbolNode(args[0]);

		// deno-lint-ignore no-explicit-any
		const globalObj = (globalThis as any)[args[0].value] as any; // e.g. URL

		// deno-lint-ignore no-explicit-any
		let instance: any = null;

		if (args[1] && args[1] instanceof types.AtomNode) {
			// Check for an instance of, e.g. URL, "myURL"
			if (args[1].value instanceof globalObj) {
				instance = args[1].value;
			}
		}

		const props = instance ? args.slice(2) : args.slice(1);

		if (instance !== null && instance !== undefined) {
			// deno-lint-ignore no-explicit-any
			let obj: any = instance;
			for (const prop of props) {
				// TODO: needs key types to get the obj
				// But needs args to pass to new or function call
				if (
					typeof prop.value === 'string' ||
					types.isMapKeyNode(prop.value)
				) {
					const key = types.dekey(prop.value);
					obj = obj[key];
				}
			}

			if (isConstructible(obj)) {
				return new types.AtomNode(
					new obj(...args.slice(1).map((ast) => ast.value)),
				);
			} else if (isFunction(obj)) {
				return new types.AtomNode(
					obj(...args.map((ast) => ast.value)),
				);
			} else {
				return new types.AtomNode(obj);
			}
		} else {
			// deno-lint-ignore no-explicit-any
			let obj: any = globalObj;
			if (isConstructible(obj)) {
				return new types.AtomNode(
					new obj(...args.slice(1).map((ast) => ast.value)),
				);
			} else if (isFunction(obj)) {
				return new types.AtomNode(
					obj(...args.map((ast) => ast.value)),
				);
			} else {
				for (const prop of props) {
					if (
						typeof prop.value === 'string' ||
						types.isMapKeyNode(prop.value)
					) {
						const key = types.dekey(prop.value);
						obj = obj[key];
					}
				}

				return new types.AtomNode(obj);
			}
		}
	} catch (error) {
		const msg = new types.StringNode(String(error));
		return new types.ErrorNode(msg);
	}

	// const globalKey = args[0].value;
	// if (allGlobals.has(globalKey)) {
	// 	const path = globalKey.split('.');
	// 	const value = getJsProperty(globalThis, path);
	// 	const ast = types.toAst(value);
	// 	return ast;
	// }
	// throw new ReferenceError(
	// 	`Global value "${globalKey}" is unavailable or undefined.`,
	// );
}

function getIn(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertAtomNode(args[0]);

	const obj = args[0].value as unknown;
	const keys = args.slice(1);

	types.assertSequentialValues<types.KeywordNode>(
		keys,
		types.KeywordNode,
	);

	const result: unknown = getJsProperty(
		obj,
		keys.map((kw) => types.dekey(kw.value)),
	);
	return types.toAst(result);
}

// function callNew(...args: types.AstNode[]): types.AstNode {
// 	if (Deno.env.get('DEBUG')) {
// 		console.log(
// 			`Try constructing with args: ${
// 				printer.printString(new types.VectorNode(args))
// 			}`,
// 		);
// 	}

// 	types.assertMinimumArgumentCount(args.length, 1);
// 	types.assertFunctionNode(args[0]);
// 	// types.assertSymbolNode(args[0]);

// 	// deno-lint-ignore ban-types
// 	const fnWrapper = args[0].value;
// 	if (Deno.env.get('DEBUG')) {
// 		console.log(`Wrapper function: ${fnWrapper}`);
// 	}

// 	const constructorFunc = args[0].value();
// 	if (Deno.env.get('DEBUG')) {
// 		console.log(`Constructor function: ${String(constructorFunc)}`);
// 	}

// 	const constructorArgs = args.slice(1);
// 	// deno-lint-ignore ban-types
// 	let cfunc: Function;
// 	if (typeof constructorFunc === 'function') {
// 		cfunc = constructorFunc;
// 	} else if (
// 		constructorFunc as unknown instanceof types.FunctionNode === true &&
// 		// deno-lint-ignore no-explicit-any
// 		typeof (constructorFunc as any).value === 'function'
// 	) {
// 		// deno-lint-ignore ban-types
// 		cfunc = constructorFunc.value as Function;
// 	} else {
// 		if (Deno.env.get('DEBUG')) {
// 			console.log('Value is not a function');
// 		}
// 		throw new Error("Constructor function isn't a function");
// 	}

// 	const canNew = isConstructible(constructorFunc);
// 	if (canNew) {
// 		if (Deno.env.get('DEBUG')) console.log('Value is constructible');
// 		const result = Reflect.construct(cfunc, constructorArgs);
// 		return types.toAst(result);
// 	}
// 	if (Deno.env.get('DEBUG')) console.log('Value is not constructible');
// 	return new types.NilNode();
// }

// MARK: HELPER FNS ------------------------------------------------------------
// TODO: Move to types.ts

// Helper function to determine if a value is an object

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function getJsProperty(
	searchObject: unknown,
	keys: string[],
): unknown {
	let result: unknown = searchObject;

	for (const key of keys) {
		if (isObject(result) && key in result) {
			result = result[key];
		} else {
			return null;
		}
	}

	return result;
}

/**
 * Checks if a given function can be used as a constructor.
 *
 * This function determines if the input function can be used with the `new`
 * operator to create an instance. It does this by attempting to use the
 * provided function as the prototype for creating an instance of a benign
 * placeholder class (`NoopClass`). The key point is that this does not
 * actually invoke the constructor of the provided function (`func`).
 *
 * The process involves:
 * 1. Creating an instance of `NoopClass` with `func` set as its prototype.
 * 2. If `func` is a valid constructor, this operation succeeds without
 *    invoking `func`'s constructor logic.
 * 3. If `func` is not a valid constructor, an error is thrown, and `false`
 *    is returned.
 *
 * @example
 * ```typescript
 * console.log(isConstructible(URL)); // true
 * ```
 * @example
 * ```typescript
 * console.log(isConstructible(function() {})); // true
 * ```
 * @example
 * ```typescript
 * console.log(isConstructible(() => {})); // false
 * ```
 * @example
 * ```typescript
 * console.log(isConstructible({})); // false
 * ```
 *
 * @param func - The function to test for constructibility.
 * It should be a function or a constructor.
 *
 * @returns `true` if the function can be used with `new` to create an
 * instance, `false` otherwise.
 */
function isConstructible(func: unknown): boolean {
	/**
	 * A class used as a placeholder for testing if a function is constructible.
	 * This class does not perform any operations and is used to verify if
	 * another function can be used with the `new` operator.
	 */
	class NoopClass {}

	// Check if the provided input is a function
	if (typeof func !== 'function') return false;

	// Check if the function has a prototype property
	if (!func.prototype) return false;

	try {
		// Attempt to construct an instance of NoopClass using func as the prototype
		// This does not actually create an instance of func or invoke its constructor logic
		Reflect.construct(NoopClass, [], func);
		// If no error is thrown, func is constructible
		return true;
	} catch (_err) {
		// If an error is thrown, func is not constructible
		return false;
	}
}

// #region Basic Globals
const _basicGlobals = new Set([
	'AbortController',
	'AbortSignal',
	'AbsoluteOrientationSensor',
	'AbstractRange',
	'Accelerometer',
	'addEventListener',
	'AesCbcParams',
	'AesCtrParams',
	'AesGcmParams',
	'AesKeyGenParams',
	'alert',
	'AmbientLightSensor',
	'AnalyserNode',
	'ANGLE_instanced_arrays',
	'Animation',
	'AnimationEffect',
	'AnimationEvent',
	'AnimationPlaybackEvent',
	'AnimationTimeline',
	'atob',
	'Attr',
	'AudioBuffer',
	'AudioBufferSourceNode',
	'AudioContext',
	'AudioData',
	'AudioDecoder',
	'AudioDestinationNode',
	'AudioEncoder',
	'AudioListener',
	'AudioNode',
	'AudioParam',
	'AudioParamDescriptor',
	'AudioParamMap',
	'AudioProcessingEvent',
	'AudioScheduledSourceNode',
	'AudioSinkInfo',
	'AudioTrack',
	'AudioTrackList',
	'AudioWorklet',
	'AudioWorkletGlobalScope',
	'AudioWorkletNode',
	'AudioWorkletProcessor',
	'AuthenticatorAssertionResponse',
	'AuthenticatorAttestationResponse',
	'AuthenticatorResponse',
	'BarcodeDetector',
	'BarProp',
	'BaseAudioContext',
	'BatteryManager',
	'BeforeUnloadEvent',
	'BiquadFilterNode',
	'Blob',
	'BlobEvent',
	'BluetoothUUID',
	'BroadcastChannel',
	'btoa',
	'ByteLengthQueuingStrategy',
	'Cache',
	'caches',
	'CacheStorage',
	'CanvasCaptureMediaStreamTrack',
	'CanvasGradient',
	'CanvasPattern',
	'CanvasRenderingContext2D',
	'CaptureController',
	'CaretPosition',
	'CDATASection',
	'ChannelMergerNode',
	'ChannelSplitterNode',
	'CharacterData',
	'clearInterval',
	'clearTimeout',
	'Client',
	'Clients',
	'Clipboard',
	'ClipboardEvent',
	'ClipboardItem',
	'close',
	'closed',
	'CloseEvent',
	'Comment',
	'CompositionEvent',
	'CompressionStream',
	'confirm',
	'console',
	'ConstantSourceNode',
	'ContentVisibilityAutoStateChangeEvent',
	'ConvolverNode',
	'CookieChangeEvent',
	'CookieStore',
	'CookieStoreManager',
	'CountQueuingStrategy',
	'createImageBitmap',
	'Credential',
	'CredentialsContainer.create',
	'CredentialsContainer.get',
	'CredentialsContainer',
	'crypto',
	'Crypto',
	'CryptoKey',
	'CryptoKeyPair',
	'CSPViolationReportBody',
	'CSS.highlights_static',
	'CSS.registerProperty_static',
	'CSS',
	'CSSAnimation',
	'CSSConditionRule',
	'CSSContainerRule',
	'CSSCounterStyleRule',
	'CSSFontFaceRule',
	'CSSFontFeatureValuesRule',
	'CSSFontPaletteValuesRule',
	'CSSGroupingRule',
	'CSSImageValue',
	'CSSImportRule',
	'CSSKeyframeRule',
	'CSSKeyframesRule',
	'CSSKeywordValue',
	'CSSLayerBlockRule',
	'CSSLayerStatementRule',
	'CSSMathInvert',
	'CSSMathMax',
	'CSSMathMin',
	'CSSMathNegate',
	'CSSMathProduct',
	'CSSMathSum',
	'CSSMathValue',
	'CSSMatrixComponent',
	'CSSMediaRule',
	'CSSNamespaceRule',
	'CSSNumericArray',
	'CSSNumericValue',
	'CSSPageRule',
	'CSSPerspective',
	'CSSPositionValue',
	'CSSPropertyRule',
	'CSSRotate',
	'CSSRule',
	'CSSRuleList',
	'CSSScale',
	'CSSScopeRule',
	'CSSSkew',
	'CSSSkewX',
	'CSSSkewY',
	'CSSStartingStyleRule',
	'CSSStyleDeclaration',
	'CSSStyleRule',
	'CSSStyleSheet',
	'CSSStyleValue',
	'CSSSupportsRule',
	'CSSTransformComponent',
	'CSSTransformValue',
	'CSSTransition',
	'CSSTranslate',
	'CSSUnitValue',
	'CSSUnparsedValue',
	'CSSVariableReferenceValue',
	'CustomElementRegistry',
	'CustomEvent',
	'CustomStateSet',
	'DataTransfer',
	'DataTransferItem',
	'DataTransferItemList',
	'DecompressionStream',
	'DedicatedWorkerGlobalScope',
	'DelayNode',
	'DeviceMotionEvent',
	'DeviceMotionEventAcceleration',
	'DeviceMotionEventRotationRate',
	'DeviceOrientationEvent',
	'dispatchEvent',
	'Document.createElement',
	'Document.exitFullscreen',
	'Document.exitPictureInPicture',
	'Document.exitPointerLock',
	'Document.fonts',
	'Document.fullscreen',
	'Document.fullscreenElement',
	'Document.getAnimations',
	'Document.getSelection',
	'Document.hasStorageAccess',
	'Document.hasUnpartitionedCookieAccess',
	'Document.hidden',
	'Document.pictureInPictureElement',
	'Document.pictureInPictureEnabled',
	'Document.pointerLockElement',
	'Document.requestStorageAccess',
	'Document.requestStorageAccessFor',
	'Document.startViewTransition',
	'Document.timeline',
	'Document.visibilityState',
	'Document',
	'DocumentFragment',
	'DocumentTimeline',
	'DocumentType',
	'DOMError',
	'DOMException',
	'DOMHighResTimeStamp',
	'DOMImplementation',
	'DOMMatrix',
	'DOMMatrixReadOnly',
	'DOMParser',
	'DOMPoint',
	'DOMPointReadOnly',
	'DOMQuad',
	'DOMRect',
	'DOMRectReadOnly',
	'DOMStringList',
	'DOMStringMap',
	'DOMTokenList',
	'DragEvent',
	'DynamicsCompressorNode',
	'EcdhKeyDeriveParams',
	'EcdsaParams',
	'EcKeyGenParams',
	'EcKeyImportParams',
	'Element.animate',
	'Element.attachShadow',
	'Element.getAnimations',
	'Element.hasPointerCapture',
	'Element.releasePointerCapture',
	'Element.requestFullscreen',
	'Element.requestPointerLock',
	'Element.setPointerCapture',
	'Element.shadowRoot',
	'Element.slot',
	'Element',
	'ElementInternals',
	'EncodedAudioChunk',
	'EncodedVideoChunk',
	'ErrorEvent',
	'Event.composed',
	'Event.composedPath',
	'Event',
	'EventCounts',
	'EventSource',
	'EventTarget',
	'EXT_blend_minmax',
	'EXT_color_buffer_half_float',
	'EXT_disjoint_timer_query',
	'EXT_frag_depth',
	'EXT_shader_texture_lod',
	'EXT_sRGB',
	'EXT_texture_filter_anisotropic',
	'ExtendableCookieChangeEvent',
	'ExtendableEvent',
	'ExtendableMessageEvent',
	'FederatedCredential',
	'FederatedCredentialInit',
	'fetch',
	'FetchEvent',
	'File',
	'FileList',
	'FileReader',
	'FileReaderSync',
	'FileSystem',
	'FileSystemDirectoryEntry',
	'FileSystemDirectoryHandle',
	'FileSystemDirectoryReader',
	'FileSystemEntry',
	'FileSystemFileEntry',
	'FileSystemFileHandle',
	'FileSystemHandle',
	'FileSystemSyncAccessHandle',
	'FileSystemWritableFileStream',
	'FocusEvent',
	'FontFace',
	'FontFaceSet',
	'FontFaceSetLoadEvent',
	'FormData',
	'FormDataEvent',
	'GainNode',
	'Gamepad',
	'GamepadButton',
	'GamepadEvent',
	'GamepadHapticActuator',
	'Geolocation',
	'GeolocationCoordinates',
	'GeolocationPosition',
	'GeolocationPositionError',
	'GravitySensor',
	'Gyroscope',
	'HashChangeEvent',
	'Headers',
	'Highlight',
	'HighlightRegistry',
	'History',
	'HkdfParams',
	'HmacImportParams',
	'HmacKeyGenParams',
	'HTMLAllCollection',
	'HTMLAnchorElement',
	'HTMLAreaElement',
	'HTMLAudioElement',
	'HTMLBaseElement',
	'HTMLBodyElement',
	'HTMLBRElement',
	'HTMLButtonElement.popoverTargetAction',
	'HTMLButtonElement.popoverTargetElement',
	'HTMLButtonElement',
	'HTMLCanvasElement.captureStream',
	'HTMLCanvasElement',
	'HTMLCollection',
	'HTMLDataElement',
	'HTMLDataListElement',
	'HTMLDetailsElement',
	'HTMLDialogElement',
	'HTMLDivElement',
	'HTMLDListElement',
	'HTMLDocument',
	'HTMLElement.attachInternals',
	'HTMLElement.hidePopover',
	'HTMLElement.popover',
	'HTMLElement.showPopover',
	'HTMLElement.togglePopover',
	'HTMLElement',
	'HTMLEmbedElement',
	'HTMLFieldSetElement',
	'HTMLFormControlsCollection',
	'HTMLFormElement',
	'HTMLFrameSetElement',
	'HTMLHeadElement',
	'HTMLHeadingElement',
	'HTMLHRElement',
	'HTMLHtmlElement',
	'HTMLIFrameElement.allowPaymentRequest',
	'HTMLIFrameElement',
	'HTMLImageElement',
	'HTMLInputElement.popoverTargetAction',
	'HTMLInputElement.popoverTargetElement',
	'HTMLInputElement',
	'HTMLLabelElement',
	'HTMLLegendElement',
	'HTMLLIElement',
	'HTMLLinkElement',
	'HTMLMapElement',
	'HTMLMediaElement.captureStream',
	'HTMLMediaElement.disableRemotePlayback',
	'HTMLMediaElement.mediaKeys',
	'HTMLMediaElement.remote',
	'HTMLMediaElement.setMediaKeys',
	'HTMLMediaElement',
	'HTMLMenuElement',
	'HTMLMetaElement',
	'HTMLMeterElement',
	'HTMLModElement',
	'HTMLObjectElement',
	'HTMLOListElement',
	'HTMLOptGroupElement',
	'HTMLOptionElement',
	'HTMLOptionsCollection',
	'HTMLOutputElement',
	'HTMLParagraphElement',
	'HTMLPictureElement',
	'HTMLPreElement',
	'HTMLProgressElement',
	'HTMLQuoteElement',
	'HTMLScriptElement',
	'HTMLSelectElement',
	'HTMLSlotElement',
	'HTMLSourceElement',
	'HTMLSpanElement',
	'HTMLStyleElement',
	'HTMLTableCaptionElement',
	'HTMLTableCellElement',
	'HTMLTableColElement',
	'HTMLTableElement',
	'HTMLTableRowElement',
	'HTMLTableSectionElement',
	'HTMLTemplateElement',
	'HTMLTextAreaElement',
	'HTMLTimeElement',
	'HTMLTitleElement',
	'HTMLTrackElement',
	'HTMLUListElement',
	'HTMLUnknownElement',
	'HTMLVideoElement.disablePictureInPicture',
	'HTMLVideoElement.requestPictureInPicture',
	'HTMLVideoElement',
	'IDBCursor',
	'IDBCursorWithValue',
	'IDBDatabase',
	'IDBFactory',
	'IDBIndex',
	'IDBKeyRange',
	'IDBObjectStore',
	'IDBOpenDBRequest',
	'IDBRequest',
	'IDBTransaction',
	'IDBVersionChangeEvent',
	'IdleDeadline',
	'IIRFilterNode',
	'ImageBitmap',
	'ImageBitmapRenderingContext',
	'ImageData',
	'ImageDecoder',
	'ImageTrack',
	'ImageTrackList',
	'InputDeviceInfo',
	'InputEvent',
	'InstallEvent',
	'IntersectionObserver',
	'IntersectionObserverEntry',
	'Intl',
	'KeyboardEvent',
	'KeyframeEffect',
	'LargestContentfulPaint',
	'LayoutShift',
	'LayoutShiftAttribution',
	'LinearAccelerationSensor',
	'localStorage',
	'location',
	'Location',
	'Lock',
	'LockManager',
	'Magnetometer',
	'MathMLElement',
	'MediaCapabilities',
	'MediaDeviceInfo',
	'MediaDevices.getDisplayMedia',
	'MediaDevices.getUserMedia',
	'MediaDevices',
	'MediaElementAudioSourceNode',
	'MediaEncryptedEvent',
	'MediaError',
	'MediaKeyMessageEvent',
	'MediaKeys',
	'MediaKeySession',
	'MediaKeyStatusMap',
	'MediaKeySystemAccess',
	'MediaList',
	'MediaMetadata',
	'MediaQueryList',
	'MediaQueryListEvent',
	'MediaRecorder',
	'MediaRecorderErrorEvent',
	'MediaSession',
	'MediaSource',
	'MediaSourceHandle',
	'MediaStream',
	'MediaStreamAudioDestinationNode',
	'MediaStreamAudioSourceNode',
	'MediaStreamTrack',
	'MediaStreamTrackAudioSourceNode',
	'MediaStreamTrackEvent',
	'MediaStreamTrackGenerator',
	'MediaStreamTrackProcessor',
	'MediaTrackConstraints.displaySurface',
	'MediaTrackConstraints.logicalSurface',
	'MediaTrackConstraints.suppressLocalAudioPlayback',
	'MediaTrackConstraints',
	'MediaTrackSettings.cursor',
	'MediaTrackSettings.displaySurface',
	'MediaTrackSettings.logicalSurface',
	'MediaTrackSettings.suppressLocalAudioPlayback',
	'MediaTrackSettings',
	'MediaTrackSupportedConstraints.displaySurface',
	'MediaTrackSupportedConstraints.logicalSurface',
	'MediaTrackSupportedConstraints.suppressLocalAudioPlayback',
	'MediaTrackSupportedConstraints',
	'MerchantValidationEvent',
	'MessageChannel',
	'MessageEvent',
	'MessagePort',
	'Methods',
	'MIDIAccess',
	'MIDIConnectionEvent',
	'MIDIInput',
	'MIDIInputMap',
	'MIDIMessageEvent',
	'MIDIOutput',
	'MIDIOutputMap',
	'MIDIPort',
	'MouseEvent.movementX',
	'MouseEvent.movementY',
	'MouseEvent',
	'MouseScrollEvent',
	'MutationEvent',
	'MutationObserver',
	'MutationRecord',
	'NamedNodeMap',
	'NavigationPreloadManager',
	'Navigator.canShare',
	'Navigator.clearAppBadge',
	'Navigator.clipboard',
	'Navigator.connection',
	'Navigator.credentials',
	'Navigator.deviceMemory',
	'Navigator.geolocation',
	'Navigator.getBattery',
	'Navigator.getGamepads',
	'Navigator.locks',
	'Navigator.maxTouchPoints',
	'Navigator.mediaCapabilities',
	'Navigator.mediaDevices',
	'Navigator.mediaSession',
	'Navigator.permissions',
	'Navigator.requestMediaKeySystemAccess',
	'Navigator.requestMIDIAccess',
	'Navigator.scheduling',
	'Navigator.sendBeacon',
	'Navigator.serviceWorker',
	'Navigator.setAppBadge',
	'Navigator.share',
	'Navigator.storage',
	'Navigator.vibrate',
	'Navigator.wakeLock',
	'navigator',
	'Navigator',
	'NetworkInformation',
	'Node.getRootNode',
	'Node.isConnected',
	'Node',
	'NodeIterator',
	'NodeList',
	'Notification',
	'NotificationEvent',
	'NotRestoredReasonDetails',
	'NotRestoredReasons',
	'OES_draw_buffers_indexed',
	'OES_element_index_uint',
	'OES_standard_derivatives',
	'OES_texture_float_linear',
	'OES_texture_float',
	'OES_texture_half_float_linear',
	'OES_texture_half_float',
	'OES_vertex_array_object',
	'OfflineAudioCompletionEvent',
	'OfflineAudioContext',
	'OffscreenCanvas',
	'OffscreenCanvasRenderingContext2D',
	'onbeforeunload',
	'onerror',
	'onload',
	'onunhandledrejection',
	'OrientationSensor',
	'OscillatorNode',
	'OverconstrainedError',
	'PageRevealEvent',
	'PageSwapEvent',
	'PageTransitionEvent',
	'PaintWorkletGlobalScope',
	'PannerNode',
	'PasswordCredential',
	'PasswordCredentialInit',
	'Path2D',
	'PaymentAddress',
	'PaymentMethodChangeEvent',
	'PaymentRequest',
	'PaymentRequestUpdateEvent',
	'PaymentResponse',
	'Pbkdf2Params',
	'performance',
	'Performance',
	'PerformanceElementTiming',
	'PerformanceEntry',
	'PerformanceEventTiming',
	'PerformanceLongAnimationFrameTiming',
	'PerformanceLongTaskTiming',
	'PerformanceMark',
	'PerformanceMeasure',
	'PerformanceNavigation',
	'PerformanceNavigationTiming',
	'PerformanceObserver',
	'PerformanceObserverEntryList',
	'PerformancePaintTiming',
	'PerformanceResourceTiming',
	'PerformanceScriptTiming',
	'PerformanceServerTiming',
	'PerformanceTiming',
	'PeriodicWave',
	'Permissions',
	'PermissionStatus',
	'PictureInPictureEvent',
	'PictureInPictureWindow',
	'Plugin',
	'PluginArray',
	'PointerEvent',
	'PopStateEvent',
	'ProcessingInstruction',
	'ProgressEvent',
	'PromiseRejectionEvent',
	'prompt',
	'Properties',
	'PublicKeyCredential',
	'PublicKeyCredentialCreationOptions',
	'PushEvent',
	'PushManager',
	'PushMessageData',
	'PushSubscription',
	'PushSubscriptionOptions',
	'queueMicrotask',
	'RadioNodeList',
	'Range',
	'ReadableByteStreamController',
	'ReadableStream',
	'ReadableStreamBYOBReader',
	'ReadableStreamBYOBRequest',
	'ReadableStreamDefaultController',
	'ReadableStreamDefaultReader',
	'RelativeOrientationSensor',
	'RemotePlayback',
	'removeEventListener',
	'Report',
	'ReportBody',
	'reportError',
	'ReportingObserver',
	'Request',
	'RequestInit',
	'ResizeObserver',
	'ResizeObserverEntry',
	'ResizeObserverSize',
	'Response.body',
	'Response',
	'RsaHashedImportParams',
	'RsaHashedKeyGenParams',
	'RsaOaepParams',
	'RsaPssParams',
	'RTCAudioSourceStats',
	'RTCCertificate',
	'RTCCertificateStats',
	'RTCCodecStats',
	'RTCDataChannel',
	'RTCDataChannelEvent',
	'RTCDataChannelStats',
	'RTCDtlsTransport',
	'RTCDTMFSender',
	'RTCDTMFToneChangeEvent',
	'RTCEncodedAudioFrame',
	'RTCEncodedVideoFrame',
	'RTCError',
	'RTCErrorEvent',
	'RTCIceCandidate',
	'RTCIceCandidatePair',
	'RTCIceCandidatePairStats',
	'RTCIceCandidateStats',
	'RTCIceParameters',
	'RTCIceTransport',
	'RTCInboundRtpStreamStats',
	'RTCOutboundRtpStreamStats',
	'RTCPeerConnection',
	'RTCPeerConnectionIceErrorEvent',
	'RTCPeerConnectionIceEvent',
	'RTCPeerConnectionStats',
	'RTCRemoteOutboundRtpStreamStats',
	'RTCRtpReceiver.transform',
	'RTCRtpReceiver',
	'RTCRtpScriptTransform',
	'RTCRtpScriptTransformer',
	'RTCRtpSender.transform',
	'RTCRtpSender',
	'RTCRtpStreamStats',
	'RTCRtpTransceiver',
	'RTCSctpTransport',
	'RTCSessionDescription',
	'RTCStatsReport',
	'RTCTrackEvent',
	'RTCTransformEvent',
	'RTCTransportStats',
	'RTCVideoSourceStats',
	'Scheduler',
	'Scheduling',
	'Screen.orientation',
	'Screen',
	'ScreenOrientation',
	'ScrollTimeline',
	'SecurePaymentConfirmationRequest',
	'SecurityPolicyViolationEvent',
	'Selection',
	'self',
	'Sensor',
	'SensorErrorEvent',
	'ServiceWorker',
	'ServiceWorkerContainer',
	'ServiceWorkerGlobalScope.cookieStore',
	'ServiceWorkerGlobalScope',
	'ServiceWorkerRegistration.cookies',
	'ServiceWorkerRegistration.getNotifications',
	'ServiceWorkerRegistration.pushManager',
	'ServiceWorkerRegistration.showNotification',
	'ServiceWorkerRegistration.sync',
	'ServiceWorkerRegistration',
	'sessionStorage',
	'setInterval',
	'setTimeout',
	'ShadowRoot.pointerLockElement',
	'ShadowRoot',
	'SharedWorker',
	'SharedWorkerGlobalScope',
	'SourceBuffer',
	'SourceBufferList',
	'SpeechGrammar',
	'SpeechGrammarList',
	'SpeechRecognition',
	'SpeechRecognitionAlternative',
	'SpeechRecognitionErrorEvent',
	'SpeechRecognitionEvent',
	'SpeechRecognitionResult',
	'SpeechRecognitionResultList',
	'SpeechSynthesis',
	'SpeechSynthesisErrorEvent',
	'SpeechSynthesisEvent',
	'SpeechSynthesisUtterance',
	'SpeechSynthesisVoice',
	'StaticRange',
	'StereoPannerNode',
	'Storage',
	'StorageAccessHandle',
	'StorageEvent',
	'StorageManager',
	'structuredClone',
	'StylePropertyMap',
	'StylePropertyMapReadOnly',
	'StyleSheet',
	'StyleSheetList',
	'SubmitEvent',
	'SubtleCrypto',
	'SVGAElement',
	'SVGAngle',
	'SVGAnimateColorElement',
	'SVGAnimatedAngle',
	'SVGAnimatedBoolean',
	'SVGAnimatedEnumeration',
	'SVGAnimatedInteger',
	'SVGAnimatedLength',
	'SVGAnimatedLengthList',
	'SVGAnimatedNumber',
	'SVGAnimatedNumberList',
	'SVGAnimatedPreserveAspectRatio',
	'SVGAnimatedRect',
	'SVGAnimatedString',
	'SVGAnimatedTransformList',
	'SVGAnimateElement',
	'SVGAnimateMotionElement',
	'SVGAnimateTransformElement',
	'SVGAnimationElement',
	'SVGCircleElement',
	'SVGClipPathElement',
	'SVGComponentTransferFunctionElement',
	'SVGCursorElement',
	'SVGDefsElement',
	'SVGDescElement',
	'SVGElement',
	'SVGEllipseElement',
	'SVGEvent',
	'SVGFEBlendElement',
	'SVGFEColorMatrixElement',
	'SVGFEComponentTransferElement',
	'SVGFECompositeElement',
	'SVGFEConvolveMatrixElement',
	'SVGFEDiffuseLightingElement',
	'SVGFEDisplacementMapElement',
	'SVGFEDistantLightElement',
	'SVGFEDropShadowElement',
	'SVGFEFloodElement',
	'SVGFEFuncAElement',
	'SVGFEFuncBElement',
	'SVGFEFuncGElement',
	'SVGFEFuncRElement',
	'SVGFEGaussianBlurElement',
	'SVGFEImageElement',
	'SVGFEMergeElement',
	'SVGFEMergeNodeElement',
	'SVGFEMorphologyElement',
	'SVGFEOffsetElement',
	'SVGFEPointLightElement',
	'SVGFESpecularLightingElement',
	'SVGFESpotLightElement',
	'SVGFETileElement',
	'SVGFETurbulenceElement',
	'SVGFilterElement',
	'SVGFontElement',
	'SVGFontFaceElement',
	'SVGFontFaceFormatElement',
	'SVGFontFaceNameElement',
	'SVGFontFaceSrcElement',
	'SVGFontFaceUriElement',
	'SVGForeignObjectElement',
	'SVGGElement',
	'SVGGeometryElement',
	'SVGGlyphElement',
	'SVGGradientElement',
	'SVGGraphicsElement',
	'SVGHKernElement',
	'SVGImageElement',
	'SVGLength',
	'SVGLengthList',
	'SVGLinearGradientElement',
	'SVGLineElement',
	'SVGMarkerElement',
	'SVGMaskElement',
	'SVGMetadataElement',
	'SVGMissingGlyphElement',
	'SVGMPathElement',
	'SVGNumber',
	'SVGNumberList',
	'SVGPathElement',
	'SVGPatternElement',
	'SVGPoint',
	'SVGPointList',
	'SVGPolygonElement',
	'SVGPolylineElement',
	'SVGPreserveAspectRatio',
	'SVGRadialGradientElement',
	'SVGRect',
	'SVGRectElement',
	'SVGScriptElement',
	'SVGSetElement',
	'SVGStopElement',
	'SVGStringList',
	'SVGStyleElement',
	'SVGSVGElement',
	'SVGSwitchElement',
	'SVGSymbolElement',
	'SVGTextContentElement',
	'SVGTextElement',
	'SVGTextPathElement',
	'SVGTextPositioningElement',
	'SVGTitleElement',
	'SVGTransform',
	'SVGTransformList',
	'SVGTRefElement',
	'SVGTSpanElement',
	'SVGUnitTypes',
	'SVGUseElement',
	'SVGViewElement',
	'SVGVKernElement',
	'SyncEvent',
	'SyncManager',
	'TaskAttributionTiming',
	'TaskController',
	'TaskPriorityChangeEvent',
	'TaskSignal',
	'Text',
	'TextDecoder',
	'TextDecoderStream',
	'TextEncoder',
	'TextEncoderStream',
	'TextEvent',
	'TextMetrics',
	'TextTrack',
	'TextTrackCue',
	'TextTrackCueList',
	'TextTrackList',
	'TimeEvent',
	'TimeRanges',
	'ToggleEvent',
	'Touch',
	'TouchEvent',
	'TouchList',
	'TrackEvent',
	'TransformStream',
	'TransformStreamDefaultController',
	'TransitionEvent',
	'TreeWalker',
	'TrustedHTML',
	'TrustedScript',
	'TrustedScriptURL',
	'TrustedTypePolicy',
	'TrustedTypePolicyFactory',
	'UIEvent',
	'URL.createObjectURL_static',
	'URL.revokeObjectURL_static',
	'URL',
	'URLPattern',
	'URLSearchParams',
	'UserActivation',
	'ValidityState',
	'VideoColorSpace',
	'VideoDecoder',
	'VideoEncoder',
	'VideoFrame',
	'VideoPlaybackQuality',
	'VideoTrack',
	'VideoTrackList',
	'ViewTimeline',
	'ViewTransition',
	'VisibilityStateEntry',
	'VisualViewport',
	'VTTCue',
	'VTTRegion',
	'WakeLock',
	'WakeLockSentinel',
	'WaveShaperNode',
	'WebAssembly.compile',
	'WebAssembly.CompileError',
	'WebAssembly.compileStreaming',
	'WebAssembly.Global',
	'WebAssembly.Instance',
	'WebAssembly.instantiate',
	'WebAssembly.instantiateStreaming',
	'WebAssembly.LinkError',
	'WebAssembly.Memory',
	'WebAssembly.Module',
	'WebAssembly.RuntimeError',
	'WebAssembly.Table',
	'WebAssembly.validate',
	'WebAssembly',
	'WEBGL_color_buffer_float',
	'WEBGL_compressed_texture_etc1',
	'WEBGL_compressed_texture_pvrtc',
	'WEBGL_compressed_texture_s3tc_srgb',
	'WEBGL_compressed_texture_s3tc',
	'WEBGL_debug_renderer_info',
	'WEBGL_debug_shaders',
	'WEBGL_depth_texture',
	'WEBGL_draw_buffers',
	'WEBGL_lose_context',
	'WebGL2RenderingContext',
	'WebGLActiveInfo',
	'WebGLBuffer',
	'WebGLContextEvent',
	'WebGLFramebuffer',
	'WebGLObject',
	'WebGLProgram',
	'WebGLQuery',
	'WebGLRenderbuffer',
	'WebGLRenderingContext',
	'WebGLSampler',
	'WebGLShader',
	'WebGLShaderPrecisionFormat',
	'WebGLSync',
	'WebGLTexture',
	'WebGLTransformFeedback',
	'WebGLUniformLocation',
	'WebGLVertexArrayObject',
	'WebSocket',
	'WebTransport',
	'WebTransportBidirectionalStream',
	'WebTransportDatagramDuplexStream',
	'WebTransportError',
	'WebTransportReceiveStream',
	'WebTransportSendStream',
	'WheelEvent',
	'Window.caches',
	'Window.cancelIdleCallback',
	'Window.console',
	'Window.cookieStore',
	'Window.crypto',
	'Window.customElements',
	'Window.fetch',
	'Window.getSelection',
	'Window.history',
	'Window.performance',
	'Window.requestIdleCallback',
	'Window.scheduler',
	'Window.trustedTypes',
	'Window.visualViewport',
	'window',
	'Window',
	'WindowClient',
	'Worker',
	'WorkerGlobalScope.caches',
	'WorkerGlobalScope.crypto',
	'WorkerGlobalScope.fetch',
	'WorkerGlobalScope.fonts',
	'WorkerGlobalScope.performance',
	'WorkerGlobalScope.scheduler',
	'WorkerGlobalScope.trustedTypes',
	'WorkerGlobalScope',
	'WorkerLocation',
	'WorkerNavigator.clearAppBadge',
	'WorkerNavigator.connection',
	'WorkerNavigator.deviceMemory',
	'WorkerNavigator.locks',
	'WorkerNavigator.mediaCapabilities',
	'WorkerNavigator.permissions',
	'WorkerNavigator.serviceWorker',
	'WorkerNavigator.setAppBadge',
	'WorkerNavigator.storage',
	'WorkerNavigator',
	'Worklet.addModule',
	'Worklet',
	'WorkletGlobalScope',
	'WritableStream',
	'WritableStreamDefaultController',
	'WritableStreamDefaultWriter',
	'XMLDocument',
	'XMLHttpRequest',
	'XMLHttpRequestEventTarget',
	'XMLHttpRequestUpload',
	'XMLSerializer',
	'XPathEvaluator',
	'XPathException',
	'XPathExpression',
	'XPathResult',
	'XRHand',
	'XRInputSource',
	'XRInputSourceEvent',
	'XRInputSourcesChangeEvent',
	'XRJointPose',
	'XRJointSpace',
	'XRPose',
	'XRReferenceSpace',
	'XRReferenceSpaceEvent',
	'XRRigidTransform',
	'XRSessionEvent',
	'XRSpace',
	'XRViewerPose',
	'XRViewport',
	'XSLTProcessor',
]);
// #endregion

const propsToIgnore = [
	'arguments',
	'caller',
	'prototype',
	'constructor',
	'valueOf',
];

// deno-lint-ignore no-explicit-any
function _getProps(object: any): (string | symbol)[] {
	let keys: (string | symbol)[] = [];

	if (object === undefined || object === null) {
		return [];
	}

	while (object !== null && object !== undefined) {
		let props = (typeof object === 'object') ? Reflect.ownKeys(object) : Object.getOwnPropertyNames(object);

		props = props.filter((p) => {
			if (String(p).startsWith('__')) return false;
			if (propsToIgnore.includes(String(p))) return false;
			return true;
		});

		const symbols = Object.getOwnPropertySymbols(object);

		keys = keys.concat(props, symbols);
		const proto = object.prototype; // Object.getPrototypeOf(obj);
		if (proto === null) {
			break;
		} else {
			object = proto;
		}
	}

	// Remove duplicates
	keys = Array.from(new Set(keys));
	keys = keys.filter((key) => key !== null && key !== undefined);
	return keys;
}

// deno-lint-ignore ban-types
function isFunction(func: unknown): func is Function {
	return typeof func === 'function';
}

// function printProps(globals: (string | symbol)[]) {
// 	const globalProps: string[] = [];

// 	const pushCon = (g: string) => {
// 		globalProps.push(
// 			`    ['${g}', (...args) => {\n` +
// 				`            try {\n` +
// 				`                return new globalThis.${g}(...args);\n` +
// 				`            } catch (err) {\n` +
// 				`                return String(err);\n` +
// 				`            }\n` +
// 				`        }\n` +
// 				`    ]`,
// 		);
// 	};

// 	const pushInst = (g: string, key: string) => {
// 		const isSym = key.startsWith('Symbol');
// 		const keyName = isSym ? `${g}[${key}]` : `${g}.${key}`;
// 		const propName = isSym ? key : `"${key}"`;
// 		globalProps.push(
// 			`    ['${keyName}', (...args) => {\n` +
// 				`            try {\n` +
// 				`                const instance = args[0];\n` +
// 				`                return instance[${propName}](...args.slice(1));\n` +
// 				`            } catch (err) {\n` +
// 				`                return String(err);\n` +
// 				`            }\n` +
// 				`        }\n` +
// 				`    ]
// 			`,
// 		);
// 	};

// 	const pushFun = (g: string, key: string) => {
// 		const isSym = key && key.startsWith('Symbol') ? true : false;
// 		const keyName = isSym ? `${g}[${key}]` : `${g}.${key}`;
// 		const propName = isSym ? `[${key}]` : `.${key}`;
// 		globalProps.push(
// 			`    ['${keyName}', (...args) => {\n` +
// 				`            try {\n` +
// 				`                return globalThis.${g}${propName}(...args);\n` +
// 				`            } catch (err) {\n` +
// 				`                return String(err);\n` +
// 				`            }\n` +
// 				`        }\n` +
// 				`    ]`,
// 		);
// 	};

// 	const pushObj = (g: string, key: string) => {
// 		const isSym = key && key.startsWith('Symbol') ? true : false;
// 		const keyName = isSym ? `${g}[${key}]` : `${g}.${key}`;
// 		globalProps.push(
// 			`    ['${keyName}', () => {\n` +
// 				`            try {\n` +
// 				`                return globalThis.${keyName};\n` +
// 				`            } catch (err) {\n` +
// 				`                return String(err);\n` +
// 				`            }\n` +
// 				`        }\n` +
// 				`    ]`,
// 		);
// 	};

// 	const test = globalThis['CSSTransformValue'];

// 	// deno-lint-ignore no-explicit-any
// 	const gt = globalThis as any;
// 	for (const globalKey of globals) {
// 		if (
// 			globalThis[globalKey] === undefined ||
// 			globalThis[globalKey] === null ||
// 			globalKey === 'globalThis' ||
// 			globalKey === 'window' ||
// 			globalKey === 'self'
// 		) {
// 			continue;
// 		}

// 		const isTopCon = isConstructible(globalThis[globalKey]);
// 		const isTopFun = isFunction(globalThis[globalKey]);
// 		const isTopObj = !isTopCon && !isTopFun;

// 		if (isTopCon) {
// 			pushCon(globalKey);
// 		} else if (isTopFun) {
// 			pushFun(globalKey);
// 		} else {
// 			pushObj(globalKey);
// 		}

// 		const props = getProps(globalThis[globalKey]);
// 		for (const prop of props) {
// 			if (prop === null || prop === undefined) {
// 				continue;
// 			}

// 			let keyForOutput = null;
// 			let type = null;
// 			if (typeof prop === 'symbol') {
// 				type = 'symbol';
// 				let symbol = String(prop);
// 				if (symbol.startsWith('Symbol(Symbol')) {
// 					symbol = symbol.slice(7, -1);
// 				}
// 				keyForOutput = symbol;
// 			} else if (typeof prop === 'string') {
// 				type = 'string';
// 				keyForOutput = prop;
// 			} else {
// 				continue;
// 			}

// 			const isPropCon = isConstructible(globalThis[globalKey][prop]);
// 			const isPropFun = isFunction(globalThis[globalKey][prop]);
// 			const isPropObj = !isPropCon && !isPropFun;

// 			if (isTopCon && (isPropCon || isPropFun)) {
// 				pushInst(globalKey, keyForOutput);
// 				continue;
// 			}

// 			if (isTopFun) {
// 				pushFun(globalKey, keyForOutput);
// 				continue;
// 			}

// 			pushObj(globalKey, keyForOutput);
// 		}
// 	}

// 	return `const allGlobals = new Map([\n${globalProps.join(',\n')}\n])`;
// }

// const printed = printProps(basicGlobals);
// const preElement = document.getElementById('globals');
// preElement.innerHTML = printed;

/*
function toJs(ast, globalKey = '', sp = '  ') {
	const jsValue = ast?.value ?? ast;

	const type = typeof jsValue;
	if (type === 'undefined' || jsValue === null) {
		console.log('toJs found: null');
		// return null;
		return sp + 'null';
	}

	if (type === 'symbol') {
		console.log('toJs found: symbol');
		// return jsValue;
		return `${sp}[${JSON.stringify(jsValue)}]`;
	}

	if (type === 'number') {
		console.log('toJs found: number');
		// return jsValue;
		return sp + String(jsValue);
	}

	if (type === 'string') {
		console.log('toJs found: string');
		// return jsValue;
		return sp + `"${jsValue}"`;
	}
	if (type === 'boolean') {
		console.log('toJs found: boolean');
		// return jsValue;
		return sp + String(jsValue);
	}
	if (jsValue instanceof Error) {
		console.log('toJs found: error');
		// return jsValue;
		return sp + `new Error(${jsValue.message})`;
	}

	if (Array.isArray(jsValue)) {
		console.log('toJs found: array');
		const values = [];
		for (const element of jsValue) {
			values.push(toJs(element, globalKey, sp + '\t'));
		}
		// return values;
		return sp + `[\n${values.join(', ')}\n]`;
		console.log('/end array');
	}

	if (jsValue instanceof Set) {
		console.log('toJs found: set');
		const values = [];
		for (const element of jsValue) {
			values.push(toJs(element, globalKey, sp + '\t'));
		}
		// return values;
		return `${sp}[\n${values.join(', ')}\n${sp}]`;
		console.log('/end set');
	}

	if (jsValue instanceof Map) {
		console.log('toJs found: map');
		const values = [];
		for (const [key, value] of jsValue.entries()) {
			const keyString = toJs(key, globalKey, sp + '\t');
			const astValue = toJs(value, globalKey, sp + '\t');
			values.push(`${sp}[\n${keyString}, ${astValue}\n${sp}]`);
		}
		// return values;
		return `new Map([\n${values.join(', ')}\n${sp}])`;
		console.log('/end map');
	}

	if (type === 'function') {
		console.log('toJs found: function');
		// return jsValue;
		return sp + `(...args) => ${globalKey}(...args)`;
	}

	if (type === 'object' && jsValue.constructor === Object) {
		console.log('toJs found: object literal');
		const values = [];
		for (const [key, value] of Object.entries(jsValue)) {
			const keyString = toJs(key, globalKey, sp + '\t');
			const astValue = toJs(value, globalKey, sp + '\t');
			// values.push([keyString, astValue]);
			values.push(`${sp}[\n${values.join(', ')}\n${sp}]`);
		}
		console.log('/end object literal');
		return values;
	}

	console.log(`toJs found: unhandled object ${JSON.stringify(jsValue)}`);
	return `${sp}// Unhandled object\n${sp}globalThis.${globalKey}`;
}
*/
