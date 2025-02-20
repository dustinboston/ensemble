import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as fns from "./regexp.ts";

const { createRegExp } = fns;

// Basic RegExp test
runner.test("RegExp.new: new RegExp should return an Atom", () => {
	const regexp = createRegExp("^[a-z]$");
	runner.assert(true, types.isAtomNode(regexp));
	runner.assert(true, regexp.value instanceof RegExp);
});

runner.test(
	"RegExp.new: Takes a regular expression string as the first argument",
	() => {
		const regexp = createRegExp("abc");
		runner.assert(true, types.isAtomNode(regexp));
		runner.assert(true, regexp.value instanceof RegExp);
		runner.assert(regexp.value.source, "abc");
	},
);

runner.test("RegExp.new: Accepts flags as the second argument", () => {
	const regexp = createRegExp("abc", "i");
	runner.assert(true, types.isAtomNode(regexp));
	runner.assert(true, regexp.value instanceof RegExp);
	runner.assert(regexp.value.source, "abc");
	runner.assert(regexp.value.flags, "i");
});

runner.test("RegExp.new: Throws with zero arguments", () => {
	let threw = false;
	try {
		fns.newRegExp();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("RegExp.new: Throws if first arg isn't a string", () => {
	let threw = false;
	try {
		fns.createRegExp(123 as unknown as string);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("RegExp.new: Throws if second arg isn't a string", () => {
	let threw = false;
	try {
		fns.createRegExp("abc", 123 as unknown as string);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("execRegExp: Result is null", () => {
	const regexp = createRegExp("abc");
	const stringValue = types.createStringNode("def");
	const result = fns.execRegExp(regexp, stringValue);
	runner.assert(true, types.isNilNode(result));
});

runner.test("execRegExp: Result is not null", () => {
	const regexp = createRegExp("abc");
	const stringValue = types.createStringNode("abcdef");
	const result = fns.execRegExp(regexp, stringValue);

	runner.assert(true, types.isVectorNode(result));
	runner.assert(result.value.length, 1);
	runner.assert(types.isSymbolNode(result.value[0]), true);
	runner.assert(result.value[0].value, "abc");
});

runner.test("execRegExp: Result has groups", () => {
	const regexp = createRegExp("a(b)c");
	const stringValue = types.createStringNode("abcdef");
	const result = fns.execRegExp(regexp, stringValue);

	runner.assert(true, types.isVectorNode(result));
	runner.assert(result.value.length, 2);
	runner.assert(types.isSymbolNode(result.value[0]), true);
	runner.assert(result.value[0].value, "abc");
	runner.assert(types.isSymbolNode(result.value[1]), true);
	runner.assert(result.value[1].value, "b");
});

runner.test("execRegExp: Result is not null with global flag", () => {
	const regexp = createRegExp("a(b)c", "g");
	const stringValue = types.createStringNode("abcdef,abc");
	const result = fns.execRegExp(regexp, stringValue);

	runner.assert(true, types.isVectorNode(result));
	runner.assert(result.value.length, 2);
});

runner.test("regExpPrototypeTest: returns true for match", () => {
	const regexp = createRegExp("abc");
	const stringValue = types.createStringNode("abc");
	const result = fns.testRegExp(regexp, stringValue);
	runner.assert(true, types.isBooleanNode(result));
	runner.assert(result.value, true);
});

runner.test("regExpPrototypeTest: returns false for no match", () => {
	const regexp = createRegExp("abc");
	const stringValue = types.createStringNode("def");
	const result = fns.testRegExp(regexp, stringValue);
	runner.assert(true, types.isBooleanNode(result));
	runner.assert(result.value, false);
});

runner.test(
	"regExpPrototypeTest: throws if first arg is not an AstNode",
	() => {
		const regexp = /abc/;
		const stringValue = types.createStringNode("abc");

		let threw = false;
		try {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			fns.testRegExp(regexp as any, stringValue);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"regExpPrototypeTest: throws if second arg is not a string node",
	() => {
		const regexp = types.createAtomNode(/abc/);
		const stringValue = 123;

		let threw = false;
		try {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			fns.testRegExp(regexp, stringValue as any);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("regExpPrototypeTest: throws if wrong number of args", () => {
	const regexp = fns.createRegExp("abc");
	const stringValue = types.createStringNode("abc");

	let threw = false;
	try {
		fns.testRegExp(regexp);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		fns.testRegExp(regexp, stringValue, regexp);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});
