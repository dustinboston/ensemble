/**
 * Test the environment.
 * Imported from `step3_env.mal` tests.
 * @file
 */
import { initEnv, rep } from "../src/ensemble.js";
import { assertEquals, assertThrows, test } from "../tests/test_runner.js";
// Share the same environment for all tests.
const testEnv = initEnv();
// Functions from the default environment should be loaded (e.g. +, -, /, *)
test('ENV: Should add', () => {
    assertEquals(rep('(+ 1 2)', testEnv), '3');
});
test('ENV: Should divide', () => {
    assertEquals(rep('(/ (- (+ 5 (* 2 3)) 3) 4)', testEnv), '2');
});
// Testing def!
test('ENV: Should define x and retrieve its value', () => {
    assertEquals(rep('(def! x 3)', testEnv), '3');
    assertEquals(rep('x', testEnv), '3');
});
test('ENV: Should redefine x and retrieve the new value', () => {
    assertEquals(rep('(def! x 4)', testEnv), '4');
    assertEquals(rep('x', testEnv), '4');
});
test('ENV: Should define and retrieve y', () => {
    assertEquals(rep('(def! y (+ 1 7))', testEnv), '8');
    assertEquals(rep('y', testEnv), '8');
});
// Verifying symbols are case-sensitive
test('ENV: Should define and retrieve mynum', () => {
    assertEquals(rep('(def! mynum 111)', testEnv), '111');
    assertEquals(rep('mynum', testEnv), '111');
});
test('ENV: Should define and retrieve MYNUM', () => {
    assertEquals(rep('(def! MYNUM 222)', testEnv), '222');
    assertEquals(rep('MYNUM', testEnv), '222');
});
// Check env lookup non-fatal error
// TODO: Test this from the real repl
test('ENV: Should handle undefined symbol', () => {
    assertThrows(() => {
        rep('(abc 1 2 3)', testEnv);
    }, Error, "'abc' not found");
});
test('ENV: Check that error aborts def!', () => {
    assertEquals(rep('(def! w 123)', testEnv), '123');
    assertThrows(() => {
        rep('(def! w (abc))', testEnv);
    }, Error, "'abc' not found");
    assertEquals(rep('w', testEnv), '123');
});
// Testing let*
test('ENV: Should define and retrieve z', () => {
    assertEquals(rep('(let* (z 9) z)', testEnv), '9');
});
test('ENV: Should define and retrieve x', () => {
    assertEquals(rep('(let* (x 9) x)', testEnv), '9');
});
test('ENV: Should retrieve previous value of x', () => {
    assertEquals(rep('x', testEnv), '4');
});
test('ENV: Should compute expression with z', () => {
    assertEquals(rep('(let* (z (+ 2 3)) (+ 1 z))', testEnv), '6');
});
test('ENV: Should compute expression with p and q', () => {
    assertEquals(rep('(let* (p (+ 2 3) q (+ 2 p)) (+ p q))', testEnv), '12');
});
test('ENV: Should define y with let* and retrieve its value', () => {
    assertEquals(rep('(def! y (let* (z 7) z))', testEnv), '7');
    assertEquals(rep('y', testEnv), '7');
});
// Testing outer environment
test('ENV: Should define and retrieve a', () => {
    assertEquals(rep('(def! a 4)', testEnv), '4');
});
test('ENV: Should retrieve value of q', () => {
    assertEquals(rep('(let* (q 9) q)', testEnv), '9');
});
test('ENV: Should retrieve outer environment value of a', () => {
    assertEquals(rep('(let* (q 9) a)', testEnv), '4');
});
test('ENV: Should retrieve outer environment value of a with nested let*', () => {
    assertEquals(rep('(let* (z 2) (let* (q 9) a))', testEnv), '4');
});
// Testing let* with vector bindings
test('ENV: Vector bindings should work', () => {
    assertEquals(rep('(let* [z 9] z)', testEnv), '9');
});
test('ENV: Should compute expression with vector bindings', () => {
    assertEquals(rep('(let* [p (+ 2 3) q (+ 2 p)] (+ p q))', testEnv), '12');
});
// Testing vector evaluation
test('ENV: Should evaluate vector with bindings', () => {
    assertEquals(rep('(let* (a 5 b 6) [3 4 a [b 7] 8])', testEnv), '[3 4 5 [6 7] 8]');
});
// Check that last assignment takes priority
test('ENV: Last assignment takes priority', () => {
    assertEquals(rep('(let* (x 2 x 3) x)', testEnv), '3');
});
