var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/ensemble/types.ts
var types_exports = {};
__export(types_exports, {
  AtomNode: () => AtomNode,
  BooleanNode: () => BooleanNode,
  DomNode: () => DomNode,
  ErrorNode: () => ErrorNode,
  FunctionNode: () => FunctionNode,
  KeywordNode: () => KeywordNode,
  ListNode: () => ListNode,
  MapNode: () => MapNode,
  NilNode: () => NilNode,
  NumberNode: () => NumberNode,
  StringNode: () => StringNode,
  SymbolNode: () => SymbolNode,
  VectorNode: () => VectorNode,
  append: () => append,
  assertArgumentCount: () => assertArgumentCount,
  assertAstNode: () => assertAstNode,
  assertAtomNode: () => assertAtomNode,
  assertBooleanNode: () => assertBooleanNode,
  assertDefined: () => assertDefined,
  assertDomNode: () => assertDomNode,
  assertEq: () => assertEq,
  assertEqual: () => assertEqual,
  assertErrorNode: () => assertErrorNode,
  assertEvenArgumentCount: () => assertEvenArgumentCount,
  assertFunctionNode: () => assertFunctionNode,
  assertGreaterThanEqual: () => assertGreaterThanEqual,
  assertIsOneOf: () => assertIsOneOf,
  assertKeywordNode: () => assertKeywordNode,
  assertListNode: () => assertListNode,
  assertMapKeyNode: () => assertMapKeyNode,
  assertMapNode: () => assertMapNode,
  assertMetadataType: () => assertMetadataType,
  assertMinimumArgumentCount: () => assertMinimumArgumentCount,
  assertNilNode: () => assertNilNode,
  assertNullOrUndefined: () => assertNullOrUndefined,
  assertNumberNode: () => assertNumberNode,
  assertRegExp: () => assertRegExp,
  assertSequential: () => assertSequential,
  assertSequentialValues: () => assertSequentialValues,
  assertStringNode: () => assertStringNode,
  assertSymWithValue: () => assertSymWithValue,
  assertSymbol: () => assertSymbol,
  assertSymbolNode: () => assertSymbolNode,
  assertTrue: () => assertTrue,
  assertUndefined: () => assertUndefined,
  assertVariableArgumentCount: () => assertVariableArgumentCount,
  assertVectorNode: () => assertVectorNode,
  continueResult: () => continueResult,
  convertMapKeyToString: () => convertMapKeyToString,
  convertStringToMapKey: () => convertStringToMapKey,
  copy: () => copy,
  copyAtomNode: () => copyAtomNode,
  copyBooleanNode: () => copyBooleanNode,
  copyDomNode: () => copyDomNode,
  copyErrorNode: () => copyErrorNode,
  copyFunctionNode: () => copyFunctionNode,
  copyKeywordNode: () => copyKeywordNode,
  copyListNode: () => copyListNode,
  copyMapNode: () => copyMapNode,
  copyNilNode: () => copyNilNode,
  copyNumberNode: () => copyNumberNode,
  copyStringNode: () => copyStringNode,
  copySymbolNode: () => copySymbolNode,
  copyVectorNode: () => copyVectorNode,
  createAtomNode: () => createAtomNode,
  createBooleanNode: () => createBooleanNode,
  createDomNode: () => createDomNode,
  createErrorNode: () => createErrorNode,
  createFunctionNode: () => createFunctionNode,
  createKeywordNode: () => createKeywordNode,
  createListNode: () => createListNode,
  createMapNode: () => createMapNode,
  createNilNode: () => createNilNode,
  createNumberNode: () => createNumberNode,
  createStringNode: () => createStringNode,
  createSymbolNode: () => createSymbolNode,
  createVectorNode: () => createVectorNode,
  deleteMapElement: () => deleteMapElement,
  getBareMapKey: () => getBareMapKey,
  getMapElement: () => getMapElement,
  getMapKeys: () => getMapKeys,
  getMapValues: () => getMapValues,
  hasMapElement: () => hasMapElement,
  htmlEncode: () => htmlEncode,
  isAstNode: () => isAstNode,
  isAstTruthy: () => isAstTruthy,
  isAtomNode: () => isAtomNode,
  isBooleanNode: () => isBooleanNode,
  isDefined: () => isDefined,
  isDomNode: () => isDomNode,
  isEqualTo: () => isEqualTo,
  isErrorNode: () => isErrorNode,
  isFunctionNode: () => isFunctionNode,
  isKeywordNode: () => isKeywordNode,
  isListNode: () => isListNode,
  isMapKeyNode: () => isMapKeyNode,
  isMapNode: () => isMapNode,
  isNilNode: () => isNilNode,
  isNumberNode: () => isNumberNode,
  isSameClass: () => isSameClass,
  isSequentialNode: () => isSequentialNode,
  isStringNode: () => isStringNode,
  isSymbolNode: () => isSymbolNode,
  isTypedVector: () => isTypedVector,
  isVectorNode: () => isVectorNode,
  listStartsWithSymbol: () => listStartsWithSymbol,
  mapFlat: () => mapFlat,
  normalizeWhitespace: () => normalizeWhitespace,
  prepend: () => prepend,
  returnResult: () => returnResult,
  setMapElement: () => setMapElement,
  slash: () => slash,
  splitAtFirstDot: () => splitAtFirstDot,
  toAst: () => toAst,
  toErrorNode: () => toErrorNode,
  unwrap: () => unwrap,
  unwrapAtomNode: () => unwrapAtomNode,
  unwrapBooleanNode: () => unwrapBooleanNode,
  unwrapDomNode: () => unwrapDomNode,
  unwrapErrorNode: () => unwrapErrorNode,
  unwrapFunctionNode: () => unwrapFunctionNode,
  unwrapKeywordNode: () => unwrapKeywordNode,
  unwrapListNode: () => unwrapListNode,
  unwrapMapNode: () => unwrapMapNode,
  unwrapNilNode: () => unwrapNilNode,
  unwrapNumberNode: () => unwrapNumberNode,
  unwrapStringNode: () => unwrapStringNode,
  unwrapSymbolNode: () => unwrapSymbolNode,
  unwrapVectorNode: () => unwrapVectorNode
});
var AtomNode = class {
  // deno-lint-ignore no-explicit-any
  constructor(value) {
    this.value = value;
  }
};
var BooleanNode = class {
  constructor(value) {
    this.value = value;
  }
};
var DomNode = class {
  // domNode: HTMLElement | null = null;
  constructor(value, attributes = /* @__PURE__ */ new Map(), children = [], metadata) {
    this.value = value;
    this.attributes = attributes;
    this.children = children;
    this.metadata = metadata;
  }
};
var errorTypes = [
  "Error",
  "AggregateError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
var ErrorNode = class _ErrorNode {
  /**
   * @param value - message
   */
  constructor(value, name, cause = createNilNode()) {
    this.value = value;
    if (name !== void 0 && _ErrorNode.isErrorName(name)) {
      this.name = name;
    }
    if (cause !== void 0) {
      this.cause = cause;
    }
  }
  name = createStringNode("Error");
  cause;
  static isErrorName(name) {
    const value = name.value;
    return errorTypes.includes(value);
  }
  static assertErrorName(name) {
    if (!_ErrorNode.isErrorName(name)) {
      throw new TypeError(
        "Error type must be 'Error', 'AggregateError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', or 'URIError'."
      );
    }
  }
};
var FunctionNode = class {
  constructor(value, closureMeta, isMacro2 = false, metadata) {
    this.value = value;
    this.closureMeta = closureMeta;
    this.isMacro = isMacro2;
    this.metadata = metadata;
  }
};
var KeywordNode = class {
  constructor(_value) {
    this._value = _value;
    this._value = _value.replaceAll(":", "");
  }
  get value() {
    return this._value + ":";
  }
  set value(keyword2) {
    this._value = keyword2.replaceAll(":", "") + ":";
  }
  get bare() {
    return this._value;
  }
};
var ListNode = class {
  constructor(value, metadata) {
    this.value = value;
    this.metadata = metadata;
  }
};
var MapNode = class {
  constructor(value = /* @__PURE__ */ new Map(), metadata) {
    this.value = value;
    this.metadata = metadata;
  }
};
var NilNode = class {
  constructor(value = null) {
    this.value = value;
  }
};
var NumberNode = class {
  // TODO: Add support for BigInt, e.g. value: number | bigint and handle internally
  constructor(value) {
    this.value = value;
  }
};
var SymbolNode = class {
  constructor(value) {
    this.value = value;
  }
};
var StringNode = class {
  constructor(value) {
    this.value = value;
  }
};
var VectorNode = class {
  constructor(value, metadata) {
    this.value = value;
    this.metadata = metadata;
  }
};
function assertDomNode(node2) {
  if (!isDomNode(node2)) {
    throw new TypeError("Invalid DomNode");
  }
}
function assertAstNode(node2) {
  if (!isAstNode(node2)) {
    throw new TypeError("Invalid AstNode");
  }
}
function assertAtomNode(node2) {
  if (!isAtomNode(node2)) {
    throw new TypeError("Invalid AtomNode");
  }
}
function assertBooleanNode(node2) {
  if (!isBooleanNode(node2)) {
    throw new TypeError("Invalid BooleanNode");
  }
}
function assertMapNode(node2) {
  if (!isMapNode(node2)) {
    throw new TypeError("Invalid MapNode");
  }
}
function assertErrorNode(node2) {
  if (!isErrorNode(node2)) {
    throw new TypeError("Invalid ErrorNode");
  }
}
function assertFunctionNode(node2) {
  if (!isFunctionNode(node2)) {
    throw new TypeError("Invalid FunctionNode");
  }
}
function assertKeywordNode(node2) {
  if (!isKeywordNode(node2)) {
    throw new TypeError("Invalid KeywordNode");
  }
}
function assertListNode(node2) {
  if (!isListNode(node2)) {
    throw new TypeError("Invalid ListNode");
  }
}
function assertNilNode(node2) {
  if (!isNilNode(node2)) {
    throw new TypeError("Invalid NilNode");
  }
}
function assertNumberNode(node2) {
  if (!isNumberNode(node2)) {
    throw new TypeError("Invalid NumberNode");
  }
}
function assertStringNode(node2) {
  if (!isStringNode(node2)) {
    throw new TypeError("Invalid StringNode");
  }
}
function assertSymbolNode(node2) {
  if (!isSymbolNode(node2)) {
    throw new TypeError("Invalid SymbolNode");
  }
}
function assertVectorNode(node2) {
  if (!isVectorNode(node2)) {
    throw new TypeError("Invalid VectorNode");
  }
}
function assertRegExp(value) {
  if (!(value instanceof RegExp)) {
    throw new Error("Expected a RegExp object.");
  }
}
function assertSymbol(value) {
  if (typeof value !== "symbol") {
    throw new Error("Expected a Symbol object.");
  }
}
function createDomNode(value, attributes, children, metadata) {
  return new DomNode(value, attributes, children, metadata);
}
function createAtomNode(value) {
  return new AtomNode(value);
}
function createBooleanNode(value) {
  return new BooleanNode(value);
}
function createMapNode(value, metadata) {
  return new MapNode(value, metadata);
}
function createErrorNode(value, type, cause) {
  assertAstNode(value);
  return new ErrorNode(value, type, cause);
}
function createFunctionNode(value, closureMeta, isMacro2, metadata) {
  return new FunctionNode(value, closureMeta, isMacro2, metadata);
}
function createKeywordNode(value) {
  return new KeywordNode(value);
}
function createListNode(value, metadata) {
  return new ListNode(value, metadata);
}
function createNilNode(value) {
  return new NilNode(value);
}
function createNumberNode(value) {
  return new NumberNode(value);
}
function createStringNode(value) {
  return new StringNode(value);
}
function createSymbolNode(value) {
  return new SymbolNode(value);
}
function createVectorNode(value = [], metadata) {
  return new VectorNode(value, metadata);
}
function isDomNode(node2) {
  return node2 instanceof DomNode;
}
function isAstNode(node2) {
  return isAtomNode(node2) || isBooleanNode(node2) || isDomNode(node2) || isErrorNode(node2) || isFunctionNode(node2) || // isJsNode(node) ||
  isKeywordNode(node2) || isListNode(node2) || isMapNode(node2) || isNilNode(node2) || isNumberNode(node2) || isStringNode(node2) || isSymbolNode(node2) || isVectorNode(node2);
}
function isAtomNode(node2) {
  return node2 instanceof AtomNode;
}
function isBooleanNode(node2) {
  return node2 instanceof BooleanNode && typeof node2.value === "boolean";
}
function isMapNode(node2) {
  return node2 instanceof MapNode && node2.value instanceof Map;
}
function isErrorNode(node2) {
  return node2 instanceof ErrorNode && isAstNode(node2.value);
}
function isFunctionNode(node2) {
  return node2 instanceof FunctionNode && typeof node2.value === "function";
}
function isKeywordNode(node2) {
  return node2 instanceof KeywordNode && typeof node2.value === "string" && node2.value.endsWith(":");
}
function isListNode(node2) {
  return node2 instanceof ListNode && node2.value.every(isAstNode);
}
function isNilNode(node2) {
  return node2 instanceof NilNode && node2.value === null;
}
function isNumberNode(node2) {
  return node2 instanceof NumberNode && typeof node2.value === "number";
}
function isStringNode(node2) {
  return node2 instanceof StringNode && typeof node2.value === "string";
}
function isSymbolNode(node2) {
  return node2 instanceof SymbolNode && typeof node2.value === "string";
}
function isVectorNode(node2) {
  return node2 instanceof VectorNode && node2.value.every(isAstNode);
}
function isSameClass(object1, object2) {
  return Object.getPrototypeOf(object1) === Object.getPrototypeOf(object2);
}
function assertEq(a, b) {
  if (!isEqualTo(a, b)) {
    throw new Error("Values are not equal");
  }
}
function assertDefined(object) {
  if (object === void 0) {
    throw new Error("Value is undefined");
  }
}
function assertUndefined(object) {
  if (object !== void 0) {
    throw new Error("Value is not undefined");
  }
}
function assertNullOrUndefined(object) {
  if (object !== void 0 && object !== null) {
    throw new Error("Value is not null or undefined");
  }
}
function isDefined(object) {
  return object !== void 0;
}
function assertTrue(object) {
  if (object === false) {
    throw new Error("Value is not true");
  }
}
function isAstTruthy(a, useJavaScriptTruthiness = false) {
  if (isBooleanNode(a)) {
    return a.value;
  }
  const atom2 = a;
  if (isAtomNode(atom2)) {
    return isAstNode(atom2.value) ? isAstTruthy(atom2.value) : Boolean(atom2.value);
  }
  const nilAst = a;
  if (isNilNode(nilAst)) {
    return false;
  }
  if (isNumberNode(a)) {
    if (useJavaScriptTruthiness) {
      return Boolean(a.value);
    } else {
      return true;
    }
  }
  return Boolean(a.value);
}
function isSequentialNode(value) {
  return isListNode(value) || isVectorNode(value);
}
function assertSequential(value) {
  if (!isListNode(value) && !isVectorNode(value)) {
    throw new TypeError("Invalid sequential type");
  }
}
function assertMapKeyNode(value) {
  if (!(isStringNode(value) || isSymbolNode(value) || isKeywordNode(value))) {
    throw new TypeError(`Invalid dictionary key ${JSON.stringify(value)}`);
  }
}
function isMapKeyNode(value) {
  return isStringNode(value) || isSymbolNode(value) || isKeywordNode(value);
}
function assertMetadataType(value) {
  if (!isFunctionNode(value) && !isListNode(value) && !isVectorNode(value) && !isMapNode(value) && !isDomNode(value)) {
    throw new TypeError("Invalid metadata type");
  }
}
function assertArgumentCount(actualCount, expectedCount, optionalMessage) {
  if (actualCount !== expectedCount) {
    let message = `Wanted ${expectedCount} arguments but got ${actualCount}`;
    if (optionalMessage) {
      message += ` ${optionalMessage}`;
    }
    throw new Error(message);
  }
}
function assertVariableArgumentCount(actualCount, minExpectedCount, maxExpectedCount) {
  if (actualCount < minExpectedCount || actualCount > maxExpectedCount) {
    throw new Error("Unexpected number of arguments");
  }
}
function assertMinimumArgumentCount(actualCount, minExpectedCount) {
  if (actualCount < minExpectedCount) {
    throw new Error("Unexpected minimum number of arguments");
  }
}
function assertEvenArgumentCount(maybeEven) {
  if (maybeEven % 2 !== 0) {
    throw new Error("Uneven number of arguments");
  }
}
function assertSequentialValues(sequentialValues, typeClass) {
  for (const p of sequentialValues) {
    if (!(p instanceof typeClass)) {
      throw new TypeError("All values must be of the same type");
    }
  }
}
function assertIsOneOf(astNode, typeClasses) {
  if (!typeClasses.some((typeClass) => astNode instanceof typeClass)) {
    throw new TypeError("Invalid type");
  }
}
function isTypedVector(sequentialValues, typeClass) {
  return sequentialValues.value.every((p) => p instanceof typeClass);
}
function isEqualTo(a, b) {
  if (isSequentialNode(a) && isSequentialNode(b)) {
    if (a.value.length !== b.value.length) {
      return createBooleanNode(false);
    }
    for (let i = 0; i < a.value.length; i++) {
      if (!isEqualTo(a.value[i], b.value[i]).value) {
        return createBooleanNode(false);
      }
    }
    return createBooleanNode(true);
  }
  if (isMapNode(a) && isMapNode(b)) {
    if (a.value.size !== b.value.size) {
      return createBooleanNode(false);
    }
    for (const [aKeyString, aValue] of a.value) {
      const bValue = b.value.get(aKeyString);
      if (bValue === void 0) {
        return createBooleanNode(false);
      }
      const recurResult = isEqualTo(aValue, bValue);
      if (!recurResult.value) {
        return createBooleanNode(false);
      }
    }
    return createBooleanNode(true);
  }
  if (!isSameClass(a, b)) {
    return createBooleanNode(false);
  }
  const result = a.value === b.value;
  return createBooleanNode(result);
}
function listStartsWithSymbol(listNode, symbolValue) {
  const isListWithSymbol = isListNode(listNode) && isSymbolNode(listNode.value[0]);
  if (isListWithSymbol && symbolValue !== void 0) {
    return listNode.value[0].value === symbolValue;
  }
  return isListWithSymbol;
}
function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Unexpected value '${actual}', wanted ${expected}`);
  }
}
function assertGreaterThanEqual(actual, expected) {
  if (actual >= expected) {
    throw new Error("Unexpected value");
  }
}
function assertSymWithValue(sym, value) {
  assertEqual(sym.value, value);
}
function continueResult(ast, env) {
  return {
    continue: { ast, env },
    return: void 0
  };
}
function returnResult(ast) {
  return {
    continue: void 0,
    return: ast
  };
}
var prepend = (acc, curr) => [
  curr,
  ...acc
];
var append = (acc, curr) => [
  ...acc,
  curr
];
function copy(ast) {
  if (isAtomNode(ast)) {
    return copyAtomNode(ast);
  }
  if (isBooleanNode(ast)) {
    return copyBooleanNode(ast);
  }
  if (isMapNode(ast)) {
    return copyMapNode(ast);
  }
  if (isErrorNode(ast)) {
    return copyErrorNode(ast);
  }
  if (isFunctionNode(ast)) {
    return copyFunctionNode(ast);
  }
  if (isKeywordNode(ast)) {
    return copyKeywordNode(ast);
  }
  if (isListNode(ast)) {
    return copyListNode(ast);
  }
  if (isNilNode(ast)) {
    return copyNilNode(ast);
  }
  if (isNumberNode(ast)) {
    return copyNumberNode(ast);
  }
  if (isStringNode(ast)) {
    return copyStringNode(ast);
  }
  if (isSymbolNode(ast)) {
    return copySymbolNode(ast);
  }
  if (isVectorNode(ast)) {
    return copyVectorNode(ast);
  }
  if (isDomNode(ast)) {
    return copyDomNode(ast);
  }
  throw new Error("Unmatched object");
}
function copyAtomNode(a) {
  return createAtomNode(copy(a.value));
}
function copyBooleanNode(a) {
  return createBooleanNode(a.value);
}
function copyMapNode(a) {
  const dict = createMapNode(new Map(a.value));
  dict.metadata = copy(a.metadata ?? createNilNode());
  return dict;
}
function copyDomNode(a) {
  const tagName = a.value;
  const attributes = a.attributes;
  const children = a.children;
  const domNode = createDomNode(
    tagName,
    new Map(attributes),
    children.map(copy)
  );
  domNode.metadata = copy(a.metadata ?? createNilNode());
  return domNode;
}
function copyErrorNode(a) {
  return createErrorNode(copy(a.value));
}
function copyFunctionNode(a) {
  const func = createFunctionNode(a.value);
  func.isMacro = a.isMacro;
  func.metadata = copy(a.metadata ?? createNilNode());
  if (a.closureMeta) {
    const cl = a.closureMeta;
    func.closureMeta = {
      ast: copy(cl.ast),
      env: cl.env,
      // Copy env?
      parameters: cl.parameters.map((sym) => createSymbolNode(sym.value))
    };
  }
  return func;
}
function copyKeywordNode(a) {
  return createKeywordNode(a.value);
}
function copyListNode(a) {
  const list2 = createListNode(a.value.map((value) => copy(value)));
  list2.metadata = copy(a.metadata ?? createNilNode());
  return list2;
}
function copyNilNode(_ast) {
  return createNilNode();
}
function copyNumberNode(a) {
  return createNumberNode(a.value);
}
function copyStringNode(a) {
  return createStringNode(a.value);
}
function copySymbolNode(a) {
  return createSymbolNode(a.value);
}
function copyVectorNode(a) {
  const vec2 = createVectorNode(a.value.map((value) => copy(value)));
  vec2.metadata = copy(a.metadata ?? createNilNode());
  return vec2;
}
function setMapElement(map, key, value) {
  map.set(convertMapKeyToString(key), value);
}
function deleteMapElement(map, key) {
  map.delete(convertMapKeyToString(key));
}
function hasMapElement(map, key) {
  return map.has(convertMapKeyToString(key));
}
function getMapElement(map, key) {
  return map.get(convertMapKeyToString(key));
}
function getMapKeys(map) {
  const keys2 = [...map.keys()];
  return createListNode(keys2.map((key) => convertStringToMapKey(key)));
}
function convertMapKeyToString(ast) {
  const key = ast;
  if (isKeywordNode(key)) {
    return key.value;
  }
  const string_ = ast;
  if (isStringNode(string_)) {
    return `"${string_.value}"`;
  }
  return ast.value;
}
function convertStringToMapKey(key) {
  if (key.endsWith(":")) {
    return createKeywordNode(key);
  }
  if (key.startsWith('"')) {
    return createStringNode(key.slice(1, -1));
  }
  return createSymbolNode(key);
}
function getBareMapKey(key) {
  const value = isMapKeyNode(key) ? key.value : key;
  if (value.startsWith(":") || value.endsWith(":")) {
    return value.replaceAll(":", "");
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}
function getMapValues(map) {
  const values = [...map.values()];
  return createListNode(values);
}
function mapFlat(map) {
  const flat = [];
  for (const [key, value] of map.entries()) {
    flat.push(convertStringToMapKey(key), value);
  }
  return flat;
}
function splitAtFirstDot(filename) {
  const firstDotIndex = filename.indexOf(".");
  return [filename.slice(0, firstDotIndex), filename.slice(firstDotIndex + 1)];
}
function htmlEncode(unsafe) {
  return unsafe.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
function normalizeWhitespace(string_) {
  return string_.replaceAll("\n", " ").replaceAll(/\s{2,}/g, " ");
}
function slash(string_) {
  return string_.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "\\n");
}
function unwrap(ast) {
  if (isAtomNode(ast)) {
    return unwrapAtomNode(ast);
  }
  if (isBooleanNode(ast)) {
    return unwrapBooleanNode(ast);
  }
  if (isMapNode(ast)) {
    return unwrapMapNode(ast);
  }
  if (isErrorNode(ast)) {
    return unwrapErrorNode(ast);
  }
  if (isFunctionNode(ast)) {
    return unwrapFunctionNode(ast);
  }
  if (isKeywordNode(ast)) {
    return unwrapKeywordNode(ast);
  }
  if (isListNode(ast)) {
    return unwrapListNode(ast);
  }
  if (isNilNode(ast)) {
    return unwrapNilNode();
  }
  if (isNumberNode(ast)) {
    return unwrapNumberNode(ast);
  }
  if (isStringNode(ast)) {
    return unwrapStringNode(ast);
  }
  if (isSymbolNode(ast)) {
    return unwrapSymbolNode(ast);
  }
  if (isVectorNode(ast)) {
    return unwrapVectorNode(ast);
  }
  throw new Error("Could not unwrap object.");
}
function unwrapAtomNode(ast) {
  return unwrap(ast.value);
}
function unwrapBooleanNode(ast) {
  return ast.value;
}
function unwrapDomNode(ast) {
  return ast.value;
}
function unwrapErrorNode(ast) {
  const message = isStringNode(ast.value) ? ast.value.value : String(unwrap(ast.value));
  return new Error(message);
}
function unwrapFunctionNode(ast) {
  return (...args) => toAst(unwrap(ast.value(...args)));
}
function unwrapKeywordNode(ast) {
  return ast.value;
}
function unwrapListNode(ast) {
  return ast.value.map(unwrap);
}
function unwrapMapNode(ast) {
  const plainObject = {};
  for (const [key, value] of ast.value.entries()) {
    plainObject[key] = unwrap(value);
  }
  return plainObject;
}
function unwrapNilNode() {
  return null;
}
function unwrapNumberNode(ast) {
  return ast.value;
}
function unwrapStringNode(ast) {
  return ast.value;
}
function unwrapSymbolNode(ast) {
  return ast.value;
}
function unwrapVectorNode(ast) {
  return ast.value.map(unwrap);
}
function toAst(input) {
  if (isAstNode(input)) {
    return input;
  }
  switch (typeof input) {
    case "undefined": {
      return createNilNode();
    }
    case "number": {
      return createNumberNode(input);
    }
    case "string": {
      if (input.startsWith('"')) {
        return createStringNode(input);
      }
      if (input.startsWith(":")) {
        return createKeywordNode(input);
      }
      return createSymbolNode(input);
    }
    case "boolean": {
      return createBooleanNode(input);
    }
    case "symbol": {
      return createStringNode(JSON.stringify(input));
    }
    case "function": {
      return createFunctionNode(
        (...args) => {
          try {
            return toAst(input(...args.map((x) => x.value)));
          } catch (error) {
            if (error instanceof Error) {
              return createErrorNode(
                createStringNode(error.message)
              );
            }
            return createErrorNode(
              createStringNode(JSON.stringify(error))
            );
          }
        }
      );
    }
    case "object": {
      if (input instanceof Error) {
        return createErrorNode(createStringNode(input.message));
      }
      if (input === null) {
        return createNilNode();
      }
      if (Array.isArray(input)) {
        const array = input.map((element) => toAst(element));
        return createListNode(array);
      }
      if (input instanceof Map) {
        const map2 = /* @__PURE__ */ new Map();
        for (const [maybeString, unknownValue] of input.entries()) {
          const key = String(maybeString);
          const value = toAst(unknownValue);
          map2.set(key, value);
        }
        return createMapNode(map2);
      }
      const inputObject = input;
      const map = /* @__PURE__ */ new Map();
      for (const [maybeString, unknownValue] of Object.entries(
        inputObject
      )) {
        const key = String(maybeString);
        const value = toAst(unknownValue);
        map.set(key, value);
      }
      return createMapNode(map);
    }
    default: {
      const coercedUnknown = String(input);
      return createErrorNode(
        createStringNode(`unknown type ${coercedUnknown}`)
      );
    }
  }
}
function toErrorNode(caughtError) {
  if (isErrorNode(caughtError)) return caughtError;
  if (isAstNode(caughtError)) return createErrorNode(caughtError);
  if (caughtError instanceof Error) {
    return createErrorNode(createStringNode(caughtError.message));
  }
  return createErrorNode(createStringNode(String(caughtError)));
}

// src/ensemble/env.ts
var Env = class {
  // Stores key-value pair mappings.
  value = /* @__PURE__ */ new Map();
  outer;
  binds = [];
  exprs = [];
  /**
   * Creates an instance of the Env class.
   * @param outerEnv - The outer environment.
   * @param binds - Array of symbols to be bound.
   * @param exprs - Array of AST nodes to be bound to symbols.
   * @example new Env();
   */
  constructor(outerEnv = void 0, binds = [], exprs = []) {
    this.outer = outerEnv;
    this.binds = binds;
    this.exprs = exprs;
    for (let i = 0; i < binds.length; i++) {
      const bind2 = binds[i];
      if (bind2.value === "&") {
        const nextBind = binds[i + 1];
        if (nextBind) {
          const remainingExprs = exprs.slice(i);
          const keyString2 = convertMapKeyToString(nextBind);
          this.value.set(
            keyString2,
            createListNode(remainingExprs)
          );
          break;
        }
      }
      const keyString = convertMapKeyToString(bind2);
      this.value.set(keyString, exprs[i]);
    }
  }
  serialize() {
    const serialized = createMapNode();
    let outer = createMapNode();
    if (this.outer) {
      outer = this.outer.serialize();
    }
    const entries = this.value.entries();
    for (const [key, value] of entries) {
      serialized.value.set(key, value);
    }
    serialized.value.set("__outer__", outer);
    return serialized;
  }
  /**
   * Set a key-value pair in the environment.
   * @param key - The key to be added.
   * @param value - The AST node to be associated with the key.
   * @returns The AST node that was added.
   * @example myEnv.set(makeStr('foo'), makeNum(42));
   */
  set(key, value) {
    const keyString = convertMapKeyToString(key);
    this.value.set(keyString, value);
    return value;
  }
  /**
   * Find the environment where a key is defined.
   * @description
   * This uses a polymorphic `this` type to facilitate method chaining
   * and to enable subclasses to return instances of their own type when this
   * method is called. It utilizes the `outer` property which can reference an
   * `Env` instance or any of its subclasses, hence promoting flexibility in
   * terms of where this method can find the specified key.
   * @param key - The key to search for.
   * @returns The environment where the key is defined, or undefined.
   * @example myEnv.findEnv(makeSym('foobar'));
   */
  findEnv(key) {
    const keyString = convertMapKeyToString(key);
    if (this.value.has(keyString)) {
      return this;
    }
    if (!isDefined(this.outer)) {
      return void 0;
    }
    return this.outer.findEnv(key);
  }
  /**
   * Get the value associated with a given key from the
   * symbolTable. Uses the key's value property to search, finds the
   * matching key in the value Map, and returns its value.
   * @param key - A types.DictKeys types.Ast item.
   * @returns Associated value as types.Ast.
   * @throws When the key was not found in any environments.
   * @example myEnv.get(makeKey('foo'));
   */
  get(key) {
    const foundEnv = this.findEnv(key);
    if (foundEnv === void 0) {
      throw new Error(`'${key.value}' not found`);
    }
    const keyString = convertMapKeyToString(key);
    const dictValue = foundEnv.value.get(keyString);
    assertDefined(dictValue);
    return dictValue;
  }
};

// src/ensemble/printer.ts
function printString(ast, printReadably = false) {
  if (isStringNode(ast)) {
    return printReadably ? `"${slash(ast.value)}"` : ast.value;
  }
  if (isKeywordNode(ast) || isBooleanNode(ast) || isNumberNode(ast) || isSymbolNode(ast)) {
    return String(ast.value);
  }
  const atom2 = ast;
  if (isAtomNode(atom2)) {
    return `(atom ${printString(atom2.value)})`;
  }
  if (isErrorNode(ast)) {
    return printString(ast.value, printReadably);
  }
  if (isFunctionNode(ast)) {
    return "#<fn>";
  }
  if (isSequentialNode(ast)) {
    const isList = isListNode(ast);
    const serialized = ast.value.map((value) => printString(value, printReadably)).join(" ");
    return isList ? `(${serialized})` : `[${serialized}]`;
  }
  if (isDomNode(ast)) {
    return printHtml(ast, printReadably);
  }
  if (isMapNode(ast)) {
    const serialized = mapFlat(ast.value).map((value) => printString(value, printReadably)).join(" ");
    return `{${serialized}}`;
  }
  if (isNilNode(ast)) {
    return "nil";
  }
  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}
var selfClosingTags = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function printHtml(ast, printReadably = false) {
  if (isDomNode(ast)) {
    const tagName = ast.value;
    const isSelfClosing = selfClosingTags.has(tagName);
    let attributes = "";
    if (ast.attributes.size > 0) {
      attributes = " " + Array.from(ast.attributes).map(([key, value]) => {
        if (key === "style") return printInlineCss(value, printReadably);
        return `${getBareMapKey(key)}="${printHtml(value, printReadably)}"`;
      }).join(" ");
    }
    if (isSelfClosing) return `<${tagName}${attributes} />`;
    const body = [];
    if (ast.children.length > 0) {
      let children = [];
      if (tagName === "style") {
        children = ast.children.map((child) => printStyleTag(child, printReadably));
      } else if (tagName === "script") {
        children = ast.children.map((child) => printJavaScript(child, printReadably));
      } else {
        children = ast.children.map((child) => printHtml(child, printReadably));
      }
      body.push(children.join(" "));
    }
    if (tagName === "!doctype") {
      return `<!doctype html>
${body.join(" ")}`;
    }
    return `<${tagName}${attributes}>${body.join(" ")}</${tagName}>`;
  }
  if (isStringNode(ast)) {
    return printReadably ? `"${slash(ast.value)}"` : ast.value;
  }
  if (isKeywordNode(ast) || isBooleanNode(ast) || isNumberNode(ast) || isSymbolNode(ast)) {
    return String(ast.value);
  }
  const atom2 = ast;
  if (isAtomNode(atom2)) {
    return `(atom ${printHtml(atom2.value)})`;
  }
  if (isErrorNode(ast)) {
    return printHtml(ast.value, printReadably);
  }
  if (isFunctionNode(ast)) {
    return "#<fn>";
  }
  if (isSequentialNode(ast)) {
    const isList = isListNode(ast);
    const serialized = ast.value.map((value) => printHtml(value, printReadably)).join(" ");
    return isList ? `(${serialized})` : `[${serialized}]`;
  }
  if (isMapNode(ast)) {
    const serialized = mapFlat(ast.value).map((value) => printHtml(value, printReadably)).join(" ");
    return `{${serialized}}`;
  }
  if (isNilNode(ast)) {
    return "nil";
  }
  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}
function printJavaScript(ast, printReadably = false) {
  if (isDomNode(ast)) {
    const element = `(const el = document.createElement("${ast.value}"); document.body.appendChild(el);)`;
    return element;
  }
  if (isListNode(ast)) {
    const serialized = ast.value;
    const fn = serialized[0];
    const args = serialized.slice(1);
    return `(${fn.value}(${args.map((v) => printJavaScript(v)).join(", ")}))`;
  }
  if (isVectorNode(ast)) {
    const serialized = ast.value.map((v) => printJavaScript(v)).join(",");
    return `[${serialized}]`;
  }
  if (isFunctionNode(ast)) {
    const body = ast.value.toString();
    return `(${body})`;
  }
  if (isStringNode(ast) || isKeywordNode(ast) || isSymbolNode(ast)) {
    return `"${ast.value}"`;
  }
  if (isBooleanNode(ast) || isNumberNode(ast)) {
    return String(ast.value);
  }
  if (isMapNode(ast)) {
    const serialized = Object.entries(ast.value).map(([key, value]) => {
      const jsKey = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(key) ? key : `"${key}"`;
      const jsValue = printJavaScript(value, printReadably);
      return `${jsKey}: ${jsValue}`;
    }).join(", ");
    return `{${serialized}}`;
  }
  if (isNilNode(ast)) {
    return "null";
  }
  return "/* javascript */";
}
function printCss(ast, printReadably = false) {
  if (isStringNode(ast)) {
    if (printReadably) {
      return slash(ast.value);
    }
    return ast.value;
  }
  if (isKeywordNode(ast)) {
    return ast.value.slice(1);
  }
  if (isNumberNode(ast)) {
    return String(ast.value);
  }
  if (isSymbolNode(ast)) {
    return ast.value;
  }
  if (isErrorNode(ast)) {
    return printCss(ast.value, printReadably);
  }
  if (isListNode(ast) || isVectorNode(ast)) {
    return ast.value.map((value) => printCss(value, printReadably)).join(" ");
  }
  if (isMapNode(ast)) {
    return [...ast.value].map(([key, valueAst]) => {
      const selector = getBareMapKey(key);
      if (isNilNode(valueAst)) return selector;
      if (isMapNode(valueAst)) {
        return `${selector} {${printCss(valueAst, printReadably)}}`;
      }
      return `${getBareMapKey(key)}: ${printCss(valueAst, printReadably)};`;
    }).join(" ");
  }
  if (isBooleanNode(ast) || isAtomNode(ast) || isFunctionNode(ast) || isDomNode(ast) || isNilNode(ast)) {
    return "";
  }
  throw new Error("unmatched object");
}
function printStyleTag(ast, printReadably = false) {
  return printCss(ast, printReadably);
}
function printInlineCss(ast, printReadably = false) {
  return isMapNode(ast) ? printCssDeclarationBlock(ast, printReadably) : "{}";
}
function printCssDeclarationBlock(valueAst, printReadably = false) {
  return [...valueAst.value].map(([key, value]) => `${getBareMapKey(key)}: ${printCss(value, printReadably)};`).join("");
}

// src/ensemble/reader.ts
var tokenRegex = /[\s,]*(~@|[[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|\/\/.*|[^\s[\]{}('"`,;)]*)/g;
var numberRegex = /^-?\d+(\.\d+)?$/;
var stringRegex = /"(?:\\.|[^\\"])*"/;
var Reader = class {
  /**
   * Creates an instance of the Reader class to manage a stream of tokens
   * derived from a source code string. It initializes with an array of
   * tokens and optionally a position index, defaulted to 0, representing
   * the starting point in the token stream.
   * @param tokens - An array of strings representing the tokens derived
   * 	from source code string.
   * @param pos - The initial position in the token stream. Defaults to 0.
   * @example
   * ```typescript
   * const reader = new Reader(tokenize("(+ 1 2)"));
   * ```
   */
  constructor(tokens, pos = 0) {
    this.tokens = tokens;
    this.pos = pos;
  }
  // Retrieves the next token and advances the position.
  next = () => this.tokens[this.pos++];
  // Peeks at the current token without advancing the position.
  peek = () => this.tokens[this.pos];
};
function tokenize(code) {
  const matches = [...code.matchAll(tokenRegex)].filter((match) => !match[1].startsWith(";") && !match[1].startsWith("//") && match[1] !== "").map((match) => match[1]);
  return matches;
}
function readString(code) {
  console.log(typeof code, code.slice(0, 20));  
  const tokens = tokenize(code);
  if (tokens.length === 0) return createNilNode();
  const result = readForm(new Reader(tokens));
  return result;
}
function readForm(rdr) {
  const token = rdr.peek();
  if (token === void 0) {
    throw new Error("EOF");
  }
  function makeForm(symbol2, meta2) {
    return createListNode([
      createSymbolNode(symbol2),
      readForm(rdr),
      ...meta2 ? [meta2] : []
    ]);
  }
  switch (token) {
    case "'": {
      rdr.next();
      return makeForm("quote");
    }
    case "`": {
      rdr.next();
      return makeForm("quasiquote");
    }
    case "~": {
      rdr.next();
      return makeForm("unquote");
    }
    case "~@": {
      rdr.next();
      return makeForm("splice-unquote");
    }
    case "^": {
      rdr.next();
      const meta2 = readForm(rdr);
      return makeForm("with-meta", meta2);
    }
    case "@": {
      rdr.next();
      return makeForm("deref");
    }
    case ")":
    case "]":
    case "}": {
      throw new Error(`unexpected '${token}'`);
    }
    case "(": {
      return readSequence(rdr, ")");
    }
    case "[": {
      return readSequence(rdr, "]");
    }
    case "{": {
      return readSequence(rdr, "}");
    }
    default: {
      return readAtom(rdr);
    }
  }
}
function readAtom(rdr) {
  const token = rdr.next();
  if (token === void 0) {
    throw new Error("unexpected EOF");
  }
  if (token === "nil") {
    return createNilNode();
  }
  if (token === "false") {
    return createBooleanNode(false);
  }
  if (token === "true") {
    return createBooleanNode(true);
  }
  if (numberRegex.test(token)) {
    return createNumberNode(Number.parseFloat(token));
  }
  if (stringRegex.test(token)) {
    const unescaped = createStringNode(unescapeString(token));
    return unescaped;
  }
  if (token.startsWith(":") || token.endsWith(":")) {
    return createKeywordNode(token);
  }
  if (token.startsWith('"')) {
    throw new Error(`expected '"', got EOF`);
  }
  return createSymbolNode(token);
}
function unescapeString(token) {
  return token.slice(1, -1).replaceAll(/\\(.)/g, (_, c) => c === "n" ? "\n" : c);
}
function readSequence(rdr, end) {
  const astNodes = [];
  rdr.next();
  while (true) {
    const token = rdr.peek();
    if (token === void 0) {
      throw new Error(`expected '${end}', got EOF`);
    }
    if (token === end) {
      rdr.next();
      break;
    }
    astNodes.push(readForm(rdr));
  }
  switch (end) {
    case ")": {
      return createListNode(astNodes);
    }
    case "]": {
      return createVectorNode(astNodes);
    }
    case "}": {
      const dict = createMapNode();
      for (let i = 0; i < astNodes.length; i += 2) {
        const key = astNodes[i];
        assertMapKeyNode(key);
        const value = astNodes[i + 1];
        const keyString = convertMapKeyToString(key);
        dict.value.set(keyString, value);
      }
      return dict;
    }
    default: {
      throw new Error("unknown end value");
    }
  }
}

// src/ensemble/core.ts
var ns = /* @__PURE__ */ new Map();
var nsValues = [
  ["=", eq],
  ["throw", throwError],
  ["nil?", isNil],
  ["true?", isTrue],
  ["false?", isFalse],
  ["symbol", symbol],
  ["Symbol.new", symbol],
  ["symbol?", isSymbolNode2],
  ["keyword", keyword],
  ["keyword?", isKeyword],
  ["number?", isNumber],
  ["macro?", isMacro],
  // Input/Output
  ["pr-str", printEscapedString],
  ["str", printUnescapedString],
  ["prn", printEscapedStringToScreen],
  ["println", printUnescapedStringToScreen],
  ["console.log", printUnescapedStringToScreen],
  ["read-string", readString2],
  // Strings
  ["string?", isString],
  ["trim", trim],
  // Operators
  ["<", lt],
  ["<=", lte],
  [">", gt],
  [">=", gte],
  ["+", add],
  ["-", subtract],
  ["*", multiply],
  ["/", divide],
  ["time-ms", timeMs],
  // Maps
  ["assoc", assoc],
  ["contains?", contains],
  ["dissoc", dissoc],
  ["get", get],
  ["hash-map", hashMap],
  ["keys", keys],
  ["map?", isMap],
  ["vals", vals],
  // We treat lists similar to functions
  ["list", list],
  ["list?", isListNode2],
  ["apply", apply],
  ["fn?", isFn],
  // Arrays
  ["concat", concat],
  ["conj", conj],
  ["cons", cons],
  ["count", length],
  ["empty?", empty],
  ["first", firstNodeInList],
  ["last", lastNodeInList],
  ["join", join],
  ["map", applyToSequence],
  ["nth", nth],
  ["rest", rest],
  ["seq", seq],
  ["sequential?", isSequentialNode2],
  ["vec", vec],
  ["vector", vector],
  ["vector?", isVector],
  ["meta", meta],
  ["with-meta", withMeta],
  ["atom", atom],
  ["atom?", isAtom],
  ["deref", deref],
  ["reset!", reset],
  ["swap!", swap]
];
for (const [sym, fn] of nsValues) {
  ns.set(createSymbolNode(sym), createFunctionNode(fn));
}
function eq(...args) {
  assertArgumentCount(args.length, 2);
  return isEqualTo(args[0], args[1]);
}
function printEscapedString(...args) {
  const result = args.map((arg) => printString(arg, true)).join(" ");
  return createStringNode(result);
}
function printUnescapedString(...args) {
  const result = args.map((arg) => printString(arg, false)).join("");
  return createStringNode(result);
}
function printEscapedStringToScreen(...args) {
  const result = args.map((arg) => printString(arg, true)).join(" ");
  console.log(result);
  return createNilNode();
}
function printUnescapedStringToScreen(...args) {
  const result = args.map((arg) => printString(arg, false)).join(" ");
  console.log(result);
  return createNilNode();
}
function readString2(...args) {
  assertArgumentCount(args.length, 1);
  const code = args[0];
  assertStringNode(code);
  return readString(code.value);
}
function trim(...args) {
  assertArgumentCount(args.length, 1);
  const string_ = args[0];
  assertStringNode(string_);
  return createStringNode(string_.value.trim());
}
function lt(...args) {
  assertArgumentCount(args.length, 2, `
args: ${JSON.stringify(args, null, "  ")}`);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createBooleanNode(a.value < b.value);
}
function lte(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createBooleanNode(a.value <= b.value);
}
function gt(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createBooleanNode(a.value > b.value);
}
function gte(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createBooleanNode(a.value >= b.value);
}
function add(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createNumberNode(a.value + b.value);
}
function subtract(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createNumberNode(a.value - b.value);
}
function multiply(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createNumberNode(a.value * b.value);
}
function divide(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return createNumberNode(a.value / b.value);
}
function timeMs(...args) {
  assertArgumentCount(args.length, 0);
  return createNumberNode((/* @__PURE__ */ new Date()).getTime());
}
function list(...args) {
  for (const arg of args) {
    assertAstNode(arg);
  }
  return createListNode(args);
}
function isListNode2(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isListNode(args[0]));
}
function cons(...args) {
  assertArgumentCount(args.length, 2);
  assertSequential(args[1]);
  return new ListNode([args[0], ...args[1].value]);
}
function concat(...args) {
  const resultList = [];
  for (const arg of args) {
    assertSequential(arg);
    resultList.push(...arg.value);
  }
  return createListNode(resultList);
}
function vec(...args) {
  return isListNode(args[0]) ? createVectorNode(args[0].value) : args[0];
}
function nth(...args) {
  assertArgumentCount(args.length, 2);
  if (isSequentialNode(args[0]) && isNumberNode(args[1])) {
    const index = args[1].value;
    const list2 = args[0];
    const length2 = args[0].value.length;
    if (length2 > 0 && index < length2) {
      const value = list2.value[index];
      return value;
    }
  }
  throw new Error("out of range");
}
function firstNodeInList(...args) {
  assertArgumentCount(args.length, 1);
  if (isSequentialNode(args[0]) && args[0].value.length > 0) {
    return args[0].value[0];
  }
  return createNilNode();
}
function lastNodeInList(...args) {
  assertArgumentCount(args.length, 1);
  if (isSequentialNode(args[0]) && args[0].value.length > 0) {
    return args[0].value[args[0].value.length - 1];
  }
  return createNilNode();
}
function rest(...args) {
  assertArgumentCount(args.length, 1);
  if (isSequentialNode(args[0])) {
    return createListNode(args[0].value.slice(1));
  }
  return createListNode([]);
}
function empty(...args) {
  assertArgumentCount(args.length, 1);
  const list2 = args[0];
  assertSequential(list2);
  return createBooleanNode(list2.value.length === 0);
}
function length(...args) {
  assertArgumentCount(args.length, 1);
  const value = args[0];
  if (isNilNode(value)) {
    return createNumberNode(0);
  }
  if (isMapNode(args[0])) {
    return createNumberNode(args[0].value.size);
  } else if (isSequentialNode(args[0])) {
    return createNumberNode(args[0].value.length);
  } else {
    throw new TypeError("Invalid argument type");
  }
}
function atom(...args) {
  assertArgumentCount(args.length, 1);
  const value = args[0];
  return createAtomNode(value);
}
function isAtom(...args) {
  assertArgumentCount(args.length, 1);
  const node2 = args[0];
  return createBooleanNode(isAtomNode(node2));
}
function deref(...args) {
  assertArgumentCount(args.length, 1);
  const atom2 = args[0];
  assertAtomNode(atom2);
  return atom2.value;
}
function reset(...args) {
  assertArgumentCount(args.length, 2);
  const atom2 = args[0];
  const node2 = args[1];
  assertAtomNode(atom2);
  atom2.value = node2;
  return node2;
}
function swap(...args) {
  assertMinimumArgumentCount(args.length, 2);
  const atom2 = args[0];
  assertAtomNode(atom2);
  const fn = args[1];
  assertFunctionNode(fn);
  const rest2 = args.slice(2);
  atom2.value = fn.value(atom2.value, ...rest2);
  return atom2.value;
}
function throwError(...args) {
  assertArgumentCount(args.length, 1);
  assertAstNode(args[0]);
  throw createErrorNode(args[0]);
}
function apply(...args) {
  const count = args.length;
  assertMinimumArgumentCount(count, 2);
  assertFunctionNode(args[0]);
  const lastList = args[count - 1];
  assertSequential(lastList);
  return args[0].value(...args.slice(1, -1), ...lastList.value);
}
function applyToSequence(...args) {
  const count = args.length;
  assertArgumentCount(count, 2);
  assertFunctionNode(args[0]);
  assertSequential(args[1]);
  const fn = args[0];
  const list2 = args[1];
  const result = list2.value.map((item) => fn.value(item));
  return createListNode(result);
}
function conj(...args) {
  assertMinimumArgumentCount(args.length, 2);
  assertSequential(args[0]);
  const [seq2, ...rest2] = args;
  if (isListNode(seq2)) {
    return createListNode([...rest2.reverse(), ...seq2.value]);
  }
  return createVectorNode([...args[0].value, ...rest2]);
}
function seq(...args) {
  assertArgumentCount(args.length, 1);
  const ast = args[0];
  if (isListNode(ast) && ast.value.length > 0) {
    return ast;
  }
  if (isVectorNode(ast) && ast.value.length > 0) {
    return createListNode([...ast.value]);
  }
  if (isStringNode(ast) && ast.value.length > 0) {
    return createListNode(
      ast.value.split("").map((char) => createStringNode(char))
    );
  }
  return createNilNode();
}
function meta(...args) {
  assertArgumentCount(args.length, 1);
  assertMetadataType(args[0]);
  return args[0].metadata ?? createNilNode();
}
function withMeta(...args) {
  assertArgumentCount(args.length, 2);
  assertMetadataType(args[0]);
  assertAstNode(args[1]);
  const copy2 = copy(args[0]);
  copy2.metadata = args[1];
  return copy2;
}
function isNil(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isNilNode(args[0]));
}
function isTrue(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(
    isBooleanNode(args[0]) && args[0].value
  );
}
function isFalse(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(
    isBooleanNode(args[0]) && !args[0].value
  );
}
function isString(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isStringNode(args[0]));
}
function symbol(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  return createSymbolNode(args[0].value);
}
function isSymbolNode2(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isSymbolNode(args[0]));
}
function keyword(...args) {
  assertArgumentCount(args.length, 1);
  assertMapKeyNode(args[0]);
  const key = args[0];
  if (isKeywordNode(key)) {
    return key;
  }
  const string_ = args[0];
  return createKeywordNode(`:${string_.value}`);
}
function isKeyword(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isKeywordNode(args[0]));
}
function isNumber(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isNumberNode(args[0]));
}
function isFn(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(
    isFunctionNode(args[0]) && !args[0].isMacro
  );
}
function isMacro(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(
    isFunctionNode(args[0]) ? args[0].isMacro : false
  );
}
function vector(...args) {
  return createVectorNode(args);
}
function isVector(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isVectorNode(args[0]));
}
function hashMap(...args) {
  if (args.length === 0) {
    return createMapNode();
  }
  if (args.length === 1 && isMapNode(args[0])) {
    return createMapNode(new Map(args[0].value));
  }
  assertEvenArgumentCount(args.length);
  const dict = createMapNode();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    assertMapKeyNode(key);
    setMapElement(dict.value, key, args[i + 1]);
  }
  return dict;
}
function isMap(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isMapNode(args[0]));
}
function assoc(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  const rest2 = args.slice(1);
  const dict = createMapNode(
    new Map(args[0].value)
  );
  const pairs = hashMap(...rest2);
  for (const [key, value] of pairs.value.entries()) {
    dict.value.set(key, value);
  }
  return dict;
}
function dissoc(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  const dict = createMapNode(
    new Map(args[0].value)
  );
  for (const dictKey of args.splice(1)) {
    assertMapKeyNode(dictKey);
    deleteMapElement(dict.value, dictKey);
  }
  return dict;
}
function get(...args) {
  assertArgumentCount(args.length, 2);
  const mapNode = args[0];
  if (!isMapNode(mapNode)) {
    return createNilNode();
  }
  const key = args[1];
  assertMapKeyNode(key);
  const value = getMapElement(mapNode.value, key);
  if (value !== void 0) {
    return value;
  }
  return createNilNode();
}
function contains(...args) {
  assertArgumentCount(args.length, 2);
  const dict = args[0];
  const key = args[1];
  assertMapNode(dict);
  assertMapKeyNode(key);
  return createBooleanNode(hasMapElement(dict.value, key));
}
function keys(...args) {
  assertArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  return getMapKeys(args[0].value);
}
function vals(...args) {
  assertArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  return createListNode([...args[0].value.values()]);
}
function isSequentialNode2(...args) {
  return createBooleanNode(isSequentialNode(args[0]));
}
function join(...args) {
  assertVariableArgumentCount(args.length, 1, 2);
  assertSequential(args[0]);
  const delim = isStringNode(args[1]) ? args[1].value : " ";
  const joined = args[0].value.map((ast) => printString(ast, false)).join(delim);
  return createStringNode(joined);
}

// src/ensemble/interop/html.ts
var htmlTags = /* @__PURE__ */ new Set([
  "!doctype",
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "imgmap",
  // Renamed from map to avoid conflict with core map function
  "input",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "mark",
  "menu",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "portal",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]);
var ns2 = /* @__PURE__ */ new Map();
for (const htmlTag of htmlTags) {
  ns2.set(createSymbolNode(htmlTag), createFunctionNode(tag(htmlTag)));
}
function tag(tag2) {
  return (...args) => {
    return node(createSymbolNode(tag2), ...args);
  };
}
function node(...args) {
  assertMinimumArgumentCount(args.length, 1);
  const tagName = args[0];
  assertSymbolNode(tagName);
  const attributes = /* @__PURE__ */ new Map();
  const children = [];
  if (isMapNode(args[1])) {
    args[1].value.forEach((value, key) => attributes.set(key, value));
    args.slice(2).forEach((child) => children.push(child));
  } else {
    args.slice(1).forEach((child) => children.push(child));
  }
  return createDomNode(tagName.value, attributes, children);
}
function querySelector(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  const selector = args[0].value;
  const element = document.querySelector(selector);
  if (element === null) {
    return createNilNode();
  }
  const nodeMap = Array.from(element.attributes);
  const attributes = nodeMap.reduce((map, attr) => {
    return map.set(attr.name, createStringNode(attr.value));
  }, /* @__PURE__ */ new Map());
  return createDomNode(element.tagName, attributes, []);
}
ns2.set(createSymbolNode("document.querySelector"), createFunctionNode(querySelector));

// src/ensemble/interop/js/array.ts
var arrayFunctions = [
  ["Array", toArray],
  ["Array.from", arrayFrom],
  ["Array.isArray", arrayIsArray],
  ["Array.of", arrayFrom],
  ["Array.prototype.at", arrayAt],
  ["Array.prototype.concat", arrayConcat],
  ["Array.prototype.copyWithin", arrayCopyWithin],
  ["Array.prototype.entries", arrayEntries],
  ["Array.prototype.every", arrayEvery],
  ["Array.prototype.fill", arrayFill],
  ["Array.prototype.filter", arrayFilter],
  ["Array.prototype.find", arrayFind],
  ["Array.prototype.findIndex", arrayFindIndex],
  ["Array.prototype.findLast", arrayFindLast],
  ["Array.prototype.findLastIndex", arrayFindLastIndex],
  ["Array.prototype.flat", arrayFlat],
  ["Array.prototype.flatMap", arrayFlatMap],
  ["Array.prototype.includes", arrayIncludes],
  ["Array.prototype.indexOf", arrayIndexOf],
  ["Array.prototype.join", arrayJoin],
  ["Array.prototype.keys", arrayKeys],
  ["Array.prototype.length", arrayLength],
  ["Array.prototype.map", arrayMap],
  ["Array.prototype.pop", arrayLast],
  ["Array.prototype.push", arrayPush],
  ["Array.prototype.reduce", arrayReduce],
  ["Array.prototype.reverse", arrayToReversed],
  ["Array.prototype.shift", arrayFirst],
  ["Array.prototype.slice", arraySlice],
  ["Array.prototype.some", arraySome],
  ["Array.prototype.sort", arrayToSorted],
  ["Array.prototype.splice", arrayToSpliced],
  ["Array.prototype.toReversed", arrayToReversed],
  ["Array.prototype.toSorted", arrayToSorted],
  ["Array.prototype.toSpliced", arrayToSpliced],
  ["Array.prototype.unshift", arrayUnshift],
  // Prepend
  ["Array.prototype.values", arrayValues],
  ["Array.prototype.with", arrayReplaceWith],
  ["Array.toString", printEscapedString]
];
function toArray(...args) {
  assertMinimumArgumentCount(args.length, 1);
  if (args.length === 1 && isNumberNode(args[0])) {
    const fillableArray = Array(args[0].value).fill(createNilNode());
    return createVectorNode(fillableArray);
  }
  return createVectorNode(args);
}
function arrayFrom(...args) {
  assertVariableArgumentCount(args.length, 1, 3);
  assertVectorNode(args[0]);
  if (args.length >= 2) {
    assertFunctionNode(args[1]);
  }
  if (args.length === 3) {
    assertAstNode(args[2]);
  }
  const result = Array.from(args[0].value, args[1]?.value, args[2]?.value);
  return createVectorNode(result);
}
function arrayAt(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertNumberNode(args[1]);
  const vector2 = args[0].value;
  const index = args[1].value;
  const result = vector2.at(index);
  return result ? toAst(result) : createNilNode();
}
function arrayIsArray(...args) {
  assertArgumentCount(args.length, 1);
  assertAstNode(args[0]);
  const result = isVectorNode(args[0]);
  return createBooleanNode(result);
}
function arrayConcat(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertSequentialValues(args, VectorNode);
  const result = args[0].value.concat(...args.slice(1).map((x) => x.value));
  return createVectorNode(result);
}
function arrayCopyWithin(...args) {
  assertVariableArgumentCount(args.length, 1, 4);
  assertVectorNode(args[0]);
  assertNumberNode(args[1]);
  assertNumberNode(args[2]);
  const vector2 = args[0].value;
  const target = args[1].value;
  const start = args[2].value;
  const end = isNumberNode(args[3]) ? args[3].value : void 0;
  const result = vector2.copyWithin(target, start, end);
  return createVectorNode(result);
}
function arrayEntries(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const result = args[0].value.map((valueNode, index) => {
    const indexNode = createNumberNode(index);
    return createVectorNode([indexNode, valueNode]);
  });
  return createVectorNode(result);
}
function arrayEvery(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.every((value, index, vector3) => {
    const test = fn(createNumberNode(index), value, createVectorNode(vector3));
    return test.value;
  });
  return createBooleanNode(result);
}
function arrayFill(...args) {
  assertVariableArgumentCount(args.length, 2, 4);
  assertVectorNode(args[0]);
  assertAstNode(args[1]);
  const vector2 = args[0].value.map(unwrap);
  const value = args[1].value;
  let start = void 0;
  if (args.length >= 3) {
    assertNumberNode(args[2]);
    start = args[2].value;
  }
  let end = void 0;
  if (args.length === 4) {
    assertNumberNode(args[3]);
    end = args[3].value;
  }
  const result = vector2.fill(value, start, end);
  return createVectorNode(result.map(toAst));
}
function arrayFilter(...args) {
  assertArgumentCount(args.length, 2);
  assertFunctionNode(args[0]);
  assertVectorNode(args[1]);
  const fn = args[0];
  const vec2 = args[1];
  const filtered = vec2.value.filter((item) => Boolean(fn.value(item).value));
  return createVectorNode(filtered);
}
function arrayFind(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.find((value, index, vector3) => {
    const test = fn(value, createNumberNode(index), createVectorNode(vector3));
    return test.value;
  });
  return result ?? createNilNode();
}
function arrayFindIndex(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.findIndex((value, index, vector3) => {
    const test = fn(value, createNumberNode(index), createVectorNode(vector3));
    return test.value;
  });
  return createNumberNode(result);
}
function arrayFindLast(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.findLast((value, index, vector3) => {
    const test = fn(value, createNumberNode(index), createVectorNode(vector3));
    return test.value;
  });
  return result ?? createNilNode();
}
function arrayFindLastIndex(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.findLastIndex((value, index, vector3) => {
    const test = fn(value, createNumberNode(index), createVectorNode(vector3));
    return test.value;
  });
  return createNumberNode(result);
}
function arrayFlat(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vector2 = args[0].value;
  function flattenDeep(arr) {
    return arr.reduce((acc, val) => {
      return acc.concat(isVectorNode(val) ? flattenDeep(val.value) : val);
    }, []);
  }
  const result = flattenDeep(vector2);
  return createVectorNode(result);
}
function arrayFlatMap(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  function flattenDeep(arr) {
    return arr.reduce((acc, val) => {
      return acc.concat(isVectorNode(val) ? flattenDeep(val.value) : val);
    }, []);
  }
  const mapped = vector2.map((value, index, vector3) => {
    return fn(value, createNumberNode(index), createVectorNode(vector3));
  });
  const result = flattenDeep(mapped);
  return createVectorNode(result);
}
function arrayIncludes(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertAstNode(args[1]);
  const vec2 = args[0];
  const element = args[1];
  const result = vec2.value.some((item) => isEqualTo(item, element).value);
  return createBooleanNode(result);
}
function arrayIndexOf(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertAstNode(args[1]);
  const vec2 = args[0];
  const element = args[1];
  for (const [index, item] of vec2.value.entries()) {
    if (isEqualTo(item, element).value) {
      return createNumberNode(index);
    }
  }
  return createNumberNode(-1);
}
function arrayJoin(...args) {
  assertVariableArgumentCount(args.length, 1, 2);
  assertSequential(args[0]);
  const delim = isStringNode(args[1]) ? args[1].value : " ";
  const joined = args[0].value.map((ast) => printString(ast, false)).join(delim);
  return createStringNode(joined);
}
function arrayKeys(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vec2 = args[0];
  const result = vec2.value.map((_, index) => createNumberNode(index));
  return createVectorNode(result);
}
function arrayMap(...args) {
  assertVariableArgumentCount(args.length, 2, 3);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const callback = args[1].value;
  const thisArg = args.length === 3 ? args[2].value : void 0;
  const result = vector2.map((value, index, _arr) => {
    const res = callback(value, createNumberNode(index), thisArg);
    return toAst(res);
  });
  return createVectorNode(result);
}
function arrayLast(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vec2 = args[0];
  const result = vec2.value[vec2.value.length - 1];
  return toAst(result);
}
function arrayPush(...args) {
  assertMinimumArgumentCount(args.length, 2);
  if (!args.every(isAstNode)) {
    throw new TypeError("Invalid arguments.");
  }
  assertVectorNode(args[0]);
  return createVectorNode([...args[0].value, ...args.slice(1)]);
}
function arrayLength(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vec2 = args[0];
  const result = createNumberNode(vec2.value.length);
  return result;
}
function arrayReduce(...args) {
  assertArgumentCount(args.length, 3);
  assertFunctionNode(args[0]);
  assertVectorNode(args[1]);
  const fn = args[0];
  const vec2 = args[1];
  let accumulator = args[2];
  for (const item of vec2.value) {
    accumulator = fn.value(accumulator, item);
  }
  return accumulator;
}
function arrayToReversed(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vec2 = args[0];
  const result = vec2.value.toReversed();
  return createVectorNode(result);
}
function arrayFirst(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vec2 = args[0];
  const result = vec2.value[0];
  return result ? result : createNilNode();
}
function arraySlice(...args) {
  assertVariableArgumentCount(args.length, 1, 3);
  assertVectorNode(args[0]);
  let start = 0;
  if (args[1] !== void 0) {
    assertNumberNode(args[1]);
    start = args[1].value;
  }
  let end = args[0].value.length;
  if (args[2] !== void 0) {
    assertNumberNode(args[2]);
    end = args[2].value;
  }
  return createVectorNode(args[0].value.slice(start, end));
}
function arraySome(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.some((value, index, vector3) => {
    const test = fn(value, createNumberNode(index), createVectorNode(vector3));
    return test.value;
  });
  return createBooleanNode(result);
}
function arrayToSorted(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[0]);
  assertFunctionNode(args[1]);
  const vector2 = args[0].value;
  const fn = args[1].value;
  const result = vector2.toSorted((a, b) => {
    const order = fn(a, b);
    assertNumberNode(order);
    return order.value;
  });
  return createVectorNode(result);
}
function arrayToSpliced(...args) {
  assertVariableArgumentCount(args.length, 2, 4);
  assertVectorNode(args[0]);
  assertNumberNode(args[1]);
  const vector2 = args[0].value;
  const start = args[1].value;
  if (args.length < 3) {
    const result = vector2.toSpliced(start);
    return createVectorNode(result);
  } else {
    assertNumberNode(args[2]);
    const deleteCount = args[2].value;
    const items = args.slice(3);
    const result = vector2.toSpliced(start, deleteCount, ...items);
    return createVectorNode(result);
  }
}
function arrayUnshift(...args) {
  assertArgumentCount(args.length, 2);
  assertVectorNode(args[1]);
  const prepended = [args[0], ...args[1].value];
  return createVectorNode(prepended);
}
function arrayValues(...args) {
  assertArgumentCount(args.length, 1);
  assertVectorNode(args[0]);
  const vec2 = args[0];
  const result = vec2.value.map((value) => value);
  return createVectorNode(result);
}
function arrayReplaceWith(...args) {
  assertArgumentCount(args.length, 3);
  assertVectorNode(args[0]);
  assertNumberNode(args[1]);
  assertAstNode(args[2]);
  const vec2 = args[0];
  const index = args[1];
  const value = args[2];
  const result = vec2.value.with(index.value, value);
  return createVectorNode(result);
}

// src/ensemble/interop/js/boolean.ts
var booleanFunctions = [
  ["Boolean", toBoolean]
];
function toBoolean(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  return createBooleanNode(Boolean(astArgs[0].value));
}

// src/ensemble/interop/js/builtin.ts
var builtInFunctions = [
  ["decodeURI", globalDecodeUri],
  ["decodeURIComponent", globalDecodeUriComponent],
  ["encodeURI", globalEncodeUri],
  ["encodeURIComponent", globalEncodeUriComponent]
];
function globalDecodeUri(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const result = decodeURI(astArgs[0].value);
  return createStringNode(result);
}
function globalDecodeUriComponent(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const result = decodeURIComponent(astArgs[0].value);
  return createStringNode(result);
}
function globalEncodeUri(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const result = encodeURI(astArgs[0].value);
  return createStringNode(result);
}
function globalEncodeUriComponent(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const result = encodeURIComponent(astArgs[0].value);
  return createStringNode(result);
}

// src/ensemble/interop/js/date.ts
var dateFunctions = [
  ["Date", newDate],
  ["Date.now", dateNow],
  ["Date.parse", dateParse],
  ["Date.UTC", dateUtc],
  ["Date.prototype.getDate", dateGetDate],
  ["Date.prototype.getDay", dateGetDay],
  ["Date.prototype.getFullYear", dateGetFullYear],
  ["Date.prototype.getHours", dateGetHours],
  ["Date.prototype.getMilliseconds", dateGetMilliseconds],
  ["Date.prototype.getMinutes", dateGetMinutes],
  ["Date.prototype.getMonth", dateGetMonth],
  ["Date.prototype.getSeconds", dateGetSeconds],
  ["Date.prototype.getTime", dateGetTime],
  ["Date.prototype.getTimezoneOffset", dateGetTimezoneOffset],
  ["Date.prototype.getUTCDate", dateGetUTCDate],
  ["Date.prototype.getUTCDay", dateGetUTCDay],
  ["Date.prototype.getUTCFullYear", dateGetUTCFullYear],
  ["Date.prototype.getUTCHours", dateGetUTCHours],
  ["Date.prototype.getUTCMilliseconds", dateGetUTCMilliseconds],
  ["Date.prototype.getUTCMinutes", dateGetUTCMinutes],
  ["Date.prototype.getUTCMonth", dateGetUTCMonth],
  ["Date.prototype.getUTCSeconds", dateGetUTCSeconds],
  ["Date.prototype.setDate", dateSetDate],
  ["Date.prototype.setFullYear", dateSetFullYear],
  ["Date.prototype.setHours", dateSetHours],
  ["Date.prototype.setMilliseconds", dateSetMilliseconds],
  ["Date.prototype.setMinutes", dateSetMinutes],
  ["Date.prototype.setMonth", dateSetMonth],
  ["Date.prototype.setSeconds", dateSetSeconds],
  ["Date.prototype.setTime", dateSetTime],
  ["Date.prototype.setUTCDate", dateSetUTCDate],
  ["Date.prototype.setUTCFullYear", dateSetUTCFullYear],
  ["Date.prototype.setUTCHours", dateSetUTCHours],
  ["Date.prototype.setUTCMilliseconds", dateSetUTCMilliseconds],
  ["Date.prototype.setUTCMinutes", dateSetUTCMinutes],
  ["Date.prototype.setUTCMonth", dateSetUTCMonth],
  ["Date.prototype.setUTCSeconds", dateSetUTCSeconds],
  ["Date.prototype.toDateString", dateToDateString],
  ["Date.prototype.toISOString", dateToISOString],
  ["Date.prototype.toJSON", dateToJSON],
  ["Date.prototype.toLocaleDateString", dateToLocaleDateString],
  ["Date.prototype.toLocaleString", dateToLocaleString],
  ["Date.prototype.toLocaleTimeString", dateToLocaleTimeString],
  ["Date.prototype.toString", dateToString],
  ["Date.prototype.toTimeString", dateToTimeString],
  ["Date.prototype.toUTCString", dateToUTCString]
];
function newDate(...args) {
  const unwrapped = args.map(unwrap);
  const date = unwrapped.length > 0 ? new Date(...unwrapped) : /* @__PURE__ */ new Date();
  return createNumberNode(date.getTime());
}
function dateNow(..._args) {
  return createNumberNode(Date.now());
}
function dateParse(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  const date = Date.parse(args[0].value);
  return createNumberNode(date);
}
function dateUtc(...args) {
  const unwrapped = args.map(unwrap);
  const timestamp = Date.UTC(...unwrapped);
  if (Number.isNaN(timestamp)) return createNilNode();
  return createNumberNode(timestamp);
}
function dateGetDate(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getDate());
}
function dateGetDay(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getDay());
}
function dateGetFullYear(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getFullYear());
}
function dateGetHours(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getHours());
}
function dateGetMilliseconds(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getMilliseconds());
}
function dateGetMinutes(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getMinutes());
}
function dateGetMonth(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getMonth());
}
function dateGetSeconds(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getSeconds());
}
function dateGetTime(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getTime());
}
function dateGetTimezoneOffset(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getTimezoneOffset());
}
function dateGetUTCDate(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCDate());
}
function dateGetUTCDay(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCDay());
}
function dateGetUTCFullYear(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCFullYear());
}
function dateGetUTCHours(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCHours());
}
function dateGetUTCMilliseconds(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCMilliseconds());
}
function dateGetUTCMinutes(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCMinutes());
}
function dateGetUTCMonth(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCMonth());
}
function dateGetUTCSeconds(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createNumberNode(date.getUTCSeconds());
}
function dateSetDate(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setDate(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetFullYear(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setFullYear(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetHours(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setHours(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetMilliseconds(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setMilliseconds(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetMinutes(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setMinutes(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetMonth(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setMonth(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetSeconds(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setSeconds(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetTime(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setTime(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCDate(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCDate(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCFullYear(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCFullYear(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCHours(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCHours(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCMilliseconds(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCMilliseconds(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCMinutes(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCMinutes(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCMonth(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCMonth(args[1].value);
  return createNumberNode(date.getTime());
}
function dateSetUTCSeconds(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  const date = new Date(args[0].value);
  date.setUTCSeconds(args[1].value);
  return createNumberNode(date.getTime());
}
function dateToDateString(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createStringNode(date.toDateString());
}
function dateToISOString(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createStringNode(date.toISOString());
}
function dateToJSON(...args) {
  assertVariableArgumentCount(args.length, 1, 2);
  assertNumberNode(args[0]);
  if (args[1]) assertStringNode(args[1]);
  const date = new Date(args[0].value);
  return createStringNode(date.toJSON());
}
function dateToLocaleDateString(...args) {
  assertVariableArgumentCount(args.length, 1, 3);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  const dateArgs = args.slice(1).map(unwrap);
  return createStringNode(date.toLocaleDateString(...dateArgs));
}
function dateToLocaleString(...args) {
  assertVariableArgumentCount(args.length, 1, 3);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  const dateArgs = args.slice(1).map(unwrap);
  return createStringNode(date.toLocaleString(...dateArgs));
}
function dateToLocaleTimeString(...args) {
  assertVariableArgumentCount(args.length, 1, 3);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  const dateArgs = args.slice(1).map(unwrap);
  return createStringNode(date.toLocaleTimeString(...dateArgs));
}
function dateToString(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createStringNode(date.toString());
}
function dateToTimeString(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createStringNode(date.toTimeString());
}
function dateToUTCString(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  const date = new Date(args[0].value);
  return createStringNode(date.toUTCString());
}

// src/ensemble/interop/js/error.ts
var errorFunctions = [
  ["Error", newError],
  ["Error.prototype.message", getMessage],
  ["Error.prototype.cause", getCause],
  ["Error.prototype.name", getName]
  // Type of error
];
function newError(...args) {
  assertVariableArgumentCount(args.length, 1, 3);
  const message = args[0];
  assertStringNode(message);
  let name;
  if (args[1] !== void 0) {
    if (!isStringNode(args[1]) && !isNilNode(args[1])) {
      throw new TypeError("Second argument must be a string or nil.");
    }
    if (isStringNode(args[1])) {
      ErrorNode.assertErrorName(args[1]);
      name = args[1];
    }
  }
  let cause = void 0;
  if (args[2] !== void 0) {
    assertAstNode(args[2]);
    cause = args[2];
  }
  return createErrorNode(message, name, cause);
}
function getMessage(...args) {
  assertArgumentCount(args.length, 1);
  assertErrorNode(args[0]);
  return args[0].value;
}
function getCause(...args) {
  assertArgumentCount(args.length, 1);
  assertErrorNode(args[0]);
  return args[0].cause ?? createNilNode();
}
function getName(...args) {
  assertArgumentCount(args.length, 1);
  assertErrorNode(args[0]);
  return args[0].name;
}

// src/ensemble/interop/js/function.ts
var functionFunctions = [
  ["Function", jsEval],
  // Javascript Interop
  ["Function.isFunction", isFn],
  // Javascript Interop
  ["Function.prototype.apply", apply2],
  ["Function.prototype.bind", bind],
  ["Function.prototype.call", call],
  ["js-eval", jsEval]
  // Javascript Interop
];
function jsEval(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  try {
    const result = new Function(
      `'use strict'; return (${args[0].value})`
    )();
    return toAst(result);
  } catch (error) {
    if (error instanceof Error) {
      return createErrorNode(createStringNode(error.message));
    }
    return createErrorNode(createStringNode(JSON.stringify(error)));
  }
}
function apply2(...args) {
  assertArgumentCount(args.length, 2);
  assertFunctionNode(args[0]);
  assertVectorNode(args[1]);
  const result = args[0].value.apply(null, args[1].value);
  return toAst(result);
}
function call(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertFunctionNode(args[0]);
  const result = args[0].value.call(null, ...args.slice(1));
  return toAst(result);
}
function bind(...args) {
  assertMinimumArgumentCount(args.length, 2);
  assertFunctionNode(args[0]);
  assertAstNode(args[1]);
  const result = args[0].value.bind(args[1], ...args.slice(2));
  return toAst(result);
}

// src/ensemble/interop/js/map.ts
var mapFunctions = [
  ["Map.isMap", mapIsMap],
  // Added method
  ["Map.new", mapNew],
  ["Map.prototype.delete", mapDelete],
  ["Map.prototype.entries", mapGetEntries],
  ["Map.prototype.get", mapGet],
  ["Map.prototype.has", mapHas],
  ["Map.prototype.keys", mapKeys],
  ["Map.prototype.set", mapSet],
  ["Map.prototype.size", mapSize],
  ["Map.prototype.values", mapValues]
];
function mapIsMap(...args) {
  assertArgumentCount(args.length, 1);
  return createBooleanNode(isMapNode(args[0]));
}
function mapNew(...args) {
  if (args.length === 0) {
    return createMapNode();
  }
  if (args.length === 1 && isMapNode(args[0])) {
    return createMapNode(new Map(args[0].value));
  }
  assertEvenArgumentCount(args.length);
  const dict = createMapNode();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    assertMapKeyNode(key);
    setMapElement(dict.value, key, args[i + 1]);
  }
  return dict;
}
function mapGetEntries(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertMapNode(astArgs[0]);
  const entries = astArgs[0].value.entries();
  const vectors = createVectorNode();
  for (const [key, value] of entries) {
    const vector2 = createVectorNode([
      toAst(key),
      toAst(value)
    ]);
    vectors.value.push(vector2);
  }
  return vectors;
}
function mapSet(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  const rest2 = args.slice(1);
  const dict = createMapNode(
    new Map(args[0].value)
  );
  const pairs = mapNew(...rest2);
  for (const [key, value] of pairs.value.entries()) {
    dict.value.set(key, value);
  }
  return dict;
}
function mapDelete(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  const dict = createMapNode(
    new Map(args[0].value)
  );
  for (const dictKey of args.splice(1)) {
    assertMapKeyNode(dictKey);
    deleteMapElement(dict.value, dictKey);
  }
  return dict;
}
function mapGet(...args) {
  assertArgumentCount(args.length, 2);
  const mapNode = args[0];
  if (!isMapNode(mapNode)) {
    return createNilNode();
  }
  const key = args[1];
  assertMapKeyNode(key);
  const value = getMapElement(mapNode.value, key);
  if (value !== void 0) {
    return value;
  }
  return createNilNode();
}
function mapHas(...args) {
  assertArgumentCount(args.length, 2);
  const dict = args[0];
  const key = args[1];
  assertMapNode(dict);
  assertMapKeyNode(key);
  return createBooleanNode(hasMapElement(dict.value, key));
}
function mapKeys(...args) {
  assertArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  return getMapKeys(args[0].value);
}
function mapValues(...args) {
  assertArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  return createListNode([...args[0].value.values()]);
}
function mapSize(...args) {
  assertArgumentCount(args.length, 1);
  const value = args[0];
  if (isNilNode(value)) {
    return createNumberNode(0);
  }
  if (isMapNode(args[0])) {
    return createNumberNode(args[0].value.size);
  } else if (isSequentialNode(args[0])) {
    return createNumberNode(args[0].value.length);
  } else {
    throw new TypeError("Invalid argument type");
  }
}

// src/ensemble/interop/js/math.ts
var mathFunctions = [
  ["Math.abs", mathAbs],
  ["Math.acos", mathAcos],
  ["Math.acosh", mathAcosh],
  ["Math.asin", mathAsin],
  ["Math.asinh", mathAsinh],
  ["Math.atan", mathAtan],
  ["Math.atan2", mathAtan2],
  ["Math.atanh", mathAtanh],
  ["Math.cbrt", mathCbrt],
  ["Math.ceil", mathCeil],
  ["Math.clz32", mathClz32],
  ["Math.cos", mathCos],
  ["Math.cosh", mathCosh],
  ["Math.exp", mathExp],
  ["Math.expm1", mathExpm1],
  ["Math.floor", mathFloor],
  ["Math.fround", mathFround],
  ["Math.hypot", mathHypot],
  ["Math.imul", mathImul],
  ["Math.log", mathLog],
  ["Math.log10", mathLog10],
  ["Math.log1p", mathLog1p],
  ["Math.log2", mathLog2],
  ["Math.max", mathMax],
  ["Math.min", mathMin],
  ["Math.pow", mathPow],
  ["Math.random", mathRandom],
  ["Math.round", mathRound],
  ["Math.sign", mathSign],
  ["Math.sin", mathSin],
  ["Math.sinh", mathSinh],
  ["Math.sqrt", mathSqrt],
  ["Math.tan", mathTan],
  ["Math.tanh", mathTanh],
  ["Math.trunc", mathTrunc],
  ["Math.E", mathE],
  ["Math.LN10", mathLn10],
  ["Math.LN2", mathLn2],
  ["Math.LOG10E", mathLog10e],
  ["Math.LOG2E", mathLog23],
  ["Math.PI", mathPi],
  ["Math.SQRT1_2", mathSqrt12],
  ["Math.SQRT2", mathSqrt2]
];
function mathAbs(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.abs(x);
  return toAst(result);
}
function mathAcos(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.acos(x);
  return toAst(result);
}
function mathAcosh(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.acosh(x);
  return toAst(result);
}
function mathAsin(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.asin(x);
  return toAst(result);
}
function mathAsinh(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.asinh(x);
  return toAst(result);
}
function mathAtan(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.atan(x);
  return toAst(result);
}
function mathAtan2(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertNumberNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  const y = astArgs[0].value;
  const x = astArgs[1].value;
  const result = Math.atan2(y, x);
  return toAst(result);
}
function mathAtanh(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.atanh(x);
  return toAst(result);
}
function mathCbrt(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.cbrt(x);
  return toAst(result);
}
function mathCeil(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.ceil(x);
  return toAst(result);
}
function mathClz32(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.clz32(x);
  return toAst(result);
}
function mathCos(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.cos(x);
  return toAst(result);
}
function mathCosh(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.cosh(x);
  return toAst(result);
}
function mathExp(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.exp(x);
  return toAst(result);
}
function mathExpm1(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.expm1(x);
  return toAst(result);
}
function mathFloor(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.floor(x);
  return toAst(result);
}
function mathFround(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.fround(x);
  return toAst(result);
}
function mathHypot(...astArgs) {
  assertSequentialValues(astArgs, NumberNode);
  const values = astArgs.map(unwrapNumberNode);
  const result = Math.hypot(...values);
  return toAst(result);
}
function mathImul(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertNumberNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  const a = astArgs[0].value;
  const b = astArgs[1].value;
  const result = Math.imul(a, b);
  return toAst(result);
}
function mathLog(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log(x);
  return toAst(result);
}
function mathLog10(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log10(x);
  return toAst(result);
}
function mathLog1p(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log1p(x);
  return toAst(result);
}
function mathLog2(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log2(x);
  return toAst(result);
}
function mathMax(...astArgs) {
  assertSequentialValues(astArgs, NumberNode);
  const values = astArgs.map(unwrapNumberNode);
  const result = Math.max(...values);
  return toAst(result);
}
function mathMin(...astArgs) {
  assertSequentialValues(astArgs, NumberNode);
  const values = astArgs.map(unwrapNumberNode);
  const result = Math.min(...values);
  return toAst(result);
}
function mathPow(...astArgs) {
  if (astArgs.length === 2 && isNumberNode(astArgs[0]) && isNumberNode(astArgs[1])) {
    const base = astArgs[0].value;
    const exponent = astArgs[1].value;
    const result = Math.pow(base, exponent);
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.pow"');
}
function mathRandom(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.random();
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.random"');
}
function mathRound(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.round(x);
  return toAst(result);
}
function mathSign(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sign(x);
  return toAst(result);
}
function mathSin(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sin(x);
  return toAst(result);
}
function mathSinh(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sinh(x);
  return toAst(result);
}
function mathSqrt(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sqrt(x);
  return toAst(result);
}
function mathTan(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.tan(x);
  return toAst(result);
}
function mathTanh(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.tanh(x);
  return toAst(result);
}
function mathTrunc(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.trunc(x);
  return toAst(result);
}
function mathE(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.E;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.E"');
}
function mathLn10(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.LN10;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LN10"');
}
function mathLn2(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.LN2;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LN2"');
}
function mathLog10e(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.LOG10E;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LOG10E"');
}
function mathLog23(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.LOG2E;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LOG2E"');
}
function mathPi(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.PI;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.PI"');
}
function mathSqrt12(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.SQRT1_2;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.SQRT1_2"');
}
function mathSqrt2(...astArgs) {
  if (astArgs.length === 0) {
    const result = Math.SQRT2;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.SQRT2"');
}

// src/ensemble/interop/js/number.ts
var numberFunctions = [
  ["Number", newNumber],
  ["Number.isFinite", numberIsFinite],
  ["Number.isInteger", numberIsInteger],
  ["Number.isNaN", numberIsNaN],
  ["Number.isSafeInteger", numberIsSafeInteger],
  ["Number.parseFloat", numberParseFloat],
  ["Number.parseInt", numberParseInt],
  ["Number.prototype.toExponential", numberPrototypeToExponential],
  ["Number.prototype.toFixed", numberPrototypeToFixed],
  ["Number.prototype.toPrecision", numberPrototypeToPrecision],
  ["Number.prototype.toString", numberPrototypeToString],
  // Constants
  ["Number.EPSILON", numberEpsilon],
  ["Number.MAX_SAFE_INTEGER", numberMaxSafeInteger],
  ["Number.MAX_VALUE", numberMaxValue],
  ["Number.MIN_SAFE_INTEGER", numberMinSafeInteger],
  ["Number.MIN_VALUE", numberMinValue],
  ["Number.NaN", numberNaN],
  ["Number.NEGATIVE_INFINITY", numberNegativeInfinity],
  ["Number.POSITIVE_INFINITY", numberPositiveInfinity]
];
function newNumber(...astArgs) {
  if (astArgs.length === 1 && isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number(value);
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number"');
}
function numberIsFinite(...astArgs) {
  if (astArgs.length === 1 && isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number.isFinite(value);
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isFinite"');
}
function numberIsInteger(...astArgs) {
  if (astArgs.length === 1 && isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number.isInteger(value);
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isInteger"');
}
function numberIsNaN(...astArgs) {
  if (astArgs.length === 1 && isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number.isNaN(value);
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isNaN"');
}
function numberIsSafeInteger(...astArgs) {
  if (astArgs.length === 1 && isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number.isSafeInteger(value);
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isSafeInteger"');
}
function numberParseFloat(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const stringValue = unwrapStringNode(astArgs[0]);
  const result = Number.parseFloat(stringValue);
  return toAst(result);
}
function numberParseInt(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertStringNode(astArgs[0]);
  const string = astArgs[0].value;
  if (astArgs.length === 2) {
    assertNumberNode(astArgs[1]);
    const radix = astArgs[1].value;
    const result2 = Number.parseInt(string, radix);
    return createNumberNode(result2);
  }
  const result = Number.parseInt(string);
  return createNumberNode(result);
}
function numberEpsilon(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.EPSILON;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.EPSILON"');
}
function numberMaxSafeInteger(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.MAX_SAFE_INTEGER;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MAX_SAFE_INTEGER"');
}
function numberMaxValue(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.MAX_VALUE;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MAX_VALUE"');
}
function numberMinSafeInteger(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.MIN_SAFE_INTEGER;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MIN_SAFE_INTEGER"');
}
function numberMinValue(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.MIN_VALUE;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MIN_VALUE"');
}
function numberNaN(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.NaN;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.NaN"');
}
function numberNegativeInfinity(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.NEGATIVE_INFINITY;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.NEGATIVE_INFINITY"');
}
function numberPositiveInfinity(...astArgs) {
  if (astArgs.length === 0) {
    const result = Number.POSITIVE_INFINITY;
    return toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.POSITIVE_INFINITY"');
}
function numberPrototypeToExponential(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    assertNumberNode(astArgs[1]);
    const digits = astArgs[1].value;
    const result2 = astArgs[0].value.toExponential(digits);
    return createStringNode(result2);
  }
  const result = astArgs[0].value.toExponential();
  return createStringNode(result);
}
function numberPrototypeToFixed(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    assertNumberNode(astArgs[1]);
    const digits = astArgs[1].value;
    const result2 = astArgs[0].value.toFixed(digits);
    return createStringNode(result2);
  }
  const result = astArgs[0].value.toFixed();
  return createStringNode(result);
}
function numberPrototypeToPrecision(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    assertNumberNode(astArgs[1]);
    const digits = astArgs[1].value;
    const result2 = astArgs[0].value.toPrecision(digits);
    return createStringNode(result2);
  }
  const result = astArgs[0].value.toPrecision();
  return createStringNode(result);
}
function numberPrototypeToString(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    assertNumberNode(astArgs[1]);
    const radix = astArgs[1].value;
    const result2 = astArgs[0].value.toString(radix);
    return createStringNode(result2);
  }
  const result = astArgs[0].value.toString();
  return createStringNode(result);
}

// src/ensemble/interop/js/operator.ts
var operators = [
  ["===", eq],
  ["!==", notEqualTo],
  ["??", nullishCoalesce],
  ["**", power],
  ["%", remainder],
  [">>", rightShift],
  ["<<", leftShift],
  [">>>", unsignedRightShift],
  ["/&", bitwiseAnd],
  ["/|", bitwiseOr],
  ["/^", bitwiseXor],
  ["/~", bitwiseNot],
  ["&&", and],
  ["||", or],
  ["!", not],
  ["++", increment],
  ["--", decrement],
  ["typeof", typeOf],
  ["instanceof", instanceOf]
];
function and(...args) {
  const useJavaScriptTruthiness = true;
  for (const arg of args) {
    const isTruthy = isAstTruthy(arg, useJavaScriptTruthiness);
    if (!isTruthy) {
      return createBooleanNode(false);
    }
  }
  return createBooleanNode(true);
}
function or(...args) {
  for (const arg of args) {
    const isTruthy = isAstTruthy(arg);
    if (isTruthy) {
      return createBooleanNode(true);
    }
  }
  return createBooleanNode(false);
}
function remainder(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode((a.value % b.value + b.value) % b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseAnd(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode(a.value & b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseOr(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode(a.value | b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseXor(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode(a.value ^ b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseNot(a) {
  if (isNumberNode(a)) {
    return createNumberNode(~a.value);
  }
  throw new TypeError("not a number");
}
function leftShift(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode(a.value << b.value);
  }
  throw new TypeError("not a number");
}
function rightShift(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode(a.value >> b.value);
  }
  throw new TypeError("not a number");
}
function unsignedRightShift(a, b) {
  if (isNumberNode(a) && isNumberNode(b)) {
    return createNumberNode(a.value >>> b.value);
  }
  throw new TypeError("not a number");
}
function not(a) {
  return createBooleanNode(!a.value);
}
function notEqualTo(...args) {
  assertArgumentCount(args.length, 2);
  const bool = isEqualTo(args[0], args[1]);
  return createBooleanNode(!bool.value);
}
function increment(...args) {
  assertVariableArgumentCount(args.length, 1, 2);
  assertNumberNode(args[0]);
  let affix = "postfix";
  if (args[1] !== void 0) {
    assertStringNode(args[1]);
    if (args[1].value !== "prefix" && args[1].value !== "postfix") {
      throw new TypeError(
        `Invalid affix ${String(args[1].value)}. The affix must be "prefix" or "postfix"`
      );
    } else {
      affix = args[1].value;
    }
  }
  if (affix === "postfix") {
    return createVectorNode([
      createNumberNode(args[0].value + 1),
      createNumberNode(args[0].value)
    ]);
  }
  if (affix === "prefix") {
    return createVectorNode([
      createNumberNode(args[0].value + 1),
      createNumberNode(args[0].value + 1)
    ]);
  }
  throw new Error("Unhandled error in decrement");
}
function decrement(...args) {
  assertVariableArgumentCount(args.length, 1, 2);
  assertNumberNode(args[0]);
  let affix = "postfix";
  if (args[1] !== void 0) {
    assertStringNode(args[1]);
    if (args[1].value !== "prefix" && args[1].value !== "postfix") {
      throw new TypeError(
        `Invalid affix ${String(args[1].value)}. The affix must be "prefix" or "postfix"`
      );
    } else {
      affix = args[1].value;
    }
  }
  if (affix === "postfix") {
    return createVectorNode([
      createNumberNode(args[0].value - 1),
      createNumberNode(args[0].value)
    ]);
  }
  if (affix === "prefix") {
    return createVectorNode([
      createNumberNode(args[0].value - 1),
      createNumberNode(args[0].value - 1)
    ]);
  }
  throw new Error("Unhandled error in decrement");
}
function typeOf(...args) {
  assertArgumentCount(args.length, 2);
  assertAstNode(args[0]);
  assertStringNode(args[1]);
  const obj = typeof args[0].value;
  if (obj !== "bigint" && obj !== "boolean" && obj !== "function" && obj !== "number" && obj !== "object" && obj !== "string" && obj !== "symbol" && obj !== "undefined") {
    throw new Error(
      `Invalid type: "${args[1].value}". Type must be one of bigint, boolean, function, number, object, string, symbol, or undefined`
    );
  }
  return createBooleanNode(obj === args[1].value);
}
function instanceOf(...args) {
  assertArgumentCount(args.length, 2);
  assertAstNode(args[0]);
  assertStringNode(args[1]);
  const value = args[0];
  const type = args[1].value;
  let instance = void 0;
  if (type === "AstNode" || type === "AtomNode" || type === "BooleanNode" || type === "ErrorNode" || type === "FunctionNode" || type === "KeywordNode" || type === "ListNode" || type === "MapNode" || type === "NilNode" || type === "NumberNode" || type === "StringNode" || type === "SymbolNode" || type === "VectorNode") {
    instance = types_exports[args[1].value];
  } else if (Object.hasOwn(globalThis, args[1].value)) {
    instance = globalThis[args[1].value];
  } else {
    throw new TypeError(`Unknown instance: "${args[1].value}"`);
  }
  return createBooleanNode(value instanceof instance);
}
function nullishCoalesce(a, b) {
  return a.value == null ? b : a;
}
function power(base, exponent) {
  if (isNumberNode(base) && isNumberNode(exponent)) {
    return createNumberNode(base.value ** exponent.value);
  }
  throw new TypeError("not a number");
}

// src/ensemble/interop/js/regexp.ts
var regExpFunctions = [
  ["RegExp.new", newRegExp],
  ["RegExp.prototype.exec", execRegExp],
  ["RegExp.prototype.test", testRegExp]
];
function newRegExp(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertStringNode(astArgs[0]);
  const pattern = astArgs[0].value;
  if (astArgs.length === 2) {
    assertStringNode(astArgs[1]);
    const flags = astArgs[1].value;
    const regexp2 = new RegExp(pattern, flags);
    return createAtomNode(regexp2);
  }
  const regexp = new RegExp(pattern);
  return createAtomNode(regexp);
}
function execRegExp(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertAtomNode(astArgs[0]);
  const regexp = astArgs[0].value;
  assertRegExp(regexp);
  assertStringNode(astArgs[1]);
  const stringValue = astArgs[1].value;
  const result = regexp.exec(stringValue);
  return result ? createVectorNode(result.map(toAst)) : createNilNode();
}
function testRegExp(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertAtomNode(astArgs[0]);
  assertRegExp(astArgs[0].value);
  assertStringNode(astArgs[1]);
  const result = astArgs[0].value.test(astArgs[1].value);
  return createBooleanNode(result);
}

// src/ensemble/interop/js/string.ts
var stringFunctions = [
  ["String", printUnescapedString],
  ["String.fromCharCode", stringFromCharCode],
  ["String.fromCodePoint", stringFromCodePoint],
  ["String.prototype.at", stringAt],
  ["String.prototype.charAt", stringAt],
  ["String.prototype.charCodeAt", stringCodePointAt],
  ["String.prototype.codePointAt", stringCodePointAt],
  ["String.prototype.concat", stringConcat],
  ["String.prototype.endsWith", stringEndsWith],
  ["String.prototype.includes", stringIncludes],
  ["String.prototype.indexOf", stringIndexOf],
  ["String.prototype.isWellFormed", stringIsWellFormed],
  ["String.prototype.lastIndexOf", stringLastIndexOf],
  ["String.prototype.length", stringLength],
  ["String.prototype.localeCompare", stringLocaleCompare],
  ["String.prototype.match", stringMatch],
  ["String.prototype.matchAll", stringMatchAll],
  ["String.prototype.normalize", stringNormalize],
  ["String.prototype.padEnd", stringPadEnd],
  ["String.prototype.padStart", stringPadStart],
  ["String.prototype.repeat", stringRepeat],
  ["String.prototype.replace", stringReplace],
  ["String.prototype.replaceAll", stringReplaceAll],
  ["String.prototype.search", stringSearch],
  ["String.prototype.slice", stringSlice],
  ["String.prototype.split", stringSplit],
  ["String.prototype.startsWith", stringStartsWith],
  ["String.prototype.toLocaleLowerCase", stringToLocaleLowerCase],
  ["String.prototype.toLocaleUpperCase", stringToLocaleUpperCase],
  ["String.prototype.toLowerCase", stringToLowerCase],
  ["String.prototype.toUpperCase", stringToUpperCase],
  ["String.prototype.toWellFormed", stringToWellFormed],
  ["String.prototype.trim", stringTrim],
  ["String.prototype.trimEnd", stringTrimEnd],
  ["String.prototype.trimStart", stringTrimStart],
  ["String.raw", stringRaw]
];
function stringFromCharCode(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertVectorNode(astArgs[0]);
  assertSequentialValues(astArgs[0].value, NumberNode);
  const codeUnits = astArgs[0].value.map(unwrapNumberNode);
  const result = String.fromCharCode(...codeUnits);
  return createStringNode(result);
}
function stringFromCodePoint(...astArgs) {
  assertSequentialValues(astArgs, NumberNode);
  const codePoints = astArgs.map(unwrapNumberNode);
  const result = String.fromCodePoint(...codePoints);
  return createStringNode(result);
}
function stringAt(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertStringNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  const result = String.prototype.at.call(astArgs[0].value, astArgs[1].value);
  return result === void 0 ? createNilNode() : createStringNode(result);
}
function stringCodePointAt(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertStringNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  const result = String.prototype.codePointAt.call(astArgs[0].value, astArgs[1].value);
  return result === void 0 ? createNilNode() : createNumberNode(result);
}
function stringConcat(...astArgs) {
  assertMinimumArgumentCount(astArgs.length, 2);
  assertSequentialValues(astArgs, StringNode);
  const context = astArgs[0].value;
  const strings = astArgs.slice(1).map(unwrapStringNode);
  const result = String.prototype.concat.call(context, ...strings);
  return createStringNode(result);
}
function stringEndsWith(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertStringNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const length2 = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = String.prototype.endsWith.call(context, searchString, length2);
  return toAst(result);
}
function stringIncludes(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertStringNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = String.prototype.includes.call(context, searchString, position);
  return toAst(result);
}
function stringIndexOf(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertStringNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = String.prototype.indexOf.call(context, searchString, position);
  return toAst(result);
}
function stringIsWellFormed(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.isWellFormed.call(context);
  return toAst(result);
}
function stringLastIndexOf(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertStringNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = String.prototype.lastIndexOf.call(context, searchString, position);
  return toAst(result);
}
function stringLength(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = context.length;
  return toAst(result);
}
function stringLocaleCompare(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 4);
  assertStringNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  const context = astArgs[0].value;
  const that = astArgs[1].value;
  let locales = void 0;
  let options = void 0;
  if (astArgs.length > 2) {
    const localesArg = astArgs[2];
    if (isStringNode(localesArg)) {
      locales = localesArg.value;
    } else if (isVectorNode(localesArg)) {
      assertSequentialValues(localesArg.value, StringNode);
      locales = localesArg.value.map(unwrapStringNode);
    } else {
      assertNilNode(localesArg);
      locales = void 0;
    }
  }
  if (astArgs.length > 3) {
    const optionsArg = astArgs[3];
    assertMapNode(optionsArg);
    options = unwrapMapNode(optionsArg);
  }
  const result = String.prototype.localeCompare.call(context, that, locales, options);
  return toAst(result);
}
function stringMatch(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertStringNode(astArgs[0]);
  assertAtomNode(astArgs[1]);
  assertRegExp(astArgs[1].value);
  const context = astArgs[0].value;
  const regexp = astArgs[1].value;
  const result = String.prototype.match.call(context, regexp);
  return toAst(result);
}
function stringMatchAll(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertStringNode(astArgs[0]);
  assertAtomNode(astArgs[1]);
  assertRegExp(astArgs[1].value);
  const context = astArgs[0].value;
  const regexp = astArgs[1].value;
  const result = String.prototype.matchAll.call(context, regexp);
  return toAst(result);
}
function stringNormalize(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertAstNode(astArgs[0]);
  if (astArgs.length === 2) {
    assertStringNode(astArgs[1]);
  }
  const context = astArgs[0].value;
  const form = astArgs.length === 2 ? astArgs[1].value : void 0;
  const result = String.prototype.normalize.call(context, form);
  return toAst(result);
}
function stringPadEnd(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertAstNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertStringNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const maxLength = astArgs[1].value;
  const fillString = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = String.prototype.padEnd.call(context, maxLength, fillString);
  return toAst(result);
}
function stringPadStart(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertAstNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertStringNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const maxLength = astArgs[1].value;
  const fillString = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = String.prototype.padStart.call(context, maxLength, fillString);
  return toAst(result);
}
function stringRepeat(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertStringNode(astArgs[0]);
  assertNumberNode(astArgs[1]);
  const context = astArgs[0].value;
  const count = astArgs[1].value;
  const result = String.prototype.repeat.call(context, count);
  return toAst(result);
}
function stringReplace(...astArgs) {
  assertArgumentCount(astArgs.length, 3);
  assertStringNode(astArgs[0]);
  let pattern = "";
  if (isStringNode(astArgs[1])) {
    pattern = astArgs[1].value;
  } else {
    assertAtomNode(astArgs[1]);
    assertRegExp(astArgs[1].value);
    pattern = astArgs[1].value;
  }
  let replacer;
  if (isStringNode(astArgs[2])) {
    replacer = astArgs[2].value;
  } else {
    throw new Error("Function replacers are not implemented for String.prototype.replace");
  }
  const context = astArgs[0].value;
  const result = context.replace(pattern, replacer);
  return toAst(result);
}
function stringReplaceAll(...astArgs) {
  assertArgumentCount(astArgs.length, 3);
  assertStringNode(astArgs[0]);
  let pattern = "";
  if (isStringNode(astArgs[1])) {
    pattern = astArgs[1].value;
  } else {
    assertAtomNode(astArgs[1]);
    assertRegExp(astArgs[1].value);
    pattern = astArgs[1].value;
  }
  let replacer;
  if (isStringNode(astArgs[2])) {
    replacer = astArgs[2].value;
  } else {
    throw new Error("Function replacers are not implemented for String.prototype.replaceAll");
  }
  const context = astArgs[0].value;
  const result = context.replaceAll(pattern, replacer);
  return toAst(result);
}
function stringSearch(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertStringNode(astArgs[0]);
  assertAtomNode(astArgs[1]);
  assertRegExp(astArgs[1].value);
  const context = astArgs[0].value;
  const regexp = astArgs[1].value;
  const result = String.prototype.search.call(context, regexp);
  return toAst(result);
}
function stringSlice(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 3);
  assertAstNode(astArgs[0]);
  if (astArgs.length > 1) {
    assertNumberNode(astArgs[1]);
  }
  if (astArgs.length > 2) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const start = astArgs.length > 1 ? astArgs[1].value : void 0;
  const end = astArgs.length > 2 ? astArgs[2].value : void 0;
  const result = String.prototype.slice.call(context, start, end);
  return toAst(result);
}
function stringSplit(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertStringNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const separator = astArgs[1].value;
  const limit = astArgs.length === 3 ? astArgs[2].value : void 0;
  const result = context.split(separator, limit);
  return toAst(result);
}
function stringStartsWith(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 2, 3);
  assertAstNode(astArgs[0]);
  assertStringNode(astArgs[1]);
  if (astArgs.length === 3) {
    assertNumberNode(astArgs[2]);
  }
  const context = astArgs[0].value;
  const searchString = astArgs[1].value;
  const position = astArgs.length > 2 ? astArgs[2].value : void 0;
  const result = String.prototype.startsWith.call(context, searchString, position);
  return toAst(result);
}
function stringToLocaleLowerCase(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertAstNode(astArgs[0]);
  if (astArgs.length === 2) {
    if (!isNilNode(astArgs[1])) {
      assertStringNode(astArgs[1]);
    }
  }
  const context = astArgs[0].value;
  const locales = astArgs.length === 2 && !isNilNode(astArgs[1]) ? astArgs[1].value : void 0;
  const result = String.prototype.toLocaleLowerCase.call(context, locales);
  return toAst(result);
}
function stringToLocaleUpperCase(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 1, 2);
  assertAstNode(astArgs[0]);
  if (astArgs.length === 2) {
    if (!isNilNode(astArgs[1])) {
      assertStringNode(astArgs[1]);
    }
  }
  const context = astArgs[0].value;
  const locales = astArgs.length === 2 && !isNilNode(astArgs[1]) ? astArgs[1].value : void 0;
  const result = String.prototype.toLocaleUpperCase.call(context, locales);
  return toAst(result);
}
function stringToLowerCase(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.toLowerCase.call(context);
  return toAst(result);
}
function stringToUpperCase(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.toUpperCase.call(context);
  return toAst(result);
}
function stringToWellFormed(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.toWellFormed.call(context);
  return toAst(result);
}
function stringTrim(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.trim.call(context);
  return toAst(result);
}
function stringTrimEnd(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.trimEnd.call(context);
  return toAst(result);
}
function stringTrimStart(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAstNode(astArgs[0]);
  const context = astArgs[0].value;
  const result = String.prototype.trimStart.call(context);
  return toAst(result);
}
function stringRaw(...astArgs) {
  assertArgumentCount(astArgs.length, 2);
  assertMapNode(astArgs[0]);
  assertVectorNode(astArgs[1]);
  const strings = unwrapMapNode(astArgs[0]);
  const substitutions = astArgs[1].value;
  const result = String.raw(strings, ...substitutions);
  return toAst(result);
}

// src/ensemble/interop/js/symbol.ts
var symbolFunctions = [
  ["Symbol", symbolConstructor],
  ["Symbol.for", symbolFor],
  ["Symbol.keyFor", symbolKeyFor]
];
function symbolConstructor(...astArgs) {
  assertVariableArgumentCount(astArgs.length, 0, 1);
  if (astArgs.length === 1) {
    assertStringNode(astArgs[0]);
  }
  const description = astArgs.length === 1 ? astArgs[0].value : void 0;
  const result = Symbol(description);
  return createAtomNode(result);
}
function symbolFor(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertStringNode(astArgs[0]);
  const key = astArgs[0].value;
  const result = Symbol.for(key);
  return createAtomNode(result);
}
function symbolKeyFor(...astArgs) {
  assertArgumentCount(astArgs.length, 1);
  assertAtomNode(astArgs[0]);
  assertSymbol(astArgs[0].value);
  const sym = astArgs[0].value;
  const result = Symbol.keyFor(sym);
  return result ? createStringNode(result) : createNilNode();
}

// src/ensemble/interop/js.ts
var nsValues2 = [
  ...arrayFunctions,
  ...booleanFunctions,
  ...builtInFunctions,
  ...operators,
  ...dateFunctions,
  ...errorFunctions,
  ...functionFunctions,
  ...mapFunctions,
  ...mathFunctions,
  ...numberFunctions,
  ...regExpFunctions,
  ...stringFunctions,
  ...symbolFunctions
];
var ns3 = /* @__PURE__ */ new Map();
for (const [sym, fn] of nsValues2) {
  ns3.set(createSymbolNode(sym), createFunctionNode(fn));
  if (sym.includes(".prototype.")) {
    const withPrototypeAlias = sym.replace(".prototype.", "::");
    ns3.set(createSymbolNode(withPrototypeAlias), createFunctionNode(fn));
  } else if (sym.includes(".prototype[")) {
    const withPrototypeAlias = sym.replace(".prototype[", "::[");
    ns3.set(createSymbolNode(withPrototypeAlias), createFunctionNode(fn));
  }
}

// src/ensemble/lib.ts
function assertTryCatch(a) {
  assertListNode(a);
  assertVariableArgumentCount(a.value.length, 2, 3);
  const symbolNode = a.value[0];
  assertSymbolNode(symbolNode);
  if (symbolNode.value !== "try" && symbolNode.value !== "try*") {
    throw new Error("use `try` or `try*` in try/catch expressions");
  }
  assertAstNode(a.value[1]);
  if (a.value[2]) {
    assertListNode(a.value[2]);
    assertArgumentCount(a.value[2].value.length, 3);
    assertSymbolNode(a.value[2].value[0]);
    const catchNode = a.value[2].value[0];
    if (catchNode.value !== "catch" && catchNode.value !== "catch*") {
      throw new Error("use `catch` or `catch*` in try/catch expressions");
    }
    assertSymbolNode(a.value[2].value[1]);
    assertAstNode(a.value[2].value[2]);
  }
}
function assertDef(a) {
  assertListNode(a);
  assertArgumentCount(a.value.length, 3);
  assertSymbolNode(a.value[0]);
  const symbolNode = a.value[0];
  if (symbolNode.value !== "def!" && symbolNode.value !== "globalThis" && symbolNode.value !== "var") {
    throw new Error("use `def!`, `globalThis`, or `var` in def! expressions");
  }
  assertMapKeyNode(a.value[1]);
  assertAstNode(a.value[2]);
}
function assertLet(a) {
  assertListNode(a);
  assertArgumentCount(a.value.length, 3);
  assertSymbolNode(a.value[0]);
  const symbolNode = a.value[0];
  if (symbolNode.value !== "let*" && symbolNode.value !== "let" && symbolNode.value !== "const") {
    throw new Error("use `let*`, `let`, or `const` in let* expressions");
  }
  assertSequential(a.value[1]);
  assertAstNode(a.value[2]);
  assertEvenArgumentCount(a.value[1].value.length);
  for (let i = 0; i < a.value[1].value.length; i += 2) {
    assertSymbolNode(a.value[1].value[i]);
    assertAstNode(a.value[1].value[i + 1]);
  }
}
function assertQuote(a) {
  assertListNode(a);
  assertArgumentCount(a.value.length, 2);
  assertSymbolNode(a.value[0]);
  assertSymWithValue(a.value[0], "quote");
  assertAstNode(a.value[1]);
}
function assertQuasiQuoteExpand(a) {
  const symbol2 = "quasiquoteexpand";
  assertListNode(a);
  assertArgumentCount(a.value.length, 2);
  assertSymbolNode(a.value[0]);
  assertSymWithValue(a.value[0], symbol2);
  assertAstNode(a.value[1]);
}
function assertQuasiQuote(a) {
  const symbol2 = "quasiquote";
  assertListNode(a);
  assertArgumentCount(a.value.length, 2);
  assertSymbolNode(a.value[0]);
  assertSymWithValue(a.value[0], symbol2);
  assertAstNode(a.value[1]);
}
function assertDefMacro(a) {
  const symbol2 = "defmacro!";
  assertListNode(a);
  assertArgumentCount(a.value.length, 3);
  assertSymbolNode(a.value[0]);
  assertSymWithValue(a.value[0], symbol2);
  assertMapKeyNode(a.value[1]);
  assertAstNode(a.value[2]);
}
function assertDo(a) {
  const symbol2 = "do";
  assertListNode(a);
  assertMinimumArgumentCount(a.value.length, 1);
  assertSymbolNode(a.value[0]);
  assertSymWithValue(a.value[0], symbol2);
  for (const node2 of a.value.slice(1)) {
    assertAstNode(node2);
  }
}
function assertIf(a) {
  const symbol2 = "if";
  assertListNode(a);
  assertVariableArgumentCount(a.value.length, 3, 4);
  assertSymbolNode(a.value[0]);
  assertSymWithValue(a.value[0], symbol2);
  assertAstNode(a.value[1]);
  assertAstNode(a.value[2]);
  if (isDefined(a.value[3])) {
    assertAstNode(a.value[3]);
  }
}
function assertFn(a) {
  assertListNode(a);
  assertArgumentCount(a.value.length, 3);
  assertSymbolNode(a.value[0]);
  const symbolNode = a.value[0];
  if (!["fn*", "function", "=>"].includes(symbolNode.value)) {
    throw new Error("use `fn*`, `function`, of `=>` in fn* expressions");
  }
  assertSequential(a.value[1]);
  assertSequentialValues(a.value[1].value, SymbolNode);
  assertAstNode(a.value[2]);
}
function read(malCode) {
  const ast = readString(malCode);
  return ast;
}
function quasiQuote(node2) {
  const isQuotableNode = isMapNode(node2) || isSymbolNode(node2);
  if (isQuotableNode) {
    return createListNode([createSymbolNode("quote"), node2]);
  }
  if (!isSequentialNode(node2)) {
    return node2;
  }
  const firstValueIsUnquote = listStartsWithSymbol(node2, "unquote");
  if (firstValueIsUnquote) {
    return node2.value[1];
  }
  let result = createListNode([]);
  for (let i = node2.value.length - 1; i >= 0; i--) {
    const element = node2.value[i];
    result = listStartsWithSymbol(element, "splice-unquote") ? createListNode([
      createSymbolNode("concat"),
      element.value[1],
      result
    ]) : createListNode([
      createSymbolNode("cons"),
      quasiQuote(element),
      result
    ]);
  }
  if (isVectorNode(node2)) {
    result = createListNode([createSymbolNode("vec"), result]);
  }
  return result;
}
function isMacroCall(ast, appEnv) {
  if (!isListNode(ast) || !(ast.value[0] instanceof SymbolNode)) {
    return false;
  }
  const symbol2 = ast.value[0];
  const foundEnv = appEnv.findEnv(symbol2);
  if (!isDefined(foundEnv)) {
    return false;
  }
  const fn = foundEnv.get(symbol2);
  if (!isFunctionNode(fn)) {
    return false;
  }
  return fn.isMacro;
}
function macroExpand(ast, appEnv) {
  let resultAst = ast;
  while (isMacroCall(resultAst, appEnv)) {
    const list2 = resultAst;
    const symbol2 = list2.value[0];
    const fn = appEnv.get(symbol2);
    resultAst = fn.value(...list2.value.slice(1));
  }
  return resultAst;
}
function evaluateAst(node2, appEnv) {
  if (isSymbolNode(node2)) {
    return appEnv.get(node2);
  }
  if (isVectorNode(node2)) {
    const evaluated = node2.value.map((v) => evaluate(v, appEnv));
    return createVectorNode(evaluated);
  }
  if (isListNode(node2)) {
    const evaluated = node2.value.map((v) => evaluate(v, appEnv));
    return createListNode(evaluated);
  }
  if (isMapNode(node2)) {
    const evaluated = /* @__PURE__ */ new Map();
    for (const [key, value] of node2.value.entries()) {
      evaluated.set(key, evaluate(value, appEnv));
    }
    return createMapNode(evaluated);
  }
  if (isDomNode(node2)) {
    const tagName = node2.value;
    const attributes = Array.from(node2.attributes).reduce(
      (map, [key, value]) => map.set(key, evaluate(value, appEnv)),
      /* @__PURE__ */ new Map()
    );
    const children = node2.children.map((child) => evaluate(child, appEnv));
    return createDomNode(tagName, attributes, children);
  }
  return node2;
}
function evaluate(node2, appEnv) {
  for (; ; ) {
    if (isListNode(node2) === false) {
      return evaluateAst(node2, appEnv);
    }
    if (node2.value.length === 0) {
      return node2;
    }
    node2 = macroExpand(node2, appEnv);
    if (isListNode(node2) === false) {
      return evaluateAst(node2, appEnv);
    }
    if (node2.value.length === 0) {
      return node2;
    }
    const symbolValue = isSymbolNode(node2.value[0]) ? node2.value[0].value : "goto_default_clause";
    let result;
    switch (symbolValue) {
      // "`var` statements and function declarations at the top level of
      // a script create properties of the global object."
      // https://developer.mozilla.org/en-US/docs/Glossary/Global_object
      case "var":
      case "def!": {
        result = evaluateDef(node2, appEnv);
        break;
      }
      // "On the other hand, let and const declarations never create
      // properties of the global object."
      // https://developer.mozilla.org/en-US/docs/Glossary/Global_object
      case "let":
      case "const":
      case "let*": {
        result = evaluateLet(node2, appEnv);
        break;
      }
      case "quote": {
        result = evaluateQuote(node2, appEnv);
        break;
      }
      // Only for testing quasiquote
      case "quasiquoteexpand": {
        result = evaluateQuasiQuoteExpand(node2, appEnv);
        break;
      }
      case "quasiquote": {
        result = evaluateQuasiQuote(node2, appEnv);
        break;
      }
      case "defmacro!": {
        result = evaluateDefMacro(node2, appEnv);
        break;
      }
      case "macroexpand": {
        result = returnResult(macroExpand(node2.value[1], appEnv));
        break;
      }
      case "try":
      case "try*": {
        result = evaluateTry(node2, appEnv);
        break;
      }
      case "do": {
        result = evaluateDo(node2, appEnv);
        break;
      }
      case "if": {
        result = evaluateIf(node2, appEnv);
        break;
      }
      case "=>":
      case "function":
      case "fn*": {
        result = evaluateFn(node2, appEnv);
        break;
      }
      default: {
        result = evaluateApply(node2, appEnv);
      }
    }
    if (result.return) {
      return result.return;
    }
    node2 = result.continue.ast;
    appEnv = result.continue.env;
  }
}
function evaluateDef(node2, appEnv) {
  assertDef(node2);
  const variableName = node2.value[1];
  const variableValue = node2.value[2];
  const evaluatedValue = evaluate(variableValue, appEnv);
  return returnResult(appEnv.set(variableName, evaluatedValue));
}
function evaluateLet(node2, appEnv) {
  assertLet(node2);
  const bindings = node2.value[1];
  const bindingsCount = bindings.value.length;
  const letEnv = new Env(appEnv);
  for (let i = 0; i < bindingsCount; i += 2) {
    const varName = bindings.value[i];
    const varExpr = bindings.value[i + 1];
    const varValue = evaluate(varExpr, letEnv);
    letEnv.set(varName, varValue);
  }
  return continueResult(node2.value[2], letEnv);
}
function evaluateQuote(node2, _) {
  assertQuote(node2);
  return returnResult(node2.value[1]);
}
function evaluateQuasiQuoteExpand(node2, _env) {
  assertQuasiQuoteExpand(node2);
  return returnResult(quasiQuote(node2.value[1]));
}
function evaluateQuasiQuote(node2, appEnv) {
  assertQuasiQuote(node2);
  const resultAst = quasiQuote(node2.value[1]);
  return continueResult(resultAst, appEnv);
}
function evaluateDefMacro(node2, appEnv) {
  assertDefMacro(node2);
  const variableName = node2.value[1];
  const variableValue = node2.value[2];
  const evaluatedValue = evaluate(variableValue, appEnv);
  const copiedValue = copy(evaluatedValue);
  if (isFunctionNode(copiedValue)) {
    copiedValue.isMacro = true;
  }
  return returnResult(appEnv.set(variableName, copiedValue));
}
function evaluateDo(node2, appEnv) {
  assertDo(node2);
  let lastResult = createNilNode();
  for (let i = 1; i < node2.value.length; i++) {
    lastResult = evaluate(node2.value[i], appEnv);
  }
  return { continue: { ast: lastResult, env: appEnv }, return: void 0 };
}
function evaluateTry(node2, appEnv) {
  assertTryCatch(node2);
  try {
    return {
      return: evaluate(node2.value[1], appEnv),
      continue: void 0
    };
  } catch (error) {
    if (!node2.value[2]) {
      throw error;
    }
    const sym = node2.value[2].value[1];
    const list2 = node2.value[2].value[2];
    let message;
    if (isErrorNode(error)) {
      message = error;
    } else if (error instanceof Error) {
      message = createStringNode(error.message);
    } else {
      message = createStringNode(JSON.stringify(error));
    }
    const caught = createErrorNode(message);
    const errorEnv = new Env(appEnv, [sym], [caught]);
    return { return: evaluate(list2, errorEnv), continue: void 0 };
  }
}
function evaluateIf(node2, appEnv) {
  assertIf(node2);
  const condition = node2.value[1];
  const result = evaluate(condition, appEnv);
  if (result.value !== false && result.value !== null) {
    const thenExpr = node2.value[2];
    return continueResult(thenExpr, appEnv);
  }
  if (node2.value[3] !== void 0) {
    const elseExpr = node2.value[3];
    return continueResult(elseExpr, appEnv);
  }
  return returnResult(createNilNode());
}
function evaluateFn(node2, appEnv) {
  assertFn(node2);
  const parameters = node2.value[1].value;
  const bodyExpr = node2.value[2];
  const outerEnv = appEnv;
  const closureMeta = {
    ast: bodyExpr,
    env: outerEnv,
    parameters
  };
  const fn = createFunctionNode(
    (...args) => {
      const fnEnv = new Env(outerEnv, parameters, args);
      return evaluate(bodyExpr, fnEnv);
    },
    closureMeta
  );
  return returnResult(fn);
}
function evaluateApply(node2, appEnv) {
  const evaluatedList = evaluateAst(node2, appEnv);
  assertListNode(evaluatedList);
  const fn = evaluatedList.value[0];
  if (isFunctionNode(fn)) {
    const args = evaluatedList.value.slice(1);
    if (fn.closureMeta) {
      const ast = fn.closureMeta.ast;
      const fnEnv = new Env(
        fn.closureMeta.env,
        fn.closureMeta.parameters,
        args
      );
      return { continue: { ast, env: fnEnv }, return: void 0 };
    }
    const called = fn.value(...args);
    return { return: called, continue: void 0 };
  }
  return { return: fn, continue: void 0 };
}
function print(value) {
  return printString(value, true);
}
function rep(input, appEnv) {
  return print(evaluate(read(input), appEnv));
}
function initEnv() {
  const replEnv = new Env(void 0);
  for (const [coreSymbol, coreFunc] of ns.entries()) {
    replEnv.set(coreSymbol, coreFunc);
  }
  for (const [jsSymbol, jsFunc] of ns3.entries()) {
    replEnv.set(jsSymbol, jsFunc);
  }
  for (const [htmlSymbol, htmlFunc] of ns2.entries()) {
    replEnv.set(htmlSymbol, htmlFunc);
  }
  replEnv.set(
    createSymbolNode("eval"),
    createFunctionNode((...args) => {
      assertArgumentCount(args.length, 1);
      return evaluate(args[0], replEnv);
    })
  );
  replEnv.set(
    createSymbolNode("dump"),
    createFunctionNode((..._args) => {
      const serialized = replEnv.serialize();
      console.log(printString(serialized, true));
      return createNilNode();
    })
  );
  rep("(def! not (fn* (a) (if a false true)))", replEnv);
  rep(
    `(defmacro! cond
      (fn* (& xs)
       (if (> (count xs) 0) (list 'if (first xs)
                                  (if (> (count xs) 1) (nth xs 1)
                                      (throw "odd number of forms to cond"))
                                  (cons 'cond (rest (rest xs)))))))`,
    replEnv
  );
  return replEnv;
}

// src/ensemble/io.ts
var defaultPrompt = "user> ";
function writeToFile(text, filePath) {
  let file = null;
  try {
    file = std.open(filePath, "w");
    file.puts(text);
  } catch (e) {
    if (file !== null) file.close();
    throw new Error(`Error writing to file: ${e}`);
  }
}
function readln(...args) {
  assertArgumentCount(args.length, 1);
  const cmdPrompt = args[0];
  assertStringNode(cmdPrompt);
  const input = displayPrompt(cmdPrompt.value);
  if (input === null || input === void 0) {
    return createNilNode();
  }
  return createStringNode(input);
}
function readir(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  const files = [];
  const [entries, errorCode] = os.readdir(args[0].value);
  if (+errorCode > 0) {
    throw new Error(`Error reading directory: ${errorCode}`);
  }
  for (const entry of entries) {
    if (entry === "." || entry === "..") {
      continue;
    }
    files.push(createStringNode(entry));
  }
  return createVectorNode(files);
}
function slurp(...args) {
  assertArgumentCount(args.length, 1);
  const filePath = args[0];
  assertStringNode(filePath);
  const content = std.loadFile(filePath.value);
  if (content === null) {
    throw new Error(`No such file or directory. xxx`);
  }
  return createStringNode(content);
}
function spit(...args) {
  assertArgumentCount(args.length, 2);
  const filePath = args[0];
  assertStringNode(filePath);
  const content = args[1];
  assertStringNode(content);
  writeToFile(content.value, filePath.value);
  return createNilNode();
}
function displayPrompt(promptText = defaultPrompt) {
  std.out.puts(promptText);
  const input = std.in.getline()?.trim();
  console.log(input);
  console.log(promptText);
}
function* readline(promptText = defaultPrompt) {
  while (true) {
    std.out.puts(promptText);
    const input = std.in.getline()?.trim();
    if (!input) {
      continue;
    }
    yield input;
  }
}
function loadFileWithEnv(appEnv) {
  return function loadFile(...args) {
    assertArgumentCount(args.length, 1);
    assertStringNode(args[0]);
    const text = slurp(args[0]);
    assertStringNode(text);
    const fileEnv = new Env(appEnv);
    const result = rep(`(do ${text.value})
nil`, fileEnv);
    return createStringNode(result);
  };
}
function initMain() {
  const replEnv = initEnv();
  const appImport = loadFileWithEnv(replEnv);
  const nsValues3 = [
    ["readFile", slurp],
    ["slurp", slurp],
    ["load-file", appImport],
    ["import", appImport],
    ["readln", readln],
    ["prompt", readln],
    ["readir", readir],
    ["spit", spit],
    ["writeFile", spit]
    // ['serve', serve],
  ];
  for (const [name, value] of nsValues3) {
    replEnv.set(createSymbolNode(name), createFunctionNode(value));
  }
  return replEnv;
}
function toPosixPath(filePath = "") {
  return filePath.replace(/\\/g, "/");
}
async function main(...args) {
  const replEnv = initMain();
  const userScriptPath = toPosixPath(args[0]);
  const hostEnvArgs = args.slice(1).map((arg) => createStringNode(arg));
  replEnv.set(
    createSymbolNode("*ARGV*"),
    createListNode(hostEnvArgs)
  );
  replEnv.set(
    createSymbolNode("*host-language*"),
    createStringNode("Ensemble")
  );
  if (userScriptPath) {
    rep(`(import "${userScriptPath}")`, replEnv);
    return;
  }
  rep('(println (str "Welcome to " *host-language* "! Press Ctrl/Cmd+C to exit."))', replEnv);
  for await (const input of readline("user> ")) {
    if (input === "" || input === null) {
      continue;
    }
    try {
      const result = rep(input, replEnv);
      console.log(result);
    } catch (error) {
      if (isErrorNode(error)) {
        console.log(`error: ${printString(error, false)}`);
      } else if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}

// src/ensemble/cli.ts
main(...scriptArgs);
