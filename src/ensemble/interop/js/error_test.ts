import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import { getCause, getMessage, getName, newError } from "./error.ts";

runner.test("newError - one argument", () => {
	const message = types.createStringNode("test error");
	const result = newError([message]);

	types.assertErrorNode(result);

	runner.assert(result.value.value, "test error");
	runner.assert(result.name.value, "Error"); // Default name
	runner.assert(types.isNilNode(getCause([result])), true); // No cause
});

runner.test("newError - two arguments", () => {
	const message = types.createStringNode("test error");
	const name = types.createStringNode("TypeError");
	const result = newError([message, name]);

	types.assertErrorNode(result);
	runner.assert(result.value.value, "test error");
	runner.assert(result.name.value, "TypeError");
	runner.assert(types.isNilNode(getCause([result])), true); // No cause
});

runner.test("newError - three arguments", () => {
	const message = types.createStringNode("test error");
	const name = types.createStringNode("TypeError");
	const cause = types.createStringNode("Something went wrong");

	const result = newError([message, name, cause]);

	types.assertErrorNode(result);
	runner.assert(result.value.value, "test error");
	runner.assert(result.name.value, "TypeError");
	runner.assert(getCause([result]), cause);
});

runner.test("newError - invalid arguments", () => {
	const num = types.createNumberNode(1);
	const message = types.createStringNode("test error");

	let threw = false;
	try {
		newError([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		newError([num]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		newError([message, num]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("getMessage - basic functionality", () => {
	const message = types.createStringNode("test error");
	const error = newError([message]);

	const result = getMessage([error]);
	runner.assert(result, message);
});

runner.test("getMessage - invalid arguments", () => {
	let threw = false;
	try {
		getMessage([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	const num = types.createNumberNode(1);
	threw = false;
	try {
		getMessage([num]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("getCause - with cause", () => {
	const message = types.createStringNode("test error");
	const cause = types.createNumberNode(1);
	const error = newError([message, types.createNilNode(), cause]);

	const result = getCause([error]);
	runner.assert(result, cause);
});

runner.test("getCause - without cause", () => {
	const message = types.createStringNode("test error");
	const error = newError([message]);

	const result = getCause([error]);
	runner.assert(types.isNilNode(result), true);
});

runner.test("getCause - invalid arguments", () => {
	let threw = false;
	try {
		getCause([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		getCause([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("getName - basic functionality", () => {
	const message = types.createStringNode("test error");
	const name = types.createStringNode("TypeError");
	const error = newError([message, name]);

	const result = getName([error]);
	runner.assert(result, name);
});

runner.test("getName - default name", () => {
	const message = types.createStringNode("test error");

	const error = newError([message]);
	const result = getName([error]);
	runner.assert(result.value, "Error");
});

runner.test("getName - invalid arguments", () => {
	let threw = false;
	try {
		getName([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		getName([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.report();
