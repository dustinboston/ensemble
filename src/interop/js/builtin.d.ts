import * as types from '../../types.ts';
export declare const builtInFunctions: Array<[string, types.Closure]>;
export declare function globalDecodeUri(...astArgs: types.AstNode[]): types.AstNode;
export declare function globalDecodeUriComponent(...astArgs: types.AstNode[]): types.AstNode;
export declare function globalEncodeUri(...astArgs: types.AstNode[]): types.AstNode;
export declare function globalEncodeUriComponent(...astArgs: types.AstNode[]): types.AstNode;
