import * as types from '../../types.ts';
export declare const arrayFunctions: Array<[string, types.Closure]>;
export declare function toArray(...args: types.AstNode[]): types.AstNode;
export declare function arrayFrom(...args: types.AstNode[]): types.AstNode;
export declare function arrayAt(...args: types.AstNode[]): types.AstNode;
export declare function arrayIsArray(...args: types.AstNode[]): types.AstNode;
export declare function arrayConcat(...args: types.AstNode[]): types.AstNode;
export declare function arrayCopyWithin(...args: types.AstNode[]): types.AstNode;
export declare function arrayEntries(...args: types.AstNode[]): types.AstNode;
export declare function arrayEvery(...args: types.AstNode[]): types.AstNode;
export declare function arrayFill(...args: types.AstNode[]): types.AstNode;
export declare function arrayFilter(...args: types.AstNode[]): types.AstNode;
export declare function arrayFind(...args: types.AstNode[]): types.AstNode;
export declare function arrayFindIndex(...args: types.AstNode[]): types.AstNode;
export declare function arrayFindLast(...args: types.AstNode[]): types.AstNode;
export declare function arrayFindLastIndex(...args: types.AstNode[]): types.AstNode;
export declare function arrayFlat(...args: types.AstNode[]): types.AstNode;
export declare function arrayFlatMap(...args: types.AstNode[]): types.AstNode;
export declare function arrayIncludes(...args: types.AstNode[]): types.AstNode;
export declare function arrayIndexOf(...args: types.AstNode[]): types.AstNode;
export declare function arrayJoin(...args: types.AstNode[]): types.AstNode;
export declare function arrayKeys(...args: types.AstNode[]): types.AstNode;
export declare function arrayMap(...args: types.AstNode[]): types.AstNode;
export declare function arrayLast(...args: types.AstNode[]): types.AstNode;
export declare function arrayPush(...args: types.AstNode[]): types.AstNode;
export declare function arrayLength(...args: types.AstNode[]): types.AstNode;
/**
 * `reduce` reduces elements in a vector based on a reducer function and an initial value.
 * @todo Write tests
 * @param args - [types.Func, types.Vec, initialValue].
 * @returns Types.AstNode.
 * @example (reduce (lambda (acc x) (+ acc x)) [1, 2, 3, 4] 0) ;=> 10
 */
export declare function arrayReduce(...args: types.AstNode[]): types.AstNode;
export declare function arrayToReversed(...args: types.AstNode[]): types.AstNode;
export declare function arrayFirst(...args: types.AstNode[]): types.AstNode;
export declare function arraySlice(...args: types.AstNode[]): types.AstNode;
export declare function arraySome(...args: types.AstNode[]): types.AstNode;
export declare function arrayToSorted(...args: types.AstNode[]): types.AstNode;
export declare function arrayToSpliced(...args: types.AstNode[]): types.AstNode;
export declare function arrayUnshift(...args: types.AstNode[]): types.ListNode;
export declare function arrayValues(...args: types.AstNode[]): types.AstNode;
export declare function arrayReplaceWith(...args: types.AstNode[]): types.AstNode;
