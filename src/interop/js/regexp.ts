import * as types from '@/types.ts';

export const regExpFunctions: Array<[string, types.Closure]> = [
  ['RegExp.new', newRegExp],
  ['RegExp.prototype.exec', execRegExp],
  ['RegExp.prototype[Symbol.match]', regExpPrototypeMatch],
  ['RegExp.prototype[Symbol.matchAll]', regExpPrototypeMatchAll],
  ['RegExp.prototype[Symbol.replace]', regExpPrototypeReplace],
  ['RegExp.prototype[Symbol.search]', regExpPrototypeSearch],
  ['RegExp.prototype[Symbol.split]', regExpPrototypeSplit],
  ['RegExp.prototype.test', regExpPrototypeTest],
  ['RegExp.prototype.dotAll', regExpPrototypeDotAll],
  ['RegExp.prototype.flags', regExpPrototypeFlags],
  ['RegExp.prototype.global', regExpPrototypeGlobal],
  ['RegExp.prototype.hasIndices', regExpPrototypeHasIndices],
  ['RegExp.prototype.ignoreCase', regExpPrototypeIgnoreCase],
  ['RegExp.prototype.lastIndex', regExpPrototypeLastIndex],
  ['RegExp.prototype.multiline', regExpPrototypeMultiline],
  ['RegExp.prototype.source', regExpPrototypeSource],
  ['RegExp.prototype.sticky', regExpPrototypeSticky],
  ['RegExp.prototype.unicode', regExpPrototypeUnicode],
  ['RegExp.prototype.unicodeSets', regExpPrototypeUnicodeSets],
];

export function createRegExp(pattern: string, flags?: string) {
  return flags
    ? newRegExp(types.createStringNode(pattern), types.createStringNode(flags))
    : newRegExp(types.createStringNode(pattern));
}

export function newRegExp(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertStringNode(astArgs[0]);

  const pattern = astArgs[0].value;

  if (astArgs.length === 2) {
    types.assertStringNode(astArgs[1]);
    const flags = astArgs[1].value;
    const regexp = new RegExp(pattern, flags);
    return types.createAtomNode(regexp);
  }

  const regexp = new RegExp(pattern);
  return types.createAtomNode(regexp);
}

export function execRegExp(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAtomNode(astArgs[0]);

  const regexp = astArgs[0].value;

  types.assertRegExp(regexp);
  types.assertStringNode(astArgs[1]);

  const stringValue = astArgs[1].value;
  const result = regexp.exec(stringValue);
  return result ? types.createVectorNode(result.map(types.toAst)) : types.createNilNode();
}

// TODO: Complete regular expressions:
export function regExpPrototypeMatch(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  const context = astArgs[0];
  const stringValue = astArgs[1].value;
  const result = RegExp.prototype[Symbol.match].call(context, stringValue);
  return types.toAst(result);
}

export function regExpPrototypeMatchAll(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  const context = astArgs[0];
  const stringValue = astArgs[1].value;
  const result = RegExp.prototype[Symbol.matchAll].call(context, stringValue);
  return types.toAst(result);
}

export function regExpPrototypeReplace(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  if (types.isStringNode(astArgs[2])) {
    const context = astArgs[0];
    const stringValue = astArgs[1].value;
    const replaceValue = astArgs[2].value;
    const result = RegExp.prototype[Symbol.replace].call(context, stringValue, replaceValue);
    return types.toAst(result);
  }
  if (types.isFunctionNode(astArgs[2])) {
    const context = astArgs[0];
    const stringValue = astArgs[1].value;
    const replaceValue = astArgs[2].value;
    const result = RegExp.prototype[Symbol.replace].call(context, stringValue, replaceValue);
    return types.toAst(result);
  }
  types.assertNever(astArgs[2]);
}

export function regExpPrototypeSearch(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  const context = astArgs[0];
  const stringValue = astArgs[1].value;
  const result = RegExp.prototype[Symbol.search].call(context, stringValue);
  return types.toAst(result);
}

export function regExpPrototypeSplit(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 2, 3);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  types.assertNumberNode(astArgs[2] ?? types.createNilNode());
  const context = astArgs[0];
  const stringValue = astArgs[1].value;
  const limit = (astArgs[2] ?? types.createNilNode()).value;
  const result = RegExp.prototype[Symbol.split].call(context, stringValue, limit);
  return types.toAst(result);
}

export function regExpPrototypeTest(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertStringNode(astArgs[1]);
  const context = astArgs[0];
  const stringValue = astArgs[1].value;
  const result = RegExp.prototype.test.call(context, stringValue);
  return types.toAst(result);
}

export function regExpPrototypeDotAll(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.dotAll;
  return types.toAst(result);
}

export function regExpPrototypeFlags(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.flags;
  return types.toAst(result);
}

export function regExpPrototypeGlobal(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.global;
  return types.toAst(result);
}

export function regExpPrototypeHasIndices(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.hasIndices;
  return types.toAst(result);
}

export function regExpPrototypeIgnoreCase(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.ignoreCase;
  return types.toAst(result);
}

export function regExpPrototypeLastIndex(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.lastIndex;
  return types.toAst(result);
}

export function regExpPrototypeMultiline(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.multiline;
  return types.toAst(result);
}

export function regExpPrototypeSource(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.source;
  return types.toAst(result);
}

export function regExpPrototypeSticky(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.sticky;
  return types.toAst(result);
}

export function regExpPrototypeUnicode(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.unicode;
  return types.toAst(result);
}

export function regExpPrototypeUnicodeSets(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0];
  const result = RegExp.prototype.unicodeSets;
  return types.toAst(result);
}
