import { initEnv, rep } from "../lib.ts";
import { printString } from "../printer.ts";
import {
	BooleanNode,
	ListNode,
	NilNode,
	NumberNode,
	StringNode,
	SymbolNode,
	VectorNode,
} from "../types.ts";
import runner from "./test_runner.ts";

runner.test(`MACRO: Testing ' (quote) reader macro`, () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: the quote macro works with numbers", () => {
		runner.assert(rep(`'7`, sharedEnv), printString(new NumberNode(7), true));
	});

	runner.test("MACRO: the quote macro works with lists", () => {
		runner.assert(
			rep(`'(1 2 3)`, sharedEnv),
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	runner.test("MACRO: the quote macro works with nested lists", () => {
		runner.assert(
			rep(`'(1 2 (3 4))`, sharedEnv),
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

runner.test("MACRO: Testing ` (quasiquote) reader macro", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: the quasiquote macro returns numbers", () => {
		runner.assert(rep("`7", sharedEnv), printString(new NumberNode(7), true));
	});

	runner.test("MACRO: the quasiquote macro returns lists", () => {
		runner.assert(
			rep("`(1 2 3)", sharedEnv),
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	runner.test("MACRO: the quasiquote macro returns nested lists", () => {
		runner.assert(
			rep("`(1 2 (3 4))", sharedEnv),
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

	runner.test("MACRO: the quasiquote macro returns a list of nil", () => {
		runner.assert(
			rep("`(nil)", sharedEnv),
			printString(new ListNode([new NilNode()]), true),
		);
	});
});

runner.test("MACRO: Testing ~ (unquote) reader macro", () => {
	const sharedEnv = initEnv();

	runner.test(
		"MACRO: the unquote macro can be used with the quasiquote macro",
		() => {
			runner.assert(
				rep("`~7", sharedEnv),
				printString(new NumberNode(7), true),
			);
		},
	);

	runner.test("MACRO: defining a variable to test the unquote macro", () => {
		runner.assert(
			rep("(def! a 8)", sharedEnv),
			printString(new NumberNode(8), true),
		);
	});

	runner.test(
		"MACRO: the unquote macro will unquote symbols in the a list",
		() => {
			runner.assert(
				rep("`(1 ~a 3)", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new NumberNode(8),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"MACRO: define another variable to test the unquote macro",
		() => {
			runner.assert(
				rep(`(def! b '(1 "b" "d"))`, sharedEnv),
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

	runner.test("MACRO: the quasiquote macro returns an unevaluated list", () => {
		runner.assert(
			rep("`(1 b 3)", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new SymbolNode("b"),
					new NumberNode(3),
				]),
				true,
			),
		);
	});

	runner.test(
		"MACRO: the unquote macro unquotes a value in a list and evaluates it",
		() => {
			runner.assert(
				rep("`(1 ~b 3)", sharedEnv),
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
});

runner.test("MACRO: Testing ~@ (splice-unquote) reader macro", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: define a variable for testing splice-unquote", () => {
		runner.assert(
			rep(`(def! c '(1 "b" "d"))`, sharedEnv),
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
		`MACRO: quasiquote macro returns a list with "c" unevaluated`,
		() => {
			runner.assert(
				rep("`(1 c 3)", sharedEnv),
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
		"MACRO: the splice-unquote macro unquotes a value and injects it in-place",
		() => {
			runner.assert(
				rep("`(1 ~@c 3)", sharedEnv),
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
});

runner.test("MACRO: Testing unquote with vectors", () => {
	const sharedEnv = initEnv();

	rep("(def! a 8)", sharedEnv);

	runner.test("MACRO: the unquote macro works insdide of a vector", () => {
		runner.assert(
			rep("`[~a]", sharedEnv),
			printString(new VectorNode([new NumberNode(8)])),
		);
	});

	runner.test(
		"MACRO: the unquote macro works inside of a list inside of a vector",
		() => {
			runner.assert(
				rep("`[(~a)]", sharedEnv),
				printString(new VectorNode([new ListNode([new NumberNode(8)])]), true),
			);
		},
	);

	runner.test(
		"MACRO: the unquote macro works inside of a vector inside of quasiquoted list",
		() => {
			runner.assert(
				rep("`([~a])", sharedEnv),
				printString(new ListNode([new VectorNode([new NumberNode(8)])]), true),
			);
		},
	);

	runner.test("MACRO: unquote works in a quasi-quoted vector", () => {
		runner.assert(
			rep("`[a ~a a]", sharedEnv),
			printString(
				new VectorNode([
					new SymbolNode("a"),
					new NumberNode(8),
					new SymbolNode("a"),
				]),
				true,
			),
		);
	});

	runner.test(
		"MACRO: unquote works in a vector inside of a quasi-quoted list",
		() => {
			runner.assert(
				rep("`([a ~a a])", sharedEnv),
				printString(
					new ListNode([
						new VectorNode([
							new SymbolNode("a"),
							new NumberNode(8),
							new SymbolNode("a"),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"MACRO: unquote in a list inside of a quasi-quoted vector",
		() => {
			runner.assert(
				rep("`[(a ~a a)]", sharedEnv),
				printString(
					new VectorNode([
						new ListNode([
							new SymbolNode("a"),
							new NumberNode(8),
							new SymbolNode("a"),
						]),
					]),
					true,
				),
			);
		},
	);
});

runner.test("MACRO: Testing splice-unquote with vectors", () => {
	const sharedEnv = initEnv();
	runner.test(
		"MACRO: define a symbol to test complex splice-unquote expressions",
		() => {
			runner.assert(
				rep(`(def! c '(1 "b" "d"))`, sharedEnv),
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

	runner.test("MACRO: you can splice-unquote inside of a vector", () => {
		runner.assert(
			rep("`[~@c]", sharedEnv),
			printString(
				new VectorNode([
					new NumberNode(1),
					new StringNode("b"),
					new StringNode("d"),
				]),
				true,
			),
		);
	});

	runner.test(
		"MACRO: you can splice-unquote inside of a list inside of a vector with evaluation",
		() => {
			runner.assert(
				rep("`[(~@c)]", sharedEnv),
				printString(
					new VectorNode([
						new ListNode([
							new NumberNode(1),
							new StringNode("b"),
							new StringNode("d"),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"MACRO: you can splice-unquote inside of a vector inside of a list with evaluation",
		() => {
			runner.assert(
				rep("`([~@c])", sharedEnv),
				printString(
					new ListNode([
						new VectorNode([
							new NumberNode(1),
							new StringNode("b"),
							new StringNode("d"),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"MACRO: splice-unquote a symbol in a vec with multiple values",
		() => {
			runner.assert(
				rep("`[1 ~@c 3]", sharedEnv),
				printString(
					new VectorNode([
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

	runner.test(
		"MACRO: splice-unquote a symbol in a vec with multiple values inside of a list",
		() => {
			runner.assert(
				rep("`([1 ~@c 3])", sharedEnv),
				printString(
					new ListNode([
						new VectorNode([
							new NumberNode(1),
							new NumberNode(1),
							new StringNode("b"),
							new StringNode("d"),
							new NumberNode(3),
						]),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"MACRO: splice-unquote a symbol in a list with multiple values inside of a vec",
		() => {
			runner.assert(
				rep("`[(1 ~@c 3)]", sharedEnv),
				printString(
					new VectorNode([
						new ListNode([
							new NumberNode(1),
							new NumberNode(1),
							new StringNode("b"),
							new StringNode("d"),
							new NumberNode(3),
						]),
					]),
					true,
				),
			);
		},
	);
});

// MARK: CUSTOM MACROS
// -----------------------------------------------------------------------------

runner.test("MACRO: Testing trivial macros", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: Define and call a macro that returns 1", () => {
		rep("(defmacro! one (fn* () 1))", sharedEnv);
		runner.assert(
			rep("(one)", sharedEnv),
			printString(new NumberNode(1), true),
		);
	});

	runner.test("MACRO: Define and call a macro that returns 2", () => {
		rep("(defmacro! two (fn* () 2))", sharedEnv);
		runner.assert(
			rep("(two)", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});
});

runner.test("MACRO: Testing unless macro", () => {
	const sharedEnv = initEnv();
	rep("(defmacro! unless (fn* (pred a b) `(if ~pred ~b ~a)))", sharedEnv);

	runner.test(`MACRO: 'unless' macro with false predicate`, () => {
		runner.assert(
			rep("(unless false 7 8)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test(`MACRO: 'unless' macro with true predicate`, () => {
		runner.assert(
			rep("(unless true 7 8)", sharedEnv),
			printString(new NumberNode(8), true),
		);
	});
});

runner.test("MACRO: Testing unless2 macro", () => {
	const sharedEnv = initEnv();
	rep(
		`(defmacro! unless2 (fn* (pred a b) (list 'if (list 'not pred) a b)))`,
		sharedEnv,
	);

	runner.test(`MACRO: 'unless2' macro with false predicate`, () => {
		runner.assert(
			rep("(unless2 false 7 8)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test(`MACRO: 'unless2' macro with true predicate`, () => {
		runner.assert(
			rep("(unless2 true 7 8)", sharedEnv),
			printString(new NumberNode(8), true),
		);
	});
});

runner.test("MACRO: Testing macroexpand", () => {
	const sharedEnv = initEnv();
	rep("(defmacro! one (fn* () 1))", sharedEnv);

	runner.test("MACRO: Macroexpand a trivial macro", () => {
		runner.assert(
			rep("(macroexpand (one))", sharedEnv),
			printString(new NumberNode(1), true),
		);
	});

	runner.test(`MACRO: Macroexpand 'unless' macro`, () => {
		rep("(defmacro! unless (fn* (pred a b) `(if ~pred ~b ~a)))", sharedEnv);
		runner.assert(
			rep("(macroexpand (unless PRED A B))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("if"),
					new SymbolNode("PRED"),
					new SymbolNode("B"),
					new SymbolNode("A"),
				]),
				true,
			),
		);
	});

	runner.test(`MACRO: Macroexpand 'unless2' macro`, () => {
		rep(
			`(defmacro! unless2 (fn* (pred a b) (list 'if (list 'not pred) a b)))`,
			sharedEnv,
		);
		runner.assert(
			rep("(macroexpand (unless2 PRED A B))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("if"),
					new ListNode([new SymbolNode("not"), new SymbolNode("PRED")]),
					new SymbolNode("A"),
					new SymbolNode("B"),
				]),
				true,
			),
		);
	});

	runner.test(`MACRO: Macroexpand 'unless2' with specific values`, () => {
		runner.assert(
			rep("(macroexpand (unless2 2 3 4))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("if"),
					new ListNode([new SymbolNode("not"), new NumberNode(2)]),
					new NumberNode(3),
					new NumberNode(4),
				]),
				true,
			),
		);
	});
});

runner.test("MACRO: Testing evaluation of macro result", () => {
	const sharedEnv = initEnv();
	rep("(defmacro! identity (fn* (x) x))", sharedEnv);

	runner.test("MACRO: Evaluate macro result with let* binding", () => {
		runner.assert(
			rep("(let* (a 123) (macroexpand (identity a)))", sharedEnv),
			printString(new SymbolNode("a"), true),
		);
	});

	runner.test("MACRO: Evaluate macro result directly", () => {
		runner.assert(
			rep("(let* (a 123) (identity a))", sharedEnv),
			printString(new NumberNode(123), true),
		);
	});
});

runner.test("MACRO: Test that macros do not break empty list", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: Ensure empty list is not affected by macros", () => {
		runner.assert(rep("()", sharedEnv), printString(new ListNode([]), true));
	});
});

runner.test("MACRO: Test that macros do not break quasiquote", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: Ensure quasiquote works with macros", () => {
		runner.assert(
			rep("`(1)", sharedEnv),
			printString(new ListNode([new NumberNode(1)]), true),
		);
	});
});

runner.test(`MACRO: Testing "not" macro function`, () => {
	const sharedEnv = initEnv();

	runner.test(`MACRO: Test 'not' macro with true condition`, () => {
		runner.assert(
			rep("(not (= 1 1))", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test(`MACRO: Test 'not' macro with false condition`, () => {
		runner.assert(
			rep("(not (= 1 2))", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});
});

runner.test("MACRO: Testing cond macro", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: Macroexpand an empty cond", () => {
		runner.assert(
			rep("(macroexpand (cond))", sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test("MACRO: Evaluate an empty cond", () => {
		runner.assert(rep("(cond)", sharedEnv), printString(new NilNode(), true));
	});

	runner.test("MACRO: Macroexpand cond with one pair", () => {
		runner.assert(
			rep("(macroexpand (cond X Y))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("if"),
					new SymbolNode("X"),
					new SymbolNode("Y"),
					new ListNode([new SymbolNode("cond")]),
				]),
				true,
			),
		);
	});

	runner.test("MACRO: Evaluate cond with one true condition", () => {
		runner.assert(
			rep("(cond true 7)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test("MACRO: Evaluate cond with one false condition", () => {
		runner.assert(
			rep("(cond false 7)", sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test("MACRO: Macroexpand cond with two pairs", () => {
		runner.assert(
			rep("(macroexpand (cond X Y Z T))", sharedEnv),
			printString(
				new ListNode([
					new SymbolNode("if"),
					new SymbolNode("X"),
					new SymbolNode("Y"),
					new ListNode([
						new SymbolNode("cond"),
						new SymbolNode("Z"),
						new SymbolNode("T"),
					]),
				]),
				true,
			),
		);
	});

	runner.test("MACRO: Evaluate cond with two true conditions", () => {
		runner.assert(
			rep("(cond true 7 true 8)", sharedEnv),
			printString(new NumberNode(7), true),
		);
	});

	runner.test(
		"MACRO: Evaluate cond with first false and second true condition",
		() => {
			runner.assert(
				rep("(cond false 7 true 8)", sharedEnv),
				printString(new NumberNode(8), true),
			);
		},
	);

	runner.test("MACRO: Evaluate cond with all false conditions", () => {
		runner.assert(
			rep("(cond false 7 false 8)", sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test(`MACRO: Evaluate cond with "else" clause`, () => {
		runner.assert(
			rep(`(cond false 7 false 8 "else" 9)`, sharedEnv),
			printString(new NumberNode(9), true),
		);
	});

	runner.test(`MACRO: Evaluate cond with true condition before "else"`, () => {
		runner.assert(
			rep(`(cond false 7 (= 2 2) 8 "else" 9)`, sharedEnv),
			printString(new NumberNode(8), true),
		);
	});

	runner.test(
		`MACRO: Evaluate cond with all false conditions and no "else"`,
		() => {
			runner.assert(
				rep("(cond false 7 false 8 false 9)", sharedEnv),
				printString(new NilNode(), true),
			);
		},
	);
});

runner.test("MACRO: Testing EVAL in let*", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: Evaluate cond inside let* binding", () => {
		runner.assert(
			rep(`(let* (x (cond false "no" true "yes")) x)`, sharedEnv),
			printString(new StringNode("yes"), true),
		);
	});
});

runner.test("MACRO: Testing EVAL in vector let*", () => {
	const sharedEnv = initEnv();

	runner.test("MACRO: Evaluate cond inside vector let* binding", () => {
		runner.assert(
			rep(`(let* [x (cond false "no" true "yes")] x)`, sharedEnv),
			printString(new StringNode("yes"), true),
		);
	});
});

runner.test("MACRO: Test that macros use closures", () => {
	const sharedEnv = initEnv();

	rep("(def! x 2)", sharedEnv);
	rep("(defmacro! a (fn* [] x))", sharedEnv);

	runner.test("MACRO: Macro uses outer x", () => {
		runner.assert(rep("(a)", sharedEnv), printString(new NumberNode(2), true));
	});

	runner.test("MACRO: Macro uses outer x despite inner x binding", () => {
		runner.assert(
			rep("(let* (x 3) (a))", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});
});

runner.report();
