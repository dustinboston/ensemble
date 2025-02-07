// deno-lint-ignore-file no-explicit-any
import { assertEquals, assertThrows, test } from '../../../../tests/test_runner';
import * as types from '../../types';
import * as array from './array';

// MARK: toArray
// --------------------------------------------------------------------------------------------------------------------

test('toArray should create a vector from multiple arguments', () => {
  const num1 = types.createNumberNode(1);
  const num2 = types.createNumberNode(2);
  const num3 = types.createNumberNode(3);

  const result = array.toArray(num1, num2, num3);

  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value, [num1, num2, num3]);
});

test('toArray should create a vector of specified length filled with nils when given only a number', () => {
  const length = types.createNumberNode(3);
  const result = array.toArray(length);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 3);
  assertEquals(result.value.every(types.isNilNode), true);
});

test('toArray should throw an error if no arguments are provided', () => {
  assertThrows(() => array.toArray());
});

test('toArray should create a vector from a single non-number argument', () => {
  const str = types.createStringNode('hello');
  const result = array.toArray(str);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value, [str]);
});

// MARK: arrayFrom
// --------------------------------------------------------------------------------------------------------------------

test('arrayFrom - one argument', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayFrom(vec);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 2);
  assertEquals(result.value[0].value, 1);
  assertEquals(result.value[1].value, 2);
});

test('arrayFrom - two arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((x: types.AstNode) => types.createNumberNode(x.value * 2));
  const result = array.arrayFrom(vec, fn);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 2);
  assertEquals(result.value[0].value, 2);
  assertEquals(result.value[1].value, 4);
});

test('arrayFrom - three arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((x: types.AstNode) => types.createNumberNode(x.value * 2));
  const thisArg = types.createNumberNode(5);
  const result = array.arrayFrom(vec, fn, thisArg);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 2);
  assertEquals(result.value[0].value, 2);
  assertEquals(result.value[1].value, 4);
});

test('arrayFrom - too few arguments', () => {
  assertThrows(() => array.arrayFrom());
});

test('arrayFrom - too many arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((x: types.AstNode) => types.createNumberNode(x.value * 2));
  const thisArg = types.createNumberNode(5);
  const extraArg = types.createNumberNode(10);
  assertThrows(() => array.arrayFrom(vec, fn, thisArg, extraArg));
});

test('arrayFrom - first argument not a vector', () => {
  const notAVector = types.createNumberNode(1);
  assertThrows(() => array.arrayFrom(notAVector));
});

test('arrayFrom - second argument not a function', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const notAFunction = types.createNumberNode(5);
  assertThrows(() => array.arrayFrom(vec, notAFunction));
});

// MARK: at
// --------------------------------------------------------------------------------------------------------------------

test('at - valid index', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const index = types.createNumberNode(0);
  const result = array.arrayAt(vec, index);
  assertEquals(result, types.createNumberNode(1));
});

test('at - negative index', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const index = types.createNumberNode(-1);
  const result = array.arrayAt(vec, index);
  assertEquals(result, types.createNumberNode(2));
});

test('at - out of range index', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const index = types.createNumberNode(2);
  const result = array.arrayAt(vec, index);
  assertEquals(types.isNilNode(result), true);
});

test('at - incorrect argument count', () => {
  assertThrows(() => array.arrayAt());
  assertThrows(() => array.arrayAt(types.createVectorNode([])));
  assertThrows(() => array.arrayAt(types.createVectorNode([]), types.createNumberNode(0), types.createNumberNode(1)));
});

test('at - first argument not a vector', () => {
  const notAVector = types.createNumberNode(1);
  const index = types.createNumberNode(0);

  assertThrows(() => array.arrayAt(notAVector, index));
});

test('at - second argument not a number', () => {
  const vec = types.createVectorNode([]);
  const notANumber = types.createStringNode('hello');

  assertThrows(() => array.arrayAt(vec, notANumber));
});

// MARK: isArray
// --------------------------------------------------------------------------------------------------------------------

test('isArray - is a vector', () => {
  const vec = types.createVectorNode([]);
  const result = array.arrayIsArray(vec);
  assertEquals(result, types.createBooleanNode(true));
});

test('isArray - is not a vector', () => {
  const notAVector = types.createNumberNode(1);
  const result = array.arrayIsArray(notAVector);
  assertEquals(result, types.createBooleanNode(false));
});

test('isArray - incorrect argument count', () => {
  assertThrows(() => array.arrayIsArray());
  assertThrows(() => array.arrayIsArray(types.createVectorNode([]), types.createNumberNode(1)));
});

// MARK: concat
// --------------------------------------------------------------------------------------------------------------------

test('concat - one vector', () => {
  const vec1 = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayConcat(vec1);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 2);
  assertEquals(result.value[0].value, 1);
  assertEquals(result.value[1].value, 2);
});

test('concat - multiple vectors', () => {
  const vec1 = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const vec2 = types.createVectorNode([types.createNumberNode(3), types.createNumberNode(4)]);
  const result = array.arrayConcat(vec1, vec2);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 4);
  assertEquals(result.value[0].value, 1);
  assertEquals(result.value[1].value, 2);
  assertEquals(result.value[2].value, 3);
  assertEquals(result.value[3].value, 4);
});

test('concat - no arguments', () => {
  assertThrows(() => array.arrayConcat());
});

test('concat - non-vector argument', () => {
  const notAVector = types.createNumberNode(1);
  assertThrows(() => array.arrayConcat(notAVector));
});

test('concat - mixed arguments', () => {
  const vec1 = types.createVectorNode([types.createNumberNode(1)]);
  const notAVector = types.createNumberNode(2);
  assertThrows(() => array.arrayConcat(vec1, notAVector));
});

// MARK: copyWithin
// --------------------------------------------------------------------------------------------------------------------

test('copyWithin - two arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2), types.createNumberNode(3)]);
  const target = types.createNumberNode(0);
  const start = types.createNumberNode(1);
  const result = array.arrayCopyWithin(vec, target, start);
  assertEquals(result.value.map((n: { value: any }) => n.value), [2, 3, 3]);
});

test('copyWithin - three arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2), types.createNumberNode(3)]);
  const target = types.createNumberNode(0);
  const start = types.createNumberNode(1);
  const end = types.createNumberNode(2);
  const result = array.arrayCopyWithin(vec, target, start, end);
  assertEquals(result.value.map((n: { value: any }) => n.value), [2, 2, 3]);
});

test('copyWithin - invalid number of arguments', () => {
  assertThrows(() => array.arrayCopyWithin());
  assertThrows(() => array.arrayCopyWithin(types.createVectorNode([])));
  assertThrows(() => array.arrayCopyWithin(types.createVectorNode([]), types.createNumberNode(0)));
  const vec = types.createVectorNode([types.createNumberNode(1)]);
  const target = types.createNumberNode(0);
  const start = types.createNumberNode(0);
  const end = types.createNumberNode(0);
  const extra = types.createNumberNode(0);
  assertThrows(() => array.arrayCopyWithin(vec, target, start, end, extra));
});

test('copyWithin - invalid argument types', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  const str = types.createStringNode('');

  assertThrows(() => array.arrayCopyWithin(str, num, num));
  assertThrows(() => array.arrayCopyWithin(vec, str, num));
  assertThrows(() => array.arrayCopyWithin(vec, num, str));
});

// MARK: entries
// --------------------------------------------------------------------------------------------------------------------

test('entries - empty vector', () => {
  const vec = types.createVectorNode([]);
  const result = array.arrayEntries(vec);
  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value, []);
});

test('entries - non-empty vector', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createStringNode('a')]);
  const result = array.arrayEntries(vec);

  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 2);

  assertEquals(types.isVectorNode(result.value[0]), true);
  assertEquals(result.value[0].value[0].value, 0);
  assertEquals(result.value[0].value[1].value, 1);

  assertEquals(types.isVectorNode(result.value[1]), true);
  assertEquals(result.value[1].value[0].value, 1);
  assertEquals(result.value[1].value[1].value, 'a');
});

test('entries - incorrect argument count', () => {
  assertThrows(() => array.arrayEntries());
  assertThrows(() => array.arrayEntries(types.createVectorNode([]), types.createNumberNode(1)));
});

test('entries - invalid argument type', () => {
  assertThrows(() => array.arrayEntries(types.createNumberNode(1)));
});

// MARK: every
// --------------------------------------------------------------------------------------------------------------------

test('every - all true', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(true));
  const result = array.arrayEvery(vec, fn);
  assertEquals(result, types.createBooleanNode(true));
});

test('every - some false', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((_index: types.AstNode, v: types.AstNode, _vector: types.AstNode) =>
    types.createBooleanNode(v.value !== 2)
  );
  const result = array.arrayEvery(vec, fn);
  assertEquals(result, types.createBooleanNode(false));
});

test('every - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  const str = types.createStringNode('');

  assertThrows(() => array.arrayEvery());
  assertThrows(() => array.arrayEvery(vec));
  assertThrows(() => array.arrayEvery(num, num));
  assertThrows(() => array.arrayEvery(vec, num));
  assertThrows(() => array.arrayEvery(vec, str));
  assertThrows(() => array.arrayEvery(vec, undefined as unknown as types.AstNode, num));
});

// MARK: fill
// --------------------------------------------------------------------------------------------------------------------

test('fill - two arguments', () => {
  const vector = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const value = types.createNumberNode(0);
  const result = array.arrayFill(vector, value);

  assertEquals(result.value.length, 2);
  assertEquals(result.value[0].value, 0);
  assertEquals(result.value[1].value, 0);
});

test('fill - three arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2), types.createNumberNode(3)]);
  const value = types.createNumberNode(0);
  const start = types.createNumberNode(1);
  const result = array.arrayFill(vec, value, start);

  assertEquals(result.value.length, 3);
  assertEquals(result.value[0].value, 1);
  assertEquals(result.value[1].value, 0);
  assertEquals(result.value[2].value, 0);
});

test('fill - four arguments', () => {
  const vec = types.createVectorNode([
    types.createNumberNode(1),
    types.createNumberNode(2),
    types.createNumberNode(3),
    types.createNumberNode(4),
  ]);
  const value = types.createNumberNode(0);
  const start = types.createNumberNode(2);
  const end = types.createNumberNode(4);
  const result = array.arrayFill(vec, value, start, end);

  assertEquals(result.value.length, 4);
  assertEquals(result.value[0].value, 1);
  assertEquals(result.value[1].value, 2);
  assertEquals(result.value[2].value, 0);
  assertEquals(result.value[3].value, 0);
});

test('fill - invalid number of arguments', () => {
  assertThrows(() => array.arrayFill());
  assertThrows(() => array.arrayFill(types.createVectorNode([])));
  const vec = types.createVectorNode([]);
  const val = types.createNumberNode(1);

  assertThrows(() => array.arrayFill(vec, val, val, val, val));
});

test('fill - invalid argument types', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  const str = types.createStringNode('');
  assertThrows(() => array.arrayFill(str, num));
  assertThrows(() => array.arrayFill(vec, num, str));
  assertThrows(() => array.arrayFill(vec, num, num, str));
});

// MARK: filter
// --------------------------------------------------------------------------------------------------------------------

test('filter - some match', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((item: types.AstNode) => types.createBooleanNode(item.value > 1));
  const result = array.arrayFilter(fn, vec);

  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 1);
  assertEquals(result.value[0].value, 2);
});

test('filter - none match', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(false));
  const result = array.arrayFilter(fn, vec);

  assertEquals(types.isVectorNode(result), true);
  assertEquals(result.value.length, 0);
});

test('filter - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayFilter());
  assertThrows(() => array.arrayFilter(num));
  assertThrows(() => array.arrayFilter(num, vec));
});

// MARK: find
// --------------------------------------------------------------------------------------------------------------------

test('find - element found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((v: types.AstNode) => types.createBooleanNode(v.value === 2));
  const result = array.arrayFind(vec, fn);
  assertEquals(result, types.createNumberNode(2));
});

test('find - element not found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(false));
  const result = array.arrayFind(vec, fn);
  assertEquals(types.isNilNode(result), true);
});

test('find - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayFind());
  assertThrows(() => array.arrayFind(vec));
  assertThrows(() => array.arrayFind(num, num));
  assertThrows(() => array.arrayFind(vec, num));
});

// MARK: findIndex
// --------------------------------------------------------------------------------------------------------------------

test('findIndex - element found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((v: types.AstNode) => types.createBooleanNode(v.value === 2));
  const result = array.arrayFindIndex(vec, fn);
  assertEquals(result, types.createNumberNode(1));
});

test('findIndex - element not found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(false));
  const result = array.arrayFindIndex(vec, fn);
  assertEquals(result, types.createNumberNode(-1));
});

test('findIndex - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayFindIndex());
  assertThrows(() => array.arrayFindIndex(vec));
  assertThrows(() => array.arrayFindIndex(num, num));
  assertThrows(() => array.arrayFindIndex(vec, num));
});

// MARK: findLast
// --------------------------------------------------------------------------------------------------------------------

test('findLast - element found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((v: types.AstNode) => types.createBooleanNode(v.value === 2));
  const result = array.arrayFindLast(vec, fn);
  assertEquals(result, types.createNumberNode(2));
});

test('findLast - element not found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(false));
  const result = array.arrayFindLast(vec, fn);
  assertEquals(types.isNilNode(result), true);
});

test('findLast - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayFindLast());
  assertThrows(() => array.arrayFindLast(vec));
  assertThrows(() => array.arrayFindLast(num, num));
  assertThrows(() => array.arrayFindLast(vec, num));
});

// MARK: findLastIndex
// --------------------------------------------------------------------------------------------------------------------

test('findLastIndex - element found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((v: types.AstNode) => types.createBooleanNode(v.value === 2));
  const result = array.arrayFindLastIndex(vec, fn);
  assertEquals(result, types.createNumberNode(1));
});

test('findLastIndex - element not found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(false));
  const result = array.arrayFindLastIndex(vec, fn);
  assertEquals(result, types.createNumberNode(-1));
});

test('findLastIndex - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayFindLastIndex());
  assertThrows(() => array.arrayFindLastIndex(vec));
  assertThrows(() => array.arrayFindLastIndex(num, num));
  assertThrows(() => array.arrayFindLastIndex(vec, num));
});

// MARK: flat
// --------------------------------------------------------------------------------------------------------------------

test('arrayFlat - basic functionality', () => {
  const vec = types.createVectorNode([
    types.createNumberNode(1),
    types.createVectorNode([types.createNumberNode(2), types.createNumberNode(3)]),
  ]);
  const result = array.arrayFlat(vec);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2, 3]);
});

test('arrayFlat - deeply nested vectors', () => {
  const vec = types.createVectorNode([
    types.createNumberNode(1),
    types.createVectorNode([
      types.createNumberNode(2),
      types.createVectorNode([types.createNumberNode(3), types.createNumberNode(4)]),
    ]),
  ]);
  const result = array.arrayFlat(vec);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2, 3, 4]);
});

test('arrayFlat - empty vector', () => {
  const vec = types.createVectorNode([]);
  const result = array.arrayFlat(vec);
  assertEquals(result.value, []);
});

test('arrayFlat - vector with non-nested elements', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayFlat(vec);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2]);
});

test('arrayFlat - invalid arguments', () => {
  const num = types.createNumberNode(0);

  assertThrows(() => array.arrayFlat());
  assertThrows(() => array.arrayFlat(num));
});

// MARK: flatMap
// --------------------------------------------------------------------------------------------------------------------

test('arrayFlatMap - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((v: types.AstNode) => types.createVectorNode([v, v]));

  const result = array.arrayFlatMap(vec, fn);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 1, 2, 2]);
});

test('arrayFlatMap - nested result', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  // Callback returns a nested vector for each element
  const fn = types.createFunctionNode((v: types.AstNode) => types.createVectorNode([v, types.createVectorNode([v])]));

  const result = array.arrayFlatMap(vec, fn);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 1, 2, 2]);
});

test('arrayFlatMap - empty vector', () => {
  const vec = types.createVectorNode([]);
  const fn = types.createFunctionNode(() => types.createVectorNode([]));

  const result = array.arrayFlatMap(vec, fn);
  assertEquals(result.value, []);
});

test('arrayFlatMap - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);

  assertThrows(() => array.arrayFlatMap());
  assertThrows(() => array.arrayFlatMap(vec));
  assertThrows(() => array.arrayFlatMap(num, num));
  assertThrows(() => array.arrayFlatMap(vec, num));
});

// MARK: includes
// --------------------------------------------------------------------------------------------------------------------

test('includes - vector includes element', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const element = types.createNumberNode(2);
  const result = array.arrayIncludes(vec, element);
  assertEquals(result, types.createBooleanNode(true));
});

test('includes - vector does not include element', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const element = types.createNumberNode(3);
  const result = array.arrayIncludes(vec, element);

  assertEquals(result.value, false);
});

test('includes - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(1);
  const str = types.createStringNode('');

  assertThrows(() => array.arrayIncludes());
  assertThrows(() => array.arrayIncludes(vec));
  assertThrows(() => array.arrayIncludes(num, num));
  assertThrows(() => array.arrayIncludes(str, num));
});

// MARK: indexOf
// --------------------------------------------------------------------------------------------------------------------

test('indexOf - element found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const value = types.createNumberNode(2);

  const result = array.arrayIndexOf(vec, value);
  assertEquals(result, types.createNumberNode(1));
});

test('indexOf - element not found', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const value = types.createNumberNode(3);

  const result = array.arrayIndexOf(vec, value);
  assertEquals(result, types.createNumberNode(-1));
});

test('indexOf - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);
  const str = types.createStringNode('');

  assertThrows(() => array.arrayIndexOf());
  assertThrows(() => array.arrayIndexOf(vec));
  assertThrows(() => array.arrayIndexOf(str, num));
  assertThrows(() => array.arrayIndexOf(num, vec));
});

// MARK: join
// --------------------------------------------------------------------------------------------------------------------

test('join - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const separator = types.createStringNode(',');

  const result = array.arrayJoin(vec, separator);
  assertEquals(result, types.createStringNode('1,2'));
});

test('join - no arguments', () => {
  assertThrows(() => array.arrayJoin());
});

// MARK: keys
// --------------------------------------------------------------------------------------------------------------------

test('keys - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayKeys(vec);

  assertEquals(result.value.length, 2);
  assertEquals(result.value[0], types.createNumberNode(0));
  assertEquals(result.value[1], types.createNumberNode(1));
});

test('keys - invalid arguments', () => {
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayKeys());
  assertThrows(() => array.arrayKeys(num));
});

// MARK: arrayLast
// --------------------------------------------------------------------------------------------------------------------

test('arrayLast - retrieves last element', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayLast(vec);
  assertEquals(result, types.createNumberNode(2));
});

test('arrayLast - empty vector', () => {
  const vec = types.createVectorNode([]);
  const result = array.arrayLast(vec);
  assertEquals(types.isNilNode(result), true);
});

test('arrayLast - invalid arguments', () => {
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayLast());
  assertThrows(() => array.arrayLast(num));
});

// MARK: arrayMap
// --------------------------------------------------------------------------------------------------------------------

test('arrayMap - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((x: types.AstNode) => types.createNumberNode(x.value * 2));
  const result = array.arrayMap(vec, fn);

  assertEquals(result.value.length, 2);
  assertEquals(result.value[0], types.createNumberNode(2));
  assertEquals(result.value[1], types.createNumberNode(4));
});

test('arrayMap - with thisArg', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const thisArg = types.createNumberNode(5); // Not actually used in this example, but demonstrating usage
  const fn = types.createFunctionNode((_x: types.AstNode, _index: types.AstNode, _thisArg: types.AstNode) =>
    types.createNumberNode(2)
  );

  const result = array.arrayMap(vec, fn, thisArg);

  assertEquals(result.value.length, 2);
  assertEquals(result.value[0], types.createNumberNode(2));
  assertEquals(result.value[1], types.createNumberNode(2));
});

test('arrayMap - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);

  assertThrows(() => array.arrayMap());
  assertThrows(() => array.arrayMap(vec));
  assertThrows(() => array.arrayMap(num, num));
  assertThrows(() => array.arrayMap(vec, num));
});

// MARK: arrayPush
// --------------------------------------------------------------------------------------------------------------------

test('arrayPush - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1)]);
  const value = types.createNumberNode(2);
  const result = array.arrayPush(vec, value);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2]);
});

test('arrayPush - multiple values', () => {
  const vec = types.createVectorNode([types.createNumberNode(1)]);
  const val1 = types.createNumberNode(2);
  const val2 = types.createNumberNode(3);

  const result = array.arrayPush(vec, val1, val2);

  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2, 3]);
});

test('arrayPush - invalid arguments', () => {
  const num = types.createNumberNode(1);

  assertThrows(() => array.arrayPush());
  assertThrows(() => array.arrayPush(num, num));
});

// MARK: arrayLength
// --------------------------------------------------------------------------------------------------------------------

test('arrayLength - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayLength(vec);
  assertEquals(result, types.createNumberNode(2));
});

test('arrayLength - invalid arguments', () => {
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayLength());
  assertThrows(() => array.arrayLength(num));
});

// MARK: arrayReduce
// --------------------------------------------------------------------------------------------------------------------

test('arrayReduce - basic functionality', () => {
  const fn = types.createFunctionNode((acc: types.AstNode, x: types.AstNode) =>
    types.createNumberNode(acc.value + x.value)
  );
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const initialValue = types.createNumberNode(0);

  const result = array.arrayReduce(fn, vec, initialValue);
  assertEquals(result.value, 3);
});

test('arrayReduce - invalid arguments', () => {
  const fn = types.createFunctionNode((acc: types.AstNode, x: types.AstNode) =>
    types.createNumberNode(acc.value + x.value)
  );
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const num = types.createNumberNode(2);

  assertThrows(() => array.arrayReduce());
  assertThrows(() => array.arrayReduce(fn));
  assertThrows(() => array.arrayReduce(fn, vec));
  assertThrows(() => array.arrayReduce(num, vec, num));
  assertThrows(() => array.arrayReduce(fn, num, num));
});

// MARK: arrayToReversed
// --------------------------------------------------------------------------------------------------------------------

test('arrayToReversed - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayToReversed(vec);
  assertEquals(result.value.map((n: { value: any }) => n.value), [2, 1]);
});

test('arrayToReversed - invalid arguments', () => {
  const num = types.createNumberNode(0);
  assertThrows(() => array.arrayToReversed());
  assertThrows(() => array.arrayToReversed(num));
});

// MARK: arrayFirst
// --------------------------------------------------------------------------------------------------------------------

test('arrayFirst - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayFirst(vec);

  assertEquals(result, types.createNumberNode(1));
});

test('arrayFirst - empty vector', () => {
  const vec = types.createVectorNode([]);
  const result = array.arrayFirst(vec);
  assertEquals(types.isNilNode(result), true);
});

test('arrayFirst - invalid arguments', () => {
  const num = types.createNumberNode(1);

  assertThrows(() => array.arrayFirst());
  assertThrows(() => array.arrayFirst(num));
});

// MARK: arraySlice
// --------------------------------------------------------------------------------------------------------------------

test('arraySlice - one argument', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arraySlice(vec);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2]);
});

test('arraySlice - two arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const start = types.createNumberNode(1);

  const result = array.arraySlice(vec, start);
  assertEquals(result.value.map((n: { value: any }) => n.value), [2]);
});

test('arraySlice - three arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2), types.createNumberNode(3)]);
  const start = types.createNumberNode(1);
  const end = types.createNumberNode(2);

  const result = array.arraySlice(vec, start, end);
  assertEquals(result.value.map((n: { value: any }) => n.value), [2]);
});

test('arraySlice - invalid arguments', () => {
  const num = types.createNumberNode(1);
  const vec = types.createVectorNode([]);
  const str = types.createStringNode('');

  assertThrows(() => array.arraySlice());
  assertThrows(() => array.arraySlice(num));
  assertThrows(() => array.arraySlice(vec, str));
  assertThrows(() => array.arraySlice(vec, num, str));
});

// MARK: arraySome
// --------------------------------------------------------------------------------------------------------------------

test('arraySome - some true', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode((v: types.AstNode) => types.createBooleanNode(v.value === 2));
  const result = array.arraySome(vec, fn);
  assertEquals(result, types.createBooleanNode(true));
});

test('arraySome - all false', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const fn = types.createFunctionNode(() => types.createBooleanNode(false));

  const result = array.arraySome(vec, fn);
  assertEquals(result, types.createBooleanNode(false));
});

test('arraySome - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(1);

  assertThrows(() => array.arraySome());
  assertThrows(() => array.arraySome(vec));
  assertThrows(() => array.arraySome(num, num));
  assertThrows(() => array.arraySome(vec, num));
});

// MARK: arrayToSorted
// --------------------------------------------------------------------------------------------------------------------

test('arrayToSorted - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(2), types.createNumberNode(1)]);
  const fn = types.createFunctionNode((a: types.AstNode, b: types.AstNode) =>
    types.createNumberNode(a.value - b.value)
  );

  const result = array.arrayToSorted(vec, fn);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2]);
});

test('arrayToSorted - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(0);

  assertThrows(() => array.arrayToSorted());
  assertThrows(() => array.arrayToSorted(vec));
  assertThrows(() => array.arrayToSorted(num, num));
  assertThrows(() => array.arrayToSorted(vec, num));
});

// MARK: arrayToSpliced
// --------------------------------------------------------------------------------------------------------------------

test('arrayToSpliced - two arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const start = types.createNumberNode(1);
  const result = array.arrayToSpliced(vec, start);

  assertEquals(result.value.length, 1);
  assertEquals(result.value[0].value, 1);
});

test('arrayToSpliced - three arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const start = types.createNumberNode(1);
  const deleteCount = types.createNumberNode(1);

  const result = array.arrayToSpliced(vec, start, deleteCount);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1]);
});

test('arrayToSpliced - four arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const start = types.createNumberNode(1);
  const deleteCount = types.createNumberNode(1);
  const item = types.createNumberNode(3);

  const result = array.arrayToSpliced(vec, start, deleteCount, item);

  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 3]);
});

test('arrayToSpliced - invalid arguments', () => {
  const vec = types.createVectorNode([]);
  const num = types.createNumberNode(1);
  const str = types.createStringNode('');

  assertThrows(() => array.arrayToSpliced());
  assertThrows(() => array.arrayToSpliced(vec));
  assertThrows(() => array.arrayToSpliced(num, num));
  assertThrows(() => array.arrayToSpliced(vec, str));
});

// MARK: arrayUnshift
// --------------------------------------------------------------------------------------------------------------------

test('arrayUnshift - basic functionality', () => {
  const value = types.createNumberNode(0);
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayUnshift(value, vec);

  assertEquals(result.value.map((n) => n.value), [0, 1, 2]);
});

test('arrayUnshift - invalid arguments', () => {
  const num = types.createNumberNode(0);

  assertThrows(() => array.arrayUnshift());
  assertThrows(() => array.arrayUnshift(num));
  assertThrows(() => array.arrayUnshift(num, num));
});

// MARK: arrayValues
// --------------------------------------------------------------------------------------------------------------------

test('arrayValues - basic functionality', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = array.arrayValues(vec);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 2]);
});

test('arrayValues - invalid arguments', () => {
  const num = types.createNumberNode(0);

  assertThrows(() => array.arrayValues());
  assertThrows(() => array.arrayValues(num));
});

// MARK: arrayReplaceWith
// --------------------------------------------------------------------------------------------------------------------

test('arrayReplaceWith - replaces with specified value', () => {
  const vec = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2), types.createNumberNode(3)]);
  const index = types.createNumberNode(1);
  const value = types.createNumberNode(5);

  const result = array.arrayReplaceWith(vec, index, value);
  assertEquals(result.value.map((n: { value: any }) => n.value), [1, 5, 3]);
});

test('arrayReplaceWith - invalid arguments', () => {
  const vec = types.createVectorNode([types.createNumberNode(1)]);
  const num = types.createNumberNode(0);
  const str = types.createStringNode('');

  assertThrows(() => array.arrayReplaceWith());
  assertThrows(() => array.arrayReplaceWith(vec));
  assertThrows(() => array.arrayReplaceWith(vec, num));
  assertThrows(() => array.arrayReplaceWith(num, num, num));
  assertThrows(() => array.arrayReplaceWith(vec, str, num));
});
