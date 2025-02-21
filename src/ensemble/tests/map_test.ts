import { initEnv, rep } from "../lib.ts";
import { printString } from "../printer.ts";
import {
	BooleanNode,
	KeywordNode,
	ListNode,
	MapNode,
	NilNode,
	NumberNode,
	StringNode,
} from "../types.ts";
import runner from "./test_runner.ts";

runner.test("MAP: Testing MapNode", () => {
	runner.test("MAP: Creating a MapNode with a Map", () => {
		const map = new MapNode(
			new Map([
				["foo", new NumberNode(1)],
				['"bar"', new NumberNode(2)],
				["baz:", new NumberNode(3)],
			]),
		);
		runner.assert(
			map.value,
			new Map([
				["foo", new NumberNode(1)],
				['"bar"', new NumberNode(2)],
				["baz:", new NumberNode(3)],
			]),
		);
	});

	runner.test("MAP: Creating a MapNode an array", () => {
		const map = new MapNode(
			new Map([
				["foo", new NumberNode(1)],
				['"bar"', new NumberNode(2)],
				["baz:", new NumberNode(3)],
			]),
		);
		runner.assert(
			map.value,
			new Map([
				["foo", new NumberNode(1)],
				['"bar"', new NumberNode(2)],
				["baz:", new NumberNode(3)],
			]),
		);
	});

	runner.test("MAP: Strings can be used for keys", () => {
		const map = new MapNode(
			new Map([
				["foo", new NumberNode(1)],
				['"bar"', new NumberNode(2)],
				["baz:", new NumberNode(3)],
			]),
		);
		runner.assert(
			map.value,
			new Map([
				["foo", new NumberNode(1)],
				['"bar"', new NumberNode(2)],
				["baz:", new NumberNode(3)],
			]),
		);
	});

	runner.test(
		"MAP: I guess any type can be used for keys. That's a bug.",
		() => {
			const map = new MapNode(
				new Map([[43 as unknown as string, new NumberNode(1)]]),
			);
			runner.assert(
				map.value,
				new Map([[43 as unknown as string, new NumberNode(1)]]),
			);
		},
	);

	runner.test(
		"MAP: Any value type can be used with MapNode. It should be AstNode.",
		() => {
			const map = new MapNode(
				new Map([["foo", "barf" as unknown as StringNode]]),
			);

			runner.assert(
				map.value,
				new Map([["foo", "barf" as unknown as StringNode]]),
			);
		},
	);

	runner.test(
		"MAP: BUG TODO Invalid constructor arguments don't throw an error.",
		() => {
			const result = new MapNode(
				"bearclaw" as unknown as Map<string, StringNode>,
			);
			runner.assert(
				result.value,
				"bearclaw" as unknown as Map<string, StringNode>,
			);
		},
	);

	runner.test("MAP: MapNode can be constructed without arguments", () => {
		runner.assert(new MapNode(), new MapNode(new Map()));
	});
});

runner.test("MAP: Testing map function with vectors", () => {
	const sharedEnv = initEnv();
	runner.test("MAP: Applying a function to double elements of a vector", () => {
		runner.assert(
			rep("(map (fn* (a) (* 2 a)) [1 2 3])", sharedEnv),
			printString(
				new ListNode([new NumberNode(2), new NumberNode(4), new NumberNode(6)]),
				true,
			),
		);
	});

	runner.test(
		"MAP: Checking if arguments are lists within map function",
		() => {
			runner.assert(
				rep("(map (fn* [& args] (list? args)) [1 2])", sharedEnv),
				printString(
					new ListNode([new BooleanNode(true), new BooleanNode(true)]),
					true,
				),
			);
		},
	);
});

runner.test("MAP: Testing isMap", () => {
	const sharedEnv = initEnv();
	runner.test(
		"MAP: Checking if an empty hash-map is identified as a map",
		() => {
			runner.assert(
				rep("(map? {})", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);
	runner.test("MAP: Checking if an empty list is identified as a map", () => {
		runner.assert(
			rep("(map? '())", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
	runner.test("MAP: Checking if an empty vector is identified as a map", () => {
		runner.assert(
			rep("(map? [])", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
	runner.test("MAP: Checking if a symbol is identified as a map", () => {
		runner.assert(
			rep("(map? 'abc)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
	runner.test("MAP: Checking if a keyword is identified as a map", () => {
		runner.assert(
			rep("(map? abc:)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
});

runner.test("MAP: Testing hash-maps", () => {
	const sharedEnv = initEnv();
	runner.test(
		"MAP: Creating a hash-map with a string key and numeric value",
		() => {
			runner.assert(
				rep('(hash-map "a" 1)', sharedEnv),
				printString(new MapNode(new Map([['"a"', new NumberNode(1)]])), true),
			);
		},
	);

	runner.test("MAP: Literal hash-map creation", () => {
		runner.assert(
			rep('{"a" 1}', sharedEnv),
			printString(new MapNode(new Map([['"a"', new NumberNode(1)]])), true),
		);
	});

	runner.test("MAP: Associating a key-value pair in an empty hash-map", () => {
		runner.assert(
			rep('(assoc {} "a" 1)', sharedEnv),
			printString(new MapNode(new Map([['"a"', new NumberNode(1)]])), true),
		);
	});

	runner.test(
		"MAP: Getting a value from a nested association in a hash-map",
		() => {
			runner.assert(
				rep('(get (assoc (assoc {"a" 1 } "b" 2) "c" 3) "a")', sharedEnv),
				printString(new NumberNode(1), true),
			);
		},
	);

	runner.test("MAP: Defining an empty hash-map", () => {
		runner.assert(
			rep("(def! hm1 (hash-map))", sharedEnv),
			printString(new MapNode(), true),
		);
	});

	runner.test(
		"MAP: Checking if a defined hash-map is identified as a map",
		() => {
			runner.assert(
				rep("(map? hm1)", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test("MAP: Checking if a number is identified as a map", () => {
		runner.assert(
			rep("(map? 1)", sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});
	runner.test("MAP: Checking if a string is identified as a map", () => {
		runner.assert(
			rep('(map? "abc")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test("MAP: Getting a value from a nil hash-map", () => {
		runner.assert(
			rep('(get nil "a")', sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test("MAP: Getting a value from an empty hash-map", () => {
		runner.assert(
			rep('(get hm1 "a")', sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test("MAP: Checking if a key exists in an empty hash-map", () => {
		runner.assert(
			rep('(contains? hm1 "a")', sharedEnv),
			printString(new BooleanNode(false), true),
		);
	});

	runner.test(
		"MAP: Associating a key-value pair in a hash-map and defining it",
		() => {
			runner.assert(
				rep('(def! hm2 (assoc hm1 "a" 1))', sharedEnv),
				printString(new MapNode(new Map([['"a"', new NumberNode(1)]])), true),
			);
		},
	);

	runner.test("MAP: Getting a value from a hash-map after association", () => {
		runner.assert(
			rep('(get hm1 "a")', sharedEnv),
			printString(new NilNode(), true),
		);
	});

	runner.test(
		"MAP: Checking if a key exists in a hash-map after association",
		() => {
			runner.assert(
				rep('(contains? hm1 "a")', sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test(
		"MAP: Getting a value from a hash-map with a defined key-value pair",
		() => {
			runner.assert(
				rep('(get hm2 "a")', sharedEnv),
				printString(new NumberNode(1), true),
			);
		},
	);

	runner.test(
		"MAP: Checking if a key exists in a hash-map with a defined key-value pair",
		() => {
			runner.assert(
				rep('(contains? hm2 "a")', sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test("MAP: Getting keys from an empty hash-map", () => {
		runner.assert(
			rep("(keys hm1)", sharedEnv),
			printString(new ListNode([]), true),
		);
	});
	runner.test("MAP: Checking equality of empty keys list in hash-map", () => {
		runner.assert(
			rep("(= () (keys hm1))", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("MAP: Getting keys from a hash-map with a key-value pair", () => {
		runner.assert(
			rep("(keys hm2)", sharedEnv),
			printString(new ListNode([new StringNode("a")]), true),
		);
	});

	runner.test("MAP: Getting keys from a hash-map with a numeric key", () => {
		runner.assert(
			rep('(keys {"1" 1})', sharedEnv),
			printString(new ListNode([new StringNode("1")]), true),
		);
	});

	runner.test("MAP: Getting values from an empty hash-map", () => {
		runner.assert(
			rep("(vals hm1)", sharedEnv),
			printString(new ListNode([]), true),
		);
	});
	runner.test("MAP: Checking equality of empty values list in hash-map", () => {
		runner.assert(
			rep("(= () (vals hm1))", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("MAP: desc", () => {
		runner.assert(
			rep("(vals hm2)", sharedEnv),
			printString(new ListNode([new NumberNode(1)]), true),
		);
	});

	runner.test("MAP: counts keys in a hash-map", () => {
		runner.assert(
			rep('(count (keys (assoc hm2 "b" 2 "c" 3)))', sharedEnv),
			printString(new NumberNode(3), true),
		);
	});
});

runner.test("MAP: Testing keywords as hash-map keys", () => {
	const sharedEnv = initEnv();

	runner.test("MAP: Retrieving value associated with a keyword key", () => {
		runner.assert(
			rep("(get {abc: 123} abc:)", sharedEnv),
			printString(new NumberNode(123), true),
		);
	});

	runner.test(
		"MAP: Checking if a keyword key is present in the hash-map",
		() => {
			runner.assert(
				rep("(contains? {abc: 123} abc:)", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking if a keyword key not present in the hash-map",
		() => {
			runner.assert(
				rep("(contains? {abcd: 123} abc:)", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test(
		"MAP: Associating a new key-value pair in an empty hash-map",
		() => {
			runner.assert(
				rep("(assoc {} bcd: 234)", sharedEnv),
				printString(
					new MapNode(new Map([["bcd:", new NumberNode(234)]])),
					true,
				),
			);
		},
	);

	runner.test(
		"MAP: Checking if an element in hash-map keys is a keyword",
		() => {
			runner.assert(
				rep("(keyword? (nth (keys {abc: 123 def: 456}) 0))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking if an element in hash-map values is a keyword",
		() => {
			runner.assert(
				rep('(keyword? (nth (vals {"a" abc: "b" def:}) 0))', sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);
});

runner.test("MAP: Testing whether assoc updates properly", () => {
	const sharedEnv = initEnv();
	rep("(def! hm4 (assoc {a: 1 b: 2} a: 3 c: 1))", sharedEnv);

	runner.test("MAP: Verifying updated value for key a:", () => {
		runner.assert(
			rep("(get hm4 a:)", sharedEnv),
			printString(new NumberNode(3), true),
		);
	});

	runner.test("MAP: Verifying unchanged value for key b:", () => {
		runner.assert(
			rep("(get hm4 b:)", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});

	runner.test("MAP: Verifying newly added value for key c:", () => {
		runner.assert(
			rep("(get hm4 c:)", sharedEnv),
			printString(new NumberNode(1), true),
		);
	});
});

runner.test("MAP: Testing nil as hash-map values", () => {
	const sharedEnv = initEnv();

	runner.test("MAP: Checking if nil value is present in hash-map", () => {
		runner.assert(
			rep("(contains? {abc: nil} abc:)", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test("MAP: Associating nil value with a new key", () => {
		runner.assert(
			rep("(assoc {} bcd: nil)", sharedEnv),
			printString(new MapNode(new Map([["bcd:", new NilNode()]])), true),
		);
	});
});

runner.test("MAP: Additional str and pr-str tests", () => {
	const sharedEnv = initEnv();

	runner.test("MAP: Concatenating string with hash-map using str", () => {
		runner.assert(
			rep('(str "A" {abc: "val"} "Z")', sharedEnv),
			printString(new StringNode("A{abc: val}Z"), true),
		);
	});

	runner.test("MAP: Concatenating various types with str", () => {
		runner.assert(
			rep(`(str true "." false "." nil "." keyw: "." 'symb)`, sharedEnv),
			printString(new StringNode("true.false.nil.keyw:.symb"), true),
		);
	});

	runner.test("MAP: Printing hash-map with pr-str", () => {
		runner.assert(
			rep('(pr-str "A" {abc: "val"} "Z")', sharedEnv),
			printString(new StringNode('"A" {abc: "val"} "Z"'), true),
		);
	});

	runner.test("MAP: Printing various types with pr-str", () => {
		runner.assert(
			rep(`(pr-str true "." false "." nil "." keyw: "." 'symb)`, sharedEnv),
			printString(
				new StringNode('true "." false "." nil "." keyw: "." symb'),
				true,
			),
		);
	});

	runner.test(
		"MAP: Checking if str output for hash-map matches expected formats",
		() => {
			rep('(def! s (str {abc: "val1" def: "val2"}))', sharedEnv);
			runner.assert(
				rep(
					'(cond (= s "{abc: val1 def: val2}") true (= s "{def: val2 abc: val1}") true)',
					sharedEnv,
				),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking if pr-str output for hash-map matches expected formats",
		() => {
			rep('(def! p (pr-str {abc: "val1" def: "val2"}))', sharedEnv);
			runner.assert(
				rep(
					'(cond (= p "{abc: \\"val1\\" def: \\"val2\\"}") true (= p "{def: \\"val2\\" abc: \\"val1\\"}") true) ',
					sharedEnv,
				),
				printString(new BooleanNode(true), true),
			);
		},
	);
});

runner.test("MAP: Testing dissoc", () => {
	const sharedEnv = initEnv();

	rep("(def! hm1 (hash-map))", sharedEnv);
	rep('(def! hm2 (assoc hm1 "a" 1))', sharedEnv);
	rep('(def! hm3 (assoc hm2 "b" 2))', sharedEnv);

	runner.test("MAP: Counting keys in hash-map after dissoc", () => {
		runner.assert(
			rep("(count (keys hm3))", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});

	runner.test("MAP: Counting values in hash-map after dissoc", () => {
		runner.assert(
			rep("(count (vals hm3))", sharedEnv),
			printString(new NumberNode(2), true),
		);
	});

	runner.test("MAP: Dissociating a single key", () => {
		runner.assert(
			rep('(dissoc hm3 "a")', sharedEnv),
			printString(new MapNode(new Map([['"b"', new NumberNode(2)]])), true),
		);
	});

	runner.test("MAP: Dissociating multiple keys", () => {
		runner.assert(
			rep('(dissoc hm3 "a" "b")', sharedEnv),
			printString(new MapNode(new Map()), true),
		);
	});

	runner.test("MAP: Dissociating non-existing keys", () => {
		runner.assert(
			rep('(dissoc hm3 "a" "b" "c")', sharedEnv),
			printString(new MapNode(new Map()), true),
		);
	});

	runner.test(
		"MAP: Verifying keys count after multiple dissoc operations",
		() => {
			runner.assert(
				rep("(count (keys hm3))", sharedEnv),
				printString(new NumberNode(2), true),
			);
		},
	);

	runner.test("MAP: Dissociating a key from a hash-map with nil value", () => {
		runner.assert(
			rep("(dissoc {cde: 345 fgh: 456} cde:)", sharedEnv),
			printString(new MapNode(new Map([["fgh:", new NumberNode(456)]])), true),
		);
	});

	runner.test("MAP: Dissociating a key with nil value", () => {
		runner.assert(
			rep("(dissoc {cde: nil fgh: 456} cde:)", sharedEnv),
			printString(new MapNode(new Map([["fgh:", new NumberNode(456)]])), true),
		);
	});
});

runner.test("MAP: Testing equality of hash-maps", () => {
	const sharedEnv = initEnv();

	rep("(def! hm1 (hash-map))", sharedEnv);
	rep('(def! hm2 (assoc hm1 "a" 1))', sharedEnv);

	runner.test("MAP: Checking equality of two empty hash-maps", () => {
		runner.assert(
			rep("(= {} {})", sharedEnv),
			printString(new BooleanNode(true), true),
		);
	});

	runner.test(
		"MAP: Checking equality of empty hash-map and hash-map function",
		() => {
			runner.assert(
				rep("(= {} (hash-map))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking equality of two hash-maps with the same key-value pairs in different orders",
		() => {
			runner.assert(
				rep("(= {a: 11 b: 22} (hash-map b: 22 a: 11))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking equality of two hash-maps with nested vectors as values",
		() => {
			runner.assert(
				rep("(= {a: 11 b: [22 33]} (hash-map b: [22 33] a: 11))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking equality of two hash-maps with nested hash-maps as values",
		() => {
			runner.assert(
				rep("(= {a: 11 b: {c: 33}} (hash-map b: {c: 33} a: 11))", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking inequality of two hash-maps with different values for the same keys",
		() => {
			runner.assert(
				rep("(= {a: 11 b: 22} (hash-map b: 23 a: 11))", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test(
		"MAP: Checking inequality of two hash-maps where one is missing a key",
		() => {
			runner.assert(
				rep("(= {a: 11 b: 22} (hash-map a: 11))", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test(
		"MAP: Checking equality of hash-maps with vectors and lists as values",
		() => {
			runner.assert(
				rep("(= {a: [11 22]} {a: (list 11 22)})", sharedEnv),
				printString(new BooleanNode(true), true),
			);
		},
	);

	runner.test(
		"MAP: Checking inequality of a hash-map and a list with same elements",
		() => {
			runner.assert(
				rep("(= {a: 11 b: 22} (list a: 11 b: 22))", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test(
		"MAP: Checking inequality of an empty hash-map and an empty vector",
		() => {
			runner.assert(
				rep("(= {} [])", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test(
		"MAP: Checking inequality of an empty vector and an empty hash-map",
		() => {
			runner.assert(
				rep("(= [] {})", sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);

	runner.test("MAP: Retrieving a keyword from a string", () => {
		runner.assert(
			rep("(keyword abc:)", sharedEnv),
			printString(new KeywordNode("abc:"), true),
		);
	});

	runner.test(
		"MAP: Checking if the first key in a hash-map is a keyword",
		() => {
			runner.assert(
				rep('(keyword? (first (keys {"abc:" 123 "def:" 456})))', sharedEnv),
				printString(new BooleanNode(false), true),
			);
		},
	);
});

runner.test("MAP: Testing that hashmaps don't alter function ast", () => {
	const sharedEnv = initEnv();
	rep("(def! bar (fn* [a] {foo: (get a foo:)}))", sharedEnv);
	rep("(bar {foo: (fn* [x] x)})", sharedEnv);
	rep("(bar {foo: 3})", sharedEnv);

	// Shouldn't give an error
});

runner.report();
