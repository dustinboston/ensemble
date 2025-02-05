import * as types from '../types.ts';
export declare const htmlTags: Set<string>;
export declare const ns: Map<types.MapKeyNode, types.FunctionNode>;
/**
 * Injects the tag into the node() arguments
 * @param tag A symbol to be merged into the args
 * @returns anonymous function
 */
export declare function tag(tag: string): (...args: types.AstNode[]) => types.AstNode;
/**
 * Create a node from a list of args
 * @param args [tagName: SymbolNode, attributes: MapNode, children: VectorNode | StringNode]
 * @example (node div {:id "foo"} (p (strong "text")))
 * @return Node
 */
export declare function node(...args: types.AstNode[]): types.AstNode;
export declare function querySelector(...args: types.AstNode[]): types.AstNode;
