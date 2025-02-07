import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Int8Array.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Int8Array.bind(thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Function.prototype.call.apply(Int8Array, [thisArg]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Int8Array[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Int8Array(); // new
        return types.toAst(result);
      }
      if ((astArgs.length === 1) && types.isNumberNode(astArgs[0])) {
        const length = types.toJs<types.NumberNode>(astArgs[0]);
        const result = new Int8Array(length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const array = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Int8Array(array); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2])
      ) {
        const buffer = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const byteOffset = types.toJs<types.NumberNode>(astArgs[1] ?? types.createNilNode());
        const length = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = new Int8Array(buffer, byteOffset, length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const elements = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Int8Array(elements); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.from'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const arrayLike = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = Int8Array.from(arrayLike);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        const arrayLike = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const mapfn = types.toJs<types.FunctionNode>(astArgs[1] ?? types.createNilNode());
        const baz = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.from(arrayLike, mapfn, baz);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        const arrayLike = types.toJs<types.VectorNode>(astArgs[0]);
        const mapfn = types.toJs<types.FunctionNode>(astArgs[1]);
        const thisArg = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.from(arrayLike, mapfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.from"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.BYTES_PER_ELEMENT'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int8Array.BYTES_PER_ELEMENT;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.BYTES_PER_ELEMENT"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.at'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int8Array.prototype.at.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.at"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.copyWithin'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const target = types.toJs<types.AstNode>(astArgs[1]);
        const start = types.toJs<types.NumberNode>(astArgs[2]);
        const end = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Int8Array.prototype.copyWithin.call(context, target, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.copyWithin"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.entries.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.entries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.every'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.every.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.every"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.fill'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) &&
        types.isNumberNode(astArgs[3])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const start = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const end = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Int8Array.prototype.fill.call(context, value, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.fill"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.filter'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.filter.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.filter.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.filter"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.find'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.find.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.find"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.findIndex'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.findIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.findIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.findLast'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.findLast.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.findLast"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.findLastIndex'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.findLastIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.findLastIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.findLastIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.forEach'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.forEach.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.forEach.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.forEach"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.includes'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const searchElement = types.toJs<types.AstNode>(astArgs[1]);
        const fromIndex = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.includes.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const searchElement = types.toJs<types.AstNode>(astArgs[1]);
        const fromIndex = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.includes.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.includes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.indexOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const searchElement = types.toJs<types.AstNode>(astArgs[1]);
        const fromIndex = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.indexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const searchElement = types.toJs<types.AstNode>(astArgs[1]);
        const fromIndex = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.indexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.indexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.join'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const separator = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int8Array.prototype.join.call(context, separator);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.join"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.keys.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.lastIndexOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const searchElement = types.toJs<types.AstNode>(astArgs[1]);
        const fromIndex = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.lastIndexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.lastIndexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.map'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.map.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.map"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.reduce'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int8Array.prototype.reduce.call(context, callbackfn);
        return types.toAst(result);
      }
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && (types.isFunctionNode(astArgs[1])) &&
        types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const initialValue = types.toJs<>(astArgs[2]);
        const result = Int8Array.prototype.reduce.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.reduce"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.reduceRight'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int8Array.prototype.reduceRight.call(context, callbackfn);
        return types.toAst(result);
      }
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const initialValue = types.toJs<types.FunctionNode>(astArgs[2]);
        const result = Int8Array.prototype.reduceRight.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && (types.isFunctionNode(astArgs[1])) &&
        types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const initialValue = types.toJs<>(astArgs[2]);
        const result = Int8Array.prototype.reduceRight.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.reduceRight"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.reverse'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.reverse.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.reverse"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.set'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1]) &&
        types.isTypedVector(astArgs[1], types.NumberNode) && types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const array = types.toJs<types.AstNode>(astArgs[1]);
        const offset = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.set.call(context, array, offset);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.slice'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const start = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const end = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.slice.call(context, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.some'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const predicate = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.some.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.some"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.sort'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int8Array.prototype.sort.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.sort"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.subarray'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const begin = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const end = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Int8Array.prototype.subarray.call(context, begin, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.subarray"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Int8Array.prototype[Symbol.iterator]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.toLocaleString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.toReversed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.toReversed.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.toReversed"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.toSorted'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int8Array.prototype.toSorted.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.toSorted"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.valueOf.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.values.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.with'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Int8Array.prototype.with.call(context, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.with"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.buffer'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.buffer;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.buffer"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.byteLength"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.byteOffset'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.byteOffset;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.byteOffset"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int8Array.prototype.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int8Array.prototype.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int8Array.prototype.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
