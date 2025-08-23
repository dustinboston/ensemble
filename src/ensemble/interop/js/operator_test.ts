import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as operators from "./operator.ts";

// and
runner.test("and", () => {
	runner.assert(
		operators.and([types.createBooleanNode(true), types.createBooleanNode(true)]),
		types.createBooleanNode(true),
	);
	runner.assert(
		operators.and(
[			types.createBooleanNode(true),
			types.createBooleanNode(false),]
		),
		types.createBooleanNode(false),
	);
	runner.assert(
		operators.and([types.createNumberNode(1), types.createNumberNode(0)]),
		types.createBooleanNode(false),
	);
});

// bitwiseAnd
runner.test("bitwiseAnd", () => {
	runner.assert(
		operators.bitwiseAnd([types.createNumberNode(5), types.createNumberNode(3)]),
		types.createNumberNode(1),
	);

	let threw = false;
	try {
		operators.bitwiseAnd(
[			types.createStringNode("test"),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// bitwiseNot
runner.test("bitwiseNot", () => {
	runner.assert(
		operators.bitwiseNot([types.createNumberNode(5)]),
		types.createNumberNode(~5),
	);

	let threw = false;
	try {
		operators.bitwiseNot([types.createStringNode("test")]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// bitwiseOr
runner.test("bitwiseOr", () => {
	runner.assert(
		operators.bitwiseOr([types.createNumberNode(1), types.createNumberNode(2)]),
		types.createNumberNode(3),
	);

	let threw = false;
	try {
		operators.bitwiseOr(
[			types.createStringNode("test"),
			types.createNumberNode(0),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// bitwiseXor
runner.test("bitwiseXor", () => {
	runner.assert(
		operators.bitwiseXor([types.createNumberNode(1), types.createNumberNode(3)]),
		types.createNumberNode(2),
	);

	let threw = false;
	try {
		operators.bitwiseXor(
[			types.createStringNode("test"),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// decrement
runner.test("decrement", () => {
	runner.assert(
		operators.decrement([types.createNumberNode(2)]),
		types.createVectorNode([
			types.createNumberNode(1),
			types.createNumberNode(2),
		]),
	);
	runner.assert(
		operators.decrement(
[			types.createNumberNode(2),
			types.createStringNode("prefix")],
		),
		types.createVectorNode([
			types.createNumberNode(1),
			types.createNumberNode(1),
		]),
	);

	let threw = false;
	try {
		operators.decrement(
[			types.createNumberNode(1),
			types.createStringNode("asdf"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// increment
runner.test("increment", () => {
	runner.assert(
		operators.increment([types.createNumberNode(1)]),
		types.createVectorNode([
			types.createNumberNode(2),
			types.createNumberNode(1),
		]),
	);
	runner.assert(
		operators.increment(
[			types.createNumberNode(1),
			types.createStringNode("prefix"),]
		),
		types.createVectorNode([
			types.createNumberNode(2),
			types.createNumberNode(2),
		]),
	);

	let threw = false;
	try {
		operators.increment(
[			types.createNumberNode(1),
			types.createStringNode("asdf"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// instanceOf
runner.test("instanceOf", () => {
	const num = types.createNumberNode(1);
	const str = types.createStringNode("");

	runner.assert(
		operators.instanceOf([num, types.createStringNode("NumberNode")]),
		types.createBooleanNode(true),
	);
	runner.assert(
		operators.instanceOf([str, types.createStringNode("StringNode")]),
		types.createBooleanNode(true),
	);
	runner.assert(
		operators.instanceOf([num, types.createStringNode("StringNode")]),
		types.createBooleanNode(false),
	);

	let threw = false;
	try {
		operators.instanceOf([num, types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// leftShift
runner.test("leftShift", () => {
	runner.assert(
		operators.leftShift([types.createNumberNode(1), types.createNumberNode(2)]),
		types.createNumberNode(4),
	);

	let threw = false;
	try {
		operators.leftShift([types.createStringNode(""), types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// not
runner.test("not", () => {
	runner.assert(
		operators.not([types.createBooleanNode(false)]),
		types.createBooleanNode(true),
	);
});

// notEqualTo
runner.test("notEqualTo", () => {
	runner.assert(
		operators.notEqualTo([types.createNumberNode(1), types.createNumberNode(1)]),
		types.createBooleanNode(false),
	);

	runner.assert(
		operators.notEqualTo([types.createNumberNode(1), types.createNumberNode(2)]),
		types.createBooleanNode(true),
	);
});

// nullishCoalesce
runner.test("nullishCoalescing", () => {
	runner.assert(
		operators.nullishCoalesce([types.createNilNode(), types.createNumberNode(5)]),
		types.createNumberNode(5),
	);
	runner.assert(
		operators.nullishCoalesce(
[			types.createNumberNode(1),
			types.createNumberNode(5),]
		),
		types.createNumberNode(1),
	);
});

// or
runner.test("or", () => {
	runner.assert(
		operators.or([types.createBooleanNode(false), types.createBooleanNode(true)]),
		types.createBooleanNode(true),
	);

	runner.assert(
		operators.or(
[			types.createBooleanNode(false),
			types.createBooleanNode(false),]
		),
		types.createBooleanNode(false),
	);
	runner.assert(
		operators.or([types.createNumberNode(0), types.createNumberNode(1)]),
		types.createBooleanNode(true),
	);
});

// power
runner.test("power", () => {
	runner.assert(
		operators.power([types.createNumberNode(3), types.createNumberNode(2)]),
		types.createNumberNode(9),
	);

	let threw = false;
	try {
		operators.power([types.createStringNode(""), types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// remainder
runner.test("remainder", () => {
	runner.assert(
		operators.remainder([types.createNumberNode(5), types.createNumberNode(2)]),
		types.createNumberNode(1),
	);

	let threw = false;
	try {
		operators.remainder([types.createStringNode(""), types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// rightShift
runner.test("rightShift", () => {
	runner.assert(
		operators.rightShift([types.createNumberNode(5), types.createNumberNode(1)]),
		types.createNumberNode(2),
	);

	let threw = false;
	try {
		operators.rightShift([types.createStringNode(""), types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});
// typeOf

runner.test("typeOf", () => {
	const num = types.createNumberNode(1);

	runner.assert(
		operators.typeOf([num, types.createStringNode("number")]),
		types.createBooleanNode(true),
	);
	runner.assert(
		operators.typeOf([num, types.createStringNode("string")]),
		types.createBooleanNode(false),
	);
});

// unsignedRightShift
runner.test("unsignedRightShift", () => {
	runner.assert(
		operators.unsignedRightShift(
[			types.createNumberNode(5),
			types.createNumberNode(1),]
		),
		types.createNumberNode(2),
	);

	let threw = false;
	try {
		operators.unsignedRightShift(
[			types.createStringNode(""),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.report();
