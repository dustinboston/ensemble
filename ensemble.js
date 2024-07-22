import { Env } from "./env.js";
import * as printer from "./printer.js";
import * as reader from "./reader.js";
import { copy, ns } from "./core.js";

/**
 * @typedef {*} Ast
 */

let showTrace = true;

/**
 * The READ step of the READ-EVAL-PRINT-LOOP.
 * Reads in code and converts it into an AST representation.
 * @param {string} malCode - The raw MAL code to convert into an AST.
 * @returns An AST that represents the code.
 * @example
 * ```typescript
 * read("(+ 1 2)");
 * //=>["(", "+", 1, "2", ")"]
 * ```
 */
export function read(malCode) {
    const ast = reader.readString(malCode);
    return ast;
}
/**
 * Transforms a quasi-quoted AST node into its expanded form.
 * @description Expands quasi-quotes by replacing certain prefixes with their
 * evaluated forms. `unquote` (~) evaluates the following element and replaces
 * it inline. `splice-Unquote` (~@) evaluates the following list and splices
 * its content into the containing list.
 * @param {Ast} node - The AST node to be quasi-quoted.
 * @returns {Ast} The expanded AST, which can include "list", "concat",
 * "quote" or other forms based on the quasi-quoting rules.
 * @example Using "unquote" (~)
 * (quasiquote (~a b)) ;=> (list a b)
 * @example Using "unquote" shorthand
 * `(~a b) //=> (list a b)
 * @example Using "splice-unquote" (~@)
 * (quasiquote (~@a b)) ;=> (concat a b)
 * @example Using "splice-unquote" shorthand
 * `(~@a b)  =>  (concat a b)
 */
export function quasiquote(node) {
    const isQuotableNode = (node !== null && typeof node === "object") || typeof node === "symbol";
    if (isQuotableNode) {
        return [Symbol.for("quote"), node];
    }
    if (!Array.isArray(node)) {
        return node;
    }
    // Is the first child node the "unquote" symbol
    const firstValueIsUnquote = node.at(0) === Symbol.for("unquote");
    if (firstValueIsUnquote) {
        return node.at(1);
    }
    /** @type {*[]} */
    let result = [];
    for (let i = node.length - 1;i >= 0;i--) {
        const element = node[i];
        result = element.at(0) === Symbol.for("splice-unquote")
            ? [
                Symbol.for("concat"),
                element.at(1),
                result,
            ]
            : [
                Symbol.for("cons"),
                quasiquote(element),
                result,
            ];
    }
    return result;
}
/**
 * Determines if a given AST node represents a macro call.
 * Type guards the response as a List that begins with a Symbol.
 * @param {Ast} ast - The AST node to check.
 * @param {Env} appEnv - The environment in which to look for macros.
 * @returns {boolean} True if the AST node is a macro call, false otherwise.
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
export function isMacroCall(ast, appEnv) {
    if (!Array.isArray(ast) || typeof ast.at(0) !== 'symbol') {
        return false;
    }
    /** @type {symbol} */
    const symbol = ast.at(0);
    const foundEnv = appEnv.find(symbol);
    if (foundEnv === null) {
        return false;
    }
    const fn = foundEnv.get(symbol);
    if (typeof fn !== 'function') {
        return false;
    }
    return fn.isMacro;
}
/**
 * Expands macros in the given AST within the scope of the provided environment.
 * @description This function will repeatedly expand any macro calls found in
 * the AST until no more macro calls are found.
 * @param {Ast} ast - The Abstract Syntax Tree to be expanded.
 * @param {Env} appEnv - The environment in which the AST is to be evaluated.
 * @returns {Ast} The fully expanded AST.
 * @example
 * ```typescript
 * const appEnv = new env.Env();
 * const ast = new List([new Sym('a_macro'), new Sym('a')]);
 * const expandedAst = macroExpand(ast, appEnv);
 * ```
 */
export function macroExpand(ast, appEnv) {
    let resultAst = ast;
    while (isMacroCall(resultAst, appEnv)) {
        const list = resultAst;
        const symbol = list.at(0);
        const fn = appEnv.get(symbol);
        resultAst = fn.value(...list.slice(1));
    }
    return resultAst;
}
/**
 * Evaluates an Abstract Syntax Tree (AST) within a given environment.
 * @description Evaluates sequential types.
 * - If the AST is a symbol, returns its value from the environment.
 * - If it's an array, evaluates each element.
 * - If it's an object literal, evaluates each value.
 * - Otherwise, returns the input AST as-is.
 * @param {Ast} node - The AST to evaluate.
 * @param {Env} appEnv - The environment within which to evaluate the AST.
 * @returns {Ast} The evaluated AST.
 * @example Returns the value for a symbol.
 * ```ts
 * const x = makeSym('x');
 * appEnv.set(x, makeNum(1));
 * evalAst(x, appEnv);
 * //=>1
 * ```
 */
export function evaluateAst(node, appEnv) {
    if (showTrace) console.log(`evaluateAst: ${print(node)}`);

    if (typeof node === 'symbol') {
        if (showTrace) console.log(`evaluateAst found symbol.`);
        console.log(appEnv);
        return appEnv.get(node);
    }
    if (Array.isArray(node)) {
        if (showTrace) console.log(`evaluateAst found array.`);
        return node.map((v) => evaluate(v, appEnv));
    }
    if (node !== null && typeof node === 'object') {
        if (showTrace) console.log(`evaluateAst found object literal.`);
        /** @type {Record<string, *>} */
        const evaluated = {};
        for (const [key, value] of Object.entries(node)) {
            evaluated[key] = evaluate(value, appEnv);
        }
        return evaluated;
    }

    if (showTrace) console.log(`evaluateAst fell through: ${print(node)}`);

    return node;
}
/**
 * Evaluates an AST within a given environment.
 * @param {Ast} node - The AST to evaluate.
 * @param {Env} appEnv - The environment within which to evaluate the AST.
 * @returns {Ast} The result of evaluating the AST.
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
export function evaluate(node, appEnv) {
    for (;;) {
        if (showTrace) console.log(`evaluate: ${print(node)}`);

        if (!Array.isArray(node) || node.length === 0) {
            if (showTrace) console.log(`Evaluate node is not an array.`);
            return evaluateAst(node, appEnv);
        }
        node = macroExpand(node, appEnv);
        if (!Array.isArray(node) || node.length === 0) {
            if (showTrace) console.log(`Evaluate node is not an array (2).`);
            return evaluateAst(node, appEnv);
        }
        const symbolValue = typeof node.at(0) === 'symbol'
            ? node.at(0)
            : "goto_default_clause";

        if (showTrace) console.log(`Found symbolValue: ${print(symbolValue)}`);

        let result;
        switch (symbolValue) {
            case Symbol.for("global"): {
                // Return
                if (showTrace) console.log(`global: ${print(node)}`);
                result = evaluateDef(node, appEnv);
                break;
            }
            case Symbol.for("const"):
            case Symbol.for("let"): {
                // Continue, tail-call
                if (showTrace) console.log(`const/let: ${print(node)}`);
                result = evaluateLet(node, appEnv);
                break;
            }
            case Symbol.for("quote"): {
                // Return
                if (showTrace) console.log(`quote: ${print(node)}`);
                result = evaluateQuote(node, appEnv);
                break;
            }
            // Only for testing quasiquote
            case Symbol("quasiquoteexpand"): {
                // Return
                if (showTrace) console.log(`quasiquoteexpand: ${print(node)}`);
                result = evaluateQuasiQuoteExpand(node, appEnv);
                break;
            }
            case Symbol.for("quasiquote"): {
                // Continue, tail-call
                if (showTrace) console.log(`quasiquote: ${print(node)}`);
                result = evaluateQuasiQuote(node, appEnv);
                break;
            }
            case Symbol.for("defmacro!"): {
                // Return
                if (showTrace) console.log(`defmacro: ${print(node)}`);
                result = evaluateDefMacro(node, appEnv);
                break;
            }
            case Symbol.for("macroexpand"): {
                // Return
                if (showTrace) console.log(`macroexpand: ${print(node)}`);
                result = {
                    continue: undefined,
                    return: macroExpand(node.at(1), appEnv)
                };
                break;
            }
            case Symbol.for("try"): {
                // Return
                if (showTrace) console.log(`try: ${print(node)}`);
                result = evaluateTry(node, appEnv);
                break;
            }
            case "do": {
                // Continue, Tail-call
                if (showTrace) console.log(`do: ${print(node)}`);
                result = evaluateDo(node, appEnv);
                break;
            }
            case "if": {
                // Return
                if (showTrace) console.log(`if: ${print(node)}`);
                result = evaluateIf(node, appEnv);
                break;
            }
            case "=>":
            case "function": {
                // Return
                if (showTrace) console.log(`function: ${print(node)}`);
                result = evaluateFn(node, appEnv);
                break;
            }
            default: {
                if (showTrace) console.log(`default: ${print(node)}`);
                result = evaluateApply(node, appEnv);
            }
        }
        if (result.return) {
            return result.return;
        } else if (result.continue) {
            // Tail-call optimization, updates ast and appEnv, then continues
            node = result.continue.ast;
            appEnv = result.continue.env;
        } else {
            throw new Error(`Invalid TCO return value: ${JSON.stringify(result)} for ${JSON.stringify(node)}`);
        }
    }
}
/**
 * `def!` special form defines a global var and binds it to a value.
 * @param {*[]} node - A List that contains the `def!` symbol (ast[0]), a symbol that
 * represents the variable name (ast[1]), and the value that will be evaluated
 * against the appEnv (ast[2]).
 * Sym/Ast pairs that will be loaded into the environment.
 * @param {Env} appEnv - The environment where the AST should be evaluated.
 * @returns The evaluated value.
 * @example A basic def! example
 * ```clj
 * (def! y (+ 1 7))
 * ;=> 3
 * ```
 * - y is the variable name
 * - (+ 1 7) is the value to assign to 'y'.
 */
export function evaluateDef(node, appEnv) {
    if (!Array.isArray(node) || node.length !== 3 || typeof node.at(0) !== 'symbol') {
        throw new Error("Invalid global");
    }
    const variableName = node.at(1);
    const variableValue = node.at(2);
    const evaluatedValue = evaluate(variableValue, appEnv);
    return {
        continue: undefined,
        return: appEnv.set(variableName, evaluatedValue),
    };
}
/**
 * `let*` special form defines vars and binds them to values in a new scope.
 * @param {*[]} node - A List that contains a `let*` symbol and a List of alternating
 * SymbolNode/AstNode pairs that will be loaded into the environment.
 * @param {Env} appEnv - The environment where the bindings will be added, and where
 * the function should be evaluated.
 * @returns A ContinueReturn objects that directs the response in the main loop.
 * @example (let* (c 2) c)
 * - (c 2) is a list var name/value pairs called bindings
 * - c is the function body where bindings are active (scope).
 */
export function evaluateLet(node, appEnv) {
    if (!Array.isArray(node) || node.length !== 3 || typeof node.at(0) !== 'symbol') {
        throw new Error("Invalid 'let' or 'const'");
    }
    const bindings = node.at(1);
    const bindingsCount = bindings.value.length;
    const letEnv = new Env(appEnv);
    for (let i = 0;i < bindingsCount;i += 2) {
        const varName = bindings.at(i);
        const varExpr = bindings.at(i + 1);
        const varValue = evaluate(varExpr, letEnv);
        letEnv.set(varName, varValue);
    }
    return {
        continue: { ast: node.at(2), env: letEnv },
        return: undefined,
    };
}
/**
 * `quote` or `'` special form.
 * @summary Wraps an AST value to prevent evaluation.
 * @param {Ast} node - The AST to be quoted.
 * @param {Env} _env - The environment is unused by this form.
 * @returns An object that directs the response in the main loop.
 * @example (quote (+ 1 2)) => (+ 1 2)
 * @example '(+ 1 2) => (+ 1 2)
 */
export function evaluateQuote(node, _env) {
    if (!Array.isArray(node) || node.length !== 2 || node.at(0) !== Symbol.for("quote")) {
        throw new Error("Invalid 'quote' form");
    }
    return {
        continue: undefined,
        return: node.at(1),
    };
}
/**
 * `quasiquoteexpand` special form.
 * @summary Expands quasi-quoted code without evaluating.
 * @param {Ast} node - The AST containing the quasiquote expression.
 * @param {Env} _env - The environment is unused by this form.
 * @returns An object that directs the response in the main loop.
 * @example `(1 ~a 3) => (1 (unquote a) 3)
 */
export function evaluateQuasiQuoteExpand(node, _env) {
    if (!Array.isArray(node) || node.length !== 2 || node.at(0) !== Symbol.for("quasiquoteexpand")) {
        throw new Error("Invalid 'quasiquoteexpand' form");
    }
    return {
        continue: undefined,
        return: quasiquote(node.at(1))
    };
}
/**
 * `quasiquote` or `\`` special form.
 * @summary Quasi-quotes an AST, allowing selective unquoting.
 * @param {Ast} node - The AST containing the quasiquote expression.
 * @param {Env} appEnv - The environment where the AST should be evaluated.
 * @returns An object that directs the response in the main loop.
 * @example `(1 ~(+ 1 2) 3) => (1 3 3)
 */
export function evaluateQuasiQuote(node, appEnv) {
    if (!Array.isArray(node) || node.length !== 2 || node.at(0) !== Symbol.for("quasiquote")) {
        throw new Error("Invalid 'quasiquote' form");
    }
    const resultAst = quasiquote(node.at(1));
    return {
        continue: { ast: resultAst, env: appEnv },
        return: undefined,
    };
}
/**
 * `defmacro` special form defines a macro - a user-defined special form.
 * @description Macros enable functions to change code before it's evaluated.
 * @param {*[]} node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), the name of the
 * macro (ast[1] ), and the variable value to be evaluated (ast[2]).
 * @param {Env} appEnv - The environment where the AST should be evaluated.
 * @returns A copy of the function with its isMacro property set to true.
 * @example (defmacro! one (fn* () 1)) (one) ;=> 1
 */
export function evaluateDefMacro(node, appEnv) {
    if (!Array.isArray(node) || node.length !== 3 || node.at(0) !== Symbol.for("defmacro!")) {
        throw new Error("Invalid 'defmacro!' form");
    }
    const variableName = node.at(1);
    const variableValue = node.at(2);
    const evaluatedValue = evaluate(variableValue, appEnv);
    const copiedValue = copy(evaluatedValue);
    if (typeof copiedValue === 'function') {
        copiedValue.isMacro = true;
    }

    return {
        continue: undefined,
        return: appEnv.set(variableName, copiedValue),
    };
}

/**
 * `do` special form evaluates each item in a list and return the last item.
 * @param {*[]} node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]). Any remaining
 * items (ast[1]..ast[n]) are treated as expressions and evaluated.
 * @param {Env} appEnv - The environment where the AST should be evaluated.
 * @returns The last expression in the list of evaluated expressions.
 * @example (do (prn 102) 7)
 * - (prn 102): First action, prints '102'.
 * - 7: Second action, returns '7'.
 */
export function evaluateDo(node, appEnv) {
    if (!Array.isArray(node) || node.length < 1 || node.at(0) !== Symbol.for("do")) {
        throw new Error("Invalid 'do' form");
    }
    // Process all arguments sequentially and keep the last one
    let lastResult = null;
    for (let i = 1;i < node.length;i++) {
        lastResult = evaluate(node.at(i), appEnv);
    }
    return {
        continue: { ast: lastResult, env: appEnv },
        return: undefined
    };
}
/**
 * `try` special form - Evaluate a try/catch expression.
 * @param {*[]} node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), the expression
 * to evaluate (ast[1]), the catch function (ast[2]). `catch*` is documented
 * in core.ts, but briefly, it should contain the name of the error, and
 * an expression to evaluate.
 * @param {Env} appEnv - The current environment.
 * @returns A ContinueReturn object with the result of evaluating the try/catch.
 * @throws An exception if the error does not match the expected message.
 * @example A basic `try*`/`catch*`
 * ```clj
 * (try* abc (catch* exc (prn "exc is:" exc)))
 * ;/"exc is:" "'abc' not found"
 * ;=>nil
 * ```
 */
export function evaluateTry(node, appEnv) {
    if (!Array.isArray(node) ||
        node.length < 2 ||
        node.length > 3 ||
        node.at(0) !== Symbol.for("try") ||
        node.at(1) === undefined) {
        throw new Error("Invalid 'try' form");
    }
    if (node.at(2)) {
        if (!Array.isArray(node.at(2)) ||
            node.at(2).length !== 3 ||
            node.at(2).at(0) !== Symbol.for("catch")) {
            throw new Error("Invalid 'catch' form");
        }
    }
    try {
        const evaluated = evaluate(node.at(1), appEnv);
        return {
            return: evaluated,
            continue: undefined,
        };
    } catch (error) {
        if (!node.at(2)) {
            throw error;
        }
        const sym = node.at(2).at(1);
        const list = node.at(2).at(2);
        const message = (error instanceof Error) ? error.message : JSON.stringify(error);
        const caught = new Error(message);
        const errorEnv = new Env([], appEnv, [sym], [caught]);
        return {
            return: evaluate(list, errorEnv),
            continue: undefined
        };
    }
}
/**
 * `if` special form evaluates a condition and returns either a `then`
 * expression or an optional `else` expression.
 * @param {*[]} node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), a condition
 * expression to evaluate (ast[1]), a `then` expression (ast[2]), and optionally
 * an `else` expression (ast[3]).
 * @param {Env} appEnv - The environment where the AST should be evaluated.
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
export function evaluateIf(node, appEnv) {
    if (!Array.isArray(node) ||
        node.length < 3 ||
        node.length > 4 ||
        node.at(0) !== Symbol.for("if") ||
        node.at(1) === undefined) {
        throw new Error("Invalid 'if' form");
    }

    const condition = node.at(1);
    const result = evaluate(condition, appEnv);

    if (result) {
        const thenExpr = node.at(2);
        return {
            continue: { ast: thenExpr, env: appEnv },
            return: undefined,
        };
    }
    if (node.at(3) !== undefined) {
        const elseExpr = node.at(3);
        return {
            continue: { ast: elseExpr, env: appEnv },
            return: undefined,
        };
    }
    return {
        continue: undefined,
        return: null,
    };
}
/**
 * `fn*` special form defines an anonymous function.
 * @param {*[]} node - A list that provides the arguments to the function. The Ast
 * should contain the symbol for this special form (ast[0]), the bindings,
 * which are argument names (ast[1]), the function body (ast[2]), and the
 * arguments which should be passed into the function (ast[3]).
 * @param {Env} appEnv - The environment to pass along with the function, which
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
export function evaluateFn(node, appEnv) {
    if (!Array.isArray(node) || node.length !== 3 || node.at(0) !== Symbol.for("function")) {
        throw new Error("Invalid 'function' form");
    }

    const parameters = node.at(1);
    const bodyExpr = node.at(2);
    const outerEnv = appEnv;
    const closureMeta = {
        ast: bodyExpr,
        env: outerEnv,
        parameters,
    };
    const fn = (/** @type {*[]} */...args) => {
        const fnEnv = new Env(outerEnv, parameters, args);
        return evaluate(bodyExpr, fnEnv);
    };
    fn.closureMeta = closureMeta;
    fn.isMacro = false;
    /** @type {*} */
    fn.meta = null;

    return {
        continue: undefined,
        return: fn,
    };
}
/**
 * `apply` special form (default ase).
 * @summary Execute a function with arguments or return its meta if present.
 * @param {*[]} node - A list that contains a function (ast[0]) and arguments to to
 * pass to the function (args[1]..args[n]).
 * @param {Env} appEnv - The environment to evaluate the list in, but not the
 * function itself. The function will be evaluated against its own environment.
 * @returns The ast and function environment when there is metadata, the result
 * of evaluating the expression, or the ast if it is not a function.
 * @example No example given.
 */
export function evaluateApply(node, appEnv) {
    const evaluatedList = evaluateAst(node, appEnv);
    if (!Array.isArray(evaluatedList) || evaluatedList.length < 1) {
        throw new Error("Invalid 'apply' form");
    }
    const fn = evaluatedList.at(0);
    if (typeof fn === "function") {
        const args = evaluatedList.slice(1);
        if (fn.closureMeta) {
            const ast = fn.closureMeta.ast;
            const fnEnv = new Env(fn.closureMeta.env, fn.closureMeta.parameters, args);
            return {
                continue: { ast, env: fnEnv },
                return: undefined
            };
        }
        const called = fn(...args);
        return {
            return: called,
            continue: undefined
        };
    }
    return {
        return: fn,
        continue: undefined
    };
}
/**
 * The PRINT step of the READ-EVAL-PRINT-LOOP
 * Prints the string representation of an AST node.
 * @param {Ast} value - The AST node to print.
 * @returns {string} The string representation of the AST node.
 * @example Calling print
 * ```ts
 * print(makeList([makeSym("+"), makeNum(1), makeNum(2)]))
 * //=>(+ 1 2)
 * ```
 */
export function print(value) {
    return printer.printString(value, true);
}
/**
 * The READ-EVAL-PRINT or REP handles everything expect the LOOP part of REPL.
 * @param {string} input - User input from the command line.
 * @param {Env|undefined} appEnv - The environment which contains all of the core functions.
 * @returns {string} An evaluated and stringified AST.
 * @example No example given.
 */
export function rep(input, appEnv) {
    const env = appEnv ?? initEnv();
    return print(evaluate(read(input), env));
}
/**
 * Initializes the REPL environment with built-in functions and macros.
 * Loads in the core functions and macros; defines the not, load-file, and cond
 * macros using MAL for later use.
 * @returns The initialized REPL environment.
 */
export function initEnv() {
    const replEnv = new Env(ns);
    if (showTrace) {
        for (const [key, value] of replEnv.entries()) {
            console.log(String(key), print(value));
        }
    }

    // Eval treats mal-data as a mal program
    replEnv.set(Symbol.for("eval"), (/** @type {*[]} */...args) => {
        if (args.length !== 1) {
            throw new Error("Invalid 'eval' form");
        }
        return evaluate(args[0], replEnv);
    });

    /* TODO: Use definition in core */
    // rep("(def! not (fn* (a) (if a false true)))", replEnv);
    // rep(`(def! load-file
    //     (fn* (f)
    //         (eval (read-string (str "(do " (slurp f) "\nnil)")))))`, replEnv);
    // rep(`(defmacro! cond (fn* (& xs)
    //     (if (> (count xs) 0)
    //         (list 'if (first xs)
    //             (if (> (count xs) 1)
    //                 (nth xs 1)
    //                 (throw "odd number of forms to cond"))
    //             (cons 'cond (rest (rest xs)))))))`, replEnv);
    return replEnv;
}


