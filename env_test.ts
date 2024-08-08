import { assertEquals, assertThrows } from './tests/deps.ts';
import { Env } from './env.ts';
import {
	AstNode,
	ListNode,
	NilNode,
	NumberNode,
	StringNode,
	SymbolNode,
} from './types.ts';

Deno.test('new Env(): should create a new environment', () => {
	const env = new Env();
	assertEquals(env instanceof Env, true);
	assertEquals(env.outer, undefined);
	assertEquals(env.value.size, 0);
});

Deno.test('new Env(): should create a new environment with bindings and expressions', () => {
	const bindings = [
		new SymbolNode('a'),
		new SymbolNode('b'),
	];
	const expressions = [new ListNode([]), new NilNode()];
	const env = new Env(undefined, bindings, expressions);

	assertEquals(env instanceof Env, true);
	assertEquals(env.outer, undefined);
	assertEquals(env.value.size, 2);
});

Deno.test("new Env(): should bind remaining expressions after '&'", () => {
	const env = new Env(
		undefined,
		[
			new SymbolNode('a'),
			new SymbolNode('&'),
			new SymbolNode('b'),
		],
		[
			new StringNode('1'),
			new StringNode('2'),
			new StringNode('3'),
		],
	);

	assertEquals(env.value.size, 2);
	assertEquals(
		env.value,
		new Map<string, AstNode>([
			['a', new StringNode('1')],
			[
				'b',
				new ListNode([
					new StringNode('2'),
					new StringNode('3'),
				]),
			],
		]),
	);
});

Deno.test("new Env(): should correctly handle ending '&' with no remaining exprs", () => {
	const env = new Env(
		undefined,
		[
			new SymbolNode('a'),
			new SymbolNode('&'),
		],
		[new StringNode('1')],
	);
	assertEquals(env.value.get('a'), new StringNode('1'));
});

Deno.test("new Env(): should bind to an empty list if there are no exprs after '&'", () => {
	const env = new Env(
		undefined,
		[
			new SymbolNode('a'),
			new SymbolNode('&'),
			new SymbolNode('b'),
		],
		[new StringNode('1')],
	);

	assertEquals(env.value.size, 2);
	assertEquals(
		env.value,
		new Map<string, AstNode>([
			['a', new StringNode('1')],
			['b', new ListNode([])],
		]),
	);

	assertEquals(
		env.get(new SymbolNode('a')),
		new StringNode('1'),
	);
	assertEquals(
		env.get(new SymbolNode('b')),
		new ListNode([]),
	);
});

Deno.test('new Env(): should set outer environment', () => {
	const outer = new Env(
		undefined,
		[new SymbolNode('x')],
		[new NumberNode(1)],
	);
	const inner = new Env(outer);

	assertEquals(inner.outer !== undefined, true);
});

Deno.test('set(): should set a new key-value pair', () => {
	const env = new Env(undefined);
	env.set(new SymbolNode('x'), new ListNode([]));
	assertEquals(
		env.get(new SymbolNode('x')),
		new ListNode([]),
	);
});

Deno.test('get(): should get a value from the environment', () => {
	const env = new Env(
		undefined,
		[new SymbolNode('a')],
		[new ListNode([])],
	);
	const value = env.get(new SymbolNode('a'));
	assertEquals(value, new ListNode([]));
});

Deno.test('get(): should throw error when getting non-existent key', () => {
	const env = new Env(undefined);
	assertThrows(
		() => env.get(new SymbolNode('z')),
		Error,
		"'z' not found",
	);
});

Deno.test('get(): should find a value in the outer environment', () => {
	const outer = new Env(
		undefined,
		[new SymbolNode('x')],
		[new NumberNode(1)],
	);
	const inner = new Env(outer);
	assertEquals(
		inner.get(new SymbolNode('x')),
		new NumberNode(1),
	);
});

Deno.test('get(): should shadow value in inner environment', () => {
	const outerEnv = new Env(
		undefined,
		[new SymbolNode('a')],
		[new NilNode()],
	);
	const innerEnv = new Env(
		outerEnv,
		[new SymbolNode('a')],
		[new ListNode([])],
	);
	const value = innerEnv.get(new SymbolNode('a'));
	assertEquals(value, new ListNode([]));
});
