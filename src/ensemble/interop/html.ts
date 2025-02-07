import * as types from '../types';

export const htmlTags = new Set([
  '!doctype',
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
  'imgmap', // Renamed from map to avoid conflict with core map function
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
]);

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

// Add all the HTML tags to the namespace
for (const htmlTag of htmlTags) {
  ns.set(types.createSymbolNode(htmlTag), types.createFunctionNode(tag(htmlTag)));
}

/**
 * Injects the tag into the node() arguments
 * @param tag A symbol to be merged into the args
 * @returns anonymous function
 */
export function tag(tag: string) {
  return (...args: types.AstNode[]): types.AstNode => {
    return node(types.createSymbolNode(tag), ...args);
  };
}

/**
 * Create a node from a list of args
 * @param args [tagName: SymbolNode, attributes: MapNode, children: VectorNode | StringNode]
 * @example (node div {:id "foo"} (p (strong "text")))
 * @return Node
 */
export function node(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);

  const tagName = args[0];
  types.assertSymbolNode(tagName);

  // Set the attributes and determine where to start collecting children
  const attributes = new Map<string, types.AstNode>();
  const children: types.AstNode[] = [];

  if (types.isMapNode(args[1])) {
    args[1].value.forEach((value, key) => attributes.set(key, value));
    args.slice(2).forEach((child) => children.push(child));
  } else {
    args.slice(1).forEach((child) => children.push(child)); // No attributes
  }

  return types.createDomNode(tagName.value, attributes, children);
}

export function querySelector(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);

  const selector = args[0].value;
  const element = document.querySelector(selector);
  if (element === null) {
    return types.createNilNode();
  }

  const nodeMap = Array.from(element.attributes);
  const attributes: Map<string, types.AstNode> = nodeMap.reduce((map, attr) => {
    return map.set(attr.name, types.createStringNode(attr.value));
  }, new Map<string, types.AstNode>());

  return types.createDomNode(element.tagName, attributes, []);
}

ns.set(types.createSymbolNode('document.querySelector'), types.createFunctionNode(querySelector));
