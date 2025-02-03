import { assertEquals, assertThrows } from '@std/assert';
import * as builtin from './interop/js/builtin.ts';
import * as types from './types.ts';

Deno.test('globalDecodeURI - basic functionality', () => {
  const uri = types.createStringNode('https://example.com/test%20uri');
  const result = builtin.globalDecodeUri(uri);
  assertEquals(result, types.createStringNode('https://example.com/test uri'));
});

Deno.test('globalDecodeURI - invalid arguments', () => {
  assertThrows(() => builtin.globalDecodeUri());
  assertThrows(() => builtin.globalDecodeUri(types.createNumberNode(1)));
  assertThrows(() => builtin.globalDecodeUri(types.createStringNode('test'), types.createStringNode('test')));
});

Deno.test('globalDecodeURIComponent - basic functionality', () => {
  const uri = types.createStringNode('test%20uri');
  const result = builtin.globalDecodeUriComponent(uri);
  assertEquals(result, types.createStringNode('test uri'));
});

Deno.test('globalDecodeURIComponent - invalid arguments', () => {
  assertThrows(() => builtin.globalDecodeUriComponent());
  assertThrows(() => builtin.globalDecodeUriComponent(types.createNumberNode(1)));
  assertThrows(() => builtin.globalDecodeUriComponent(types.createStringNode('test'), types.createStringNode('test')));
});

Deno.test('globalEncodeURI - basic functionality', () => {
  const uri = types.createStringNode('https://example.com/test uri');
  const result = builtin.globalEncodeUri(uri);

  assertEquals(result, types.createStringNode('https://example.com/test%20uri'));
});

Deno.test('globalEncodeURI - invalid arguments', () => {
  assertThrows(() => builtin.globalEncodeUri());
  assertThrows(() => builtin.globalEncodeUri(types.createNumberNode(1)));
  assertThrows(() => builtin.globalEncodeUri(types.createStringNode('test'), types.createStringNode('test')));
});

Deno.test('globalEncodeURIComponent - basic functionality', () => {
  const uri = types.createStringNode('test uri');

  const result = builtin.globalEncodeUriComponent(uri);
  assertEquals(result, types.createStringNode('test%20uri'));
});

Deno.test('globalEncodeURIComponent - invalid arguments', () => {
  assertThrows(() => builtin.globalEncodeUriComponent());
  assertThrows(() => builtin.globalEncodeUriComponent(types.createNumberNode(1)));
  assertThrows(() => builtin.globalEncodeUriComponent(types.createStringNode('test'), types.createStringNode('test')));
});
