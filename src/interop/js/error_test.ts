import { assertEquals, assertThrows } from '@std/assert';
import * as types from '../../types.ts';
import { getCause, getMessage, getName, newError } from './error.ts';

Deno.test('newError - one argument', () => {
  const message = types.createStringNode('test error');
  const result = newError(message);

  types.assertErrorNode(result);

  assertEquals(result.value.value, 'test error');
  assertEquals(result.name.value, 'Error'); // Default name
  assertEquals(types.isNilNode(getCause(result)), true); // No cause
});

Deno.test('newError - two arguments', () => {
  const message = types.createStringNode('test error');
  const name = types.createStringNode('TypeError');
  const result = newError(message, name);

  types.assertErrorNode(result);
  assertEquals(result.value.value, 'test error');
  assertEquals(result.name.value, 'TypeError');
  assertEquals(types.isNilNode(getCause(result)), true); // No cause
});

Deno.test('newError - three arguments', () => {
  const message = types.createStringNode('test error');
  const name = types.createStringNode('TypeError');
  const cause = types.createStringNode('Something went wrong');

  const result = newError(message, name, cause);

  types.assertErrorNode(result);
  assertEquals(result.value.value, 'test error');
  assertEquals(result.name.value, 'TypeError');
  assertEquals(getCause(result), cause);
});

Deno.test('newError - invalid arguments', () => {
  const num = types.createNumberNode(1);
  const message = types.createStringNode('test error');

  assertThrows(() => newError());
  assertThrows(() => newError(num));
  assertThrows(() => newError(message, num));
});

Deno.test('getMessage - basic functionality', () => {
  const message = types.createStringNode('test error');
  const error = newError(message);

  const result = getMessage(error);
  assertEquals(result, message);
});

Deno.test('getMessage - invalid arguments', () => {
  assertThrows(() => getMessage());
  const num = types.createNumberNode(1);

  assertThrows(() => getMessage(num));
});

Deno.test('getCause - with cause', () => {
  const message = types.createStringNode('test error');
  const cause = types.createNumberNode(1);
  const error = newError(message, types.createNilNode(), cause);

  const result = getCause(error);
  assertEquals(result, cause);
});

Deno.test('getCause - without cause', () => {
  const message = types.createStringNode('test error');
  const error = newError(message);

  const result = getCause(error);
  assertEquals(types.isNilNode(result), true);
});

Deno.test('getCause - invalid arguments', () => {
  assertThrows(() => getCause());
  assertThrows(() => getCause(types.createNumberNode(1)));
});

Deno.test('getName - basic functionality', () => {
  const message = types.createStringNode('test error');
  const name = types.createStringNode('TypeError');
  const error = newError(message, name);

  const result = getName(error);
  assertEquals(result, name);
});

Deno.test('getName - default name', () => {
  const message = types.createStringNode('test error');

  const error = newError(message);
  const result = getName(error);
  assertEquals(result.value, 'Error');
});

Deno.test('getName - invalid arguments', () => {
  assertThrows(() => getName());
  assertThrows(() => getName(types.createNumberNode(1)));
});
