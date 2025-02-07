import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = SharedArrayBuffer.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = SharedArrayBuffer.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(SharedArrayBuffer, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = SharedArrayBuffer[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "SharedArrayBuffer[Symbol.hasInstance]"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SharedArrayBuffer.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const byteLength = types.toJs<types.NumberNode>(astArgs[0]);
      const result = new SharedArrayBuffer(byteLength); // new
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.prototype.slice'),
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
        const result = SharedArrayBuffer.prototype.slice.call(context, begin, end);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SharedArrayBuffer.prototype.slice"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SharedArrayBuffer.prototype.byteLength'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = SharedArrayBuffer.prototype.byteLength;
        return types.toAst(result);
      }
      return types.createErrorNode(
        types.createStringNode('Invalid arguments to "SharedArrayBuffer.prototype.byteLength"'),
      );
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
