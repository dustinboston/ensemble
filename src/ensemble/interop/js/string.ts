import core from "../../core.ts";
import * as types from "../../types.ts";

export const stringFunctions: Array<[string, types.Closure]> = [
	["String", core.printUnescapedString],
	["String.fromCharCode", stringFromCharCode],
	["String.fromCodePoint", stringFromCodePoint],
	["String.prototype.at", stringAt],
	["String.prototype.charAt", stringAt],
	["String.prototype.charCodeAt", stringCodePointAt],
	["String.prototype.codePointAt", stringCodePointAt],
	["String.prototype.concat", stringConcat],
	["String.prototype.endsWith", stringEndsWith],
	["String.prototype.includes", stringIncludes],
	["String.prototype.indexOf", stringIndexOf],
	["String.prototype.isWellFormed", stringIsWellFormed],
	["String.prototype.lastIndexOf", stringLastIndexOf],
	["String.prototype.length", stringLength],
	["String.prototype.localeCompare", stringLocaleCompare],
	["String.prototype.match", stringMatch],
	["String.prototype.matchAll", stringMatchAll],
	["String.prototype.normalize", stringNormalize],
	["String.prototype.padEnd", stringPadEnd],
	["String.prototype.padStart", stringPadStart],
	["String.prototype.repeat", stringRepeat],
	["String.prototype.replace", stringReplace],
	["String.prototype.replaceAll", stringReplaceAll],
	["String.prototype.search", stringSearch],
	["String.prototype.slice", stringSlice],
	["String.prototype.split", stringSplit],
	["String.prototype.startsWith", stringStartsWith],
	["String.prototype.toLocaleLowerCase", stringToLocaleLowerCase],
	["String.prototype.toLocaleUpperCase", stringToLocaleUpperCase],
	["String.prototype.toLowerCase", stringToLowerCase],
	["String.prototype.toUpperCase", stringToUpperCase],
	["String.prototype.toWellFormed", stringToWellFormed],
	["String.prototype.trim", stringTrim],
	["String.prototype.trimEnd", stringTrimEnd],
	["String.prototype.trimStart", stringTrimStart],
	["String.raw", stringRaw],
];

export function stringFromCharCode(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertVectorNode(astArgs[0]);
	types.assertSequentialValues<types.NumberNode>(
		astArgs[0].value,
		types.NumberNode,
	);

	const codeUnits = astArgs[0].value.map<number>(types.unwrapNumberNode);
	const result = String.fromCharCode(...codeUnits);
	return types.createStringNode(result);
}

export function stringFromCodePoint(
	...astArgs: types.AstNode[]
): types.AstNode {
	types.assertSequentialValues<types.NumberNode>(astArgs, types.NumberNode);

	const codePoints = astArgs.map<number>(types.unwrapNumberNode);
	const result = String.fromCodePoint(...codePoints);
	return types.createStringNode(result);
}

/**
 * Get the character at a given index. Allows negative indices. Also used by charAt.
 * @param {[types.StringNode, types.NumberNode]} astArgs - The string to get the character from, and index of a character in the string.
 * @returns {types.StringNode|types.NilNode} An Ast Node that contains the character at the given index.
 */
export function stringAt(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertStringNode(astArgs[0]);
	types.assertNumberNode(astArgs[1]);

	const result = String.prototype.at.call(astArgs[0].value, astArgs[1].value);
	return result === undefined
		? types.createNilNode()
		: types.createStringNode(result);
}

export function stringCodePointAt(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertStringNode(astArgs[0]);
	types.assertNumberNode(astArgs[1]);

	const result = String.prototype.codePointAt.call(
		astArgs[0].value,
		astArgs[1].value,
	);
	return result === undefined
		? types.createNilNode()
		: types.createNumberNode(result);
}

export function stringConcat(...astArgs: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(astArgs.length, 2);
	types.assertSequentialValues<types.StringNode>(astArgs, types.StringNode);

	const context = astArgs[0].value;
	const strings = astArgs.slice(1).map(types.unwrapStringNode);
	const result = String.prototype.concat.call(context, ...strings);

	return types.createStringNode(result);
}

export function stringEndsWith(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertStringNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);

	if (astArgs.length === 3) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const searchString = astArgs[1].value;
	const length = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = String.prototype.endsWith.call(context, searchString, length);

	return types.toAst(result);
}

export function stringIncludes(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertStringNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);
	if (astArgs.length === 3) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const searchString = astArgs[1].value;
	const position = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = String.prototype.includes.call(
		context,
		searchString,
		position,
	);
	return types.toAst(result);
}

export function stringIndexOf(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertStringNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);
	if (astArgs.length === 3) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const searchString = astArgs[1].value;
	const position = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = String.prototype.indexOf.call(context, searchString, position);
	return types.toAst(result);
}

export function stringIsWellFormed(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertStringNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.isWellFormed.call(context);
	return types.toAst(result);
}

export function stringLastIndexOf(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertStringNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);
	if (astArgs.length === 3) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const searchString = astArgs[1].value;
	const position = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = String.prototype.lastIndexOf.call(
		context,
		searchString,
		position,
	);
	return types.toAst(result);
}

export function stringLength(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = context.length;
	return types.toAst(result);
}

export function stringLocaleCompare(
	...astArgs: types.AstNode[]
): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 4);
	types.assertStringNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);

	const context = astArgs[0].value;
	const that = astArgs[1].value;

	let locales: string | string[] | undefined = undefined;
	let options: Record<string, unknown> | undefined = undefined;

	if (astArgs.length > 2) {
		const localesArg = astArgs[2];
		if (types.isStringNode(localesArg)) {
			locales = localesArg.value;
		} else if (types.isVectorNode(localesArg)) {
			types.assertSequentialValues<types.StringNode>(
				localesArg.value,
				types.StringNode,
			);
			locales = localesArg.value.map<string>(types.unwrapStringNode);
		} else {
			types.assertNilNode(localesArg);
			locales = undefined;
		}
	}

	if (astArgs.length > 3) {
		const optionsArg = astArgs[3];
		types.assertMapNode(optionsArg);
		options = types.unwrapMapNode(optionsArg);
	}

	const result = String.prototype.localeCompare.call(
		context,
		that,
		locales,
		options,
	);
	return types.toAst(result);
}

export function stringMatch(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertStringNode(astArgs[0]);
	types.assertAtomNode(astArgs[1]);
	types.assertRegExp(astArgs[1].value);

	const context = astArgs[0].value;
	const regexp = astArgs[1].value;
	const result = String.prototype.match.call(context, regexp);
	return types.toAst(result);
}

export function stringMatchAll(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertStringNode(astArgs[0]);
	types.assertAtomNode(astArgs[1]);
	types.assertRegExp(astArgs[1].value);

	const context = astArgs[0].value;
	const regexp = astArgs[1].value;
	const result = String.prototype.matchAll.call(context, regexp);
	return types.toAst(result);
}

export function stringNormalize(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 1, 2);
	types.assertAstNode(astArgs[0]);
	if (astArgs.length === 2) {
		types.assertStringNode(astArgs[1]);
	}

	const context = astArgs[0].value;
	const form = astArgs.length === 2 ? astArgs[1].value : undefined;
	const result = String.prototype.normalize.call(context, form);
	return types.toAst(result);
}

export function stringPadEnd(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertAstNode(astArgs[0]);
	types.assertNumberNode(astArgs[1]);
	if (astArgs.length === 3) {
		types.assertStringNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const maxLength = astArgs[1].value;
	const fillString = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = String.prototype.padEnd.call(context, maxLength, fillString);
	return types.toAst(result);
}

export function stringPadStart(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertAstNode(astArgs[0]);
	types.assertNumberNode(astArgs[1]);
	if (astArgs.length === 3) {
		types.assertStringNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const maxLength = astArgs[1].value;
	const fillString = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = String.prototype.padStart.call(context, maxLength, fillString);
	return types.toAst(result);
}

export function stringRepeat(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertStringNode(astArgs[0]);
	types.assertNumberNode(astArgs[1]);

	const context = astArgs[0].value;
	const count = astArgs[1].value;
	const result = String.prototype.repeat.call(context, count);
	return types.toAst(result);
}

export function stringReplace(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 3);
	types.assertStringNode(astArgs[0]);

	let pattern: string | RegExp = "";
	if (types.isStringNode(astArgs[1])) {
		pattern = astArgs[1].value;
	} else {
		types.assertAtomNode(astArgs[1]);
		types.assertRegExp(astArgs[1].value);
		pattern = astArgs[1].value;
	}

	let replacer: string | types.Closure;
	if (types.isStringNode(astArgs[2])) {
		replacer = astArgs[2].value;
	} else {
		throw new Error(
			"Function replacers are not implemented for String.prototype.replace",
		);
	}

	const context = astArgs[0].value;
	const result = context.replace(pattern, replacer);

	return types.toAst(result);
}

export function stringReplaceAll(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 3);
	types.assertStringNode(astArgs[0]);

	let pattern: string | RegExp = "";
	if (types.isStringNode(astArgs[1])) {
		pattern = astArgs[1].value;
	} else {
		types.assertAtomNode(astArgs[1]);
		types.assertRegExp(astArgs[1].value);
		pattern = astArgs[1].value;
	}

	let replacer: string | types.Closure;
	if (types.isStringNode(astArgs[2])) {
		replacer = astArgs[2].value;
	} else {
		throw new Error(
			"Function replacers are not implemented for String.prototype.replaceAll",
		);
	}

	const context = astArgs[0].value;
	const result = context.replaceAll(pattern, replacer);

	return types.toAst(result);
}

export function stringSearch(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertStringNode(astArgs[0]);
	types.assertAtomNode(astArgs[1]);
	types.assertRegExp(astArgs[1].value);

	const context = astArgs[0].value;
	const regexp = astArgs[1].value;
	const result = String.prototype.search.call(context, regexp);
	return types.toAst(result);
}

export function stringSlice(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 1, 3);
	types.assertAstNode(astArgs[0]);
	if (astArgs.length > 1) {
		types.assertNumberNode(astArgs[1]);
	}
	if (astArgs.length > 2) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const start = astArgs.length > 1 ? astArgs[1].value : undefined;
	const end = astArgs.length > 2 ? astArgs[2].value : undefined;
	const result = String.prototype.slice.call(context, start, end);
	return types.toAst(result);
}

export function stringSplit(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertStringNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);

	if (astArgs.length === 3) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const separator = astArgs[1].value;
	const limit = astArgs.length === 3 ? astArgs[2].value : undefined;
	const result = context.split(separator, limit);

	return types.toAst(result);
}

export function stringStartsWith(...astArgs: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 2, 3);
	types.assertAstNode(astArgs[0]);
	types.assertStringNode(astArgs[1]);

	if (astArgs.length === 3) {
		types.assertNumberNode(astArgs[2]);
	}

	const context = astArgs[0].value;
	const searchString = astArgs[1].value;
	const position = astArgs.length > 2 ? astArgs[2].value : undefined;
	const result = String.prototype.startsWith.call(
		context,
		searchString,
		position,
	);
	return types.toAst(result);
}

export function stringToLocaleLowerCase(
	...astArgs: types.AstNode[]
): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 1, 2); // Corrected argument count
	types.assertAstNode(astArgs[0]);
	if (astArgs.length === 2) {
		// locales is optional, so allow nil or StringNode
		if (!types.isNilNode(astArgs[1])) {
			types.assertStringNode(astArgs[1]);
		}
	}

	const context = astArgs[0].value;
	const locales =
		astArgs.length === 2 && !types.isNilNode(astArgs[1])
			? astArgs[1].value
			: undefined;
	const result = String.prototype.toLocaleLowerCase.call(context, locales);
	return types.toAst(result);
}

export function stringToLocaleUpperCase(
	...astArgs: types.AstNode[]
): types.AstNode {
	types.assertVariableArgumentCount(astArgs.length, 1, 2); // Corrected argument count
	types.assertAstNode(astArgs[0]);

	if (astArgs.length === 2) {
		if (!types.isNilNode(astArgs[1])) {
			types.assertStringNode(astArgs[1]);
		}
	}

	const context = astArgs[0].value;
	const locales =
		astArgs.length === 2 && !types.isNilNode(astArgs[1])
			? astArgs[1].value
			: undefined;
	const result = String.prototype.toLocaleUpperCase.call(context, locales);
	return types.toAst(result);
}

export function stringToLowerCase(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.toLowerCase.call(context);
	return types.toAst(result);
}

export function stringToUpperCase(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.toUpperCase.call(context);
	return types.toAst(result);
}

export function stringToWellFormed(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.toWellFormed.call(context);
	return types.toAst(result);
}

export function stringTrim(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.trim.call(context);
	return types.toAst(result);
}

export function stringTrimEnd(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.trimEnd.call(context);
	return types.toAst(result);
}

export function stringTrimStart(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 1);
	types.assertAstNode(astArgs[0]);

	const context = astArgs[0].value;
	const result = String.prototype.trimStart.call(context);
	return types.toAst(result);
}

export function stringRaw(...astArgs: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(astArgs.length, 2);
	types.assertMapNode(astArgs[0]);
	types.assertVectorNode(astArgs[1]);

	const strings = types.unwrapMapNode(astArgs[0]) as { raw: string[] };
	const substitutions = astArgs[1].value;
	const result = String.raw(strings, ...substitutions);
	return types.toAst(result);
}
