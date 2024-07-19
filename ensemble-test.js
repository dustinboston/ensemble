/* eslint-disable n/prefer-global/process */
// Import process from 'node:process';
// import { equal, deepStrictEqual, throws } from "node:assert";
// import { describe, it } from "node:test";
import { dsl } from "./ensemble.js";
import { stringify, $ } from "./core.js";
describe("Core symbols exist on $", () => {
	it("Should have formSymbols", () => {
		const formSymbols = getFormSymbols();
		for (const key of formSymbols) {
			equal($[key], $[key]);
		}

		const coreSymbols = getCoreSymbols();
		for (const key of coreSymbols) {
			equal($[key], $[key]);
		}

		const htmlSymbols = getHtmlSymbols();
		for (const key of htmlSymbols) {
			equal($[key], $[key]);
		}

		const cssSymbols = getCssSymbols();
		for (const key of cssSymbols) {
			equal($[key], $[key]);
		}
	});
});

// MARK: 1. PRINT
describe("Print (stringify)", () => {
	it("Should print strings", () => {
		equal(stringify("str"), "str");
	});

	it("Should print numbers", () => {
		equal(stringify(-123), "-123");
		equal(stringify(0.123), "0.123");
		equal(stringify(123_456_789), "123456789");
	});

	it("Should print booleans", () => {
		equal(stringify(true), "true");
		equal(stringify(false), "false");
	});

	it("Should print arrays", () => {
		equal(stringify([1, 2, 3]), "[1, 2, 3]");
		equal(stringify([null]), "[null]");
		equal(stringify([[3, 4]]), "[[3, 4]]");
		equal(stringify([[], []]), "[[], []]");
		equal(stringify([[1, 2, [3, 4, [5, 6]]]]), "[[1, 2, [3, 4, [5, 6]]]]");
	});

	it("Should print functions", () => {
		equal(stringify([$.add, 1, 2]), "[Symbol.for(\"add\"), 1, 2]");
		equal(stringify([$.add, [$.add, [$.add]]]), "[Symbol.for(\"add\"), [Symbol.for(\"add\"), [Symbol.for(\"add\")]]]");
	});

	it("Should print symbols", () => {
		equal(stringify(Symbol.for("abc")), "Symbol.for(\"abc\")");
	});

	it("Should print null", () => {
		equal(stringify(null), "null");
	});

	it("Should print undefined", () => {
		equal(stringify(undefined), "undefined");
	});

	it("Should print object literals", () => {
		equal(stringify({}), "{}");
		equal(stringify({ abc: 1 }), "{abc: 1}");
		equal(stringify({ a: { b: 2 } }), "{a: {b: 2}}");
		equal(stringify({ a: { b: { c: 3 } } }), "{a: {b: {c: 3}}}");
	});
});

// MARK: 2. EVAL
describe("Eval", () => {
	it("Should add two numbers", () => {
		// (+ 1 2) ;=>3
		equal(dsl([$.add, 1, 2]), 3);
	});

	it("Should multiply", () => {
		// (+ 5 (* 2 3)) ;=>11
		equal(dsl([$.add, 5, [$.multiply, 2, 3]]), 11);
	});

	it("Should subtract", () => {
		// (- (+ 5 (* 2 3)) 3) ;=>8
		equal(dsl([$.subtract, [$.add, 5, [$.multiply, 2, 3]], 3]), 8);
	});

	it("Should divide two numbers", () => {
		// (/ (- (+ 5 (* 2 3)) 3) 4) ;=>2
		equal(dsl([$.divide, [$.subtract, [$.add, 5, [$.multiply, 2, 3]], 3], 4]), 2);
	});

	it("Should evaluate large numbers", () => {
		// (/ (- (+ 515 (* 87 311)) 302) 27) ;=>1010
		equal(dsl([$.divide, [$.subtract, [$.add, 515, [$.multiply, 87, 311]], 302], 27]), 1010);
	});

	// (abc 1 2 3) ;/.+
	it("Should throw an error with no return value", () => {
		throws(() => {
			dsl([Symbol.for("abc"), 1, 2, 3]);
		}, /.+/);
	});

	// () ;=>()
	it("Should return an empty list", () => {
		deepStrictEqual(dsl([]), []);
	});

	// [1 2 (+ 1 2)] ;=>[1 2 3]
	it("Should evaluate arrays", () => {
		deepStrictEqual(dsl([1, 2, [$.add, 1, 2]]), [1, 2, 3]);
	});

	// {"a" (+ 7 8)} ;=>{"a" 15}
	it("Should evaluate object literals", () => {
		deepStrictEqual(dsl({ a: [$.add, 7, 8] }), { a: 15 });
	});

	// [] ;=>[]
	it("Hasn't broken arrays", () => {
		deepStrictEqual(dsl([]), []);
	});

	// {} ;=>{}
	it("Hasn't broken object literals", () => {
		deepStrictEqual(dsl({}), {});
	});
});

// MARK: 3. ENV
describe("Env", () => {
	it("Should define a global var", () => {
		const x = Symbol.for("x");
		equal(dsl([$.global, x, 3]), 3);
		equal(dsl(x), 3);
		equal(dsl([$.global, x, 4]), 4);
		equal(dsl(x), 4);
	});

	it("Should define a global var from an expression", () => {
		const y = Symbol.for("y");
		equal(dsl([$.global, y, [$.add, 1, 7]]), 8);
		equal(dsl(y), 8);
	});

	it("Should create case-sensitive globals", () => {
		equal(dsl([$.global, Symbol.for("mynum"), 111]), 111);
		equal(dsl([$.global, Symbol.for("MYNUM"), 222]), 222);
		equal(dsl(Symbol.for("mynum")), 111);
		equal(dsl(Symbol.for("MYNUM")), 222);
	});

	it("Should abitwiseOrt $.global on error", () => {
		const w = Symbol.for("w");
		equal(dsl([$.global, w, 123]), 123);

		throws(() => {
			dsl([$.global, w, [Symbol.for("abc")]]);
		}, "'Symbol(abc)' not found in env.");

		equal(dsl(w), 123);
	});

	it("Should create a local variable", () => {
		const z = Symbol.for("z");
		equal(dsl([$.const, [z, 9], z]), 9);
	});

	it("Should shadow global variables", () => {
		const x = Symbol.for("x");
		// This creates a shadowed, local x even though we reuse the symbol.
		equal(dsl([$.const, [x, 9], x]), 9);
		equal(dsl(x), 4); // Check the GLOBAL x
	});

	it("Should handle expressions in local variables", () => {
		const z = Symbol.for("z");
		equal(dsl([$.const, [z, [$.add, 2, 3]], [$.add, 1, z]]), 6);
	});

	it("Should handle multiple bindings in local variables", () => {
		equal(dsl([$.const,
		[Symbol.for("p"), [$.add, 2, 3], Symbol.for("q"), [$.add, 2, Symbol.for("p")]],
		[$.add, Symbol.for("p"), Symbol.for("q")]]), 12);
	});

	it("Should handle nested variable expressions", () => {
		equal(dsl([$.global, Symbol.for("y"), [$.const, [Symbol.for("z"), 7], Symbol.for("z")]]), 7);
	});

	it("Should use the correct scope", () => {
		equal(dsl([$.global, Symbol.for("a"), 4]), 4);
		equal(dsl([$.const, [Symbol.for("q"), 9], Symbol.for("q")]), 9);
		equal(dsl([$.const, [Symbol.for("q"), 9], Symbol.for("a")]), 4);
		equal(dsl([$.const, [Symbol.for("z"), 2], [$.const, [Symbol.for("q"), 9], Symbol.for("a")]]), 4);
	});

	it("Should evaluate \"vectors\" (arrays without a beginning symbol)", () => {
		equal(dsl([$.const, [Symbol.for("z"), 9], Symbol.for("z")]), 9);
		equal(dsl([$.const,
		[Symbol.for("p"), [$.add, 2, 3], Symbol.for("q"), [$.add, 2, Symbol.for("p")]],
		[$.add, Symbol.for("p"), Symbol.for("q")]]), 12);
		deepStrictEqual(dsl([$.const,
		[Symbol.for("a"), 5, Symbol.for("b"), 6],
		[3, 4, Symbol.for("a"), [Symbol.for("b"), 7], 8]]), [3, 4, 5, [6, 7], 8]);
	});

	it("Should give priority to the last assignment", () => {
		equal(dsl([$.const, [Symbol.for("x"), 2, Symbol.for("x"), 3], Symbol.for("x")]), 3);
	});
});

// MARK: 4. IF FN DO

describe("If/Fn/Do", () => {
	describe("Basic checks", () => {
		it("Should check if an item is an array", () => {
			equal(dsl([$.isArray, []]), true);
		});

		it("Should check if an array is empty", () => {
			equal(dsl([$.isEmpty, []]), true);
		});

		it("Should check if an array is not empty", () => {
			equal(dsl([$.isEmpty, [1]]), false);
		});

		it("Should get the number of items in an array", () => {
			equal(dsl([$.length, [1, 2, 3]]), 3);
		});

		it("Should count null as length 0", () => {
			equal(dsl([$.length, null]), 0);
		});
	});

	// MARK: - IF
	describe("Testing If", () => {
		it("Should evaluate `if`, `gt`, and `length` correctly", () => {
			equal(dsl([$.if, [$.greaterThan, [$.length, [1, 2, 3]], 3], 89, 78]), 78);
		});

		it("Should evaluate `if`, `gte`, and `length` correctly", () => {
			equal(dsl([$.if, [$.greaterThanOrEqual, [$.length, [1, 2, 3]], 3], 89, 78]), 89);
		});

		it("Should return the true condition", () => {
			equal(dsl([$.if, true, 7, 8]), 7);
		});

		it("Should return the false condition", () => {
			equal(dsl([$.if, false, 7, 8]), 8);
		});

		it("Should evaluate the true condition", () => {
			equal(dsl([$.if, true, [$.add, 1, 7], [$.add, 1, 8]]), 8);
		});

		it("Should evaluate the false condition", () => {
			equal(dsl([$.if, false, [$.add, 1, 7], [$.add, 1, 8]]), 9);
		});

		it("Should evaluate null as false", () => {
			equal(dsl([$.if, null, 7, 8]), 8);
		});

		it("Should evaluate 0 as false", () => {
			equal(dsl([$.if, 0, 7, 8]), 8);
		});

		it("Should evaluate an empty array as true", () => {
			equal(dsl([$.if, [], 7, 8]), 7);
		});

		it("Should evaluate a non-empty array as true", () => {
			equal(dsl([$.if, [1, 2, 3], 7, 8]), 7);
		});

		it("Should not evaluate an empty list as null", () => {
			equal(dsl([$.equals, [], null]), false);
		});

		it("should evaluate false as null when there is no else condition", () => {
			equal(dsl([$.if, false, [$.add, 1, 7]]), null);
		});

		it("should evaluate null as null when there is no else condition", () => {
			equal(dsl([$.if, null, [$.add, 1, 7]]), null);
		});

		it("should evaluate true with the then condition", () => {
			equal(dsl([$.if, true, [$.add, 1, 7]]), 8);
		});
	});

	describe("Basic conditionals", () => {
		it("should evaluate eq", () => {
			equal(dsl([$.equals, 2, 1]), false);
			equal(dsl([$.equals, 1, 1]), true);
			equal(dsl([$.equals, 1, 2]), false);
			equal(dsl([$.equals, 1, [$.add, 1, 1]]), false);
			equal(dsl([$.equals, 2, [$.add, 1, 1]]), true);
			equal(dsl([$.equals, null, 1]), false);
			equal(dsl([$.equals, null, null]), true);
		});

		it("should evaluate gt", () => {
			equal(dsl([$.greaterThan, 2, 1]), true);
			equal(dsl([$.greaterThan, 1, 1]), false);
			equal(dsl([$.greaterThan, 1, 2]), false);
		});

		it("should evaluate gte", () => {
			equal(dsl([$.greaterThanOrEqual, 2, 1]), true);
			equal(dsl([$.greaterThanOrEqual, 1, 1]), true);
			equal(dsl([$.greaterThanOrEqual, 1, 2]), false);
		});

		it("should evaluate lt", () => {
			equal(dsl([$.lessThan, 2, 1]), false);
			equal(dsl([$.lessThan, 1, 1]), false);
			equal(dsl([$.lessThan, 1, 2]), true);
		});

		it("should evaluate lte", () => {
			equal(dsl([$.lessThanOrEqual, 2, 1]), false);
			equal(dsl([$.lessThanOrEqual, 1, 1]), true);
			equal(dsl([$.lessThanOrEqual, 1, 2]), true);
		});

		it("Should correctly evaluate eq edge cases", () => {
			equal(dsl([$.equals, 1, 1]), true);
			equal(dsl([$.equals, 0, 0]), true);
			equal(dsl([$.equals, 1, 0]), false);
			equal(dsl([$.equals, true, true]), true);
			equal(dsl([$.equals, false, false]), true);
			equal(dsl([$.equals, null, null]), true);
		});

		it("Should correctly evaluate eq and array edge cases", () => {
			equal(dsl([$.equals, [], []]), true);
			equal(dsl([$.equals, [1, 2], [1, 2]]), true);
			equal(dsl([$.equals, [1], []]), false);
			equal(dsl([$.equals, [], [1]]), false);
			equal(dsl([$.equals, 0, []]), false);
			equal(dsl([$.equals, [], 0]), false);
			equal(dsl([$.equals, [null], []]), false);
		});
	});

	// MARK: - FN
	describe("Testing functions", () => {
		it("Should correctly evaluate builtin and user-defined functions", () => {
			equal(dsl([$.add, 1, 2]), 3);
			equal(dsl([[$.function, [Symbol.for("a"), Symbol.for("b")], [$.add, Symbol.for("a"), Symbol.for("b")]], 3, 4]), 7);
			equal(dsl([[$.function, [], 4]]), 4);
			equal(dsl([[$.function, [Symbol.for("f"), Symbol.for("x")], [Symbol.for("f"), Symbol.for("x")]], [$.function, [Symbol.for("a")], [$.add, 1, Symbol.for("a")]], 7]), 8);
		});

		it("Should correctly evaluate closures", () => {
			equal(dsl([[[$.function, [Symbol.for("a")], [$.function, [Symbol.for("b")], [$.add, Symbol.for("a"), Symbol.for("b")]]], 5], 7]), 12);

			dsl([$.global, Symbol.for("genPlusX"), [$.function, [Symbol.for("x")], [$.function, [Symbol.for("b")], [$.add, Symbol.for("x"), Symbol.for("b")]]]]);
			dsl([$.global, Symbol.for("plus7"), [Symbol.for("genPlusX"), 7]]);
			equal(dsl([Symbol.for("plus7"), 8]), 15);
		});
	});

	// MARK: - DO
	describe("Testing Do", () => {
		it("Should correctly evaluate the `do` form", () => {
			const output = captureStdout(() => dsl([$.do, [$.logEscaped, 101]]));
			equal(output.stdout, "101\n");
			equal(output.returned, null);
		});

		it("Should correctly evaluate the `do` form with return", () => {
			const output = captureStdout(() => dsl([$.do, [$.logEscaped, 101], 7]));
			equal(output.stdout, "101\n");
			equal(output.returned, 7);
		});

		it("Should log multiple and return", () => {
			const output = captureStdout(() => dsl(
				[$.do,
				[$.logEscaped, 101],
				[$.logEscaped, 102],
				[$.add, 1, 2]]));

			equal(output.stdout, "101\n102\n");
			equal(output.returned, 3);
		});

		it("Should do a global", () => {
			equal(dsl([$.do, [$.global, Symbol.for("a"), 6], 7, [$.add, Symbol.for("a"), 8]]), 14);
		});

		it("Should be case-sensitive", () => {
			dsl([$.global, Symbol.for("DO"), [$.function, [Symbol.for("a")], 7]]);
			equal(dsl([Symbol.for("DO"), 3]), 7);
		});
	});

	describe("Testing recursion", () => {
		// ;; Testing recursive sumdown function
		it("Should handle the recursive sumdown function", () => {
			dsl([$.global,
			Symbol.for("sumdown"),
			[$.function,
			[Symbol.for("N")],
			[$.if,
			[$.greaterThan, Symbol.for("N"), 0],
			[$.add, Symbol.for("N"), [Symbol.for("sumdown"), [$.subtract, Symbol.for("N"), 1]]],
				0]]]);
			equal(dsl([Symbol.for("sumdown"), 1]), 1);
			equal(dsl([Symbol.for("sumdown"), 2]), 3);
			equal(dsl([Symbol.for("sumdown"), 6]), 21);
		});

		it("Should handle the recursive fibonacci function", () => {
			// Testing recursive fibonacci function
			dsl([$.global, Symbol.for("fib"), [$.function, [Symbol.for("N")], [$.if, [$.equals, Symbol.for("N"), 0], 1, [$.if, [$.equals, Symbol.for("N"), 1], 1, [$.add, [Symbol.for("fib"), [$.subtract, Symbol.for("N"), 1]], [Symbol.for("fib"), [$.subtract, Symbol.for("N"), 2]]]]]]]);
			equal(dsl([Symbol.for("fib"), 1]), 1);
			equal(dsl([Symbol.for("fib"), 2]), 2);
			equal(dsl([Symbol.for("fib"), 4]), 5);
		});

		it("Should handle recursive function in environment.", () => {
			const cst = Symbol.for("cst");
			const f = Symbol.for("f");
			const g = Symbol.for("g");
			const n = Symbol.for("n");
			const x = Symbol.for("x");

			equal(dsl([$.const, [f, [$.function, [], x], x, 3], [f]]), 3);
			equal(dsl([$.const, [cst, [$.function, [n], [$.if, [$.equals, n, 0], null, [cst, [$.subtract, n, 1]]]]], [cst, 1]]), null);
			equal(dsl([$.const, [f, [$.function, [n], [$.if, [$.equals, n, 0], 0, [g, [$.subtract, n, 1]]]], g, [$.function, [n], [f, n]]], [f, 2]]), 0);
		});
	});

	describe("Testing equality", () => {
		it("Empty string should be falsy", () => {
			equal(dsl([$.if, "", 7, 8]), 8);
		});

		it("Should correctly evaluate string equality", () => {
			equal(dsl([$.equals, "", ""]), true);
			equal(dsl([$.equals, "abc", "abc"]), true);
			equal(dsl([$.equals, "abc", ""]), false);
			equal(dsl([$.equals, "", "abc"]), false);
			equal(dsl([$.equals, "abc", "def"]), false);
			equal(dsl([$.equals, "abc", "ABC"]), false);
			equal(dsl([$.equals, [], ""]), false);
			equal(dsl([$.equals, "", []]), false);
		});
	});

	describe("Testing variadic arguments", () => {
		it("Should handle variable length arguments", () => {
			equal(dsl([[$.function, [Symbol.for("&"), Symbol.for("more")], [$.length, Symbol.for("more")]], 1, 2, 3]), 3);
			equal(dsl([[$.function, [Symbol.for("&"), Symbol.for("more")], [$.isArray, Symbol.for("more")]], 1, 2, 3]), true);
			equal(dsl([[$.function, [Symbol.for("&"), Symbol.for("more")], [$.length, Symbol.for("more")]], 1]), 1);
			equal(dsl([[$.function, [Symbol.for("&"), Symbol.for("more")], [$.length, Symbol.for("more")]]]), 0);
			equal(dsl([[$.function, [Symbol.for("&"), Symbol.for("more")], [$.isArray, Symbol.for("more")]]]), true);
			equal(dsl([[$.function, [Symbol.for("a"), Symbol.for("&"), Symbol.for("more")], [$.length, Symbol.for("more")]], 1, 2, 3]), 2);
			equal(dsl([[$.function, [Symbol.for("a"), Symbol.for("&"), Symbol.for("more")], [$.length, Symbol.for("more")]], 1]), 0);
			equal(dsl([[$.function, [Symbol.for("a"), Symbol.for("&"), Symbol.for("more")], [$.isArray, Symbol.for("more")]], 1]), true);
		});
	});

	describe("Testing logical operations", () => {
		it("Should evaluate logical not", () => {
			equal(dsl([$.not, false]), true);
			equal(dsl([$.not, null]), true);
			equal(dsl([$.not, true]), false);
			equal(dsl([$.not, "a"]), false);
			equal(dsl([$.not, 0]), true); // 0 is falsy
		});
	});

	describe("Testing string quotes", () => {
		it("Should handle wacky string quotes", () => {
			equal(dsl(""), "");
			equal(dsl("abc"), "abc");
			equal(dsl("abc  def"), "abc  def");
			equal(dsl("\""), "\"");
			equal(dsl("abc\ndef\nghi"), "abc\ndef\nghi");
			equal(dsl("abc\\def\\ghi"), "abc\\def\\ghi");
			equal(dsl("\\n"), "\\n");
		});
	});

	describe.skip("TODO: Test toEscaped", () => {
		// (pr-str)
		// ;=>""

		// (pr-str "")
		// ;=>"\"\""

		// (pr-str "abc")
		// ;=>"\"abc\""

		// (pr-str "abc  def" "ghi jkl")
		// ;=>"\"abc  def\" \"ghi jkl\""

		// (pr-str "\"")
		// ;=>"\"\\\"\""

		// (pr-str (list 1 2 "abc" "\"") "def")
		// ;=>"(1 2 \"abc\" \"\\\"\") \"def\""

		// (pr-str "abc\ndef\nghi")
		// ;=>"\"abc\\ndef\\nghi\""

		// (pr-str "abc\\def\\ghi")
		// ;=>"\"abc\\\\def\\\\ghi\""

		// (pr-str (list))
		// ;=>"()"
		// Testing pr-str

		// Test this once there is a REPL:
		it("Should convert the ast to an escaped string", () => {
			equal(dsl([$.toEscaped]), "");
			equal(dsl([$.toEscaped, ""]), "\"\"");
			equal(dsl([$.toEscaped, "abc"]), "\"abc\"");
			equal(dsl([$.toEscaped, "abc  def", "ghi jkl"]), "\"abc  def\", \"ghi jkl\"");
			equal(dsl([$.toEscaped, "\""]), "\"\\\"\"");
			equal(dsl([$.toEscaped, [1, 2, "abc", "\""], "def"]), "[1, 2, \"abc\", \"\\\"\"], \"def\"");
			equal(dsl([$.toEscaped, "abc\ndef\nghi"]), "\"abc\\ndef\\nghi\"");
			equal(dsl([$.toEscaped, "abc\\def\\ghi"]), "\"abc\\\\def\\\\ghi\"");
			equal(dsl([$.toEscaped, []]), "[]");
		});
	});

	describe("TODO: Test toString", () => {
		// ;; Testing str

		// (str)
		// ;=>""

		// (str "")
		// ;=>""

		// (str "abc")
		// ;=>"abc"

		// (str "\"")
		// ;=>"\""

		// (str 1 "abc" 3)
		// ;=>"1abc3"

		// (str "abc  def" "ghi jkl")
		// ;=>"abc  defghi jkl"

		// (str "abc\ndef\nghi")
		// ;=>"abc\ndef\nghi"

		// (str "abc\\def\\ghi")
		// ;=>"abc\\def\\ghi"

		// (str (list 1 2 "abc" "\"") "def")
		// ;=>"(1 2 abc \")def"

		// (str (list))
		// ;=>"()"
		it("Should convert the ast to a string", () => {
			equal(dsl([$.toString]), "");
			equal(dsl([$.toString, ""]), "");
			equal(dsl([$.toString, "abc"]), "abc");
			equal(dsl([$.toString, "\""]), "\"");
			equal(dsl([$.toString, 1, "abc", 3]), "1abc3");
			equal(dsl([$.toString, "abc  def", "ghi jkl"]), "abc  defghi jkl");
			equal(dsl([$.toString, "abc\ndef\nghi"]), "abc\ndef\nghi");
			equal(dsl([$.toString, "abc\\def\\ghi"]), "abc\\def\\ghi");
			equal(dsl([$.toString, [1, 2, "abc", "\""], "def"]), "[1, 2, abc, \"]def");
			equal(dsl([$.toString, []]), "[]");
		});
	});

	describe.skip("TODO: Testing logEscaped", () => {
		// ;; Testing prn
		// (prn)
		// ;/
		// ;=>nil

		// (prn "")
		// ;/""
		// ;=>nil

		// (prn "abc")
		// ;/"abc"
		// ;=>nil

		// (prn "abc  def" "ghi jkl")
		// ;/"abc  def" "ghi jkl"

		// (prn "\"")
		// ;/"\\""
		// ;=>nil

		// (prn "abc\ndef\nghi")
		// ;/"abc\\ndef\\nghi"
		// ;=>nil

		// (prn "abc\\def\\ghi")
		// ;/"abc\\\\def\\\\ghi"
		// nil

		// (prn (list 1 2 "abc" "\"") "def")
		// ;/\(1 2 "abc" "\\""\) "def"
		// ;=>nil
		equal(dsl([$.logEscaped]), null);
		equal(dsl([$.logEscaped, ""]), "");
		equal(dsl([$.logEscaped, "abc"]), "abc");
		equal(dsl([$.logEscaped, "abc, , def", "ghi, jkl"]), "abc, , def, ghi, jkl");
		equal(dsl([$.logEscaped, "\""]), "\"");
		equal(dsl([$.logEscaped, "abc\ndef\nghi"]), "abc\\ndef\\nghi");
		equal(dsl([$.logEscaped, "abc\\def\\ghi"]), "abc\\\\def\\\\ghi");
		equal(dsl([$.logEscaped, [1, 2, "abc", "\""], "def"]), "[1, 2, \"abc\" \"\\\"\"], \"def\"");
	});

	describe.skip("TODO: Testing logString", () => {
		// ;; Testing println
		// (println)
		// ;/
		// ;=>nil

		// (println "")
		// ;/
		// ;=>nil

		// (println "abc")
		// ;/abc
		// ;=>nil

		// (println "abc  def" "ghi jkl")
		// ;/abc  def ghi jkl

		// (println "\"")
		// ;/"
		// ;=>nil

		// (println "abc\ndef\nghi")
		// ;/abc
		// ;/def
		// ;/ghi
		// ;=>nil

		// (println "abc\\def\\ghi")
		// ;/abc\\def\\ghi
		// ;=>nil

		// (println (list 1 2 "abc" "\"") "def")
		// ;/\(1 2 abc "\) def
		// ;=>nil

		// Testing, $.logEscaped
		equal(dsl([$.logString]), "");
		equal(dsl([$.logString, ""]), "");
		equal(dsl([$.logString, "abc"]), "abc");
		equal(dsl([$.logString, "abc, , def", "ghi, jkl"]), "abc, , def, ghi, jkl");
		equal(dsl([$.logString, "\""]), "\"");
		equal(dsl([$.logString, "abc\ndef\nghi"]), "abc\ndef\nghi");
		equal(dsl([$.logString, "abc\\def\\ghi"]), "abc\\def\\ghi");
		equal(dsl([$.logString, [1, 2, "abc", "\""], "def"]), "[1, 2, abc, \"\"\"] def");
	});

	// These tests aren't really necessary because we don't use them like
	// Clojure style keywords and JavaScript has its own object literal.
	describe.skip("Testing keywords", () => {
		// ;; Testing keywords
		// (= :abc :abc)
		// ;=>true
		// (= :abc :def)
		// ;=>false
		// (= :abc ":abc")
		// ;=>false
		// (= (list :abc) (list :abc))
		// ;=>true

		equal(dsl([$.eq, Symbol.for(":abc"), Symbol.for(":abc")]), true);
		equal(dsl([$.eq, Symbol.for(":abc"), Symbol.for(":def")]), false);
		equal(dsl([$.eq, Symbol.for(":abc"), ":abc"]), false);
		equal(dsl([$.eq, [Symbol.for(":abc")], [Symbol.for(":abc")]]), true);
	});

	describe.skip("Testing vectors", () => {
		// Testing vector truthiness

		// (if [] 7 8)
		// ;=>7
		equal(dsl([$.if, [], 7, 8]), 7);

		// Testing vector printing

		// (pr-str [1 2 "abc" "\""] "def")
		// ;=>"[1 2 \"abc\" \"\\\"\"] \"def\""

		// (pr-str [])
		// ;=>"[]"

		// (str [1 2 "abc" "\""] "def")
		// ;=>"[1 2 abc \"]def"

		// (str [])
		// ;=>"[]"
		equal(dsl([$.toString, [1, 2, "abc", "\""], "def"]), "[1, 2, \"abc\", \"\\\"\"], \"def\"");
		equal(dsl([$.toString, []]), "[]");
		equal(dsl([$.toString, [1, 2, "abc", "\""], "def"]), "[1, 2, abc, \"]def");
		equal(dsl([$.toString, []]), "[]");

		// Testing vector functions

		// (count [1 2 3])
		// ;=>3

		// (empty? [1 2 3])
		// ;=>false

		// (empty? [])
		// ;=>true

		// (list? [4 5 6])
		// ;=>false

		equal(dsl([$.length, [1, 2, 3]]), 3);
		equal(dsl([$.isEmpty, [1, 2, 3]]), false);
		equal(dsl([$.isEmpty, []]), true);
		equal(dsl([$.isArray, [4, 5, 6]]), false);

		// Testing vector equality
		// (= [] (list))

		// ;=>true
		// (= [7 8] [7 8])

		// ;=>true
		// (= [:abc] [:abc])

		// ;=>true
		// (= (list 1 2) [1 2])

		// ;=>true
		// (= (list 1) [])

		// ;=>false
		// (= [] [1])

		// ;=>false
		// (= 0 [])

		// ;=>false
		// (= [] 0)

		// ;=>false

		// (= [] "")
		// ;=>false

		// (= "" [])
		// ;=>false
		equal(dsl([$.eq, [], []]), true);
		equal(dsl([$.eq, [7, 8], [7, 8]]), true);
		equal(dsl([$.eq, [Symbol.for(":abc")], [Symbol.for(":abc")]]), true);
		equal(dsl([$.eq, [1, 2], [1, 2]]), true);
		equal(dsl([$.eq, [1], []]), false);
		equal(dsl([$.eq, [], [1]]), false);
		equal(dsl([$.eq, 0, []]), false);
		equal(dsl([$.eq, [], 0]), false);
		equal(dsl([$.eq, [], ""]), false);
		equal(dsl([$.eq, "", []]), false);

		// Testing vector parameter lists

		// ( (fn* [] 4) )
		// ;=>4

		// ( (fn* [f x] (f x)) (fn* [a] (+ 1 a)) 7)
		// ;=>8

		equal(dsl([[$.fn, [], 4]]), 4);
		equal(dsl([[$.fn, [Symbol.for("f"), Symbol.for("x")], [Symbol.for("f"), Symbol.for("x")]], [$.fn, [Symbol.for("a")], [$.add, 1, Symbol.for("a")]], 7]), 8);

		// Nested vector/list equality

		// (= [(list)] (list []))
		// ;=>true

		// (= [1 2 (list 3 4 [5 6])] (list 1 2 [3 4 (list 5 6)]))
		// ;=>true

		equal(dsl([$.eq, [[]], [[]]]), true);
		equal(dsl([$.eq, [1, 2, [3, 4, [5, 6]]], [1, 2, [3, 4, [5, 6]]]]), true);
	});
});

describe("Core functions", () => {
	it("Should evaluate pow", () => {
		equal(dsl([$.power, 2, 3]), 8); // 2^3 = 8
		equal(dsl([$.power, 5, 2]), 25); // 5^2 = 25
	});

	it("Should evaluate mod", () => {
		equal(dsl([$.remainder, 10, 3]), 1); // 10 % 3 = 1
		equal(dsl([$.remainder, 15, 4]), 3); // 15 % 4 = 3
	});

	it("Should evaluate rsh", () => {
		equal(dsl([$.rightShift, 8, 2]), 2); // 8 >> 2 = 2 (1000 >> 2 = 0010)
		equal(dsl([$.rightShift, -8, 2]), -2); // -8 >> 2 = -2 (two's complement)
	});

	it("Should evaluate lsh", () => {
		equal(dsl([$.leftShift, 3, 2]), 12); // 3 << 2 = 12 (0011 << 2 = 1100)
		equal(dsl([$.leftShift, -3, 2]), -12); // -3 << 2 = -12 (two's complement)
	});
	it("Should evaluate unsignedRightShift", () => {
		equal(dsl([$.unsignedRightShift, 8, 2]), 2); // 8 >>> 2 = 2 (1000 >>> 2 = 0010)
		equal(dsl([$.unsignedRightShift, -8, 2]), "1073741822"); // -8 >>> 2 = 1073741822
	});

	it("Should evaluate bitwiseAnd", () => {
		equal(dsl([$.bitwiseAnd, 5, 3]), 1); // 5 & 3 = 1 (0101 & 0011 = 0001)
		equal(dsl([$.bitwiseAnd, 12, 6]), 4); // 12 & 6 = 4 (1100 & 0110 = 0100)
	});
	it("Should evaluate bitwiseOr", () => {
		equal(dsl([$.bitwiseOr, 5, 3]), 7); // 5 | 3 = 7 (0101 | 0011 = 0111)
		equal(dsl([$.bitwiseOr, 12, 6]), 14); // 12 | 6 = 14 (1100 | 0110 = 1110)
	});
	it("Should evaluate bitwiseXor", () => {
		equal(dsl([$.bitwiseXor, 5, 3]), 6); // 5 ^ 3 = 6 (0101 ^ 0011 = 0110)
		equal(dsl([$.bitwiseXor, 12, 6]), 10); // 12 ^ 6 = 10 (1100 ^ 0110 = 1010)
	});

	it("Should evaluate bitwiseNot", () => {
		equal(dsl([$.bitwiseNot, 5]), -6); // ~5 = -6 (two's complement of 0101 is 1010, which is -6)
		equal(dsl([$.bitwiseNot, -1]), 0); // ~(-1) = 0 (two's complement of 1111 is 0000, which is 0)
	});
});

describe("JavaScript interop", () => {
	it("Should be able to call a JavaScript function", () => {
		const testObject = { foo: "bar" };
		equal(dsl([Reflect.get, testObject, "foo"]), "bar");
	});
});

function getFormSymbols() {
	return [
		"global",
		"let",
		"const",
		"do",
		"if",
		"function",
	];
}

function getCoreSymbols() {
	return [
		"throw",
		"isArray",
		"isNumber",
		"isString",
		"isSymbol",
		"isFunction",
		"isObject",
		"isUndefined",
		"isNull",
		"debug",
		"toString",
		"toEscaped",
		"logString",
		"logEscaped",
		"array",
		"isEmpty",
		"length",
		"at",
		"getIn",
		"lessThan",
		"lessThanOrEqual",
		"greaterThan",
		"greaterThanOrEqual",
		"equals",
		"add",
		"subtract",
		"multiply",
		"divide",
		"power",
		"remainder",
		"rightShift",
		"leftShift",
		"unsignedRightShift",
		"bitwiseAnd",
		"bitwiseOr",
		"bitwiseXor",
		"bitwiseNot",
		"now",
		"and",
		"or",
		"not",
		"increment",
		"decrement",
	];
}

function getHtmlSymbols() {
	return [
		"a",
		"abbr",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"bdi",
		"bdo",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"cite",
		"code",
		"col",
		"colgroup",
		"data",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"div",
		"dl",
		"doctype",
		"dt",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"hr",
		"html",
		"i",
		"iframe",
		"img",
		"imgMap",
		"input",
		"kbd",
		"label",
		"legend",
		"li",
		"link",
		"main",
		"mark",
		"menu",
		"meter",
		"meta",
		"nav",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"picture",
		"pre",
		"portal",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"script",
		"search",
		"section",
		"select",
		"slot",
		"small",
		"source",
		"span",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"title",
		"tr",
		"track",
		"u",
		"ul",
		"var",
		"video",
		"wbr",
	];
}

function getCssSymbols() {
	return [
		"accentColor",
		"alignContent",
		"alignItems",
		"alignSelf",
		"all",
		"anchorName",
		"animation",
		"animationComposition",
		"animationDelay",
		"animationDirection",
		"animationDuration",
		"animationFillMode",
		"animationIterationCount",
		"animationName",
		"animationPlayState",
		"animationTimingFunction",
		"appearance",
		"aspectRatio",
		"backdropFilter",
		"backfaceVisibility",
		"background",
		"backgroundAttachment",
		"backgroundBlendMode",
		"backgroundClip",
		"backgroundColor",
		"backgroundImage",
		"backgroundOrigin",
		"backgroundPosition",
		"backgroundPositionX",
		"backgroundPositionY",
		"backgroundRepeat",
		"backgroundSize",
		"blockSize",
		"baselineShift",
		"blockStep",
		"blockStepAlign",
		"blockStepInsert",
		"blockStepRound",
		"blockStepSize",
		"bookmarkLabel",
		"bookmarkLevel",
		"bookmarkState",
		"border",
		"borderBlock",
		"borderBlockColor",
		"borderBlockEnd",
		"borderBlockEndColor",
		"borderBlockEndStyle",
		"borderBlockEndWidth",
		"borderBlockStart",
		"borderBlockStartColor",
		"borderBlockStartStyle",
		"borderBlockStartWidth",
		"borderBlockStyle",
		"borderBlockWidth",
		"borderBottom",
		"borderBottomColor",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"borderBottomStyle",
		"borderBottomWidth",
		"borderBoundary",
		"borderCollapse",
		"borderColor",
		"borderImage",
		"borderImageOutset",
		"borderImageRepeat",
		"borderImageSlice",
		"borderImageSource",
		"borderImageWidth",
		"borderInline",
		"borderInlineColor",
		"borderInlineEnd",
		"borderInlineEndColor",
		"borderInlineEndStyle",
		"borderInlineEndWidth",
		"borderInlineStart",
		"borderInlineStartColor",
		"borderInlineStartStyle",
		"borderInlineStartWidth",
		"borderInlineStyle",
		"borderInlineWidth",
		"borderLeft",
		"borderLeftColor",
		"borderLeftStyle",
		"borderLeftWidth",
		"borderRadius",
		"borderRight",
		"borderRightColor",
		"borderRightStyle",
		"borderRightWidth",
		"borderSpacing",
		"borderStartEndRadius",
		"borderStartStartRadius",
		"borderStyle",
		"borderTop",
		"borderTopColor",
		"borderTopLeftRadius",
		"borderTopRightRadius",
		"borderTopStyle",
		"borderTopWidth",
		"borderWidth",
		"bottom",
		"boxDecorationBreak",
		"boxShadow",
		"boxSizing",
		"boxSnap",
		"breakAfter",
		"breakBefore",
		"breakInside",
		"captionSide",
		"caret",
		"caretAnimation",
		"caretColor",
		"caretShape",
		"chains",
		"clear",
		"clipPath",
		"clipRule",
		"color",
		"colorAdjust",
		"colorInterpolation",
		"colorInterpolationFilters",
		"colorScheme",
		"columnCount",
		"columnFill",
		"columnGap",
		"columnRule",
		"columnRuleColor",
		"columnRuleStyle",
		"columnRuleWidth",
		"columnSpan",
		"columnWidth",
		"columns",
		"contain",
		"containIntrinsicBlockSize",
		"containIntrinsicHeight",
		"containIntrinsicInlineSize",
		"containIntrinsicSize",
		"containIntrinsicWidth",
		"container",
		"containerName",
		"containerType",
		"content",
		"contentVisibility",
		"counterIncrement",
		"counterReset",
		"counterSet",
		"cue",
		"cueAfter",
		"cueBefore",
		"cursor",
		"direction",
		"display",
		"dominantBaseline",
		"elevation",
		"emptyCells",
		"filter",
		"flex",
		"flexBasis",
		"flexDirection",
		"flexFlow",
		"flexGrow",
		"flexShrink",
		"flexWrap",
		"float",
		"floatDefer",
		"floatOffset",
		"floatReference",
		"floodColor",
		"floodOpacity",
		"flow",
		"flowFrom",
		"flowInto",
		"font",
		"fontFamily",
		"fontFeatureSettings",
		"fontKerning",
		"fontLanguageOverride",
		"fontOpticalSizing",
		"fontPalette",
		"fontSize",
		"fontSizeAdjust",
		"fontStretch",
		"fontStyle",
		"fontSynthesis",
		"fontSynthesisSmallCaps",
		"fontSynthesisStyle",
		"fontSynthesisWeight",
		"fontVariant",
		"fontVariantAlternates",
		"fontVariantCaps",
		"fontVariantEastAsian",
		"fontVariantLigatures",
		"fontVariantNumeric",
		"fontVariantPosition",
		"fontVariationSettings",
		"fontWeight",
		"forcedColorAdjust",
		"footnoteDisplay",
		"footnotePolicy",
		"glyphOrientationVertical",
		"gap",
		"grid",
		"gridArea",
		"gridAutoColumns",
		"gridAutoFlow",
		"gridAutoRows",
		"gridColumn",
		"gridColumnEnd",
		"gridColumnGap",
		"gridColumnStart",
		"gridGap",
		"gridRow",
		"gridRowEnd",
		"gridRowGap",
		"gridRowStart",
		"gridTemplate",
		"gridTemplateAreas",
		"gridTemplateColumns",
		"gridTemplateRows",
		"hangingPunctuation",
		"height",
		"hyphenateCharacter",
		"hyphenateLimitChars",
		"hyphenateLimitLast",
		"hyphenateLimitLines",
		"hyphenateLimitZone",
		"hyphens",
		"imageOrientation",
		"imageRendering",
		"imageResolution",
		"initialLetter",
		"initialLetterAlign",
		"initialLetterWrap",
		"inlineSize",
		"inset",
		"insetBlock",
		"insetBlockEnd",
		"insetBlockStart",
		"insetInline",
		"insetInlineEnd",
		"insetInlineStart",
		"isolation",
		"justifyContent",
		"justifyItems",
		"justifySelf",
		"left",
		"letterSpacing",
		"lightingColor",
		"lineBreak",
		"lineGrid",
		"lineHeight",
		"lineHeightStep",
		"lineSnap",
		"listStyle",
		"listStyleImage",
		"listStylePosition",
		"listStyleType",
		"margin",
		"marginBlock",
		"marginBlockEnd",
		"marginBlockStart",
		"marginBottom",
		"marginInline",
		"marginInlineEnd",
		"marginInlineStart",
		"marginLeft",
		"marginRight",
		"marginTop",
		"marker",
		"markerEnd",
		"markerKnockoutLeft",
		"markerKnockoutRight",
		"markerMid",
		"markerPattern",
		"markerSegment",
		"markerSide",
		"markerStart",
		"marqueeDirection",
		"marqueeLoop",
		"marqueeSpeed",
		"marqueeStyle",
		"mask",
		"maskBorder",
		"maskBorderMode",
		"maskBorderOutset",
		"maskBorderRepeat",
		"maskBorderSlice",
		"maskBorderSource",
		"maskBorderWidth",
		"maskClip",
		"maskComposite",
		"maskImage",
		"maskMode",
		"maskOrigin",
		"maskPosition",
		"maskRepeat",
		"maskSize",
		"maskType",
		"mathDepth",
		"mathStyle",
		"maxBlockSize",
		"maxHeight",
		"maxLines",
		"maxWidth",
		"minBlockSize",
		"minHeight",
		"minInlineSize",
		"minWidth",
		"mixBlendMode",
		"motion",
		"motionOffset",
		"motionPath",
		"motionRotation",
		"navDown",
		"navLeft",
		"navRight",
		"navUp",
		"objectFit",
		"objectPosition",
		"offset",
		"offsetAfter",
		"offsetAnchor",
		"offsetBefore",
		"offsetDistance",
		"offsetEnd",
		"offsetPath",
		"offsetPosition",
		"offsetRotate",
		"offsetStart",
		"opacity",
		"order",
		"orphans",
		"outline",
		"outlineColor",
		"outlineOffset",
		"outlineStyle",
		"outlineWidth",
		"overflow",
		"overflowAnchor",
		"overflowClipMargin",
		"overflowStyle",
		"overflowWrap",
		"overflowX",
		"overflowY",
		"overscroll",
		"overscrollBehaviorBlock",
		"overscrollBehaviorInline",
		"overscrollBehaviorX",
		"overscrollBehaviorY",
		"padding",
		"paddingBlock",
		"paddingBlockEnd",
		"paddingBlockStart",
		"paddingBottom",
		"paddingInline",
		"paddingInlineEnd",
		"paddingInlineStart",
		"paddingLeft",
		"paddingRight",
		"paddingTop",
		"page",
		"pageBreakAfter",
		"pageBreakBefore",
		"pageBreakInside",
		"pause",
		"pauseAfter",
		"pauseBefore",
		"paintOrder",
		"perspective",
		"perspectiveOrigin",
		"pitch",
		"pitchRange",
		"placeContent",
		"placeItems",
		"placeSelf",
		"pointerEvents",
		"playDuring",
		"position",
		"presentationLevel",
		"quotes",
		"regionFragment",
		"resize",
		"rest",
		"restAfter",
		"restBefore",
		"richness",
		"right",
		"rotate",
		"rotationPoint",
		"rowGap",
		"rubyAlign",
		"rubyMerge",
		"rubyPosition",
		"running",
		"scale",
		"scrollBehavior",
		"scrollMargin",
		"scrollMarginBlock",
		"scrollMarginBlockEnd",
		"scrollMarginBlockStart",
		"scrollMarginBottom",
		"scrollMarginInline",
		"scrollMarginInlineEnd",
		"scrollMarginInlineStart",
		"scrollMarginLeft",
		"scrollMarginRight",
		"scrollMarginTop",
		"scrollPadding",
		"scrollPaddingBlock",
		"scrollPaddingBlockEnd",
		"scrollPaddingBlockStart",
		"scrollPaddingBottom",
		"scrollPaddingInline",
		"scrollPaddingInlineEnd",
		"scrollPaddingInlineStart",
		"scrollPaddingLeft",
		"scrollPaddingRight",
		"scrollPaddingTop",
		"scrollSnapAlign",
		"scrollSnapStop",
		"scrollSnapType",
		"scrollbarColor",
		"scrollbarGutter",
		"scrollbarWidth",
		"shapeImageThreshold",
		"shapeInside",
		"shapeMargin",
		"shapeOutside",
		"size",
		"speak",
		"speakAs",
		"speakHeader",
		"speakNumeral",
		"speakPunctuation",
		"speechRate",
		"stress",
		"stringSet",
		"stroke",
		"strokeAlignment",
		"strokeDashadjust",
		"strokeDasharray",
		"strokeDashcorner",
		"strokeDashoffset",
		"strokeLinecap",
		"strokeLinejoin",
		"strokeMiterlimit",
		"strokeOpacity",
		"strokeWidth",
		"tabSize",
		"tableLayout",
		"textAlign",
		"textAlignAll",
		"textAlignLast",
		"textCombineUpright",
		"textDecoration",
		"textDecorationColor",
		"textDecorationLine",
		"textDecorationSkip",
		"textDecorationStyle",
		"textDecorationThickness",
		"textEmphasis",
		"textEmphasisColor",
		"textEmphasisPosition",
		"textEmphasisStyle",
		"textIndent",
		"textJustify",
		"textOrientation",
		"textOverflow",
		"textRendering",
		"textShadow",
		"textSpaceCollapse",
		"textSpaceTrim",
		"textSpacing",
		"textTransform",
		"textUnderlineOffset",
		"textUnderlinePosition",
		"textWrap",
		"top",
		"touchAction",
		"transform",
		"transformBox",
		"transformOrigin",
		"transformStyle",
		"transition",
		"transitionBehavior",
		"transitionDelay",
		"transitionDuration",
		"transitionProperty",
		"transitionTimingFunction",
		"translate",
		"unicodeBidi",
		"userSelect",
		"verticalAlign",
		"visibility",
		"voiceBalance",
		"voiceDuration",
		"voiceFamily",
		"voicePitch",
		"voiceRange",
		"voiceRate",
		"voiceStress",
		"voiceVolume",
		"volume",
		"whiteSpace",
		"whiteSpaceCollapse",
		"widows",
		"width",
		"willChange",
		"wordBreak",
		"wordSpacing",
		"wordWrap",
		"wrapAfter",
		"wrapBefore",
		"wrapFlow",
		"wrapInside",
		"wrapThrough",
		"writingMode",
		"zIndex",
		"zoom",
	];
}



/**
 * 
 * @param {string} desc 
 * @param {() => void} fn 
 */
function it(desc, fn) {
	try {
		fn();
		console.log(`[PASS] ${desc}`);
	} catch (e) {
		console.log(`[FAIL] ${desc}\n       ${e}`);
	}
}

/**
 * 
 * @param {string} desc 
 * @param {() => void} fn 
 */
function describe(desc, fn) {
	console.log(`====== ${desc}`);
	fn();
	console.log("");
}

/**
 * 
 * @param {string} desc 
 * @param {() => void} _fn 
 */
describe.skip = (desc, _fn) => {
	console.log(`[SKIP] ${desc}`);
};

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function deepStrictEqual(a, b) {
	const a2 = stringify(a);
	const b2 = stringify(b);
	if (a2 !== b2) {
		throw new Error(`${String(a)} !== ${String(b)}`);
	}
}

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function equal(a, b) {
	if (a !== b) {
		throw new Error(`${String(a)} !== ${String(b)}`);
	}
}

/**
 * 
 * @param {() => void} fn 
 * @param {string|RegExp} message 
 */
function throws(fn, message) {
	let threw = false;
	let matchedMessage = false;
	try {
		fn();
	} catch (e) {
		threw = true;
		const error = e instanceof Error ? e.message : String(e);
		if (message instanceof RegExp) {
			if (message.test(error)) matchedMessage = true;
		} else if (typeof message === "string") {
			if (error.includes(message)) matchedMessage = true;
		}
	}
	if (!threw && matchedMessage) {
		throw new Error("Didn't throw.");
	}
}

// Reference for string methods
// str = toString
// pr-str = toEscaped
// prn = logEscaped
// println = logString

/**
 * Capture output from stdout
 * @param {() => void} log
 * @returns {{returned: any, stdout: string}}
 */
function captureStdout(log) {
	throw new Error(`TODO: implement captureStdout for QuickJS.`);
	// /** @type {string} */
	// let stdout = "";
	// const originalWrite = process.stdout.write.bind(process.stdout);

	// /**
	//  * @param {string | Uint8Array} chunk
	//  * @returns {boolean}
	//  */
	// process.stdout.write = chunk => {
	// 	stdout += String(chunk);
	// 	return true;
	// };

	// const returned = log();
	// process.stdout.write = originalWrite;
	// return { returned, stdout };
}