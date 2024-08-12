/**
 * Test try/catch:
 *
 * Imported from `step9_quote.mal` tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

import { initEnv, rep } from '../ensemble.ts';
import { ErrorNode, MapNode, NilNode, NumberNode, StringNode } from '../types.ts';
import { assertEquals, assertSpyCalls, assertThrows, spy } from './deps.ts';
import { printString } from '../printer.ts';

Deno.test(`TRY: Testing throw`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`Testing throw with string error`, () => {
		let threwError = false;
		try {
			rep(`(throw "err1")`, sharedEnv);
		} catch (error) {
			threwError = true;
			assertEquals(
				error,
				new ErrorNode(new StringNode('err1')),
			);
		}
		assertEquals(threwError, true);
	});
});

Deno.test(`TRY: Testing try*/catch*`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`Evaluating try* without error`, () => {
		// 123
		assertEquals(
			rep(`(try* 123 (catch* e 456))`, sharedEnv),
			printString(new NumberNode(123), true),
		);
	});

	await t.step(`Evaluating try* with undefined symbol`, () => {
		const consoleLogSpy = spy(console, 'log');

		assertEquals(
			rep(
				`(try* abc (catch* exc (prn "exc is:" exc)))`,
				sharedEnv,
			),
			printString(new NilNode(), true),
		);

		assertSpyCalls(consoleLogSpy, 1);
		assertEquals(
			consoleLogSpy.calls[0].args[0],
			`"exc is:" "'abc' not found"`,
		);
		consoleLogSpy.restore();
	});

	await t.step(
		`Evaluating try* with function call to undefined symbol`,
		() => {
			const consoleLogSpy = spy(console, 'log');

			assertEquals(
				rep(
					`(try* (abc 1 2) (catch* exc (prn "exc is:" exc)))`,
					sharedEnv,
				),
				printString(new NilNode(), true),
			);

			assertSpyCalls(consoleLogSpy, 1);
			assertEquals(
				consoleLogSpy.calls[0].args[0],
				`"exc is:" "'abc' not found"`,
			);
			consoleLogSpy.restore();
		},
	);
});

Deno.test(`TRY: Make sure error from core can be caught`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`TRY: Catching core error`, () => {
		const consoleLogSpy = spy(console, 'log');

		assertEquals(
			rep(
				`(try* (nth () 1) (catch* exc (prn "exc is:" exc)))`,
				sharedEnv,
			),
			printString(new NilNode(), true),
		);

		assertSpyCalls(consoleLogSpy, 1);
		assertEquals(
			consoleLogSpy.calls[0].args[0],
			`"exc is:" "out of range"`,
		);
		consoleLogSpy.restore();
	});

	await t.step(`TRY: Catching thrown exception`, () => {
		const consoleLogSpy = spy(console, 'log');

		assertEquals(
			rep(
				`(try* (throw "my exception") (catch* exc (do (prn "exc:" exc) 7)))`,
				sharedEnv,
			),
			printString(new NumberNode(7), true),
		);

		assertSpyCalls(consoleLogSpy, 1);
		assertEquals(
			consoleLogSpy.calls[0].args[0],
			`"exc:" "my exception"`,
		);
		consoleLogSpy.restore();
	});
});

Deno.test(`TRY: Test that exception handlers get restored correctly`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`Restoring exception handlers`, () => {
		assertEquals(
			rep(
				`(try* (do (try* "t1" (catch* e "c1")) (throw "e1")) (catch* e "c2"))`,
				sharedEnv,
			),
			printString(new StringNode('c2'), true),
		);
	});

	await t.step(`Testing nested try*/catch*`, () => {
		assertEquals(
			rep(
				`(try* (try* (throw "e1") (catch* e (throw "e2"))) (catch* e "c2"))`,
				sharedEnv,
			),
			printString(new StringNode('c2'), true),
		);
	});
});

Deno.test(`TRY: Test that throw is a function`, async (t) => {
	const sharedEnv = initEnv();
	await t.step(`Throwing inside map`, () => {
		assertEquals(
			rep(
				`(try* (map throw (list "my err")) (catch* exc exc))`,
				sharedEnv,
			),
			printString(new StringNode('my err'), true),
		);
	});
});

Deno.test(`TRY: Testing throwing a hash-map`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`Throwing a hash-map`, () => {
		let threwError = false;
		try {
			rep(`(throw {:msg "err2"})`, sharedEnv);
		} catch (error) {
			threwError = true;
			assertEquals(
				error,
				new ErrorNode(
					new MapNode(new Map([[':msg', new StringNode('err2')]])),
				),
			);
		}
		assertEquals(threwError, true);
	});
});

Deno.test(`TRY: Testing try* without catch*`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`Evaluating try* without catch*`, () => {
		assertThrows(
			() => {
				rep(`(try* xyz)`, sharedEnv);
			},
			Error,
			`'xyz' not found`,
		);
	});
});

Deno.test(`TRY: Testing throwing non-strings`, async (t) => {
	const sharedEnv = initEnv();

	await t.step(`Throwing a list`, () => {
		const consoleLogSpy = spy(console, 'log');

		assertEquals(
			rep(
				`(try* (throw (list 1 2 3)) (catch* exc (do (prn "err:" exc) 7)))`,
				sharedEnv,
			),
			printString(new NumberNode(7), true),
		);

		assertSpyCalls(consoleLogSpy, 1);
		assertEquals(
			consoleLogSpy.calls[0].args[0],
			`"err:" \(1 2 3\)`,
		);
		consoleLogSpy.restore();
	});
});
