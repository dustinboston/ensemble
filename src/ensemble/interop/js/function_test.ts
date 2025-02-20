import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import { apply, bind, call, jsEval } from "./function.ts";

// jsEval
// --------------------------------------------------------------------------------------------------------------------

runner.test("jsEval - evaluates a js expression", () => {
	const code = types.createStringNode("1 + 1");
	const result = jsEval(code);

	runner.assert(result, types.createNumberNode(2));
});

runner.test("jsEval - handles errors", () => {
	const code = types.createStringNode("invalid javascript");
	const result = jsEval(code);

	runner.assert(types.isErrorNode(result), true);
});

runner.test("jsEval - invalid arguments", () => {
	let threw = false;
	try {
		jsEval();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	const num = types.createNumberNode(0);
	threw = false;
	try {
		jsEval(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		jsEval(types.createStringNode(""), types.createStringNode(""));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// apply
// --------------------------------------------------------------------------------------------------------------------

runner.test("apply - basic functionality", () => {
	const fn = types.createFunctionNode((a: types.AstNode, b: types.AstNode) =>
		types.createNumberNode(a.value + b.value),
	);
	const args = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = apply(fn, args);

	runner.assert(result, types.createNumberNode(3));
});

runner.test("apply - invalid arguments", () => {
	const fn = types.createFunctionNode(() => types.createNilNode());
	const num = types.createNumberNode(1);

	let threw = false;
	try {
		apply();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		apply(fn);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		apply(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		apply(fn, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// call
// --------------------------------------------------------------------------------------------------------------------

runner.test("call - basic functionality", () => {
	const fn = types.createFunctionNode((a: types.AstNode, b: types.AstNode) =>
		types.createNumberNode(a.value + b.value),
	);
	const arg1 = types.createNumberNode(1);
	const arg2 = types.createNumberNode(2);
	const result = call(fn, arg1, arg2);

	runner.assert(result, types.createNumberNode(3));
});

runner.test("call - invalid arguments", () => {
	const num = types.createNumberNode(1);

	let threw = false;
	try {
		call();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		call(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// bind
// --------------------------------------------------------------------------------------------------------------------

runner.test("bind - basic functionality", () => {
	let counter = 0;
	const increment = () => {
		counter++;
		return types.createNumberNode(counter);
	};
	const fn = types.createFunctionNode(increment);
	const boundFn = bind(fn, fn); // The second argument can be any AstNode

	runner.assert(types.isFunctionNode(boundFn), true);
	runner.assert(boundFn.value(), types.createNumberNode(1)); // Call the bound function
	runner.assert(boundFn.value(), types.createNumberNode(2)); // counter should have incremented
});

runner.test("bind - invalid arguments", () => {
	const fn = types.createFunctionNode(() => types.createNilNode());
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		bind();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		bind(fn);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		bind(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});
