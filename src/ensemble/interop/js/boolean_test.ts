import { assertEquals, assertThrows, test } from '../../tests/test_runner.ts';
import * as types from '../../types.ts';
import * as bool from './boolean.ts';

test('toBoolean - truthy values', () => {
  const values = [
    types.createNumberNode(1),
    types.createStringNode('hello'),
    types.createVectorNode([types.createNumberNode(1)]), // Non-empty vector
    types.createListNode([types.createNumberNode(1)]),
    types.createMapNode(new Map([['a', types.createNumberNode(1)]])), // Non-empty map
  ];

  for (const val of values) {
    assertEquals(bool.toBoolean(val), types.createBooleanNode(true));
  }
});

test('toBoolean - falsy values', () => {
  const values = [
    types.createNumberNode(0),
    types.createStringNode(''),
    types.createNilNode(),
    types.createBooleanNode(false),
  ];
  for (const val of values) {
    assertEquals(bool.toBoolean(val), types.createBooleanNode(false));
  }
});

test('toBoolean - invalid arguments', () => {
  assertThrows(() => bool.toBoolean());
  assertThrows(() => bool.toBoolean(types.createNumberNode(1), types.createNumberNode(1)));
});
