/**
 * @file Provides a way to store and retrieve environment data such as
 * functions that can be called from code.
 */

import * as types from "./types.ts";

/**
 * Environment class that maintains a mapping of keys to AST nodes,
 * and a symbol table to look up references.
 * @description
 * The `outer` property is typed to allow both `Env` instances and
 * subclasses thereof. We use a type assertion in the constructor to bypass
 * TypeScript's type checking to allow this more flexible assignment, while
 * maintaining the correct type for the `outer` property.
 */
export class Env {
	// Stores key-value pair mappings.
	value = new Map<string, types.AstNode>();

	public outer?: this;
	public binds: types.SymbolNode[] = [];
	public exprs: types.AstNode[] = [];

	/**
	 * Creates an instance of the Env class.
	 * @param outerEnv - The outer environment.
	 * @param binds - Array of symbols to be bound.
	 * @param exprs - Array of AST nodes to be bound to symbols.
	 * @example new Env();
	 */
	constructor(
		outerEnv: Env | undefined = undefined,
		binds: types.SymbolNode[] = [],
		exprs: types.AstNode[] = [],
	) {
		this.outer = outerEnv as this | undefined;
		this.binds = binds;
		this.exprs = exprs;

		for (let i = 0; i < binds.length; i++) {
			const bind = binds[i];

			// If an "&" is encountered, bind all remaining expressions to
			// the next element.
			if (bind.value === "&") {
				const nextBind = binds[i + 1];
				if (nextBind) {
					const remainingExprs = exprs.slice(i);
					const keyString = types.convertMapKeyToString(nextBind);
					this.value.set(keyString, types.createListNode(remainingExprs));
					break;
				}
			}

			const keyString = types.convertMapKeyToString(bind);
			this.value.set(keyString, exprs[i]);
		}
	}

	serialize(): types.MapNode {
		const serialized: types.MapNode = types.createMapNode();
		let outer: types.MapNode = types.createMapNode();

		if (this.outer) {
			outer = this.outer.serialize();
		}

		const entries = this.value.entries();
		for (const [key, value] of entries) {
			serialized.value.set(key, value);
		}

		// serialized.value.set("__outer__", outer);

		return serialized;
	}

	/**
	 * Set a key-value pair in the environment.
	 * @param key - The key to be added.
	 * @param value - The AST node to be associated with the key.
	 * @returns The AST node that was added.
	 * @example myEnv.set(makeStr('foo'), makeNum(42));
	 */
	set(key: types.MapKeyNode, value: types.AstNode): types.AstNode {
		const keyString = types.convertMapKeyToString(key);
		this.value.set(keyString, value);
		return value;
	}

	/**
	 * Find the environment where a key is defined.
	 * @description
	 * This uses a polymorphic `this` type to facilitate method chaining
	 * and to enable subclasses to return instances of their own type when this
	 * method is called. It utilizes the `outer` property which can reference an
	 * `Env` instance or any of its subclasses, hence promoting flexibility in
	 * terms of where this method can find the specified key.
	 * @param key - The key to search for.
	 * @returns The environment where the key is defined, or undefined.
	 * @example myEnv.findEnv(makeSym('foobar'));
	 */
	findEnv<T extends Env>(this: T, key: types.MapKeyNode): T | undefined {
		const keyString = types.convertMapKeyToString(key);
		if (this.value.has(keyString)) {
			return this;
		}

		if (!types.isDefined<Env>(this.outer)) {
			return undefined;
		}

		return this.outer.findEnv(key);
	}

	/**
	 * Get the value associated with a given key from the
	 * symbolTable. Uses the key's value property to search, finds the
	 * matching key in the value Map, and returns its value.
	 * @param key - A types.DictKeys types.Ast item.
	 * @returns Associated value as types.Ast.
	 * @throws When the key was not found in any environments.
	 * @example myEnv.get(makeKey('foo'));
	 */
	get(key: types.MapKeyNode): types.AstNode {
		const foundEnv = this.findEnv(key);
		if (foundEnv === undefined) {
			throw types.createErrorNode(
				`The variable name '${key.value}' has not been declared.`,
				types.ErrorTypes.ReferenceError,
				key,
			);
		}

		const keyString = types.convertMapKeyToString(key);
		const mapValue = foundEnv.value.get(keyString);
		types.assertDefined<types.AstNode>(mapValue);

		return mapValue;
	}
}
