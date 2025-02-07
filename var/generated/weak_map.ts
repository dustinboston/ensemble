import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = WeakMap.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = WeakMap.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        /* rest */
        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(WeakMap, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = WeakMap[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = WeakMap.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 0 && astArgs.length <= 1) && (
          types.isVectorNode(astArgs[0]) &&
          (astArgs[0].value.length === 2) &&
          types.isAstNode(astArgs[0].value[0]) &&
          types.isAstNode(astArgs[0].value[1])
        )
      ) {
        const entries = types.toJs<types.VectorNode<types.VectorNode<types.AstNode>>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const result = new WeakMap(entries); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.prototype.delete'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const result = WeakMap.prototype.delete.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.prototype.delete"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.prototype.get'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const result = WeakMap.prototype.get.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.prototype.get"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.prototype.has'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1])) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const result = WeakMap.prototype.has.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.prototype.has"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('WeakMap.prototype.set'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isAtomNode(astArgs[1]) &&
        types.isAstNode(astArgs[2])
      ) {
        /* context */
        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.AtomNode>(astArgs[2]);
        const result = WeakMap.prototype.set.call(context, key, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "WeakMap.prototype.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
