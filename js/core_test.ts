import { assert, assertEquals, assertInstanceOf, assertStrictEquals, assertThrows } from '@std/assert';
import { assertSpyCall, assertSpyCalls, returnsNext, spy, stub } from '@std/testing/mock';
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
  length,
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
import * as types from './types.ts';

Deno.test('eq(): returns true for equal nodes', () => {
  assertEquals(
    eq(types.createNumberNode(1), types.createNumberNode(1)),
    types.createBooleanNode(true),
  );
});

Deno.test('eq(): returns false for unequal nodes', () => {
  assertEquals(
    eq(types.createNumberNode(1), types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

Deno.test('printEscapedString(): returns escaped string', () => {
  assertEquals(
    printEscapedString(types.createStringNode('abc\ndef\nghi')),
    types.createStringNode('"abc\\ndef\\nghi"'),
  );
});

Deno.test('printUnescapedString(): returns unescaped string', () => {
  assertEquals(
    printUnescapedString(types.createStringNode('abc\ndef\nghi')),
    types.createStringNode('abc\ndef\nghi'),
  );
});

Deno.test('printEscapedStringToScreen(): logs the escaped string', () => {
  const logSpy = spy(console, 'log');

  try {
    assertEquals(
      printEscapedStringToScreen(types.createStringNode('abc\ndef\nghi')),
      types.createNilNode(),
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
      printUnescapedStringToScreen(types.createStringNode('abc\ndef\nghi')),
      types.createNilNode(),
    );
  } finally {
    logSpy.restore();
  }

  assertSpyCall(logSpy, 0, { args: ['abc\ndef\nghi'] });
  assertSpyCalls(logSpy, 1);
});

Deno.test('readString(): should read string and return AST', () => {
  const input = types.createStringNode('(+ 2 3)');
  const expected = types.createListNode([
    types.createSymbolNode('+'),
    types.createNumberNode(2),
    types.createNumberNode(3),
  ]);
  assertEquals(readString(input), expected);
});

Deno.test('readString(): throws when there are zero arguments', () => {
  assertThrows(() => readString());
});

Deno.test('readString(): throws when there is more than one argument', () => {
  assertThrows(() =>
    readString(
      types.createStringNode('foo'),
      types.createStringNode('bar'),
    )
  );
});

Deno.test('readString(): should throw when argument is not a string', () => {
  assertThrows(() => readString(types.createNumberNode(42)));
});

Deno.test('readln(): should read line and return string', () => {
  const input = types.createStringNode('%');
  const expected = types.createStringNode('"foobar"');
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
  const input = types.createStringNode('%');
  const expected = types.createNilNode();
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
      types.createStringNode('foo'),
      types.createStringNode('bar'),
    )
  );
});

Deno.test('readln(): should throw when argument is not a string', () => {
  assertThrows(() => readln(types.createNumberNode(42)));
});

Deno.test('readir(): should list directory contents', () => {
  const temporaryDir = Deno.makeTempDirSync();
  Deno.mkdirSync(`${temporaryDir}/subdir`);
  Deno.writeTextFileSync(`${temporaryDir}/file.txt`, 'hello');

  const input = types.createStringNode(temporaryDir);
  const expected = types.createVectorNode([
    types.createMapNode(
      // Make slug and ext null or empty for dirs
      new Map<string, types.AstNode>([
        [':directory', types.createBooleanNode(false)],
        [':ext', types.createStringNode('txt')],
        [':file', types.createBooleanNode(true)],
        [':name', types.createStringNode('file.txt')],
        [':slug', types.createStringNode('file')],
        [':symlink', types.createBooleanNode(false)],
      ]),
    ),
    types.createMapNode(
      // Make slug and ext null or empty for dirs
      new Map<string, types.AstNode>([
        [':directory', types.createBooleanNode(true)],
        [':ext', types.createStringNode('subdir')],
        [':file', types.createBooleanNode(false)],
        [':name', types.createStringNode('subdir')],
        [':slug', types.createStringNode('subdi')],
        [':symlink', types.createBooleanNode(false)],
      ]),
    ),
  ]);

  const result = readir(input);
  assertEquals(result, expected);
});

Deno.test('readir(): should throw error if argument is not a string', () => {
  assertThrows(
    () => readir(types.createNumberNode(123)),
    Error,
    'Invalid',
  );
});

Deno.test('slurp(): should read a file', () => {
  const temporaryDir = Deno.makeTempDirSync();
  const filePath = `${temporaryDir}/file.txt`;
  Deno.writeTextFileSync(filePath, 'content');

  const result = slurp(types.createStringNode(filePath));
  assertEquals(result, types.createStringNode('content'));
});

Deno.test('slurp(): should throw error if file does not exist', () => {
  assertThrows(
    () => slurp(types.createStringNode('mocks/nonexistent')),
    Error,
    'No such file or directory',
  );
});

Deno.test('spit(): should write to a file', () => {
  const temporaryDir = Deno.makeTempDirSync();
  const filePath = `${temporaryDir}/file.txt`;
  const content = 'newContent';

  spit(
    types.createStringNode(filePath),
    types.createStringNode(content),
  );

  const result = Deno.readTextFileSync(filePath);
  assertEquals(result, content);
});

Deno.test('spit(): should throw error if path is not a string', () => {
  assertThrows(
    () =>
      spit(
        types.createNumberNode(123),
        types.createStringNode('content'),
      ),
    Error,
    'Invalid',
  );
});

Deno.test('trim(): should trim whitespace from the start and end of a string', () => {
  assertEquals(
    trim(types.createStringNode('  hello  ')),
    types.createStringNode('hello'),
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
      types.createStringNode('hello'),
      types.createStringNode('world'),
    );
  });
});

Deno.test('trim(): should throw an error when the argument is not a string', () => {
  assertThrows(() => {
    trim(types.createNumberNode(123));
  });
});

// Test for '<'
Deno.test("lt(): should return false if 'a' is greater than 'b'", () => {
  const result1 = lt(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(false));
});

Deno.test("lt(): should return false if 'a' is equal to 'b'", () => {
  const result1 = lt(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(false));
});

Deno.test("lt(): should return true if 'a' is less than 'b'", () => {
  const result2 = lt(
    types.createNumberNode(1),
    types.createNumberNode(2),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

// Test for '<='
Deno.test("lte(): should return false if 'a' is greater than 'b'", () => {
  const result1 = lte(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(false));
});

Deno.test("lte(): should return true if 'a' is equal to 'b'", () => {
  const result2 = lte(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

Deno.test("lte(): should return true if 'a' is less than 'b'", () => {
  const result2 = lte(
    types.createNumberNode(1),
    types.createNumberNode(2),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

// Test for '>'
Deno.test("gt(): should return true if 'a' is greater than 'b'", () => {
  const result1 = gt(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(true));
});

Deno.test("gt(): should return false if 'a' is less than 'b'", () => {
  const result2 = gt(
    types.createNumberNode(1),
    types.createNumberNode(2),
  );
  assertEquals(result2, types.createBooleanNode(false));
});

Deno.test("gt(): should return false if 'a' is equal to 'b'", () => {
  const result2 = gt(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result2, types.createBooleanNode(false));
});

// Test for '>='
Deno.test("gte(): should return true if 'a' is greater than 'b'", () => {
  const result1 = gte(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(true));
});

Deno.test("gte(): should return true if 'a' is equal to 'b'", () => {
  const result2 = gte(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

// Test for '+'
Deno.test('add(): should sum two numbers', () => {
  const result = add(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createNumberNode(3));
});

// Test for '+' error case
Deno.test('add(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    add(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

// Test for '-'
Deno.test('subtract(): should find the difference between two numbers', () => {
  const result = subtract(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createNumberNode(1));
});

// Test for '-' error case
Deno.test('subtract(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    subtract(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

// Test for '*'
Deno.test('multiply(): should find the product of two numbers', () => {
  const result = multiply(
    types.createNumberNode(2),
    types.createNumberNode(3),
  );
  assertEquals(result, types.createNumberNode(6));
});

// Test for '*' error case
Deno.test('multiply(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    multiply(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

// Test for '/'
Deno.test('divide(): should find the quotient of two numbers', () => {
  const result = divide(
    types.createNumberNode(4),
    types.createNumberNode(2),
  );
  assertEquals(result, types.createNumberNode(2));
});

// Test for '/' error case
Deno.test('divide(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    divide(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

Deno.test('timeMs(): should return a unix timestamp', () => {
  const result = timeMs() as types.NumberNode;
  const currentTime = Date.now();

  // Ensure it's a number
  assertEquals(typeof result.value, 'number');

  // Ensure it's reasonably close to the current time
  assert(Math.abs(currentTime - result.value) < 1000);
});

Deno.test('list(): should return a list containing the given args', () => {
  const a = types.createNumberNode(1);
  const b = types.createNumberNode(2);
  const result = list(a, b);
  assertEquals(types.isListNode(result), true);
  assertEquals(result.value, [a, b]);
});

// Test for 'isList'
Deno.test('isListNode(): should return true if the argument is a list', () => {
  const aList = types.createListNode([types.createNumberNode(1)]);
  assertEquals(isListNode(aList).value, true);
});

Deno.test('isListNode(): should return false if the argument is not a list', () => {
  const notList = types.createNumberNode(1);
  assertEquals(isListNode(notList).value, false);
});

// Test for 'isList' failure due to incorrect argument count
Deno.test('isListNode(): should throw if given more than one argument', () => {
  assertThrows(() => isListNode(types.createNumberNode(1), types.createNumberNode(2)));
});

Deno.test('conj(): should throw with with less than 2 arguments', () => {
  assertThrows(
    () => conj(types.createListNode([types.createNumberNode(1)])),
    Error,
    'Unexpected minimum number of arguments',
  );
});

Deno.test('conj(): should conjoin values in a list', () => {
  assertEquals(
    conj(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
      types.createNumberNode(4),
      types.createNumberNode(5),
    ),
    types.createListNode([
      types.createNumberNode(5),
      types.createNumberNode(4),
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
    ]),
  );
});

Deno.test('conj(): should conjoin values in a vector', () => {
  assertEquals(
    conj(
      types.createVectorNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
      types.createNumberNode(4),
      types.createNumberNode(5),
    ),
    types.createVectorNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
      types.createNumberNode(4),
      types.createNumberNode(5),
    ]),
  );
});

Deno.test('conj(): should throw without a List or Vector', () => {
  assertThrows(
    () => conj(types.createNumberNode(42), types.createNumberNode(1)),
    Error,
    'Invalid sequential type',
  );
});

Deno.test('concat(): with no arguments', () => {
  assertEquals(concat(), types.createListNode([]));
});

Deno.test('concat(): with one list', () => {
  assertEquals(
    concat(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
    ]),
  );
});

Deno.test('concat(): with two lists', () => {
  assertEquals(
    concat(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
      ]),
      types.createListNode([
        types.createNumberNode(3),
        types.createNumberNode(4),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
      types.createNumberNode(4),
    ]),
  );
});

Deno.test('concat(): with three lists', () => {
  assertEquals(
    concat(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
      ]),
      types.createListNode([
        types.createNumberNode(3),
        types.createNumberNode(4),
      ]),
      types.createListNode([
        types.createNumberNode(5),
        types.createNumberNode(6),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
      types.createNumberNode(4),
      types.createNumberNode(5),
      types.createNumberNode(6),
    ]),
  );
});

Deno.test('concat(): with empty lists', () => {
  assertEquals(concat(types.createListNode([]), types.createListNode([])), types.createListNode([]));
});

Deno.test('concat(): with non-Seq type should throw', () => {
  assertThrows(
    () => concat(types.createNumberNode(1)),
    Error,
    'Invalid sequential type',
  );
});

Deno.test('cons(): should construct a list by prepending the given value', () => {
  assertEquals(
    cons(
      types.createNumberNode(0),
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(0),
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
    ]),
  );
});

Deno.test('cons(): should throw error with less than 2 arguments', () => {
  assertThrows(
    () => cons(types.createNumberNode(0)),
    Error,
    'Wanted 2 arguments but got 1',
  );
});

Deno.test('cons(): should throw error with more than 2 arguments', () => {
  assertThrows(
    () => cons(types.createNumberNode(0), types.createNumberNode(0), types.createNumberNode(0)),
    Error,
    'Wanted 2 arguments but got 3',
  );
});

Deno.test('cons(): should throw error if second argument is not a List', () => {
  const value = types.createNumberNode(0);
  const notList = types.createNumberNode(42);
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
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createVectorNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
    ]),
  );
});

// Test for 'vec' when input is not a list
Deno.test('vec(): should return the original node if the argument is not a List', () => {
  const notList = types.createNumberNode(1);
  assertEquals(vec(notList), notList);
});

// Test for 'vec' when there are multiple arguments
Deno.test('vec(): should ignore additional arguments', () => {
  assertEquals(
    vec(types.createListNode([types.createNumberNode(1)]), types.createNumberNode(2)),
    types.createVectorNode([types.createNumberNode(1)]),
  );
});

// Test for 'vec' when no arguments
Deno.test('vec(): should return undefined if no arguments are provided', () => {
  assertEquals(vec(), undefined);
});

Deno.test('nth(): should return the nth element of a list', () => {
  assertEquals(
    nth(
      types.createListNode([
        types.createSymbolNode('a'),
        types.createSymbolNode('b'),
        types.createSymbolNode('c'),
      ]),
      types.createNumberNode(1),
    ),
    types.createSymbolNode('b'),
  );
});

Deno.test('nth(): should throw error when index is out of range', () => {
  assertThrows(
    () => nth(types.createListNode([types.createSymbolNode('a')]), types.createNumberNode(1)),
    Error,
    'out of range',
  );
});

Deno.test('firstNodeInList(): should return the first element of a list', () => {
  assertEquals(
    firstNodeInList(
      types.createListNode([
        types.createSymbolNode('a'),
        types.createSymbolNode('b'),
      ]),
    ),
    types.createSymbolNode('a'),
  );
});

Deno.test('firstNodeInList(): should return nil for empty list', () => {
  assertEquals(
    firstNodeInList(types.createListNode([])),
    types.createNilNode(),
  );
});

Deno.test('rest(): should return a list without the first element', () => {
  assertEquals(
    rest(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(2),
      types.createNumberNode(3),
    ]),
  );
});

Deno.test('rest(): should return empty list for single-element list', () => {
  assertEquals(
    rest(types.createListNode([types.createNumberNode(1)])),
    types.createListNode([]),
  );
});

Deno.test('empty(): should return true for an empty list', () => {
  assertEquals(empty(types.createListNode([])), types.createBooleanNode(true));
});

Deno.test('empty(): should return false for a non-empty list', () => {
  assertEquals(
    empty(types.createListNode([types.createNumberNode(2)])),
    types.createBooleanNode(false),
  );
});

Deno.test('count(): should return the length of a list', () => {
  assertEquals(
    length(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
      ]),
    ),
    types.createNumberNode(2),
  );
});

Deno.test('count(): should return 0 for an empty list', () => {
  assertEquals(length(types.createListNode([])), types.createNumberNode(0));
});

Deno.test('should return 0 for a Nil value', () => {
  assertEquals(length(types.createNilNode()), types.createNumberNode(0));
});

Deno.test('atom(): should create an Atom from a given node', () => {
  assertEquals(
    atom(types.createNumberNode(42)),
    types.createAtomNode(types.createNumberNode(42)),
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
    isAtom(types.createAtomNode(types.createNumberNode(42))),
    types.createBooleanNode(true),
  );
});

Deno.test('isAtom(): should return false if the node is not an Atom', () => {
  assertEquals(isAtom(types.createNumberNode(42)), types.createBooleanNode(false));
});

Deno.test('deref(): should return the node contained in the Atom', () => {
  assertEquals(deref(types.createAtomNode(types.createNumberNode(42))), types.createNumberNode(42));
});

Deno.test('deref(): should throw error for non-Atom nodes', () => {
  assertThrows(() => deref(types.createNumberNode(42)), Error, 'Invalid');
});

Deno.test("reset(): should update the Atom's value and return the node", () => {
  const atom = types.createAtomNode(types.createNumberNode(42));
  assertEquals(atom.value, types.createNumberNode(42));
  assertEquals(reset(atom, types.createNumberNode(43)), types.createNumberNode(43));
  assertEquals(atom.value, types.createNumberNode(43));
});

Deno.test('reset(): should throw error for non-Atom first argument', () => {
  assertThrows(
    () => reset(types.createNumberNode(42), types.createNumberNode(43)),
    Error,
    'Invalid',
  );
});

Deno.test('should throw an error for insufficient arguments', () => {
  assertThrows(() => {
    swap(types.createAtomNode(types.createStringNode('a')));
  });
});

Deno.test('swap(): should throw an error if the first argument is not an Atom', () => {
  assertThrows(() => {
    swap(
      types.createStringNode('not an atom'),
      types.createFunctionNode((a) => a),
    );
  });
});

Deno.test('swap(): should throw an error if the second argument is not a Func', () => {
  assertThrows(() => {
    swap(
      types.createAtomNode(types.createStringNode('a')),
      types.createStringNode('not a function'),
    );
  });
});

Deno.test("swap(): should swap the Atoms' value with the result of the function", () => {
  assertEquals(
    swap(
      types.createAtomNode(types.createNumberNode(6)),
      types.createFunctionNode(
        (a) => types.createNumberNode((a as types.NumberNode).value * 2),
      ),
    ),
    types.createNumberNode(12),
  );
});

Deno.test('swap(): should handle additional parameters correctly', () => {
  assertEquals(
    swap(
      types.createAtomNode(types.createNumberNode(5)),
      types.createFunctionNode(
        (a, b) =>
          types.createNumberNode(
            (a as types.NumberNode).value +
              (b as types.NumberNode).value,
          ),
      ),
      types.createNumberNode(7),
    ),
    types.createNumberNode(12),
  );
});

Deno.test('throwError(): should throw the value of an ast node', () => {
  assertThrows(() => throwError(types.createStringNode('foo')), 'foo');
});

Deno.test('throwError(): should throw an error when no arguments are provided', () => {
  assertThrows(
    () => throwError(),
    'Unexpected number of arguments',
  );
});

Deno.test('throwError(): should throw an error when given an invalid argument type', () => {
  assertThrows(
    () => throwError(types.createBooleanNode(false)),
    'invalid argument',
  );
});

Deno.test('apply(): should call a function with list arguments', () => {
  assertEquals(
    apply(
      types.createFunctionNode(
        (a, b) =>
          types.createNumberNode(
            (a as types.NumberNode).value +
              (b as types.NumberNode).value,
          ),
      ),
      types.createListNode([
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createNumberNode(5),
  );
});

Deno.test('apply(): should concatenate other arguments with list', () => {
  assertEquals(
    apply(
      types.createFunctionNode(
        (a, b, c) =>
          types.createNumberNode(
            (a as types.NumberNode).value +
              (b as types.NumberNode).value +
              (c as types.NumberNode).value,
          ),
      ),
      types.createNumberNode(3),
      types.createListNode([
        types.createNumberNode(2),
        types.createNumberNode(1),
      ]),
    ),
    types.createNumberNode(6),
  );
});

Deno.test('apply(): should throw error for non-Seq last argument', () => {
  assertThrows(
    () =>
      apply(
        types.createFunctionNode(
          (a, b) =>
            types.createNumberNode(
              (a as types.NumberNode).value +
                (b as types.NumberNode).value,
            ),
        ),
        types.createNumberNode(3),
      ),
    Error,
    'Invalid sequential type',
  );
});

Deno.test('apply(): should throw error for non-Func first argument', () => {
  assertThrows(
    () =>
      apply(
        types.createNumberNode(42),
        types.createListNode([
          types.createNumberNode(2),
          types.createNumberNode(3),
        ]),
      ),
    Error,
    'Invalid',
  );
});

Deno.test('applyToSequence(): should call function against each item in a list', () => {
  assertEquals(
    applyToSequence(
      types.createFunctionNode(
        function double(x) {
          return types.createNumberNode((x as types.NumberNode).value * 2);
        },
      ),
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(2),
      types.createNumberNode(4),
      types.createNumberNode(6),
    ]),
  );
});

Deno.test('applyToSequence(): should throw error if not given exactly 2 arguments', () => {
  assertThrows(
    () =>
      applyToSequence(
        types.createFunctionNode(
          function double(x) {
            return types.createNumberNode((x as types.NumberNode).value * 2);
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
        types.createFunctionNode(
          function double(x) {
            return types.createNumberNode((x as types.NumberNode).value * 2);
          },
        ),
        types.createNumberNode(42),
      ),
    Error,
    'Invalid sequential type',
  );
});

Deno.test('seq should return same list if given a list', () => {
  const list = types.createListNode([
    types.createNumberNode(1),
    types.createNumberNode(2),
    types.createNumberNode(3),
  ]);
  const result = seq(list);
  assertEquals(
    isListNode(result),
    types.createBooleanNode(true),
  );
  assertEquals(result.value, list.value);
});

Deno.test('seq(): should return a list if given a vec', () => {
  assertEquals(
    seq(
      types.createVectorNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
    ]),
  );
});

Deno.test('seq(): should return a list of chars if given a string', () => {
  assertEquals(
    seq(types.createStringNode('foo')),
    types.createListNode([
      types.createStringNode('f'),
      types.createStringNode('o'),
      types.createStringNode('o'),
    ]),
  );
});

Deno.test('seq(): should return nil if given nil', () => {
  assertEquals(
    seq(types.createNilNode()),
    types.createNilNode(),
  );
});

Deno.test('seq(): should return nil if given an empty list', () => {
  assertEquals(
    seq(types.createListNode([])),
    types.createNilNode(),
  );
});

Deno.test('seq(): should return nil if given an empty vector', () => {
  assertEquals(
    seq(types.createVectorNode([])),
    types.createNilNode(),
  );
});

Deno.test('meta(): should return metadata of an element', () => {
  assertEquals(
    meta(
      types.createFunctionNode(
        (x) => x, // Function
        undefined, // closureMeta
        false, // isMacro
        types.createMapNode(new Map([['b', types.createNumberNode(1)]])),
      ),
    ),
    types.createMapNode(new Map([['b', types.createNumberNode(1)]])),
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
  const notMetadataType = types.createNumberNode(42);
  assertThrows(
    () => meta(notMetadataType),
    Error,
    'Invalid metadata type',
  );
});

Deno.test('withMeta(): should set metadata', () => {
  const func = types.createFunctionNode((x) => x);
  const meta = types.createMapNode(new Map([['b', types.createNumberNode(1)]]));

  assertEquals(func.metadata, types.createNilNode());
  const updated = withMeta(func, meta) as types.FunctionNode;
  assertEquals(updated.metadata, meta);
  assertEquals(func.metadata, types.createNilNode());
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
        types.createNumberNode(42),
        types.createMapNode(
          new Map([['b', types.createNumberNode(1)]]),
        ),
      ),
    Error,
    'Invalid metadata type',
  );
});

Deno.test('isNil(): should return true if argument is a NilNode', () => {
  assertEquals(
    isNil(types.createNilNode()),
    types.createBooleanNode(true),
  );
});

Deno.test('isNil(): should return false if argument is not a NilNode', () => {
  assertEquals(
    isNil(types.createBooleanNode(true)),
    types.createBooleanNode(false),
  );
});

Deno.test('isTrue(): should return true for a true value', () => {
  assertEquals(
    isTrue(types.createBooleanNode(true)),
    types.createBooleanNode(true),
  );
});

Deno.test('isTrue(): should return false for a false value', () => {
  assertEquals(
    isTrue(types.createBooleanNode(false)),
    types.createBooleanNode(false),
  );
});

Deno.test('isFalse(): should return true for a false value', () => {
  assertEquals(
    isFalse(types.createBooleanNode(false)),
    types.createBooleanNode(true),
  );
});

Deno.test('isFalse(): should return false for a true value', () => {
  assertEquals(
    isFalse(types.createBooleanNode(true)),
    types.createBooleanNode(false),
  );
});

Deno.test('isString(): should return true if argument is a StringNode', () => {
  assertEquals(
    isString(types.createStringNode('foobar')),
    types.createBooleanNode(true),
  );
});

Deno.test('isString(): should return false if argument is not a StringNode', () => {
  assertEquals(
    isString(types.createBooleanNode(true)),
    types.createBooleanNode(false),
  );
});

Deno.test('symbol(): should create symbol from a string', () => {
  const result = symbol(types.createStringNode('abc'));
  assertEquals(types.isSymbolNode(result), true);
});

Deno.test('isSymbol(): should return true if argument is a SymbolNode', () => {
  assertEquals(
    isSymbolNode(types.createSymbolNode('abc')),
    types.createBooleanNode(true),
  );
});

Deno.test('isSymbol(): should return false if argument is not a SymbolNode', () => {
  assertEquals(
    isSymbolNode(types.createStringNode('abc')),
    types.createBooleanNode(false),
  );
});

Deno.test('keyword(): should create keyword from a string', () => {
  const result = keyword(types.createStringNode('pie'));
  assertInstanceOf(result, types.KeywordNode);
  assertEquals(result.value, ':pie');
});

Deno.test('keyword(): should create new keyword from a symbol', () => {
  const result = keyword(types.createSymbolNode('cake'));
  assertInstanceOf(result, types.KeywordNode);
  assertEquals(result.value, ':cake');
});

Deno.test('keyword(): should return an existing keyword', () => {
  const key = types.createKeywordNode('cookies');
  const result = keyword(key);
  assertStrictEquals(result, key);
});

Deno.test('isKeyword(): should return true if argument is a KeywordNode', () => {
  assertEquals(
    isKeyword(types.createKeywordNode('abc')),
    types.createBooleanNode(true),
  );
});

Deno.test('isKeyword(): should return false if argument is not a KeywordNode', () => {
  assertEquals(
    isKeyword(types.createSymbolNode('abc')),
    types.createBooleanNode(false),
  );
});

Deno.test('isNumber(): should return true if argument is a NumberNode', () => {
  assertEquals(
    isNumber(types.createNumberNode(2)),
    types.createBooleanNode(true),
  );
});

Deno.test('isNumber(): should return false if argument is not a NumberNode', () => {
  assertEquals(
    isNumber(types.createStringNode('2')),
    types.createBooleanNode(false),
  );
});

Deno.test('isFn(): should return true if argument is a FunctionNode', () => {
  const fn = types.createFunctionNode(() => types.createNilNode());
  fn.isMacro = false;
  assertEquals(isFn(fn), types.createBooleanNode(true));
});

Deno.test('isFn(): should return false if argument is not a FunctionNode', () => {
  assertEquals(
    isFn(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

Deno.test('isMacro(): should return true if argument is a macro', () => {
  const fn = types.createFunctionNode(() => types.createNilNode());
  fn.isMacro = true;
  assertEquals(isMacro(fn), types.createBooleanNode(true));
});

Deno.test('isMacro(): should return false if argument is not a macro', () => {
  assertEquals(
    isMacro(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

Deno.test('vector(): should create a vector from args', () => {
  assertEquals(
    vector(
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
    ),
    types.createVectorNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
      types.createNumberNode(3),
    ]),
  );
});

Deno.test('isVector(): should return true if argument is a VectorNode', () => {
  assertEquals(
    isVector(
      types.createVectorNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createBooleanNode(true),
  );
});

Deno.test('isVector(): should return false if argument is not a VectorNode', () => {
  assertEquals(
    isVector(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

// Hash-map
Deno.test('hashMap(): should create a map from alternating args', () => {
  assertEquals(
    hashMap(
      types.createStringNode('foo'),
      types.createNumberNode(1),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
    types.createMapNode(
      new Map([
        ['"foo"', types.createNumberNode(1)],
        ['"bar"', types.createNumberNode(2)],
      ]),
    ),
  );
});

Deno.test('hashMap(): should return an empty map if no arguments are passed', () => {
  assertEquals(hashMap(), types.createMapNode());
});

Deno.test('isMap(): should return true if argument is a MapNode', () => {
  assertEquals(
    isMap(types.createMapNode(new Map([['foo', types.createNumberNode(1)]]))),
    types.createBooleanNode(true),
  );
});

Deno.test('isMap(): should return false if argument is not a MapNode', () => {
  assertEquals(
    isMap(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

Deno.test('assoc(): should merge key/value pairs into a map', () => {
  assertEquals(
    assoc(
      hashMap(
        types.createStringNode('foo'),
        types.createNumberNode(1),
      ),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
    hashMap(
      types.createStringNode('foo'),
      types.createNumberNode(1),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
  );
});

Deno.test('dissoc(): should remove elements from a dict', () => {
  assertEquals(
    dissoc(
      hashMap(
        types.createStringNode('foo'),
        types.createNumberNode(1),
        types.createStringNode('bar'),
        types.createNumberNode(2),
      ),
      types.createStringNode('foo'),
    ),
    hashMap(types.createStringNode('bar'), types.createNumberNode(2)),
  );
});

Deno.test('get(): should get a value from a map using a key', () => {
  assertEquals(
    get(
      hashMap(
        types.createKeywordNode(':foo'),
        types.createNumberNode(1),
        types.createKeywordNode(':bar'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode(':bar'),
    ),
    types.createNumberNode(2),
  );
});

Deno.test('get(): should return nil if key does not exist', () => {
  assertEquals(
    get(
      hashMap(
        types.createKeywordNode(':foo'),
        types.createNumberNode(1),
        types.createKeywordNode(':bar'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode(':baz'),
    ),
    types.createNilNode(),
  );
});

Deno.test('get(): should return nil for invalid maps', () => {
  assertEquals(
    get(types.createStringNode('sharks'), types.createKeywordNode('surfers')),
    types.createNilNode(),
  );
});

Deno.test('contains(): should return true if key exists', () => {
  assertEquals(
    contains(
      hashMap(
        types.createKeywordNode(':foo'),
        types.createNumberNode(1),
        types.createKeywordNode(':bar'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode(':bar'),
    ),
    types.createBooleanNode(true),
  );
});

Deno.test('contains(): should return false if key does not exist', () => {
  assertEquals(
    contains(
      hashMap(
        types.createKeywordNode(':foo'),
        types.createNumberNode(1),
        types.createKeywordNode(':bar'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode(':baz'),
    ),
    types.createBooleanNode(false),
  );
});

Deno.test('keys(): should return a list of all keys in the map', () => {
  assertEquals(
    keys(hashMap(
      types.createKeywordNode(':foo'),
      types.createNumberNode(1),
      types.createKeywordNode(':bar'),
      types.createNumberNode(2),
    )),
    types.createListNode([
      types.createKeywordNode(':foo'),
      types.createKeywordNode(':bar'),
    ]),
  );
});

Deno.test('vals(): should return a list of all values in the map', () => {
  assertEquals(
    vals(hashMap(
      types.createKeywordNode(':foo'),
      types.createNumberNode(1),
      types.createKeywordNode(':bar'),
      types.createNumberNode(2),
    )),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
    ]),
  );
});

Deno.test('isSequential(): should return true for lists', () => {
  assertEquals(
    isSequentialNode(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createBooleanNode(true),
  );
});

Deno.test('isSequential(): should return true for vectors', () => {
  assertEquals(
    isSequentialNode(
      types.createVectorNode([
        types.createNumberNode(4),
        types.createNumberNode(5),
        types.createNumberNode(6),
      ]),
    ),
    types.createBooleanNode(true),
  );
});

Deno.test('isSequential(): should return false for non-sequential nodes', () => {
  assertEquals(isSequentialNode(types.createNumberNode(42)), types.createBooleanNode(false));
});

Deno.test('join(): should concatenate elements with the default delimeter (spaces)', () => {
  assertEquals(
    join(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createStringNode('three'),
      ]),
    ),
    types.createStringNode('1 2 three'),
  );
});

Deno.test('join(): should concatenate elements with the given delimeter', () => {
  assertEquals(
    join(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createStringNode('three'),
      ]),
      types.createStringNode(', '),
    ),
    types.createStringNode('1, 2, three'),
  );
});
