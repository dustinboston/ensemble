/**
 * @file Defines types and helper functions.
 */

// TODO: Move assertions functions for Ensemble *forms* into ensemble.ts

import type { Env } from "./env.ts";

// MARK: TYPES
// =============================================================================

/**
 * All of the possible types that an AstNode can be.
 */
export type AstNode =
	| AtomNode
	| BooleanNode
	| DomNode
	| ErrorNode
	| FunctionNode
	// | JsNode<SupportedJsTypes>
	| KeywordNode
	| ListNode
	| MapNode
	| NilNode
	| NumberNode
	| StringNode
	| SymbolNode
	| VectorNode;

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
// type SupportedJsTypes<U extends object = object, V extends unknown = unknown> =
//   | bigint
//   | Date
//   | RegExp
//   | Set<U>
//   | WeakMap<U, V>
//   | WeakSet<U>
//   | ArrayBuffer
//   | SharedArrayBuffer
//   | DataView
//   | Int8Array
//   | Uint8Array
//   | Uint8ClampedArray
//   | Int16Array
//   | Uint16Array
//   | Int32Array
//   | Uint32Array
//   | Float32Array
//   | Float64Array
//   | BigInt64Array
//   | BigUint64Array
//   | BigUint64Array;

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
export type MetadataTypes =
	| FunctionNode
	| ListNode
	| VectorNode
	| MapNode
	| DomNode;

/**
 * Names of builtin Ensemble functions
 */
type SymbolValues =
	| "def!"
	| "let*"
	| "quote"
	| "quasiquoteexpand"
	| "quasiquote"
	| "defmacro!"
	| "macroexpand"
	| "do"
	| "if"
	| "fn*"
	| "try*"
	| "catch*"
	| "default"
	// JS interop
	| "globalThis"
	| "var"
	| "let"
	| "const"
	| "function"
	| "=>"
	| "try"
	| "catch";

/**
 * Defines a symbol that identifies a builtin Ensemble function with a specific value.
 */
export type SymWithValue<Value extends SymbolValues> = SymbolNode & {
	value: Value;
};

/**
 * Defines the possible types for typed vectors.
 */
type TypeClass =
	| typeof AtomNode
	| typeof BooleanNode
	| typeof DomNode
	| typeof ErrorNode
	| typeof FunctionNode
	// | typeof JsNode
	| typeof KeywordNode
	| typeof ListNode
	| typeof MapNode
	| typeof NilNode
	| typeof NumberNode
	| typeof StringNode
	| typeof SymbolNode
	| typeof VectorNode;

// MARK: CLASSES
// ============================================================================

/**
 * AtomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class AtomNode {
	kind = "AtomNode";
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(public value: any) {}
}

/**
 * BooleanNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class BooleanNode {
	kind = "BooleanNode";
	constructor(public value: boolean) {}
}

/**
 * DomNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class DomNode {
	kind = "DomNode";
	// domNode: HTMLElement | null = null;
	constructor(
		public value: string, // The tag name
		public attributes: Map<string, AstNode> = new Map<string, AstNode>(), // TODO: Change to MapNode
		public children: AstNode[] = [],
		public metadata?: AstNode, // WAS = createNilNode(),
	) {
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

type ErrorTypes =
	| "Error"
	| "AggregateError"
	| "RangeError"
	| "ReferenceError"
	| "SyntaxError"
	| "TypeError"
	| "URIError";

const errorTypes = [
	"Error",
	"AggregateError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError",
];

export type NameStringNode = StringNode & {
	value: ErrorTypes;
};

/**
 * ErrorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class ErrorNode {
	kind = "ErrorNode";
	name: StringNode = createStringNode("Error");
	cause?: AstNode;

	static isErrorName(name: StringNode): name is NameStringNode {
		const value = name.value;
		return errorTypes.includes(value as ErrorTypes);
	}

	static assertErrorName(name: StringNode): asserts name is NameStringNode {
		if (!ErrorNode.isErrorName(name)) {
			throw new TypeError(
				"Error type must be 'Error', 'AggregateError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', or 'URIError'.",
			);
		}
	}

	/**
	 * @param value - message
	 */
	constructor(
		public value: AstNode,
		name?: NameStringNode,
		cause: AstNode = createNilNode(),
	) {
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
	kind = "FunctionNode";
	constructor(
		public value: Closure,
		public closureMeta?: ClosureMetadata,
		public isMacro = false,
		public metadata?: AstNode, // WAS = createNilNode(),
	) {}
}

/**
 * KeywordNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class KeywordNode {
	kind = "KeywordNode";
	constructor(private _value: string) {
		this._value = _value.replaceAll(":", "");
	}

	public get value() {
		return `${this._value}:`;
	}

	public set value(keyword: string) {
		this._value = `${keyword.replaceAll(":", "")}:`;
	}

	public get bare() {
		return this._value;
	}
}

/**
 * List class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class ListNode {
	kind = "ListNode";
	constructor(
		public value: AstNode[],
		public metadata?: AstNode, // WAS = createNilNode()
	) {}
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
	kind = "MapNode";
	constructor(
		public value: Map<string, AstNode> = new Map<string, AstNode>(),
		public metadata?: AstNode, // WAS = createNilNode()
	) {}
}

/**
 * NilNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class NilNode {
	kind = "NilNode";
	constructor(public value: unknown = null) {}
}

/**
 * NumberNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class NumberNode {
	kind = "NumberNode";
	// TODO: Add support for BigInt, e.g. value: number | bigint and handle internally
	constructor(public value: number) {}
}

/**
 * SymbolNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class SymbolNode {
	kind = "SymbolNode";
	constructor(public value: string) {}
}

/**
 * StringNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class StringNode {
	kind = "StringNode";
	constructor(public value: string) {}
}

/**
 * VectorNode class
 * A data class which represents a part of the AST.
 * @param value - The data that this class represents.
 */
export class VectorNode<T extends AstNode = AstNode> {
	kind = "VectorNode";
	constructor(
		public value: T[],
		public metadata?: AstNode, // WAS = createNilNode()
	) {}
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
export function assertDomNode(
	node: unknown,
): asserts node is DomNode & { value: string } {
	if (!isDomNode(node)) {
		throw new TypeError("Invalid DomNode");
	}
}

/**
 * Assert that a node is an instance of AstNode.
 * @param node - The node to check.
 * @returns If the node is an instance of AstNode.
 * @throws If the node is NOT an instance of AstNode.
 * @example assertAstNode(myNode);
 */
export function assertAstNode(
	node: unknown,
): asserts node is AstNode & { value: AstNode } {
	if (!isAstNode(node)) {
		throw new TypeError("Invalid AstNode");
	}
}

/**
 * Assert that a node is an instance of AtomNode.
 * @param node - The node to check.
 * @returns If the node is an instance of AtomNode.
 * @throws If the node is NOT an instance of AtomNode.
 * @example assertAtomNode(myNode);
 */
export function assertAtomNode(node: unknown): asserts node is AtomNode {
	if (!isAtomNode(node)) {
		throw new TypeError("Invalid AtomNode");
	}
}

/**
 * Assert that a node is an instance of BooleanNode.
 * @param node - The node to check.
 * @returns If the node is an instance of BooleanNode.
 * @throws If the node is NOT an instance of BooleanNode.
 * @example assertBooleanNode(myNode);
 */
export function assertBooleanNode(
	node: unknown,
): asserts node is BooleanNode & { value: boolean } {
	if (!isBooleanNode(node)) {
		throw new TypeError("Invalid BooleanNode");
	}
}

/**
 * Assert that a node is an instance of MapNode.
 * @param node - The node to check.
 * @returns If the node is an instance of MapNode.
 * @throws If the node is NOT an instance of MapNode.
 * @example assertMapNode(myNode);
 */
export function assertMapNode(
	node: unknown,
): asserts node is MapNode & { value: Map<string, AstNode> } {
	if (!isMapNode(node)) {
		throw new TypeError("Invalid MapNode");
	}
}

/**
 * Assert that a node is an instance of ErrorNode.
 * @param node - The node to check.
 * @returns If the node is an instance of ErrorNode.
 * @throws If the node is NOT an instance of ErrorNode.
 * @example assertErrorNode(myNode);
 */
export function assertErrorNode(
	node: unknown,
): asserts node is ErrorNode & { value: AstNode } {
	if (!isErrorNode(node)) {
		throw new TypeError("Invalid ErrorNode");
	}
}

/**
 * Assert that a node is an instance of FunctionNode.
 * @param node - The node to check.
 * @returns If the node is an instance of FunctionNode.
 * @throws If the node is NOT an instance of FunctionNode.
 * @example assertFunctionNode(myNode);
 */
export function assertFunctionNode(
	node: unknown,
): asserts node is FunctionNode & { value: Closure } {
	if (!isFunctionNode(node)) {
		throw new TypeError("Invalid FunctionNode");
	}
}

/**
 * Assert that a node is an instance of KeywordNode.
 * @param node - The node to check.
 * @returns If the node is an instance of KeywordNode.
 * @throws If the node is NOT an instance of KeywordNode.
 * @example assertKeywordNode(myNode);
 */
export function assertKeywordNode(
	node: unknown,
): asserts node is KeywordNode & { value: `${string}:` } {
	if (!isKeywordNode(node)) {
		throw new TypeError("Invalid KeywordNode");
	}
}

/**
 * Assert that a node is an instance of ListNode.
 * @param node - The node to check.
 * @returns If the node is an instance of ListNode.
 * @throws If the node is NOT an instance of ListNode.
 * @example assertListNode(myNode);
 */
export function assertListNode(
	node: unknown,
): asserts node is ListNode & { value: AstNode[] } {
	if (!isListNode(node)) {
		throw new TypeError("Invalid ListNode");
	}
}

/**
 * Assert that a node is an instance of NilNode.
 * @param node - The node to check.
 * @returns If the node is an instance of NilNode.
 * @throws If the node is NOT an instance of NilNode.
 * @example assertNilNode(myNode);
 */
export function assertNilNode(
	node: unknown,
): asserts node is NilNode & { value: null } {
	if (!isNilNode(node)) {
		throw new TypeError("Invalid NilNode");
	}
}

/**
 * Assert that a node is an instance of NumberNode.
 * @param node - The node to check.
 * @returns If the node is an instance of NumberNode.
 * @throws If the node is NOT an instance of NumberNode.
 * @example assertNumberNode(myNode);
 */
export function assertNumberNode(
	node: unknown,
): asserts node is NumberNode & { value: number } {
	if (!isNumberNode(node)) {
		throw new TypeError("Invalid NumberNode");
	}
}

/**
 * Assert that a node is an instance of StringNode.
 * @param node - The node to check.
 * @returns If the node is an instance of StringNode.
 * @throws If the node is NOT an instance of StringNode.
 * @example assertStringNode(myNode);
 */
export function assertStringNode(
	node: unknown,
): asserts node is StringNode & { value: string } {
	if (!isStringNode(node)) {
		throw new TypeError("Invalid StringNode");
	}
}

/**
 * Assert that a node is an instance of SymbolNode.
 * @param node - The node to check.
 * @returns If the node is an instance of SymbolNode.
 * @throws If the node is NOT an instance of SymbolNode.
 * @example assertSymbolNode(myNode);
 */
export function assertSymbolNode(
	node: unknown,
): asserts node is SymbolNode & { value: string } {
	if (!isSymbolNode(node)) {
		throw new TypeError("Invalid SymbolNode");
	}
}

/**
 * Assert that a node is an instance of VectorNode.
 * @param node - The node to check.
 * @returns undefined If the node is an instance of VectorNode.
 * @throws If the node is NOT an instance of VectorNode.
 * @example assertVectorNode(myNode);
 */
export function assertVectorNode(
	node: unknown,
): asserts node is VectorNode & { value: AstNode[] } {
	if (!isVectorNode(node)) {
		throw new TypeError("Invalid VectorNode");
	}
}

export function assertRegExp(value: unknown): asserts value is RegExp {
	if (!(value instanceof RegExp)) {
		throw new Error("Expected a RegExp object.");
	}
}

export function assertSymbol(value: unknown): asserts value is symbol {
	if (typeof value !== "symbol") {
		throw new Error("Expected a Symbol object.");
	}
}

// MARK: FACTORY FNS
// =============================================================================

/**
 * Factory function to create a DomNode.
 */
export function createDomNode(
	value: string,
	attributes?: Map<string, AstNode>,
	children?: AstNode[],
	metadata?: AstNode,
): DomNode {
	return new DomNode(value, attributes, children, metadata);
}

/**
 * Factory function to create an AtomNode.
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function createAtomNode(value: any): AtomNode {
	return new AtomNode(value);
}

/**
 * Factory function to create a BooleanNode.
 */
export function createBooleanNode(value: boolean): BooleanNode {
	return new BooleanNode(value);
}

/**
 * Factory function to create a MapNode.
 */
export function createMapNode(
	value?: Map<string, AstNode>,
	metadata?: AstNode,
): MapNode {
	return new MapNode(value, metadata);
}

/**
 * Factory function to create a ErrorNode.
 */
export function createErrorNode(
	value: AstNode,
	type?: NameStringNode,
	cause?: AstNode,
): ErrorNode {
	assertAstNode(value);
	return new ErrorNode(value, type, cause);
}

/**
 * Factory function to create a FunctionNode.
 */
export function createFunctionNode(
	value: Closure,
	closureMeta?: ClosureMetadata | undefined,
	isMacro?: boolean,
	metadata?: AstNode,
): FunctionNode {
	return new FunctionNode(value, closureMeta, isMacro, metadata);
}

/**
 * Factory function to create a KeywordNode.
 */
export function createKeywordNode(value: string): KeywordNode {
	return new KeywordNode(value);
}

/**
 * Factory function to create a List Node.
 */
export function createListNode(value: AstNode[], metadata?: AstNode): ListNode {
	return new ListNode(value, metadata);
}

/**
 * Factory function to create a NilNode.
 */
export function createNilNode(value?: unknown): NilNode {
	return new NilNode(value);
}

/**
 * Factory function to create a NumberNode.
 */
export function createNumberNode(value: number): NumberNode {
	return new NumberNode(value);
}

/**
 * Factory function to create a StringNode.
 */
export function createStringNode(value: string): StringNode {
	return new StringNode(value);
}

/**
 * Factory function to create a SymbolNode.
 */
export function createSymbolNode(value: string): SymbolNode {
	return new SymbolNode(value);
}

/**
 * Factory function to create a VectorNode.
 */
export function createVectorNode(
	value: AstNode[] = [],
	metadata?: AstNode,
): VectorNode {
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
export function isDomNode(node: unknown): node is DomNode {
	return node instanceof DomNode;
}

/**
 * Type guard to check if a node is an instance of AstNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of AstNode, else false.
 * @example isAstNode(myNode);
 */
export function isAstNode(node: unknown): node is AstNode {
	return (
		isAtomNode(node) ||
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
		isVectorNode(node)
	);
}

/**
 * Type guard to check if a node is an instance of AtomNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of AtomNode, else false.
 * @example isAtomNode(myNode);
 */
export function isAtomNode(
	node: unknown,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): node is AtomNode & { value: any } {
	return node instanceof AtomNode;
}

/**
 * Type guard to check if a node is an instance of BooleanNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of BooleanNode, else false.
 * @example isBooleanNode(myNode);
 */
export function isBooleanNode(
	node: unknown,
): node is BooleanNode & { value: boolean } {
	return node instanceof BooleanNode && typeof node.value === "boolean";
}

/**
 * Type guard to check if a node is an instance of MapNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of MapNode, else false.
 * @example isMapNode(myNode);
 */
export function isMapNode(
	node: unknown,
): node is MapNode & { value: Map<string, AstNode> } {
	return node instanceof MapNode && node.value instanceof Map;
}

/**
 * // TODO: Convert value to string
 * Type guard to check if a node is an instance of ErrorNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of ErrorNode, else false.
 * @example isErrorNode(myNode);
 */
export function isErrorNode(
	node: unknown,
): node is ErrorNode & { value: AstNode } {
	return node instanceof ErrorNode && isAstNode(node.value);
}

/**
 * Type guard to check if a node is an instance of FunctionNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of FunctionNode, else false.
 * @example isFunctionNode(myNode);
 */
export function isFunctionNode(
	node: unknown,
): node is FunctionNode & { value: Closure } {
	return node instanceof FunctionNode && typeof node.value === "function";
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
export function isKeywordNode(
	node: unknown,
): node is KeywordNode & { value: `${string}:` } {
	return (
		node instanceof KeywordNode &&
		typeof node.value === "string" &&
		node.value.endsWith(":")
	);
}

/**
 * Type guard to check if a node is an instance of ListNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of ListNode, else false.
 * @example isListNode(myNode);
 */
export function isListNode(
	node: unknown,
): node is ListNode & { value: AstNode[] } {
	return node instanceof ListNode && node.value.every(isAstNode);
}

/**
 * Type guard to check if a node is an instance of NilNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of NilNode, else false.
 * @example isNilNode(myNode);
 */
export function isNilNode(node: unknown): node is NilNode & { value: null } {
	return node instanceof NilNode && node.value === null;
}

/**
 * Type guard to check if a node is an instance of NumberNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of NumberNode, else false.
 * @example isNumberNode(myNode);
 */
export function isNumberNode(
	node: unknown,
): node is NumberNode & { value: number } {
	return node instanceof NumberNode && typeof node.value === "number";
}

/**
 * Type guard to check if a node is an instance of StringNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of StringNode, else false.
 * @example isStringNode(myNode);
 */
export function isStringNode(
	node: unknown,
): node is StringNode & { value: string } {
	return node instanceof StringNode && typeof node.value === "string";
}

/**
 * Type guard to check if a node is an instance of SymbolNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of SymbolNode, else false.
 * @example isSymbolNode(myNode);
 */
export function isSymbolNode(
	node: unknown,
): node is SymbolNode & { value: string } {
	return node instanceof SymbolNode && typeof node.value === "string";
}

/**
 * Type guard to check if a node is an instance of VectorNode.
 * @param node - The node to check.
 * @returns True if the node is an instance of VectorNode, else false.
 * @example isVectorNode(myNode);
 */
export function isVectorNode(node: unknown): node is VectorNode {
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
export function isSameClass<T, U>(object1: T, object2: U): boolean {
	return Object.getPrototypeOf(object1) === Object.getPrototypeOf(object2);
}

/**
 * Asserts that two Ast objects are equal.
 * @param a - The first Ast object to compare.
 * @param b - The second Ast object to compare.
 * @throws If the objects are not equal.
 * @example assertEq(astNode1, astNode2) // no output if equal, error if not
 */
export function assertEq(a: AstNode, b: AstNode): void {
	if (!isEqualTo(a, b)) {
		throw new Error("Values are not equal");
	}
}

/**
 * Asserts that a value is defined (not undefined).
 * @param object - The value to check.
 * @throws If the value is undefined.
 * @example assertDefined(undefined) // throws error
 */
export function assertDefined<T>(object: unknown): asserts object is T {
	if (object === undefined) {
		throw new Error("Value is undefined");
	}
}

/**
 * Asserts that a value is defined (not undefined).
 * @param object - The value to check.
 * @throws If the value is undefined.
 * @example assertDefined(undefined) // throws error
 */
export function assertUndefined<T>(
	object: unknown,
): asserts object is undefined {
	if (object !== undefined) {
		throw new Error("Value is not undefined");
	}
}

/**
 * Asserts that a value is null or undefined.
 * @param object - The value to check.
 * @throws If the value is not null or undefined.
 * @example assertNullOrUndefined(42) // throws error
 */
export function assertNullOrUndefined<T>(
	object: unknown,
): asserts object is undefined {
	if (object !== undefined && object !== null) {
		throw new Error("Value is not null or undefined");
	}
}

/**
 * Checks if a value is defined (not undefined).
 * @param object - The value to check.
 * @returns Whether the value is defined.
 * @example isDefined(undefined) // false
 */
export function isDefined<T>(object: unknown): object is T {
	return object !== undefined;
}

/**
 * Asserts that a value is true.
 * @param object - The value to check.
 * @throws If the value is not true.
 * @example assertTrue(false) // throws error
 */
export function assertTrue(object: unknown): asserts object is true {
	if (object === false) {
		throw new Error("Value is not true");
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
export function isAstTruthy(
	a: AstNode,
	useJavaScriptTruthiness = false,
): boolean {
	if (isBooleanNode(a)) {
		return a.value;
	}

	const atom = a;
	if (isAtomNode(atom)) {
		return isAstNode(atom.value)
			? isAstTruthy(atom.value)
			: Boolean(atom.value);
	}

	const nilAst = a;
	if (isNilNode(nilAst)) {
		return false;
	}

	if (isNumberNode(a)) {
		if (useJavaScriptTruthiness) {
			return Boolean(a.value);
		}
		return true;
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
export function isSequentialNode(
	value: unknown,
): value is ListNode | VectorNode {
	return isListNode(value) || isVectorNode(value);
}

/**
 * Asserts that a value is either a List or a Vec.
 * @param value - The value to assert the type for.
 * @throws Throws an error if the value is not a List or a Vec.
 * @example assertSequential(listOrVec) // no output if valid, else error
 */
export function assertSequential<T extends ListNode | VectorNode>(
	value: unknown,
): asserts value is T {
	if (!isListNode(value) && !isVectorNode(value)) {
		throw new TypeError("Invalid sequential type");
	}
}

/**
 * Asserts that a value can be used as a key in a dictionary.
 * @param value - The value to assert the key type for.
 * @throws Throws an error if the value cannot be used as a dictionary key.
 * @example assertDictKey(dictKeyCandidate) // no output if valid, error if not
 */
export function assertMapKeyNode<T extends MapKeyNode>(
	value: unknown,
): asserts value is T {
	if (!(isStringNode(value) || isSymbolNode(value) || isKeywordNode(value))) {
		throw new TypeError("Invalid dictionary key");
	}
}

/**
 * Checks if a value is a valid dictionary key.
 * @param value - The value to be checked.
 * @returns True if the value can be used as a dictionary key, otherwise false.
 * @throws Will not throw an error.
 * @example isDictKey("myKey") // returns true
 */
export function isMapKeyNode(value: unknown): value is MapKeyNode {
	return isStringNode(value) || isSymbolNode(value) || isKeywordNode(value);
}

/**
 * Asserts that a value is one of the metadata types: Func, List, Vec, Dict,
 * or DomNode.
 * @param value - The value to assert the type for.
 * @throws Throws an error if the value is not a valid metadata type.
 * @example assertMetadataType(myValue)
 */
export function assertMetadataType(
	value: unknown,
): asserts value is MetadataTypes {
	if (
		!isFunctionNode(value) &&
		!isListNode(value) &&
		!isVectorNode(value) &&
		!isMapNode(value) &&
		!isDomNode(value)
	) {
		throw new TypeError("Invalid metadata type");
	}
}

/**
 * Asserts that the number of arguments provided matches the expected number.
 * @param actualCount - The number of arguments that were provided.
 * @param expectedCount - The number of arguments that were expected.
 * @throws Throws an error if the number of args doesn't match the expected no.
 * @example assertArgumentCount(3, 3)
 */
export function assertArgumentCount(
	actualCount: number,
	expectedCount: number,
	optionalMessage?: string,
): void {
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
export function assertVariableArgumentCount(
	actualCount: number,
	minExpectedCount: number,
	maxExpectedCount: number,
): void {
	if (actualCount < minExpectedCount || actualCount > maxExpectedCount) {
		throw new Error("Unexpected number of arguments");
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
export function assertMinimumArgumentCount(
	actualCount: number,
	minExpectedCount: number,
): void {
	if (actualCount < minExpectedCount) {
		throw new Error("Unexpected minimum number of arguments");
	}
}

/**
 * Checks if the number of arguments is even.
 * @param maybeEven - The number of arguments to check.
 * @throws Thrown when the number of arguments is not even.
 * @example assertEvenArgumentCount(4); // No error thrown
 * @example assertEvenArgumentCount(3); // Error: Uneven number of arguments
 */
export function assertEvenArgumentCount(maybeEven: number): void {
	if (maybeEven % 2 !== 0) {
		throw new Error("Uneven number of arguments");
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
export function assertSequentialValues<ReturnType extends AstNode>(
	sequentialValues: AstNode[],
	typeClass: TypeClass,
): asserts sequentialValues is ReturnType[] {
	for (const p of sequentialValues) {
		if (!(p instanceof typeClass)) {
			throw new TypeError("All values must be of the same type");
		}
	}
}

export function assertIsOneOf<R extends AstNode>(
	astNode: AstNode,
	typeClasses: TypeClass[],
): asserts astNode is R {
	if (!typeClasses.some((typeClass) => astNode instanceof typeClass)) {
		throw new TypeError("Invalid type");
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
export function isTypedVector<R extends AstNode = AstNode>(
	sequentialValues: VectorNode<R>,
	typeClass: TypeClass,
): sequentialValues is VectorNode<R> {
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
export function isEqualTo(a: AstNode, b: AstNode): BooleanNode {
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
export function listStartsWithSymbol(
	listNode: AstNode,
	symbolValue?: string,
): listNode is ListNode & { value: [SymbolNode] } {
	const isListWithSymbol =
		isListNode(listNode) && isSymbolNode(listNode.value[0]);

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
export function assertEqual<T = string>(actual: T, expected: T): void {
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
export function assertGreaterThanEqual<T = string>(
	actual: T,
	expected: T,
): void {
	if (actual >= expected) {
		throw new Error("Unexpected value");
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
export function assertSymWithValue<Value extends SymbolValues>(
	sym: SymbolNode,
	value: Value,
): asserts sym is SymWithValue<Value> {
	assertEqual(sym.value, value);
}

export type ContinueResult = {
	continue: { ast: AstNode; env: Env };
	return: undefined;
};
export type ReturnResult = { return: AstNode; continue: undefined };
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
export function continueResult(ast: AstNode, env: Env): ContinueResult {
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
export function returnResult(ast: AstNode): ReturnResult {
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
export const prepend = (acc: AstNode[], curr: AstNode): AstNode[] => [
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
export const append = (acc: AstNode[], curr: AstNode): AstNode[] => [
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
export function copy(ast: AstNode): AstNode {
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

	throw new Error("Unmatched object");
}

/**
 * Creates a copy of an Atom node.
 * @description Creates a new Atom node with a deep copy of the value of the
 * given Atom node.
 * @param a - The Atom node to copy.
 * @returns Atom - A new Atom node with a copied value.
 * @example copyAtom(atomNode); // Creates a copy of atomNode
 */
export function copyAtomNode(a: AtomNode): AtomNode {
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
export function copyBooleanNode(a: BooleanNode): BooleanNode {
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
export function copyMapNode(a: MapNode): MapNode {
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
export function copyDomNode(a: DomNode): DomNode {
	const tagName = a.value;
	const attributes = a.attributes;
	const children = a.children;

	const domNode = createDomNode(
		tagName,
		new Map(attributes),
		children.map(copy),
	);
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
export function copyErrorNode(a: ErrorNode): ErrorNode {
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
export function copyFunctionNode(a: FunctionNode): FunctionNode {
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
export function copyKeywordNode(a: KeywordNode): KeywordNode {
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
export function copyListNode(a: ListNode): ListNode {
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
export function copyNilNode(_ast: NilNode): NilNode {
	return createNilNode();
}

/**
 * Creates a copy of a Num node.
 * @description Makes a new Num node with the same value as the given Num node.
 * @param a - The Num node to copy.
 * @returns Num - A new Num node with the same value.
 * @example copyNum(numNode); // Creates a copy of numNode
 */
export function copyNumberNode(a: NumberNode): NumberNode {
	return createNumberNode(a.value);
}

/**
 * Creates a copy of a Str node.
 * @description Creates a new Str node w/ the same value as the given Str node.
 * @param a - The Str node to copy.
 * @returns Str - A new Str node with the same value.
 * @example copyStr(strNode); // Creates a copy of strNode
 */
export function copyStringNode(a: StringNode): StringNode {
	return createStringNode(a.value);
}

/**
 * Creates a copy of a Sym node.
 * @description Creates a new Sym node w/ the same value as the given Sym node.
 * @param a - The Sym node to copy.
 * @returns Sym - A new Sym node with the same value.
 * @example copySym(symNode); // Creates a copy of symNode
 */
export function copySymbolNode(a: SymbolNode): SymbolNode {
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
export function copyVectorNode(a: VectorNode): VectorNode {
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
export function setMapElement(
	map: Map<string, AstNode>,
	key: MapKeyNode,
	value: AstNode,
): void {
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
export function deleteMapElement(
	map: Map<string, AstNode>,
	key: MapKeyNode,
): void {
	map.delete(convertMapKeyToString(key));
}

/**
 * Tests whether the Ast Map contains an element with the given DictKey.
 * @param map - A JavaScript Map object.
 * @param key - A DictKey, e.g. "string", :key, symbol.
 * @returns Boolean indicating whether an element with the specified key exists.
 * @example mapHas(myMap, makeSym('foobar'));
 */
export function hasMapElement(
	map: Map<string, AstNode>,
	key: MapKeyNode,
): boolean {
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
export function getMapElement(
	map: Map<string, AstNode>,
	key: MapKeyNode,
): AstNode | undefined {
	return map.get(convertMapKeyToString(key));
}

/**
 * Get a List of DictKeys from the AstMap.
 * @param map - A JavaScript Map object.
 * @returns A List of DictKeys.
 * @example mapKeys(myMap);
 */
export function getMapKeys(map: Map<string, AstNode>): ListNode {
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
export function convertMapKeyToString(ast: MapKeyNode): string {
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
export function convertStringToMapKey(key: string): MapKeyNode {
	if (key.endsWith(":")) {
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
export function getBareMapKey(key: string | MapKeyNode): string {
	const value = isMapKeyNode(key) ? key.value : key;

	if (value.startsWith(":") || value.endsWith(":")) {
		return value.replaceAll(":", "");
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
export function getMapValues(map: Map<string, AstNode>): ListNode {
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
export function mapFlat(map: Map<string, AstNode>): AstNode[] {
	const flat: AstNode[] = [];
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
export function splitAtFirstDot(filename: string): string[] {
	const firstDotIndex = filename.indexOf(".");
	return [filename.slice(0, firstDotIndex), filename.slice(firstDotIndex + 1)];
}

/**
 * Replace &, <, >, ", and ' with HTML entities.
 * @param unsafe - The string to escape.
 * @returns An escaped string.
 * @example htmlEncode('Bread & Butter'); //=> 'Bread &amp; Butter'
 */
export function htmlEncode(unsafe: string): string {
	return unsafe
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

/**
 * Removes duplicate spaces and strips newlines.
 * @param string_ - The string to normalize.
 * @returns A single spaced string without newlines.
 * @example normalizeWhitespace('    str     '); //=> ' str '
 */
export function normalizeWhitespace(string_: string): string {
	return string_.replaceAll("\n", " ").replaceAll(/\s{2,}/g, " ");
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
export function slash(string_: string): string {
	return string_
		.replaceAll("\\", "\\\\")
		.replaceAll('"', '\\"')
		.replaceAll("\n", "\\n");
}

// MARK: CONVERSION FNS

export type AllReturnableJsTypes =
	| { [key: string]: AllReturnableJsTypes }
	| ((...args: AllReturnableJsTypes[]) => AllReturnableJsTypes)
	| Array<AllReturnableJsTypes>
	| boolean
	| Error
	| null
	| number
	| string;

export function unwrap(ast: AstNode) {
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

	throw new Error("Could not unwrap object.");
}

export function unwrapAtomNode(ast: AtomNode): unknown {
	return unwrap(ast.value);
}

export function unwrapBooleanNode(ast: BooleanNode): boolean {
	return ast.value;
}

export function unwrapDomNode(ast: DomNode): string {
	// HTMLElement | null
	// return ast.domNode;
	return ast.value;
}

export function unwrapErrorNode(ast: ErrorNode): Error {
	const message = isStringNode(ast.value)
		? ast.value.value
		: String(unwrap(ast.value));
	return new Error(message);
}

export function unwrapFunctionNode(
	ast: FunctionNode,
): (...args: AstNode[]) => AstNode {
	return (...args: AstNode[]) => toAst(unwrap(ast.value(...args)));
}

export function unwrapKeywordNode(ast: KeywordNode): string {
	return ast.value;
}

export function unwrapListNode(ast: ListNode): unknown[] {
	return ast.value.map(unwrap);
}

export function unwrapMapNode(ast: MapNode): Record<string, unknown> {
	const plainObject: Record<string, unknown> = {};
	for (const [key, value] of ast.value.entries()) {
		plainObject[key] = unwrap(value);
	}

	return plainObject;
}

export function unwrapNilNode(): null {
	return null;
}

export function unwrapNumberNode(ast: NumberNode): number {
	return ast.value;
}

export function unwrapStringNode(ast: StringNode): string {
	return ast.value;
}

export function unwrapSymbolNode(ast: SymbolNode): string {
	return ast.value;
}

export function unwrapVectorNode(ast: VectorNode): unknown[] {
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
export function toAst(input: unknown): AstNode {
	if (isAstNode(input)) {
		return input;
	}

	switch (typeof input) {
		case "undefined": {
			return createNilNode();
		}

		case "number": {
			return createNumberNode(input);
		}

		case "string": {
			if (input.startsWith('"')) {
				return createStringNode(input);
			}

			if (input.startsWith(":")) {
				return createKeywordNode(input);
			}

			return createSymbolNode(input);
		}

		case "boolean": {
			return createBooleanNode(input);
		}

		case "symbol": {
			return createStringNode(JSON.stringify(input));
		}

		case "function": {
			return createFunctionNode((...args: AstNode[]): AstNode => {
				try {
					return toAst(input(...args.map((x) => x.value)));
				} catch (error: unknown) {
					if (error instanceof Error) {
						return createErrorNode(createStringNode(error.message));
					}

					return createErrorNode(createStringNode(JSON.stringify(error)));
				}
			});
		}

		case "object": {
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
				const map = new Map<string, AstNode>();
				for (const [maybeString, unknownValue] of input.entries()) {
					const key = String(maybeString);
					const value = toAst(unknownValue);
					map.set(key, value);
				}

				return createMapNode(map);
			}

			const inputObject = input as Record<string, unknown>;
			const map = new Map<string, AstNode>();
			for (const [maybeString, unknownValue] of Object.entries(inputObject)) {
				const key = String(maybeString);
				const value = toAst(unknownValue);
				map.set(key, value);
			}

			return createMapNode(map);
		}

		default: {
			const coercedUnknown = String(input);
			return createErrorNode(
				createStringNode(`unknown type ${coercedUnknown}`),
			);
		}
	}
}

/**
 * Converts a given input into an `AstNode` of type `ErrorNode`.
 *
 * @param caughtError - The input to convert, which can be a string, an Error, or an AstNode.
 * @returns An `AstNode` of type `ErrorNode`.
 */
export function toErrorNode(caughtError: unknown): AstNode {
	if (isErrorNode(caughtError)) return caughtError;
	if (isAstNode(caughtError)) return createErrorNode(caughtError);
	if (caughtError instanceof Error) {
		return createErrorNode(createStringNode(caughtError.message));
	}
	return createErrorNode(createStringNode(String(caughtError)));
}
