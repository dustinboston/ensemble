import * as types from '@/types.ts';

export const mapFunctions: Array<[string, types.Closure]> = [
  ['Map.isMap', mapIsMap], // Added method
  ['Map.new', mapNew],
  ['Map.prototype.delete', mapDelete],
  ['Map.prototype.entries', mapGetEntries],
  ['Map.prototype.get', mapGet],
  ['Map.prototype.has', mapHas],
  ['Map.prototype.keys', mapKeys],
  ['Map.prototype.set', mapSet],
  ['Map.prototype.size', mapSize],
  ['Map.prototype.values', mapValues],
];

export function mapIsMap(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  return types.createBooleanNode(types.isMapNode(args[0]));
}

export function mapNew(...args: types.AstNode[]): types.MapNode {
  if (args.length === 0) {
    return types.createMapNode();
  }

  // Create a MapNode from another MapNode
  if (args.length === 1 && types.isMapNode(args[0])) {
    return types.createMapNode(new Map(args[0].value));
  }

  // Create a new MapNode from key/value pairs.
  types.assertEvenArgumentCount(args.length);

  const dict = types.createMapNode();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    types.assertMapKeyNode(key);
    types.setMapElement(dict.value, key, args[i + 1]);
  }

  return dict;
}

export function mapGetEntries(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertMapNode(astArgs[0]);

  const entries = astArgs[0].value.entries();
  const vectors = types.createVectorNode();

  for (const [key, value] of entries) {
    const vector = types.createVectorNode([
      types.toAst(key),
      types.toAst(value),
    ]);
    vectors.value.push(vector);
  }

  return vectors;
}

export function mapSet(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);
  const rest = args.slice(1);

  // Clone the map from the incoming types.Dict
  const dict = types.createMapNode(
    new Map<string, types.AstNode>(args[0].value),
  );
  const pairs = mapNew(...rest);
  for (const [key, value] of pairs.value.entries()) {
    dict.value.set(key, value);
  }

  return dict;
}

/**
 * `dissoc` remove elements from a dict (disassociate).
 * @param args - [types.Dict, DictKey].
 * @returns Types.Dict.
 * @example ({:foo 1 :bar 2}, :foo) ;=> {:bar 2}
 */
export function mapDelete(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);

  const dict = types.createMapNode(
    new Map<string, types.AstNode>(args[0].value),
  );
  for (const dictKey of args.splice(1)) {
    types.assertMapKeyNode(dictKey);
    types.deleteMapElement(dict.value, dictKey);
  }

  return dict;
}

/**
 * `get` get a value from a MapNode by key.
 * @param args - [mapNode: MapNode, key: StringNode]
 * @returns Types.Ast | types.Nil.
 * @example (get {:foo 1 :bar 2} :bar) ;=> 2
 */
export function mapGet(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);

  const mapNode = args[0];
  if (!(types.isMapNode(mapNode))) {
    return types.createNilNode();
  }

  const key = args[1];
  types.assertMapKeyNode(key);

  const value = types.getMapElement(mapNode.value, key);
  if (value !== undefined) {
    return value;
  }

  return types.createNilNode();
}

/**
 * `contains?` determines whether the given key exists in the map or array.
 * @param args - [types.Dict, DictKey].
 * @returns Types.Bool.
 * @example (contains? {:foo 1 :bar 2} :bar) ;=> true
 */
export function mapHas(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const dict = args[0];
  const key = args[1];
  types.assertMapNode(dict);
  types.assertMapKeyNode(key);

  return types.createBooleanNode(types.hasMapElement(dict.value, key));
}

/**
 * `keys` gets a list of all of the keys in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (keys {:foo 1 :bar 2}) ;=> (:foo :bar)
 */
export function mapKeys(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);
  return types.getMapKeys(args[0].value);
}

/**
 * `vals` gets a list of all of the values in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (vals {:foo 1 :bar 2}) ;=> (1 2)
 */
export function mapValues(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertMapNode(args[0]);
  return types.createListNode([...args[0].value.values()]);
}

export function mapSize(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);

  const value = args[0];
  if (types.isNilNode(value)) {
    return types.createNumberNode(0);
  }

  if (types.isMapNode(args[0])) {
    return types.createNumberNode(args[0].value.size);
  } else if (types.isSequentialNode(args[0])) {
    return types.createNumberNode(args[0].value.length);
  } else {
    throw new TypeError('Invalid argument type');
  }
}
