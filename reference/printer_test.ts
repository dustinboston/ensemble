/**
 * Tests for the printer module.
 * Mostly copied from `step1_read_print.mal`.
 * @file
 */

import { assertEquals, assertThrows } from '@std/assert';
import { printString } from './printer.ts';
import {
  AstNode,
  AtomNode,
  BooleanNode,
  DomNode,
  ErrorNode,
  FunctionNode,
  KeywordNode,
  ListNode,
  MapNode,
  NilNode,
  NumberNode,
  StringNode,
  SymbolNode,
  VectorNode,
} from './types.ts';

Deno.test('printString(): should print strings without quotes if printReadably is false', () => {
  assertEquals(
    printString(new StringNode('hello'), false),
    'hello',
  );
});

Deno.test('printString(): should print strings with quotes if printReadably is true', () => {
  assertEquals(
    printString(new StringNode('hello'), true),
    '"hello"',
  );
});

Deno.test('printString(): should print symbols without quotes', () => {
  assertEquals(
    printString(new SymbolNode('sym')),
    'sym',
  );
});

Deno.test('printString(): should print keywords', () => {
  assertEquals(
    printString(new KeywordNode(':key')),
    ':key',
  );
});

Deno.test('printString(): should print booleans without quotes', () => {
  assertEquals(
    printString(new BooleanNode(true)),
    'true',
  );
});

Deno.test('printString(): should print numbers without quotes', () => {
  assertEquals(
    printString(new NumberNode(123)),
    '123',
  );
});

Deno.test('printString(): should correctly print atom type', () => {
  assertEquals(
    printString(new AtomNode(new StringNode('hello'))),
    '(atom hello)',
  );
});

Deno.test('printString(): should correctly print error type', () => {
  assertEquals(
    printString(
      new ErrorNode(
        new StringNode('message'),
      ),
    ),
    'message',
  );
});

Deno.test('printString(): should correctly print function type', () => {
  assertEquals(printString(new FunctionNode(() => new NilNode())), '#<fn>');
});

Deno.test('printString(): should correctly print list type', () => {
  assertEquals(
    printString(
      new ListNode([
        new StringNode('a'),
        new StringNode('b'),
      ]),
    ),
    '(a b)',
  );
});

Deno.test('printString(): should correctly print vector type', () => {
  assertEquals(
    printString(
      new VectorNode([
        new StringNode('x'),
        new StringNode('y'),
      ]),
    ),
    '[x y]',
  );
});

Deno.test('printString(): should correctly print MapNodes', () => {
  assertEquals(
    printString(
      new MapNode(
        new Map<string, AstNode>([
          ['a', new NumberNode(1)],
          ['b', new NumberNode(2)],
        ]),
      ),
    ),
    '{a 1 b 2}',
  );
});

Deno.test('printString(): should correctly print DomNodes', () => {
  assertEquals(
    printString(
      new DomNode(
        new Map<string, AstNode>([
          ['x', new NumberNode(10)],
          ['y', new NumberNode(20)],
        ]),
      ),
    ),
    '<x 10 y 20>',
  );
});

Deno.test('printString(): should correctly print nil type', () => {
  assertEquals(
    printString(new NilNode()),
    'nil',
  );
});

Deno.test('printString(): should throw an error for unmatched types', () => {
  class TestAst extends AstNode {
    value = 'TestAst';
  }

  assertThrows(() => {
    printString(new TestAst());
  });
});
