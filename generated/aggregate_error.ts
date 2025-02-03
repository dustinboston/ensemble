import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

function applyAggregateErrors(...astArgs: types.AstNode[]): types.AstNode {
  try {
    types.assertVariableArgumentCount(astArgs.length, 1, 2);
    types.assertAstNode(astArgs[0]);

    const thisArg = types.toJs<types.AstNode>(astArgs[0]);

    let argArray: Error[] = [];
    if (astArgs.length === 2) {
      types.assertVectorNode(astArgs[1]);
      types.assertSequentialValues<types.ErrorNode>(astArgs[1].value, types.ErrorNode);
      const xargArray = astArgs[0].value.map((x) => types.toJs<types.ErrorNode>(x));
    }

    const result = AggregateError.apply(thisArg, argArray);
    return types.toAst(result);
  } catch (e) {
    return toErrorNode(e);
  }
}

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.apply'),
  types.createFunctionNode(applyAggregateErrors),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = AggregateError.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.bind"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(AggregateError, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.call"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = AggregateError[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError[Symbol.hasInstance]"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.toString"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.length"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.name"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.prototype"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.toLocaleString"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.valueOf"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = AggregateError.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.constructor"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isStringNode(astArgs[0])) {
        const message = types.toJs<types.StringNode>(astArgs[0] ?? types.createNilNode());
        const result = AggregateError(message); // ctor
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length >= 0 && astArgs.length <= 1) && types.isStringNode(astArgs[0])) {
        const message = types.toJs<types.StringNode>(astArgs[0] ?? types.createNilNode());
        const result = new AggregateError(message); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.new"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.prototype.message'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = AggregateError.prototype.message;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.prototype.message"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.prototype.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = AggregateError.prototype.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.prototype.name"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.prototype.cause'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = AggregateError.prototype.cause;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.prototype.cause"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.prototype.stack'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = AggregateError.prototype.stack;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.prototype.stack"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('AggregateError.prototype.errors'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const result = AggregateError.prototype.errors;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "AggregateError.prototype.errors"');
    } catch (e) {
      return toErrorNode(e);
    }
  }),
);
