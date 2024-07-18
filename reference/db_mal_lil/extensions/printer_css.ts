import * as types from '../types.ts';

/**
 * It's easy to accidentally put a space where it shouldn't be.
 * Using this constant makes it obvious where it was intentional.
 */
const spaceCharacter = ' ';

/**
 * The number of spaces to use for each indent level
 */
const spacesPerIndentLevel = 2;

export function printCss(
	ast: types.AstNode,
	printReadably = false,
	indentLevel = 0,
): string {
	if (ast instanceof types.StringNode) {
		if (printReadably) {
			return types.slash(ast.value);
		}

		return ast.value;
	}

	if (ast instanceof types.KeywordNode) {
		return ast.value.slice(1);
	}

	if (ast instanceof types.NumberNode) {
		return String(ast.value);
	}

	if (ast instanceof types.SymbolNode) {
		return ast.value;
	}

	if (ast instanceof types.ErrorNode) {
		return printCss(ast.value, printReadably, indentLevel);
	}

	if (ast instanceof types.ListNode || ast instanceof types.VectorNode) {
		return ast.value
			.map((value) => printCss(value, printReadably, indentLevel))
			.join(' ');
	}

	if (ast instanceof types.MapNode) {
		const indent = ''.padStart(
			indentLevel * spacesPerIndentLevel,
			spaceCharacter,
		);
		const serialized = [...ast.value]
			.map(([key, valueAst]) => {
				const selector = types.dekey(key);
				// Use nil for things like {"@import './norm.css'" nil}
				// When nil is detected the value will be ignored
				if (valueAst instanceof types.NilNode) {
					return `${indent}${selector}`;
				}

				if (valueAst instanceof types.MapNode) {
					return `${indent}${selector} {\n${printCss(
						valueAst,
						printReadably,
						indentLevel + 1,
					)}\n${indent}}`;
				}

				return `${indent}${types.dekey(key)}: ${printCss(
					valueAst,
					printReadably,
					indentLevel + 1,
				)};`;
			})
			.join('\n');
		return serialized;
	}

	// These types don't have a printable equivalent
	if (
		ast instanceof types.BooleanNode ||
		ast instanceof types.AtomNode ||
		ast instanceof types.FunctionNode ||
		ast instanceof types.DomNode ||
		ast instanceof types.NilNode
	) {
		return '';
	}

	throw new Error('unmatched object');
}

export function printHtmlStyleTag(
	ast: types.AstNode,
	printReadably = false,
	indentLevel = 0,
): string {
	const css = printCss(ast, printReadably, indentLevel + 1);
	console.log('indentLevel', indentLevel);
	const indentSpaces = ''.padStart(
		indentLevel * spacesPerIndentLevel,
		spaceCharacter,
	);
	return `\n${css}\n${indentSpaces}`;
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
	if (!(ast instanceof types.MapNode)) {
		return '{}';
	}

	return printDeclarationBlock(ast, printReadably);
}

/**
 * Prints the declaration block portion of a rule
 * @param valueAst
 * @param printReadably
 * @returns string
 */
function printDeclarationBlock(
	valueAst: types.MapNode,
	printReadably = false,
	indentLevel = 0,
): string {
	const declarationBlock = [...valueAst.value]
		.map(([key, value]) => {
			const serializedValue = printCss(value, printReadably, indentLevel);
			return `${types.dekey(key)}: ${serializedValue};`;
		})
		.join('');
	return declarationBlock;
}
