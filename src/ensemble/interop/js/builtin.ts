import * as types from "../../types.ts";

export const builtInFunctions: Array<[string, types.Closure]> = [
	["decodeURI", globalDecodeUri],
	["decodeURIComponent", globalDecodeUriComponent],
	["encodeURI", globalEncodeUri],
	["encodeURIComponent", globalEncodeUriComponent],
];

export function globalDecodeUri(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertStringNode(astArgs[0]);
	const result = decodeURI(astArgs[0].value);
	return types.createStringNode(result);
}

export function globalDecodeUriComponent(
	...astArgs: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertStringNode(astArgs[0]);
	const result = decodeURIComponent(astArgs[0].value);
	return types.createStringNode(result);
}

export function globalEncodeUri(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertStringNode(astArgs[0]);
	const result = encodeURI(astArgs[0].value);
	return types.createStringNode(result);
}

export function globalEncodeUriComponent(
	...astArgs: types.AstNode[]
): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertStringNode(astArgs[0]);
	const result = encodeURIComponent(astArgs[0].value);
	return types.createStringNode(result);
}
