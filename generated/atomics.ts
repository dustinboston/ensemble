import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Atomics.add'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.add(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.add"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.and'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.and(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.and"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.compareExchange'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 4) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2]) && types.isNumberNode(astArgs[3])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const expectedValue = types.toJs<types.NumberNode>(astArgs[2]);
        const replacementValue = types.toJs<types.NumberNode>(astArgs[3]);
        const result = Atomics.compareExchange(typedArray, index, expectedValue, replacementValue);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.compareExchange"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.exchange'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.exchange(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.exchange"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.isLockFree'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const size = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Atomics.isLockFree(size);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.load'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 2) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const result = Atomics.load(typedArray, index);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.load"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.notify'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 2 && astArgs.length <= 3) && types.isVectorNode(astArgs[0]) &&
        types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const count = types.toJs<types.NumberNode>(astArgs[2] ?? types.createNilNode());
        const result = Atomics.notify(typedArray, index, count);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.notify"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.or'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.or(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.or"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.store'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.store(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.store"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.sub'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.sub(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.sub"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.wait'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isVectorNode(astArgs[0]) &&
        types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2]) && types.isNumberNode(astArgs[3])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const timeout = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Atomics.wait(typedArray, index, value, timeout);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.wait"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.waitAsync'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length >= 3 && astArgs.length <= 4) && types.isVectorNode(astArgs[0]) &&
        types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) && types.isNumberNode(astArgs[2]) && types.isNumberNode(astArgs[3])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const timeout = types.toJs<types.NumberNode>(astArgs[3] ?? types.createNilNode());
        const result = Atomics.waitAsync(typedArray, index, value, timeout);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.waitAsync"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Atomics.xor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 3) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode) &&
        types.isNumberNode(astArgs[1]) &&
        types.isNumberNode(astArgs[2])
      ) {
        const typedArray = types.toJs<types.VectorNode<types.NumberNode>>(astArgs[0]);
        const index = types.toJs<types.NumberNode>(astArgs[1]);
        const value = types.toJs<types.NumberNode>(astArgs[2]);
        const result = Atomics.xor(typedArray, index, value);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Atomics.xor"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
