import { initEnv, rep } from '../../src/lib.ts';
import { assertEquals, test } from '../../tests/test_runner.ts';

const replEnv = initEnv();

test('ARRAY INTEROP: Array constructor', () => {
  assertEquals(rep('(Array 1 2 3)', replEnv), '[1 2 3]');
});

test('ARRAY INTEROP: Array.from with vector', () => {
  assertEquals(rep('(Array.from [1 2 3])', replEnv), '[1 2 3]');
});

test('ARRAY INTEROP: Array.from with vector and mapping function', () => {
  assertEquals(rep('(Array.from [1 2 3] (function (x) (* x 2)))', replEnv), '[2 4 6]');
});

// TODO: test('ARRAY INTEROP: Array.from with vector, mapping function, and thisArg', () => {
//   assertEquals(
//     rep('(let [obj {:val 1}] (Array.from [1 2 3] (function (x) (+ x (Array::-val this))) obj))', replEnv),
//     '[2 3 4]',
//   );
// });

test('ARRAY INTEROP: Array.from with empty vector', () => {
  assertEquals(rep('(Array.from [])', replEnv), '[]');
});

test('ARRAY INTEROP: Array.from with nested vectors', () => {
  assertEquals(rep('(Array.from [[1 2] [3 4]])', replEnv), '[[1 2] [3 4]]');
});

test('ARRAY INTEROP: Array.from with different types', () => {
  assertEquals(rep('(Array.from [1 "hello" keyword:])', replEnv), '[1 "hello" keyword:]');
});

test('ARRAY INTEROP: Array.isArray', () => {
  assertEquals(rep('(Array.isArray [1 2 3])', replEnv), 'true');
});

test('ARRAY INTEROP: Array.isArray (false)', () => {
  assertEquals(rep('(Array.isArray 1)', replEnv), 'false');
});

test('ARRAY INTEROP: Array.prototype.at', () => {
  assertEquals(rep('(Array::at [1 2 3] 1)', replEnv), '2');
});

test('ARRAY INTEROP: Array.prototype.concat', () => {
  assertEquals(rep('(Array::concat [1 2] [3 4])', replEnv), '[1 2 3 4]');
});

test('ARRAY INTEROP: Array.prototype.copyWithin', () => {
  assertEquals(rep('(Array::copyWithin [1 2 3] 0 1 2)', replEnv), '[2 2 3]');
});

test('ARRAY INTEROP: Array.prototype.entries', () => {
  assertEquals(rep('(Array::entries [1 2 3])', replEnv), '[[0 1] [1 2] [2 3]]');
});

// TODO: test('ARRAY INTEROP: Array.prototype.every', () => {
//   assertEquals(rep('(Array::every [1 2 3] (function (x) (> x 0)))', replEnv), 'true');
// });

// TODO: test('ARRAY INTEROP: Array.prototype.fill', () => {
//   assertEquals(rep('(Array::fill [1 2 3] 0 1 2)', replEnv), '[0 0 3]');
// });

// TODO: test('ARRAY INTEROP: Array.prototype.filter', () => {
//   assertEquals(rep('(Array::filter [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '[2 4]');
// });

// TODO: test('ARRAY INTEROP: Array.prototype.find', () => {
//   assertEquals(rep('(Array::find [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '2');
// });

// TODO: test('ARRAY INTEROP: Array.prototype.findIndex', () => {
//   assertEquals(rep('(Array::findIndex [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '1');
// });

// TODO: test('ARRAY INTEROP: Array.prototype.findLast', () => {
//   assertEquals(rep('(Array::findLast [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '4');
// });

// TODO: test('ARRAY INTEROP: Array.prototype.findLastIndex', () => {
//   assertEquals(rep('(Array::findLastIndex [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '3');
// });

test('ARRAY INTEROP: Array.prototype.flat', () => {
  assertEquals(rep('(Array::flat [[1 2] [3 4]])', replEnv), '[1 2 3 4]');
});

test('ARRAY INTEROP: Array.prototype.flatMap', () => {
  assertEquals(rep('(Array::flatMap [1 2] (function (x) [(* x 2) (* x 3)]))', replEnv), '[2 3 4 6]');
});

test('ARRAY INTEROP: Array.prototype.includes', () => {
  assertEquals(rep('(Array::includes [1 2 3] 2)', replEnv), 'true');
});

test('ARRAY INTEROP: Array.prototype.indexOf', () => {
  assertEquals(rep('(Array::indexOf [1 2 3] 2)', replEnv), '1');
});

// TODO: test('ARRAY INTEROP: Array.prototype.join', () => {
//   assertEquals(rep('(Array::join [1 2 3] ", ")', replEnv), '1, 2, 3');
// });

test('ARRAY INTEROP: Array.prototype.keys', () => {
  assertEquals(rep('(Array::keys [1 2 3])', replEnv), '[0 1 2]');
});

test('ARRAY INTEROP: Array.prototype.map', () => {
  assertEquals(rep('(Array::map [1 2 3] (function (x) (* x 2)))', replEnv), '[2 4 6]');
});

test('ARRAY INTEROP: Array.prototype.pop', () => {
  assertEquals(rep('(Array::pop [1 2 3])', replEnv), '3');
});

test('ARRAY INTEROP: Array.prototype.push', () => {
  assertEquals(rep('(Array::push [1 2] 3 4)', replEnv), '[1 2 3 4]');
});

// TODO: test('ARRAY INTEROP: Array.prototype.reduce', () => {
//   assertEquals(rep('(Array::reduce [1 2 3] (function (acc x) (+ acc x)) 0)', replEnv), '6');
// });

test('ARRAY INTEROP: Array.prototype.reverse', () => {
  assertEquals(rep('(Array::reverse [1 2 3])', replEnv), '[3 2 1]');
});

test('ARRAY INTEROP: Array.prototype.shift', () => {
  assertEquals(rep('(Array::shift [1 2 3])', replEnv), '1');
});

test('ARRAY INTEROP: Array.prototype.slice', () => {
  assertEquals(rep('(Array::slice [1 2 3] 1 2)', replEnv), '[2]');
});

// TODO: test('ARRAY INTEROP: Array.prototype.some', () => {
//   assertEquals(rep('(Array::some [1 2 3] (function (x) (= (mod x 2) 0)))', replEnv), 'true');
// });

test('ARRAY INTEROP: Array.prototype.sort', () => {
  assertEquals(rep('(Array::sort [3 1 2] (function (a b) (- a b)))', replEnv), '[1 2 3]');
});

test('ARRAY INTEROP: Array.prototype.splice', () => {
  assertEquals(rep('(Array::splice [1 2 3] 1 1 4)', replEnv), '[1 4 3]');
});

test('ARRAY INTEROP: Array.prototype.toReversed', () => {
  assertEquals(rep('(Array::toReversed [1 2 3])', replEnv), '[3 2 1]');
});

test('ARRAY INTEROP: Array.prototype.toSorted', () => {
  assertEquals(rep('(Array::toSorted [3 1 2] (function (a b) (- a b)))', replEnv), '[1 2 3]');
});

test('ARRAY INTEROP: Array.prototype.toSpliced', () => {
  assertEquals(rep('(Array::toSpliced [1 2 3] 1 1 4)', replEnv), '[1 4 3]');
});

// TODO: test('ARRAY INTEROP: Array.prototype.unshift', () => {
//   assertEquals(rep('(Array::unshift [1 2] 0)', replEnv), '[0 1 2]');
// });

test('ARRAY INTEROP: Array.prototype.values', () => {
  assertEquals(rep('(Array::values [1 2 3])', replEnv), '[1 2 3]');
});

test('ARRAY INTEROP: Array.prototype.with', () => {
  assertEquals(rep('(Array::with [1 2 3] 1 4)', replEnv), '[1 4 3]');
});

// TODO: test('ARRAY INTEROP: Array.toString', () => {
//   assertEquals(rep('(Array.toString [1 2 3])', replEnv), '[1 2 3]');
// });

// TODO: test('ARRAY INTEROP: arrayLength', () => {
//   assertEquals(rep('(arrayLength [1 2 3])', replEnv), '3');
// });
