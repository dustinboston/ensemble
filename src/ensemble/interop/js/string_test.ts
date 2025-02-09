import { assertEquals, assertThrows, test } from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as stringFns from "./string.ts";

test("stringFromCharCode - valid vector of numbers", () => {
	const astArgs = [
		types.createVectorNode([
			types.createNumberNode(97),
			types.createNumberNode(98),
			types.createNumberNode(99),
		]),
	];
	const result = stringFns.stringFromCharCode(...astArgs);
	console.log(result);
	assertEquals(result, types.createStringNode("abc"));
});

test("stringFromCharCode - empty vector", () => {
	const astArgs = [types.createVectorNode([])];
	const result = stringFns.stringFromCharCode(...astArgs);
	assertEquals(result, types.createStringNode(""));
});

test("stringFromCharCode - incorrect argument count", () => {
	assertThrows(
		() => stringFns.stringFromCharCode(),
		Error,
		"Wanted 1 arguments but got 0",
	);
	assertThrows(
		() =>
			stringFns.stringFromCharCode(
				types.createVectorNode([]),
				types.createVectorNode([]),
			),
		Error,
		"Wanted 1 arguments but got 2",
	);
});

test("stringFromCharCode - incorrect argument type", () => {
	assertThrows(
		() => stringFns.stringFromCharCode(types.createNumberNode(1)),
		TypeError,
	);
});

test("stringFromCharCode - non-number in vector", () => {
	assertThrows(
		() =>
			stringFns.stringFromCharCode(
				types.createVectorNode([types.createStringNode("a")]),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringFromCharCode(
				types.createVectorNode([
					types.createNumberNode(97),
					types.createStringNode("b"),
					types.createNumberNode(99),
				]),
			),
		TypeError,
	);
});

test("stringFromCodePoint - valid code points", () => {
	const result = stringFns.stringFromCodePoint(
		types.createNumberNode(97),
		types.createNumberNode(98),
		types.createNumberNode(99),
	);
	assertEquals(result, types.createStringNode("abc"));
});

test("stringFromCodePoint - non-number arguments", () => {
	assertThrows(
		() => stringFns.stringFromCodePoint(types.createStringNode("a")),
		TypeError,
	);
});

test("stringAt - valid arguments", () => {
	const result = stringFns.stringAt(
		types.createStringNode("abc"),
		types.createNumberNode(1),
	);
	assertEquals(result, types.createStringNode("b"));
});

test("stringAt - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringAt(
				types.createStringNode("abc"),
				types.createStringNode("a"),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringAt(types.createNumberNode(1), types.createNumberNode(0)),
		TypeError,
	);
});

test("stringCodePointAt - valid arguments", () => {
	const result = stringFns.stringCodePointAt(
		types.createStringNode("abc"),
		types.createNumberNode(1),
	);
	assertEquals(result, types.createNumberNode(98));
});

test("stringCodePointAt - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringCodePointAt(
				types.createStringNode("abc"),
				types.createStringNode("a"),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringCodePointAt(
				types.createNumberNode(1),
				types.createNumberNode(0),
			),
		TypeError,
	);
});

test("stringConcat - valid arguments", () => {
	const result = stringFns.stringConcat(
		types.createStringNode("a"),
		types.createStringNode("b"),
		types.createStringNode("c"),
	);
	assertEquals(result, types.createStringNode("abc"));
});

test("stringConcat - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringConcat(
				types.createStringNode("a"),
				types.createNumberNode(1),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringConcat(
				types.createNumberNode(1),
				types.createStringNode("a"),
			),
		TypeError,
	);
});

test("stringEndsWith - valid arguments, with length", () => {
	const result = stringFns.stringEndsWith(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(4),
	);
	assertEquals(result, types.createBooleanNode(false));
});

test("stringEndsWith - valid arguments, without length", () => {
	const result = stringFns.stringEndsWith(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
	);
	assertEquals(result, types.createBooleanNode(true));
});

test("stringEndsWith - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringEndsWith(
				types.createStringNode("abc"),
				types.createNumberNode(0),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringEndsWith(
				types.createNumberNode(1),
				types.createStringNode("abc"),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringEndsWith(
				types.createStringNode("abc"),
				types.createStringNode("search"),
				types.createStringNode("length"),
			),
		TypeError,
	);
});

test("stringIncludes - valid arguments, with position", () => {
	const result = stringFns.stringIncludes(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(1),
	);
	assertEquals(result, types.createBooleanNode(true));
});

test("stringIncludes - valid arguments, without position", () => {
	const result = stringFns.stringIncludes(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
	);
	assertEquals(result, types.createBooleanNode(true));
});

test("stringIncludes - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringIncludes(
				types.createStringNode("abc"),
				types.createNumberNode(1),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringIncludes(
				types.createNumberNode(1),
				types.createStringNode("abc"),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringIncludes(
				types.createStringNode("abc"),
				types.createStringNode("search"),
				types.createStringNode("position"),
			),
		TypeError,
	);
});

test("stringIndexOf - valid arguments, with position", () => {
	const result = stringFns.stringIndexOf(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(0),
	);
	assertEquals(result, types.createNumberNode(0));
});

test("stringIndexOf - valid arguments, without position", () => {
	const result = stringFns.stringIndexOf(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
	);
	assertEquals(result, types.createNumberNode(0));
});

test("stringIndexOf - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringIndexOf(
				types.createStringNode("abc"),
				types.createNumberNode(1),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringIndexOf(
				types.createNumberNode(1),
				types.createStringNode("abc"),
			),
		TypeError,
	);
});

test("stringIsWellFormed - valid arguments", () => {
	const result = stringFns.stringIsWellFormed(types.createStringNode("abc"));
	assertEquals(result, types.createBooleanNode(true));
});

test("stringIsWellFormed - invalid arguments", () => {
	assertThrows(
		() => stringFns.stringIsWellFormed(types.createNumberNode(1)),
		TypeError,
	);
});

test("stringLastIndexOf - valid arguments, with position", () => {
	const result = stringFns.stringLastIndexOf(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(5),
	);
	assertEquals(result, types.createNumberNode(3));
});

test("stringLastIndexOf - valid arguments, without position", () => {
	const result = stringFns.stringLastIndexOf(
		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
	);
	assertEquals(result, types.createNumberNode(3));
});

test("stringLastIndexOf - invalid arguments", () => {
	assertThrows(
		() =>
			stringFns.stringLastIndexOf(
				types.createStringNode("abc"),
				types.createNumberNode(1),
			),
		TypeError,
	);
	assertThrows(
		() =>
			stringFns.stringLastIndexOf(
				types.createNumberNode(1),
				types.createStringNode("abc"),
			),
		TypeError,
	);
});
