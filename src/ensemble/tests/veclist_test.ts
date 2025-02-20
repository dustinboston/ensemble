/**
 * Test vec and list functions.
 * Imported from 'step7_quote.mal' tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

import runner from "./test_runner.ts";

import { initEnv, rep } from "../lib.ts";
import { printString } from "../printer.ts";
import {
	ListNode,
	NilNode,
	NumberNode,
	StringNode,
	VectorNode,
} from "../types.ts";

runner.test("VECLIST: Testing vec function", () => {
	const sharedEnv = initEnv();

	runner.test(
		"VECLIST: the vec function converts an empty list into a vector",
		() => {
			runner.assert(
				rep("(vec (list))", sharedEnv),
				printString(new VectorNode([]), true),
			);
		},
	);

	runner.test(
		"VECLIST: the vec function converts a list with one number into a vector",
		() => {
			runner.assert(
				rep("(vec (list 1))", sharedEnv),
				printString(new VectorNode([new NumberNode(1)]), true),
			);
		},
	);

	runner.test(
		"VECLIST: the vec function converts a list with multiple numbers into a vector",
		() => {
			runner.assert(
				rep("(vec (list 1 2))", sharedEnv),
				printString(
					new VectorNode([new NumberNode(1), new NumberNode(2)]),
					true,
				),
			);
		},
	);

	runner.test("VECLIST: vec returns a an empty vector", () => {
		runner.assert(
			rep("(vec [])", sharedEnv),
			printString(new VectorNode([]), true),
		);
	});

	runner.test("VECLIST: vec returns a vector with values", () => {
		runner.assert(
			rep("(vec [1 2])", sharedEnv),
			printString(new VectorNode([new NumberNode(1), new NumberNode(2)]), true),
		);
	});
});

runner.test(
	"VECLIST: Testing that vec does not mutate the original list",
	() => {
		const sharedEnv = initEnv();

		rep("(def! a (list 1 2))", sharedEnv);

		runner.test("VECLIST: symbols are evaluated within vecs", () => {
			runner.assert(
				rep("(vec a)", sharedEnv),
				printString(
					new VectorNode([new NumberNode(1), new NumberNode(2)]),
					true,
				),
			);
		});

		runner.test(
			"VECLIST: evaluating a symbol within a vec does not mutate the symbol",
			() => {
				runner.assert(
					rep("a", sharedEnv),
					printString(
						new ListNode([new NumberNode(1), new NumberNode(2)]),
						true,
					),
				);
			},
		);
	},
);

runner.test("VECLIST: Testing nth, first and rest functions with lists", () => {
	const sharedEnv = initEnv();

	runner.test(
		"VECLIST: nth function returns the element at the given index in a list",
		() => {
			runner.assert(
				rep("(nth (list 1) 0)", sharedEnv),
				printString(new NumberNode(1), true),
			);
		},
	);

	runner.test(
		"VECLIST: nth function returns the correct element for a multi-element list",
		() => {
			runner.assert(
				rep("(nth (list 1 2) 1)", sharedEnv),
				printString(new NumberNode(2), true),
			);
		},
	);

	runner.test(
		"VECLIST: nth function returns nil when the element at the index is nil",
		() => {
			runner.assert(
				rep("(nth (list 1 2 nil) 2)", sharedEnv),
				printString(new NilNode(), true),
			);
		},
	);

	runner.test(
		"VECLIST: redefining a variable using nth function returns the correct value",
		() => {
			rep('(def! x "x") (def! x (nth (list 1 2) 2))', sharedEnv);
			runner.assert(rep("x", sharedEnv), printString(new StringNode('"x"')));
		},
	);

	runner.test(
		"VECLIST: first function returns nil when called on an empty list",
		() => {
			runner.assert(
				rep("(first (list))", sharedEnv),
				printString(new NilNode(), true),
			);
		},
	);

	runner.test(
		"VECLIST: first function returns the first element when the list has one element",
		() => {
			runner.assert(
				rep("(first (list 6))", sharedEnv),
				printString(new NumberNode(6), true),
			);
		},
	);

	runner.test(
		"VECLIST: first function returns the first element when the list has multiple elements",
		() => {
			runner.assert(
				rep("(first (list 7 8 9))", sharedEnv),
				printString(new NumberNode(7), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns an empty list when called on an empty list",
		() => {
			runner.assert(
				rep("(rest (list))", sharedEnv),
				printString(new ListNode([]), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns an empty list when called on a single-element list",
		() => {
			runner.assert(
				rep("(rest (list 6))", sharedEnv),
				printString(new ListNode([]), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns the remaining elements when called on a multi-element list",
		() => {
			runner.assert(
				rep("(rest (list 7 8 9))", sharedEnv),
				printString(new ListNode([new NumberNode(8), new NumberNode(9)]), true),
			);
		},
	);
});

runner.test("VECLIST: Testing nth, first, rest with vectors", () => {
	const sharedEnv = initEnv();

	runner.test(
		"VECLIST: nth function returns the element at the given index in a vector",
		() => {
			runner.assert(
				rep("(nth [1] 0)", sharedEnv),
				printString(new NumberNode(1), true),
			);
		},
	);

	runner.test(
		"VECLIST: nth function returns the correct element for a multi-element vector",
		() => {
			runner.assert(
				rep("(nth [1 2] 1)", sharedEnv),
				printString(new NumberNode(2), true),
			);
		},
	);

	runner.test(
		"VECLIST: nth function returns nil when the element at the index is nil in a vector",
		() => {
			runner.assert(
				rep("(nth [1 2 nil] 2)", sharedEnv),
				printString(new NilNode(), true),
			);
		},
	);

	runner.test(
		"VECLIST: redefining a variable using nth function in a vector returns the correct value",
		() => {
			rep('(def! x "x") (def! x (nth [1 2] 2))', sharedEnv);
			runner.assert(
				rep("x", sharedEnv),
				printString(new StringNode("x"), true),
			);
		},
	);

	runner.test(
		"VECLIST: first function returns nil when called on an empty vector",
		() => {
			runner.assert(
				rep("(first [])", sharedEnv),
				printString(new NilNode(), true),
			);
		},
	);

	runner.test("VECLIST: first function returns nil when called on nil", () => {
		runner.assert(
			rep("(first nil)", sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test(
		"VECLIST: first function returns the first element when the vector has one element",
		() => {
			runner.assert(
				rep("(first [10])", sharedEnv),
				printString(new NumberNode(10), true),
			);
		},
	);

	runner.test(
		"VECLIST: first function returns the first element when the vector has multiple elements",
		() => {
			runner.assert(
				rep("(first [10 11 12])", sharedEnv),
				printString(new NumberNode(10), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns an empty vector when called on an empty vector",
		() => {
			runner.assert(
				rep("(rest [])", sharedEnv),
				printString(new ListNode([]), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns an empty vector when called on nil",
		() => {
			runner.assert(
				rep("(rest nil)", sharedEnv),
				printString(new ListNode([]), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns an empty vector when called on a single-element vector",
		() => {
			runner.assert(
				rep("(rest [10])", sharedEnv),
				printString(new ListNode([]), true),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns the remaining elements when called on a multi-element vector",
		() => {
			runner.assert(
				rep("(rest [10 11 12])", sharedEnv),
				printString(
					new ListNode([new NumberNode(11), new NumberNode(12)]),
					true,
				),
			);
		},
	);

	runner.test(
		"VECLIST: rest function returns the remaining elements when called on a cons cell with a vector",
		() => {
			runner.assert(
				rep("(rest (cons 10 [11 12]))", sharedEnv),
				printString(
					new ListNode([new NumberNode(11), new NumberNode(12)]),
					true,
				),
			);
		},
	);
});
