import * as types from '../../types.ts';

export const jsonFunctions: Array<[string, types.Closure]> = [
  ['JSON.parse', parseJson],
  ['JSON.stringify', stringifyJson],
];

// TODO: Implement reviver?
export function parseJson(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertStringNode(astArgs[0]);
  const result = JSON.parse(astArgs[0].value);
  return types.toAst(result);
}

// BUG: Replacer doesn't work as expected (at all).
export function stringifyJson(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 3);
  types.assertAstNode(astArgs[0]);

  const astNode = types.unwrap(astArgs[0]);

  let replacer: types.Closure | undefined = undefined;
  if (astArgs.length >= 2) {
    if (types.isNilNode(astArgs[1])) {
      replacer = undefined;
    } else if (types.isFunctionNode(astArgs[1])) {
      replacer = astArgs[1].value;
    }
  }

  let space: number | string | undefined = undefined;
  if (astArgs.length === 3) {
    if (types.isNumberNode(astArgs[2]) || types.isStringNode(astArgs[2])) {
      space = astArgs[2].value;
    } else {
      throw new TypeError('Space must be either a number or string.');
    }
  }

  const result = JSON.stringify(astNode, (key, value) => {
    const keyNode = types.toAst(key);
    const replaced = replacer ? replacer(keyNode, value) : value;
    return types.isNilNode(replaced) ? undefined : replaced;
  }, space);

  return types.createStringNode(result);
}
