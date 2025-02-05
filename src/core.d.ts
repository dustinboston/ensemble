/**
 * @file Provides all of the core functions for the language.
 */
import * as types from './types.ts';
export declare const ns: Map<types.MapKeyNode, types.FunctionNode>;
/**
 * `=` determines if two AST nodes are equal by comparing them using the
 * `isEqualTo` method.
 * @param args - An array with two Ast nodes to be compared.
 * @returns - A Bool node representing whether the two AST nodes are equal.
 * @throws Will throw an error if the number of arguments is not exactly two.
 * @see types.isEqualTo()
 * @example
 * ```typescript
 * eq(
 *   makeList([makeNum(1), makeNum(2), makeNum(3)]),
 *   makeList([makeNum(1), makeNum(2), makeNum(3)])
 * );
 * //=> returns types.Bool with true value
 * ```
 */
export declare function eq(...args: types.AstNode[]): types.AstNode;
/**
 * `pr-str` converts nodes to escaped strings and returns the result.
 *
 * This function takes multiple arguments of type Ast, converts each to a
 * string, ensuring characters are escaped properly, then joins these strings
 * with a space separator, and returns the entire concatenated string as a Str.
 * @param args - The AST nodes to be converted to strings.
 * @returns The concatenated string result, with args separated by a space.
 * @see printer.printString - The function used for converting AST nodes
 * to strings.
 * @example
 * // Mal language usage
 * (pr-str "abc\ndef\nghi") ;=> "\"abc\\ndef\\nghi\""
 */
export declare function printEscapedString(...args: types.AstNode[]): types.AstNode;
/**
 * `str` converts nodes to strings as-is and prints the result.
 * @description Calls printString on each argument with printReadably set \
 * to false, concatenates the results together, and returns the new string.
 * @param args - Types.Ast[].
 * @returns Types.Str.
 * @example (str "abc\ndef\nghi") ;=> "abc\ndef\nghi"
 */
export declare function printUnescapedString(...args: types.AstNode[]): types.AstNode;
/**
 * `prn` converts nodes to escaped strings, prints the result & returns nil;.
 * @description Calls printString on each argument with printReadably set \
 * to true and joins the results with a space. Then it prints the string to \
 * the screen and returns nil.
 * @param args - Types.Ast[].
 * @returns Types.Nil.
 * @example
 * ```mal
 * (prn "abc\ndef\nghi")
 * ;/"abc\\ndef\\nghi"
 * ;=>nil
 * ```
 */
export declare function printEscapedStringToScreen(...args: types.AstNode[]): types.AstNode;
/**
 * `println` converts nodes strings as-is, prints the result and returns nil.
 * @description Calls printString on each argument with printReadably set \
 * to false and joins the results with a space. Then it prints the string to \
 * the screen and returns nil.
 * @param args - The ast nodes to be printed.
 * @returns The stringified Ast.
 * @example
 * ```mal
 * (println "abc\ndef\nghi")
 * ;/abc
 * ;/def
 * ;/ghi
 * ;=>nil
 * @param args types.Ast[]
 * @returns types.Nil
 */
export declare function printUnescapedStringToScreen(...args: types.AstNode[]): types.AstNode;
/**
 * `read-string` Exposes the readString function to read in user-code.
 * @param args - [types.Str].
 * @returns Types.Ast.
 * @example (read-string "(+ 2 3)") ;=>(+ 2 3)
 */
export declare function readString(...args: types.AstNode[]): types.AstNode;
/**
 * Trims whitespace from the start and end of a string.
 * @param args - An array containing the string to trim as the first element.
 * @returns A new string with whitespace trimmed from the start and end.
 * @example (trim "  space  ") ;=>"space"
 */
export declare function trim(...args: types.AstNode[]): types.AstNode;
/**
 * `<` Checks if "a" is less than "b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (< (2 1)) ;=>true
 */
export declare function lt(...args: types.AstNode[]): types.AstNode;
/**
 * `<=` Checks if "a" is less than or equal to "b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (<= (2 1)) ;=>false
 */
export declare function lte(...args: types.AstNode[]): types.AstNode;
/**
 * `>` Checks if "a" is greater than "b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (> (2 1)) ;=>true
 */
export declare function gt(...args: types.AstNode[]): types.AstNode;
/**
 * `>=` Checks if "a" is greater than or equal to"b".
 * @param args - The two numbers to compare.
 * @returns True if the condition is met, otherwise false.
 * @example (>= (2 1)) ;=>true
 */
export declare function gte(...args: types.AstNode[]): types.AstNode;
/**
 * `+` Add two numbers and return the sum.
 * @param args - The two numbers to add.
 * @returns The sum of both numbers.
 * @example (+ 2 1) ;=>3
 */
export declare function add(...args: types.AstNode[]): types.AstNode;
/**
 * `-` Subtract two numbers and return the difference.
 * @param args - The two numbers to subtract.
 * @returns The difference between the two numbers.
 * @example (- 2 1) ;=>1
 */
export declare function subtract(...args: types.AstNode[]): types.AstNode;
/**
 * `*` Multiply two numbers and return the product.
 * @param args - The two numbers to be multiplied.
 * @returns The product of multiplying the numbers.
 * @example (* 2 1) ;=>2
 */
export declare function multiply(...args: types.AstNode[]): types.AstNode;
/**
 * `/` Divide two numbers and return the quotient.
 * @param args - The two numbers to divide.
 * @returns The quotient.
 * @example (/ 2 1) ;=>1
 */
export declare function divide(...args: types.AstNode[]): types.AstNode;
/**
 * `time-ms` Return a unix timestamp.
 * @param args - No arguments should be specified.
 * @returns A high-resolution timestamp (requires --allow-hrtime).
 * @example (time-ms) ;=> 1689952214357
 */
export declare function timeMs(...args: types.AstNode[]): types.AstNode;
/**
 * `list` Takes N args and returns them as a list.
 * @param args - N Ast values to add to a list.
 * @returns A list populated with the arguments.
 * @example (list 2 1) ;=>(2 1)
 */
export declare function list(...args: types.AstNode[]): types.AstNode;
/**
 * `list?` Determine if an types.Ast node is a types.List.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (list? (2 1)) ;=>true
 */
export declare function isListNode(...args: types.AstNode[]): types.BooleanNode;
/**
 * `cons` prepend a value to the front of a list.
 * @param args - [types.Ast, types.List].
 * @returns Types.List.
 * @example (cons foo (1 2 3)) ;=> (foo 1 2 3)
 */
export declare function cons(...args: types.AstNode[]): types.ListNode;
/**
 * `concat` concatenates multiple sequences (lists or vectors) into one list.
 * @param args - The sequences to concatenate. Each argument
 * should be a list or a vector.
 * @returns A new list containing all elements from the input
 * sequences, in the order they appear in the input.
 * @throws Will throw an error if any of the input arguments is not a sequence.
 * @example
 * (concat (list 1 2 3) (list 4 5 6)) ;=> (1 2 3 4 5 6)
 */
export declare function concat(...args: types.AstNode[]): types.AstNode;
/**
 * `vec` turn a list into a vector.
 * @description Returns a Vec if the arg is a types.List, else original node.
 * @param args - [types.List].
 * @returns Types.Vec | types.Ast.
 * @example (vec (1 2 3)) ;=> [1 2 3]
 */
export declare function vec(...args: types.AstNode[]): types.AstNode;
/**
 * `nth` returns the nth item from a list.
 * @param args - [Seq, types.Num].
 * @returns Types.Ast.
 * @throws If there are not enough arguments.
 * @example (nth (a b c) 0) ;=> a
 */
export declare function nth(...args: types.AstNode[]): types.AstNode;
/**
 * `first` gets the first item of a list.
 * @description Returns types.Ast else types.Nil if the list is empty.
 * @param args - [types.List].
 * @returns Types.Ast | types.Nil.
 * @example (first (+ 2 4) ;=> +
 */
export declare function firstNodeInList(...args: types.AstNode[]): types.AstNode;
export declare function lastNodeInList(...args: types.AstNode[]): types.AstNode;
/**
 * `rest` returns a new list excluding the first element of the list passed.
 * @description If the argument passed does not have at least one item
 * an error will be thrown. If the list only has one item (presumably a fn),
 * an empty list will be returned.
 * @param args - A spread of `types.Ast[]` arguments where the first argument is
 * expected to be a sequential type (like a list).
 * @returns A new list excluding the first element of the first argument, or an
 * empty list if there is only one item in the original list.
 * @throws When there isn't at least one argument passed in.
 * ```mal
 * (rest (+ 2 3 4)) ;=> (2 3 4)
 * ```
 */
export declare function rest(...args: types.AstNode[]): types.AstNode;
/**
 * `empty?` Determine if a types.List or types.Vec is empty.
 * @param args - [Seq].
 * @returns Types.Bool.
 * @example (empty? ()) ;=>true
 */
export declare function empty(...args: types.AstNode[]): types.AstNode;
/**
 * `count` Counts the number of values in a Seq node.
 * @param args - [Seq].
 * @returns Types.Num.
 * @example (count (1 2 3)) ;=> 3
 */
export declare function length(...args: types.AstNode[]): types.AstNode;
/**
 * `atom` Create an types.Atom that "points" to the given node.
 * @param args - [types.Ast].
 * @returns Types.Atom - An types.Atom with the referenced node.
 * @example (def! a (atom 2)) ;=>(atom 2)
 */
export declare function atom(...args: types.AstNode[]): types.AstNode;
/**
 * `atom?` Tests whether an node is an node of types.Atom.
 * @param args - [types.Ast].
 * @returns Types.Bool - indicating whether the the node is an types.Atom.
 * @example (atom? a) ;=> true
 */
export declare function isAtom(...args: types.AstNode[]): types.AstNode;
/**
 * `deref` Returns the types.Ast node referenced in an types.Atom.
 * @param args - [types.Atom].
 * @returns Types.Ast.
 * @example (deref a) ;=> 2
 */
export declare function deref(...args: types.AstNode[]): types.AstNode;
/**
 * `reset!` Set an Atoms' value to the given node.
 * @param args - [types.Atom, types.Ast].
 * @returns Types.Atom - The types.Atom with a new value.
 * @example (reset! a 3) ;=>3
 */
export declare function reset(...args: types.AstNode[]): types.AstNode;
/**
 * `swap` Swap an Atoms' value with the result of the function.
 * @description The function is called with the Atoms' value as the first \
 * argument, and any specified optional parameters after.
 * @param args - [types.Atom, types.Func, ...types.Ast[]]
 * - args[0]: types.Atom - the node that will have its value swapped
 * - args[1]: types.Func  - a function that returns an types.Ast node
 * - ...rest: types.Ast[]  - additional parameters to the function.
 * @returns Types.Ast - The Atoms' new value.
 * @example (swap! a (fn* (a) (* 2 a))) ;=>12
 */
export declare function swap(...args: types.AstNode[]): types.AstNode;
/**
 * `throw` throws an types.Err object.
 * @param args - [types.Ast].
 * @throws Types.Err.
 * @example (throw "foo") ;/"foo"
 */
export declare function throwError(...args: types.AstNode[]): types.AstNode;
/**
 * `apply` call a function with arguments in a list.
 * @description Calls types.Func with Seq. Concatenates types.Ast[] to Seq.
 * @param args - [types.Func, ...types.Ast[]?, Seq].
 * @returns Types.Ast.
 * @example (apply + (list 2 3)) ;=> 5
 */
export declare function apply(...args: types.AstNode[]): types.AstNode;
/**
 * `map` call a function against each item in a list.
 * @param args - [types.Func, Seq].
 * @returns Types.List.
 * @example (map double (1 2 3)) ;=> (2 4 6)
 */
export declare function applyToSequence(...args: types.AstNode[]): types.AstNode;
/**
 * `conj` conjoins elements to a sequence.
 * @description
 * If the first argument is a List, it will prepend the remaining arguments
 * in reverse order to the List value. If it is a Vec, it will append
 * the arguments in order.
 * @param args - The first argument should be a sequence (either a List or
 * Vec), followed by a variadic list of elements to be conjoined to the
 * sequence.
 * @returns
 * Returns a new sequence with the elements conjoined. The type of the output
 * sequence matches the type of the input sequence.
 * @throws
 * Will throw an error if fewer than two arguments are passed or if the first
 * argument is not a sequence.
 * @example
 * (conj [1, 2, 3] 4 5)
 * //=> [1, 2, 3, 4, 5]
 * @example
 * (conj (list 1, 2, 3) 4 5)
 * //=> (5, 4, 1, 2, 3)
 */
export declare function conj(...args: types.AstNode[]): types.AstNode;
/**
 * `seq`
 * Converts a vec to list, and string to a list of chars.
 * @param args - [types.List|types.Vec|types.Str|types.Nil].
 * @returns Types.List|types.Nil.
 * @example (seq (list 1 2 3)) ;=> (1 2 3)
 * @example (seq [1 2 3]) ;=> (1 2 3)
 * @example (seq "foo") ;=> ("f" "o" "o")
 * @example (seq nil) ;=> nil
 * @example (seq ()) ;=> nil
 * @example (seq []) ;=> nil
 */
export declare function seq(...args: types.AstNode[]): types.AstNode;
/**
 * `meta`
 * Returns the value of the metadata element.
 * @param args - [MetadataTypes].
 * @returns Types.Ast.
 * @example (meta (with-meta (fn* (a) a) {"b" 1})) ;=> {"b" 1}
 */
export declare function meta(...args: types.AstNode[]): types.AstNode;
/**
 * `with-meta`
 * Sets the metadata value of the first argument to the second argument.
 * @param args - [MetadataTypes, types.Ast].
 * @returns MetadataTypes.
 * @example (with-meta (fn* (a) a) {"b" 1})
 */
export declare function withMeta(...args: types.AstNode[]): types.AstNode;
/**
 * `nil?` determines if a node is types.Nil.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (nil? nil) ;=> true
 */
export declare function isNil(...args: types.AstNode[]): types.AstNode;
/**
 * `true?` determines if a node is types.Bool(true).
 * @param args - [types.Bool].
 * @returns Types.Bool.
 * @example (true? true) ;=> true
 */
export declare function isTrue(...args: types.AstNode[]): types.AstNode;
/**
 * `false?` determines if a node is types.Bool(false).
 * @param args - [types.Bool].
 * @returns Types.Bool.
 * @example (false? false) ;=> true
 */
export declare function isFalse(...args: types.AstNode[]): types.AstNode;
/**
 * `string?` determines if a node is a types.Str/string.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (string? "foobar") ;=> true
 */
export declare function isString(...args: types.AstNode[]): types.AstNode;
/**
 * `symbol` Creates a new types.Sym with the value of a types.Str.
 * @param args - [types.Str].
 * @returns Types.Sym.
 * @example (symbol 'abc) ;=> true
 */
export declare function symbol(...args: types.AstNode[]): types.AstNode;
/**
 * `symbol?` determines if a node is a symbol.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (symbol? :abc) ;=> false
 * @example (symbol? 'abc) ;=> true
 * @example (symbol? "abc") ;=> false
 * @example (symbol? (symbol "abc")) ;=> true
 */
export declare function isSymbolNode(...args: types.AstNode[]): types.AstNode;
/**
 * `keyword` creates a new types.Key with the value of a types.Str.
 * @param args - [types.DictKeys].
 * @returns Types.Key.
 * @example (keyword "pie") ;=> :pie
 */
export declare function keyword(...args: types.AstNode[]): types.AstNode;
/**
 * `keyword?` determines if a node is a keyword.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (keyword? :abc) ;=> true
 * @example (keyword? 'abc) ;=> false
 * @example (keyword? "abc") ;=> false
 * @example (keyword? (keyword "abc")) ;=> true
 */
export declare function isKeyword(...args: types.AstNode[]): types.AstNode;
/**
 * `number?` determines if a node is a number.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (number? 2) ;=> true
 */
export declare function isNumber(...args: types.AstNode[]): types.AstNode;
/**
 * `fn?` determines if a node is a function.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (fn? (fn* )) ;=> true
 */
export declare function isFn(...args: types.AstNode[]): types.AstNode;
/**
 * `macro?` determines if a node is a macro.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (macro? ) ;=> true
 */
export declare function isMacro(...args: types.AstNode[]): types.AstNode;
/**
 * `vector` Creates a vector from an arbitrary number of types.Ast args.
 * @param args - Types.Ast[].
 * @returns Types.Vec.
 * @example (vector 1 2 3 4) ;=> [1 2 3 4]
 */
export declare function vector(...args: types.AstNode[]): types.AstNode;
/**
 * `vector?` Determines if a node is a types.Vec.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (vector? [1 2 3]) ;=> true
 */
export declare function isVector(...args: types.AstNode[]): types.BooleanNode;
/**
 * `hash-map` Create a types.Dict from alternating DictKey/types.Ast args.
 * @param args - (DictKey|types.Ast)[].
 * @returns Types.Dict.
 * @example (hash-map "foo" 1 "bar" 2) ;=> {"foo" 1 "bar" 2}
 */
export declare function hashMap(...args: types.AstNode[]): types.MapNode;
/**
 * `isMap` determine if a node is a types.Dict.
 * @param args - [types.Ast].
 * @returns Types.Bool.
 * @example (map? {:foo 1 :bar 2}) ;=> true
 */
export declare function isMap(...args: types.AstNode[]): types.AstNode;
/**
 * `assoc` Merge key/value pairs into a types.Dict (associate).
 * @param args - [types.Dict, ...(DictKey|types.Ast)[]].
 * @returns Types.Dict.
 * @example (assoc {} 'foo 1 'bar 2) ;=> {'foo 1 'bar 2}
 */
export declare function assoc(...args: types.AstNode[]): types.AstNode;
/**
 * `dissoc` remove elements from a dict (disassociate).
 * @param args - [types.Dict, DictKey].
 * @returns Types.Dict.
 * @example ({:foo 1 :bar 2}, :foo) ;=> {:bar 2}
 */
export declare function dissoc(...args: types.AstNode[]): types.AstNode;
/**
 * `get` get a value from a MapNode by key.
 * @param args - [mapNode: MapNode, key: StringNode]
 * @returns Types.Ast | types.Nil.
 * @example (get {:foo 1 :bar 2} :bar) ;=> 2
 */
export declare function get(...args: types.AstNode[]): types.AstNode;
/**
 * `contains?` determines whether the given key exists in the map or array.
 * @param args - [types.Dict, DictKey].
 * @returns Types.Bool.
 * @example (contains? {:foo 1 :bar 2} :bar) ;=> true
 */
export declare function contains(...args: types.AstNode[]): types.AstNode;
/**
 * `keys` gets a list of all of the keys in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (keys {:foo 1 :bar 2}) ;=> (:foo :bar)
 */
export declare function keys(...args: types.AstNode[]): types.AstNode;
/**
 * `vals` gets a list of all of the values in the dict.
 * @param args - [types.Dict].
 * @returns Types.List.
 * @example (vals {:foo 1 :bar 2}) ;=> (1 2)
 */
export declare function vals(...args: types.AstNode[]): types.AstNode;
/**
 * `sequential?` Determines if a node is a types.List or types.Vec.
 * @param args - Arguments to the function.
 * @param args."0" - The node to check.
 * @returns True if the Ast is a List or Vec.
 * @example (sequential? [1 2 3])
 */
export declare function isSequentialNode(...args: types.AstNode[]): types.AstNode;
/**
 * `join` - Join elements of a vec or list with a separator.
 * @param args - [types.Vec|types.List,types.Str|undefined]
 * - args[0] the vec or list to join
 * - args[1] the delimiter to join elements with.
 * @returns The result of joining the elements.
 * @example (join [1 2 3] '#') ;=> 1#2#3
 */
export declare function join(...args: types.AstNode[]): types.AstNode;
/**
 * A JavasScript switch statement.
 * @param args [types.Ast,...types.List[], types.List]
 * args[0] - The expression to be matched
 * args[1...n-1] - Case clause matched against the expression (value statement)
 * 	each case clause should have a statement to match and a value to return
 * args[n] - Default clause (statement)
 */
export declare function switchCase(...args: types.AstNode[]): types.AstNode;
