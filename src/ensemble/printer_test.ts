import { printString } from "./printer.ts";
import runner from "./tests/test_runner.ts";
import {
	type AstNode,
	createAtomNode,
	createBooleanNode,
	createDomNode,
	createErrorNode,
	createFunctionNode,
	createKeywordNode,
	createListNode,
	createMapNode,
	createNilNode,
	createNumberNode,
	createStringNode,
	createSymbolNode,
	createVectorNode,
} from "./types.ts";

runner.test(
	"printString(): should print strings without quotes if printReadably is false",
	() => {
		runner.assert(printString(createStringNode("hello"), false), "hello");
	},
);

runner.test(
	"printString(): should print strings with quotes if printReadably is true",
	() => {
		runner.assert(printString(createStringNode("hello"), true), '"hello"');
	},
);

runner.test("printString(): should print symbols without quotes", () => {
	runner.assert(printString(createSymbolNode("sym")), "sym");
});

runner.test("printString(): should print keywords", () => {
	runner.assert(printString(createKeywordNode("key:")), "key:");
});

runner.test("printString(): should print booleans without quotes", () => {
	runner.assert(printString(createBooleanNode(true)), "true");
});

runner.test("printString(): should print numbers without quotes", () => {
	runner.assert(printString(createNumberNode(123)), "123");
});

runner.test("printString(): should correctly print atom type", () => {
	runner.assert(
		printString(createAtomNode(createStringNode("hello"))),
		"<atom hello>",
	);
});

runner.test("printString(): should correctly print error type", () => {
	runner.assert(
		printString(createErrorNode(createStringNode("message"))),
		"<error <str \"Error: [0:0]\" message>>",
	);
});

runner.test("printString(): should correctly print function type", () => {
	runner.assert(
		printString(createFunctionNode(() => createNilNode())),
		"#<fn>",
	);
});

runner.test("printString(): should correctly print list type", () => {
	runner.assert(
		printString(createListNode([createStringNode("a"), createStringNode("b")])),
		"(a b)",
	);
});

runner.test("printString(): should correctly print vector type", () => {
	runner.assert(
		printString(
			createVectorNode([createStringNode("x"), createStringNode("y")]),
		),
		"[x y]",
	);
});

runner.test("printString(): should correctly print MapNodes", () => {
	runner.assert(
		printString(
			createMapNode(
				new Map<string, AstNode>([
					["a", createNumberNode(1)],
					["b", createNumberNode(2)],
				]),
			),
		),
		"{a 1 b 2}",
	);
});

runner.test("printString(): should correctly print DomNodes", () => {
	const domNode = createDomNode(
		"a",
		new Map([["href", createStringNode("https://example.com")]]),
	);
	runner.assert(printString(domNode), '<a href="https://example.com"></a>');
});

runner.test("printString(): should correctly print nil type", () => {
	runner.assert(printString(createNilNode()), "nil");
});

runner.test("printString(): should throw an error for unmatched types", () => {
	const invalid = new Set();

	let threw = false;
	try {
		printString(invalid as unknown as AstNode);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.report();
