import * as assertions from 'deno-std-assert';
import * as bdd from 'deno-std-testing-bdd';
import * as reader from '../reader.ts';
import * as types from '../types.ts';

const {describe, it} = bdd;

describe('tokenize function', () => {
	it('should tokenize arithmetic operations', () => {
		const input1 = reader.tokenize(';; comment\n(+ 1 2)');
		const expected1 = ['(', '+', '1', '2', ')', ''];
		assertions.assertEquals(input1, expected1);

		const input2 = reader.tokenize('[1 2 (+ 1 2)]');
		const expected2 = ['[', '1', '2', '(', '+', '1', '2', ')', ']', ''];
		assertions.assertEquals(input2, expected2);

		const input3 = reader.tokenize('{"a" (+ 7 8)}');
		const expected3 = ['{', '"a"', '(', '+', '7', '8', ')', '}', ''];
		assertions.assertEquals(input3, expected3);

		const input4 = reader.tokenize('(/ (- (+ 515 (* -87 311)) 296) 27)');
		const expected4: string[] = [
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
			'',
		];
		assertions.assertEquals(input4, expected4);
	});

	it('should tokenize strings with special characters', () => {
		const input1 = reader.tokenize('"string with space"');
		const expected1 = ['"string with space"', ''];
		assertions.assertEquals(input1, expected1);

		const input2 = reader.tokenize('"string with \\"escaped\\" quotes"');
		const expected2 = ['"string with \\"escaped\\" quotes"', ''];
		assertions.assertEquals(input2, expected2);
	});

	it('should tokenize special single and double characters', () => {
		assertions.assertEquals(reader.tokenize('~@'), ['~@', '']);
		assertions.assertEquals(reader.tokenize('`'), ['`', '']);
		assertions.assertEquals(reader.tokenize("'"), ["'", '']);
	});

	it('should filter out comments', () => {
		const expected1 = ['(', '+', '1', '2', ')', ''];
		assertions.assertEquals(
			reader.tokenize(';; single line\n(+ 1 2)'),
			expected1,
		);

		const expected2 = ['(', '+', '1', '2', ')', ''];
		assertions.assertEquals(
			reader.tokenize('(+ 1 2) ;; trailing'),
			expected2,
		);
	});
});

describe('Reader class', () => {
	it('should navigate through tokens using next and peek methods', () => {
		const readerInstance = new reader.Reader(['(', '+', '1', '2', ')', '']);

		assertions.assertEquals(readerInstance.peek(), '(');
		assertions.assertEquals(readerInstance.next(), '(');
		assertions.assertEquals(readerInstance.peek(), '+');
		assertions.assertEquals(readerInstance.next(), '+');
		assertions.assertEquals(readerInstance.next(), '1');
		assertions.assertEquals(readerInstance.next(), '2');
		assertions.assertEquals(readerInstance.next(), ')');
		assertions.assertEquals(readerInstance.peek(), '');
		assertions.assertEquals(readerInstance.next(), '');
		assertions.assertEquals(readerInstance.peek(), undefined);
		assertions.assertEquals(readerInstance.next(), undefined);
	});
});

describe('readForm function', () => {
	it('should throw EOF error for undefined token', () => {
		const readerInstance = new reader.Reader([]);
		assertions.assertThrows(
			() => {
				reader.readForm(readerInstance);
			},
			Error,
			'EOF',
		);
	});

	it("should read and return a 'quote' form", () => {
		const readerInstance = new reader.Reader(["'", 'symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('quote'),
				new types.SymbolNode('symbol'),
			]),
		);
	});

	it("should read and return a 'quasiquote' form", () => {
		const readerInstance = new reader.Reader(['`', 'symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('quasiquote'),
				new types.SymbolNode('symbol'),
			]),
		);
	});

	it("should read and return an 'unquote' form", () => {
		const readerInstance = new reader.Reader(['~', 'symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('unquote'),
				new types.SymbolNode('symbol'),
			]),
		);
	});

	it("should read and return a 'splice-unquote' form", () => {
		const readerInstance = new reader.Reader(['~@', 'symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('splice-unquote'),
				new types.SymbolNode('symbol'),
			]),
		);
	});

	it("should read and return a 'with-meta' form", () => {
		const readerInstance = new reader.Reader(['^', 'meta', 'symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('with-meta'),
				new types.SymbolNode('symbol'),
				new types.SymbolNode('meta'),
			]),
		);
	});

	it("should read and return a 'deref' form", () => {
		const readerInstance = new reader.Reader(['@', 'symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('deref'),
				new types.SymbolNode('symbol'),
			]),
		);
	});

	it("should throw error for unexpected ')'", () => {
		const readerInstance = new reader.Reader([')']);
		assertions.assertThrows(
			() => {
				reader.readForm(readerInstance);
			},
			Error,
			"unexpected ')'",
		);
	});

	it("should throw error for unexpected ']'", () => {
		const readerInstance = new reader.Reader([']']);
		assertions.assertThrows(
			() => {
				reader.readForm(readerInstance);
			},
			Error,
			"unexpected ']'",
		);
	});

	it("should throw error for unexpected '}'", () => {
		const readerInstance = new reader.Reader(['}']);
		assertions.assertThrows(
			() => {
				reader.readForm(readerInstance);
			},
			Error,
			"unexpected '}'",
		);
	});

	it("should read and return a List for '('", () => {
		const readerInstance = new reader.Reader([
			'(',
			'symbol1',
			'symbol2',
			')',
		]);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.SymbolNode('symbol1'),
				new types.SymbolNode('symbol2'),
			]),
		);
	});

	it("should read and return a Vec for '['", () => {
		const readerInstance = new reader.Reader([
			'[',
			'symbol1',
			'symbol2',
			']',
		]);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(
			result,
			new types.VectorNode([
				new types.SymbolNode('symbol1'),
				new types.SymbolNode('symbol2'),
			]),
		);
	});

	it("should read and return a Dict for '{'", () => {
		const readerInstance = new reader.Reader([
			'{',
			'key1',
			'value1',
			'key2',
			'value2',
			'}',
		]);
		const result = reader.readForm(readerInstance);
		const expectedDict = new types.MapNode();
		expectedDict.value.set('key1', new types.SymbolNode('value1'));
		expectedDict.value.set('key2', new types.SymbolNode('value2'));
		assertions.assertEquals(result, expectedDict);
	});

	it('should read and return an atom', () => {
		const readerInstance = new reader.Reader(['symbol']);
		const result = reader.readForm(readerInstance);
		assertions.assertEquals(result, new types.SymbolNode('symbol'));
	});
});

describe('readAtom function', () => {
	it('should throw "unexpected EOF" error for undefined token', () => {
		const readerInstance = new reader.Reader([]);
		assertions.assertThrows(
			() => reader.readAtom(readerInstance),
			Error,
			'unexpected EOF',
		);
	});

	it('should return nil type for "nil" token', () => {
		const readerInstance = new reader.Reader(['nil']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.NilNode());
	});

	it('should return boolean type false for "false" token', () => {
		const readerInstance = new reader.Reader(['false']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.BooleanNode(false));
	});

	it('should return boolean type true for "true" token', () => {
		const readerInstance = new reader.Reader(['true']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.BooleanNode(true));
	});

	it('should return number type for number token', () => {
		const readerInstance = new reader.Reader(['123']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.NumberNode(123));
	});

	it('should return string type for string token', () => {
		const readerInstance = new reader.Reader(['"hello"']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.StringNode('hello'));
	});

	it('should return keyword type for keyword token', () => {
		const readerInstance = new reader.Reader([':keyword']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.KeywordNode(':keyword'));
	});

	it('should throw error for unfinished string token', () => {
		const readerInstance = new reader.Reader(['"unfinished']);
		assertions.assertThrows(
			() => reader.readAtom(readerInstance),
			Error,
			"expected '\"', got EOF",
		);
	});

	it('should return symbol type for symbol token', () => {
		const readerInstance = new reader.Reader(['symbol']);
		const result = reader.readAtom(readerInstance);
		assertions.assertEquals(result, new types.SymbolNode('symbol'));
	});
});

describe('unescapeString function', () => {
	it('should remove leading and trailing quotes', () => {
		const input = '"hello world"';
		const expected = 'hello world';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should replace \\n with newline character', () => {
		const input = '"hello\\nworld"';
		const expected = 'hello\nworld';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should unescape escaped quotes', () => {
		const input = '"hello\\"world"';
		const expected = 'hello"world';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should unescape escaped backslashes', () => {
		const input = '"hello\\\\world"';
		const expected = 'hello\\world';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should handle empty strings', () => {
		const input = '""';
		const expected = '';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should handle strings with only escaped characters', () => {
		const input = '"\\\\\\"\\""';
		const expected = '\\""';
		const output = reader.unescapeString(input);
		assertions.assertEquals(output, expected);
	});

	it('should return original string if no escapable chars are found', () => {
		const input = '"abc123"';
		const expected = 'abc123';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should handle multiple escaped characters in sequence', () => {
		const input = '"\\\\\\n\\\\"';
		const expected = '\\\n\\';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});

	it('should handle strings with various escaped characters', () => {
		const input = '"hello\\\\world\\"foo\\nbar"';
		const expected = 'hello\\world"foo\nbar';
		assertions.assertEquals(reader.unescapeString(input), expected);
	});
});

describe('readSeq function', () => {
	it('should parse a list with one element', () => {
		const rdr = new reader.Reader(['(', '1', ')']);
		const ast = reader.readSequence(rdr, ')');
		assertions.assertEquals(
			ast,
			new types.ListNode([new types.NumberNode(1)]),
		);
	});

	it('should parse a list with multiple elements', () => {
		const rdr = new reader.Reader(['(', '1', '2', '3', ')']);
		const ast = reader.readSequence(rdr, ')');
		assertions.assertEquals(
			ast,
			new types.ListNode([
				new types.NumberNode(1),
				new types.NumberNode(2),
				new types.NumberNode(3),
			]),
		);
	});

	it('should parse a vector with one element', () => {
		const rdr = new reader.Reader(['[', '1', ']']);
		const ast = reader.readSequence(rdr, ']');
		assertions.assertEquals(
			ast,
			new types.VectorNode([new types.NumberNode(1)]),
		);
	});

	it('should parse a vector with multiple elements', () => {
		const rdr = new reader.Reader(['[', '1', '2', '3', ']']);
		const ast = reader.readSequence(rdr, ']');
		assertions.assertEquals(
			ast,
			new types.VectorNode([
				new types.NumberNode(1),
				new types.NumberNode(2),
				new types.NumberNode(3),
			]),
		);
	});

	it('should parse a dict with one key-value pair', () => {
		const rdr = new reader.Reader(['{', ':key', '1', '}']);
		const ast = reader.readSequence(rdr, '}');
		const dict = new types.MapNode();
		dict.value.set(':key', new types.NumberNode(1));
		assertions.assertEquals(ast, dict);
	});

	it('should parse a dict with multiple key-value pairs', () => {
		const rdr = new reader.Reader(['{', ':key1', '1', ':key2', '2', '}']);
		const ast = reader.readSequence(rdr, '}');
		const dict = new types.MapNode();
		dict.value.set(':key1', new types.NumberNode(1));
		dict.value.set(':key2', new types.NumberNode(2));
		assertions.assertEquals(ast, dict);
	});

	it('should throw error for unexpected EOF while reading a sequence', () => {
		const rdr = new reader.Reader(['(', '1', '']);
		assertions.assertThrows(() => reader.readSequence(rdr, ')'));
	});

	it('should throw error for unknown end value', () => {
		const rdr = new reader.Reader(['<', '1', '>']);
		assertions.assertThrows(() => reader.readSequence(rdr, '>'));
	});
});
