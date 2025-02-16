import core from "../../core.ts";
import * as types from "../../types.ts";

export const functionFunctions: Array<[string, types.Closure]> = [
	["Function", jsEval], // Javascript Interop
	["Function.isFunction", core.isFn], // Javascript Interop
	["Function.prototype.apply", apply],
	["Function.prototype.bind", bind],
	["Function.prototype.call", call],
	["js-eval", jsEval], // Javascript Interop
];

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

export function apply(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertFunctionNode(args[0]);
	types.assertVectorNode(args[1]);
	const result = args[0].value.apply(null, args[1].value);
	return types.toAst(result);
}

export function call(...args: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(args.length, 1);
	types.assertFunctionNode(args[0]);
	const result = args[0].value.call(null, ...args.slice(1));
	return types.toAst(result);
}

// Only allows binding a function to an AstNode (such as a FunctionNode).
export function bind(...args: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(args.length, 2);
	types.assertFunctionNode(args[0]);
	types.assertAstNode(args[1]);
	const result = args[0].value.bind(args[1], ...args.slice(2));
	return types.toAst(result);
}
