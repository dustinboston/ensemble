import * as types from '../../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = ArrayBuffer.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = ArrayBuffer.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(ArrayBuffer, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = ArrayBuffer[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = ArrayBuffer.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const byteLength = types.toJs<types.NumberNode>(astArgs[0]);
      const result = new ArrayBuffer(byteLength); // new
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.isView'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const arg = types.toJs<types.AstNode>(astArgs[0]);
        const result = ArrayBuffer.isView(arg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.isView"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.prototype.slice'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) && types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const begin = types.toJs<types.AstNode>(astArgs[1]);
        const end = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = ArrayBuffer.prototype.slice.call(context, begin, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('ArrayBuffer.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = ArrayBuffer.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "ArrayBuffer.prototype.byteLength"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
