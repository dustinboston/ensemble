import * as types from "../../types.ts";

export const errorFunctions: Array<[string, types.Closure]> = [
	["Error", newError],
	["Error.prototype.message", getMessage],
	["Error.prototype.cause", getCause],
	["Error.prototype.name", getName], // Type of error
];

export function newError(...args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 1, 3);
	const message = args[0];
	types.assertStringNode(message);

	let name: types.NameStringNode | undefined;
	if (args[1] !== undefined) {
		if (!types.isStringNode(args[1]) && !types.isNilNode(args[1])) {
			throw new TypeError("Second argument must be a string or nil.");
		}

		if (types.isStringNode(args[1])) {
			types.ErrorNode.assertErrorName(args[1]);
			name = args[1];
		}
	}

	let cause: types.AstNode | undefined = undefined;
	if (args[2] !== undefined) {
		types.assertAstNode(args[2]);
		cause = args[2];
	}

	return types.createErrorNode(message, name, cause);
}

export function getMessage(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertErrorNode(args[0]);
	return args[0].value;
}

export function getCause(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertErrorNode(args[0]);
	return args[0].cause ?? types.createNilNode();
}

export function getName(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 1);
	types.assertErrorNode(args[0]);
	return args[0].name;
}
