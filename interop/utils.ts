import ts from 'npm:typescript@5.5.3';
import { Meta, metaValues } from './types.ts';
import type { AstNodeKind, ContainerDeclaration, DeclarationWithConstructor, DeclarationWithName, DeclarationWithType } from './types.ts';

/**
 * A set of valid meta values, which are members of the `metaValues` array.
 * These values represent boolean meta values and are stored in a set for O(1) lookup.
 */
export const validMetaValues = new Set(metaValues);

/**
 * Checks if the provided `kind` value is a valid meta value.
 * @param kind - The value to check.
 * @returns `true` if the `kind` is a valid meta value, `false` otherwise.
 */
export function isValidMeta(kind: number): kind is Meta {
  return validMetaValues.has(kind);
}

/**
 * Formats a unique identifier for a global object or property.
 *
 * If the `id` is enclosed in square brackets (`[` and `]`), it is treated as a symbol and the `globalPrefix` is prepended to it.
 * Otherwise, if `globalPrefix` is provided, it is prepended to the `id` with a dot (`.`) separator.
 * If `globalPrefix` is not provided, the `id` is returned as-is.
 *
 * @param id The unique identifier to format.
 * @param globalPrefix An optional prefix to prepend to the `id`.
 * @returns The formatted identifier.
 */
export function formatId(id: string, globalPrefix = '') {
  if (globalPrefix.endsWith('.prototype')) {
    globalPrefix = globalPrefix.slice(0, -10);
  }

  if (id.startsWith('[') && id.endsWith(']')) { // This is a symbol
    return `${globalPrefix}${id}`;
  } else if (globalPrefix) {
    return `${globalPrefix}.${id}`;
  } else {
    return id;
  }
}

/**
 * Formats an AST name
 *
 * If the `name` is enclosed in square brackets (`[` and `]`), it is treated as a symbol and the `globalPrefix` is prepended to it.
 * Otherwise, if `globalPrefix` is provided, it is prepended to the `name` with a dot (`.`) separator.
 * If `globalPrefix` is not provided, the `name` is returned as-is.
 *
 * @param name The unique identifier to format.
 * @param globalPrefix An optional prefix to prepend to the `name`.
 * @returns The formatted identifier.
 */
export function formatName(name: string, globalPrefix = '') {
  let prefix = globalPrefix;
  if (name === 'prototype' && globalPrefix.endsWith('.prototype')) {
    prefix = globalPrefix.replace(/\.prototype/g, '');
  }

  if (name.startsWith('[') && name.endsWith(']')) { // This is a symbol
    return `${prefix}${name}`;
  } else if (prefix) {
    return `${prefix}.${name}`;
  } else {
    return name;
  }
}

export function getDeclarationName(node: DeclarationWithName, sourceFile: ts.SourceFile, globalPrefix = ''): string {
  return formatName(node.name.getText(sourceFile), globalPrefix);
}

export function isDeclarationWithName(node: ts.Node): node is DeclarationWithName {
  return (
    (ts.isFunctionDeclaration(node) && node.name !== undefined) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isVariableDeclaration(node) ||
    ts.isModuleDeclaration(node) ||
    ts.isTypeAliasDeclaration(node)
  );
}

export function hasConstructSignature(node: ts.Node): node is DeclarationWithConstructor {
  return ts.isInterfaceDeclaration(node) && node.members.some(ts.isConstructSignatureDeclaration);
}

export function isContainerDeclaration(node: ts.Node): node is ContainerDeclaration {
  return (ts.isInterfaceDeclaration(node) || ts.isModuleDeclaration(node));
}

export function hasDeclarationWithType(node: ts.Node): node is DeclarationWithType {
  return (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node)) && node.type !== undefined &&
    (ts.isTypeReferenceNode(node.type) || ts.isToken(node.type)) && node.name !== undefined;
}

export function isKeywordTypeSyntaxKind(kind: ts.SyntaxKind): kind is ts.KeywordTypeSyntaxKind {
  return ts.isTokenKind(kind) && kind >= ts.SyntaxKind.AnyKeyword && kind <= ts.SyntaxKind.UndefinedKeyword;
}

export function toAstNodeString(input: unknown): AstNodeKind {
  if (input === null || input === undefined) {
    return 'NilNode';
  }

  if (Array.isArray(input)) {
    return 'VectorNode';
  }

  if (input instanceof Error) {
    return 'ErrorNode';
  }

  if (input instanceof Map) {
    return 'MapNode';
  }

  switch (typeof input) {
    case 'undefined': {
      return 'NilNode';
    }

    case 'number': {
      return 'NumberNode';
    }

    case 'string': {
      if (input.startsWith('"')) {
        return 'StringNode';
      }

      if (input.startsWith(':')) {
        return 'KeywordNode';
      }

      return 'SymbolNode';
    }

    case 'boolean': {
      return 'BooleanNode';
    }

    case 'symbol':
    case 'bigint': {
      return 'StringNode';
    }

    case 'function': {
      return 'FunctionNode';
    }

    // TODO:
    // case 'object': {

    // if (input instanceof Error) {
    // 	return new ErrorNode(new StringNode(input.message));
    // }

    // if (input === null) {
    // 	return 'NilNode';
    // }

    // if (Array.isArray(input)) {
    // 	const array = input.map((element) => toAst(element));
    // 	return new ListNode(array);
    // }

    // if (input instanceof Map) {
    // 	const map = new Map<string, AstNode>();
    // 	for (const [maybeString, unknownValue] of input.entries()) {
    // 		const key = String(maybeString);
    // 		const value = toAst(unknownValue);
    // 		map.set(key, value);
    // 	}

    // 	return new MapNode(map);
    // }

    // const inputObject = input as Record<string, unknown>;
    // const map = new Map<string, AstNode>();
    // for (
    // 	const [maybeString, unknownValue] of Object.entries(
    // 		inputObject,
    // 	)
    // ) {
    // 	const key = String(maybeString);
    // 	const value = toAst(unknownValue);
    // 	map.set(key, value);
    // }

    // return new MapNode(map);
    // }

    default: {
      return 'JsNode';
    }
  }
}

/**
 * Checks if a a name of a function is protypal
 *
 * @param name - The string to check.
 * @returns true if it contains "prototype", else false
 */
export function isPrototype(name: string) {
  return name.includes('.prototype') && !name.endsWith('.prototype');
}

/**
 * Retrieves the TypeScript syntax kind for a given primitive type.
 *
 * @param primitiveType - The primitive type as a string (e.g. 'string', 'number', 'boolean', etc.)
 * @returns The corresponding TypeScript syntax kind
 */
export function getSyntaxKindForPrimitiveType(primitiveType: string): ts.SyntaxKind {
  switch (primitiveType) {
    case 'string':
      return ts.SyntaxKind.StringKeyword;
    case 'number':
      return ts.SyntaxKind.NumberKeyword;
    case 'boolean':
      return ts.SyntaxKind.BooleanKeyword;
    case 'void':
      return ts.SyntaxKind.VoidKeyword;
    case 'any':
      return ts.SyntaxKind.AnyKeyword;
    case 'unknown':
      return ts.SyntaxKind.UnknownKeyword;
    case 'null':
      return ts.SyntaxKind.NullKeyword;
    case 'undefined':
      return ts.SyntaxKind.UndefinedKeyword;
    case 'object':
      return ts.SyntaxKind.ObjectKeyword;
    case 'Function':
      return ts.SyntaxKind.FunctionKeyword;
    case 'Array':
      return ts.SyntaxKind.ArrayType;
    case 'Tuple':
      return ts.SyntaxKind.TupleType;
    case 'Promise':
      return ts.SyntaxKind.TypeReference;
    case 'Record':
      return ts.SyntaxKind.TypeReference;
    case 'Map':
      return ts.SyntaxKind.TypeReference;
    case 'Set':
      return ts.SyntaxKind.TypeReference;
    default:
      return ts.SyntaxKind.AnyKeyword;
  }
}

/**
 * Wraps a string with the provided prefix and suffix.
 * @param a - The prefix to add to the string.
 * @param b - The suffix to add to the string.
 * @returns A function that takes a string and returns the string wrapped with the prefix and suffix.
 */
export function curryWrap(a: string = '', b: string = '') {
  return (x: string) => a + x + b;
}

/**
 * Renames variable names that may conflict with JavaScript keywords. Currently only used for `this`.
 * @param name - The name of the variable to rename.
 * @returns The renamed variable name, or the original name if there isn't a replacement.
 */
export function renameVariable(name: string) {
  if (name === 'this') return 'self';
  return name;
}
