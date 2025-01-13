import * as core from '../../core.ts';
import * as types from '../../types.ts';

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();
export const nsValues: Array<[string, types.Closure]> = [
  ['Array.from', arrayFrom],
  ['Array.isArray', core.isSequentialNode],
  ['Array.length', core.length],
  ['Array.of', arrayFrom],
  ['Array.prototype.at', core.nth],
  ['Array.prototype.concat', core.concat],
  ['Array.prototype.copyWithin', copyWithin],
  ['Array.prototype.entries', entries],
  ['Array.prototype.every', every],
  ['Array.prototype.fill', fill],
  ['Array.prototype.filter', filter],
  ['Array.prototype.find', find],
  ['Array.prototype.findIndex', findIndex],
  ['Array.prototype.findLast', findLast],
  ['Array.prototype.findLastIndex', findLastIndex],
  ['Array.prototype.flat', flat],
  ['Array.prototype.flatMap', flatMap],
  // No forEach to avoid side effects
  ['Array.prototype.includes', includes],
  ['Array.prototype.indexOf', indexOf],
  ['Array.prototype.join', join],
  ['Array.prototype.keys', keys],
  ['Array.prototype.map', core.applyToSequence],
  ['Array.prototype.pop', core.lastNodeInList],
  ['Array.prototype.push', core.conj],
  ['Array.prototype.reduce', reduce],
  ['Array.prototype.reduceRight', reduce], // TODO: Implement reduceRight
  ['Array.prototype.reverse', reverse],
  ['Array.prototype.shift', core.firstNodeInList],
  ['Array.prototype.slice', slice],
  ['Array.prototype.some', some],
  ['Array.prototype.sort', sort],
  ['Array.prototype.splice', splice],
  ['Array.prototype.toReversed', reverse],
  ['Array.prototype.toSorted', sort],
  ['Array.prototype.toSpliced', splice],
  ['Array.prototype.unshift', prepend],
  ['Array.prototype.values', values],
  ['Array.prototype.with', replaceWith],
  ['Array.toString', core.printEscapedString],
];

for (const [sym, fn] of nsValues) {
  ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));
}

/**
 * `from`
 * Converts a list, vector, or string into a vector of elements or characters.
 * Deviates from `Array.from` because passing a map with a length property will
 * not return an empty vector of length `n`.
 *
 * @todo Add test for map to vector conversion.
 * @param args - [types.List|types.Vec|types.Str|types.Nil].
 * @returns Types.Vector|types.Nil.
 * @example (seq (list 1 2 3)) ;=> [1 2 3]
 * @example (seq [1 2 3]) ;=> [1 2 3]
 * @example (seq "foo") ;=> ["f" "o" "o"]
 * @example (seq nil) ;=> nil
 * @example (seq ()) ;=> nil
 * @example (seq []) ;=> nil
 */
export function arrayFrom(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  const ast = args[0];

  if (types.isListNode(ast)) {
    if (ast.value.length > 0) {
      return types.createVectorNode([...ast.value]);
    }
  }

  if (types.isVectorNode(ast) && ast.value.length > 0) {
    return types.createVectorNode([...ast.value]);
  }

  if (types.isStringNode(ast) && ast.value.length > 0) {
    return types.createVectorNode(
      ast.value.split('').map((char) => types.createStringNode(char)),
    );
  }

  if (types.isMapNode(ast) && ast.value.size > 0) {
    const entries = Array.from<[string, types.AstNode]>(ast.value.entries()).map(([k, v]) =>
      types.createVectorNode([types.createStringNode(k), v])
    );
    return types.createVectorNode(entries);
  }

  // Return NilNode if input is empty or doesn't match other types
  return types.createNilNode();
}

export function copyWithin(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 4);
  types.assertVectorNode(args[0]);
  types.assertNumberNode(args[1]);
  types.assertNumberNode(args[2]);

  const vector = args[0].value;
  const target = args[1].value;
  const start = args[2].value;
  const end = types.isNumberNode(args[3]) ? args[3].value : undefined;

  const result = vector.copyWithin(target, start, end);
  return types.createVectorNode(result);
}

export function entries(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertVectorNode(args[0]);

  const result = args[0].value.map((valueNode, index) => {
    const indexNode = types.createNumberNode(index);
    return types.createVectorNode([indexNode, valueNode]);
  });

  return types.createVectorNode(result);
}

export function every(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.every((value, index, vector) => {
    const test = fn(types.createNumberNode(index), value, types.createVectorNode(vector));
    return test.value; // truthy or falsy
  });

  return types.createBooleanNode(result);
}

export function fill(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 2, 4);
  types.assertVectorNode(args[0]);
  types.assertAstNode(args[1]);

  let start = 0;
  if (args.length === 3) {
    types.assertNumberNode(args[2]);
    start = args[2].value;
  }

  let end = args[0].value.length - 1;
  if (args.length === 4) {
    types.assertNumberNode(args[3]);
    end = args[3].value;
  }

  const result = args[0].value.slice(0).fill(args[1], start, end);
  return types.createVectorNode(result);
}

/**
 * `filter` filters elements in a vector based on a predicate function.
 * @todo Write tests
 * @param args - [types.Func, types.Vec].
 * @returns Types.Vector.
 * @example (filter isEven [1, 2, 3, 4]) ;=> [2, 4]
 */
export function filter(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertFunctionNode(args[0]);
  types.assertVectorNode(args[1]);

  const fn = args[0];
  const vec = args[1];

  const filtered = vec.value.filter((item) => Boolean(fn.value(item).value));
  return types.createVectorNode(filtered);
}

export function find(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.find((value, index, vector) => {
    const test = fn(value, types.createNumberNode(index), types.createVectorNode(vector));
    return test.value;
  });

  return result ?? types.createNilNode();
}

export function findIndex(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.findIndex((value, index, vector) => {
    const test = fn(value, types.createNumberNode(index), types.createVectorNode(vector));
    return test.value;
  });

  return types.createNumberNode(result);
}

export function findLast(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.findLast((value, index, vector) => {
    const test = fn(value, types.createNumberNode(index), types.createVectorNode(vector));
    return test.value;
  });

  return result ?? types.createNilNode();
}

export function findLastIndex(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.findLastIndex((value, index, vector) => {
    const test = fn(value, types.createNumberNode(index), types.createVectorNode(vector));
    return test.value;
  });

  return types.createNumberNode(result);
}

export function flat(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertVectorNode(args[0]);

  const vector = args[0].value;
  const result = vector.flat();
  return types.createVectorNode(result);
}

export function flatMap(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.flatMap((value, index, vector) => {
    return fn(value, types.createNumberNode(index), types.createVectorNode(vector));
  });

  return types.createVectorNode(result);
}

// No for each to avoid side effects

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

export function indexOf(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertAstNode(args[1]);

  const vec = args[0];
  const element = args[1];

  const result = vec.value.indexOf(element);
  return types.createNumberNode(result);
}

export function join(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertStringNode(args[1]);

  const vec = args[0];
  const separator = args[1];

  const result = vec.value.join(separator.value);
  return types.createStringNode(result);
}

export function keys(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertVectorNode(args[0]);

  const vec = args[0];
  // Use map to avoid the keys iterator
  const result = vec.value.map((_, index) => types.createNumberNode(index));
  return types.createVectorNode(result);
}

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

export function reverse(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertVectorNode(args[0]);

  const vec = args[0];
  const result = vec.value.toReversed();
  return types.createVectorNode(result);
}

/**
 * `slice` returns a new list containing a portion of the first argument.
 * @description This function slices the first argument (expected to be a sequential type)
 * from the specified `start` index to the optional `end` index. If no `start` is provided, it defaults to 0.
 * If the argument passed does not have at least one item, an error will be thrown.
 * If the list is empty, an empty list will be returned.
 * @param args - A spread of `types.Ast[]` arguments
 * @param args.0 - The vector to slice.
 * @param args.1 - Optional `start` value, defaults to 0
 * @param args.2 - Optional `end`, defaults to the length of the list, can be negative
 * @returns A new list containing the sliced portion of the first argument.
 * @throws When there isn't at least one argument passed in.
 * ```mal
 * (slice (+ 2 3 4) 1 3) ;=> (3 4)
 * ```
 */
export function slice(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 1, 3);
  types.assertVectorNode(args[0]);

  let start = 0;
  if (args[1] !== undefined) {
    types.assertNumberNode(args[1]);
    start = args[1].value;
  }

  let end = args[0].value.length;
  if (args[2] !== undefined) {
    types.assertNumberNode(args[2]);
    end = args[2].value;
  }

  return types.createVectorNode(args[0].value.slice(start, end));
}

export function some(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.some((value, index, vector) => {
    const test = fn(value, types.createNumberNode(index), types.createVectorNode(vector));
    return test.value;
  });

  return types.createBooleanNode(result);
}

export function sort(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[0]);
  types.assertFunctionNode(args[1]);

  const vector = args[0].value;
  const fn = args[1].value;

  const result = vector.toSorted((a, b) => {
    const order = fn(a, b);
    types.assertNumberNode(order);
    return order.value;
  });

  return types.createVectorNode(result);
}

export function splice(...args: types.AstNode[]): types.AstNode {
  types.assertVariableArgumentCount(args.length, 2, 4);
  types.assertVectorNode(args[0]);
  types.assertNumberNode(args[1]);

  const vector = args[0].value;
  const start = args[1].value;
  const deleteCount = types.isNumberNode(args[2]) ? args[2].value : 0;

  const items = args.slice(3);
  const result = vector.toSpliced(start, deleteCount, ...items);
  return types.createVectorNode(result);
}

// Based on cons
export function prepend(...args: types.AstNode[]): types.ListNode {
  types.assertArgumentCount(args.length, 2);
  types.assertVectorNode(args[1]);

  const prepended = [args[0], ...args[1].value];
  return types.createVectorNode(prepended);
}

export function values(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 1);
  types.assertVectorNode(args[0]);

  const vec = args[0];
  // Use map to avoid the keys iterator
  const result = vec.value.map((value) => value);
  return types.createVectorNode(result);
}

export function replaceWith(...args: types.AstNode[]): types.AstNode {
  types.assertArgumentCount(args.length, 3);
  types.assertVectorNode(args[0]);
  types.assertNumberNode(args[1]);
  types.assertAstNode(args[2]);

  const vec = args[0];
  const index = args[1];
  const value = args[2];

  const result = vec.value.with(index.value, value);
  return types.createVectorNode(result);
}
