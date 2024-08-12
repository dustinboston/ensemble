// deno-lint-ignore-file no-explicit-any
import * as types from '../types.ts';

/**
 * Get an Atom that contains 'NaN'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'NaN'
 */
export function getNaN(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(NaN);
}

/**
 * Get an Atom that contains 'Infinity'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Infinity'
 */
export function getInfinity(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Infinity);
}

/**
 * Apply eval with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of any
 */
export function callEval(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: any = eval(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply parseInt with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of number
 */
export function callParseInt(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		let a1: number | undefined = undefined;
		if (args.length > 0) {
			types.assertNumberNode(args[1]);
			a1 = args[1].value;
		}
		const result: number = parseInt(a0, a1);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply parseFloat with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of number
 */
export function callParseFloat(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: number = parseFloat(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply isNaN with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of boolean
 */
export function callIsNaN(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertNumberNode(args[0]);
		const a0 = args[0].value;
		const result: boolean = isNaN(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply isFinite with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of boolean
 */
export function callIsFinite(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertNumberNode(args[0]);
		const a0 = args[0].value;
		const result: boolean = isFinite(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply decodeURI with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of string
 */
export function callDecodeURI(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: string = decodeURI(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply decodeURIComponent with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of string
 */
export function callDecodeURIComponent(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: string = decodeURIComponent(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply encodeURI with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of string
 */
export function callEncodeURI(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: string = encodeURI(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply encodeURIComponent with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of string
 */
export function callEncodeURIComponent(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		if (!(types.isStringNode(args[0]) || types.isNumberNode(args[0]) || types.isBooleanNode(args[0]))) {
			throw new TypeError('Argument 0 must be one of: StringNode, NumberNode, BooleanNode');
		}
		const a0 = args[0].value;
		const result: string = encodeURIComponent(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply escape with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of string
 */
export function callEscape(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: string = escape(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Apply unescape with the given arguments.
 * @see ts.SyntaxKind.FunctionDeclaration
 * @returns an AstNode representation of string
 */
export function callUnescape(...args: types.AstNode[]): types.AstNode {
	try {
		types.assertArgumentCount(args.length, 0);
		types.assertStringNode(args[0]);
		const a0 = args[0].value;
		const result: string = unescape(a0);
		return types.toAst(result);
	} catch (error: unknown) {
		const message = (error instanceof Error) ? error.message : JSON.stringify(error);
		return new types.ErrorNode(new types.StringNode(message));
	}
}

/**
 * Get an Atom that contains 'Object'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Object'
 */
export function getObject(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Object);
}

/**
 * Get an Atom that contains 'Function'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Function'
 */
export function getFunction(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Function);
}

/**
 * Get an Atom that contains 'String'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'String'
 */
export function getString(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(String);
}

/**
 * Get an Atom that contains 'Boolean'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Boolean'
 */
export function getBoolean(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Boolean);
}

/**
 * Get an Atom that contains 'Number'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Number'
 */
export function getNumber(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Number);
}

/**
 * Get an Atom that contains 'Math'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Math'
 */
export function getMath(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Math);
}

/**
 * Get an Atom that contains 'Date'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Date'
 */
export function getDate(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Date);
}

/**
 * Get an Atom that contains 'RegExp'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'RegExp'
 */
export function getRegExp(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(RegExp);
}

/**
 * Get an Atom that contains 'Error'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Error'
 */
export function getError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Error);
}

/**
 * Get an Atom that contains 'EvalError'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'EvalError'
 */
export function getEvalError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(EvalError);
}

/**
 * Get an Atom that contains 'RangeError'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'RangeError'
 */
export function getRangeError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(RangeError);
}

/**
 * Get an Atom that contains 'ReferenceError'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'ReferenceError'
 */
export function getReferenceError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(ReferenceError);
}

/**
 * Get an Atom that contains 'SyntaxError'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'SyntaxError'
 */
export function getSyntaxError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(SyntaxError);
}

/**
 * Get an Atom that contains 'TypeError'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'TypeError'
 */
export function getTypeError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(TypeError);
}

/**
 * Get an Atom that contains 'URIError'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'URIError'
 */
export function getURIError(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(URIError);
}

/**
 * Get an Atom that contains 'JSON'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'JSON'
 */
export function getJSON(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(JSON);
}

/**
 * Get an Atom that contains 'Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Array'
 */
export function getArray(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Array);
}

/**
 * Get an Atom that contains 'ArrayBuffer'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'ArrayBuffer'
 */
export function getArrayBuffer(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(ArrayBuffer);
}

/**
 * Get an Atom that contains 'DataView'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'DataView'
 */
export function getDataView(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(DataView);
}

/**
 * Get an Atom that contains 'Int8Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Int8Array'
 */
export function getInt8Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Int8Array);
}

/**
 * Get an Atom that contains 'Uint8Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Uint8Array'
 */
export function getUint8Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Uint8Array);
}

/**
 * Get an Atom that contains 'Uint8ClampedArray'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Uint8ClampedArray'
 */
export function getUint8ClampedArray(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Uint8ClampedArray);
}

/**
 * Get an Atom that contains 'Int16Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Int16Array'
 */
export function getInt16Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Int16Array);
}

/**
 * Get an Atom that contains 'Uint16Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Uint16Array'
 */
export function getUint16Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Uint16Array);
}

/**
 * Get an Atom that contains 'Int32Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Int32Array'
 */
export function getInt32Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Int32Array);
}

/**
 * Get an Atom that contains 'Uint32Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Uint32Array'
 */
export function getUint32Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Uint32Array);
}

/**
 * Get an Atom that contains 'Float32Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Float32Array'
 */
export function getFloat32Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Float32Array);
}

/**
 * Get an Atom that contains 'Float64Array'
 * @see SyntaxKind.VariableDeclaration
 * @param args is empty
 * @returns an Atom with value of 'Float64Array'
 */
export function getFloat64Array(..._args: types.AstNode[]): types.AstNode {
	return new types.AtomNode(Float64Array);
}

export const nsInterop = new Map<types.SymbolNode, types.FunctionNode>([
	[new types.SymbolNode('NaN'), new types.FunctionNode(getNaN)],
	[new types.SymbolNode('Infinity'), new types.FunctionNode(getInfinity)],
	[new types.SymbolNode('eval'), new types.FunctionNode(callEval)],
	[new types.SymbolNode('parseInt'), new types.FunctionNode(callParseInt)],
	[new types.SymbolNode('parseFloat'), new types.FunctionNode(callParseFloat)],
	[new types.SymbolNode('isNaN'), new types.FunctionNode(callIsNaN)],
	[new types.SymbolNode('isFinite'), new types.FunctionNode(callIsFinite)],
	[new types.SymbolNode('decodeURI'), new types.FunctionNode(callDecodeURI)],
	[new types.SymbolNode('decodeURIComponent'), new types.FunctionNode(callDecodeURIComponent)],
	[new types.SymbolNode('encodeURI'), new types.FunctionNode(callEncodeURI)],
	[new types.SymbolNode('encodeURIComponent'), new types.FunctionNode(callEncodeURIComponent)],
	[new types.SymbolNode('escape'), new types.FunctionNode(callEscape)],
	[new types.SymbolNode('unescape'), new types.FunctionNode(callUnescape)],
	[new types.SymbolNode('Object'), new types.FunctionNode(getObject)],
	[new types.SymbolNode('Function'), new types.FunctionNode(getFunction)],
	[new types.SymbolNode('String'), new types.FunctionNode(getString)],
	[new types.SymbolNode('Boolean'), new types.FunctionNode(getBoolean)],
	[new types.SymbolNode('Number'), new types.FunctionNode(getNumber)],
	[new types.SymbolNode('Math'), new types.FunctionNode(getMath)],
	[new types.SymbolNode('Date'), new types.FunctionNode(getDate)],
	[new types.SymbolNode('RegExp'), new types.FunctionNode(getRegExp)],
	[new types.SymbolNode('Error'), new types.FunctionNode(getError)],
	[new types.SymbolNode('EvalError'), new types.FunctionNode(getEvalError)],
	[new types.SymbolNode('RangeError'), new types.FunctionNode(getRangeError)],
	[new types.SymbolNode('ReferenceError'), new types.FunctionNode(getReferenceError)],
	[new types.SymbolNode('SyntaxError'), new types.FunctionNode(getSyntaxError)],
	[new types.SymbolNode('TypeError'), new types.FunctionNode(getTypeError)],
	[new types.SymbolNode('URIError'), new types.FunctionNode(getURIError)],
	[new types.SymbolNode('JSON'), new types.FunctionNode(getJSON)],
	[new types.SymbolNode('Array'), new types.FunctionNode(getArray)],
	[new types.SymbolNode('ArrayBuffer'), new types.FunctionNode(getArrayBuffer)],
	[new types.SymbolNode('DataView'), new types.FunctionNode(getDataView)],
	[new types.SymbolNode('Int8Array'), new types.FunctionNode(getInt8Array)],
	[new types.SymbolNode('Uint8Array'), new types.FunctionNode(getUint8Array)],
	[new types.SymbolNode('Uint8ClampedArray'), new types.FunctionNode(getUint8ClampedArray)],
	[new types.SymbolNode('Int16Array'), new types.FunctionNode(getInt16Array)],
	[new types.SymbolNode('Uint16Array'), new types.FunctionNode(getUint16Array)],
	[new types.SymbolNode('Int32Array'), new types.FunctionNode(getInt32Array)],
	[new types.SymbolNode('Uint32Array'), new types.FunctionNode(getUint32Array)],
	[new types.SymbolNode('Float32Array'), new types.FunctionNode(getFloat32Array)],
	[new types.SymbolNode('Float64Array'), new types.FunctionNode(getFloat64Array)],
]);
