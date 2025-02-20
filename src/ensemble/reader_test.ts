import { printString } from "./printer.ts";
import {
	Reader,
	readAtom,
	readForm,
	readSequence,
	readString,
	tokenize,
	unescapeString,
} from "./reader.ts";
import runner from "./tests/test_runner.ts";
import {
	assertDefined,
	createBooleanNode,
	createKeywordNode,
	createListNode,
	createMapNode,
	createNilNode,
	createNumberNode,
	createStringNode,
	createSymbolNode,
	createVectorNode,
} from "./types.ts";

runner.test("tokenize(): empty string as last token for valid input", () => {
	runner.assert(tokenize("+"), ["+"]);
});

runner.test("tokenize(): empty string as last token for invalid input", () => {
	runner.assert(tokenize('"bad'), ['"bad']);
});

runner.test("tokenize(): empty string as last token for lonely quotes", () => {
	runner.assert(tokenize("`"), ["`"]);
});

runner.test("tokenize(): should tokenize after comments", () => {
	runner.assert(tokenize(";; comment\n(+ 1 2)"), ["(", "+", "1", "2", ")"]);
});

runner.test("tokenize(): vector with nested list", () => {
	runner.assert(tokenize("[1 2 (+ 1 2)]"), [
		"[",
		"1",
		"2",
		"(",
		"+",
		"1",
		"2",
		")",
		"]",
	]);
});

runner.test("tokenize(): map with nested list", () => {
	runner.assert(tokenize('{"a" (+ 7 8)}'), [
		"{",
		'"a"',
		"(",
		"+",
		"7",
		"8",
		")",
		"}",
	]);
});

runner.test("tokenize(): should tokenize complex nested expressions", () => {
	runner.assert(tokenize("(/ (- (+ 515 (* -87 311)) 296) 27)"), [
		"(",
		"/",
		"(",
		"-",
		"(",
		"+",
		"515",
		"(",
		"*",
		"-87",
		"311",
		")",
		")",
		"296",
		")",
		"27",
		")",
	]);
});

runner.test(
	"tokenize(): should tokenize strings with special characters",
	() => {
		runner.assert(tokenize('"string with space"'), ['"string with space"']);
	},
);

runner.test("tokenize(): should tokenize strings with escaped quotes", () => {
	runner.assert(tokenize('"string with \\"escaped\\" quotes"'), [
		'"string with \\"escaped\\" quotes"',
	]);
});

runner.test("tokenize(): should tokenize double characters", () => {
	runner.assert(tokenize("~@"), ["~@"]);
});

runner.test("tokenize(): should tokenize special characters", () => {
	runner.assert(tokenize("`"), ["`"]);
});

runner.test("tokenize(): should tokenize lonely quotes", () => {
	runner.assert(tokenize("'"), ["'"]);
});

runner.test("tokenize(): should filter out comments", () => {
	runner.assert(tokenize(";; single line\n(+ 1 2)"), ["(", "+", "1", "2", ")"]);
});

runner.test("tokenize(): should filter out trailing comments", () => {
	runner.assert(tokenize("(+ 1 2) ;; trailing"), ["(", "+", "1", "2", ")"]);
});

runner.test("Reader: should navigate through tokens using next method", () => {
	const rdr = new Reader(["(", "+", "1", "2", ")"]);

	runner.assert(rdr.next(), "(");
	runner.assert(rdr.next(), "+");
	runner.assert(rdr.next(), "1");
	runner.assert(rdr.next(), "2");
	runner.assert(rdr.next(), ")");
});

runner.test(
	"Reader: should return undefined when there are no more tokens",
	() => {
		const rdr = new Reader(["(", "2", ")"]);

		runner.assert(rdr.next(), "(");
		runner.assert(rdr.next(), "2");
		runner.assert(rdr.next(), ")");
		runner.assert(rdr.next(), undefined);
	},
);

runner.test(
	"Reader: should peek at the current token without advancing",
	() => {
		const rdr = new Reader(["(", "+", "1", "2", ")"]);
		runner.assert(rdr.peek(), "(");
		runner.assert(rdr.next(), "(");
		runner.assert(rdr.peek(), "+");
		runner.assert(rdr.next(), "+");
		runner.assert(rdr.peek(), "1");
	},
);

runner.test(
	"Reader: should not have the ability to peek at the previous token",
	() => {
		const rdr = new Reader(["(", "+", ")"]);

		runner.assert(rdr.next(), "(");
		runner.assert(rdr.next(), "+");
		runner.assert(rdr.next(), ")");
		runner.assert(rdr.next(), undefined); // Moves out-of-bounds
	},
);

runner.test("Reader: should check if it is the last token", () => {
	const rdr = new Reader(["(", "1", "2", ")"]);
	assertDefined(rdr.peek());
	runner.assert(rdr.next(), "(");
	runner.assert(rdr.next(), "1");
	runner.assert(rdr.next(), "2");
	assertDefined(rdr.peek());
	runner.assert(rdr.next(), ")");
	runner.assert(rdr.peek(), undefined);
});

runner.test("Reader: should handle empty tokens array", () => {
	const rdr = new Reader([]);
	runner.assert(rdr.peek(), undefined);
	runner.assert(rdr.next(), undefined); // Out of bounds
});

runner.test("readForm(): should throw EOF for undefined token", () => {
	const rdr = new Reader([]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should read and return a 'quote' form", () => {
	const rdr = new Reader(["'", "symbol"]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createListNode([createSymbolNode("quote"), createSymbolNode("symbol")]),
	);
});

runner.test("readForm(): should read and return a 'quasiquote' form", () => {
	const rdr = new Reader(["`", "symbol"]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createListNode([
			createSymbolNode("quasiquote"),
			createSymbolNode("symbol"),
		]),
	);
});

runner.test("readForm(): should read and return an 'unquote' form", () => {
	const rdr = new Reader(["~", "symbol"]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createListNode([createSymbolNode("unquote"), createSymbolNode("symbol")]),
	);
});

runner.test(
	"readForm(): should read and return a 'splice-unquote' form",
	() => {
		const rdr = new Reader(["~@", "symbol"]);
		const result = readForm(rdr);
		runner.assert(
			result,
			createListNode([
				createSymbolNode("splice-unquote"),
				createSymbolNode("symbol"),
			]),
		);
	},
);

runner.test("readForm(): should read and return a 'with-meta' form", () => {
	const rdr = new Reader(["^", "meta", "symbol"]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createListNode([
			createSymbolNode("with-meta"),
			createSymbolNode("symbol"),
			createSymbolNode("meta"),
		]),
	);
});

runner.test("readForm(): should read and return a 'deref' form", () => {
	const rdr = new Reader(["@", "symbol"]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createListNode([createSymbolNode("deref"), createSymbolNode("symbol")]),
	);
});

runner.test("readForm(): should throw for lonely quote (')", () => {
	const rdr = new Reader(["'"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw for lonely quasiquote (`)", () => {
	const rdr = new Reader(["`"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw for lonely unquote (~)", () => {
	const rdr = new Reader(["~"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw for lonely splice-unquote (~@)", () => {
	const rdr = new Reader(["~@"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw for lonely with-meta (^)", () => {
	const rdr = new Reader(["^"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw for lonely deref (@)", () => {
	const rdr = new Reader(["@"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw error for unexpected ')'", () => {
	const rdr = new Reader([")"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw error for unexpected ']'", () => {
	const rdr = new Reader(["]"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should throw error for unexpected '}'", () => {
	const rdr = new Reader(["}"]);
	let threw = false;
	try {
		readForm(rdr);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readForm(): should read and return a List for '('", () => {
	const rdr = new Reader(["(", "symbol1", "symbol2", ")", ""]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createListNode([createSymbolNode("symbol1"), createSymbolNode("symbol2")]),
	);
});

runner.test("readForm(): should read and return a Vec for '['", () => {
	const rdr = new Reader(["[", "symbol1", "symbol2", "]", ""]);
	const result = readForm(rdr);
	runner.assert(
		result,
		createVectorNode([
			createSymbolNode("symbol1"),
			createSymbolNode("symbol2"),
		]),
	);
});

runner.test("readForm(): should read and return a map for '{'", () => {
	const rdr = new Reader(["{", "key1", "value1", "key2", "value2", "}", ""]);
	const result = readForm(rdr);
	const map = createMapNode();
	map.value.set("key1", createSymbolNode("value1"));
	map.value.set("key2", createSymbolNode("value2"));
	runner.assert(result, map);
});

runner.test("readForm(): should read a symbol", () => {
	const rdr = new Reader(["symbol"]);
	const result = readForm(rdr);
	runner.assert(result, createSymbolNode("symbol"));
});

runner.test(
	'readAtom(): should throw "unexpected EOF" error for undefined token',
	() => {
		const rdr = new Reader([]);
		let threw = false;
		try {
			readAtom(rdr);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test('readAtom(): should return nil type for "nil" token', () => {
	const rdr = new Reader(["nil"]);
	const result = readAtom(rdr);
	runner.assert(result, createNilNode());
});

runner.test(
	'readAtom(): should return boolean type false for "false" token',
	() => {
		const rdr = new Reader(["false"]);
		const result = readAtom(rdr);
		runner.assert(result, createBooleanNode(false));
	},
);

runner.test(
	'readAtom(): should return boolean type true for "true" token',
	() => {
		const rdr = new Reader(["true"]);
		const result = readAtom(rdr);
		runner.assert(result, createBooleanNode(true));
	},
);

runner.test("readAtom(): should return number type for number token", () => {
	const rdr = new Reader(["123"]);
	const result = readAtom(rdr);
	runner.assert(result, createNumberNode(123));
});

runner.test("readAtom(): should return string type for string token", () => {
	const rdr = new Reader(['"hello"']);
	const result = readAtom(rdr);
	runner.assert(result, createStringNode("hello"));
});

runner.test("readAtom(): should return keyword type for keyword token", () => {
	const rdr = new Reader(["keyword:"]);
	const result = readAtom(rdr);
	runner.assert(result, createKeywordNode("keyword:"));
});

runner.test(
	"readAtom(): should throw error for unfinished string token",
	() => {
		const rdr = new Reader(['"unfinished']);
		let threw = false;
		try {
			readAtom(rdr);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("readAtom(): should return symbol type for symbol token", () => {
	const rdr = new Reader(["symbol"]);
	const result = readAtom(rdr);
	runner.assert(result, createSymbolNode("symbol"));
});

runner.test(
	"unescapeString(): should remove leading and trailing quotes",
	() => {
		runner.assert(unescapeString('"hello world"'), "hello world");
	},
);

runner.test(
	"unescapeString(): should replace \\n with newline character",
	() => {
		runner.assert(unescapeString('"hello\\nworld"'), "hello\nworld");
	},
);

runner.test("unescapeString(): should unescape escaped quotes", () => {
	runner.assert(unescapeString('"hello\\"world"'), 'hello"world');
});

runner.test("unescapeString(): should unescape escaped backslashes", () => {
	runner.assert(unescapeString('"hello\\\\world"'), "hello\\world");
});

runner.test("unescapeString(): should handle empty strings", () => {
	runner.assert(unescapeString(""), "");
});

runner.test(
	"unescapeString(): should handle strings with only escaped characters",
	() => {
		runner.assert(unescapeString('"\\\\\\"\\""'), '\\""');
	},
);

runner.test(
	"unescapeString(): should return original string if no escapable chars are found",
	() => {
		runner.assert(unescapeString('"abc123"'), "abc123");
	},
);

runner.test(
	"unescapeString(): should handle multiple escaped characters in sequence",
	() => {
		runner.assert(unescapeString('"\\\\\\n\\\\"'), "\\\n\\");
	},
);

runner.test(
	"unescapeString(): should handle strings with various escaped characters",
	() => {
		runner.assert(
			unescapeString('"hello\\\\world\\"foo\\nbar"'),
			'hello\\world"foo\nbar',
		);
	},
);

runner.test("readSequence(): should parse a list with one element", () => {
	const rdr = new Reader(["(", "1", ")"]);
	runner.assert(readSequence(rdr, ")"), createListNode([createNumberNode(1)]));
});

runner.test(
	"readSequence(): should parse a list with multiple elements",
	() => {
		const rdr = new Reader(["(", "1", "2", "3", ")"]);
		runner.assert(
			readSequence(rdr, ")"),
			createListNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
		);
	},
);

runner.test("readSequence(): should parse a vector with one element", () => {
	const rdr = new Reader(["[", "1", "]"]);
	runner.assert(
		readSequence(rdr, "]"),
		createVectorNode([createNumberNode(1)]),
	);
});

runner.test(
	"readSequence(): should parse a vector with multiple elements",
	() => {
		const rdr = new Reader(["[", "1", "2", "3", "]"]);
		runner.assert(
			readSequence(rdr, "]"),
			createVectorNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
		);
	},
);

runner.test(
	"readSequence(): should parse a map with one key-value pair",
	() => {
		const rdr = new Reader(["{", "key:", "1", "}"]);
		runner.assert(
			readSequence(rdr, "}"),
			createMapNode(new Map([["key:", createNumberNode(1)]])),
		);
	},
);

runner.test(
	"readSequence(): should parse a map with multiple key-value pairs",
	() => {
		const rdr = new Reader(["{", "key1:", "1", "key2:", "2", "}"]);
		runner.assert(
			readSequence(rdr, "}"),
			createMapNode(
				new Map([
					["key1:", createNumberNode(1)],
					["key2:", createNumberNode(2)],
				]),
			),
		);
	},
);

runner.test(
	"readSequence(): should throw error for unexpected EOF while reading a sequence",
	() => {
		const rdr = new Reader(["(", "1"]);
		let threw = false;
		try {
			const result = readSequence(rdr, ")");
			console.log(`Should be an EOF, but got ${JSON.stringify(result)}`);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("readSequence(): should throw error for unknown end value", () => {
	const rdr = new Reader(["<", "1", ">"]);
	let threw = false;
	try {
		readSequence(rdr, ">");
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): Testing read of numbers", () => {
	runner.assert(readString("1"), createNumberNode(1));
	runner.assert(readString("7"), createNumberNode(7));
});

runner.test("readString(): Testing read of whitespace", () => {
	runner.assert(readString("  7   "), createNumberNode(7));
	runner.assert(readString("-123"), createNumberNode(-123));
});

runner.test("readString(): Testing read of symbols", () => {
	runner.assert(readString("+"), createSymbolNode("+"));
});

runner.test("readString(): multi-character symbols", () => {
	runner.assert(readString("abc"), createSymbolNode("abc"));
});

runner.test("readString(): whitespace with multi-character symbols", () => {
	runner.assert(readString("   abc   "), createSymbolNode("abc"));
});

runner.test("readString(): symbols with numbers", () => {
	runner.assert(readString("abc5"), createSymbolNode("abc5"));
});

runner.test("readString(): symbols with dashes", () => {
	runner.assert(readString("abc-def"), createSymbolNode("abc-def"));
});

runner.test("readString(): lonely dash", () => {
	runner.assert(readString("-"), createSymbolNode("-"));
});

runner.test("readString(): symbol with leading dash", () => {
	runner.assert(readString("-abc"), createSymbolNode("-abc"));
});

// TODO: Resolve double character bug, especially for >> since  dom nodes will trigger this frequently.

// runner.test('readString(): symbol of special characters', () => {
//   runner.assert(readString('->>'), createSymbolNode('->>'));
// });

// runner.test('readString(): symbol with double parens', () => {
//   runner.assert(readString('(-))'), createSymbolNode('(-))'));
// });

// runner.test('readString(): symbol with double brackets', () => {
//   runner.assert(readString('-]]'), createSymbolNode('-]]'));
// });

// runner.test('readString(): symbol with double braces', () => {
//   runner.assert(readString('-}}'), createSymbolNode('-}}'));
// });

runner.test("readString(): basic list", () => {
	runner.assert(
		readString("(+ 1 2)"),
		createListNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createNumberNode(2),
		]),
	);
});

runner.test("readString(): empty list", () => {
	runner.assert(readString("()"), createListNode([]));
});

runner.test("readString(): empty list with whitespace", () => {
	runner.assert(readString("( )"), createListNode([]));
});

runner.test("readString(): list with nil", () => {
	runner.assert(readString("(nil)"), createListNode([createNilNode()]));
});

runner.test("readString(): nested lists", () => {
	runner.assert(
		readString("((3 4))"),
		createListNode([
			createListNode([createNumberNode(3), createNumberNode(4)]),
		]),
	);
});

runner.test("readString(): Nested lists with symbols", () => {
	runner.assert(
		readString("(+ 1 (+ 2 3))"),
		createListNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createListNode([
				createSymbolNode("+"),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): Nested lists with whitespace", () => {
	runner.assert(
		readString("  ( +   1   (+   2 3   )   )  "),
		createListNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createListNode([
				createSymbolNode("+"),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): List with multiply symbol", () => {
	runner.assert(
		readString("(* 1 2)"),
		createListNode([
			createSymbolNode("*"),
			createNumberNode(1),
			createNumberNode(2),
		]),
	);
});

runner.test("readString(): List with power symbol", () => {
	runner.assert(
		readString("(** 1 2)"),
		createListNode([
			createSymbolNode("**"),
			createNumberNode(1),
			createNumberNode(2),
		]),
	);
});

runner.test("readString(): List with a negative number", () => {
	runner.assert(
		readString("(* -3 6)"),
		createListNode([
			createSymbolNode("*"),
			createNumberNode(-3),
			createNumberNode(6),
		]),
	);
});

runner.test("readString(): List with nested empty lists", () => {
	runner.assert(
		readString("(()())"),
		createListNode([createListNode([]), createListNode([])]),
	);
});

runner.test("readString(): commas as whitespace", () => {
	runner.assert(
		readString("(1 2, 3,,,,),,"),
		createListNode([
			createNumberNode(1),
			createNumberNode(2),
			createNumberNode(3),
		]),
	);
});

runner.test("readString(): read of nil", () => {
	runner.assert(readString("nil"), createNilNode());
});

runner.test("readString(): read of true", () => {
	runner.assert(readString("true"), createBooleanNode(true));
});

runner.test("readString(): read of false", () => {
	runner.assert(readString("false"), createBooleanNode(false));
});

runner.test("readString(): double-quoted basic string", () => {
	runner.assert(readString('"abc"'), createStringNode("abc"));
});

runner.test("readString(): double-quoted string with whitespace", () => {
	runner.assert(readString('   "abc"   "'), createStringNode("abc"));
});

runner.test("readString(): double-quoted string with parens", () => {
	runner.assert(
		readString('"abc (with parens)"'),
		createStringNode("abc (with parens)"),
	);
});

runner.test("readString(): double-quoted string with escapes", () => {
	runner.assert(readString('"abc\\"def"'), createStringNode('abc"def'));
});

runner.test("readString(): empty double-quoted string", () => {
	runner.assert(readString('""'), createStringNode(""));
});

runner.test("readString(): double-quoted string with two backslashes", () => {
	runner.assert(readString('"\\\\"'), createStringNode("\\"));
});

runner.test(
	"readString(): double-quoted string with a lot of backslashes",
	() => {
		runner.assert(
			readString('"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"'),
			createStringNode("\\\\\\\\\\\\\\\\\\"),
		);
	},
);

runner.test("readString(): double-quoted string with ampersand", () => {
	runner.assert(readString('"&"'), createStringNode("&"));
});

runner.test("readString(): double-quoted string with single quote", () => {
	runner.assert(readString(`"'"`), createStringNode("'"));
});

runner.test("readString(): double-quoted string with left paren", () => {
	runner.assert(readString('"("'), createStringNode("("));
});

runner.test("readString(): double-quoted string with right paren", () => {
	runner.assert(readString('")"'), createStringNode(")"));
});

runner.test("readString(): double-quoted string with asterisk", () => {
	runner.assert(readString('"*"'), createStringNode("*"));
});

runner.test("readString(): double-quoted string with plus", () => {
	runner.assert(readString('"+"'), createStringNode("+"));
});

runner.test("readString(): double-quoted string with comma", () => {
	runner.assert(readString('","'), createStringNode(","));
});

runner.test("readString(): double-quoted string with dash", () => {
	runner.assert(readString('"-"'), createStringNode("-"));
});

runner.test("readString(): double-quoted string with slash", () => {
	runner.assert(readString('"/"'), createStringNode("/"));
});

runner.test("readString(): double-quoted string with colon", () => {
	runner.assert(readString('":"'), createStringNode(":"));
});

runner.test("readString(): double-quoted string with semicolon", () => {
	runner.assert(readString('";"'), createStringNode(";"));
});

runner.test("readString(): double-quoted string less than", () => {
	runner.assert(readString('"<"'), createStringNode("<"));
});

runner.test("readString(): double-quoted string with equal", () => {
	runner.assert(readString('"="'), createStringNode("="));
});

runner.test("readString(): double-quoted string with greater than", () => {
	runner.assert(readString('">"'), createStringNode(">"));
});

runner.test("readString(): double-quoted string with question mark", () => {
	runner.assert(readString('"?"'), createStringNode("?"));
});

runner.test("readString(): double-quoted string with at sign", () => {
	runner.assert(readString('"@"'), createStringNode("@"));
});

runner.test("readString(): double-quoted string with left bracket", () => {
	runner.assert(readString('"["'), createStringNode("["));
});

runner.test("readString(): double-quoted string with right bracket", () => {
	runner.assert(readString('"]"'), createStringNode("]"));
});

runner.test("readString(): double-quoted string with caret", () => {
	runner.assert(readString('"^"'), createStringNode("^"));
});

runner.test("readString(): double-quoted string with underscore", () => {
	runner.assert(readString('"_"'), createStringNode("_"));
});

runner.test("readString(): double-quoted string with backtick", () => {
	runner.assert(readString('"`"'), createStringNode("`"));
});

runner.test("readString(): double-quoted string with left brace", () => {
	runner.assert(readString('"{"'), createStringNode("{"));
});

runner.test("readString(): double-quoted string with right brace", () => {
	runner.assert(readString('"}"'), createStringNode("}"));
});

runner.test("readString(): double-quoted string with tilde", () => {
	runner.assert(readString('"~"'), createStringNode("~"));
});

runner.test("readString(): double-quoted string with exclamation mark", () => {
	runner.assert(readString('"!"'), createStringNode("!"));
});

runner.test("readString(): read of ^/metadata", () => {
	runner.assert(
		readString('^{"a" 1} [1 2 3]'),
		createListNode([
			createSymbolNode("with-meta"),
			createVectorNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
			createMapNode(new Map([['"a"', createNumberNode(1)]])),
		]),
	);
});

// Non alphanumeric characters in strings
runner.test("readString(): new line in string", () => {
	runner.assert(readString('"\n"'), createStringNode("\n"));
});

runner.test("readString(): double-quoted string with pound sign", () => {
	runner.assert(readString('"#"'), createStringNode("#"));
});

runner.test("readString(): double-quoted string with dollar sign", () => {
	runner.assert(readString('"$"'), createStringNode("$"));
});

runner.test("readString(): double-quoted string with percent sign", () => {
	runner.assert(readString('"%"'), createStringNode("%"));
});

runner.test("readString(): double-quoted string with period", () => {
	runner.assert(readString('"."'), createStringNode("."));
});

runner.test("readString(): double-quoted string with escaped backslash", () => {
	runner.assert(readString('"\\\\"'), createStringNode("\\"));
});

runner.test("readString(): double-quoted string with pipe", () => {
	runner.assert(readString('"|"'), createStringNode("|"));
});

// Non alphanumeric characters in comments

runner.test("readString(): comment with exclamation point", () => {
	runner.assert(readString("1;!"), createNumberNode(1));
});

runner.test("readString(): comment with double-quote", () => {
	runner.assert(readString('1;"'), createNumberNode(1));
});

runner.test("readString(): comment with pound sign", () => {
	runner.assert(readString("1;#"), createNumberNode(1));
});

runner.test("readString(): comment with dollar sign", () => {
	runner.assert(readString("1;$"), createNumberNode(1));
});

runner.test("readString(): comment with percent sign", () => {
	runner.assert(readString("1;%"), createNumberNode(1));
});

runner.test("readString(): comment with single quote", () => {
	runner.assert(readString("1;'"), createNumberNode(1));
});

runner.test("readString(): comment with backslash", () => {
	runner.assert(readString("1;\\"), createNumberNode(1));
});

runner.test("readString(): comment with two backslashes", () => {
	runner.assert(readString("1;\\\\"), createNumberNode(1));
});

runner.test("readString(): comment with three backslashes", () => {
	runner.assert(readString("1;\\\\\\"), createNumberNode(1));
});

runner.test("readString(): comment with backtick", () => {
	runner.assert(readString("1;`"), createNumberNode(1));
});

runner.test(
	"readString(): comment with a bunch of other non-alphanumeric characters",
	() => {
		runner.assert(
			readString("1; &()*+,-./:;<=>?@[]^_{|}~"),
			createNumberNode(1),
		);
	},
);

runner.test("readString(): error due to missing end paren", () => {
	let threw = false;
	try {
		readString("(1 2");
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): error due to missing end bracket", () => {
	let threw = false;
	try {
		readString("[1 2");
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): error due to missing end double-quote", () => {
	let threw = false;
	try {
		readString('"abc');
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): error due to unbalanced quotes", () => {
	let threw = false;
	try {
		readString('"');
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): error due to unbalanced escaped quote", () => {
	let threw = false;
	try {
		readString('"\\"');
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("readString(): error due to backslash key getting stuck", () => {
	let threw = false;
	try {
		readString('"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"');
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		readString('(1 "abc');
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test(
	"readString(): error due to missing paren after double-quotes",
	() => {
		let threw = false;
		try {
			const result = readString('(1 "abc"');
			console.log(printString(result, true));
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test("readString(): quote special form", () => {
	runner.assert(
		readString("'1"),
		createListNode([createSymbolNode("quote"), createNumberNode(1)]),
	);
});

runner.test("readString(): quote special form with list", () => {
	runner.assert(
		readString("'(1 2 3)"),
		createListNode([
			createSymbolNode("quote"),
			createListNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): quasiquote special form", () => {
	runner.assert(
		readString("`1"),
		createListNode([createSymbolNode("quasiquote"), createNumberNode(1)]),
	);
});

runner.test("readString(): quasiquote special form with list", () => {
	runner.assert(
		readString("`(1 2 3)"),
		createListNode([
			createSymbolNode("quasiquote"),
			createListNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): unquote special form", () => {
	runner.assert(
		readString("~1"),
		createListNode([createSymbolNode("unquote"), createNumberNode(1)]),
	);
});

runner.test("readString(): unquote special form with list", () => {
	runner.assert(
		readString("~(1 2 3)"),
		createListNode([
			createSymbolNode("unquote"),
			createListNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): quasiquote special form with unquote", () => {
	runner.assert(
		readString("`(1 ~a 3)"),
		createListNode([
			createSymbolNode("quasiquote"),
			createListNode([
				createNumberNode(1),
				createListNode([createSymbolNode("unquote"), createSymbolNode("a")]),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): splice-unquote special form with list", () => {
	runner.assert(
		readString("~@(1 2 3)"),
		createListNode([
			createSymbolNode("splice-unquote"),
			createListNode([
				createNumberNode(1),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): single keyword", () => {
	runner.assert(readString("kw:"), createKeywordNode("kw:"));
});

runner.test("readString(): keywords in list", () => {
	runner.assert(
		readString("(kw1: kw2: kw3:)"),
		createListNode([
			createKeywordNode("kw1:"),
			createKeywordNode("kw2:"),
			createKeywordNode("kw3:"),
		]),
	);
});

runner.test("readString(): vector with symbol", () => {
	runner.assert(
		readString("[+ 1 2]"),
		createVectorNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createNumberNode(2),
		]),
	);
});

runner.test("readString(): empty vector", () => {
	runner.assert(readString("[]"), createVectorNode([]));
});

runner.test("readString(): vector with whitespace", () => {
	runner.assert(readString("[  ]"), createVectorNode([]));
});

runner.test("readString(): nested vector", () => {
	runner.assert(
		readString("[[3 4]]"),
		createVectorNode([
			createVectorNode([createNumberNode(3), createNumberNode(4)]),
		]),
	);
});

runner.test("readString(): nested vector with symbols", () => {
	runner.assert(
		readString("[+ 1 [+ 2 3]]"),
		createVectorNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createVectorNode([
				createSymbolNode("+"),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): nested vector with symbols and whitespace", () => {
	runner.assert(
		readString("  [ +   1   [+   2 3   ]   ]  "),
		createVectorNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createVectorNode([
				createSymbolNode("+"),
				createNumberNode(2),
				createNumberNode(3),
			]),
		]),
	);
});

runner.test("readString(): vector nested in list", () => {
	runner.assert(readString("([])"), createListNode([createVectorNode([])]));
});

runner.test("readString(): empty map", () => {
	runner.assert(readString("{}"), createMapNode(new Map()));
});

runner.test("readString(): empty map with whitespace", () => {
	runner.assert(readString("{ }"), createMapNode(new Map()));
});

runner.test("readString(): map with string key", () => {
	runner.assert(
		readString('{"abc" 1}'),
		createMapNode(new Map([['"abc"', createNumberNode(1)]])),
	);
});

runner.test("readString(): nested map", () => {
	runner.assert(
		readString('{"a" {"b" 2}}'),
		createMapNode(
			new Map([
				['"a"', createMapNode(new Map([['"b"', createNumberNode(2)]]))],
			]),
		),
	);
});

runner.test("readString(): deeply nested map", () => {
	runner.assert(
		readString('{"a" {"b" {"c" 3}}}'),
		createMapNode(
			new Map([
				[
					'"a"',
					createMapNode(
						new Map([
							['"b"', createMapNode(new Map([['"c"', createNumberNode(3)]]))],
						]),
					),
				],
			]),
		),
	);
});

runner.test("readString(): deeply nested map with whitespace", () => {
	runner.assert(
		readString('{  "a"  {"b"   {  "cde"     3   }  }}'),
		createMapNode(
			new Map([
				[
					'"a"',
					createMapNode(
						new Map([
							['"b"', createMapNode(new Map([['"cde"', createNumberNode(3)]]))],
						]),
					),
				],
			]),
		),
	);
});

runner.test("readString(): a normal map", () => {
	runner.assert(
		readString('{"a1" 1 "a2" 2 "a3" 3}'),
		createMapNode(
			new Map([
				['"a1"', createNumberNode(1)],
				['"a2"', createNumberNode(2)],
				['"a3"', createNumberNode(3)],
			]),
		),
	);
});

runner.test("readString(): a normal map with keywords and whitespace", () => {
	runner.assert(
		readString("{  a:  {b:   {  cde:     3   }  }}"),
		createMapNode(
			new Map([
				[
					"a:",
					createMapNode(
						new Map([
							["b:", createMapNode(new Map([["cde:", createNumberNode(3)]]))],
						]),
					),
				],
			]),
		),
	);
});

runner.test("readString(): map with potentially tricky key/value pair", () => {
	runner.assert(
		readString('{"1" 1}'),
		createMapNode(new Map([['"1"', createNumberNode(1)]])),
	);
});

runner.test("readString(): map nested in a list", () => {
	runner.assert(readString("({})"), createListNode([createMapNode(new Map())]));
});

runner.test("readString(): full line comment with leading whitespace", () => {
	runner.assert(readString(" ; whole line comment"), createNilNode());
});

runner.test("readString(): comment after expression with whitespace", () => {
	runner.assert(
		readString("1 ; comment after expression"),
		createNumberNode(1),
	);
});

runner.test("readString(): comment after expression without whitespace", () => {
	runner.assert(readString("1; comment after expression"), createNumberNode(1));
});

runner.test("readString(): Testing read of @/deref", () => {
	runner.assert(
		readString("@a"),
		createListNode([createSymbolNode("deref"), createSymbolNode("a")]),
	);
});

runner.report();
