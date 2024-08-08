import {
	assertEquals,
	assertExists,
	assertInstanceOf,
	assertThrows,
} from './tests/deps.ts';
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
	quasiquote,
} from './ensemble.ts';
import {
	assertDefined,
	assertFunctionNode,
	AstNode,
	BooleanNode,
	ClosureMetadata,
	DomNode,
	FunctionNode,
	ListNode,
	MapNode,
	NilNode,
	NumberNode,
	returnResult,
	StringNode,
	SymbolNode,
	VectorNode,
} from './types.ts';

Deno.test('quasiquote(): should quote a symbol', () => {
	const input = new SymbolNode('a');
	const expected = new ListNode([
		new SymbolNode('quote'),
		input,
	]);
	assertEquals(quasiquote(input), expected);
});

Deno.test('quasiquote(): should quote a dictionary', () => {
	const input = new MapNode(
		new Map([['a', new SymbolNode('b')]]),
	);
	const expected = new ListNode([
		new SymbolNode('quote'),
		input,
	]);
	assertEquals(quasiquote(input), expected);
});

Deno.test('quasiquote(): should quote a Symbol', () => {
	const input = new SymbolNode('someSymbol');
	const expected = new ListNode([
		new SymbolNode('quote'),
		input,
	]);
	assertEquals(quasiquote(input), expected);
});

// Non-sequential types
Deno.test('quasiquote(): should quote a nil', () => {
	const input = new NilNode();
	assertEquals(quasiquote(input), input);
});

Deno.test('quasiquote(): should quote a number', () => {
	const input = new NumberNode(42);
	assertEquals(quasiquote(input), input);
});

// Unquoted
Deno.test('quasiquote(): should unquote a symbol unquote in List', () => {
	const input = new ListNode([
		new SymbolNode('unquote'),
		new SymbolNode('x'),
	]);
	assertEquals(
		quasiquote(input),
		new SymbolNode('x'),
	);
});

// Splice-unquote
Deno.test('quasiquote(): should concat a symbol within a list with splice-unquote', () => {
	const input = new ListNode([
		new ListNode([
			new SymbolNode('splice-unquote'),
			new SymbolNode('x'),
		]),
	]);
	const expected = new ListNode([
		new SymbolNode('concat'),
		new SymbolNode('x'),
		new ListNode([]),
	]);
	assertEquals(quasiquote(input), expected);
});

Deno.test('quasiquote(): should cons a symbol within a list with splice-unquote', () => {
	const input = new ListNode([new SymbolNode('y')]);
	const expected = new ListNode([
		new SymbolNode('cons'),
		new ListNode([
			new SymbolNode('quote'),
			new SymbolNode('y'),
		]),
		new ListNode([]),
	]);
	assertEquals(quasiquote(input), expected);
});

Deno.test('quasiquote(): should quote a with Vec', () => {
	const input = new VectorNode([new SymbolNode('z')]);
	const intermediate = new ListNode([
		new SymbolNode('cons'),
		new ListNode([
			new SymbolNode('quote'),
			new SymbolNode('z'),
		]),
		new ListNode([]),
	]);
	const expected = new ListNode([
		new SymbolNode('vec'),
		intermediate,
	]);
	assertEquals(quasiquote(input), expected);
});

Deno.test('evaluateDefMacro(): should define a macro', () => {
	const result = evaluateDefMacro(
		new ListNode([
			new SymbolNode('defmacro!'),
			new SymbolNode('a'),
			new FunctionNode(() => new NilNode()),
		]),
		new Env(),
	);

	assertInstanceOf(result.return, FunctionNode);
	assertEquals(result.return.isMacro, true);
});

Deno.test('evaluateDefMacro(): should throw error on invalid key', () => {
	const env = new Env();
	const ast = new ListNode([
		new SymbolNode('defmacro!'),
		new NumberNode(42),
		new FunctionNode(() => new NilNode()),
	]);

	assertThrows(
		() => evaluateDefMacro(ast, env),
		Error,
		'Invalid dictionary key',
	);
});

Deno.test('evaluateDefMacro(): should copy metadata', () => {
	const result = evaluateDefMacro(
		new ListNode([
			new SymbolNode('defmacro!'),
			new SymbolNode('a'),
			new FunctionNode(
				() => new NilNode(),
				undefined, // closureMetadata
				false, // isMacro
				new StringNode('meta'), // metadata
			),
		]),
		new Env(),
	);

	assertInstanceOf(result.return, FunctionNode);
	assertEquals(result.return.metadata.value, 'meta');
});

Deno.test('isMacroCall(): should return false for non-list ast', () => {
	const env = new Env();
	const ast = new SymbolNode('a');
	assertEquals(isMacroCall(ast, env), false);
});

Deno.test('isMacroCall(): should return false for list with non-Sym first element', () => {
	const env = new Env();
	const ast = new ListNode([new ListNode([])]);
	assertEquals(isMacroCall(ast, env), false);
});

Deno.test('isMacroCall(): should return false when symbol not found in any env', () => {
	const env = new Env();
	const ast = new ListNode([new SymbolNode('unknown')]);
	assertEquals(isMacroCall(ast, env), false);
});

Deno.test('isMacroCall(): should return false when symbol is found but not a function', () => {
	const env = new Env();
	env.set(new SymbolNode('a'), new ListNode([]));
	const ast = new ListNode([new SymbolNode('a')]);
	assertEquals(isMacroCall(ast, env), false);
});

Deno.test('isMacroCall(): should return false when function is not a macro', () => {
	const env = new Env();
	const fn = new FunctionNode(() => new NilNode());
	fn.isMacro = false;
	env.set(new SymbolNode('a'), fn);
	const ast = new ListNode([new SymbolNode('a')]);
	assertEquals(isMacroCall(ast, env), false);
});

Deno.test('isMacroCall(): should return true when function is a macro', () => {
	const env = new Env();
	const fn = new FunctionNode(() => new NilNode());
	fn.isMacro = true;
	env.set(new SymbolNode('a'), fn);
	const ast = new ListNode([new SymbolNode('a')]);
	assertEquals(isMacroCall(ast, env), true);
});

Deno.test('macroExpand(): should return the same AST when not a macro call', () => {
	const env = new Env();
	const ast = new ListNode([
		new SymbolNode('not_a_macro'),
		new SymbolNode('a'),
	]);
	const expanded = macroExpand(ast, env);
	assertEquals(expanded, ast);
});

Deno.test('macroExpand(): should expand a single-layer macro', () => {
	const env = new Env();
	const macroFunc = new FunctionNode(
		(...args) => new ListNode([new SymbolNode('quote'), ...args]),
	);
	macroFunc.isMacro = true;

	env.set(new SymbolNode('a_macro'), macroFunc);
	const ast = new ListNode([
		new SymbolNode('a_macro'),
		new SymbolNode('a'),
	]);
	const expanded = macroExpand(ast, env);

	assertEquals(
		expanded,
		new ListNode([
			new SymbolNode('quote'),
			new SymbolNode('a'),
		]),
	);
});

Deno.test('macroExpand(): should expand nested macros', () => {
	const env = new Env();
	const macroFunc1 = new FunctionNode(
		(...args) => new ListNode([new SymbolNode('quote'), ...args]),
	);
	macroFunc1.isMacro = true;
	const macroFunc2 = new FunctionNode(
		(...args) => new ListNode([new SymbolNode('a_macro1'), ...args]),
	);
	macroFunc2.isMacro = true;

	env.set(new SymbolNode('a_macro1'), macroFunc1);
	env.set(new SymbolNode('a_macro2'), macroFunc2);

	const ast = new ListNode([
		new SymbolNode('a_macro2'),
		new SymbolNode('a'),
	]);
	const expanded = macroExpand(ast, env);

	assertEquals(
		expanded,
		new ListNode([
			new SymbolNode('quote'),
			new SymbolNode('a'),
		]),
	);
});

Deno.test('evaluateAst(): should return the value for a symbol', () => {
	const env = new Env();
	const sym = new SymbolNode('x');
	env.set(sym, new NumberNode(1));
	const result = evaluateAst(sym, env);
	assertEquals(result, new NumberNode(1));
});

Deno.test('evaluateAst(): should evaluate vectors', () => {
	const env = new Env();
	const vec = new VectorNode([new NumberNode(1)]);
	const result = evaluateAst(vec, env);
	assertEquals(
		result,
		new VectorNode([new NumberNode(1)]),
	);
});

Deno.test('evaluateAst(): should evaluate lists', () => {
	const env = new Env();
	const list = new ListNode([new NumberNode(1)]);
	const result = evaluateAst(list, env);
	assertEquals(
		result,
		new ListNode([new NumberNode(1)]),
	);
});

Deno.test('evaluateAst(): should evaluate dictionaries', () => {
	const env = new Env();
	const dict = new MapNode(
		new Map([['a', new NumberNode(1)]]),
	);
	const result = evaluateAst(dict, env);
	assertEquals(
		result,
		new MapNode(new Map([['a', new NumberNode(1)]])),
	);
});

Deno.test('evaluateAst(): should evaluate DomNodes', () => {
	const env = new Env();
	const domNode = new DomNode(
		new Map([['a', new NumberNode(1)]]),
	);
	const result = evaluateAst(domNode, env);
	assertEquals(
		result,
		new DomNode(new Map([['a', new NumberNode(1)]])),
	);
});

Deno.test('evaluateAst(): should return the input for unsupported types', () => {
	const env = new Env();
	const number_ = new NumberNode(1);
	const result = evaluateAst(number_, env);
	assertEquals(result, new NumberNode(1));
});

Deno.test("evaluate(): should handle 'def!' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('def!'),
			new SymbolNode('a'),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'let*' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('let*'),
			new ListNode([]),
			new NumberNode(1),
		]),
		env,
	);
	// Tail-call
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'quote' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('quote'),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'quasiquoteexpand' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('quasiquoteexpand'),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'quasiquote' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('quasiquote'),
			new NumberNode(1),
		]),
		env,
	);
	// Tail-call
	assertEquals(result instanceof NumberNode, true);
});

// Test for debugging expansion:
Deno.test('evaluate(): Should create a macro', () => {
	// Input MAL looks like this:
	// (defmacro! hotdog (fn* () "🌭") ;=>#<fn>
	// (hotdog) ;=> "🌭"

	const env = new Env();
	evaluate(
		new ListNode([
			new SymbolNode('defmacro!'),
			new SymbolNode('hotdog'),
			new FunctionNode(() => new StringNode('🌭')),
		]),
		env,
	);

	const result = evaluate(
		new ListNode([
			new SymbolNode('hotdog'),
		]),
		env,
	);

	assertEquals(result, new StringNode('🌭'));
});

Deno.test("evaluate(): 'defmacro!' body can be anything", () => {
	const result = evaluate(
		new ListNode([
			new SymbolNode('defmacro!'),
			new SymbolNode('a'),
			new NumberNode(1),
		]),
		new Env(),
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'macroexpand' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('macroexpand'),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'try*' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('try*'),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'do' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('do'),
			new NumberNode(1),
		]),
		env,
	);
	// Tail-call
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'if' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('if'),
			new BooleanNode(true),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test("evaluate(): should handle 'fn*' correctly", () => {
	const env = new Env();
	const result = evaluate(
		new ListNode([
			new SymbolNode('fn*'),
			new ListNode([]),
			new NumberNode(1),
		]),
		env,
	);
	assertEquals(result instanceof FunctionNode, true);
});

Deno.test('evaluate(): should handle default case correctly', () => {
	const env = new Env();
	env.set(
		new SymbolNode('+'),
		new FunctionNode(() => new NumberNode(3)),
	);
	const result = evaluate(
		new ListNode([
			new SymbolNode('+'),
			new NumberNode(1),
			new NumberNode(2),
		]),
		env,
	);
	assertEquals(result instanceof NumberNode, true);
});

Deno.test('evaluateDef(): should define a global variable', () => {
	const env = new Env();
	const variableName = new SymbolNode('y');
	const variableValue = new NumberNode(3);
	const ast = new ListNode([
		new SymbolNode('def!'),
		variableName,
		variableValue,
	]);

	const result = evaluateDef(ast, env);

	// Validate the return type and value
	assertEquals(result.return, variableValue);

	// Validate if the variable is set in environment
	assertEquals(env.get(variableName), variableValue);
});

Deno.test('evaluateDef(): should throw an error for incorrect AST', () => {
	const env = new Env();
	const ast = new ListNode([new SymbolNode('def!')]);

	assertThrows(() => {
		evaluateDef(ast, env);
	});
});

Deno.test('evaluateLet(): should define variables in a new scope', () => {
	const env = new Env();
	const varName1 = new SymbolNode('a');
	const varValue1 = new NumberNode(1);
	const varName2 = new SymbolNode('b');
	const varValue2 = new NumberNode(2);

	const bindings = new ListNode([
		varName1,
		varValue1,
		varName2,
		varValue2,
	]);
	const body = new SymbolNode('a');
	const ast = new ListNode([
		new SymbolNode('let*'),
		bindings,
		body,
	]);

	const result = evaluateLet(ast, env);

	assertDefined(result.continue);
	assertEquals(result.continue?.ast, body);
	assertEquals(result.continue?.env.get(varName1), varValue1);
	assertEquals(result.continue?.env.get(varName2), varValue2);
});

Deno.test('evaluateLet(): allows shadowing', () => {
	const env = new Env();
	env.set(new SymbolNode('a'), new NumberNode(2));
	const bindings = new ListNode([
		new SymbolNode('a'),
		new NumberNode(3),
	]);
	const body = new SymbolNode('a');
	const ast = new ListNode([
		new SymbolNode('let*'),
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
		new NumberNode(3),
	);
});

Deno.test('evaluateLet(): throws for incorrect AST', () => {
	const env = new Env();
	const ast = new ListNode([new SymbolNode('let*')]);

	assertThrows(() => {
		evaluateLet(ast, env);
	});
});

Deno.test('evaluateLet(): should throw an error for incorrect AST', () => {
	const env = new Env();
	const ast = new ListNode([new SymbolNode('let*')]);

	assertThrows(() => {
		evaluateLet(ast, env);
	});
});

Deno.test('evaluateQuote(): with a number', () => {
	const input = new NumberNode(7);
	const quoted = new ListNode([
		new SymbolNode('quote'),
		input,
	]);
	const result = evaluateQuote(quoted, new Env(undefined));
	assertEquals(
		result.return,
		input,
	);
});

Deno.test('evaluateQuote(): with a list of numbers', () => {
	const input = new ListNode([
		new NumberNode(1),
		new NumberNode(2),
		new NumberNode(3),
	]);
	const quoted = new ListNode([
		new SymbolNode('quote'),
		input,
	]);
	const result = evaluateQuote(quoted, new Env(undefined));
	assertEquals(
		result.return,
		input,
	);
});

Deno.test('evaluateQuote(): with nested lists', () => {
	const input = new ListNode([
		new NumberNode(1),
		new NumberNode(2),
		new ListNode([
			new NumberNode(3),
			new NumberNode(4),
		]),
	]);
	const quoted = new ListNode([
		new SymbolNode('quote'),
		input,
	]);
	const result = evaluateQuote(quoted, new Env(undefined));
	assertEquals(
		result.return,
		input,
	);
});

Deno.test('evaluateQuote(): should return the quoted expression', () => {
	const env = new Env();
	const quotedExpr = new ListNode([
		new NumberNode(1),
		new NumberNode(2),
	]);
	const ast = new ListNode([
		new SymbolNode('quote'),
		quotedExpr,
	]);

	const result = evaluateQuote(ast, env);

	assertEquals(result.return, quotedExpr);
});

Deno.test('evaluateQuote(): should throw an error for incorrect AST', () => {
	const env = new Env();
	const ast = new ListNode([new SymbolNode('quote')]);

	assertThrows(() => {
		evaluateQuote(ast, env);
	});
});

Deno.test('evaluateQuasiQuoteExpand(): returns expanded form', () => {
	const ast = new ListNode([
		new SymbolNode('quasiquoteexpand'),
		new ListNode([
			new SymbolNode('unquote'),
			new SymbolNode('a'),
		]),
	]);

	const result = evaluateQuasiQuoteExpand(ast, new Env());
	const expectedResult = quasiquote(
		new ListNode([
			new SymbolNode('unquote'),
			new SymbolNode('a'),
		]),
	);

	assertEquals(result.return, expectedResult);
});

Deno.test('evaluateQuasiQuoteExpand(): throws for incorrect AST', () => {
	const ast = new ListNode([
		new SymbolNode('quasiquoteexpand'),
	]);

	assertThrows(() => {
		evaluateQuasiQuoteExpand(ast, new Env());
	});
});

Deno.test('evaluateQuasiQuote(): performs quasiquote transformation', () => {
	const ast = new ListNode([
		new SymbolNode('quasiquote'),
		new ListNode([
			new SymbolNode('unquote'),
			new SymbolNode('a'),
		]),
	]);

	const env = new Env();
	const result = evaluateQuasiQuote(ast, env);
	const expectedResult = quasiquote(
		new ListNode([
			new SymbolNode('unquote'),
			new SymbolNode('a'),
		]),
	);

	assertEquals(result.continue?.ast, expectedResult);
	assertEquals(result.continue?.env, env);
});

Deno.test('evaluateQuasiQuote(): throws for incorrect AST', () => {
	const ast = new ListNode([new SymbolNode('quasiquote')]);

	assertThrows(() => {
		evaluateQuasiQuote(ast, new Env());
	});
});

Deno.test('evaluateDefMacro(): defines a macro', () => {
	const ast = new ListNode([
		new SymbolNode('defmacro!'),
		new SymbolNode('one'),
		new ListNode([
			new SymbolNode('fn*'),
			new ListNode([]),
			new NumberNode(1),
		]),
	]);

	const env = new Env();
	const result = evaluateDefMacro(ast, env);
	const fn = env.get(new SymbolNode('one')) as FunctionNode;

	assertEquals(fn instanceof FunctionNode, true);
	assertEquals(fn.isMacro, true);
	assertEquals(result.return, fn);
});

Deno.test('evaluateDefMacro(): throws for incorrect AST', () => {
	const ast = new ListNode([new SymbolNode('defmacro!')]);

	assertThrows(() => {
		evaluateDefMacro(ast, new Env());
	});
});

Deno.test('evaluateDo(): processes a single action and returns it', () => {
	const ast = new ListNode([
		new SymbolNode('do'),
		new NumberNode(3),
	]);
	const env = new Env();
	const result = evaluateDo(ast, env);
	assertEquals(result.continue?.ast, new NumberNode(3));
});

Deno.test('evaluateDo(): processes multiple actions and returns the last one', () => {
	const ast = new ListNode([
		new SymbolNode('do'),
		new NumberNode(3),
		new NumberNode(4),
		new StringNode('hello'),
	]);

	const env = new Env();
	const result = evaluateDo(ast, env);
	assertEquals(
		result.continue?.ast,
		new StringNode('hello'),
	);
});

Deno.test('evaluateTry(): evaluates without errors', () => {
	const ast = new ListNode([
		new SymbolNode('try*'),
		new NumberNode(42),
	]);
	const env = new Env();
	const result = evaluateTry(ast, env);
	assertEquals(result.return, new NumberNode(42));
});

Deno.test('evaluateTry(): catches thrown error and handles it', () => {
	const ast = new ListNode([
		new SymbolNode('try*'),
		new ListNode([
			new SymbolNode('custom-throw'),
			new StringNode('we shouldnt be here'),
		]),
		new ListNode([
			new SymbolNode('catch*'),
			new SymbolNode('e'),
			new ListNode([
				new SymbolNode('str'),
				new StringNode('caught!'),
			]),
		]),
	]);
	const env = initEnv();
	env.set(
		new SymbolNode('custom-throw'),
		new FunctionNode((_args, _env) => {
			throw 'error!';
		}),
	);
	const result = evaluateTry(ast, env);
	assertEquals(
		result.return,
		new StringNode('caught!'),
	);
});

Deno.test('evaluateTry(): catches native error and handles it', () => {
	const ast = new ListNode([
		new SymbolNode('try*'),
		new ListNode([
			new SymbolNode('throw-native'),
			new StringNode('native error!'),
		]),
		new ListNode([
			new SymbolNode('catch*'),
			new SymbolNode('e'),
			new ListNode([
				new SymbolNode('str'),
				new StringNode('caught!'),
			]),
		]),
	]);
	const env = initEnv();
	env.set(
		new SymbolNode('throw-native'),
		new FunctionNode((_args, _env) => {
			throw new Error('native error!');
		}),
	);
	const result = evaluateTry(ast, env);
	assertEquals(
		result.return,
		new StringNode('caught!'),
	);
});

Deno.test('evaluateIf(): evaluates true condition and returns thenExpr', () => {
	const ast = new ListNode([
		new SymbolNode('if'),
		new BooleanNode(true),
		new NumberNode(42),
		new NumberNode(0),
	]);
	const env = new Env();
	const result = evaluateIf(ast, env);
	assertEquals(result, {
		return: undefined,
		continue: { ast: new NumberNode(42), env: env },
	});
});

Deno.test('evaluateIf(): evaluates false condition and returns elseExpr', () => {
	const ast = new ListNode([
		new SymbolNode('if'),
		new BooleanNode(false),
		new NumberNode(42),
		new NumberNode(0),
	]);
	const env = new Env();
	const result = evaluateIf(ast, env);
	assertEquals(result, {
		return: undefined,
		continue: { ast: new NumberNode(0), env },
	});
});

Deno.test('evaluateIf(): evaluates null condition and returns elseExpr', () => {
	const ast = new ListNode([
		new SymbolNode('if'),
		new NilNode(),
		new NumberNode(42),
		new NumberNode(0),
	]);
	const env = new Env();
	const result = evaluateIf(ast, env);
	assertEquals(result, {
		return: undefined,
		continue: { ast: new NumberNode(0), env },
	});
});

Deno.test('evaluateIf(): evaluates true condition without elseExpr returns thenExpr', () => {
	const ast = new ListNode([
		new SymbolNode('if'),
		new BooleanNode(true),
		new NumberNode(42),
	]);
	const env = new Env();
	const result = evaluateIf(ast, env);
	assertEquals(result, {
		return: undefined,
		continue: { ast: new NumberNode(42), env },
	});
});

Deno.test('evaluateIf(): evaluates false condition without elseExpr returns nil', () => {
	const ast = new ListNode([
		new SymbolNode('if'),
		new BooleanNode(false),
		new NumberNode(42),
	]);
	const env = new Env();
	const result = evaluateIf(ast, env);
	assertEquals(result, {
		continue: undefined,
		return: new NilNode(),
	});
});

Deno.test('evaluateIf(): evaluates null condition without elseExpr returns nil', () => {
	const ast = new ListNode([
		new SymbolNode('if'),
		new NilNode(),
		new NumberNode(42),
	]);
	const env = new Env();
	const result = evaluateIf(ast, env);
	assertEquals(result, {
		continue: undefined,
		return: new NilNode(),
	});
});

Deno.test('evaluateFn(): creates a simple anonymous function', () => {
	const ast = new ListNode([
		new SymbolNode('fn*'),
		new ListNode([
			new SymbolNode('a'),
			new SymbolNode('b'),
		]),
		new ListNode([
			new SymbolNode('+'),
			new SymbolNode('a'),
			new SymbolNode('b'),
		]),
	]);
	const env = new Env();
	env.set(
		new SymbolNode('+'),
		new FunctionNode(
			(...args: AstNode[]) =>
				new NumberNode(
					(args[0] as NumberNode).value +
						(args[1] as NumberNode).value,
				),
		),
	);
	const result = evaluateFn(ast, env);
	const fn = result.return as FunctionNode;
	assertExists(fn);
	const fnResult = fn.value(
		new NumberNode(2),
		new NumberNode(3),
	);
	assertEquals(fnResult, new NumberNode(5));
});

Deno.test('evaluateFn(): creates a function with empty args and returns body value', () => {
	const ast = new ListNode([
		new SymbolNode('fn*'),
		new ListNode([]),
		new NumberNode(10),
	]);
	const env = new Env();
	const result = evaluateFn(ast, env);
	const fn = result.return as FunctionNode;
	assertExists(fn);
	const fnResult = fn.value();
	assertEquals(fnResult, new NumberNode(10));
});

Deno.test('evaluateFn(): captures environment in closure', () => {
	const ast = new ListNode([
		new SymbolNode('fn*'),
		new ListNode([new SymbolNode('a')]),
		new ListNode([
			new SymbolNode('+'),
			new SymbolNode('a'),
			new SymbolNode('b'),
		]),
	]);
	const env = initEnv();
	env.set(
		new SymbolNode('+'),
		new FunctionNode(
			(...args: AstNode[]) =>
				new NumberNode(
					(args[0] as NumberNode).value +
						(args[1] as NumberNode).value,
				),
		),
	);
	env.set(new SymbolNode('b'), new NumberNode(5));

	const result = evaluateFn(ast, env);
	const fn = result.return as FunctionNode;
	assertExists(fn);
	const fnResult = fn.value(new NumberNode(2));
	assertEquals(fnResult, new NumberNode(7));
});

Deno.test('evaluateApply(): applies built-in function correctly', () => {
	const ast = new ListNode([
		new SymbolNode('+'),
		new NumberNode(1),
		new NumberNode(2),
	]);
	const env = new Env();
	env.set(new SymbolNode('+'), new FunctionNode(add));
	const result = evaluateApply(ast, env);
	assertEquals(result.return, new NumberNode(3));
});

Deno.test('evaluateApply(): applies closure correctly', () => {
	const ast = new ListNode([
		new SymbolNode('add2'),
		new NumberNode(5),
	]);
	const closureMeta: ClosureMetadata = {
		ast: new ListNode([
			new SymbolNode('+'),
			new SymbolNode('a'),
			new NumberNode(2),
		]),
		env: new Env(),
		parameters: [new SymbolNode('a')],
	};
	closureMeta.env.set(
		new SymbolNode('+'),
		new FunctionNode(add),
	);
	const add2 = new FunctionNode(
		() => new NilNode(),
		closureMeta,
	);
	const env = new Env();
	env.set(new SymbolNode('add2'), add2);
	const result = evaluateApply(ast, env);

	assertDefined(result.continue?.ast);
	assertEquals(
		result.continue?.ast,
		new ListNode([
			new SymbolNode('+'),
			new SymbolNode('a'),
			new NumberNode(2),
		]),
	);
});

Deno.test('evaluateApply(): returns function itself if it is not applicable', () => {
	const ast = new ListNode([new StringNode('non-fn')]);
	const env = new Env();
	const result = evaluateApply(ast, env);
	assertEquals(result.return, new StringNode('non-fn'));
});

Deno.test('evaluateApply(): throws error for non-list input', () => {
	const ast = new NumberNode(42);
	const env = new Env();
	assertThrows(() => evaluateApply(ast, env));
});

Deno.test('initEnv(): initEnv initializes the core functions', () => {
	const env = initEnv();
	assertEquals(
		typeof env.get(new SymbolNode('+')).value,
		'function',
	);
});

Deno.test('initEnv(): initEnv initializes eval function', () => {
	const env = initEnv();
	assertEquals(
		typeof env.get(new SymbolNode('eval')).value,
		'function',
	);
});

// TODO: I messed up "not". The if might be too restrictive now
Deno.test('initEnv(): initEnv runs repl with predefined functions', () => {
	const env = initEnv();
	const fn = env.get(new SymbolNode('not')) as FunctionNode;
	assertFunctionNode(fn);
	assertEquals(
		fn.value(new NumberNode(1)),
		new BooleanNode(false),
	);
});
