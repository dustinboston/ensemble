/**
 * Test evaluation of expressions.
 * Imported from `step2_eval.mal` tests.
 * @file
 */
import { initEnv, rep } from '../src/lib';
import { assertEquals, assertThrows, test } from './test_runner';

test('EVAL: Should add', () => {
  const env = initEnv();
  assertEquals(rep('(+ 1 2))', env), '3');
});

test('EVAL: Should multiply', () => {
  const env = initEnv();
  assertEquals(rep('(+ 5 (* 2 3)))', env), '11');
});

test('EVAL: Should subtract', () => {
  const env = initEnv();
  assertEquals(rep('(- (+ 5 (* 2 3)) 3))', env), '8');
});

test('EVAL: Should divide', () => {
  const env = initEnv();
  assertEquals(rep('(/ (- (+ 5 (* 2 3)) 3) 4))', env), '2');
});

test('EVAL: Should evaluate bigger numbers', () => {
  const env = initEnv();
  assertEquals(
    rep('(/ (- (+ 515 (* 87 311)) 302) 27)', env),
    '1010',
  );
});

test('EVAL: Should throw an error with no return value', () => {
  const env = initEnv();
  assertThrows(() => {
    rep('(abc 1 2 3)', env);
  });
});

test('EVAL: Should return an empty array', () => {
  const env = initEnv();
  assertEquals(rep('()', env), '()');
});

test('EVAL: Should evaluate arrays', () => {
  const env = initEnv();
  assertEquals(rep('[1 2 (+ 1 2)]', env), '[1 2 3]');
});

test('EVAL: Should evaluate object literals', () => {
  const env = initEnv();
  assertEquals(rep('{ a: (+ 7 8) }', env), '{a: 15}');
});

test('EVAL: Should return an empty object literal', () => {
  const env = initEnv();
  assertEquals(rep('{}', env), '{}');
});
