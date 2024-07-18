/**
 * @file Map HTML tags to the `node`
 *
 * The following tags are not implemnted because they are deprecated:
 * acronym, big, center, dir, font, frame, frameset, image, marquee, menuitem,
 * nobr, noembed, noframes, param, plaintext, rb, rtc, strike, tt, xmp,
 *
 * `meta` presents an interesting challenge and would need to be resolved
 * before a v1 release of the web extensions. For now, it is disabled.
 */
import * as types from '../types.ts';
import * as htmlPrinter from './printer_html.ts';

/** A standard Closure that returns a DomNode instead of an Ast */
type ElementClosure = (...args: types.AstNode[]) => types.DomNode;

/** A list of types.Sym/types.Ast pairs to map into the environment */
export const htmlNamespace = new Map<types.SymbolNode, types.AstNode>();

const htmlTags = [
	'a',
	'abbr',
	'address',
	'area',
	'article',
	'aside',
	'audio',
	'b',
	'base',
	'bdi',
	'bdo',
	'blockquote',
	'body',
	'br',
	'button',
	'canvas',
	'caption',
	'cite',
	'code',
	'col',
	'colgroup',
	'data',
	'datalist',
	'dd',
	'del',
	'details',
	'dfn',
	'dialog',
	'div',
	'dl',
	'doctype',
	'dt',
	'em',
	'embed',
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
	'hgroup',
	'hr',
	'html',
	'i',
	'iframe',
	'img',
	// Renamed from map to avoid conflict with core map
	'img-map',
	'input',
	'kbd',
	'label',
	'legend',
	'li',
	'link',
	'main',
	'mark',
	'menu',
	'meter',
	'nav',
	'noscript',
	'object',
	'ol',
	'optgroup',
	'option',
	'output',
	'p',
	'picture',
	'pre',
	'portal',
	'progress',
	'q',
	'rp',
	'rt',
	'ruby',
	's',
	'samp',
	'script',
	'search',
	'section',
	'select',
	'slot',
	'small',
	'source',
	'span',
	'strong',
	'style',
	'sub',
	'summary',
	'sup',
	'table',
	'tbody',
	'td',
	'template',
	'textarea',
	'tfoot',
	'th',
	'thead',
	'time',
	'title',
	'tr',
	'track',
	'u',
	'ul',
	'var',
	'video',
	'wbr',
];

for (const tag of htmlTags) {
	const sym = new types.SymbolNode(tag);
	htmlNamespace.set(sym, new types.FunctionNode(makeElement(sym)));
}

htmlNamespace.set(
	new types.SymbolNode('pr-html-str'),
	new types.FunctionNode(printHtmlString),
);
htmlNamespace.set(
	new types.SymbolNode('html-str'),
	new types.FunctionNode(htmlString),
);

/**
 * Injects the tag into the node() arguments
 * @param tag A symbol to be merged into the args
 * @returns anonymous function
 */
export function makeElement(tag: types.SymbolNode): ElementClosure {
	return (...args: types.AstNode[]): types.DomNode => node(tag, ...args);
}

/**
 * `pr-html-str` convert nodes to escaped strings and print the result
 * @description calls printString on each argument with printReadably set
 * to true, then joins each item with a space, and returns the string.
 * @example (pr-str "abc\ndef\nghi") ;=> "\"abc\\ndef\\nghi\""
 * @param args types.Ast[]
 * @returns types.Str
 */
export function printHtmlString(...args: types.AstNode[]): types.AstNode {
	const result = args
		.map((arg) => htmlPrinter.printHtml(arg, true, true))
		.join('');
	return new types.StringNode(result);
}

/**
 * `html-str` converts nodes to strings as-is and prints the result
 * @description calls printString on each argument with printReadably set \
 * to false, concatenates the results together, and returns the new string.
 * @example (str "abc\ndef\nghi") ;=> "abc\ndef\nghi"
 * @param args types.Ast[]
 * @returns types.Str
 */
export function htmlString(...args: types.AstNode[]): types.AstNode {
	const result = args
		.map((arg) => htmlPrinter.printHtml(arg, false, true))
		.join('');
	return new types.StringNode(result);
}

/**
 * Create a node from a list of args
 * @param args [DictKey, types.Dict?, types.List|types.Str?]
 * - args[0] {DictKey} tagName
 * - args[1] {types.Dict} [attributes]
 * - args[2] {types.List|types.Str} [children]
 * @example (node div {:id "foo"} (p (strong "text")))
 * @return Node
 */
export function node(...args: types.AstNode[]): types.DomNode {
	types.assertMinimumArgumentCount(args.length, 1);

	const tagName = args[0];
	types.assertMapKeyNode(tagName);

	const attrs = new Map<string, types.AstNode>();
	attrs.set(':tagName', tagName);

	// Set the attributes and determine where to start collecting children
	let children: types.AstNode[];
	if (args[1] instanceof types.MapNode) {
		for (const [key, value] of args[1].value) {
			attrs.set(key, value);
		}

		children = args.slice(2);
	} else {
		// No attributes
		children = args.slice(1);
	}

	attrs.set(':children', new types.VectorNode(children));

	return new types.DomNode(attrs);
}
