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
export declare function printString(ast: types.AstNode, printReadably?: boolean): string;
/**
 * Converts an AST to HTML
 * @param ast - The AST node to be converted
 * @param printReadably - "readably" means new lines are visible
 * @returns An HTML representation of the AST
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export declare function printHtml(ast: types.AstNode, printReadably?: boolean): string;
/**
 * Prints Ensemble to JavaScript
 * @param ast - The AST node to be converted
 * @param printReadably - "readably" means new lines are visible
 * @returns A JavaScript representation of the AST
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export declare function printJavaScript(ast: types.AstNode, printReadably?: boolean): string;
/**
 * Converts an abstract syntax tree (AST) node into a CSS string representation.
 *
 * @param ast - The AST node to be converted.
 * @param printReadably - A boolean flag indicating whether to print the CSS in a more readable format.
 * @returns The CSS string representation of the AST node.
 * @throws Will throw an error if the AST node type is not matched.
 */
export declare function printCss(ast: types.AstNode, printReadably?: boolean): string;
export declare function printStyleTag(ast: types.AstNode, printReadably?: boolean): string;
/**
 * Prints inline styles, in other words, just the declaration block
 * @param ast
 * @param printReadably
 * @returns
 */
export declare function printInlineCss(ast: types.AstNode, printReadably?: boolean): string;
