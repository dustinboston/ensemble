import core from "../../core.ts";
import * as printer from "../../printer.ts";
import * as types from "../../types.ts";

// TODO: Implement forEach and reduceRight
export const arrayFunctions: Array<[string, types.Closure]> = [
	["Array", toArray],
	["Array.from", arrayFrom],
	["Array.isArray", arrayIsArray],
	["Array.of", arrayFrom],
	["Array::at", arrayAt],
	["Array::concat", arrayConcat],
	["Array::copyWithin", arrayCopyWithin],
	["Array::entries", arrayEntries],
	["Array::every", arrayEvery],
	["Array::fill", arrayFill],
	["Array::filter", arrayFilter],
	["Array::find", arrayFind],
	["Array::findIndex", arrayFindIndex],
	["Array::findLast", arrayFindLast],
	["Array::findLastIndex", arrayFindLastIndex],
	["Array::flat", arrayFlat],
	["Array::flatMap", arrayFlatMap],
	["Array::includes", arrayIncludes],
	["Array::indexOf", arrayIndexOf],
	["Array::join", arrayJoin],
	["Array::keys", arrayKeys],
	["Array::length", arrayLength],
	["Array::map", arrayMap],
	["Array::pop", arrayLast],
	["Array::push", arrayPush],
	["Array::reduce", arrayReduce],
	["Array::reverse", arrayToReversed],
	["Array::shift", arrayFirst],
	["Array::slice", arraySlice],
	["Array::some", arraySome],
	["Array::sort", arrayToSorted],
	["Array::splice", arrayToSpliced],
	["Array::toReversed", arrayToReversed],
	["Array::toSorted", arrayToSorted],
	["Array::toSpliced", arrayToSpliced],
	["Array::unshift", arrayUnshift], // Prepend
	["Array::values", arrayValues],
	["Array::with", arrayReplaceWith],
	["Array.toString", core.printEscapedString],
];

export function toArray(args: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(args.length, 1);

	if (args.length === 1 && types.isNumberNode(args[0])) {
		const fillableArray = Array(args[0].value).fill(types.createNilNode());
		return types.createVectorNode(fillableArray);
	}

	return types.createVectorNode(args);
}

export function arrayFrom(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 3);
	types.assertVectorNode(args[0]);

	if (args.length >= 2) {
		types.assertFunctionNode(args[1]);
	}

	if (args.length === 3) {
		types.assertAstNode(args[2]);
	}

	const vector = args[0].value;
	
	if (args.length === 1) {
		return types.createVectorNode([...vector]);
	}

	const mapFn = args[1].value;
	const result = vector.map((value, index) => {
		return mapFn([value]);
	});
	
	return types.createVectorNode(result);
}

export function arrayAt(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertNumberNode(args[1]);

	const vector = args[0].value;
	const index = args[1].value;
	const result = vector.at(index);

	return result ? types.toAst(result) : types.createNilNode();
}

export function arrayIsArray(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertAstNode(args[0]);

	const result = types.isVectorNode(args[0]);
	return types.createBooleanNode(result);
}

export function arrayConcat(args: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(args.length, 1);
	types.assertSequentialValues<types.VectorNode>(args, types.VectorNode);

	const result = args[0].value.concat(args.slice(1).flatMap((x) => x.value));
	return types.createVectorNode(result);
}

export function arrayCopyWithin(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 4);
	types.assertVectorNode(args[0]);
	types.assertNumberNode(args[1]);
	types.assertNumberNode(args[2]);

	const vector = args[0].value;
	const target = args[1].value;
	const start = args[2].value;
	const end = types.isNumberNode(args[3]) ? args[3].value : undefined;

	const result = vector.copyWithin(target, start, end);
	return types.createVectorNode(result);
}

export function arrayEntries(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const result = args[0].value.map((valueNode, index) => {
		const indexNode = types.createNumberNode(index);
		return types.createVectorNode([indexNode, valueNode]);
	});

	return types.createVectorNode(result);
}

export function arrayEvery(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.every((value, index, vector) => {
		const test = fn(
[			types.createNumberNode(index),
			value,
			types.createVectorNode(vector),]
		);
		return test.value; // truthy or falsy
	});

	return types.createBooleanNode(result);
}

export function arrayFill(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 2, 4);
	types.assertVectorNode(args[0]);
	types.assertAstNode(args[1]);

	const vector = args[0].value.map(types.unwrap); // Get the primitives
	const value = args[1].value; // Get the primitive

	let start: number | undefined = undefined;
	if (args.length >= 3) {
		types.assertNumberNode(args[2]);
		start = args[2].value;
	}

	let end: number | undefined = undefined;
	if (args.length === 4) {
		types.assertNumberNode(args[3]);
		end = args[3].value;
	}

	const result = vector.fill(value, start, end); // Use only primitives
	return types.createVectorNode(result.map(types.toAst));
}

export function arrayFilter(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertFunctionNode(args[0]);
	types.assertVectorNode(args[1]);

	const fn = args[0];
	const vec = args[1];

	const filtered = vec.value.filter((item) => Boolean(fn.value([item]).value));
	return types.createVectorNode(filtered);
}

export function arrayFind(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.find((value, index, vector) => {
		const test = fn(
[			value,
			types.createNumberNode(index),
			types.createVectorNode(vector),]
		);
		return test.value;
	});

	return result ?? types.createNilNode();
}

export function arrayFindIndex(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.findIndex((value, index, vector) => {
		const test = fn(
[			value,
			types.createNumberNode(index),
			types.createVectorNode(vector),]
		);
		return test.value;
	});

	return types.createNumberNode(result);
}

export function arrayFindLast(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.findLast((value, index, vector) => {
		const test = fn(
[			value,
			types.createNumberNode(index),
			types.createVectorNode(vector),]
		);
		return test.value;
	});

	return result ?? types.createNilNode();
}

export function arrayFindLastIndex(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.findLastIndex((value, index, vector) => {
		const test = fn(
[			value,
			types.createNumberNode(index),
			types.createVectorNode(vector),]
		);
		return test.value;
	});

	return types.createNumberNode(result);
}

export function arrayFlat(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vector = args[0].value;

	// Recursive flattening function.  Needed because JavaScript's built-in `flat()`
	// only flattens one level deep. This function handles arbitrarily nested vectors.
	function flattenDeep(arr: types.AstNode[]): types.AstNode[] {
		return arr.reduce((acc: types.AstNode[], val: types.AstNode) => {
			return acc.concat(types.isVectorNode(val) ? flattenDeep(val.value) : val);
		}, []);
	}

	const result = flattenDeep(vector);
	return types.createVectorNode(result);
}

export function arrayFlatMap(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	// Recursive flattening function (similar to arrayFlat)
	function flattenDeep(arr: types.AstNode[]): types.AstNode[] {
		return arr.reduce((acc: types.AstNode[], val: types.AstNode) => {
			return acc.concat(types.isVectorNode(val) ? flattenDeep(val.value) : val);
		}, []);
	}

	const mapped = vector.map((value, index, vector) => {
		return fn(
[			value,
			types.createNumberNode(index),
			types.createVectorNode(vector),]
		);
	});

	const result = flattenDeep(mapped); // Flatten the mapped result
	return types.createVectorNode(result);
}

export function arrayIncludes(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]); // Assert the first argument *must* be a vector
	types.assertAstNode(args[1]); // The element can be any AstNode

	const vec = args[0];
	const element = args[1];

	const result = vec.value.some((item) => types.isEqualTo(item, element).value);
	return types.createBooleanNode(result);
}

export function arrayIndexOf(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]); // Assert the first argument *must* be a vector
	types.assertAstNode(args[1]); // The element can be any AstNode

	const vec = args[0];
	const element = args[1];

	for (const [index, item] of vec.value.entries()) {
		if (types.isEqualTo(item, element).value) {
			return types.createNumberNode(index);
		}
	}

	return types.createNumberNode(-1);
}

export function arrayJoin(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 2);
	types.assertSequential(args[0]);

	const delim = types.isStringNode(args[1]) ? args[1].value : " ";
	const joined = args[0].value
		.map((ast) => printer.printString(ast, false))
		.join(delim);

	return types.createStringNode(joined);
}

export function arrayKeys(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vec = args[0];
	// Use map to avoid the keys iterator
	const result = vec.value.map((_, index) => types.createNumberNode(index));
	return types.createVectorNode(result);
}

export function arrayMap(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 2, 3);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const callback = args[1].value;
	const thisArg = args.length === 3 ? args[2].value : undefined;

	const result = vector.map((value, index, _arr) => {
		const res = callback([value, types.createNumberNode(index), thisArg]);
		return res;
	});

	return types.createVectorNode(result);
}

// pop
export function arrayLast(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vec = args[0];
	const result = vec.value[vec.value.length - 1];
	return types.toAst(result);
}

// push
export function arrayPush(args: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(args.length, 2);

	if (!args.every(types.isAstNode)) {
		throw new TypeError("Invalid arguments.");
	}

	types.assertVectorNode(args[0]);
	return types.createVectorNode([...args[0].value, ...args.slice(1)]);
}

export function arrayLength(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vec = args[0];
	const result = types.createNumberNode(vec.value.length);
	return result;
}

/**
 * `reduce` reduces elements in a vector based on a reducer function and an initial value.
 * @todo Write tests
 * @param args - [types.Func, types.Vec, initialValue].
 * @returns Types.AstNode.
 * @example (reduce (lambda (acc x) (+ acc x)) [1, 2, 3, 4] 0) ;=> 10
 */
export function arrayReduce(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 3);
	types.assertFunctionNode(args[0]);
	types.assertVectorNode(args[1]);

	const fn = args[0];
	const vec = args[1];
	let accumulator = args[2];

	for (const item of vec.value) {
		accumulator = fn.value([accumulator, item]);
	}

	return accumulator;
}

export function arrayToReversed(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vec = args[0];
	const result = vec.value.toReversed();
	return types.createVectorNode(result);
}

export function arrayFirst(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vec = args[0];
	const result = vec.value[0];
	return result ? result : types.createNilNode();
}

export function arraySlice(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 3);
	types.assertVectorNode(args[0]);

	let start = 0;
	if (args[1] !== undefined) {
		types.assertNumberNode(args[1]);
		start = args[1].value;
	}

	let end = args[0].value.length;
	if (args[2] !== undefined) {
		types.assertNumberNode(args[2]);
		end = args[2].value;
	}

	return types.createVectorNode(args[0].value.slice(start, end));
}

export function arraySome(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.some((value, index, vector) => {
		const test = fn(
[			value,
			types.createNumberNode(index),
			types.createVectorNode(vector),]
		);
		return test.value;
	});

	return types.createBooleanNode(result);
}

export function arrayToSorted(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[0]);
	types.assertFunctionNode(args[1]);

	const vector = args[0].value;
	const fn = args[1].value;

	const result = vector.toSorted((a, b) => {
		const order = fn([a, b]);
		types.assertNumberNode(order);
		return order.value;
	});

	return types.createVectorNode(result);
}

export function arrayToSpliced(args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 2, 4);
	types.assertVectorNode(args[0]);
	types.assertNumberNode(args[1]);

	const vector = args[0].value;
	const start = args[1].value;

	if (args.length < 3) {
		const result = vector.toSpliced(start);
		return types.createVectorNode(result);
	}

	types.assertNumberNode(args[2]);
	const deleteCount = args[2].value;
	const items = args.slice(3);
	const result = vector.toSpliced(start, deleteCount, ...items);
	return types.createVectorNode(result);
}

// Based on cons
export function arrayUnshift(args: types.AstNode[]): types.ListNode {
	types.assertArgumentCount(args.length, 2);
	types.assertVectorNode(args[1]);

	const prepended = [args[0]].concat(args[1].value);
	return types.createVectorNode(prepended);
}

export function arrayValues(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertVectorNode(args[0]);

	const vec = args[0];
	// Use map to avoid the keys iterator
	const result = vec.value.map((value) => value);
	return types.createVectorNode(result);
}

export function arrayReplaceWith(args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 3);
	types.assertVectorNode(args[0]);
	types.assertNumberNode(args[1]);
	types.assertAstNode(args[2]);

	const vec = args[0];
	const index = args[1];
	const value = args[2];

	const result = vec.value.with(index.value, value);
	return types.createVectorNode(result);
}
