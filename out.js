var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/types.ts
var types_exports = {};
__export(types_exports, {
  AstNode: () => AstNode,
  AtomNode: () => AtomNode,
  BooleanNode: () => BooleanNode,
  DomNode: () => DomNode,
  ErrorNode: () => ErrorNode,
  FunctionNode: () => FunctionNode,
  JsNode: () => JsNode,
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
  assertDef: () => assertDef,
  assertDefMacro: () => assertDefMacro,
  assertDefined: () => assertDefined,
  assertDo: () => assertDo,
  assertDomNode: () => assertDomNode,
  assertEq: () => assertEq,
  assertEqual: () => assertEqual,
  assertErrorNode: () => assertErrorNode,
  assertEvenArgumentCount: () => assertEvenArgumentCount,
  assertFn: () => assertFn,
  assertFunctionNode: () => assertFunctionNode,
  assertGreaterThanEqual: () => assertGreaterThanEqual,
  assertIf: () => assertIf,
  assertIsOneOf: () => assertIsOneOf,
  assertKeywordNode: () => assertKeywordNode,
  assertLet: () => assertLet,
  assertListNode: () => assertListNode,
  assertMapKeyNode: () => assertMapKeyNode,
  assertMapNode: () => assertMapNode,
  assertMetadataType: () => assertMetadataType,
  assertMinimumArgumentCount: () => assertMinimumArgumentCount,
  assertNilNode: () => assertNilNode,
  assertNullOrUndefined: () => assertNullOrUndefined,
  assertNumberNode: () => assertNumberNode,
  assertQuasiQuote: () => assertQuasiQuote,
  assertQuasiQuoteExpand: () => assertQuasiQuoteExpand,
  assertQuote: () => assertQuote,
  assertSequential: () => assertSequential,
  assertSequentialValues: () => assertSequentialValues,
  assertStringNode: () => assertStringNode,
  assertSymWithValue: () => assertSymWithValue,
  assertSymbolNode: () => assertSymbolNode,
  assertTrue: () => assertTrue,
  assertTryCatch: () => assertTryCatch,
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
  dekey: () => dekey,
  deleteMapElement: () => deleteMapElement,
  entitize: () => entitize,
  getMapElement: () => getMapElement,
  getMapKeys: () => getMapKeys,
  getMapValues: () => getMapValues,
  hasMapElement: () => hasMapElement,
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
  isVectorNode: () => isVectorNode,
  listStartsWithSymbol: () => listStartsWithSymbol,
  mapFlat: () => mapFlat,
  normalizeWhitespace: () => normalizeWhitespace,
  prepend: () => prepend,
  returnResult: () => returnResult,
  setMapElement: () => setMapElement,
  slash: () => slash,
  splitAtFirstDot: () => splitAtFirstDot,
  toAst: () => toAst
});
var AstNode = class {
  // deno-lint-ignore no-explicit-any
  constructor(value) {
    this.value = value;
  }
  toJs() {
    return this.astToJs(this);
  }
  astToJs(ast) {
    if (ast instanceof StringNode || ast instanceof KeywordNode || ast instanceof SymbolNode || ast instanceof BooleanNode || ast instanceof NumberNode) {
      return ast.value;
    }
    if (ast instanceof AtomNode) {
      return this.astToJs(ast.value);
    }
    if (ast instanceof ErrorNode) {
      const message = this.astToJs(ast.value);
      return new Error(String(message));
    }
    if (ast instanceof FunctionNode) {
      return ast.value;
    }
    if (ast instanceof ListNode || ast instanceof VectorNode) {
      return ast.value.map((value) => this.astToJs(value));
    }
    if (ast instanceof MapNode) {
      const obj = {};
      for (const [key, valueAstNode] of ast.value.entries()) {
        const value = this.astToJs(valueAstNode);
        obj[key] = value;
      }
      return obj;
    }
    if (ast instanceof NilNode) {
      return null;
    }
    throw new TypeError(`unmatched object ${JSON.stringify(ast)}`);
  }
};
var SymbolNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var ListNode = class extends AstNode {
  constructor(value, metadata = new NilNode()) {
    super(value);
    this.value = value;
    this.metadata = metadata;
  }
};
var VectorNode = class extends AstNode {
  constructor(value, metadata = new NilNode()) {
    super(value);
    this.value = value;
    this.metadata = metadata;
  }
};
var AtomNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var BooleanNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var MapNode = class extends AstNode {
  constructor(value = /* @__PURE__ */ new Map(), metadata = new NilNode()) {
    super(value);
    this.value = value;
    this.metadata = metadata;
  }
};
var ErrorNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var FunctionNode = class extends AstNode {
  constructor(value, closureMeta, isMacro2 = false, metadata = new NilNode()) {
    super(value);
    this.value = value;
    this.closureMeta = closureMeta;
    this.isMacro = isMacro2;
    this.metadata = metadata;
  }
};
var KeywordNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var NilNode = class extends AstNode {
  constructor(value = null) {
    super(value);
    this.value = value;
  }
};
var NumberNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var StringNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
var DomNode = class extends AstNode {
  constructor(value, attributes = /* @__PURE__ */ new Map(), children = [], metadata = new NilNode()) {
    super(value);
    this.value = value;
    this.attributes = attributes;
    this.children = children;
    this.metadata = metadata;
  }
};
var JsNode = class extends AstNode {
  constructor(value) {
    super(value);
    this.value = value;
  }
};
function assertDomNode(node2) {
  if (!(node2 instanceof DomNode)) {
    throw new TypeError("Invalid DomNode");
  }
}
function assertAstNode(node2) {
  if (!(node2 instanceof AstNode)) {
    throw new TypeError("Invalid AstNode");
  }
}
function assertAtomNode(node2) {
  if (!(node2 instanceof AtomNode)) {
    throw new TypeError("Invalid AtomNode");
  }
}
function assertBooleanNode(node2) {
  if (!(node2 instanceof BooleanNode)) {
    throw new TypeError("Invalid BooleanNode");
  }
}
function assertMapNode(node2) {
  if (!(node2 instanceof MapNode)) {
    throw new TypeError("Invalid MapNode");
  }
}
function assertErrorNode(node2) {
  if (!(node2 instanceof ErrorNode)) {
    throw new TypeError("Invalid ErrorNode");
  }
}
function assertFunctionNode(node2) {
  if (!(node2 instanceof FunctionNode)) {
    throw new TypeError("Invalid FunctionNode");
  }
}
function assertKeywordNode(node2) {
  if (!(node2 instanceof KeywordNode)) {
    throw new TypeError("Invalid KeywordNode");
  }
}
function assertListNode(node2) {
  if (!(node2 instanceof ListNode)) {
    throw new TypeError("Invalid ListNode");
  }
}
function assertNilNode(node2) {
  if (!(node2 instanceof NilNode)) {
    throw new TypeError("Invalid NilNode");
  }
}
function assertNumberNode(node2) {
  if (!(node2 instanceof NumberNode)) {
    throw new TypeError("Invalid NumberNode");
  }
}
function assertStringNode(node2) {
  if (!(node2 instanceof StringNode)) {
    throw new TypeError("Invalid StringNode");
  }
}
function assertSymbolNode(node2) {
  if (!(node2 instanceof SymbolNode)) {
    throw new TypeError("Invalid SymbolNode");
  }
}
function assertVectorNode(node2) {
  if (!(node2 instanceof VectorNode)) {
    throw new TypeError("Invalid VectorNode");
  }
}
function isDomNode(node2) {
  return node2 instanceof DomNode ? true : false;
}
function isAstNode(node2) {
  return node2 instanceof AstNode ? true : false;
}
function isAtomNode(node2) {
  return node2 instanceof AtomNode ? true : false;
}
function isBooleanNode(node2) {
  return node2 instanceof BooleanNode ? true : false;
}
function isMapNode(node2) {
  return node2 instanceof MapNode ? true : false;
}
function isErrorNode(node2) {
  return node2 instanceof ErrorNode ? true : false;
}
function isFunctionNode(node2) {
  return node2 instanceof FunctionNode ? true : false;
}
function isKeywordNode(node2) {
  return node2 instanceof KeywordNode ? true : false;
}
function isListNode(node2) {
  return node2 instanceof ListNode ? true : false;
}
function isNilNode(node2) {
  return node2 instanceof NilNode ? true : false;
}
function isNumberNode(node2) {
  return node2 instanceof NumberNode ? true : false;
}
function isStringNode(node2) {
  return node2 instanceof StringNode ? true : false;
}
function isSymbolNode(node2) {
  return node2 instanceof SymbolNode ? true : false;
}
function isVectorNode(node2) {
  return node2 instanceof VectorNode ? true : false;
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
function isAstTruthy(a) {
  if (a instanceof AtomNode) {
    if (a.value instanceof AstNode !== true) {
      return Boolean(a.value);
    }
    return isAstTruthy(a.value);
  }
  if (a instanceof BooleanNode) {
    return a.value;
  }
  const nilAst = a;
  if (nilAst instanceof NilNode) {
    return false;
  }
  if (a instanceof NumberNode) {
    return true;
  }
  return Boolean(a.value);
}
function isSequentialNode(value) {
  return value instanceof ListNode || value instanceof VectorNode;
}
function assertSequential(value) {
  if (!(value instanceof ListNode) && !(value instanceof VectorNode)) {
    throw new TypeError("Invalid sequential type");
  }
}
function assertMapKeyNode(value) {
  if (!(value instanceof StringNode) && !(value instanceof SymbolNode) && !(value instanceof KeywordNode)) {
    throw new TypeError("Invalid dictionary key");
  }
}
function isMapKeyNode(value) {
  return value instanceof StringNode || value instanceof SymbolNode || value instanceof KeywordNode;
}
function assertMetadataType(value) {
  if (!(value instanceof FunctionNode) && !(value instanceof ListNode) && !(value instanceof VectorNode) && !(value instanceof MapNode) && !(value instanceof DomNode)) {
    throw new TypeError("Invalid metadata type");
  }
}
function assertArgumentCount(actualCount, expectedCount) {
  if (actualCount !== expectedCount) {
    throw new Error(`Wanted ${expectedCount} arguments but got ${actualCount}`);
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
function isEqualTo(a, b) {
  if (isSequentialNode(a) && isSequentialNode(b)) {
    if (a.value.length !== b.value.length) {
      return new BooleanNode(false);
    }
    for (let i = 0; i < a.value.length; i++) {
      if (!isEqualTo(a.value[i], b.value[i]).value) {
        return new BooleanNode(false);
      }
    }
    return new BooleanNode(true);
  }
  if (a instanceof MapNode && b instanceof MapNode) {
    if (a.value.size !== b.value.size) {
      return new BooleanNode(false);
    }
    for (const [aKeyString, aValue] of a.value) {
      const bValue = b.value.get(aKeyString);
      if (bValue === void 0) {
        return new BooleanNode(false);
      }
      const recurResult = isEqualTo(aValue, bValue);
      if (!recurResult.value) {
        return new BooleanNode(false);
      }
    }
    return new BooleanNode(true);
  }
  if (!isSameClass(a, b)) {
    return new BooleanNode(false);
  }
  const result = a.value === b.value;
  return new BooleanNode(result);
}
function listStartsWithSymbol(listNode, symbolValue) {
  const isListWithSymbol = listNode instanceof ListNode && listNode.value[0] instanceof SymbolNode;
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
  if (ast instanceof AtomNode) {
    return copyAtomNode(ast);
  }
  if (ast instanceof BooleanNode) {
    return copyBooleanNode(ast);
  }
  if (ast instanceof MapNode) {
    return copyMapNode(ast);
  }
  if (ast instanceof ErrorNode) {
    return copyErrorNode(ast);
  }
  if (ast instanceof FunctionNode) {
    return copyFunctionNode(ast);
  }
  if (ast instanceof KeywordNode) {
    return copyKeywordNode(ast);
  }
  if (ast instanceof ListNode) {
    return copyListNode(ast);
  }
  if (ast instanceof NilNode) {
    return copyNilNode(ast);
  }
  if (ast instanceof NumberNode) {
    return copyNumberNode(ast);
  }
  if (ast instanceof StringNode) {
    return copyStringNode(ast);
  }
  if (ast instanceof SymbolNode) {
    return copySymbolNode(ast);
  }
  if (ast instanceof VectorNode) {
    return copyVectorNode(ast);
  }
  if (ast instanceof DomNode) {
    return copyDomNode(ast);
  }
  throw new Error("Unmatched object");
}
function copyAtomNode(a) {
  return new AtomNode(copy(a.value));
}
function copyBooleanNode(a) {
  return new BooleanNode(a.value);
}
function copyMapNode(a) {
  const dict = new MapNode(new Map(a.value));
  dict.metadata = copy(a.metadata);
  return dict;
}
function copyDomNode(a) {
  const tagName = a.value;
  const attributes = a.attributes;
  const children = a.children;
  const domNode = new DomNode(tagName, new Map(attributes), children.map(copy));
  domNode.metadata = copy(a.metadata);
  return domNode;
}
function copyErrorNode(a) {
  return new ErrorNode(copy(a.value));
}
function copyFunctionNode(a) {
  const func = new FunctionNode(a.value);
  func.isMacro = a.isMacro;
  func.metadata = copy(a.metadata);
  if (a.closureMeta) {
    const cl = a.closureMeta;
    func.closureMeta = {
      ast: copy(cl.ast),
      env: cl.env,
      // Copy env?
      parameters: cl.parameters.map((sym) => new SymbolNode(sym.value))
    };
  }
  return func;
}
function copyKeywordNode(a) {
  return new KeywordNode(a.value);
}
function copyListNode(a) {
  const list2 = new ListNode(a.value.map((value) => copy(value)));
  list2.metadata = copy(a.metadata);
  return list2;
}
function copyNilNode(_ast) {
  return new NilNode();
}
function copyNumberNode(a) {
  return new NumberNode(a.value);
}
function copyStringNode(a) {
  return new StringNode(a.value);
}
function copySymbolNode(a) {
  return new SymbolNode(a.value);
}
function copyVectorNode(a) {
  const vec2 = new VectorNode(a.value.map((value) => copy(value)));
  vec2.metadata = copy(a.metadata);
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
  return new ListNode(keys2.map((key) => convertStringToMapKey(key)));
}
function convertMapKeyToString(ast) {
  const key = ast;
  if (key instanceof KeywordNode) {
    return key.value;
  }
  const string_ = ast;
  if (string_ instanceof StringNode) {
    return `"${string_.value}"`;
  }
  return ast.value;
}
function convertStringToMapKey(key) {
  if (key.startsWith(":")) {
    return new KeywordNode(key);
  }
  if (key.startsWith('"')) {
    return new StringNode(key.slice(1, -1));
  }
  return new SymbolNode(key);
}
function dekey(key) {
  const value = isMapKeyNode(key) ? key.value : key;
  if (value.startsWith(":")) {
    return value.slice(1);
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}
function getMapValues(map) {
  const values = [...map.values()];
  return new ListNode(values);
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
function entitize(unsafe) {
  return unsafe.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
function normalizeWhitespace(string_) {
  return string_.replaceAll("\n", " ").replaceAll(/\s{2,}/g, " ");
}
function slash(string_) {
  return string_.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "\\n");
}
function toAst(input) {
  switch (typeof input) {
    case "undefined": {
      return new NilNode();
    }
    case "number": {
      return new NumberNode(input);
    }
    case "string": {
      if (input.startsWith('"')) {
        return new StringNode(input);
      }
      if (input.startsWith(":")) {
        return new KeywordNode(input);
      }
      return new SymbolNode(input);
    }
    case "boolean": {
      return new BooleanNode(input);
    }
    case "symbol":
    case "bigint": {
      return new StringNode(JSON.stringify(input));
    }
    case "function": {
      return new FunctionNode(
        (...args) => {
          try {
            return toAst(input(...args.map((x) => x.value)));
          } catch (error) {
            if (error instanceof Error) {
              return new ErrorNode(
                new StringNode(error.message)
              );
            }
            return new ErrorNode(
              new StringNode(JSON.stringify(error))
            );
          }
        }
      );
    }
    case "object": {
      if (input instanceof Error) {
        return new ErrorNode(new StringNode(input.message));
      }
      if (input === null) {
        return new NilNode();
      }
      if (Array.isArray(input)) {
        const array = input.map((element) => toAst(element));
        return new ListNode(array);
      }
      if (input instanceof Map) {
        const map2 = /* @__PURE__ */ new Map();
        for (const [maybeString, unknownValue] of input.entries()) {
          const key = String(maybeString);
          const value = toAst(unknownValue);
          map2.set(key, value);
        }
        return new MapNode(map2);
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
      return new MapNode(map);
    }
    default: {
      const coercedUnknown = String(input);
      return new ErrorNode(
        new StringNode(`uknown type ${coercedUnknown}`)
      );
    }
  }
}

// src/printer.ts
function printString(ast, printReadably = false) {
  if (ast instanceof StringNode) {
    return printReadably ? `"${slash(ast.value)}"` : ast.value;
  }
  if (ast instanceof KeywordNode || ast instanceof BooleanNode || ast instanceof NumberNode || ast instanceof SymbolNode) {
    return String(ast.value);
  }
  if (ast instanceof AtomNode) {
    return `(atom ${printString(ast.value)})`;
  }
  if (ast instanceof ErrorNode) {
    return printString(ast.value, printReadably);
  }
  if (ast instanceof FunctionNode) {
    return "#<fn>";
  }
  if (isSequentialNode(ast)) {
    const isList = ast instanceof ListNode;
    const serialized = ast.value.map((value) => printString(value, printReadably)).join(" ");
    return isList ? `(${serialized})` : `[${serialized}]`;
  }
  if (ast instanceof DomNode) {
    const body = [ast.value];
    if (ast.attributes.size > 0) {
      const values = mapFlat(ast.attributes).map((value) => printString(value, printReadably)).join(" ");
      body.push(`{${values}}`);
    }
    if (ast.children.length > 0) {
      const children = ast.children.map((child) => printString(child, printReadably));
      body.push(children.join(" "));
    }
    return `<${body.join(" ")}>`;
  }
  if (ast instanceof MapNode) {
    const serialized = mapFlat(ast.value).map((value) => printString(value, printReadably)).join(" ");
    return `{${serialized}}`;
  }
  if (ast instanceof NilNode) {
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
  if (ast instanceof DomNode) {
    const tagName = ast.value;
    const isSelfClosing = selfClosingTags.has(tagName);
    let attributes = "";
    if (ast.attributes.size > 0) {
      attributes = " " + Array.from(ast.attributes).map(([key, value]) => {
        if (key === "style") return printInlineCss(value, printReadably);
        return `${dekey(key)}="${printHtml(value, printReadably)}"`;
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
  if (ast instanceof StringNode) {
    return printReadably ? `"${slash(ast.value)}"` : ast.value;
  }
  if (ast instanceof KeywordNode || ast instanceof BooleanNode || ast instanceof NumberNode || ast instanceof SymbolNode) {
    return String(ast.value);
  }
  if (ast instanceof AtomNode) {
    return `(atom ${printHtml(ast.value)})`;
  }
  if (ast instanceof ErrorNode) {
    return printHtml(ast.value, printReadably);
  }
  if (ast instanceof FunctionNode) {
    return "#<fn>";
  }
  if (isSequentialNode(ast)) {
    const isList = ast instanceof ListNode;
    const serialized = ast.value.map((value) => printHtml(value, printReadably)).join(" ");
    return isList ? `(${serialized})` : `[${serialized}]`;
  }
  if (ast instanceof MapNode) {
    const serialized = mapFlat(ast.value).map((value) => printHtml(value, printReadably)).join(" ");
    return `{${serialized}}`;
  }
  if (ast instanceof NilNode) {
    return "nil";
  }
  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}
function printJavaScript(ast, printReadably = false) {
  if (ast instanceof DomNode) {
    return "/* element */";
  }
  if (ast instanceof StringNode || ast instanceof KeywordNode || ast instanceof SymbolNode) {
    return `"${ast.value}"`;
  }
  if (ast instanceof BooleanNode || ast instanceof NumberNode) {
    return String(ast.value);
  }
  if (ast instanceof AtomNode) {
    return `/* atom */`;
  }
  if (ast instanceof ErrorNode) {
    return "/* error */";
  }
  if (ast instanceof FunctionNode) {
    return "#<fn>";
  }
  if (isSequentialNode(ast)) {
    const isList = ast instanceof ListNode;
    const serialized = ast.value.map((value) => printJavaScript(value, printReadably)).join(" ");
    return isList ? `(${serialized})` : `[${serialized}]`;
  }
  if (ast instanceof MapNode) {
    const serialized = mapFlat(ast.value).map((value) => printJavaScript(value, printReadably)).join(" ");
    return `{${serialized}}`;
  }
  if (ast instanceof NilNode) {
    return "nil";
  }
  throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}
function printCss(ast, printReadably = false) {
  if (ast instanceof StringNode) {
    if (printReadably) {
      return slash(ast.value);
    }
    return ast.value;
  }
  if (ast instanceof KeywordNode) {
    return ast.value.slice(1);
  }
  if (ast instanceof NumberNode) {
    return String(ast.value);
  }
  if (ast instanceof SymbolNode) {
    return ast.value;
  }
  if (ast instanceof ErrorNode) {
    return printCss(ast.value, printReadably);
  }
  if (ast instanceof ListNode || ast instanceof VectorNode) {
    return ast.value.map((value) => printCss(value, printReadably)).join(" ");
  }
  if (ast instanceof MapNode) {
    return [...ast.value].map(([key, valueAst]) => {
      const selector = dekey(key);
      if (valueAst instanceof NilNode) return selector;
      if (valueAst instanceof MapNode) return `${selector} {${printCss(valueAst, printReadably)}}`;
      return `${dekey(key)}: ${printCss(valueAst, printReadably)};`;
    }).join(" ");
  }
  if (ast instanceof BooleanNode || ast instanceof AtomNode || ast instanceof FunctionNode || ast instanceof DomNode || ast instanceof NilNode) {
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
  return [...valueAst.value].map(([key, value]) => `${dekey(key)}: ${printCss(value, printReadably)};`).join("");
}

// src/reader.ts
var tokenRegex = /[\s,]*(~@|[[\]{}()<>'`~^@]|"(?:\\.|[^\\"])*"?|;.*|\/\/.*|[^\s[\]{}<>('"`,;)]*)/g;
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
  const matches = [...code.matchAll(tokenRegex)].filter((match) => !match[1].startsWith(";") && match[1] !== "").map((match) => match[1]);
  return matches;
}
function readString(code) {
  const tokens = tokenize(code);
  if (tokens.length === 0) {
    return new NilNode();
  }
  return readForm(new Reader(tokens));
}
function readForm(rdr) {
  const token = rdr.peek();
  if (token === void 0) {
    throw new Error("EOF");
  }
  function makeForm(symbol2, meta2) {
    return new ListNode([
      new SymbolNode(symbol2),
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
    case "<": {
      return readSequence(rdr, ">");
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
    return new NilNode();
  }
  if (token === "false") {
    return new BooleanNode(false);
  }
  if (token === "true") {
    return new BooleanNode(true);
  }
  if (numberRegex.test(token)) {
    return new NumberNode(Number.parseFloat(token));
  }
  if (stringRegex.test(token)) {
    const unescaped = new StringNode(unescapeString(token));
    return unescaped;
  }
  if (token.startsWith(":") || token.endsWith(":")) {
    return new KeywordNode(token);
  }
  if (token.startsWith('"')) {
    throw new Error(`expected '"', got EOF`);
  }
  return new SymbolNode(token);
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
    case ">": {
      const tagName = astNodes[0];
      assertSymbolNode(tagName);
      const attributes = isMapNode(astNodes[1]) ? astNodes[1].value : void 0;
      const children = isMapNode(astNodes[1]) ? astNodes.slice(2) : astNodes.slice(1);
      return new DomNode(tagName.value, attributes, children);
    }
    case ")": {
      return new ListNode(astNodes);
    }
    case "]": {
      return new VectorNode(astNodes);
    }
    case "}": {
      const dict = new MapNode();
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

// src/core.ts
var { readTextFileSync, writeFileSync, readDirSync } = Deno;
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
  ["readline", readln],
  ["readir", readir],
  ["slurp", slurp],
  ["readFile", slurp],
  ["spit", spit],
  ["writeFile", spit],
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
  ["swap!", swap],
  // JavaScript functions
  // ====================
  // Operators
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
  // JavScript control flow
  ["switch", switchCase],
  // Maps
  ["Map.entries", from],
  ["Map.get", get],
  ["Map.has", contains],
  ["Map.keys", keys],
  ["Map.new", hashMap],
  ["Map.remove", dissoc],
  ["Map.set", assoc],
  ["Map.size", length],
  ["Map.values", vals],
  // Arrays
  ["Array.at", nth],
  ["Array.concat", concat],
  ["Array.every", every],
  ["Array.filter", filter],
  ["Array.from", from],
  ["Array.includes", contains],
  ["Array.isArray", isVector],
  ["Array.join", join],
  ["Array.length", length],
  ["Array.map", applyToSequence],
  ["Array.new", vector],
  ["Array.push", conj],
  ["Array.reduce", reduce],
  ["Array.shift", firstNodeInList],
  ["Array.slice", slice],
  ["Array.some", some],
  ["Array.unshift", cons],
  // Strings
  ["String.includes", includes],
  ["String.trim", trim],
  // Math
  ["Math.abs", abs],
  ["Math.acos", acos],
  ["Math.acosh", acosh],
  ["Math.asin", asin],
  ["Math.asinh", asinh],
  ["Math.atan", atan],
  ["Math.atan2", atan2],
  ["Math.atanh", atanh],
  ["Math.cbrt", cbrt],
  ["Math.ceil", ceil],
  ["Math.clz32", clz32],
  ["Math.cos", cos],
  ["Math.cosh", cosh],
  ["Math.exp", exp],
  ["Math.expm1", expm1],
  ["Math.floor", floor],
  ["Math.fround", fround],
  ["Math.hypot", hypot],
  ["Math.imul", imul],
  ["Math.log", log],
  ["Math.log10", log10],
  ["Math.log1p", log1p],
  ["Math.log2", log2],
  ["Math.max", max],
  ["Math.min", min],
  ["Math.pow", pow],
  ["Math.random", random],
  ["Math.round", round],
  ["Math.sign", sign],
  ["Math.sin", sin],
  ["Math.sinh", sinh],
  ["Math.sqrt", sqrt],
  ["Math.tan", tan],
  ["Math.tanh", tanh],
  ["Math.trunc", trunc],
  // Math constants
  ["Math.E", getMathE],
  ["Math.LN10", getMathLn10],
  ["Math.LN2", getMathLn2],
  ["Math.LOG10E", getMathLog10e],
  ["Math.LOG2E", getMathLog2e],
  ["Math.PI", getMathPi],
  ["Math.SQRT1_2", getMathSqrt12],
  ["Math.SQRT2", getMathSqrt2],
  // Type checking
  ["typeOf", typeOf],
  ["instanceOf", instanceOf],
  ["js-eval", jsEval],
  // Backend
  ["serve", serve],
  // HTML
  ["a", tag("a")],
  ["abbr", tag("abbr")],
  ["address", tag("address")],
  ["area", tag("area")],
  ["article", tag("article")],
  ["aside", tag("aside")],
  ["audio", tag("audio")],
  ["b", tag("b")],
  ["base", tag("base")],
  ["bdi", tag("bdi")],
  ["bdo", tag("bdo")],
  ["blockquote", tag("blockquote")],
  ["body", tag("body")],
  ["br", tag("br")],
  ["button", tag("button")],
  ["canvas", tag("canvas")],
  ["caption", tag("caption")],
  ["cite", tag("cite")],
  ["code", tag("code")],
  ["col", tag("col")],
  ["colgroup", tag("colgroup")],
  ["data", tag("data")],
  ["datalist", tag("datalist")],
  ["dd", tag("dd")],
  ["del", tag("del")],
  ["details", tag("details")],
  ["dfn", tag("dfn")],
  ["dialog", tag("dialog")],
  ["div", tag("div")],
  ["dl", tag("dl")],
  ["!doctype", tag("!doctype")],
  ["dt", tag("dt")],
  ["em", tag("em")],
  ["embed", tag("embed")],
  ["fieldset", tag("fieldset")],
  ["figcaption", tag("figcaption")],
  ["figure", tag("figure")],
  ["footer", tag("footer")],
  ["form", tag("form")],
  ["h1", tag("h1")],
  ["h2", tag("h2")],
  ["h3", tag("h3")],
  ["h4", tag("h4")],
  ["h5", tag("h5")],
  ["h6", tag("h6")],
  ["head", tag("head")],
  ["header", tag("header")],
  ["hgroup", tag("hgroup")],
  ["hr", tag("hr")],
  ["html", tag("html")],
  ["i", tag("i")],
  ["iframe", tag("iframe")],
  ["img", tag("img")],
  ["imgmap", tag("imgmap")],
  // Renamed from map to avoid conflict with core map function
  ["input", tag("input")],
  ["kbd", tag("kbd")],
  ["label", tag("label")],
  ["legend", tag("legend")],
  ["li", tag("li")],
  ["link", tag("link")],
  ["main", tag("main")],
  ["mark", tag("mark")],
  ["menu", tag("menu")],
  ["meter", tag("meter")],
  ["nav", tag("nav")],
  ["noscript", tag("noscript")],
  ["object", tag("object")],
  ["ol", tag("ol")],
  ["optgroup", tag("optgroup")],
  ["option", tag("option")],
  ["output", tag("output")],
  ["p", tag("p")],
  ["picture", tag("picture")],
  ["pre", tag("pre")],
  ["portal", tag("portal")],
  ["progress", tag("progress")],
  ["q", tag("q")],
  ["rp", tag("rp")],
  ["rt", tag("rt")],
  ["ruby", tag("ruby")],
  ["s", tag("s")],
  ["samp", tag("samp")],
  ["script", tag("script")],
  ["search", tag("search")],
  ["section", tag("section")],
  ["select", tag("select")],
  ["slot", tag("slot")],
  ["small", tag("small")],
  ["source", tag("source")],
  ["span", tag("span")],
  ["strong", tag("strong")],
  ["style", tag("style")],
  ["sub", tag("sub")],
  ["summary", tag("summary")],
  ["sup", tag("sup")],
  ["table", tag("table")],
  ["tbody", tag("tbody")],
  ["td", tag("td")],
  ["template", tag("template")],
  ["textarea", tag("textarea")],
  ["tfoot", tag("tfoot")],
  ["th", tag("th")],
  ["thead", tag("thead")],
  ["time", tag("time")],
  ["title", tag("title")],
  ["tr", tag("tr")],
  ["track", tag("track")],
  ["u", tag("u")],
  ["ul", tag("ul")],
  ["var", tag("var")],
  ["video", tag("video")],
  ["wbr", tag("wbr")],
  // DOM
  ["document.querySelector", querySelector]
];
for (const [sym, fn] of nsValues) {
  ns.set(new SymbolNode(sym), new FunctionNode(fn));
}
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
      return new ErrorNode(new StringNode(error.message));
    }
    return new ErrorNode(new StringNode(JSON.stringify(error)));
  }
}
function eq(...args) {
  assertArgumentCount(args.length, 2);
  return isEqualTo(args[0], args[1]);
}
function printEscapedString(...args) {
  const result = args.map((arg) => printString(arg, true)).join(" ");
  return new StringNode(result);
}
function printUnescapedString(...args) {
  const result = args.map((arg) => printString(arg, false)).join("");
  return new StringNode(result);
}
function printEscapedStringToScreen(...args) {
  const result = args.map((arg) => printString(arg, true)).join(" ");
  console.log(result);
  return new NilNode();
}
function printUnescapedStringToScreen(...args) {
  const result = args.map((arg) => printString(arg, false)).join(" ");
  console.log(result);
  return new NilNode();
}
function readString2(...args) {
  assertArgumentCount(args.length, 1);
  const code = args[0];
  assertStringNode(code);
  return readString(code.value);
}
function readln(...args) {
  assertArgumentCount(args.length, 1);
  const cmdPrompt = args[0];
  assertStringNode(cmdPrompt);
  const input = prompt(cmdPrompt.value);
  if (input === null || input === void 0) {
    return new NilNode();
  }
  return new StringNode(input);
}
function readir(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  const files = [];
  for (const entry of readDirSync(args[0].value)) {
    const map = /* @__PURE__ */ new Map();
    map.set(":file", new BooleanNode(entry.isFile));
    map.set(":directory", new BooleanNode(entry.isDirectory));
    map.set(":symlink", new BooleanNode(entry.isSymlink));
    map.set(":name", new StringNode(entry.name));
    const firstDotIndex = entry.name.indexOf(".");
    const slug = entry.name.slice(0, firstDotIndex);
    const ext = entry.name.slice(firstDotIndex + 1);
    map.set(":slug", new StringNode(slug));
    map.set(":ext", new StringNode(ext));
    files.push(new MapNode(map));
  }
  return new VectorNode(files);
}
function slurp(...args) {
  assertArgumentCount(args.length, 1);
  const filePath = args[0];
  assertStringNode(filePath);
  const content = readTextFileSync(filePath.value);
  return new StringNode(content);
}
function spit(...args) {
  assertArgumentCount(args.length, 2);
  const filePath = args[0];
  assertStringNode(filePath);
  const content = args[1];
  assertStringNode(content);
  const encoder = new TextEncoder();
  const data = encoder.encode(content.value);
  writeFileSync(filePath.value, data);
  return new NilNode();
}
function serve(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertDomNode(args[0]);
  Deno.serve(
    (_req) => new Response(printHtml(args[0]), {
      headers: { "Content-Type": "text/html" }
    })
  );
  return new NilNode();
}
function trim(...args) {
  assertArgumentCount(args.length, 1);
  const string_ = args[0];
  assertStringNode(string_);
  return new StringNode(string_.value.trim());
}
function lt(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new BooleanNode(a.value < b.value);
}
function lte(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new BooleanNode(a.value <= b.value);
}
function gt(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new BooleanNode(a.value > b.value);
}
function gte(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new BooleanNode(a.value >= b.value);
}
function add(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new NumberNode(a.value + b.value);
}
function subtract(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new NumberNode(a.value - b.value);
}
function multiply(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new NumberNode(a.value * b.value);
}
function divide(...args) {
  assertArgumentCount(args.length, 2);
  const a = args[0];
  assertNumberNode(a);
  const b = args[1];
  assertNumberNode(b);
  return new NumberNode(a.value / b.value);
}
function timeMs(...args) {
  assertArgumentCount(args.length, 0);
  return new NumberNode(performance.timeOrigin + performance.now());
}
function list(...args) {
  for (const arg of args) {
    assertAstNode(arg);
  }
  return new ListNode(args);
}
function isListNode2(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof ListNode);
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
  return new ListNode(resultList);
}
function vec(...args) {
  return args[0] instanceof ListNode ? new VectorNode(args[0].value) : args[0];
}
function nth(...args) {
  assertArgumentCount(args.length, 2);
  if (isSequentialNode(args[0]) && args[1] instanceof NumberNode) {
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
  return new NilNode();
}
function rest(...args) {
  assertArgumentCount(args.length, 1);
  if (isSequentialNode(args[0])) {
    return new ListNode(args[0].value.slice(1));
  }
  return new ListNode([]);
}
function slice(...args) {
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
  return new VectorNode(args[0].value.slice(start, end));
}
function empty(...args) {
  assertArgumentCount(args.length, 1);
  const list2 = args[0];
  assertSequential(list2);
  return new BooleanNode(list2.value.length === 0);
}
function length(...args) {
  assertArgumentCount(args.length, 1);
  const value = args[0];
  if (value instanceof NilNode) {
    return new NumberNode(0);
  }
  if (isMapNode(args[0])) {
    return new NumberNode(args[0].value.size);
  } else if (isSequentialNode(args[0])) {
    return new NumberNode(args[0].value.length);
  } else {
    throw new TypeError("Invalid argument type");
  }
}
function atom(...args) {
  assertArgumentCount(args.length, 1);
  const value = args[0];
  return new AtomNode(value);
}
function isAtom(...args) {
  assertArgumentCount(args.length, 1);
  const node2 = args[0];
  return new BooleanNode(node2 instanceof AtomNode);
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
  throw new ErrorNode(args[0]);
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
  return new ListNode(result);
}
function every(...args) {
  const count = args.length;
  assertArgumentCount(count, 2);
  assertFunctionNode(args[0]);
  assertVectorNode(args[1]);
  const fn = args[0];
  const vec2 = args[1];
  const result = vec2.value.every((item) => fn.value(item));
  return new BooleanNode(result);
}
function some(...args) {
  const count = args.length;
  assertArgumentCount(count, 2);
  assertFunctionNode(args[0]);
  assertVectorNode(args[1]);
  const fn = args[0];
  const vec2 = args[1];
  const result = vec2.value.some((item) => fn.value(item));
  return new BooleanNode(result);
}
function conj(...args) {
  assertMinimumArgumentCount(args.length, 2);
  assertSequential(args[0]);
  const [seq2, ...rest2] = args;
  if (seq2 instanceof ListNode) {
    return new ListNode([...rest2.reverse(), ...seq2.value]);
  }
  const vecSeq = seq2;
  return new VectorNode([...vecSeq.value, ...rest2]);
}
function seq(...args) {
  assertArgumentCount(args.length, 1);
  const ast = args[0];
  if (ast instanceof ListNode && ast.value.length > 0) {
    return ast;
  }
  if (ast instanceof VectorNode && ast.value.length > 0) {
    return new ListNode([...ast.value]);
  }
  if (ast instanceof StringNode && ast.value.length > 0) {
    return new ListNode(
      ast.value.split("").map((char) => new StringNode(char))
    );
  }
  return new NilNode();
}
function from(...args) {
  assertArgumentCount(args.length, 1);
  const ast = args[0];
  if (ast instanceof MapNode && ast.value.size > 0) {
    const entries = Array.from(args[0].value.entries()).map(([k, v]) => new VectorNode([new StringNode(k), v]));
    return new VectorNode(entries);
  }
  if (ast instanceof ListNode && ast.value.length > 0) {
    return new VectorNode([...ast.value]);
  }
  if (ast instanceof VectorNode && ast.value.length > 0) {
    return new VectorNode([...ast.value]);
  }
  if (ast instanceof StringNode && ast.value.length > 0) {
    return new VectorNode(
      ast.value.split("").map((char) => new StringNode(char))
    );
  }
  return new NilNode();
}
function meta(...args) {
  assertArgumentCount(args.length, 1);
  assertMetadataType(args[0]);
  return args[0].metadata;
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
  return new BooleanNode(args[0] instanceof NilNode);
}
function isTrue(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(
    args[0] instanceof BooleanNode && args[0].value
  );
}
function isFalse(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(
    args[0] instanceof BooleanNode && !args[0].value
  );
}
function isString(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof StringNode);
}
function symbol(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  return new SymbolNode(args[0].value);
}
function isSymbolNode2(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof SymbolNode);
}
function keyword(...args) {
  assertArgumentCount(args.length, 1);
  assertMapKeyNode(args[0]);
  const key = args[0];
  if (key instanceof KeywordNode) {
    return key;
  }
  const string_ = args[0];
  return new KeywordNode(`:${string_.value}`);
}
function isKeyword(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof KeywordNode);
}
function isNumber(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof NumberNode);
}
function isFn(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(
    args[0] instanceof FunctionNode && !args[0].isMacro
  );
}
function isMacro(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(
    args[0] instanceof FunctionNode ? args[0].isMacro : false
  );
}
function vector(...args) {
  return new VectorNode(args);
}
function isVector(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof VectorNode);
}
function hashMap(...args) {
  if (args.length === 0) {
    return new MapNode();
  }
  assertEvenArgumentCount(args.length);
  const dict = new MapNode();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    assertMapKeyNode(key);
    setMapElement(dict.value, key, args[i + 1]);
  }
  return dict;
}
function isMap(...args) {
  assertArgumentCount(args.length, 1);
  return new BooleanNode(args[0] instanceof MapNode);
}
function assoc(...args) {
  assertMinimumArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  const rest2 = args.slice(1);
  const dict = new MapNode(
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
  const dict = new MapNode(
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
  if (!(mapNode instanceof MapNode)) {
    return new NilNode();
  }
  const key = args[1];
  assertMapKeyNode(key);
  const value = getMapElement(mapNode.value, key);
  if (value !== void 0) {
    return value;
  }
  return new NilNode();
}
function contains(...args) {
  assertArgumentCount(args.length, 2);
  const dict = args[0];
  const key = args[1];
  assertMapNode(dict);
  assertMapKeyNode(key);
  return new BooleanNode(hasMapElement(dict.value, key));
}
function keys(...args) {
  assertArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  return getMapKeys(args[0].value);
}
function vals(...args) {
  assertArgumentCount(args.length, 1);
  assertMapNode(args[0]);
  return new ListNode([...args[0].value.values()]);
}
function isSequentialNode2(...args) {
  return new BooleanNode(isSequentialNode(args[0]));
}
function join(...args) {
  assertVariableArgumentCount(args.length, 1, 2);
  assertSequential(args[0]);
  const delim = args[1] instanceof StringNode ? args[1].value : " ";
  const joined = args[0].value.map((ast) => printString(ast, false)).join(delim);
  return new StringNode(joined);
}
function includes(...args) {
  assertArgumentCount(args.length, 2);
  assertAstNode(args[1]);
  if (isStringNode(args[0])) {
    assertStringNode(args[0]);
    const str = args[0].value;
    const substring = args[1].value;
    const result = str.includes(substring);
    return new BooleanNode(result);
  }
  if (isVectorNode(args[0])) {
    assertVectorNode(args[0]);
    const vec2 = args[0];
    const element = args[1];
    const result = vec2.value.some((item) => isEqualTo(item, element).value);
    return new BooleanNode(result);
  }
  throw new TypeError("Invalid argument type");
}
function filter(...args) {
  assertArgumentCount(args.length, 2);
  assertFunctionNode(args[0]);
  assertVectorNode(args[1]);
  const fn = args[0];
  const vec2 = args[1];
  const filtered = vec2.value.filter((item) => Boolean(fn.value(item).value));
  return new VectorNode(filtered);
}
function reduce(...args) {
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
function switchCase(...args) {
  assertMinimumArgumentCount(args.length, 2);
  const [expr, ...clauses] = args;
  const defaultClause = clauses.pop();
  assertDefined(defaultClause);
  assertFunctionNode(defaultClause);
  const length2 = clauses.length;
  for (let i = 0; i < length2; i++) {
    const clause = clauses[i];
    assertListNode(clause);
    assertArgumentCount(clause.value.length, 2);
    assertFunctionNode(clause.value[1]);
    const result = isEqualTo(expr, clause.value[0]);
    if (result.value) {
      return clause.value[1].value();
    }
  }
  return defaultClause.value();
}
function and(...args) {
  for (const arg of args) {
    const isTruthy = isAstTruthy(arg);
    if (!isTruthy) {
      return new BooleanNode(false);
    }
  }
  return new BooleanNode(true);
}
function or(...args) {
  for (const arg of args) {
    const isTruthy = isAstTruthy(arg);
    if (isTruthy) {
      return new BooleanNode(true);
    }
  }
  return new BooleanNode(false);
}
function notEqualTo(...args) {
  assertArgumentCount(args.length, 2);
  const bool = isEqualTo(args[0], args[1]);
  return new BooleanNode(!bool.value);
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
    return new VectorNode([
      new NumberNode(args[0].value + 1),
      new NumberNode(args[0].value)
    ]);
  }
  if (affix === "prefix") {
    return new VectorNode([
      new NumberNode(args[0].value + 1),
      new NumberNode(args[0].value + 1)
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
    return new VectorNode([
      new NumberNode(args[0].value - 1),
      new NumberNode(args[0].value)
    ]);
  }
  if (affix === "prefix") {
    return new VectorNode([
      new NumberNode(args[0].value - 1),
      new NumberNode(args[0].value - 1)
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
  return new BooleanNode(obj === args[1].value);
}
function instanceOf(...args) {
  assertArgumentCount(args.length, 2);
  assertAstNode(args[0]);
  if (args[1] instanceof StringNode === false || args[1] instanceof SymbolNode === false) {
    throw new TypeError(
      `Instance type must be a string or symbol. Got "${String(args[1].value)}"`
    );
  }
  assertStringNode(args[1]);
  if (typeof args[1].value !== "string") {
    throw new TypeError(
      `Instance type must be a string. Got "${String(args[1].value)}"`
    );
  }
  const a = args[0].value;
  const b = args[1].value;
  let instance = void 0;
  if (b === "AstNode" || b === "SymbolNode" || b === "ListNode" || b === "VectorNode" || b === "AtomNode" || b === "BooleanNode" || b === "MapNode" || b === "ErrorNode" || b === "KeywordNode" || b === "NilNode" || b === "NumberNode" || b === "StringNode" || b === "FunctionNode") {
    instance = types_exports[args[1].value];
  } else if (Object.hasOwn(globalThis, args[1].value)) {
    instance = globalThis[args[1].value];
  } else {
    throw new TypeError(`Unknown instance: "${args[1].value}"`);
  }
  return new BooleanNode(a instanceof instance);
}
function nullishCoalesce(a, b) {
  return a.value == null ? b : a;
}
function power(base, exponent) {
  if (base instanceof NumberNode && exponent instanceof NumberNode) {
    return new NumberNode(base.value ** exponent.value);
  }
  throw new TypeError("not a number");
}
function remainder(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode((a.value % b.value + b.value) % b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseAnd(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode(a.value & b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseOr(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode(a.value | b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseXor(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode(a.value ^ b.value);
  }
  throw new TypeError("not a number");
}
function bitwiseNot(a) {
  if (a instanceof NumberNode) {
    return new NumberNode(~a.value);
  }
  throw new TypeError("not a number");
}
function leftShift(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode(a.value << b.value);
  }
  throw new TypeError("not a number");
}
function rightShift(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode(a.value >> b.value);
  }
  throw new TypeError("not a number");
}
function unsignedRightShift(a, b) {
  if (a instanceof NumberNode && b instanceof NumberNode) {
    return new NumberNode(a.value >>> b.value);
  }
  throw new TypeError("not a number");
}
function not(a) {
  return new BooleanNode(!a.value);
}
function abs(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.abs(args[0].value));
}
function acos(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.acos(args[0].value));
}
function acosh(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.acosh(args[0].value));
}
function asin(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.asin(args[0].value));
}
function asinh(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.asinh(args[0].value));
}
function atan(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.atan(args[0].value));
}
function atan2(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  return new NumberNode(Math.atan2(args[0].value, args[0].value));
}
function atanh(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.atanh(args[0].value));
}
function cbrt(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.cbrt(args[0].value));
}
function ceil(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.ceil(args[0].value));
}
function clz32(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.clz32(args[0].value));
}
function cos(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.cos(args[0].value));
}
function cosh(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.cosh(args[0].value));
}
function exp(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.exp(args[0].value));
}
function expm1(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.expm1(args[0].value));
}
function floor(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.floor(args[0].value));
}
function fround(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.fround(args[0].value));
}
function hypot(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.hypot(args[0].value));
}
function imul(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  return new NumberNode(Math.imul(args[0].value, args[1].value));
}
function log(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.log(args[0].value));
}
function log10(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.log10(args[0].value));
}
function log1p(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.log1p(args[0].value));
}
function log2(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.log2(args[0].value));
}
function max(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.max(args[0].value));
}
function min(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.min(args[0].value));
}
function pow(...args) {
  assertArgumentCount(args.length, 2);
  assertNumberNode(args[0]);
  assertNumberNode(args[1]);
  return new NumberNode(Math.pow(args[0].value, args[1].value));
}
function random(..._args) {
  return new NumberNode(Math.random());
}
function round(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.round(args[0].value));
}
function sign(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.sign(args[0].value));
}
function sin(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.sin(args[0].value));
}
function sinh(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.sinh(args[0].value));
}
function sqrt(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.sqrt(args[0].value));
}
function tan(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.tan(args[0].value));
}
function tanh(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.tanh(args[0].value));
}
function trunc(...args) {
  assertArgumentCount(args.length, 1);
  assertNumberNode(args[0]);
  return new NumberNode(Math.trunc(args[0].value));
}
function getMathE(..._args) {
  return new NumberNode(Math.E);
}
function getMathLn10(..._args) {
  return new NumberNode(Math.LN10);
}
function getMathLn2(..._args) {
  return new NumberNode(Math.LN2);
}
function getMathLog10e(..._args) {
  return new NumberNode(Math.LOG10E);
}
function getMathLog2e(..._args) {
  return new NumberNode(Math.LOG2E);
}
function getMathPi(..._args) {
  return new NumberNode(Math.PI);
}
function getMathSqrt12(..._args) {
  return new NumberNode(Math.SQRT1_2);
}
function getMathSqrt2(..._args) {
  return new NumberNode(Math.SQRT2);
}
function tag(tag2) {
  return (...args) => node(new SymbolNode(tag2), ...args);
}
function node(...args) {
  assertMinimumArgumentCount(args.length, 1);
  const tagName = args[0];
  assertSymbolNode(tagName);
  const attributes = /* @__PURE__ */ new Map();
  const children = [];
  if (args[1] instanceof MapNode) {
    args[1].value.forEach((value, key) => attributes.set(key, value));
    args.slice(2).forEach((child) => children.push(child));
  } else {
    args.slice(1).forEach((child) => children.push(child));
  }
  return new DomNode(tagName.value, attributes, children);
}
function querySelector(...args) {
  assertArgumentCount(args.length, 1);
  assertStringNode(args[0]);
  const selector = args[0].value;
  const element = document.querySelector(selector);
  if (element === null) {
    return new NilNode();
  }
  const nodeMap = Array.from(element.attributes);
  const attributes = nodeMap.reduce((map, attr) => {
    return map.set(attr.name, new StringNode(attr.value));
  }, /* @__PURE__ */ new Map());
  return new DomNode(element.tagName, attributes, []);
}

// src/env.ts
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
      const bind = binds[i];
      if (bind.value === "&") {
        const nextBind = binds[i + 1];
        if (nextBind) {
          const remainingExprs = exprs.slice(i);
          const keyString2 = convertMapKeyToString(nextBind);
          this.value.set(
            keyString2,
            new ListNode(remainingExprs)
          );
          break;
        }
      }
      const keyString = convertMapKeyToString(bind);
      this.value.set(keyString, exprs[i]);
    }
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

// src/ensemble.ts
function read(malCode) {
  const ast = readString(malCode);
  return ast;
}
function quasiquote(node2) {
  const isQuotableNode = node2 instanceof MapNode || node2 instanceof SymbolNode;
  if (isQuotableNode) {
    return new ListNode([new SymbolNode("quote"), node2]);
  }
  if (!isSequentialNode(node2)) {
    return node2;
  }
  const firstValueIsUnquote = listStartsWithSymbol(node2, "unquote");
  if (firstValueIsUnquote) {
    return node2.value[1];
  }
  let result = new ListNode([]);
  for (let i = node2.value.length - 1; i >= 0; i--) {
    const element = node2.value[i];
    result = listStartsWithSymbol(element, "splice-unquote") ? new ListNode([
      new SymbolNode("concat"),
      element.value[1],
      result
    ]) : new ListNode([
      new SymbolNode("cons"),
      quasiquote(element),
      result
    ]);
  }
  if (node2 instanceof VectorNode) {
    result = new ListNode([new SymbolNode("vec"), result]);
  }
  return result;
}
function isMacroCall(ast, appEnv) {
  if (!(ast instanceof ListNode) || !(ast.value[0] instanceof SymbolNode)) {
    return false;
  }
  const symbol2 = ast.value[0];
  const foundEnv = appEnv.findEnv(symbol2);
  if (!isDefined(foundEnv)) {
    return false;
  }
  const fn = foundEnv.get(symbol2);
  if (!(fn instanceof FunctionNode)) {
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
  if (node2 instanceof SymbolNode) {
    return appEnv.get(node2);
  }
  if (node2 instanceof VectorNode) {
    const evaluated = node2.value.map((v) => evaluate(v, appEnv));
    return new VectorNode(evaluated);
  }
  if (node2 instanceof ListNode) {
    const evaluated = node2.value.map((v) => evaluate(v, appEnv));
    return new ListNode(evaluated);
  }
  if (node2 instanceof MapNode) {
    const evaluated = /* @__PURE__ */ new Map();
    for (const [key, value] of node2.value.entries()) {
      evaluated.set(key, evaluate(value, appEnv));
    }
    return new MapNode(evaluated);
  }
  if (node2 instanceof DomNode) {
    const tagName = node2.value;
    const attributes = Array.from(node2.attributes).reduce((map, [key, value]) => map.set(key, evaluate(value, appEnv)), /* @__PURE__ */ new Map());
    const children = node2.children.map((child) => evaluate(child, appEnv));
    return new DomNode(tagName, attributes, children);
  }
  return node2;
}
function evaluate(node2, appEnv) {
  for (; ; ) {
    if (node2 instanceof ListNode === false) {
      return evaluateAst(node2, appEnv);
    }
    if (node2.value.length === 0) {
      return node2;
    }
    node2 = macroExpand(node2, appEnv);
    if (node2 instanceof ListNode === false) {
      return evaluateAst(node2, appEnv);
    }
    if (node2.value.length === 0) {
      return node2;
    }
    const symbolValue = node2.value[0] instanceof SymbolNode ? node2.value[0].value : "goto_default_clause";
    let result;
    switch (symbolValue) {
      case "var":
      case "def!": {
        result = evaluateDef(node2, appEnv);
        break;
      }
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
  return returnResult(quasiquote(node2.value[1]));
}
function evaluateQuasiQuote(node2, appEnv) {
  assertQuasiQuote(node2);
  const resultAst = quasiquote(node2.value[1]);
  return continueResult(resultAst, appEnv);
}
function evaluateDefMacro(node2, appEnv) {
  assertDefMacro(node2);
  const variableName = node2.value[1];
  const variableValue = node2.value[2];
  const evaluatedValue = evaluate(variableValue, appEnv);
  const copiedValue = copy(evaluatedValue);
  if (copiedValue instanceof FunctionNode) {
    copiedValue.isMacro = true;
  }
  return returnResult(appEnv.set(variableName, copiedValue));
}
function evaluateDo(node2, appEnv) {
  assertDo(node2);
  let lastResult = new NilNode();
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
    if (error instanceof ErrorNode) {
      message = error;
    } else if (error instanceof Error) {
      message = new StringNode(error.message);
    } else {
      message = new StringNode(JSON.stringify(error));
    }
    const caught = new ErrorNode(message);
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
  return returnResult(new NilNode());
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
  const fn = new FunctionNode(
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
  if (fn instanceof FunctionNode) {
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
  replEnv.set(
    new SymbolNode("eval"),
    new FunctionNode((...args) => {
      assertArgumentCount(args.length, 1);
      return evaluate(args[0], replEnv);
    })
  );
  rep("(def! not (fn* (a) (if a false true)))", replEnv);
  rep(`(def! load-file (fn* (f) (eval (read-string (str "(do " (slurp f) "
nil)")))))`, replEnv);
  rep(
    `(defmacro! cond (fn* (& xs) (if (> (count xs) 0) (list 'if (first xs) (if (> (count xs) 1) (nth xs 1) (throw "odd number of forms to cond")) (cons 'cond (rest (rest xs)))))))`,
    replEnv
  );
  return replEnv;
}
function main(...args) {
  const replEnv = initEnv();
  const userScriptPath = args[0];
  const hostEnvArgs = args.slice(1).map((arg) => new StringNode(arg));
  replEnv.set(
    new SymbolNode("*ARGV*"),
    new ListNode(hostEnvArgs)
  );
  replEnv.set(
    new SymbolNode("*host-language*"),
    new StringNode("ENSEMBLE")
  );
  if (userScriptPath) {
    rep(`(load-file "${userScriptPath}")`, replEnv);
    return;
  }
  rep('(println (str "Mal [" *host-language* "]"))', replEnv);
  for (; ; ) {
    const input = prompt("user>");
    if (input === null || input === void 0) {
      break;
    }
    if (input === "") {
      continue;
    }
    try {
      const result = rep(input, replEnv);
      console.log(result);
    } catch (error) {
      if (error instanceof ErrorNode) {
        console.error(`error: ${printString(error, false)}`);
      } else if (error instanceof Error) {
        console.error(error);
      }
    }
  }
}
if (import.meta.main) {
  main(...Deno.args);
}
export {
  evaluate,
  evaluateApply,
  evaluateAst,
  evaluateDef,
  evaluateDefMacro,
  evaluateDo,
  evaluateFn,
  evaluateIf,
  evaluateLet,
  evaluateQuasiQuote,
  evaluateQuasiQuoteExpand,
  evaluateQuote,
  evaluateTry,
  initEnv,
  isMacroCall,
  macroExpand,
  main,
  print,
  quasiquote,
  read,
  rep
};
