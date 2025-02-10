import { Env } from "./env.ts";
import runner from "./tests/test_runner.ts";
import {
	type AstNode,
	createListNode,
	createNilNode,
	createNumberNode,
	createStringNode,
	createSymbolNode,
} from "./types.ts";

const { test, assert, report } = runner;

test("new Env(): should create a new environment", () => {
	const env = new Env();
	assert(env instanceof Env, true);
	assert(env.outer, undefined);
	assert(env.value.size, 0);
});

test("new Env(): should create a new environment with bindings and expressions", () => {
	const bindings = [createSymbolNode("a"), createSymbolNode("b")];
	const expressions = [createListNode([]), createNilNode()];
	const env = new Env(undefined, bindings, expressions);

	assert(env instanceof Env, true);
	assert(env.outer, undefined);
	assert(env.value.size, 2);
});

test("new Env(): should bind remaining expressions after '&'", () => {
	const env = new Env(
		undefined,
		[createSymbolNode("a"), createSymbolNode("&"), createSymbolNode("b")],
		[createStringNode("1"), createStringNode("2"), createStringNode("3")],
	);

	assert(env.value.size, 2);
	assert(
		env.value,
		new Map<string, AstNode>([
			["a", createStringNode("1")],
			["b", createListNode([createStringNode("2"), createStringNode("3")])],
		]),
	);
});

test("new Env(): should correctly handle ending '&' with no remaining exprs", () => {
	const env = new Env(
		undefined,
		[createSymbolNode("a"), createSymbolNode("&")],
		[createStringNode("1")],
	);
	assert(env.value.get("a"), createStringNode("1"));
});

test("new Env(): should bind to an empty list if there are no exprs after '&'", () => {
	const env = new Env(
		undefined,
		[createSymbolNode("a"), createSymbolNode("&"), createSymbolNode("b")],
		[createStringNode("1")],
	);

	assert(env.value.size, 2);
	assert(
		env.value,
		new Map<string, AstNode>([
			["a", createStringNode("1")],
			["b", createListNode([])],
		]),
	);

	assert(env.get(createSymbolNode("a")), createStringNode("1"));
	assert(env.get(createSymbolNode("b")), createListNode([]));
});

test("new Env(): should set outer environment", () => {
	const outer = new Env(
		undefined,
		[createSymbolNode("x")],
		[createNumberNode(1)],
	);
	const inner = new Env(outer);

	assert(inner.outer !== undefined, true);
});

test("set(): should set a new key-value pair", () => {
	const env = new Env(undefined);
	env.set(createSymbolNode("x"), createListNode([]));
	assert(env.get(createSymbolNode("x")), createListNode([]));
});

test("get(): should get a value from the environment", () => {
	const env = new Env(undefined, [createSymbolNode("a")], [createListNode([])]);
	const value = env.get(createSymbolNode("a"));
	assert(value, createListNode([]));
});

test("get(): should throw error when getting non-existent key", () => {
	const env = new Env(undefined);
	let threw = false;
	try {
		env.get(createSymbolNode("x"));
	} catch (e) {
		threw = true;
	}
	assert(threw, true);
});

test("get(): should find a value in the outer environment", () => {
	const outer = new Env(
		undefined,
		[createSymbolNode("x")],
		[createNumberNode(1)],
	);
	const inner = new Env(outer);
	assert(inner.get(createSymbolNode("x")), createNumberNode(1));
});

test("get(): should shadow value in inner environment", () => {
	const outerEnv = new Env(
		undefined,
		[createSymbolNode("a")],
		[createNilNode()],
	);
	const innerEnv = new Env(
		outerEnv,
		[createSymbolNode("a")],
		[createListNode([])],
	);
	const value = innerEnv.get(createSymbolNode("a"));
	assert(value, createListNode([]));
});

report();
