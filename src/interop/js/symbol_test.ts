import { assertEquals, assertThrows, test } from '../../../tests/test_runner.ts';
import * as types from '../../types.ts';
import { symbolConstructor, symbolFor, symbolKeyFor } from './symbol.ts';

test('symbolConstructor - no description', () => {
  const result = symbolConstructor();
  assertEquals(types.isAtomNode(result), true);
  assertEquals(typeof result.value, 'symbol');
});

test('symbolConstructor - with description', () => {
  const description = types.createStringNode('test');
  const result = symbolConstructor(description);

  assertEquals(types.isAtomNode(result), true);
  assertEquals(typeof result.value, 'symbol');
  assertEquals(result.value.description, 'test');
});

test('symbolConstructor - invalid arguments', () => {
  assertThrows(() => symbolConstructor(types.createNumberNode(1)));
  assertThrows(() => symbolConstructor(types.createStringNode('test'), types.createStringNode('test')));
});

test('symbolFor - basic functionality', () => {
  const key = types.createStringNode('test');
  const result = symbolFor(key);
  assertEquals(types.isAtomNode(result), true);
  assertEquals(typeof result.value, 'symbol');
  assertEquals(Symbol.keyFor(result.value), 'test');
});

test('symbolFor - invalid arguments', () => {
  assertThrows(() => symbolFor());
  assertThrows(() => symbolFor(types.createNumberNode(1)));
  assertThrows(() => symbolFor(types.createStringNode('test'), types.createStringNode('test')));
});

test('symbolKeyFor - basic functionality', () => {
  const key = types.createStringNode('test');
  const sym = symbolFor(key);
  const result = symbolKeyFor(sym);

  assertEquals(types.isStringNode(result), true);
  assertEquals(result.value, 'test');
});

test('symbolKeyFor - global symbol', () => {
  const sym = types.createAtomNode(Symbol.for('test'));
  const result = symbolKeyFor(sym);
  assertEquals(result.value, 'test');
});

test('symbolKeyFor - non-global symbol', () => {
  const sym = types.createAtomNode(Symbol('test'));
  const result = symbolKeyFor(sym);
  assertEquals(types.isNilNode(result), true);
});

test('symbolKeyFor - invalid arguments', () => {
  assertThrows(() => symbolKeyFor());
  assertThrows(() => symbolKeyFor(types.createNumberNode(1)));
  assertThrows(() => symbolKeyFor(types.createStringNode('test')));
  assertThrows(() => symbolKeyFor(types.createStringNode('test'), types.createStringNode('test')));
});
