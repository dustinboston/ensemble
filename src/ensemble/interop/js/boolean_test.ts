import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as bool from "./boolean.ts";

runner.test("toBoolean - truthy values", () => {
	const values = [
		types.createNumberNode(1),
		types.createStringNode("hello"),
		types.createVectorNode([types.createNumberNode(1)]), // Non-empty vector
		types.createListNode([types.createNumberNode(1)]),
		types.createMapNode(new Map([["a", types.createNumberNode(1)]])), // Non-empty map
	];

	for (const val of values) {
		runner.assert(bool.toBoolean(val), types.createBooleanNode(true));
	}
});

runner.test("toBoolean - falsy values", () => {
	const values = [
		types.createNumberNode(0),
		types.createStringNode(""),
		types.createNilNode(),
		types.createBooleanNode(false),
	];
	for (const val of values) {
		runner.assert(bool.toBoolean(val), types.createBooleanNode(false));
	}
});

runner.test("toBoolean - invalid arguments", () => {
	let threw = false;
	try {
		bool.toBoolean();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		bool.toBoolean(types.createNumberNode(1), types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.report();
