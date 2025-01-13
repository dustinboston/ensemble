/**
 * Test map functions
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
import { BooleanNode, KeywordNode, ListNode, MapNode, NilNode, NumberNode, StringNode } from '../src/types.ts';

Deno.test(`MAP: Testing MapNode`, async (t) => {
  await t.step(
    `MAP: Creating a MapNode with a Map`,
    () => {
      // {foo 1 "bar" 2 baz: 3}
      const map = new MapNode(
        new Map([
          ['foo', new NumberNode(1)],
          ['"bar"', new NumberNode(2)],
          ['baz:', new NumberNode(3)],
        ]),
      );
      assertEquals(
        map.value,
        new Map([
          ['foo', new NumberNode(1)],
          ['"bar"', new NumberNode(2)],
          ['baz:', new NumberNode(3)],
        ]),
      );
    },
  );

  await t.step(
    `MAP: Creating a MapNode an array`,
    () => {
      // {foo 1 "bar" 2 baz: 3}
      const map = new MapNode(
        new Map([
          ['foo', new NumberNode(1)],
          ['"bar"', new NumberNode(2)],
          ['baz:', new NumberNode(3)],
        ]),
      );
      assertEquals(
        map.value,
        new Map([
          ['foo', new NumberNode(1)],
          ['"bar"', new NumberNode(2)],
          ['baz:', new NumberNode(3)],
        ]),
      );
    },
  );

  await t.step(
    `MAP: Strings can be used for keys`,
    () => {
      // {foo 1 "bar" 2 baz: 3}
      const map = new MapNode(
        new Map(
          [
            ['foo', new NumberNode(1)],
            ['"bar"', new NumberNode(2)],
            ['baz:', new NumberNode(3)],
          ],
        ),
      );
      assertEquals(
        map.value,
        new Map([
          ['foo', new NumberNode(1)],
          ['"bar"', new NumberNode(2)],
          ['baz:', new NumberNode(3)],
        ]),
      );
    },
  );

  // BUGFIX: MapNodes shouldn't allow anything for a map key
  await t.step(
    `MAP: I guess any type can be used for keys. That's a bug.`,
    () => {
      const map = new MapNode(
        new Map([[
          43 as unknown as string,
          new NumberNode(1),
        ]]),
      );
      assertEquals(
        map.value,
        new Map([[
          43 as unknown as string,
          new NumberNode(1),
        ]]),
      );
    },
  );

  await t.step(
    `MAP: Any value type can be used with MapNode. It should be AstNode.`,
    () => {
      const map = new MapNode(
        new Map([[
          'foo',
          'barf' as unknown as StringNode,
        ]]),
      );

      assertEquals(
        map.value,
        new Map([[
          'foo',
          'barf' as unknown as StringNode,
        ]]),
      );
    },
  );

  // BUGFIX: MapNode keys should be limited to MapKeyNode types
  await t.step(
    `MAP: BUG TODO Invalid constructor arguments don't throw an error.`,
    () => {
      const result = new MapNode(
        'bearclaw' as unknown as Map<string, StringNode>,
      );
      assertEquals(
        result.value,
        'bearclaw' as unknown as Map<string, StringNode>,
      );
    },
  );

  await t.step(
    `MAP: MapNode can be constructed without arguments`,
    () => {
      assertEquals(new MapNode(), new MapNode(new Map()));
    },
  );
});

Deno.test(`MAP: Testing map function with vectors`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(
    `MAP: Applying a function to double elements of a vector`,
    () => {
      // (2 4 6)
      assertEquals(
        rep(`(map (fn* (a) (* 2 a)) [1 2 3])`, sharedEnv),
        printString(
          new ListNode([
            new NumberNode(2),
            new NumberNode(4),
            new NumberNode(6),
          ]),
          true,
        ),
      );
    },
  );

  await t.step(
    `MAP: Checking if arguments are lists within map function`,
    () => {
      // (true true)
      assertEquals(
        rep(`(map (fn* [& args] (list? args)) [1 2])`, sharedEnv),
        printString(
          new ListNode([
            new BooleanNode(true),
            new BooleanNode(true),
          ]),
          true,
        ),
      );
    },
  );
});

Deno.test(`MAP: Testing isMap`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(
    `MAP: Checking if an empty hash-map is identified as a map`,
    () => {
      // true
      assertEquals(
        rep(`(map? {})`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
  await t.step(
    `MAP: Checking if an empty list is identified as a map`,
    () => {
      // false
      assertEquals(
        rep(`(map? '())`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );
  await t.step(
    `MAP: Checking if an empty vector is identified as a map`,
    () => {
      // false
      assertEquals(
        rep(`(map? [])`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );
  await t.step(`MAP: Checking if a symbol is identified as a map`, () => {
    // false
    assertEquals(
      rep(`(map? 'abc)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`MAP: Checking if a keyword is identified as a map`, () => {
    // false
    assertEquals(
      rep(`(map? abc:)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
});

Deno.test(`MAP: Testing hash-maps`, async (t) => {
  const sharedEnv = initEnv();
  await t.step(
    `MAP: Creating a hash-map with a string key and numeric value`,
    () => {
      // {"a" 1}
      assertEquals(
        rep(`(hash-map "a" 1)`, sharedEnv),
        printString(
          new MapNode(
            new Map(
              [
                ['"a"', new NumberNode(1)],
              ],
            ),
          ),
          true,
        ),
      );
    },
  );

  await t.step(`MAP: Literal hash-map creation`, () => {
    // {"a" 1}
    assertEquals(
      rep(`{"a" 1}`, sharedEnv),
      printString(
        new MapNode(
          new Map([['"a"', new NumberNode(1)]]),
        ),
        true,
      ),
    );
  });

  await t.step(
    `MAP: Associating a key-value pair in an empty hash-map`,
    () => {
      // {"a" 1}
      assertEquals(
        rep(`(assoc {} "a" 1)`, sharedEnv),
        printString(
          new MapNode(new Map([['"a"', new NumberNode(1)]])),
          true,
        ),
      );
    },
  );

  await t.step(
    `MAP: Getting a value from a nested association in a hash-map`,
    () => {
      // 1
      assertEquals(
        rep(
          `(get (assoc (assoc {"a" 1 } "b" 2) "c" 3) "a")`,
          sharedEnv,
        ),
        printString(new NumberNode(1), true),
      );
    },
  );

  await t.step(`MAP: Defining an empty hash-map`, () => {
    // {}
    assertEquals(
      rep(`(def! hm1 (hash-map))`, sharedEnv),
      printString(new MapNode(), true),
    );
  });

  await t.step(
    `MAP: Checking if a defined hash-map is identified as a map`,
    () => {
      // true
      assertEquals(
        rep(`(map? hm1)`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(`MAP: Checking if a number is identified as a map`, () => {
    // false
    assertEquals(
      rep(`(map? 1)`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });
  await t.step(`MAP: Checking if a string is identified as a map`, () => {
    // false
    assertEquals(
      rep(`(map? "abc")`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });

  await t.step(`MAP: Getting a value from a nil hash-map`, () => {
    // nil
    assertEquals(
      rep(`(get nil "a")`, sharedEnv),
      printString(new NilNode(), true),
    );
  });

  await t.step(`MAP: Getting a value from an empty hash-map`, () => {
    // nil
    assertEquals(
      rep(`(get hm1 "a")`, sharedEnv),
      printString(new NilNode(), true),
    );
  });

  await t.step(`MAP: Checking if a key exists in an empty hash-map`, () => {
    // false
    assertEquals(
      rep(`(contains? hm1 "a")`, sharedEnv),
      printString(new BooleanNode(false), true),
    );
  });

  await t.step(
    `MAP: Associating a key-value pair in a hash-map and defining it`,
    () => {
      // {"a" 1}
      assertEquals(
        rep(`(def! hm2 (assoc hm1 "a" 1))`, sharedEnv),
        printString(
          new MapNode(
            new Map([['"a"', new NumberNode(1)]]),
          ),
          true,
        ),
      );
    },
  );

  await t.step(
    `MAP: Getting a value from a hash-map after association`,
    () => {
      // nil
      assertEquals(
        rep(`(get hm1 "a")`, sharedEnv),
        printString(new NilNode(), true),
      );
    },
  );

  await t.step(
    `MAP: Checking if a key exists in a hash-map after association`,
    () => {
      // false
      assertEquals(
        rep(`(contains? hm1 "a")`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(
    `MAP: Getting a value from a hash-map with a defined key-value pair`,
    () => {
      // 1
      assertEquals(
        rep(`(get hm2 "a")`, sharedEnv),
        printString(new NumberNode(1), true),
      );
    },
  );

  await t.step(
    `MAP: Checking if a key exists in a hash-map with a defined key-value pair`,
    () => {
      // true
      assertEquals(
        rep(`(contains? hm2 "a")`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(`MAP: Getting keys from an empty hash-map`, () => {
    // ()
    assertEquals(
      rep(`(keys hm1)`, sharedEnv),
      printString(new ListNode([]), true),
    );
  });
  await t.step(
    `MAP: Checking equality of empty keys list in hash-map`,
    () => {
      // true
      assertEquals(
        rep(`(= () (keys hm1))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Getting keys from a hash-map with a key-value pair`,
    () => {
      // ("a")
      assertEquals(
        rep(`(keys hm2)`, sharedEnv),
        printString(new ListNode([new StringNode('a')]), true),
      );
    },
  );

  await t.step(`MAP: Getting keys from a hash-map with a numeric key`, () => {
    // ("1")
    assertEquals(
      rep(`(keys {"1" 1})`, sharedEnv),
      printString(new ListNode([new StringNode('1')]), true),
    );
  });

  await t.step(`MAP: Getting values from an empty hash-map`, () => {
    // ()
    assertEquals(
      rep(`(vals hm1)`, sharedEnv),
      printString(new ListNode([]), true),
    );
  });
  await t.step(
    `MAP: Checking equality of empty values list in hash-map`,
    () => {
      // true
      assertEquals(
        rep(`(= () (vals hm1))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(`MAP: desc`, () => {
    // (1)
    assertEquals(
      rep(`(vals hm2)`, sharedEnv),
      printString(new ListNode([new NumberNode(1)]), true),
    );
  });

  await t.step(`MAP: counts keys in a hash-map`, () => {
    // 3
    assertEquals(
      rep(`(count (keys (assoc hm2 "b" 2 "c" 3)))`, sharedEnv),
      printString(new NumberNode(3), true),
    );
  });
});

Deno.test(`MAP: Testing keywords as hash-map keys`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`MAP: Retrieving value associated with a keyword key`, () => {
    // 123
    assertEquals(
      rep(`(get {abc: 123} abc:)`, sharedEnv),
      printString(new NumberNode(123), true),
    );
  });

  await t.step(
    `MAP: Checking if a keyword key is present in the hash-map`,
    () => {
      // true
      assertEquals(
        rep(`(contains? {abc: 123} abc:)`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking if a keyword key not present in the hash-map`,
    () => {
      // false
      assertEquals(
        rep(`(contains? {abcd: 123} abc:)`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(
    `MAP: Associating a new key-value pair in an empty hash-map`,
    () => {
      // {bcd: 234}
      assertEquals(
        rep(`(assoc {} bcd: 234)`, sharedEnv),
        printString(
          new MapNode(
            new Map([[
              'bcd:',
              new NumberNode(234),
            ]]),
          ),
          true,
        ),
      );
    },
  );

  await t.step(
    `MAP: Checking if an element in hash-map keys is a keyword`,
    () => {
      // true
      assertEquals(
        rep(`(keyword? (nth (keys {abc: 123 def: 456}) 0))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking if an element in hash-map values is a keyword`,
    () => {
      // true
      assertEquals(
        rep(`(keyword? (nth (vals {"a" abc: "b" def:}) 0))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );
});

Deno.test(`MAP: Testing whether assoc updates properly`, async (t) => {
  const sharedEnv = initEnv();
  rep(`(def! hm4 (assoc {a: 1 b: 2} a: 3 c: 1))`, sharedEnv);

  await t.step(`MAP: Verifying updated value for key a:`, () => {
    // 3
    assertEquals(
      rep(`(get hm4 a:)`, sharedEnv),
      printString(new NumberNode(3), true),
    );
  });

  await t.step(`MAP: Verifying unchanged value for key b:`, () => {
    // 2
    assertEquals(
      rep(`(get hm4 b:)`, sharedEnv),
      printString(new NumberNode(2), true),
    );
  });

  await t.step(`MAP: Verifying newly added value for key c:`, () => {
    // 1
    assertEquals(
      rep(`(get hm4 c:)`, sharedEnv),
      printString(new NumberNode(1), true),
    );
  });
});

Deno.test(`MAP: Testing nil as hash-map values`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`MAP: Checking if nil value is present in hash-map`, () => {
    // true
    assertEquals(
      rep(`(contains? {abc: nil} abc:)`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });

  await t.step(`MAP: Associating nil value with a new key`, () => {
    // {bcd: nil}
    assertEquals(
      rep(`(assoc {} bcd: nil)`, sharedEnv),
      printString(
        new MapNode(new Map([['bcd:', new NilNode()]])),
        true,
      ),
    );
  });
});

Deno.test(`MAP: Additional str and pr-str tests`, async (t) => {
  const sharedEnv = initEnv();

  await t.step(`MAP: Concatenating string with hash-map using str`, () => {
    // "A{abc: val}Z"

    assertEquals(
      rep(`(str "A" {abc: "val"} "Z")`, sharedEnv),
      printString(new StringNode('A{abc: val}Z'), true),
    );
  });

  await t.step(`MAP: Concatenating various types with str`, () => {
    // "true.false.nil.keyw:.symb"
    assertEquals(
      rep(`(str true "." false "." nil "." keyw: "." 'symb)`, sharedEnv),
      printString(new StringNode('true.false.nil.keyw:.symb'), true),
    );
  });

  await t.step(`MAP: Printing hash-map with pr-str`, () => {
    // "\"A\" {abc: \"val\"} \"Z\""
    assertEquals(
      rep(`(pr-str "A" {abc: "val"} "Z")`, sharedEnv),
      printString(new StringNode('"A" {abc: "val"} "Z"'), true),
    );
  });

  await t.step(`MAP: Printing various types with pr-str`, () => {
    // "true \".\" false \".\" nil \".\" keyw: \".\" symb"
    assertEquals(
      rep(
        `(pr-str true "." false "." nil "." keyw: "." 'symb)`,
        sharedEnv,
      ),
      printString(
        new StringNode('true "." false "." nil "." keyw: "." symb'),
        true,
      ),
    );
  });

  await t.step(
    `MAP: Checking if str output for hash-map matches expected formats`,
    () => {
      // true
      rep(`(def! s (str {abc: "val1" def: "val2"}))`, sharedEnv);
      assertEquals(
        rep(
          `(cond (= s "{abc: val1 def: val2}") true (= s "{def: val2 abc: val1}") true)`,
          sharedEnv,
        ),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking if pr-str output for hash-map matches expected formats`,
    () => {
      // true
      rep(`(def! p (pr-str {abc: "val1" def: "val2"}))`, sharedEnv);

      assertEquals(
        rep(
          `(cond (= p "{abc: \\"val1\\" def: \\"val2\\"}") true (= p "{def: \\"val2\\" abc: \\"val1\\"}") true) `,
          sharedEnv,
        ),
        printString(new BooleanNode(true), true),
      );
    },
  );
});

Deno.test(`MAP: Testing dissoc`, async (t) => {
  const sharedEnv = initEnv();

  rep(`(def! hm1 (hash-map))`, sharedEnv);
  rep(`(def! hm2 (assoc hm1 "a" 1))`, sharedEnv);
  rep(`(def! hm3 (assoc hm2 "b" 2))`, sharedEnv);

  await t.step(`MAP: Counting keys in hash-map after dissoc`, () => {
    // 2
    assertEquals(
      rep(`(count (keys hm3))`, sharedEnv),
      printString(new NumberNode(2), true),
    );
  });

  await t.step(`MAP: Counting values in hash-map after dissoc`, () => {
    // 2
    assertEquals(
      rep(`(count (vals hm3))`, sharedEnv),
      printString(new NumberNode(2), true),
    );
  });

  await t.step(`MAP: Dissociating a single key`, () => {
    // {"b" 2}
    assertEquals(
      rep(`(dissoc hm3 "a")`, sharedEnv),
      printString(
        new MapNode(new Map([['"b"', new NumberNode(2)]])),
        true,
      ),
    );
  });

  await t.step(`MAP: Dissociating multiple keys`, () => {
    // {}
    assertEquals(
      rep(`(dissoc hm3 "a" "b")`, sharedEnv),
      printString(new MapNode(new Map()), true),
    );
  });

  await t.step(`MAP: Dissociating non-existing keys`, () => {
    // {}
    assertEquals(
      rep(`(dissoc hm3 "a" "b" "c")`, sharedEnv),
      printString(new MapNode(new Map()), true),
    );
  });

  await t.step(
    `MAP: Verifying keys count after multiple dissoc operations`,
    () => {
      // 2
      assertEquals(
        rep(`(count (keys hm3))`, sharedEnv),
        printString(new NumberNode(2), true),
      );
    },
  );

  await t.step(
    `MAP: Dissociating a key from a hash-map with nil value`,
    () => {
      assertEquals(
        rep(`(dissoc {cde: 345 fgh: 456} cde:)`, sharedEnv),
        printString(
          new MapNode(
            new Map([[
              'fgh:',
              new NumberNode(456),
            ]]),
          ),
          true,
        ),
      );
    },
  );

  await t.step(`MAP: Dissociating a key with nil value`, () => {
    assertEquals(
      rep(`(dissoc {cde: nil fgh: 456} cde:)`, sharedEnv),
      printString(
        new MapNode(new Map([['fgh:', new NumberNode(456)]])),
        true,
      ),
    );
  });
});

Deno.test(`MAP: Testing equality of hash-maps`, async (t) => {
  const sharedEnv = initEnv();

  rep(`(def! hm1 (hash-map))`, sharedEnv);
  rep(`(def! hm2 (assoc hm1 "a" 1))`, sharedEnv);

  await t.step(`MAP: Checking equality of two empty hash-maps`, () => {
    // true
    assertEquals(
      rep(`(= {} {})`, sharedEnv),
      printString(new BooleanNode(true), true),
    );
  });

  await t.step(
    `MAP: Checking equality of empty hash-map and hash-map function`,
    () => {
      // true
      assertEquals(
        rep(`(= {} (hash-map))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking equality of two hash-maps with the same key-value pairs in different orders`,
    () => {
      // true
      assertEquals(
        rep(`(= {a: 11 b: 22} (hash-map b: 22 a: 11))`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking equality of two hash-maps with nested vectors as values`,
    () => {
      // true
      assertEquals(
        rep(
          `(= {a: 11 b: [22 33]} (hash-map b: [22 33] a: 11))`,
          sharedEnv,
        ),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking equality of two hash-maps with nested hash-maps as values`,
    () => {
      // true
      assertEquals(
        rep(
          `(= {a: 11 b: {c: 33}} (hash-map b: {c: 33} a: 11))`,
          sharedEnv,
        ),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking inequality of two hash-maps with different values for the same keys`,
    () => {
      // false
      assertEquals(
        rep(`(= {a: 11 b: 22} (hash-map b: 23 a: 11))`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(
    `MAP: Checking inequality of two hash-maps where one is missing a key`,
    () => {
      // false
      assertEquals(
        rep(`(= {a: 11 b: 22} (hash-map a: 11))`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(
    `MAP: Checking equality of hash-maps with vectors and lists as values`,
    () => {
      // true
      assertEquals(
        rep(`(= {a: [11 22]} {a: (list 11 22)})`, sharedEnv),
        printString(new BooleanNode(true), true),
      );
    },
  );

  await t.step(
    `MAP: Checking inequality of a hash-map and a list with same elements`,
    () => {
      // false
      assertEquals(
        rep(`(= {a: 11 b: 22} (list a: 11 b: 22))`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(
    `MAP: Checking inequality of an empty hash-map and an empty vector`,
    () => {
      // false
      assertEquals(
        rep(`(= {} [])`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(
    `MAP: Checking inequality of an empty vector and an empty hash-map`,
    () => {
      // false
      assertEquals(
        rep(`(= [] {})`, sharedEnv),
        printString(new BooleanNode(false), true),
      );
    },
  );

  await t.step(`MAP: Retrieving a keyword from a string`, () => {
    // abc:
    assertEquals(
      rep(`(keyword abc:)`, sharedEnv),
      printString(new KeywordNode('abc:'), true),
    );
  });

  await t.step(
    `MAP: Checking if the first key in a hash-map is a keyword`,
    () => {
      // false
      assertEquals(
        rep(
          `(keyword? (first (keys {"abc:" 123 "def:" 456})))`,
          sharedEnv,
        ),
        printString(new BooleanNode(false), true),
      );
    },
  );
});

Deno.test(`MAP: Testing that hashmaps don't alter function ast`, () => {
  const sharedEnv = initEnv();
  rep(`(def! bar (fn* [a] {foo: (get a foo:)}))`, sharedEnv);
  rep(`(bar {foo: (fn* [x] x)})`, sharedEnv);
  rep(`(bar {foo: 3})`, sharedEnv);

  // Shouldn't give an error
});
