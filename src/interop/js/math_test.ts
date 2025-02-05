import { assertEquals, assertThrows, test } from '../../../tests/test_runner.ts';
import * as types from '../../types.ts';
import * as mathFunctions from './math.ts';

// Test cases for Math functions
// You'll need to adapt the `createNumberNode` parts based on your actual type system

//Example test for a function with one argument
test('mathAbs: should return the absolute value of a number', () => {
  assertEquals(mathFunctions.mathAbs(types.createNumberNode(5)), types.createNumberNode(5));
  assertEquals(mathFunctions.mathAbs(types.createNumberNode(-5)), types.createNumberNode(5));
  assertEquals(mathFunctions.mathAbs(types.createNumberNode(0)), types.createNumberNode(0));
});

test('mathAbs - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathAbs());
  assertThrows(() => mathFunctions.mathAbs(types.createStringNode('test')));
});

//Example test for a function with two arguments
test('mathAtan2: should return the arctangent of the quotient of its arguments', () => {
  assertEquals(
    mathFunctions.mathAtan2(types.createNumberNode(1), types.createNumberNode(1)),
    types.createNumberNode(Math.atan2(1, 1)),
  );
});

test('mathAtan2 - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathAtan2());
  assertThrows(() => mathFunctions.mathAtan2(types.createNumberNode(1)));
  assertThrows(() => mathFunctions.mathAtan2(types.createStringNode('test'), types.createNumberNode(1)));
});

//Example test for a function with variable arguments
test('mathMax: should return the largest of zero or more numbers', () => {
  assertEquals(
    mathFunctions.mathMax(types.createNumberNode(1), types.createNumberNode(5), types.createNumberNode(2)),
    types.createNumberNode(5),
  );
});

test('mathMax - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathMax(types.createStringNode('test'), types.createNumberNode(1)));
});

//Example test for a function with no arguments
test('mathPi: should return PI', () => {
  assertEquals(mathFunctions.mathPi(), types.createNumberNode(Math.PI));
});

test('mathPi - invalid arguments', () => {
  assertThrows(() => mathFunctions.mathPi(types.createNumberNode(1)));
});

//Following this pattern to test the remaining functions

// mathAcos
test('mathAcos', () => {
  assertEquals(mathFunctions.mathAcos(types.createNumberNode(0)), types.createNumberNode(Math.acos(0)));
});
// mathAcosh
test('mathAcosh', () => {
  assertEquals(mathFunctions.mathAcosh(types.createNumberNode(1)), types.createNumberNode(Math.acosh(1)));
});

// mathAsin
test('mathAsin', () => {
  assertEquals(mathFunctions.mathAsin(types.createNumberNode(0)), types.createNumberNode(Math.asin(0)));
});
// mathAsinh
test('mathAsinh', () => {
  assertEquals(mathFunctions.mathAsinh(types.createNumberNode(0)), types.createNumberNode(Math.asinh(0)));
});

// mathAtan
test('mathAtan', () => {
  assertEquals(mathFunctions.mathAtan(types.createNumberNode(0)), types.createNumberNode(Math.atan(0)));
});

// mathAtanh
test('mathAtanh', () => {
  assertEquals(mathFunctions.mathAtanh(types.createNumberNode(0)), types.createNumberNode(Math.atanh(0)));
});

// mathCbrt
test('mathCbrt', () => {
  assertEquals(mathFunctions.mathCbrt(types.createNumberNode(8)), types.createNumberNode(Math.cbrt(8)));
});

// mathCeil
test('mathCeil', () => {
  assertEquals(mathFunctions.mathCeil(types.createNumberNode(4.2)), types.createNumberNode(Math.ceil(4.2)));
});
// mathClz32
test('mathClz32', () => {
  assertEquals(mathFunctions.mathClz32(types.createNumberNode(5)), types.createNumberNode(Math.clz32(5)));
});

// mathCos
test('mathCos', () => {
  assertEquals(mathFunctions.mathCos(types.createNumberNode(0)), types.createNumberNode(Math.cos(0)));
});

// mathCosh
test('mathCosh', () => {
  assertEquals(mathFunctions.mathCosh(types.createNumberNode(0)), types.createNumberNode(Math.cosh(0)));
});
// mathE
test('mathE', () => {
  assertEquals(mathFunctions.mathE(), types.createNumberNode(Math.E));
});

// mathExp
test('mathExp', () => {
  assertEquals(mathFunctions.mathExp(types.createNumberNode(1)), types.createNumberNode(Math.exp(1)));
});

// mathExpm1
test('mathExpm1', () => {
  assertEquals(mathFunctions.mathExpm1(types.createNumberNode(1)), types.createNumberNode(Math.expm1(1)));
});

// mathFloor
test('mathFloor', () => {
  assertEquals(mathFunctions.mathFloor(types.createNumberNode(4.9)), types.createNumberNode(Math.floor(4.9)));
});

// mathFround
test('mathFround', () => {
  assertEquals(mathFunctions.mathFround(types.createNumberNode(1.337)), types.createNumberNode(Math.fround(1.337)));
});

// mathHypot
test('mathHypot: should return the square root of the sum of squares of its arguments', () => {
  assertEquals(
    mathFunctions.mathHypot(types.createNumberNode(3), types.createNumberNode(4)),
    types.createNumberNode(5),
  );
});

// mathImul
test('mathImul', () => {
  assertEquals(
    mathFunctions.mathImul(types.createNumberNode(3), types.createNumberNode(4)),
    types.createNumberNode(Math.imul(3, 4)),
  );
});

// mathLn10
test('mathLn10', () => {
  assertEquals(mathFunctions.mathLn10(), types.createNumberNode(Math.LN10));
});

// mathLn2
test('mathLn2', () => {
  assertEquals(mathFunctions.mathLn2(), types.createNumberNode(Math.LN2));
});
// mathLog
test('mathLog', () => {
  assertEquals(mathFunctions.mathLog(types.createNumberNode(1)), types.createNumberNode(Math.log(1)));
});
// mathLog10
test('mathLog10', () => {
  assertEquals(mathFunctions.mathLog10(types.createNumberNode(10)), types.createNumberNode(Math.log10(10)));
});

// mathLog10e
test('mathLog10e', () => {
  assertEquals(mathFunctions.mathLog10e(), types.createNumberNode(Math.LOG10E));
});

// mathLog1p
test('mathLog1p', () => {
  assertEquals(mathFunctions.mathLog1p(types.createNumberNode(1)), types.createNumberNode(Math.log1p(1)));
});

// mathLog2
test('mathLog2', () => {
  assertEquals(mathFunctions.mathLog2(types.createNumberNode(2)), types.createNumberNode(Math.log2(2)));
});
// mathLog23
test('mathLog2E', () => {
  assertEquals(mathFunctions.mathLog23(), types.createNumberNode(Math.LOG2E));
});

// mathMin
test('mathMin: should return the smallest of zero or more numbers', () => {
  assertEquals(
    mathFunctions.mathMin(types.createNumberNode(1), types.createNumberNode(5), types.createNumberNode(2)),
    types.createNumberNode(1),
  );
});

// mathPow
test('mathPow: returns base to the exponent power, that is, baseexponent', () => {
  assertEquals(mathFunctions.mathPow(types.createNumberNode(2), types.createNumberNode(3)), types.createNumberNode(8));
});

// mathRandom
test('mathRandom', () => {
  const result = mathFunctions.mathRandom();
  assertEquals(types.isNumberNode(result), true);
  assertEquals(result.value >= 0 && result.value < 1, true);
});

// mathRound
test('mathRound', () => {
  assertEquals(mathFunctions.mathRound(types.createNumberNode(2.5)), types.createNumberNode(3));
});

// mathSign
test('mathSign', () => {
  assertEquals(mathFunctions.mathSign(types.createNumberNode(-5)), types.createNumberNode(-1));
  assertEquals(mathFunctions.mathSign(types.createNumberNode(5)), types.createNumberNode(1));
  assertEquals(mathFunctions.mathSign(types.createNumberNode(0)), types.createNumberNode(0));
});

// mathSin
test('mathSin', () => {
  assertEquals(mathFunctions.mathSin(types.createNumberNode(0)), types.createNumberNode(Math.sin(0)));
});
// mathSinh
test('mathSinh', () => {
  assertEquals(mathFunctions.mathSinh(types.createNumberNode(0)), types.createNumberNode(Math.sinh(0)));
});
// mathSqrt
test('mathSqrt', () => {
  assertEquals(mathFunctions.mathSqrt(types.createNumberNode(4)), types.createNumberNode(Math.sqrt(4)));
});
// mathSqrt1_2
test('mathSqrt1_2', () => {
  assertEquals(mathFunctions.mathSqrt12(), types.createNumberNode(Math.SQRT1_2));
});

// mathSqrt2
test('mathSqrt2', () => {
  assertEquals(mathFunctions.mathSqrt2(), types.createNumberNode(Math.SQRT2));
});
// mathTan
test('mathTan', () => {
  assertEquals(mathFunctions.mathTan(types.createNumberNode(0)), types.createNumberNode(Math.tan(0)));
});
// mathTanh
test('mathTanh', () => {
  assertEquals(mathFunctions.mathTanh(types.createNumberNode(0)), types.createNumberNode(Math.tanh(0)));
});

// mathTrunc
test('mathTrunc', () => {
  assertEquals(mathFunctions.mathTrunc(types.createNumberNode(13.37)), types.createNumberNode(13));
});
