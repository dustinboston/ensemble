/**
 * Tests for the printer module.
 * Mostly copied from `step1_read_print.mal`.
 * @file
 */
import { assertEquals, assertThrows, test } from "../tests/test_runner.js";
import { printString } from "./printer.js";
import { createAtomNode, createBooleanNode, createDomNode, createErrorNode, createFunctionNode, createKeywordNode, createListNode, createMapNode, createNilNode, createNumberNode, createStringNode, createSymbolNode, createVectorNode, } from "./types.js";
test('printString(): should print strings without quotes if printReadably is false', () => {
    assertEquals(printString(createStringNode('hello'), false), 'hello');
});
test('printString(): should print strings with quotes if printReadably is true', () => {
    assertEquals(printString(createStringNode('hello'), true), '"hello"');
});
test('printString(): should print symbols without quotes', () => {
    assertEquals(printString(createSymbolNode('sym')), 'sym');
});
test('printString(): should print keywords', () => {
    assertEquals(printString(createKeywordNode('key:')), 'key:');
});
test('printString(): should print booleans without quotes', () => {
    assertEquals(printString(createBooleanNode(true)), 'true');
});
test('printString(): should print numbers without quotes', () => {
    assertEquals(printString(createNumberNode(123)), '123');
});
test('printString(): should correctly print atom type', () => {
    assertEquals(printString(createAtomNode(createStringNode('hello'))), '(atom hello)');
});
test('printString(): should correctly print error type', () => {
    assertEquals(printString(createErrorNode(createStringNode('message'))), 'message');
});
test('printString(): should correctly print function type', () => {
    assertEquals(printString(createFunctionNode(() => createNilNode())), '#<fn>');
});
test('printString(): should correctly print list type', () => {
    assertEquals(printString(createListNode([
        createStringNode('a'),
        createStringNode('b'),
    ])), '(a b)');
});
test('printString(): should correctly print vector type', () => {
    assertEquals(printString(createVectorNode([
        createStringNode('x'),
        createStringNode('y'),
    ])), '[x y]');
});
test('printString(): should correctly print MapNodes', () => {
    assertEquals(printString(createMapNode(new Map([
        ['a', createNumberNode(1)],
        ['b', createNumberNode(2)],
    ]))), '{a 1 b 2}');
});
test('printString(): should correctly print DomNodes', () => {
    const domNode = createDomNode('a', new Map([['href', createStringNode('https://example.com')]]));
    assertEquals(printString(domNode), '<a href="https://example.com"></a>');
});
test('printString(): should correctly print nil type', () => {
    assertEquals(printString(createNilNode()), 'nil');
});
test('printString(): should throw an error for unmatched types', () => {
    const invalid = new Set();
    assertThrows(() => {
        printString(invalid);
    });
});
