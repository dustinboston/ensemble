import { add } from './core.ts';
import { Env } from './env.ts';
import {
    evaluate,
    evaluateApply,
    evaluateAst,
    evaluateDef,
    evaluateDefMacro,
    evaluateDo,
    evaluateFn,
    evaluateIf,
    evaluateLet,
    evaluateQuasiQuote,
    evaluateQuasiQuoteExpand,
    evaluateQuote,
    evaluateTry,
    initEnv,
    isMacroCall,
    macroExpand,
    quasiQuote,
} from './lib.ts';
import { assertEquals, assertExists, assertInstanceOf, assertThrows, test } from './tests/test_runner.ts';
import {
    assertDefined,
    assertFunctionNode,
    AstNode,
    ClosureMetadata,
    createBooleanNode,
    createDomNode,
    createFunctionNode,
    createListNode,
    createMapNode,
    createNilNode,
    createNumberNode,
    createStringNode,
    createSymbolNode,
    createVectorNode,
    FunctionNode,
    isFunctionNode,
    isNumberNode,
    NumberNode,
} from './types.ts';

test('quasiquote(): should quote a symbol', () => {
  const input = createSymbolNode('a');
  const expected = createListNode([
    createSymbolNode('quote'),
    input,
  ]);
  assertEquals(quasiQuote(input), expected);
});

test('quasiquote(): should quote a dictionary', () => {
  const input = createMapNode(
    new Map([['a', createSymbolNode('b')]]),
  );
  const expected = createListNode([
    createSymbolNode('quote'),
    input,
  ]);
  assertEquals(quasiQuote(input), expected);
});

test('quasiquote(): should quote a Symbol', () => {
  const input = createSymbolNode('someSymbol');
  const expected = createListNode([
    createSymbolNode('quote'),
    input,
  ]);
  assertEquals(quasiQuote(input), expected);
});

// Non-sequential types
test('quasiquote(): should quote a nil', () => {
  const input = createNilNode();
  assertEquals(quasiQuote(input), input);
});

test('quasiquote(): should quote a number', () => {
  const input = createNumberNode(42);
  assertEquals(quasiQuote(input), input);
});

// Unquoted
test('quasiquote(): should unquote a symbol unquote in List', () => {
  const input = createListNode([
    createSymbolNode('unquote'),
    createSymbolNode('x'),
  ]);
  assertEquals(
    quasiQuote(input),
    createSymbolNode('x'),
  );
});

// Splice-unquote
test('quasiquote(): should concat a symbol within a list with splice-unquote', () => {
  const input = createListNode([
    createListNode([
      createSymbolNode('splice-unquote'),
      createSymbolNode('x'),
    ]),
  ]);
  const expected = createListNode([
    createSymbolNode('concat'),
    createSymbolNode('x'),
    createListNode([]),
  ]);
  assertEquals(quasiQuote(input), expected);
});

test('quasiquote(): should cons a symbol within a list with splice-unquote', () => {
  const input = createListNode([createSymbolNode('y')]);
  const expected = createListNode([
    createSymbolNode('cons'),
    createListNode([
      createSymbolNode('quote'),
      createSymbolNode('y'),
    ]),
    createListNode([]),
  ]);
  assertEquals(quasiQuote(input), expected);
});

test('quasiquote(): should quote a with Vec', () => {
  const input = createVectorNode([createSymbolNode('z')]);
  const intermediate = createListNode([
    createSymbolNode('cons'),
    createListNode([
      createSymbolNode('quote'),
      createSymbolNode('z'),
    ]),
    createListNode([]),
  ]);
  const expected = createListNode([
    createSymbolNode('vec'),
    intermediate,
  ]);
  assertEquals(quasiQuote(input), expected);
});

test('evaluateDefMacro(): should define a macro', () => {
  const result = evaluateDefMacro(
    createListNode([
      createSymbolNode('defmacro!'),
      createSymbolNode('a'),
      createFunctionNode(() => createNilNode()),
    ]),
    new Env(),
  );

  const fn = result.return as FunctionNode;
  assertInstanceOf(fn, FunctionNode);
  assertEquals(fn.isMacro, true);
});

test('evaluateDefMacro(): should throw error on invalid key', () => {
  const env = new Env();
  const ast = createListNode([
    createSymbolNode('defmacro!'),
    createNumberNode(42),
    createFunctionNode(() => createNilNode()),
  ]);

  assertThrows(
    () => evaluateDefMacro(ast, env),
    Error,
    'Invalid dictionary key',
  );
});

test('evaluateDefMacro(): should copy metadata', () => {
  const result = evaluateDefMacro(
    createListNode([
      createSymbolNode('defmacro!'),
      createSymbolNode('a'),
      createFunctionNode(
        () => createNilNode(),
        undefined, // closureMetadata
        false, // isMacro
        createStringNode('meta'), // metadata
      ),
    ]),
    new Env(),
  );

  const fn = result.return as FunctionNode;
  assertInstanceOf(fn, FunctionNode);
  assertEquals(fn.metadata?.value, 'meta');
});

test('isMacroCall(): should return false for non-list ast', () => {
  const env = new Env();
  const ast = createSymbolNode('a');
  assertEquals(isMacroCall(ast, env), false);
});

test('isMacroCall(): should return false for list with non-Sym first element', () => {
  const env = new Env();
  const ast = createListNode([createListNode([])]);
  assertEquals(isMacroCall(ast, env), false);
});

test('isMacroCall(): should return false when symbol not found in any env', () => {
  const env = new Env();
  const ast = createListNode([createSymbolNode('unknown')]);
  assertEquals(isMacroCall(ast, env), false);
});

test('isMacroCall(): should return false when symbol is found but not a function', () => {
  const env = new Env();
  env.set(createSymbolNode('a'), createListNode([]));
  const ast = createListNode([createSymbolNode('a')]);
  assertEquals(isMacroCall(ast, env), false);
});

test('isMacroCall(): should return false when function is not a macro', () => {
  const env = new Env();
  const fn = createFunctionNode(() => createNilNode());
  fn.isMacro = false;
  env.set(createSymbolNode('a'), fn);
  const ast = createListNode([createSymbolNode('a')]);
  assertEquals(isMacroCall(ast, env), false);
});

test('isMacroCall(): should return true when function is a macro', () => {
  const env = new Env();
  const fn = createFunctionNode(() => createNilNode());
  fn.isMacro = true;
  env.set(createSymbolNode('a'), fn);
  const ast = createListNode([createSymbolNode('a')]);
  assertEquals(isMacroCall(ast, env), true);
});

test('macroExpand(): should return the same AST when not a macro call', () => {
  const env = new Env();
  const ast = createListNode([
    createSymbolNode('not_a_macro'),
    createSymbolNode('a'),
  ]);
  const expanded = macroExpand(ast, env);
  assertEquals(expanded, ast);
});

test('macroExpand(): should expand a single-layer macro', () => {
  const env = new Env();
  const macroFunc = createFunctionNode(
    (...args) => createListNode([createSymbolNode('quote'), ...args]),
  );
  macroFunc.isMacro = true;

  env.set(createSymbolNode('a_macro'), macroFunc);
  const ast = createListNode([
    createSymbolNode('a_macro'),
    createSymbolNode('a'),
  ]);
  const expanded = macroExpand(ast, env);

  assertEquals(
    expanded,
    createListNode([
      createSymbolNode('quote'),
      createSymbolNode('a'),
    ]),
  );
});

test('macroExpand(): should expand nested macros', () => {
  const env = new Env();
  const macroFunc1 = createFunctionNode(
    (...args) => createListNode([createSymbolNode('quote'), ...args]),
  );
  macroFunc1.isMacro = true;
  const macroFunc2 = createFunctionNode(
    (...args) => createListNode([createSymbolNode('a_macro1'), ...args]),
  );
  macroFunc2.isMacro = true;

  env.set(createSymbolNode('a_macro1'), macroFunc1);
  env.set(createSymbolNode('a_macro2'), macroFunc2);

  const ast = createListNode([
    createSymbolNode('a_macro2'),
    createSymbolNode('a'),
  ]);
  const expanded = macroExpand(ast, env);

  assertEquals(
    expanded,
    createListNode([
      createSymbolNode('quote'),
      createSymbolNode('a'),
    ]),
  );
});

test('evaluateAst(): should return the value for a symbol', () => {
  const env = new Env();
  const sym = createSymbolNode('x');
  env.set(sym, createNumberNode(1));
  const result = evaluateAst(sym, env);
  assertEquals(result, createNumberNode(1));
});

test('evaluateAst(): should evaluate vectors', () => {
  const env = new Env();
  const vec = createVectorNode([createNumberNode(1)]);
  const result = evaluateAst(vec, env);
  assertEquals(
    result,
    createVectorNode([createNumberNode(1)]),
  );
});

test('evaluateAst(): should evaluate lists', () => {
  const env = new Env();
  const list = createListNode([createNumberNode(1)]);
  const result = evaluateAst(list, env);
  assertEquals(
    result,
    createListNode([createNumberNode(1)]),
  );
});

test('evaluateAst(): should evaluate dictionaries', () => {
  const env = new Env();
  const dict = createMapNode(
    new Map([['a', createNumberNode(1)]]),
  );
  const result = evaluateAst(dict, env);
  assertEquals(
    result,
    createMapNode(new Map([['a', createNumberNode(1)]])),
  );
});

test('evaluateAst(): should evaluate DomNodes', () => {
  const env = new Env();
  const domNode = createDomNode('a', new Map([['href', createStringNode('https://example.com')]]));
  const result = evaluateAst(domNode, env);
  assertEquals(
    result,
    createDomNode('a', new Map([['href', createStringNode('https://example.com')]])),
  );
});

test('evaluateAst(): should return the input for unsupported types', () => {
  const env = new Env();
  const number_ = createNumberNode(1);
  const result = evaluateAst(number_, env);
  assertEquals(result, createNumberNode(1));
});

test("evaluate(): should handle 'def!' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('def!'),
      createSymbolNode('a'),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'let*' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('let*'),
      createListNode([]),
      createNumberNode(1),
    ]),
    env,
  );
  // Tail-call
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'quote' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('quote'),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'quasiquoteexpand' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('quasiquoteexpand'),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'quasiquote' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('quasiquote'),
      createNumberNode(1),
    ]),
    env,
  );
  // Tail-call
  assertEquals(isNumberNode(result), true);
});

// Test for debugging expansion:
test('evaluate(): Should create a macro', () => {
  // Input MAL looks like this:
  // (defmacro! hotdog (fn* () "🌭") ;=>#<fn>
  // (hotdog) ;=> "🌭"

  const env = new Env();
  evaluate(
    createListNode([
      createSymbolNode('defmacro!'),
      createSymbolNode('hotdog'),
      createFunctionNode(() => createStringNode('🌭')),
    ]),
    env,
  );

  const result = evaluate(
    createListNode([
      createSymbolNode('hotdog'),
    ]),
    env,
  );

  assertEquals(result, createStringNode('🌭'));
});

test("evaluate(): 'defmacro!' body can be anything", () => {
  const result = evaluate(
    createListNode([
      createSymbolNode('defmacro!'),
      createSymbolNode('a'),
      createNumberNode(1),
    ]),
    new Env(),
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'macroexpand' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('macroexpand'),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'try*' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('try*'),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'do' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('do'),
      createNumberNode(1),
    ]),
    env,
  );
  // Tail-call
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'if' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('if'),
      createBooleanNode(true),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test("evaluate(): should handle 'fn*' correctly", () => {
  const env = new Env();
  const result = evaluate(
    createListNode([
      createSymbolNode('fn*'),
      createListNode([]),
      createNumberNode(1),
    ]),
    env,
  );
  assertEquals(isFunctionNode(result), true);
});

test('evaluate(): should handle default case correctly', () => {
  const env = new Env();
  env.set(
    createSymbolNode('+'),
    createFunctionNode(() => createNumberNode(3)),
  );
  const result = evaluate(
    createListNode([
      createSymbolNode('+'),
      createNumberNode(1),
      createNumberNode(2),
    ]),
    env,
  );
  assertEquals(isNumberNode(result), true);
});

test('evaluateDef(): should define a global variable', () => {
  const env = new Env();
  const variableName = createSymbolNode('y');
  const variableValue = createNumberNode(3);
  const ast = createListNode([
    createSymbolNode('def!'),
    variableName,
    variableValue,
  ]);

  const result = evaluateDef(ast, env);

  // Validate the return type and value
  assertEquals(result.return, variableValue);

  // Validate if the variable is set in environment
  assertEquals(env.get(variableName), variableValue);
});

test('evaluateDef(): should throw an error for incorrect AST', () => {
  const env = new Env();
  const ast = createListNode([createSymbolNode('def!')]);

  assertThrows(() => {
    evaluateDef(ast, env);
  });
});

test('evaluateLet(): should define variables in a new scope', () => {
  const env = new Env();
  const varName1 = createSymbolNode('a');
  const varValue1 = createNumberNode(1);
  const varName2 = createSymbolNode('b');
  const varValue2 = createNumberNode(2);

  const bindings = createListNode([
    varName1,
    varValue1,
    varName2,
    varValue2,
  ]);
  const body = createSymbolNode('a');
  const ast = createListNode([
    createSymbolNode('let*'),
    bindings,
    body,
  ]);

  const result = evaluateLet(ast, env);

  assertDefined(result.continue);
  assertEquals(result.continue?.ast, body);
  assertEquals(result.continue?.env.get(varName1), varValue1);
  assertEquals(result.continue?.env.get(varName2), varValue2);
});

test('evaluateLet(): allows shadowing', () => {
  const env = new Env();
  env.set(createSymbolNode('a'), createNumberNode(2));
  const bindings = createListNode([
    createSymbolNode('a'),
    createNumberNode(3),
  ]);
  const body = createSymbolNode('a');
  const ast = createListNode([
    createSymbolNode('let*'),
    bindings,
    body,
  ]);

  const result = evaluateLet(ast, env);
  const newEnv = result.continue?.env;
  const finalAst = result.continue?.ast;

  assertExists(finalAst);
  assertExists(newEnv);
  assertEquals(
    evaluate(finalAst, newEnv),
    createNumberNode(3),
  );
});

test('evaluateLet(): throws for incorrect AST', () => {
  const env = new Env();
  const ast = createListNode([createSymbolNode('let*')]);

  assertThrows(() => {
    evaluateLet(ast, env);
  });
});

test('evaluateLet(): should throw an error for incorrect AST', () => {
  const env = new Env();
  const ast = createListNode([createSymbolNode('let*')]);

  assertThrows(() => {
    evaluateLet(ast, env);
  });
});

test('evaluateQuote(): with a number', () => {
  const input = createNumberNode(7);
  const quoted = createListNode([
    createSymbolNode('quote'),
    input,
  ]);
  const result = evaluateQuote(quoted, new Env(undefined));
  assertEquals(
    result.return,
    input,
  );
});

test('evaluateQuote(): with a list of numbers', () => {
  const input = createListNode([
    createNumberNode(1),
    createNumberNode(2),
    createNumberNode(3),
  ]);
  const quoted = createListNode([
    createSymbolNode('quote'),
    input,
  ]);
  const result = evaluateQuote(quoted, new Env(undefined));
  assertEquals(
    result.return,
    input,
  );
});

test('evaluateQuote(): with nested lists', () => {
  const input = createListNode([
    createNumberNode(1),
    createNumberNode(2),
    createListNode([
      createNumberNode(3),
      createNumberNode(4),
    ]),
  ]);
  const quoted = createListNode([
    createSymbolNode('quote'),
    input,
  ]);
  const result = evaluateQuote(quoted, new Env(undefined));
  assertEquals(
    result.return,
    input,
  );
});

test('evaluateQuote(): should return the quoted expression', () => {
  const env = new Env();
  const quotedExpr = createListNode([
    createNumberNode(1),
    createNumberNode(2),
  ]);
  const ast = createListNode([
    createSymbolNode('quote'),
    quotedExpr,
  ]);

  const result = evaluateQuote(ast, env);

  assertEquals(result.return, quotedExpr);
});

test('evaluateQuote(): should throw an error for incorrect AST', () => {
  const env = new Env();
  const ast = createListNode([createSymbolNode('quote')]);

  assertThrows(() => {
    evaluateQuote(ast, env);
  });
});

test('evaluateQuasiQuoteExpand(): returns expanded form', () => {
  const ast = createListNode([
    createSymbolNode('quasiquoteexpand'),
    createListNode([
      createSymbolNode('unquote'),
      createSymbolNode('a'),
    ]),
  ]);

  const result = evaluateQuasiQuoteExpand(ast, new Env());
  const expectedResult = quasiQuote(
    createListNode([
      createSymbolNode('unquote'),
      createSymbolNode('a'),
    ]),
  );

  assertEquals(result.return, expectedResult);
});

test('evaluateQuasiQuoteExpand(): throws for incorrect AST', () => {
  const ast = createListNode([
    createSymbolNode('quasiquoteexpand'),
  ]);

  assertThrows(() => {
    evaluateQuasiQuoteExpand(ast, new Env());
  });
});

test('evaluateQuasiQuote(): performs quasiquote transformation', () => {
  const ast = createListNode([
    createSymbolNode('quasiquote'),
    createListNode([
      createSymbolNode('unquote'),
      createSymbolNode('a'),
    ]),
  ]);

  const env = new Env();
  const result = evaluateQuasiQuote(ast, env);
  const expectedResult = quasiQuote(
    createListNode([
      createSymbolNode('unquote'),
      createSymbolNode('a'),
    ]),
  );

  assertEquals(result.continue?.ast, expectedResult);
  assertEquals(result.continue?.env, env);
});

test('evaluateQuasiQuote(): throws for incorrect AST', () => {
  const ast = createListNode([createSymbolNode('quasiquote')]);

  assertThrows(() => {
    evaluateQuasiQuote(ast, new Env());
  });
});

test('evaluateDefMacro(): defines a macro', () => {
  const ast = createListNode([
    createSymbolNode('defmacro!'),
    createSymbolNode('one'),
    createListNode([
      createSymbolNode('fn*'),
      createListNode([]),
      createNumberNode(1),
    ]),
  ]);

  const env = new Env();
  const result = evaluateDefMacro(ast, env);
  const fn = env.get(createSymbolNode('one')) as FunctionNode;

  assertEquals(isFunctionNode(fn), true);
  assertEquals(fn.isMacro, true);
  assertEquals(result.return, fn);
});

test('evaluateDefMacro(): throws for incorrect AST', () => {
  const ast = createListNode([createSymbolNode('defmacro!')]);

  assertThrows(() => {
    evaluateDefMacro(ast, new Env());
  });
});

test('evaluateDo(): processes a single action and returns it', () => {
  const ast = createListNode([
    createSymbolNode('do'),
    createNumberNode(3),
  ]);
  const env = new Env();
  const result = evaluateDo(ast, env);
  assertEquals(result.continue?.ast, createNumberNode(3));
});

test('evaluateDo(): processes multiple actions and returns the last one', () => {
  const ast = createListNode([
    createSymbolNode('do'),
    createNumberNode(3),
    createNumberNode(4),
    createStringNode('hello'),
  ]);

  const env = new Env();
  const result = evaluateDo(ast, env);
  assertEquals(
    result.continue?.ast,
    createStringNode('hello'),
  );
});

test('evaluateTry(): evaluates without errors', () => {
  const ast = createListNode([
    createSymbolNode('try*'),
    createNumberNode(42),
  ]);
  const env = new Env();
  const result = evaluateTry(ast, env);
  assertEquals(result.return, createNumberNode(42));
});

test('evaluateTry(): catches thrown error and handles it', () => {
  const ast = createListNode([
    createSymbolNode('try*'),
    createListNode([
      createSymbolNode('custom-throw'),
      createStringNode('we shouldnt be here'),
    ]),
    createListNode([
      createSymbolNode('catch*'),
      createSymbolNode('e'),
      createListNode([
        createSymbolNode('str'),
        createStringNode('caught!'),
      ]),
    ]),
  ]);
  const env = initEnv();
  env.set(
    createSymbolNode('custom-throw'),
    createFunctionNode((_args, _env) => {
      throw 'error!';
    }),
  );
  const result = evaluateTry(ast, env);
  assertEquals(
    result.return,
    createStringNode('caught!'),
  );
});

test('evaluateTry(): catches native error and handles it', () => {
  const ast = createListNode([
    createSymbolNode('try*'),
    createListNode([
      createSymbolNode('throw-native'),
      createStringNode('native error!'),
    ]),
    createListNode([
      createSymbolNode('catch*'),
      createSymbolNode('e'),
      createListNode([
        createSymbolNode('str'),
        createStringNode('caught!'),
      ]),
    ]),
  ]);
  const env = initEnv();
  env.set(
    createSymbolNode('throw-native'),
    createFunctionNode((_args, _env) => {
      throw new Error('native error!');
    }),
  );
  const result = evaluateTry(ast, env);
  assertEquals(
    result.return,
    createStringNode('caught!'),
  );
});

test('evaluateIf(): evaluates true condition and returns thenExpr', () => {
  const ast = createListNode([
    createSymbolNode('if'),
    createBooleanNode(true),
    createNumberNode(42),
    createNumberNode(0),
  ]);
  const env = new Env();
  const result = evaluateIf(ast, env);
  assertEquals(result, {
    return: undefined,
    continue: { ast: createNumberNode(42), env: env },
  });
});

test('evaluateIf(): evaluates false condition and returns elseExpr', () => {
  const ast = createListNode([
    createSymbolNode('if'),
    createBooleanNode(false),
    createNumberNode(42),
    createNumberNode(0),
  ]);
  const env = new Env();
  const result = evaluateIf(ast, env);
  assertEquals(result, {
    return: undefined,
    continue: { ast: createNumberNode(0), env },
  });
});

test('evaluateIf(): evaluates null condition and returns elseExpr', () => {
  const ast = createListNode([
    createSymbolNode('if'),
    createNilNode(),
    createNumberNode(42),
    createNumberNode(0),
  ]);
  const env = new Env();
  const result = evaluateIf(ast, env);
  assertEquals(result, {
    return: undefined,
    continue: { ast: createNumberNode(0), env },
  });
});

test('evaluateIf(): evaluates true condition without elseExpr returns thenExpr', () => {
  const ast = createListNode([
    createSymbolNode('if'),
    createBooleanNode(true),
    createNumberNode(42),
  ]);
  const env = new Env();
  const result = evaluateIf(ast, env);
  assertEquals(result, {
    return: undefined,
    continue: { ast: createNumberNode(42), env },
  });
});

test('evaluateIf(): evaluates false condition without elseExpr returns nil', () => {
  const ast = createListNode([
    createSymbolNode('if'),
    createBooleanNode(false),
    createNumberNode(42),
  ]);
  const env = new Env();
  const result = evaluateIf(ast, env);
  assertEquals(result, {
    continue: undefined,
    return: createNilNode(),
  });
});

test('evaluateIf(): evaluates null condition without elseExpr returns nil', () => {
  const ast = createListNode([
    createSymbolNode('if'),
    createNilNode(),
    createNumberNode(42),
  ]);
  const env = new Env();
  const result = evaluateIf(ast, env);
  assertEquals(result, {
    continue: undefined,
    return: createNilNode(),
  });
});

test('evaluateFn(): creates a simple anonymous function', () => {
  const ast = createListNode([
    createSymbolNode('fn*'),
    createListNode([
      createSymbolNode('a'),
      createSymbolNode('b'),
    ]),
    createListNode([
      createSymbolNode('+'),
      createSymbolNode('a'),
      createSymbolNode('b'),
    ]),
  ]);
  const env = new Env();
  env.set(
    createSymbolNode('+'),
    createFunctionNode(
      (...args: AstNode[]) =>
        createNumberNode(
          (args[0] as NumberNode).value +
            (args[1] as NumberNode).value,
        ),
    ),
  );
  const result = evaluateFn(ast, env);
  const fn = result.return as FunctionNode;
  assertExists(fn);
  const fnResult = fn.value(
    createNumberNode(2),
    createNumberNode(3),
  );
  assertEquals(fnResult, createNumberNode(5));
});

test('evaluateFn(): creates a function with empty args and returns body value', () => {
  const ast = createListNode([
    createSymbolNode('fn*'),
    createListNode([]),
    createNumberNode(10),
  ]);
  const env = new Env();
  const result = evaluateFn(ast, env);
  const fn = result.return as FunctionNode;
  assertExists(fn);
  const fnResult = fn.value();
  assertEquals(fnResult, createNumberNode(10));
});

test('evaluateFn(): captures environment in closure', () => {
  const ast = createListNode([
    createSymbolNode('fn*'),
    createListNode([createSymbolNode('a')]),
    createListNode([
      createSymbolNode('+'),
      createSymbolNode('a'),
      createSymbolNode('b'),
    ]),
  ]);
  const env = initEnv();
  env.set(
    createSymbolNode('+'),
    createFunctionNode(
      (...args: AstNode[]) =>
        createNumberNode(
          (args[0] as NumberNode).value +
            (args[1] as NumberNode).value,
        ),
    ),
  );
  env.set(createSymbolNode('b'), createNumberNode(5));

  const result = evaluateFn(ast, env);
  const fn = result.return as FunctionNode;
  assertExists(fn);
  const fnResult = fn.value(createNumberNode(2));
  assertEquals(fnResult, createNumberNode(7));
});

test('evaluateApply(): applies built-in function correctly', () => {
  const ast = createListNode([
    createSymbolNode('+'),
    createNumberNode(1),
    createNumberNode(2),
  ]);
  const env = new Env();
  env.set(createSymbolNode('+'), createFunctionNode(add));
  const result = evaluateApply(ast, env);
  assertEquals(result.return, createNumberNode(3));
});

test('evaluateApply(): applies closure correctly', () => {
  const ast = createListNode([
    createSymbolNode('add2'),
    createNumberNode(5),
  ]);
  const closureMeta: ClosureMetadata = {
    ast: createListNode([
      createSymbolNode('+'),
      createSymbolNode('a'),
      createNumberNode(2),
    ]),
    env: new Env(),
    parameters: [createSymbolNode('a')],
  };
  closureMeta.env.set(
    createSymbolNode('+'),
    createFunctionNode(add),
  );
  const add2 = createFunctionNode(
    () => createNilNode(),
    closureMeta,
  );
  const env = new Env();
  env.set(createSymbolNode('add2'), add2);
  const result = evaluateApply(ast, env);

  assertDefined(result.continue?.ast);
  assertEquals(
    result.continue?.ast,
    createListNode([
      createSymbolNode('+'),
      createSymbolNode('a'),
      createNumberNode(2),
    ]),
  );
});

test('evaluateApply(): returns function itself if it is not applicable', () => {
  const ast = createListNode([createStringNode('non-fn')]);
  const env = new Env();
  const result = evaluateApply(ast, env);
  assertEquals(result.return, createStringNode('non-fn'));
});

test('evaluateApply(): throws error for non-list input', () => {
  const ast = createNumberNode(42);
  const env = new Env();
  assertThrows(() => evaluateApply(ast, env));
});

test('initEnv(): initEnv initializes the core functions', () => {
  const env = initEnv();
  assertEquals(
    typeof env.get(createSymbolNode('+')).value,
    'function',
  );
});

test('initEnv(): initEnv initializes eval function', () => {
  const env = initEnv();
  assertEquals(
    typeof env.get(createSymbolNode('eval')).value,
    'function',
  );
});

// TODO: I messed up "not". The if might be too restrictive now
test('initEnv(): initEnv runs repl with predefined functions', () => {
  const env = initEnv();
  const fn = env.get(createSymbolNode('not')) as FunctionNode;
  assertFunctionNode(fn);
  assertEquals(
    fn.value(createNumberNode(1)),
    createBooleanNode(false),
  );
});
