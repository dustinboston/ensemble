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

  if (ast instanceof types.DomNode) {
    const body: string[] = [ast.value];

    if (ast.attributes.size > 0) {
      const values = types.mapFlat(ast.attributes).map((value) => printString(value, printReadably)).join(' ');
      body.push(`{${values}}`);
    }

    if (ast.children.length > 0) {
      const children: string[] = ast.children.map((child) => printString(child, printReadably));
      body.push(children.join(' '));
    }

    return `<${body.join(' ')}>`;
  }

  if (ast instanceof types.MapNode) {
    const serialized = types
      .mapFlat(ast.value)
      .map((value) => printString(value, printReadably))
      .join(' ');
    return `{${serialized}}`;
  }

  if (ast instanceof types.NilNode) {
    return 'nil';
  }

  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}

const selfClosingTags: Set<string> = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/**
 * Converts an AST to HTML
 * @param ast - The AST node to be converted
 * @param printReadably - "readably" means new lines are visible
 * @returns An HTML representation of the AST
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export function printHtml(ast: types.AstNode, printReadably = false): string {
  if (ast instanceof types.DomNode) {
    const tagName = ast.value;
    const isSelfClosing = selfClosingTags.has(tagName);

    let attributes = '';
    if (ast.attributes.size > 0) {
      attributes = ' ' + Array.from(ast.attributes).map(([key, value]) => {
        if (key === 'style') return printInlineCss(value, printReadably);
        return `${types.dekey(key)}="${printHtml(value, printReadably)}"`;
      }).join(' ');
    }

    if (isSelfClosing) return `<${tagName}${attributes} />`;

    const body: string[] = [];
    if (ast.children.length > 0) {
      let children: string[] = [];
      if (tagName === 'style') {
        children = ast.children.map((child) => printStyleTag(child, printReadably));
      } else if (tagName === 'script') {
        children = ast.children.map((child) => printJavaScript(child, printReadably));
      } else {
        children = ast.children.map((child) => printHtml(child, printReadably));
      }
      body.push(children.join(' '));
    }

    if (tagName === '!doctype') {
      return `<!doctype html>\n${body.join(' ')}`;
    }

    return `<${tagName}${attributes}>${body.join(' ')}</${tagName}>`;
  }

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
    return `(atom ${printHtml(ast.value)})`;
  }

  if (ast instanceof types.ErrorNode) {
    return printHtml(ast.value, printReadably);
  }

  if (ast instanceof types.FunctionNode) {
    return '#<fn>';
  }

  if (types.isSequentialNode(ast)) {
    const isList = ast instanceof types.ListNode;
    const serialized = ast.value
      .map((value) => printHtml(value, printReadably))
      .join(' ');
    return isList ? `(${serialized})` : `[${serialized}]`;
  }

  if (ast instanceof types.MapNode) {
    const serialized = types
      .mapFlat(ast.value)
      .map((value) => printHtml(value, printReadably))
      .join(' ');
    return `{${serialized}}`;
  }

  if (ast instanceof types.NilNode) {
    return 'nil';
  }

  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}

/**
 * Prints Ensemble to JavaScript
 * @param ast - The AST node to be converted
 * @param printReadably - "readably" means new lines are visible
 * @returns A JavaScript representation of the AST
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export function printJavaScript(ast: types.AstNode, printReadably = false): string {
  if (ast instanceof types.DomNode) {
    return '/* element */';
  }

  if (ast instanceof types.StringNode || ast instanceof types.KeywordNode || ast instanceof types.SymbolNode) {
    return `"${ast.value}"`;
  }

  if (ast instanceof types.BooleanNode || ast instanceof types.NumberNode) {
    return String(ast.value);
  }

  if (ast instanceof types.AtomNode) {
    // return `(atom ${printJavaScript(ast.value)})`;
    return `/* atom */`;
  }

  if (ast instanceof types.ErrorNode) {
    // return printJavaScript(ast.value, printReadably);
    return '/* error */';
  }

  if (ast instanceof types.FunctionNode) {
    return '#<fn>';
  }

  if (types.isSequentialNode(ast)) {
    const isList = ast instanceof types.ListNode;
    const serialized = ast.value
      .map((value) => printJavaScript(value, printReadably))
      .join(' ');
    return isList ? `(${serialized})` : `[${serialized}]`;
  }

  if (ast instanceof types.MapNode) {
    const serialized = types
      .mapFlat(ast.value)
      .map((value) => printJavaScript(value, printReadably))
      .join(' ');
    return `{${serialized}}`;
  }

  if (ast instanceof types.NilNode) {
    return 'nil';
  }

  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
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
    return printCss(ast.value, printReadably);
  }

  if (ast instanceof types.ListNode || ast instanceof types.VectorNode) {
    return ast.value
      .map((value: types.AstNode) => printCss(value, printReadably))
      .join(' ');
  }

  if (ast instanceof types.MapNode) {
    return [...ast.value]
      .map(([key, valueAst]) => {
        const selector = types.dekey(key);
        // Use nil for things like {"@import './norm.css'" nil} - When nil is detected the value will be ignored
        if (valueAst instanceof types.NilNode) return selector;
        if (valueAst instanceof types.MapNode) return `${selector} {${printCss(valueAst, printReadably)}}`;
        return `${types.dekey(key)}: ${printCss(valueAst, printReadably)};`;
      }).join(' ');
  }

  // These types don't have a printable equivalent (yet)
  if (
    ast instanceof types.BooleanNode || ast instanceof types.AtomNode || ast instanceof types.FunctionNode ||
    ast instanceof types.DomNode ||
    ast instanceof types.NilNode
  ) {
    return '';
  }

  throw new Error('unmatched object');
}

export function printStyleTag(ast: types.AstNode, printReadably = false): string {
  return printCss(ast, printReadably);
}

/**
 * Prints inline styles, in other words, just the declaration block
 * @param ast
 * @param printReadably
 * @returns
 */
export function printInlineCss(ast: types.AstNode, printReadably = false): string {
  return types.isMapNode(ast) ? printCssDeclarationBlock(ast, printReadably) : '{}';
}

/**
 * Prints the declaration block portion of a rule
 * @param valueAst
 * @param printReadably
 * @returns string
 */
function printCssDeclarationBlock(valueAst: types.MapNode, printReadably = false): string {
  return [...valueAst.value].map(([key, value]) => `${types.dekey(key)}: ${printCss(value, printReadably)};`).join('');
}
