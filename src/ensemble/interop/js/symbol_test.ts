import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import { symbolConstructor, symbolFor, symbolKeyFor } from "./symbol.ts";

runner.test("symbolConstructor - no description", () => {
	const result = symbolConstructor([]);
	runner.assert(types.isAtomNode(result), true);
	runner.assert(typeof result.value, "symbol");
});

runner.test("symbolConstructor - with description", () => {
	const description = types.createStringNode("test");
	const result = symbolConstructor([description]);

	runner.assert(types.isAtomNode(result), true);
	runner.assert(typeof result.value, "symbol");
	runner.assert(result.value.description, "test");
});

runner.test("symbolConstructor - invalid arguments", () => {
	let threw = false;
	try {
		symbolConstructor([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		symbolConstructor(
[			types.createStringNode("test"),
			types.createStringNode("test"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("symbolFor - basic functionality", () => {
	const key = types.createStringNode("test");
	const result = symbolFor([key]);
	runner.assert(types.isAtomNode(result), true);
	runner.assert(typeof result.value, "symbol");
	runner.assert(Symbol.keyFor(result.value), "test");
});

runner.test("symbolFor - invalid arguments", () => {
	let threw = false;
	try {
		symbolFor([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		symbolFor([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		symbolFor([types.createStringNode("test"), types.createStringNode("test")]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("symbolKeyFor - basic functionality", () => {
	const key = types.createStringNode("test");
	const sym = symbolFor([key]);
	const result = symbolKeyFor([sym]);

	runner.assert(types.isStringNode(result), true);
	runner.assert(result.value, "test");
});

runner.test("symbolKeyFor - global symbol", () => {
	const sym = types.createAtomNode(Symbol.for("test"));
	const result = symbolKeyFor([sym]);
	runner.assert(result.value, "test");
});

runner.test("symbolKeyFor - non-global symbol", () => {
	const sym = types.createAtomNode(Symbol("test"));
	const result = symbolKeyFor([sym]);
	runner.assert(types.isNilNode(result), true);
});

runner.test("symbolKeyFor - invalid arguments", () => {
	let threw = false;
	try {
		symbolKeyFor([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		symbolKeyFor([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		symbolKeyFor([types.createStringNode("test")]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		symbolKeyFor(
[			types.createStringNode("test"),
			types.createStringNode("test"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.report();
