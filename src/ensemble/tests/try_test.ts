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

import { assertEquals, assertSpyCalls, assertThrows, spy, test } from './test_runner.ts';

import { initEnv, rep } from '../lib.ts';
import { printString } from '../printer.ts';
import { ErrorNode, NilNode, NumberNode, StringNode } from '../types.ts';

test(`TRY: Testing throw`, () => {
  const sharedEnv = initEnv();

  test(`Testing throw with string error`, () => {
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

test(`TRY: Testing try*/catch*`, () => {
  const sharedEnv = initEnv();

  test(`Evaluating try* without error`, () => {
    // 123
    assertEquals(
      rep(`(try* 123 (catch* e 456))`, sharedEnv),
      printString(new NumberNode(123), true),
    );
  });

  test(`Evaluating try* with undefined symbol`, () => {
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

  test(
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

test(`TRY: Make sure error from core can be caught`, () => {
  const sharedEnv = initEnv();

  test(`TRY: Catching core error`, () => {
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

  test(`TRY: Catching thrown exception`, () => {
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

test(`TRY: Test that exception handlers get restored correctly`, () => {
  const sharedEnv = initEnv();

  test(`Restoring exception handlers`, () => {
    assertEquals(
      rep(
        `(try* (do (try* "t1" (catch* e "c1")) (throw "e1")) (catch* e "c2"))`,
        sharedEnv,
      ),
      printString(new StringNode('c2'), true),
    );
  });

  test(`Testing nested try*/catch*`, () => {
    assertEquals(
      rep(
        `(try* (try* (throw "e1") (catch* e (throw "e2"))) (catch* e "c2"))`,
        sharedEnv,
      ),
      printString(new StringNode('c2'), true),
    );
  });
});

test(`TRY: Test that throw is a function`, () => {
  const sharedEnv = initEnv();
  test(`Throwing inside map`, () => {
    assertEquals(
      rep(
        `(try* (map throw (list "my err")) (catch* exc exc))`,
        sharedEnv,
      ),
      printString(new StringNode('my err'), true),
    );
  });
});

test(`TRY: Testing try* without catch*`, () => {
  const sharedEnv = initEnv();

  test(`Evaluating try* without catch*`, () => {
    assertThrows(
      () => {
        rep(`(try* xyz)`, sharedEnv);
      },
      Error,
      `'xyz' not found`,
    );
  });
});

test(`TRY: Testing throwing non-strings`, () => {
  const sharedEnv = initEnv();

  test(`Throwing a list`, () => {
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
