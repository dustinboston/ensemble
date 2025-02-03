import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Uint8ClampedArray.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Uint8ClampedArray.bind(thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const result = Function.prototype.call.apply(Uint8ClampedArray, [thisArg]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Uint8ClampedArray[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Uint8ClampedArray(); // new
        return types.toAst(result);
      }
      if ((astArgs.length === 1) && types.isNumberNode(astArgs[0])) {
        const length = types.toJs<types.NumberNode>(astArgs[0]);
        const result = new Uint8ClampedArray(length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const array = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Uint8ClampedArray(array); // new
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
        const result = new Uint8ClampedArray(buffer, byteOffset, length); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const elements = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = new Uint8ClampedArray(elements); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.from'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        const arrayLike = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const result = Uint8ClampedArray.from(arrayLike);
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
        const result = Uint8ClampedArray.from(arrayLike, mapfn, baz);
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {
        const arrayLike = types.toJs<types.VectorNode>(astArgs[0]);
        const mapfn = types.toJs<types.FunctionNode>(astArgs[1]);
        const thisArg = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Uint8ClampedArray.from(arrayLike, mapfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.from"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.BYTES_PER_ELEMENT'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Uint8ClampedArray.BYTES_PER_ELEMENT;
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.BYTES_PER_ELEMENT"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.at'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const index = types.toJs<types.AstNode>(astArgs[1]);
        const result = Uint8ClampedArray.prototype.at.call(context, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.at"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.copyWithin'),
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
        const result = Uint8ClampedArray.prototype.copyWithin.call(context, target, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.copyWithin"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.entries.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.entries"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.every'),
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
        const result = Uint8ClampedArray.prototype.every.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.every"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.fill'),
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
        const result = Uint8ClampedArray.prototype.fill.call(context, value, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.fill"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.filter'),
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
        const result = Uint8ClampedArray.prototype.filter.call(context, predicate, thisArg);
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
        const result = Uint8ClampedArray.prototype.filter.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.filter"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.find'),
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
        const result = Uint8ClampedArray.prototype.find.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.find"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.findIndex'),
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
        const result = Uint8ClampedArray.prototype.findIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.findIndex"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.findLast'),
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
        const result = Uint8ClampedArray.prototype.findLast.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.findLast"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.findLastIndex'),
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
        const result = Uint8ClampedArray.prototype.findLastIndex.call(context, predicate, thisArg);
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
        const result = Uint8ClampedArray.prototype.findLastIndex.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.findLastIndex"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.forEach'),
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
        const result = Uint8ClampedArray.prototype.forEach.call(context, callbackfn, thisArg);
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
        const result = Uint8ClampedArray.prototype.forEach.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.forEach"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.includes'),
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
        const result = Uint8ClampedArray.prototype.includes.call(context, searchElement, fromIndex);
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
        const result = Uint8ClampedArray.prototype.includes.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.includes"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.indexOf'),
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
        const result = Uint8ClampedArray.prototype.indexOf.call(context, searchElement, fromIndex);
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
        const result = Uint8ClampedArray.prototype.indexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.indexOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.join'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isStringNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const separator = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Uint8ClampedArray.prototype.join.call(context, separator);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.join"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.keys.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.lastIndexOf'),
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
        const result = Uint8ClampedArray.prototype.lastIndexOf.call(context, searchElement, fromIndex);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.lastIndexOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.map'),
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
        const result = Uint8ClampedArray.prototype.map.call(context, callbackfn, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.map"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.reduce'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Uint8ClampedArray.prototype.reduce.call(context, callbackfn);
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
        const result = Uint8ClampedArray.prototype.reduce.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.reduce"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.reduceRight'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const callbackfn = types.toJs<types.AstNode>(astArgs[1]);
        const result = Uint8ClampedArray.prototype.reduceRight.call(context, callbackfn);
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
        const result = Uint8ClampedArray.prototype.reduceRight.call(context, callbackfn, initialValue);
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
        const result = Uint8ClampedArray.prototype.reduceRight.call(context, callbackfn, initialValue);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.reduceRight"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.reverse'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.reverse.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.reverse"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.set'),
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
        const result = Uint8ClampedArray.prototype.set.call(context, array, offset);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.slice'),
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
        const result = Uint8ClampedArray.prototype.slice.call(context, start, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.some'),
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
        const result = Uint8ClampedArray.prototype.some.call(context, predicate, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.some"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.sort'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Uint8ClampedArray.prototype.sort.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.sort"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.subarray'),
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
        const result = Uint8ClampedArray.prototype.subarray.call(context, begin, end);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.subarray"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype[Symbol.iterator]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.toLocaleString.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.toLocaleString"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.toReversed'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.toReversed.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.toReversed"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.toSorted'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const compareFn = types.toJs<types.AstNode>(astArgs[1] ?? types.createNilNode());
        const result = Uint8ClampedArray.prototype.toSorted.call(context, compareFn);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.toSorted"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.valueOf.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.valueOf"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.values.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.with'),
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
        const result = Uint8ClampedArray.prototype.with.call(context, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.with"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.buffer'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.buffer;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.buffer"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.byteLength"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.byteOffset'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.byteOffset;
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "Uint8ClampedArray.prototype.byteOffset"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Uint8ClampedArray.prototype.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = Uint8ClampedArray.prototype.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Uint8ClampedArray.prototype.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
