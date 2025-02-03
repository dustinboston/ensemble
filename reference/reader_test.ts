/**
 * Tests for the reader module.
 * Mostly copied from `step1_read_print.mal`.
 * @file
 */

import { assertEquals, assertThrows } from '@std/assert';
import { readAtom, Reader, readForm, readSequence, readString, tokenize, unescapeString } from './reader.ts';
import {
  assertDefined,
  BooleanNode,
  KeywordNode,
  ListNode,
  MapNode,
  NilNode,
  NumberNode,
  StringNode,
  SymbolNode,
  VectorNode,
} from './types.ts';
import { printString } from './printer.ts';

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
    new ListNode([
      new SymbolNode('quote'),
      new SymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'quasiquote' form", () => {
  const rdr = new Reader(['`', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    new ListNode([
      new SymbolNode('quasiquote'),
      new SymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return an 'unquote' form", () => {
  const rdr = new Reader(['~', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    new ListNode([
      new SymbolNode('unquote'),
      new SymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'splice-unquote' form", () => {
  const rdr = new Reader(['~@', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    new ListNode([
      new SymbolNode('splice-unquote'),
      new SymbolNode('symbol'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'with-meta' form", () => {
  const rdr = new Reader(['^', 'meta', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    new ListNode([
      new SymbolNode('with-meta'),
      new SymbolNode('symbol'),
      new SymbolNode('meta'),
    ]),
  );
});

Deno.test("readForm(): should read and return a 'deref' form", () => {
  const rdr = new Reader(['@', 'symbol']);
  const result = readForm(rdr);
  assertEquals(
    result,
    new ListNode([
      new SymbolNode('deref'),
      new SymbolNode('symbol'),
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
    new ListNode([
      new SymbolNode('symbol1'),
      new SymbolNode('symbol2'),
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
    new VectorNode([
      new SymbolNode('symbol1'),
      new SymbolNode('symbol2'),
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
  const map = new MapNode();
  map.value.set('key1', new SymbolNode('value1'));
  map.value.set('key2', new SymbolNode('value2'));
  assertEquals(result, map);
});

Deno.test('readForm(): should read a symbol', () => {
  const rdr = new Reader(['symbol']);
  const result = readForm(rdr);
  assertEquals(result, new SymbolNode('symbol'));
});

Deno.test('readAtom(): should throw "unexpected EOF" error for undefined token', () => {
  const rdr = new Reader([]);
  assertThrows(() => readAtom(rdr), Error, 'unexpected EOF');
});

Deno.test('readAtom(): should return nil type for "nil" token', () => {
  const rdr = new Reader(['nil']);
  const result = readAtom(rdr);
  assertEquals(result, new NilNode());
});

Deno.test('readAtom(): should return boolean type false for "false" token', () => {
  const rdr = new Reader(['false']);
  const result = readAtom(rdr);
  assertEquals(result, new BooleanNode(false));
});

Deno.test('readAtom(): should return boolean type true for "true" token', () => {
  const rdr = new Reader(['true']);
  const result = readAtom(rdr);
  assertEquals(result, new BooleanNode(true));
});

Deno.test('readAtom(): should return number type for number token', () => {
  const rdr = new Reader(['123']);
  const result = readAtom(rdr);
  assertEquals(result, new NumberNode(123));
});

Deno.test('readAtom(): should return string type for string token', () => {
  const rdr = new Reader(['"hello"']);
  const result = readAtom(rdr);
  assertEquals(result, new StringNode('hello'));
});

Deno.test('readAtom(): should return keyword type for keyword token', () => {
  const rdr = new Reader([':keyword']);
  const result = readAtom(rdr);
  assertEquals(result, new KeywordNode(':keyword'));
});

Deno.test('readAtom(): should throw error for unfinished string token', () => {
  const rdr = new Reader(['"unfinished']);
  assertThrows(() => readAtom(rdr), Error, "expected '\"', got EOF");
});

Deno.test('readAtom(): should return symbol type for symbol token', () => {
  const rdr = new Reader(['symbol']);
  const result = readAtom(rdr);
  assertEquals(result, new SymbolNode('symbol'));
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
    new ListNode([new NumberNode(1)]),
  );
});

Deno.test('readSequence(): should parse a list with multiple elements', () => {
  const rdr = new Reader(['(', '1', '2', '3', ')']);
  assertEquals(
    readSequence(rdr, ')'),
    new ListNode([
      new NumberNode(1),
      new NumberNode(2),
      new NumberNode(3),
    ]),
  );
});

Deno.test('readSequence(): should parse a vector with one element', () => {
  const rdr = new Reader(['[', '1', ']']);
  assertEquals(
    readSequence(rdr, ']'),
    new VectorNode([new NumberNode(1)]),
  );
});

Deno.test('readSequence(): should parse a vector with multiple elements', () => {
  const rdr = new Reader(['[', '1', '2', '3', ']']);
  assertEquals(
    readSequence(rdr, ']'),
    new VectorNode([
      new NumberNode(1),
      new NumberNode(2),
      new NumberNode(3),
    ]),
  );
});

Deno.test('readSequence(): should parse a map with one key-value pair', () => {
  const rdr = new Reader(['{', ':key', '1', '}']);
  assertEquals(
    readSequence(rdr, '}'),
    new MapNode(new Map([[':key', new NumberNode(1)]])),
  );
});

Deno.test('readSequence(): should parse a map with multiple key-value pairs', () => {
  const rdr = new Reader(['{', ':key1', '1', ':key2', '2', '}']);
  assertEquals(
    readSequence(rdr, '}'),
    new MapNode(
      new Map([
        [':key1', new NumberNode(1)],
        [':key2', new NumberNode(2)],
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
  assertEquals(readString('1'), new NumberNode(1));
  assertEquals(readString('7'), new NumberNode(7));
});

Deno.test('readString(): Testing read of whitespace', () => {
  assertEquals(readString('  7   '), new NumberNode(7));
  assertEquals(readString('-123'), new NumberNode(-123));
});

Deno.test('readString(): Testing read of symbols', () => {
  assertEquals(readString('+'), new SymbolNode('+'));
});

Deno.test('readString(): multi-character symbols', () => {
  assertEquals(readString('abc'), new SymbolNode('abc'));
});

Deno.test('readString(): whitespace with multi-character symbols', () => {
  assertEquals(readString('   abc   '), new SymbolNode('abc'));
});

Deno.test('readString(): symbols with numbers', () => {
  assertEquals(readString('abc5'), new SymbolNode('abc5'));
});

Deno.test('readString(): symbols with dashes', () => {
  assertEquals(readString('abc-def'), new SymbolNode('abc-def'));
});

Deno.test('readString(): lonely dash', () => {
  assertEquals(readString('-'), new SymbolNode('-'));
});

Deno.test('readString(): symbol with leading dash', () => {
  assertEquals(readString('-abc'), new SymbolNode('-abc'));
});

Deno.test('readString(): symbol of special characters', () => {
  assertEquals(readString('->>'), new SymbolNode('->>'));
});

Deno.test('readString(): basic list', () => {
  assertEquals(
    readString('(+ 1 2)'),
    new ListNode([
      new SymbolNode('+'),
      new NumberNode(1),
      new NumberNode(2),
    ]),
  );
});

Deno.test('readString(): empty list', () => {
  assertEquals(readString('()'), new ListNode([]));
});

Deno.test('readString(): empty list with whitespace', () => {
  assertEquals(readString('( )'), new ListNode([]));
});

Deno.test('readString(): list with nil', () => {
  assertEquals(readString('(nil)'), new ListNode([new NilNode()]));
});

Deno.test('readString(): nested lists', () => {
  assertEquals(
    readString('((3 4))'),
    new ListNode([
      new ListNode([
        new NumberNode(3),
        new NumberNode(4),
      ]),
    ]),
  );
});

Deno.test('readString(): Nested lists with symbols', () => {
  assertEquals(
    readString('(+ 1 (+ 2 3))'),
    new ListNode([
      new SymbolNode('+'),
      new NumberNode(1),
      new ListNode([
        new SymbolNode('+'),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): Nested lists with whitespace', () => {
  assertEquals(
    readString('  ( +   1   (+   2 3   )   )  '),
    new ListNode([
      new SymbolNode('+'),
      new NumberNode(1),
      new ListNode([
        new SymbolNode('+'),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): List with multiply symbol', () => {
  assertEquals(
    readString('(* 1 2)'),
    new ListNode([
      new SymbolNode('*'),
      new NumberNode(1),
      new NumberNode(2),
    ]),
  );
});

Deno.test('readString(): List with power symbol', () => {
  assertEquals(
    readString('(** 1 2)'),
    new ListNode([
      new SymbolNode('**'),
      new NumberNode(1),
      new NumberNode(2),
    ]),
  );
});

Deno.test('readString(): List with a negative number', () => {
  assertEquals(
    readString('(* -3 6)'),
    new ListNode([
      new SymbolNode('*'),
      new NumberNode(-3),
      new NumberNode(6),
    ]),
  );
});

Deno.test('readString(): List with nested empty lists', () => {
  assertEquals(
    readString('(()())'),
    new ListNode([
      new ListNode([]),
      new ListNode([]),
    ]),
  );
});

Deno.test('readString(): commas as whitespace', () => {
  assertEquals(
    readString('(1 2, 3,,,,),,'),
    new ListNode([
      new NumberNode(1),
      new NumberNode(2),
      new NumberNode(3),
    ]),
  );
});

Deno.test('readString(): read of nil', () => {
  assertEquals(readString('nil'), new NilNode());
});

Deno.test('readString(): read of true', () => {
  assertEquals(readString('true'), new BooleanNode(true));
});

Deno.test('readString(): read of false', () => {
  assertEquals(readString('false'), new BooleanNode(false));
});

Deno.test('readString(): double-quoted basic string', () => {
  assertEquals(readString('"abc"'), new StringNode('abc'));
});

Deno.test('readString(): double-quoted string with whitespace', () => {
  assertEquals(readString('   "abc"   "'), new StringNode('abc'));
});

Deno.test('readString(): double-quoted string with parens', () => {
  assertEquals(
    readString('"abc (with parens)"'),
    new StringNode('abc (with parens)'),
  );
});

Deno.test('readString(): double-quoted string with escapes', () => {
  assertEquals(readString('"abc\\"def"'), new StringNode('abc"def'));
});

Deno.test('readString(): empty double-quoted string', () => {
  assertEquals(readString('""'), new StringNode(''));
});

Deno.test('readString(): double-quoted string with two backslashes', () => {
  assertEquals(readString('"\\\\"'), new StringNode('\\'));
});

Deno.test('readString(): double-quoted string with a lot of backslashes', () => {
  assertEquals(
    readString('"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"'),
    new StringNode('\\\\\\\\\\\\\\\\\\'),
  );
});

Deno.test('readString(): double-quoted string with ampersand', () => {
  assertEquals(readString('"&"'), new StringNode('&'));
});

Deno.test('readString(): double-quoted string with single quote', () => {
  assertEquals(readString(`"'"`), new StringNode("'"));
});

Deno.test('readString(): double-quoted string with left paren', () => {
  assertEquals(readString('"("'), new StringNode('('));
});

Deno.test('readString(): double-quoted string with right paren', () => {
  assertEquals(readString('")"'), new StringNode(')'));
});

Deno.test('readString(): double-quoted string with asterisk', () => {
  assertEquals(readString('"*"'), new StringNode('*'));
});

Deno.test('readString(): double-quoted string with plus', () => {
  assertEquals(readString('"+"'), new StringNode('+'));
});

Deno.test('readString(): double-quoted string with comma', () => {
  assertEquals(readString('","'), new StringNode(','));
});

Deno.test('readString(): double-quoted string with dash', () => {
  assertEquals(readString('"-"'), new StringNode('-'));
});

Deno.test('readString(): double-quoted string with slash', () => {
  assertEquals(readString('"/"'), new StringNode('/'));
});

Deno.test('readString(): double-quoted string with colon', () => {
  assertEquals(readString('":"'), new StringNode(':'));
});

Deno.test('readString(): double-quoted string with semicolon', () => {
  assertEquals(readString('";"'), new StringNode(';'));
});

Deno.test('readString(): double-quoted string less than', () => {
  assertEquals(readString('"<"'), new StringNode('<'));
});

Deno.test('readString(): double-quoted string with equal', () => {
  assertEquals(readString('"="'), new StringNode('='));
});

Deno.test('readString(): double-quoted string with greater than', () => {
  assertEquals(readString('">"'), new StringNode('>'));
});

Deno.test('readString(): double-quoted string with  question mark', () => {
  assertEquals(readString('"?"'), new StringNode('?'));
});

Deno.test('readString(): double-quoted string with at sign', () => {
  assertEquals(readString('"@"'), new StringNode('@'));
});

Deno.test('readString(): double-quoted string with left bracket', () => {
  assertEquals(readString('"["'), new StringNode('['));
});

Deno.test('readString(): double-quoted string with right bracket', () => {
  assertEquals(readString('"]"'), new StringNode(']'));
});

Deno.test('readString(): double-quoted string with caret', () => {
  assertEquals(readString('"^"'), new StringNode('^'));
});

Deno.test('readString(): double-quoted string with underscore', () => {
  assertEquals(readString('"_"'), new StringNode('_'));
});

Deno.test('readString(): double-quoted string with backtick', () => {
  assertEquals(readString('"`"'), new StringNode('`'));
});

Deno.test('readString(): double-quoted string with left brace', () => {
  assertEquals(readString('"{"'), new StringNode('{'));
});

Deno.test('readString(): double-quoted string with right brace', () => {
  assertEquals(readString('"}"'), new StringNode('}'));
});

Deno.test('readString(): double-quoted string with tilde', () => {
  assertEquals(readString('"~"'), new StringNode('~'));
});

Deno.test('readString(): double-quoted string with exclamation mark', () => {
  assertEquals(readString('"!"'), new StringNode('!'));
});

Deno.test('readString(): read of ^/metadata', () => {
  assertEquals(
    readString('^{"a" 1} [1 2 3]'),
    new ListNode([
      new SymbolNode('with-meta'),
      new VectorNode([
        new NumberNode(1),
        new NumberNode(2),
        new NumberNode(3),
      ]),
      new MapNode(
        new Map([
          ['"a"', new NumberNode(1)],
        ]),
      ),
    ]),
  );
});

// Non alphanumerice characters in strings
Deno.test('readString(): new line in string', () => {
  assertEquals(readString('"\n"'), new StringNode('\n'));
});

Deno.test('readString(): double-quoted string with pound sign', () => {
  assertEquals(readString('"#"'), new StringNode('#'));
});

Deno.test('readString(): double-quoted string with dollar sign', () => {
  assertEquals(readString('"$"'), new StringNode('$'));
});

Deno.test('readString(): double-quoted string with percent sign', () => {
  assertEquals(readString('"%"'), new StringNode('%'));
});

Deno.test('readString(): double-quoted string with period', () => {
  assertEquals(readString('"."'), new StringNode('.'));
});

Deno.test('readString(): double-quoted string with escaped backslash', () => {
  assertEquals(readString('"\\\\"'), new StringNode('\\'));
});

Deno.test('readString(): double-quoted string with pipe', () => {
  assertEquals(readString('"|"'), new StringNode('|'));
});

// Non alphanumeric characters in comments

Deno.test('readString(): comment with exclamation point', () => {
  assertEquals(readString('1;!'), new NumberNode(1));
});

Deno.test('readString(): comment with double-quote', () => {
  assertEquals(readString('1;"'), new NumberNode(1));
});

Deno.test('readString(): comment with pound sign', () => {
  assertEquals(readString('1;#'), new NumberNode(1));
});

Deno.test('readString(): comment with dollar sign', () => {
  assertEquals(readString('1;$'), new NumberNode(1));
});

Deno.test('readString(): comment with percent sign', () => {
  assertEquals(readString('1;%'), new NumberNode(1));
});

Deno.test('readString(): comment with single quote', () => {
  assertEquals(readString("1;'"), new NumberNode(1));
});

Deno.test('readString(): comment with backslash', () => {
  assertEquals(readString('1;\\'), new NumberNode(1));
});

Deno.test('readString(): comment with two backslashes', () => {
  assertEquals(readString('1;\\\\'), new NumberNode(1));
});

Deno.test('readString(): comment with three backslashes', () => {
  assertEquals(readString('1;\\\\\\'), new NumberNode(1));
});

Deno.test('readString(): comment with backtick', () => {
  assertEquals(readString('1;`'), new NumberNode(1));
});

Deno.test('readString(): comment with a bunch of other non-alphanumeric characters', () => {
  assertEquals(readString('1; &()*+,-./:;<=>?@[]^_{|}~'), new NumberNode(1));
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
    new ListNode([
      new SymbolNode('quote'),
      new NumberNode(1),
    ]),
  );
});

Deno.test('readString(): quote special form with list', () => {
  assertEquals(
    readString("'(1 2 3)"),
    new ListNode([
      new SymbolNode('quote'),
      new ListNode([
        new NumberNode(1),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): quasiquote special form', () => {
  assertEquals(
    readString('`1'),
    new ListNode([
      new SymbolNode('quasiquote'),
      new NumberNode(1),
    ]),
  );
});

Deno.test('readString(): quasiquote special form with list', () => {
  assertEquals(
    readString('`(1 2 3)'),
    new ListNode([
      new SymbolNode('quasiquote'),
      new ListNode([
        new NumberNode(1),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): unquote special form', () => {
  assertEquals(
    readString('~1'),
    new ListNode([
      new SymbolNode('unquote'),
      new NumberNode(1),
    ]),
  );
});

Deno.test('readString(): unquote special form with list', () => {
  assertEquals(
    readString('~(1 2 3)'),
    new ListNode([
      new SymbolNode('unquote'),
      new ListNode([
        new NumberNode(1),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): quasiquote special form with unquote', () => {
  assertEquals(
    readString('`(1 ~a 3)'),
    new ListNode([
      new SymbolNode('quasiquote'),
      new ListNode([
        new NumberNode(1),
        new ListNode([
          new SymbolNode('unquote'),
          new SymbolNode('a'),
        ]),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): splice-unquote special form with list', () => {
  assertEquals(
    readString('~@(1 2 3)'),
    new ListNode([
      new SymbolNode('splice-unquote'),
      new ListNode([
        new NumberNode(1),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): single keyword', () => {
  assertEquals(readString(':kw'), new KeywordNode(':kw'));
});

Deno.test('readString(): keywords in list', () => {
  assertEquals(
    readString('(:kw1 :kw2 :kw3)'),
    new ListNode([
      new KeywordNode(':kw1'),
      new KeywordNode(':kw2'),
      new KeywordNode(':kw3'),
    ]),
  );
});

Deno.test('readString(): vector with symbol', () => {
  assertEquals(
    readString('[+ 1 2]'),
    new VectorNode([
      new SymbolNode('+'),
      new NumberNode(1),
      new NumberNode(2),
    ]),
  );
});

Deno.test('readString(): empty vector', () => {
  assertEquals(readString('[]'), new VectorNode([]));
});

Deno.test('readString(): vector with whitespace', () => {
  assertEquals(readString('[  ]'), new VectorNode([]));
});

Deno.test('readString(): nested vector', () => {
  assertEquals(
    readString('[[3 4]]'),
    new VectorNode([
      new VectorNode([
        new NumberNode(3),
        new NumberNode(4),
      ]),
    ]),
  );
});

Deno.test('readString(): nested vector with symbols', () => {
  assertEquals(
    readString('[+ 1 [+ 2 3]]'),
    new VectorNode([
      new SymbolNode('+'),
      new NumberNode(1),
      new VectorNode([
        new SymbolNode('+'),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): nested vector with symbols and whitespace', () => {
  assertEquals(
    readString('  [ +   1   [+   2 3   ]   ]  '),
    new VectorNode([
      new SymbolNode('+'),
      new NumberNode(1),
      new VectorNode([
        new SymbolNode('+'),
        new NumberNode(2),
        new NumberNode(3),
      ]),
    ]),
  );
});

Deno.test('readString(): vector nested in list', () => {
  assertEquals(readString('([])'), new ListNode([new VectorNode([])]));
});

Deno.test('readString(): empty map', () => {
  assertEquals(readString('{}'), new MapNode(new Map()));
});

Deno.test('readString(): empty map with whitespace', () => {
  assertEquals(readString('{ }'), new MapNode(new Map()));
});

Deno.test('readString(): map with string key', () => {
  assertEquals(
    readString('{"abc" 1}'),
    new MapNode(
      new Map([
        ['"abc"', new NumberNode(1)],
      ]),
    ),
  );
});

Deno.test('readString(): nested map', () => {
  assertEquals(
    readString('{"a" {"b" 2}}'),
    new MapNode(
      new Map([
        [
          '"a"',
          new MapNode(
            new Map([
              ['"b"', new NumberNode(2)],
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
    new MapNode(
      new Map([
        [
          '"a"',
          new MapNode(
            new Map([
              [
                '"b"',
                new MapNode(
                  new Map([
                    ['"c"', new NumberNode(3)],
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
    new MapNode(
      new Map([
        [
          '"a"',
          new MapNode(
            new Map([
              [
                '"b"',
                new MapNode(
                  new Map([
                    ['"cde"', new NumberNode(3)],
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
    new MapNode(
      new Map([
        ['"a1"', new NumberNode(1)],
        ['"a2"', new NumberNode(2)],
        ['"a3"', new NumberNode(3)],
      ]),
    ),
  );
});

Deno.test('readString(): a normal map with keywords and whitespace', () => {
  assertEquals(
    readString('{  :a  {:b   {  :cde     3   }  }}'),
    new MapNode(
      new Map([
        [
          ':a',
          new MapNode(
            new Map([
              [
                ':b',
                new MapNode(
                  new Map([
                    [':cde', new NumberNode(3)],
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
    new MapNode(
      new Map([
        ['"1"', new NumberNode(1)],
      ]),
    ),
  );
});

Deno.test('readString(): map nested in a list', () => {
  assertEquals(readString('({})'), new ListNode([new MapNode(new Map())]));
});

Deno.test('readString(): full line comment with leading whitespace', () => {
  assertEquals(readString(' ; whole line comment'), new NilNode());
});

Deno.test('readString(): comment after expression with whitespace', () => {
  assertEquals(readString('1 ; comment after expression'), new NumberNode(1));
});

Deno.test('readString(): comment after expression without whitespace', () => {
  assertEquals(readString('1; comment after expression'), new NumberNode(1));
});

Deno.test('readString(): Testing read of @/deref', () => {
  assertEquals(
    readString('@a'),
    new ListNode([
      new SymbolNode('deref'),
      new SymbolNode('a'),
    ]),
  );
});
