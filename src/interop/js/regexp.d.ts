import * as types from '../../types.ts';
export declare const regExpFunctions: Array<[string, types.Closure]>;
export declare function createRegExp(pattern: string, flags?: string): types.AstNode;
export declare function newRegExp(...astArgs: types.AstNode[]): types.AstNode;
export declare function execRegExp(...astArgs: types.AstNode[]): types.AstNode;
export declare function testRegExp(...astArgs: types.AstNode[]): types.AstNode;
