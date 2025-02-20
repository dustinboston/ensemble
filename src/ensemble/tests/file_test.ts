import { initMain, rep } from "../io.ts";
import { printString } from "../printer.ts";
import {
	AtomNode,
	BooleanNode,
	ListNode,
	MapNode,
	NilNode,
	NumberNode,
	StringNode,
	SymbolNode,
} from "../types.ts";

import runner from "./test_runner.ts";

runner.test("FILE: Execute the program in a sub process", () => {
	runner.assert(
		rep("(+ 1 2)", initMain()),
		printString(new NumberNode(3), true),
	);
});

runner.test(
	"FILE: Testing read-string with list containing integers and nil",
	() => {
		runner.assert(
			rep('(read-string "(1 2 (3 4) nil)")', initMain()),
			"(1 2 (3 4) nil)",
		);
	},
);

runner.test("FILE: Testing read-string with nil", () => {
	runner.assert(
		rep('(= nil (read-string "nil"))', initMain()),
		printString(new BooleanNode(true)),
	);
});

runner.test("FILE: Testing read-string with addition expression", () => {
	runner.assert(
		rep('(read-string "(+ 2 3)")', initMain()),
		printString(
			new ListNode([new SymbolNode("+"), new NumberNode(2), new NumberNode(3)]),
			true,
		),
	);
});

runner.test("FILE: Testing read-string with newline character", () => {
	runner.assert(
		rep(`(read-string "\\"\\n\\"")`, initMain()),
		printString(new StringNode("\n"), true),
	);
});

runner.test("FILE: Testing read-string with comment", () => {
	runner.assert(
		rep('(read-string "7 ;; comment")', initMain()),
		printString(new NumberNode(7), true),
	);
});

runner.test("FILE: Testing read-string with comment only", () => {
	// No fatal error, returns empty string
	runner.assert(
		rep('(read-string ";; comment")', initMain()),
		printString(new NilNode(), true),
	);
});

runner.test("FILE: Testing eval with addition expression", () => {
	runner.assert(
		rep('(eval (read-string "(+ 2 3)"))', initMain()),
		printString(new NumberNode(5), true),
	);
});

runner.test("FILE: Testing slurp with file content", () => {
	const sharedEnv = initMain();

	runner.assert(
		rep('(slurp "./tests/fixtures/test.txt")', sharedEnv),
		printString(new StringNode("A line of text\n"), true),
	);

	runner.test("FILE: Testing slurp with file content loaded twice", () => {
		runner.assert(
			rep('(slurp "./tests/fixtures/test.txt")', initMain()),
			printString(new StringNode("A line of text\n"), true),
		);
	});
});

runner.test("FILE: Testing load-file and function definitions", () => {
	const sharedEnv = initMain();
	runner.assert(
		rep('(load-file "./tests/fixtures/inc.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	runner.test("FILE: Testing inc1 function from loaded file", () => {
		runner.assert(
			rep("(inc1 7)", sharedEnv),
			printString(new NumberNode(8), true),
		);
	});

	runner.test("FILE: Testing inc3 function from loaded file", () => {
		runner.assert(
			rep("(inc3 9)", sharedEnv),
			printString(new NumberNode(12), true),
		);
	});
});

runner.test("FILE: Testing atom creation and operations", () => {
	const sharedEnv = initMain();

	runner.assert(
		rep('(load-file "./tests/fixtures/inc.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	runner.assert(
		rep("(def! a (atom 2))", sharedEnv),
		printString(new AtomNode(new NumberNode(2)), true),
	);

	runner.test("FILE: Testing atom? predicate", () => {
		runner.assert(
			rep("(atom? a)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("FILE: Testing atom? predicate with non-atom", () => {
		runner.assert(
			rep("(atom? 1)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("FILE: Testing deref on atom", () => {
		runner.assert(
			rep("(deref a)", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});

	runner.test("FILE: Testing reset! on atom", () => {
		runner.assert(
			rep("(reset! a 3)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	runner.test("FILE: Testing deref after reset! on atom", () => {
		runner.assert(
			rep("(deref a)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	runner.test("FILE: Testing swap! with function on atom", () => {
		runner.assert(
			rep("(swap! a inc3)", sharedEnv),
			printString(new NumberNode(6), true),
		);
	});

	runner.test("FILE: Testing swap! with identity function on atom", () => {
		runner.assert(
			rep("(swap! a (fn* (a) a))", sharedEnv),
			printString(new NumberNode(6), true),
		);
	});

	runner.test("FILE: Testing swap! with * function on atom", () => {
		runner.assert(
			rep("(swap! a (fn* (a) (* 2 a)))", sharedEnv),
			printString(new NumberNode(12), true),
		);
	});

	runner.test("FILE: Testing swap! with fn* and extra args on atom", () => {
		runner.assert(
			rep("(swap! a (fn* (a b) (* a b)) 10)", sharedEnv),
			printString(new NumberNode(120), true),
		);
	});

	runner.test("FILE: Testing swap! with addition function on atom", () => {
		runner.assert(
			rep("(swap! a + 3)", sharedEnv),
			printString(new NumberNode(123), true),
		);
	});

	runner.test("FILE: Testing swap!/closure interaction", () => {
		rep("(def! inc-it (fn* (a) (+ 1 a)))", sharedEnv);
		rep("(def! atm (atom 7))", sharedEnv);
		rep("(def! f (fn* () (swap! atm inc-it)))", sharedEnv);

		runner.assert(rep("(f)", sharedEnv), printString(new NumberNode(8), true));
	});

	runner.test("FILE: Testing whether closures retain atoms", () => {
		rep("(def! g (let* (atm (atom 0)) (fn* () (deref atm))))", sharedEnv);
		rep("(def! atm (atom 1))", sharedEnv);

		runner.assert(rep("(g)", sharedEnv), printString(new NumberNode(0), true));
	});

	runner.test("FILE: Testing deref using @ reader macro", () => {
		rep("(def! atm (atom 9))", sharedEnv);
		runner.assert(rep("@atm", sharedEnv), printString(new NumberNode(9), true));
	});
});

runner.test("FILE: Testing vector params not broken by TCO", () => {
	const sharedEnv = initMain();
	rep("(def! g (fn* [] 78))", sharedEnv);
	runner.assert(rep("(g)", sharedEnv), printString(new NumberNode(78), true));
});

runner.test("FILE: Testing vector params with argument", () => {
	const sharedEnv = initMain();
	rep("(def! g (fn* [a] (+ a 78)))", sharedEnv);
	runner.assert(rep("(g 3)", sharedEnv), printString(new NumberNode(81), true));
});

runner.test("FILE: Testing large computations", () => {
	const sharedEnv = initMain();
	runner.assert(
		rep('(load-file "./tests/fixtures/computations.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	runner.test("FILE: Testing sumdown function from computations file", () => {
		runner.assert(
			rep("(sumdown 2)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	runner.test("FILE: Testing fibonacci function from computations file", () => {
		runner.assert(
			rep("(fib 2)", sharedEnv),
			printString(new NumberNode(1), true),
		);
	});
});

runner.test("FILE: Testing *ARGV* existence and emptiness", () => {
	const sharedEnv = initMain();
	sharedEnv.set(new SymbolNode("*ARGV*"), new ListNode([]));
	sharedEnv.set(new SymbolNode("*host-language*"), new StringNode("ENSEMBLE"));

	runner.assert(
		rep("(list? *ARGV*)", sharedEnv),
		printString(new BooleanNode(true), true),
	);

	runner.assert(rep("*ARGV*", sharedEnv), printString(new ListNode([]), true));
});

runner.test(
	"FILE: Testing eval setting aa in root scope and access in nested scope",
	() => {
		runner.assert(
			rep(
				'(let* (b 12) (do (eval (read-string "(def! aa 7)")) aa ))',
				initMain(),
			),
			printString(new NumberNode(7), true),
		);
	},
);

runner.test("FILE: Testing comments in file", () => {
	const sharedEnv = initMain();
	runner.assert(
		rep('(load-file "./tests/fixtures/incB.mal")\n(inc4 7)', sharedEnv),
		printString(new NilNode(), true),
	);

	runner.test("FILE: Testing comments in inc4", () => {
		runner.assert(
			rep("(inc4 7)", sharedEnv),
			printString(new NumberNode(11), true),
		);
	});

	runner.test("FILE: Testing comments in inc5", () => {
		runner.assert(
			rep("(inc5 7)", sharedEnv),
			printString(new NumberNode(12), true),
		);
	});
});

runner.test("FILE: Testing map literal across multiple lines in a file", () => {
	const sharedEnv = initMain();
	runner.assert(
		rep('(load-file "./tests/fixtures/incC.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	runner.test("FILE: multi-line map is read correctly", () => {
		runner.assert(
			rep("mymap", sharedEnv),
			printString(new MapNode(new Map([['"a"', new NumberNode(1)]])), true),
		);
	});
});

runner.test("FILE: Checking eval does not use local environments", () => {
	const sharedEnv = initMain();
	runner.assert(
		rep("(def! a 1)", sharedEnv),
		printString(new NumberNode(1), true),
	);

	runner.test(
		"FILE: A variable defined within eval should not overwrite a global with the same name",
		() => {
			runner.assert(
				rep('(let* (a 2) (eval (read-string "a")))', sharedEnv),
				printString(new NumberNode(1), true),
			);
		},
	);
});

runner.test("FILE: Read commented out exclamation mark", () => {
	runner.assert(
		rep('(read-string "1;!")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out double quote", () => {
	runner.assert(
		rep(`(read-string "1;\\"")`, initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out exclamation pound sign", () => {
	runner.assert(
		rep('(read-string "1;#")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out exclamation dollar sign", () => {
	runner.assert(
		rep('(read-string "1;$")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out exclamation percent sign", () => {
	runner.assert(
		rep('(read-string "1;%")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out single quote", () => {
	runner.assert(
		rep(`(read-string "1;'")`, initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out backslash", () => {
	runner.assert(
		rep(`(read-string "1;\\\\")`, initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out double backslash", () => {
	runner.assert(
		rep('(read-string "1;\\\\\\\\")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out triple backslash", () => {
	runner.assert(
		rep('(read-string "1;\\\\\\\\\\\\")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read commented out backtick", () => {
	runner.assert(
		rep('(read-string "1;`")', initMain()),
		printString(new NumberNode(1), true),
	);
});

runner.test("FILE: Read the commented out kitchen sink of characters", () => {
	runner.assert(
		rep('(read-string "1; &()*+,-./:;<=>?@[]^_{|}~")', initMain()),
		printString(new NumberNode(1), true),
	);
});
