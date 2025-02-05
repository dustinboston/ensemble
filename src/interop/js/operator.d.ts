import * as types from '../../types.ts';
export declare const operators: Array<[string, types.Closure]>;
/**
 * Tests whether a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export declare function and(...args: types.AstNode[]): types.BooleanNode;
/**
 * Tests whether any of a series of expressions are truthy
 * @param ast the ast to test for truthiness
 * @return types.Bool whether the ast is truthy
 */
export declare function or(...args: types.AstNode[]): types.BooleanNode;
/**
 * AKA modulo
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function remainder(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function bitwiseAnd(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function bitwiseOr(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function bitwiseXor(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a - The number.
 * @returns types.NumberNode The result of the bitwise NOT operation.
 * @throws TypeError If the argument is not a number.
 */
export declare function bitwiseNot(a: types.AstNode): types.NumberNode;
/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function leftShift(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function rightShift(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a
 * @param b
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function unsignedRightShift(a: types.AstNode, b: types.AstNode): types.NumberNode;
/**
 * @param a
 * @returns types.AstNode
 */
export declare function not(a: types.AstNode): types.AstNode;
/**
 * `!==` Determine if two nodes are not equal
 * @example (!== (8 2 3) (1 2 3)) ;=> true
 * @param args [types.Ast, types.Ast]
 * @returns types.Bool
 * @see types.isEqualTo()
 */
export declare function notEqualTo(...args: types.AstNode[]): types.AstNode;
/**
 * `++` Increment a numeric value by one
 *
 * @description
 * Postfix is the default. In this position the counter will be incremented, but
 * the value will remain the same. The affix can be set explicitly by passing
 * "prefix" or "postfix" as the second argument. In the "postfix" position, the
 * returned value will have the counter and the value incremented by one. The
 * result is returned as a vector with the new counter value as the first element,
 * and the value before the increment as the second element.
 *
 * @example Default postfix
 * ```
 * (++ 1) ;=>[2, 1]
 * ```
 *
 * @example Explicit postfix
 * ```
 * (++ 1 "postfix") ;=>[2, 1]
 * ```
 *
 * @example Explicit prefix
 * ```
 * (++ 1 "prefix") ;=>[2, 2]
 * ```
 */
export declare function increment(...args: types.AstNode[]): types.AstNode;
/**
 * `--` Decrement a numeric value by one
 *
 * @description
 * Postfix is the default. In this position the counter will be decremented, but
 * the value will remain the same. The affix can be set explicitly by passing
 * "prefix" or "postfix" as the second argument. In the "postfix" position, the
 * returned value will have the counter and the value decremented by one. The
 * result is returned as a vector with the new counter value as the first element,
 * and the value before the increment as the second element.
 *
 * @example Default postfix
 * ```
 * (-- 1)
 * ;=>[0, 1]
 * ```
 *
 * @example Explicit postfix
 * ```
 * (-- 1 "postfix")
 * ;=>[0, 1]
 * ```
 *
 * @example Explicit prefix
 * ```
 * (-- 1 "prefix")
 * ;=>[0, 0]
 * ```
 */
export declare function decrement(...args: types.AstNode[]): types.AstNode;
/**
 * Wraps typeof
 * @param object AstNode
 * @param typeString Must be: undefined, object, boolean, number, string, function, symbol, bigint
 * @returns types.BooleanNode
 */
export declare function typeOf(...args: types.AstNode[]): types.BooleanNode;
/**
 * Wraps instanceof
 * @returns types.BooleanNode
 */
export declare function instanceOf(...args: types.AstNode[]): types.BooleanNode;
/**
 * Implements the nullish coalesce operator (??)
 * @param a Object to check if a is null or undefined
 * @param b Result if a is null or undefined
 * @returns types.AstNode
 */
export declare function nullishCoalesce(a: types.AstNode, b: types.AstNode): types.AstNode;
/**
 * @param base
 * @param exponent
 * @returns types.NumberNode
 * @throws TypeError
 */
export declare function power(base: types.AstNode, exponent: types.AstNode): types.NumberNode;
