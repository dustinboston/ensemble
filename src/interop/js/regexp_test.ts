import * as fns from '@/interop/js/regexp.ts';
import * as types from '@/types.ts';
import { assert, assertEquals, assertThrows } from '@std/assert';

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

Deno.test('RegExp.new: three arguments', () => {
  assertThrows(() => {
    createRegExp(types.createStringNode('abc'), types.createStringNode('i'), types.createStringNode('g'));
  }, Error);
});

Deno.test('RegExp.new: first argument not a string', () => {
  assertThrows(() => {
    createRegExp(123 as unknown as string);
  }, Error);
});

Deno.test('RegExp.new: second argument not a string', () => {
  assertThrows(() => {
    createRegExp(types.createStringNode('abc'), types.createNumberNode(123));
  }, Error);
});

// regExpPrototypeExec tests
Deno.test('regExpPrototypeExec: result is nullish', () => {
  const regexp = createRegExpAtom('abc');
  const stringValue = types.createStringNode('def');
  const result = fns.execRegExp(regexp, stringValue);
  assert(types.isNilNode(result));
});

Deno.test('regExpPrototypeExec: result is not nullish', () => {
  const regexp = createRegExpAtom('abc');
  const stringValue = types.createStringNode('abcdef');
  const result = fns.execRegExp(regexp, stringValue);

  assert(types.isVectorNode(result));
  assertEquals(result.elements.length, 1);
  assertEquals(types.isAtomNode(result.elements[0]), true);
  assertEquals(types.isStringNode(result.elements[0]), true);
  assertEquals(result.elements[0].value, 'abc');
});

Deno.test('regExpPrototypeExec: result is not nullish with groups', () => {
  const regexp = createRegExp(types.createStringNode('a(b)c'));
  const stringValue = types.createStringNode('abcdef');
  const result = fns.execRegExp(regexp, stringValue);
  assert(types.isVectorNode(result));
  assertEquals(result.elements.length, 2);
  assertEquals(types.isAtomNode(result.elements[0]), true);
  assertEquals(types.isStringNode(result.elements[0]), true);
  assertEquals(result.elements[0].value, 'abc');
  assertEquals(types.isAtomNode(result.elements[1]), true);
  assertEquals(types.isStringNode(result.elements[1]), true);
  assertEquals(result.elements[1].value, 'b');
});

Deno.test('regExpPrototypeExec: result is not nullish with global flag', () => {
  const regexp = createRegExp(types.createStringNode('a(b)c'), types.createStringNode('g'));
  const stringValue = types.createStringNode('abcdefabc');
  const result = fns.execRegExp(regexp, stringValue);
  assert(types.isVectorNode(result));
  assertEquals(result.elements.length, 2);
});
