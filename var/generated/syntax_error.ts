import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = SyntaxError.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = SyntaxError.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(SyntaxError, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = SyntaxError[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = SyntaxError.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isStringNode(astArgs[0])) {
        const message = types.toJs<types.StringNode>(astArgs[0] ?? types.createNilNode());
        const result = SyntaxError(message); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isStringNode(astArgs[0])) {
        const message = types.toJs<types.StringNode>(astArgs[0] ?? types.createNilNode());
        const result = new SyntaxError(message); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.prototype.message'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = SyntaxError.prototype.message;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.prototype.message"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.prototype.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = SyntaxError.prototype.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.prototype.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.prototype.cause'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = SyntaxError.prototype.cause;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.prototype.cause"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('SyntaxError.prototype.stack'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = SyntaxError.prototype.stack;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "SyntaxError.prototype.stack"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
