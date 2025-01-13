/**
 * Tests for the printer module.
 * Mostly copied from `step1_read_print.mal`.
 * @file
 */

import { assertEquals, assertThrows } from '@std/assert';
import { printString } from './printer.ts';
import {
  AstNode,
  createAtomNode,
  createBooleanNode,
  createDomNode,
  createErrorNode,
  createFunctionNode,
  createKeywordNode,
  createListNode,
  createMapNode,
  createNilNode,
  createNumberNode,
  createStringNode,
  createSymbolNode,
  createVectorNode,
} from './types.ts';

Deno.test('printString(): should print strings without quotes if printReadably is false', () => {
  assertEquals(
    printString(createStringNode('hello'), false),
    'hello',
  );
});

Deno.test('printString(): should print strings with quotes if printReadably is true', () => {
  assertEquals(
    printString(createStringNode('hello'), true),
    '"hello"',
  );
});

Deno.test('printString(): should print symbols without quotes', () => {
  assertEquals(
    printString(createSymbolNode('sym')),
    'sym',
  );
});

Deno.test('printString(): should print keywords', () => {
  assertEquals(
    printString(createKeywordNode('key:')),
    'key:',
  );
});

Deno.test('printString(): should print booleans without quotes', () => {
  assertEquals(
    printString(createBooleanNode(true)),
    'true',
  );
});

Deno.test('printString(): should print numbers without quotes', () => {
  assertEquals(
    printString(createNumberNode(123)),
    '123',
  );
});

Deno.test('printString(): should correctly print atom type', () => {
  assertEquals(
    printString(createAtomNode(createStringNode('hello'))),
    '(atom hello)',
  );
});

Deno.test('printString(): should correctly print error type', () => {
  assertEquals(
    printString(
      createErrorNode(
        createStringNode('message'),
      ),
    ),
    'message',
  );
});

Deno.test('printString(): should correctly print function type', () => {
  assertEquals(printString(createFunctionNode(() => createNilNode())), '#<fn>');
});

Deno.test('printString(): should correctly print list type', () => {
  assertEquals(
    printString(
      createListNode([
        createStringNode('a'),
        createStringNode('b'),
      ]),
    ),
    '(a b)',
  );
});

Deno.test('printString(): should correctly print vector type', () => {
  assertEquals(
    printString(
      createVectorNode([
        createStringNode('x'),
        createStringNode('y'),
      ]),
    ),
    '[x y]',
  );
});

Deno.test('printString(): should correctly print MapNodes', () => {
  assertEquals(
    printString(
      createMapNode(
        new Map<string, AstNode>([
          ['a', createNumberNode(1)],
          ['b', createNumberNode(2)],
        ]),
      ),
    ),
    '{a 1 b 2}',
  );
});

Deno.test('printString(): should correctly print DomNodes', () => {
  const domNode = createDomNode('a', new Map([['href', createStringNode('https://example.com')]]));
  assertEquals(printString(domNode), '<a href="https://example.com"></a>');
});

Deno.test('printString(): should correctly print nil type', () => {
  assertEquals(
    printString(createNilNode()),
    'nil',
  );
});

Deno.test('printString(): should throw an error for unmatched types', () => {
  const invalid = new Set();

  assertThrows(() => {
    printString(invalid as unknown as AstNode);
  });
});
