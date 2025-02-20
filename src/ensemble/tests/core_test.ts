/**
 * TODO: Clean and test
 * Test core functions:
 * Imported from "step9_try.mal" tests.
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
	KeywordNode,
	ListNode,
	NilNode,
	NumberNode,
	SymbolNode,
	VectorNode,
} from "../types.ts";

import runner from "./test_runner.ts";

runner.test("CORE: Testing is? functions", () => {
	const sharedEnv = initEnv();

	runner.test("CORE: isSymbol with quoted symbol should be true", () => {
		runner.assert(
			rep("(symbol? 'abc)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isSymbol with string should be false", () => {
		runner.assert(
			rep('(symbol? "abc")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isNil with nil should be true", () => {
		runner.assert(
			rep("(nil? nil)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isNil with true should be false", () => {
		runner.assert(
			rep("(nil? true)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isTrue with true should be true", () => {
		runner.assert(
			rep("(true? true)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isTrue with false should be false", () => {
		runner.assert(
			rep("(true? false)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isTrue with isTrue should be false", () => {
		runner.assert(
			rep("(true? true?)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isFalse with false should be true", () => {
		runner.assert(
			rep("(false? false)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isFalse with true should be false", () => {
		runner.assert(
			rep("(false? true)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
});

runner.test("CORE: Testing apply", () => {
	const sharedEnv = initEnv();

	runner.test("CORE: apply should work on a list", () => {
		runner.assert(
			rep("(apply + (list 2 3))", sharedEnv),
			printString(new NumberNode(5), true),
		);
	});

	runner.test("CORE: apply should apply to all proceeding expressions", () => {
		runner.assert(
			rep("(apply + 4 (list 5))", sharedEnv),
			printString(new NumberNode(9), true),
		);
	});

	runner.test("CORE: should apply to nested lists", () => {
		const oldLog = console.log;
		let calls = 0;
		let args: string[] = [];
		console.log = (...x) => {
			args = x;
			calls++;
		};

		try {
			runner.assert(
				rep('(apply prn (list 1 2 "3" (list)))', sharedEnv),
				printString(new NilNode(), true),
			);
		} finally {
			console.log = oldLog;
		}

		runner.assert(args, ['1 2 "3" ()']);
		runner.assert(calls, 1);
	});

	runner.test(
		"CORE: should apply to all proceeding expressions including nested lists",
		() => {
			const oldLog = console.log;
			let calls = 0;
			let args: string[] = [];
			console.log = (...x) => {
				args = x;
				calls++;
			};

			try {
				runner.assert(
					rep('(apply prn 1 2 (list "3" (list)))', sharedEnv),
					printString(new NilNode(), true),
				);
			} finally {
				console.log = oldLog;
			}

			runner.assert(args, ['1 2 "3" ()']);
			runner.assert(calls, 1);
		},
	);

	runner.test("CORE: should apply list to an empty list", () => {
		runner.assert(
			rep("(apply list (list))", sharedEnv),
			printString(new ListNode([]), true),
		);
	});

	runner.test("CORE: should apply isSymbol to a list", () => {
		runner.assert(
			rep("(apply symbol? (list (quote two)))", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});
});

runner.test("CORE: Testing apply with fn* special forms", () => {
	const sharedEnv = initEnv();

	runner.test(
		"CORE: should apply a function (fn*) special form to a list",
		() => {
			runner.assert(
				rep("(apply (fn* (a b) (+ a b)) (list 2 3))", sharedEnv),
				printString(new NumberNode(5), true),
			);
		},
	);

	runner.test(
		"CORE: should apply a function (fn*) special form to all proceeding expressions",
		() => {
			runner.assert(
				rep("(apply (fn* (a b) (+ a b)) 4 (list 5))", sharedEnv),
				printString(new NumberNode(9), true),
			);
		},
	);
});

runner.test("CORE: Testing map function", () => {
	const sharedEnv = initEnv();
	rep("(def! nums (list 1 2 3))", sharedEnv);
	rep("(def! double (fn* (a) (* 2 a)))", sharedEnv);

	runner.test("CORE: double function should double a number", () => {
		runner.assert(
			rep("(double 3)", sharedEnv),
			printString(new NumberNode(6), true),
		);
	});

	runner.test("CORE: should double all numbers in a list", () => {
		runner.assert(
			rep("(map double nums) ", sharedEnv),
			printString(
				new ListNode([new NumberNode(2), new NumberNode(4), new NumberNode(6)]),
				true,
			),
		);
	});

	runner.test(
		"CORE: should map a function (fn*) special form over a list",
		() => {
			runner.assert(
				rep(
					'(map (fn* (x) (symbol? x)) (list 1 (quote two) "three"))',
					sharedEnv,
				),
				printString(
					new ListNode([
						new BooleanNode(false),
						new BooleanNode(true),
						new BooleanNode(false),
					]),
					true,
				),
			);
		},
	);

	runner.test(
		"CORE: mapping a function over an empty list should produce an empty list",
		() => {
			runner.assert(
				rep("(= () (map str ()))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);
});

runner.test("CORE: Testing symbol and keyword functions", () => {
	const sharedEnv = initEnv();

	runner.test("CORE: isSymbol should return false for a keyword", () => {
		runner.assert(
			rep("(symbol? :abc)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isSymbol should return true for a symbol", () => {
		runner.assert(
			rep("(symbol? 'abc)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isSymbol should return false for a string", () => {
		runner.assert(
			rep('(symbol? "abc")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test(
		"CORE: isSymbol should return true for a symbol created with the symbol function",
		() => {
			runner.assert(
				rep('(symbol? (symbol "abc"))', sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test("CORE: isKeyword should return true for a keyword", () => {
		runner.assert(
			rep("(keyword? :abc)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isKeyword should return false for a quoted symbol", () => {
		runner.assert(
			rep("(keyword? 'abc)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isKeyword should return false for a string", () => {
		runner.assert(
			rep('(keyword? "abc")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isKeyword should return false for an empty string", () => {
		runner.assert(
			rep('(keyword? "")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test(
		"CORE: isKeyword should return true for a keyword created with the keyword function",
		() => {
			runner.assert(
				rep('(keyword? (keyword "abc"))', sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test("CORE: the symbol function should create a symbol", () => {
		runner.assert(
			rep('(symbol "abc")', sharedEnv),
			printString(new SymbolNode("abc"), true),
		);
	});

	runner.test("CORE: the keyword function should create a keyword", () => {
		const result = rep('(keyword "abc")', sharedEnv);
		const expected = printString(new KeywordNode(":abc"), true);
		runner.assert(result, expected);
	});
});

runner.test("CORE: Testing sequential? function", () => {
	const sharedEnv = initEnv();

	runner.test("CORE: isSequential should return true for a list", () => {
		runner.assert(
			rep("(sequential? (list 1 2 3))", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isSequential should return true for a vector", () => {
		runner.assert(
			rep("(sequential? [15])", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isSequential should return true for a function", () => {
		runner.assert(
			rep("(sequential? sequential?)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isSequential should return false for a nil", () => {
		runner.assert(
			rep("(sequential? nil)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: isSequential should return false for a string", () => {
		runner.assert(
			rep('(sequential? "abc")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
});

runner.test("CORE: Testing apply with vectors", () => {
	const sharedEnv = initEnv();

	runner.test(
		"CORE: apply should work with all proceeding arguments, including vectors",
		() => {
			runner.assert(
				rep("(apply + 4 [5])", sharedEnv),
				printString(new NumberNode(9), true),
			);
		},
	);

	runner.test(
		"CORE: apply should work with prn and all proceeding arguments, including vectors",
		() => {
			const oldLog = console.log;
			let calls = 0;
			let args: string[] = [];
			console.log = (...x) => {
				args = x;
				calls++;
			};

			try {
				runner.assert(
					rep('(apply prn 1 2 ["3" 4])', sharedEnv),
					printString(new NilNode(), true),
				);
			} finally {
				console.log = oldLog;
			}

			runner.assert(args, ['1 2 "3" 4']);
			runner.assert(calls, 1);
		},
	);

	runner.test("CORE: apply should work with empty vectors", () => {
		runner.assert(
			rep("(apply list [])", sharedEnv),
			printString(new ListNode([]), true),
		);
	});
});

runner.test("CORE: Testing apply with fn* and vectors", () => {
	const sharedEnv = initEnv();

	runner.test("CORE: should apply fn* to vectors", () => {
		runner.assert(
			rep("(apply (fn* (a b) (+ a b)) [2 3])", sharedEnv),
			printString(new NumberNode(5), true),
		);
	});

	runner.test(
		"CORE: should apply fn* to all proceeding arguments, including vectors",
		() => {
			runner.assert(
				rep("(apply (fn* (a b) (+ a b)) 4 [5])", sharedEnv),
				printString(new NumberNode(9), true),
			);
		},
	);
});

runner.test("CORE: Testing vector functions", () => {
	const sharedEnv = initEnv();

	runner.test("CORE: isVector should return true for a vector", () => {
		runner.assert(
			rep("(vector? [10 11])", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("CORE: isVector should return false for a quoted list", () => {
		runner.assert(
			rep("(vector? '(12 13))", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("CORE: the vector function should create a new vector", () => {
		runner.assert(
			rep("(vector 3 4 5)", sharedEnv),
			printString(
				new VectorNode([
					new NumberNode(3),
					new NumberNode(4),
					new NumberNode(5),
				]),
				true,
			),
		);
	});

	runner.test(
		"CORE: an empty vector should be equal to a vector created without arguments",
		() => {
			runner.assert(
				rep("(= [] (vector))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);
});

runner.test(
	"CORE: Test extra function arguments as Mal List (bypassing TCO with apply)",
	() => {
		const sharedEnv = initEnv();

		runner.test("CORE: variadic args should return a list", () => {
			runner.assert(
				rep("(apply (fn* (& more) (list? more)) [1 2 3])", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		});

		runner.test(
			"CORE: Should return an empty list if there aren't extra args",
			() => {
				runner.assert(
					rep("(apply (fn* (& more) (list? more)) [])", sharedEnv),
					printString(new BooleanNode(true), true),
				);
			},
		);

		runner.test(
			"CORE: should return a vector intial args, but no extra args",
			() => {
				runner.assert(
					rep("(apply (fn* (a & more) (list? more)) [1])", sharedEnv),
					printString(new BooleanNode(true), true),
				);
			},
		);
	},
);
