import * as types from '../../types.ts';
export declare const errorFunctions: Array<[string, types.Closure]>;
export declare function newError(...args: types.AstNode[]): types.AstNode;
export declare function getMessage(...args: types.AstNode[]): types.AstNode;
export declare function getCause(...args: types.AstNode[]): types.AstNode;
export declare function getName(...args: types.AstNode[]): types.AstNode;
