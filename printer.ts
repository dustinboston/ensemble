/**
 * @file This file handles recursive "printing" of Ast nodes - meaning that it
 * converts Ast nodes into their string representations.
 */
import * as types from './types.ts';

/**
 * Converts an AST node into its string representation.
 * @description
 * This function can serialize different AST node types into a string
 * representation that can be printed. For string types, it supports printing
 * both in "readable" and "non-readable" modes. It handles various complex
 * types such as lists, vectors, dictionaries, and DOM nodes, and can
 * recursively serialize nested structures.
 * @param ast - The AST node to be converted into a string.
 * @param printReadably - Optional parameter to indicate whether the string type
 * nodes should be printed "readably" - meaning you can see new line characters.
 * @returns The string representation of the given AST node.
 * @throws If it encounters an unmatched or unrecognized AST node type.
 * @example
 * ```ts
 * printString(types.makeStr("hello"), true);
 * //=> "\"hello\""
 * ```
 */
export function printString(ast: types.AstNode, printReadably = false): string {
	if (ast instanceof types.StringNode) {
		return printReadably ? `"${types.slash(ast.value)}"` : ast.value;
	}

	if (
		ast instanceof types.KeywordNode ||
		ast instanceof types.BooleanNode ||
		ast instanceof types.NumberNode ||
		ast instanceof types.SymbolNode
	) {
		return String(ast.value);
	}

	if (ast instanceof types.AtomNode) {
		return `(atom ${printString(ast.value)})`;

		// TODO: Coerce JS values into AstNodes?
		// if (ast.value instanceof types.AstNode) {
		// 	return `(atom ${printString(ast.value)})`;
		// } else {
		// 	if (ast.value === globalThis) {
		// 		return '(atom (global))';
		// 	} else {
		// 		return `(atom #<object>)`;
		// 		// const value = types.toAst(ast.value);
		// 		// return `(atom ${printString(value)})`;
		// 	}
		// }
	}

	if (ast instanceof types.ErrorNode) {
		return printString(ast.value, printReadably);
	}

	if (ast instanceof types.FunctionNode) {
		return '#<fn>';
	}

	if (types.isSequentialNode(ast)) {
		const isList = ast instanceof types.ListNode;
		const serialized = ast.value
			.map((value) => printString(value, printReadably))
			.join(' ');
		return isList ? `(${serialized})` : `[${serialized}]`;
	}

	if (ast instanceof types.MapNode || ast instanceof types.DomNode) {
		const isDict = ast instanceof types.MapNode;
		const serialized = types
			.mapFlat(ast.value)
			.map((value) => printString(value, printReadably))
			.join(' ');
		return isDict ? `{${serialized}}` : `<${serialized}/>`;
	}

	if (ast instanceof types.NilNode) {
		return 'nil';
	}

	throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}
