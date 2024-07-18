import * as assertions from 'deno-std-assert';
import * as bdd from 'deno-std-testing-bdd';
import * as core from '../core.ts';
import {Env} from '../env.ts';
import * as main from '../stepA_mal.ts';
import * as types from '../types.ts';

const {describe, it} = bdd;

const makeEnv = () => new Env(undefined);

describe('quasiquote', () => {
	it('should quote a symbol', () => {
		const input = new types.SymbolNode('a');
		const expected = new types.ListNode([
			new types.SymbolNode('quote'),
			input,
		]);
		assertions.assertEquals(main.quasiquote(input), expected);
	});

	it('should quote a dictionary', () => {
		const input = new types.MapNode(
			new Map([['a', new types.SymbolNode('b')]]),
		);
		const expected = new types.ListNode([
			new types.SymbolNode('quote'),
			input,
		]);
		assertions.assertEquals(main.quasiquote(input), expected);
	});

	it('should quote a Symbol', () => {
		const input = new types.SymbolNode('someSymbol');
		const expected = new types.ListNode([
			new types.SymbolNode('quote'),
			input,
		]);
		assertions.assertEquals(main.quasiquote(input), expected);
	});

	// Non-sequential types
	it('should quote a nil', () => {
		const input = new types.NilNode();
		assertions.assertEquals(main.quasiquote(input), input);
	});

	it('should quote a number', () => {
		const input = new types.NumberNode(42);
		assertions.assertEquals(main.quasiquote(input), input);
	});

	// Unquoted
	it('should unquote a symbol unquote in List', () => {
		const input = new types.ListNode([
			new types.SymbolNode('unquote'),
			new types.SymbolNode('x'),
		]);
		assertions.assertEquals(
			main.quasiquote(input),
			new types.SymbolNode('x'),
		);
	});

	// Splice-unquote
	it('should concat a symbol within a list with splice-unquote', () => {
		const input = new types.ListNode([
			new types.ListNode([
				new types.SymbolNode('splice-unquote'),
				new types.SymbolNode('x'),
			]),
		]);
		const expected = new types.ListNode([
			new types.SymbolNode('concat'),
			new types.SymbolNode('x'),
			new types.ListNode([]),
		]);
		assertions.assertEquals(main.quasiquote(input), expected);
	});

	it('should cons a symbol within a list with splice-unquote', () => {
		const input = new types.ListNode([new types.SymbolNode('y')]);
		const expected = new types.ListNode([
			new types.SymbolNode('cons'),
			new types.ListNode([
				new types.SymbolNode('quote'),
				new types.SymbolNode('y'),
			]),
			new types.ListNode([]),
		]);
		assertions.assertEquals(main.quasiquote(input), expected);
	});

	it('should quote a with Vec', () => {
		const input = new types.VectorNode([new types.SymbolNode('z')]);
		const intermediate = new types.ListNode([
			new types.SymbolNode('cons'),
			new types.ListNode([
				new types.SymbolNode('quote'),
				new types.SymbolNode('z'),
			]),
			new types.ListNode([]),
		]);
		const expected = new types.ListNode([
			new types.SymbolNode('vec'),
			intermediate,
		]);
		assertions.assertEquals(main.quasiquote(input), expected);
	});
});

describe('handleDefmacro', () => {
	it('should define a macro', () => {
		const env = makeEnv();
		const ast = new types.ListNode([
			new types.SymbolNode('defmacro!'),
			new types.SymbolNode('a'),
			new types.FunctionNode(() => new types.NilNode()),
		]);
		const result = main.evaluateDefMacro(ast, env)
			.return as types.FunctionNode;

		assertions.assertEquals(
			result instanceof types.FunctionNode,
			true,
			'result is not a function.',
		);
		assertions.assertEquals(result.isMacro, true, 'result is not a macro.');
	});

	it('should throw error on invalid key', () => {
		const env = makeEnv();
		const ast = new types.ListNode([
			new types.SymbolNode('defmacro!'),
			new types.NumberNode(42),
			new types.FunctionNode(() => new types.NilNode()),
		]);

		assertions.assertThrows(
			() => main.evaluateDefMacro(ast, env),
			Error,
			'Invalid dictionary key',
		);
	});

	it('should copy metadata', () => {
		const env = makeEnv();
		const func = new types.FunctionNode(() => new types.NilNode());
		func.metadata = new types.StringNode('meta');
		const ast = new types.ListNode([
			new types.SymbolNode('defmacro!'),
			new types.SymbolNode('a'),
			func,
		]);

		const result = main.evaluateDefMacro(ast, env)
			.return as types.FunctionNode;

		assertions.assertEquals(
			result instanceof types.FunctionNode,
			true,
			'result is not a function.',
		);
		assertions.assertEquals(
			result.metadata.value,
			'meta',
			'metadata is incorrec',
		);
	});
});

describe('isMacroCall', () => {
	it('should return false for non-list ast', () => {
		const env = new Env();
		const ast = new types.SymbolNode('a');
		assertions.assertEquals(main.isMacroCall(ast, env), false);
	});

	it('should return false for list with non-Sym first element', () => {
		const env = new Env();
		const ast = new types.ListNode([new types.ListNode([])]);
		assertions.assertEquals(main.isMacroCall(ast, env), false);
	});

	it('should return false when symbol not found in any env', () => {
		const env = new Env();
		const ast = new types.ListNode([new types.SymbolNode('unknown')]);
		assertions.assertEquals(main.isMacroCall(ast, env), false);
	});

	it('should return false when symbol is found but not a function', () => {
		const env = new Env();
		env.set(new types.SymbolNode('a'), new types.ListNode([]));
		const ast = new types.ListNode([new types.SymbolNode('a')]);
		assertions.assertEquals(main.isMacroCall(ast, env), false);
	});

	it('should return false when function is not a macro', () => {
		const env = new Env();
		const fn = new types.FunctionNode(() => new types.NilNode());
		fn.isMacro = false;
		env.set(new types.SymbolNode('a'), fn);
		const ast = new types.ListNode([new types.SymbolNode('a')]);
		assertions.assertEquals(main.isMacroCall(ast, env), false);
	});

	it('should return true when function is a macro', () => {
		const env = new Env();
		const fn = new types.FunctionNode(() => new types.NilNode());
		fn.isMacro = true;
		env.set(new types.SymbolNode('a'), fn);
		const ast = new types.ListNode([new types.SymbolNode('a')]);
		assertions.assertEquals(main.isMacroCall(ast, env), true);
	});
});

describe('macroExpand', () => {
	it('should return the same AST when not a macro call', () => {
		const env = new Env();
		const ast = new types.ListNode([
			new types.SymbolNode('not_a_macro'),
			new types.SymbolNode('a'),
		]);
		const expanded = main.macroExpand(ast, env);
		assertions.assertEquals(expanded, ast);
	});

	it('should expand a single-layer macro', () => {
		const env = new Env();
		const macroFunc = new types.FunctionNode(
			(...args) =>
				new types.ListNode([new types.SymbolNode('quote'), ...args]),
		);
		macroFunc.isMacro = true;

		env.set(new types.SymbolNode('a_macro'), macroFunc);
		const ast = new types.ListNode([
			new types.SymbolNode('a_macro'),
			new types.SymbolNode('a'),
		]);
		const expanded = main.macroExpand(ast, env);

		assertions.assertEquals(
			expanded,
			new types.ListNode([
				new types.SymbolNode('quote'),
				new types.SymbolNode('a'),
			]),
		);
	});

	it('should expand nested macros', () => {
		const env = new Env();
		const macroFunc1 = new types.FunctionNode(
			(...args) =>
				new types.ListNode([new types.SymbolNode('quote'), ...args]),
		);
		macroFunc1.isMacro = true;
		const macroFunc2 = new types.FunctionNode(
			(...args) =>
				new types.ListNode([new types.SymbolNode('a_macro1'), ...args]),
		);
		macroFunc2.isMacro = true;

		env.set(new types.SymbolNode('a_macro1'), macroFunc1);
		env.set(new types.SymbolNode('a_macro2'), macroFunc2);

		const ast = new types.ListNode([
			new types.SymbolNode('a_macro2'),
			new types.SymbolNode('a'),
		]);
		const expanded = main.macroExpand(ast, env);

		assertions.assertEquals(
			expanded,
			new types.ListNode([
				new types.SymbolNode('quote'),
				new types.SymbolNode('a'),
			]),
		);
	});
});

describe('evalAst', () => {
	it('should return the value for a symbol', () => {
		const env = new Env();
		const sym = new types.SymbolNode('x');
		env.set(sym, new types.NumberNode(1));
		const result = main.evaluateAst(sym, env);
		assertions.assertEquals(result, new types.NumberNode(1));
	});

	it('should evaluate vectors', () => {
		const env = new Env();
		const vec = new types.VectorNode([new types.NumberNode(1)]);
		const result = main.evaluateAst(vec, env);
		assertions.assertEquals(
			result,
			new types.VectorNode([new types.NumberNode(1)]),
		);
	});

	it('should evaluate lists', () => {
		const env = new Env();
		const list = new types.ListNode([new types.NumberNode(1)]);
		const result = main.evaluateAst(list, env);
		assertions.assertEquals(
			result,
			new types.ListNode([new types.NumberNode(1)]),
		);
	});

	it('should evaluate dictionaries', () => {
		const env = new Env();
		const dict = new types.MapNode(
			new Map([['a', new types.NumberNode(1)]]),
		);
		const result = main.evaluateAst(dict, env);
		assertions.assertEquals(
			result,
			new types.MapNode(new Map([['a', new types.NumberNode(1)]])),
		);
	});

	it('should evaluate DomNodes', () => {
		const env = new Env();
		const domNode = new types.DomNode(
			new Map([['a', new types.NumberNode(1)]]),
		);
		const result = main.evaluateAst(domNode, env);
		assertions.assertEquals(
			result,
			new types.DomNode(new Map([['a', new types.NumberNode(1)]])),
		);
	});

	it('should return the input for unsupported types', () => {
		const env = new Env();
		const number_ = new types.NumberNode(1);
		const result = main.evaluateAst(number_, env);
		assertions.assertEquals(result, new types.NumberNode(1));
	});
});

// Test for debugging expansion:
Deno.test('Create a new macro that expands to a non-list', () => {
	// Input MAL looks like this:
	// (defmacro! emptyMacro (fn* () '"hotdog") ;=>#<fn>
	// (emptyMacro) ;=> "hotdog"
	const env = makeEnv();
	const variableName = new types.SymbolNode('emptyMacro');
	const quotedList = new types.ListNode([
		new types.SymbolNode('quote'),
		new types.StringNode(''),
	]);
	const variableValue = new types.FunctionNode(() => quotedList);
	const defMacroSymbol = new types.SymbolNode('defmacro!');
	const defMacroList = new types.ListNode([
		defMacroSymbol,
		variableName,
		variableValue,
	]);
	const createEmptyMacro = main.evaluate(defMacroList, env);
	console.log(JSON.stringify(createEmptyMacro));

	const emptyMacroCall = new types.ListNode([
		new types.SymbolNode('emptyMacro'),
	]);
	const result = main.evaluate(emptyMacroCall, env);

	assertions.assertEquals(result, new types.StringNode(''));
});

describe('evaluate', () => {
	it("should handle 'def!' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('def!'),
				new types.SymbolNode('a'),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'let*' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('let*'),
				new types.ListNode([]),
				new types.NumberNode(1),
			]),
			env,
		);
		// Tail-call
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'quote' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('quote'),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'quasiquoteexpand' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('quasiquoteexpand'),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'quasiquote' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('quasiquote'),
				new types.NumberNode(1),
			]),
			env,
		);
		// Tail-call
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'defmacro!' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('defmacro!'),
				new types.SymbolNode('a'),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'macroexpand' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('macroexpand'),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'try*' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('try*'),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'do' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('do'),
				new types.NumberNode(1),
			]),
			env,
		);
		// Tail-call
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'if' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('if'),
				new types.BooleanNode(true),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});

	it("should handle 'fn*' correctly", () => {
		const env = new Env();
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('fn*'),
				new types.ListNode([]),
				new types.NumberNode(1),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.FunctionNode, true);
	});

	it('should handle default case correctly', () => {
		const env = new Env();
		env.set(
			new types.SymbolNode('+'),
			new types.FunctionNode(() => new types.NumberNode(3)),
		);
		const result = main.evaluate(
			new types.ListNode([
				new types.SymbolNode('+'),
				new types.NumberNode(1),
				new types.NumberNode(2),
			]),
			env,
		);
		assertions.assertEquals(result instanceof types.NumberNode, true);
	});
});

describe('handleDef', () => {
	it('should define a global variable', () => {
		const env = new Env();
		const variableName = new types.SymbolNode('y');
		const variableValue = new types.NumberNode(3);
		const ast = new types.ListNode([
			new types.SymbolNode('def!'),
			variableName,
			variableValue,
		]);

		const result = main.evaluateDef(ast, env);

		// Validate the return type and value
		assertions.assertEquals(result.return, variableValue);

		// Validate if the variable is set in environment
		assertions.assertEquals(env.get(variableName), variableValue);
	});

	it('should throw an error for incorrect AST', () => {
		const env = new Env();
		const ast = new types.ListNode([new types.SymbolNode('def!')]);

		assertions.assertThrows(() => {
			main.evaluateDef(ast, env);
		});
	});
});

describe('handleLet', () => {
	it('should define variables in a new scope', () => {
		const env = new Env();
		const varName1 = new types.SymbolNode('a');
		const varValue1 = new types.NumberNode(1);
		const varName2 = new types.SymbolNode('b');
		const varValue2 = new types.NumberNode(2);

		const bindings = new types.ListNode([
			varName1,
			varValue1,
			varName2,
			varValue2,
		]);
		const body = new types.SymbolNode('a');
		const ast = new types.ListNode([
			new types.SymbolNode('let*'),
			bindings,
			body,
		]);

		const result = main.evaluateLet(ast, env);

		assertions.assertEquals(result.continue?.ast, body);
		assertions.assertEquals(result.continue?.env.get(varName1), varValue1);
		assertions.assertEquals(result.continue?.env.get(varName2), varValue2);
	});

	it('allows shadowing', () => {
		const env = new Env();
		env.set(new types.SymbolNode('a'), new types.NumberNode(2));
		const bindings = new types.ListNode([
			new types.SymbolNode('a'),
			new types.NumberNode(3),
		]);
		const body = new types.SymbolNode('a');
		const ast = new types.ListNode([
			new types.SymbolNode('let*'),
			bindings,
			body,
		]);

		const result = main.evaluateLet(ast, env);
		const newEnv = result.continue?.env;
		const finalAst = result.continue?.ast;

		assertions.assertExists(finalAst);
		assertions.assertExists(newEnv);
		assertions.assertEquals(
			main.evaluate(finalAst, newEnv),
			new types.NumberNode(3),
		);
	});

	it('throws for incorrect AST', () => {
		const env = new Env();
		const ast = new types.ListNode([new types.SymbolNode('let*')]);

		assertions.assertThrows(() => {
			main.evaluateLet(ast, env);
		});
	});

	it('should throw an error for incorrect AST', () => {
		const env = new Env();
		const ast = new types.ListNode([new types.SymbolNode('let*')]);

		assertions.assertThrows(() => {
			main.evaluateLet(ast, env);
		});
	});
});

describe('handleQuote', () => {
	it('with a number', () => {
		const input = new types.NumberNode(7);
		const quoted = new types.ListNode([
			new types.SymbolNode('quote'),
			input,
		]);
		assertions.assertEquals(
			main.evaluateQuote(quoted, new Env(undefined)),
			types.returnResult(input),
		);
	});

	it('with a list of numbers', () => {
		const input = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.NumberNode(3),
		]);
		const quoted = new types.ListNode([
			new types.SymbolNode('quote'),
			input,
		]);
		assertions.assertEquals(
			main.evaluateQuote(quoted, new Env(undefined)),
			types.returnResult(input),
		);
	});

	it('with nested lists', () => {
		const input = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
			new types.ListNode([
				new types.NumberNode(3),
				new types.NumberNode(4),
			]),
		]);
		const quoted = new types.ListNode([
			new types.SymbolNode('quote'),
			input,
		]);
		assertions.assertEquals(
			main.evaluateQuote(quoted, new Env(undefined)),
			types.returnResult(input),
		);
	});

	it('should return the quoted expression', () => {
		const env = new Env();
		const quotedExpr = new types.ListNode([
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		const ast = new types.ListNode([
			new types.SymbolNode('quote'),
			quotedExpr,
		]);

		const result = main.evaluateQuote(ast, env);

		assertions.assertEquals(result.return, quotedExpr);
	});

	it('should throw an error for incorrect AST', () => {
		const env = new Env();
		const ast = new types.ListNode([new types.SymbolNode('quote')]);

		assertions.assertThrows(() => {
			main.evaluateQuote(ast, env);
		});
	});
});

describe('handleQuasiQuoteExpand', () => {
	it('returns expanded form', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('quasiquoteexpand'),
			new types.ListNode([
				new types.SymbolNode('unquote'),
				new types.SymbolNode('a'),
			]),
		]);

		const result = main.evaluateQuasiQuoteExpand(ast, makeEnv());
		const expectedResult = main.quasiquote(
			new types.ListNode([
				new types.SymbolNode('unquote'),
				new types.SymbolNode('a'),
			]),
		);

		assertions.assertEquals(result.return, expectedResult);
	});

	it('throws for incorrect AST', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('quasiquoteexpand'),
		]);

		assertions.assertThrows(() => {
			main.evaluateQuasiQuoteExpand(ast, makeEnv());
		});
	});
});

describe('handleQuasiQuote', () => {
	it('performs quasiquote transformation', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('quasiquote'),
			new types.ListNode([
				new types.SymbolNode('unquote'),
				new types.SymbolNode('a'),
			]),
		]);

		const env = new Env();
		const result = main.evaluateQuasiQuote(ast, env);
		const expectedResult = main.quasiquote(
			new types.ListNode([
				new types.SymbolNode('unquote'),
				new types.SymbolNode('a'),
			]),
		);

		assertions.assertEquals(result.continue?.ast, expectedResult);
		assertions.assertEquals(result.continue?.env, env);
	});

	it('throws for incorrect AST', () => {
		const ast = new types.ListNode([new types.SymbolNode('quasiquote')]);

		assertions.assertThrows(() => {
			main.evaluateQuasiQuote(ast, makeEnv());
		});
	});
});

describe('handleDefMacro', () => {
	it('defines a macro', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('defmacro!'),
			new types.SymbolNode('one'),
			new types.ListNode([
				new types.SymbolNode('fn*'),
				new types.ListNode([]),
				new types.NumberNode(1),
			]),
		]);

		const env = new Env();
		const result = main.evaluateDefMacro(ast, env);
		const fn = env.get(new types.SymbolNode('one')) as types.FunctionNode;

		assertions.assertEquals(fn instanceof types.FunctionNode, true);
		assertions.assertEquals(fn.isMacro, true);
		assertions.assertEquals(result.return, fn);
	});

	it('throws for incorrect AST', () => {
		const ast = new types.ListNode([new types.SymbolNode('defmacro!')]);

		assertions.assertThrows(() => {
			main.evaluateDefMacro(ast, makeEnv());
		});
	});
});

describe('handleDo', () => {
	it('processes a single action and returns it', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('do'),
			new types.NumberNode(3),
		]);
		const env = new Env();
		const result = main.evaluateDo(ast, env);
		assertions.assertEquals(result.continue?.ast, new types.NumberNode(3));
	});

	it('processes multiple actions and returns the last one', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('do'),
			new types.NumberNode(3),
			new types.NumberNode(4),
			new types.StringNode('hello'),
		]);

		const env = new Env();
		const result = main.evaluateDo(ast, env);
		assertions.assertEquals(
			result.continue?.ast,
			new types.StringNode('hello'),
		);
	});
});

describe('handleTry', () => {
	it('evaluates without errors', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('try*'),
			new types.NumberNode(42),
		]);
		const env = new Env();
		const result = main.evaluateTry(ast, env);
		assertions.assertEquals(result.return, new types.NumberNode(42));
	});

	it('catches thrown error and handles it', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('try*'),
			new types.ListNode([
				new types.SymbolNode('custom-throw'),
				new types.StringNode('error!'),
			]),
			new types.ListNode([
				new types.SymbolNode('catch*'),
				new types.SymbolNode('e'),
				new types.SymbolNode('e'),
			]),
		]);
		const env = new Env();
		env.set(
			new types.SymbolNode('custom-throw'),
			new types.FunctionNode((_args, _env) => {
				// eslint-disable-next-line @typescript-eslint/no-throw-literal
				throw 'error!';
			}),
		);
		const result = main.evaluateTry(ast, env);
		assertions.assertEquals(
			result.return,
			new types.ErrorNode(new types.StringNode('"error!"')),
		);
	});

	it('catches native error and handles it', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('try*'),
			new types.ListNode([
				new types.SymbolNode('throw-native'),
				new types.StringNode('native error!'),
			]),
			new types.ListNode([
				new types.SymbolNode('catch*'),
				new types.SymbolNode('e'),
				new types.SymbolNode('e'),
			]),
		]);
		const env = new Env();
		env.set(
			new types.SymbolNode('throw-native'),
			new types.FunctionNode((_args, _env) => {
				throw new Error('native error!');
			}),
		);
		const result = main.evaluateTry(ast, env);
		assertions.assertEquals(
			result.return,
			new types.ErrorNode(new types.StringNode('native error!')),
		);
	});
});

describe('handleIf', () => {
	it('evaluates true condition and returns thenExpr', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('if'),
			new types.BooleanNode(true),
			new types.NumberNode(42),
			new types.NumberNode(0),
		]);
		const env = new Env();
		const result = main.evaluateIf(ast, env);
		assertions.assertEquals(result.continue?.ast, new types.NumberNode(42));
	});

	it('evaluates false condition and returns elseExpr', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('if'),
			new types.BooleanNode(false),
			new types.NumberNode(42),
			new types.NumberNode(0),
		]);
		const env = new Env();
		const result = main.evaluateIf(ast, env);
		assertions.assertEquals(result.continue?.ast, new types.NumberNode(0));
	});

	it('evaluates null condition and returns elseExpr', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('if'),
			new types.NilNode(),
			new types.NumberNode(42),
			new types.NumberNode(0),
		]);
		const env = new Env();
		const result = main.evaluateIf(ast, env);
		assertions.assertEquals(result.continue?.ast, new types.NumberNode(0));
	});

	it('evaluates true condition without elseExpr returns thenExpr', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('if'),
			new types.BooleanNode(true),
			new types.NumberNode(42),
		]);
		const env = new Env();
		const result = main.evaluateIf(ast, env);
		assertions.assertEquals(result.continue?.ast, new types.NumberNode(42));
	});

	it('evaluates false condition without elseExpr returns nil', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('if'),
			new types.BooleanNode(false),
			new types.NumberNode(42),
		]);
		const env = new Env();
		const result = main.evaluateIf(ast, env);
		assertions.assertEquals(result.return, new types.NilNode());
	});

	it('evaluates null condition without elseExpr returns nil', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('if'),
			new types.NilNode(),
			new types.NumberNode(42),
		]);
		const env = new Env();
		const result = main.evaluateIf(ast, env);
		assertions.assertEquals(result.return, new types.NilNode());
	});
});

describe('handleFn', () => {
	it('creates a simple anonymous function', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('fn*'),
			new types.ListNode([
				new types.SymbolNode('a'),
				new types.SymbolNode('b'),
			]),
			new types.ListNode([
				new types.SymbolNode('+'),
				new types.SymbolNode('a'),
				new types.SymbolNode('b'),
			]),
		]);
		const env = new Env();
		env.set(
			new types.SymbolNode('+'),
			new types.FunctionNode(
				(...args: types.AstNode[]) =>
					new types.NumberNode(
						(args[0] as types.NumberNode).value +
							(args[1] as types.NumberNode).value,
					),
			),
		);
		const result = main.evaluateFn(ast, env);
		const fn = result.return as types.FunctionNode;
		assertions.assertExists(fn);
		const fnResult = fn.value(
			new types.NumberNode(2),
			new types.NumberNode(3),
		);
		assertions.assertEquals(fnResult, new types.NumberNode(5));
	});

	it('creates a function with empty args and returns body value', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('fn*'),
			new types.ListNode([]),
			new types.NumberNode(10),
		]);
		const env = new Env();
		const result = main.evaluateFn(ast, env);
		const fn = result.return as types.FunctionNode;
		assertions.assertExists(fn);
		const fnResult = fn.value();
		assertions.assertEquals(fnResult, new types.NumberNode(10));
	});

	it('captures environment in closure', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('fn*'),
			new types.ListNode([new types.SymbolNode('a')]),
			new types.ListNode([
				new types.SymbolNode('+'),
				new types.SymbolNode('a'),
				new types.SymbolNode('b'),
			]),
		]);
		const env = new Env();
		env.set(
			new types.SymbolNode('+'),
			new types.FunctionNode(
				(...args: types.AstNode[]) =>
					new types.NumberNode(
						(args[0] as types.NumberNode).value +
							(args[1] as types.NumberNode).value,
					),
			),
		);
		env.set(new types.SymbolNode('b'), new types.NumberNode(5));

		const result = main.evaluateFn(ast, env);
		const fn = result.return as types.FunctionNode;
		assertions.assertExists(fn);
		const fnResult = fn.value(new types.NumberNode(2));
		assertions.assertEquals(fnResult, new types.NumberNode(7));
	});
});

describe('handleDefault', () => {
	it('applies built-in function correctly', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('+'),
			new types.NumberNode(1),
			new types.NumberNode(2),
		]);
		const env = new Env();
		env.set(new types.SymbolNode('+'), new types.FunctionNode(core.add));
		const result = main.evaluateApply(ast, env);
		assertions.assertEquals(result.return, new types.NumberNode(3));
	});

	it('applies closure correctly', () => {
		const ast = new types.ListNode([
			new types.SymbolNode('add2'),
			new types.NumberNode(5),
		]);
		const closureMeta: types.ClosureMetadata = {
			ast: new types.ListNode([
				new types.SymbolNode('+'),
				new types.SymbolNode('a'),
				new types.NumberNode(2),
			]),
			env: new Env(),
			parameters: [new types.SymbolNode('a')],
		};
		closureMeta.env.set(
			new types.SymbolNode('+'),
			new types.FunctionNode(core.add),
		);
		const add2 = new types.FunctionNode(
			() => new types.NilNode(),
			closureMeta,
		);
		const env = new Env();
		env.set(new types.SymbolNode('add2'), add2);
		const result = main.evaluateApply(ast, env);
		assertions.assertEquals(
			result.continue?.ast,
			new types.ListNode([
				new types.SymbolNode('+'),
				new types.SymbolNode('a'),
				new types.NumberNode(2),
			]),
		);
	});

	it('returns function itself if it is not applicable', () => {
		const ast = new types.ListNode([new types.StringNode('non-fn')]);
		const env = new Env();
		const result = main.evaluateApply(ast, env);
		assertions.assertEquals(result.return, new types.StringNode('non-fn'));
	});

	it('throws error for non-list input', () => {
		const ast = new types.NumberNode(42);
		const env = new Env();
		assertions.assertThrows(() => main.evaluateApply(ast, env));
	});
});

describe('initEnv', () => {
	it('initEnv initializes the core functions', () => {
		const env = main.initEnv();
		assertions.assertEquals(
			typeof env.get(new types.SymbolNode('+')).value,
			'function',
		);
	});

	it('initEnv initializes eval function', () => {
		const env = main.initEnv();
		assertions.assertEquals(
			typeof env.get(new types.SymbolNode('eval')).value,
			'function',
		);
	});

	it('initEnv runs repl with predefined functions', () => {
		const env = main.initEnv();
		const fn = env.get(new types.SymbolNode('not'));
		types.assertFunctionNode(fn);
		assertions.assertEquals(
			fn.value(new types.NumberNode(1)),
			new types.BooleanNode(false),
		);
	});
});
