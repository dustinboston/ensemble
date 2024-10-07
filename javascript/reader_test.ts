/**
 * Tests for the reader module.
 * Mostly copied from `step1_read_print.mal`.
 * @file
 */

import { assertEquals, assertThrows } from '@std/assert';
import { printString } from './printer.ts';
import { readAtom, Reader, readForm, readSequence, readString, tokenize, unescapeString } from './reader.ts';
import {
  assertDefined,
  createBooleanNode,
  createKeywordNode,
  createListNode,
  createMapNode,
  createNilNode,
  createNumberNode,
  createStringNode,
  createSymbolNode,
  createVectorNode,
} from './types.ts';

Deno.test('tokenize(): empty string as last token for valid input', () => {
  assertEquals(tokenize('+'), ['+']);
});

Deno.test('tokenize(): empty string as last token for invalid input', () => {
  assertEquals(tokenize('"bad'), ['"bad']);
});

Deno.test('tokenize(): empty string as last token for lonely quotes', () => {
  assertEquals(tokenize('`'), ['`']);
});

Deno.test('tokenize(): should tokenize after comments', () => {
  assertEquals(tokenize(';; comment\n(+ 1 2)'), [
    '(',
    '+',
    '1',
    '2',
    ')',
  ]);
});

Deno.test('tokenize(): vector with nested list', () => {
  assertEquals(tokenize('[1 2 (+ 1 2)]'), [
    '[',
    '1',
    '2',
    '(',
    '+',
    '1',
    '2',
    ')',
    ']',
  ]);
});

Deno.test('tokenize(): map with nested list', () => {
  assertEquals(tokenize('{"a" (+ 7 8)}'), [
    '{',
    '"a"',
    '(',
    '+',
    '7',
    '8',
    ')',
    '}',
  ]);
});

Deno.test('tokenize(): should tokenize complex nested expressions', () => {
  assertEquals(
    tokenize('(/ (- (+ 515 (* -87 311)) 296) 27)'),
    [
      '(',
      '/',
      '(',
      '-',
      '(',
      '+',
      '515',
      '(',
      '*',
      '-87',
      '311',
      ')',
      ')',
      '296',
      ')',
      '27',
      ')',
    ],
  );
});

Deno.test('tokenize(): should tokenize strings with special characters', () => {
  assertEquals(tokenize('"string with space"'), [
    '"string with space"',
  ]);
});

Deno.test('tokenize(): should tokenize strings with escaped quotes', () => {
  assertEquals(tokenize('"string with \\"escaped\\" quotes"'), [
    '"string with \\"escaped\\" quotes"',
  ]);
});

Deno.test('tokenize(): should tokenize double characters', () => {
  assertEquals(tokenize('~@'), ['~@']);
});

Deno.test('tokenize(): should tokenize special characters', () => {
  assertEquals(tokenize('`'), ['`']);
});

Deno.test('tokenize(): should tokenize lonely quotes', () => {
  assertEquals(tokenize("'"), ["'"]);
});

Deno.test('tokenize(): should filter out comments', () => {
  assertEquals(
    tokenize(';; single line\n(+ 1 2)'),
    ['(', '+', '1', '2', ')'],
  );
});

Deno.test('tokenize(): should filter out trailing comments', () => {
  assertEquals(
    tokenize('(+ 1 2) ;; trailing'),
    ['(', '+', '1', '2', ')'],
  );
});

Deno.test('Reader: should navigate through tokens using next method', () => {
  const rdr = new Reader(['(', '+', '1', '2', ')']);

  assertEquals(rdr.next(), '(');
  assertEquals(rdr.next(), '+');
  assertEquals(rdr.next(), '1');
  assertEquals(rdr.next(), '2');
  assertEquals(rdr.next(), ')');
});

Deno.test('Reader: should return undefined when there are no more tokens', () => {
  const rdr = new Reader(['(', '2', ')']);

  assertEquals(rdr.next(), '(');
  assertEquals(rdr.next(), '2');
  assertEquals(rdr.next(), ')');
  assertEquals(rdr.next(), undefined);
});

Deno.test('Reader: should peek at the current token without advancing', () => {
  const rdr = new Reader(['(', '+', '1', '2', ')']);
  assertEquals(rdr.peek(), '(');
  assertEquals(rdr.next(), '(');
  assertEquals(rdr.peek(), '+');
  assertEquals(rdr.next(), '+');
  assertEquals(rdr.peek(), '1');
});

Deno.test('Reader: should not have the ability to peek at the previous token', () => {
  const rdr = new Reader(['(', '+', ')']);

  assertEquals(rdr.next(), '(');
  assertEquals(rdr.next(), '+');
  assertEquals(rdr.next(), ')');
  assertEquals(rdr.next(), undefined); // Moves out-of-bounds
});

Deno.test('Reader: should check if it is the last token', () => {
  const rdr = new Reader(['(', '1', '2', ')']);
  assertDefined(rdr.peek());
  assertEquals(rdr.next(), '(');
  assertEquals(rdr.next(), '1');
  assertEquals(rdr.next(), '2');
  assertDefined(rdr.peek());
  assertEquals(rdr.next(), ')');
  assertEquals(rdr.peek(), undefined);
});

Deno.test('Reader: should handle empty tokens array', () => {
  const rdr = new Reader([]);
  assertEquals(rdr.peek(), undefined);
  assertEquals(rdr.next(), undefined); // Out of bounds
});

Deno.test('readForm(): should throw EOF for undefined token', () => {
  const rdr = new Reader([]);
  assertThrows(() => readForm(rdr), Error, 'EOF');
});

Deno.test("readForm(): should read and return a 'quote' form", () => {
  const rdr = new Reader(["'", 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('quote'),
      createSymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'quasiquote' form", () => {
  const rdr = new Reader(['`', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('quasiquote'),
      createSymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return an 'unquote' form", () => {
  const rdr = new Reader(['~', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('unquote'),
      createSymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'splice-unquote' form", () => {
  const rdr = new Reader(['~@', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('splice-unquote'),
      createSymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'with-meta' form", () => {
  const rdr = new Reader(['^', 'meta', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('with-meta'),
      createSymbolNode('symbol'),
      createSymbolNode('meta'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'deref' form", () => {
  const rdr = new Reader(['@', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('deref'),
      createSymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should throw for lonely quote (')", () => {
  const rdr = new Reader(["'"]);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    `EOF`,
  );
});

Deno.test('readForm(): should throw for lonely quasiquote (`)', () => {
  const rdr = new Reader(['`']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    'EOF',
  );
});

Deno.test('readForm(): should throw for lonely unquote (~)', () => {
  const rdr = new Reader(['~']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    `EOF`,
  );
});

Deno.test('readForm(): should throw for lonely splice-unquote (~@)', () => {
  const rdr = new Reader(['~@']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    `EOF`,
  );
});

Deno.test('readForm(): should throw for lonely with-meta (^)', () => {
  const rdr = new Reader(['^']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    `EOF`,
  );
});

Deno.test('readForm(): should throw for lonely deref (@)', () => {
  const rdr = new Reader(['@']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    `EOF`,
  );
});

Deno.test("readForm(): should throw error for unexpected ')'", () => {
  const rdr = new Reader([')']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    "unexpected ')'",
  );
});

Deno.test("readForm(): should throw error for unexpected ']'", () => {
  const rdr = new Reader([']']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    "unexpected ']'",
  );
});

Deno.test("readForm(): should throw error for unexpected '}'", () => {
  const rdr = new Reader(['}']);
  assertThrows(
    () => {
      readForm(rdr);
    },
    Error,
    "unexpected '}'",
  );
});

Deno.test("readForm(): should read and return a List for '('", () => {
  const rdr = new Reader([
    '(',
    'symbol1',
    'symbol2',
    ')',
    '',
  ]);
  const result = readForm(rdr);
  assertEquals(
    result,
    createListNode([
      createSymbolNode('symbol1'),
      createSymbolNode('symbol2'),
    ]),
  );
});

Deno.test("readForm(): should read and return a Vec for '['", () => {
  const rdr = new Reader([
    '[',
    'symbol1',
    'symbol2',
    ']',
    '',
  ]);
  const result = readForm(rdr);
  assertEquals(
    result,
    createVectorNode([
      createSymbolNode('symbol1'),
      createSymbolNode('symbol2'),
    ]),
  );
});

Deno.test("readForm(): should read and return a map for '{'", () => {
  const rdr = new Reader([
    '{',
    'key1',
    'value1',
    'key2',
    'value2',
    '}',
    '',
  ]);
  const result = readForm(rdr);
  const map = createMapNode();
  map.value.set('key1', createSymbolNode('value1'));
  map.value.set('key2', createSymbolNode('value2'));
  assertEquals(result, map);
});

Deno.test('readForm(): should read a symbol', () => {
  const rdr = new Reader(['symbol']);
  const result = readForm(rdr);
  assertEquals(result, createSymbolNode('symbol'));
});

Deno.test('readAtom(): should throw "unexpected EOF" error for undefined token', () => {
  const rdr = new Reader([]);
  assertThrows(() => readAtom(rdr), Error, 'unexpected EOF');
});

Deno.test('readAtom(): should return nil type for "nil" token', () => {
  const rdr = new Reader(['nil']);
  const result = readAtom(rdr);
  assertEquals(result, createNilNode());
});

Deno.test('readAtom(): should return boolean type false for "false" token', () => {
  const rdr = new Reader(['false']);
  const result = readAtom(rdr);
  assertEquals(result, createBooleanNode(false));
});

Deno.test('readAtom(): should return boolean type true for "true" token', () => {
  const rdr = new Reader(['true']);
  const result = readAtom(rdr);
  assertEquals(result, createBooleanNode(true));
});

Deno.test('readAtom(): should return number type for number token', () => {
  const rdr = new Reader(['123']);
  const result = readAtom(rdr);
  assertEquals(result, createNumberNode(123));
});

Deno.test('readAtom(): should return string type for string token', () => {
  const rdr = new Reader(['"hello"']);
  const result = readAtom(rdr);
  assertEquals(result, createStringNode('hello'));
});

Deno.test('readAtom(): should return keyword type for keyword token', () => {
  const rdr = new Reader([':keyword']);
  const result = readAtom(rdr);
  assertEquals(result, createKeywordNode(':keyword'));
});

Deno.test('readAtom(): should throw error for unfinished string token', () => {
  const rdr = new Reader(['"unfinished']);
  assertThrows(() => readAtom(rdr), Error, "expected '\"', got EOF");
});

Deno.test('readAtom(): should return symbol type for symbol token', () => {
  const rdr = new Reader(['symbol']);
  const result = readAtom(rdr);
  assertEquals(result, createSymbolNode('symbol'));
});

Deno.test('unescapeString(): should remove leading and trailing quotes', () => {
  assertEquals(unescapeString('"hello world"'), 'hello world');
});

Deno.test('unescapeString(): should replace \\n with newline character', () => {
  assertEquals(unescapeString('"hello\\nworld"'), 'hello\nworld');
});

Deno.test('unescapeString(): should unescape escaped quotes', () => {
  assertEquals(unescapeString('"hello\\"world"'), 'hello"world');
});

Deno.test('unescapeString(): should unescape escaped backslashes', () => {
  assertEquals(unescapeString('"hello\\\\world"'), 'hello\\world');
});

Deno.test('unescapeString(): should handle empty strings', () => {
  assertEquals(unescapeString(''), '');
});

Deno.test('unescapeString(): should handle strings with only escaped characters', () => {
  assertEquals(unescapeString('"\\\\\\"\\""'), '\\""');
});

Deno.test('unescapeString(): should return original string if no escapable chars are found', () => {
  assertEquals(unescapeString('"abc123"'), 'abc123');
});

Deno.test('unescapeString(): should handle multiple escaped characters in sequence', () => {
  assertEquals(unescapeString('"\\\\\\n\\\\"'), '\\\n\\');
});

Deno.test('unescapeString(): should handle strings with various escaped characters', () => {
  assertEquals(
    unescapeString('"hello\\\\world\\"foo\\nbar"'),
    'hello\\world"foo\nbar',
  );
});

Deno.test('readSequence(): should parse a list with one element', () => {
  const rdr = new Reader(['(', '1', ')']);
  assertEquals(
    readSequence(rdr, ')'),
    createListNode([createNumberNode(1)]),
  );
});

Deno.test('readSequence(): should parse a list with multiple elements', () => {
  const rdr = new Reader(['(', '1', '2', '3', ')']);
  assertEquals(
    readSequence(rdr, ')'),
    createListNode([
      createNumberNode(1),
      createNumberNode(2),
      createNumberNode(3),
    ]),
  );
});

Deno.test('readSequence(): should parse a vector with one element', () => {
  const rdr = new Reader(['[', '1', ']']);
  assertEquals(
    readSequence(rdr, ']'),
    createVectorNode([createNumberNode(1)]),
  );
});

Deno.test('readSequence(): should parse a vector with multiple elements', () => {
  const rdr = new Reader(['[', '1', '2', '3', ']']);
  assertEquals(
    readSequence(rdr, ']'),
    createVectorNode([
      createNumberNode(1),
      createNumberNode(2),
      createNumberNode(3),
    ]),
  );
});

Deno.test('readSequence(): should parse a map with one key-value pair', () => {
  const rdr = new Reader(['{', ':key', '1', '}']);
  assertEquals(
    readSequence(rdr, '}'),
    createMapNode(new Map([[':key', createNumberNode(1)]])),
  );
});

Deno.test('readSequence(): should parse a map with multiple key-value pairs', () => {
  const rdr = new Reader(['{', ':key1', '1', ':key2', '2', '}']);
  assertEquals(
    readSequence(rdr, '}'),
    createMapNode(
      new Map([
        [':key1', createNumberNode(1)],
        [':key2', createNumberNode(2)],
      ]),
    ),
  );
});

Deno.test('readSequence(): should throw error for unexpected EOF while reading a sequence', () => {
  const rdr = new Reader(['(', '1']);
  assertThrows(() => {
    const result = readSequence(rdr, ')');
    console.log(`Should be an EOF, but got ${JSON.stringify(result)}`);
  });
});

Deno.test('readSequence(): should throw error for unknown end value', () => {
  const rdr = new Reader(['<', '1', '>']);
  assertThrows(() => readSequence(rdr, '>'));
});

Deno.test('readString(): Testing read of numbers', () => {
  assertEquals(readString('1'), createNumberNode(1));
  assertEquals(readString('7'), createNumberNode(7));
});

Deno.test('readString(): Testing read of whitespace', () => {
  assertEquals(readString('  7   '), createNumberNode(7));
  assertEquals(readString('-123'), createNumberNode(-123));
});

Deno.test('readString(): Testing read of symbols', () => {
  assertEquals(readString('+'), createSymbolNode('+'));
});

Deno.test('readString(): multi-character symbols', () => {
  assertEquals(readString('abc'), createSymbolNode('abc'));
});

Deno.test('readString(): whitespace with multi-character symbols', () => {
  assertEquals(readString('   abc   '), createSymbolNode('abc'));
});

Deno.test('readString(): symbols with numbers', () => {
  assertEquals(readString('abc5'), createSymbolNode('abc5'));
});

Deno.test('readString(): symbols with dashes', () => {
  assertEquals(readString('abc-def'), createSymbolNode('abc-def'));
});

Deno.test('readString(): lonely dash', () => {
  assertEquals(readString('-'), createSymbolNode('-'));
});

Deno.test('readString(): symbol with leading dash', () => {
  assertEquals(readString('-abc'), createSymbolNode('-abc'));
});

// TODO: Resolve double character bug, especially for >> since  dom nodes will trigger this frequently.

// Deno.test('readString(): symbol of special characters', () => {
//   assertEquals(readString('->>'), createSymbolNode('->>'));
// });

// Deno.test('readString(): symbol with double parens', () => {
//   assertEquals(readString('(-))'), createSymbolNode('(-))'));
// });

// Deno.test('readString(): symbol with double brackets', () => {
//   assertEquals(readString('-]]'), createSymbolNode('-]]'));
// });

// Deno.test('readString(): symbol with double braces', () => {
//   assertEquals(readString('-}}'), createSymbolNode('-}}'));
// });

Deno.test('readString(): basic list', () => {
  assertEquals(
    readString('(+ 1 2)'),
    createListNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createNumberNode(2),
    ]),
  );
});

Deno.test('readString(): empty list', () => {
  assertEquals(readString('()'), createListNode([]));
});

Deno.test('readString(): empty list with whitespace', () => {
  assertEquals(readString('( )'), createListNode([]));
});

Deno.test('readString(): list with nil', () => {
  assertEquals(readString('(nil)'), createListNode([createNilNode()]));
});

Deno.test('readString(): nested lists', () => {
  assertEquals(
    readString('((3 4))'),
    createListNode([
      createListNode([
        createNumberNode(3),
        createNumberNode(4),
      ]),
    ]),
  );
});

Deno.test('readString(): Nested lists with symbols', () => {
  assertEquals(
    readString('(+ 1 (+ 2 3))'),
    createListNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createListNode([
        createSymbolNode('+'),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): Nested lists with whitespace', () => {
  assertEquals(
    readString('  ( +   1   (+   2 3   )   )  '),
    createListNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createListNode([
        createSymbolNode('+'),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): List with multiply symbol', () => {
  assertEquals(
    readString('(* 1 2)'),
    createListNode([
      createSymbolNode('*'),
      createNumberNode(1),
      createNumberNode(2),
    ]),
  );
});

Deno.test('readString(): List with power symbol', () => {
  assertEquals(
    readString('(** 1 2)'),
    createListNode([
      createSymbolNode('**'),
      createNumberNode(1),
      createNumberNode(2),
    ]),
  );
});

Deno.test('readString(): List with a negative number', () => {
  assertEquals(
    readString('(* -3 6)'),
    createListNode([
      createSymbolNode('*'),
      createNumberNode(-3),
      createNumberNode(6),
    ]),
  );
});

Deno.test('readString(): List with nested empty lists', () => {
  assertEquals(
    readString('(()())'),
    createListNode([
      createListNode([]),
      createListNode([]),
    ]),
  );
});

Deno.test('readString(): commas as whitespace', () => {
  assertEquals(
    readString('(1 2, 3,,,,),,'),
    createListNode([
      createNumberNode(1),
      createNumberNode(2),
      createNumberNode(3),
    ]),
  );
});

Deno.test('readString(): read of nil', () => {
  assertEquals(readString('nil'), createNilNode());
});

Deno.test('readString(): read of true', () => {
  assertEquals(readString('true'), createBooleanNode(true));
});

Deno.test('readString(): read of false', () => {
  assertEquals(readString('false'), createBooleanNode(false));
});

Deno.test('readString(): double-quoted basic string', () => {
  assertEquals(readString('"abc"'), createStringNode('abc'));
});

Deno.test('readString(): double-quoted string with whitespace', () => {
  assertEquals(readString('   "abc"   "'), createStringNode('abc'));
});

Deno.test('readString(): double-quoted string with parens', () => {
  assertEquals(
    readString('"abc (with parens)"'),
    createStringNode('abc (with parens)'),
  );
});

Deno.test('readString(): double-quoted string with escapes', () => {
  assertEquals(readString('"abc\\"def"'), createStringNode('abc"def'));
});

Deno.test('readString(): empty double-quoted string', () => {
  assertEquals(readString('""'), createStringNode(''));
});

Deno.test('readString(): double-quoted string with two backslashes', () => {
  assertEquals(readString('"\\\\"'), createStringNode('\\'));
});

Deno.test('readString(): double-quoted string with a lot of backslashes', () => {
  assertEquals(
    readString('"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"'),
    createStringNode('\\\\\\\\\\\\\\\\\\'),
  );
});

Deno.test('readString(): double-quoted string with ampersand', () => {
  assertEquals(readString('"&"'), createStringNode('&'));
});

Deno.test('readString(): double-quoted string with single quote', () => {
  assertEquals(readString(`"'"`), createStringNode("'"));
});

Deno.test('readString(): double-quoted string with left paren', () => {
  assertEquals(readString('"("'), createStringNode('('));
});

Deno.test('readString(): double-quoted string with right paren', () => {
  assertEquals(readString('")"'), createStringNode(')'));
});

Deno.test('readString(): double-quoted string with asterisk', () => {
  assertEquals(readString('"*"'), createStringNode('*'));
});

Deno.test('readString(): double-quoted string with plus', () => {
  assertEquals(readString('"+"'), createStringNode('+'));
});

Deno.test('readString(): double-quoted string with comma', () => {
  assertEquals(readString('","'), createStringNode(','));
});

Deno.test('readString(): double-quoted string with dash', () => {
  assertEquals(readString('"-"'), createStringNode('-'));
});

Deno.test('readString(): double-quoted string with slash', () => {
  assertEquals(readString('"/"'), createStringNode('/'));
});

Deno.test('readString(): double-quoted string with colon', () => {
  assertEquals(readString('":"'), createStringNode(':'));
});

Deno.test('readString(): double-quoted string with semicolon', () => {
  assertEquals(readString('";"'), createStringNode(';'));
});

Deno.test('readString(): double-quoted string less than', () => {
  assertEquals(readString('"<"'), createStringNode('<'));
});

Deno.test('readString(): double-quoted string with equal', () => {
  assertEquals(readString('"="'), createStringNode('='));
});

Deno.test('readString(): double-quoted string with greater than', () => {
  assertEquals(readString('">"'), createStringNode('>'));
});

Deno.test('readString(): double-quoted string with  question mark', () => {
  assertEquals(readString('"?"'), createStringNode('?'));
});

Deno.test('readString(): double-quoted string with at sign', () => {
  assertEquals(readString('"@"'), createStringNode('@'));
});

Deno.test('readString(): double-quoted string with left bracket', () => {
  assertEquals(readString('"["'), createStringNode('['));
});

Deno.test('readString(): double-quoted string with right bracket', () => {
  assertEquals(readString('"]"'), createStringNode(']'));
});

Deno.test('readString(): double-quoted string with caret', () => {
  assertEquals(readString('"^"'), createStringNode('^'));
});

Deno.test('readString(): double-quoted string with underscore', () => {
  assertEquals(readString('"_"'), createStringNode('_'));
});

Deno.test('readString(): double-quoted string with backtick', () => {
  assertEquals(readString('"`"'), createStringNode('`'));
});

Deno.test('readString(): double-quoted string with left brace', () => {
  assertEquals(readString('"{"'), createStringNode('{'));
});

Deno.test('readString(): double-quoted string with right brace', () => {
  assertEquals(readString('"}"'), createStringNode('}'));
});

Deno.test('readString(): double-quoted string with tilde', () => {
  assertEquals(readString('"~"'), createStringNode('~'));
});

Deno.test('readString(): double-quoted string with exclamation mark', () => {
  assertEquals(readString('"!"'), createStringNode('!'));
});

Deno.test('readString(): read of ^/metadata', () => {
  assertEquals(
    readString('^{"a" 1} [1 2 3]'),
    createListNode([
      createSymbolNode('with-meta'),
      createVectorNode([
        createNumberNode(1),
        createNumberNode(2),
        createNumberNode(3),
      ]),
      createMapNode(
        new Map([
          ['"a"', createNumberNode(1)],
        ]),
      ),
    ]),
  );
});

// Non alphanumerice characters in strings
Deno.test('readString(): new line in string', () => {
  assertEquals(readString('"\n"'), createStringNode('\n'));
});

Deno.test('readString(): double-quoted string with pound sign', () => {
  assertEquals(readString('"#"'), createStringNode('#'));
});

Deno.test('readString(): double-quoted string with dollar sign', () => {
  assertEquals(readString('"$"'), createStringNode('$'));
});

Deno.test('readString(): double-quoted string with percent sign', () => {
  assertEquals(readString('"%"'), createStringNode('%'));
});

Deno.test('readString(): double-quoted string with period', () => {
  assertEquals(readString('"."'), createStringNode('.'));
});

Deno.test('readString(): double-quoted string with escaped backslash', () => {
  assertEquals(readString('"\\\\"'), createStringNode('\\'));
});

Deno.test('readString(): double-quoted string with pipe', () => {
  assertEquals(readString('"|"'), createStringNode('|'));
});

// Non alphanumeric characters in comments

Deno.test('readString(): comment with exclamation point', () => {
  assertEquals(readString('1;!'), createNumberNode(1));
});

Deno.test('readString(): comment with double-quote', () => {
  assertEquals(readString('1;"'), createNumberNode(1));
});

Deno.test('readString(): comment with pound sign', () => {
  assertEquals(readString('1;#'), createNumberNode(1));
});

Deno.test('readString(): comment with dollar sign', () => {
  assertEquals(readString('1;$'), createNumberNode(1));
});

Deno.test('readString(): comment with percent sign', () => {
  assertEquals(readString('1;%'), createNumberNode(1));
});

Deno.test('readString(): comment with single quote', () => {
  assertEquals(readString("1;'"), createNumberNode(1));
});

Deno.test('readString(): comment with backslash', () => {
  assertEquals(readString('1;\\'), createNumberNode(1));
});

Deno.test('readString(): comment with two backslashes', () => {
  assertEquals(readString('1;\\\\'), createNumberNode(1));
});

Deno.test('readString(): comment with three backslashes', () => {
  assertEquals(readString('1;\\\\\\'), createNumberNode(1));
});

Deno.test('readString(): comment with backtick', () => {
  assertEquals(readString('1;`'), createNumberNode(1));
});

Deno.test('readString(): comment with a bunch of other non-alphanumeric characters', () => {
  assertEquals(readString('1; &()*+,-./:;<=>?@[]^_{|}~'), createNumberNode(1));
});

Deno.test('readString(): error due to missing end paren', () => {
  assertThrows(() => readString('(1 2'), Error, 'EOF');
});

Deno.test('readString(): error due to missing end bracket', () => {
  assertThrows(() => readString('[1 2'), Error, 'EOF');
});

Deno.test('readString(): error due to missing end double-quote', () => {
  assertThrows(() => readString('"abc'), Error, 'EOF');
});

Deno.test('readString(): error due to unbalanced quotes', () => {
  assertThrows(() => readString('"'), Error, 'EOF');
});

Deno.test('readString(): error due to unbalanced escaped quote', () => {
  assertThrows(() => readString('"\\"'), Error, 'EOF');
});

Deno.test('readString(): error due to backslash key getting stuck', () => {
  assertThrows(
    () => readString('"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"'),
    Error,
    'EOF',
  );
  assertThrows(() => readString('(1 "abc'), Error, 'EOF');
});

Deno.test('readString(): error due to missing paren after double-quotes', () => {
  assertThrows(
    () => {
      const result = readString('(1 "abc"');
      console.log(printString(result, true));
    },
    Error,
    'EOF',
  );
});

Deno.test('readString(): quote special form', () => {
  assertEquals(
    readString("'1"),
    createListNode([
      createSymbolNode('quote'),
      createNumberNode(1),
    ]),
  );
});

Deno.test('readString(): quote special form with list', () => {
  assertEquals(
    readString("'(1 2 3)"),
    createListNode([
      createSymbolNode('quote'),
      createListNode([
        createNumberNode(1),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): quasiquote special form', () => {
  assertEquals(
    readString('`1'),
    createListNode([
      createSymbolNode('quasiquote'),
      createNumberNode(1),
    ]),
  );
});

Deno.test('readString(): quasiquote special form with list', () => {
  assertEquals(
    readString('`(1 2 3)'),
    createListNode([
      createSymbolNode('quasiquote'),
      createListNode([
        createNumberNode(1),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): unquote special form', () => {
  assertEquals(
    readString('~1'),
    createListNode([
      createSymbolNode('unquote'),
      createNumberNode(1),
    ]),
  );
});

Deno.test('readString(): unquote special form with list', () => {
  assertEquals(
    readString('~(1 2 3)'),
    createListNode([
      createSymbolNode('unquote'),
      createListNode([
        createNumberNode(1),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): quasiquote special form with unquote', () => {
  assertEquals(
    readString('`(1 ~a 3)'),
    createListNode([
      createSymbolNode('quasiquote'),
      createListNode([
        createNumberNode(1),
        createListNode([
          createSymbolNode('unquote'),
          createSymbolNode('a'),
        ]),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): splice-unquote special form with list', () => {
  assertEquals(
    readString('~@(1 2 3)'),
    createListNode([
      createSymbolNode('splice-unquote'),
      createListNode([
        createNumberNode(1),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): single keyword', () => {
  assertEquals(readString(':kw'), createKeywordNode(':kw'));
});

Deno.test('readString(): keywords in list', () => {
  assertEquals(
    readString('(:kw1 :kw2 :kw3)'),
    createListNode([
      createKeywordNode(':kw1'),
      createKeywordNode(':kw2'),
      createKeywordNode(':kw3'),
    ]),
  );
});

Deno.test('readString(): vector with symbol', () => {
  assertEquals(
    readString('[+ 1 2]'),
    createVectorNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createNumberNode(2),
    ]),
  );
});

Deno.test('readString(): empty vector', () => {
  assertEquals(readString('[]'), createVectorNode([]));
});

Deno.test('readString(): vector with whitespace', () => {
  assertEquals(readString('[  ]'), createVectorNode([]));
});

Deno.test('readString(): nested vector', () => {
  assertEquals(
    readString('[[3 4]]'),
    createVectorNode([
      createVectorNode([
        createNumberNode(3),
        createNumberNode(4),
      ]),
    ]),
  );
});

Deno.test('readString(): nested vector with symbols', () => {
  assertEquals(
    readString('[+ 1 [+ 2 3]]'),
    createVectorNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createVectorNode([
        createSymbolNode('+'),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): nested vector with symbols and whitespace', () => {
  assertEquals(
    readString('  [ +   1   [+   2 3   ]   ]  '),
    createVectorNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createVectorNode([
        createSymbolNode('+'),
        createNumberNode(2),
        createNumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): vector nested in list', () => {
  assertEquals(readString('([])'), createListNode([createVectorNode([])]));
});

Deno.test('readString(): empty map', () => {
  assertEquals(readString('{}'), createMapNode(new Map()));
});

Deno.test('readString(): empty map with whitespace', () => {
  assertEquals(readString('{ }'), createMapNode(new Map()));
});

Deno.test('readString(): map with string key', () => {
  assertEquals(
    readString('{"abc" 1}'),
    createMapNode(
      new Map([
        ['"abc"', createNumberNode(1)],
      ]),
    ),
  );
});

Deno.test('readString(): nested map', () => {
  assertEquals(
    readString('{"a" {"b" 2}}'),
    createMapNode(
      new Map([
        [
          '"a"',
          createMapNode(
            new Map([
              ['"b"', createNumberNode(2)],
            ]),
          ),
        ],
      ]),
    ),
  );
});

Deno.test('readString(): deeply nested map', () => {
  assertEquals(
    readString('{"a" {"b" {"c" 3}}}'),
    createMapNode(
      new Map([
        [
          '"a"',
          createMapNode(
            new Map([
              [
                '"b"',
                createMapNode(
                  new Map([
                    ['"c"', createNumberNode(3)],
                  ]),
                ),
              ],
            ]),
          ),
        ],
      ]),
    ),
  );
});

Deno.test('readString(): deeply nested map with whitespace', () => {
  assertEquals(
    readString('{  "a"  {"b"   {  "cde"     3   }  }}'),
    createMapNode(
      new Map([
        [
          '"a"',
          createMapNode(
            new Map([
              [
                '"b"',
                createMapNode(
                  new Map([
                    ['"cde"', createNumberNode(3)],
                  ]),
                ),
              ],
            ]),
          ),
        ],
      ]),
    ),
  );
});

Deno.test('readString(): a normal map', () => {
  assertEquals(
    readString('{"a1" 1 "a2" 2 "a3" 3}'),
    createMapNode(
      new Map([
        ['"a1"', createNumberNode(1)],
        ['"a2"', createNumberNode(2)],
        ['"a3"', createNumberNode(3)],
      ]),
    ),
  );
});

Deno.test('readString(): a normal map with keywords and whitespace', () => {
  assertEquals(
    readString('{  :a  {:b   {  :cde     3   }  }}'),
    createMapNode(
      new Map([
        [
          ':a',
          createMapNode(
            new Map([
              [
                ':b',
                createMapNode(
                  new Map([
                    [':cde', createNumberNode(3)],
                  ]),
                ),
              ],
            ]),
          ),
        ],
      ]),
    ),
  );
});

Deno.test('readString(): map with potentially tricky key/value pair', () => {
  assertEquals(
    readString('{"1" 1}'),
    createMapNode(
      new Map([
        ['"1"', createNumberNode(1)],
      ]),
    ),
  );
});

Deno.test('readString(): map nested in a list', () => {
  assertEquals(readString('({})'), createListNode([createMapNode(new Map())]));
});

Deno.test('readString(): full line comment with leading whitespace', () => {
  assertEquals(readString(' ; whole line comment'), createNilNode());
});

Deno.test('readString(): comment after expression with whitespace', () => {
  assertEquals(readString('1 ; comment after expression'), createNumberNode(1));
});

Deno.test('readString(): comment after expression without whitespace', () => {
  assertEquals(readString('1; comment after expression'), createNumberNode(1));
});

Deno.test('readString(): Testing read of @/deref', () => {
  assertEquals(
    readString('@a'),
    createListNode([
      createSymbolNode('deref'),
      createSymbolNode('a'),
    ]),
  );
});
