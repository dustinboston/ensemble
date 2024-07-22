import { $ } from './core.js';

/**
 * @file The reader is responsible for tokenizing an input string and then
 * parsing it into meaningful chunks.
 */

export const tokenRegex = /[\s,;]*([[\]{}]|"(?:\\.|[^\\"])*"?|\/\/.*|[^\s[\]{}",;\/)]*)/g;
export const numberRegex = /^-?\d+(\.\d+)?$/;
export const stringRegex = /"(?:\\.|[^\\"])*"/;

/**
 * The Reader class manages a stream of tokens
 * 
 * @example
 * ```js
 * const reader = new Reader(tokenize("(+ 1 2)"));
 * const token = reader.next();  // Returns '('
 * const peekedToken = reader.peek(); // Returns '+'
 * ```
 */
export class Reader {
    /**
     * @param {string[]} tokens - Array of tokens parsed with the regex.
     * @param {number} position - Position in the token stream.
     */
    constructor(tokens, position = 0) {
        this.tokens = tokens;
        this.position = position;
        // Retrieves the next token and advances the position.
        this.next = () => this.tokens[this.position++];
        // Peeks at the current token without advancing the position.
        this.peek = () => this.tokens[this.position];
    }
}
/**
 * @param {string} code - A string of code to tokenize.
 * @returns {string[]} A string array of tokens.
 * @example
 * ```js
 * const tokens = tokenize("(+ 1 2) ; Adds 1 and 2");
 * console.log(tokens);  // Outputs: ['(', '+', '1', '2', ')']
 * ```
 */
export function tokenize(code) {
    const matches = [...code.matchAll(tokenRegex)]
        .filter((match) => !match[1].startsWith('//'))
        .map((match) => match[1]);
    return matches;
}
/**
 * Reads a string of code and parses it into an abstract syntax tree.
 * @param {string} code - The string of code to parse.
 * @returns An abstract syntax tree.
 * @example
 * ```js
 * readString('(def x 42)');
 * ```
 */
export function readString(code) {
    const tokens = tokenize(code);
    return readForm(new Reader(tokens));
}
/**
 * @param {Reader} rdr - The Reader instance.
 * @returns {*} The AST representation of the next form in the reader.
 * @throws "EOF" error if the end of the token stream is reached unexpectedly.
 * @example
 * ```js
 * const reader = new Reader(["(", "symbol1", "symbol2", ")"]);
 * const result = readForm(reader);
 * ```
 */
export function readForm(rdr) {
    const token = rdr.peek();
    if (token === undefined) {
        throw new Error('EOF');
    }

    switch (token) {
        case ']':
        case '}': {
            throw new Error(`unexpected '${token}'`);
        }
        case '[': {
            return readSequence(rdr, ']');
        }
        case '{': {
            return readSequence(rdr, '}');
        }
        default: {
            return readAtom(rdr);
        }
    }
}
/**
 * @param {Reader} reader - reader instance
 * @returns The AST node
 * @throws if the token starts with a '"' but is not a valid string (i.e., is not terminated by another '"').
 * @throws if it reaches an unexpected EOF.
 */
export function readAtom(reader) {
    const token = reader.next();
    if (token === undefined) {
        throw new Error('unexpected EOF');
    }
    if (token === 'null') {
        return null;
    }
    if (token === 'false') {
        return false;
    }
    if (token === 'true') {
        return true;
    }
    if (numberRegex.test(token)) {
        return parseFloat(token);
    }
    if (stringRegex.test(token)) {
        return unescapeString(token);
    }
    // Keywords mimic JS objects, e.g. { foo: "test" }
    if (token.endsWith(':')) {
        return token;
    }
    if (token.startsWith('"')) {
        throw new Error("expected '\"', got EOF");
    }

    const globalObject = getGlobal(token);
    if (globalObject) {
        return getGlobal(token);
    }
    if ($[token] !== undefined) {
        return $[token];
    }
    return Symbol.for(token);
}
/**
 * Removes surrounding quotes and replaces escaped characters with their unescaped values.
 *
 * @param {string} token - The string to be unescaped.
 * @returns {string} The unescaped string.
 * @example
 * unescapeString("\"\\\\\\\"\\\\n\"") 
 * // returns: '\\"\\n', which represents a string with escaped quote
 * // and newline characters.
 */
export function unescapeString(token) {
    return token
        .slice(1, -1)
        .replaceAll(/\\(.)/g, (_, c) => (c === 'n' ? '\n' : c));
}
/**
 * Parses arrays and object literals.
 * @param {Reader} rdr - The reader instance
 * @param  {string} end - End of sequence char, e.g. ')', ']', or '}').
 * @returns {*[]|Record<string, *>} An array or object literal.
 * @throws if an there is an unexpected end character.
 */
export function readSequence(rdr, end) {
    const astNodes = [];
    rdr.next();
    while (rdr.peek() !== undefined) {
        const token = rdr.peek();
        if (!token) {
            throw new Error(`expected '${end}', got EOF`);
        }
        if (token === end) {
            break;
        }
        astNodes.push(readForm(rdr));
    }
    rdr.next();
    switch (end) {
        case ']': {
            return astNodes;
        }
        case '}': {
            /** @type {Record<string, *>} */
            const obj = {};
            for (let i = 0;i < astNodes.length;i += 2) {
                const key = astNodes[i];
                const value = astNodes[i + 1];
                obj[key] = value;
            }
            return obj;
        }
        default: {
            throw new Error('unknown end value');
        }
    }
}

/**
 * Retrieves a JavaScript global object or function based on the given path.
 *
 * @param {string} path - The dot-separated path to check (e.g., "console.log").
 * @returns {*} - Returns the global object or function if the path is valid, or null otherwise.
 *
 * @example
 * // returns console.log function
 * getGlobal("console.log");
 *
 * @example
 * // returns atob function
 * getGlobal("atob");
 *
 * @example
 * // returns null
 * getGlobal("non.existent.property");
 */
function getGlobal(path) {
    // Split the path into parts
    const parts = path.split('.');

    // Start with the global object
    /** @type {*} */
    let obj = /** @type {*} */globalThis;

    // Traverse the path
    for (let part of parts) {
        if (obj[part] === undefined) {
            return null;
        }
        obj = obj[part];
    }

    // If we successfully traversed the entire path, return the final object
    return obj;
}
