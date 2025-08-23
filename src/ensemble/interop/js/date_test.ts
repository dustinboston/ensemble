import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as dates from "./date.ts";

runner.test("newDate - no arguments", () => {
	const now = Date.now();
	const result = dates.newDate([]);
	runner.assert(types.isNumberNode(result), true);

	// Check that the result is a NumberNode representing a timestamp close to now.
	// We use a tolerance since some time passes between Date.now() and the function call.
	runner.assert(Math.abs(result.value - now) < 10, true); // Tolerance of 10ms
});

runner.test("newDate - with arguments", () => {
	const result = dates.newDate(
		[types.createNumberNode(2024),
		types.createNumberNode(0)],
	); // Jan 2024

	runner.assert(types.isNumberNode(result), true);
	runner.assert(new Date(result.value).getFullYear(), 2024);
	runner.assert(new Date(result.value).getMonth(), 0);
});

runner.test("now - returns current timestamp", () => {
	const before = Date.now();
	const result = dates.dateNow([]);
	const after = Date.now();

	runner.assert(types.isNumberNode(result), true);
	runner.assert(result.value >= before && result.value <= after, true);
});

runner.test("parse - valid date string", () => {
	const result = dates.dateParse(
		[types.createStringNode("2024-01-01T00:00:00.000Z"),]
	);
	runner.assert(types.isNumberNode(result), true);
	runner.assert(result.value, new Date("2024-01-01T00:00:00.000Z").getTime());
});

runner.test("parse - invalid date string", () => {
	const result = dates.dateParse([types.createStringNode("invalid date")]);
	runner.assert(types.isNumberNode(result), true);
	runner.assert(Number.isNaN(result.value), true);
});

runner.test("parse - invalid arguments", () => {
	let threw = false;
	try {
		dates.dateParse([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		dates.dateParse([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("utc - returns a timestamp", () => {
	const result = dates.dateUtc(
		[types.createNumberNode(2024),
		types.createNumberNode(0),
		types.createNumberNode(1)],
	);
	runner.assert(types.isNumberNode(result), true);
	runner.assert(result.value, Date.UTC(2024, 0, 1));
});

runner.test("utc - invalid arguments", () => {
	runner.assert(
		dates.dateUtc([types.createStringNode("s")]),
		types.createNilNode(),
	);
});

// Example for a getter
runner.test("getDate - valid date", () => {
	const date = new Date(2024, 0, 15);
	const timestamp = types.createNumberNode(date.getTime());

	const result = dates.dateGetDate([timestamp]);
	runner.assert(result, types.createNumberNode(15));
});

runner.test("getDate - invalid arguments", () => {
	let threw = false;
	try {
		dates.dateGetDate([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		dates.dateGetDate([types.createStringNode("test")]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// Example for a setter
runner.test("setDate - valid date", () => {
	const date = new Date(2024, 0, 15);
	const timestamp = types.createNumberNode(date.getTime());
	const newDay = types.createNumberNode(20);

	const result = dates.dateSetDate([timestamp, newDay]);
	runner.assert(new Date(result.value).getDate(), 20);
});

runner.test("setDate - invalid arguments", () => {
	let threw = false;
	try {
		dates.dateSetDate([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		dates.dateSetDate([types.createStringNode("test")]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// toJSON
runner.test("toJSON - returns ISO string", () => {
	const timestamp = types.createNumberNode(
		new Date("2024-01-01T12:00:00Z").getTime(),
	);
	const result = dates.dateToJSON([timestamp]);

	runner.assert(types.isStringNode(result), true);
	runner.assert(result.value, "2024-01-01T12:00:00.000Z");
});

runner.report();
