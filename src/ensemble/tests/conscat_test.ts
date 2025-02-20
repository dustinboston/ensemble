import { initEnv, rep } from "../lib.ts";
import { printString } from "../printer.ts";
import { BooleanNode, ListNode, NumberNode, VectorNode } from "../types.ts";
import runner from "./test_runner.ts";

runner.test("Cons/Concat: Testing cons function", async () => {
	const sharedEnv = initEnv();

	runner.test("Cons/Concat: cons a number and empty list", () => {
		runner.assert(
			rep("(cons 1 (list))", sharedEnv),
			printString(new ListNode([new NumberNode(1)]), true),
		);
	});

	runner.test("Cons/Concat: cons a number and list containing a number", () => {
		runner.assert(
			rep("(cons 1 (list 2))", sharedEnv),
			printString(new ListNode([new NumberNode(1), new NumberNode(2)]), true),
		);
	});

	runner.test(
		"Cons/Concat: cons a number and list containing several numbers",
		() => {
			runner.assert(
				rep("(cons 1 (list 2 3))", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new NumberNode(2),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test("Cons/Concat: cons two lists", () => {
		runner.assert(
			rep("(cons (list 1) (list 2 3))", sharedEnv),
			printString(
				new ListNode([
					new ListNode([new NumberNode(1)]),
					new NumberNode(2),
					new NumberNode(3),
				]),
				true,
			),
		);
	});
});

runner.test("Cons/Concat: Testing def + cons", async () => {
	const sharedEnv = initEnv();

	rep("(def! a (list 2 3))", sharedEnv);

	runner.test("Cons/Concat: cons a number and a symbol", () => {
		runner.assert(
			rep("(cons 1 a)", sharedEnv),
			printString(
				new ListNode([new NumberNode(1), new NumberNode(2), new NumberNode(3)]),
				true,
			),
		);
	});

	runner.test("Cons/Concat: cons does not affect symbol value", () => {
		runner.assert(
			rep("a", sharedEnv),
			printString(new ListNode([new NumberNode(2), new NumberNode(3)]), true),
		);
	});
});

runner.test("Cons/Concat: Testing concat function", async () => {
	const sharedEnv = initEnv();

	runner.test("Cons/Concat: concat nothing", () => {
		runner.assert(
			rep("(concat)", sharedEnv),
			printString(new ListNode([]), true),
		);
	});

	runner.test("Cons/Concat: concat a list of numbers", () => {
		runner.assert(
			rep("(concat (list 1 2))", sharedEnv),
			printString(new ListNode([new NumberNode(1), new NumberNode(2)]), true),
		);
	});

	runner.test("Cons/Concat: concat two lists of numbers", () => {
		runner.assert(
			rep("(concat (list 1 2) (list 3 4))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(2),
					new NumberNode(3),
					new NumberNode(4),
				]),
				true,
			),
		);
	});

	runner.test("Cons/Concat: concat three lists of numbers", () => {
		runner.assert(
			rep("(concat (list 1 2) (list 3 4) (list 5 6))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(2),
					new NumberNode(3),
					new NumberNode(4),
					new NumberNode(5),
					new NumberNode(6),
				]),
				true,
			),
		);
	});

	runner.test("Cons/Concat: concat a list that concats nothing", () => {
		runner.assert(
			rep("(concat (concat))", sharedEnv),
			printString(new ListNode([]), true),
		);
	});

	runner.test("Cons/Concat: concat two empty lists", () => {
		runner.assert(
			rep("(concat (list) (list))", sharedEnv),
			printString(new ListNode([]), true),
		);
	});

	runner.test(
		"Cons/Concat: an empty list is equivalent to a concat of nothing",
		() => {
			runner.assert(
				rep("(= () (concat))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);
});

runner.test("Cons/Concat: Testing concat + def!", () => {
	const sharedEnv = initEnv();

	rep("(def! a (list 1 2))", sharedEnv);
	rep("(def! b (list 3 4))", sharedEnv);

	runner.test("Cons/Concat: concat evaluated symbols and lists", () => {
		runner.assert(
			rep("(concat a b (list 5 6))", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(2),
					new NumberNode(3),
					new NumberNode(4),
					new NumberNode(5),
					new NumberNode(6),
				]),
				true,
			),
		);
	});

	runner.test("Cons/Concat: concat does not affect symbol values", () => {
		runner.assert(
			rep("a", sharedEnv),
			printString(new ListNode([new NumberNode(1), new NumberNode(2)]), true),
		);
	});

	runner.test(
		"Cons/Concat: symbols maintain their defined values after concat",
		() => {
			runner.assert(
				rep("b", sharedEnv),
				printString(new ListNode([new NumberNode(3), new NumberNode(4)]), true),
			);
		},
	);
});

runner.test("Cons/Concat: Testing cons and concat with vectors", () => {
	const sharedEnv = initEnv();

	runner.test(
		"Cons/Concat: consing a number and vector results in a list",
		() => {
			runner.assert(
				rep("(cons 1 [])", sharedEnv),
				printString(new ListNode([new NumberNode(1)]), true),
			);
		},
	);

	runner.test("Cons/Concat: the car is injected into the list as-is", () => {
		runner.assert(
			rep("(cons [1] [2 3])", sharedEnv),
			printString(
				new ListNode([
					new VectorNode([new NumberNode(1)]),
					new NumberNode(2),
					new NumberNode(3),
				]),
				true,
			),
		);
	});

	runner.test(
		"Cons/Concat: each item in the cdr is injected into the list",
		() => {
			runner.assert(
				rep("(cons 1 [2 3])", sharedEnv),
				printString(
					new ListNode([
						new NumberNode(1),
						new NumberNode(2),
						new NumberNode(3),
					]),
					true,
				),
			);
		},
	);

	runner.test("Cons/Concat: concat treats vectors and lists the same", () => {
		runner.assert(
			rep("(concat [1 2] (list 3 4) [5 6])", sharedEnv),
			printString(
				new ListNode([
					new NumberNode(1),
					new NumberNode(2),
					new NumberNode(3),
					new NumberNode(4),
					new NumberNode(5),
					new NumberNode(6),
				]),
				true,
			),
		);
	});

	runner.test(
		"Cons/Concat: concat returns a list when concatenating a vector",
		() => {
			runner.assert(
				rep("(concat [1 2])", sharedEnv),
				printString(new ListNode([new NumberNode(1), new NumberNode(2)]), true),
			);
		},
	);
});
