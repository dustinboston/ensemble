import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Int16Array.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Int16Array.bind(thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Function.prototype.call.apply(Int16Array, [thisArg]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Int16Array[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Int16Array(); // new
        return types.toAst(result);
      }
      if ((astArgs.length === 1) && types.isNumberNode(astArgs[0])) {
        const length = types.toJs<types.NumberNode>(astArgs[0]);
        const result = new Int16Array(length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const array = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Int16Array(array); // new
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
        const result = new Int16Array(buffer, byteOffset, length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const elements = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Int16Array(elements); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.from'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const arrayLike = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = Int16Array.from(arrayLike);
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
        const result = Int16Array.from(arrayLike, mapfn, baz);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        const arrayLike = types.toJs<types.VectorNode>(astArgs[0]);
        const mapfn = types.toJs<types.FunctionNode>(astArgs[1]);
        const thisArg = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Int16Array.from(arrayLike, mapfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.from"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.BYTES_PER_ELEMENT'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int16Array.BYTES_PER_ELEMENT;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.BYTES_PER_ELEMENT"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.at'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int16Array.prototype.at.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.at"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.copyWithin'),
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
        const result = Int16Array.prototype.copyWithin.call(context, target, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.copyWithin"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.entries.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.entries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.every'),
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
        const result = Int16Array.prototype.every.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.every"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.fill'),
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
        const result = Int16Array.prototype.fill.call(context, value, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.fill"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.filter'),
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
        const result = Int16Array.prototype.filter.call(context, predicate, thisArg);
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
        const result = Int16Array.prototype.filter.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.filter"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.find'),
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
        const result = Int16Array.prototype.find.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.find"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.findIndex'),
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
        const result = Int16Array.prototype.findIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.findIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.findLast'),
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
        const result = Int16Array.prototype.findLast.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.findLast"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.findLastIndex'),
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
        const result = Int16Array.prototype.findLastIndex.call(context, predicate, thisArg);
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
        const result = Int16Array.prototype.findLastIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.findLastIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.forEach'),
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
        const result = Int16Array.prototype.forEach.call(context, callbackfn, thisArg);
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
        const result = Int16Array.prototype.forEach.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.forEach"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.includes'),
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
        const result = Int16Array.prototype.includes.call(context, searchElement, fromIndex);
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
        const result = Int16Array.prototype.includes.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.includes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.indexOf'),
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
        const result = Int16Array.prototype.indexOf.call(context, searchElement, fromIndex);
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
        const result = Int16Array.prototype.indexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.indexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.join'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const separator = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int16Array.prototype.join.call(context, separator);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.join"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.keys.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.lastIndexOf'),
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
        const result = Int16Array.prototype.lastIndexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.lastIndexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.map'),
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
        const result = Int16Array.prototype.map.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.map"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.reduce'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int16Array.prototype.reduce.call(context, callbackfn);
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
        const result = Int16Array.prototype.reduce.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.reduce"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.reduceRight'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int16Array.prototype.reduceRight.call(context, callbackfn);
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
        const result = Int16Array.prototype.reduceRight.call(context, callbackfn, initialValue);
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
        const result = Int16Array.prototype.reduceRight.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.reduceRight"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.reverse'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.reverse.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.reverse"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.set'),
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
        const result = Int16Array.prototype.set.call(context, array, offset);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.slice'),
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
        const result = Int16Array.prototype.slice.call(context, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.some'),
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
        const result = Int16Array.prototype.some.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.some"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.sort'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int16Array.prototype.sort.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.sort"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.subarray'),
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
        const result = Int16Array.prototype.subarray.call(context, begin, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.subarray"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Int16Array.prototype[Symbol.iterator]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.toLocaleString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Int16Array.prototype.toLocaleString"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.toReversed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.toReversed.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.toReversed"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.toSorted'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int16Array.prototype.toSorted.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.toSorted"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.valueOf.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.values.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.with'),
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
        const result = Int16Array.prototype.with.call(context, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.with"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.buffer'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.buffer;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.buffer"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.byteLength"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.byteOffset'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.byteOffset;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.byteOffset"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int16Array.prototype.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int16Array.prototype.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int16Array.prototype.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Int32Array.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Int32Array.bind(thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Function.prototype.call.apply(Int32Array, [thisArg]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Int32Array[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Int32Array(); // new
        return types.toAst(result);
      }
      if ((astArgs.length === 1) && types.isNumberNode(astArgs[0])) {
        const length = types.toJs<types.NumberNode>(astArgs[0]);
        const result = new Int32Array(length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const array = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Int32Array(array); // new
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
        const result = new Int32Array(buffer, byteOffset, length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const elements = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Int32Array(elements); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.from'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const arrayLike = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = Int32Array.from(arrayLike);
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
        const result = Int32Array.from(arrayLike, mapfn, baz);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        const arrayLike = types.toJs<types.VectorNode>(astArgs[0]);
        const mapfn = types.toJs<types.FunctionNode>(astArgs[1]);
        const thisArg = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Int32Array.from(arrayLike, mapfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.from"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.BYTES_PER_ELEMENT'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Int32Array.BYTES_PER_ELEMENT;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.BYTES_PER_ELEMENT"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.at'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int32Array.prototype.at.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.at"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.copyWithin'),
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
        const result = Int32Array.prototype.copyWithin.call(context, target, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.copyWithin"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.entries.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.entries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.every'),
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
        const result = Int32Array.prototype.every.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.every"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.fill'),
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
        const result = Int32Array.prototype.fill.call(context, value, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.fill"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.filter'),
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
        const result = Int32Array.prototype.filter.call(context, predicate, thisArg);
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
        const result = Int32Array.prototype.filter.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.filter"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.find'),
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
        const result = Int32Array.prototype.find.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.find"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.findIndex'),
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
        const result = Int32Array.prototype.findIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.findIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.findLast'),
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
        const result = Int32Array.prototype.findLast.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.findLast"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.findLastIndex'),
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
        const result = Int32Array.prototype.findLastIndex.call(context, predicate, thisArg);
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
        const result = Int32Array.prototype.findLastIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.findLastIndex"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.forEach'),
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
        const result = Int32Array.prototype.forEach.call(context, callbackfn, thisArg);
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
        const result = Int32Array.prototype.forEach.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.forEach"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.includes'),
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
        const result = Int32Array.prototype.includes.call(context, searchElement, fromIndex);
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
        const result = Int32Array.prototype.includes.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.includes"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.indexOf'),
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
        const result = Int32Array.prototype.indexOf.call(context, searchElement, fromIndex);
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
        const result = Int32Array.prototype.indexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.indexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.join'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const separator = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int32Array.prototype.join.call(context, separator);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.join"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.keys.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.lastIndexOf'),
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
        const result = Int32Array.prototype.lastIndexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.lastIndexOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.map'),
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
        const result = Int32Array.prototype.map.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.map"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.reduce'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int32Array.prototype.reduce.call(context, callbackfn);
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
        const result = Int32Array.prototype.reduce.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.reduce"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.reduceRight'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Int32Array.prototype.reduceRight.call(context, callbackfn);
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
        const result = Int32Array.prototype.reduceRight.call(context, callbackfn, initialValue);
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
        const result = Int32Array.prototype.reduceRight.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.reduceRight"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.reverse'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.reverse.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.reverse"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.set'),
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
        const result = Int32Array.prototype.set.call(context, array, offset);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.slice'),
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
        const result = Int32Array.prototype.slice.call(context, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.some'),
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
        const result = Int32Array.prototype.some.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.some"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.sort'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int32Array.prototype.sort.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.sort"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.subarray'),
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
        const result = Int32Array.prototype.subarray.call(context, begin, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.subarray"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Int32Array.prototype[Symbol.iterator]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.toLocaleString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Int32Array.prototype.toLocaleString"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.toReversed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.toReversed.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.toReversed"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.toSorted'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Int32Array.prototype.toSorted.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.toSorted"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.valueOf.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.values.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.with'),
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
        const result = Int32Array.prototype.with.call(context, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.with"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.buffer'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.buffer;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.buffer"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.byteLength"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.byteOffset'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.byteOffset;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.byteOffset"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Int32Array.prototype.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Int32Array.prototype.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Int32Array.prototype.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
