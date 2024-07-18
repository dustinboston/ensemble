/**
 * @file Functions specific to CSS
 */

import * as types from '../types.ts';
import * as cssPrinter from './printer_css.ts';

export const cssNamespace = new Map<types.SymbolNode, types.AstNode>([
	[new types.SymbolNode('pr-css'), new types.FunctionNode(prCss)],
]);

/**
 * `pr-css` convert a nested dictionary to css and print the result
 * @description calls printCss on each argument with printReadably set
 * to true, then joins each item, and returns the string.
 * @example (pr-str {"body" {:color "red"}}) ;=> body {color: red;}
 * @param args Ast[]
 * @returns Str
 */
export function prCss(...args: types.AstNode[]): types.AstNode {
	const result = args
		.map((arg) => {
			const result = cssPrinter.printCss(arg, false);
			return result;
		})
		.join('');
	return new types.StringNode(result);
}
