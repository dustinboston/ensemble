import { initEnv, rep } from "../../lib.ts";
import runner from "../test_runner.ts";

const replEnv = initEnv();

runner.test("ARRAY INTEROP: Array constructor", () => {
	runner.assert(rep("(Array 1 2 3)", replEnv), "[1 2 3]");
});

runner.test("ARRAY INTEROP: Array.from with vector", () => {
	runner.assert(rep("(Array.from [1 2 3])", replEnv), "[1 2 3]");
});

runner.test(
	"ARRAY INTEROP: Array.from with vector and mapping function",
	() => {
		runner.assert(
			rep("(Array.from [1 2 3] (function (x) (* x 2)))", replEnv),
			"[2 4 6]",
		);
	},
);

// TODO: runner.test('ARRAY INTEROP: Array.from with vector, mapping function, and thisArg', () => {
//   runner.assert(
//     rep('(let [obj {:val 1}] (Array.from [1 2 3] (function (x) (+ x (Array::-val this))) obj))', replEnv),
//     '[2 3 4]',
//   );
// });

runner.test("ARRAY INTEROP: Array.from with empty vector", () => {
	runner.assert(rep("(Array.from [])", replEnv), "[]");
});

runner.test("ARRAY INTEROP: Array.from with nested vectors", () => {
	runner.assert(rep("(Array.from [[1 2] [3 4]])", replEnv), "[[1 2] [3 4]]");
});

runner.test("ARRAY INTEROP: Array.from with different types", () => {
	runner.assert(
		rep('(Array.from [1 "hello" keyword:])', replEnv),
		'[1 "hello" keyword:]',
	);
});

runner.test("ARRAY INTEROP: Array.isArray", () => {
	runner.assert(rep("(Array.isArray [1 2 3])", replEnv), "true");
});

runner.test("ARRAY INTEROP: Array.isArray (false)", () => {
	runner.assert(rep("(Array.isArray 1)", replEnv), "false");
});

runner.test("ARRAY INTEROP: Array.prototype.at", () => {
	runner.assert(rep("(Array::at [1 2 3] 1)", replEnv), "2");
});

runner.test("ARRAY INTEROP: Array.prototype.concat", () => {
	runner.assert(rep("(Array::concat [1 2] [3 4])", replEnv), "[1 2 3 4]");
});

runner.test("ARRAY INTEROP: Array.prototype.copyWithin", () => {
	runner.assert(rep("(Array::copyWithin [1 2 3] 0 1 2)", replEnv), "[2 2 3]");
});

runner.test("ARRAY INTEROP: Array.prototype.entries", () => {
	runner.assert(
		rep("(Array::entries [1 2 3])", replEnv),
		"[[0 1] [1 2] [2 3]]",
	);
});

// TODO: runner.test('ARRAY INTEROP: Array.prototype.every', () => {
//   runner.assert(rep('(Array::every [1 2 3] (function (x) (> x 0)))', replEnv), 'true');
// });

// TODO: runner.test('ARRAY INTEROP: Array.prototype.fill', () => {
//   runner.assert(rep('(Array::fill [1 2 3] 0 1 2)', replEnv), '[0 0 3]');
// });

// TODO: runner.test('ARRAY INTEROP: Array.prototype.filter', () => {
//   runner.assert(rep('(Array::filter [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '[2 4]');
// });

// TODO: runner.test('ARRAY INTEROP: Array.prototype.find', () => {
//   runner.assert(rep('(Array::find [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '2');
// });

// TODO: runner.test('ARRAY INTEROP: Array.prototype.findIndex', () => {
//   runner.assert(rep('(Array::findIndex [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '1');
// });

// TODO: runner.test('ARRAY INTEROP: Array.prototype.findLast', () => {
//   runner.assert(rep('(Array::findLast [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '4');
// });

// TODO: runner.test('ARRAY INTEROP: Array.prototype.findLastIndex', () => {
//   runner.assert(rep('(Array::findLastIndex [1 2 3 4] (function (x) (= (mod x 2) 0)))', replEnv), '3');
// });

runner.test("ARRAY INTEROP: Array.prototype.flat", () => {
	runner.assert(rep("(Array::flat [[1 2] [3 4]])", replEnv), "[1 2 3 4]");
});

runner.test("ARRAY INTEROP: Array.prototype.flatMap", () => {
	runner.assert(
		rep("(Array::flatMap [1 2] (function (x) [(* x 2) (* x 3)]))", replEnv),
		"[2 3 4 6]",
	);
});

runner.test("ARRAY INTEROP: Array.prototype.includes", () => {
	runner.assert(rep("(Array::includes [1 2 3] 2)", replEnv), "true");
});

runner.test("ARRAY INTEROP: Array.prototype.indexOf", () => {
	runner.assert(rep("(Array::indexOf [1 2 3] 2)", replEnv), "1");
});

// TODO: runner.test('ARRAY INTEROP: Array.prototype.join', () => {
//   runner.assert(rep('(Array::join [1 2 3] ", ")', replEnv), '1, 2, 3');
// });

runner.test("ARRAY INTEROP: Array.prototype.keys", () => {
	runner.assert(rep("(Array::keys [1 2 3])", replEnv), "[0 1 2]");
});

runner.test("ARRAY INTEROP: Array.prototype.map", () => {
	runner.assert(
		rep("(Array::map [1 2 3] (function (x) (* x 2)))", replEnv),
		"[2 4 6]",
	);
});

runner.test("ARRAY INTEROP: Array.prototype.pop", () => {
	runner.assert(rep("(Array::pop [1 2 3])", replEnv), "3");
});

runner.test("ARRAY INTEROP: Array.prototype.push", () => {
	runner.assert(rep("(Array::push [1 2] 3 4)", replEnv), "[1 2 3 4]");
});

// TODO: runner.test('ARRAY INTEROP: Array.prototype.reduce', () => {
//   runner.assert(rep('(Array::reduce [1 2 3] (function (acc x) (+ acc x)) 0)', replEnv), '6');
// });

runner.test("ARRAY INTEROP: Array.prototype.reverse", () => {
	runner.assert(rep("(Array::reverse [1 2 3])", replEnv), "[3 2 1]");
});

runner.test("ARRAY INTEROP: Array.prototype.shift", () => {
	runner.assert(rep("(Array::shift [1 2 3])", replEnv), "1");
});

runner.test("ARRAY INTEROP: Array.prototype.slice", () => {
	runner.assert(rep("(Array::slice [1 2 3] 1 2)", replEnv), "[2]");
});

// TODO: runner.test('ARRAY INTEROP: Array.prototype.some', () => {
//   runner.assert(rep('(Array::some [1 2 3] (function (x) (= (mod x 2) 0)))', replEnv), 'true');
// });

runner.test("ARRAY INTEROP: Array.prototype.sort", () => {
	runner.assert(
		rep("(Array::sort [3 1 2] (function (a b) (- a b)))", replEnv),
		"[1 2 3]",
	);
});

runner.test("ARRAY INTEROP: Array.prototype.splice", () => {
	runner.assert(rep("(Array::splice [1 2 3] 1 1 4)", replEnv), "[1 4 3]");
});

runner.test("ARRAY INTEROP: Array.prototype.toReversed", () => {
	runner.assert(rep("(Array::toReversed [1 2 3])", replEnv), "[3 2 1]");
});

runner.test("ARRAY INTEROP: Array.prototype.toSorted", () => {
	runner.assert(
		rep("(Array::toSorted [3 1 2] (function (a b) (- a b)))", replEnv),
		"[1 2 3]",
	);
});

runner.test("ARRAY INTEROP: Array.prototype.toSpliced", () => {
	runner.assert(rep("(Array::toSpliced [1 2 3] 1 1 4)", replEnv), "[1 4 3]");
});

// TODO: runner.test('ARRAY INTEROP: Array.prototype.unshift', () => {
//   runner.assert(rep('(Array::unshift [1 2] 0)', replEnv), '[0 1 2]');
// });

runner.test("ARRAY INTEROP: Array.prototype.values", () => {
	runner.assert(rep("(Array::values [1 2 3])", replEnv), "[1 2 3]");
});

runner.test("ARRAY INTEROP: Array.prototype.with", () => {
	runner.assert(rep("(Array::with [1 2 3] 1 4)", replEnv), "[1 4 3]");
});

// TODO: runner.test('ARRAY INTEROP: Array.toString', () => {
//   runner.assert(rep('(Array.toString [1 2 3])', replEnv), '[1 2 3]');
// });

// TODO: runner.test('ARRAY INTEROP: arrayLength', () => {
//   runner.assert(rep('(arrayLength [1 2 3])', replEnv), '3');
// });

runner.report();
