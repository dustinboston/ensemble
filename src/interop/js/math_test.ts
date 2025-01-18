import * as mathFunctions from '@/interop/js/math.ts';
import * as types from '@/types.ts';
import { assertEquals, assertThrows } from '@std/assert';

// Test cases for Math functions
// You'll need to adapt the `createNumberNode` parts based on your actual type system

//Example test for a function with one argument
Deno.test('mathAbs: should return the absolute value of a number', () => {
  assertEquals(mathFunctions.mathAbs(types.createNumberNode(5)), types.createNumberNode(5));
  assertEquals(mathFunctions.mathAbs(types.createNumberNode(-5)), types.createNumberNode(5));
  assertEquals(mathFunctions.mathAbs(types.createNumberNode(0)), types.createNumberNode(0));
});

Deno.test('mathAbs - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathAbs());
  assertThrows(() => mathFunctions.mathAbs(types.createStringNode('test')));
});

//Example test for a function with two arguments
Deno.test('mathAtan2: should return the arctangent of the quotient of its arguments', () => {
  assertEquals(
    mathFunctions.mathAtan2(types.createNumberNode(1), types.createNumberNode(1)),
    types.createNumberNode(Math.atan2(1, 1)),
  );
});

Deno.test('mathAtan2 - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathAtan2());
  assertThrows(() => mathFunctions.mathAtan2(types.createNumberNode(1)));
  assertThrows(() => mathFunctions.mathAtan2(types.createStringNode('test'), types.createNumberNode(1)));
});

//Example test for a function with variable arguments
Deno.test('mathMax: should return the largest of zero or more numbers', () => {
  assertEquals(
    mathFunctions.mathMax(types.createNumberNode(1), types.createNumberNode(5), types.createNumberNode(2)),
    types.createNumberNode(5),
  );
});

Deno.test('mathMax - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathMax(types.createStringNode('test'), types.createNumberNode(1)));
});

//Example test for a function with no arguments
Deno.test('mathPi: should return PI', () => {
  assertEquals(mathFunctions.mathPi(), types.createNumberNode(Math.PI));
});

Deno.test('mathPi - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathPi(types.createNumberNode(1)));
});

//Following this pattern to test the remaining functions

// mathAcos
Deno.test('mathAcos', () => {
  assertEquals(mathFunctions.mathAcos(types.createNumberNode(0)), types.createNumberNode(Math.acos(0)));
});
// mathAcosh
Deno.test('mathAcosh', () => {
  assertEquals(mathFunctions.mathAcosh(types.createNumberNode(1)), types.createNumberNode(Math.acosh(1)));
});

// mathAsin
Deno.test('mathAsin', () => {
  assertEquals(mathFunctions.mathAsin(types.createNumberNode(0)), types.createNumberNode(Math.asin(0)));
});
// mathAsinh
Deno.test('mathAsinh', () => {
  assertEquals(mathFunctions.mathAsinh(types.createNumberNode(0)), types.createNumberNode(Math.asinh(0)));
});

// mathAtan
Deno.test('mathAtan', () => {
  assertEquals(mathFunctions.mathAtan(types.createNumberNode(0)), types.createNumberNode(Math.atan(0)));
});

// mathAtanh
Deno.test('mathAtanh', () => {
  assertEquals(mathFunctions.mathAtanh(types.createNumberNode(0)), types.createNumberNode(Math.atanh(0)));
});

// mathCbrt
Deno.test('mathCbrt', () => {
  assertEquals(mathFunctions.mathCbrt(types.createNumberNode(8)), types.createNumberNode(Math.cbrt(8)));
});

// mathCeil
Deno.test('mathCeil', () => {
  assertEquals(mathFunctions.mathCeil(types.createNumberNode(4.2)), types.createNumberNode(Math.ceil(4.2)));
});
// mathClz32
Deno.test('mathClz32', () => {
  assertEquals(mathFunctions.mathClz32(types.createNumberNode(5)), types.createNumberNode(Math.clz32(5)));
});

// mathCos
Deno.test('mathCos', () => {
  assertEquals(mathFunctions.mathCos(types.createNumberNode(0)), types.createNumberNode(Math.cos(0)));
});

// mathCosh
Deno.test('mathCosh', () => {
  assertEquals(mathFunctions.mathCosh(types.createNumberNode(0)), types.createNumberNode(Math.cosh(0)));
});
// mathE
Deno.test('mathE', () => {
  assertEquals(mathFunctions.mathE(), types.createNumberNode(Math.E));
});

// mathExp
Deno.test('mathExp', () => {
  assertEquals(mathFunctions.mathExp(types.createNumberNode(1)), types.createNumberNode(Math.exp(1)));
});

// mathExpm1
Deno.test('mathExpm1', () => {
  assertEquals(mathFunctions.mathExpm1(types.createNumberNode(1)), types.createNumberNode(Math.expm1(1)));
});

// mathFloor
Deno.test('mathFloor', () => {
  assertEquals(mathFunctions.mathFloor(types.createNumberNode(4.9)), types.createNumberNode(Math.floor(4.9)));
});

// mathFround
Deno.test('mathFround', () => {
  assertEquals(mathFunctions.mathFround(types.createNumberNode(1.337)), types.createNumberNode(Math.fround(1.337)));
});

// mathHypot
Deno.test('mathHypot: should return the square root of the sum of squares of its arguments', () => {
  assertEquals(
    mathFunctions.mathHypot(types.createNumberNode(3), types.createNumberNode(4)),
    types.createNumberNode(5),
  );
});

// mathImul
Deno.test('mathImul', () => {
  assertEquals(
    mathFunctions.mathImul(types.createNumberNode(3), types.createNumberNode(4)),
    types.createNumberNode(Math.imul(3, 4)),
  );
});

// mathLn10
Deno.test('mathLn10', () => {
  assertEquals(mathFunctions.mathLn10(), types.createNumberNode(Math.LN10));
});

// mathLn2
Deno.test('mathLn2', () => {
  assertEquals(mathFunctions.mathLn2(), types.createNumberNode(Math.LN2));
});
// mathLog
Deno.test('mathLog', () => {
  assertEquals(mathFunctions.mathLog(types.createNumberNode(1)), types.createNumberNode(Math.log(1)));
});
// mathLog10
Deno.test('mathLog10', () => {
  assertEquals(mathFunctions.mathLog10(types.createNumberNode(10)), types.createNumberNode(Math.log10(10)));
});

// mathLog10e
Deno.test('mathLog10e', () => {
  assertEquals(mathFunctions.mathLog10e(), types.createNumberNode(Math.LOG10E));
});

// mathLog1p
Deno.test('mathLog1p', () => {
  assertEquals(mathFunctions.mathLog1p(types.createNumberNode(1)), types.createNumberNode(Math.log1p(1)));
});

// mathLog2
Deno.test('mathLog2', () => {
  assertEquals(mathFunctions.mathLog2(types.createNumberNode(2)), types.createNumberNode(Math.log2(2)));
});
// mathLog23
Deno.test('mathLog2E', () => {
  assertEquals(mathFunctions.mathLog23(), types.createNumberNode(Math.LOG2E));
});

// mathMin
Deno.test('mathMin: should return the smallest of zero or more numbers', () => {
  assertEquals(
    mathFunctions.mathMin(types.createNumberNode(1), types.createNumberNode(5), types.createNumberNode(2)),
    types.createNumberNode(1),
  );
});

// mathPow
Deno.test('mathPow: returns base to the exponent power, that is, baseexponent', () => {
  assertEquals(mathFunctions.mathPow(types.createNumberNode(2), types.createNumberNode(3)), types.createNumberNode(8));
});

// mathRandom
Deno.test('mathRandom', () => {
  const result = mathFunctions.mathRandom();
  assertEquals(types.isNumberNode(result), true);
  assertEquals(result.value >= 0 && result.value < 1, true);
});

// mathRound
Deno.test('mathRound', () => {
  assertEquals(mathFunctions.mathRound(types.createNumberNode(2.5)), types.createNumberNode(3));
});

// mathSign
Deno.test('mathSign', () => {
  assertEquals(mathFunctions.mathSign(types.createNumberNode(-5)), types.createNumberNode(-1));
  assertEquals(mathFunctions.mathSign(types.createNumberNode(5)), types.createNumberNode(1));
  assertEquals(mathFunctions.mathSign(types.createNumberNode(0)), types.createNumberNode(0));
});

// mathSin
Deno.test('mathSin', () => {
  assertEquals(mathFunctions.mathSin(types.createNumberNode(0)), types.createNumberNode(Math.sin(0)));
});
// mathSinh
Deno.test('mathSinh', () => {
  assertEquals(mathFunctions.mathSinh(types.createNumberNode(0)), types.createNumberNode(Math.sinh(0)));
});
// mathSqrt
Deno.test('mathSqrt', () => {
  assertEquals(mathFunctions.mathSqrt(types.createNumberNode(4)), types.createNumberNode(Math.sqrt(4)));
});
// mathSqrt1_2
Deno.test('mathSqrt1_2', () => {
  assertEquals(mathFunctions.mathSqrt12(), types.createNumberNode(Math.SQRT1_2));
});

// mathSqrt2
Deno.test('mathSqrt2', () => {
  assertEquals(mathFunctions.mathSqrt2(), types.createNumberNode(Math.SQRT2));
});
// mathTan
Deno.test('mathTan', () => {
  assertEquals(mathFunctions.mathTan(types.createNumberNode(0)), types.createNumberNode(Math.tan(0)));
});
// mathTanh
Deno.test('mathTanh', () => {
  assertEquals(mathFunctions.mathTanh(types.createNumberNode(0)), types.createNumberNode(Math.tanh(0)));
});

// mathTrunc
Deno.test('mathTrunc', () => {
  assertEquals(mathFunctions.mathTrunc(types.createNumberNode(13.37)), types.createNumberNode(13));
});
