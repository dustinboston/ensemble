/**
 * @file Defines types and helper functions.
 */
// MARK: CLASSES
// ============================================================================
/**
 * AtomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class AtomNode {
    value;
    // deno-lint-ignore no-explicit-any
    constructor(value) {
        this.value = value;
    }
}
/**
 * BooleanNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class BooleanNode {
    value;
    constructor(value) {
        this.value = value;
    }
}
/**
 * DomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class DomNode {
    value;
    attributes;
    children;
    metadata;
    // domNode: HTMLElement | null = null;
    constructor(value, // The tag name
    attributes = new Map(), // TODO: Change to MapNode
    children = [], metadata) {
        this.value = value;
        this.attributes = attributes;
        this.children = children;
        this.metadata = metadata;
        // this.domNode = document.createElement(value);
        // this.attributes.forEach((value, key) => this.domNode?.setAttribute(key, String(unwrap(value))));
        // this.children.forEach((child) => {
        //   const unwrapped = unwrap(child);
        //   if (unwrapped instanceof HTMLElement) {
        //     this.domNode?.appendChild(unwrapped);
        //   }
        // });
    }
}
const errorTypes = [
    'Error',
    'AggregateError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
];
/**
 * ErrorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class ErrorNode {
    value;
    name = createStringNode('Error');
    cause;
    static isErrorName(name) {
        const value = name.value;
        return errorTypes.includes(value);
    }
    static assertErrorName(name) {
        if (!ErrorNode.isErrorName(name)) {
            throw new TypeError("Error type must be 'Error', 'AggregateError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', or 'URIError'.");
        }
    }
    /**
     * @param value - message
     */
    constructor(value, name, cause = createNilNode()) {
        this.value = value;
        if (name !== undefined && ErrorNode.isErrorName(name)) {
            this.name = name;
        }
        if (cause !== undefined) {
            this.cause = cause;
        }
    }
}
/**
 * FunctionNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 * @param closureMeta - A POJO that contains an AstNode, Env, and parameters
 * which are all used as the context for the function when it is evaluated.
 * @param isMacro - Whether the function is a macro.
 * @param metadata - Additional data to associate with this node.
 */
export class FunctionNode {
    value;
    closureMeta;
    isMacro;
    metadata;
    constructor(value, closureMeta, isMacro = false, metadata) {
        this.value = value;
        this.closureMeta = closureMeta;
        this.isMacro = isMacro;
        this.metadata = metadata;
    }
}
/**
 * KeywordNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class KeywordNode {
    _value;
    constructor(_value) {
        this._value = _value;
        this._value = _value.replaceAll(':', '');
    }
    get value() {
        return this._value + ':';
    }
    set value(keyword) {
        this._value = keyword.replaceAll(':', '') + ':';
    }
    get bare() {
        return this._value;
    }
}
/**
 * List class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class ListNode {
    value;
    metadata;
    constructor(value, metadata) {
        this.value = value;
        this.metadata = metadata;
    }
}
/**
 * MapNode class
 * A data class which represents a part of the AST.
 * @description The Map value stores MapKeys as strings.
 * - A KeywordNode is stored as ':key'
 * - A StringNode is stored as '"str"'
 * - And a SymbolNode is stored as 'sym'.
 * @param value - The data that this class represents.
 */
export class MapNode {
    value;
    metadata;
    constructor(value = new Map(), metadata) {
        this.value = value;
        this.metadata = metadata;
    }
}
/**
 * NilNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class NilNode {
    value;
    constructor(value = null) {
        this.value = value;
    }
}
/**
 * NumberNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class NumberNode {
    value;
    // TODO: Add support for BigInt, e.g. value: number | bigint and handle internally
    constructor(value) {
        this.value = value;
    }
}
/**
 * SymbolNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class SymbolNode {
    value;
    constructor(value) {
        this.value = value;
    }
}
/**
 * StringNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class StringNode {
    value;
    constructor(value) {
        this.value = value;
    }
}
/**
 * VectorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class VectorNode {
    value;
    metadata;
    constructor(value, metadata) {
        this.value = value;
        this.metadata = metadata;
    }
}
/**
 * JsNode class
 * A wrapper for native JavaScript data types that we do not want to expose in Ensemble.
 * @param value - The data that this class represents.
 */
// export class JsNode<T extends SupportedJsTypes> {
//   constructor(public value: T) {
//   }
// }
// MARK: ASSERTION FNS
// =============================================================================
/**
 * Assert that a node is an instance of DomNode.
 * @param node - The node to check.
 * @returns If the node is an instance of DomNode.
 * @throws If the node is NOT an instance of DomNode.
 * @example assertDomNode(myNode);
 */
export function assertDomNode(node) {
    if (!(isDomNode(node))) {
        throw new TypeError('Invalid DomNode');
    }
}
/**
 * Assert that a node is an instance of AstNode.
 * @param node - The node to check.
 * @returns If the node is an instance of AstNode.
 * @throws If the node is NOT an instance of AstNode.
 * @example assertAstNode(myNode);
 */
export function assertAstNode(node) {
    if (!(isAstNode(node))) {
        throw new TypeError('Invalid AstNode');
    }
}
/**
 * Assert that a node is an instance of AtomNode.
 * @param node - The node to check.
 * @returns If the node is an instance of AtomNode.
 * @throws If the node is NOT an instance of AtomNode.
 * @example assertAtomNode(myNode);
 */
export function assertAtomNode(node) {
    if (!(isAtomNode(node))) {
        throw new TypeError('Invalid AtomNode');
    }
}
/**
 * Assert that a node is an instance of BooleanNode.
 * @param node - The node to check.
 * @returns If the node is an instance of BooleanNode.
 * @throws If the node is NOT an instance of BooleanNode.
 * @example assertBooleanNode(myNode);
 */
export function assertBooleanNode(node) {
    if (!(isBooleanNode(node))) {
        throw new TypeError('Invalid BooleanNode');
    }
}
/**
 * Assert that a node is an instance of MapNode.
 * @param node - The node to check.
 * @returns If the node is an instance of MapNode.
 * @throws If the node is NOT an instance of MapNode.
 * @example assertMapNode(myNode);
 */
export function assertMapNode(node) {
    if (!(isMapNode(node))) {
        throw new TypeError('Invalid MapNode');
    }
}
/**
 * Assert that a node is an instance of ErrorNode.
 * @param node - The node to check.
 * @returns If the node is an instance of ErrorNode.
 * @throws If the node is NOT an instance of ErrorNode.
 * @example assertErrorNode(myNode);
 */
export function assertErrorNode(node) {
    if (!(isErrorNode(node))) {
        throw new TypeError('Invalid ErrorNode');
    }
}
/**
 * Assert that a node is an instance of FunctionNode.
 * @param node - The node to check.
 * @returns If the node is an instance of FunctionNode.
 * @throws If the node is NOT an instance of FunctionNode.
 * @example assertFunctionNode(myNode);
 */
export function assertFunctionNode(node) {
    if (!(isFunctionNode(node))) {
        throw new TypeError('Invalid FunctionNode');
    }
}
/**
 * Assert that a node is an instance of KeywordNode.
 * @param node - The node to check.
 * @returns If the node is an instance of KeywordNode.
 * @throws If the node is NOT an instance of KeywordNode.
 * @example assertKeywordNode(myNode);
 */
export function assertKeywordNode(node) {
    if (!(isKeywordNode(node))) {
        throw new TypeError('Invalid KeywordNode');
    }
}
/**
 * Assert that a node is an instance of ListNode.
 * @param node - The node to check.
 * @returns If the node is an instance of ListNode.
 * @throws If the node is NOT an instance of ListNode.
 * @example assertListNode(myNode);
 */
export function assertListNode(node) {
    if (!(isListNode(node))) {
        throw new TypeError('Invalid ListNode');
    }
}
/**
 * Assert that a node is an instance of NilNode.
 * @param node - The node to check.
 * @returns If the node is an instance of NilNode.
 * @throws If the node is NOT an instance of NilNode.
 * @example assertNilNode(myNode);
 */
export function assertNilNode(node) {
    if (!(isNilNode(node))) {
        throw new TypeError('Invalid NilNode');
    }
}
/**
 * Assert that a node is an instance of NumberNode.
 * @param node - The node to check.
 * @returns If the node is an instance of NumberNode.
 * @throws If the node is NOT an instance of NumberNode.
 * @example assertNumberNode(myNode);
 */
export function assertNumberNode(node) {
    if (!(isNumberNode(node))) {
        throw new TypeError('Invalid NumberNode');
    }
}
/**
 * Assert that a node is an instance of StringNode.
 * @param node - The node to check.
 * @returns If the node is an instance of StringNode.
 * @throws If the node is NOT an instance of StringNode.
 * @example assertStringNode(myNode);
 */
export function assertStringNode(node) {
    if (!(isStringNode(node))) {
        throw new TypeError('Invalid StringNode');
    }
}
/**
 * Assert that a node is an instance of SymbolNode.
 * @param node - The node to check.
 * @returns If the node is an instance of SymbolNode.
 * @throws If the node is NOT an instance of SymbolNode.
 * @example assertSymbolNode(myNode);
 */
export function assertSymbolNode(node) {
    if (!(isSymbolNode(node))) {
        throw new TypeError('Invalid SymbolNode');
    }
}
/**
 * Assert that a node is an instance of VectorNode.
 * @param node - The node to check.
 * @returns undefined If the node is an instance of VectorNode.
 * @throws If the node is NOT an instance of VectorNode.
 * @example assertVectorNode(myNode);
 */
export function assertVectorNode(node) {
    if (!(isVectorNode(node))) {
        throw new TypeError('Invalid VectorNode');
    }
}
export function assertRegExp(value) {
    if (!(value instanceof RegExp)) {
        throw new Error('Expected a RegExp object.');
    }
}
export function assertSymbol(value) {
    if (typeof value !== 'symbol') {
        throw new Error('Expected a Symbol object.');
    }
}
// MARK: FACTORY FNS
// =============================================================================
/**
 * Factory function to create a DomNode.
 */
export function createDomNode(value, attributes, children, metadata) {
    return new DomNode(value, attributes, children, metadata);
}
/**
 * Factory function to create an AtomNode.
 */
// deno-lint-ignore no-explicit-any
export function createAtomNode(value) {
    return new AtomNode(value);
}
/**
 * Factory function to create a BooleanNode.
 */
export function createBooleanNode(value) {
    return new BooleanNode(value);
}
/**
 * Factory function to create a MapNode.
 */
export function createMapNode(value, metadata) {
    return new MapNode(value, metadata);
}
/**
 * Factory function to create a ErrorNode.
 */
export function createErrorNode(value, type, cause) {
    assertAstNode(value);
    return new ErrorNode(value, type, cause);
}
/**
 * Factory function to create a FunctionNode.
 */
export function createFunctionNode(value, closureMeta, isMacro, metadata) {
    return new FunctionNode(value, closureMeta, isMacro, metadata);
}
/**
 * Factory function to create a KeywordNode.
 */
export function createKeywordNode(value) {
    return new KeywordNode(value);
}
/**
 * Factory function to create a List Node.
 */
export function createListNode(value, metadata) {
    return new ListNode(value, metadata);
}
/**
 * Factory function to create a NilNode.
 */
export function createNilNode(value) {
    return new NilNode(value);
}
/**
 * Factory function to create a NumberNode.
 */
export function createNumberNode(value) {
    return new NumberNode(value);
}
/**
 * Factory function to create a StringNode.
 */
export function createStringNode(value) {
    return new StringNode(value);
}
/**
 * Factory function to create a SymbolNode.
 */
export function createSymbolNode(value) {
    return new SymbolNode(value);
}
/**
 * Factory function to create a VectorNode.
 */
export function createVectorNode(value = [], metadata) {
    return new VectorNode(value, metadata);
}
/**
 * Factory function to create a JsNode.
 */
// export function createJsNode<T extends SupportedJsTypes>(value: T): JsNode<T> {
//   return new JsNode(value);
// }
// MARK: TYPE GUARDS
// =============================================================================
/**
 * Type guard to check if a node is an instance of DomNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of DomNode, else false.
 * @example isDomNode(myNode);
 */
export function isDomNode(node) {
    return node instanceof DomNode;
}
/**
 * Type guard to check if a node is an instance of AstNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of AstNode, else false.
 * @example isAstNode(myNode);
 */
export function isAstNode(node) {
    return (isAtomNode(node) ||
        isBooleanNode(node) ||
        isDomNode(node) ||
        isErrorNode(node) ||
        isFunctionNode(node) ||
        // isJsNode(node) ||
        isKeywordNode(node) ||
        isListNode(node) ||
        isMapNode(node) ||
        isNilNode(node) ||
        isNumberNode(node) ||
        isStringNode(node) ||
        isSymbolNode(node) ||
        isVectorNode(node));
}
/**
 * Type guard to check if a node is an instance of AtomNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of AtomNode, else false.
 * @example isAtomNode(myNode);
 */
export function isAtomNode(node) {
    return node instanceof AtomNode;
}
/**
 * Type guard to check if a node is an instance of BooleanNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of BooleanNode, else false.
 * @example isBooleanNode(myNode);
 */
export function isBooleanNode(node) {
    return node instanceof BooleanNode && typeof node.value === 'boolean';
}
/**
 * Type guard to check if a node is an instance of MapNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of MapNode, else false.
 * @example isMapNode(myNode);
 */
export function isMapNode(node) {
    return node instanceof MapNode && node.value instanceof Map;
}
/**
 * // TODO: Convert value to string
 * Type guard to check if a node is an instance of ErrorNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of ErrorNode, else false.
 * @example isErrorNode(myNode);
 */
export function isErrorNode(node) {
    return node instanceof ErrorNode && isAstNode(node.value);
}
/**
 * Type guard to check if a node is an instance of FunctionNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of FunctionNode, else false.
 * @example isFunctionNode(myNode);
 */
export function isFunctionNode(node) {
    return node instanceof FunctionNode && typeof node.value === 'function';
}
/**
 * Type guard to check if a node is an instance of JsNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of JsNode, else false.
 * @example
 * ```typescript
 * const myNode = new JsNode(new Date());
 * isJsNode(myNode); // true
 * ```
 */
// export function isJsNode(node: unknown): node is JsNode<SupportedJsTypes> & { value: SupportedJsTypes } {
//   return node instanceof JsNode && isJsNodeSupportedType(node.value);
// }
/**
 * Type guard to check if a node is an instance of KeywordNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of KeywordNode, else false.
 * @example isKeywordNode(myNode);
 */
export function isKeywordNode(node) {
    return node instanceof KeywordNode && typeof node.value === 'string' &&
        node.value.endsWith(':');
}
/**
 * Type guard to check if a node is an instance of ListNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of ListNode, else false.
 * @example isListNode(myNode);
 */
export function isListNode(node) {
    return node instanceof ListNode && node.value.every(isAstNode);
}
/**
 * Type guard to check if a node is an instance of NilNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of NilNode, else false.
 * @example isNilNode(myNode);
 */
export function isNilNode(node) {
    return node instanceof NilNode && node.value === null;
}
/**
 * Type guard to check if a node is an instance of NumberNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of NumberNode, else false.
 * @example isNumberNode(myNode);
 */
export function isNumberNode(node) {
    return node instanceof NumberNode && typeof node.value === 'number';
}
/**
 * Type guard to check if a node is an instance of StringNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of StringNode, else false.
 * @example isStringNode(myNode);
 */
export function isStringNode(node) {
    return node instanceof StringNode && typeof node.value === 'string';
}
/**
 * Type guard to check if a node is an instance of SymbolNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of SymbolNode, else false.
 * @example isSymbolNode(myNode);
 */
export function isSymbolNode(node) {
    return node instanceof SymbolNode && typeof node.value === 'string';
}
/**
 * Type guard to check if a node is an instance of VectorNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of VectorNode, else false.
 * @example isVectorNode(myNode);
 */
export function isVectorNode(node) {
    return node instanceof VectorNode && node.value.every(isAstNode);
}
// MARK: VALIDATION FNS
// ============================================================================
/**
 * Checks if a value is one of the supported JavaScript types.
 *
 * @remarks
 * This function is used to verify if a given value matches any of the predefined supported JavaScript types. It ensures type safety and consistency when working with these types.
 *
 * @param value - The value to check.
 * @returns True if the value is one of the supported JavaScript types, else false.
 *
 * @example
 * ```typescript
 * const isSupported = isJsNodeSupportedType(new Date());
 * console.log(isSupported); // Outputs: true
 *
 * const isNotSupported = isJsNodeSupportedType("Hello");
 * console.log(isNotSupported); // Outputs: false
 * ```
 */
// export function isJsNodeSupportedType(value: unknown): value is SupportedJsTypes {
//   return (
//     value instanceof Date ||
//     value instanceof RegExp ||
//     value instanceof Set ||
//     value instanceof WeakMap ||
//     value instanceof WeakSet ||
//     value instanceof ArrayBuffer ||
//     value instanceof SharedArrayBuffer ||
//     value instanceof DataView ||
//     value instanceof Int8Array ||
//     value instanceof Uint8Array ||
//     value instanceof Uint8ClampedArray ||
//     value instanceof Int16Array ||
//     value instanceof Uint16Array ||
//     value instanceof Int32Array ||
//     value instanceof Uint32Array ||
//     value instanceof Float32Array ||
//     value instanceof Float64Array ||
//     value instanceof BigInt64Array ||
//     value instanceof BigUint64Array ||
//     typeof value === 'bigint'
//   );
// }
/**
 * Checks if two objects have the same prototype.
 * @param object1 - The first object to compare.
 * @param object2 - The second object to compare.
 * @returns Whether the two objects share the same prototype.
 * @example isSameClass({ a: 1 }, { b: 2 }) // true
 */
export function isSameClass(object1, object2) {
    return Object.getPrototypeOf(object1) === Object.getPrototypeOf(object2);
}
/**
 * Asserts that two Ast objects are equal.
 * @param a - The first Ast object to compare.
 * @param b - The second Ast object to compare.
 * @throws If the objects are not equal.
 * @example assertEq(astNode1, astNode2) // no output if equal, error if not
 */
export function assertEq(a, b) {
    if (!isEqualTo(a, b)) {
        throw new Error('Values are not equal');
    }
}
/**
 * Asserts that a value is defined (not undefined).
 * @param object - The value to check.
 * @throws If the value is undefined.
 * @example assertDefined(undefined) // throws error
 */
export function assertDefined(object) {
    if (object === undefined) {
        throw new Error('Value is undefined');
    }
}
/**
 * Asserts that a value is defined (not undefined).
 * @param object - The value to check.
 * @throws If the value is undefined.
 * @example assertDefined(undefined) // throws error
 */
export function assertUndefined(object) {
    if (object !== undefined) {
        throw new Error('Value is not undefined');
    }
}
/**
 * Asserts that a value is null or undefined.
 * @param object - The value to check.
 * @throws If the value is not null or undefined.
 * @example assertNullOrUndefined(42) // throws error
 */
export function assertNullOrUndefined(object) {
    if (object !== undefined && object !== null) {
        throw new Error('Value is not null or undefined');
    }
}
/**
 * Checks if a value is defined (not undefined).
 * @param object - The value to check.
 * @returns Whether the value is defined.
 * @example isDefined(undefined) // false
 */
export function isDefined(object) {
    return object !== undefined;
}
/**
 * Asserts that a value is true.
 * @param object - The value to check.
 * @throws If the value is not true.
 * @example assertTrue(false) // throws error
 */
export function assertTrue(object) {
    if (object === false) {
        throw new Error('Value is not true');
    }
}
/**
 * Determine if an Ast is "truthy".
 * Num always returns true because it is always set. 0 is set.
 * @param a - The Ast to check.
 * @returns Boolean true if the Ast is "truthy".
 * @throws Will not throw an error.
 * @example isAstTruthy(astNode) // returns true if the Ast node is "truthy"
 */
export function isAstTruthy(a, useJavaScriptTruthiness = false) {
    if (isBooleanNode(a)) {
        return a.value;
    }
    const atom = a;
    if (isAtomNode(atom)) {
        return isAstNode(atom.value) ? isAstTruthy(atom.value) : Boolean(atom.value);
    }
    const nilAst = a;
    if (isNilNode(nilAst)) {
        return false;
    }
    if (isNumberNode(a)) {
        if (useJavaScriptTruthiness) {
            return Boolean(a.value);
        }
        else {
            return true;
        }
    }
    return Boolean(a.value);
}
/**
 * Determines if a value is either a List or a Vec.
 * @param value - The value to check.
 * @returns True if the value is a List or a Vec.
 * @throws Will not throw an error.
 * @example isSequential(listOrVector) // returns true if it is a list or a vector
 */
export function isSequentialNode(value) {
    return isListNode(value) || isVectorNode(value);
}
/**
 * Asserts that a value is either a List or a Vec.
 * @param value - The value to assert the type for.
 * @throws Throws an error if the value is not a List or a Vec.
 * @example assertSequential(listOrVec) // no output if valid, else error
 */
export function assertSequential(value) {
    if (!(isListNode(value)) && !(isVectorNode(value))) {
        throw new TypeError('Invalid sequential type');
    }
}
/**
 * Asserts that a value can be used as a key in a dictionary.
 * @param value - The value to assert the key type for.
 * @throws Throws an error if the value cannot be used as a dictionary key.
 * @example assertDictKey(dictKeyCandidate) // no output if valid, error if not
 */
export function assertMapKeyNode(value) {
    if (!(isStringNode(value) || isSymbolNode(value) || isKeywordNode(value))) {
        throw new TypeError('Invalid dictionary key');
    }
}
/**
 * Checks if a value is a valid dictionary key.
 * @param value - The value to be checked.
 * @returns True if the value can be used as a dictionary key, otherwise false.
 * @throws Will not throw an error.
 * @example isDictKey("myKey") // returns true
 */
export function isMapKeyNode(value) {
    return (isStringNode(value) ||
        isSymbolNode(value) ||
        isKeywordNode(value));
}
/**
 * Asserts that a value is one of the metadata types: Func, List, Vec, Dict,
 * or DomNode.
 * @param value - The value to assert the type for.
 * @throws Throws an error if the value is not a valid metadata type.
 * @example assertMetadataType(myValue)
 */
export function assertMetadataType(value) {
    if (!(isFunctionNode(value)) &&
        !(isListNode(value)) &&
        !(isVectorNode(value)) &&
        !(isMapNode(value)) &&
        !(isDomNode(value))) {
        throw new TypeError('Invalid metadata type');
    }
}
/**
 * Asserts that the number of arguments provided matches the expected number.
 * @param actualCount - The number of arguments that were provided.
 * @param expectedCount - The number of arguments that were expected.
 * @throws Throws an error if the number of args doesn't match the expected no.
 * @example assertArgumentCount(3, 3)
 */
export function assertArgumentCount(actualCount, expectedCount, optionalMessage) {
    if (actualCount !== expectedCount) {
        let message = `Wanted ${expectedCount} arguments but got ${actualCount}`;
        if (optionalMessage) {
            message += ` ${optionalMessage}`;
        }
        throw new Error(message);
    }
}
/**
 * Asserts that the number of arguments provided is within the expected range.
 * @param actualCount - The number of arguments that were provided.
 * @param minExpectedCount - The minimum number of arguments that were expected.
 * @param maxExpectedCount - The maximum number of arguments that were expected.
 * @throws Throws an error if the no. Of arg is outside the expected range.
 * @example assertVariableArgumentCount(3, 1, 3)
 */
export function assertVariableArgumentCount(actualCount, minExpectedCount, maxExpectedCount) {
    if (actualCount < minExpectedCount || actualCount > maxExpectedCount) {
        throw new Error('Unexpected number of arguments');
    }
}
/**
 * Checks if the number of arguments passed to a function is at least the
 * minimum expected count.
 * @param actualCount - The actual number of arguments passed.
 * @param minExpectedCount - The minimum number of arguments expected.
 * @throws Thrown when the number of arguments is less than the
 * minimum expected.
 * @example assertMinimumArgumentCount(3, 2); // No error thrown
 * @example assertMinimumArgumentCount(1, 2); // Error: Unexpected minimum...
 */
export function assertMinimumArgumentCount(actualCount, minExpectedCount) {
    if (actualCount < minExpectedCount) {
        throw new Error('Unexpected minimum number of arguments');
    }
}
/**
 * Checks if the number of arguments is even.
 * @param maybeEven - The number of arguments to check.
 * @throws Thrown when the number of arguments is not even.
 * @example assertEvenArgumentCount(4); // No error thrown
 * @example assertEvenArgumentCount(3); // Error: Uneven number of arguments
 */
export function assertEvenArgumentCount(maybeEven) {
    if (maybeEven % 2 !== 0) {
        throw new Error('Uneven number of arguments');
    }
}
/**
 * Validates the type of each element in an array of Ast objects.
 * @description Ensures all elements in the array are instances of a specific
 * Ast subclass.
 * @param sequentialValues - The array of Ast objects to validate.
 * @param typeClass - The Ast subclass constructor to validate against.
 * @throws {Error} Thrown when an element is not an instance of the specified
 * Ast subclass.
 * @example assertSequentialValues([num1, num2], Num); // No error thrown
 * @example assertSequentialValues([num1, str1], Num); // Error
 */
export function assertSequentialValues(sequentialValues, typeClass) {
    for (const p of sequentialValues) {
        if (!(p instanceof typeClass)) {
            throw new TypeError('All values must be of the same type');
        }
    }
}
export function assertIsOneOf(astNode, typeClasses) {
    if (!typeClasses.some((typeClass) => astNode instanceof typeClass)) {
        throw new TypeError('Invalid type');
    }
}
/**
 * Checks if all elements in the given `VectorNode` are instances of the specified `TypeClass`.
 *
 * @template R - The type of the elements in the `VectorNode`, extending `AstNode`.
 * @param {VectorNode<R>} sequentialValues - The vector containing elements to be checked.
 * @param {TypeClass} typeClass - The class type to check each element against.
 * @returns {boolean} - Returns `true` if all elements in the vector are instances of the specified `TypeClass`, otherwise `false`.
 */
export function isTypedVector(sequentialValues, typeClass) {
    return sequentialValues.value.every((p) => p instanceof typeClass);
}
/**
 * Performs a deep equality check on Ast values, considering the internal
 * structure and types of the values.
 * @description Compares two Ast nodes deeply, considering the values and
 * types, including special treatments for list and vector types, as well as
 * dictionaries.
 * @param a - The first Ast node to compare.
 * @param b - The second Ast node to compare.
 * @returns True if the nodes are equal based on the deep check, false
 * otherwise.
 * @example isEqualTo(astNode1, astNode2);
 */
export function isEqualTo(a, b) {
    if (isSequentialNode(a) && isSequentialNode(b)) {
        if (a.value.length !== b.value.length) {
            return createBooleanNode(false);
        }
        for (let i = 0; i < a.value.length; i++) {
            if (!isEqualTo(a.value[i], b.value[i]).value) {
                return createBooleanNode(false);
            }
        }
        return createBooleanNode(true);
    }
    if (isMapNode(a) && isMapNode(b)) {
        if (a.value.size !== b.value.size) {
            return createBooleanNode(false);
        }
        for (const [aKeyString, aValue] of a.value) {
            const bValue = b.value.get(aKeyString);
            if (bValue === undefined) {
                return createBooleanNode(false);
            }
            const recurResult = isEqualTo(aValue, bValue);
            if (!recurResult.value) {
                return createBooleanNode(false);
            }
        }
        return createBooleanNode(true);
    }
    if (!isSameClass(a, b)) {
        return createBooleanNode(false);
    }
    const result = a.value === b.value;
    return createBooleanNode(result);
}
/**
 * Checks if the first item in a list is a symbol. Optionally tests the value.
 * @param listNode - The list node to check.
 * @param symbolValue - The symbol to check against the first item in the list.
 * @returns True if the first item in the list matches the symbol, else false.
 * @example listStartsWithSymbol(listNode, "mySymbol");
 * @example listStartsWithSymbol(listNode);
 */
export function listStartsWithSymbol(listNode, symbolValue) {
    const isListWithSymbol = isListNode(listNode) &&
        isSymbolNode(listNode.value[0]);
    if (isListWithSymbol && symbolValue !== undefined) {
        return listNode.value[0].value === symbolValue;
    }
    return isListWithSymbol;
}
/**
 * Asserts that two values are equal.
 * @description Compares two values and throws an error if they are not equal.
 * @param actual - The actual value to check.
 * @param expected - The expected value to match against the actual value.
 * @throws Thrown when the actual value does not equal the expected value.
 * @example assertEqual("foo", "foo"); // No error thrown
 * @example assertEqual("foo", "bar"); // Error thrown: Unexpected value
 */
export function assertEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Unexpected value '${actual}', wanted ${expected}`);
    }
}
/**
 * Asserts that the actual value is greater than or equal to the expected value.
 * @description Checks if the actual value is greater than or equal to the
 * expected value and throws an error if it isn't.
 * @param actual - The value that is being tested.
 * @param expected - The value that we are comparing the actual value against.
 * @throws Error if the actual value is less than the expected value.
 * @example assertGreaterThanEqual(5, 3); // No error thrown
 */
export function assertGreaterThanEqual(actual, expected) {
    if (actual >= expected) {
        throw new Error('Unexpected value');
    }
}
/**
 * Asserts that a symbol has a specific value.
 * @description Checks if the symbol has the specified value and asserts the
 * type if it does.
 * @param sym - The symbol that is being tested.
 * @param value - The value that we expect the symbol to have.
 * @throws Error if the symbol's value doesn't match the expected value.
 * @example assertSymWithValue(mySym, "expectedValue");
 */
export function assertSymWithValue(sym, value) {
    assertEqual(sym.value, value);
}
/**
 * Creates a continue result for the interpreter with the given AST and
 * environment.
 * @description Creates a result object representing the 'continue' branch of
 * an interpreter execution, holding the next AST to interpret and the
 * environment to use.
 * @param ast - The AST to continue interpreting.
 * @param env - The environment to use for the continued interpretation.
 * @returns Obj - An object representing a continue result.
 * @example continueResult(astNode, envContext); // Get a continue result object
 */
export function continueResult(ast, env) {
    return {
        continue: { ast, env },
        return: undefined,
    };
}
/**
 * Creates a return result for the interpreter with the given AST.
 * @description Creates a result object representing the 'return' branch of
 * an interpreter execution, holding the AST that is the result of the
 * interpretation.
 * @param ast - The AST that is the result of the interpretation.
 * @returns Obj - An object representing a return result.
 * @example returnResult(astNode); // Get a return result object
 */
export function returnResult(ast) {
    return {
        continue: undefined,
        return: ast,
    };
}
/**
 * Prepends an AST node to an array of AST nodes.
 * @description Adds an AST node to the beginning of an array of AST nodes,
 * returning a new array.
 * @param acc - The accumulator array to which the AST node should be prepended.
 * @param curr - The AST node to prepend to the accumulator array.
 * @returns Arr - A new array with the AST node prepended.
 * @example prepend(accArray, astNode); // Prepend astNode to accArray
 */
export const prepend = (acc, curr) => [
    curr,
    ...acc,
];
/**
 * Appends an AST node to an array of AST nodes.
 * @description Adds an AST node to the end of an array of AST nodes,
 * returning a new array.
 * @param acc - The accumulator array to which the AST node should be appended.
 * @param curr - The AST node to append to the accumulator array.
 * @returns Arr - A new array with the AST node appended.
 * @example append(accArray, astNode); // Append astNode to accArray
 */
export const append = (acc, curr) => [
    ...acc,
    curr,
];
// MARK: COPY
/**
 * Creates a deep copy of the given AST node.
 * @description Uses different copy functions based on the type of the AST
 * node to create a deep copy.
 * @param ast - The AST node to copy.
 * @returns Ast - A deep copy of the given AST node.
 * @throws Err - Throws an error if the AST node type is unrecognized.
 * @example copy(astNode); // Creates a deep copy of astNode
 */
export function copy(ast) {
    if (isAtomNode(ast)) {
        return copyAtomNode(ast);
    }
    if (isBooleanNode(ast)) {
        return copyBooleanNode(ast);
    }
    if (isMapNode(ast)) {
        return copyMapNode(ast);
    }
    if (isErrorNode(ast)) {
        return copyErrorNode(ast);
    }
    if (isFunctionNode(ast)) {
        return copyFunctionNode(ast);
    }
    if (isKeywordNode(ast)) {
        return copyKeywordNode(ast);
    }
    if (isListNode(ast)) {
        return copyListNode(ast);
    }
    if (isNilNode(ast)) {
        return copyNilNode(ast);
    }
    if (isNumberNode(ast)) {
        return copyNumberNode(ast);
    }
    if (isStringNode(ast)) {
        return copyStringNode(ast);
    }
    if (isSymbolNode(ast)) {
        return copySymbolNode(ast);
    }
    if (isVectorNode(ast)) {
        return copyVectorNode(ast);
    }
    if (isDomNode(ast)) {
        return copyDomNode(ast);
    }
    throw new Error('Unmatched object');
}
/**
 * Creates a copy of an Atom node.
 * @description Creates a new Atom node with a deep copy of the value of the
 * given Atom node.
 * @param a - The Atom node to copy.
 * @returns Atom - A new Atom node with a copied value.
 * @example copyAtom(atomNode); // Creates a copy of atomNode
 */
export function copyAtomNode(a) {
    // TODO: Coerce JS values into AstNodes?
    // if (a.isAstNode(value) === false) {
    // 	return createAtomNode(structuredClone(a.value));
    // }
    return createAtomNode(copy(a.value));
}
/**
 * Creates a copy of a Bool node.
 * @description Creates a new Bool node with the same value as the given Bool
 * node.
 * @param a - The Bool node to copy.
 * @returns Bool - A new Bool node with the same value.
 * @example copyBool(boolNode); // Creates a copy of boolNode
 */
export function copyBooleanNode(a) {
    return createBooleanNode(a.value);
}
/**
 * Creates a copy of a Dict node.
 * @description Creates a new Dict node with a deep copy of the value and
 * metadata of the given Dict node.
 * @param a - The Dict node to copy.
 * @returns Dict - A new Dict node with copied values and metadata.
 * @example copyDict(dictNode); // Creates a copy of dictNode
 */
export function copyMapNode(a) {
    const dict = createMapNode(new Map(a.value));
    dict.metadata = copy(a.metadata ?? createNilNode());
    return dict;
}
/**
 * Creates a copy of a DomNode.
 * @description Creates a createDomNode instance with a deep copy of the value
 * and metadata from the given DomNode instance.
 * @param a - The DomNode to copy.
 * @returns Dict - A createDomNode instance with copied values and metadata.
 * @example copyDomNode(domNodeInstance); // Creates a copy of domNodeInstance
 */
export function copyDomNode(a) {
    const tagName = a.value;
    const attributes = a.attributes;
    const children = a.children;
    const domNode = createDomNode(tagName, new Map(attributes), children.map(copy));
    domNode.metadata = copy(a.metadata ?? createNilNode());
    return domNode;
}
/**
 * Creates a copy of an Err node.
 * @description Creates a new Err node with a deep copy of the value from the
 * given Err node.
 * @param a - The Err node to copy.
 * @returns Err - A new Err node with a copied value.
 * @example copyErr(errNode); // Creates a copy of errNode
 */
export function copyErrorNode(a) {
    return createErrorNode(copy(a.value));
}
/**
 * Creates a copy of a Func node.
 * @description Creates a new Func node with copied values, including a deep
 * copy of metadata and, if present, a deep copy of the closureMeta attribute
 * from the given Func node.
 * @param a - The Func node to copy.
 * @returns Func - A new Func node with copied attributes.
 * @example copyFunc(funcNode); // Creates a copy of funcNode
 */
export function copyFunctionNode(a) {
    const func = createFunctionNode(a.value);
    func.isMacro = a.isMacro;
    func.metadata = copy(a.metadata ?? createNilNode());
    if (a.closureMeta) {
        const cl = a.closureMeta;
        func.closureMeta = {
            ast: copy(cl.ast),
            env: cl.env, // Copy env?
            parameters: cl.parameters.map((sym) => createSymbolNode(sym.value)),
        };
    }
    return func;
}
/**
 * Creates a copy of a Key node.
 * @description Creates a new Key node with the same value as the given Key
 * node.
 * @param a - The Key node to copy.
 * @returns Key - A new Key node with the same value.
 * @example copyKey(keyNode); // Creates a copy of keyNode
 */
export function copyKeywordNode(a) {
    return createKeywordNode(a.value);
}
/**
 * Creates a copy of a List node.
 * @description Creates a new List node with deep copies of the values and
 * metadata from the given List node.
 * @param a - The List node to copy.
 * @returns List - A new List node with copied values and metadata.
 * @example copyList(listNode); // Creates a copy of listNode
 */
export function copyListNode(a) {
    const list = createListNode(a.value.map((value) => copy(value)));
    list.metadata = copy(a.metadata ?? createNilNode());
    return list;
}
/**
 * Creates a copy of a Nil node.
 * @description Creates a new Nil node. Since Nil nodes do not hold any
 * information, this essentially returns a new Nil node.
 * @param _ast - The Nil node (not used, but required for function signature).
 * @returns Nil - A new Nil node.
 * @example copyNil(nilNode); // Creates a new Nil node
 */
export function copyNilNode(_ast) {
    return createNilNode();
}
/**
 * Creates a copy of a Num node.
 * @description Makes a new Num node with the same value as the given Num node.
 * @param a - The Num node to copy.
 * @returns Num - A new Num node with the same value.
 * @example copyNum(numNode); // Creates a copy of numNode
 */
export function copyNumberNode(a) {
    return createNumberNode(a.value);
}
/**
 * Creates a copy of a Str node.
 * @description Creates a new Str node w/ the same value as the given Str node.
 * @param a - The Str node to copy.
 * @returns Str - A new Str node with the same value.
 * @example copyStr(strNode); // Creates a copy of strNode
 */
export function copyStringNode(a) {
    return createStringNode(a.value);
}
/**
 * Creates a copy of a Sym node.
 * @description Creates a new Sym node w/ the same value as the given Sym node.
 * @param a - The Sym node to copy.
 * @returns Sym - A new Sym node with the same value.
 * @example copySym(symNode); // Creates a copy of symNode
 */
export function copySymbolNode(a) {
    return createSymbolNode(a.value);
}
/**
 * Creates a copy of a Vec node.
 * @description Creates a new Vec node with deep copies of the values and
 * metadata from the given Vec node.
 * @param a - The Vec node to copy.
 * @returns Vec - A new Vec node with copied values and metadata.
 * @example copyVec(vecNode); // Creates a copy of vecNode
 */
export function copyVectorNode(a) {
    const vec = createVectorNode(a.value.map((value) => copy(value)));
    vec.metadata = copy(a.metadata ?? createNilNode());
    return vec;
}
// MARK: MAP FNS
/**
 * Adds a new element with a specified DictKey and value to the Ast Map. If an
 * element with the same key already exists, the element will be updated.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @param value - Value for the given key.
 * @example mapSet(new Map(), makeStr('foo'), makeStr('bar'));
 */
export function setMapElement(map, key, value) {
    map.set(convertMapKeyToString(key), value);
}
/**
 * Removes an element from the Ast Map with the corresponding DictKey.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @returns True if an element in the Ast Map existed and has been removed, or
 * false if the element does not exist.
 * @example mapDelete(new Map([['foo', makeStr('bar')]]));
 */
export function deleteMapElement(map, key) {
    map.delete(convertMapKeyToString(key));
}
/**
 * Tests whether the Ast Map contains an element with the given DictKey.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @returns Boolean indicating whether an element with the specified key exists.
 * @example mapHas(myMap, makeSym('foobar'));
 */
export function hasMapElement(map, key) {
    return map.has(convertMapKeyToString(key));
}
/**
 * Gets an element from the Ast Map with the given DictKey
 * If the value that is associated to the provided key is an object, then you
 * will get a reference to that object and any change made to that object will
 * effectively modify it inside the Map.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @returns Returns the element associated with the specified DictKey. If no
 * element is associated with the specified DictKey, undefined is returned.
 * @example mapGet(myMap, makeSym('foobar'));
 */
export function getMapElement(map, key) {
    return map.get(convertMapKeyToString(key));
}
/**
 * Get a List of DictKeys from the AstMap.
 * @param map - A JavaScript Map object.
 * @returns A List of DictKeys.
 * @example mapKeys(myMap);
 */
export function getMapKeys(map) {
    const keys = [...map.keys()];
    return createListNode(keys.map((key) => convertStringToMapKey(key)));
}
/**
 * Converts a DictKey into a string.
 * - Key becomes, e.g. `:key` (prefix with :)
 * - Str becomes, e.g. `"key"` (surrounded with double quotes)
 * - Sym becomes, e.g. `key` (plain string).
 * @param ast - A DictKey to convert.
 * @returns A MapKey (string).
 * @example dictKeyToStr(makeKey('foobar')) //=> ':foobar'
 * @example dictKeyToStr(makeStr('foobar')) //=> '"foobar"'
 * @example dictKeyToStr(makeSym('foobar')) //=> 'foobar'
 */
export function convertMapKeyToString(ast) {
    const key = ast; // Key has : at the beginning
    if (isKeywordNode(key)) {
        return key.value;
    }
    const string_ = ast; // Str must be re-quoted
    if (isStringNode(string_)) {
        return `"${string_.value}"`;
    }
    return ast.value; // Sym
}
/**
 * Converts a MapKey (string) into a DictKey.
 * @param key - A string which can be converted into DictKeys.
 * @returns The converted dict key.
 * @example mapKeyToDictKey(':foobar') //=> Key {value: 'foobar:'}
 * @example mapKeyToDictKey('foobar:') //=> Key {value: 'foobar:'}
 */
export function convertStringToMapKey(key) {
    if (key.endsWith(':')) {
        return createKeywordNode(key);
    }
    if (key.startsWith('"')) {
        return createStringNode(key.slice(1, -1));
    }
    return createSymbolNode(key);
}
/**
 * Remove special characters from map keys.
 * @param key - A string or DictKey.
 * @returns Plain string.
 * @example getBareMapKey(':keyword'); //=> 'keyword'
 */
export function getBareMapKey(key) {
    const value = isMapKeyNode(key) ? key.value : key;
    if (value.startsWith(':') || value.endsWith(':')) {
        return value.replaceAll(':', '');
    }
    if (value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
    }
    return value;
}
/**
 * Gets a List of Asts in the AstMap.
 * @param map - An Ast Map.
 * @returns List of Ast's.
 * @example mapValues(myMap)
 */
export function getMapValues(map) {
    const values = [...map.values()];
    return createListNode(values);
}
/**
 * Gets entries from the Ast Map, converts MapKeys to DictKeys,
 * and flattens the result.
 * @param map - An Ast Map.
 * @returns An array of DictKeys and Ast's.
 * @example mapFlat(myMap);
 */
export function mapFlat(map) {
    const flat = [];
    for (const [key, value] of map.entries()) {
        flat.push(convertStringToMapKey(key), value);
    }
    return flat;
}
// MARK: HELPER FNS
/**
 * Splits a filename at the first dot.
 * @param filename - The filename to split.
 * @returns An array containing two strings:
 * 1. The part of the filename before the first dot.
 * 2. The part of the filename after the first dot.
 * @example
 * const [filename, rest] = splitAtFirstDot('foo.mal.clj');
 * console.log(`Filename: ${filename}, Rest: ${rest}`);
 * // "Filename: foo, Rest: mal.clj"
 */
export function splitAtFirstDot(filename) {
    const firstDotIndex = filename.indexOf('.');
    return [filename.slice(0, firstDotIndex), filename.slice(firstDotIndex + 1)];
}
/**
 * Replace &, <, >, ", and ' with HTML entities.
 * @param unsafe - The string to escape.
 * @returns An escaped string.
 * @example htmlEncode('Bread & Butter'); //=> 'Bread &amp; Butter'
 */
export function htmlEncode(unsafe) {
    return unsafe
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}
/**
 * Removes duplicate spaces and strips newlines.
 * @param string_ - The string to normalize.
 * @returns A single spaced string without newlines.
 * @example normalizeWhitespace('    str     '); //=> ' str '
 */
export function normalizeWhitespace(string_) {
    return string_.replaceAll('\n', ' ').replaceAll(/\s{2,}/g, ' ');
}
/**
 * Slashes (escapes) \, ", and \n. Used for when printReadably is set to true.
 * @description
 * The string is "escaped" as follows:
 * - Backslashes are replaced with double backslashes.
 * - Quotes are prefixed with a backslash.
 * - Newline characters are replaced with backslash + 'n'.
 * @param string_ - String to escape.
 * @returns An escaped string.
 * @example slash('foo\nbar'); //=> 'foo\\nbar'
 */
export function slash(string_) {
    return string_
        .replaceAll('\\', '\\\\')
        .replaceAll('"', '\\"')
        .replaceAll('\n', '\\n');
}
export function unwrap(ast) {
    if (isAtomNode(ast)) {
        return unwrapAtomNode(ast);
    }
    if (isBooleanNode(ast)) {
        return unwrapBooleanNode(ast);
    }
    if (isMapNode(ast)) {
        return unwrapMapNode(ast);
    }
    if (isErrorNode(ast)) {
        return unwrapErrorNode(ast);
    }
    if (isFunctionNode(ast)) {
        return unwrapFunctionNode(ast);
    }
    if (isKeywordNode(ast)) {
        return unwrapKeywordNode(ast);
    }
    if (isListNode(ast)) {
        return unwrapListNode(ast);
    }
    if (isNilNode(ast)) {
        return unwrapNilNode();
    }
    if (isNumberNode(ast)) {
        return unwrapNumberNode(ast);
    }
    if (isStringNode(ast)) {
        return unwrapStringNode(ast);
    }
    if (isSymbolNode(ast)) {
        return unwrapSymbolNode(ast);
    }
    if (isVectorNode(ast)) {
        return unwrapVectorNode(ast);
    }
    throw new Error('Could not unwrap object.');
}
export function unwrapAtomNode(ast) {
    return unwrap(ast.value);
}
export function unwrapBooleanNode(ast) {
    return ast.value;
}
export function unwrapDomNode(ast) {
    // return ast.domNode;
    return ast.value;
}
export function unwrapErrorNode(ast) {
    const message = isStringNode(ast.value) ? ast.value.value : String(unwrap(ast.value));
    return new Error(message);
}
export function unwrapFunctionNode(ast) {
    return (...args) => toAst(unwrap(ast.value(...args)));
}
export function unwrapKeywordNode(ast) {
    return ast.value;
}
export function unwrapListNode(ast) {
    return ast.value.map(unwrap);
}
export function unwrapMapNode(ast) {
    const plainObject = {};
    for (const [key, value] of ast.value.entries()) {
        plainObject[key] = unwrap(value);
    }
    return plainObject;
}
export function unwrapNilNode() {
    return null;
}
export function unwrapNumberNode(ast) {
    return ast.value;
}
export function unwrapStringNode(ast) {
    return ast.value;
}
export function unwrapSymbolNode(ast) {
    return ast.value;
}
export function unwrapVectorNode(ast) {
    return ast.value.map(unwrap);
}
// // TODO: Rename toJs to unwrap, unwrapJs, or unwrapAstNode
// /**
//  * Converts an abstract syntax tree (AST) node to its corresponding JavaScript representation.
//  * @param ast - The AST node to convert.
//  * @returns The JavaScript representation of the AST node.
//  * @throws Will throw an error if the AST node type is unmatched.
//  */
// export function toJs<T extends AstNode = AstNode>(
//   ast: T,
// ): T['value'] { // AllReturnableJsTypes
//   if (isAtomNode(ast)) {
//     return toJs(ast.value);
//   }
//   if (isBooleanNode(ast)) {
//     return ast.value;
//   }
//   if (isMapNode(ast)) {
//     const obj: Record<string, T['value']> = {};
//     for (const [key, value] of ast.value.entries()) {
//       obj[key] = toJs(value);
//     }
//     return obj;
//   }
//   if (isErrorNode(ast)) {
//     if (isStringNode(ast.value)) {
//       return new Error(ast.value.value);
//     } else {
//       return new Error(String(ast.value));
//     }
//   }
//   if (isFunctionNode(ast)) {
//     return ((...args: AllReturnableJsTypes[]) => toJs(ast.value(...args.map(toAst))));
//   }
//   if (isKeywordNode(ast)) {
//     return ast.value;
//   }
//   if (isListNode(ast)) {
//     return ast.value.map(toJs);
//   }
//   if (isNilNode(ast)) {
//     return null;
//   }
//   if (isNumberNode(ast)) {
//     return ast.value;
//   }
//   if (isStringNode(ast)) {
//     return ast.value;
//   }
//   if (isSymbolNode(ast)) {
//     return ast.value;
//   }
//   if (isVectorNode(ast)) {
//     return ast.value.map((n) => toJs(n));
//   }
//   // if (isJsNode(ast)) {
//   //   return ast.value;
//   // }
//   throw new TypeError(
//     `Could not convert '${JSON.stringify(ast)}' to JavaScript`,
//   );
// }
/**
 * Translate JavaScript primitive values into Ast's.
 * @param jsValue - A JavaScript primitive to convert into an Ast.
 * @returns The JavaScript primitive converted to an Ast or Err.
 * @example toAst('foobar') //=> Str { value: 'foobar' }
 */
export function toAst(input) {
    if (isAstNode(input)) {
        return input;
    }
    switch (typeof input) {
        case 'undefined': {
            return createNilNode();
        }
        case 'number': {
            return createNumberNode(input);
        }
        case 'string': {
            if (input.startsWith('"')) {
                return createStringNode(input);
            }
            if (input.startsWith(':')) {
                return createKeywordNode(input);
            }
            return createSymbolNode(input);
        }
        case 'boolean': {
            return createBooleanNode(input);
        }
        case 'symbol': {
            return createStringNode(JSON.stringify(input));
        }
        case 'function': {
            return createFunctionNode((...args) => {
                try {
                    return toAst(input(...args.map((x) => x.value)));
                }
                catch (error) {
                    if (error instanceof Error) {
                        return createErrorNode(createStringNode(error.message));
                    }
                    return createErrorNode(createStringNode(JSON.stringify(error)));
                }
            });
        }
        case 'object': {
            // if (isJsNodeSupportedType(input)) {
            //   return createJsNode(input);
            // }
            if (input instanceof Error) {
                return createErrorNode(createStringNode(input.message));
            }
            if (input === null) {
                return createNilNode();
            }
            if (Array.isArray(input)) {
                const array = input.map((element) => toAst(element));
                return createListNode(array);
            }
            if (input instanceof Map) {
                const map = new Map();
                for (const [maybeString, unknownValue] of input.entries()) {
                    const key = String(maybeString);
                    const value = toAst(unknownValue);
                    map.set(key, value);
                }
                return createMapNode(map);
            }
            const inputObject = input;
            const map = new Map();
            for (const [maybeString, unknownValue] of Object.entries(inputObject)) {
                const key = String(maybeString);
                const value = toAst(unknownValue);
                map.set(key, value);
            }
            return createMapNode(map);
        }
        default: {
            const coercedUnknown = String(input);
            return createErrorNode(createStringNode(`unknown type ${coercedUnknown}`));
        }
    }
}
/**
 * Converts a given input into an `AstNode` of type `ErrorNode`.
 *
 * @param caughtError - The input to convert, which can be a string, an Error, or an AstNode.
 * @returns An `AstNode` of type `ErrorNode`.
 */
export function toErrorNode(caughtError) {
    if (isErrorNode(caughtError))
        return caughtError;
    if (isAstNode(caughtError))
        return createErrorNode(caughtError);
    if (caughtError instanceof Error) {
        return createErrorNode(createStringNode(caughtError.message));
    }
    return createErrorNode(createStringNode(String(caughtError)));
}
