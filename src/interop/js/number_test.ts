import { assertEquals, assertThrows } from '@std/assert';
import {
  newNumber, // Renamed to avoid collision
  numberEpsilon,
  numberIsFinite,
  numberIsInteger,
  numberIsNaN,
  numberIsSafeInteger,
  numberMaxSafeInteger,
  numberMaxValue,
  numberMinSafeInteger,
  numberMinValue,
  numberNaN as number_NaN,
  numberNegativeInfinity,
  numberParseFloat,
  numberParseInt,
  numberPositiveInfinity,
  numberPrototypeToExponential,
  numberPrototypeToFixed,
  numberPrototypeToPrecision,
  numberPrototypeToString,
} from './interop/js/number.ts';
import * as types from './types.ts';

Deno.test('newNumber', () => {
  assertEquals(newNumber(types.createNumberNode(1)), types.createNumberNode(1));
  assertEquals(newNumber(types.createStringNode('1')), types.createNumberNode(1));
  assertEquals(newNumber(types.createBooleanNode(true)), types.createNumberNode(1));
  assertThrows(() => newNumber());
  assertThrows(() => newNumber('string' as unknown as types.AstNode));
});

Deno.test('numberIsFinite', () => {
  assertEquals(numberIsFinite(types.createNumberNode(1)), types.createBooleanNode(true));
  assertEquals(numberIsFinite(types.createNumberNode(Infinity)), types.createBooleanNode(false));

  assertThrows(() => numberIsFinite());
});

Deno.test('numberIsInteger', () => {
  assertEquals(numberIsInteger(types.createNumberNode(1)), types.createBooleanNode(true));
  assertEquals(numberIsInteger(types.createNumberNode(1.5)), types.createBooleanNode(false));
  assertThrows(() => numberIsInteger());
});

Deno.test('numberIsNaN', () => {
  assertEquals(numberIsNaN(types.createNumberNode(Number.NaN)), types.createBooleanNode(true));
  // assertEquals(numberIsNaN(types.createNumberNode(1)), types.createBooleanNode(false));

  // assertThrows(() => numberIsNaN());
});

Deno.test('numberIsSafeInteger', () => {
  assertEquals(numberIsSafeInteger(types.createNumberNode(1)), types.createBooleanNode(true));
  assertEquals(
    numberIsSafeInteger(types.createNumberNode(Number.MAX_SAFE_INTEGER + 1)),
    types.createBooleanNode(false),
  );
  assertThrows(() => numberIsSafeInteger());
});

Deno.test('numberParseFloat', () => {
  assertEquals(numberParseFloat(types.createStringNode('3.14')), types.createNumberNode(3.14));
  assertEquals(numberParseFloat(types.createStringNode('test')), types.createNumberNode(NaN));

  assertThrows(() => numberParseFloat());
});

Deno.test('numberParseInt', () => {
  assertEquals(numberParseInt(types.createStringNode('10')), types.createNumberNode(10));
  assertEquals(numberParseInt(types.createStringNode('10'), types.createNumberNode(2)), types.createNumberNode(2));

  assertThrows(() => numberParseInt(types.createStringNode('10'), types.createStringNode('')));
});

Deno.test('numberEpsilon', () => {
  assertEquals(numberEpsilon(), types.createNumberNode(Number.EPSILON));
  assertThrows(() => numberEpsilon(types.createNumberNode(1)));
});

Deno.test('numberMaxSafeInteger', () => {
  assertEquals(numberMaxSafeInteger(), types.createNumberNode(Number.MAX_SAFE_INTEGER));
  assertThrows(() => numberMaxSafeInteger(types.createNumberNode(1)));
});

Deno.test('numberMaxValue', () => {
  assertEquals(numberMaxValue(), types.createNumberNode(Number.MAX_VALUE));
  assertThrows(() => numberMaxValue(types.createNumberNode(1)));
});

Deno.test('numberMinSafeInteger', () => {
  assertEquals(numberMinSafeInteger(), types.createNumberNode(Number.MIN_SAFE_INTEGER));
  assertThrows(() => numberMinSafeInteger(types.createNumberNode(1)));
});

Deno.test('numberMinValue', () => {
  assertEquals(numberMinValue(), types.createNumberNode(Number.MIN_VALUE));
  assertThrows(() => numberMinValue(types.createNumberNode(1)));
});

Deno.test('numberNaN', () => {
  assertEquals(number_NaN(), types.createNumberNode(Number.NaN));
  assertThrows(() => number_NaN(types.createNumberNode(1)));
});

Deno.test('numberNegativeInfinity', () => {
  assertEquals(numberNegativeInfinity(), types.createNumberNode(Number.NEGATIVE_INFINITY));
  assertThrows(() => numberNegativeInfinity(types.createNumberNode(1)));
});

Deno.test('numberPositiveInfinity', () => {
  assertEquals(numberPositiveInfinity(), types.createNumberNode(Number.POSITIVE_INFINITY));
  assertThrows(() => numberPositiveInfinity(types.createNumberNode(1)));
});

Deno.test('numberPrototypeToExponential', () => {
  assertEquals(numberPrototypeToExponential(types.createNumberNode(1)), types.createStringNode('1e+0'));
  assertEquals(
    numberPrototypeToExponential(types.createNumberNode(1), types.createNumberNode(2)),
    types.createStringNode('1.00e+0'),
  );
});

Deno.test('numberPrototypeToFixed', () => {
  assertEquals(numberPrototypeToFixed(types.createNumberNode(1)), types.createStringNode('1'));
  assertEquals(
    numberPrototypeToFixed(types.createNumberNode(1.532), types.createNumberNode(2)),
    types.createStringNode('1.53'),
  );
});

Deno.test('numberPrototypeToPrecision', () => {
  assertEquals(numberPrototypeToPrecision(types.createNumberNode(1)), types.createStringNode('1'));
  assertEquals(
    numberPrototypeToPrecision(types.createNumberNode(1), types.createNumberNode(3)),
    types.createStringNode('1.00'),
  );
});

Deno.test('numberPrototypeToString', () => {
  assertEquals(numberPrototypeToString(types.createNumberNode(120)), types.createStringNode('120'));
  assertEquals(
    numberPrototypeToString(types.createNumberNode(120), types.createNumberNode(16)),
    types.createStringNode('78'),
  );
});
