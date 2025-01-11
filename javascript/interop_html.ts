import { htmlTags } from '../data/html_definitions.ts';
import * as types from './types.ts';

export const htmlNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

// Add all the HTML tags to the namespace
for (const htmlTag of htmlTags) {
  const symbol = types.createSymbolNode(htmlTag);
  const fn = types.createFunctionNode(tag(htmlTag));
  htmlNamespace.set(symbol, fn);
}

htmlNamespace.set(types.createSymbolNode('document.querySelector'), types.createFunctionNode(querySelector));

/**
 * Injects the tag into the node() arguments
 * @param tag A symbol to be merged into the args
 * @returns anonymous function
 */
export function tag(tag: string) {
  return (...args: types.AstNode[]): types.AstNode => node(types.createSymbolNode(tag), ...args);
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
