/**
 * Test macros:
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

import { initEnv, rep } from '../src/lib.ts';
import { printString } from '../src/printer.ts';
import { BooleanNode, ListNode, NilNode, NumberNode, StringNode, SymbolNode, VectorNode } from '../src/types.ts';
import { assertEquals, test } from '../tests/test_runner.ts';

test(`MACRO: Testing ' (quote) reader macro`, () => {
  const sharedEnv = initEnv();

  test(`MACRO: the quote macro works with numbers`, () => {
    assertEquals(
      rep(
        `'7`,
        sharedEnv,
      ),
      // 7
      printString(new NumberNode(7), true),
    );
  });

  test(`MACRO: the quote macro works with lists`, () => {
    assertEquals(
      rep(
        `'(1 2 3)`,
        sharedEnv,
      ),
      // (1 2 3)
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new NumberNode(3),
        ]),
        true,
      ),
    );
  });

  test(`MACRO: the quote macro works with nested lists`, () => {
    assertEquals(
      rep(
        `'(1 2 (3 4))`,
        sharedEnv,
      ),
      // (1 2 (3 4))
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new ListNode([
            new NumberNode(3),
            new NumberNode(4),
          ]),
        ]),
        true,
      ),
    );
  });
});

test('MACRO: Testing ` (quasiquote) reader macro', () => {
  const sharedEnv = initEnv();

  test(`MACRO: the quasiquote macro returns numbers`, () => {
    assertEquals(
      rep(
        '`7',
        sharedEnv,
      ),
      // 7
      printString(new NumberNode(7), true),
    );
  });

  test(`MACRO: the quasiquote macro returns lists`, () => {
    assertEquals(
      rep(
        '`(1 2 3)',
        sharedEnv,
      ),
      // (1 2 3)
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new NumberNode(3),
        ]),
        true,
      ),
    );
  });

  test(`MACRO: the quasiquote macro returns nested lists`, () => {
    assertEquals(
      rep(
        '`(1 2 (3 4))',
        sharedEnv,
      ),
      // (1 2 (3 4))
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new ListNode([
            new NumberNode(3),
            new NumberNode(4),
          ]),
        ]),
        true,
      ),
    );
  });

  test(`MACRO: the quasiquote macro returns a list of nil`, () => {
    assertEquals(
      rep(
        '`(nil)',
        sharedEnv,
      ),
      // (nil)
      printString(
        new ListNode([
          new NilNode(),
        ]),
        true,
      ),
    );
  });
});

test(`MACRO: Testing ~ (unquote) reader macro`, () => {
  const sharedEnv = initEnv();

  test(
    `MACRO: the unquote macro can be used with the quasiquote macro`,
    () => {
      assertEquals(
        rep(
          '`~7',
          sharedEnv,
        ),
        // 7
        printString(new NumberNode(7), true),
      );
    },
  );

  test(`MACRO: defining a variable to test the unquote macro`, () => {
    assertEquals(
      rep(
        `(def! a 8)`,
        sharedEnv,
      ),
      // 8
      printString(new NumberNode(8), true),
    );
  });

  test(
    `MACRO: the unquote macro will unquote symbols in the a list`,
    () => {
      assertEquals(
        rep(
          '`(1 ~a 3)',
          sharedEnv,
        ),
        // (1 8 3)
        printString(
          new ListNode([
            new NumberNode(1),
            new NumberNode(8),
            new NumberNode(3),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: define another variable to test the unquote macro`,
    () => {
      assertEquals(
        rep(
          `(def! b '(1 "b" "d"))`,
          sharedEnv,
        ),
        // (1 "b" "d")
        printString(
          new ListNode([
            new NumberNode(1),
            new StringNode('b'),
            new StringNode('d'),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: the quasiquote macro returns an unevaluated list`,
    () => {
      assertEquals(
        rep(
          '`(1 b 3)',
          sharedEnv,
        ),
        // (1 b 3)
        printString(
          new ListNode([
            new NumberNode(1),
            new SymbolNode('b'),
            new NumberNode(3),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: the unquote macro unquotes a value in a list and evaluates it`,
    () => {
      assertEquals(
        rep(
          '`(1 ~b 3)',
          sharedEnv,
        ),
        // (1 (1 "b" "d") 3)
        printString(
          new ListNode([
            new NumberNode(1),
            new ListNode([
              new NumberNode(1),
              new StringNode('b'),
              new StringNode('d'),
            ]),
            new NumberNode(3),
          ]),
          true,
        ),
      );
    },
  );
});

test(`MACRO: Testing ~@ (splice-unquote) reader macro`, () => {
  const sharedEnv = initEnv();

  test(`MACRO: define a variable for testing splice-unquote`, () => {
    assertEquals(
      rep(
        `(def! c '(1 "b" "d"))`,
        sharedEnv,
      ),
      // (1 "b" "d")
      printString(
        new ListNode([
          new NumberNode(1),
          new StringNode('b'),
          new StringNode('d'),
        ]),
        true,
      ),
    );
  });

  test(
    `MACRO: quasiquote macro returns a list with "c" unevaluated`,
    () => {
      assertEquals(
        rep(
          '`(1 c 3)',
          sharedEnv,
        ),
        // (1 c 3)
        printString(
          new ListNode([
            new NumberNode(1),
            new SymbolNode('c'),
            new NumberNode(3),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: the splice-unquote macro unquotes a value and injects it in-place`,
    () => {
      assertEquals(
        rep(
          '`(1 ~@c 3)',
          sharedEnv,
        ),
        // (1 1 "b" "d" 3)
        printString(
          new ListNode([
            new NumberNode(1),
            new NumberNode(1),
            new StringNode('b'),
            new StringNode('d'),
            new NumberNode(3),
          ]),
          true,
        ),
      );
    },
  );
});

test(`MACRO: Testing unquote with vectors`, () => {
  const sharedEnv = initEnv();

  rep(`(def! a 8)`, sharedEnv);

  test(
    `MACRO: the unquote macro works insdide of a vector`,
    () => {
      assertEquals(
        rep(
          '`[~a]',
          sharedEnv,
        ),
        // [8]
        printString(
          new VectorNode([
            new NumberNode(8),
          ]),
        ),
      );
    },
  );

  test(
    `MACRO: the unquote macro works inside of a list inside of a vector`,
    () => {
      assertEquals(
        rep(
          '`[(~a)]',
          sharedEnv,
        ),
        // [(8)]
        printString(
          new VectorNode([
            new ListNode([
              new NumberNode(8),
            ]),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: the unquote macro works inside of a vector inside of quasiquoted list`,
    () => {
      assertEquals(
        rep(
          '`([~a])',
          sharedEnv,
        ),
        // ([8])
        printString(
          new ListNode([
            new VectorNode([
              new NumberNode(8),
            ]),
          ]),
          true,
        ),
      );
    },
  );

  test(`MACRO: unquote works in a quasi-quoted vector`, () => {
    assertEquals(
      rep(
        '`[a ~a a]',
        sharedEnv,
      ),
      // [a 8 a]
      printString(
        new VectorNode([
          new SymbolNode('a'),
          new NumberNode(8),
          new SymbolNode('a'),
        ]),
        true,
      ),
    );
  });

  test(
    `MACRO: unquote works in a vector inside of a quasi-quoted list`,
    () => {
      assertEquals(
        rep(
          '`([a ~a a])',
          sharedEnv,
        ),
        // ([a 8 a])
        printString(
          new ListNode([
            new VectorNode([
              new SymbolNode('a'),
              new NumberNode(8),
              new SymbolNode('a'),
            ]),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: unquote in a list inside of a quasi-quoted vector`,
    () => {
      assertEquals(
        rep(
          '`[(a ~a a)]',
          sharedEnv,
        ),
        // [(a 8 a)]
        printString(
          new VectorNode([
            new ListNode([
              new SymbolNode('a'),
              new NumberNode(8),
              new SymbolNode('a'),
            ]),
          ]),
          true,
        ),
      );
    },
  );
});

test(`MACRO: Testing splice-unquote with vectors`, () => {
  const sharedEnv = initEnv();
  test(
    `MACRO: define a symbol to test complex splice-unquote expressions`,
    () => {
      assertEquals(
        rep(
          `(def! c '(1 "b" "d"))`,
          sharedEnv,
        ),
        // (1 "b" "d")
        printString(
          new ListNode([
            new NumberNode(1),
            new StringNode('b'),
            new StringNode('d'),
          ]),
          true,
        ),
      );
    },
  );

  test(`MACRO: you can splice-unquote inside of a vector`, () => {
    assertEquals(
      rep(
        '`[~@c]',
        sharedEnv,
      ),
      // [1 "b" "d"]
      printString(
        new VectorNode([
          new NumberNode(1),
          new StringNode('b'),
          new StringNode('d'),
        ]),
        true,
      ),
    );
  });

  test(
    `MACRO: you can splice-unquote inside of a list inside of a vector with evaluation`,
    () => {
      assertEquals(
        rep(
          '`[(~@c)]',
          sharedEnv,
        ),
        // [(1 "b" "d")]
        printString(
          new VectorNode([
            new ListNode([
              new NumberNode(1),
              new StringNode('b'),
              new StringNode('d'),
            ]),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: you can splice-unquote inside of a vector inside of a list with evaluation`,
    () => {
      assertEquals(
        rep(
          '`([~@c])',
          sharedEnv,
        ),
        // ([1 "b" "d"])
        printString(
          new ListNode([
            new VectorNode([
              new NumberNode(1),
              new StringNode('b'),
              new StringNode('d'),
            ]),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: splice-unquote a symbol in a vec with multiple values`,
    () => {
      assertEquals(
        rep(
          '`[1 ~@c 3]',
          sharedEnv,
        ),
        // [1 1 "b" "d" 3]
        printString(
          new VectorNode([
            new NumberNode(1),
            new NumberNode(1),
            new StringNode('b'),
            new StringNode('d'),
            new NumberNode(3),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: splice-unquote a symbol in a vec with multiple values inside of a list`,
    () => {
      assertEquals(
        rep(
          '`([1 ~@c 3])',
          sharedEnv,
        ),
        // ([1 1 "b" "d" 3])
        printString(
          new ListNode([
            new VectorNode([
              new NumberNode(1),
              new NumberNode(1),
              new StringNode('b'),
              new StringNode('d'),
              new NumberNode(3),
            ]),
          ]),
          true,
        ),
      );
    },
  );

  test(
    `MACRO: splice-unquote a symbol in a list with multiple values inside of a vec`,
    () => {
      assertEquals(
        rep(
          '`[(1 ~@c 3)]',
          sharedEnv,
        ),
        // [(1 1 "b" "d" 3)]
        printString(
          new VectorNode([
            new ListNode([
              new NumberNode(1),
              new NumberNode(1),
              new StringNode('b'),
              new StringNode('d'),
              new NumberNode(3),
            ]),
          ]),
          true,
        ),
      );
    },
  );
});

// MARK: CUSTOM MACROS
// -----------------------------------------------------------------------------

// TODO:

test(`MACRO: Testing trivial macros`, () => {
  const sharedEnv = initEnv();

  test(`MACRO: Define and call a macro that returns 1`, () => {
    // (defmacro! one (fn* () 1))
    // (one)
    // ;=>1
    rep(`(defmacro! one (fn* () 1))`, sharedEnv);
    assertEquals(
      rep(`(one)`, sharedEnv),
      printString(new NumberNode(1), true),
    );
  });

  test(`MACRO: Define and call a macro that returns 2`, () => {
    // (defmacro! two (fn* () 2))
    // (two)
    // ;=>2
    rep(`(defmacro! two (fn* () 2))`, sharedEnv);
    assertEquals(
      rep(`(two)`, sharedEnv),
      printString(new NumberNode(2), true),
    );
  });
});

test(`MACRO: Testing unless macro`, () => {
  const sharedEnv = initEnv();
  rep('(defmacro! unless (fn* (pred a b) `(if ~pred ~b ~a)))', sharedEnv);

  test(`MACRO: 'unless' macro with false predicate`, () => {
    // ;=>7
    assertEquals(
      rep(`(unless false 7 8)`, sharedEnv),
      printString(new NumberNode(7), true),
    );
  });
  test(`MACRO: 'unless' macro with true predicate`, () => {
    // ;=>8
    assertEquals(
      rep(`(unless true 7 8)`, sharedEnv),
      printString(new NumberNode(8), true),
    );
  });
});

test(`MACRO: Testing unless2 macro`, () => {
  const sharedEnv = initEnv();
  rep(
    `(defmacro! unless2 (fn* (pred a b) (list 'if (list 'not pred) a b)))`,
    sharedEnv,
  );
  test(`MACRO: 'unless2' macro with false predicate`, () => {
    // ;=>7
    assertEquals(
      rep(`(unless2 false 7 8)`, sharedEnv),
      printString(new NumberNode(7), true),
    );
  });
  test(`MACRO: 'unless2' macro with true predicate`, () => {
    // ;=>8
    assertEquals(
      rep(`(unless2 true 7 8)`, sharedEnv),
      printString(new NumberNode(8), true),
    );
  });
});

test(`MACRO: Testing macroexpand`, () => {
  const sharedEnv = initEnv();
  rep(`(defmacro! one (fn* () 1))`, sharedEnv);

  test(`MACRO: Macroexpand a trivial macro`, () => {
    // ;=>1
    assertEquals(
      rep(`(macroexpand (one))`, sharedEnv),
      printString(new NumberNode(1), true),
    );
  });
  test(`MACRO: Macroexpand 'unless' macro`, () => {
    rep('(defmacro! unless (fn* (pred a b) `(if ~pred ~b ~a)))', sharedEnv);
    // ;=>(if PRED B A)
    assertEquals(
      rep(`(macroexpand (unless PRED A B))`, sharedEnv),
      printString(
        new ListNode([
          new SymbolNode('if'),
          new SymbolNode('PRED'),
          new SymbolNode('B'),
          new SymbolNode('A'),
        ]),
        true,
      ),
    );
  });
  test(`MACRO: Macroexpand 'unless2' macro`, () => {
    // ;=>(if (not PRED) A B)
    rep(
      `(defmacro! unless2 (fn* (pred a b) (list 'if (list 'not pred) a b)))`,
      sharedEnv,
    );
    assertEquals(
      rep(`(macroexpand (unless2 PRED A B))`, sharedEnv),
      printString(
        new ListNode([
          new SymbolNode('if'),
          new ListNode([
            new SymbolNode('not'),
            new SymbolNode('PRED'),
          ]),
          new SymbolNode('A'),
          new SymbolNode('B'),
        ]),
        true,
      ),
    );
  });
  test(`MACRO: Macroexpand 'unless2' with specific values`, () => {
    // ;=>(if (not 2) 3 4)
    assertEquals(
      rep(`(macroexpand (unless2 2 3 4))`, sharedEnv),
      printString(
        new ListNode([
          new SymbolNode('if'),
          new ListNode([
            new SymbolNode('not'),
            new NumberNode(2),
          ]),
          new NumberNode(3),
          new NumberNode(4),
        ]),
        true,
      ),
    );
  });
});

test(`MACRO: Testing evaluation of macro result`, () => {
  const sharedEnv = initEnv();
  rep(`(defmacro! identity (fn* (x) x))`, sharedEnv);
  test(`MACRO: Evaluate macro result with let* binding`, () => {
    // ;=>a
    assertEquals(
      rep(`(let* (a 123) (macroexpand (identity a)))`, sharedEnv),
      printString(new SymbolNode('a'), true),
    );
  });
  test(`MACRO: Evaluate macro result directly`, () => {
    // ;=>123
    assertEquals(
      rep(`(let* (a 123) (identity a))`, sharedEnv),
      printString(new NumberNode(123), true),
    );
  });
});

test(`MACRO: Test that macros do not break empty list`, () => {
  const sharedEnv = initEnv();
  test(`MACRO: Ensure empty list is not affected by macros`, () => {
    // ;=>()
    assertEquals(
      rep(`()`, sharedEnv),
      printString(new ListNode([]), true),
    );
  });
});

test(`MACRO: Test that macros do not break quasiquote`, () => {
  const sharedEnv = initEnv();
  test(`MACRO: Ensure quasiquote works with macros`, () => {
    // ;=>(1)
    assertEquals(
      rep('`(1)', sharedEnv),
      printString(
        new ListNode([
          new NumberNode(1),
        ]),
        true,
      ),
    );
  });
});

test(`MACRO: Testing "not" macro function`, () => {
  const sharedEnv = initEnv();
  test(`MACRO: Test 'not' macro with true condition`, () => {
    assertEquals(
      // ;=>false
      rep(`(not (= 1 1))`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  // This should fail if it is a macro
  test(`MACRO: Test 'not' macro with false condition`, () => {
    // ;=>true
    assertEquals(
      rep(`(not (= 1 2))`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });
});

test(`MACRO: Testing cond macro`, () => {
  const sharedEnv = initEnv();

  test(`MACRO: Macroexpand an empty cond`, () => {
    // ;=>nil
    assertEquals(
      rep(`(macroexpand (cond))`, sharedEnv),
      printString(new NilNode(), true),
    );
  });

  test(`MACRO: Evaluate an empty cond`, () => {
    // ;=>nil
    assertEquals(
      rep(`(cond)`, sharedEnv),
      printString(new NilNode(), true),
    );
  });

  test(`MACRO: Macroexpand cond with one pair`, () => {
    // ;=>(if X Y (cond))
    assertEquals(
      rep(`(macroexpand (cond X Y))`, sharedEnv),
      printString(
        new ListNode([
          new SymbolNode('if'),
          new SymbolNode('X'),
          new SymbolNode('Y'),
          new ListNode([
            new SymbolNode('cond'),
          ]),
        ]),
        true,
      ),
    );
  });

  test(`MACRO: Evaluate cond with one true condition`, () => {
    // ;=>7
    assertEquals(
      rep(`(cond true 7)`, sharedEnv),
      printString(new NumberNode(7), true),
    );
  });

  test(`MACRO: Evaluate cond with one false condition`, () => {
    // ;=>nil
    assertEquals(
      rep(`(cond false 7)`, sharedEnv),
      printString(new NilNode(), true),
    );
  });

  test(`MACRO: Macroexpand cond with two pairs`, () => {
    // ;=>(if X Y (cond Z T))
    assertEquals(
      rep(`(macroexpand (cond X Y Z T))`, sharedEnv),
      printString(
        new ListNode([
          new SymbolNode('if'),
          new SymbolNode('X'),
          new SymbolNode('Y'),
          new ListNode([
            new SymbolNode('cond'),
            new SymbolNode('Z'),
            new SymbolNode('T'),
          ]),
        ]),
        true,
      ),
    );
  });

  test(`MACRO: Evaluate cond with two true conditions`, () => {
    // ;=>7
    assertEquals(
      rep(`(cond true 7 true 8)`, sharedEnv),
      printString(new NumberNode(7), true),
    );
  });

  test(
    `MACRO: Evaluate cond with first false and second true condition`,
    () => {
      // ;=>8
      assertEquals(
        rep(`(cond false 7 true 8)`, sharedEnv),
        printString(new NumberNode(8), true),
      );
    },
  );

  test(`MACRO: Evaluate cond with all false conditions`, () => {
    // ;=>nil
    assertEquals(
      rep(`(cond false 7 false 8)`, sharedEnv),
      printString(new NilNode(), true),
    );
  });

  test(`MACRO: Evaluate cond with "else" clause`, () => {
    // ;=>9
    assertEquals(
      rep(`(cond false 7 false 8 "else" 9)`, sharedEnv),
      printString(new NumberNode(9), true),
    );
  });

  test(
    `MACRO: Evaluate cond with true condition before "else"`,
    () => {
      // ;=>8
      assertEquals(
        rep(`(cond false 7 (= 2 2) 8 "else" 9)`, sharedEnv),
        printString(new NumberNode(8), true),
      );
    },
  );

  test(
    `MACRO: Evaluate cond with all false conditions and no "else"`,
    () => {
      // ;=>nil
      assertEquals(
        rep(`(cond false 7 false 8 false 9)`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );
});

test(`MACRO: Testing EVAL in let*`, () => {
  const sharedEnv = initEnv();

  test(`MACRO: Evaluate cond inside let* binding`, () => {
    // ;=>"yes"
    assertEquals(
      rep(`(let* (x (cond false "no" true "yes")) x)`, sharedEnv),
      printString(new StringNode('yes'), true),
    );
  });
});

test(`MACRO: Testing EVAL in vector let*`, () => {
  const sharedEnv = initEnv();

  test(`MACRO: Evaluate cond inside vector let* binding`, () => {
    // ;=>"yes"
    assertEquals(
      rep(`(let* [x (cond false "no" true "yes")] x)`, sharedEnv),
      printString(new StringNode('yes'), true),
    );
  });
});

test(`MACRO: Test that macros use closures`, () => {
  const sharedEnv = initEnv();

  rep(`(def! x 2)`, sharedEnv);
  rep(`(defmacro! a (fn* [] x))`, sharedEnv);

  test(`MACRO: Macro uses outer x`, () => {
    // ;=>2
    assertEquals(
      rep(`(a)`, sharedEnv),
      printString(new NumberNode(2), true),
    );
  });
  test(`MACRO: Macro uses outer x despite inner x binding`, () => {
    // ;=>2
    assertEquals(
      rep(`(let* (x 3) (a))`, sharedEnv),
      printString(new NumberNode(2), true),
    );
  });
});
