/**
 * @file This file handles recursive "printing" of Ast nodes - meaning that it
 * converts Ast nodes into their string representations.
 */
import * as types from "./types.ts";

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
	if (types.isStringNode(ast)) {
		return printReadably ? `"${types.slash(ast.value)}"` : ast.value;
	}

	if (
		types.isKeywordNode(ast) ||
		types.isBooleanNode(ast) ||
		types.isNumberNode(ast) ||
		types.isSymbolNode(ast)
	) {
		return String(ast.value);
	}

	const atom = ast;
	if (types.isAtomNode(atom)) {
		if (types.isAstNode(atom.value)) {
			return `(atom ${printString(atom.value)})`;
		}

		if (atom.value instanceof HTMLElement) {
			const domNode = types.createDomNodeFromHtmlElement(atom.value);
			return `(atom (element ${printString(domNode)}))`;
		}

		if (atom.value instanceof Event) {
			const event = atom.value.type;
			return `(atom (event ${event})))`;
		}

		return `(atom #<js ${typeof atom.value}>)`;
	}

	if (types.isErrorNode(ast)) {
		const cause = ast.cause ? ast.cause : types.createNilNode();
		const type = ast.name.value;
		const message = `<str "${type}: [${cause.line}:${cause.column}]" ${printString(ast.value, printReadably)}>`;
		return `<error ${message}>`;
	}

	if (types.isFunctionNode(ast)) {
		return "#<fn>";
	}

	if (types.isSequentialNode(ast)) {
		const isList = types.isListNode(ast);
		const serialized = ast.value
			.map((value) => printString(value, printReadably))
			.join(" ");
		return isList ? `(${serialized})` : `[${serialized}]`;
	}

	if (types.isDomNode(ast)) {
		return printHtml(ast, printReadably);
	}

	if (types.isMapNode(ast)) {
		const serialized = types
			.mapFlat(ast.value)
			.map((value) => printString(value, printReadably))
			.join(" ");
		return `{${serialized}}`;
	}

	if (types.isNilNode(ast)) {
		return "nil";
	}

	throw types.createErrorNode(
		`Expected type of ${types.validTypesString} but got ${JSON.stringify(ast)}`,
		types.ErrorTypes.TypeError,
		ast,
	);
}

const selfClosingTags: Set<string> = new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
]);

/**
 * Converts an AST to HTML
 * @param ast - The AST node to be converted
 * @param printReadably - "readably" means new lines are visible
 * @returns An HTML representation of the AST
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export function printHtml(ast: types.AstNode, printReadably = false): string {
	if (types.isDomNode(ast)) {
		const tagName = ast.value;
		const isSelfClosing = selfClosingTags.has(tagName);

		let attributes = "";
		if (ast.attributes.size > 0) {
			attributes = ` ${Array.from(ast.attributes)
				.map(([key, value]) => {
					if (key === "style") return printInlineCss(value, printReadably);
					return `${types.getBareMapKey(key)}="${printHtml(value, printReadably)}"`;
				})
				.join(" ")}`;
		}

		if (isSelfClosing) return `<${tagName}${attributes} />`;

		const body: string[] = [];
		if (ast.children.length > 0) {
			let children: string[] = [];
			if (tagName === "style") {
				children = ast.children.map((child) =>
					printStyleTag(child, printReadably),
				);
			} else if (tagName === "script") {
				children = ast.children.map((child) =>
					printJavaScript(child, printReadably),
				);
			} else {
				children = ast.children.map((child) => printHtml(child, printReadably));
			}
			body.push(children.join(" "));
		}

		if (tagName === "!doctype") {
			return `<!doctype html>\n${body.join(" ")}`;
		}

		return `<${tagName}${attributes}>${body.join(" ")}</${tagName}>`;
	}

	if (types.isStringNode(ast)) {
		return printReadably ? `"${types.slash(ast.value)}"` : ast.value;
	}

	if (
		types.isKeywordNode(ast) ||
		types.isBooleanNode(ast) ||
		types.isNumberNode(ast) ||
		types.isSymbolNode(ast)
	) {
		return String(ast.value);
	}

	const atom = ast;
	if (types.isAtomNode(atom)) {
		return `(atom ${printHtml(atom.value)})`;
	}

	if (types.isErrorNode(ast)) {
		return printHtml(ast.value, printReadably);
	}

	if (types.isFunctionNode(ast)) {
		return "#<fn>";
	}

	if (types.isSequentialNode(ast)) {
		const isList = types.isListNode(ast);
		const serialized = ast.value
			.map((value) => printHtml(value, printReadably))
			.join(" ");
		return isList ? `(${serialized})` : `[${serialized}]`;
	}

	if (types.isMapNode(ast)) {
		const serialized = types
			.mapFlat(ast.value)
			.map((value) => printHtml(value, printReadably))
			.join(" ");
		return `{${serialized}}`;
	}

	if (types.isNilNode(ast)) {
		return "nil";
	}

	throw types.createErrorNode(
		`Expected type of ${types.validTypesString} but got ${JSON.stringify(ast)}`,
		types.ErrorTypes.TypeError,
		ast,
	);
}

/**
 * Prints Ensemble so that it can be interpreted at runtime
 * @param ast - The AST node to be converted
 * @param printReadably - "readably" means new lines are visible
 * @returns A JavaScript representation of the AST
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export function printJavaScript(
	ast: types.AstNode,
	printReadably = false,
): string {
	const en = printString(ast, true);

	const js = `
import { rep, initEnv } from '../../bin/ensemble.js';
rep(\`${en}\`, initEnv());
`;

	return js;
}

/**
 * Converts an abstract syntax tree (AST) node into a CSS string representation.
 *
 * @param ast - The AST node to be converted.
 * @param printReadably - A boolean flag indicating whether to print the CSS in a more readable format.
 * @returns The CSS string representation of the AST node.
 * @throws Will throw an error if the AST node type is not matched.
 */
export function printCss(ast: types.AstNode, printReadably = false): string {
	if (types.isStringNode(ast)) {
		if (printReadably) {
			return types.slash(ast.value);
		}

		return ast.value;
	}

	if (types.isKeywordNode(ast)) {
		return ast.value.slice(1);
	}

	if (types.isNumberNode(ast)) {
		return String(ast.value);
	}

	if (types.isSymbolNode(ast)) {
		return ast.value;
	}

	if (types.isErrorNode(ast)) {
		return printCss(ast.value, printReadably);
	}

	if (types.isListNode(ast) || types.isVectorNode(ast)) {
		return ast.value.map((value) => printCss(value, printReadably)).join(" ");
	}

	if (types.isMapNode(ast)) {
		return [...ast.value]
			.map(([key, valueAst]) => {
				const selector = types.getBareMapKey(key);
				// Use nil for things like {"@import './norm.css'" nil} - When nil is detected the value will be ignored
				if (types.isNilNode(valueAst)) return selector;
				if (types.isMapNode(valueAst)) {
					return `${selector} {${printCss(valueAst, printReadably)}}`;
				}
				return `${types.getBareMapKey(key)}: ${printCss(valueAst, printReadably)};`;
			})
			.join(" ");
	}

	// These types don't have a printable equivalent (yet)
	if (
		types.isBooleanNode(ast) ||
		types.isAtomNode(ast) ||
		types.isFunctionNode(ast) ||
		types.isDomNode(ast) ||
		types.isNilNode(ast)
	) {
		return "";
	}

	throw types.createErrorNode(
		`Expected type of ${types.validTypesString} but got ${JSON.stringify(ast)}`,
		types.ErrorTypes.TypeError,
		ast,
	);
}

export function printStyleTag(
	ast: types.AstNode,
	printReadably = false,
): string {
	return printCss(ast, printReadably);
}

/**
 * Prints inline styles, in other words, just the declaration block
 * @param ast
 * @param printReadably
 * @returns
 */
export function printInlineCss(
	ast: types.AstNode,
	printReadably = false,
): string {
	return types.isMapNode(ast)
		? printCssDeclarationBlock(ast, printReadably)
		: "{}";
}

/**
 * Prints the declaration block portion of a rule
 * @param valueAst
 * @param printReadably
 * @returns string
 */
function printCssDeclarationBlock(
	valueAst: types.MapNode,
	printReadably = false,
): string {
	return [...valueAst.value]
		.map(
			([key, value]) =>
				`${types.getBareMapKey(key)}: ${printCss(value, printReadably)};`,
		)
		.join("");
}
