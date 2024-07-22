/**
 * @typedef {*} Ast
 */

/**
 * Converts an AST node into its string representation.
 * @param {Ast} ast - node to convert
 * @param {boolean} printReadably - show escapes
 * @returns The string representation of the given AST node.
 * @throws If it encounters an unmatched or unrecognized AST node type.
 */
export function printString(ast, printReadably = false) {
    if (typeof ast === "string") {
        return printReadably ? `"${slash(ast)}"` : ast;
    }

    if (typeof ast === "boolean" || typeof ast === "number" || typeof ast === "symbol") {
        return String(ast);
    }

    // if (ast instanceof types.AtomNode) {
    //     return `(atom ${printString(ast.value)})`;
    // }

    if (ast instanceof Error) {
        return formatError(ast.message, printReadably);
    }

    if (typeof ast === "function") {
        return '#<fn>';
    }

    if (Array.isArray(ast)) {
        /** @type {string} */
        const serialized = ast
            .map((value) => printString(value, printReadably))
            .join(' ');
        return `[${serialized}]`;
    }

    if (ast !== null && typeof ast === "object") {
        /** @type {string} */
        const serialized = Object.entries(ast)
            .flatMap((value) => printString(value, printReadably))
            // .map((value) => printString(value, printReadably))
            .join(' ');
        return `{${serialized}}`;
    }

    if (ast === null) {
        return 'null';
    }

    throw new Error(`unmatched object ${JSON.stringify(ast)}`);
}

/**
 * Slashes (escapes) \, ", and \n. Used for when printReadably is set to true.
 * @description
 * The string is "escaped" as follows:
 * - Backslashes are replaced with double backslashes.
 * - Quotes are prefixed with a backslash.
 * - Newline characters are replaced with backslash + 'n'.
 * @param {string} stringToEscape - String to escape.
 * @returns {string} An escaped string.
 * @example slash('foo\nbar'); //=> 'foo\\nbar'
 */
export function slash(stringToEscape) {
    return stringToEscape
        .replaceAll("\\", "\\\\")
        .replaceAll('"', '\\"')
        .replaceAll("\n", "\\n");
}

export function formatError(error, printReadably = false) {
    let formatted = '';
    if (error instanceof Error) {
        formatted += `Error Name: ${error.name}`;
        formatted += `Error Message: ${error.message}`;
        formatted += `Error Stack: ${error.stack}`;

        // Log any custom properties
        for (let prop in error) {
            if (error.hasOwnProperty(prop)) {
                formatted += `Error Prop "${prop}": ${error[prop]}`;
            }
        }
    } else {
        formatted += `Error: ${error}`;
    }

    return formatted;
}
