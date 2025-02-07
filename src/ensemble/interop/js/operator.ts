import * as core from '../../core';
import * as types from '../../types';

export const operators: Array<[string, types.Closure]> = [
  ['===', core.eq],
  ['!==', notEqualTo],
  ['??', nullishCoalesce],
  ['**', power],
  ['%', remainder],
  ['>>', rightShift],
  ['<<', leftShift],
  ['>>>', unsignedRightShift],
  ['/&', bitwiseAnd],
  ['/|', bitwiseOr],
  ['/^', bitwiseXor],
  ['/~', bitwiseNot],
  ['&&', and],
  ['||', or],
  ['!', not],
  ['++', increment],
  ['--', decrement],
  ['typeof', typeOf],
  ['instanceof', instanceOf],
];

/**
 * Tests whether a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export function and(...args: types.AstNode[]): types.BooleanNode {
  const useJavaScriptTruthiness = true;
  for (const arg of args) {
    const isTruthy = types.isAstTruthy(arg, useJavaScriptTruthiness);
    if (!isTruthy) {
      return types.createBooleanNode(false);
    }
  }

  return types.createBooleanNode(true);
}

/**
 * Tests whether any of a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export function or(...args: types.AstNode[]): types.BooleanNode {
  for (const arg of args) {
    const isTruthy = types.isAstTruthy(arg);
    if (isTruthy) {
      return types.createBooleanNode(true);
    }
  }

  return types.createBooleanNode(false);
}

/**
 * AKA modulo
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function remainder(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(((a.value % b.value) + b.value) % b.value);
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function bitwiseAnd(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value & b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function bitwiseOr(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value | b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function bitwiseXor(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value ^ b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a - The number.
 * @returns types.NumberNode The result of the bitwise NOT operation.
 * @throws TypeError If the argument is not a number.
 */
export function bitwiseNot(a: types.AstNode): types.NumberNode {
  if (types.isNumberNode(a)) {
    return types.createNumberNode(~a.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function leftShift(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value << b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function rightShift(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value >> b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export function unsignedRightShift(
  a: types.AstNode,
  b: types.AstNode,
): types.NumberNode {
  if (types.isNumberNode(a) && types.isNumberNode(b)) {
    return types.createNumberNode(a.value >>> b.value); // eslint-disable-line no-bitwise
  }
  throw new TypeError('not a number');
}

/**
 * @param a
 * @returns types.AstNode
 */
export function not(a: types.AstNode): types.AstNode {
  return types.createBooleanNode(!a.value);
}

/**
 * `!==` Determine if two nodes are not equal
 * @example (!== (8 2 3) (1 2 3)) ;=> true
 * @param args [types.Ast, types.Ast]
 * @returns types.Bool
 * @see types.isEqualTo()
 */
export function notEqualTo(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  const bool = types.isEqualTo(args[0], args[1]);
  return types.createBooleanNode(!bool.value);
}

/**
 * `++` Increment a numeric value by one
 *
 * @description
 * Postfix is the default. In this position the counter will be incremented, but
 * the value will remain the same. The affix can be set explicitly by passing
 * "prefix" or "postfix" as the second argument. In the "postfix" position, the
 * returned value will have the counter and the value incremented by one. The
 * result is returned as a vector with the new counter value as the first element,
 * and the value before the increment as the second element.
 *
 * @example Default postfix
 * ```
 * (++ 1) ;=>[2, 1]
 * ```
 *
 * @example Explicit postfix
 * ```
 * (++ 1 "postfix") ;=>[2, 1]
 * ```
 *
 * @example Explicit prefix
 * ```
 * (++ 1 "prefix") ;=>[2, 2]
 * ```
 */
export function increment(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 2);
  types.assertNumberNode(args[0]);

  let affix = 'postfix';
  if (args[1] !== undefined) {
    types.assertStringNode(args[1]);
    if (args[1].value !== 'prefix' && args[1].value !== 'postfix') {
      throw new TypeError(
        `Invalid affix ${String(args[1].value)}. The affix must be "prefix" or "postfix"`,
      );
    } else {
      affix = args[1].value;
    }
  }

  if (affix === 'postfix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value + 1),
      types.createNumberNode(args[0].value),
    ]);
  }

  // ++x returns [counter - 1, counter - 1]
  if (affix === 'prefix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value + 1),
      types.createNumberNode(args[0].value + 1),
    ]);
  }

  throw new Error('Unhandled error in decrement');
}

/**
 * `--` Decrement a numeric value by one
 *
 * @description
 * Postfix is the default. In this position the counter will be decremented, but
 * the value will remain the same. The affix can be set explicitly by passing
 * "prefix" or "postfix" as the second argument. In the "postfix" position, the
 * returned value will have the counter and the value decremented by one. The
 * result is returned as a vector with the new counter value as the first element,
 * and the value before the increment as the second element.
 *
 * @example Default postfix
 * ```
 * (-- 1)
 * ;=>[0, 1]
 * ```
 *
 * @example Explicit postfix
 * ```
 * (-- 1 "postfix")
 * ;=>[0, 1]
 * ```
 *
 * @example Explicit prefix
 * ```
 * (-- 1 "prefix")
 * ;=>[0, 0]
 * ```
 */
export function decrement(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 2);
  types.assertNumberNode(args[0]);

  let affix = 'postfix';
  if (args[1] !== undefined) {
    types.assertStringNode(args[1]);
    if (args[1].value !== 'prefix' && args[1].value !== 'postfix') {
      throw new TypeError(
        `Invalid affix ${String(args[1].value)}. The affix must be "prefix" or "postfix"`,
      );
    } else {
      affix = args[1].value;
    }
  }

  if (affix === 'postfix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value - 1),
      types.createNumberNode(args[0].value),
    ]);
  }

  if (affix === 'prefix') {
    return types.createVectorNode([
      types.createNumberNode(args[0].value - 1),
      types.createNumberNode(args[0].value - 1),
    ]);
  }

  throw new Error('Unhandled error in decrement');
}

/**
 * Wraps typeof
 * @param object AstNode
 * @param typeString Must be: undefined, object, boolean, number, string, function, symbol, bigint
 * @returns types.BooleanNode
 */
export function typeOf(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[0]); // object
  types.assertStringNode(args[1]); // typeString

  const obj = typeof args[0].value;
  if (
    obj !== 'bigint' &&
    obj !== 'boolean' &&
    obj !== 'function' &&
    obj !== 'number' &&
    obj !== 'object' &&
    obj !== 'string' &&
    obj !== 'symbol' &&
    obj !== 'undefined'
  ) {
    throw new Error(
      `Invalid type: "${
        args[1].value
      }". Type must be one of bigint, boolean, function, number, object, string, symbol, or undefined`,
    );
  }

  return types.createBooleanNode(obj === args[1].value);
}

// export function instanceOf(...args: types.AstNode[]): types.BooleanNode {
//   types.assertArgumentCount(args.length, 2);
//   types.assertAstNode(args[0]);
//   types.assertAtomNode(args[1]);

//   const value = args[0].value;
//   const instance = args[1].value;

//   return types.createBooleanNode(value instanceof instance);
// }

/**
 * Wraps instanceof
 * @returns types.BooleanNode
 */
export function instanceOf(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[0]);
  types.assertStringNode(args[1]); // instance type

  const value = args[0];
  const type = args[1].value;
  let instance = undefined;

  if (
    type === 'AstNode' ||
    type === 'AtomNode' ||
    type === 'BooleanNode' ||
    type === 'ErrorNode' ||
    type === 'FunctionNode' ||
    type === 'KeywordNode' ||
    type === 'ListNode' ||
    type === 'MapNode' ||
    type === 'NilNode' ||
    type === 'NumberNode' ||
    type === 'StringNode' ||
    type === 'SymbolNode' ||
    type === 'VectorNode'
  ) {
    // deno-lint-ignore no-explicit-any
    instance = (types as any)[args[1].value];
  } else if (Object.hasOwn(globalThis, args[1].value)) {
    // deno-lint-ignore no-explicit-any
    instance = (globalThis as any)[args[1].value];
  } else {
    throw new TypeError(`Unknown instance: "${args[1].value}"`);
  }

  return types.createBooleanNode(value instanceof instance);
}

/**
 * Implements the nullish coalesce operator (??)
 * @param a Object to check if a is null or undefined
 * @param b Result if a is null or undefined
 * @returns types.AstNode
 */
export function nullishCoalesce(
  a: types.AstNode,
  b: types.AstNode,
): types.AstNode {
  return a.value == null ? b : a;
}

/**
 * @param base
 * @param exponent
 * @returns types.NumberNode
 * @throws TypeError
 */
export function power(
  base: types.AstNode,
  exponent: types.AstNode,
): types.NumberNode {
  if (
    types.isNumberNode(base) && types.isNumberNode(exponent)
  ) {
    return types.createNumberNode(base.value ** exponent.value);
  }
  throw new TypeError('not a number');
}
