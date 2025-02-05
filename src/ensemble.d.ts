import * as env from './env.ts';
import * as types from './types.ts';
export * as core from './core.ts';
export * as env from './env.ts';
export * as html from './interop/html.ts';
export * as js from './interop/js.ts';
export * as printer from './printer.ts';
export * as reader from './reader.ts';
export * as types from './types.ts';
export type TryCatchAst = types.ListNode & {
    value: [
        types.SymWithValue<'try*' | 'try'>,
        types.AstNode,
        types.ListNode & {
            value: [types.SymWithValue<'catch*' | 'catch'>, types.AstNode];
        }
    ];
};
/**
 * Asserts that an AST node represents a valid 'try-catch' construct.
 * @description Checks the structure of an AST node to ensure it correctly
 * represents a 'try-catch' block in the language, with valid number and types
 * of arguments.
 * @param a - The AST node being tested.
 * @throws Error if the node doesn't represent a valid 'try-catch' construct.
 * @example assertTryCatch(tryCatchAstNode);
 */
export declare function assertTryCatch(a: types.AstNode): asserts a is TryCatchAst;
export type DefAst = types.ListNode & {
    value: [
        types.SymWithValue<'def!' | 'globalThis' | 'var'>,
        types.SymbolNode | types.StringNode | types.KeywordNode,
        types.AstNode
    ];
};
/**
 * Asserts that an AST node represents a valid 'def!' construct.
 * @description Checks the structure of an AST node to ensure it correctly
 * represents a 'def!' declaration in the language, including the correct
 * number and types of arguments.
 * @param a - The AST node being tested.
 * @throws Error if the node doesn't represent a valid 'def!' construct.
 * @example assertDef(defAstNode);
 * @example (def! x "x")
 */
export declare function assertDef(a: types.AstNode): asserts a is DefAst;
export type LetAst = types.ListNode & {
    value: [
        types.SymWithValue<'let*' | 'let' | 'const'>,
        (types.VectorNode | types.ListNode) & {
            value: Array<types.SymbolNode | types.AstNode>;
        }
    ];
};
/**
 * Asserts that an AST node represents a valid 'let*' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'let*' construct, with the correct symbols and pairs of symbols and values.
 * @param a - The AST node to check.
 * @throws An error if the AST node does not correctly represent a 'let*'
 * construct.
 * @example assertLet(letAstNode);
 * @example (let* (z 9) z)
 */
export declare function assertLet(a: types.AstNode): asserts a is LetAst;
export type QuoteAst = types.ListNode & {
    value: [types.SymWithValue<'quote'>, types.AstNode];
};
/**
 * Asserts that an AST node represents a valid 'quote' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'quote' construct, with the correct symbol followed by an AST node.
 * @param a - The AST node to check.
 * @throws An error if the AST node does not correctly represent a 'quote'
 * construct.
 * @example assertQuote(quoteAstNode);
 * @example (quote (1 2 3))
 */
export declare function assertQuote(a: types.AstNode): asserts a is QuoteAst;
export type QuasiQuoteExpandAst = types.ListNode & {
    value: [types.SymWithValue<'quasiquoteexpand'>, types.AstNode];
};
/**
 * Asserts that an AST node represents a valid 'quasiquoteexpand' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'quasiquoteexpand' construct, with the correct symbol followed by an AST
 * node.
 * @param a - The AST node to check.
 * @throws An error if the AST node does not correctly represent a
 * 'quasiquoteexpand' construct.
 * @example assertQuasiQuoteExpand(quasiQuoteExpandAstNode);
 * @example (quasiquoteexpand a)
 */
export declare function assertQuasiQuoteExpand(a: types.AstNode): asserts a is QuasiQuoteExpandAst;
export type QuasiQuoteAst = types.ListNode & {
    value: [types.SymWithValue<'quasiquote'>, types.AstNode];
};
/**
 * Asserts that an AST node represents a valid 'quasiquote' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'quasiquote' construct, with the correct symbol followed by an AST node.
 * @param a - The AST node to check.
 * @throws An error if the AST node does not correctly represent a 'quasiquote'
 * construct.
 * @example assertQuasiQuote(quasiQuoteAstNode);
 * @example (quasiquote a)
 */
export declare function assertQuasiQuote(a: types.AstNode): asserts a is QuasiQuoteAst;
export type DefMacroAst = types.ListNode & {
    value: [types.SymWithValue<'defmacro!'>, types.MapKeyNode, types.AstNode];
};
/**
 * Asserts that an AST node represents a valid 'defmacro!' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'defmacro!' construct, including the correct symbol and key-value pair.
 * @param a - The AST node to check.
 * @throws Err - Throws an error if the AST node does not correctly represent a
 * 'defmacro!' construct.
 * @example assertDefMacro(defmacroAstNode);
 * @example (defmacro! one (fn* () 1))
 */
export declare function assertDefMacro(a: types.AstNode): asserts a is DefMacroAst;
export type DoAst = types.ListNode & {
    value: [types.SymWithValue<'do'>, ...types.AstNode[]];
};
/**
 * Asserts that an AST node represents a valid 'do' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'do' construct, including the correct symbol and a list of AST nodes.
 * @param a - The AST node to check.
 * @throws Err - Throws an error if the AST node does not correctly represent a
 * 'do' construct.
 * @example assertDo(doAstNode);
 * @example (do (prn 101) (prn 102) (+ 1 2))
 */
export declare function assertDo(a: types.AstNode): asserts a is DoAst;
export type IfAst = types.ListNode & {
    value: [types.SymWithValue<'if'>, types.AstNode, types.AstNode, types.AstNode];
};
/**
 * Asserts that an AST node represents a valid 'if' construct.
 * @description Verifies that the AST node follows the correct structure for an
 * 'if' construct, including the correct symbol and between 2 and 3 AST nodes.
 * @param a - The AST node to check.
 * @throws Err - Throws an error if the AST node does not correctly represent an
 * 'if' construct.
 * @example assertIf(ifAstNode);
 * @example (if true 7 8)
 */
export declare function assertIf(a: types.AstNode): asserts a is IfAst;
export type FnAst = types.ListNode & {
    value: [
        types.SymWithValue<'fn*' | 'function' | '=>'>,
        types.Seq & {
            value: types.SymbolNode[];
        },
        types.AstNode
    ];
};
/**
 * Asserts that an AST node represents a valid 'fn*' construct.
 * @description Verifies that the AST node follows the correct structure for a
 * 'fn*' construct, including the correct symbol, a sequence of parameters,
 * and a body AST.
 * @param a - The AST node to check.
 * @throws Err - Throws an error if the AST node does not correctly represent a
 * 'fn*' construct.
 * @example assertFn(fnAstNode); // Verifies if it is a valid fn* node
 * @example ( (fn* (a b) (+ b a)) 3 4)
 */
export declare function assertFn(a: types.AstNode): asserts a is FnAst;
/**
 * The READ step of the READ-EVAL-PRINT-LOOP.
 * Reads in code and converts it into an AST representation.
 * @param malCode - The raw MAL code to convert into an AST.
 * @returns An AST that represents the code.
 * @example
 * ```typescript
 * read("(+ 1 2)");
 * //=>["(", "+", 1, "2", ")"]
 * ```
 */
export declare function read(malCode: string): types.AstNode;
/**
 * Transforms a quasi-quoted AST node into its expanded form.
 * @description Expands quasi-quotes by replacing certain prefixes with their
 * evaluated forms. `unquote` (~) evaluates the following element and replaces
 * it inline. `splice-Unquote` (~@) evaluates the following list and splices
 * its content into the containing list.
 * @param node - The AST node to be quasi-quoted.
 * @returns The expanded AST, which can include "list", "concat",
 * "quote" or other forms based on the quasi-quoting rules.
 * @example Using "unquote" (~)
 * (quasiQuote (~a b)) ;=> (list a b)
 * @example Using "unquote" shorthand
 * `(~a b) //=> (list a b)
 * @example Using "splice-unquote" (~@)
 * (quasiQuote (~@a b)) ;=> (concat a b)
 * @example Using "splice-unquote" shorthand
 * `(~@a b)  =>  (concat a b)
 */
export declare function quasiQuote(node: types.AstNode): types.AstNode;
/**
 * Determines if a given AST node represents a macro call.
 * Type guards the response as a List that begins with a Symbol.
 * @param ast - The AST node to check.
 * @param appEnv - The environment in which to look for macros.
 * @returns True if the AST node is a macro call, false otherwise.
 * @example When appEnv contains a macro named 'a'
 * ```ts
 * isMacroCall(new List([new Sym("a")]), appEnv);
 * //=>true
 * ```
 * @example When appEnv does not contain a macro named 'a'
 * ```ts
 * isMacroCall(new List([new Sym("a")]), appEnv);
 * //=>false
 * ```
 */
export declare function isMacroCall(ast: types.AstNode, appEnv: env.Env): ast is types.ListNode & {
    value: [types.SymbolNode];
};
/**
 * Expands macros in the given AST within the scope of the provided environment.
 * @description This function will repeatedly expand any macro calls found in
 * the AST until no more macro calls are found.
 * @param ast - The Abstract Syntax Tree to be expanded.
 * @param appEnv - The environment in which the AST is to be evaluated.
 * @returns The fully expanded AST.
 * @example
 * ```typescript
 * const appEnv = new env.Env();
 * const ast = new List([new Sym('a_macro'), new Sym('a')]);
 * const expandedAst = macroExpand(ast, appEnv);
 * ```
 */
export declare function macroExpand(ast: types.AstNode, appEnv: env.Env): types.AstNode;
/**
 * Evaluates an Abstract Syntax Tree (AST) within a given environment.
 * @description Evaluates sequential or Map types.
 * - If the AST is a symbol, returns its value from the environment.
 * - If it's a vector, evaluates each element.
 * - If it's a list, evaluates each element.
 * - If it's a dictionary, evaluates each value.
 * - If it's a DomNode, evaluates each value.
 * - Otherwise, returns the input AST as-is.
 * @param node - The AST to evaluate.
 * @param appEnv - The environment within which to evaluate the AST.
 * @returns The evaluated AST.
 * @example Returns the value for a symbol.
 * ```ts
 * const x = makeSym('x');
 * appEnv.set(x, makeNum(1));
 * evalAst(x, appEnv);
 * //=>1
 * ```
 */
export declare function evaluateAst(node: types.AstNode, appEnv: env.Env): types.AstNode;
/**
 * Evaluates an AST within a given environment.
 * @param node - The AST to evaluate.
 * @param appEnv - The environment within which to evaluate the AST.
 * @returns The result of evaluating the AST.
 * @throws If the first value of the listnode is not a symbol.
 * @example Defining a simple environment and AST
 * ```ts
 * const appEnv = new env.Env();
 * const ast = types.makeList([
 *     types.makeSym("def!"),
 *     types.makeSym("a"),
 *     types.makeNum(1)
 * ]);
 * evaluate(ast, appEnv);
 * ```
 */
export declare function evaluate(node: types.AstNode, appEnv: env.Env): types.AstNode;
/**
 * `def!` special form defines a global var and binds it to a value.
 * @param node - A List that contains the `def!` symbol (ast[0]), a symbol that
 * represents the variable name (ast[1]), and the value that will be evaluated
 * against the appEnv (ast[2]).
 * Sym/Ast pairs that will be loaded into the environment.
 * @param appEnv - The environment where the AST should be evaluated.
 * @returns The evaluated value.
 * @example A basic def! example
 * ```clj
 * (def! y (+ 1 7))
 * ;=> 3
 * ```
 * - y is the variable name
 * - (+ 1 7) is the value to assign to 'y'.
 */
export declare function evaluateDef(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `let*` special form defines vars and binds them to values in a new scope.
 * @param node - A List that contains a `let*` symbol and a List of alternating
 * SymbolNode/AstNode pairs that will be loaded into the environment.
 * @param appEnv - The environment where the bindings will be added, and where
 * the function should be evaluated.
 * @returns A ContinueReturn objects that directs the response in the main loop.
 * @example (let* (c 2) c)
 * - (c 2) is a list var name/value pairs called bindings
 * - c is the function body where bindings are active (scope).
 */
export declare function evaluateLet(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `quote` or `'` special form.
 * @summary Wraps an AST value to prevent evaluation.
 * @param node - The AST to be quoted.
 * @param _ - The environment is unused by this form.
 * @returns An object that directs the response in the main loop.
 * @example (quote (+ 1 2)) => (+ 1 2)
 * @example '(+ 1 2) => (+ 1 2)
 */
export declare function evaluateQuote(node: types.AstNode, _: env.Env): types.ContinueReturn;
/**
 * `quasiquoteexpand` special form.
 * @summary Expands quasi-quoted code without evaluating.
 * @param node - The AST containing the quasiquote expression.
 * @param _env - The environment is unused by this form.
 * @returns An object that directs the response in the main loop.
 * @example `(1 ~a 3) => (1 (unquote a) 3)
 */
export declare function evaluateQuasiQuoteExpand(node: types.AstNode, _env: env.Env): types.ContinueReturn;
/**
 * `quasiquote` or `\`` special form.
 * @summary Quasi-quotes an AST, allowing selective unquoting.
 * @param node - The AST containing the quasiquote expression.
 * @param appEnv - The environment where the AST should be evaluated.
 * @returns An object that directs the response in the main loop.
 * @example `(1 ~(+ 1 2) 3) => (1 3 3)
 */
export declare function evaluateQuasiQuote(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `defmacro` special form defines a macro - a user-defined special form.
 * @description Macros enable functions to change code before it's evaluated.
 * @param node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), the name of the
 * macro (ast[1] ), and the variable value to be evaluated (ast[2]).
 * @param appEnv - The environment where the AST should be evaluated.
 * @returns A copy of the function with its isMacro property set to true.
 * @example (defmacro! one (fn* () 1)) (one) ;=> 1
 */
export declare function evaluateDefMacro(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `do` special form evaluates each item in a list and return the last item.
 * @param node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]). Any remaining
 * items (ast[1]..ast[n]) are treated as expressions and evaluated.
 * @param appEnv - The environment where the AST should be evaluated.
 * @returns The last expression in the list of evaluated expressions.
 * @example (do (prn 102) 7)
 * - (prn 102): First action, prints '102'.
 * - 7: Second action, returns '7'.
 */
export declare function evaluateDo(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `try` special form - Evaluate a try/catch expression.
 * @param node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), the expression
 * to evaluate (ast[1]), the catch function (ast[2]). `catch*` is documented
 * in core.ts, but briefly, it should contain the name of the error, and
 * an expression to evaluate.
 * @param appEnv - The current environment.
 * @returns A ContinueReturn object with the result of evaluating the try/catch.
 * @throws An exception if the error does not match the expected message.
 * @example A basic `try*`/`catch*`
 * ```clj
 * (try* abc (catch* exc (prn "exc is:" exc)))
 * ;/"exc is:" "'abc' not found"
 * ;=>nil
 * ```
 */
export declare function evaluateTry(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `if` special form evaluates a condition and returns either a `then`
 * expression or an optional `else` expression.
 * @param node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), a condition
 * expression to evaluate (ast[1]), a `then` expression (ast[2]), and optionally
 * an `else` expression (ast[3]).
 * @param appEnv - The environment where the AST should be evaluated.
 * @returns When the condition is true, the "then" expression is returned.
 * If the expression is false and there is an "else" condition, the else
 * condition will be returned. If an `else` expression is not given, the nil
 * will be returned.
 * @example A simple if-then-else expression
 * ```clj
 * (if (list 1 2 3) 7 8)
 * ;=>true
 * ```
 * - (list 1 2 3) is the test expression (always true for non-empty list).
 * - 7: Expression if test is true.
 * - 8: Expression if test is false (unused here).
 */
export declare function evaluateIf(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `fn*` special form defines an anonymous function.
 * @param node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), the bindings,
 * which are argument names (ast[1]), the function body (ast[2]), and the
 * arguments which should be passed into the function (ast[3]).
 * @param appEnv - The environment to pass along with the function, which
 * provides the correct evaluation context later on when the function is called.
 * @returns A function closure with additional metadata which contains the
 * ast (body expression), the env, and the parameters to pass to the function.
 * @example A simple function
 * ```clj
 * ((fn* (a b) (+ b a)) 3 4)
 * ```
 * - (a b): Parameters of the function.
 * - (+ b a): Function body.
 * - 3 4: Args passed to the function.
 */
export declare function evaluateFn(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * `apply` special form (default ase).
 * @summary Execute a function with arguments or return its meta if present.
 * @param node - A list that contains a function (ast[0]) and arguments to to
 * pass to the function (args[1]..args[n]).
 * @param appEnv - The environment to evaluate the list in, but not the
 * function itself. The function will be evaluated against its own environment.
 * @returns The ast and function environment when there is metadata, the result
 * of evaluating the expression, or the ast if it is not a function.
 * @example No example given.
 */
export declare function evaluateApply(node: types.AstNode, appEnv: env.Env): types.ContinueReturn;
/**
 * The PRINT step of the READ-EVAL-PRINT-LOOP
 * Prints the string representation of an AST node.
 * @param value - The AST node to print.
 * @returns The string representation of the AST node.
 * @example Calling print
 * ```ts
 * print(makeList([makeSym("+"), makeNum(1), makeNum(2)]))
 * //=>(+ 1 2)
 * ```
 */
export declare function print(value: types.AstNode): string;
/**
 * The read-eval-print (rep) function handles everything except looping (to receive input).
 * @param input - User input from the command line.
 * @param appEnv - The environment which contains all of the core functions.
 * @returns An evaluated and stringified AST.
 * @example No example given.
 */
export declare function rep(input: string, appEnv: env.Env): string;
/**
 * Initializes the REPL environment with built-in functions and macros.
 * Loads in the core functions and macros; defines the not, load-file, and cond
 * macros using MAL for later use.
 * @returns The initialized REPL environment.
 * @example No example given.
 */
export declare function initEnv(): env.Env;
