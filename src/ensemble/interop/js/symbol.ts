import * as types from '../../types';

export const symbolFunctions: Array<[string, types.Closure]> = [
  ['Symbol', symbolConstructor],
  ['Symbol.for', symbolFor],
  ['Symbol.keyFor', symbolKeyFor],
];

export function symbolConstructor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 0, 1);

  if (astArgs.length === 1) {
    types.assertStringNode(astArgs[0]);
  }

  const description = astArgs.length === 1 ? astArgs[0].value : undefined;
  const result = Symbol(description);
  return types.createAtomNode(result);
}

export function symbolFor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertStringNode(astArgs[0]);

  const key = astArgs[0].value;
  const result = Symbol.for(key);
  return types.createAtomNode(result);
}

export function symbolKeyFor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAtomNode(astArgs[0]);
  types.assertSymbol(astArgs[0].value);

  const sym = astArgs[0].value;
  const result = Symbol.keyFor(sym);
  return result ? types.createStringNode(result) : types.createNilNode();
}
