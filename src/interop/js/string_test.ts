import { assertEquals, assertThrows } from '@std/assert';
import * as stringFns from './interop/js/string.ts';
import * as types from './types.ts';

Deno.test('stringFromCharCode - valid vector of numbers', () => {
  const astArgs = [types.createVectorNode([
    types.createNumberNode(97),
    types.createNumberNode(98),
    types.createNumberNode(99),
  ])];
  const result = stringFns.stringFromCharCode(...astArgs);
  console.log(result);
  assertEquals(result, types.createStringNode('abc'));
});

Deno.test('stringFromCharCode - empty vector', () => {
  const astArgs = [types.createVectorNode([])];
  const result = stringFns.stringFromCharCode(...astArgs);
  assertEquals(result, types.createStringNode(''));
});

Deno.test('stringFromCharCode - incorrect argument count', () => {
  assertThrows(() => stringFns.stringFromCharCode(), Error, 'Wanted 1 arguments but got 0');
  assertThrows(
    () => stringFns.stringFromCharCode(types.createVectorNode([]), types.createVectorNode([])),
    Error,
    'Wanted 1 arguments but got 2',
  );
});

Deno.test('stringFromCharCode - incorrect argument type', () => {
  assertThrows(() => stringFns.stringFromCharCode(types.createNumberNode(1)), TypeError);
});

Deno.test('stringFromCharCode - non-number in vector', () => {
  assertThrows(() => stringFns.stringFromCharCode(types.createVectorNode([types.createStringNode('a')])), TypeError);
  assertThrows(() =>
    stringFns.stringFromCharCode(types.createVectorNode([
      types.createNumberNode(97),
      types.createStringNode('b'),
      types.createNumberNode(99),
    ])), TypeError);
});

Deno.test('stringFromCodePoint - valid code points', () => {
  const result = stringFns.stringFromCodePoint(
    types.createNumberNode(97),
    types.createNumberNode(98),
    types.createNumberNode(99),
  );
  assertEquals(result, types.createStringNode('abc'));
});

Deno.test('stringFromCodePoint - non-number arguments', () => {
  assertThrows(
    () => stringFns.stringFromCodePoint(types.createStringNode('a')),
    TypeError,
  );
});

Deno.test('stringAt - valid arguments', () => {
  const result = stringFns.stringAt(
    types.createStringNode('abc'),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createStringNode('b'));
});

Deno.test('stringAt - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringAt(types.createStringNode('abc'), types.createStringNode('a')),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringAt(types.createNumberNode(1), types.createNumberNode(0)),
    TypeError,
  );
});

Deno.test('stringCodePointAt - valid arguments', () => {
  const result = stringFns.stringCodePointAt(
    types.createStringNode('abc'),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createNumberNode(98));
});

Deno.test('stringCodePointAt - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringCodePointAt(types.createStringNode('abc'), types.createStringNode('a')),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringCodePointAt(types.createNumberNode(1), types.createNumberNode(0)),
    TypeError,
  );
});

Deno.test('stringConcat - valid arguments', () => {
  const result = stringFns.stringConcat(
    types.createStringNode('a'),
    types.createStringNode('b'),
    types.createStringNode('c'),
  );
  assertEquals(result, types.createStringNode('abc'));
});

Deno.test('stringConcat - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringConcat(types.createStringNode('a'), types.createNumberNode(1)),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringConcat(types.createNumberNode(1), types.createStringNode('a')),
    TypeError,
  );
});

Deno.test('stringEndsWith - valid arguments, with length', () => {
  const result = stringFns.stringEndsWith(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
    types.createNumberNode(4),
  );
  assertEquals(result, types.createBooleanNode(false));
});

Deno.test('stringEndsWith - valid arguments, without length', () => {
  const result = stringFns.stringEndsWith(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
  );
  assertEquals(result, types.createBooleanNode(true));
});

Deno.test('stringEndsWith - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringEndsWith(types.createStringNode('abc'), types.createNumberNode(0)),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringEndsWith(types.createNumberNode(1), types.createStringNode('abc')),
    TypeError,
  );
  assertThrows(
    () =>
      stringFns.stringEndsWith(
        types.createStringNode('abc'),
        types.createStringNode('search'),
        types.createStringNode('length'),
      ),
    TypeError,
  );
});

Deno.test('stringIncludes - valid arguments, with position', () => {
  const result = stringFns.stringIncludes(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createBooleanNode(true));
});

Deno.test('stringIncludes - valid arguments, without position', () => {
  const result = stringFns.stringIncludes(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
  );
  assertEquals(result, types.createBooleanNode(true));
});

Deno.test('stringIncludes - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringIncludes(types.createStringNode('abc'), types.createNumberNode(1)),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringIncludes(types.createNumberNode(1), types.createStringNode('abc')),
    TypeError,
  );
  assertThrows(
    () =>
      stringFns.stringIncludes(
        types.createStringNode('abc'),
        types.createStringNode('search'),
        types.createStringNode('position'),
      ),
    TypeError,
  );
});

Deno.test('stringIndexOf - valid arguments, with position', () => {
  const result = stringFns.stringIndexOf(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
    types.createNumberNode(0),
  );
  assertEquals(result, types.createNumberNode(0));
});

Deno.test('stringIndexOf - valid arguments, without position', () => {
  const result = stringFns.stringIndexOf(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
  );
  assertEquals(result, types.createNumberNode(0));
});

Deno.test('stringIndexOf - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringIndexOf(types.createStringNode('abc'), types.createNumberNode(1)),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringIndexOf(types.createNumberNode(1), types.createStringNode('abc')),
    TypeError,
  );
});

Deno.test('stringIsWellFormed - valid arguments', () => {
  const result = stringFns.stringIsWellFormed(
    types.createStringNode('abc'),
  );
  assertEquals(result, types.createBooleanNode(true));
});

Deno.test('stringIsWellFormed - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringIsWellFormed(types.createNumberNode(1)),
    TypeError,
  );
});

Deno.test('stringLastIndexOf - valid arguments, with position', () => {
  const result = stringFns.stringLastIndexOf(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
    types.createNumberNode(5),
  );
  assertEquals(result, types.createNumberNode(3));
});

Deno.test('stringLastIndexOf - valid arguments, without position', () => {
  const result = stringFns.stringLastIndexOf(
    types.createStringNode('abcabc'),
    types.createStringNode('abc'),
  );
  assertEquals(result, types.createNumberNode(3));
});

Deno.test('stringLastIndexOf - invalid arguments', () => {
  assertThrows(
    () => stringFns.stringLastIndexOf(types.createStringNode('abc'), types.createNumberNode(1)),
    TypeError,
  );
  assertThrows(
    () => stringFns.stringLastIndexOf(types.createNumberNode(1), types.createStringNode('abc')),
    TypeError,
  );
});
