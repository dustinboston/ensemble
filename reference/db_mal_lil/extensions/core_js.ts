/**
 * @file Core JS implements JavaScript methods.
 * For direct access to the JavaScript subsystem, use interop
 * The goal of this file is to make the language familiar to
 * developers who are familiar with JavaScript.
 */

import * as types from '../types.ts';
import * as core from '../core.ts';

export const jsNamespace = new Map<types.MapKeyNode, types.FunctionNode>();

jsNamespace.set(
  new types.SymbolNode('toString'),
  new types.FunctionNode(core.readString)
)

jsNamespace.set(
  new types.SymbolNode('stringify'),
  new types.FunctionNode(core.readString)
)

jsNamespace.set(
  new types.SymbolNode('console.log'),
  new types.FunctionNode(core.printUnescapedStringToScreen)
);

jsNamespace.set(
	new types.SymbolNode('switch'),
	new types.FunctionNode(switchCase),
);

jsNamespace.set(
	new types.SymbolNode('starts-with'),
	new types.FunctionNode(startsWith),
);

jsNamespace.set(
	new types.SymbolNode('startsWith'),
	new types.FunctionNode(startsWith),
);

jsNamespace.set(new types.SymbolNode('&&'), new types.FunctionNode(and));
jsNamespace.set(
	new types.SymbolNode('!=='),
	new types.FunctionNode(notEqualTo),
);

jsNamespace.set(new types.SymbolNode('==='), new types.FunctionNode(equalTo));

/**
 * @param args [types.Str, types.Str, types.Num?]
 * - args[0] types.Str string to search
 * - args[1] types.Str the pattern to search for
 * - args[2] types.Num the position to start at
 * @returns types.Bool true if str starts with searchString from position
 */
function startsWith(...args: types.AstNode[]): types.AstNode {
	types.assertVariableArgumentCount(args.length, 2, 3);
	const string_ = args[0];
	types.assertStringNode(string_);
	const searchString = args[1];
	types.assertStringNode(searchString);
	const position = args[2];
	let positionValue = 0;
	if (types.isDefined(position) && position instanceof types.NumberNode) {
		positionValue = position.value;
	}

	return new types.BooleanNode(
		string_.value.startsWith(searchString.value, positionValue),
	);
}

/**
 * A JavasScript switch statement.
 * @param args [types.Ast,...types.List[], types.List]
 * args[0] - The expression to be matched
 * args[1...n-1] - Case clause matched against the expression (value statement)
 * 	each case clause should have a statement to match and a value to return
 * args[n] - Default clause (statement)
 */
function switchCase(...args: types.AstNode[]): types.AstNode {
	types.assertMinimumArgumentCount(args.length, 2);
	const [expr, ...clauses] = args;

	const defaultClause = clauses.pop();
	types.assertDefined(defaultClause);
	types.assertFunctionNode(defaultClause);

	const length = clauses.length;
	for (let i = 0; i < length; i++) {
		const clause = clauses[i];
		types.assertListNode(clause);
		types.assertArgumentCount(clause.value.length, 2);
		types.assertFunctionNode(clause.value[1]);

		const result = types.isEqualTo(expr, clause.value[0]);
		if (result.value) {
			return clause.value[1].value();
		}
	}

	return defaultClause.value();
}

/**
 * Tests whether a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
function and(...args: types.AstNode[]): types.BooleanNode {
	for (const arg of args) {
		const isTruthy = types.isAstTruthy(arg);
		if (!isTruthy) {
			return new types.BooleanNode(false);
		}
	}

	return new types.BooleanNode(true);
}

/**
 * `!==` Determine if two nodes are equal
 * @example (!== (8 2 3) (1 2 3)) ;=> true
 * @param args [types.Ast, types.Ast]
 * @returns types.Bool
 * @see types.types.isEqualTo()
 */
function notEqualTo(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	const bool = types.isEqualTo(args[0], args[1]);
	return new types.BooleanNode(!bool.value);
}

/**
 * `===` Determine if two nodes are equal
 * @example (=== (1 2 3) (1 2 3)) ;=> true
 * @param args [types.Ast, types.Ast]
 * @returns types.Bool
 * @see types.types.isEqualTo()
 */
export function equalTo(...args: types.AstNode[]): types.AstNode {
	types.assertArgumentCount(args.length, 2);
	return types.isEqualTo(args[0], args[1]);
}
