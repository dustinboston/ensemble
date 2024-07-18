import * as types from '../types.ts';

export function printJs(ast: types.AstNode, printReadably = false): string {
	/**
	 * Escape
	 * The string is "escaped" as follows:
	 * - Backslashes are replaced with double backslashes.
	 * - Quotes are prefixed with a backslash.
	 * - Newline characters are replaced with backslash + 'n'.
	 * - Surrounding quotes are added.
	 *
	 * The purpose is to represent the string in a format that
	 * can be read back by the reader.
	 */
	if (ast instanceof types.StringNode) {
		if (printReadably) {
			const escaped = ast.value
				.replaceAll('\\', '\\\\')
				.replaceAll('"', '\\"')
				.replaceAll('\n', '\\n');

			return `"${escaped}"`;
		}

		return ast.value;
	}

	// Prevent type-narrowing of ast by putting it into a variable
	if (ast instanceof types.KeywordNode) {
		return ast.value;
	}

	if (ast instanceof types.BooleanNode || ast instanceof types.NumberNode) {
		return String(ast.value);
	}

	if (ast instanceof types.SymbolNode) {
		return ast.value;
	}

	if (ast instanceof types.AtomNode) {
		return `(atom ${printJs(ast.value)})`;
	}

	if (ast instanceof types.ErrorNode) {
		return printJs(ast.value, printReadably);
	}

	if (ast instanceof types.FunctionNode) {
		return '#<fn>';
	}

	if (ast instanceof types.ListNode) {
		const serialized = ast.value
			.map((value) => printJs(value, printReadably))
			.join(' ');
		return `(${serialized})`;
	}

	if (ast instanceof types.VectorNode) {
		const serialized = ast.value
			.map((value) => printJs(value, printReadably))
			.join(' ');
		return `[${serialized}]`;
	}

	if (ast instanceof types.MapNode) {
		return 'TODO';
	}

	if (ast instanceof types.NilNode) {
		return 'nil';
	}

	throw new Error('unmatched object');
}
