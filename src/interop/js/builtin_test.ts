import { assertEquals, assertThrows, test } from '../../../tests/test_runner.ts';
import * as types from '../../types.ts';
import * as builtin from './builtin.ts';

test('globalDecodeURI - basic functionality', () => {
  const uri = types.createStringNode('https://example.com/test%20uri');
  const result = builtin.globalDecodeUri(uri);
  assertEquals(result, types.createStringNode('https://example.com/test uri'));
});

test('globalDecodeURI - invalid arguments', () => {
  assertThrows(() => builtin.globalDecodeUri());
  assertThrows(() => builtin.globalDecodeUri(types.createNumberNode(1)));
  assertThrows(() => builtin.globalDecodeUri(types.createStringNode('test'), types.createStringNode('test')));
});

test('globalDecodeURIComponent - basic functionality', () => {
  const uri = types.createStringNode('test%20uri');
  const result = builtin.globalDecodeUriComponent(uri);
  assertEquals(result, types.createStringNode('test uri'));
});

test('globalDecodeURIComponent - invalid arguments', () => {
  assertThrows(() => builtin.globalDecodeUriComponent());
  assertThrows(() => builtin.globalDecodeUriComponent(types.createNumberNode(1)));
  assertThrows(() => builtin.globalDecodeUriComponent(types.createStringNode('test'), types.createStringNode('test')));
});

test('globalEncodeURI - basic functionality', () => {
  const uri = types.createStringNode('https://example.com/test uri');
  const result = builtin.globalEncodeUri(uri);

  assertEquals(result, types.createStringNode('https://example.com/test%20uri'));
});

test('globalEncodeURI - invalid arguments', () => {
  assertThrows(() => builtin.globalEncodeUri());
  assertThrows(() => builtin.globalEncodeUri(types.createNumberNode(1)));
  assertThrows(() => builtin.globalEncodeUri(types.createStringNode('test'), types.createStringNode('test')));
});

test('globalEncodeURIComponent - basic functionality', () => {
  const uri = types.createStringNode('test uri');

  const result = builtin.globalEncodeUriComponent(uri);
  assertEquals(result, types.createStringNode('test%20uri'));
});

test('globalEncodeURIComponent - invalid arguments', () => {
  assertThrows(() => builtin.globalEncodeUriComponent());
  assertThrows(() => builtin.globalEncodeUriComponent(types.createNumberNode(1)));
  assertThrows(() => builtin.globalEncodeUriComponent(types.createStringNode('test'), types.createStringNode('test')));
});
