/**
 * @file Defines types and helper functions.
 */
import { type Env } from './env.ts';
/**
 * All of the possible types that an AstNode can be.
 */
export type AstNode = AtomNode | BooleanNode | DomNode | ErrorNode | FunctionNode | KeywordNode | ListNode | MapNode | NilNode | NumberNode | StringNode | SymbolNode | VectorNode;
/**
 * Defines a union of JavaScript types that can be used with JsNode.
 *
 * @remarks
 * This type alias is used to specify a set of JavaScript types that are supported by JsNode. It ensures that only types that we can handle are specified.
 *
 * @example
 * ```typescript
 * const dateValue = new Date();
 * new JsNode(dateValue); // No type error
 *
 * const stringValue: SupportedJsTypes = "Hello"; // Type error: string is not assignable to SupportedJsTypes
 * ```
 */
/**
 * Defines the actual function that FunctionNode wraps.
 */
export type Closure = (...args: AstNode[]) => AstNode;
/**
 * The metadata for a FunctionNode. These values are used as the context for the function when it is evaluated.
 */
export type ClosureMetadata = {
    ast: AstNode;
    env: Env;
    parameters: SymbolNode[];
};
/**
 * Types that are valid map keys.
 */
export type MapKeyNode = KeywordNode | StringNode | SymbolNode;
/**
 * Represents a node type that is sequential.
 */
export type Seq = VectorNode | ListNode;
/**
 * Types that support metadata.
 */
export type MetadataTypes = FunctionNode | ListNode | VectorNode | MapNode | DomNode;
/**
 * Names of builtin Ensemble functions
 */
type SymbolValues = 'def!' | 'let*' | 'quote' | 'quasiquoteexpand' | 'quasiquote' | 'defmacro!' | 'macroexpand' | 'do' | 'if' | 'fn*' | 'try*' | 'catch*' | 'default' | 'globalThis' | 'var' | 'let' | 'const' | 'function' | '=>' | 'try' | 'catch';
/**
 * Defines a symbol that identifies a builtin Ensemble function with a specific value.
 */
export type SymWithValue<Value extends SymbolValues> = SymbolNode & {
    value: Value;
};
/**
 * Defines the possible types for typed vectors.
 */
type TypeClass = typeof AtomNode | typeof BooleanNode | typeof DomNode | typeof ErrorNode | typeof FunctionNode | typeof KeywordNode | typeof ListNode | typeof MapNode | typeof NilNode | typeof NumberNode | typeof StringNode | typeof SymbolNode | typeof VectorNode;
/**
 * AtomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class AtomNode {
    value: any;
    constructor(value: any);
}
/**
 * BooleanNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class BooleanNode {
    value: boolean;
    constructor(value: boolean);
}
/**
 * DomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class DomNode {
    value: string;
    attributes: Map<string, AstNode>;
    children: AstNode[];
    metadata?: AstNode | undefined;
    constructor(value: string, // The tag name
    attributes?: Map<string, AstNode>, // TODO: Change to MapNode
    children?: AstNode[], metadata?: AstNode | undefined);
}
type ErrorTypes = 'Error' | 'AggregateError' | 'RangeError' | 'ReferenceError' | 'SyntaxError' | 'TypeError' | 'URIError';
export type NameStringNode = StringNode & {
    value: ErrorTypes;
};
/**
 * ErrorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class ErrorNode {
    value: AstNode;
    name: StringNode;
    cause?: AstNode;
    static isErrorName(name: StringNode): name is NameStringNode;
    static assertErrorName(name: StringNode): asserts name is NameStringNode;
    /**
     * @param value - message
     */
    constructor(value: AstNode, name?: NameStringNode, cause?: AstNode);
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
export declare class FunctionNode {
    value: Closure;
    closureMeta?: ClosureMetadata | undefined;
    isMacro: boolean;
    metadata?: AstNode | undefined;
    constructor(value: Closure, closureMeta?: ClosureMetadata | undefined, isMacro?: boolean, metadata?: AstNode | undefined);
}
/**
 * KeywordNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class KeywordNode {
    private _value;
    constructor(_value: string);
    get value(): string;
    set value(keyword: string);
    get bare(): string;
}
/**
 * List class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class ListNode {
    value: AstNode[];
    metadata?: AstNode | undefined;
    constructor(value: AstNode[], metadata?: AstNode | undefined);
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
export declare class MapNode {
    value: Map<string, AstNode>;
    metadata?: AstNode | undefined;
    constructor(value?: Map<string, AstNode>, metadata?: AstNode | undefined);
}
/**
 * NilNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class NilNode {
    value: unknown;
    constructor(value?: unknown);
}
/**
 * NumberNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class NumberNode {
    value: number;
    constructor(value: number);
}
/**
 * SymbolNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class SymbolNode {
    value: string;
    constructor(value: string);
}
/**
 * StringNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class StringNode {
    value: string;
    constructor(value: string);
}
/**
 * VectorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export declare class VectorNode<T extends AstNode = AstNode> {
    value: T[];
    metadata?: AstNode | undefined;
    constructor(value: T[], metadata?: AstNode | undefined);
}
/**
 * JsNode class
 * A wrapper for native JavaScript data types that we do not want to expose in Ensemble.
 * @param value - The data that this class represents.
 */
/**
 * Assert that a node is an instance of DomNode.
 * @param node - The node to check.
 * @returns If the node is an instance of DomNode.
 * @throws If the node is NOT an instance of DomNode.
 * @example assertDomNode(myNode);
 */
export declare function assertDomNode(node: unknown): asserts node is DomNode & {
    value: string;
};
/**
 * Assert that a node is an instance of AstNode.
 * @param node - The node to check.
 * @returns If the node is an instance of AstNode.
 * @throws If the node is NOT an instance of AstNode.
 * @example assertAstNode(myNode);
 */
export declare function assertAstNode(node: unknown): asserts node is AstNode & {
    value: AstNode;
};
/**
 * Assert that a node is an instance of AtomNode.
 * @param node - The node to check.
 * @returns If the node is an instance of AtomNode.
 * @throws If the node is NOT an instance of AtomNode.
 * @example assertAtomNode(myNode);
 */
export declare function assertAtomNode(node: unknown): asserts node is AtomNode;
/**
 * Assert that a node is an instance of BooleanNode.
 * @param node - The node to check.
 * @returns If the node is an instance of BooleanNode.
 * @throws If the node is NOT an instance of BooleanNode.
 * @example assertBooleanNode(myNode);
 */
export declare function assertBooleanNode(node: unknown): asserts node is BooleanNode & {
    value: boolean;
};
/**
 * Assert that a node is an instance of MapNode.
 * @param node - The node to check.
 * @returns If the node is an instance of MapNode.
 * @throws If the node is NOT an instance of MapNode.
 * @example assertMapNode(myNode);
 */
export declare function assertMapNode(node: unknown): asserts node is MapNode & {
    value: Map<string, AstNode>;
};
/**
 * Assert that a node is an instance of ErrorNode.
 * @param node - The node to check.
 * @returns If the node is an instance of ErrorNode.
 * @throws If the node is NOT an instance of ErrorNode.
 * @example assertErrorNode(myNode);
 */
export declare function assertErrorNode(node: unknown): asserts node is ErrorNode & {
    value: AstNode;
};
/**
 * Assert that a node is an instance of FunctionNode.
 * @param node - The node to check.
 * @returns If the node is an instance of FunctionNode.
 * @throws If the node is NOT an instance of FunctionNode.
 * @example assertFunctionNode(myNode);
 */
export declare function assertFunctionNode(node: unknown): asserts node is FunctionNode & {
    value: Closure;
};
/**
 * Assert that a node is an instance of KeywordNode.
 * @param node - The node to check.
 * @returns If the node is an instance of KeywordNode.
 * @throws If the node is NOT an instance of KeywordNode.
 * @example assertKeywordNode(myNode);
 */
export declare function assertKeywordNode(node: unknown): asserts node is KeywordNode & {
    value: `${string}:`;
};
/**
 * Assert that a node is an instance of ListNode.
 * @param node - The node to check.
 * @returns If the node is an instance of ListNode.
 * @throws If the node is NOT an instance of ListNode.
 * @example assertListNode(myNode);
 */
export declare function assertListNode(node: unknown): asserts node is ListNode & {
    value: AstNode[];
};
/**
 * Assert that a node is an instance of NilNode.
 * @param node - The node to check.
 * @returns If the node is an instance of NilNode.
 * @throws If the node is NOT an instance of NilNode.
 * @example assertNilNode(myNode);
 */
export declare function assertNilNode(node: unknown): asserts node is NilNode & {
    value: null;
};
/**
 * Assert that a node is an instance of NumberNode.
 * @param node - The node to check.
 * @returns If the node is an instance of NumberNode.
 * @throws If the node is NOT an instance of NumberNode.
 * @example assertNumberNode(myNode);
 */
export declare function assertNumberNode(node: unknown): asserts node is NumberNode & {
    value: number;
};
/**
 * Assert that a node is an instance of StringNode.
 * @param node - The node to check.
 * @returns If the node is an instance of StringNode.
 * @throws If the node is NOT an instance of StringNode.
 * @example assertStringNode(myNode);
 */
export declare function assertStringNode(node: unknown): asserts node is StringNode & {
    value: string;
};
/**
 * Assert that a node is an instance of SymbolNode.
 * @param node - The node to check.
 * @returns If the node is an instance of SymbolNode.
 * @throws If the node is NOT an instance of SymbolNode.
 * @example assertSymbolNode(myNode);
 */
export declare function assertSymbolNode(node: unknown): asserts node is SymbolNode & {
    value: string;
};
/**
 * Assert that a node is an instance of VectorNode.
 * @param node - The node to check.
 * @returns undefined If the node is an instance of VectorNode.
 * @throws If the node is NOT an instance of VectorNode.
 * @example assertVectorNode(myNode);
 */
export declare function assertVectorNode(node: unknown): asserts node is VectorNode & {
    value: AstNode[];
};
export declare function assertRegExp(value: unknown): asserts value is RegExp;
export declare function assertSymbol(value: unknown): asserts value is symbol;
/**
 * Factory function to create a DomNode.
 */
export declare function createDomNode(value: string, attributes?: Map<string, AstNode>, children?: AstNode[], metadata?: AstNode): DomNode;
/**
 * Factory function to create an AtomNode.
 */
export declare function createAtomNode(value: any): AtomNode;
/**
 * Factory function to create a BooleanNode.
 */
export declare function createBooleanNode(value: boolean): BooleanNode;
/**
 * Factory function to create a MapNode.
 */
export declare function createMapNode(value?: Map<string, AstNode>, metadata?: AstNode): MapNode;
/**
 * Factory function to create a ErrorNode.
 */
export declare function createErrorNode(value: AstNode, type?: NameStringNode, cause?: AstNode): ErrorNode;
/**
 * Factory function to create a FunctionNode.
 */
export declare function createFunctionNode(value: Closure, closureMeta?: ClosureMetadata | undefined, isMacro?: boolean, metadata?: AstNode): FunctionNode;
/**
 * Factory function to create a KeywordNode.
 */
export declare function createKeywordNode(value: string): KeywordNode;
/**
 * Factory function to create a List Node.
 */
export declare function createListNode(value: AstNode[], metadata?: AstNode): ListNode;
/**
 * Factory function to create a NilNode.
 */
export declare function createNilNode(value?: unknown): NilNode;
/**
 * Factory function to create a NumberNode.
 */
export declare function createNumberNode(value: number): NumberNode;
/**
 * Factory function to create a StringNode.
 */
export declare function createStringNode(value: string): StringNode;
/**
 * Factory function to create a SymbolNode.
 */
export declare function createSymbolNode(value: string): SymbolNode;
/**
 * Factory function to create a VectorNode.
 */
export declare function createVectorNode(value?: AstNode[], metadata?: AstNode): VectorNode;
/**
 * Factory function to create a JsNode.
 */
/**
 * Type guard to check if a node is an instance of DomNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of DomNode, else false.
 * @example isDomNode(myNode);
 */
export declare function isDomNode(node: unknown): node is DomNode;
/**
 * Type guard to check if a node is an instance of AstNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of AstNode, else false.
 * @example isAstNode(myNode);
 */
export declare function isAstNode(node: unknown): node is AstNode;
/**
 * Type guard to check if a node is an instance of AtomNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of AtomNode, else false.
 * @example isAtomNode(myNode);
 */
export declare function isAtomNode(node: unknown): node is AtomNode & {
    value: any;
};
/**
 * Type guard to check if a node is an instance of BooleanNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of BooleanNode, else false.
 * @example isBooleanNode(myNode);
 */
export declare function isBooleanNode(node: unknown): node is BooleanNode & {
    value: boolean;
};
/**
 * Type guard to check if a node is an instance of MapNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of MapNode, else false.
 * @example isMapNode(myNode);
 */
export declare function isMapNode(node: unknown): node is MapNode & {
    value: Map<string, AstNode>;
};
/**
 * // TODO: Convert value to string
 * Type guard to check if a node is an instance of ErrorNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of ErrorNode, else false.
 * @example isErrorNode(myNode);
 */
export declare function isErrorNode(node: unknown): node is ErrorNode & {
    value: AstNode;
};
/**
 * Type guard to check if a node is an instance of FunctionNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of FunctionNode, else false.
 * @example isFunctionNode(myNode);
 */
export declare function isFunctionNode(node: unknown): node is FunctionNode & {
    value: Closure;
};
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
/**
 * Type guard to check if a node is an instance of KeywordNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of KeywordNode, else false.
 * @example isKeywordNode(myNode);
 */
export declare function isKeywordNode(node: unknown): node is KeywordNode & {
    value: `${string}:`;
};
/**
 * Type guard to check if a node is an instance of ListNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of ListNode, else false.
 * @example isListNode(myNode);
 */
export declare function isListNode(node: unknown): node is ListNode & {
    value: AstNode[];
};
/**
 * Type guard to check if a node is an instance of NilNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of NilNode, else false.
 * @example isNilNode(myNode);
 */
export declare function isNilNode(node: unknown): node is NilNode & {
    value: null;
};
/**
 * Type guard to check if a node is an instance of NumberNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of NumberNode, else false.
 * @example isNumberNode(myNode);
 */
export declare function isNumberNode(node: unknown): node is NumberNode & {
    value: number;
};
/**
 * Type guard to check if a node is an instance of StringNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of StringNode, else false.
 * @example isStringNode(myNode);
 */
export declare function isStringNode(node: unknown): node is StringNode & {
    value: string;
};
/**
 * Type guard to check if a node is an instance of SymbolNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of SymbolNode, else false.
 * @example isSymbolNode(myNode);
 */
export declare function isSymbolNode(node: unknown): node is SymbolNode & {
    value: string;
};
/**
 * Type guard to check if a node is an instance of VectorNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of VectorNode, else false.
 * @example isVectorNode(myNode);
 */
export declare function isVectorNode(node: unknown): node is VectorNode;
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
/**
 * Checks if two objects have the same prototype.
 * @param object1 - The first object to compare.
 * @param object2 - The second object to compare.
 * @returns Whether the two objects share the same prototype.
 * @example isSameClass({ a: 1 }, { b: 2 }) // true
 */
export declare function isSameClass<T, U>(object1: T, object2: U): boolean;
/**
 * Asserts that two Ast objects are equal.
 * @param a - The first Ast object to compare.
 * @param b - The second Ast object to compare.
 * @throws If the objects are not equal.
 * @example assertEq(astNode1, astNode2) // no output if equal, error if not
 */
export declare function assertEq(a: AstNode, b: AstNode): void;
/**
 * Asserts that a value is defined (not undefined).
 * @param object - The value to check.
 * @throws If the value is undefined.
 * @example assertDefined(undefined) // throws error
 */
export declare function assertDefined<T>(object: unknown): asserts object is T;
/**
 * Asserts that a value is defined (not undefined).
 * @param object - The value to check.
 * @throws If the value is undefined.
 * @example assertDefined(undefined) // throws error
 */
export declare function assertUndefined<T>(object: unknown): asserts object is undefined;
/**
 * Asserts that a value is null or undefined.
 * @param object - The value to check.
 * @throws If the value is not null or undefined.
 * @example assertNullOrUndefined(42) // throws error
 */
export declare function assertNullOrUndefined<T>(object: unknown): asserts object is undefined;
/**
 * Checks if a value is defined (not undefined).
 * @param object - The value to check.
 * @returns Whether the value is defined.
 * @example isDefined(undefined) // false
 */
export declare function isDefined<T>(object: unknown): object is T;
/**
 * Asserts that a value is true.
 * @param object - The value to check.
 * @throws If the value is not true.
 * @example assertTrue(false) // throws error
 */
export declare function assertTrue(object: unknown): asserts object is true;
/**
 * Determine if an Ast is "truthy".
 * Num always returns true because it is always set. 0 is set.
 * @param a - The Ast to check.
 * @returns Boolean true if the Ast is "truthy".
 * @throws Will not throw an error.
 * @example isAstTruthy(astNode) // returns true if the Ast node is "truthy"
 */
export declare function isAstTruthy(a: AstNode, useJavaScriptTruthiness?: boolean): boolean;
/**
 * Determines if a value is either a List or a Vec.
 * @param value - The value to check.
 * @returns True if the value is a List or a Vec.
 * @throws Will not throw an error.
 * @example isSequential(listOrVector) // returns true if it is a list or a vector
 */
export declare function isSequentialNode(value: unknown): value is ListNode | VectorNode;
/**
 * Asserts that a value is either a List or a Vec.
 * @param value - The value to assert the type for.
 * @throws Throws an error if the value is not a List or a Vec.
 * @example assertSequential(listOrVec) // no output if valid, else error
 */
export declare function assertSequential<T extends ListNode | VectorNode>(value: unknown): asserts value is T;
/**
 * Asserts that a value can be used as a key in a dictionary.
 * @param value - The value to assert the key type for.
 * @throws Throws an error if the value cannot be used as a dictionary key.
 * @example assertDictKey(dictKeyCandidate) // no output if valid, error if not
 */
export declare function assertMapKeyNode<T extends MapKeyNode>(value: unknown): asserts value is T;
/**
 * Checks if a value is a valid dictionary key.
 * @param value - The value to be checked.
 * @returns True if the value can be used as a dictionary key, otherwise false.
 * @throws Will not throw an error.
 * @example isDictKey("myKey") // returns true
 */
export declare function isMapKeyNode(value: unknown): value is MapKeyNode;
/**
 * Asserts that a value is one of the metadata types: Func, List, Vec, Dict,
 * or DomNode.
 * @param value - The value to assert the type for.
 * @throws Throws an error if the value is not a valid metadata type.
 * @example assertMetadataType(myValue)
 */
export declare function assertMetadataType(value: unknown): asserts value is MetadataTypes;
/**
 * Asserts that the number of arguments provided matches the expected number.
 * @param actualCount - The number of arguments that were provided.
 * @param expectedCount - The number of arguments that were expected.
 * @throws Throws an error if the number of args doesn't match the expected no.
 * @example assertArgumentCount(3, 3)
 */
export declare function assertArgumentCount(actualCount: number, expectedCount: number, optionalMessage?: string): void;
/**
 * Asserts that the number of arguments provided is within the expected range.
 * @param actualCount - The number of arguments that were provided.
 * @param minExpectedCount - The minimum number of arguments that were expected.
 * @param maxExpectedCount - The maximum number of arguments that were expected.
 * @throws Throws an error if the no. Of arg is outside the expected range.
 * @example assertVariableArgumentCount(3, 1, 3)
 */
export declare function assertVariableArgumentCount(actualCount: number, minExpectedCount: number, maxExpectedCount: number): void;
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
export declare function assertMinimumArgumentCount(actualCount: number, minExpectedCount: number): void;
/**
 * Checks if the number of arguments is even.
 * @param maybeEven - The number of arguments to check.
 * @throws Thrown when the number of arguments is not even.
 * @example assertEvenArgumentCount(4); // No error thrown
 * @example assertEvenArgumentCount(3); // Error: Uneven number of arguments
 */
export declare function assertEvenArgumentCount(maybeEven: number): void;
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
export declare function assertSequentialValues<ReturnType extends AstNode>(sequentialValues: AstNode[], typeClass: TypeClass): asserts sequentialValues is ReturnType[];
export declare function assertIsOneOf<R extends AstNode>(astNode: AstNode, typeClasses: TypeClass[]): asserts astNode is R;
/**
 * Checks if all elements in the given `VectorNode` are instances of the specified `TypeClass`.
 *
 * @template R - The type of the elements in the `VectorNode`, extending `AstNode`.
 * @param {VectorNode<R>} sequentialValues - The vector containing elements to be checked.
 * @param {TypeClass} typeClass - The class type to check each element against.
 * @returns {boolean} - Returns `true` if all elements in the vector are instances of the specified `TypeClass`, otherwise `false`.
 */
export declare function isTypedVector<R extends AstNode = AstNode>(sequentialValues: VectorNode<R>, typeClass: TypeClass): sequentialValues is VectorNode<R>;
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
export declare function isEqualTo(a: AstNode, b: AstNode): BooleanNode;
/**
 * Checks if the first item in a list is a symbol. Optionally tests the value.
 * @param listNode - The list node to check.
 * @param symbolValue - The symbol to check against the first item in the list.
 * @returns True if the first item in the list matches the symbol, else false.
 * @example listStartsWithSymbol(listNode, "mySymbol");
 * @example listStartsWithSymbol(listNode);
 */
export declare function listStartsWithSymbol(listNode: AstNode, symbolValue?: string): listNode is ListNode & {
    value: [SymbolNode];
};
/**
 * Asserts that two values are equal.
 * @description Compares two values and throws an error if they are not equal.
 * @param actual - The actual value to check.
 * @param expected - The expected value to match against the actual value.
 * @throws Thrown when the actual value does not equal the expected value.
 * @example assertEqual("foo", "foo"); // No error thrown
 * @example assertEqual("foo", "bar"); // Error thrown: Unexpected value
 */
export declare function assertEqual<T = string>(actual: T, expected: T): void;
/**
 * Asserts that the actual value is greater than or equal to the expected value.
 * @description Checks if the actual value is greater than or equal to the
 * expected value and throws an error if it isn't.
 * @param actual - The value that is being tested.
 * @param expected - The value that we are comparing the actual value against.
 * @throws Error if the actual value is less than the expected value.
 * @example assertGreaterThanEqual(5, 3); // No error thrown
 */
export declare function assertGreaterThanEqual<T = string>(actual: T, expected: T): void;
/**
 * Asserts that a symbol has a specific value.
 * @description Checks if the symbol has the specified value and asserts the
 * type if it does.
 * @param sym - The symbol that is being tested.
 * @param value - The value that we expect the symbol to have.
 * @throws Error if the symbol's value doesn't match the expected value.
 * @example assertSymWithValue(mySym, "expectedValue");
 */
export declare function assertSymWithValue<Value extends SymbolValues>(sym: SymbolNode, value: Value): asserts sym is SymWithValue<Value>;
export type ContinueResult = {
    continue: {
        ast: AstNode;
        env: Env;
    };
    return: undefined;
};
export type ReturnResult = {
    return: AstNode;
    continue: undefined;
};
export type ContinueReturn = ContinueResult | ReturnResult;
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
export declare function continueResult(ast: AstNode, env: Env): ContinueResult;
/**
 * Creates a return result for the interpreter with the given AST.
 * @description Creates a result object representing the 'return' branch of
 * an interpreter execution, holding the AST that is the result of the
 * interpretation.
 * @param ast - The AST that is the result of the interpretation.
 * @returns Obj - An object representing a return result.
 * @example returnResult(astNode); // Get a return result object
 */
export declare function returnResult(ast: AstNode): ReturnResult;
/**
 * Prepends an AST node to an array of AST nodes.
 * @description Adds an AST node to the beginning of an array of AST nodes,
 * returning a new array.
 * @param acc - The accumulator array to which the AST node should be prepended.
 * @param curr - The AST node to prepend to the accumulator array.
 * @returns Arr - A new array with the AST node prepended.
 * @example prepend(accArray, astNode); // Prepend astNode to accArray
 */
export declare const prepend: (acc: AstNode[], curr: AstNode) => AstNode[];
/**
 * Appends an AST node to an array of AST nodes.
 * @description Adds an AST node to the end of an array of AST nodes,
 * returning a new array.
 * @param acc - The accumulator array to which the AST node should be appended.
 * @param curr - The AST node to append to the accumulator array.
 * @returns Arr - A new array with the AST node appended.
 * @example append(accArray, astNode); // Append astNode to accArray
 */
export declare const append: (acc: AstNode[], curr: AstNode) => AstNode[];
/**
 * Creates a deep copy of the given AST node.
 * @description Uses different copy functions based on the type of the AST
 * node to create a deep copy.
 * @param ast - The AST node to copy.
 * @returns Ast - A deep copy of the given AST node.
 * @throws Err - Throws an error if the AST node type is unrecognized.
 * @example copy(astNode); // Creates a deep copy of astNode
 */
export declare function copy(ast: AstNode): AstNode;
/**
 * Creates a copy of an Atom node.
 * @description Creates a new Atom node with a deep copy of the value of the
 * given Atom node.
 * @param a - The Atom node to copy.
 * @returns Atom - A new Atom node with a copied value.
 * @example copyAtom(atomNode); // Creates a copy of atomNode
 */
export declare function copyAtomNode(a: AtomNode): AtomNode;
/**
 * Creates a copy of a Bool node.
 * @description Creates a new Bool node with the same value as the given Bool
 * node.
 * @param a - The Bool node to copy.
 * @returns Bool - A new Bool node with the same value.
 * @example copyBool(boolNode); // Creates a copy of boolNode
 */
export declare function copyBooleanNode(a: BooleanNode): BooleanNode;
/**
 * Creates a copy of a Dict node.
 * @description Creates a new Dict node with a deep copy of the value and
 * metadata of the given Dict node.
 * @param a - The Dict node to copy.
 * @returns Dict - A new Dict node with copied values and metadata.
 * @example copyDict(dictNode); // Creates a copy of dictNode
 */
export declare function copyMapNode(a: MapNode): MapNode;
/**
 * Creates a copy of a DomNode.
 * @description Creates a createDomNode instance with a deep copy of the value
 * and metadata from the given DomNode instance.
 * @param a - The DomNode to copy.
 * @returns Dict - A createDomNode instance with copied values and metadata.
 * @example copyDomNode(domNodeInstance); // Creates a copy of domNodeInstance
 */
export declare function copyDomNode(a: DomNode): DomNode;
/**
 * Creates a copy of an Err node.
 * @description Creates a new Err node with a deep copy of the value from the
 * given Err node.
 * @param a - The Err node to copy.
 * @returns Err - A new Err node with a copied value.
 * @example copyErr(errNode); // Creates a copy of errNode
 */
export declare function copyErrorNode(a: ErrorNode): ErrorNode;
/**
 * Creates a copy of a Func node.
 * @description Creates a new Func node with copied values, including a deep
 * copy of metadata and, if present, a deep copy of the closureMeta attribute
 * from the given Func node.
 * @param a - The Func node to copy.
 * @returns Func - A new Func node with copied attributes.
 * @example copyFunc(funcNode); // Creates a copy of funcNode
 */
export declare function copyFunctionNode(a: FunctionNode): FunctionNode;
/**
 * Creates a copy of a Key node.
 * @description Creates a new Key node with the same value as the given Key
 * node.
 * @param a - The Key node to copy.
 * @returns Key - A new Key node with the same value.
 * @example copyKey(keyNode); // Creates a copy of keyNode
 */
export declare function copyKeywordNode(a: KeywordNode): KeywordNode;
/**
 * Creates a copy of a List node.
 * @description Creates a new List node with deep copies of the values and
 * metadata from the given List node.
 * @param a - The List node to copy.
 * @returns List - A new List node with copied values and metadata.
 * @example copyList(listNode); // Creates a copy of listNode
 */
export declare function copyListNode(a: ListNode): ListNode;
/**
 * Creates a copy of a Nil node.
 * @description Creates a new Nil node. Since Nil nodes do not hold any
 * information, this essentially returns a new Nil node.
 * @param _ast - The Nil node (not used, but required for function signature).
 * @returns Nil - A new Nil node.
 * @example copyNil(nilNode); // Creates a new Nil node
 */
export declare function copyNilNode(_ast: NilNode): NilNode;
/**
 * Creates a copy of a Num node.
 * @description Makes a new Num node with the same value as the given Num node.
 * @param a - The Num node to copy.
 * @returns Num - A new Num node with the same value.
 * @example copyNum(numNode); // Creates a copy of numNode
 */
export declare function copyNumberNode(a: NumberNode): NumberNode;
/**
 * Creates a copy of a Str node.
 * @description Creates a new Str node w/ the same value as the given Str node.
 * @param a - The Str node to copy.
 * @returns Str - A new Str node with the same value.
 * @example copyStr(strNode); // Creates a copy of strNode
 */
export declare function copyStringNode(a: StringNode): StringNode;
/**
 * Creates a copy of a Sym node.
 * @description Creates a new Sym node w/ the same value as the given Sym node.
 * @param a - The Sym node to copy.
 * @returns Sym - A new Sym node with the same value.
 * @example copySym(symNode); // Creates a copy of symNode
 */
export declare function copySymbolNode(a: SymbolNode): SymbolNode;
/**
 * Creates a copy of a Vec node.
 * @description Creates a new Vec node with deep copies of the values and
 * metadata from the given Vec node.
 * @param a - The Vec node to copy.
 * @returns Vec - A new Vec node with copied values and metadata.
 * @example copyVec(vecNode); // Creates a copy of vecNode
 */
export declare function copyVectorNode(a: VectorNode): VectorNode;
/**
 * Adds a new element with a specified DictKey and value to the Ast Map. If an
 * element with the same key already exists, the element will be updated.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @param value - Value for the given key.
 * @example mapSet(new Map(), makeStr('foo'), makeStr('bar'));
 */
export declare function setMapElement(map: Map<string, AstNode>, key: MapKeyNode, value: AstNode): void;
/**
 * Removes an element from the Ast Map with the corresponding DictKey.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @returns True if an element in the Ast Map existed and has been removed, or
 * false if the element does not exist.
 * @example mapDelete(new Map([['foo', makeStr('bar')]]));
 */
export declare function deleteMapElement(map: Map<string, AstNode>, key: MapKeyNode): void;
/**
 * Tests whether the Ast Map contains an element with the given DictKey.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @returns Boolean indicating whether an element with the specified key exists.
 * @example mapHas(myMap, makeSym('foobar'));
 */
export declare function hasMapElement(map: Map<string, AstNode>, key: MapKeyNode): boolean;
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
export declare function getMapElement(map: Map<string, AstNode>, key: MapKeyNode): AstNode | undefined;
/**
 * Get a List of DictKeys from the AstMap.
 * @param map - A JavaScript Map object.
 * @returns A List of DictKeys.
 * @example mapKeys(myMap);
 */
export declare function getMapKeys(map: Map<string, AstNode>): ListNode;
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
export declare function convertMapKeyToString(ast: MapKeyNode): string;
/**
 * Converts a MapKey (string) into a DictKey.
 * @param key - A string which can be converted into DictKeys.
 * @returns The converted dict key.
 * @example mapKeyToDictKey(':foobar') //=> Key {value: 'foobar:'}
 * @example mapKeyToDictKey('foobar:') //=> Key {value: 'foobar:'}
 */
export declare function convertStringToMapKey(key: string): MapKeyNode;
/**
 * Remove special characters from map keys.
 * @param key - A string or DictKey.
 * @returns Plain string.
 * @example getBareMapKey(':keyword'); //=> 'keyword'
 */
export declare function getBareMapKey(key: string | MapKeyNode): string;
/**
 * Gets a List of Asts in the AstMap.
 * @param map - An Ast Map.
 * @returns List of Ast's.
 * @example mapValues(myMap)
 */
export declare function getMapValues(map: Map<string, AstNode>): ListNode;
/**
 * Gets entries from the Ast Map, converts MapKeys to DictKeys,
 * and flattens the result.
 * @param map - An Ast Map.
 * @returns An array of DictKeys and Ast's.
 * @example mapFlat(myMap);
 */
export declare function mapFlat(map: Map<string, AstNode>): AstNode[];
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
export declare function splitAtFirstDot(filename: string): string[];
/**
 * Replace &, <, >, ", and ' with HTML entities.
 * @param unsafe - The string to escape.
 * @returns An escaped string.
 * @example htmlEncode('Bread & Butter'); //=> 'Bread &amp; Butter'
 */
export declare function htmlEncode(unsafe: string): string;
/**
 * Removes duplicate spaces and strips newlines.
 * @param string_ - The string to normalize.
 * @returns A single spaced string without newlines.
 * @example normalizeWhitespace('    str     '); //=> ' str '
 */
export declare function normalizeWhitespace(string_: string): string;
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
export declare function slash(string_: string): string;
export type AllReturnableJsTypes = {
    [key: string]: AllReturnableJsTypes;
} | ((...args: AllReturnableJsTypes[]) => AllReturnableJsTypes) | Array<AllReturnableJsTypes> | boolean | Error | null | number | string;
export declare function unwrap(ast: AstNode): unknown;
export declare function unwrapAtomNode(ast: AtomNode): unknown;
export declare function unwrapBooleanNode(ast: BooleanNode): boolean;
export declare function unwrapDomNode(ast: DomNode): string;
export declare function unwrapErrorNode(ast: ErrorNode): Error;
export declare function unwrapFunctionNode(ast: FunctionNode): (...args: AstNode[]) => AstNode;
export declare function unwrapKeywordNode(ast: KeywordNode): string;
export declare function unwrapListNode(ast: ListNode): unknown[];
export declare function unwrapMapNode(ast: MapNode): Record<string, unknown>;
export declare function unwrapNilNode(): null;
export declare function unwrapNumberNode(ast: NumberNode): number;
export declare function unwrapStringNode(ast: StringNode): string;
export declare function unwrapSymbolNode(ast: SymbolNode): string;
export declare function unwrapVectorNode(ast: VectorNode): unknown[];
/**
 * Translate JavaScript primitive values into Ast's.
 * @param jsValue - A JavaScript primitive to convert into an Ast.
 * @returns The JavaScript primitive converted to an Ast or Err.
 * @example toAst('foobar') //=> Str { value: 'foobar' }
 */
export declare function toAst(input: unknown): AstNode;
/**
 * Converts a given input into an `AstNode` of type `ErrorNode`.
 *
 * @param caughtError - The input to convert, which can be a string, an Error, or an AstNode.
 * @returns An `AstNode` of type `ErrorNode`.
 */
export declare function toErrorNode(caughtError: unknown): AstNode;
export {};
