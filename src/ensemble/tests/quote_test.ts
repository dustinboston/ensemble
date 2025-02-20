import { initEnv, rep } from "../lib.ts";
import { printString } from "../printer.ts";
import {
	BooleanNode,
	ListNode,
	MapNode,
	NilNode,
	NumberNode,
	StringNode,
	SymbolNode,
	VectorNode,
} from "../types.ts";
import runner from "./test_runner.ts";

runner.test("QUOTE: Testing regular quote", () => {
	const sharedEnv = initEnv();

	runner.test("QUOTE: quote returns a number", () => {
		runner.assert(
			rep("(quote 7)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test("QUOTE: quote returns a list of numbers", () => {
		runner.assert(
			rep("(quote (1 2 3))", sharedEnv),
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	runner.test("QUOTE: quote returns a nested list of numbers", () => {
		runner.assert(
			rep("(quote (1 2 (3 4)))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(2),
					new ListNode([new NumberNode(3), new NumberNode(4)]),
				]),
				true,
			),
		);
	});
});

runner.test("QUOTE: Testing simple quasiquote", () => {
	const sharedEnv = initEnv();

	runner.test("QUOTE: quasiquote returns nil", () => {
		runner.assert(
			rep("(quasiquote nil)", sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test("QUOTE: quasiquote returns 7", () => {
		runner.assert(
			rep("(quasiquote 7)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test("QUOTE: quasiquote returns a symbol", () => {
		runner.assert(
			rep("(quasiquote a)", sharedEnv),
			printString(new SymbolNode("a"), true),
		);
	});

	runner.test("QUOTE: returns a map", () => {
		runner.assert(
			rep('(quasiquote {"a" b})', sharedEnv),
			printString(new MapNode(new Map([['"a"', new SymbolNode("b")]])), true),
		);
	});
});

runner.test("QUOTE: Testing quasiquote with lists", () => {
	const sharedEnv = initEnv();
	runner.test("QUOTE: quasiquote returns an empty list", () => {
		runner.assert(
			rep("(quasiquote ())", sharedEnv),
			printString(new ListNode([]), true),
		);
	});

	runner.test("QUOTE: quasiquote returns a list", () => {
		runner.assert(
			rep("(quasiquote (1 2 3))", sharedEnv),
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	runner.test("QUOTE: quasiquote returns a nested list with symbols", () => {
		runner.assert(
			rep("(quasiquote (a))", sharedEnv),
			printString(new ListNode([new SymbolNode("a")]), true),
		);
	});

	runner.test("QUOTE: quasiquote return a nested list of numbers", () => {
		runner.assert(
			rep("(quasiquote (1 2 (3 4)))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(2),
					new ListNode([new NumberNode(3), new NumberNode(4)]),
				]),
				true,
			),
		);
	});

	runner.test("QUOTE: quasiquote returns a nested list with nil", () => {
		runner.assert(
			rep("(quasiquote (nil))", sharedEnv),
			printString(new ListNode([new NilNode()]), true),
		);
	});

	runner.test("QUOTE: quasiquote returns numbers and empty lists", () => {
		runner.assert(
			rep("(quasiquote (1 ()))", sharedEnv),
			printString(new ListNode([new NumberNode(1), new ListNode([])]), true),
		);
	});

	runner.test("QUOTE: quasiquote returns empty lists and numbers", () => {
		runner.assert(
			rep("(quasiquote (() 1))", sharedEnv),
			printString(new ListNode([new ListNode([]), new NumberNode(1)]), true),
		);
	});

	runner.test(
		"QUOTE: quasiquote will return empty lists whereever they occur",
		() => {
			runner.assert(
				rep("(quasiquote (1 () 2))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new ListNode([]),
						new NumberNode(2),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: quasiquote returns a nested empty list", () => {
		runner.assert(
			rep("(quasiquote (()))", sharedEnv),
			printString(new ListNode([new ListNode([])]), true),
		);
	});
});

runner.test("QUOTE: Testing unquote", () => {
	const sharedEnv = initEnv();

	runner.test(
		"QUOTE: unquote returns a number that has been quasiquoted",
		() => {
			runner.assert(
				rep("(quasiquote (unquote 7))", sharedEnv),
				printString(new NumberNode(7), true),
			);
		},
	);

	runner.test("QUOTE: define a variable to test unquoting", () => {
		runner.assert(
			rep("(def! a 8)", sharedEnv),
			printString(new NumberNode(8), true),
		);
	});

	runner.test("QUOTE: a quasiquoted symbol returns the symbol", () => {
		runner.assert(
			rep("(quasiquote a)", sharedEnv),
			printString(new SymbolNode("a"), true),
		);
	});

	runner.test(
		"QUOTE: unquoting a symbol allows the symbol to be evaluated",
		() => {
			runner.assert(
				rep("(quasiquote (unquote a))", sharedEnv),
				printString(new NumberNode(8), true),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquote prevents the symbol from being evaluated",
		() => {
			runner.assert(
				rep("(quasiquote (1 a 3))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new SymbolNode("a"),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: unquote allows the symbol to be evaluated", () => {
		runner.assert(
			rep("(quasiquote (1 (unquote a) 3))", sharedEnv),
			printString(
				new ListNode([new NumberNode(1), new NumberNode(8), new NumberNode(3)]),
				true,
			),
		);
	});

	runner.test("QUOTE: define a symbol with a quoted list for testing", () => {
		runner.assert(
			rep('(def! b (quote (1 "b" "d")))', sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new StringNode("b"),
					new StringNode("d"),
				]),
				true,
			),
		);
	});

	runner.test(
		"QUOTE: quasiquote prevents variables from being evaluated",
		() => {
			runner.assert(
				rep("(quasiquote (1 b 3))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new SymbolNode("b"),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: unquote allows variables to be evaluated in a nested list",
		() => {
			runner.assert(
				rep("(quasiquote (1 (unquote b) 3))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new ListNode([
							new NumberNode(1),
							new StringNode("b"),
							new StringNode("d"),
						]),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: unquoting has the effect of combining nested lists",
		() => {
			runner.assert(
				rep("(quasiquote ((unquote 1) (unquote 2)))", sharedEnv),
				printString(new ListNode([new NumberNode(1), new NumberNode(2)]), true),
			);
		},
	);
});

runner.test("QUOTE: Quasiquote and environments", () => {
	const sharedEnv = initEnv();

	runner.test("QUOTE: unquote works with a variable defined with let*", () => {
		runner.assert(
			rep("(let* (x 0) (quasiquote (unquote x)))", sharedEnv),
			printString(new NumberNode(0), true),
		);
	});
});

runner.test("QUOTE: Testing splice-unquote", () => {
	const sharedEnv = initEnv();

	runner.test(
		'QUOTE: define a symbol, "c", with a quoted list for testing',
		() => {
			runner.assert(
				rep('(def! c (quote (1 "b" "d")))', sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new StringNode("b"),
						new StringNode("d"),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquote returns a list without evaluating symbols",
		() => {
			runner.assert(
				rep("(quasiquote (1 c 3))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new SymbolNode("c"),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: splice-unquote injects a symbol in place after evaluation",
		() => {
			runner.assert(
				rep("(quasiquote (1 (splice-unquote c) 3))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new NumberNode(1),
						new StringNode("b"),
						new StringNode("d"),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: splice-unquotes works as the last item in a list", () => {
		runner.assert(
			rep("(quasiquote (1 (splice-unquote c)))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(1),
					new StringNode("b"),
					new StringNode("d"),
				]),
				true,
			),
		);
	});

	runner.test("QUOTE: splice-unquote works at the beginning of a list", () => {
		runner.assert(
			rep("(quasiquote ((splice-unquote c) 2))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new StringNode("b"),
					new StringNode("d"),
					new NumberNode(2),
				]),
				true,
			),
		);
	});

	runner.test("QUOTE: splice-unquote can reuse symbols", () => {
		runner.assert(
			rep("(quasiquote ((splice-unquote c) (splice-unquote c)))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new StringNode("b"),
					new StringNode("d"),
					new NumberNode(1),
					new StringNode("b"),
					new StringNode("d"),
				]),
				true,
			),
		);
	});
});

runner.test("QUOTE: Testing symbol equality", () => {
	const sharedEnv = initEnv();

	runner.test(
		"QUOTE: two quoted lists with the same contents are equal",
		() => {
			runner.assert(
				rep("(= (quote abc) (quote abc))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"QUOTE: two quoted lists with different contents are not equal",
		() => {
			runner.assert(
				rep("(= (quote abc) (quote abcd))", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test("QUOTE: quote does not 'stringify' symbols", () => {
		runner.assert(
			rep('(= (quote abc) "abc")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test(
		"QUOTE: quote doesn 'stringify' symbols at the end of a list",
		() => {
			runner.assert(
				rep('(= "abc" (quote abc))', sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test("QUOTE: str stringifies a quoted value", () => {
		runner.assert(
			rep('(= "abc" (str (quote abc)))', sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("QUOTE: quote does not attempt to evaluate symbols", () => {
		runner.assert(
			rep("(= (quote abc) nil)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("QUOTE: nil has no effect on quoting", () => {
		runner.assert(
			rep("(= nil (quote abc))", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
});

runner.test("QUOTE: Test quine", () => {
	const sharedEnv = initEnv();
	runner.test(
		"QUOTE: You can make your brain explode by creating a quine with lots of quoting",
		() => {
			runner.assert(
				rep(
					"((fn* (q) (quasiquote ((unquote q) (quote (unquote q))))) (quote (fn* (q) (quasiquote ((unquote q) (quote (unquote q)))))))",
					sharedEnv,
				),
				printString(
					new ListNode([
						new ListNode([
							new SymbolNode("fn*"),
							new ListNode([new SymbolNode("q")]),
							new ListNode([
								new SymbolNode("quasiquote"),
								new ListNode([
									new ListNode([
										new SymbolNode("unquote"),
										new SymbolNode("q"),
									]),
									new ListNode([
										new SymbolNode("quote"),
										new ListNode([
											new SymbolNode("unquote"),
											new SymbolNode("q"),
										]),
									]),
								]),
							]),
						]),
						new ListNode([
							new SymbolNode("quote"),
							new ListNode([
								new SymbolNode("fn*"),
								new ListNode([new SymbolNode("q")]),
								new ListNode([
									new SymbolNode("quasiquote"),
									new ListNode([
										new ListNode([
											new SymbolNode("unquote"),
											new SymbolNode("q"),
										]),
										new ListNode([
											new SymbolNode("quote"),
											new ListNode([
												new SymbolNode("unquote"),
												new SymbolNode("q"),
											]),
										]),
									]),
								]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);
});

// TODO:
runner.test("QUOTE: Testing quasiquote with vectors", () => {
	const sharedEnv = initEnv();

	runner.test(
		"QUOTE: quasiquote returns a vector with the same structure as the original",
		() => {
			runner.assert(
				rep("(quasiquote [])", sharedEnv),
				printString(new VectorNode([]), true),
			);
		},
	);

	runner.test("QUOTE: quasiquote returns a nested vector", () => {
		runner.assert(
			rep("(quasiquote [[]])", sharedEnv),
			printString(new VectorNode([new VectorNode([])]), true),
		);
	});

	runner.test("QUOTE: quasiquote returns a list nested in a vector", () => {
		runner.assert(
			rep("(quasiquote [()])", sharedEnv),
			printString(new VectorNode([new ListNode([])]), true),
		);
	});

	runner.test("QUOTE: quasiquote returns a vector nested in a list", () => {
		runner.assert(
			rep("(quasiquote ([]))", sharedEnv),
			printString(new ListNode([new VectorNode([])]), true),
		);
	});

	runner.test(
		"QUOTE: define a symbol to test complex macro expressions",
		() => {
			runner.assert(
				rep("(def! a 8)", sharedEnv),
				printString(new NumberNode(8), true),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquote returns a vector without evaluating symbols",
		() => {
			runner.assert(
				rep("`[1 a 3]", sharedEnv),
				printString(
					new VectorNode([
						new NumberNode(1),
						new SymbolNode("a"),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquote returns a vector with lots of nested vectors",
		() => {
			runner.assert(
				rep("(quasiquote [a [] b [c] d [e f] g])", sharedEnv),
				printString(
					new VectorNode([
						new SymbolNode("a"),
						new VectorNode([]),
						new SymbolNode("b"),
						new VectorNode([new SymbolNode("c")]),
						new SymbolNode("d"),
						new VectorNode([new SymbolNode("e"), new SymbolNode("f")]),
						new SymbolNode("g"),
					]),
					true,
				),
			);
		},
	);
});

// TODO:
runner.test("QUOTE: Misplaced unquote or splice-unquote", () => {
	const sharedEnv = initEnv();

	runner.test("QUOTE: unquote does nothing as the last argument", () => {
		runner.assert(
			rep("`(0 unquote)", sharedEnv),
			printString(
				new ListNode([new NumberNode(0), new SymbolNode("unquote")]),
				true,
			),
		);
	});

	runner.test("QUOTE: splice-unquote does nothing as the last argument", () => {
		runner.assert(
			rep("`(0 splice-unquote)", sharedEnv),
			printString(
				new ListNode([new NumberNode(0), new SymbolNode("splice-unquote")]),
				true,
			),
		);
	});

	runner.test(
		"QUOTE: unquote is not evaluated within a quasi-quoted vector",
		() => {
			runner.assert(
				rep("`[unquote 0]", sharedEnv),
				printString(
					new VectorNode([new SymbolNode("unquote"), new NumberNode(0)]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: splice-unquote is not evaluated within a quasi-quoted vector",
		() => {
			runner.assert(
				rep("`[splice-unquote 0]", sharedEnv),
				printString(
					new VectorNode([new SymbolNode("splice-unquote"), new NumberNode(0)]),
					true,
				),
			);
		},
	);
});

// TODO:
runner.test("QUOTE: Debugging quasiquote", () => {
	const sharedEnv = initEnv();
	runner.test("QUOTE: quasiquoteexpand returns nil as-is", () => {
		runner.assert(
			rep("(quasiquoteexpand nil)", sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test("QUOTE: quasiquoteexpand returns a number as-is", () => {
		runner.assert(
			rep("(quasiquoteexpand 7)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test(
		"QUOTE: quasiquoteexpand expands an expression without evaluating a symbol",
		() => {
			runner.assert(
				rep("(quasiquoteexpand a)", sharedEnv),
				printString(
					new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a map without evaluating a symbol",
		() => {
			runner.assert(
				rep('(quasiquoteexpand {"a" b})', sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("quote"),
						new MapNode(new Map([['"a"', new SymbolNode("b")]])),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: quasiquoteexpand expands an empty list as-is", () => {
		runner.assert(
			rep("(quasiquoteexpand ())", sharedEnv),
			printString(new ListNode([]), true),
		);
	});

	runner.test(
		"QUOTE: quasiquoteexpand expands a list of numbers to conses",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 2 3))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(2),
							new ListNode([
								new SymbolNode("cons"),
								new NumberNode(3),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a list of symbols into a cons and quote",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (a))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
						new ListNode([]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a list of lists nested conses",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 2 (3 4)))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(2),
							new ListNode([
								new SymbolNode("cons"),
								new ListNode([
									new SymbolNode("cons"),
									new NumberNode(3),
									new ListNode([
										new SymbolNode("cons"),
										new NumberNode(4),
										new ListNode([]),
									]),
								]),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a list with nil into a cons of nil and an empty list",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (nil))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NilNode(),
						new ListNode([]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands numbers and empty lists to conses, switching the order",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 ()))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new ListNode([]),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands empty lists and numbers into conses, switching the order",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (() 1))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([]),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(1),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a list of numbers and and empty lists into conses",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 () 2))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new ListNode([]),
							new ListNode([
								new SymbolNode("cons"),
								new NumberNode(2),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands nested empty lists a cons of two empty lists",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (()))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([]),
						new ListNode([]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand quotes and conses many symbols and nested lists",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (f () g (h) i (j k) l))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([new SymbolNode("quote"), new SymbolNode("f")]),
						new ListNode([
							new SymbolNode("cons"),
							new ListNode([]),
							new ListNode([
								new SymbolNode("cons"),
								new ListNode([new SymbolNode("quote"), new SymbolNode("g")]),
								new ListNode([
									new SymbolNode("cons"),
									new ListNode([
										new SymbolNode("cons"),
										new ListNode([
											new SymbolNode("quote"),
											new SymbolNode("h"),
										]),
										new ListNode([]),
									]),
									new ListNode([
										new SymbolNode("cons"),
										new ListNode([
											new SymbolNode("quote"),
											new SymbolNode("i"),
										]),
										new ListNode([
											new SymbolNode("cons"),
											new ListNode([
												new SymbolNode("cons"),
												new ListNode([
													new SymbolNode("quote"),
													new SymbolNode("j"),
												]),
												new ListNode([
													new SymbolNode("cons"),
													new ListNode([
														new SymbolNode("quote"),
														new SymbolNode("k"),
													]),
													new ListNode([]),
												]),
											]),
											new ListNode([
												new SymbolNode("cons"),
												new ListNode([
													new SymbolNode("quote"),
													new SymbolNode("l"),
												]),
												new ListNode([]),
											]),
										]),
									]),
								]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: unquote defeats quasiquoteexpand in battle", () => {
		runner.assert(
			rep("(quasiquoteexpand (unquote 7))", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test(
		"QUOTE: quasiquoteexpand expands a symbol to a quoted symbol",
		() => {
			runner.assert(
				rep("(quasiquoteexpand a)", sharedEnv),
				printString(
					new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands an unquoted symbol into the symbol",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (unquote a))", sharedEnv),
				printString(new SymbolNode("a"), true),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a mixed list into conses and quotes",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 a 3))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
							new ListNode([
								new SymbolNode("cons"),
								new NumberNode(3),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands into conses and unquotes symbols",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 (unquote a) 3))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new SymbolNode("a"),
							new ListNode([
								new SymbolNode("cons"),
								new NumberNode(3),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: quasiquoteexpand is still consing and quoting", () => {
		runner.assert(
			rep("(quasiquoteexpand (1 b 3))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("cons"),
					new NumberNode(1),
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([new SymbolNode("quote"), new SymbolNode("b")]),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(3),
							new ListNode([]),
						]),
					]),
				]),
				true,
			),
		);
	});

	runner.test(
		"QUOTE: unquote within quasiquoteexpand doesn't evaluate the symbols",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 (unquote b) 3))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new SymbolNode("b"),
							new ListNode([
								new SymbolNode("cons"),
								new NumberNode(3),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands lists of unquotes into conses",
		() => {
			runner.assert(
				rep("(quasiquoteexpand ((unquote 1) (unquote 2)))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(2),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands splice-unquote into concat expressions",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (a (splice-unquote (b c)) d))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
						new ListNode([
							new SymbolNode("concat"),
							new ListNode([new SymbolNode("b"), new SymbolNode("c")]),
							new ListNode([
								new SymbolNode("cons"),
								new ListNode([new SymbolNode("quote"), new SymbolNode("d")]),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test("QUOTE: quasiquoteexpand is still doing its thang", () => {
		runner.assert(
			rep("(quasiquoteexpand (1 c 3))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("cons"),
					new NumberNode(1),
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([new SymbolNode("quote"), new SymbolNode("c")]),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(3),
							new ListNode([]),
						]),
					]),
				]),
				true,
			),
		);
	});

	runner.test(
		"QUOTE: splice-unquote within a quasiquoted list expands to concat",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 (splice-unquote c) 3))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("concat"),
							new SymbolNode("c"),
							new ListNode([
								new SymbolNode("cons"),
								new NumberNode(3),
								new ListNode([]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: splice-unquote within a quasiquoted list expands to concat and does not evaluate variables",
		() => {
			runner.assert(
				rep("(quasiquoteexpand (1 (splice-unquote c)))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new NumberNode(1),
						new ListNode([
							new SymbolNode("concat"),
							new SymbolNode("c"),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: splice-unquote within a quasiquoted list expands to concat, and numbers to cons",
		() => {
			runner.assert(
				rep("(quasiquoteexpand ((splice-unquote c) 2))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("concat"),
						new SymbolNode("c"),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(2),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: splice-unquoting the same symbol multiple times within a quasiquoted list expands all to concat",
		() => {
			runner.assert(
				rep(
					"(quasiquoteexpand ((splice-unquote c) (splice-unquote c)))",
					sharedEnv,
				),
				printString(
					new ListNode([
						new SymbolNode("concat"),
						new SymbolNode("c"),
						new ListNode([
							new SymbolNode("concat"),
							new SymbolNode("c"),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands a vector literal [] into (vec ())",
		() => {
			runner.assert(
				rep("(quasiquoteexpand [])", sharedEnv),
				printString(
					new ListNode([new SymbolNode("vec"), new ListNode([])]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands nested vectors into nested consed vecs",
		() => {
			runner.assert(
				rep("(quasiquoteexpand [[]])", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("vec"),
						new ListNode([
							new SymbolNode("cons"),
							new ListNode([new SymbolNode("vec"), new ListNode([])]),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands an empty list inside of a vector into a vec with a cons of two empty lists",
		() => {
			runner.assert(
				rep("(quasiquoteexpand [()])", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("vec"),
						new ListNode([
							new SymbolNode("cons"),
							new ListNode([]),
							new ListNode([]),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands an empty vector inside of a list into a cons of vec and an empty list",
		() => {
			runner.assert(
				rep("(quasiquoteexpand ([]))", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("cons"),
						new ListNode([new SymbolNode("vec"), new ListNode([])]),
						new ListNode([]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"QUOTE: quasiquoteexpand expands vectors to vec, conses the contents, and quotes the symbols",
		() => {
			runner.assert(
				rep("(quasiquoteexpand [1 a 3])", sharedEnv),
				printString(
					new ListNode([
						new SymbolNode("vec"),
						new ListNode([
							new SymbolNode("cons"),
							new NumberNode(1),
							new ListNode([
								new SymbolNode("cons"),
								new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
								new ListNode([
									new SymbolNode("cons"),
									new NumberNode(3),
									new ListNode([]),
								]),
							]),
						]),
					]),
					true,
				),
			);
		},
	);
});
