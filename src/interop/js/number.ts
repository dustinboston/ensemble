import * as types from '@/types.ts';

export const numberFunctions: Array<[string, types.Closure]> = [
  ['Number', newNumber],
  ['Number.isFinite', numberIsFinite],
  ['Number.isInteger', numberIsInteger],
  ['Number.isNaN', numberIsNaN],
  ['Number.isSafeInteger', numberIsSafeInteger],
  ['Number.parseFloat', numberParseFloat],
  ['Number.parseInt', numberParseInt],
  ['Number.prototype.toExponential', numberPrototypeToExponential],
  ['Number.prototype.toFixed', numberPrototypeToFixed],
  ['Number.prototype.toPrecision', numberPrototypeToPrecision],
  ['Number.prototype.toString', numberPrototypeToString],
  // Constants
  ['Number.EPSILON', numberEpsilon],
  ['Number.MAX_SAFE_INTEGER', numberMaxSafeInteger],
  ['Number.MAX_VALUE', numberMaxValue],
  ['Number.MIN_SAFE_INTEGER', numberMinSafeInteger],
  ['Number.MIN_VALUE', numberMinValue],
  ['Number.NaN', numberNaN],
  ['Number.NEGATIVE_INFINITY', numberNegativeInfinity],
  ['Number.POSITIVE_INFINITY', numberPositiveInfinity],
];

function newNumber(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number(value); // ctor
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number"');
}

function numberIsFinite(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number.isFinite(value);
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isFinite"');
}

function numberIsInteger(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
    const value = astArgs[0].value;
    const result = Number.isInteger(value);
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isInteger"');
}

function numberIsNaN(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
    const value = astArgs[0];
    const result = Number.isNaN(value);
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isNaN"');
}

function numberIsSafeInteger(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 1) && types.isAstNode(astArgs[0])) {
    const value = astArgs[0];
    const result = Number.isSafeInteger(value);
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.isSafeInteger"');
}

function numberParseFloat(...astArgs: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(astArgs.length, 1);
  types.assertStringNode(astArgs[0]);
  const stringValue = types.toJs<types.StringNode>(astArgs[0]);
  const result = Number.parseFloat(stringValue);
  return types.toAst(result);
}

function numberParseInt(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertStringNode(astArgs[0]);

  const string = astArgs[0].value;

  if (astArgs.length === 2) {
    types.assertNumberNode(astArgs[1]);
    const radix = astArgs[1].value;
    const result = Number.parseInt(string, radix);
    return types.createNumberNode(result);
  }

  const result = Number.parseInt(string);
  return types.createNumberNode(result);
}

function numberEpsilon(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.EPSILON;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.EPSILON"');
}

function numberMaxSafeInteger(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.MAX_SAFE_INTEGER;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MAX_SAFE_INTEGER"');
}

function numberMaxValue(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.MAX_VALUE;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MAX_VALUE"');
}

function numberMinSafeInteger(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.MIN_SAFE_INTEGER;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MIN_SAFE_INTEGER"');
}

function numberMinValue(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.MIN_VALUE;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.MIN_VALUE"');
}

function numberNaN(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.NaN;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.NaN"');
}

function numberNegativeInfinity(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.NEGATIVE_INFINITY;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.NEGATIVE_INFINITY"');
}

function numberPositiveInfinity(...astArgs: types.AstNode[]): types.AstNode {
  if ((astArgs.length === 0)) {
    const result = Number.POSITIVE_INFINITY;
    return types.toAst(result);
  }
  throw new TypeError('Invalid arguments to "Number.POSITIVE_INFINITY"');
}

function numberPrototypeToExponential(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    types.assertNumberNode(astArgs[1]);
    const digits = astArgs[1].value;
    const result = astArgs[0].value.toExponential(digits);
    return types.createStringNode(result);
  }
  const result = astArgs[0].value.toExponential();
  return types.createStringNode(result);
}

function numberPrototypeToFixed(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    types.assertNumberNode(astArgs[1]);
    const digits = astArgs[1].value;
    const result = astArgs[0].value.toFixed(digits);
    return types.createStringNode(result);
  }
  const result = astArgs[0].value.toFixed();
  return types.createStringNode(result);
}

function numberPrototypeToPrecision(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    types.assertNumberNode(astArgs[1]);
    const digits = astArgs[1].value;
    const result = astArgs[0].value.toPrecision(digits);
    return types.createStringNode(result);
  }
  const result = astArgs[0].value.toPrecision();
  return types.createStringNode(result);
}

function numberPrototypeToString(...astArgs: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(astArgs.length, 1, 2);
  types.assertNumberNode(astArgs[0]);
  if (astArgs.length === 2) {
    types.assertNumberNode(astArgs[1]);
    const radix = astArgs[1].value;
    const result = astArgs[0].value.toString(radix);
    return types.createStringNode(result);
  }
  const result = astArgs[0].value.toString();
  return types.createStringNode(result);
}
