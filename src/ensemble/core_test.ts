import * as core from './core.ts';
import { assert, assertEquals, assertInstanceOf, assertSpyCall, assertSpyCalls, assertStrictEquals, assertThrows, ignoreTest, spy, test } from './tests/test_runner.ts';
import * as types from './types.ts';

test('eq(): returns true for equal nodes', () => {
  assertEquals(
    core.eq(types.createNumberNode(1), types.createNumberNode(1)),
    types.createBooleanNode(true),
  );
});

test('eq(): returns false for unequal nodes', () => {
  assertEquals(
    core.eq(types.createNumberNode(1), types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

test('printEscapedString(): returns escaped string', () => {
  assertEquals(
    core.printEscapedString(types.createStringNode('abc\ndef\nghi')),
    types.createStringNode('"abc\\ndef\\nghi"'),
  );
});

test('printUnescapedString(): returns unescaped string', () => {
  assertEquals(
    core.printUnescapedString(types.createStringNode('abc\ndef\nghi')),
    types.createStringNode('abc\ndef\nghi'),
  );
});

test('printEscapedStringToScreen(): logs the escaped string', () => {
  const logSpy = spy(console, 'log');

  try {
    assertEquals(
      core.printEscapedStringToScreen(types.createStringNode('abc\ndef\nghi')),
      types.createNilNode(),
    );
  } finally {
    logSpy.restore();
  }

  assertSpyCall(logSpy, 0, { args: ['"abc\\ndef\\nghi"'] });
  assertSpyCalls(logSpy, 1);
});

ignoreTest('printEscapedStringToScreen(): logs the unescaped string', () => {
  const logSpy = spy(console, 'log');

  try {
    assertEquals(
      core.printUnescapedStringToScreen(types.createStringNode('abc\ndef\nghi')),
      types.createNilNode(),
    );
  } finally {
    logSpy.restore();
  }

  assertSpyCall(logSpy, 0, { args: ['abc\ndef\nghi'] });
  assertSpyCalls(logSpy, 1);
});

test('readString(): should read string and return AST', () => {
  const input = types.createStringNode('(+ 2 3)');
  const expected = types.createListNode([
    types.createSymbolNode('+'),
    types.createNumberNode(2),
    types.createNumberNode(3),
  ]);
  assertEquals(core.readString(input), expected);
});

test('readString(): throws when there are zero arguments', () => {
  assertThrows(() => core.readString());
});

test('readString(): throws when there is more than one argument', () => {
  assertThrows(() =>
    core.readString(
      types.createStringNode('foo'),
      types.createStringNode('bar'),
    )
  );
});

test('readString(): should throw when argument is not a string', () => {
  assertThrows(() => core.readString(types.createNumberNode(42)));
});

test('trim(): should trim whitespace from the start and end of a string', () => {
  assertEquals(
    core.trim(types.createStringNode('  hello  ')),
    types.createStringNode('hello'),
  );
});

test('trim(): should throw an error when no arguments are provided', () => {
  assertThrows(() => {
    core.trim();
  });
});

test('trim(): should throw an error when more than one argument is provided', () => {
  assertThrows(() => {
    core.trim(
      types.createStringNode('hello'),
      types.createStringNode('world'),
    );
  });
});

test('trim(): should throw an error when the argument is not a string', () => {
  assertThrows(() => {
    core.trim(types.createNumberNode(123));
  });
});

// Test for '<'
test("lt(): should return false if 'a' is greater than 'b'", () => {
  const result1 = core.lt(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(false));
});

test("lt(): should return false if 'a' is equal to 'b'", () => {
  const result1 = core.lt(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(false));
});

test("lt(): should return true if 'a' is less than 'b'", () => {
  const result2 = core.lt(
    types.createNumberNode(1),
    types.createNumberNode(2),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

// Test for '<='
test("lte(): should return false if 'a' is greater than 'b'", () => {
  const result1 = core.lte(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(false));
});

test("lte(): should return true if 'a' is equal to 'b'", () => {
  const result2 = core.lte(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

test("lte(): should return true if 'a' is less than 'b'", () => {
  const result2 = core.lte(
    types.createNumberNode(1),
    types.createNumberNode(2),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

// Test for '>'
test("gt(): should return true if 'a' is greater than 'b'", () => {
  const result1 = core.gt(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(true));
});

test("gt(): should return false if 'a' is less than 'b'", () => {
  const result2 = core.gt(
    types.createNumberNode(1),
    types.createNumberNode(2),
  );
  assertEquals(result2, types.createBooleanNode(false));
});

test("gt(): should return false if 'a' is equal to 'b'", () => {
  const result2 = core.gt(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result2, types.createBooleanNode(false));
});

// Test for '>='
test("gte(): should return true if 'a' is greater than 'b'", () => {
  const result1 = core.gte(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result1, types.createBooleanNode(true));
});

test("gte(): should return true if 'a' is equal to 'b'", () => {
  const result2 = core.gte(
    types.createNumberNode(1),
    types.createNumberNode(1),
  );
  assertEquals(result2, types.createBooleanNode(true));
});

// Test for '+'
test('add(): should sum two numbers', () => {
  const result = core.add(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createNumberNode(3));
});

// Test for '+' error case
test('add(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    core.add(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

// Test for '-'
test('subtract(): should find the difference between two numbers', () => {
  const result = core.subtract(
    types.createNumberNode(2),
    types.createNumberNode(1),
  );
  assertEquals(result, types.createNumberNode(1));
});

// Test for '-' error case
test('subtract(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    core.subtract(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

// Test for '*'
test('multiply(): should find the product of two numbers', () => {
  const result = core.multiply(
    types.createNumberNode(2),
    types.createNumberNode(3),
  );
  assertEquals(result, types.createNumberNode(6));
});

// Test for '*' error case
test('multiply(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    core.multiply(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

// Test for '/'
test('divide(): should find the quotient of two numbers', () => {
  const result = core.divide(
    types.createNumberNode(4),
    types.createNumberNode(2),
  );
  assertEquals(result, types.createNumberNode(2));
});

// Test for '/' error case
test('divide(): should throw an error if an argument is not a number', () => {
  assertThrows(() => {
    core.divide(
      types.createStringNode('not a num'),
      types.createNumberNode(1),
    );
  });
});

test('timeMs(): should return a unix timestamp', () => {
  const result = core.timeMs() as types.NumberNode;
  const currentTime = (new Date()).getTime();

  // Ensure it's a number
  assertEquals(typeof result.value, 'number');

  // Ensure it's reasonably close to the current time
  assert(Math.abs(currentTime - result.value) < 1000);
});

test('list(): should return a list containing the given args', () => {
  const a = types.createNumberNode(1);
  const b = types.createNumberNode(2);
  const result = core.list(a, b);
  assertEquals(types.isListNode(result), true);
  assertEquals(result.value, [a, b]);
});

// Test for 'isList'
test('isListNode(): should return true if the argument is a list', () => {
  const aList = types.createListNode([types.createNumberNode(1)]);
  assertEquals(types.isListNode(aList), true);
});

test('isListNode(): should return false if the argument is not a list', () => {
  const notList = types.createNumberNode(1);
  assertEquals(types.isListNode(notList), false);
});

test('conj(): should throw with with less than 2 arguments', () => {
  assertThrows(
    () => core.conj(types.createListNode([types.createNumberNode(1)])),
    Error,
    'Unexpected minimum number of arguments',
  );
});

test('conj(): should conjoin values in a list', () => {
  assertEquals(
    core.conj(
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

test('conj(): should conjoin values in a vector', () => {
  assertEquals(
    core.conj(
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

test('conj(): should throw without a List or Vector', () => {
  assertThrows(
    () => core.conj(types.createNumberNode(42), types.createNumberNode(1)),
    Error,
    'Invalid sequential type',
  );
});

test('concat(): with no arguments', () => {
  assertEquals(core.concat(), types.createListNode([]));
});

test('concat(): with one list', () => {
  assertEquals(
    core.concat(
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

test('concat(): with two lists', () => {
  assertEquals(
    core.concat(
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

test('concat(): with three lists', () => {
  assertEquals(
    core.concat(
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

test('concat(): with empty lists', () => {
  assertEquals(core.concat(types.createListNode([]), types.createListNode([])), types.createListNode([]));
});

test('concat(): with non-Seq type should throw', () => {
  assertThrows(
    () => core.concat(types.createNumberNode(1)),
    Error,
    'Invalid sequential type',
  );
});

test('cons(): should construct a list by prepending the given value', () => {
  assertEquals(
    core.cons(
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

test('cons(): should throw error with less than 2 arguments', () => {
  assertThrows(
    () => core.cons(types.createNumberNode(0)),
    Error,
    'Wanted 2 arguments but got 1',
  );
});

test('cons(): should throw error with more than 2 arguments', () => {
  assertThrows(
    () => core.cons(types.createNumberNode(0), types.createNumberNode(0), types.createNumberNode(0)),
    Error,
    'Wanted 2 arguments but got 3',
  );
});

test('cons(): should throw error if second argument is not a List', () => {
  const value = types.createNumberNode(0);
  const notList = types.createNumberNode(42);
  assertThrows(
    () => core.cons(value, notList),
    Error,
    'Invalid sequential type',
  );
});

// Test for 'vec' when input is a list
test('vec(): should convert a list into a vector', () => {
  assertEquals(
    core.vec(
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
test('vec(): should return the original node if the argument is not a List', () => {
  const notList = types.createNumberNode(1);
  assertEquals(core.vec(notList), notList);
});

// Test for 'vec' when there are multiple arguments
test('vec(): should ignore additional arguments', () => {
  assertEquals(
    core.vec(types.createListNode([types.createNumberNode(1)]), types.createNumberNode(2)),
    types.createVectorNode([types.createNumberNode(1)]),
  );
});

// Test for 'vec' when no arguments
test('vec(): should return undefined if no arguments are provided', () => {
  assertEquals(core.vec(), undefined);
});

test('nth(): should return the nth element of a list', () => {
  assertEquals(
    core.nth(
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

test('nth(): should throw error when index is out of range', () => {
  assertThrows(
    () => core.nth(types.createListNode([types.createSymbolNode('a')]), types.createNumberNode(1)),
    Error,
    'out of range',
  );
});

test('firstNodeInList(): should return the first element of a list', () => {
  assertEquals(
    core.firstNodeInList(
      types.createListNode([
        types.createSymbolNode('a'),
        types.createSymbolNode('b'),
      ]),
    ),
    types.createSymbolNode('a'),
  );
});

test('firstNodeInList(): should return nil for empty list', () => {
  assertEquals(
    core.firstNodeInList(types.createListNode([])),
    types.createNilNode(),
  );
});

test('rest(): should return a list without the first element', () => {
  assertEquals(
    core.rest(
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

test('rest(): should return empty list for single-element list', () => {
  assertEquals(
    core.rest(types.createListNode([types.createNumberNode(1)])),
    types.createListNode([]),
  );
});

test('empty(): should return true for an empty list', () => {
  assertEquals(core.empty(types.createListNode([])), types.createBooleanNode(true));
});

test('empty(): should return false for a non-empty list', () => {
  assertEquals(
    core.empty(types.createListNode([types.createNumberNode(2)])),
    types.createBooleanNode(false),
  );
});

test('count(): should return the length of a list', () => {
  assertEquals(
    core.length(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
      ]),
    ),
    types.createNumberNode(2),
  );
});

test('count(): should return 0 for an empty list', () => {
  assertEquals(core.length(types.createListNode([])), types.createNumberNode(0));
});

test('should return 0 for a Nil value', () => {
  assertEquals(core.length(types.createNilNode()), types.createNumberNode(0));
});

test('atom(): should create an Atom from a given node', () => {
  assertEquals(
    core.atom(types.createNumberNode(42)),
    types.createAtomNode(types.createNumberNode(42)),
  );
});

test('atom(): should throw error when no arguments are provided', () => {
  assertThrows(
    () => core.atom(),
    Error,
    'Wanted 1 arguments but got 0',
  );
});

test('isAtom(): should return true if the node is an Atom', () => {
  assertEquals(
    core.isAtom(types.createAtomNode(types.createNumberNode(42))),
    types.createBooleanNode(true),
  );
});

test('isAtom(): should return false if the node is not an Atom', () => {
  assertEquals(core.isAtom(types.createNumberNode(42)), types.createBooleanNode(false));
});

test('deref(): should return the node contained in the Atom', () => {
  assertEquals(core.deref(types.createAtomNode(types.createNumberNode(42))), types.createNumberNode(42));
});

test('deref(): should throw error for non-Atom nodes', () => {
  assertThrows(() => core.deref(types.createNumberNode(42)), Error, 'Invalid');
});

test("reset(): should update the Atom's value and return the node", () => {
  const atom = types.createAtomNode(types.createNumberNode(42));
  assertEquals(atom.value, types.createNumberNode(42));
  assertEquals(core.reset(atom, types.createNumberNode(43)), types.createNumberNode(43));
  assertEquals(atom.value, types.createNumberNode(43));
});

test('reset(): should throw error for non-Atom first argument', () => {
  assertThrows(
    () => core.reset(types.createNumberNode(42), types.createNumberNode(43)),
    Error,
    'Invalid',
  );
});

test('should throw an error for insufficient arguments', () => {
  assertThrows(() => {
    core.swap(types.createAtomNode(types.createStringNode('a')));
  });
});

test('swap(): should throw an error if the first argument is not an Atom', () => {
  assertThrows(() => {
    core.swap(
      types.createStringNode('not an atom'),
      types.createFunctionNode((a) => a),
    );
  });
});

test('swap(): should throw an error if the second argument is not a Func', () => {
  assertThrows(() => {
    core.swap(
      types.createAtomNode(types.createStringNode('a')),
      types.createStringNode('not a function'),
    );
  });
});

test("swap(): should swap the Atoms' value with the result of the function", () => {
  assertEquals(
    core.swap(
      types.createAtomNode(types.createNumberNode(6)),
      types.createFunctionNode(
        (a) => types.createNumberNode((a as types.NumberNode).value * 2),
      ),
    ),
    types.createNumberNode(12),
  );
});

test('swap(): should handle additional parameters correctly', () => {
  assertEquals(
    core.swap(
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

test('throwError(): should throw the value of an ast node', () => {
  assertThrows(() => core.throwError(types.createStringNode('foo')), 'foo');
});

test('throwError(): should throw an error when no arguments are provided', () => {
  assertThrows(
    () => core.throwError(),
    'Unexpected number of arguments',
  );
});

test('throwError(): should throw an error when given an invalid argument type', () => {
  assertThrows(
    () => core.throwError(types.createBooleanNode(false)),
    'invalid argument',
  );
});

test('apply(): should call a function with list arguments', () => {
  assertEquals(
    core.apply(
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

test('apply(): should concatenate other arguments with list', () => {
  assertEquals(
    core.apply(
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

test('apply(): should throw error for non-Seq last argument', () => {
  assertThrows(
    () =>
      core.apply(
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

test('apply(): should throw error for non-Func first argument', () => {
  assertThrows(
    () =>
      core.apply(
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

test('applyToSequence(): should call function against each item in a list', () => {
  assertEquals(
    core.applyToSequence(
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

test('applyToSequence(): should throw error if not given exactly 2 arguments', () => {
  assertThrows(
    () =>
      core.applyToSequence(
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

test('applyToSequence(): should throw error if second argument is not a List', () => {
  assertThrows(
    () =>
      core.applyToSequence(
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

test('seq should return same list if given a list', () => {
  const list = types.createListNode([
    types.createNumberNode(1),
    types.createNumberNode(2),
    types.createNumberNode(3),
  ]);
  const result = core.seq(list);
  assertEquals(
    types.isListNode(result),
    true,
  );
  assertEquals(result.value, list.value);
});

test('seq(): should return a list if given a vec', () => {
  assertEquals(
    core.seq(
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

test('seq(): should return a list of chars if given a string', () => {
  assertEquals(
    core.seq(types.createStringNode('foo')),
    types.createListNode([
      types.createStringNode('f'),
      types.createStringNode('o'),
      types.createStringNode('o'),
    ]),
  );
});

test('seq(): should return nil if given nil', () => {
  assertEquals(
    core.seq(types.createNilNode()),
    types.createNilNode(),
  );
});

test('seq(): should return nil if given an empty list', () => {
  assertEquals(
    core.seq(types.createListNode([])),
    types.createNilNode(),
  );
});

test('seq(): should return nil if given an empty vector', () => {
  assertEquals(
    core.seq(types.createVectorNode([])),
    types.createNilNode(),
  );
});

test('meta(): should return metadata of an element', () => {
  assertEquals(
    core.meta(
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

test('meta(): should throw error if not given exactly 1 argument', () => {
  assertThrows(
    () => core.meta(),
    Error,
    'Wanted 1 arguments but got 0',
  );
});

test("meta(): should throw error if argument isn't a MetadataType", () => {
  const notMetadataType = types.createNumberNode(42);
  assertThrows(
    () => core.meta(notMetadataType),
    Error,
    'Invalid metadata type',
  );
});

test('withMeta(): should set metadata', () => {
  const func = types.createFunctionNode((x) => x);
  const meta = types.createMapNode(new Map([['b', types.createNumberNode(1)]]));

  assertEquals(func.metadata, undefined);
  const updated = core.withMeta(func, meta) as types.FunctionNode;
  assertEquals(updated.metadata, meta);
  assertEquals(func.metadata, undefined);
});

test('withMeta(): should throw error if not given exactly 2 arguments', () => {
  assertThrows(
    () => core.withMeta(),
    Error,
    'Wanted 2 arguments but got 0',
  );
});

test("withMeta(): should throw if first argument isn't MetadataType", () => {
  assertThrows(
    () =>
      core.withMeta(
        types.createNumberNode(42),
        types.createMapNode(
          new Map([['b', types.createNumberNode(1)]]),
        ),
      ),
    Error,
    'Invalid metadata type',
  );
});

test('isNil(): should return true if argument is a NilNode', () => {
  assertEquals(
    core.isNil(types.createNilNode()),
    types.createBooleanNode(true),
  );
});

test('isNil(): should return false if argument is not a NilNode', () => {
  assertEquals(
    core.isNil(types.createBooleanNode(true)),
    types.createBooleanNode(false),
  );
});

test('isTrue(): should return true for a true value', () => {
  assertEquals(
    core.isTrue(types.createBooleanNode(true)),
    types.createBooleanNode(true),
  );
});

test('isTrue(): should return false for a false value', () => {
  assertEquals(
    core.isTrue(types.createBooleanNode(false)),
    types.createBooleanNode(false),
  );
});

test('isFalse(): should return true for a false value', () => {
  assertEquals(
    core.isFalse(types.createBooleanNode(false)),
    types.createBooleanNode(true),
  );
});

test('isFalse(): should return false for a true value', () => {
  assertEquals(
    core.isFalse(types.createBooleanNode(true)),
    types.createBooleanNode(false),
  );
});

test('isString(): should return true if argument is a StringNode', () => {
  assertEquals(
    core.isString(types.createStringNode('foobar')),
    types.createBooleanNode(true),
  );
});

test('isString(): should return false if argument is not a StringNode', () => {
  assertEquals(
    core.isString(types.createBooleanNode(true)),
    types.createBooleanNode(false),
  );
});

test('symbol(): should create symbol from a string', () => {
  const result = core.symbol(types.createStringNode('abc'));
  assertEquals(types.isSymbolNode(result), true);
});

test('isSymbol(): should return true if argument is a SymbolNode', () => {
  assertEquals(
    types.isSymbolNode(types.createSymbolNode('abc')),
    true,
  );
});

test('isSymbol(): should return false if argument is not a SymbolNode', () => {
  assertEquals(
    types.isSymbolNode(types.createStringNode('abc')),
    false,
  );
});

test('keyword(): should create keyword from a string', () => {
  const result = core.keyword(types.createStringNode('pie'));
  assertInstanceOf(result, types.KeywordNode);
  assertEquals(result.value, 'pie:');
});

test('keyword(): should create new keyword from a symbol', () => {
  const result = core.keyword(types.createSymbolNode('cake'));
  assertInstanceOf(result, types.KeywordNode);
  assertEquals(result.value, 'cake:');
});

test('keyword(): should return an existing keyword', () => {
  const key = types.createKeywordNode('cookies');
  const result = core.keyword(key);
  assertStrictEquals(result, key);
});

test('isKeyword(): should return true if argument is a KeywordNode', () => {
  assertEquals(
    core.isKeyword(types.createKeywordNode('abc')),
    types.createBooleanNode(true),
  );
});

test('isKeyword(): should return false if argument is not a KeywordNode', () => {
  assertEquals(
    core.isKeyword(types.createSymbolNode('abc')),
    types.createBooleanNode(false),
  );
});

test('isNumber(): should return true if argument is a NumberNode', () => {
  assertEquals(
    core.isNumber(types.createNumberNode(2)),
    types.createBooleanNode(true),
  );
});

test('isNumber(): should return false if argument is not a NumberNode', () => {
  assertEquals(
    core.isNumber(types.createStringNode('2')),
    types.createBooleanNode(false),
  );
});

test('isFn(): should return true if argument is a FunctionNode', () => {
  const fn = types.createFunctionNode(() => types.createNilNode());
  fn.isMacro = false;
  assertEquals(core.isFn(fn), types.createBooleanNode(true));
});

test('isFn(): should return false if argument is not a FunctionNode', () => {
  assertEquals(
    core.isFn(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

test('isMacro(): should return true if argument is a macro', () => {
  const fn = types.createFunctionNode(() => types.createNilNode());
  fn.isMacro = true;
  assertEquals(core.isMacro(fn), types.createBooleanNode(true));
});

test('isMacro(): should return false if argument is not a macro', () => {
  assertEquals(
    core.isMacro(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

test('vector(): should create a vector from args', () => {
  assertEquals(
    core.vector(
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

test('isVector(): should return true if argument is a VectorNode', () => {
  assertEquals(
    core.isVector(
      types.createVectorNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    types.createBooleanNode(true),
  );
});

test('isVector(): should return false if argument is not a VectorNode', () => {
  assertEquals(
    core.isVector(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

// Hash-map
test('hashMap(): should create a map from alternating args', () => {
  assertEquals(
    core.hashMap(
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

test('hashMap(): should return an empty map if no arguments are passed', () => {
  assertEquals(core.hashMap(), types.createMapNode());
});

test('isMap(): should return true if argument is a MapNode', () => {
  assertEquals(
    core.isMap(types.createMapNode(new Map([['foo', types.createNumberNode(1)]]))),
    types.createBooleanNode(true),
  );
});

test('isMap(): should return false if argument is not a MapNode', () => {
  assertEquals(
    core.isMap(types.createNumberNode(2)),
    types.createBooleanNode(false),
  );
});

test('assoc(): should merge key/value pairs into a map', () => {
  assertEquals(
    core.assoc(
      core.hashMap(
        types.createStringNode('foo'),
        types.createNumberNode(1),
      ),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
    core.hashMap(
      types.createStringNode('foo'),
      types.createNumberNode(1),
      types.createStringNode('bar'),
      types.createNumberNode(2),
    ),
  );
});

test('dissoc(): should remove elements from a dict', () => {
  assertEquals(
    core.dissoc(
      core.hashMap(
        types.createStringNode('foo'),
        types.createNumberNode(1),
        types.createStringNode('bar'),
        types.createNumberNode(2),
      ),
      types.createStringNode('foo'),
    ),
    core.hashMap(types.createStringNode('bar'), types.createNumberNode(2)),
  );
});

test('get(): should get a value from a map using a key', () => {
  assertEquals(
    core.get(
      core.hashMap(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('bar:'),
    ),
    types.createNumberNode(2),
  );
});

test('get(): should return nil if key does not exist', () => {
  assertEquals(
    core.get(
      core.hashMap(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('baz:'),
    ),
    types.createNilNode(),
  );
});

test('get(): should return nil for invalid maps', () => {
  assertEquals(
    core.get(types.createStringNode('sharks'), types.createKeywordNode('surfers')),
    types.createNilNode(),
  );
});

test('contains(): should return true if key exists', () => {
  assertEquals(
    core.contains(
      core.hashMap(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('bar:'),
    ),
    types.createBooleanNode(true),
  );
});

test('contains(): should return false if key does not exist', () => {
  assertEquals(
    core.contains(
      core.hashMap(
        types.createKeywordNode('foo:'),
        types.createNumberNode(1),
        types.createKeywordNode('bar:'),
        types.createNumberNode(2),
      ),
      types.createKeywordNode('baz:'),
    ),
    types.createBooleanNode(false),
  );
});

test('keys(): should return a list of all keys in the map', () => {
  assertEquals(
    core.keys(core.hashMap(
      types.createKeywordNode('foo:'),
      types.createNumberNode(1),
      types.createKeywordNode('bar:'),
      types.createNumberNode(2),
    )),
    types.createListNode([
      types.createKeywordNode('foo:'),
      types.createKeywordNode('bar:'),
    ]),
  );
});

test('vals(): should return a list of all values in the map', () => {
  assertEquals(
    core.vals(core.hashMap(
      types.createKeywordNode('foo:'),
      types.createNumberNode(1),
      types.createKeywordNode('bar:'),
      types.createNumberNode(2),
    )),
    types.createListNode([
      types.createNumberNode(1),
      types.createNumberNode(2),
    ]),
  );
});

test('isSequential(): should return true for lists', () => {
  assertEquals(
    types.isSequentialNode(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createNumberNode(3),
      ]),
    ),
    true,
  );
});

test('isSequential(): should return true for vectors', () => {
  assertEquals(
    types.isSequentialNode(
      types.createVectorNode([
        types.createNumberNode(4),
        types.createNumberNode(5),
        types.createNumberNode(6),
      ]),
    ),
    true,
  );
});

test('isSequential(): should return false for non-sequential nodes', () => {
  assertEquals(types.isSequentialNode(types.createNumberNode(42)), false);
});

test('join(): should concatenate elements with the default delimiter (spaces)', () => {
  assertEquals(
    core.join(
      types.createListNode([
        types.createNumberNode(1),
        types.createNumberNode(2),
        types.createStringNode('three'),
      ]),
    ),
    types.createStringNode('1 2 three'),
  );
});

test('join(): should concatenate elements with the given delimiter', () => {
  assertEquals(
    core.join(
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
