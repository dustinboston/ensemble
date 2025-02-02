import { assertEquals, assertThrows } from '@std/assert';
import * as bool from './interop/js/boolean.ts';
import * as types from './types.ts';

Deno.test('toBoolean - truthy values', () => {
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

Deno.test('toBoolean - falsy values', () => {
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

Deno.test('toBoolean - invalid arguments', () => {
  assertThrows(() => bool.toBoolean());
  assertThrows(() => bool.toBoolean(types.createNumberNode(1), types.createNumberNode(1)));
});
