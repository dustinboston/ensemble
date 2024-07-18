/**
 * @file Provides a mechanism for interacting with JavaScript. It currently
 * uses eval, but it would be better to implement the interfaces to functions
 * instead so that we can avoid eval and limit the scope of the function.
 */
import * as types from './types.ts';
import * as core from './core.ts';

export const nsInterop = new Map<types.SymbolNode, types.AstNode>();
const interopFns: Array<[string, types.Closure]> = [
  ['js-eval', jsEval],
  ['evil', jsEval],
  ['toString', core.readString],
  ['stringify', core.readString],
  ['console.log', core.printUnescapedStringToScreen],
  ['startsWith', startsWith],
  ['switch', switchCase],
  ['&&', and],
  ['||', or],
  ['!==', notEqualTo],
  ['===', core.eq],
  ['++', increment],
  ['--', decrement],
  ['at', core.nth]
];

for (const [sym, fn] of interopFns) {
	nsInterop.set(new types.SymbolNode(sym), new types.FunctionNode(fn));
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
		return toAst(result);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return new types.ErrorNode(new types.StringNode(error.message));
		}

		return new types.ErrorNode(new types.StringNode(JSON.stringify(error)));
	}
}

/**
 * Translate JavaScript primative values into types.Ast's.
 * @param input - A JavaScript primative to convert into an types.Ast.
 * @returns The JavaScript primative converted to an Ast or Err.
 * @example toAst('foobar') //=> Str { value: 'foobar' }
 */
export function toAst(input: unknown): types.AstNode {
	switch (typeof input) {
		case 'undefined': {
			return new types.NilNode();
		}

		case 'number': {
			return new types.NumberNode(input);
		}

		case 'string': {
			if (input.startsWith('"')) {
				return new types.StringNode(input);
			}

			if (input.startsWith(':')) {
				return new types.KeywordNode(input);
			}

			return new types.SymbolNode(input);
		}

		case 'boolean': {
			return new types.BooleanNode(input);
		}

		case 'symbol':
		case 'bigint': {
			return new types.StringNode(JSON.stringify(input));
		}

		case 'function': {
			return new types.FunctionNode(
				(...args: types.AstNode[]): types.AstNode => {
					try {
						return toAst(input(...args.map((x) => x.value)));
					} catch (error: unknown) {
						if (error instanceof Error) {
							return new types.ErrorNode(
								new types.StringNode(error.message),
							);
						}

						return new types.ErrorNode(
							new types.StringNode(JSON.stringify(error)),
						);
					}
				},
			);
		}

		case 'object': {
			if (input instanceof Error) {
				return new types.ErrorNode(new types.StringNode(input.message));
			}

			if (input === null) {
				return new types.NilNode();
			}

			if (Array.isArray(input)) {
				const array = input.map((element) => toAst(element));
				return new types.ListNode(array);
			}

			if (input instanceof Map) {
				const map = new Map<string, types.AstNode>();
				for (const [maybeString, unknownValue] of input.entries()) {
					const key = String(maybeString);
					const value = toAst(unknownValue);
					map.set(key, value);
				}

				return new types.MapNode(map);
			}

			const inputObject = input as Record<string, unknown>;
			const map = new Map<string, types.AstNode>();
			for (const [maybeString, unknownValue] of Object.entries(
				inputObject,
			)) {
				const key = String(maybeString);
				const value = toAst(unknownValue);
				map.set(key, value);
			}

			return new types.MapNode(map);
		}

		default: {
			const coercedUnknown = String(input);
			return new types.ErrorNode(
				new types.StringNode(`uknown type ${coercedUnknown}`),
			);
		}
	}
}

function startsWith(...args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 2, 3);
	const string_ = args[0];
	types.assertStringNode(string_);
	const searchString = args[1];
	types.assertStringNode(searchString);
	const position = args[2];
	let positionValue = 0;
	if (types.isDefined(position) && position instanceof types.NumberNode) {
		positionValue = position.value;
	}

	return new types.BooleanNode(
		string_.value.startsWith(searchString.value, positionValue),
	);
}

/**
 * A JavasScript switch statement.
 * @param args [types.Ast,...types.List[], types.List]
 * args[0] - The expression to be matched
 * args[1...n-1] - Case clause matched against the expression (value statement)
 * 	each case clause should have a statement to match and a value to return
 * args[n] - Default clause (statement)
 */
function switchCase(...args: types.AstNode[]): types.AstNode {
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
function and(...args: types.AstNode[]): types.BooleanNode {
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
function or(...args: types.AstNode[]): types.BooleanNode {
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
function notEqualTo(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	const bool = types.isEqualTo(args[0], args[1]);
	return new types.BooleanNode(!bool.value);
}


/**
 * `++` Increment a numeric value by one
 * @example
 * ```
 * (++ 1) ;=> 2
 * ```
 */ 
function increment(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return new types.NumberNode(args[0].value + 1);
}

/**
 * `--` Decrement a numeric value by one
 * @example
 * ```
 * (-- 1) ;=> 0 
 * ```
 */ 
function decrement(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
  types.assertNumberNode(args[0]);
  return new types.NumberNode(args[0].value - 1);
}
