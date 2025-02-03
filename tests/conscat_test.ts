/**
 * TODO: Clean and test
 * Test cons and concat.
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
import { BooleanNode, ListNode, NumberNode, VectorNode } from '../src/types.ts';

Deno.test(`Cons/Concat: Testing cons function`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(`Cons/Concat: cons a number and empty list`, () => {
    assertEquals(
      rep(
        `(cons 1 (list))`,
        sharedEnv,
      ),
      // (1)
      printString(
        new ListNode([
          new NumberNode(1),
        ]),
        true,
      ),
    );
  });

  await t.step(`Cons/Concat: cons a number and list containing a number`, () => {
    assertEquals(
      rep(
        `(cons 1 (list 2))`,
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
  });

  await t.step(
    `Cons/Concat: cons a number and list containing several numbers`,
    () => {
      assertEquals(
        rep(
          `(cons 1 (list 2 3))`,
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
    },
  );

  await t.step(`Cons/Concat: cons two lists`, () => {
    assertEquals(
      rep(
        `(cons (list 1) (list 2 3))`,
        sharedEnv,
      ),
      // ((1) 2 3)
      printString(
        new ListNode([
          new ListNode([
            new NumberNode(1),
          ]),
          new NumberNode(2),
          new NumberNode(3),
        ]),
        true,
      ),
    );
  });
});

Deno.test(`Cons/Concat: Testing def + cons`, async (t) => {
  const sharedEnv = initEnv();

  // Define a symbol for testing
  rep(`(def! a (list 2 3))`, sharedEnv);

  await t.step(`Cons/Concat: cons a number and a symbol`, () => {
    assertEquals(
      rep(
        `(cons 1 a)`,
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

  await t.step(`Cons/Concat: cons does not affect symbol value`, () => {
    assertEquals(
      rep(
        `a`,
        sharedEnv,
      ),
      // (2 3)
      printString(
        new ListNode([
          new NumberNode(2),
          new NumberNode(3),
        ]),
        true,
      ),
    );
  });
});

Deno.test(`Cons/Concat: Testing concat function`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`Cons/Concat: concat nothing`, () => {
    assertEquals(
      rep(
        `(concat)`,
        sharedEnv,
      ),
      // ()
      printString(new ListNode([]), true),
    );
  });

  await t.step(`Cons/Concat: concat a list of numbers`, () => {
    assertEquals(
      rep(
        `(concat (list 1 2))`,
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
  });

  await t.step(`Cons/Concat: concat two lists of numbers`, () => {
    assertEquals(
      rep(
        `(concat (list 1 2) (list 3 4))`,
        sharedEnv,
      ),
      // (1 2 3 4)
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new NumberNode(3),
          new NumberNode(4),
        ]),
        true,
      ),
    );
  });

  await t.step(`Cons/Concat: concat three lists of numbers`, () => {
    assertEquals(
      rep(
        `(concat (list 1 2) (list 3 4) (list 5 6))`,
        sharedEnv,
      ),
      // (1 2 3 4 5 6)
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new NumberNode(3),
          new NumberNode(4),
          new NumberNode(5),
          new NumberNode(6),
        ]),
        true,
      ),
    );
  });

  await t.step(`Cons/Concat: concat a list that concats nothing`, () => {
    assertEquals(
      rep(
        `(concat (concat))`,
        sharedEnv,
      ),
      // ()
      printString(new ListNode([]), true),
    );
  });

  await t.step(`Cons/Concat: concat two empty lists`, () => {
    assertEquals(
      rep(
        `(concat (list) (list))`,
        sharedEnv,
      ),
      // ()
      printString(new ListNode([]), true),
    );
  });

  await t.step(
    `Cons/Concat: an empty list is equivalent to a concat of nothing`,
    () => {
      assertEquals(
        rep(
          `(= () (concat))`,
          sharedEnv,
        ),
        // true
        printString(new BooleanNode(true), true),
      );
    },
  );
});

Deno.test(`Cons/Concat: Testing concat + def!`, async (t) => {
  const sharedEnv = initEnv();

  // Define a symbols for testing
  rep(`(def! a (list 1 2))`, sharedEnv);
  rep(`(def! b (list 3 4))`, sharedEnv);

  await t.step(`Cons/Concat: concat evaluated symbols and lists`, () => {
    assertEquals(
      rep(
        `(concat a b (list 5 6))`,
        sharedEnv,
      ),
      // (1 2 3 4 5 6)
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new NumberNode(3),
          new NumberNode(4),
          new NumberNode(5),
          new NumberNode(6),
        ]),
        true,
      ),
    );
  });

  await t.step(`Cons/Concat: concat does not affect symbol values`, () => {
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
  });

  await t.step(
    `Cons/Concat: symbols maintain their defined values after concat`,
    () => {
      assertEquals(
        rep(
          `b`,
          sharedEnv,
        ),
        // (3 4)
        printString(
          new ListNode([
            new NumberNode(3),
            new NumberNode(4),
          ]),
          true,
        ),
      );
    },
  );
});

Deno.test(`Cons/Concat: Testing cons and concat with vectors`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(
    `Cons/Concat: consing a number and vector results in a list`,
    () => {
      assertEquals(
        rep(
          `(cons 1 [])`,
          sharedEnv,
        ),
        // (1)
        printString(
          new ListNode([
            new NumberNode(1),
          ]),
          true,
        ),
      );
    },
  );

  await t.step(`Cons/Concat: the car is injected into the list as-is`, () => {
    assertEquals(
      rep(
        `(cons [1] [2 3])`,
        sharedEnv,
      ),
      // ([1] 2 3)
      printString(
        new ListNode([
          new VectorNode([
            new NumberNode(1),
          ]),
          new NumberNode(2),
          new NumberNode(3),
        ]),
        true,
      ),
    );
  });

  await t.step(
    `Cons/Concat: each item in the cdr is injected into the list`,
    () => {
      assertEquals(
        rep(
          `(cons 1 [2 3])`,
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
    },
  );

  await t.step(`Cons/Concat: concat treats vectors and lists the same`, () => {
    assertEquals(
      rep(
        `(concat [1 2] (list 3 4) [5 6])`,
        sharedEnv,
      ),
      // (1 2 3 4 5 6)
      printString(
        new ListNode([
          new NumberNode(1),
          new NumberNode(2),
          new NumberNode(3),
          new NumberNode(4),
          new NumberNode(5),
          new NumberNode(6),
        ]),
        true,
      ),
    );
  });

  await t.step(
    `Cons/Concat: concat returns a list when concatenating a vector`,
    () => {
      assertEquals(
        rep(
          `(concat [1 2])`,
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
