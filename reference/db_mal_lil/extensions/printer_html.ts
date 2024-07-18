import * as printer from '../printer.ts';
import * as types from '../types.ts';
import * as cssPrinter from './printer_css.ts';

/**
 * It's easy to accidentally put a space where it shouldn't be.
 * Using this constant makes it obvious where it was intentional.
 */
const spaceCharacter = ' ';

/**
 * The number of spaces to use for each indent level
 */
const spacesPerIndentLevel = 2;

/**
 * These tags should have a line break after the start tag. e.g. `<div>\n`
 */
const lineBreakAfterOpeningTag = new Set([
	'article',
	'aside',
	'blockquote',
	'body',
	'canvas',
	'div',
	'dl',
	'figure',
	'footer',
	'form',
	'head',
	'header',
	'html',
	'main',
	'noscript',
	'ol',
	'script',
	'section',
	'table',
	'tfoot',
	'thead',
	'tr',
	'ul',
]);

/**
 * These tags should have a line break after the closing tag. e.g. `</div>\n`
 */
const lineBreakAfterClosingTag = new Set([
	'!DOCTYPE',
	'address',
	'article',
	'aside',
	'blockquote',
	'body',
	'br',
	'canvas',
	'dd',
	'div',
	'dl',
	'dt',
	'fieldset',
	'figcaption',
	'figure',
	'footer',
	'form',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'head',
	'header',
	'hr',
	'html',
	'li',
	'main',
	'nav',
	'noscript',
	'ol',
	'p',
	'pre',
	'script',
	'section',
	'style',
	'table',
	'tbody',
	'tfoot',
	'thead',
	'title',
	'tr',
	'ul',
	'video',
]);

/**
 * Prints the types.Ast as HTML (transpile)
 * @param ast The types.Ast to print
 * @param printBreaks Print with visible line breaks
 * @param tidySpacing Whether to dedupe spaces and strip line breaks
 * @param indentLevel Beginning indent level, typically 0
 * @returns A string of HTML
 */
export function printHtml(
	ast: types.AstNode,
	printBreaks = false,
	tidySpacing = false,
	indentLevel = 0,
): string {
	function printWithDefaults(value: types.AstNode): string {
		return printHtml(value, printBreaks, tidySpacing, indentLevel);
	}

	if (ast instanceof types.StringNode) {
		const astValue = ast.value;
		const despaced = tidySpacing
			? types.normalizeWhitespace(astValue)
			: astValue;
		const entitized = types.entitize(despaced);
		return printBreaks ? types.slash(entitized) : entitized;
	}

	if (ast instanceof types.KeywordNode) {
		return ast.value.slice(1).trim();
	}

	if (ast instanceof types.BooleanNode || ast instanceof types.NumberNode) {
		return String(ast.value);
	}

	if (ast instanceof types.SymbolNode) {
		return ast.value.trim();
	}

	if (ast instanceof types.AtomNode) {
		return `(atom ${printWithDefaults(ast.value)})`;
	}

	if (ast instanceof types.ErrorNode) {
		printWithDefaults(ast.value);
		return '';
	}

	if (ast instanceof types.FunctionNode) {
		return '#<fn>';
	}

	if (ast instanceof types.ListNode || ast instanceof types.VectorNode) {
		return ast.value.map((value) => printWithDefaults(value)).join('');
	}

	if (ast instanceof types.MapNode) {
		const serialized = [...ast.value]
			.map(([dictKey, value]) => {
				const key = types.dekey(dictKey);
				if (value instanceof types.NilNode) {
					return key;
				}

				const attrValue =
					key === 'style'
						? cssPrinter.printInlineCss(value)
						: printWithDefaults(value);
				return `${key}="${attrValue}"`;
			})
			.join(spaceCharacter);
		return serialized;
	}

	if (ast instanceof types.DomNode) {
		return printDomNode(ast, printBreaks, tidySpacing, indentLevel);
	}

	if (ast instanceof types.NilNode) {
		return '';
	}

	throw new Error('unmatched object');
}

/**
 * Prints the a DomNode as HTML
 * @param domNodeAst The DomNode to print
 * @param printBreaks Print with visible line breaks
 * @param tidySpacing Whether to dedupe spaces and strip line breaks
 * @param indentLevel Beginning indent level, typically 0
 * @returns A string of HTML
 */
function printDomNode(
	domNodeAst: types.DomNode,
	printBreaks = false,
	tidySpacing = false,
	indentLevel = 0,
) {
	const tag = getTagName(domNodeAst);
	const attrs = printAttributes(
		domNodeAst,
		printBreaks,
		tidySpacing,
		indentLevel,
	);

	const indentSpaces = ''.padStart(
		indentLevel * spacesPerIndentLevel,
		spaceCharacter,
	);
	const innerBreak = lineBreakAfterOpeningTag.has(tag) ? '\n' : '';
	const endBreak = lineBreakAfterClosingTag.has(tag) ? '\n' : '';

	const startTag = `${indentSpaces}<${tag}${attrs}>${innerBreak}`;
	const endTag = `${innerBreak ? indentSpaces : ''}</${tag}>${endBreak}`;

	const children = printChildren(
		domNodeAst,
		printBreaks,
		tidySpacing,
		indentLevel,
	);
	const childBreak = children.endsWith('\n') ? '' : innerBreak;
	const childTags = `${children}${childBreak}`;

	if (tag === '!DOCTYPE') {
		return `<${tag}${attrs}>${endBreak}${children}`;
	}

	if (children) {
		return `${startTag}${childTags}${endTag}`;
	}

	return `${indentSpaces}<${tag}${attrs} />${endBreak}`;
}

/**
 * Gets attributes from a types.DomNode and prints them
 * @param ast
 * @param printBreaks Print with visible line breaks
 * @param tidySpacing Whether to dedupe spaces and strip line breaks
 * @param indentLevel Beginning indent level, typically 0
 * @returns stringified attributes
 */
function printAttributes(
	ast: types.DomNode,
	printBreaks: boolean,
	tidySpacing: boolean,
	indentLevel: number,
): string {
	const ignore = new Set([':tagName', ':children']);
	const filtered = [...ast.value.entries()].filter((x) => !ignore.has(x[0]));

	if (filtered.length > 0) {
		const attrMap = new Map<string, types.AstNode>(filtered);
		const dict = new types.MapNode(attrMap);
		return (
			spaceCharacter +
			printHtml(dict, printBreaks, tidySpacing, indentLevel)
		);
	}

	return '';
}

/**
 * Gets the child nodes as a string and ensures that indentation for each
 * is correct, especially with <pre> and <br /> tags. Hands off processing
 * of style and script tags to their respective printers.
 *
 * @description
 * We need two indent levels: One for before the child tag and one for
 * after the child tag. Here is how each are determined:
 *
 * 1. Before: checks if `currentTag` has a break after the start tag
 *    a. Indent before if currentTag has innerBreak, e.g. `<ul>\n  <li>`
 *    b. Otherwise, no indent, so parent + child touch, e.g. `<li><a>`
 *
 * 2. After only applies to <br /> tags, but could theoretically be
 *    need for any tag that causes a flow change within a block.
 *    a. Indent after if there is an break, e.g. `<br/>\n  Indented`
 *    b. Otherwise no indent, so siblings touch, e.g. </strong><em>
 *
 * @param ast
 * @param printBreaks Print with visible line breaks
 * @param tidySpacing Whether to dedupe spaces and strip line breaks
 * @param indentLevel Beginning indent level, typically 0
 * @returns A string of processed children
 */
function printChildren(
	ast: types.DomNode,
	printBreaks: boolean,
	tidySpacing: boolean,
	indentLevel: number,
): string {
	const childrenAst = ast.value.get(':children');
	types.assertDefined<types.AstNode>(childrenAst);
	types.assertVectorNode(childrenAst);

	const currentTag = getTagName(ast);

	// See "Before" indent above.
	const indentBefore = lineBreakAfterOpeningTag.has(currentTag)
		? ++indentLevel
		: 0;

	if (currentTag === 'style') {
		// Reminder: This is a <style> tag, not a style attr or a stylesheet
		return cssPrinter.printHtmlStyleTag(
			childrenAst,
			printBreaks,
			indentLevel,
		);
	}

	if (currentTag === 'script') {
		// This will need to use the jsPrinter
		return printer.printString(childrenAst, printBreaks);
	}

	if (currentTag === 'pre') {
		// Preserve line breaks for <pre> tags and zero out their indent levels
		// (otherwise the indenting will be messed up)
		return childrenAst.value
			.map((x) => printHtml(x, printBreaks, false, 0))
			.join('\n');
	}

	// Process each child node individually rather than as a types.Vec so that
	// we can handle indentation at an individual level.
	return childrenAst.value
		.map((childAst) => {
			const childString = printHtml(
				childAst,
				printBreaks,
				tidySpacing,
				indentBefore,
			);

			// See "After" indent above.
			if (
				childAst instanceof types.DomNode &&
				getTagName(childAst) === 'br'
			) {
				return (
					childString +
					''.padStart(
						indentLevel * spacesPerIndentLevel,
						spaceCharacter,
					)
				);
			}

			return childString;
		})
		.join('');
}

/**
 * Rename tags back to their correct name
 * @description
 * Some tag names conflict with other function names in the environment.
 * The less important one gets renamed to something else. We convert it back
 * to its actual tag name here.
 * @param ast
 * @returns An HTML tag name
 */
function getTagName(ast: types.DomNode): string {
	const map = ast.value;
	const tagNameAst = map.get(':tagName');
	types.assertDefined<types.StringNode>(tagNameAst);

	const tagName = tagNameAst.value;
	if (tagName === 'doctype') {
		return '!DOCTYPE';
	}

	if (tagName === 'img-map') {
		return 'map';
	}

	return tagName;
}
