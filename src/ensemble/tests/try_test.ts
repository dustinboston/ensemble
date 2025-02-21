/**
 * Test try/catch:
 *
 * Imported from 'step9_quote.mal' tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

import { initEnv, rep } from "../lib.ts";
import { printString } from "../printer.ts";
import { ErrorNode, NilNode, NumberNode, StringNode } from "../types.ts";
import runner from "./test_runner.ts";

runner.test("TRY: Testing throw", () => {
	const sharedEnv = initEnv();

	runner.test("Testing throw with string error", () => {
		let threwError = false;
		try {
			rep('(throw "err1")', sharedEnv);
		} catch (error) {
			threwError = true;
			runner.assert(error, new ErrorNode(new StringNode("err1")));
		}
		runner.assert(threwError, true);
	});
});

runner.test("TRY: Testing try*/catch*", () => {
	const sharedEnv = initEnv();

	runner.test("Evaluating try* without error", () => {
		runner.assert(
			rep("(try* 123 (catch* e 456))", sharedEnv),
			printString(new NumberNode(123), true),
		);
	});

	runner.test("Evaluating try* with undefined symbol", () => {
		const oldLog = console.log;
		let calls = 0;
		let args: string[] = [];
		console.log = (...x) => {
			args = x;
			calls++;
		};

		try {
			runner.assert(
				rep('(try* abc (catch* exc (prn "exc is:" exc)))', sharedEnv),
				printString(new NilNode(), true),
			);
		} finally {
			console.log = oldLog;
		}

		runner.assert(calls, 1);
		runner.assert(args[0], `"exc is:" "'abc' not found"`);
	});

	runner.test("Evaluating try* with function call to undefined symbol", () => {
		const oldLog = console.log;
		let calls = 0;
		let args: string[] = [];
		console.log = (...x) => {
			args = x;
			calls++;
		};

		try {
			runner.assert(
				rep('(try* (abc 1 2) (catch* exc (prn "exc is:" exc)))', sharedEnv),
				printString(new NilNode(), true),
			);
		} finally {
			console.log = oldLog;
		}

		runner.assert(calls, 1);
		runner.assert(args[0], `"exc is:" "'abc' not found"`);
	});
});

runner.test("TRY: Make sure error from core can be caught", () => {
	const sharedEnv = initEnv();

	runner.test("TRY: Catching core error", () => {
		const oldLog = console.log;
		let calls = 0;
		let args: string[] = [];
		console.log = (...x) => {
			args = x;
			calls++;
		};

		try {
			runner.assert(
				rep('(try* (nth () 1) (catch* exc (prn "exc is:" exc)))', sharedEnv),
				printString(new NilNode(), true),
			);
		} finally {
			console.log = oldLog;
		}

		runner.assert(calls, 1);
		runner.assert(args[0], '"exc is:" "out of range"');
	});

	runner.test("TRY: Catching thrown exception", () => {
		const oldLog = console.log;
		let calls = 0;
		let args: string[] = [];
		console.log = (...x) => {
			args = x;
			calls++;
		};

		try {
			runner.assert(
				rep(
					'(try* (throw "my exception") (catch* exc (do (prn "exc:" exc) 7)))',
					sharedEnv,
				),
				printString(new NumberNode(7), true),
			);
		} finally {
			console.log = oldLog;
		}

		runner.assert(calls, 1);
		runner.assert(args[0], '"exc:" "my exception"');
	});
});

runner.test("TRY: Test that exception handlers get restored correctly", () => {
	const sharedEnv = initEnv();

	runner.test("Restoring exception handlers", () => {
		runner.assert(
			rep(
				'(try* (do (try* "t1" (catch* e "c1")) (throw "e1")) (catch* e "c2"))',
				sharedEnv,
			),
			printString(new StringNode("c2"), true),
		);
	});

	runner.test("Testing nested try*/catch*", () => {
		runner.assert(
			rep(
				'(try* (try* (throw "e1") (catch* e (throw "e2"))) (catch* e "c2"))',
				sharedEnv,
			),
			printString(new StringNode("c2"), true),
		);
	});
});

runner.test("TRY: Test that throw is a function", () => {
	const sharedEnv = initEnv();
	runner.test("Throwing inside map", () => {
		runner.assert(
			rep('(try* (map throw (list "my err")) (catch* exc exc))', sharedEnv),
			printString(new StringNode("my err"), true),
		);
	});
});

runner.test("TRY: Testing try* without catch*", () => {
	const sharedEnv = initEnv();

	runner.test("Evaluating try* without catch*", () => {
		let threw = false;
		try {
			rep("(try* xyz)", sharedEnv);
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	});
});

runner.test("TRY: Testing throwing non-strings", () => {
	const sharedEnv = initEnv();

	runner.test("Throwing a list", () => {
		const oldLog = console.log;
		let calls = 0;
		let args: string[] = [];
		console.log = (...x) => {
			args = x;
			calls++;
		};

		try {
			runner.assert(
				rep(
					'(try* (throw (list 1 2 3)) (catch* exc (do (prn "err:" exc) 7)))',
					sharedEnv,
				),
				printString(new NumberNode(7), true),
			);
		} finally {
			console.log = oldLog;
		}

		runner.assert(calls, 1);
		runner.assert(args[0], '"err:" (1 2 3)');
	});
});

runner.report();
