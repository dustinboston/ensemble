import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Promise.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Promise.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Promise.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Promise, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Promise[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Promise.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isFunctionNode(astArgs[0])) {
        const executor = types.toJs<types.FunctionNode>(astArgs[0]);
        const result = new Promise(executor); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.all'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isVectorNode(astArgs[0])) {
        const values = types.toJs<types.VectorNode>(astArgs[0]);
        const result = Promise.all(values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.all"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.allSettled'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isVectorNode(astArgs[0])) {
        const values = types.toJs<types.VectorNode>(astArgs[0]);
        const result = Promise.allSettled(values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.allSettled"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.any'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isVectorNode(astArgs[0])) {
        const values = types.toJs<types.VectorNode>(astArgs[0]);
        const result = Promise.any(values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.any"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.race'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isVectorNode(astArgs[0])) {
        const values = types.toJs<types.VectorNode>(astArgs[0]);
        const result = Promise.race(values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.race"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.reject'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const reason = types.toJs<types.AstNode>(astArgs[0]);
        const result = Promise.reject(reason);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.reject"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.resolve'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Promise.resolve(value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.resolve"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.prototype.catch'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isFunctionNode(astArgs[1]))
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const onRejected = types.toJs<types.AstNode>(astArgs[1]);
        const result = Promise.prototype.catch.call(context, onRejected);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.prototype.catch"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.prototype.finally'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isFunctionNode(astArgs[1]))
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const onFinally = types.toJs<types.AstNode>(astArgs[1]);
        const result = Promise.prototype.finally.call(context, onFinally);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.prototype.finally"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Promise.prototype.then'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isFunctionNode(astArgs[1]) &&
        (types.isNilNode(astArgs[2]) || types.isFunctionNode(astArgs[2]))
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const onFulfilled = types.toJs<types.AstNode>(astArgs[1]);
        const onRejected = types.toJs<types.FunctionNode>(astArgs[2]);
        const result = Promise.prototype.then.call(context, onFulfilled, onRejected);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Promise.prototype.then"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
