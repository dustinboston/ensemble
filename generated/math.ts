import * as types from '../src/types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

javascriptNamespace.set(
  types.createSymbolNode('Math.abs'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.abs(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.acos'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.acos(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.acosh'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.acosh(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.asin'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.asin(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.asinh'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.asinh(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.atan'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.atan(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.atan2'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isNumberNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        const y = types.toJs<types.NumberNode>(astArgs[0]);
        const x = types.toJs<types.NumberNode>(astArgs[1]);
        const result = Math.atan2(y, x);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.atan2"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.atanh'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.atanh(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.cbrt'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.cbrt(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.ceil'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.ceil(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.clz32'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.clz32(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.cos'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.cos(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.cosh'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.cosh(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.exp'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.exp(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.expm1'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.expm1(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.floor'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.floor(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.fround'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.fround(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.hypot'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        /* rest */
        const values = astArgs.slice(0).map((x) => types.toJs<types.VectorNode<types.NumberNode>>(x));
        const result = Math.hypot(...values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.hypot"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.imul'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isNumberNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        const a = types.toJs<types.NumberNode>(astArgs[0]);
        const b = types.toJs<types.NumberNode>(astArgs[1]);
        const result = Math.imul(a, b);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.imul"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.log'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.log(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.log10'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.log10(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.log1p'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.log1p(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.log2'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.log2(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.max'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        /* rest */
        const values = astArgs.slice(0).map((x) => types.toJs<types.VectorNode<types.NumberNode>>(x));
        const result = Math.max(...values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.max"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.min'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if (
        (astArgs.length === 1) && types.isVectorNode(astArgs[0]) && types.isTypedVector(astArgs[0], types.NumberNode)
      ) {
        /* rest */
        const values = astArgs.slice(0).map((x) => types.toJs<types.VectorNode<types.NumberNode>>(x));
        const result = Math.min(...values);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.min"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.pow'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 2) && types.isNumberNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
        const base = types.toJs<types.NumberNode>(astArgs[0]);
        const exponent = types.toJs<types.NumberNode>(astArgs[1]);
        const result = Math.pow(base, exponent);
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.pow"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.random'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.random();
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.random"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.round'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.round(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.sign'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.sign(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.sin'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.sin(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.sinh'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.sinh(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.sqrt'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.sqrt(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.tan'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.tan(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.tanh'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.tanh(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.trunc'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      types.assertArgumentCount(astArgs.length, 1);
      types.assertNumberNode(astArgs[0]);
      const x = types.toJs<types.NumberNode>(astArgs[0]);
      const result = Math.trunc(x);
      return types.toAst(result);
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.E'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.E;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.E"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.LN10'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.LN10;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.LN10"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.LN2'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.LN2;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.LN2"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.LOG10E'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.LOG10E;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.LOG10E"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.LOG2E'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.LOG2E;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.LOG2E"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.PI'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.PI;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.PI"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.SQRT1_2'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.SQRT1_2;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.SQRT1_2"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);

javascriptNamespace.set(
  types.createSymbolNode('Math.SQRT2'),
  types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      if ((astArgs.length === 0)) {
        const result = Math.SQRT2;
        return types.toAst(result);
      }
      return types.createErrorNode('Invalid arguments to "Math.SQRT2"');
    } catch (e) {
      return types.toErrorNode(e);
    }
  }),
);
