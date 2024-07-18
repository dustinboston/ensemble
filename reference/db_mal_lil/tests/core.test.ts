import * as assertions from 'deno-std-assert';
import * as bdd from 'deno-std-testing-bdd';
import * as mock from 'deno-std-testing-mock';
import * as core from '../core.ts';
import * as types from '../types.ts';

const {describe, it} = bdd;

describe('eq', () => {
	it('eq returns true for equal nodes and false for unequal', () => {
		assertions.assertEquals(
			core.eq(new types.NumberNode(1), new types.NumberNode(1)),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.eq(new types.NumberNode(1), new types.NumberNode(2)),
			new types.BooleanNode(false),
		);
	});
});

describe('print functions', () => {
	it('prStr and str convert nodes to strings appropriately', () => {
		assertions.assertEquals(
			core.printEscapedString(new types.StringNode('abc\ndef\nghi')),
			new types.StringNode('"abc\\ndef\\nghi"'),
		);
		assertions.assertEquals(
			core.printUnescapedString(new types.StringNode('abc\ndef\nghi')),
			new types.StringNode('abc\ndef\nghi'),
		);
	});

	it('prn and println print and return correctly', () => {
		const logSpy = mock.spy(console, 'log');
		const abc = 'abc\ndef\nghi';

		try {
			assertions.assertEquals(
				core.printEscapedStringToScreen(new types.StringNode(abc)),
				new types.NilNode(),
			);
			assertions.assertEquals(
				core.printUnescapedStringToScreen(new types.StringNode(abc)),
				new types.NilNode(),
			);
		} finally {
			logSpy.restore();
		}

		mock.assertSpyCall(logSpy, 0, {args: ['"abc\\ndef\\nghi"']});
		mock.assertSpyCall(logSpy, 1, {args: ['abc\ndef\nghi']});
		mock.assertSpyCalls(logSpy, 2);
	});
});

describe('readString', () => {
	it('readString should read string and return AST', () => {
		const input = new types.StringNode('(+ 2 3)');
		const expected = new types.ListNode([
			new types.SymbolNode('+'),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		assertions.assertEquals(core.readString(input), expected);
	});

	it('readString should throw when argument count is not 1', () => {
		assertions.assertThrows(() => core.readString());
		assertions.assertThrows(() =>
			core.readString(
				new types.StringNode('foo'),
				new types.StringNode('bar'),
			),
		);
	});

	it('readString should throw when argument is not a string', () => {
		assertions.assertThrows(() =>
			core.readString(new types.NumberNode(42)),
		);
	});
});

describe('readln', () => {
	const originalPrompt = globalThis.prompt;

	it('readln should read line and return string', () => {
		const input = new types.StringNode('prompt$');
		const expected = new types.StringNode('user input');
		globalThis.prompt = () => 'user input';

		assertions.assertEquals(core.readln(input), expected);

		globalThis.prompt = originalPrompt;
	});

	it('readln should return nil/undef when readline returns null', () => {
		const input = new types.StringNode('prompt$');
		const expected = new types.NilNode();
		// This is necessary because during linting the libraries conflict
		// about the definition of prompt.
		(globalThis.prompt as any) = (
			_message?: string,
			_defaultValue?: string,
			// eslint-disable-next-line @typescript-eslint/ban-types
		): string | null => null;

		assertions.assertEquals(core.readln(input), expected);

		globalThis.prompt = originalPrompt;
	});

	it('readln should throw when argument count is not 1', () => {
		assertions.assertThrows(() => core.readln());
		assertions.assertThrows(() =>
			core.readln(
				new types.StringNode('foo'),
				new types.StringNode('bar'),
			),
		);
	});

	it('readln should throw when argument is not a string', () => {
		assertions.assertThrows(() => core.readln(new types.NumberNode(42)));
	});
});

describe('readdir', () => {
	it('readir should list directory contents', () => {
		const temporaryDir = Deno.makeTempDirSync();
		Deno.mkdirSync(`${temporaryDir}/subdir`);
		Deno.writeTextFileSync(`${temporaryDir}/file.txt`, 'hello');

		const result = core.readir(new types.StringNode(temporaryDir));

		const expected = new types.VectorNode([
			new types.MapNode(
				// Make slug and ext null or empty for dirs
				new Map<string, types.AstNode>([
					[':file', new types.BooleanNode(false)],
					[':directory', new types.BooleanNode(true)],
					[':symlink', new types.BooleanNode(false)],
					[':name', new types.StringNode('subdir')],
					[':slug', new types.StringNode('subdi')],
					[':ext', new types.StringNode('subdir')],
				]),
			),
			new types.MapNode(
				// Make slug and ext null or empty for dirs
				new Map<string, types.AstNode>([
					[':file', new types.BooleanNode(true)],
					[':directory', new types.BooleanNode(false)],
					[':symlink', new types.BooleanNode(false)],
					[':name', new types.StringNode('file.txt')],
					[':slug', new types.StringNode('file')],
					[':ext', new types.StringNode('txt')],
				]),
			),
		]);
		assertions.assertEquals(result, expected);
	});

	it('readir should throw error if argument is not a string', () => {
		assertions.assertThrows(
			() => core.readir(new types.NumberNode(123)),
			Error,
			'Invalid',
		);
	});
});

describe('slurp', () => {
	it('slurp should read a file', () => {
		const temporaryDir = Deno.makeTempDirSync();
		const filePath = `${temporaryDir}/file.txt`;
		Deno.writeTextFileSync(filePath, 'content');

		const result = core.slurp(new types.StringNode(filePath));
		assertions.assertEquals(result, new types.StringNode('content'));
	});

	it('slurp should throw error if file does not exist', () => {
		assertions.assertThrows(
			() => core.slurp(new types.StringNode('mocks/nonexistent')),
			Error,
			'No such file or directory',
		);
	});
});

describe('spit', () => {
	it('spit should write to a file', () => {
		const temporaryDir = Deno.makeTempDirSync();
		const filePath = `${temporaryDir}/file.txt`;
		const content = 'newContent';

		core.spit(
			new types.StringNode(filePath),
			new types.StringNode(content),
		);

		const result = Deno.readTextFileSync(filePath);
		assertions.assertEquals(result, content);
	});

	it('spit should throw error if path is not a string', () => {
		assertions.assertThrows(
			() =>
				core.spit(
					new types.NumberNode(123),
					new types.StringNode('content'),
				),
			Error,
			'Invalid',
		);
	});
});

describe('trim function', () => {
	it('should trim whitespace from the start and end of a string', () => {
		assertions.assertEquals(
			core.trim(new types.StringNode('  hello  ')),
			new types.StringNode('hello'),
		);
	});

	it('should throw an error when no arguments are provided', () => {
		assertions.assertThrows(() => {
			core.trim();
		});
	});

	it('should throw an error when more than one argument is provided', () => {
		assertions.assertThrows(() => {
			core.trim(
				new types.StringNode('hello'),
				new types.StringNode('world'),
			);
		});
	});

	it('should throw an error when the argument is not a string', () => {
		assertions.assertThrows(() => {
			core.trim(new types.NumberNode(123));
		});
	});
});

describe('comparison functions', () => {
	// Test for '<'
	it("lt should check if 'a' is less than 'b'", () => {
		const result1 = core.lt(
			new types.NumberNode(2),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result1, new types.BooleanNode(false));

		const result2 = core.lt(
			new types.NumberNode(1),
			new types.NumberNode(2),
		);
		assertions.assertEquals(result2, new types.BooleanNode(true));
	});

	// Test for '<='
	it("lte should check if 'a' is less than or equal to 'b'", () => {
		const result1 = core.lte(
			new types.NumberNode(2),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result1, new types.BooleanNode(false));

		const result2 = core.lte(
			new types.NumberNode(1),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result2, new types.BooleanNode(true));
	});

	// Test for '>'
	it("gt should check if 'a' is greater than 'b'", () => {
		const result1 = core.gt(
			new types.NumberNode(2),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result1, new types.BooleanNode(true));

		const result2 = core.gt(
			new types.NumberNode(1),
			new types.NumberNode(2),
		);
		assertions.assertEquals(result2, new types.BooleanNode(false));
	});

	// Test for '>='
	it("gte should check if 'a' is greater than or equal to 'b'", () => {
		const result1 = core.gte(
			new types.NumberNode(2),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result1, new types.BooleanNode(true));

		const result2 = core.gte(
			new types.NumberNode(1),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result2, new types.BooleanNode(true));
	});
});

describe('math functions', () => {
	// Test for '+'
	it('add should sum two numbers', () => {
		const result = core.add(
			new types.NumberNode(2),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result, new types.NumberNode(3));
	});

	// Test for '+' error case
	it('add should throw an error if an argument is not a number', () => {
		assertions.assertThrows(() => {
			core.add(
				new types.StringNode('not a num'),
				new types.NumberNode(1),
			);
		});
	});

	// Test for '-'
	it('subtract should find the difference between two numbers', () => {
		const result = core.subtract(
			new types.NumberNode(2),
			new types.NumberNode(1),
		);
		assertions.assertEquals(result, new types.NumberNode(1));
	});

	// Test for '-' error case
	it('subtract should throw an error if an argument is not a number', () => {
		assertions.assertThrows(() => {
			core.subtract(
				new types.StringNode('not a num'),
				new types.NumberNode(1),
			);
		});
	});

	// Test for '*'
	it('multiply should find the product of two numbers', () => {
		const result = core.multiply(
			new types.NumberNode(2),
			new types.NumberNode(3),
		);
		assertions.assertEquals(result, new types.NumberNode(6));
	});

	// Test for '*' error case
	it('multiply should throw an error if an argument is not a number', () => {
		assertions.assertThrows(() => {
			core.multiply(
				new types.StringNode('not a num'),
				new types.NumberNode(1),
			);
		});
	});

	// Test for '/'
	it('divide should find the quotient of two numbers', () => {
		const result = core.divide(
			new types.NumberNode(4),
			new types.NumberNode(2),
		);
		assertions.assertEquals(result, new types.NumberNode(2));
	});

	// Test for '/' error case
	it('divide should throw an error if an argument is not a number', () => {
		assertions.assertThrows(() => {
			core.divide(
				new types.StringNode('not a num'),
				new types.NumberNode(1),
			);
		});
	});
});

describe('time-ms', () => {
	it('timeMs should return a unix timestamp', () => {
		const result = core.timeMs() as types.NumberNode;
		const currentTime = Date.now();

		// Ensure it's a number
		assertions.assertEquals(typeof result.value, 'number');

		// Ensure it's reasonably close to the current time
		assertions.assert(Math.abs(currentTime - result.value) < 1000);
	});
});

describe('list/isList', () => {
	it('list should return a list containing the given args', () => {
		const a = new types.NumberNode(1);
		const b = new types.NumberNode(2);
		const result = core.list(a, b) as types.ListNode;

		// Check if it's a list
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);

		// Check the content of the list
		assertions.assertEquals(result.value, [a, b]);
	});

	// Test for 'isList'
	it('isList should return true if the argument is a list', () => {
		const notList = new types.NumberNode(1);
		const aList = new types.ListNode([notList]);

		// Check for non-list type
		assertions.assertEquals(core.isListNode(notList).value, false);

		// Check for list type
		assertions.assertEquals(core.isListNode(aList).value, true);
	});

	// Test for 'isList' failure due to incorrect argument count
	it('isList should throw if given more than one argument', () => {
		const a = new types.NumberNode(1);
		const b = new types.NumberNode(2);
		assertions.assertThrows(() => {
			core.isListNode(a, b);
		});
	});

	// Test for 'isList' failure due to wrong type
	it('isList should return false if the argument is not a list', () => {
		const notList = new types.NumberNode(1);
		assertions.assertEquals(core.isListNode(notList).value, false);
	});
});

describe('Conj', () => {
	it('conj with less than 2 arguments', () => {
		assertions.assertThrows(
			() => core.conj(new types.ListNode([new types.NumberNode(1)])),
			Error,
			'Unexpected minimum number of arguments',
		);
	});

	it('conj with List', () => {
		const inputList = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const expected = new types.ListNode([
			new types.NumberNode(5),
			new types.NumberNode(4),
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		assertions.assertEquals(
			core.conj(
				inputList,
				new types.NumberNode(4),
				new types.NumberNode(5),
			),
			expected,
		);
	});

	it('conj with Vec', () => {
		const inputVec = new types.VectorNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const expected = new types.VectorNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
			new types.NumberNode(4),
			new types.NumberNode(5),
		]);
		assertions.assertEquals(
			core.conj(
				inputVec,
				new types.NumberNode(4),
				new types.NumberNode(5),
			),
			expected,
		);
	});

	it('conj with neither List nor Vec', () => {
		assertions.assertThrows(
			() => core.conj(new types.NumberNode(42), new types.NumberNode(1)),
			Error,
			'Invalid sequential type',
		);
	});
});

describe('Concat', () => {
	it('concat with no arguments', () => {
		const expected = new types.ListNode([]);
		assertions.assertEquals(core.concat(), expected);
	});

	it('concat with one list', () => {
		const input = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		const expected = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		assertions.assertEquals(core.concat(input), expected);
	});

	it('concat with two lists', () => {
		const input1 = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		const input2 = new types.ListNode([
			new types.NumberNode(3),
			new types.NumberNode(4),
		]);
		const expected = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
			new types.NumberNode(4),
		]);
		assertions.assertEquals(core.concat(input1, input2), expected);
	});

	it('concat with three lists', () => {
		const input1 = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		const input2 = new types.ListNode([
			new types.NumberNode(3),
			new types.NumberNode(4),
		]);
		const input3 = new types.ListNode([
			new types.NumberNode(5),
			new types.NumberNode(6),
		]);
		const expected = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
			new types.NumberNode(4),
			new types.NumberNode(5),
			new types.NumberNode(6),
		]);
		assertions.assertEquals(core.concat(input1, input2, input3), expected);
	});

	it('concat with empty lists', () => {
		const input1 = new types.ListNode([]);
		const input2 = new types.ListNode([]);
		const expected = new types.ListNode([]);
		assertions.assertEquals(core.concat(input1, input2), expected);
	});

	it('concat with non-Seq type', () => {
		assertions.assertThrows(
			() => core.concat(new types.NumberNode(1)),
			Error,
			'Invalid sequential type',
		);
	});
});

describe('`cons`', () => {
	it('cons should prepend a value to the front of a list', () => {
		const value = new types.NumberNode(0);
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.cons(value, list);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			result.value.map((x) => x.value),
			[0, 1, 2, 3],
		);
	});

	it('cons should throw error if not given exactly 2 arguments', () => {
		const value = new types.NumberNode(0);
		assertions.assertThrows(
			() => core.cons(value),
			Error,
			'Unexpected number of arguments',
		);
		assertions.assertThrows(
			() => core.cons(value, value, value),
			Error,
			'Unexpected number of arguments',
		);
	});

	it('cons should throw error if second argument is not a List', () => {
		const value = new types.NumberNode(0);
		const notList = new types.NumberNode(42);
		assertions.assertThrows(
			() => core.cons(value, notList),
			Error,
			'Invalid sequential type',
		);
	});
});

describe('vec', () => {
	// Test for 'vec' when input is a list
	it('should return a Vec if the argument is a List', () => {
		const listInput = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.vec(listInput);
		assertions.assertEquals(result instanceof types.VectorNode, true);
		assertions.assertEquals(result.value, [
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
	});

	// Test for 'vec' when input is not a list
	it('should return the original node if the argument is not a List', () => {
		const notList = new types.NumberNode(1);
		const result = core.vec(notList);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 1);
	});

	// Test for 'vec' when there are multiple arguments
	it('should still only consider the first argument', () => {
		const listInput = new types.ListNode([new types.NumberNode(1)]);
		const extraArg = new types.NumberNode(2);
		const result = core.vec(listInput, extraArg);
		assertions.assertEquals(result instanceof types.VectorNode, true);
		assertions.assertEquals(result.value, [new types.NumberNode(1)]);
	});

	// Test for 'vec' when no arguments
	it('should return undefined if no arguments are provided', () => {
		const result = core.vec();
		assertions.assertEquals(result, undefined);
	});
});

describe('`nth`', () => {
	it('nth should return the nth element of a list', () => {
		const list = new types.ListNode([
			new types.SymbolNode('a'),
			new types.SymbolNode('b'),
			new types.SymbolNode('c'),
		]);
		const index = new types.NumberNode(1);
		const result = core.nth(list, index);
		assertions.assertEquals(result instanceof types.SymbolNode, true);
		assertions.assertEquals(result.value, 'b');
	});

	it('nth should throw error when index is out of range', () => {
		const list = new types.ListNode([new types.SymbolNode('a')]);
		const index = new types.NumberNode(1);
		assertions.assertThrows(
			() => core.nth(list, index),
			Error,
			'out of range',
		);
	});
});

describe('`first`', () => {
	it('first should return the first element of a list', () => {
		const list = new types.ListNode([
			new types.SymbolNode('a'),
			new types.SymbolNode('b'),
		]);
		const result = core.firstNodeInList(list);
		assertions.assertEquals(result instanceof types.SymbolNode, true);
		assertions.assertEquals(result.value, 'a');
	});

	it('first should return nil for empty list', () => {
		const list = new types.ListNode([]);
		const result = core.firstNodeInList(list);
		assertions.assertEquals(
			core.isNil(result),
			new types.BooleanNode(true),
		);
	});
});

describe('`rest`', () => {
	it('rest should return a list without the first element', () => {
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.rest(list);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(result.value, [
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
	});

	it('rest should return empty list for single-element list', () => {
		const list = new types.ListNode([new types.NumberNode(1)]);
		const result = core.rest(list);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(result.value, []);
	});
});

describe('`empty?`', () => {
	it('empty? should return true for an empty list', () => {
		const list = new types.ListNode([]);
		const result = core.empty(list);
		assertions.assertEquals(result instanceof types.BooleanNode, true);
		assertions.assertEquals(result.value, true);
	});

	it('empty? should return false for a non-empty list', () => {
		const list = new types.ListNode([new types.NumberNode(1)]);
		const result = core.empty(list);
		assertions.assertEquals(result instanceof types.BooleanNode, true);
		assertions.assertEquals(result.value, false);
	});
});

describe('count', () => {
	it('should return the length of a list', () => {
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		const result = core.count(list);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 2);
	});

	it('should return 0 for an empty list', () => {
		const list = new types.ListNode([]);
		const result = core.count(list);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 0);
	});

	it('should return 0 for a Nil value', () => {
		const nil = new types.NilNode();
		const result = core.count(nil);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 0);
	});
});

describe('atom', () => {
	it('atom should create an Atom from a given node', () => {
		const node = new types.NumberNode(42);
		const result = core.atom(node);
		assertions.assertEquals(
			core.isAtom(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(result.value, node);
	});

	it('atom should throw error when no arguments are provided', () => {
		assertions.assertThrows(
			() => core.atom(),
			Error,
			'Unexpected number of arguments',
		);
	});
});

describe('atom?', () => {
	it('atom? should return true if the node is an Atom', () => {
		const node = new types.AtomNode(new types.NumberNode(42));
		const result = core.isAtom(node);
		assertions.assertEquals(result instanceof types.BooleanNode, true);
		assertions.assertEquals(result.value, true);
	});

	it('atom? should return false if the node is not an Atom', () => {
		const node = new types.NumberNode(42);
		const result = core.isAtom(node);
		assertions.assertEquals(result instanceof types.BooleanNode, true);
		assertions.assertEquals(result.value, false);
	});
});

describe('deref', () => {
	it('deref should return the node contained in the Atom', () => {
		const node = new types.AtomNode(new types.NumberNode(42));
		const result = core.deref(node);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 42);
	});

	it('deref should throw error for non-Atom nodes', () => {
		const node = new types.NumberNode(42);
		assertions.assertThrows(() => core.deref(node), Error, 'Invalid');
	});
});

describe('reset', () => {
	it("reset! should update the Atom's value", () => {
		const node = new types.AtomNode(new types.NumberNode(42));
		const newNode = new types.NumberNode(43);
		const result = core.reset(node, newNode);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 43);
	});

	it('reset! should throw error for non-Atom first argument', () => {
		const node = new types.NumberNode(42);
		const newNode = new types.NumberNode(43);
		assertions.assertThrows(
			() => core.reset(node, newNode),
			Error,
			'Invalid',
		);
	});
});

describe('swap', () => {
	it('should throw an error for insufficient arguments', () => {
		assertions.assertThrows(() => {
			core.swap(new types.AtomNode(new types.StringNode('a')));
		});
	});

	it('should throw an error if the first argument is not an Atom', () => {
		assertions.assertThrows(() => {
			core.swap(
				new types.StringNode('not an atom'),
				new types.FunctionNode((a) => a),
			);
		});
	});

	it('should throw an error if the second argument is not a Func', () => {
		assertions.assertThrows(() => {
			core.swap(
				new types.AtomNode(new types.StringNode('a')),
				new types.StringNode('not a function'),
			);
		});
	});

	it("should swap the Atoms' value with the result of the function", () => {
		const atom = new types.AtomNode(new types.NumberNode(6));
		const func = new types.FunctionNode(
			(a) => new types.NumberNode((a as types.NumberNode).value * 2),
		);

		assertions.assertEquals(
			core.swap(atom, func),
			new types.NumberNode(12),
		);
	});

	it('should handle additional parameters correctly', () => {
		const atom = new types.AtomNode(new types.NumberNode(5));
		const func = new types.FunctionNode(
			(a, b) =>
				new types.NumberNode(
					(a as types.NumberNode).value +
						(b as types.NumberNode).value,
				),
		);

		assertions.assertEquals(
			core.swap(atom, func, new types.NumberNode(7)),
			new types.NumberNode(12),
		);
	});
});

describe('throwErr', () => {
	it('should throw an Err object when given an Ast', () => {
		const node = new types.StringNode('foo');
		assertions.assertThrows(() => core.throwError(node), 'foo');
	});

	it('should throw an error when no arguments are provided', () => {
		assertions.assertThrows(
			() => core.throwError(),
			'Unexpected number of arguments',
		);
	});

	it('should throw an error when given an invalid argument type', () => {
		const invalidNode = new types.BooleanNode(false);
		assertions.assertThrows(
			() => core.throwError(invalidNode),
			'invalid argument',
		);
	});
});

describe('`apply`', () => {
	it('apply should call function with list arguments', () => {
		const fn = new types.FunctionNode(
			(a, b) =>
				new types.NumberNode(
					(a as types.NumberNode).value +
						(b as types.NumberNode).value,
				),
		);
		const listArgs = new types.ListNode([
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.apply(fn, listArgs);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 5);
	});

	it('apply should concatenate other arguments with list', () => {
		const fn = new types.FunctionNode(
			(a, b, c) =>
				new types.NumberNode(
					(a as types.NumberNode).value +
						(b as types.NumberNode).value +
						(c as types.NumberNode).value,
				),
		);
		const listArgs = new types.ListNode([
			new types.NumberNode(2),
			new types.NumberNode(1),
		]);
		const extraArg = new types.NumberNode(3);
		const result = core.apply(fn, extraArg, listArgs);
		assertions.assertEquals(result instanceof types.NumberNode, true);
		assertions.assertEquals(result.value, 6);
	});

	it('apply should throw error for non-Seq last argument', () => {
		const fn = new types.FunctionNode(
			(a, b) =>
				new types.NumberNode(
					(a as types.NumberNode).value +
						(b as types.NumberNode).value,
				),
		);
		const lastArg = new types.NumberNode(3);
		assertions.assertThrows(
			() => core.apply(fn, lastArg),
			Error,
			'Invalid sequential type',
		);
	});

	it('apply should throw error for non-Func first argument', () => {
		const notFn = new types.NumberNode(42);
		const listArgs = new types.ListNode([
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		assertions.assertThrows(
			() => core.apply(notFn, listArgs),
			Error,
			'Invalid',
		);
	});
});

describe('`map`', () => {
	it('map should call function against each item in a list', () => {
		const double = new types.FunctionNode(
			(x) => new types.NumberNode((x as types.NumberNode).value * 2),
		);
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.applyToSequence(double, list);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			(result as types.ListNode).value.map((x) => x.value),
			[2, 4, 6],
		);
	});

	it('map should throw error if not given exactly 2 arguments', () => {
		const double = new types.FunctionNode(
			(x) => new types.NumberNode((x as types.NumberNode).value * 2),
		);
		assertions.assertThrows(
			() => core.applyToSequence(double),
			Error,
			'Unexpected number of arguments',
		);
	});

	it('map should throw error if second argument is not a List', () => {
		const double = new types.FunctionNode(
			(x) => new types.NumberNode((x as types.NumberNode).value * 2),
		);
		const notList = new types.NumberNode(42);
		assertions.assertThrows(
			() => core.applyToSequence(double, notList),
			Error,
			'Invalid sequential type',
		);
	});
});

describe('`seq`', () => {
	it('seq should return same list if given a list', () => {
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.seq(list);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(result.value, list.value);
	});

	it('seq should return a list if given a vec', () => {
		const vec = new types.VectorNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const result = core.seq(vec);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(result.value, vec.value);
	});

	it('seq should return a list of chars if given a string', () => {
		const string_ = new types.StringNode('foo');
		const result = core.seq(string_);
		assertions.assertEquals(
			core.isListNode(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			(result as types.ListNode).value.map((x) => x.value),
			['f', 'o', 'o'],
		);
	});

	it('seq should return nil if given nil or empty seq', () => {
		const nil = new types.NilNode();
		const emptyList = new types.ListNode([]);
		const emptyVec = new types.VectorNode([]);
		assertions.assertEquals(
			core.isNil(core.seq(nil)),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isNil(core.seq(emptyList)),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isNil(core.seq(emptyVec)),
			new types.BooleanNode(true),
		);
	});
});

describe('`meta`', () => {
	it('meta should return metadata of an element', () => {
		const fn = new types.FunctionNode((x) => x);
		fn.metadata = new types.MapNode(
			new Map([['b', new types.NumberNode(1)]]),
		);
		const result = core.meta(fn);
		assertions.assertEquals(
			core.isMap(result),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			(result as types.MapNode).value.get('b')?.value,
			1,
		);
	});

	it('meta should throw error if not given exactly 1 argument', () => {
		assertions.assertThrows(
			() => core.meta(),
			Error,
			'Unexpected number of arguments',
		);
	});

	it("meta should throw error if argument isn't MetadataType", () => {
		const notMetadataType = new types.NumberNode(42);
		assertions.assertThrows(
			() => core.meta(notMetadataType),
			Error,
			'Invalid metadata type',
		);
	});
});

describe('`with-meta`', () => {
	it('withMeta should set metadata', () => {
		const fn = new types.FunctionNode((x) => x);
		const metadata = new types.MapNode(
			new Map([['b', new types.NumberNode(1)]]),
		);
		const result = core.withMeta(fn, metadata);
		assertions.assertEquals(result instanceof types.FunctionNode, true);
		assertions.assertEquals(
			(
				(result as types.FunctionNode).metadata as types.MapNode
			).value.get('b')?.value,
			1,
		);
	});

	it('withMeta should throw error if not given exactly 2 arguments', () => {
		assertions.assertThrows(
			() => core.withMeta(),
			Error,
			'Unexpected number of arguments',
		);
	});

	it("withMeta should throw if first argument isn't MetadataType", () => {
		const notMetadataType = new types.NumberNode(42);
		const metadata = new types.MapNode(
			new Map([['b', new types.NumberNode(1)]]),
		);
		assertions.assertThrows(
			() => core.withMeta(notMetadataType, metadata),
			Error,
			'Invalid metadata type',
		);
	});
});

describe('isNil', () => {
	it('isNil should correctly identify nil', () => {
		assertions.assertEquals(
			core.isNil(new types.NilNode()),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isNil(new types.BooleanNode(true)),
			new types.BooleanNode(false),
		);
	});
});

describe('Boolean values', () => {
	it('isTrue should correctly identify true', () => {
		assertions.assertEquals(
			core.isTrue(new types.BooleanNode(true)),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isTrue(new types.BooleanNode(false)),
			new types.BooleanNode(false),
		);
	});

	it('isFalse should correctly identify false', () => {
		assertions.assertEquals(
			core.isFalse(new types.BooleanNode(false)),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isFalse(new types.BooleanNode(true)),
			new types.BooleanNode(false),
		);
	});
});

describe('isString', () => {
	it('isString should correctly identify string', () => {
		assertions.assertEquals(
			core.isString(new types.StringNode('foobar')),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isString(new types.BooleanNode(true)),
			new types.BooleanNode(false),
		);
	});
});

describe('Symbols', () => {
	it('symbol should create new Sym from Str', () => {
		const result = core.symbol(new types.StringNode('abc'));
		assertions.assertEquals(
			core.isSymbolNode(result),
			new types.BooleanNode(true),
		);
	});

	it('isSymbol should correctly identify symbol', () => {
		assertions.assertEquals(
			core.isSymbolNode(new types.SymbolNode('abc')),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isSymbolNode(new types.StringNode('abc')),
			new types.BooleanNode(false),
		);
	});
});

describe('Keywords', () => {
	it('keyword should create new Key from a Str', () => {
		const result = core.keyword(new types.StringNode('pie'));
		assertions.assertEquals(result.value, ':pie');
	});

	it('keyword should create new Key from a Sym', () => {
		const result = core.keyword(new types.SymbolNode('cake'));
		assertions.assertEquals(result.value, ':cake');
	});

	it('keyword should return an existing Key', () => {
		const key = new types.KeywordNode('cookies');
		const result = core.keyword(key);
		assertions.assertStrictEquals(result, key);
	});

	it('isKeyword should correctly identify keyword', () => {
		assertions.assertEquals(
			core.isKeyword(new types.KeywordNode(':abc')),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isKeyword(new types.SymbolNode('abc')),
			new types.BooleanNode(false),
		);
	});
});

describe('isNumber', () => {
	it('isNumber should correctly identify number', () => {
		assertions.assertEquals(
			core.isNumber(new types.NumberNode(2)),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isNumber(new types.StringNode('2')),
			new types.BooleanNode(false),
		);
	});
});

describe('isFn/isMacro', () => {
	it('isFn should correctly identify function', () => {
		const fn = new types.FunctionNode(() => new types.NilNode());
		fn.isMacro = false;
		assertions.assertEquals(core.isFn(fn), new types.BooleanNode(true));
		assertions.assertEquals(
			core.isFn(new types.NumberNode(2)),
			new types.BooleanNode(false),
		);
	});

	it('isMacro should correctly identify macro', () => {
		const fn = new types.FunctionNode(() => new types.NilNode());
		fn.isMacro = true;
		assertions.assertEquals(core.isMacro(fn), new types.BooleanNode(true));
		assertions.assertEquals(
			core.isMacro(new types.NumberNode(2)),
			new types.BooleanNode(false),
		);
	});
});

describe('Vectors', () => {
	it('vector should correctly create a vector', () => {
		const result = core.vector(
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		);
		const expected = new types.VectorNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		assertions.assertEquals(result, expected);
	});

	it('isVector should correctly identify a vector', () => {
		const vec = new types.VectorNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		assertions.assertEquals(
			core.isVector(vec),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isVector(new types.NumberNode(2)),
			new types.BooleanNode(false),
		);
	});
});

describe('Maps (Dicts)', () => {
	// Hash-map
	it('hashMap should create a dict from alternating args', () => {
		const result = core.hashMap(
			new types.StringNode('foo'),
			new types.NumberNode(1),
			new types.StringNode('bar'),
			new types.NumberNode(2),
		);
		const expectedMap = new Map([
			['"foo"', new types.NumberNode(1)],
			['"bar"', new types.NumberNode(2)],
		]);
		assertions.assertEquals(result.value, expectedMap);
	});

	it('should return an empty Dict if no arguments are passed', () => {
		const result = core.hashMap();
		assertions.assertEquals(result, new types.MapNode());
	});

	// IsMap
	it('isMap should correctly identify a dict', () => {
		const map = core.hashMap(
			new types.StringNode('foo'),
			new types.NumberNode(1),
		);
		assertions.assertEquals(core.isMap(map), new types.BooleanNode(true));
		assertions.assertEquals(
			core.isMap(new types.NumberNode(2)),
			new types.BooleanNode(false),
		);
	});

	// Assoc
	it('assoc should merge key/value pairs into a dict', () => {
		const initial = core.hashMap(
			new types.StringNode('foo'),
			new types.NumberNode(1),
		);
		const result = core.assoc(
			initial,
			new types.StringNode('bar'),
			new types.NumberNode(2),
		);
		const expectedMap = new Map([
			['"foo"', new types.NumberNode(1)],
			['"bar"', new types.NumberNode(2)],
		]);
		assertions.assertEquals(result.value, expectedMap);
	});

	// Dissoc
	it('dissoc should remove elements from a dict', () => {
		const initial = core.hashMap(
			new types.StringNode('foo'),
			new types.NumberNode(1),
			new types.StringNode('bar'),
			new types.NumberNode(2),
		);
		const result = core.dissoc(initial, new types.StringNode('foo'));
		const expectedMap = new Map([['"bar"', new types.NumberNode(2)]]);
		assertions.assertEquals(result.value, expectedMap);
	});

	// Get
	it('get should fetch the value by key from the dict', () => {
		const dict = core.hashMap(
			new types.KeywordNode(':foo'),
			new types.NumberNode(1),
			new types.KeywordNode(':bar'),
			new types.NumberNode(2),
		);
		assertions.assertEquals(
			core.get(dict, new types.KeywordNode(':bar')),
			new types.NumberNode(2),
		);
		assertions.assertEquals(
			core.get(dict, new types.KeywordNode(':baz')),
			new types.NilNode(),
		);
	});

	it('should return Nil when a non-dict is passed', () => {
		const nonDict = new types.StringNode('sharks');
		const randomKey = new types.KeywordNode('surfers');
		assertions.assertEquals(
			core.get(nonDict, randomKey),
			new types.NilNode(),
		);
	});

	// Contains
	it('contains should check if a key exists in the dict', () => {
		const dict = core.hashMap(
			new types.KeywordNode(':foo'),
			new types.NumberNode(1),
			new types.KeywordNode(':bar'),
			new types.NumberNode(2),
		);
		assertions.assertEquals(
			core.contains(dict, new types.KeywordNode(':bar')),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.contains(dict, new types.KeywordNode(':baz')),
			new types.BooleanNode(false),
		);
	});

	// Keys
	it('keys should return a list of all keys in the dict', () => {
		const dict = core.hashMap(
			new types.KeywordNode(':foo'),
			new types.NumberNode(1),
			new types.KeywordNode(':bar'),
			new types.NumberNode(2),
		);
		const result = core.keys(dict);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.KeywordNode(':foo'),
				new types.KeywordNode(':bar'),
			]),
		);
	});
});

describe('vals', () => {
	it('vals should return a list of all values in the dict', () => {
		const dict = core.hashMap(
			new types.KeywordNode(':foo'),
			new types.NumberNode(1),
			new types.KeywordNode(':bar'),
			new types.NumberNode(2),
		);
		const result = core.vals(dict);
		assertions.assertEquals(
			result,
			new types.ListNode([
				new types.NumberNode(1),
				new types.NumberNode(2),
			]),
		);
	});
});

describe('isSequential', () => {
	it('isSequential should return true for lists and vecs', () => {
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const vec = new types.VectorNode([
			new types.NumberNode(4),
			new types.NumberNode(5),
			new types.NumberNode(6),
		]);
		assertions.assertEquals(
			core.isSequentialNode(list),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isSequentialNode(vec),
			new types.BooleanNode(true),
		);
		assertions.assertEquals(
			core.isSequentialNode(new types.NumberNode(42)),
			new types.BooleanNode(false),
		);
	});
});

describe('join', () => {
	it('join should concatenate elements with a delimiter', () => {
		const list = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.StringNode('three'),
		]);
		assertions.assertEquals(
			core.join(list),
			new types.StringNode('1 2 three'),
		);
		assertions.assertEquals(
			core.join(list, new types.StringNode(', ')),
			new types.StringNode('1, 2, three'),
		);
	});
});
