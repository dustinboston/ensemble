import {
	assert,
	assertEquals,
	assertInstanceOf,
	assertSpyCall,
	assertSpyCalls,
	assertStrictEquals,
	assertThrows,
	returnsNext,
	spy,
	stub,
} from './tests/deps.ts';
import {
	add,
	apply,
	applyToSequence,
	assoc,
	atom,
	concat,
	conj,
	cons,
	contains,
	count,
	deref,
	dissoc,
	divide,
	empty,
	eq,
	firstNodeInList,
	get,
	gt,
	gte,
	hashMap,
	isAtom,
	isFalse,
	isFn,
	isKeyword,
	isListNode,
	isMacro,
	isMap,
	isNil,
	isNumber,
	isSequentialNode,
	isString,
	isSymbolNode,
	isTrue,
	isVector,
	join,
	keys,
	keyword,
	list,
	lt,
	lte,
	meta,
	multiply,
	nth,
	printEscapedString,
	printEscapedStringToScreen,
	printUnescapedString,
	printUnescapedStringToScreen,
	readir,
	readln,
	readString,
	reset,
	rest,
	seq,
	slurp,
	spit,
	subtract,
	swap,
	symbol,
	throwError,
	timeMs,
	trim,
	vals,
	vec,
	vector,
	withMeta,
} from './core.ts';
import {
	AstNode,
	AtomNode,
	BooleanNode,
	FunctionNode,
	KeywordNode,
	ListNode,
	MapNode,
	NilNode,
	NumberNode,
	StringNode,
	SymbolNode,
	VectorNode,
} from './types.ts';

Deno.test('eq(): returns true for equal nodes', () => {
	assertEquals(
		eq(new NumberNode(1), new NumberNode(1)),
		new BooleanNode(true),
	);
});

Deno.test('eq(): returns false for unequal nodes', () => {
	assertEquals(
		eq(new NumberNode(1), new NumberNode(2)),
		new BooleanNode(false),
	);
});

Deno.test('printEscapedString(): returns escaped string', () => {
	assertEquals(
		printEscapedString(new StringNode('abc\ndef\nghi')),
		new StringNode('"abc\\ndef\\nghi"'),
	);
});

Deno.test('printUnescapedString(): returns unescaped string', () => {
	assertEquals(
		printUnescapedString(new StringNode('abc\ndef\nghi')),
		new StringNode('abc\ndef\nghi'),
	);
});

Deno.test('printEscapedStringToScreen(): logs the escaped string', () => {
	const logSpy = spy(console, 'log');

	try {
		assertEquals(
			printEscapedStringToScreen(new StringNode('abc\ndef\nghi')),
			new NilNode(),
		);
	} finally {
		logSpy.restore();
	}

	assertSpyCall(logSpy, 0, { args: ['"abc\\ndef\\nghi"'] });
	assertSpyCalls(logSpy, 1);
});

Deno.test('printEscapedStringToScreen(): logs the unescaped string', () => {
	const logSpy = spy(console, 'log');

	try {
		assertEquals(
			printUnescapedStringToScreen(new StringNode('abc\ndef\nghi')),
			new NilNode(),
		);
	} finally {
		logSpy.restore();
	}

	assertSpyCall(logSpy, 0, { args: ['abc\ndef\nghi'] });
	assertSpyCalls(logSpy, 1);
});

Deno.test('readString(): should read string and return AST', () => {
	const input = new StringNode('(+ 2 3)');
	const expected = new ListNode([
		new SymbolNode('+'),
		new NumberNode(2),
		new NumberNode(3),
	]);
	assertEquals(readString(input), expected);
});

Deno.test('readString(): throws when there are zero arguments', () => {
	assertThrows(() => readString());
});

Deno.test('readString(): throws when there is more than one argument', () => {
	assertThrows(() =>
		readString(
			new StringNode('foo'),
			new StringNode('bar'),
		)
	);
});

Deno.test('readString(): should throw when argument is not a string', () => {
	assertThrows(() => readString(new NumberNode(42)));
});

Deno.test('readln(): should read line and return string', () => {
	const input = new StringNode('%');
	const expected = new StringNode('"foobar"');
	const promptStub = stub(globalThis, 'prompt', returnsNext(['"foobar"']));

	try {
		assertEquals(readln(input), expected);
	} finally {
		promptStub.restore();
	}

	assertSpyCall(promptStub, 0, {
		args: [input.value],
		returned: expected.value,
	});

	assertSpyCalls(promptStub, 1);
});

Deno.test('readln(): should return nil/undef when readline returns null', () => {
	const input = new StringNode('%');
	const expected = new NilNode();
	const promptStub = stub(globalThis, 'prompt', returnsNext([null]));

	try {
		assertEquals(readln(input), expected);
	} finally {
		promptStub.restore();
	}

	assertSpyCall(promptStub, 0, {
		args: [input.value],
		returned: null,
	});

	assertSpyCalls(promptStub, 1);
});

Deno.test('readln(): should throw when argument count is less than one', () => {
	assertThrows(() => readln());
});

Deno.test('readln(): should throw when argument count is more than one', () => {
	assertThrows(() =>
		readln(
			new StringNode('foo'),
			new StringNode('bar'),
		)
	);
});

Deno.test('readln(): should throw when argument is not a string', () => {
	assertThrows(() => readln(new NumberNode(42)));
});

Deno.test('readir(): should list directory contents', () => {
	const temporaryDir = Deno.makeTempDirSync();
	Deno.mkdirSync(`${temporaryDir}/subdir`);
	Deno.writeTextFileSync(`${temporaryDir}/file.txt`, 'hello');

	const input = new StringNode(temporaryDir);
	const expected = new VectorNode([
		new MapNode(
			// Make slug and ext null or empty for dirs
			new Map<string, AstNode>([
				[':directory', new BooleanNode(false)],
				[':ext', new StringNode('txt')],
				[':file', new BooleanNode(true)],
				[':name', new StringNode('file.txt')],
				[':slug', new StringNode('file')],
				[':symlink', new BooleanNode(false)],
			]),
		),
		new MapNode(
			// Make slug and ext null or empty for dirs
			new Map<string, AstNode>([
				[':directory', new BooleanNode(true)],
				[':ext', new StringNode('subdir')],
				[':file', new BooleanNode(false)],
				[':name', new StringNode('subdir')],
				[':slug', new StringNode('subdi')],
				[':symlink', new BooleanNode(false)],
			]),
		),
	]);

	const result = readir(input);
	assertEquals(result, expected);
});

Deno.test('readir(): should throw error if argument is not a string', () => {
	assertThrows(
		() => readir(new NumberNode(123)),
		Error,
		'Invalid',
	);
});

Deno.test('slurp(): should read a file', () => {
	const temporaryDir = Deno.makeTempDirSync();
	const filePath = `${temporaryDir}/file.txt`;
	Deno.writeTextFileSync(filePath, 'content');

	const result = slurp(new StringNode(filePath));
	assertEquals(result, new StringNode('content'));
});

Deno.test('slurp(): should throw error if file does not exist', () => {
	assertThrows(
		() => slurp(new StringNode('mocks/nonexistent')),
		Error,
		'No such file or directory',
	);
});

Deno.test('spit(): should write to a file', () => {
	const temporaryDir = Deno.makeTempDirSync();
	const filePath = `${temporaryDir}/file.txt`;
	const content = 'newContent';

	spit(
		new StringNode(filePath),
		new StringNode(content),
	);

	const result = Deno.readTextFileSync(filePath);
	assertEquals(result, content);
});

Deno.test('spit(): should throw error if path is not a string', () => {
	assertThrows(
		() =>
			spit(
				new NumberNode(123),
				new StringNode('content'),
			),
		Error,
		'Invalid',
	);
});

Deno.test('trim(): should trim whitespace from the start and end of a string', () => {
	assertEquals(
		trim(new StringNode('  hello  ')),
		new StringNode('hello'),
	);
});

Deno.test('trim(): should throw an error when no arguments are provided', () => {
	assertThrows(() => {
		trim();
	});
});

Deno.test('trim(): should throw an error when more than one argument is provided', () => {
	assertThrows(() => {
		trim(
			new StringNode('hello'),
			new StringNode('world'),
		);
	});
});

Deno.test('trim(): should throw an error when the argument is not a string', () => {
	assertThrows(() => {
		trim(new NumberNode(123));
	});
});

// Test for '<'
Deno.test("lt(): should return false if 'a' is greater than 'b'", () => {
	const result1 = lt(
		new NumberNode(2),
		new NumberNode(1),
	);
	assertEquals(result1, new BooleanNode(false));
});

Deno.test("lt(): should return false if 'a' is equal to 'b'", () => {
	const result1 = lt(
		new NumberNode(1),
		new NumberNode(1),
	);
	assertEquals(result1, new BooleanNode(false));
});

Deno.test("lt(): should return true if 'a' is less than 'b'", () => {
	const result2 = lt(
		new NumberNode(1),
		new NumberNode(2),
	);
	assertEquals(result2, new BooleanNode(true));
});

// Test for '<='
Deno.test("lte(): should return false if 'a' is greater than 'b'", () => {
	const result1 = lte(
		new NumberNode(2),
		new NumberNode(1),
	);
	assertEquals(result1, new BooleanNode(false));
});

Deno.test("lte(): should return true if 'a' is equal to 'b'", () => {
	const result2 = lte(
		new NumberNode(1),
		new NumberNode(1),
	);
	assertEquals(result2, new BooleanNode(true));
});

Deno.test("lte(): should return true if 'a' is less than 'b'", () => {
	const result2 = lte(
		new NumberNode(1),
		new NumberNode(2),
	);
	assertEquals(result2, new BooleanNode(true));
});

// Test for '>'
Deno.test("gt(): should return true if 'a' is greater than 'b'", () => {
	const result1 = gt(
		new NumberNode(2),
		new NumberNode(1),
	);
	assertEquals(result1, new BooleanNode(true));
});

Deno.test("gt(): should return false if 'a' is less than 'b'", () => {
	const result2 = gt(
		new NumberNode(1),
		new NumberNode(2),
	);
	assertEquals(result2, new BooleanNode(false));
});

Deno.test("gt(): should return false if 'a' is equal to 'b'", () => {
	const result2 = gt(
		new NumberNode(1),
		new NumberNode(1),
	);
	assertEquals(result2, new BooleanNode(false));
});

// Test for '>='
Deno.test("gte(): should return true if 'a' is greater than 'b'", () => {
	const result1 = gte(
		new NumberNode(2),
		new NumberNode(1),
	);
	assertEquals(result1, new BooleanNode(true));
});

Deno.test("gte(): should return true if 'a' is equal to 'b'", () => {
	const result2 = gte(
		new NumberNode(1),
		new NumberNode(1),
	);
	assertEquals(result2, new BooleanNode(true));
});

// Test for '+'
Deno.test('add(): should sum two numbers', () => {
	const result = add(
		new NumberNode(2),
		new NumberNode(1),
	);
	assertEquals(result, new NumberNode(3));
});

// Test for '+' error case
Deno.test('add(): should throw an error if an argument is not a number', () => {
	assertThrows(() => {
		add(
			new StringNode('not a num'),
			new NumberNode(1),
		);
	});
});

// Test for '-'
Deno.test('subtract(): should find the difference between two numbers', () => {
	const result = subtract(
		new NumberNode(2),
		new NumberNode(1),
	);
	assertEquals(result, new NumberNode(1));
});

// Test for '-' error case
Deno.test('subtract(): should throw an error if an argument is not a number', () => {
	assertThrows(() => {
		subtract(
			new StringNode('not a num'),
			new NumberNode(1),
		);
	});
});

// Test for '*'
Deno.test('multiply(): should find the product of two numbers', () => {
	const result = multiply(
		new NumberNode(2),
		new NumberNode(3),
	);
	assertEquals(result, new NumberNode(6));
});

// Test for '*' error case
Deno.test('multiply(): should throw an error if an argument is not a number', () => {
	assertThrows(() => {
		multiply(
			new StringNode('not a num'),
			new NumberNode(1),
		);
	});
});

// Test for '/'
Deno.test('divide(): should find the quotient of two numbers', () => {
	const result = divide(
		new NumberNode(4),
		new NumberNode(2),
	);
	assertEquals(result, new NumberNode(2));
});

// Test for '/' error case
Deno.test('divide(): should throw an error if an argument is not a number', () => {
	assertThrows(() => {
		divide(
			new StringNode('not a num'),
			new NumberNode(1),
		);
	});
});

Deno.test('timeMs(): should return a unix timestamp', () => {
	const result = timeMs() as NumberNode;
	const currentTime = Date.now();

	// Ensure it's a number
	assertEquals(typeof result.value, 'number');

	// Ensure it's reasonably close to the current time
	assert(Math.abs(currentTime - result.value) < 1000);
});

Deno.test('list(): should return a list containing the given args', () => {
	const a = new NumberNode(1);
	const b = new NumberNode(2);
	const result = list(a, b);
	assertEquals(result instanceof ListNode, true);
	assertEquals(result.value, [a, b]);
});

// Test for 'isList'
Deno.test('isListNode(): should return true if the argument is a list', () => {
	const aList = new ListNode([new NumberNode(1)]);
	assertEquals(isListNode(aList).value, true);
});

Deno.test('isListNode(): should return false if the argument is not a list', () => {
	const notList = new NumberNode(1);
	assertEquals(isListNode(notList).value, false);
});

// Test for 'isList' failure due to incorrect argument count
Deno.test('isListNode(): should throw if given more than one argument', () => {
	assertThrows(() => isListNode(new NumberNode(1), new NumberNode(2)));
});

Deno.test('conj(): should throw with with less than 2 arguments', () => {
	assertThrows(
		() => conj(new ListNode([new NumberNode(1)])),
		Error,
		'Unexpected minimum number of arguments',
	);
});

Deno.test('conj(): should conjoin values in a list', () => {
	assertEquals(
		conj(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
			new NumberNode(4),
			new NumberNode(5),
		),
		new ListNode([
			new NumberNode(5),
			new NumberNode(4),
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
		]),
	);
});

Deno.test('conj(): should conjoin values in a vector', () => {
	assertEquals(
		conj(
			new VectorNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
			new NumberNode(4),
			new NumberNode(5),
		),
		new VectorNode([
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
			new NumberNode(4),
			new NumberNode(5),
		]),
	);
});

Deno.test('conj(): should throw without a List or Vector', () => {
	assertThrows(
		() => conj(new NumberNode(42), new NumberNode(1)),
		Error,
		'Invalid sequential type',
	);
});

Deno.test('concat(): with no arguments', () => {
	assertEquals(concat(), new ListNode([]));
});

Deno.test('concat(): with one list', () => {
	assertEquals(
		concat(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
			]),
		),
		new ListNode([
			new NumberNode(1),
			new NumberNode(2),
		]),
	);
});

Deno.test('concat(): with two lists', () => {
	assertEquals(
		concat(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
			]),
			new ListNode([
				new NumberNode(3),
				new NumberNode(4),
			]),
		),
		new ListNode([
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
			new NumberNode(4),
		]),
	);
});

Deno.test('concat(): with three lists', () => {
	assertEquals(
		concat(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
			]),
			new ListNode([
				new NumberNode(3),
				new NumberNode(4),
			]),
			new ListNode([
				new NumberNode(5),
				new NumberNode(6),
			]),
		),
		new ListNode([
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
			new NumberNode(4),
			new NumberNode(5),
			new NumberNode(6),
		]),
	);
});

Deno.test('concat(): with empty lists', () => {
	assertEquals(concat(new ListNode([]), new ListNode([])), new ListNode([]));
});

Deno.test('concat(): with non-Seq type should throw', () => {
	assertThrows(
		() => concat(new NumberNode(1)),
		Error,
		'Invalid sequential type',
	);
});

Deno.test('cons(): should construct a list by prepending the given value', () => {
	assertEquals(
		cons(
			new NumberNode(0),
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new ListNode([
			new NumberNode(0),
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
		]),
	);
});

Deno.test('cons(): should throw error with less than 2 arguments', () => {
	assertThrows(
		() => cons(new NumberNode(0)),
		Error,
		'Wanted 2 arguments but got 1',
	);
});

Deno.test('cons(): should throw error with more than 2 arguments', () => {
	assertThrows(
		() => cons(new NumberNode(0), new NumberNode(0), new NumberNode(0)),
		Error,
		'Wanted 2 arguments but got 3',
	);
});

Deno.test('cons(): should throw error if second argument is not a List', () => {
	const value = new NumberNode(0);
	const notList = new NumberNode(42);
	assertThrows(
		() => cons(value, notList),
		Error,
		'Invalid sequential type',
	);
});

// Test for 'vec' when input is a list
Deno.test('vec(): should convert a list into a vector', () => {
	assertEquals(
		vec(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new VectorNode([
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
		]),
	);
});

// Test for 'vec' when input is not a list
Deno.test('vec(): should return the original node if the argument is not a List', () => {
	const notList = new NumberNode(1);
	assertEquals(vec(notList), notList);
});

// Test for 'vec' when there are multiple arguments
Deno.test('vec(): should ignore additional arguments', () => {
	assertEquals(
		vec(new ListNode([new NumberNode(1)]), new NumberNode(2)),
		new VectorNode([new NumberNode(1)]),
	);
});

// Test for 'vec' when no arguments
Deno.test('vec(): should return undefined if no arguments are provided', () => {
	assertEquals(vec(), undefined);
});

Deno.test('nth(): should return the nth element of a list', () => {
	assertEquals(
		nth(
			new ListNode([
				new SymbolNode('a'),
				new SymbolNode('b'),
				new SymbolNode('c'),
			]),
			new NumberNode(1),
		),
		new SymbolNode('b'),
	);
});

Deno.test('nth(): should throw error when index is out of range', () => {
	assertThrows(
		() => nth(new ListNode([new SymbolNode('a')]), new NumberNode(1)),
		Error,
		'out of range',
	);
});

Deno.test('firstNodeInList(): should return the first element of a list', () => {
	assertEquals(
		firstNodeInList(
			new ListNode([
				new SymbolNode('a'),
				new SymbolNode('b'),
			]),
		),
		new SymbolNode('a'),
	);
});

Deno.test('firstNodeInList(): should return nil for empty list', () => {
	assertEquals(
		firstNodeInList(new ListNode([])),
		new NilNode(),
	);
});

Deno.test('rest(): should return a list without the first element', () => {
	assertEquals(
		rest(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new ListNode([
			new NumberNode(2),
			new NumberNode(3),
		]),
	);
});

Deno.test('rest(): should return empty list for single-element list', () => {
	assertEquals(
		rest(new ListNode([new NumberNode(1)])),
		new ListNode([]),
	);
});

Deno.test('empty(): should return true for an empty list', () => {
	assertEquals(empty(new ListNode([])), new BooleanNode(true));
});

Deno.test('empty(): should return false for a non-empty list', () => {
	assertEquals(
		empty(new ListNode([new NumberNode(2)])),
		new BooleanNode(false),
	);
});

Deno.test('count(): should return the length of a list', () => {
	assertEquals(
		count(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
			]),
		),
		new NumberNode(2),
	);
});

Deno.test('count(): should return 0 for an empty list', () => {
	assertEquals(count(new ListNode([])), new NumberNode(0));
});

Deno.test('should return 0 for a Nil value', () => {
	assertEquals(count(new NilNode()), new NumberNode(0));
});

Deno.test('atom(): should create an Atom from a given node', () => {
	assertEquals(
		atom(new NumberNode(42)),
		new AtomNode(new NumberNode(42)),
	);
});

Deno.test('atom(): should throw error when no arguments are provided', () => {
	assertThrows(
		() => atom(),
		Error,
		'Wanted 1 arguments but got 0',
	);
});

Deno.test('isAtom(): should return true if the node is an Atom', () => {
	assertEquals(
		isAtom(new AtomNode(new NumberNode(42))),
		new BooleanNode(true),
	);
});

Deno.test('isAtom(): should return false if the node is not an Atom', () => {
	assertEquals(isAtom(new NumberNode(42)), new BooleanNode(false));
});

Deno.test('deref(): should return the node contained in the Atom', () => {
	assertEquals(deref(new AtomNode(new NumberNode(42))), new NumberNode(42));
});

Deno.test('deref(): should throw error for non-Atom nodes', () => {
	assertThrows(() => deref(new NumberNode(42)), Error, 'Invalid');
});

Deno.test("reset(): should update the Atom's value and return the node", () => {
	const atom = new AtomNode(new NumberNode(42));
	assertEquals(atom.value, new NumberNode(42));
	assertEquals(reset(atom, new NumberNode(43)), new NumberNode(43));
	assertEquals(atom.value, new NumberNode(43));
});

Deno.test('reset(): should throw error for non-Atom first argument', () => {
	assertThrows(
		() => reset(new NumberNode(42), new NumberNode(43)),
		Error,
		'Invalid',
	);
});

Deno.test('should throw an error for insufficient arguments', () => {
	assertThrows(() => {
		swap(new AtomNode(new StringNode('a')));
	});
});

Deno.test('swap(): should throw an error if the first argument is not an Atom', () => {
	assertThrows(() => {
		swap(
			new StringNode('not an atom'),
			new FunctionNode((a) => a),
		);
	});
});

Deno.test('swap(): should throw an error if the second argument is not a Func', () => {
	assertThrows(() => {
		swap(
			new AtomNode(new StringNode('a')),
			new StringNode('not a function'),
		);
	});
});

Deno.test("swap(): should swap the Atoms' value with the result of the function", () => {
	assertEquals(
		swap(
			new AtomNode(new NumberNode(6)),
			new FunctionNode(
				(a) => new NumberNode((a as NumberNode).value * 2),
			),
		),
		new NumberNode(12),
	);
});

Deno.test('swap(): should handle additional parameters correctly', () => {
	assertEquals(
		swap(
			new AtomNode(new NumberNode(5)),
			new FunctionNode(
				(a, b) =>
					new NumberNode(
						(a as NumberNode).value +
							(b as NumberNode).value,
					),
			),
			new NumberNode(7),
		),
		new NumberNode(12),
	);
});

Deno.test('throwError(): should throw the value of an ast node', () => {
	assertThrows(() => throwError(new StringNode('foo')), 'foo');
});

Deno.test('throwError(): should throw an error when no arguments are provided', () => {
	assertThrows(
		() => throwError(),
		'Unexpected number of arguments',
	);
});

Deno.test('throwError(): should throw an error when given an invalid argument type', () => {
	assertThrows(
		() => throwError(new BooleanNode(false)),
		'invalid argument',
	);
});

Deno.test('apply(): should call a function with list arguments', () => {
	assertEquals(
		apply(
			new FunctionNode(
				(a, b) =>
					new NumberNode(
						(a as NumberNode).value +
							(b as NumberNode).value,
					),
			),
			new ListNode([
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new NumberNode(5),
	);
});

Deno.test('apply(): should concatenate other arguments with list', () => {
	assertEquals(
		apply(
			new FunctionNode(
				(a, b, c) =>
					new NumberNode(
						(a as NumberNode).value +
							(b as NumberNode).value +
							(c as NumberNode).value,
					),
			),
			new NumberNode(3),
			new ListNode([
				new NumberNode(2),
				new NumberNode(1),
			]),
		),
		new NumberNode(6),
	);
});

Deno.test('apply(): should throw error for non-Seq last argument', () => {
	assertThrows(
		() =>
			apply(
				new FunctionNode(
					(a, b) =>
						new NumberNode(
							(a as NumberNode).value +
								(b as NumberNode).value,
						),
				),
				new NumberNode(3),
			),
		Error,
		'Invalid sequential type',
	);
});

Deno.test('apply(): should throw error for non-Func first argument', () => {
	assertThrows(
		() =>
			apply(
				new NumberNode(42),
				new ListNode([
					new NumberNode(2),
					new NumberNode(3),
				]),
			),
		Error,
		'Invalid',
	);
});

Deno.test('applyToSequence(): should call function against each item in a list', () => {
	assertEquals(
		applyToSequence(
			new FunctionNode(
				function double(x) {
					return new NumberNode((x as NumberNode).value * 2);
				},
			),
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new ListNode([
			new NumberNode(2),
			new NumberNode(4),
			new NumberNode(6),
		]),
	);
});

Deno.test('applyToSequence(): should throw error if not given exactly 2 arguments', () => {
	assertThrows(
		() =>
			applyToSequence(
				new FunctionNode(
					function double(x) {
						return new NumberNode((x as NumberNode).value * 2);
					},
				),
			),
		Error,
		'Wanted 2 arguments but got 1',
	);
});

Deno.test('applyToSequence(): should throw error if second argument is not a List', () => {
	assertThrows(
		() =>
			applyToSequence(
				new FunctionNode(
					function double(x) {
						return new NumberNode((x as NumberNode).value * 2);
					},
				),
				new NumberNode(42),
			),
		Error,
		'Invalid sequential type',
	);
});

Deno.test('seq should return same list if given a list', () => {
	const list = new ListNode([
		new NumberNode(1),
		new NumberNode(2),
		new NumberNode(3),
	]);
	const result = seq(list);
	assertEquals(
		isListNode(result),
		new BooleanNode(true),
	);
	assertEquals(result.value, list.value);
});

Deno.test('seq(): should return a list if given a vec', () => {
	assertEquals(
		seq(
			new VectorNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new ListNode([
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
		]),
	);
});

Deno.test('seq(): should return a list of chars if given a string', () => {
	assertEquals(
		seq(new StringNode('foo')),
		new ListNode([
			new StringNode('f'),
			new StringNode('o'),
			new StringNode('o'),
		]),
	);
});

Deno.test('seq(): should return nil if given nil', () => {
	assertEquals(
		seq(new NilNode()),
		new NilNode(),
	);
});

Deno.test('seq(): should return nil if given an empty list', () => {
	assertEquals(
		seq(new ListNode([])),
		new NilNode(),
	);
});

Deno.test('seq(): should return nil if given an empty vector', () => {
	assertEquals(
		seq(new VectorNode([])),
		new NilNode(),
	);
});

Deno.test('meta(): should return metadata of an element', () => {
	assertEquals(
		meta(
			new FunctionNode(
				(x) => x, // Function
				undefined, // closureMeta
				false, // isMacro
				new MapNode(new Map([['b', new NumberNode(1)]])),
			),
		),
		new MapNode(new Map([['b', new NumberNode(1)]])),
	);
});

Deno.test('meta(): should throw error if not given exactly 1 argument', () => {
	assertThrows(
		() => meta(),
		Error,
		'Wanted 1 arguments but got 0',
	);
});

Deno.test("meta(): should throw error if argument isn't a MetadataType", () => {
	const notMetadataType = new NumberNode(42);
	assertThrows(
		() => meta(notMetadataType),
		Error,
		'Invalid metadata type',
	);
});

Deno.test('withMeta(): should set metadata', () => {
	const func = new FunctionNode((x) => x);
	const meta = new MapNode(new Map([['b', new NumberNode(1)]]));

	assertEquals(func.metadata, new NilNode());
	const updated = withMeta(func, meta) as FunctionNode;
	assertEquals(updated.metadata, meta);
	assertEquals(func.metadata, new NilNode());
});

Deno.test('withMeta(): should throw error if not given exactly 2 arguments', () => {
	assertThrows(
		() => withMeta(),
		Error,
		'Wanted 2 arguments but got 0',
	);
});

Deno.test("withMeta(): should throw if first argument isn't MetadataType", () => {
	assertThrows(
		() =>
			withMeta(
				new NumberNode(42),
				new MapNode(
					new Map([['b', new NumberNode(1)]]),
				),
			),
		Error,
		'Invalid metadata type',
	);
});

Deno.test('isNil(): should return true if argument is a NilNode', () => {
	assertEquals(
		isNil(new NilNode()),
		new BooleanNode(true),
	);
});

Deno.test('isNil(): should return false if argument is not a NilNode', () => {
	assertEquals(
		isNil(new BooleanNode(true)),
		new BooleanNode(false),
	);
});

Deno.test('isTrue(): should return true for a true value', () => {
	assertEquals(
		isTrue(new BooleanNode(true)),
		new BooleanNode(true),
	);
});

Deno.test('isTrue(): should return false for a false value', () => {
	assertEquals(
		isTrue(new BooleanNode(false)),
		new BooleanNode(false),
	);
});

Deno.test('isFalse(): should return true for a false value', () => {
	assertEquals(
		isFalse(new BooleanNode(false)),
		new BooleanNode(true),
	);
});

Deno.test('isFalse(): should return false for a true value', () => {
	assertEquals(
		isFalse(new BooleanNode(true)),
		new BooleanNode(false),
	);
});

Deno.test('isString(): should return true if argument is a StringNode', () => {
	assertEquals(
		isString(new StringNode('foobar')),
		new BooleanNode(true),
	);
});

Deno.test('isString(): should return false if argument is not a StringNode', () => {
	assertEquals(
		isString(new BooleanNode(true)),
		new BooleanNode(false),
	);
});

Deno.test('symbol(): should create symbol from a string', () => {
	const result = symbol(new StringNode('abc'));
	assertEquals(result instanceof SymbolNode, true);
});

Deno.test('isSymbol(): should return true if argument is a SymbolNode', () => {
	assertEquals(
		isSymbolNode(new SymbolNode('abc')),
		new BooleanNode(true),
	);
});

Deno.test('isSymbol(): should return false if argument is not a SymbolNode', () => {
	assertEquals(
		isSymbolNode(new StringNode('abc')),
		new BooleanNode(false),
	);
});

Deno.test('keyword(): should create keyword from a string', () => {
	const result = keyword(new StringNode('pie'));
	assertInstanceOf(result, KeywordNode);
	assertEquals(result.value, ':pie');
});

Deno.test('keyword(): should create new keyword from a symbol', () => {
	const result = keyword(new SymbolNode('cake'));
	assertInstanceOf(result, KeywordNode);
	assertEquals(result.value, ':cake');
});

Deno.test('keyword(): should return an existing keyword', () => {
	const key = new KeywordNode('cookies');
	const result = keyword(key);
	assertStrictEquals(result, key);
});

Deno.test('isKeyword(): should return true if argument is a KeywordNode', () => {
	assertEquals(
		isKeyword(new KeywordNode('abc')),
		new BooleanNode(true),
	);
});

Deno.test('isKeyword(): should return false if argument is not a KeywordNode', () => {
	assertEquals(
		isKeyword(new SymbolNode('abc')),
		new BooleanNode(false),
	);
});

Deno.test('isNumber(): should return true if argument is a NumberNode', () => {
	assertEquals(
		isNumber(new NumberNode(2)),
		new BooleanNode(true),
	);
});

Deno.test('isNumber(): should return false if argument is not a NumberNode', () => {
	assertEquals(
		isNumber(new StringNode('2')),
		new BooleanNode(false),
	);
});

Deno.test('isFn(): should return true if argument is a FunctionNode', () => {
	const fn = new FunctionNode(() => new NilNode());
	fn.isMacro = false;
	assertEquals(isFn(fn), new BooleanNode(true));
});

Deno.test('isFn(): should return false if argument is not a FunctionNode', () => {
	assertEquals(
		isFn(new NumberNode(2)),
		new BooleanNode(false),
	);
});

Deno.test('isMacro(): should return true if argument is a macro', () => {
	const fn = new FunctionNode(() => new NilNode());
	fn.isMacro = true;
	assertEquals(isMacro(fn), new BooleanNode(true));
});

Deno.test('isMacro(): should return false if argument is not a macro', () => {
	assertEquals(
		isMacro(new NumberNode(2)),
		new BooleanNode(false),
	);
});

Deno.test('vector(): should create a vector from args', () => {
	assertEquals(
		vector(
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
		),
		new VectorNode([
			new NumberNode(1),
			new NumberNode(2),
			new NumberNode(3),
		]),
	);
});

Deno.test('isVector(): should return true if argument is a VectorNode', () => {
	assertEquals(
		isVector(
			new VectorNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new BooleanNode(true),
	);
});

Deno.test('isVector(): should return false if argument is not a VectorNode', () => {
	assertEquals(
		isVector(new NumberNode(2)),
		new BooleanNode(false),
	);
});

// Hash-map
Deno.test('hashMap(): should create a map from alternating args', () => {
	assertEquals(
		hashMap(
			new StringNode('foo'),
			new NumberNode(1),
			new StringNode('bar'),
			new NumberNode(2),
		),
		new MapNode(
			new Map([
				['"foo"', new NumberNode(1)],
				['"bar"', new NumberNode(2)],
			]),
		),
	);
});

Deno.test('hashMap(): should return an empty map if no arguments are passed', () => {
	assertEquals(hashMap(), new MapNode());
});

Deno.test('isMap(): should return true if argument is a MapNode', () => {
	assertEquals(
		isMap(new MapNode(new Map([['foo', new NumberNode(1)]]))),
		new BooleanNode(true),
	);
});

Deno.test('isMap(): should return false if argument is not a MapNode', () => {
	assertEquals(
		isMap(new NumberNode(2)),
		new BooleanNode(false),
	);
});

Deno.test('assoc(): should merge key/value pairs into a map', () => {
	assertEquals(
		assoc(
			hashMap(
				new StringNode('foo'),
				new NumberNode(1),
			),
			new StringNode('bar'),
			new NumberNode(2),
		),
		hashMap(
			new StringNode('foo'),
			new NumberNode(1),
			new StringNode('bar'),
			new NumberNode(2),
		),
	);
});

Deno.test('dissoc(): should remove elements from a dict', () => {
	assertEquals(
		dissoc(
			hashMap(
				new StringNode('foo'),
				new NumberNode(1),
				new StringNode('bar'),
				new NumberNode(2),
			),
			new StringNode('foo'),
		),
		hashMap(new StringNode('bar'), new NumberNode(2)),
	);
});

Deno.test('get(): should get a value from a map using a key', () => {
	assertEquals(
		get(
			hashMap(
				new KeywordNode(':foo'),
				new NumberNode(1),
				new KeywordNode(':bar'),
				new NumberNode(2),
			),
			new KeywordNode(':bar'),
		),
		new NumberNode(2),
	);
});

Deno.test('get(): should return nil if key does not exist', () => {
	assertEquals(
		get(
			hashMap(
				new KeywordNode(':foo'),
				new NumberNode(1),
				new KeywordNode(':bar'),
				new NumberNode(2),
			),
			new KeywordNode(':baz'),
		),
		new NilNode(),
	);
});

Deno.test('get(): should return nil for invalid maps', () => {
	assertEquals(
		get(new StringNode('sharks'), new KeywordNode('surfers')),
		new NilNode(),
	);
});

Deno.test('contains(): should return true if key exists', () => {
	assertEquals(
		contains(
			hashMap(
				new KeywordNode(':foo'),
				new NumberNode(1),
				new KeywordNode(':bar'),
				new NumberNode(2),
			),
			new KeywordNode(':bar'),
		),
		new BooleanNode(true),
	);
});

Deno.test('contains(): should return false if key does not exist', () => {
	assertEquals(
		contains(
			hashMap(
				new KeywordNode(':foo'),
				new NumberNode(1),
				new KeywordNode(':bar'),
				new NumberNode(2),
			),
			new KeywordNode(':baz'),
		),
		new BooleanNode(false),
	);
});

Deno.test('keys(): should return a list of all keys in the map', () => {
	assertEquals(
		keys(hashMap(
			new KeywordNode(':foo'),
			new NumberNode(1),
			new KeywordNode(':bar'),
			new NumberNode(2),
		)),
		new ListNode([
			new KeywordNode(':foo'),
			new KeywordNode(':bar'),
		]),
	);
});

Deno.test('vals(): should return a list of all values in the map', () => {
	assertEquals(
		vals(hashMap(
			new KeywordNode(':foo'),
			new NumberNode(1),
			new KeywordNode(':bar'),
			new NumberNode(2),
		)),
		new ListNode([
			new NumberNode(1),
			new NumberNode(2),
		]),
	);
});

Deno.test('isSequential(): should return true for lists', () => {
	assertEquals(
		isSequentialNode(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new NumberNode(3),
			]),
		),
		new BooleanNode(true),
	);
});

Deno.test('isSequential(): should return true for vectors', () => {
	assertEquals(
		isSequentialNode(
			new VectorNode([
				new NumberNode(4),
				new NumberNode(5),
				new NumberNode(6),
			]),
		),
		new BooleanNode(true),
	);
});

Deno.test('isSequential(): should return false for non-sequential nodes', () => {
	assertEquals(isSequentialNode(new NumberNode(42)), new BooleanNode(false));
});

Deno.test('join(): should concatenate elements with the default delimeter (spaces)', () => {
	assertEquals(
		join(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new StringNode('three'),
			]),
		),
		new StringNode('1 2 three'),
	);
});

Deno.test('join(): should concatenate elements with the given delimeter', () => {
	assertEquals(
		join(
			new ListNode([
				new NumberNode(1),
				new NumberNode(2),
				new StringNode('three'),
			]),
			new StringNode(', '),
		),
		new StringNode('1, 2, three'),
	);
});
