import { getCssFunctionMap } from "./interop-css.js";
import { getJsFunctionMap } from "./interop-js.js";
import { getHtmlFunctionMap } from "./interop-html.js";

export const APP_SYMBOLS = [
	"global",
	"let",
	"const",
	"do",
	"if",
	"function",
	"=>",
	"quote",
	"quasiQuoteExpand",
	"quasiQuote",
	"defMacro",
	"macroExpand",
];

/**
 * @typedef {*} Ast
 */

/**
 * Get deeply nested properties
 *
 * @example
 * ```js
 * const nestedObj = {value: {value: {value: {value: "foo"}}}};
 * const nestedVal = getIn(nestedObj, "value", "value", "value", "value");
 * ```
 * @param {*} object
 * @param  {...any} keys
 * @returns {*|undefined}
 */
export function getIn(object, ...keys) {
	return keys.reduce((nestedValue, key) => {
		if (nestedValue && typeof nestedValue === "object" && key in nestedValue) {
			return nestedValue[key];
		}

		return undefined;
	}, object);
}


/**
 * Creates a deep copy of the given AST node.
 * @description Uses different copy functions based on the type of the AST
 * node to create a deep copy.
 * @param {Ast} ast - The AST node to copy.
 * @returns {Ast} Ast - A deep copy of the given AST node.
 * @throws Err - Throws an error if the AST node type is unrecognized.
 * @example copy(astNode); // Creates a deep copy of astNode
 */
export function copy(ast) {
	// TODO: Implement Atoms

	if (ast === null || typeof ast === "symbol") {
		return ast;
	}

	if ((ast !== null && typeof ast === "object") ||
		ast instanceof Error ||
		Array.isArray(ast) ||
		typeof ast === "function" ||
		typeof ast === "boolean" ||
		typeof ast === "number" ||
		typeof ast === "string") {
		return structuredClone(ast);
	}

	throw new Error("Unmatched object");
}

/**
 * Gets a map of core functions
 * @returns {[key: string, fn: Object|Function][]}
 */
export function getCoreFunctionMap() {
	/**
	 * @type {[key: string, fn: Object|Function][]}
	 */
	return [
		["getIn", getIn],
		["copy", copy]
	];
}

/**
 * Map of all symbols to their functions.
 */
export const combinedFnMap = [
	...getCoreFunctionMap(),
	...getJsFunctionMap(),
	...getHtmlFunctionMap(),
	...getCssFunctionMap()
];

/**
 * Map of function keys to symbols.
 * @type {Record<string, symbol>}
 */
export const $ = {};

/**
 * Map of function keys to symbols.
 * @type {[key: symbol, fn: Object | Function][]}
 */
export const ns = [];


// Populate $ and ns with symbols
for (let i = 0;i < combinedFnMap.length;i++) {
	const [key, fn] = combinedFnMap[i];
	const symbol = Symbol.for(key);
	$[key] = symbol;
	ns.push([symbol, fn]);
}

// Add app symbols to $. Their functions are in the main file.
for (const key of APP_SYMBOLS) {
	$[key] = Symbol(key);
}
