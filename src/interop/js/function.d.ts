import * as types from '../../types.ts';
export declare const functionFunctions: Array<[string, types.Closure]>;
/**
 * Dangerously evaluates a javascript expression with Function.
 * @param args - The expression to evaluate.
 * @returns Result of the evaluated expression or an Err.
 * @example (js-eval "console.log('give me a donut');")
 */
export declare function jsEval(...args: types.AstNode[]): types.AstNode;
export declare function apply(...args: types.AstNode[]): types.AstNode;
export declare function call(...args: types.AstNode[]): types.AstNode;
export declare function bind(...args: types.AstNode[]): types.AstNode;
