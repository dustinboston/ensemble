import * as types from '@/types.ts';

export const jsonFunctions: Array<[string, types.Closure]> = [
  ['JSON.parse', parseJson],
  ['JSON.stringify', stringifyJson],
];

// TODO: Implement reviver?
function parseJson(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertStringNode(astArgs[0]);
  const result = JSON.parse(astArgs[0].value);
  return types.toAst(result);
}

// TODO: Implement replacer?
function stringifyJson(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 3);
  types.assertAstNode(astArgs[0]);
  let space: number | string | undefined = undefined;
  if (astArgs.length === 2 && (types.isNumberNode(astArgs[1]) || types.isStringNode(astArgs[1]))) {
    space = astArgs[1].value;
  }

  types.assertStringNode(astArgs[2]);
  const result = JSON.stringify(types.unwrap(astArgs[0]), null, space);
  return types.createStringNode(result);
}