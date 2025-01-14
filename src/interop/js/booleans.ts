import * as types from '@/types.ts';

export const booleanFunctions: Array<[string, types.Closure]> = [
  ['Boolean', toBoolean],
];

export function toBoolean(...astArgs: types.AstNode[]): types.AstNode {
  try {
    types.assertArgumentCount(astArgs.length, 1);
    types.assertAstNode(astArgs[0]);
    return types.createBooleanNode(Boolean(astArgs[0]));
  } catch (e) {
    return types.toErrorNode(e);
  }
}
