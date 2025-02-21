import runner from "../../tests/test_runner.ts";
import * as types from "../../types.ts";
import { parseJson, stringifyJson } from "./json.ts";

// parseJson
// --------------------------------------------------------------------------------------------------------------------

runner.test("parseJson - valid json string", () => {
	const jsonString = types.createStringNode('{"a": 1, "b": "hello"}');
	const result = parseJson(jsonString);

	runner.assert(types.isMapNode(result), true);
	runner.assert(result.value.size, 2);
	runner.assert(result.value.get("a")?.value, 1); // Accessing with string key
	runner.assert(result.value.get("b")?.value, "hello");
});

runner.test("parseJson - invalid json string", () => {
	const jsonString = types.createStringNode("invalid json");
	let threw = false;
	try {
		parseJson(jsonString);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

runner.test("parseJson - invalid arguments", () => {
	const num = types.createNumberNode(1);

	let threw = false;
	try {
		parseJson();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);

	threw = false;
	try {
		parseJson(num);
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// stringifyJson
// --------------------------------------------------------------------------------------------------------------------

runner.test("stringifyJson - basic ast", () => {
	const ast = types.createMapNode(new Map([["a", types.createNumberNode(1)]]));
	const replacer = types.createNilNode();
	const space = types.createStringNode(""); // No space
	const result = stringifyJson(ast, replacer, space);
	runner.assert(types.isStringNode(result), true);
	runner.assert(result.value, '{"a":1}');
});

runner.test("stringifyJson - with space number", () => {
	const ast = types.createMapNode(new Map([["a", types.createNumberNode(1)]]));
	const replacer = types.createNilNode();
	const space = types.createNumberNode(2);
	const result = stringifyJson(ast, replacer, space);
	runner.assert(types.isStringNode(result), true);
	runner.assert(result.value, '{\n  "a": 1\n}');
});

runner.test("stringifyJson - with space string", () => {
	const ast = types.createMapNode(new Map([["a", types.createNumberNode(1)]]));
	const replacer = types.createNilNode();
	const space = types.createStringNode("----");

	const result = stringifyJson(ast, replacer, space);
	runner.assert(types.isStringNode(result), true);
	runner.assert(result.value, '{\n----"a": 1\n}');
});

runner.test("stringifyJson - invalid arguments", () => {
	let threw = false;
	try {
		stringifyJson();
	} catch (e) {
		threw = true;
	}
	runner.assert(threw, true);
});

// test('stringifyJson - replacer', () => {
//   const ast = types.createMapNode(
//     new Map<string, types.AstNode>([
//       ['a', types.createNumberNode(1)],
//       ['b', types.createStringNode('hello')],
//       ['c', types.createStringNode('world')],
//       ['d', types.createNumberNode(42)],
//     ]),
//   );

//   const replacer = types.createFunctionNode((...astArgs: types.AstNode[]) => {
//     const _key = astArgs[0].value;
//     const value = astArgs[1].value;
//     if (typeof value === 'string') {
//       return undefined;
//     }
//     return value;
//   });

//   const space = types.createStringNode(''); // No space
//   const result = stringifyJson(ast, replacer);

//   console.log('result', result);

//   assertEquals(types.isStringNode(result), true);
//   assertEquals(result.value, '{"a":2}');
// });

runner.report();
