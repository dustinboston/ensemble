/**
 * TODO: Clean and test
 * Test core functions:
 * Imported from `step9_try.mal` tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

import { assertEquals } from '@std/assert';
import { assertSpyCalls, spy } from '@std/testing/mock';
import { initEnv, rep } from '../src/ensemble.ts';
import { printString } from '../src/printer.ts';
import { BooleanNode, KeywordNode, ListNode, NilNode, NumberNode, SymbolNode, VectorNode } from '../src/types.ts';

Deno.test(`CORE: Testing is? functions`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`CORE: isSymbol with quoted symbol should be true`, () => {
    // true
    assertEquals(
      rep(`(symbol? 'abc)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isSymbol with string should be false`, () => {
    // false
    assertEquals(
      rep(`(symbol? "abc")`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });

  await t.step(`CORE: isNil with nil should be true`, () => {
    // true
    assertEquals(
      rep(`(nil? nil)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isNil with true should be false`, () => {
    // false
    assertEquals(
      rep(`(nil? true)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });

  await t.step(`CORE: isTrue with true should be true`, () => {
    // true
    assertEquals(
      rep(`(true? true)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isTrue with false should be false`, () => {
    // false
    assertEquals(
      rep(`(true? false)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`CORE: isTrue with isTrue should be false`, () => {
    // false
    assertEquals(
      rep(`(true? true?)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });

  await t.step(`CORE: isFalse with false should be true`, () => {
    // true
    assertEquals(
      rep(`(false? false)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isFalse with true should be false`, () => {
    // false
    assertEquals(
      rep(`(false? true)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
});

Deno.test(`CORE: Testing apply`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(
    `CORE: apply should work on a list`,
    () => {
      // 5
      assertEquals(
        rep(`(apply + (list 2 3))`, sharedEnv),
        printString(new NumberNode(5), true),
      );
    },
  );
  await t.step(
    `CORE: apply should apply to all proceeding expressions`,
    () => {
      // 9
      assertEquals(
        rep(`(apply + 4 (list 5))`, sharedEnv),
        printString(new NumberNode(9), true),
      );
    },
  );

  await t.step(`CORE: should apply to nested lists`, () => {
    // `;/1 2 "3" \(\)`
    // nil

    const consoleLogSpy = spy(console, 'log');

    assertEquals(
      rep(`(apply prn (list 1 2 "3" (list)))`, sharedEnv),
      printString(new NilNode(), true),
    );

    assertSpyCalls(consoleLogSpy, 1);
    assertEquals(consoleLogSpy.calls[0].args[0], '1 2 "3" ()');
    consoleLogSpy.restore();
  });

  await t.step(
    `CORE: should apply to all proceeding expressions including nested lists`,
    () => {
      // TODO:
      // `;/1 2 "3" \(\)`
      // nil

      const consoleLogSpy = spy(console, 'log');

      assertEquals(
        rep(`(apply prn 1 2 (list "3" (list)))`, sharedEnv),
        printString(new NilNode(), true),
      );

      assertSpyCalls(consoleLogSpy, 1);
      assertEquals(consoleLogSpy.calls[0].args[0], '1 2 "3" ()');
      consoleLogSpy.restore();
    },
  );

  await t.step(`CORE: should apply list to an empty list`, () => {
    // ()
    assertEquals(
      rep(`(apply list (list))`, sharedEnv),
      printString(new ListNode([]), true),
    );
  });

  await t.step(`CORE: should apply isSymbol to a list`, () => {
    // true
    assertEquals(
      rep(`(apply symbol? (list (quote two)))`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
});

Deno.test(`CORE: Testing apply with fn* special forms`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(
    `CORE: should apply a function (fn*) special form to a list`,
    () => {
      // 5
      assertEquals(
        rep(`(apply (fn* (a b) (+ a b)) (list 2 3))`, sharedEnv),
        printString(new NumberNode(5), true),
      );
    },
  );
  await t.step(
    `CORE: should apply a function (fn*) special form to all proceeding expressions`,
    () => {
      // 9
      assertEquals(
        rep(`(apply (fn* (a b) (+ a b)) 4 (list 5))`, sharedEnv),
        printString(new NumberNode(9), true),
      );
    },
  );
});

Deno.test(`CORE: Testing map function`, async (t) => {
  const sharedEnv = initEnv();
  rep(`(def! nums (list 1 2 3))`, sharedEnv);
  rep(`(def! double (fn* (a) (* 2 a)))`, sharedEnv);

  await t.step(`CORE: double function should double a number`, () => {
    // 6
    assertEquals(
      rep(`(double 3)`, sharedEnv),
      printString(new NumberNode(6), true),
    );
  });
  await t.step(`CORE: should double all numbers in a list`, () => {
    // (2 4 6)
    assertEquals(
      rep(`(map double nums) `, sharedEnv),
      printString(
        new ListNode([
          new NumberNode(2),
          new NumberNode(4),
          new NumberNode(6),
        ]),
        true,
      ),
    );
  });
  await t.step(
    `CORE: should map a function (fn*) special form over a list`,
    () => {
      // (false true false)
      assertEquals(
        rep(
          `(map (fn* (x) (symbol? x)) (list 1 (quote two) "three"))`,
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
  await t.step(
    `CORE: mapping a function over an empty list should produce an empty list`,
    () => {
      // true
      assertEquals(
        rep(`(= () (map str ()))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
});

Deno.test(`CORE: Testing symbol and keyword functions`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(`CORE: isSymbol should return false for a keyword`, () => {
    // false
    assertEquals(
      rep(`(symbol? :abc)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`CORE: isSymbol should return true for a symbol`, () => {
    // true
    assertEquals(
      rep(`(symbol? 'abc)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isSymbol should return false for a string`, () => {
    // false
    assertEquals(
      rep(`(symbol? "abc")`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(
    `CORE: isSymbol should return true for a symbol created with the symbol function`,
    () => {
      // true
      assertEquals(
        rep(`(symbol? (symbol "abc"))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
  await t.step(`CORE: isKeyword should return true for a keyword`, () => {
    // true
    assertEquals(
      rep(`(keyword? :abc)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(
    `CORE: isKeyword should return false for a quoted symbol`,
    () => {
      // false
      assertEquals(
        rep(`(keyword? 'abc)`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );
  await t.step(`CORE: isKeyword should return false for a string`, () => {
    // false
    assertEquals(
      rep(`(keyword? "abc")`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(
    `CORE: isKeyword should return false for an empty string`,
    () => {
      // false
      assertEquals(
        rep(`(keyword? "")`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );
  await t.step(
    `CORE: isKeyword should return true for a keyword created with the keyword function`,
    () => {
      // true
      assertEquals(
        rep(`(keyword? (keyword "abc"))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(`CORE: the symbol function should create a symbol`, () => {
    // abc
    assertEquals(
      rep(`(symbol "abc")`, sharedEnv),
      printString(new SymbolNode('abc'), true),
    );
  });
  await t.step(`CORE: the keyword function should create a keyword`, () => {
    // :abc
    const result = rep(`(keyword "abc")`, sharedEnv);
    const expected = printString(new KeywordNode(':abc'), true);
    assertEquals(result, expected);
  });
});

Deno.test(`CORE: Testing sequential? function`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`CORE: isSequential should return true for a list`, () => {
    // true
    assertEquals(
      rep(`(sequential? (list 1 2 3))`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isSequential should return true for a vector`, () => {
    // true
    assertEquals(
      rep(`(sequential? [15])`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isSequential should return true for a function`, () => {
    // false
    assertEquals(
      rep(`(sequential? sequential?)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`CORE: isSequential should return false for a nil`, () => {
    // false
    assertEquals(
      rep(`(sequential? nil)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`CORE: isSequential should return false for a string`, () => {
    // false
    assertEquals(
      rep(`(sequential? "abc")`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
});

Deno.test(`CORE: Testing apply with vectors`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(
    `CORE: apply should work with all proceeding arguments, including vectors`,
    () => {
      // 9
      assertEquals(
        rep(`(apply + 4 [5])`, sharedEnv),
        printString(new NumberNode(9), true),
      );
    },
  );

  await t.step(
    `CORE: apply should work with prn and all proceeding arguments, including vectors`,
    () => {
      const consoleLogSpy = spy(console, 'log');

      assertEquals(
        rep(`(apply prn 1 2 ["3" 4])`, sharedEnv),
        printString(new NilNode(), true),
      );
      // `;/1 2 "3" 4`
      // nil

      assertSpyCalls(consoleLogSpy, 1);
      assertEquals(consoleLogSpy.calls[0].args[0], '1 2 "3" 4');
      consoleLogSpy.restore();
    },
  );

  await t.step(`CORE: apply should work with empty vectors`, () => {
    // ()
    assertEquals(
      rep(`(apply list [])`, sharedEnv),
      printString(new ListNode([]), true),
    );
  });
});

Deno.test(`CORE: Testing apply with fn* and vectors`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(`CORE: should apply fn* to vectors`, () => {
    // 5
    assertEquals(
      rep(`(apply (fn* (a b) (+ a b)) [2 3])`, sharedEnv),
      printString(new NumberNode(5), true),
    );
  });
  await t.step(
    `CORE: should apply fn* to all proceeding arguments, including vectors`,
    () => {
      // 9
      assertEquals(
        rep(`(apply (fn* (a b) (+ a b)) 4 [5])`, sharedEnv),
        printString(new NumberNode(9), true),
      );
    },
  );
});

Deno.test(`CORE: Testing vector functions`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`CORE: isVector should return true for a vector`, () => {
    // true
    assertEquals(
      rep(`(vector? [10 11])`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(`CORE: isVector should return false for a quoted list`, () => {
    // false
    assertEquals(
      rep(`(vector? '(12 13))`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`CORE: the vector function should create a new vector`, () => {
    // [3 4 5]
    assertEquals(
      rep(`(vector 3 4 5)`, sharedEnv),
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
  await t.step(
    `CORE: an empty vector should be equal to a vector created without arguments`,
    () => {
      // true
      assertEquals(
        rep(`(= [] (vector))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
});

Deno.test(`CORE: Test extra function arguments as Mal List (bypassing TCO with apply)`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(`CORE: variadic args should return a list`, () => {
    // true
    assertEquals(
      rep(`(apply (fn* (& more) (list? more)) [1 2 3])`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
  await t.step(
    `CORE: Should return an empty list if there aren't extra args`,
    () => {
      // true
      assertEquals(
        rep(`(apply (fn* (& more) (list? more)) [])`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
  await t.step(
    `CORE: should return a vector intial args, but no extra args`,
    () => {
      // true
      assertEquals(
        rep(`(apply (fn* (a & more) (list? more)) [1])`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
});
