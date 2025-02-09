/**
 * Test file operations.
 * Imported from `step6_file.mal` tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */
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
import { assertEquals, test } from "./test_runner.ts";

test("FILE: Execute the program in a sub process", () => {
	assertEquals(
		rep("(+ 1 2)", initMain()),
		printString(new NumberNode(3), true),
	);
});

test("FILE: Testing read-string with list containing integers and nil", () => {
	assertEquals(
		rep('(read-string "(1 2 (3 4) nil)")', initMain()),
		"(1 2 (3 4) nil)",
		// printString(
		//   new ListNode([
		//     new NumberNode(1),
		//     new NumberNode(2),
		//     new ListNode([
		//       new NumberNode(3),
		//       new NumberNode(4),
		//     ]),
		//     new ListNode([]),
		//   ]),
		//   true,
		// ),
	);
});

test("FILE: Testing read-string with nil", () => {
	assertEquals(
		rep('(= nil (read-string "nil"))', initMain()),
		printString(new BooleanNode(true)),
	);
});

test("FILE: Testing read-string with addition expression", () => {
	assertEquals(
		rep('(read-string "(+ 2 3)")', initMain()),
		printString(
			new ListNode([new SymbolNode("+"), new NumberNode(2), new NumberNode(3)]),
			true,
		),
	);
});

test("FILE: Testing read-string with newline character", () => {
	assertEquals(
		rep(`(read-string "\\"\\n\\"")`, initMain()),
		printString(new StringNode("\n"), true),
	);
});

test("FILE: Testing read-string with comment", () => {
	assertEquals(
		rep('(read-string "7 ;; comment")', initMain()),
		printString(new NumberNode(7), true),
	);
});

test("FILE: Testing read-string with comment only", () => {
	// No fatal error, returns empty string
	assertEquals(
		rep('(read-string ";; comment")', initMain()),
		printString(new NilNode(), true),
	);
});

test("FILE: Testing eval with addition expression", () => {
	assertEquals(
		rep('(eval (read-string "(+ 2 3)"))', initMain()),
		printString(new NumberNode(5), true),
	);
});

test("FILE: Testing slurp with file content", () => {
	const sharedEnv = initMain();

	assertEquals(
		rep('(slurp "./tests/fixtures/test.txt")', sharedEnv),
		printString(new StringNode("A line of text\n"), true),
	);

	test("FILE: Testing slurp with file content loaded twice", () => {
		assertEquals(
			rep('(slurp "./tests/fixtures/test.txt")', initMain()),
			printString(new StringNode("A line of text\n"), true),
		);
	});
});

test("FILE: Testing load-file and function definitions", () => {
	const sharedEnv = initMain();
	assertEquals(
		rep('(load-file "./tests/fixtures/inc.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	test("FILE: Testing inc1 function from loaded file", () => {
		assertEquals(
			rep("(inc1 7)", sharedEnv),
			printString(new NumberNode(8), true),
		);
	});

	test("FILE: Testing inc3 function from loaded file", () => {
		assertEquals(
			rep("(inc3 9)", sharedEnv),
			printString(new NumberNode(12), true),
		);
	});
});

test("FILE: Testing atom creation and operations", () => {
	const sharedEnv = initMain();

	assertEquals(
		rep('(load-file "./tests/fixtures/inc.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	assertEquals(
		rep("(def! a (atom 2))", sharedEnv),
		printString(new AtomNode(new NumberNode(2)), true),
	);

	test("FILE: Testing atom? predicate", () => {
		assertEquals(
			rep("(atom? a)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	test("FILE: Testing atom? predicate with non-atom", () => {
		assertEquals(
			rep("(atom? 1)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	test("FILE: Testing deref on atom", () => {
		assertEquals(
			rep("(deref a)", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});

	test("FILE: Testing reset! on atom", () => {
		assertEquals(
			rep("(reset! a 3)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	test("FILE: Testing deref after reset! on atom", () => {
		assertEquals(
			rep("(deref a)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	test("FILE: Testing swap! with function on atom", () => {
		assertEquals(
			rep("(swap! a inc3)", sharedEnv),
			printString(new NumberNode(6), true),
		);
	});

	test("FILE: Testing swap! with identity function on atom", () => {
		assertEquals(
			rep("(swap! a (fn* (a) a))", sharedEnv),
			printString(new NumberNode(6), true),
		);
	});

	test("FILE: Testing swap! with * function on atom", () => {
		assertEquals(
			rep("(swap! a (fn* (a) (* 2 a)))", sharedEnv),
			printString(new NumberNode(12), true),
		);
	});

	test("FILE: Testing swap! with fn* and extra args on atom", () => {
		assertEquals(
			rep("(swap! a (fn* (a b) (* a b)) 10)", sharedEnv),
			printString(new NumberNode(120), true),
		);
	});

	test("FILE: Testing swap! with addition function on atom", () => {
		assertEquals(
			rep("(swap! a + 3)", sharedEnv),
			printString(new NumberNode(123), true),
		);
	});

	test("FILE: Testing swap!/closure interaction", () => {
		rep("(def! inc-it (fn* (a) (+ 1 a)))", sharedEnv);
		rep("(def! atm (atom 7))", sharedEnv);
		rep("(def! f (fn* () (swap! atm inc-it)))", sharedEnv);

		assertEquals(rep("(f)", sharedEnv), printString(new NumberNode(8), true));
	});

	test("FILE: Testing whether closures retain atoms", () => {
		rep("(def! g (let* (atm (atom 0)) (fn* () (deref atm))))", sharedEnv);
		rep("(def! atm (atom 1))", sharedEnv);

		assertEquals(rep("(g)", sharedEnv), printString(new NumberNode(0), true));
	});

	test("FILE: Testing deref using @ reader macro", () => {
		rep("(def! atm (atom 9))", sharedEnv);
		assertEquals(rep("@atm", sharedEnv), printString(new NumberNode(9), true));
	});

	test("FILE: Testing vector params not broken by TCO", () => {
		rep("(def! g (fn* [] 78))", sharedEnv);
		assertEquals(rep("(g)", sharedEnv), printString(new NumberNode(78), true));
	});

	test("FILE: Testing vector params with argument", () => {
		rep("(def! g (fn* [a] (+ a 78)))", sharedEnv);
		assertEquals(
			rep("(g 3)", sharedEnv),
			printString(new NumberNode(81), true),
		);
	});
});

test("FILE: Testing large computations", () => {
	const sharedEnv = initMain();

	assertEquals(
		rep('(load-file "./tests/fixtures/computations.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	test("FILE: Testing sumdown function from computations file", () => {
		assertEquals(
			rep("(sumdown 2)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	test("FILE: Testing fibonacci function from computations file", () => {
		assertEquals(
			rep("(fib 2)", sharedEnv),
			printString(new NumberNode(1), true),
		);
	});
});

test("FILE: Testing *ARGV* existence and emptiness", () => {
	const sharedEnv = initMain();

	sharedEnv.set(new SymbolNode("*ARGV*"), new ListNode([]));

	sharedEnv.set(new SymbolNode("*host-language*"), new StringNode("ENSEMBLE"));

	assertEquals(
		rep("(list? *ARGV*)", sharedEnv),
		printString(new BooleanNode(true), true),
	);

	assertEquals(rep("*ARGV*", sharedEnv), printString(new ListNode([]), true));
});

test("FILE: Testing eval setting aa in root scope and access in nested scope", () => {
	assertEquals(
		rep(
			'(let* (b 12) (do (eval (read-string "(def! aa 7)")) aa ))',
			initMain(),
		),
		printString(new NumberNode(7), true),
	);
});

test("FILE: Testing comments in file", () => {
	const sharedEnv = initMain();

	assertEquals(
		rep('(load-file "./tests/fixtures/incB.mal")\n(inc4 7)', sharedEnv),
		printString(new NilNode(), true),
	);

	test("FILE: Testing comments in inc4", () => {
		assertEquals(
			rep("(inc4 7)", sharedEnv),
			printString(new NumberNode(11), true),
		);
	});

	test("FILE: Testing comments in inc5", () => {
		assertEquals(
			rep("(inc5 7)", sharedEnv),
			printString(new NumberNode(12), true),
		);
	});
});

test("FILE: Testing map literal across multiple lines in a file", () => {
	const sharedEnv = initMain();

	assertEquals(
		rep('(load-file "./tests/fixtures/incC.mal")', sharedEnv),
		printString(new NilNode(), true),
	);

	test("FILE: multi-line map is read correctly", () => {
		assertEquals(
			rep("mymap", sharedEnv),
			printString(new MapNode(new Map([['"a"', new NumberNode(1)]])), true),
		);
	});
});

test("FILE: Checking eval does not use local environments", () => {
	const sharedEnv = initMain();

	assertEquals(
		rep("(def! a 1)", sharedEnv),
		printString(new NumberNode(1), true),
	);

	test("FILE: A variable defined within eval should not overwrite a global with the same name", () => {
		assertEquals(
			rep('(let* (a 2) (eval (read-string "a")))', sharedEnv),
			printString(new NumberNode(1), true),
		);
	});
});

test("FILE: Read commented out exclamation mark", () => {
	assertEquals(
		rep('(read-string "1;!")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out double quote", () => {
	assertEquals(
		rep(`(read-string "1;\\"")`, initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out exclamation pound sign", () => {
	assertEquals(
		rep('(read-string "1;#")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out exclamation dollar sign", () => {
	assertEquals(
		rep('(read-string "1;$")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out exclamation percent sign", () => {
	assertEquals(
		rep('(read-string "1;%")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out single quote", () => {
	assertEquals(
		rep(`(read-string "1;'")`, initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out backslash", () => {
	assertEquals(
		rep(`(read-string "1;\\\\")`, initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out double backslash", () => {
	assertEquals(
		rep('(read-string "1;\\\\\\\\")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out triple backslash", () => {
	assertEquals(
		rep('(read-string "1;\\\\\\\\\\\\")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read commented out backtick", () => {
	assertEquals(
		rep('(read-string "1;`")', initMain()),
		printString(new NumberNode(1), true),
	);
});

test("FILE: Read the commented out kitchen sink of characters", () => {
	assertEquals(
		rep('(read-string "1; &()*+,-./:;<=>?@[]^_{|}~")', initMain()),
		printString(new NumberNode(1), true),
	);
});
