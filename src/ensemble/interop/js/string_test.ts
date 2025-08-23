import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as stringFns from "./string.ts";

runner.test("stringFromCharCode - valid vector of numbers", () => {
	const astArgs = [
		types.createVectorNode([
			types.createNumberNode(97),
			types.createNumberNode(98),
			types.createNumberNode(99),
		]),
	];
	const result = stringFns.stringFromCharCode(astArgs);
	console.log(result);
	runner.assert(result, types.createStringNode("abc"));
});

runner.test("stringFromCharCode - empty vector", () => {
	const astArgs = [types.createVectorNode([])];
	const result = stringFns.stringFromCharCode(astArgs);
	runner.assert(result, types.createStringNode(""));
});

runner.test("stringFromCharCode - incorrect argument count", () => {
	let threw = false;
	try {
		stringFns.stringFromCharCode([]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringFromCharCode(
[			types.createVectorNode([]),
			types.createVectorNode([]),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringFromCharCode - incorrect argument type", () => {
	let threw = false;
	try {
		stringFns.stringFromCharCode([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringFromCharCode - non-number in vector", () => {
	let threw = false;
	try {
		stringFns.stringFromCharCode(
			[types.createVectorNode([types.createStringNode("a")])],
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringFromCharCode(
			[types.createVectorNode([
				types.createNumberNode(97),
				types.createStringNode("b"),
				types.createNumberNode(99),
			])],
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringFromCodePoint - valid code points", () => {
	const result = stringFns.stringFromCodePoint(
[		types.createNumberNode(97),
		types.createNumberNode(98),
		types.createNumberNode(99),]
	);
	runner.assert(result, types.createStringNode("abc"));
});

runner.test("stringFromCodePoint - non-number arguments", () => {
	let threw = false;
	try {
		stringFns.stringFromCodePoint([types.createStringNode("a")]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringAt - valid arguments", () => {
	const result = stringFns.stringAt(
[		types.createStringNode("abc"),
		types.createNumberNode(1),]
	);
	runner.assert(result, types.createStringNode("b"));
});

runner.test("stringAt - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringAt(
[			types.createStringNode("abc"),
			types.createStringNode("a"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringAt([types.createNumberNode(1), types.createNumberNode(0)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringCodePointAt - valid arguments", () => {
	const result = stringFns.stringCodePointAt(
[		types.createStringNode("abc"),
		types.createNumberNode(1),]
	);
	runner.assert(result, types.createNumberNode(98));
});

runner.test("stringCodePointAt - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringCodePointAt(
[			types.createStringNode("abc"),
			types.createStringNode("a"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringCodePointAt(
[			types.createNumberNode(1),
			types.createNumberNode(0),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringConcat - valid arguments", () => {
	const result = stringFns.stringConcat(
[		types.createStringNode("a"),
		types.createStringNode("b"),
		types.createStringNode("c"),]
	);
	runner.assert(result, types.createStringNode("abc"));
});

runner.test("stringConcat - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringConcat(
[			types.createStringNode("a"),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringConcat(
[			types.createNumberNode(1),
			types.createStringNode("a"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringEndsWith - valid arguments, with length", () => {
	const result = stringFns.stringEndsWith(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(4),]
	);
	runner.assert(result, types.createBooleanNode(false));
});

runner.test("stringEndsWith - valid arguments, without length", () => {
	const result = stringFns.stringEndsWith(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),]
	);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("stringEndsWith - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringEndsWith(
[			types.createStringNode("abc"),
			types.createNumberNode(0),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringEndsWith(
[			types.createNumberNode(1),
			types.createStringNode("abc"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringEndsWith(
[			types.createStringNode("abc"),
			types.createStringNode("search"),
			types.createStringNode("length"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringIncludes - valid arguments, with position", () => {
	const result = stringFns.stringIncludes(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(1),]
	);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("stringIncludes - valid arguments, without position", () => {
	const result = stringFns.stringIncludes(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),]
	);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("stringIncludes - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringIncludes(
[			types.createStringNode("abc"),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringIncludes(
[			types.createNumberNode(1),
			types.createStringNode("abc"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringIncludes(
[			types.createStringNode("abc"),
			types.createStringNode("search"),
			types.createStringNode("position"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringIndexOf - valid arguments, with position", () => {
	const result = stringFns.stringIndexOf(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(0),]
	);
	runner.assert(result, types.createNumberNode(0));
});

runner.test("stringIndexOf - valid arguments, without position", () => {
	const result = stringFns.stringIndexOf(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),]
	);
	runner.assert(result, types.createNumberNode(0));
});

runner.test("stringIndexOf - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringIndexOf(
[			types.createStringNode("abc"),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringIndexOf(
[			types.createNumberNode(1),
			types.createStringNode("abc"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringIsWellFormed - valid arguments", () => {
	const result = stringFns.stringIsWellFormed([types.createStringNode("abc")]);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("stringIsWellFormed - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringIsWellFormed([types.createNumberNode(1)]);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("stringLastIndexOf - valid arguments, with position", () => {
	const result = stringFns.stringLastIndexOf(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),
		types.createNumberNode(5),]
	);
	runner.assert(result, types.createNumberNode(3));
});

runner.test("stringLastIndexOf - valid arguments, without position", () => {
	const result = stringFns.stringLastIndexOf(
[		types.createStringNode("abcabc"),
		types.createStringNode("abc"),]
	);
	runner.assert(result, types.createNumberNode(3));
});

runner.test("stringLastIndexOf - invalid arguments", () => {
	let threw = false;
	try {
		stringFns.stringLastIndexOf(
[			types.createStringNode("abc"),
			types.createNumberNode(1),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		stringFns.stringLastIndexOf(
[			types.createNumberNode(1),
			types.createStringNode("abc"),]
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.report();
