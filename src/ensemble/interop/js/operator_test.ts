import { assertEquals, assertThrows, test } from '../../../../tests/test_runner';
import * as types from '../../types';
import * as operators from './operator';

// and
test('and', () => {
  assertEquals(
    operators.and(types.createBooleanNode(true), types.createBooleanNode(true)),
    types.createBooleanNode(true),
  );
  assertEquals(
    operators.and(types.createBooleanNode(true), types.createBooleanNode(false)),
    types.createBooleanNode(false),
  );
  assertEquals(operators.and(types.createNumberNode(1), types.createNumberNode(0)), types.createBooleanNode(false));
});

// bitwiseAnd
test('bitwiseAnd', () => {
  assertEquals(operators.bitwiseAnd(types.createNumberNode(5), types.createNumberNode(3)), types.createNumberNode(1));
  assertThrows(() => operators.bitwiseAnd(types.createStringNode('test'), types.createNumberNode(1)));
});

// bitwiseNot

test('bitwiseNot', () => {
  assertEquals(operators.bitwiseNot(types.createNumberNode(5)), types.createNumberNode(~5));
  assertThrows(() => operators.bitwiseNot(types.createStringNode('test')));
});

// bitwiseOr
test('bitwiseOr', () => {
  assertEquals(operators.bitwiseOr(types.createNumberNode(1), types.createNumberNode(2)), types.createNumberNode(3));
  assertThrows(() => operators.bitwiseOr(types.createStringNode('test'), types.createNumberNode(0)));
});

// bitwiseXor
test('bitwiseXor', () => {
  assertEquals(operators.bitwiseXor(types.createNumberNode(1), types.createNumberNode(3)), types.createNumberNode(2));
  assertThrows(() => operators.bitwiseXor(types.createStringNode('test'), types.createNumberNode(1)));
});

// decrement
test('decrement', () => {
  assertEquals(
    operators.decrement(types.createNumberNode(2)),
    types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]),
  );
  assertEquals(
    operators.decrement(types.createNumberNode(2), types.createStringNode('prefix')),
    types.createVectorNode([types.createNumberNode(1), types.createNumberNode(1)]),
  );
  assertThrows(() => operators.decrement(types.createNumberNode(1), types.createStringNode('asdf')));
});

// increment
test('increment', () => {
  assertEquals(
    operators.increment(types.createNumberNode(1)),
    types.createVectorNode([types.createNumberNode(2), types.createNumberNode(1)]),
  );
  assertEquals(
    operators.increment(types.createNumberNode(1), types.createStringNode('prefix')),
    types.createVectorNode([types.createNumberNode(2), types.createNumberNode(2)]),
  );
  assertThrows(() => operators.increment(types.createNumberNode(1), types.createStringNode('asdf')));
});

// instanceOf
test('instanceOf', () => {
  const num = types.createNumberNode(1);
  const str = types.createStringNode('');

  assertEquals(operators.instanceOf(num, types.createStringNode('NumberNode')), types.createBooleanNode(true));
  assertEquals(operators.instanceOf(str, types.createStringNode('StringNode')), types.createBooleanNode(true));
  assertEquals(operators.instanceOf(num, types.createStringNode('StringNode')), types.createBooleanNode(false));

  assertThrows(() => operators.instanceOf(num, types.createNumberNode(1)));
});

// leftShift
test('leftShift', () => {
  assertEquals(operators.leftShift(types.createNumberNode(1), types.createNumberNode(2)), types.createNumberNode(4));
  assertThrows(() => operators.leftShift(types.createStringNode(''), types.createNumberNode(1)));
});

// not
test('not', () => {
  assertEquals(operators.not(types.createBooleanNode(false)), types.createBooleanNode(true));
});

// notEqualTo
test('notEqualTo', () => {
  assertEquals(
    operators.notEqualTo(types.createNumberNode(1), types.createNumberNode(1)),
    types.createBooleanNode(false),
  );

  assertEquals(
    operators.notEqualTo(types.createNumberNode(1), types.createNumberNode(2)),
    types.createBooleanNode(true),
  );
});

// nullishCoalesce
test('nullishCoalescing', () => {
  assertEquals(operators.nullishCoalesce(types.createNilNode(), types.createNumberNode(5)), types.createNumberNode(5));
  assertEquals(
    operators.nullishCoalesce(types.createNumberNode(1), types.createNumberNode(5)),
    types.createNumberNode(1),
  );
});

// or
test('or', () => {
  assertEquals(
    operators.or(types.createBooleanNode(false), types.createBooleanNode(true)),
    types.createBooleanNode(true),
  );

  assertEquals(
    operators.or(types.createBooleanNode(false), types.createBooleanNode(false)),
    types.createBooleanNode(false),
  );
  assertEquals(operators.or(types.createNumberNode(0), types.createNumberNode(1)), types.createBooleanNode(true));
});

// power
test('power', () => {
  assertEquals(operators.power(types.createNumberNode(3), types.createNumberNode(2)), types.createNumberNode(9));
  assertThrows(() => operators.power(types.createStringNode(''), types.createNumberNode(1)));
});

// remainder
test('remainder', () => {
  assertEquals(operators.remainder(types.createNumberNode(5), types.createNumberNode(2)), types.createNumberNode(1));
  assertThrows(() => operators.remainder(types.createStringNode(''), types.createNumberNode(1)));
});

// rightShift
test('rightShift', () => {
  assertEquals(operators.rightShift(types.createNumberNode(5), types.createNumberNode(1)), types.createNumberNode(2));
  assertThrows(() => operators.rightShift(types.createStringNode(''), types.createNumberNode(1)));
});

// typeOf

test('typeOf', () => {
  const num = types.createNumberNode(1);

  assertEquals(operators.typeOf(num, types.createStringNode('number')), types.createBooleanNode(true));
  assertEquals(operators.typeOf(num, types.createStringNode('string')), types.createBooleanNode(false));
});

// unsignedRightShift
test('unsignedRightShift', () => {
  assertEquals(
    operators.unsignedRightShift(types.createNumberNode(5), types.createNumberNode(1)),
    types.createNumberNode(2),
  );
  assertThrows(() => operators.unsignedRightShift(types.createStringNode(''), types.createNumberNode(1)));
});
