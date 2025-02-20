import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import * as array from "./array.ts";

// MARK: toArray
// --------------------------------------------------------------------------------------------------------------------

runner.test("toArray should create a vector from multiple arguments", () => {
	const num1 = types.createNumberNode(1);
	const num2 = types.createNumberNode(2);
	const num3 = types.createNumberNode(3);

	const result = array.toArray(num1, num2, num3);

	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value, [num1, num2, num3]);
});

runner.test(
	"toArray should create a vector of specified length filled with nils when given only a number",
	() => {
		const length = types.createNumberNode(3);
		const result = array.toArray(length);
		runner.assert(types.isVectorNode(result), true);
		runner.assert(result.value.length, 3);
		runner.assert(result.value.every(types.isNilNode), true);
	},
);

runner.test(
	"toArray should throw an error if no arguments are provided",
	() => {
		let threw = false;
		try {
			array.toArray();
		} catch (e) {
			threw = true;
		}
		runner.assert(threw, true);
	},
);

runner.test(
	"toArray should create a vector from a single non-number argument",
	() => {
		const str = types.createStringNode("hello");
		const result = array.toArray(str);
		runner.assert(types.isVectorNode(result), true);
		runner.assert(result.value, [str]);
	},
);

// MARK: arrayFrom
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayFrom - one argument", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayFrom(vec);
	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 2);
	runner.assert(result.value[0].value, 1);
	runner.assert(result.value[1].value, 2);
});

runner.test("arrayFrom - two arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((x: types.AstNode) =>
		types.createNumberNode(x.value * 2),
	);
	const result = array.arrayFrom(vec, fn);
	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 2);
	runner.assert(result.value[0].value, 2);
	runner.assert(result.value[1].value, 4);
});

runner.test("arrayFrom - three arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((x: types.AstNode) =>
		types.createNumberNode(x.value * 2),
	);
	const thisArg = types.createNumberNode(5);
	const result = array.arrayFrom(vec, fn, thisArg);
	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 2);
	runner.assert(result.value[0].value, 2);
	runner.assert(result.value[1].value, 4);
});

runner.test("arrayFrom - too few arguments", () => {
	let threw = false;
	try {
		array.arrayFrom();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("arrayFrom - too many arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((x: types.AstNode) =>
		types.createNumberNode(x.value * 2),
	);
	const thisArg = types.createNumberNode(5);
	const extraArg = types.createNumberNode(10);
	let threw = false;
	try {
		array.arrayFrom(vec, fn, thisArg, extraArg);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("arrayFrom - first argument not a vector", () => {
	const notAVector = types.createNumberNode(1);
	let threw = false;
	try {
		array.arrayFrom(notAVector);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("arrayFrom - second argument not a function", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const notAFunction = types.createNumberNode(5);
	let threw = false;
	try {
		array.arrayFrom(vec, notAFunction);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: at
// --------------------------------------------------------------------------------------------------------------------

runner.test("at - valid index", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const index = types.createNumberNode(0);
	const result = array.arrayAt(vec, index);
	runner.assert(result, types.createNumberNode(1));
});

runner.test("at - negative index", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const index = types.createNumberNode(-1);
	const result = array.arrayAt(vec, index);
	runner.assert(result, types.createNumberNode(2));
});

runner.test("at - out of range index", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const index = types.createNumberNode(2);
	const result = array.arrayAt(vec, index);
	runner.assert(types.isNilNode(result), true);
});

runner.test("at - incorrect argument count", () => {
	let threw = false;
	try {
		array.arrayAt();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayAt(types.createVectorNode([]));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayAt(
			types.createVectorNode([]),
			types.createNumberNode(0),
			types.createNumberNode(1),
		);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("at - first argument not a vector", () => {
	const notAVector = types.createNumberNode(1);
	const index = types.createNumberNode(0);
	let threw = false;
	try {
		array.arrayAt(notAVector, index);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("at - second argument not a number", () => {
	const vec = types.createVectorNode([]);
	const notANumber = types.createStringNode("hello");
	let threw = false;
	try {
		array.arrayAt(vec, notANumber);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: isArray
// --------------------------------------------------------------------------------------------------------------------

runner.test("isArray - is a vector", () => {
	const vec = types.createVectorNode([]);
	const result = array.arrayIsArray(vec);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("isArray - is not a vector", () => {
	const notAVector = types.createNumberNode(1);
	const result = array.arrayIsArray(notAVector);
	runner.assert(result, types.createBooleanNode(false));
});

runner.test("isArray - incorrect argument count", () => {
	let threw = false;
	try {
		array.arrayIsArray();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIsArray(types.createVectorNode([]), types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: concat
// --------------------------------------------------------------------------------------------------------------------

runner.test("concat - one vector", () => {
	const vec1 = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayConcat(vec1);
	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 2);
	runner.assert(result.value[0].value, 1);
	runner.assert(result.value[1].value, 2);
});

runner.test("concat - multiple vectors", () => {
	const vec1 = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const vec2 = types.createVectorNode([
		types.createNumberNode(3),
		types.createNumberNode(4),
	]);
	const result = array.arrayConcat(vec1, vec2);
	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 4);
	runner.assert(result.value[0].value, 1);
	runner.assert(result.value[1].value, 2);
	runner.assert(result.value[2].value, 3);
	runner.assert(result.value[3].value, 4);
});

runner.test("concat - no arguments", () => {
	let threw = false;
	try {
		array.arrayConcat();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("concat - non-vector argument", () => {
	const notAVector = types.createNumberNode(1);
	let threw = false;
	try {
		array.arrayConcat(notAVector);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("concat - mixed arguments", () => {
	const vec1 = types.createVectorNode([types.createNumberNode(1)]);
	const notAVector = types.createNumberNode(2);
	let threw = false;
	try {
		array.arrayConcat(vec1, notAVector);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: copyWithin
// --------------------------------------------------------------------------------------------------------------------

runner.test("copyWithin - two arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	const target = types.createNumberNode(0);
	const start = types.createNumberNode(1);
	const result = array.arrayCopyWithin(vec, target, start);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[2, 3, 3],
	);
});

runner.test("copyWithin - three arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	const target = types.createNumberNode(0);
	const start = types.createNumberNode(1);
	const end = types.createNumberNode(2);
	const result = array.arrayCopyWithin(vec, target, start, end);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[2, 2, 3],
	);
});

runner.test("copyWithin - invalid number of arguments", () => {
	let threw = false;
	try {
		array.arrayCopyWithin();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayCopyWithin(types.createVectorNode([]));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	const vec = types.createVectorNode([types.createNumberNode(1)]);
	const target = types.createNumberNode(0);
	const start = types.createNumberNode(0);
	const end = types.createNumberNode(0);
	const extra = types.createNumberNode(0);
	threw = false;
	try {
		array.arrayCopyWithin(vec, target, start, end, extra);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("copyWithin - invalid argument types", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayCopyWithin(str, num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayCopyWithin(vec, str, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayCopyWithin(vec, num, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: entries
// --------------------------------------------------------------------------------------------------------------------

runner.test("entries - empty vector", () => {
	const vec = types.createVectorNode([]);
	const result = array.arrayEntries(vec);
	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value, []);
});

runner.test("entries - non-empty vector", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createStringNode("a"),
	]);
	const result = array.arrayEntries(vec);

	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 2);

	runner.assert(types.isVectorNode(result.value[0]), true);
	runner.assert(result.value[0].value[0].value, 0);
	runner.assert(result.value[0].value[1].value, 1);

	runner.assert(types.isVectorNode(result.value[1]), true);
	runner.assert(result.value[1].value[0].value, 1);
	runner.assert(result.value[1].value[1].value, "a");
});

runner.test("entries - incorrect argument count", () => {
	let threw = false;
	try {
		array.arrayEntries();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayEntries(types.createVectorNode([]), types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("entries - invalid argument type", () => {
	let threw = false;
	try {
		array.arrayEntries(types.createNumberNode(1));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: every
// --------------------------------------------------------------------------------------------------------------------

runner.test("every - all true", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(true));
	const result = array.arrayEvery(vec, fn);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("every - some false", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(
		(_index: types.AstNode, v: types.AstNode, _vector: types.AstNode) =>
			types.createBooleanNode(v.value !== 2),
	);
	const result = array.arrayEvery(vec, fn);
	runner.assert(result, types.createBooleanNode(false));
});

runner.test("every - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayEvery();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayEvery(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayEvery(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayEvery(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayEvery(vec, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayEvery(vec, undefined as unknown as types.AstNode, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: fill
// --------------------------------------------------------------------------------------------------------------------

runner.test("fill - two arguments", () => {
	const vector = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const value = types.createNumberNode(0);
	const result = array.arrayFill(vector, value);

	runner.assert(result.value.length, 2);
	runner.assert(result.value[0].value, 0);
	runner.assert(result.value[1].value, 0);
});

runner.test("fill - three arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	const value = types.createNumberNode(0);
	const start = types.createNumberNode(1);
	const result = array.arrayFill(vec, value, start);

	runner.assert(result.value.length, 3);
	runner.assert(result.value[0].value, 1);
	runner.assert(result.value[1].value, 0);
	runner.assert(result.value[2].value, 0);
});

runner.test("fill - four arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
		types.createNumberNode(4),
	]);
	const value = types.createNumberNode(0);
	const start = types.createNumberNode(2);
	const end = types.createNumberNode(4);
	const result = array.arrayFill(vec, value, start, end);

	runner.assert(result.value.length, 4);
	runner.assert(result.value[0].value, 1);
	runner.assert(result.value[1].value, 2);
	runner.assert(result.value[2].value, 0);
	runner.assert(result.value[3].value, 0);
});

runner.test("fill - invalid number of arguments", () => {
	let threw = false;
	try {
		array.arrayFill();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFill(types.createVectorNode([]));
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	const vec = types.createVectorNode([]);
	const val = types.createNumberNode(1);
	threw = false;
	try {
		array.arrayFill(vec, val, val, val, val);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("fill - invalid argument types", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayFill(str, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFill(vec, num, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFill(vec, num, num, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: filter
// --------------------------------------------------------------------------------------------------------------------

runner.test("filter - some match", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((item: types.AstNode) =>
		types.createBooleanNode(item.value > 1),
	);
	const result = array.arrayFilter(fn, vec);

	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 1);
	runner.assert(result.value[0].value, 2);
});

runner.test("filter - none match", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(false));
	const result = array.arrayFilter(fn, vec);

	runner.assert(types.isVectorNode(result), true);
	runner.assert(result.value.length, 0);
});

runner.test("filter - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFilter();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFilter(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFilter(num, vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: find
// --------------------------------------------------------------------------------------------------------------------

runner.test("find - element found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createBooleanNode(v.value === 2),
	);
	const result = array.arrayFind(vec, fn);
	runner.assert(result, types.createNumberNode(2));
});

runner.test("find - element not found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(false));
	const result = array.arrayFind(vec, fn);
	runner.assert(types.isNilNode(result), true);
});

runner.test("find - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFind();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFind(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFind(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFind(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: findIndex
// --------------------------------------------------------------------------------------------------------------------

runner.test("findIndex - element found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createBooleanNode(v.value === 2),
	);
	const result = array.arrayFindIndex(vec, fn);
	runner.assert(result, types.createNumberNode(1));
});

runner.test("findIndex - element not found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(false));
	const result = array.arrayFindIndex(vec, fn);
	runner.assert(result, types.createNumberNode(-1));
});

runner.test("findIndex - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFindIndex();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindIndex(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindIndex(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindIndex(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: findLast
// --------------------------------------------------------------------------------------------------------------------

runner.test("findLast - element found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createBooleanNode(v.value === 2),
	);
	const result = array.arrayFindLast(vec, fn);
	runner.assert(result, types.createNumberNode(2));
});

runner.test("findLast - element not found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(false));
	const result = array.arrayFindLast(vec, fn);
	runner.assert(types.isNilNode(result), true);
});

runner.test("findLast - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFindLast();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindLast(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindLast(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindLast(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: findLastIndex
// --------------------------------------------------------------------------------------------------------------------

runner.test("findLastIndex - element found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createBooleanNode(v.value === 2),
	);
	const result = array.arrayFindLastIndex(vec, fn);
	runner.assert(result, types.createNumberNode(1));
});

runner.test("findLastIndex - element not found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(false));
	const result = array.arrayFindLastIndex(vec, fn);
	runner.assert(result, types.createNumberNode(-1));
});

runner.test("findLastIndex - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFindLastIndex();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindLastIndex(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindLastIndex(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFindLastIndex(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: flat
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayFlat - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createVectorNode([
			types.createNumberNode(2),
			types.createNumberNode(3),
		]),
	]);
	const result = array.arrayFlat(vec);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2, 3],
	);
});

runner.test("arrayFlat - deeply nested vectors", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createVectorNode([
			types.createNumberNode(2),
			types.createVectorNode([
				types.createNumberNode(3),
				types.createNumberNode(4),
			]),
		]),
	]);
	const result = array.arrayFlat(vec);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2, 3, 4],
	);
});

runner.test("arrayFlat - empty vector", () => {
	const vec = types.createVectorNode([]);
	const result = array.arrayFlat(vec);
	runner.assert(result.value, []);
});

runner.test("arrayFlat - vector with non-nested elements", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayFlat(vec);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2],
	);
});

runner.test("arrayFlat - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFlat();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFlat(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: flatMap
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayFlatMap - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createVectorNode([v, v]),
	);

	const result = array.arrayFlatMap(vec, fn);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 1, 2, 2],
	);
});

runner.test("arrayFlatMap - nested result", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	// Callback returns a nested vector for each element
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createVectorNode([v, types.createVectorNode([v])]),
	);

	const result = array.arrayFlatMap(vec, fn);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 1, 2, 2],
	);
});

runner.test("arrayFlatMap - empty vector", () => {
	const vec = types.createVectorNode([]);
	const fn = types.createFunctionNode(() => types.createVectorNode([]));

	const result = array.arrayFlatMap(vec, fn);
	runner.assert(result.value, []);
});

runner.test("arrayFlatMap - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayFlatMap();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFlatMap(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFlatMap(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFlatMap(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: includes
// --------------------------------------------------------------------------------------------------------------------

runner.test("includes - vector includes element", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const element = types.createNumberNode(2);
	const result = array.arrayIncludes(vec, element);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("includes - vector does not include element", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const element = types.createNumberNode(3);
	const result = array.arrayIncludes(vec, element);

	runner.assert(result.value, false);
});

runner.test("includes - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(1);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayIncludes();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIncludes(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIncludes(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIncludes(str, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: indexOf
// --------------------------------------------------------------------------------------------------------------------

runner.test("indexOf - element found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const value = types.createNumberNode(2);

	const result = array.arrayIndexOf(vec, value);
	runner.assert(result, types.createNumberNode(1));
});

runner.test("indexOf - element not found", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const value = types.createNumberNode(3);

	const result = array.arrayIndexOf(vec, value);
	runner.assert(result, types.createNumberNode(-1));
});

runner.test("indexOf - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayIndexOf();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIndexOf(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIndexOf(str, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayIndexOf(num, vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: join
// --------------------------------------------------------------------------------------------------------------------

runner.test("join - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const separator = types.createStringNode(",");

	const result = array.arrayJoin(vec, separator);
	runner.assert(result, types.createStringNode("1,2"));
});

runner.test("join - no arguments", () => {
	let threw = false;
	try {
		array.arrayJoin();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: keys
// --------------------------------------------------------------------------------------------------------------------

runner.test("keys - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayKeys(vec);

	runner.assert(result.value.length, 2);
	runner.assert(result.value[0], types.createNumberNode(0));
	runner.assert(result.value[1], types.createNumberNode(1));
});

runner.test("keys - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayKeys();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayKeys(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayLast
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayLast - retrieves last element", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayLast(vec);
	runner.assert(result, types.createNumberNode(2));
});

runner.test("arrayLast - empty vector", () => {
	const vec = types.createVectorNode([]);
	const result = array.arrayLast(vec);
	runner.assert(types.isNilNode(result), true);
});

runner.test("arrayLast - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayLast();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayLast(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayMap
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayMap - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((x: types.AstNode) =>
		types.createNumberNode(x.value * 2),
	);
	const result = array.arrayMap(vec, fn);

	runner.assert(result.value.length, 2);
	runner.assert(result.value[0], types.createNumberNode(2));
	runner.assert(result.value[1], types.createNumberNode(4));
});

runner.test("arrayMap - with thisArg", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const thisArg = types.createNumberNode(5); // Not actually used in this example, but demonstrating usage
	const fn = types.createFunctionNode(
		(_x: types.AstNode, _index: types.AstNode, _thisArg: types.AstNode) =>
			types.createNumberNode(2),
	);

	const result = array.arrayMap(vec, fn, thisArg);

	runner.assert(result.value.length, 2);
	runner.assert(result.value[0], types.createNumberNode(2));
	runner.assert(result.value[1], types.createNumberNode(2));
});

runner.test("arrayMap - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayMap();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayMap(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayMap(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayMap(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayPush
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayPush - basic functionality", () => {
	const vec = types.createVectorNode([types.createNumberNode(1)]);
	const value = types.createNumberNode(2);
	const result = array.arrayPush(vec, value);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2],
	);
});

runner.test("arrayPush - multiple values", () => {
	const vec = types.createVectorNode([types.createNumberNode(1)]);
	const val1 = types.createNumberNode(2);
	const val2 = types.createNumberNode(3);

	const result = array.arrayPush(vec, val1, val2);

	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2, 3],
	);
});

runner.test("arrayPush - invalid arguments", () => {
	const num = types.createNumberNode(1);

	let threw = false;
	try {
		array.arrayPush();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayPush(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayLength
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayLength - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayLength();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayLength(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayReduce
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayReduce - basic functionality", () => {
	const fn = types.createFunctionNode((acc: types.AstNode, x: types.AstNode) =>
		types.createNumberNode(acc.value + x.value),
	);
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const initialValue = types.createNumberNode(0);

	const result = array.arrayReduce(fn, vec, initialValue);
	runner.assert(result.value, 3);
});

runner.test("arrayReduce - invalid arguments", () => {
	const fn = types.createFunctionNode((acc: types.AstNode, x: types.AstNode) =>
		types.createNumberNode(acc.value + x.value),
	);
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const num = types.createNumberNode(2);

	let threw = false;
	try {
		array.arrayReduce();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReduce(fn);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReduce(fn, vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReduce(num, vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReduce(fn, num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayToReversed
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayToReversed - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayToReversed(vec);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[2, 1],
	);
});

runner.test("arrayToReversed - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayToReversed();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToReversed(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayFirst
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayFirst - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayFirst(vec);

	runner.assert(result, types.createNumberNode(1));
});

runner.test("arrayFirst - empty vector", () => {
	const vec = types.createVectorNode([]);
	const result = array.arrayFirst(vec);
	runner.assert(types.isNilNode(result), true);
});

runner.test("arrayFirst - invalid arguments", () => {
	const num = types.createNumberNode(1);

	let threw = false;
	try {
		array.arrayFirst();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayFirst(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arraySlice
// --------------------------------------------------------------------------------------------------------------------

runner.test("arraySlice - one argument", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arraySlice(vec);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2],
	);
});

runner.test("arraySlice - two arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const start = types.createNumberNode(1);

	const result = array.arraySlice(vec, start);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[2],
	);
});

runner.test("arraySlice - three arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	const start = types.createNumberNode(1);
	const end = types.createNumberNode(2);

	const result = array.arraySlice(vec, start, end);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[2],
	);
});

runner.test("arraySlice - invalid arguments", () => {
	const num = types.createNumberNode(1);
	const vec = types.createVectorNode([]);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arraySlice();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arraySlice(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arraySlice(vec, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arraySlice(vec, num, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arraySome
// --------------------------------------------------------------------------------------------------------------------

runner.test("arraySome - some true", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode((v: types.AstNode) =>
		types.createBooleanNode(v.value === 2),
	);
	const result = array.arraySome(vec, fn);
	runner.assert(result, types.createBooleanNode(true));
});

runner.test("arraySome - all false", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const fn = types.createFunctionNode(() => types.createBooleanNode(false));

	const result = array.arraySome(vec, fn);
	runner.assert(result, types.createBooleanNode(false));
});

runner.test("arraySome - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(1);

	let threw = false;
	try {
		array.arraySome();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arraySome(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arraySome(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arraySome(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayToSorted
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayToSorted - basic functionality", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(2),
		types.createNumberNode(1),
	]);
	const fn = types.createFunctionNode((a: types.AstNode, b: types.AstNode) =>
		types.createNumberNode(a.value - b.value),
	);

	const result = array.arrayToSorted(vec, fn);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 2],
	);
});

runner.test("arrayToSorted - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayToSorted();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToSorted(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToSorted(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToSorted(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayToSpliced
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayToSpliced - two arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const start = types.createNumberNode(1);
	const result = array.arrayToSpliced(vec, start);

	runner.assert(result.value.length, 1);
	runner.assert(result.value[0].value, 1);
});

runner.test("arrayToSpliced - three arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const start = types.createNumberNode(1);
	const deleteCount = types.createNumberNode(1);

	const result = array.arrayToSpliced(vec, start, deleteCount);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1],
	);
});

runner.test("arrayToSpliced - four arguments", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const start = types.createNumberNode(1);
	const deleteCount = types.createNumberNode(1);
	const item = types.createNumberNode(3);

	const result = array.arrayToSpliced(vec, start, deleteCount, item);

	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 3],
	);
});

runner.test("arrayToSpliced - invalid arguments", () => {
	const vec = types.createVectorNode([]);
	const num = types.createNumberNode(1);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayToSpliced();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToSpliced(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToSpliced(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayToSpliced(vec, str);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayUnshift
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayUnshift - basic functionality", () => {
	const value = types.createNumberNode(0);
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
	]);
	const result = array.arrayUnshift(value, vec);

	runner.assert(
		result.value.map((n) => n.value),
		[0, 1, 2],
	);
});

runner.test("arrayUnshift - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayUnshift();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayUnshift(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayUnshift(num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayValues
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayValues - invalid arguments", () => {
	const num = types.createNumberNode(0);

	let threw = false;
	try {
		array.arrayValues();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayValues(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// MARK: arrayReplaceWith
// --------------------------------------------------------------------------------------------------------------------

runner.test("arrayReplaceWith - replaces with specified value", () => {
	const vec = types.createVectorNode([
		types.createNumberNode(1),
		types.createNumberNode(2),
		types.createNumberNode(3),
	]);
	const index = types.createNumberNode(1);
	const value = types.createNumberNode(5);

	const result = array.arrayReplaceWith(vec, index, value);
	runner.assert(
		result.value.map((n: { value: unknown }) => n.value),
		[1, 5, 3],
	);
});

runner.test("arrayReplaceWith - invalid arguments", () => {
	const vec = types.createVectorNode([types.createNumberNode(1)]);
	const num = types.createNumberNode(0);
	const str = types.createStringNode("");

	let threw = false;
	try {
		array.arrayReplaceWith();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReplaceWith(vec);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReplaceWith(vec, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReplaceWith(num, num, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		array.arrayReplaceWith(vec, str, num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});
