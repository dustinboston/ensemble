import { assertEquals, assertThrows, test } from '../tests/test_runner.ts';
import { Env } from './env.ts';
import {
  AstNode,
  createListNode,
  createNilNode,
  createNumberNode,
  createStringNode,
  createSymbolNode,
} from './types.ts';

test('new Env(): should create a new environment', () => {
  const env = new Env();
  assertEquals(env instanceof Env, true);
  assertEquals(env.outer, undefined);
  assertEquals(env.value.size, 0);
});

test('new Env(): should create a new environment with bindings and expressions', () => {
  const bindings = [
    createSymbolNode('a'),
    createSymbolNode('b'),
  ];
  const expressions = [createListNode([]), createNilNode()];
  const env = new Env(undefined, bindings, expressions);

  assertEquals(env instanceof Env, true);
  assertEquals(env.outer, undefined);
  assertEquals(env.value.size, 2);
});

test("new Env(): should bind remaining expressions after '&'", () => {
  const env = new Env(
    undefined,
    [
      createSymbolNode('a'),
      createSymbolNode('&'),
      createSymbolNode('b'),
    ],
    [
      createStringNode('1'),
      createStringNode('2'),
      createStringNode('3'),
    ],
  );

  assertEquals(env.value.size, 2);
  assertEquals(
    env.value,
    new Map<string, AstNode>([
      ['a', createStringNode('1')],
      [
        'b',
        createListNode([
          createStringNode('2'),
          createStringNode('3'),
        ]),
      ],
    ]),
  );
});

test("new Env(): should correctly handle ending '&' with no remaining exprs", () => {
  const env = new Env(
    undefined,
    [
      createSymbolNode('a'),
      createSymbolNode('&'),
    ],
    [createStringNode('1')],
  );
  assertEquals(env.value.get('a'), createStringNode('1'));
});

test("new Env(): should bind to an empty list if there are no exprs after '&'", () => {
  const env = new Env(
    undefined,
    [
      createSymbolNode('a'),
      createSymbolNode('&'),
      createSymbolNode('b'),
    ],
    [createStringNode('1')],
  );

  assertEquals(env.value.size, 2);
  assertEquals(
    env.value,
    new Map<string, AstNode>([
      ['a', createStringNode('1')],
      ['b', createListNode([])],
    ]),
  );

  assertEquals(
    env.get(createSymbolNode('a')),
    createStringNode('1'),
  );
  assertEquals(
    env.get(createSymbolNode('b')),
    createListNode([]),
  );
});

test('new Env(): should set outer environment', () => {
  const outer = new Env(
    undefined,
    [createSymbolNode('x')],
    [createNumberNode(1)],
  );
  const inner = new Env(outer);

  assertEquals(inner.outer !== undefined, true);
});

test('set(): should set a new key-value pair', () => {
  const env = new Env(undefined);
  env.set(createSymbolNode('x'), createListNode([]));
  assertEquals(
    env.get(createSymbolNode('x')),
    createListNode([]),
  );
});

test('get(): should get a value from the environment', () => {
  const env = new Env(
    undefined,
    [createSymbolNode('a')],
    [createListNode([])],
  );
  const value = env.get(createSymbolNode('a'));
  assertEquals(value, createListNode([]));
});

test('get(): should throw error when getting non-existent key', () => {
  const env = new Env(undefined);
  assertThrows(
    () => env.get(createSymbolNode('z')),
    Error,
    "'z' not found",
  );
});

test('get(): should find a value in the outer environment', () => {
  const outer = new Env(
    undefined,
    [createSymbolNode('x')],
    [createNumberNode(1)],
  );
  const inner = new Env(outer);
  assertEquals(
    inner.get(createSymbolNode('x')),
    createNumberNode(1),
  );
});

test('get(): should shadow value in inner environment', () => {
  const outerEnv = new Env(
    undefined,
    [createSymbolNode('a')],
    [createNilNode()],
  );
  const innerEnv = new Env(
    outerEnv,
    [createSymbolNode('a')],
    [createListNode([])],
  );
  const value = innerEnv.get(createSymbolNode('a'));
  assertEquals(value, createListNode([]));
});
