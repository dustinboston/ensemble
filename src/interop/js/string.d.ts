import * as types from '../../types.ts';
export declare const stringFunctions: Array<[string, types.Closure]>;
export declare function stringFromCharCode(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringFromCodePoint(...astArgs: types.AstNode[]): types.AstNode;
/**
 * Get the character at a given index. Allows negative indices. Also used by charAt.
 * @param {[types.StringNode, types.NumberNode]} astArgs - The string to get the character from, and index of a character in the string.
 * @returns {types.StringNode|types.NilNode} An Ast Node that contains the character at the given index.
 */
export declare function stringAt(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringCodePointAt(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringConcat(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringEndsWith(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringIncludes(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringIndexOf(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringIsWellFormed(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringLastIndexOf(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringLength(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringLocaleCompare(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringMatch(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringMatchAll(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringNormalize(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringPadEnd(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringPadStart(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringRepeat(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringReplace(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringReplaceAll(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringSearch(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringSlice(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringSplit(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringStartsWith(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringToLocaleLowerCase(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringToLocaleUpperCase(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringToLowerCase(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringToUpperCase(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringToWellFormed(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringTrim(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringTrimEnd(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringTrimStart(...astArgs: types.AstNode[]): types.AstNode;
export declare function stringRaw(...astArgs: types.AstNode[]): types.AstNode;
