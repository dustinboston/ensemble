import * as types from '@/types.ts';

export const objectFunctions: Array<[string, types.Closure]> = [
  ['Object', objectConstructor],
  ['Object.new', newObject],
  ['Object.assign', objectAssign],
  ['Object.create', objectCreate],
  ['Object.defineProperties', objectDefineProperties],
  ['Object.defineProperty', objectDefineProperty],
  ['Object.entries', objectEntries],
  ['Object.freeze', objectFreeze],
  ['Object.fromEntries', objectFromEntries],
  ['Object.getOwnPropertyDescriptor', objectGetOwnPropertyDescriptor],
  ['Object.getOwnPropertyDescriptors', objectGetOwnPropertyDescriptors],
  ['Object.getOwnPropertyNames', objectGetOwnPropertyNames],
  ['Object.getOwnPropertySymbols', objectGetOwnPropertySymbols],
  ['Object.getPrototypeOf', objectGetPrototypeOf],
  ['Object.groupBy', objectGroupBy],
  ['Object.hasOwn', objectHasOwn],
  ['Object.is', objectIs],
  ['Object.isExtensible', objectIsExtensible],
  ['Object.isFrozen', objectIsFrozen],
  ['Object.isSealed', objectIsSealed],
  ['Object.keys', objectKeys],
  ['Object.preventExtensions', objectPreventExtensions],
  ['Object.seal', objectSeal],
  ['Object.setPrototypeOf', objectSetPrototypeOf],
  ['Object.values', objectValues],
  ['Object.prototype.toLocaleString', objectPrototypeToLocaleString],
  ['Object.prototype.toString', objectPrototypeToString],
  ['Object.prototype.valueOf', objectPrototypeValueOf],
  ['Object.prototype.constructor', objectPrototypeConstructor],
];

function _objectConstructor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const value = astArgs[0].value;
  const result = Object(value);
  return types.toAst(result);
}

function _newObject(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const value = astArgs[0].value;
  const result = new Object(value);
  return types.toAst(result);
}

function objectAssign(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertVectorNode(astArgs[1]);

  const target = astArgs[0].value;
  const sources = astArgs.slice(1).map((x) => x.value);
  const result = Object.assign(target, ...sources);
  return types.toAst(result);
}

function objectCreate(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertMapNode(astArgs[1]);

  const o = astArgs[0].value;
  // deno-lint-ignore no-explicit-any
  const properties = types.unwrapMapNode(astArgs[1]) as PropertyDescriptorMap & ThisType<any>;
  const result = Object.create(o, properties);
  return types.toAst(result);
}

function objectDefineProperties(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertIsOneOf(astArgs[0], [types.MapNode, types.VectorNode, types.ListNode, types.AtomNode]);
  types.assertMapNode(astArgs[1]);
  const o = astArgs[0].value;
  // deno-lint-ignore no-explicit-any
  const properties = types.unwrap(astArgs[1]) as PropertyDescriptorMap & ThisType<any>;
  const result = Object.defineProperties(o, properties);
  return types.toAst(result);
}

function objectDefineProperty(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 3);
  types.assertAstNode(astArgs[0]);
  types.assertIsOneOf(astArgs[1], [types.isNumberNode, types.isSymbolNode, types.isStringNode]);
  types.assertAstNode(astArgs[2]);

  const o = astArgs[0].value;
  const property = astArgs[1].value;
  const descriptor = astArgs[2].value;
  const result = Object.defineProperty(o, property, descriptor);
  return types.toAst(result);
}

function objectEntries(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertOneOf(astArgs[0], [types.isVectorNode, types.isMapNode]);
  const o = astArgs[0].value;
  const result = Object.entries(o);
  return types.toAst(result);
}

function objectFreeze(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.freeze(o);
  return types.toAst(result);
}

function objectFromEntries(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertVectorNode(astArgs[0]);
  if (astArgs[0].value.length === 2 && types.isAstNode(astArgs[0].value[0]) && types.isAstNode(astArgs[0].value[1])) {
    const iterable = astArgs[0].value;
    const result = Object.fromEntries(iterable);
    return types.toAst(result);
  }
  const iterable = astArgs[0].value;
  const result = Object.fromEntries(iterable);
  return types.toAst(result);
}

function objectGetOwnPropertyDescriptor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertOneOf(astArgs[1], [types.isNumberNode, types.isSymbolNode, types.isStringNode]);

  const o = astArgs[0].value;
  const p = astArgs[1].value;
  const result = Object.getOwnPropertyDescriptor(o, p);
  return types.toAst(result);
}

function objectGetOwnPropertyDescriptors(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);

  const obj = astArgs[0].value;
  const result = Object.getOwnPropertyDescriptors(obj);
  return types.toAst(result);
}

function objectGetOwnPropertyNames(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.getOwnPropertyNames(o);
  return types.toAst(result);
}

function objectGetOwnPropertySymbols(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.getOwnPropertySymbols(o);
  return types.toAst(result);
}

function objectGetPrototypeOf(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.getPrototypeOf(o);
  return types.toAst(result);
}

function objectGroupBy(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertVectorNode(astArgs[0]);
  types.assertFunctionNode(astArgs[1]);
  const items = astArgs[0].value;
  const keySelector = astArgs[1].value;
  const result = Object.groupBy(items, keySelector);
  return types.toAst(result);
}

function objectHasOwn(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertOneOf(astArgs[1], [types.isNumberNode, types.isSymbolNode, types.isStringNode]);
  const o = astArgs[0].value;
  const v = astArgs[1].value;
  const result = Object.hasOwn(o, v);
  return types.toAst(result);
}

function objectIs(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertAstNode(astArgs[1]);
  const value1 = astArgs[0].value;
  const value2 = astArgs[1].value;
  const result = Object.is(value1, value2);
  return types.toAst(result);
}

function objectIsExtensible(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.isExtensible(o);
  return types.toAst(result);
}

function objectIsFrozen(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.isFrozen(o);
  return types.toAst(result);
}

function objectIsSealed(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.isSealed(o);
  return types.toAst(result);
}

function objectKeys(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.keys(o);
  return types.toAst(result);
}

function objectPreventExtensions(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.preventExtensions(o);
  return types.toAst(result);
}

function objectSeal(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const o = astArgs[0].value;
  const result = Object.seal(o);
  return types.toAst(result);
}

function objectSetPrototypeOf(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertAstNode(astArgs[0]);
  types.assertOneOf(astArgs[1], [types.isNilNode, types.isAstNode]);
  const o = astArgs[0].value;
  const proto = astArgs[1].value;
  const result = Object.setPrototypeOf(o, proto);
  return types.toAst(result);
}

function objectValues(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertOneOf(astArgs[0], [types.isVectorNode, types.isMapNode]);
  const o = astArgs[0].value;
  const result = Object.values(o);
  return types.toAst(result);
}

function objectPrototypeToLocaleString(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = Object.prototype.toLocaleString.call(context);
  return types.toAst(result);
}

function objectPrototypeToString(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = Object.prototype.toString.call(context);
  return types.toAst(result);
}

function objectPrototypeValueOf(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = Object.prototype.valueOf.call(context);
  return types.toAst(result);
}

function objectPrototypeConstructor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertAstNode(astArgs[0]);
  const result = Object.prototype.constructor;
  return types.toAst(result);
}
