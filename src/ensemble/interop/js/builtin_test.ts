import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as builtin from "./builtin.ts";

runner.test("globalDecodeURI - basic functionality", () => {
	const uri = types.createStringNode("https://example.com/test%20uri");
	const result = builtin.globalDecodeUri(uri);
	runner.assert(result, types.createStringNode("https://example.com/test uri"));
});

runner.test("globalDecodeURI - invalid arguments", () => {
	let threw = false;
	try {
		builtin.globalDecodeUri();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalDecodeUri(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalDecodeUri(
			types.createStringNode("test"),
			types.createStringNode("test"),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("globalDecodeURIComponent - basic functionality", () => {
	const uri = types.createStringNode("test%20uri");
	const result = builtin.globalDecodeUriComponent(uri);
	runner.assert(result, types.createStringNode("test uri"));
});

runner.test("globalDecodeURIComponent - invalid arguments", () => {
	let threw = false;
	try {
		builtin.globalDecodeUriComponent();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalDecodeUriComponent(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalDecodeUriComponent(
			types.createStringNode("test"),
			types.createStringNode("test"),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("globalEncodeURI - basic functionality", () => {
	const uri = types.createStringNode("https://example.com/test uri");
	const result = builtin.globalEncodeUri(uri);

	runner.assert(
		result,
		types.createStringNode("https://example.com/test%20uri"),
	);
});

runner.test("globalEncodeURI - invalid arguments", () => {
	let threw = false;
	try {
		builtin.globalEncodeUri();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalEncodeUri(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalEncodeUri(
			types.createStringNode("test"),
			types.createStringNode("test"),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});
runner.test("globalEncodeURIComponent - basic functionality", () => {
	const uri = types.createStringNode("test uri");

	const result = builtin.globalEncodeUriComponent(uri);
	runner.assert(result, types.createStringNode("test%20uri"));
});

runner.test("globalEncodeURIComponent - invalid arguments", () => {
	let threw = false;
	try {
		builtin.globalEncodeUriComponent();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalEncodeUriComponent(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		builtin.globalEncodeUriComponent(
			types.createStringNode("test"),
			types.createStringNode("test"),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});
