import * as core from '@/core.ts';
import * as types from '@/types.ts';

export const mapFunctions: Array<[string, types.Closure]> = [
  ['Map.isMap', core.isMap], // Added method
  ['Map.new', core.hashMap],
  ['Map.prototype.delete', core.dissoc],
  ['Map.prototype.entries', getEntries],
  ['Map.prototype.get', core.get],
  ['Map.prototype.has', core.contains],
  ['Map.prototype.keys', core.keys],
  ['Map.prototype.set', core.assoc],
  ['Map.prototype.size', core.length],
  ['Map.prototype.values', core.vals],
];

export function getEntries(...astArgs: types.AstNode[]): types.AstNode {
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
