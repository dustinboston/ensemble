/**
 * Test If, Fn, and Do forms.
 * Imported from `step4_if_fn_do.mal` tests.
 * @file
 */
import { assertEquals } from '@std/assert';
import { initEnv, rep } from '@/ensemble.ts';

// -----------------------------------------------------

Deno.test('IF_FN_DO: Testing list creation with empty list', () => {
	const env = initEnv();
	assertEquals(rep('(list)', env), '()');
});

Deno.test('IF_FN_DO: Testing if (list) is recognized as a list', () => {
	const env = initEnv();
	assertEquals(rep('(list? (list))', env), 'true');
});

Deno.test('IF_FN_DO: Testing if (list) is recognized as an empty list', () => {
	const env = initEnv();
	assertEquals(rep('(empty? (list))', env), 'true');
});

Deno.test('IF_FN_DO: Testing if (list 1) is not empty', () => {
	const env = initEnv();
	assertEquals(rep('(empty? (list 1))', env), 'false');
});

Deno.test('IF_FN_DO: Testing list creation with elements', () => {
	const env = initEnv();
	assertEquals(rep('(list 1 2 3)', env), '(1 2 3)');
});

Deno.test('IF_FN_DO: Testing count of elements in non-empty list', () => {
	const env = initEnv();
	assertEquals(rep('(count (list 1 2 3))', env), '3');
});

Deno.test('IF_FN_DO: Testing count of elements in empty list', () => {
	const env = initEnv();
	assertEquals(rep('(count (list))', env), '0');
});

Deno.test('IF_FN_DO: Testing count of nil', () => {
	const env = initEnv();
	assertEquals(rep('(count nil)', env), '0');
});

Deno.test('IF_FN_DO: Testing conditional based on count greater than 3', () => {
	const env = initEnv();
	assertEquals(rep('(if (> (count (list 1 2 3)) 3) 89 78)', env), '78');
});

Deno.test('IF_FN_DO: Testing conditional based on count greater than or equal to 3', () => {
	const env = initEnv();
	assertEquals(rep('(if (>= (count (list 1 2 3)) 3) 89 78)', env), '89');
});

// -----------------------------------------------------

Deno.test('IF_FN_DO: Testing true condition in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if true 7 8)', env), '7');
});

Deno.test('IF_FN_DO: Testing false condition in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if false 7 8)', env), '8');
});

Deno.test('IF_FN_DO: Testing false condition with false branch in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if false 7 false)', env), 'false');
});

Deno.test('IF_FN_DO: Testing true condition with arithmetic in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if true (+ 1 7) (+ 1 8))', env), '8');
});

Deno.test('IF_FN_DO: Testing false condition with arithmetic in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if false (+ 1 7) (+ 1 8))', env), '9');
});

Deno.test('IF_FN_DO: Testing nil condition in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if nil 7 8)', env), '8');
});

Deno.test('IF_FN_DO: Testing zero condition in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if 0 7 8)', env), '7');
});

Deno.test('IF_FN_DO: Testing empty list condition in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if (list) 7 8)', env), '7');
});

Deno.test('IF_FN_DO: Testing non-empty list condition in if form', () => {
	const env = initEnv();
	assertEquals(rep('(if (list 1 2 3) 7 8)', env), '7');
});

Deno.test('IF_FN_DO: Testing equality of empty list with nil in if form', () => {
	const env = initEnv();
	assertEquals(rep('(= (list) nil)', env), 'false');
});

// -----------------------------------------------------

Deno.test('IF_FN_DO: Testing 1-way if form with false condition', () => {
	const env = initEnv();
	assertEquals(rep('(if false (+ 1 7))', env), 'nil');
});

Deno.test('IF_FN_DO: Testing 1-way if form with nil condition', () => {
	const env = initEnv();
	assertEquals(rep('(if nil 8)', env), 'nil');
});

Deno.test('IF_FN_DO: Testing 1-way if form with nil condition and else branch', () => {
	const env = initEnv();
	assertEquals(rep('(if nil 8 7)', env), '7');
});

Deno.test('IF_FN_DO: Testing 1-way if form with true condition and arithmetic', () => {
	const env = initEnv();
	assertEquals(rep('(if true (+ 1 7))', env), '8');
});

// -----------------------------------------------------

Deno.test('IF_FN_DO: 2 and 1 are not equal', () => {
	const env = initEnv();
	assertEquals(rep('(= 2 1)', env), 'false');
});

Deno.test('IF_FN_DO: 1 and 1 are equal', () => {
	const env = initEnv();
	assertEquals(rep('(= 1 1)', env), 'true');
});

Deno.test('IF_FN_DO: 1 and 2 are equal', () => {
	const env = initEnv();
	assertEquals(rep('(= 1 2)', env), 'false');
});

Deno.test('IF_FN_DO: Testing equality with 1 and (+ 1 1)', () => {
	const env = initEnv();
	assertEquals(rep('(= 1 (+ 1 1))', env), 'false');
});

Deno.test('IF_FN_DO: Testing equality with 2 and (+ 1 1)', () => {
	const env = initEnv();
	assertEquals(rep('(= 2 (+ 1 1))', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality with nil and 1', () => {
	const env = initEnv();
	assertEquals(rep('(= nil 1)', env), 'false');
});

Deno.test('IF_FN_DO: nil and nil are equal', () => {
	const env = initEnv();
	assertEquals(rep('(= nil nil)', env), 'true');
});

Deno.test('IF_FN_DO: Testing greater than comparison with 2 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(> 2 1)', env), 'true');
});

Deno.test('IF_FN_DO: Testing greater than comparison with 1 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(> 1 1)', env), 'false');
});

Deno.test('IF_FN_DO: Testing greater than comparison with 1 and 2', () => {
	const env = initEnv();
	assertEquals(rep('(> 1 2)', env), 'false');
});

Deno.test('IF_FN_DO: Testing greater than or equal comparison with 2 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(>= 2 1)', env), 'true');
});

Deno.test('IF_FN_DO: Testing greater than or equal comparison with 1 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(>= 1 1)', env), 'true');
});

Deno.test('IF_FN_DO: Testing greater than or equal comparison with 1 and 2', () => {
	const env = initEnv();
	assertEquals(rep('(>= 1 2)', env), 'false');
});

Deno.test('IF_FN_DO: Testing less than comparison with 2 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(< 2 1)', env), 'false');
});

Deno.test('IF_FN_DO: Testing less than comparison with 1 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(< 1 1)', env), 'false');
});

Deno.test('IF_FN_DO: Testing less than comparison with 1 and 2', () => {
	const env = initEnv();
	assertEquals(rep('(< 1 2)', env), 'true');
});

Deno.test('IF_FN_DO: Testing less than or equal comparison with 2 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(<= 2 1)', env), 'false');
});

Deno.test('IF_FN_DO: Testing less than or equal comparison with 1 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(<= 1 1)', env), 'true');
});

Deno.test('IF_FN_DO: Testing less than or equal comparison with 1 and 2', () => {
	const env = initEnv();
	assertEquals(rep('(<= 1 2)', env), 'true');
});

// -----------------------------------------------------

Deno.test('IF_FN_DO: Testing equality with 1 and 1', () => {
	const env = initEnv();
	assertEquals(rep('(= 1 1)', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality with 0 and 0', () => {
	const env = initEnv();
	assertEquals(rep('(= 0 0)', env), 'true');
});

Deno.test('IF_FN_DO: Testing inequality with 1 and 0', () => {
	const env = initEnv();
	assertEquals(rep('(= 1 0)', env), 'false');
});

Deno.test('IF_FN_DO: Testing equality with true and true', () => {
	const env = initEnv();
	assertEquals(rep('(= true true)', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality with false and false', () => {
	const env = initEnv();
	assertEquals(rep('(= false false)', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality with nil and nil', () => {
	const env = initEnv();
	assertEquals(rep('(= nil nil)', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality of two empty lists', () => {
	const env = initEnv();
	assertEquals(rep('(= (list) (list))', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality of empty list and nil', () => {
	const env = initEnv();
	assertEquals(rep('(= (list) ())', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality of two lists with elements', () => {
	const env = initEnv();
	assertEquals(rep('(= (list 1 2) (list 1 2))', env), 'true');
});

Deno.test('IF_FN_DO: Testing equality of two nested lists', () => {
	const env = initEnv();
	assertEquals(
		rep('(= (list (list 1) (list 2)) (list (list 1) (list 2)))', env),
		'true',
	);
});

// -----------------------------------------------------

Deno.test('IF_FN_DO: Testing (list? (list))', () => {
	const env = initEnv();
	assertEquals(rep('(list? (list))', env), 'true');
});

Deno.test('IF_FN_DO: Testing (empty? (list))', () => {
	const env = initEnv();
	assertEquals(rep('(empty? (list))', env), 'true');
});

Deno.test('IF_FN_DO: Testing (empty? (list 1))', () => {
	const env = initEnv();
	assertEquals(rep('(empty? (list 1))', env), 'false');
});

Deno.test('IF_FN_DO: Testing (empty? (list 1 2 3))', () => {
	const env = initEnv();
	assertEquals(rep('(empty? (list 1 2 3))', env), 'false');
});

Deno.test('IF_FN_DO: Testing (empty? (list 1 2 3 4))', () => {
	const env = initEnv();
	assertEquals(rep('(empty? (list 1 2 3 4))', env), 'false');
});
