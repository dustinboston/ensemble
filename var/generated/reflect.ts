import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Reflect.apply'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isFunctionNode(astArgs[0]) && types.isAstNode(astArgs[1]) &&
        types.isVectorNode(astArgs[2])
      ) {
        const target = types.toJs<types.FunctionNode>(astArgs[0]);
        const thisArgument = types.toJs<types.AstNode>(astArgs[1]);
        const argumentsList = types.toJs<types.VectorNode>(astArgs[2]);
        const result = Reflect.apply(target, thisArgument, argumentsList);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.apply"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.construct'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAtomNode(astArgs[0]) &&
        types.isVectorNode(astArgs[1]) && types.isAtomNode(astArgs[2])
      ) {
        const target = types.toJs<types.AtomNode>(astArgs[0]);
        const argumentsList = types.toJs<types.VectorNode>(astArgs[1]);
        const newTarget = types.toJs<types.AtomNode>(astArgs[2] ?? types.createNilNode());
        const result = Reflect.construct(target, argumentsList, newTarget);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.construct"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.defineProperty'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1])) &&
        types.isAstNode(astArgs[2])
      ) {
        const o = types.toJs<types.AstNode>(astArgs[0]);
        const property = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const descriptor = types.toJs<types.AstNode>(astArgs[2]);
        const result = Reflect.defineProperty(o, property, descriptor);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.defineProperty"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.deleteProperty'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const propertyKey = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const result = Reflect.deleteProperty(target, propertyKey);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.deleteProperty"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.get'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1])) &&
        types.isAstNode(astArgs[2])
      ) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const propertyKey = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const receiver = types.toJs<types.AstNode>(astArgs[2] ?? types.createNilNode());
        const result = Reflect.get(target, propertyKey, receiver);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.get"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.getOwnPropertyDescriptor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const propertyKey = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const result = Reflect.getOwnPropertyDescriptor(target, propertyKey);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.getOwnPropertyDescriptor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.getPrototypeOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const result = Reflect.getPrototypeOf(target);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.getPrototypeOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.has'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1]))
      ) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const propertyKey = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const result = Reflect.has(target, propertyKey);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.has"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.isExtensible'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const result = Reflect.isExtensible(target);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.isExtensible"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.ownKeys'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const result = Reflect.ownKeys(target);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.ownKeys"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.preventExtensions'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const result = Reflect.preventExtensions(target);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.preventExtensions"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.set'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isAstNode(astArgs[0]) &&
        (types.isNumberNode(astArgs[1]) || types.isSymbolNode(astArgs[1]) || types.isStringNode(astArgs[1])) &&
        types.isAstNode(astArgs[2]) &&
        types.isAstNode(astArgs[3])
      ) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const propertyKey = types.toJs<types.NumberNode | types.SymbolNode | types.StringNode>(astArgs[1]);
        const value = types.toJs<types.AstNode>(astArgs[2]);
        const receiver = types.toJs<types.AstNode>(astArgs[3] ?? types.createNilNode());
        const result = Reflect.set(target, propertyKey, value, receiver);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.set"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Reflect.setPrototypeOf'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isAstNode(astArgs[0]) &&
        (types.isNilNode(astArgs[1]) || types.isAstNode(astArgs[1]))
      ) {
        const target = types.toJs<types.AstNode>(astArgs[0]);
        const proto = types.toJs<types.AstNode>(astArgs[1]);
        const result = Reflect.setPrototypeOf(target, proto);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Reflect.setPrototypeOf"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
