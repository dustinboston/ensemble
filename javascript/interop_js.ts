// import { DefinitionType, javascriptDefinitions } from '../data/javascript_definitions.ts';

import * as globals from '../data/globals.ts';
import * as core from './core.ts';
import * as types from './types.ts';

/** Defines language features and builtins for JavaScript */
export const javascriptNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

/** Defines core JavaScript functionality, including operators. */
const javascriptCore: Array<[string, types.Closure]> = [
  // Operators
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

  // JavScript control flow
  ['switch', switchCase],

  // Type checking
  ['typeof', typeOf],
  ['instanceof', instanceOf],
  // Temporary functions
  // ['js-eval', jsEval],
  // ['includes', includes],
  // ['console.log', core.printUnescapedStringToScreen],
];

// MARK: LOAD FNS

// Add the core functions to the namespace
for (const [sym, fn] of javascriptCore) {
  javascriptNamespace.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
}

for (const api of globals.builtins) {
  javascriptNamespace.set(types.createSymbolNode(api), createInteropFunction(api));
}

// Add the JavaScript builtins to the namespace
// for (const [builtinName, builtinDefinition] of Object.entries(javascriptDefinitions)) {
//   const symbol = types.createSymbolNode(builtinName);
//   const fn = types.createFunctionNode(curryBinding(builtinName, builtinDefinition.type));
//   javascriptNamespace.set(symbol, fn);

//   // Register '::' as a shorthand for '.prototype.', e.g. String::split
//   if (builtinName.includes('.prototype') && !builtinName.endsWith('.prototype')) {
//     const protoAlias = builtinName.replace('.prototype.', '::');
//     const protoSymbol = types.createSymbolNode(protoAlias);
//     javascriptNamespace.set(protoSymbol, fn);
//   }
// }

/**
 * Utility function to dynamically create interop functions.
 * @param path - The path to the JavaScript global object or property.
 * @returns A FunctionNode that wraps the JavaScript function or property.
 */
function createInteropFunction(path: string): types.FunctionNode {
  return types.createFunctionNode((...astArgs: types.AstNode[]): types.AstNode => {
    try {
      const abbreviatedPath = path.replace('::[', '.prototype').replace('::', '.prototype.');
      const parts = abbreviatedPath.split('.');
      // deno-lint-ignore no-explicit-any
      let current = globalThis as any;

      for (const part of parts) {
        current = current[part];
        if (current === undefined) {
          throw new ReferenceError(`Unknown global: '${path}'`);
        }
      }

      if (path.endsWith('.new')) {
        const constructorName = parts.slice(0, -1).join('.');
        const Constructor = parts.reduce((obj: any, key) => obj[key], globalThis);
        if (typeof Constructor === 'function') {
          const jsArgs = astArgs.map(types.toJs);
          const instance = new Constructor(...jsArgs);
          return types.toAst(instance);
        } else {
          throw new TypeError(`'${constructorName}' is not a constructor`);
        }
      } else if (typeof current === 'function') {
        const jsArgs = astArgs.map(types.toJs);
        const result = current(...jsArgs);
        return types.toAst(result);
      } else if (typeof current === 'object' && parts.length > 1) {
        const method = parts.pop();
        const instance = parts.reduce((obj, key) => (obj as any)[key], globalThis) as Record<string, unknown>;
        if (method && typeof instance[method] === 'function') {
          const jsArgs = astArgs.map(types.toJs);
          const result = instance[method].apply(instance, jsArgs);
          return types.toAst(result);
        }
      }
      return types.toAst(current);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return types.createErrorNode(types.createStringNode(error.message));
      }
      return types.createErrorNode(types.createStringNode(JSON.stringify(error)));
    }
  });
}

/**
 * `filter` filters elements in a vector based on a predicate function.
 * @todo Write tests
 * @param args - [types.Func, types.Vec].
 * @returns Types.Vector.
 * @example (filter isEven [1, 2, 3, 4]) ;=> [2, 4]
 */
// export function filter(...args: types.AstNode[]): types.AstNode {
//   types.assertArgumentCount(args.length, 2);
//   types.assertFunctionNode(args[0]);
//   types.assertVectorNode(args[1]);

//   const fn = args[0];
//   const vec = args[1];

//   const filtered = vec.value.filter((item) => Boolean(fn.value(item).value));
//   return types.createVectorNode(filtered);
// }

/**
 * `reduce` reduces elements in a vector based on a reducer function and an initial value.
 * @todo Write tests
 * @param args - [types.Func, types.Vec, initialValue].
 * @returns Types.AstNode.
 * @example (reduce (lambda (acc x) (+ acc x)) [1, 2, 3, 4] 0) ;=> 10
 */
export function reduce(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 3);
  types.assertFunctionNode(args[0]);
  types.assertVectorNode(args[1]);

  const fn = args[0];
  const vec = args[1];
  let accumulator = args[2];

  for (const item of vec.value) {
    accumulator = fn.value(accumulator, item);
  }

  return accumulator;
}

/**
 * `includes` checks if a vector includes a specified element.
 * @todo Write tests
 * @param args - [types.Vec, types.AstNode].
 * @returns Types.Boolean.
 * @example (includes [1, 2, 3] 2) ;=> true
 * @example (includes [1, 2, 3] 4) ;=> false
 */
export function includes(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[1]);
  types.assertAstNode(args[2]);

  if (types.isStringNode(args[0])) {
    types.assertStringNode(args[0]);
    types.assertStringNode(args[1]);

    const str = args[0].value;
    const substring = args[1].value;
    const result = str.includes(substring);
    return types.createBooleanNode(result);
  }

  if (types.isVectorNode(args[0])) {
    types.assertVectorNode(args[0]);

    const vec = args[0];
    const element = args[1];

    const result = vec.value.some((item) => types.isEqualTo(item, element).value);
    return types.createBooleanNode(result);
  }

  throw new TypeError('Invalid argument type');
}

/**
 * A JavasScript switch statement.
 * @param args [types.Ast,...types.List[], types.List]
 * args[0] - The expression to be matched
 * args[1...n-1] - Case clause matched against the expression (value statement)
 * 	each case clause should have a statement to match and a value to return
 * args[n] - Default clause (statement)
 */
export function switchCase(...args: types.AstNode[]): types.AstNode {
  types.assertMinimumArgumentCount(args.length, 2);
  const [expr, ...clauses] = args;

  const defaultClause = clauses.pop();
  types.assertDefined(defaultClause);
  types.assertFunctionNode(defaultClause);

  const length = clauses.length;
  for (let i = 0; i < length; i++) {
    const clause = clauses[i];
    types.assertListNode(clause);
    types.assertArgumentCount(clause.value.length, 2);
    types.assertFunctionNode(clause.value[1]);

    const result = types.isEqualTo(expr, clause.value[0]);
    if (result.value) {
      return clause.value[1].value();
    }
  }

  return defaultClause.value();
}

/**
 * Tests whether a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export function and(...args: types.AstNode[]): types.BooleanNode {
  for (const arg of args) {
    const isTruthy = types.isAstTruthy(arg);
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

/**
 * Wraps instanceof
 * @returns types.BooleanNode
 */
export function instanceOf(...args: types.AstNode[]): types.BooleanNode {
  types.assertArgumentCount(args.length, 2);
  types.assertAstNode(args[0]); // object
  if (
    types.isStringNode(args[1]) === false ||
    types.isSymbolNode(args[1]) === false
  ) {
    throw new TypeError(
      `Instance type must be a string or symbol. Got "${String(args[1].value)}"`,
    );
  }
  types.assertStringNode(args[1]); // instance

  if (typeof args[1].value !== 'string') {
    throw new TypeError(
      `Instance type must be a string. Got "${String(args[1].value)}"`,
    );
  }

  const a = args[0].value;
  const b = args[1].value;
  let instance = undefined;

  if (
    b === 'AstNode' ||
    b === 'SymbolNode' ||
    b === 'ListNode' ||
    b === 'VectorNode' ||
    b === 'AtomNode' ||
    b === 'BooleanNode' ||
    b === 'MapNode' ||
    b === 'ErrorNode' ||
    b === 'KeywordNode' ||
    b === 'NilNode' ||
    b === 'NumberNode' ||
    b === 'StringNode' ||
    b === 'FunctionNode'
  ) {
    // deno-lint-ignore no-explicit-any
    instance = (types as any)[args[1].value];
  } else if (Object.hasOwn(globalThis, args[1].value)) {
    // deno-lint-ignore no-explicit-any
    instance = (globalThis as any)[args[1].value];
  } else {
    throw new TypeError(`Unknown instance: "${args[1].value}"`);
  }

  return types.createBooleanNode(a instanceof instance);
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

// MARK: MATH

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

/**
 * Dangerously evaluates a javascript expression with Function.
 * @param args - The expression to evaluate.
 * @returns Result of the evaluated expression or an Err.
 * @example (js-eval "console.log('give me a donut');")
 */
export function jsEval(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertStringNode(args[0]);
  try {
    // eslint-disable-next-line no-new-func
    const result: unknown = new Function(
      `'use strict'; return (${args[0].value})`,
    )();
    return types.toAst(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return types.createErrorNode(types.createStringNode(error.message));
    }

    return types.createErrorNode(types.createStringNode(JSON.stringify(error)));
  }
}

/**
 * `every` checks if a predicate function returns true for every element in a vector.
 * @todo Write tests
 * @param args - [types.Func, Vec].
 * @returns Types.Boolean.
 * @example (every isEven [2, 4, 6]) ;=> true
 * @example (every isEven [2, 3, 6]) ;=> false
 */
// export function every(...args: types.AstNode[]): types.AstNode {
//   const count = args.length;
//   types.assertArgumentCount(count, 2);
//   types.assertFunctionNode(args[0]);
//   types.assertVectorNode(args[1]);

//   const fn = args[0];
//   const vec = args[1];
//   const result = vec.value.every((item) => fn.value(item));
//   return types.createBooleanNode(result);
// }

/**
 * `some` checks if a predicate function returns true for at least one element in a vector.
 * @todo Write tests
 * @param args - [types.Func, Vec].
 * @returns Types.Boolean.
 * @example (some isEven [1, 3, 4]) ;=> true
 * @example (some isEven [1, 3, 5]) ;=> false
 */
// export function some(...args: types.AstNode[]): types.AstNode {
//   const count = args.length;
//   types.assertArgumentCount(count, 2);
//   types.assertFunctionNode(args[0]);
//   types.assertVectorNode(args[1]);

//   const fn = args[0];
//   const vec = args[1];
//   const result = vec.value.some((item) => fn.value(item));
//   return types.createBooleanNode(result);
// }

// export function curryBinding(builtinName: string, defintionType: DefinitionType): types.Closure {
//   switch (defintionType) {
//     case DefinitionType.InstanceMethod:
//       return handleInstanceMethod(builtinName);
//     case DefinitionType.StaticMethod:
//       return handleStaticMethod(builtinName);
//     case DefinitionType.InstanceProperty:
//     case DefinitionType.StaticProperty:
//       return handleProperty(builtinName);
//     case DefinitionType.Constructor:
//       return handleConstructor(builtinName);
//     default: {
//       return handleInvalid(defintionType);
//     }
//   }
// }

// function handleInvalid(defintionType: never): types.Closure {
//   return (..._astArgs: types.AstNode[]): types.AstNode => {
//     return types.createErrorNode(types.createStringNode(`Invalid definition type: '${DefinitionType[defintionType]}'`));
//   };
// }

// function handleConstructor(builtinName: string): types.Closure {
//   return (...astArgs: types.AstNode[]): types.AstNode => {
//     try {
//       const Ctor = getGlobalValue(trimNew(builtinName)) ?? ReferenceError;
//       const jsArgs = isConstructorFunction(Ctor) ? astArgs.map(types.toJs) : [`Unknown global: '${builtinName}'`];
//       const result = new Ctor(...jsArgs);
//       return types.toAst(result);
//     } catch (e) {
//       return handleError(e);
//     }
//   };
// }

// function handleProperty(builtinName: string): types.Closure {
//   return (..._astArgs: types.AstNode[]): types.AstNode => {
//     try {
//       const obj = getGlobalValue(builtinName) ?? new ReferenceError(`Unknown global: '${builtinName}'`);
//       return types.toAst(obj);
//     } catch (e) {
//       return handleError(e);
//     }
//   };
// }

// function handleStaticMethod(builtinName: string): types.Closure {
//   return (...astArgs: types.AstNode[]): types.AstNode => {
//     try {
//       const fn = getGlobalValue(builtinName) ?? (() => new ReferenceError(`Unknown global: '${builtinName}'`));
//       const jsArgs = astArgs.map(types.toJs);
//       const result = fn(...jsArgs);
//       return types.toAst(result);
//     } catch (e) {
//       return handleError(e);
//     }
//   };
// }

// function handleInstanceMethod(builtinName: string): types.Closure {
//   return (...astArgs: types.AstNode[]): types.AstNode => {
//     try {
//       const fn = getGlobalValue(builtinName) ?? (() => new ReferenceError(`Unknown global: '${builtinName}'`));
//       const jsArgs = astArgs.map(types.toJs);
//       const context = jsArgs.shift();
//       const result = fn.call(context, ...jsArgs);
//       return types.toAst(result);
//     } catch (e) {
//       return handleError(e);
//     }
//   };
// }

// function isConstructorFunction(Ctor: unknown): boolean {
//   return typeof Ctor === 'function' && Ctor.prototype !== undefined;
// }

// function handleError(e: string | Error | types.AstNode): types.FunctionNode {
//   let message = '';
//   if (typeof e === 'string') message = e;
//   else if (e instanceof Error) message = e.message;
//   else if (types.isAstNode(e)) message = printer.printString(e);
//   else message = String(e);

//   return types.createFunctionNode((..._astArgs: types.AstNode[]): types.AstNode => {
//     return types.createErrorNode(types.createStringNode(message));
//   });
// }

// // deno-lint-ignore no-explicit-any
// function getGlobalValue(path: string): any {
//   const parts = path.split('.');
//   // deno-lint-ignore no-explicit-any
//   let current: any = globalThis;

//   for (let i = 0; i < parts.length; i++) {
//     const part = parts[i];

//     // Check if the part is in square brackets
//     const match = part.match(/^\[(.+)\]$/);
//     if (match) {
//       const key = match[1];
//       current = current[Symbol.for(key)] || current[key];
//     } else {
//       current = current[part];
//     }

//     if (current === undefined) {
//       return undefined;
//     }
//   }

//   return current;
// }

/** Removes the '.new' suffix from a built-in name. */
export function trimNew(builtinName: string): string {
  return builtinName.endsWith('.new') ? builtinName.slice(0, -4) : builtinName;
}
