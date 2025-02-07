import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = WeakSet.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = WeakSet.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(WeakSet, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = WeakSet[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakSet.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) &&
        (types.isNilNode(astArgs[0]) ||
          (types.isVectorNode(astArgs[0]) && (astArgs[0].value.length === 2) && types.isAstNode(astArgs[0].value[0]) &&
            types.isAstNode(astArgs[0].value[1])))
      ) {
        const values = types.toJs<types.NilNode | types.VectorNode<types.VectorNode<types.AstNode>>>(astArgs[0]);
        const result = new WeakSet(values); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.prototype.add'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const result = WeakSet.prototype.add.call(context, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.prototype.add"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.prototype.delete'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const result = WeakSet.prototype.delete.call(context, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.prototype.delete"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakSet.prototype.has'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const value = types.toJs<types.AstNode>(astArgs[1]);
        const result = WeakSet.prototype.has.call(context, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakSet.prototype.has"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
