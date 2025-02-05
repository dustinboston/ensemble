import * as types from '../../types.ts';
export declare const mapFunctions: Array<[string, types.Closure]>;
export declare function mapIsMap(...args: types.AstNode[]): types.AstNode;
export declare function mapNew(...args: types.AstNode[]): types.MapNode;
export declare function mapGetEntries(...astArgs: types.AstNode[]): types.AstNode;
export declare function mapSet(...args: types.AstNode[]): types.AstNode;
/**
 * `dissoc` remove elements from a dict (disassociate).
 * @param args - [types.Dict, DictKey].
 * @returns Types.Dict.
 * @example ({:foo 1 :bar 2}, :foo) ;=> {:bar 2}
 */
export declare function mapDelete(...args: types.AstNode[]): types.AstNode;
/**
 * `get` get a value from a MapNode by key.
 * @param args - [mapNode: MapNode, key: StringNode]
 * @returns Types.Ast | types.Nil.
 * @example (get {:foo 1 :bar 2} :bar) ;=> 2
 */
export declare function mapGet(...args: types.AstNode[]): types.AstNode;
/**
 * `contains?` determines whether the given key exists in the map or array.
 * @param args - [types.Dict, DictKey].
 * @returns Types.Bool.
 * @example (contains? {:foo 1 :bar 2} :bar) ;=> true
 */
export declare function mapHas(...args: types.AstNode[]): types.AstNode;
/**
 * `keys` gets a list of all of the keys in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (keys {:foo 1 :bar 2}) ;=> (:foo :bar)
 */
export declare function mapKeys(...args: types.AstNode[]): types.AstNode;
/**
 * `vals` gets a list of all of the values in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (vals {:foo 1 :bar 2}) ;=> (1 2)
 */
export declare function mapValues(...args: types.AstNode[]): types.AstNode;
export declare function mapSize(...args: types.AstNode[]): types.AstNode;
