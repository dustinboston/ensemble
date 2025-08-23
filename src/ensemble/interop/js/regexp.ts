import * as types from "../../types.ts";

export const regExpFunctions: Array<[string, types.Closure]> = [
	["RegExp.new", newRegExp],
	["RegExp.prototype.exec", execRegExp],
	["RegExp.prototype.test", testRegExp],
];

export function createRegExp(pattern: string, flags?: string) {
	return flags
		? newRegExp([types.createStringNode(pattern), types.createStringNode(flags)])
		: newRegExp([types.createStringNode(pattern)]);
}

export function newRegExp(astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 1, 2);
	types.assertStringNode(astArgs[0]);

	const pattern = astArgs[0].value;

	if (astArgs.length === 2) {
		types.assertStringNode(astArgs[1]);
		const flags = astArgs[1].value;
		const regexp = new RegExp(pattern, flags);
		return types.createAtomNode(regexp);
	}

	const regexp = new RegExp(pattern);
	return types.createAtomNode(regexp);
}

export function execRegExp(astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertAtomNode(astArgs[0]);

	const regexp = astArgs[0].value;

	types.assertRegExp(regexp);
	types.assertStringNode(astArgs[1]);

	const stringValue = astArgs[1].value;
	const result = regexp.exec(stringValue);
	return result
		? types.createVectorNode(result.map(types.toAst))
		: types.createNilNode();
}

// You can use regex against objects?!

export function testRegExp(astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertAtomNode(astArgs[0]);
	types.assertRegExp(astArgs[0].value);
	types.assertStringNode(astArgs[1]);

	const result = astArgs[0].value.test(astArgs[1].value);
	return types.createBooleanNode(result);
}
