/**
 * @file Provides a way to store and retrieve environment data such as
 * functions that can be called from code.
 */
import * as types from './types.ts';
/**
 * Environment class that maintains a mapping of keys to AST nodes,
 * and a symbol table to look up references.
 * @description
 * The `outer` property is typed to allow both `Env` instances and
 * subclasses thereof. We use a type assertion in the constructor to bypass
 * TypeScript's type checking to allow this more flexible assignment, while
 * maintaining the correct type for the `outer` property.
 */
export declare class Env {
    value: Map<string, types.AstNode>;
    outer?: this;
    binds: types.SymbolNode[];
    exprs: types.AstNode[];
    /**
     * Creates an instance of the Env class.
     * @param outerEnv - The outer environment.
     * @param binds - Array of symbols to be bound.
     * @param exprs - Array of AST nodes to be bound to symbols.
     * @example new Env();
     */
    constructor(outerEnv?: Env | undefined, binds?: types.SymbolNode[], exprs?: types.AstNode[]);
    serialize(): types.MapNode;
    /**
     * Set a key-value pair in the environment.
     * @param key - The key to be added.
     * @param value - The AST node to be associated with the key.
     * @returns The AST node that was added.
     * @example myEnv.set(makeStr('foo'), makeNum(42));
     */
    set(key: types.MapKeyNode, value: types.AstNode): types.AstNode;
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
    findEnv<T extends Env>(this: T, key: types.MapKeyNode): T | undefined;
    /**
     * Get the value associated with a given key from the
     * symbolTable. Uses the key's value property to search, finds the
     * matching key in the value Map, and returns its value.
     * @param key - A types.DictKeys types.Ast item.
     * @returns Associated value as types.Ast.
     * @throws When the key was not found in any environments.
     * @example myEnv.get(makeKey('foo'));
     */
    get(key: types.MapKeyNode): types.AstNode;
}
