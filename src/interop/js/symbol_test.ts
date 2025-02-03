import { assertEquals, assertThrows } from '@std/assert';
import { symbolConstructor, symbolFor, symbolKeyFor } from './interop/js/symbol.ts';
import * as types from './types.ts';

Deno.test('symbolConstructor - no description', () => {
  const result = symbolConstructor();
  assertEquals(types.isAtomNode(result), true);
  assertEquals(typeof result.value, 'symbol');
});

Deno.test('symbolConstructor - with description', () => {
  const description = types.createStringNode('test');
  const result = symbolConstructor(description);

  assertEquals(types.isAtomNode(result), true);
  assertEquals(typeof result.value, 'symbol');
  assertEquals(result.value.description, 'test');
});

Deno.test('symbolConstructor - invalid arguments', () => {
  assertThrows(() => symbolConstructor(types.createNumberNode(1)));
  assertThrows(() => symbolConstructor(types.createStringNode('test'), types.createStringNode('test')));
});

Deno.test('symbolFor - basic functionality', () => {
  const key = types.createStringNode('test');
  const result = symbolFor(key);
  assertEquals(types.isAtomNode(result), true);
  assertEquals(typeof result.value, 'symbol');
  assertEquals(Symbol.keyFor(result.value), 'test');
});

Deno.test('symbolFor - invalid arguments', () => {
  assertThrows(() => symbolFor());
  assertThrows(() => symbolFor(types.createNumberNode(1)));
  assertThrows(() => symbolFor(types.createStringNode('test'), types.createStringNode('test')));
});

Deno.test('symbolKeyFor - basic functionality', () => {
  const key = types.createStringNode('test');
  const sym = symbolFor(key);
  const result = symbolKeyFor(sym);

  assertEquals(types.isStringNode(result), true);
  assertEquals(result.value, 'test');
});

Deno.test('symbolKeyFor - global symbol', () => {
  const sym = types.createAtomNode(Symbol.for('test'));
  const result = symbolKeyFor(sym);
  assertEquals(result.value, 'test');
});

Deno.test('symbolKeyFor - non-global symbol', () => {
  const sym = types.createAtomNode(Symbol('test'));
  const result = symbolKeyFor(sym);
  assertEquals(types.isNilNode(result), true);
});

Deno.test('symbolKeyFor - invalid arguments', () => {
  assertThrows(() => symbolKeyFor());
  assertThrows(() => symbolKeyFor(types.createNumberNode(1)));
  assertThrows(() => symbolKeyFor(types.createStringNode('test')));
  assertThrows(() => symbolKeyFor(types.createStringNode('test'), types.createStringNode('test')));
});
