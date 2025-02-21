import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import {
	newNumber,
	numberEpsilon,
	numberIsFinite,
	numberIsInteger,
	numberIsNaN,
	numberIsSafeInteger,
	numberMaxSafeInteger,
	numberMaxValue,
	numberMinSafeInteger,
	numberMinValue,
	numberNegativeInfinity,
	numberParseFloat,
	numberParseInt,
	numberPositiveInfinity,
	numberPrototypeToExponential,
	numberPrototypeToFixed,
	numberPrototypeToPrecision,
	numberPrototypeToString,
	numberNaN as number_NaN, // Renamed to avoid collision
} from "./number.ts";

runner.test("newNumber", () => {
	runner.assert(
		newNumber(types.createNumberNode(1)),
		types.createNumberNode(1),
	);
	runner.assert(
		newNumber(types.createStringNode("1")),
		types.createNumberNode(1),
	);
	runner.assert(
		newNumber(types.createBooleanNode(true)),
		types.createNumberNode(1),
	);

	let threw = false;
	try {
		newNumber();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		newNumber("string" as unknown as types.AstNode);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberIsFinite", () => {
	runner.assert(
		numberIsFinite(types.createNumberNode(1)),
		types.createBooleanNode(true),
	);
	runner.assert(
		numberIsFinite(types.createNumberNode(Number.POSITIVE_INFINITY)),
		types.createBooleanNode(false),
	);

	let threw = false;
	try {
		numberIsFinite();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberIsInteger", () => {
	runner.assert(
		numberIsInteger(types.createNumberNode(1)),
		types.createBooleanNode(true),
	);
	runner.assert(
		numberIsInteger(types.createNumberNode(1.5)),
		types.createBooleanNode(false),
	);

	let threw = false;
	try {
		numberIsInteger();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberIsNaN", () => {
	runner.assert(
		numberIsNaN(types.createNumberNode(Number.NaN)),
		types.createBooleanNode(true),
	);
	// assertEquals(numberIsNaN(types.createNumberNode(1)), types.createBooleanNode(false));

	// assertThrows(() => numberIsNaN());
});

runner.test("numberIsSafeInteger", () => {
	runner.assert(
		numberIsSafeInteger(types.createNumberNode(1)),
		types.createBooleanNode(true),
	);
	runner.assert(
		numberIsSafeInteger(types.createNumberNode(Number.MAX_SAFE_INTEGER + 1)),
		types.createBooleanNode(false),
	);

	let threw = false;
	try {
		numberIsSafeInteger();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberParseFloat", () => {
	const result = numberParseFloat(types.createStringNode("3.14"));
	runner.assert(result, types.createNumberNode(3.14));
});

runner.test("numberParseFloat: invalid arg", () => {
	const nanNum = numberParseFloat(types.createStringNode("test"));
	runner.assert(Number.isNaN(nanNum.value), true);
});

runner.test("numberParseFloat: missing arg", () => {
	let threw = false;
	try {
		numberParseFloat();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberParseInt", () => {
	runner.assert(
		numberParseInt(types.createStringNode("10")),
		types.createNumberNode(10),
	);
	runner.assert(
		numberParseInt(types.createStringNode("10"), types.createNumberNode(2)),
		types.createNumberNode(2),
	);

	let threw = false;
	try {
		numberParseInt(types.createStringNode("10"), types.createStringNode(""));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberEpsilon", () => {
	runner.assert(numberEpsilon(), types.createNumberNode(Number.EPSILON));

	let threw = false;
	try {
		numberEpsilon(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberMaxSafeInteger", () => {
	runner.assert(
		numberMaxSafeInteger(),
		types.createNumberNode(Number.MAX_SAFE_INTEGER),
	);

	let threw = false;
	try {
		numberMaxSafeInteger(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberMaxValue", () => {
	runner.assert(numberMaxValue(), types.createNumberNode(Number.MAX_VALUE));

	let threw = false;
	try {
		numberMaxValue(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberMinSafeInteger", () => {
	runner.assert(
		numberMinSafeInteger(),
		types.createNumberNode(Number.MIN_SAFE_INTEGER),
	);

	let threw = false;
	try {
		numberMinSafeInteger(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberMinValue", () => {
	runner.assert(numberMinValue(), types.createNumberNode(Number.MIN_VALUE));

	let threw = false;
	try {
		numberMinValue(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberNaN", () => {
	const nanNum = number_NaN();
	runner.assert(Number.isNaN(nanNum), true);

	let threw = false;
	try {
		number_NaN(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberNegativeInfinity", () => {
	runner.assert(
		numberNegativeInfinity(),
		types.createNumberNode(Number.NEGATIVE_INFINITY),
	);

	let threw = false;
	try {
		numberNegativeInfinity(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberPositiveInfinity", () => {
	runner.assert(
		numberPositiveInfinity(),
		types.createNumberNode(Number.POSITIVE_INFINITY),
	);

	let threw = false;
	try {
		numberPositiveInfinity(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("numberPrototypeToExponential", () => {
	runner.assert(
		numberPrototypeToExponential(types.createNumberNode(1)),
		types.createStringNode("1e+0"),
	);
	runner.assert(
		numberPrototypeToExponential(
			types.createNumberNode(1),
			types.createNumberNode(2),
		),
		types.createStringNode("1.00e+0"),
	);
});

runner.test("numberPrototypeToFixed", () => {
	runner.assert(
		numberPrototypeToFixed(types.createNumberNode(1)),
		types.createStringNode("1"),
	);
	runner.assert(
		numberPrototypeToFixed(
			types.createNumberNode(1.532),
			types.createNumberNode(2),
		),
		types.createStringNode("1.53"),
	);
});

runner.test("numberPrototypeToPrecision", () => {
	runner.assert(
		numberPrototypeToPrecision(types.createNumberNode(1)),
		types.createStringNode("1"),
	);
	runner.assert(
		numberPrototypeToPrecision(
			types.createNumberNode(1),
			types.createNumberNode(3),
		),
		types.createStringNode("1.00"),
	);
});

runner.test("numberPrototypeToString", () => {
	runner.assert(
		numberPrototypeToString(types.createNumberNode(120)),
		types.createStringNode("120"),
	);
	runner.assert(
		numberPrototypeToString(
			types.createNumberNode(120),
			types.createNumberNode(16),
		),
		types.createStringNode("78"),
	);
});

runner.report();
