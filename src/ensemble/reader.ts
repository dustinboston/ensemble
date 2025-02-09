/**
 * @file The reader is responsible for tokenizing an input string and then
 * parsing it into meaningful chunks.
 */
import * as types from "./types.ts";

export const tokenRegex =
	/[\s,]*(~@|[[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|\/\/.*|[^\s[\]{}('"`,;)]*)/g;
export const numberRegex = /^-?\d+(\.\d+)?$/;
export const stringRegex = /"(?:\\.|[^\\"])*"/;

/**
 * The Reader class manages a stream of tokens derived from source code string.
 * It keeps track of the current position in the token stream, allowing for the
 * retrieval of the next token and peeking at the current token without
 * advancing the position.
 *
 * Utilized in various parts of the reading process to sequentially analyze and
 * categorize tokens, aiding in AST creation.
 * @example
 * ```typescript
 * const reader = new Reader(tokenize("(+ 1 2)"));
 * const token = reader.next();  // Returns '('
 * const peekedToken = reader.peek(); // Returns '+'
 * ```
 */
export class Reader {
	/**
	 * Creates an instance of the Reader class to manage a stream of tokens
	 * derived from a source code string. It initializes with an array of
	 * tokens and optionally a position index, defaulted to 0, representing
	 * the starting point in the token stream.
	 * @param tokens - An array of strings representing the tokens derived
	 * 	from source code string.
	 * @param pos - The initial position in the token stream. Defaults to 0.
	 * @example
	 * ```typescript
	 * const reader = new Reader(tokenize("(+ 1 2)"));
	 * ```
	 */
	constructor(
		public tokens: string[],
		private pos = 0,
	) {}

	// Retrieves the next token and advances the position.
	next = () => this.tokens[this.pos++];

	// Peeks at the current token without advancing the position.
	peek = () => this.tokens[this.pos];
}

/**
 * Tokenizes the input code string into an array of token strings using regular
 * expressions to match MAL language tokens. This function filters out comments
 * (starting with ';' or '//').
 * @description
 * A fundamental step in the reading process, breaking down the source code into
 * individual tokens for further analysis and categorization.
 * @param code - A string of code to tokenize.
 * @returns A string array of tokens.
 * @example
 * ```typescript
 * const tokens = tokenize("(+ 1 2) ; Adds 1 and 2");
 * console.log(tokens);  // Outputs: ['(', '+', '1', '2', ')']
 * ```
 */
export function tokenize(code: string): string[] {
	const matches = [...code.matchAll(tokenRegex)]
		.filter(
			(match) =>
				!match[1].startsWith(";") &&
				!match[1].startsWith("//") &&
				match[1] !== "",
		)
		.map((match) => match[1]);

	return matches;
}

/**
 * Reads a string of code and parses it into an abstract syntax tree.
 * @param code - The string of code to parse.
 * @returns An abstract syntax tree representation of the code.
 * @example readString('(def x 42)'); // returns an Ast
 */
export function readString(code: string): types.AstNode {
	const tokens = tokenize(code);
	if (tokens.length === 0) return types.createNilNode();
	const result = readForm(new Reader(tokens));
	return result;
}

/**
 * Reads a form from the provided Reader instance and returns the appropriate
 * Abstract Syntax Tree (AST) representation of the form based on the next
 * token available in the reader.
 * @description
 * The `readForm` function is a central piece in the reader process. It is
 * responsible for inspecting the next token in the reader and delegating to
 * the correct reader function based on the token's value. It can construct
 * several different types of AST nodes:
 *
 * - Special forms: quote, quasiquote, unquote, splice-unquote, with-meta, deref
 * - Collection types: list, vector, dict
 * - Atom.
 *
 * Special forms are returned as a list with the special form symbol as the
 * first element, followed by other elements that are read recursively
 * using `readForm`.
 * @param rdr - The Reader instance from which tokens will be read.
 * @returns The AST representation of the next form in the reader. It returns
 * one of several possible AST node types (Sym, List, Vec, Dict, etc.) based
 * on the next token in the reader.
 * @throws "EOF" error if the end of the token stream is reached unexpectedly.
 * @throws Error if an unexpected char, like an unmatched paren) is encountered.
 * @example
 * ```typescript
 * const reader = new Reader(["(", "symbol1", "symbol2", ")"]);
 * const result = readForm(reader);
 * // result will be a List AST node representing the list (symbol1 symbol2)
 * ```
 */
export function readForm(rdr: Reader): types.AstNode {
	const token = rdr.peek();
	if (token === undefined) {
		throw new Error("EOF");
	}

	/**
	 * Helper for creating special forms.
	 * @param symbol - A symbol to start the new list.
	 * @param meta - Meta, if specified, will be added to the end of the list.
	 * @returns A list with the result of calling readForm and optionally meta.
	 * @example makeForm('`')
	 */
	function makeForm(symbol: string, meta?: types.AstNode): types.ListNode {
		return types.createListNode([
			types.createSymbolNode(symbol),
			readForm(rdr),
			...(meta ? [meta] : []),
		]);
	}

	// TODO: Decide if we want to support this.
	// The special forms would still be available and it would free up several
	// characters that are used in javascript. Specifically the ~ and ^, but
	// also potentiall the @. However, some tests would need to be updated.
	switch (token) {
		case "'": {
			rdr.next();
			return makeForm("quote");
		}

		case "`": {
			rdr.next();
			return makeForm("quasiquote");
		}

		case "~": {
			rdr.next();
			return makeForm("unquote");
		}

		case "~@": {
			rdr.next();
			return makeForm("splice-unquote");
		}

		case "^": {
			rdr.next();
			const meta = readForm(rdr);
			return makeForm("with-meta", meta);
		}

		case "@": {
			rdr.next();
			return makeForm("deref");
		}

		case ")":
		case "]":
		case "}": {
			throw new Error(`unexpected '${token}'`);
		}

		case "(": {
			return readSequence(rdr, ")");
		}

		case "[": {
			return readSequence(rdr, "]");
		}

		case "{": {
			return readSequence(rdr, "}");
		}

		default: {
			return readAtom(rdr);
		}
	}
}

/**
 * Reads the next token from the Reader instance and interprets it as an AST
 * (Abstract Syntax Tree) node, returning the appropriate AST node based on the
 * token's value.
 * @param rdr - The Reader instance from which to read the token.
 * @returns The AST node corresponding to the next token in the Reader instance.
 * @throws Will throw an error if the token starts with a '"' but is not a
 * valid string (i.e., is not terminated by another '"').
 * @throws Will throw an error if it reaches an unexpected EOF.
 * @example
 * // Assuming `rdr` is a Reader instance initialized with a sequence of tokens.
 * // `result` will hold the AST corresponding to the next token in the reader.
 * const result = readAtom(rdr);
 */
export function readAtom(rdr: Reader): types.AstNode {
	const token = rdr.next();

	if (token === undefined) {
		throw new Error("unexpected EOF");
	}

	if (token === "nil") {
		return types.createNilNode();
	}

	if (token === "false") {
		return types.createBooleanNode(false);
	}

	if (token === "true") {
		return types.createBooleanNode(true);
	}

	if (numberRegex.test(token)) {
		return types.createNumberNode(Number.parseFloat(token));
	}

	if (stringRegex.test(token)) {
		const unescaped = types.createStringNode(unescapeString(token));
		return unescaped;
	}

	// TODO: Add support for trailing colons.
	if (token.startsWith(":") || token.endsWith(":")) {
		return types.createKeywordNode(token);
	}

	if (token.startsWith('"')) {
		throw new Error("expected '\"', got EOF");
	}

	return types.createSymbolNode(token);
}

/**
 * Takes a string and "unescapes" it by removing the leading and trailing
 * quotes and replacing escaped characters with their corresponding
 * unescaped values.
 *
 * The unescaping is handled as follows:
 * - Newline characters (`\n`) are replaced with actual newline characters.
 * - Other escaped characters (like `\"` or `\\`) are replaced with their
 * corresponding characters (like `"`, `\`).
 * @param token - The string to be unescaped.
 * @returns The unescaped string.
 * @example
 * unescapeString("\"\\\\\\\"\\\\n\"")
 * // returns: '\\"\\n', which represents a string with escaped quote
 * // and newline characters.
 */
export function unescapeString(token: string): string {
	return token
		.slice(1, -1)
		.replaceAll(/\\(.)/g, (_, c: string) => (c === "n" ? "\n" : c));
}

/**
 * Reads a sequence of tokens from a reader instance and parses them into an
 * AST node, which could be a list, vector, or dictionary.
 * @param rdr - The reader instance to read tokens from.
 * @param end - The character representing the end of the sequence
 * (could be ')', ']', or '}').
 * @returns An AST node representing the read sequence, it could be a list,
 * vector, or dictionary node depending on the end character.
 * @throws Err - If an unexpected end character is encountered or if a valid
 * AST node cannot be created from the read tokens.
 * @example readSeq(readerInstance, '}'); // returns a dictionary node if the
 * tokens read from readerInstance represent a valid dictionary
 */
export function readSequence(
	rdr: Reader,
	end: string,
): types.VectorNode | types.ListNode | types.MapNode {
	const astNodes: types.AstNode[] = [];

	rdr.next();
	while (true) {
		const token = rdr.peek();
		if (token === undefined) {
			throw new Error(`expected '${end}', got EOF`);
		}

		if (token === end) {
			rdr.next(); // consume the end character
			break;
		}

		astNodes.push(readForm(rdr));
	}

	switch (end) {
		case ")": {
			return types.createListNode(astNodes);
		}

		case "]": {
			return types.createVectorNode(astNodes);
		}

		case "}": {
			const dict = types.createMapNode();
			for (let i = 0; i < astNodes.length; i += 2) {
				const key = astNodes[i];
				types.assertMapKeyNode(key);
				const value = astNodes[i + 1];
				const keyString = types.convertMapKeyToString(key);
				dict.value.set(keyString, value);
			}

			return dict;
		}

		default: {
			throw new Error("unknown end value");
		}
	}
}
