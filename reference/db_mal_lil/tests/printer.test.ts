import * as assertions from 'deno-std-assert';
import * as bdd from 'deno-std-testing-bdd';
import * as printer from '../printer.ts';
import * as types from '../types.ts';

const {describe, it} = bdd;

describe('printer.printString function', () => {
	it('should correctly print string type', () => {
		assertions.assertEquals(
			printer.printString(new types.StringNode('hello')),
			'hello',
		);
		assertions.assertEquals(
			printer.printString(new types.StringNode('hello'), true),
			'"hello"',
		);
	});

	it('should correctly print key, bool, num, and sym types', () => {
		assertions.assertEquals(
			printer.printString(new types.KeywordNode('key')),
			'key',
		);
		assertions.assertEquals(
			printer.printString(new types.BooleanNode(true)),
			'true',
		);
		assertions.assertEquals(
			printer.printString(new types.NumberNode(123)),
			'123',
		);
		assertions.assertEquals(
			printer.printString(new types.SymbolNode('sym')),
			'sym',
		);
	});

	it('should correctly print atom type', () => {
		const atom = new types.AtomNode(new types.StringNode('hello'));
		assertions.assertEquals(printer.printString(atom), '(atom hello)');
	});

	it('should correctly print error type', () => {
		const error = new types.ErrorNode(
			new types.StringNode('error message'),
		);
		assertions.assertEquals(printer.printString(error), 'error message');
	});

	it('should correctly print function type', () => {
		const func = new types.FunctionNode(() => new types.NilNode());
		assertions.assertEquals(printer.printString(func), '#<fn>');
	});

	it('should correctly print list and vector types', () => {
		const list = new types.ListNode([
			new types.StringNode('a'),
			new types.StringNode('b'),
		]);
		const vec = new types.VectorNode([
			new types.StringNode('x'),
			new types.StringNode('y'),
		]);

		assertions.assertEquals(printer.printString(list), '(a b)');
		assertions.assertEquals(printer.printString(vec), '[x y]');
	});

	it('should correctly print dict and domNode types', () => {
		const dict = new types.MapNode(
			new Map<string, types.AstNode>([
				['a', new types.StringNode('1')],
				['b', new types.StringNode('2')],
			]),
		);
		const domNode = new types.DomNode(
			new Map<string, types.AstNode>([
				['x', new types.StringNode('10')],
				['y', new types.StringNode('20')],
			]),
		);

		assertions.assertEquals(printer.printString(dict), '{a 1 b 2}');
		assertions.assertEquals(printer.printString(domNode), '<x 10 y 20/>');
	});

	it('should correctly print nil type', () => {
		assertions.assertEquals(
			printer.printString(new types.NilNode()),
			'nil',
		);
	});

	class TestAst extends types.AstNode {
		value = Symbol.for('test-class');
		line = 0;
		column = 0;
	}
	it('should throw an error for unmatched types', () => {
		assertions.assertThrows(() => {
			printer.printString(new TestAst());
		});
	});
});
