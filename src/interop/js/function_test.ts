import { assertEquals, assertThrows, test } from '../../../tests/test_runner.ts';
import * as types from '../../types.ts';
import { apply, bind, call, jsEval } from './function.ts';

// jsEval
// --------------------------------------------------------------------------------------------------------------------

test('jsEval - evaluates a js expression', () => {
  const code = types.createStringNode('1 + 1');
  const result = jsEval(code);

  assertEquals(result, types.createNumberNode(2));
});

test('jsEval - handles errors', () => {
  const code = types.createStringNode('invalid javascript');
  const result = jsEval(code);

  assertEquals(types.isErrorNode(result), true);
});

test('jsEval - invalid arguments', () => {
  assertThrows(() => jsEval());

  const num = types.createNumberNode(0);
  assertThrows(() => jsEval(num));
  assertThrows(() => jsEval(types.createStringNode(''), types.createStringNode('')));
});

// apply
// --------------------------------------------------------------------------------------------------------------------

test('apply - basic functionality', () => {
  const fn = types.createFunctionNode((a: types.AstNode, b: types.AstNode) =>
    types.createNumberNode(a.value + b.value)
  );
  const args = types.createVectorNode([types.createNumberNode(1), types.createNumberNode(2)]);
  const result = apply(fn, args);

  assertEquals(result, types.createNumberNode(3));
});

test('apply - invalid arguments', () => {
  const fn = types.createFunctionNode(() => types.createNilNode());
  const num = types.createNumberNode(1);

  assertThrows(() => apply());
  assertThrows(() => apply(fn));
  assertThrows(() => apply(num, num));
  assertThrows(() => apply(fn, num));
});

// call
// --------------------------------------------------------------------------------------------------------------------

test('call - basic functionality', () => {
  const fn = types.createFunctionNode((a: types.AstNode, b: types.AstNode) =>
    types.createNumberNode(a.value + b.value)
  );
  const arg1 = types.createNumberNode(1);
  const arg2 = types.createNumberNode(2);
  const result = call(fn, arg1, arg2);

  assertEquals(result, types.createNumberNode(3));
});

test('call - invalid arguments', () => {
  const num = types.createNumberNode(1);

  assertThrows(() => call());
  assertThrows(() => call(num));
});

// bind
// --------------------------------------------------------------------------------------------------------------------

test('bind - basic functionality', () => {
  let counter = 0;
  const increment = () => {
    counter++;
    return types.createNumberNode(counter);
  };
  const fn = types.createFunctionNode(increment);
  const boundFn = bind(fn, fn); // The second argument can be any AstNode

  assertEquals(types.isFunctionNode(boundFn), true);
  assertEquals(boundFn.value(), types.createNumberNode(1)); // Call the bound function
  assertEquals(boundFn.value(), types.createNumberNode(2)); // counter should have incremented
});

test('bind - invalid arguments', () => {
  const fn = types.createFunctionNode(() => types.createNilNode());
  const num = types.createNumberNode(0);

  assertThrows(() => bind());
  assertThrows(() => bind(fn));
  assertThrows(() => bind(num, num));
});
