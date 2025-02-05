import * as types from '../../types.ts';
export declare const jsonFunctions: Array<[string, types.Closure]>;
export declare function parseJson(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringifyJson(...astArgs: types.AstNode[]): types.AstNode;
