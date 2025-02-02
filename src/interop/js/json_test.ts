import { assertEquals, assertThrows } from '@std/assert';
import { parseJson, stringifyJson } from './interop/js/json.ts';
import * as types from './types.ts';

// parseJson
// --------------------------------------------------------------------------------------------------------------------

Deno.test('parseJson - valid json string', () => {
  const jsonString = types.createStringNode('{"a": 1, "b": "hello"}');
  const result = parseJson(jsonString);

  assertEquals(types.isMapNode(result), true);
  assertEquals(result.value.size, 2);
  assertEquals(result.value.get('a')?.value, 1); // Accessing with string key
  assertEquals(result.value.get('b')?.value, 'hello');
});

Deno.test('parseJson - invalid json string', () => {
  const jsonString = types.createStringNode('invalid json');
  assertThrows(() => parseJson(jsonString));
});

Deno.test('parseJson - invalid arguments', () => {
  const num = types.createNumberNode(1);

  assertThrows(() => parseJson());
  assertThrows(() => parseJson(num));
});

// stringifyJson
// --------------------------------------------------------------------------------------------------------------------

Deno.test('stringifyJson - basic ast', () => {
  const ast = types.createMapNode(new Map([['a', types.createNumberNode(1)]]));
  const replacer = types.createNilNode();
  const space = types.createStringNode(''); // No space
  const result = stringifyJson(ast, replacer, space);
  console.log(result);
  assertEquals(types.isStringNode(result), true);
  assertEquals(result.value, '{"a":1}');
});

Deno.test('stringifyJson - with space number', () => {
  const ast = types.createMapNode(new Map([['a', types.createNumberNode(1)]]));
  const replacer = types.createNilNode();
  const space = types.createNumberNode(2);
  const result = stringifyJson(ast, replacer, space);

  console.log(result);
  assertEquals(types.isStringNode(result), true);
  assertEquals(result.value, '{\n  "a": 1\n}');
});

Deno.test('stringifyJson - with space string', () => {
  const ast = types.createMapNode(new Map([['a', types.createNumberNode(1)]]));
  const replacer = types.createNilNode();
  const space = types.createStringNode('----');

  const result = stringifyJson(ast, replacer, space);
  assertEquals(types.isStringNode(result), true);
  assertEquals(result.value, '{\n----"a": 1\n}');
});

Deno.test('stringifyJson - invalid arguments', () => {
  assertThrows(() => stringifyJson());
});

// Deno.test('stringifyJson - replacer', () => {
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
