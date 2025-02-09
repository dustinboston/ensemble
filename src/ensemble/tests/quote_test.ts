/**
 * Test quoting.
 * Imported from `step7_quote.mal` tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

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
import { assertEquals, test } from "./test_runner.ts";

test(`QUOTE: Testing regular quote`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: quote returns a number`, () => {
		assertEquals(
			rep(`(quote 7)`, sharedEnv),
			// 7
			printString(new NumberNode(7), true),
		);
	});

	test(`QUOTE: quote returns a list of numbers`, () => {
		assertEquals(
			rep(`(quote (1 2 3))`, sharedEnv),
			// (1 2 3)
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	test(`QUOTE: quote returns a nested list of numbers`, () => {
		assertEquals(
			rep(`(quote (1 2 (3 4)))`, sharedEnv),
			// (1 2 (3 4))
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

test(`QUOTE: Testing simple quasiquote`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: quasiquote returns nil`, () => {
		assertEquals(
			rep(`(quasiquote nil)`, sharedEnv),
			// nil
			printString(new NilNode(), true),
		);
	});

	test(`QUOTE: quasiquote returns 7`, () => {
		assertEquals(
			rep(`(quasiquote 7)`, sharedEnv),
			// 7
			printString(new NumberNode(7), true),
		);
	});

	test(`QUOTE: quasiquote returns a symbol`, () => {
		assertEquals(
			rep(`(quasiquote a)`, sharedEnv),
			// a
			printString(new SymbolNode("a"), true),
		);
	});

	test(`QUOTE: returns a map`, () => {
		assertEquals(
			rep(`(quasiquote {"a" b})`, sharedEnv),
			// {"a" b}
			printString(new MapNode(new Map([['"a"', new SymbolNode("b")]])), true),
		);
	});
});

test(`QUOTE: Testing quasiquote with lists`, () => {
	const sharedEnv = initEnv();
	test(`QUOTE: quasiquote returns an empty list`, () => {
		assertEquals(
			rep(`(quasiquote ())`, sharedEnv),
			// ()
			printString(new ListNode([]), true),
		);
	});

	test(`QUOTE: quasiquote returns a list`, () => {
		assertEquals(
			rep(`(quasiquote (1 2 3))`, sharedEnv),
			// (1 2 3)
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquote returns a nested list with symbols`, () => {
		assertEquals(
			rep(`(quasiquote (a))`, sharedEnv),
			// (a)
			printString(new ListNode([new SymbolNode("a")]), true),
		);
	});

	test(`QUOTE: quasiquote return a nested list of numbers`, () => {
		assertEquals(
			rep(`(quasiquote (1 2 (3 4)))`, sharedEnv),
			// (1 2 (3 4))
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

	test(`QUOTE: quasiquote returns a nested list with nil`, () => {
		assertEquals(
			rep(`(quasiquote (nil))`, sharedEnv),
			// (nil)
			printString(new ListNode([new NilNode()]), true),
		);
	});

	test(`QUOTE: quasiquote returns numbers and empty lists`, () => {
		assertEquals(
			rep(`(quasiquote (1 ()))`, sharedEnv),
			// (1 ())
			printString(new ListNode([new NumberNode(1), new ListNode([])]), true),
		);
	});

	test(`QUOTE: quasiquote returns empty lists and numbers`, () => {
		assertEquals(
			rep(`(quasiquote (() 1))`, sharedEnv),
			// (() 1)
			printString(new ListNode([new ListNode([]), new NumberNode(1)]), true),
		);
	});

	test(`QUOTE: quasiquote will return empty lists whereever they occur`, () => {
		assertEquals(
			rep(`(quasiquote (1 () 2))`, sharedEnv),
			// (1 () 2)
			printString(
				new ListNode([new NumberNode(1), new ListNode([]), new NumberNode(2)]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquote returns a nested empty list`, () => {
		assertEquals(
			rep(`(quasiquote (()))`, sharedEnv),
			// (())
			printString(new ListNode([new ListNode([])]), true),
		);
	});
});

test(`QUOTE: Testing unquote`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: unquote returns a number that has been quasiquoted`, () => {
		assertEquals(
			rep(`(quasiquote (unquote 7))`, sharedEnv),
			// 7
			printString(new NumberNode(7), true),
		);
	});

	test(`QUOTE: define a variable to test unquoting`, () => {
		assertEquals(
			rep("(def! a 8)", sharedEnv),
			// 8
			printString(new NumberNode(8), true),
		);
	});

	test(`QUOTE: a quasiquoted symbol returns the symbol`, () => {
		assertEquals(
			rep(`(quasiquote a)`, sharedEnv),
			// a
			printString(new SymbolNode("a"), true),
		);
	});

	test(`QUOTE: unquoting a symbol allows the symbol to be evaluated`, () => {
		assertEquals(
			rep(`(quasiquote (unquote a))`, sharedEnv),
			// 8
			printString(new NumberNode(8), true),
		);
	});

	test(`QUOTE: quasiquote prevents the symbol from being evaluated`, () => {
		assertEquals(
			rep(`(quasiquote (1 a 3))`, sharedEnv),
			// (1 a 3)
			printString(
				new ListNode([
					new NumberNode(1),
					new SymbolNode("a"),
					new NumberNode(3),
				]),
				true,
			),
		);
	});

	test(`QUOTE: unquote allows the symbol to be evaluated`, () => {
		assertEquals(
			rep(`(quasiquote (1 (unquote a) 3))`, sharedEnv),
			// (1 8 3)
			printString(
				new ListNode([new NumberNode(1), new NumberNode(8), new NumberNode(3)]),
				true,
			),
		);
	});

	test(`QUOTE: define a symbol with a quoted list for testing`, () => {
		assertEquals(
			rep('(def! b (quote (1 "b" "d")))', sharedEnv),
			// (1 "b" "d")
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

	test(`QUOTE: quasiquote prevents variables from being evaluated`, () => {
		assertEquals(
			rep(`(quasiquote (1 b 3))`, sharedEnv),
			// (1 b 3)
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

	test(`QUOTE: unquote allows variables to be evaluated in a nested list`, () => {
		assertEquals(
			rep(`(quasiquote (1 (unquote b) 3))`, sharedEnv),
			// (1 (1 "b" "d") 3)
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
	});

	test(`QUOTE: unquoting has the effect of combining nested lists`, () => {
		assertEquals(
			rep(`(quasiquote ((unquote 1) (unquote 2)))`, sharedEnv),
			// (1 2)
			printString(new ListNode([new NumberNode(1), new NumberNode(2)]), true),
		);
	});
});

test(`QUOTE: Quasiquote and environments`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: unquote works with a variable defined with let*`, () => {
		assertEquals(
			rep(`(let* (x 0) (quasiquote (unquote x)))`, sharedEnv),
			// 0
			printString(new NumberNode(0), true),
		);
	});
});

test(`QUOTE: Testing splice-unquote`, () => {
	const sharedEnv = initEnv();
	test(`QUOTE: define a symbol, "c", with a quoted list for testing`, () => {
		assertEquals(
			rep('(def! c (quote (1 "b" "d")))', sharedEnv),
			// (1 "b" "d")
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

	test(`QUOTE: quasiquote returns a list without evaluating symbols`, () => {
		assertEquals(
			rep(`(quasiquote (1 c 3))`, sharedEnv),
			// (1 c 3)
			printString(
				new ListNode([
					new NumberNode(1),
					new SymbolNode("c"),
					new NumberNode(3),
				]),
				true,
			),
		);
	});

	test(`QUOTE: splice-unquote injects a symbol in place after evaluation`, () => {
		assertEquals(
			rep(`(quasiquote (1 (splice-unquote c) 3))`, sharedEnv),
			// (1 1 "b" "d" 3)
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
	});

	test(`QUOTE: splice-unquotes works as the last item in a list`, () => {
		assertEquals(
			rep(`(quasiquote (1 (splice-unquote c)))`, sharedEnv),
			// (1 1 "b" "d")
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

	test(`QUOTE: splice-unquote works at the beginning of a list`, () => {
		assertEquals(
			rep(`(quasiquote ((splice-unquote c) 2))`, sharedEnv),
			// (1 "b" "d" 2)
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

	test(`QUOTE: splice-unquote can reuse symbols`, () => {
		assertEquals(
			rep(`(quasiquote ((splice-unquote c) (splice-unquote c)))`, sharedEnv),
			// (1 "b" "d" 1 "b" "d")
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

test(`QUOTE: Testing symbol equality`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: two quoted lists with the same contents are equal`, () => {
		assertEquals(
			rep(`(= (quote abc) (quote abc))`, sharedEnv),
			// true
			printString(new BooleanNode(true), true),
		);
	});

	test(`QUOTE: two  quoted lists with different contents are not equal`, () => {
		assertEquals(
			rep(`(= (quote abc) (quote abcd))`, sharedEnv),
			// false
			printString(new BooleanNode(false), true),
		);
	});

	test(`QUOTE: quote does not "stringify" symbols`, () => {
		assertEquals(
			rep(`(= (quote abc) "abc")`, sharedEnv),
			// false
			printString(new BooleanNode(false), true),
		);
	});

	test(`QUOTE: quote doesn "stringify" symbols at the end of a list`, () => {
		assertEquals(
			rep(`(= "abc" (quote abc))`, sharedEnv),
			// false
			printString(new BooleanNode(false), true),
		);
	});

	test(`QUOTE: str stringifies a quoted value`, () => {
		assertEquals(
			rep(`(= "abc" (str (quote abc)))`, sharedEnv),
			// true
			printString(new BooleanNode(true), true),
		);
	});

	test(`QUOTE: quote does not attempt to evaluate symbols`, () => {
		assertEquals(
			rep(`(= (quote abc) nil)`, sharedEnv),
			// false
			printString(new BooleanNode(false), true),
		);
	});

	test(`QUOTE: nil has no effect on quoting`, () => {
		assertEquals(
			rep(`(= nil (quote abc))`, sharedEnv),
			// false
			printString(new BooleanNode(false), true),
		);
	});
});

test(`QUOTE: Test quine`, () => {
	const sharedEnv = initEnv();
	test(`QUOTE: You can make your brain explode by creating a quine with lots of quoting`, () => {
		assertEquals(
			rep(
				`((fn* (q) (quasiquote ((unquote q) (quote (unquote q))))) (quote (fn* (q) (quasiquote ((unquote q) (quote (unquote q)))))))`,
				sharedEnv,
			),
			// ((fn* (q) (quasiquote ((unquote q) (quote (unquote q)))))
			//   (quote (fn* (q) (quasiquote ((unquote q) (quote (unquote q)))))))
			printString(
				// (
				new ListNode([
					// (
					new ListNode([
						// (fn*
						new SymbolNode("fn*"),
						// (
						new ListNode([
							// q
							new SymbolNode("q"),
						]),
						// )
						// (
						new ListNode([
							// quasiquote
							new SymbolNode("quasiquote"),
							// (
							new ListNode([
								// (
								new ListNode([
									// unquote
									new SymbolNode("unquote"),
									// q
									new SymbolNode("q"),
								]),
								// )
								// (
								new ListNode([
									// quote
									new SymbolNode("quote"),
									// (
									new ListNode([
										// unquote
										new SymbolNode("unquote"),
										// q
										new SymbolNode("q"),
									]),
									// )
								]),
								// )
							]),
							// )
						]),
						// )
					]),
					// )
					// (
					new ListNode([
						// quote
						new SymbolNode("quote"),
						// (
						new ListNode([
							// fn*
							new SymbolNode("fn*"),
							// (
							new ListNode([
								// q
								new SymbolNode("q"),
							]),
							// )
							// (
							new ListNode([
								// quasiquote
								new SymbolNode("quasiquote"),
								// (
								new ListNode([
									// (
									new ListNode([
										// unquote
										new SymbolNode("unquote"),
										// q
										new SymbolNode("q"),
									]),
									// )
									// (
									new ListNode([
										// quote
										new SymbolNode("quote"),
										// (
										new ListNode([
											// unquote
											new SymbolNode("unquote"),
											// q
											new SymbolNode("q"),
										]),
										// )
									]),
									// )
								]),
								// )
							]),
							// )
						]),
						// )
					]),
					// )
				]),
				// )
				true,
			),
		);
	});
});

test(`QUOTE: Testing quasiquote with vectors`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: quasiquote returns a vector with the same structure as the original`, () => {
		assertEquals(
			rep(`(quasiquote [])`, sharedEnv),
			// []
			printString(new VectorNode([]), true),
		);
	});

	test(`QUOTE: quasiquote returns a nested vector`, () => {
		assertEquals(
			rep(`(quasiquote [[]])`, sharedEnv),
			// [[]]
			printString(new VectorNode([new VectorNode([])]), true),
		);
	});

	test(`QUOTE: quasiquote returns a list nested in a vector`, () => {
		assertEquals(
			rep(`(quasiquote [()])`, sharedEnv),
			// [()]
			printString(new VectorNode([new ListNode([])]), true),
		);
	});

	test(`QUOTE: quasiquote returns a vector nested in a list`, () => {
		assertEquals(
			rep(`(quasiquote ([]))`, sharedEnv),
			// ([])
			printString(new ListNode([new VectorNode([])]), true),
		);
	});

	test(`QUOTE: define a symbol to test complex macro expressions`, () => {
		assertEquals(
			rep(`(def! a 8)`, sharedEnv),
			// 8
			printString(new NumberNode(8), true),
		);
	});

	test(`QUOTE: quasiquote returns a vector without evaluating symbols`, () => {
		assertEquals(
			rep("`[1 a 3]", sharedEnv),
			// [1 a 3]
			printString(
				new VectorNode([
					new NumberNode(1),
					new SymbolNode("a"),
					new NumberNode(3),
				]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquote returns a vector with lots of nested vectors`, () => {
		assertEquals(
			rep(`(quasiquote [a [] b [c] d [e f] g])`, sharedEnv),
			// [a [] b [c] d [e f] g]
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
	});
});

test(`QUOTE: Misplaced unquote or splice-unquote`, () => {
	const sharedEnv = initEnv();

	test(`QUOTE: unquote does nothing as the last argument`, () => {
		assertEquals(
			rep("`(0 unquote)", sharedEnv),
			// (0 unquote)
			printString(
				new ListNode([new NumberNode(0), new SymbolNode("unquote")]),
				true,
			),
		);
	});

	test(`QUOTE: splice-unquote does nothing as the last argument`, () => {
		assertEquals(
			rep("`(0 splice-unquote)", sharedEnv),
			// (0 splice-unquote)
			printString(
				new ListNode([new NumberNode(0), new SymbolNode("splice-unquote")]),
				true,
			),
		);
	});

	test(`QUOTE: unquote is not evaluated within a quasi-quoted vector`, () => {
		assertEquals(
			rep("`[unquote 0]", sharedEnv),
			// [unquote 0]
			printString(
				new VectorNode([new SymbolNode("unquote"), new NumberNode(0)]),
				true,
			),
		);
	});

	test(`QUOTE: splice-unquote is not evaluated within a quasi-quoted vector`, () => {
		assertEquals(
			rep("`[splice-unquote 0]", sharedEnv),
			// [splice-unquote 0]
			printString(
				new VectorNode([new SymbolNode("splice-unquote"), new NumberNode(0)]),
				true,
			),
		);
	});
});

test(`QUOTE: Debugging quasiquote`, () => {
	const sharedEnv = initEnv();
	test(`QUOTE: quasiquoteexpand returns nil as-is`, () => {
		assertEquals(
			rep(`(quasiquoteexpand nil)`, sharedEnv),
			// nil
			printString(new NilNode(), true),
		);
	});

	test(`QUOTE: quasiquoteexpand returns a number as-is`, () => {
		assertEquals(
			rep(`(quasiquoteexpand 7)`, sharedEnv),
			// 7
			printString(new NumberNode(7), true),
		);
	});

	test(`QUOTE: quasiquoteexpand expands an expression without evaluating a symbol`, () => {
		assertEquals(
			rep(`(quasiquoteexpand a)`, sharedEnv),
			// (quote a)
			printString(
				new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands a map without evaluating a symbol`, () => {
		assertEquals(
			rep(`(quasiquoteexpand {"a" b})`, sharedEnv),
			// (quote {"a" b})
			printString(
				new ListNode([
					new SymbolNode("quote"),
					new MapNode(new Map([['"a"', new SymbolNode("b")]])),
				]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands an empty list as-is`, () => {
		assertEquals(
			rep(`(quasiquoteexpand ())`, sharedEnv),
			// ()
			printString(new ListNode([]), true),
		);
	});

	test(`QUOTE: quasiquoteexpand expands a list of numbers to conses`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 2 3))`, sharedEnv),
			// (cons 1 (cons 2 (cons 3 ())))
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
	});

	test(`QUOTE: quasiquoteexpand expands a list of symbols into a cons and quote`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (a))`, sharedEnv),
			// (cons (quote a) ())
			printString(
				new ListNode([
					new SymbolNode("cons"),
					new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
					new ListNode([]),
				]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands a list of lists nested conses`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 2 (3 4)))`, sharedEnv),
			// (cons 1 (cons 2 (cons (cons 3 (cons 4 ())) ())))
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
	});

	test(`QUOTE: quasiquoteexpand expands a list with nil into a cons of nil and an empty list`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (nil))`, sharedEnv),
			// (cons nil ())
			printString(
				new ListNode([new SymbolNode("cons"), new NilNode(), new ListNode([])]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands numbers and empty lists to conses, switching the order`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 ()))`, sharedEnv),
			// (cons 1 (cons () ()))
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
	});

	test(`QUOTE: quasiquoteexpand expands empty lists and numbers into conses, switching the order`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (() 1))`, sharedEnv),
			// (cons () (cons 1 ()))
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
	});

	test(`QUOTE: quasiquoteexpand expands a list of numbers and and empty lists into conses`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 () 2))`, sharedEnv),
			// (cons 1 (cons () (cons 2 ())))
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
	});

	test(`QUOTE: quasiquoteexpand expands nested empty lists a cons of two empty lists`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (()))`, sharedEnv),
			// (cons () ())
			printString(
				new ListNode([
					new SymbolNode("cons"),
					new ListNode([]),
					new ListNode([]),
				]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand quotes and conses many symbols and nested lists`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (f () g (h) i (j k) l))`, sharedEnv),
			// (cons (quote f) (cons () (cons (quote g) (cons (cons
			//       (quote h) ()) (cons (quote i) (cons (cons (quote j)
			//                 (cons (quote k) ())) (cons (quote l) ())))))))
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
									new ListNode([new SymbolNode("quote"), new SymbolNode("h")]),
									new ListNode([]),
								]),
								new ListNode([
									new SymbolNode("cons"),
									new ListNode([new SymbolNode("quote"), new SymbolNode("i")]),
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
	});

	test(`QUOTE: unquote defeats quasiquoteexpand in battle`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (unquote 7))`, sharedEnv),
			// 7
			printString(new NumberNode(7), true),
		);
	});

	test(`QUOTE: quasiquoteexpand expands a symbol to a quoted symbol`, () => {
		assertEquals(
			rep(`(quasiquoteexpand a)`, sharedEnv),
			// (quote a)
			printString(
				new ListNode([new SymbolNode("quote"), new SymbolNode("a")]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands an unquoted symbol into the symbol`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (unquote a))`, sharedEnv),
			// a
			printString(new SymbolNode("a"), true),
		);
	});

	test(`QUOTE: quasiquoteexpand expands a mixed list into conses and quotes`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 a 3))`, sharedEnv),
			// (cons 1 (cons (quote a) (cons 3 ())))
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
	});

	test(`QUOTE: quasiquoteexpand expands into conses and unquotes symbols `, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 (unquote a) 3))`, sharedEnv),
			// (cons 1 (cons a (cons 3 ())))
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
	});

	test(`QUOTE: quasiquoteexpand is still consing and quoting`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 b 3))`, sharedEnv),
			// (cons 1 (cons (quote b) (cons 3 ())))
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

	test(`QUOTE: unquote within quasiquoteexpand doesn't evaluate the symbols`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 (unquote b) 3))`, sharedEnv),
			// (cons 1 (cons b (cons 3 ())))
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
	});

	test(`QUOTE: quasiquoteexpand expands lists of unquotes into conses`, () => {
		assertEquals(
			rep(`(quasiquoteexpand ((unquote 1) (unquote 2)))`, sharedEnv),
			// (cons 1 (cons 2 ()))
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
	});

	test(`QUOTE: quasiquoteexpand expands splice-unquote into concat expressions`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (a (splice-unquote (b c)) d))`, sharedEnv),
			// (cons (quote a) (concat (b c) (cons (quote d) ())))
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
	});

	test(`QUOTE: quasiquoteexpand is still doing its thang`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 c 3))`, sharedEnv),
			// (cons 1 (cons (quote c) (cons 3 ())))
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

	test(`QUOTE: splice-unquote within a quasiquoted list expands to concat`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 (splice-unquote c) 3))`, sharedEnv),
			// (cons 1 (concat c (cons 3 ())))
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
	});

	test(`QUOTE: splice-unquote within a quasiquoted list expands to concat and does not evaluate variables`, () => {
		assertEquals(
			rep(`(quasiquoteexpand (1 (splice-unquote c)))`, sharedEnv),
			// (cons 1 (concat c ()))
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
	});

	test(`QUOTE: splice-unquote within a quasiquoted list expands to concat, and numbers to cons`, () => {
		assertEquals(
			rep(`(quasiquoteexpand ((splice-unquote c) 2))`, sharedEnv),
			// (concat c (cons 2 ()))
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
	});

	test(`QUOTE: splice-unquoting the same symbol multiple times within a quasiquoted list expands all to concat`, () => {
		assertEquals(
			rep(
				`(quasiquoteexpand ((splice-unquote c) (splice-unquote c)))`,
				sharedEnv,
			),
			// (concat c (concat c ()))
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
	});

	test(`QUOTE: quasiquoteexpand expands a vector literal [] into (vec ())`, () => {
		assertEquals(
			rep(`(quasiquoteexpand [])`, sharedEnv),
			// (vec ())
			printString(
				new ListNode([new SymbolNode("vec"), new ListNode([])]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands nested vectors into nested consed vecs`, () => {
		assertEquals(
			rep(`(quasiquoteexpand [[]])`, sharedEnv),
			// (vec (cons (vec ()) ()))
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
	});

	test(`QUOTE: quasiquoteexpand expands an empty list inside of a vector into a vec with a cons of two empty lists`, () => {
		assertEquals(
			rep(`(quasiquoteexpand [()])`, sharedEnv),
			// (vec (cons () ()))
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
	});

	test(`QUOTE: quasiquoteexpand expands an empty vector inside of a list into a cons of vec and an empty list`, () => {
		assertEquals(
			rep(`(quasiquoteexpand ([]))`, sharedEnv),
			// (cons (vec ()) ())
			printString(
				new ListNode([
					new SymbolNode("cons"),
					new ListNode([new SymbolNode("vec"), new ListNode([])]),
					new ListNode([]),
				]),
				true,
			),
		);
	});

	test(`QUOTE: quasiquoteexpand expands vectors to vec, conses the contents, and quotes the symbols`, () => {
		assertEquals(
			rep(`(quasiquoteexpand [1 a 3])`, sharedEnv),
			// (vec (cons 1 (cons (quote a) (cons 3 ()))))
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
	});

	// TODO: Actual matches the value in step7_quote.mal, but the AST won't align
	// Maybe there is a bug, but the regular mal tests pass.
	// test(`QUOTE: quasiquoteexpand can handle shenanigans`, () => {
	//     assertEquals(
	//         rep(
	//             `(quasiquoteexpand [a [] b [c] d [e f] g])`,
	//             sharedEnv,
	//         ),
	//         // actual:   (vec (cons (quote a) (cons (vec ()) (cons (quote b) (cons (vec (cons (quote c) ())) (cons (quote d) (cons (vec (cons (quote e) (cons (quote f) ()))) (cons (quote g) ()))))))))
	//         // expected: (vec (cons (quote a) (cons (vec ()) (cons (quote b) (cons (vec (cons (quote c) ())) (cons (quote d) (cons (vec (cons (quote e) (cons (quote f) ()))) (cons (quote g) ()))))))))
	//         printString(
	//             // (vec
	//             new ListNode([new SymbolNode('vec'),
	//                 // (cons
	//                 new ListNode([new SymbolNode('cons'),
	//                     // (quote a)
	//                     new ListNode([new SymbolNode('quote'), new SymbolNode('a')]),
	//                     // (cons
	//                     new ListNode([new SymbolNode('cons'),
	//                         // (vec ())
	//                         new ListNode([new SymbolNode('vec'), new ListNode([])]),
	//                         // (cons
	//                         new ListNode([new SymbolNode('cons'),
	//                             // (quote b)
	//                             new ListNode([new SymbolNode('quote'), new SymbolNode('b')]),
	//                             // (cons
	//                             new ListNode([new SymbolNode('cons'),
	//                                 // (vec
	//                                 new ListNode([new SymbolNode('vec'),
	//                                     // (cons
	//                                     new ListNode([new SymbolNode('cons'),
	//                                         // (quote c)
	//                                         new ListNode([new SymbolNode('quote'), new SymbolNode('c')]),
	//                                         // ()))
	//                                         new ListNode([]) ]) ]),
	//                                 // (cons
	//                                 new ListNode([new SymbolNode('cons'),
	//                                     // (quote d)
	//                                     new ListNode([new SymbolNode('quote'), new SymbolNode('d')]),
	//                                     // (cons
	//                                     new ListNode([new SymbolNode('cons'),
	//                                         // (vec
	//                                         new ListNode([new SymbolNode('vec'),
	//                                             // (cons
	//                                             new ListNode([new SymbolNode('cons'),
	//                                                 // (quote e)
	//                                                 new ListNode([new SymbolNode('quote'), new SymbolNode('e')]),
	//                                                 // (cons
	//                                                 new ListNode([new SymbolNode('cons'),
	//                                                     // (quote f)
	//                                                     new ListNode([new SymbolNode('quote'), new SymbolNode('f')]),
	//                                                     //  ())))
	//                                                     new ListNode([]) ]) ]) ]),

	//                                         // (cons
	//                                         new ListNode([new SymbolNode('cons'),
	//                                             // (quote g)
	//                                             new ListNode([new SymbolNode('quote'), new SymbolNode('g')]),
	//                                             // ()            )  )  )  )  )  )  )  )
	//                                             new ListNode([]) ]) ]) ]) ]) ]) ]) ]) ]),
	//             true,
	//         ),
	//     );
	// });
});
