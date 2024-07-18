import * as assertions from 'deno-std-assert';
import * as bdd from 'deno-std-testing-bdd';
import {Env} from '../env.ts';
import * as types from '../types.ts';

const {describe, it} = bdd;

describe('Env', () => {
	it('should create a new environment with the Env class', () => {
		const env = new Env(
			undefined,
			[new types.SymbolNode('a'), new types.SymbolNode('b')],
			[new types.ListNode([]), new types.NilNode()],
		);
		assertions.assertEquals(
			env.get(new types.SymbolNode('a')),
			new types.ListNode([]),
		);
		assertions.assertEquals(
			env.get(new types.SymbolNode('b')),
			new types.NilNode(),
		);
	});

	it("should correctly bind remaining expressions after '&'", () => {
		const binds = [
			new types.SymbolNode('a'),
			new types.SymbolNode('&'),
			new types.SymbolNode('b'),
		];
		const exprs = [
			new types.StringNode('1'),
			new types.StringNode('2'),
			new types.StringNode('3'),
		];
		const env = new Env(undefined, binds, exprs);

		assertions.assertEquals(
			env.get(new types.SymbolNode('a')),
			new types.StringNode('1'),
		);
		assertions.assertEquals(
			env.get(new types.SymbolNode('b')),
			new types.ListNode([
				new types.StringNode('2'),
				new types.StringNode('3'),
			]),
		);
	});

	it("should correctly handle ending '&' with no remaining exprs", () => {
		const binds = [new types.SymbolNode('a'), new types.SymbolNode('&')];
		const exprs = [new types.StringNode('1')];
		const env = new Env(undefined, binds, exprs);

		assertions.assertEquals(
			env.get(new types.SymbolNode('a')),
			new types.StringNode('1'),
		);
	});

	it("should bind to an empty list if there are no exprs after '&'", () => {
		const binds = [
			new types.SymbolNode('a'),
			new types.SymbolNode('&'),
			new types.SymbolNode('b'),
		];
		const exprs = [new types.StringNode('1')];
		const env = new Env(undefined, binds, exprs);

		assertions.assertEquals(
			env.get(new types.SymbolNode('a')),
			new types.StringNode('1'),
		);
		assertions.assertEquals(
			env.get(new types.SymbolNode('b')),
			new types.ListNode([]),
		);
	});

	it('should set a new key-value pair', () => {
		const env = new Env(undefined);
		env.set(new types.SymbolNode('x'), new types.ListNode([]));
		assertions.assertEquals(
			env.get(new types.SymbolNode('x')),
			new types.ListNode([]),
		);
	});

	it('should set a new key-value pair in class-based env', () => {
		const env = new Env(undefined);
		env.set(new types.SymbolNode('x'), new types.NumberNode(42));
		assertions.assertEquals(
			env.get(new types.SymbolNode('x')),
			new types.NumberNode(42),
		);
	});

	it('should get a value from the environment', () => {
		const env = new Env(
			undefined,
			[new types.SymbolNode('a')],
			[new types.ListNode([])],
		);
		const value = env.get(new types.SymbolNode('a'));
		assertions.assertEquals(value, new types.ListNode([]));
	});

	it('should get a value from class-based environment', () => {
		const env = new Env(undefined);
		env.set(new types.SymbolNode('x'), new types.NumberNode(42));
		assertions.assertEquals(
			env.get(new types.SymbolNode('x')),
			new types.NumberNode(42),
		);
	});

	it('should throw error when getting non-existent key', () => {
		const env = new Env(undefined);
		assertions.assertThrows(
			() => env.get(new types.SymbolNode('z')),
			Error,
			"'z' not found",
		);
	});

	it('should set outer environment', () => {
		const outer = new Env(
			undefined,
			[new types.SymbolNode('x')],
			[new types.NumberNode(1)],
		);
		const inner = new Env(outer);

		assertions.assertEquals(inner.outer !== undefined, true);
	});

	it('should find a value in the outer environment with class', () => {
		const outer = new Env(
			undefined,
			[new types.SymbolNode('x')],
			[new types.NumberNode(1)],
		);
		const inner = new Env(outer);
		assertions.assertEquals(
			inner.get(new types.SymbolNode('x')),
			new types.NumberNode(1),
		);
	});

	it('should override value in inner environment', () => {
		const outerEnv = new Env(
			undefined,
			[new types.SymbolNode('a')],
			[new types.NilNode()],
		);
		const innerEnv = new Env(
			outerEnv,
			[new types.SymbolNode('a')],
			[new types.ListNode([])],
		);
		const value = innerEnv.get(new types.SymbolNode('a'));
		assertions.assertEquals(value, new types.ListNode([]));
	});

	it('class: should override value in inner environment', () => {
		const outer = new Env(
			undefined,
			[new types.SymbolNode('x')],
			[new types.NumberNode(1)],
		);
		const inner = new Env(
			outer,
			[new types.SymbolNode('x')],
			[new types.NumberNode(2)],
		);
		assertions.assertEquals(
			inner.get(new types.SymbolNode('x')),
			new types.NumberNode(2),
		);
	});
});
