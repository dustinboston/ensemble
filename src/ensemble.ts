/**
 * @file Step A is the final iteration which enables self-hosting of the
 * language. Additionally, it adds the core functions: meta, with-meta, the
 * reader macro (^), time-ms, conj, string?, number?, fn?, macro?, and seq,.
 */
import * as core from '@/core.ts';
import * as env from '@/env.ts';
import * as html from '@/interop/html.ts';
import * as js from '@/interop/js.ts';
import * as printer from '@/printer.ts';
import * as reader from '@/reader.ts';
import * as types from '@/types.ts';

export type TryCatchAst = types.ListNode & {
  value: [
    types.SymWithValue<'try*' | 'try'>,
    types.AstNode,
    types.ListNode & {
      value: [types.SymWithValue<'catch*' | 'catch'>, types.AstNode];
    },
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
export function assertTryCatch(a: types.AstNode): asserts a is TryCatchAst {
  types.assertListNode(a);
  types.assertVariableArgumentCount(a.value.length, 2, 3);
  const symbolNode = a.value[0];
  types.assertSymbolNode(symbolNode);
  if (symbolNode.value !== 'try' && symbolNode.value !== 'try*') {
    throw new Error('use `try` or `try*` in try/catch expressions');
  }
  // assertSymWithValue(a.value[0], 'try*');
  types.assertAstNode(a.value[1]);
  if (a.value[2]) {
    types.assertListNode(a.value[2]);
    types.assertArgumentCount(a.value[2].value.length, 3);
    types.assertSymbolNode(a.value[2].value[0]);
    const catchNode = a.value[2].value[0];
    if (catchNode.value !== 'catch' && catchNode.value !== 'catch*') {
      throw new Error('use `catch` or `catch*` in try/catch expressions');
    }
    types.assertSymbolNode(a.value[2].value[1]);
    types.assertAstNode(a.value[2].value[2]);
  }
}

export type DefAst = types.ListNode & {
  value: [
    types.SymWithValue<'def!' | 'globalThis' | 'var'>,
    types.SymbolNode | types.StringNode | types.KeywordNode,
    types.AstNode,
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
export function assertDef(a: types.AstNode): asserts a is DefAst {
  types.assertListNode(a); // (...)
  types.assertArgumentCount(a.value.length, 3); // (1 2 3)
  types.assertSymbolNode(a.value[0]); // (sym 2 3)
  // assertSymWithValue(a.value[0], "def!"); // '(def! 2 3)
  const symbolNode = a.value[0];
  if (
    symbolNode.value !== 'def!' &&
    symbolNode.value !== 'globalThis' &&
    symbolNode.value !== 'var'
  ) {
    throw new Error('use `def!`, `globalThis`, or `var` in def! expressions');
  }
  types.assertMapKeyNode(a.value[1]); // (def! DictKeys 3)
  types.assertAstNode(a.value[2]); // (def! DictKeys Ast)
}

export type LetAst = types.ListNode & {
  value: [
    types.SymWithValue<'let*' | 'let' | 'const'>,
    (types.VectorNode | types.ListNode) & {
      value: Array<types.SymbolNode | types.AstNode>;
    },
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
export function assertLet(a: types.AstNode): asserts a is LetAst {
  types.assertListNode(a); // (...)
  types.assertArgumentCount(a.value.length, 3); // (1 2 3)
  types.assertSymbolNode(a.value[0]); // (sym 2 3)
  // assertSymWithValue(a.value[0], "let*"); // (let* 2 3)
  const symbolNode = a.value[0];
  if (
    symbolNode.value !== 'let*' &&
    symbolNode.value !== 'let' &&
    symbolNode.value !== 'const'
  ) {
    throw new Error('use `let*`, `let`, or `const` in let* expressions');
  }
  types.assertSequential(a.value[1]); // (let* Seq 3)
  types.assertAstNode(a.value[2]); // (let* Seq Ast)
  types.assertEvenArgumentCount(a.value[1].value.length); // (let* (any*2) Ast)
  for (let i = 0; i < a.value[1].value.length; i += 2) {
    types.assertSymbolNode(a.value[1].value[i]); // (let* ((Sym any)*) Ast)
    types.assertAstNode(a.value[1].value[i + 1]); // (let* ((Sym Ast)*) Ast)
  }
}

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
export function assertQuote(a: types.AstNode): asserts a is QuoteAst {
  types.assertListNode(a); // (...)
  types.assertArgumentCount(a.value.length, 2); // (1 2)
  types.assertSymbolNode(a.value[0]); // (sym 2)
  types.assertSymWithValue(a.value[0], 'quote'); // '(quote 2)
  types.assertAstNode(a.value[1]); // (quote Ast)
}

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
export function assertQuasiQuoteExpand(
  a: types.AstNode,
): asserts a is QuasiQuoteExpandAst {
  const symbol = 'quasiquoteexpand';
  types.assertListNode(a); // (...)
  types.assertArgumentCount(a.value.length, 2); // (1 2)
  types.assertSymbolNode(a.value[0]); // (sym 2)
  types.assertSymWithValue(a.value[0], symbol); // '(quasiquoteexpand 2)
  types.assertAstNode(a.value[1]); // (quasiquoteexpand Ast)
}

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
export function assertQuasiQuote(a: types.AstNode): asserts a is QuasiQuoteAst {
  const symbol = 'quasiquote';
  types.assertListNode(a); // (...)
  types.assertArgumentCount(a.value.length, 2); // (1 2)
  types.assertSymbolNode(a.value[0]); // (sym 2)
  types.assertSymWithValue(a.value[0], symbol); // '(quasiquote 2)
  types.assertAstNode(a.value[1]); // (quasiquote Ast)
}

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
export function assertDefMacro(a: types.AstNode): asserts a is DefMacroAst {
  const symbol = 'defmacro!';
  types.assertListNode(a); // (...)
  types.assertArgumentCount(a.value.length, 3); // (1 2 3)
  types.assertSymbolNode(a.value[0]); // (sym 2 3)
  types.assertSymWithValue(a.value[0], symbol); // '(defmacro! 2 3)
  types.assertMapKeyNode(a.value[1]); // (defmacro! DictKeys 3)
  types.assertAstNode(a.value[2]); // (defmacro! DictKeys Ast)
}

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
export function assertDo(a: types.AstNode): asserts a is DoAst {
  const symbol = 'do';
  types.assertListNode(a); // (...)
  types.assertMinimumArgumentCount(a.value.length, 1); // (1 n*)
  types.assertSymbolNode(a.value[0]); // (sym 2)
  types.assertSymWithValue(a.value[0], symbol); // (do n*)
  for (const node of a.value.slice(1)) {
    types.assertAstNode(node); // (do ast*)
  }
}

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
export function assertIf(a: types.AstNode): asserts a is IfAst {
  const symbol = 'if';
  types.assertListNode(a); // (...)
  types.assertVariableArgumentCount(a.value.length, 3, 4); // (1 2 3 4)
  types.assertSymbolNode(a.value[0]); // (sym 2 3 4)
  types.assertSymWithValue(a.value[0], symbol); // (if 2 3 4)
  types.assertAstNode(a.value[1]); // (if Ast 3 4)
  types.assertAstNode(a.value[2]); // (if Ast Ast 4)
  if (types.isDefined(a.value[3])) {
    types.assertAstNode(a.value[3]); // (if Ast Ast Ast)
  }
}

export type FnAst = types.ListNode & {
  value: [
    types.SymWithValue<'fn*' | 'function' | '=>'>,
    types.Seq & {
      value: types.SymbolNode[];
    },
    types.AstNode,
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
export function assertFn(a: types.AstNode): asserts a is FnAst {
  // (...)
  types.assertListNode(a);
  // (1 2 3)
  types.assertArgumentCount(a.value.length, 3);
  // (sym 2 3)
  types.assertSymbolNode(a.value[0]);
  // (fn* 2 3)
  const symbolNode = a.value[0];
  if (!['fn*', 'function', '=>'].includes(symbolNode.value)) {
    throw new Error('use `fn*`, `function`, of `=>` in fn* expressions');
  }
  // (if Seq 3)
  types.assertSequential(a.value[1]);
  // (if (Sym*) 3)
  types.assertSequentialValues<types.SymbolNode>(a.value[1].value, types.SymbolNode);
  // (if (Sym*) Ast)
  types.assertAstNode(a.value[2]);
}

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
export function read(malCode: string): types.AstNode {
  const ast = reader.readString(malCode);
  // console.log('ast:', ast);
  return ast;
}

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
export function quasiQuote(node: types.AstNode): types.AstNode {
  const isQuotableNode = types.isMapNode(node) ||
    types.isSymbolNode(node);

  if (isQuotableNode) {
    return types.createListNode([types.createSymbolNode('quote'), node]);
  }

  if (!types.isSequentialNode(node)) {
    return node;
  }

  // Is the first child node the "unquote" symbol
  const firstValueIsUnquote = types.listStartsWithSymbol(node, 'unquote');
  if (firstValueIsUnquote) {
    return node.value[1];
  }

  let result = types.createListNode([]);
  for (let i = node.value.length - 1; i >= 0; i--) {
    const element = node.value[i];
    result = types.listStartsWithSymbol(element, 'splice-unquote')
      ? types.createListNode([
        types.createSymbolNode('concat'),
        element.value[1],
        result,
      ])
      : types.createListNode([
        types.createSymbolNode('cons'),
        quasiQuote(element),
        result,
      ]);
  }

  if (types.isVectorNode(node)) {
    result = types.createListNode([types.createSymbolNode('vec'), result]);
  }

  return result;
}

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
export function isMacroCall(
  ast: types.AstNode,
  appEnv: env.Env,
): ast is types.ListNode & { value: [types.SymbolNode] } {
  if (
    !(types.isListNode(ast)) ||
    !(ast.value[0] instanceof types.SymbolNode)
  ) {
    return false;
  }

  const symbol = ast.value[0];
  const foundEnv = appEnv.findEnv(symbol);
  if (!types.isDefined<env.Env>(foundEnv)) {
    return false;
  }

  const fn = foundEnv.get(symbol);
  if (!(types.isFunctionNode(fn))) {
    return false;
  }

  return fn.isMacro;
}

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
export function macroExpand(
  ast: types.AstNode,
  appEnv: env.Env,
): types.AstNode {
  let resultAst = ast;
  while (isMacroCall(resultAst, appEnv)) {
    const list = resultAst;
    const symbol = list.value[0];
    const fn = appEnv.get(symbol) as types.FunctionNode;
    resultAst = fn.value(...list.value.slice(1));
  }

  return resultAst;
}

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
export function evaluateAst(
  node: types.AstNode,
  appEnv: env.Env,
): types.AstNode {
  if (types.isSymbolNode(node)) {
    return appEnv.get(node);
  }

  if (types.isVectorNode(node)) {
    const evaluated = node.value.map((v) => evaluate(v, appEnv));
    return types.createVectorNode(evaluated);
  }

  if (types.isListNode(node)) {
    const evaluated = node.value.map((v) => evaluate(v, appEnv));
    return types.createListNode(evaluated);
  }

  if (types.isMapNode(node)) {
    const evaluated = new Map<string, types.AstNode>();
    for (const [key, value] of node.value.entries()) {
      evaluated.set(key, evaluate(value, appEnv));
    }

    return types.createMapNode(evaluated);
  }

  if (types.isDomNode(node)) {
    const tagName = node.value;
    const attributes = Array.from(node.attributes).reduce(
      (map, [key, value]) => map.set(key, evaluate(value, appEnv)),
      new Map<string, types.AstNode>(),
    );
    const children = node.children.map((child) => evaluate(child, appEnv));

    return types.createDomNode(tagName, attributes, children);
  }

  return node;
}

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
export function evaluate(node: types.AstNode, appEnv: env.Env): types.AstNode {
  for (;;) {
    // console.log(`eval: ${print(node)}`);

    if (types.isListNode(node) === false) {
      return evaluateAst(node, appEnv);
    }

    if (node.value.length === 0) {
      return node;
    }

    node = macroExpand(node, appEnv);

    if (types.isListNode(node) === false) {
      return evaluateAst(node, appEnv);
    }

    if (node.value.length === 0) {
      return node;
    }

    const symbolValue = types.isSymbolNode(node.value[0]) ? node.value[0].value : 'goto_default_clause';
    let result: types.ContinueReturn;

    switch (symbolValue) {
      // "`var` statements and function declarations at the top level of
      // a script create properties of the global object."
      // https://developer.mozilla.org/en-US/docs/Glossary/Global_object
      case 'var':
      case 'def!': {
        // Return
        result = evaluateDef(node, appEnv);
        break;
      }

      // "On the other hand, let and const declarations never create
      // properties of the global object."
      // https://developer.mozilla.org/en-US/docs/Glossary/Global_object
      case 'let':
      case 'const':
      case 'let*': {
        // Continue, tail-call
        result = evaluateLet(node, appEnv);
        break;
      }

      case 'quote': {
        // Return
        result = evaluateQuote(node, appEnv);
        break;
      }

      // Only for testing quasiquote
      case 'quasiquoteexpand': {
        // Return
        result = evaluateQuasiQuoteExpand(node, appEnv);
        break;
      }

      case 'quasiquote': {
        // Continue, tail-call
        result = evaluateQuasiQuote(node, appEnv);
        break;
      }

      case 'defmacro!': {
        // Return
        result = evaluateDefMacro(node, appEnv);
        break;
      }

      case 'macroexpand': {
        // Return
        result = types.returnResult(macroExpand(node.value[1], appEnv));
        break;
      }

      case 'try':
      case 'try*': {
        // Return
        result = evaluateTry(node, appEnv);
        break;
      }

      case 'do': {
        // Continue, Tail-call
        result = evaluateDo(node, appEnv);
        break;
      }

      case 'if': {
        // Return
        result = evaluateIf(node, appEnv);
        break;
      }

      case '=>':
      case 'function':
      case 'fn*': {
        // Return
        result = evaluateFn(node, appEnv);
        break;
      }

      default: {
        result = evaluateApply(node, appEnv);
      }
    }

    if (result.return) {
      return result.return;
    }

    // Tail-call optimization, updates ast and appEnv, then continues
    node = result.continue.ast;
    appEnv = result.continue.env;
  }
}

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
export function evaluateDef(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertDef(node);
  const variableName = node.value[1];
  const variableValue = node.value[2];
  const evaluatedValue = evaluate(variableValue, appEnv);
  return types.returnResult(appEnv.set(variableName, evaluatedValue));
}

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
export function evaluateLet(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertLet(node);
  const bindings = node.value[1];
  const bindingsCount = bindings.value.length;
  const letEnv = new env.Env(appEnv);
  for (let i = 0; i < bindingsCount; i += 2) {
    const varName = bindings.value[i] as types.SymbolNode;
    const varExpr = bindings.value[i + 1] as types.AstNode;
    const varValue = evaluate(varExpr, letEnv);
    letEnv.set(varName, varValue);
  }

  return types.continueResult(node.value[2], letEnv);
}

/**
 * `quote` or `'` special form.
 * @summary Wraps an AST value to prevent evaluation.
 * @param node - The AST to be quoted.
 * @param _ - The environment is unused by this form.
 * @returns An object that directs the response in the main loop.
 * @example (quote (+ 1 2)) => (+ 1 2)
 * @example '(+ 1 2) => (+ 1 2)
 */
export function evaluateQuote(
  node: types.AstNode,
  _: env.Env,
): types.ContinueReturn {
  assertQuote(node);
  return types.returnResult(node.value[1]);
}

/**
 * `quasiquoteexpand` special form.
 * @summary Expands quasi-quoted code without evaluating.
 * @param node - The AST containing the quasiquote expression.
 * @param _env - The environment is unused by this form.
 * @returns An object that directs the response in the main loop.
 * @example `(1 ~a 3) => (1 (unquote a) 3)
 */
export function evaluateQuasiQuoteExpand(
  node: types.AstNode,
  _env: env.Env,
): types.ContinueReturn {
  assertQuasiQuoteExpand(node);
  return types.returnResult(quasiQuote(node.value[1]));
}

/**
 * `quasiquote` or `\`` special form.
 * @summary Quasi-quotes an AST, allowing selective unquoting.
 * @param node - The AST containing the quasiquote expression.
 * @param appEnv - The environment where the AST should be evaluated.
 * @returns An object that directs the response in the main loop.
 * @example `(1 ~(+ 1 2) 3) => (1 3 3)
 */
export function evaluateQuasiQuote(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertQuasiQuote(node);
  const resultAst = quasiQuote(node.value[1]);
  return types.continueResult(resultAst, appEnv);
}

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
export function evaluateDefMacro(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertDefMacro(node);
  const variableName = node.value[1];
  const variableValue = node.value[2];
  const evaluatedValue = evaluate(variableValue, appEnv);
  const copiedValue = types.copy(evaluatedValue);
  if (types.isFunctionNode(copiedValue)) {
    copiedValue.isMacro = true;
  }

  return types.returnResult(appEnv.set(variableName, copiedValue));
}

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
export function evaluateDo(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertDo(node);
  // Process all arguments sequentially and keep the last one
  let lastResult: types.AstNode = types.createNilNode();
  for (let i = 1; i < node.value.length; i++) {
    lastResult = evaluate(node.value[i], appEnv);
  }

  return { continue: { ast: lastResult, env: appEnv }, return: undefined };
}

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
export function evaluateTry(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertTryCatch(node);
  try {
    return {
      return: evaluate(node.value[1], appEnv),
      continue: undefined,
    };
  } catch (error) {
    if (!node.value[2]) {
      throw error;
    }

    const sym = node.value[2].value[1] as types.SymbolNode;
    const list = node.value[2].value[2] as types.ListNode;

    let message: types.AstNode;
    if (types.isErrorNode(error)) {
      message = error;
    } else if (error instanceof Error) {
      message = types.createStringNode(error.message);
    } else {
      message = types.createStringNode(JSON.stringify(error));
    }

    const caught = types.createErrorNode(message);
    const errorEnv = new env.Env(appEnv, [sym], [caught]);
    return { return: evaluate(list, errorEnv), continue: undefined };
  }
}

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
export function evaluateIf(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertIf(node);
  const condition = node.value[1];
  const result = evaluate(condition, appEnv);
  if (result.value !== false && result.value !== null) {
    const thenExpr = node.value[2];
    return types.continueResult(thenExpr, appEnv);
  }

  if (node.value[3] !== undefined) {
    const elseExpr = node.value[3];
    return types.continueResult(elseExpr, appEnv);
  }

  return types.returnResult(types.createNilNode());
}

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
export function evaluateFn(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  assertFn(node);
  const parameters = node.value[1].value;
  const bodyExpr = node.value[2];
  const outerEnv = appEnv;
  const closureMeta: types.ClosureMetadata = {
    ast: bodyExpr,
    env: outerEnv,
    parameters,
  };
  const fn = types.createFunctionNode(
    (...args: types.AstNode[]): types.AstNode => {
      const fnEnv = new env.Env(outerEnv, parameters, args);
      // TODO: Check if this should be types.returnResult(evaluate(...))
      return evaluate(bodyExpr, fnEnv);
    },
    closureMeta,
  );
  return types.returnResult(fn);
}

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
export function evaluateApply(
  node: types.AstNode,
  appEnv: env.Env,
): types.ContinueReturn {
  const evaluatedList = evaluateAst(node, appEnv);
  types.assertListNode(evaluatedList);

  const fn = evaluatedList.value[0];
  if (types.isFunctionNode(fn)) {
    const args = evaluatedList.value.slice(1);
    if (fn.closureMeta) {
      const ast = fn.closureMeta.ast;
      const fnEnv = new env.Env(
        fn.closureMeta.env,
        fn.closureMeta.parameters,
        args,
      );
      return { continue: { ast, env: fnEnv }, return: undefined };
    }

    const called = fn.value(...args);
    return { return: called, continue: undefined };
  }

  return { return: fn, continue: undefined };
}

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
export function print(value: types.AstNode): string {
  return printer.printString(value, true);
}

/**
 * The read-eval-print (rep) function handles everything except looping (to receive input).
 * @param input - User input from the command line.
 * @param appEnv - The environment which contains all of the core functions.
 * @returns An evaluated and stringified AST.
 * @example No example given.
 */
export function rep(input: string, appEnv: env.Env): string {
  return print(evaluate(read(input), appEnv));
}

/**
 * Initializes the REPL environment with built-in functions and macros.
 * Loads in the core functions and macros; defines the not, load-file, and cond
 * macros using MAL for later use.
 * @returns The initialized REPL environment.
 * @example No example given.
 */
export function initEnv(): env.Env {
  // Initialize the repl environment
  const replEnv = new env.Env(undefined);

  // Core functions defined with TS
  for (const [coreSymbol, coreFunc] of core.ns.entries()) {
    replEnv.set(coreSymbol, coreFunc);
  }

  // Core JavaScript functions
  for (const [jsSymbol, jsFunc] of js.ns.entries()) {
    replEnv.set(jsSymbol, jsFunc);
  }

  // Core HTML functions
  for (const [htmlSymbol, htmlFunc] of html.ns.entries()) {
    replEnv.set(htmlSymbol, htmlFunc);
  }

  // Eval treats mal-data as a mal program
  replEnv.set(
    types.createSymbolNode('eval'),
    types.createFunctionNode((...args: types.AstNode[]): types.AstNode => {
      types.assertArgumentCount(args.length, 1);
      return evaluate(args[0], replEnv);
    }),
  );

  rep('(def! not (fn* (a) (if a false true)))', replEnv);
  rep(
    `(defmacro! cond
      (fn* (& xs)
       (if (> (count xs) 0) (list 'if (first xs)
                                  (if (> (count xs) 1) (nth xs 1)
                                      (throw "odd number of forms to cond"))
                                  (cons 'cond (rest (rest xs)))))))`,
    replEnv,
  );

  return replEnv;
}
