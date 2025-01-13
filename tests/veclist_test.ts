/**
 * Test vec and list functions.
 * Imported from `step7_quote.mal` tests.
 *
 * All of the expected results are built manually and then printed with
 * "printReadably" set to true to emulate how they would appear in the terminal
 * without actually printing to the terminal (slow).
 *
 * @file
 */

import { assertEquals } from '@std/assert';

import { initEnv, rep } from '../src/ensemble.ts';
import { printString } from '../src/printer.ts';
import { ListNode, NilNode, NumberNode, StringNode, VectorNode } from '../src/types.ts';

Deno.test(`VECLIST: Testing vec function`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(
    `VECLIST: the vec function converts an empty list into a vector`,
    () => {
      assertEquals(
        rep(
          `(vec (list))`,
          sharedEnv,
        ),
        // []
        printString(new VectorNode([]), true),
      );
    },
  );

  await t.step(
    `VECLIST: the vec function converts a list with one number into a vector`,
    () => {
      assertEquals(
        rep(
          `(vec (list 1))`,
          sharedEnv,
        ),
        // [1]
        printString(
          new VectorNode([
            new NumberNode(1),
          ]),
          true,
        ),
      );
    },
  );

  await t.step(
    `VECLIST: the vec function converts a list with multiple numbers into a vector`,
    () => {
      assertEquals(
        rep(
          `(vec (list 1 2))`,
          sharedEnv,
        ),
        // [1 2]
        printString(
          new VectorNode([
            new NumberNode(1),
            new NumberNode(2),
          ]),
          true,
        ),
      );
    },
  );

  await t.step(`VECLIST: vec returns a an empty vector`, () => {
    assertEquals(
      rep(
        `(vec [])`,
        sharedEnv,
      ),
      // []
      printString(new VectorNode([]), true),
    );
  });

  await t.step(`VECLIST: vec returns a vector with values`, () => {
    assertEquals(
      rep(
        `(vec [1 2])`,
        sharedEnv,
      ),
      // [1 2]
      printString(
        new VectorNode([
          new NumberNode(1),
          new NumberNode(2),
        ]),
        true,
      ),
    );
  });
});

Deno.test(`VECLIST: Testing that vec does not mutate the original list`, async (t) => {
  const sharedEnv = initEnv();

  rep(`(def! a (list 1 2))`, sharedEnv);

  await t.step(`VECLIST: symbols are evaluated within vecs`, () => {
    assertEquals(
      rep(
        `(vec a)`,
        sharedEnv,
      ),
      // [1 2]
      printString(
        new VectorNode([
          new NumberNode(1),
          new NumberNode(2),
        ]),
        true,
      ),
    );
  });

  await t.step(
    `VECLIST: evaluating a symbol within a vec does not mutate the symbol`,
    () => {
      assertEquals(
        rep(
          `a`,
          sharedEnv,
        ),
        // (1 2)
        printString(
          new ListNode([
            new NumberNode(1),
            new NumberNode(2),
          ]),
          true,
        ),
      );
    },
  );
});

Deno.test(`VECLIST: Testing nth, first and rest functions with lists`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(
    `VECLIST: nth function returns the element at the given index in a list`,
    () => {
      // ;=>1
      assertEquals(
        rep(`(nth (list 1) 0)`, sharedEnv),
        printString(new NumberNode(1), true),
      );
    },
  );

  await t.step(
    `VECLIST: nth function returns the correct element for a multi-element list`,
    () => {
      // ;=>2
      assertEquals(
        rep(`(nth (list 1 2) 1)`, sharedEnv),
        printString(new NumberNode(2), true),
      );
    },
  );

  await t.step(
    `VECLIST: nth function returns nil when the element at the index is nil`,
    () => {
      // ;=>nil
      assertEquals(
        rep(`(nth (list 1 2 nil) 2)`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );

  await t.step(
    `VECLIST: redefining a variable using nth function returns the correct value`,
    () => {
      // ;=>"x"
      rep(`(def! x "x") (def! x (nth (list 1 2) 2))`, sharedEnv);
      assertEquals(
        rep(`x`, sharedEnv),
        printString(new StringNode('"x"')),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns nil when called on an empty list`,
    () => {
      // ;=>nil
      assertEquals(
        rep(`(first (list))`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns the first element when the list has one element`,
    () => {
      // ;=>6
      assertEquals(
        rep(`(first (list 6))`, sharedEnv),
        printString(new NumberNode(6), true),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns the first element when the list has multiple elements`,
    () => {
      // ;=>7
      assertEquals(
        rep(`(first (list 7 8 9))`, sharedEnv),
        printString(new NumberNode(7), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns an empty list when called on an empty list`,
    () => {
      // ;=>()
      assertEquals(
        rep(`(rest (list))`, sharedEnv),
        printString(new ListNode([]), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns an empty list when called on a single-element list`,
    () => {
      // ;=>()
      assertEquals(
        rep(`(rest (list 6))`, sharedEnv),
        printString(new ListNode([]), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns the remaining elements when called on a multi-element list`,
    () => {
      // ;=>(8 9)
      assertEquals(
        rep(`(rest (list 7 8 9))`, sharedEnv),
        printString(
          new ListNode([
            new NumberNode(8),
            new NumberNode(9),
          ]),
          true,
        ),
      );
    },
  );
});

Deno.test(`VECLIST: Testing nth, first, rest with vectors`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(
    `VECLIST: nth function returns the element at the given index in a vector`,
    () => {
      // ;=>1
      assertEquals(
        rep(`(nth [1] 0)`, sharedEnv),
        printString(new NumberNode(1), true),
      );
    },
  );

  await t.step(
    `VECLIST: nth function returns the correct element for a multi-element vector`,
    () => {
      // ;=>2
      assertEquals(
        rep(`(nth [1 2] 1)`, sharedEnv),
        printString(new NumberNode(2), true),
      );
    },
  );

  await t.step(
    `VECLIST: nth function returns nil when the element at the index is nil in a vector`,
    () => {
      // ;=>nil
      assertEquals(
        rep(`(nth [1 2 nil] 2)`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );

  await t.step(
    `VECLIST: redefining a variable using nth function in a vector returns the correct value`,
    () => {
      rep(`(def! x "x") (def! x (nth [1 2] 2))`, sharedEnv);

      // ;=>"x"
      assertEquals(
        rep(`x`, sharedEnv),
        printString(new StringNode('x'), true),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns nil when called on an empty vector`,
    () => {
      // ;=>nil
      assertEquals(
        rep(`(first [])`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns nil when called on nil`,
    () => {
      // ;=>nil
      assertEquals(
        rep(`(first nil)`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns the first element when the vector has one element`,
    () => {
      // ;=>10
      assertEquals(
        rep(`(first [10])`, sharedEnv),
        printString(new NumberNode(10), true),
      );
    },
  );

  await t.step(
    `VECLIST: first function returns the first element when the vector has multiple elements`,
    () => {
      // ;=>10
      assertEquals(
        rep(`(first [10 11 12])`, sharedEnv),
        printString(new NumberNode(10), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns an empty vector when called on an empty vector`,
    () => {
      // ;=>()
      assertEquals(
        rep(`(rest [])`, sharedEnv),
        printString(new ListNode([]), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns an empty vector when called on nil`,
    () => {
      // ;=>()
      assertEquals(
        rep(`(rest nil)`, sharedEnv),
        printString(new ListNode([]), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns an empty vector when called on a single-element vector`,
    () => {
      // ;=>()
      assertEquals(
        rep(`(rest [10])`, sharedEnv),
        printString(new ListNode([]), true),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns the remaining elements when called on a multi-element vector`,
    () => {
      // ;=>(11 12)
      assertEquals(
        rep(`(rest [10 11 12])`, sharedEnv),
        printString(
          new ListNode([
            new NumberNode(11),
            new NumberNode(12),
          ]),
          true,
        ),
      );
    },
  );

  await t.step(
    `VECLIST: rest function returns the remaining elements when called on a cons cell with a vector`,
    () => {
      // ;=>(11 12)
      assertEquals(
        rep(`(rest (cons 10 [11 12]))`, sharedEnv),
        printString(
          new ListNode([
            new NumberNode(11),
            new NumberNode(12),
          ]),
          true,
        ),
      );
    },
  );
});
