Update these tests to use only the `test` and `assert` methods from `test_runner.ts`. `test_runner.ts` exports the following code:

```ts
export default {
	passed: 0,
	failed: 0,
	skipped: 0,
	test(name: string, fn: () => void) {
		try {
			fn();
			this.passed++;
			console.log(`PASS ${name}`);
		} catch (error) {
			this.failed++;
			console.log(`FAIL ${name}`);
			console.log(error);
		}
	},
	assert(a: unknown, b: unknown) {
		if (a === b) return;
		if (!isDeepEqual(a, b)) throw new Error(`Expected ${a} to equal ${b}`);
	},
	skip(name: string, fn: () => void) {
		this.skipped++;
		console.log(`SKIP ${name}`);
	},
	report() {
		console.log(JSON.stringify(this, null, 2)); // Functions won't be stringified
	},
};
```

Here is an example of converting a file to use the new functions.

Given the pre-existing import from test_runner.ts, such as:

```ts
import {
	assertEquals,
	assertExists,
	assertInstanceOf,
	assertThrows,
	test,
} from "./tests/test_runner.ts";
```

Update the import to be 

```ts
import runner from "./tests/test_runner.ts";
```

Update tests like this:

```ts
test("quasiquote(): should quote a symbol", () => {
	const input = createSymbolNode("a");
	const expected = createListNode([createSymbolNode("quote"), input]);
	assertEquals(quasiQuote(input), expected);
});
```

To reference the `runner` import, and to use `assert`:

```ts
runner.test("quasiquote(): should quote a symbol", () => {
	const input = createSymbolNode("a");
	const expected = createListNode([createSymbolNode("quote"), input]);
	runner.assert(quasiQuote(input), expected);
});
```

Update `assertThrows` from this:

```ts
test("evaluateDefMacro(): should throw error on invalid key", () => {
	const env = new Env();
	const ast = createListNode([
		createSymbolNode("defmacro!"),
		createNumberNode(42),
		createFunctionNode(() => createNilNode()),
	]);

	assertThrows(
		() => evaluateDefMacro(ast, env),
		Error,
		"Invalid dictionary key",
	);
});
```

to this:

```ts
test("evaluateDefMacro(): should throw error on invalid key", () => {
	const env = new Env();
	const ast = createListNode([
		createSymbolNode("defmacro!"),
		createNumberNode(42),
		createFunctionNode(() => createNilNode()),
	]);

  let threw = false;
  try {
    evaluateDefMacro(ast, env);
  } catch (e) {
    threw = true;
  }

	assert(threw, true);
});
```

`assertExists(foo)` becomes:

```ts
assert(foo !== undefined, true);
```

And spys/stubs can be refactored this way:

```ts
runner.test("printUnescapedStringToScreen(): logs the unescaped string", () => {
	const oldLog = console.log;
	let calls = 0;
	let args: string[] = [];
	console.log = (...x) => {
		args = x;
		calls++;
	};

	try {
		runner.assert(
			core.printUnescapedStringToScreen(
				types.createStringNode("abc\ndef\nghi"),
			),
			types.createNilNode(),
		);
	} finally {
		console.log = oldLog;
	}

	runner.assert(args, ['"abc\\ndef\\nghi"']);
	runner.assert(calls, 1);
});
```

## Handling Quotes

Double quotes should be used for everything unless the string requires single quotes or backticks. Here are some examples:

- CORRECT: "asdf"
- CORRECT: 'asdf'
- CORRECT: `${foo} asdf`
- CORRECT: `'foo' "asdf"`
- INCORRECT: `asdf`

Do not use backticks for a string that does not have both double and single quotes OR a template tag.

## Code to Convert

Here are the tests to convert:

```ts

```
