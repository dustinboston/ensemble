/*
import * as types from '../../types.ts';

javascriptNamespace.set(
  types.createSymbolNode('Map.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 1 && astArgs.length <= 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])
      ) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);
        const argArray = types.toJs<types.VectorNode>(astArgs[1] ?? types.createNilNode());
        const result = Map.apply(thisArg, argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.bind'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Map.bind(thisArg, ...argArray);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.bind"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.call'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isVectorNode(astArgs[1])) {
        const thisArg = types.toJs<types.AstNode>(astArgs[0]);

        const argArray = astArgs.slice(1).map((x) => types.toJs<types.VectorNode>(x));
        const result = Function.prototype.call.apply(Map, [thisArg, ...argArray]);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.call"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map[Symbol.hasInstance]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const value = types.toJs<types.AstNode>(astArgs[0]);
        const result = Map[Symbol.hasInstance](value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map[Symbol.hasInstance]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.toString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.toString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.toString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.length'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.length;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.length"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.name'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.name;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.name"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.prototype;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.toLocaleString'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.toLocaleString();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.toLocaleString"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.valueOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.valueOf();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.valueOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.constructor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Map.constructor;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.constructor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.new'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = new Map(); // new
        return types.toAst(result);
      }
      if (
        (astArgs.length >= 0 && astArgs.length <= 1) &&
        (types.isNilNode(astArgs[0]) ||
          (types.isVectorNode(astArgs[0]) && (astArgs[0].value.length === 2) && types.isAstNode(astArgs[0].value[0]) &&
            types.isAstNode(astArgs[0].value[1])))
      ) {
        const entries = types.toJs<types.NilNode | types.VectorNode<types.VectorNode<types.AstNode>>>(
          astArgs[0] ?? types.createNilNode(),
        );
        const result = new Map(entries); // new
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.new"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.delete'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const result = Map.prototype.delete.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.delete"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.entries'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Map.prototype.entries.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.entries"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.forEach'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        types.isFunctionNode(astArgs[1]) && types.isAstNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const callback = types.toJs<types.AstNode>(astArgs[1]);
        const thisArg = types.toJs<types.FunctionNode>(astArgs[2] ?? types.createNilNode());
        const result = Map.prototype.forEach.call(context, callback, thisArg);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.forEach"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.get'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const result = Map.prototype.get.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.get"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.has'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const result = Map.prototype.has.call(context, key);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.has"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.keys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Map.prototype.keys.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.keys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.set'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) && types.isAstNode(astArgs[1]) &&
        types.isAstNode(astArgs[2])
      ) {

        const context = types.toJs<undefined>(astArgs[0]);
        const key = types.toJs<types.AstNode>(astArgs[1]);
        const value = types.toJs<types.AstNode>(astArgs[2]);
        const result = Map.prototype.set.call(context, key, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.values'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Map.prototype.values.call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.values"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype[Symbol.iterator]'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Map.prototype[Symbol.iterator].call(context);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype[Symbol.iterator]"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Map.prototype.size'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {

        const context = types.toJs<undefined>(astArgs[0]);
        const result = Map.prototype.size;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Map.prototype.size"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
*/
