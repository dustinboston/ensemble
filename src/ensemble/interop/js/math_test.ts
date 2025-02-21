import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as mathFunctions from "./math.ts";

// Test cases for Math functions
// You'll need to adapt the `createNumberNode` parts based on your actual type system

//Example test for a function with one argument
runner.test("mathAbs: should return the absolute value of a number", () => {
	runner.assert(
		mathFunctions.mathAbs(types.createNumberNode(5)),
		types.createNumberNode(5),
	);
	runner.assert(
		mathFunctions.mathAbs(types.createNumberNode(-5)),
		types.createNumberNode(5),
	);
	runner.assert(
		mathFunctions.mathAbs(types.createNumberNode(0)),
		types.createNumberNode(0),
	);
});

runner.test("mathAbs - invalid arguments", () => {
	let threw = false;
	try {
		mathFunctions.mathAbs();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		mathFunctions.mathAbs(types.createStringNode("test"));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

//Example test for a function with two arguments
runner.test(
	"mathAtan2: should return the arctangent of the quotient of its arguments",
	() => {
		runner.assert(
			mathFunctions.mathAtan2(
				types.createNumberNode(1),
				types.createNumberNode(1),
			),
			types.createNumberNode(Math.atan2(1, 1)),
		);
	},
);

runner.test("mathAtan2 - invalid arguments", () => {
	let threw = false;
	try {
		mathFunctions.mathAtan2();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		mathFunctions.mathAtan2(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		mathFunctions.mathAtan2(
			types.createStringNode("test"),
			types.createNumberNode(1),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

//Example test for a function with variable arguments
runner.test(
	"mathMax: should return the largest of zero or more numbers",
	() => {
		runner.assert(
			mathFunctions.mathMax(
				types.createNumberNode(1),
				types.createNumberNode(5),
				types.createNumberNode(2),
			),
			types.createNumberNode(5),
		);
	},
);

runner.test("mathMax - invalid arguments", () => {
	let threw = false;
	try {
		mathFunctions.mathMax(
			types.createStringNode("test"),
			types.createNumberNode(1),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

//Example test for a function with no arguments
runner.test("mathPi: should return PI", () => {
	runner.assert(mathFunctions.mathPi(), types.createNumberNode(Math.PI));
});

runner.test("mathPi - invalid arguments", () => {
	let threw = false;
	try {
		mathFunctions.mathPi(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

//Following this pattern to test the remaining functions

// mathAcos
runner.test("mathAcos", () => {
	runner.assert(
		mathFunctions.mathAcos(types.createNumberNode(0)),
		types.createNumberNode(Math.acos(0)),
	);
});
// mathAcosh
runner.test("mathAcosh", () => {
	runner.assert(
		mathFunctions.mathAcosh(types.createNumberNode(1)),
		types.createNumberNode(Math.acosh(1)),
	);
});

// mathAsin
runner.test("mathAsin", () => {
	runner.assert(
		mathFunctions.mathAsin(types.createNumberNode(0)),
		types.createNumberNode(Math.asin(0)),
	);
});
// mathAsinh
runner.test("mathAsinh", () => {
	runner.assert(
		mathFunctions.mathAsinh(types.createNumberNode(0)),
		types.createNumberNode(Math.asinh(0)),
	);
});

// mathAtan
runner.test("mathAtan", () => {
	runner.assert(
		mathFunctions.mathAtan(types.createNumberNode(0)),
		types.createNumberNode(Math.atan(0)),
	);
});

// mathAtanh
runner.test("mathAtanh", () => {
	runner.assert(
		mathFunctions.mathAtanh(types.createNumberNode(0)),
		types.createNumberNode(Math.atanh(0)),
	);
});

// mathCbrt
runner.test("mathCbrt", () => {
	runner.assert(
		mathFunctions.mathCbrt(types.createNumberNode(8)),
		types.createNumberNode(Math.cbrt(8)),
	);
});

// mathCeil
runner.test("mathCeil", () => {
	runner.assert(
		mathFunctions.mathCeil(types.createNumberNode(4.2)),
		types.createNumberNode(Math.ceil(4.2)),
	);
});
// mathClz32
runner.test("mathClz32", () => {
	runner.assert(
		mathFunctions.mathClz32(types.createNumberNode(5)),
		types.createNumberNode(Math.clz32(5)),
	);
});

// mathCos
runner.test("mathCos", () => {
	runner.assert(
		mathFunctions.mathCos(types.createNumberNode(0)),
		types.createNumberNode(Math.cos(0)),
	);
});

// mathCosh
runner.test("mathCosh", () => {
	runner.assert(
		mathFunctions.mathCosh(types.createNumberNode(0)),
		types.createNumberNode(Math.cosh(0)),
	);
});
// mathE
runner.test("mathE", () => {
	runner.assert(mathFunctions.mathE(), types.createNumberNode(Math.E));
});

// mathExp
runner.test("mathExp", () => {
	runner.assert(
		mathFunctions.mathExp(types.createNumberNode(1)),
		types.createNumberNode(Math.exp(1)),
	);
});

// mathExpm1
runner.test("mathExpm1", () => {
	runner.assert(
		mathFunctions.mathExpm1(types.createNumberNode(1)),
		types.createNumberNode(Math.expm1(1)),
	);
});

// mathFloor
runner.test("mathFloor", () => {
	runner.assert(
		mathFunctions.mathFloor(types.createNumberNode(4.9)),
		types.createNumberNode(Math.floor(4.9)),
	);
});

// mathFround
runner.test("mathFround", () => {
	runner.assert(
		mathFunctions.mathFround(types.createNumberNode(1.337)),
		types.createNumberNode(Math.fround(1.337)),
	);
});

// mathHypot
runner.test(
	"mathHypot: should return the square root of the sum of squares of its arguments",
	() => {
		runner.assert(
			mathFunctions.mathHypot(
				types.createNumberNode(3),
				types.createNumberNode(4),
			),
			types.createNumberNode(5),
		);
	},
);

// mathImul
runner.test("mathImul", () => {
	runner.assert(
		mathFunctions.mathImul(
			types.createNumberNode(3),
			types.createNumberNode(4),
		),
		types.createNumberNode(Math.imul(3, 4)),
	);
});

// mathLn10
runner.test("mathLn10", () => {
	runner.assert(mathFunctions.mathLn10(), types.createNumberNode(Math.LN10));
});

// mathLn2
runner.test("mathLn2", () => {
	runner.assert(mathFunctions.mathLn2(), types.createNumberNode(Math.LN2));
});
// mathLog
runner.test("mathLog", () => {
	runner.assert(
		mathFunctions.mathLog(types.createNumberNode(1)),
		types.createNumberNode(Math.log(1)),
	);
});
// mathLog10
runner.test("mathLog10", () => {
	runner.assert(
		mathFunctions.mathLog10(types.createNumberNode(10)),
		types.createNumberNode(Math.log10(10)),
	);
});

// mathLog10e
runner.test("mathLog10e", () => {
	runner.assert(
		mathFunctions.mathLog10e(),
		types.createNumberNode(Math.LOG10E),
	);
});

// mathLog1p
runner.test("mathLog1p", () => {
	runner.assert(
		mathFunctions.mathLog1p(types.createNumberNode(1)),
		types.createNumberNode(Math.log1p(1)),
	);
});

// mathLog2
runner.test("mathLog2", () => {
	runner.assert(
		mathFunctions.mathLog2(types.createNumberNode(2)),
		types.createNumberNode(Math.log2(2)),
	);
});
// mathLog23
runner.test("mathLog2E", () => {
	runner.assert(mathFunctions.mathLog23(), types.createNumberNode(Math.LOG2E));
});

// mathMin
runner.test(
	"mathMin: should return the smallest of zero or more numbers",
	() => {
		runner.assert(
			mathFunctions.mathMin(
				types.createNumberNode(1),
				types.createNumberNode(5),
				types.createNumberNode(2),
			),
			types.createNumberNode(1),
		);
	},
);

// mathPow
runner.test(
	"mathPow: returns base to the exponent power, that is, baseexponent",
	() => {
		runner.assert(
			mathFunctions.mathPow(
				types.createNumberNode(2),
				types.createNumberNode(3),
			),
			types.createNumberNode(8),
		);
	},
);

// mathRandom
runner.test("mathRandom", () => {
	const result = mathFunctions.mathRandom();
	runner.assert(types.isNumberNode(result), true);
	runner.assert(result.value >= 0 && result.value < 1, true);
});

// mathRound
runner.test("mathRound", () => {
	runner.assert(
		mathFunctions.mathRound(types.createNumberNode(2.5)),
		types.createNumberNode(3),
	);
});

// mathSign
runner.test("mathSign", () => {
	runner.assert(
		mathFunctions.mathSign(types.createNumberNode(-5)),
		types.createNumberNode(-1),
	);
	runner.assert(
		mathFunctions.mathSign(types.createNumberNode(5)),
		types.createNumberNode(1),
	);
	runner.assert(
		mathFunctions.mathSign(types.createNumberNode(0)),
		types.createNumberNode(0),
	);
});

// mathSin
runner.test("mathSin", () => {
	runner.assert(
		mathFunctions.mathSin(types.createNumberNode(0)),
		types.createNumberNode(Math.sin(0)),
	);
});
// mathSinh
runner.test("mathSinh", () => {
	runner.assert(
		mathFunctions.mathSinh(types.createNumberNode(0)),
		types.createNumberNode(Math.sinh(0)),
	);
});
// mathSqrt
runner.test("mathSqrt", () => {
	runner.assert(
		mathFunctions.mathSqrt(types.createNumberNode(4)),
		types.createNumberNode(Math.sqrt(4)),
	);
});
// mathSqrt1_2
runner.test("mathSqrt1_2", () => {
	runner.assert(
		mathFunctions.mathSqrt12(),
		types.createNumberNode(Math.SQRT1_2),
	);
});

// mathSqrt2
runner.test("mathSqrt2", () => {
	runner.assert(mathFunctions.mathSqrt2(), types.createNumberNode(Math.SQRT2));
});
// mathTan
runner.test("mathTan", () => {
	runner.assert(
		mathFunctions.mathTan(types.createNumberNode(0)),
		types.createNumberNode(Math.tan(0)),
	);
});
// mathTanh
runner.test("mathTanh", () => {
	runner.assert(
		mathFunctions.mathTanh(types.createNumberNode(0)),
		types.createNumberNode(Math.tanh(0)),
	);
});

// mathTrunc
runner.test("mathTrunc", () => {
	runner.assert(
		mathFunctions.mathTrunc(types.createNumberNode(13.37)),
		types.createNumberNode(13),
	);
});

runner.report();
