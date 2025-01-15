import * as types from '@/types.ts';

export const mathFunctions: Array<[string, types.Closure]> = [
  ['Math.abs', mathAbs],
  ['Math.acos', mathAcos],
  ['Math.acosh', mathAcosh],
  ['Math.asin', mathAsin],
  ['Math.asinh', mathAsinh],
  ['Math.atan', mathAtan],
  ['Math.atan2', mathAtan2],
  ['Math.atanh', mathAtanh],
  ['Math.cbrt', mathCbrt],
  ['Math.ceil', mathCeil],
  ['Math.clz32', mathClz32],
  ['Math.cos', mathCos],
  ['Math.cosh', mathCosh],
  ['Math.exp', mathExp],
  ['Math.expm1', mathExpm1],
  ['Math.floor', mathFloor],
  ['Math.fround', mathFround],
  ['Math.hypot', mathHypot],
  ['Math.imul', mathImul],
  ['Math.log', mathLog],
  ['Math.log10', mathLog10],
  ['Math.log1p', mathLog1p],
  ['Math.log2', mathLog2],
  ['Math.max', mathMax],
  ['Math.min', mathMin],
  ['Math.pow', mathPow],
  ['Math.random', mathRandom],
  ['Math.round', mathRound],
  ['Math.sign', mathSign],
  ['Math.sin', mathSin],
  ['Math.sinh', mathSinh],
  ['Math.sqrt', mathSqrt],
  ['Math.tan', mathTan],
  ['Math.tanh', mathTanh],
  ['Math.trunc', mathTrunc],
  ['Math.E', mathE],
  ['Math.LN10', mathLn10],
  ['Math.LN2', mathLn2],
  ['Math.LOG10E', mathLog10e],
  ['Math.LOG2E', mathLog23],
  ['Math.PI', mathPi],
  ['Math.SQRT1_2', mathSqrt12],
  ['Math.SQRT2', mathSqrt2],
];

function mathAbs(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.abs(x);
  return types.toAst(result);
}

function mathAcos(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.acos(x);
  return types.toAst(result);
}

function mathAcosh(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.acosh(x);
  return types.toAst(result);
}

function mathAsin(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.asin(x);
  return types.toAst(result);
}

function mathAsinh(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.asinh(x);
  return types.toAst(result);
}

function mathAtan(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.atan(x);
  return types.toAst(result);
}

function mathAtan2(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertNumberNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const y = astArgs[0].value;
  const x = astArgs[1].value;
  const result = Math.atan2(y, x);
  return types.toAst(result);
}

function mathAtanh(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.atanh(x);
  return types.toAst(result);
}

function mathCbrt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.cbrt(x);
  return types.toAst(result);
}

function mathCeil(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.ceil(x);
  return types.toAst(result);
}

function mathClz32(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.clz32(x);
  return types.toAst(result);
}

function mathCos(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.cos(x);
  return types.toAst(result);
}

function mathCosh(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.cosh(x);
  return types.toAst(result);
}

function mathExp(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.exp(x);
  return types.toAst(result);
}

function mathExpm1(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.expm1(x);
  return types.toAst(result);
}

function mathFloor(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.floor(x);
  return types.toAst(result);
}

function mathFround(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.fround(x);
  return types.toAst(result);
}

function mathHypot(...astArgs: types.AstNode[]): types.AstNode {
  types.assertSequentialValues<types.NumberNode>(astArgs, types.NumberNode);
  const values: number[] = astArgs.map(types.unwrapNumberNode);
  const result = Math.hypot(...values);
  return types.toAst(result);
}

function mathImul(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 2);
  types.assertNumberNode(astArgs[0]);
  types.assertNumberNode(astArgs[1]);

  const a = astArgs[0].value;
  const b = astArgs[1].value;

  const result = Math.imul(a, b);
  return types.toAst(result);
}

function mathLog(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log(x);
  return types.toAst(result);
}

function mathLog10(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log10(x);
  return types.toAst(result);
}

function mathLog1p(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log1p(x);
  return types.toAst(result);
}

function mathLog2(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.log2(x);
  return types.toAst(result);
}

function mathMax(...astArgs: types.AstNode[]): types.AstNode {
  types.assertSequentialValues<types.NumberNode>(astArgs, types.NumberNode);
  const values: number[] = astArgs.map(types.unwrapNumberNode);
  const result = Math.max(...values);
  return types.toAst(result);
}

function mathMin(...astArgs: types.AstNode[]): types.AstNode {
  types.assertSequentialValues<types.NumberNode>(astArgs, types.NumberNode);
  const values: number[] = astArgs.map(types.unwrapNumberNode);
  const result = Math.min(...values);
  return types.toAst(result);
}

function mathPow(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 2) && types.isNumberNode(astArgs[0]) && types.isNumberNode(astArgs[1])) {
    const base = astArgs[0].value;
    const exponent = astArgs[1].value;
    const result = Math.pow(base, exponent);
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.pow"');
}

function mathRandom(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.random();
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.random"');
}

function mathRound(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.round(x);
  return types.toAst(result);
}

function mathSign(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sign(x);
  return types.toAst(result);
}

function mathSin(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sin(x);
  return types.toAst(result);
}

function mathSinh(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sinh(x);
  return types.toAst(result);
}

function mathSqrt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.sqrt(x);
  return types.toAst(result);
}

function mathTan(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.tan(x);
  return types.toAst(result);
}

function mathTanh(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.tanh(x);
  return types.toAst(result);
}

function mathTrunc(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertNumberNode(astArgs[0]);
  const x = astArgs[0].value;
  const result = Math.trunc(x);
  return types.toAst(result);
}

function mathE(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.E;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.E"');
}

function mathLn10(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.LN10;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LN10"');
}

function mathLn2(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.LN2;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LN2"');
}

function mathLog10e(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.LOG10E;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LOG10E"');
}

function mathLog23(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.LOG2E;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.LOG2E"');
}

function mathPi(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.PI;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.PI"');
}

function mathSqrt12(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.SQRT1_2;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.SQRT1_2"');
}

function mathSqrt2(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Math.SQRT2;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Math.SQRT2"');
}
