import { assert, assertEquals, assertThrows } from '@std/assert';
import * as fns from './interop/js/regexp.ts';
import * as types from './types.ts';

const { createRegExp } = fns;

// Basic RegExp test
Deno.test('RegExp.new: new RegExp should return an Atom', () => {
  const regexp = createRegExp('^[a-z]$');
  assert(types.isAtomNode(regexp), 'Call new RegExp should return an Atom');
  assert(regexp.value instanceof RegExp);
});

Deno.test('RegExp.new: Takes a regular expression string as the first argument', () => {
  const regexp = createRegExp('abc');
  assert(types.isAtomNode(regexp), 'Call new RegExp should return an Atom');
  assert(regexp.value instanceof RegExp);
  assertEquals(regexp.value.source, 'abc');
});

Deno.test('RegExp.new: Accepts flags as the second argument', () => {
  const regexp = createRegExp('abc', 'i');
  assert(types.isAtomNode(regexp), 'Call new RegExp should return an Atom');
  assert(regexp.value instanceof RegExp);
  assertEquals(regexp.value.source, 'abc');
  assertEquals(regexp.value.flags, 'i');
});

Deno.test('RegExp.new: Throws with zero arguments', () => {
  assertThrows(() => {
    fns.newRegExp();
  }, Error);
});

Deno.test("RegExp.new: Throws if first arg isn't a string", () => {
  assertThrows(() => {
    createRegExp(123 as unknown as string);
  }, Error);
});

Deno.test("RegExp.new: Throws if second arg isn't a string", () => {
  assertThrows(() => {
    createRegExp('abc', 123 as unknown as string);
  }, Error);
});

Deno.test('execRegExp: Result is null', () => {
  const regexp = createRegExp('abc');
  const stringValue = types.createStringNode('def');
  const result = fns.execRegExp(regexp, stringValue);
  assert(types.isNilNode(result));
});

Deno.test('execRegExp: Result is not null', () => {
  const regexp = createRegExp('abc');
  const stringValue = types.createStringNode('abcdef');
  const result = fns.execRegExp(regexp, stringValue);

  assert(types.isVectorNode(result));
  assertEquals(result.value.length, 1);
  assertEquals(types.isSymbolNode(result.value[0]), true);
  assertEquals(result.value[0].value, 'abc');
});

Deno.test('execRegExp: Result has groups', () => {
  const regexp = createRegExp('a(b)c');
  const stringValue = types.createStringNode('abcdef');
  const result = fns.execRegExp(regexp, stringValue);

  assert(types.isVectorNode(result));
  assertEquals(result.value.length, 2);
  assertEquals(types.isSymbolNode(result.value[0]), true);
  assertEquals(result.value[0].value, 'abc');
  assertEquals(types.isSymbolNode(result.value[1]), true);
  assertEquals(result.value[1].value, 'b');
});

Deno.test('execRegExp: Result is not null with global flag', () => {
  const regexp = createRegExp('a(b)c', 'g');
  const stringValue = types.createStringNode('abcdef,abc');
  const result = fns.execRegExp(regexp, stringValue);

  assert(types.isVectorNode(result));
  assertEquals(result.value.length, 2);
});

Deno.test('regExpPrototypeTest: returns true for match', () => {
  const regexp = createRegExp('abc');
  const stringValue = types.createStringNode('abc');
  const result = fns.testRegExp(regexp, stringValue);
  assert(types.isBooleanNode(result));
  assertEquals(result.value, true);
});

Deno.test('regExpPrototypeTest: returns false for no match', () => {
  const regexp = createRegExp('abc');
  const stringValue = types.createStringNode('def');
  const result = fns.testRegExp(regexp, stringValue);
  assert(types.isBooleanNode(result));
  assertEquals(result.value, false);
});

Deno.test('regExpPrototypeTest: throws if first arg is not an AstNode', () => {
  const regexp = /abc/;
  const stringValue = types.createStringNode('abc');

  assertThrows(() => {
    // deno-lint-ignore no-explicit-any
    fns.testRegExp(regexp as any, stringValue);
  }, Error);
});

Deno.test('regExpPrototypeTest: throws if second arg is not a string node', () => {
  const regexp = types.createAtomNode(/abc/);
  const stringValue = 123;

  assertThrows(() => {
    fns.testRegExp(regexp, stringValue as any);
  }, Error);
});

Deno.test('regExpPrototypeTest: throws if wrong number of args', () => {
  const regexp = createRegExp('abc');
  const stringValue = types.createStringNode('abc');

  assertThrows(() => {
    fns.testRegExp(regexp);
  }, Error);

  assertThrows(() => {
    fns.testRegExp(regexp, stringValue, regexp);
  }, Error);
});
