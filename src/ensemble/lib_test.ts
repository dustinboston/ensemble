import { add } from "./core.ts";
import { Env } from "./env.ts";
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
} from "./lib.ts";
import runner from "./tests/test_runner.ts";
import {
	type AstNode,
	type ClosureMetadata,
	FunctionNode,
	type NumberNode,
	assertDefined,
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
	isFunctionNode,
	isNumberNode,
} from "./types.ts";

runner.test("quasiquote(): should quote a symbol", () => {
	const input = createSymbolNode("a");
	const expected = createListNode([createSymbolNode("quote"), input]);
	runner.assert(quasiQuote(input), expected);
});

runner.test("quasiquote(): should quote a dictionary", () => {
	const input = createMapNode(new Map([["a", createSymbolNode("b")]]));
	const expected = createListNode([createSymbolNode("quote"), input]);
	runner.assert(quasiQuote(input), expected);
});

runner.test("quasiquote(): should quote a Symbol", () => {
	const input = createSymbolNode("someSymbol");
	const expected = createListNode([createSymbolNode("quote"), input]);
	runner.assert(quasiQuote(input), expected);
});

// Non-sequential types
runner.test("quasiquote(): should quote a nil", () => {
	const input = createNilNode();
	runner.assert(quasiQuote(input), input);
});

runner.test("quasiquote(): should quote a number", () => {
	const input = createNumberNode(42);
	runner.assert(quasiQuote(input), input);
});

// Unquoted
runner.test("quasiquote(): should unquote a symbol unquote in List", () => {
	const input = createListNode([
		createSymbolNode("unquote"),
		createSymbolNode("x"),
	]);
	runner.assert(quasiQuote(input), createSymbolNode("x"));
});

// Splice-unquote
runner.test(
	"quasiquote(): should concat a symbol within a list with splice-unquote",
	() => {
		const input = createListNode([
			createListNode([
				createSymbolNode("splice-unquote"),
				createSymbolNode("x"),
			]),
		]);
		const expected = createListNode([
			createSymbolNode("concat"),
			createSymbolNode("x"),
			createListNode([]),
		]);
		runner.assert(quasiQuote(input), expected);
	},
);

runner.test(
	"quasiquote(): should cons a symbol within a list with splice-unquote",
	() => {
		const input = createListNode([createSymbolNode("y")]);
		const expected = createListNode([
			createSymbolNode("cons"),
			createListNode([createSymbolNode("quote"), createSymbolNode("y")]),
			createListNode([]),
		]);
		runner.assert(quasiQuote(input), expected);
	},
);

runner.test("quasiquote(): should quote a with Vec", () => {
	const input = createVectorNode([createSymbolNode("z")]);
	const intermediate = createListNode([
		createSymbolNode("cons"),
		createListNode([createSymbolNode("quote"), createSymbolNode("z")]),
		createListNode([]),
	]);
	const expected = createListNode([createSymbolNode("vec"), intermediate]);
	runner.assert(quasiQuote(input), expected);
});

runner.test("evaluateDefMacro(): should define a macro", () => {
	const result = evaluateDefMacro(
		createListNode([
			createSymbolNode("defmacro!"),
			createSymbolNode("a"),
			createFunctionNode(() => createNilNode()),
		]),
		new Env(),
	);

	const fn = result.return as FunctionNode;
	runner.assert(fn instanceof FunctionNode, true);
	runner.assert(fn.isMacro, true);
});

runner.test("evaluateDefMacro(): should throw error on invalid key", () => {
	const env = new Env();
	const ast = createListNode([
		createSymbolNode("defmacro!"),
		createNumberNode(42),
		createFunctionNode(() => createNilNode()),
	]);

	let threw = false;
	try {
		evaluateDefMacro(ast, env);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateDefMacro(): should copy metadata", () => {
	const result = evaluateDefMacro(
		createListNode([
			createSymbolNode("defmacro!"),
			createSymbolNode("a"),
			createFunctionNode(
				() => createNilNode(),
				undefined, // closureMetadata
				false, // isMacro
				createStringNode("meta"), // metadata
			),
		]),
		new Env(),
	);

	const fn = result.return as FunctionNode;
	runner.assert(fn instanceof FunctionNode, true);
	runner.assert(fn.metadata?.value, "meta");
});

runner.test("isMacroCall(): should return false for non-list ast", () => {
	const env = new Env();
	const ast = createSymbolNode("a");
	runner.assert(isMacroCall(ast, env), false);
});

runner.test(
	"isMacroCall(): should return false for list with non-Sym first element",
	() => {
		const env = new Env();
		const ast = createListNode([createListNode([])]);
		runner.assert(isMacroCall(ast, env), false);
	},
);

runner.test(
	"isMacroCall(): should return false when symbol not found in any env",
	() => {
		const env = new Env();
		const ast = createListNode([createSymbolNode("unknown")]);
		runner.assert(isMacroCall(ast, env), false);
	},
);

runner.test(
	"isMacroCall(): should return false when symbol is found but not a function",
	() => {
		const env = new Env();
		env.set(createSymbolNode("a"), createListNode([]));
		const ast = createListNode([createSymbolNode("a")]);
		runner.assert(isMacroCall(ast, env), false);
	},
);

runner.test(
	"isMacroCall(): should return false when function is not a macro",
	() => {
		const env = new Env();
		const fn = createFunctionNode(() => createNilNode());
		fn.isMacro = false;
		env.set(createSymbolNode("a"), fn);
		const ast = createListNode([createSymbolNode("a")]);
		runner.assert(isMacroCall(ast, env), false);
	},
);

runner.test(
	"isMacroCall(): should return true when function is a macro",
	() => {
		const env = new Env();
		const fn = createFunctionNode(() => createNilNode());
		fn.isMacro = true;
		env.set(createSymbolNode("a"), fn);
		const ast = createListNode([createSymbolNode("a")]);
		runner.assert(isMacroCall(ast, env), true);
	},
);

runner.test(
	"macroExpand(): should return the same AST when not a macro call",
	() => {
		const env = new Env();
		const ast = createListNode([
			createSymbolNode("not_a_macro"),
			createSymbolNode("a"),
		]);
		const expanded = macroExpand(ast, env);
		runner.assert(expanded, ast);
	},
);

runner.test("macroExpand(): should expand a single-layer macro", () => {
	const env = new Env();
	const macroFunc = createFunctionNode((...args) =>
		createListNode([createSymbolNode("quote"), ...args]),
	);
	macroFunc.isMacro = true;

	env.set(createSymbolNode("a_macro"), macroFunc);
	const ast = createListNode([
		createSymbolNode("a_macro"),
		createSymbolNode("a"),
	]);
	const expanded = macroExpand(ast, env);

	runner.assert(
		expanded,
		createListNode([createSymbolNode("quote"), createSymbolNode("a")]),
	);
});

runner.test("macroExpand(): should expand nested macros", () => {
	const env = new Env();
	const macroFunc1 = createFunctionNode((...args) =>
		createListNode([createSymbolNode("quote"), ...args]),
	);
	macroFunc1.isMacro = true;
	const macroFunc2 = createFunctionNode((...args) =>
		createListNode([createSymbolNode("a_macro1"), ...args]),
	);
	macroFunc2.isMacro = true;

	env.set(createSymbolNode("a_macro1"), macroFunc1);
	env.set(createSymbolNode("a_macro2"), macroFunc2);

	const ast = createListNode([
		createSymbolNode("a_macro2"),
		createSymbolNode("a"),
	]);
	const expanded = macroExpand(ast, env);

	runner.assert(
		expanded,
		createListNode([createSymbolNode("quote"), createSymbolNode("a")]),
	);
});

runner.test("evaluateAst(): should return the value for a symbol", () => {
	const env = new Env();
	const sym = createSymbolNode("x");
	env.set(sym, createNumberNode(1));
	const result = evaluateAst(sym, env);
	runner.assert(result, createNumberNode(1));
});

runner.test("evaluateAst(): should evaluate vectors", () => {
	const env = new Env();
	const vec = createVectorNode([createNumberNode(1)]);
	const result = evaluateAst(vec, env);
	runner.assert(result, createVectorNode([createNumberNode(1)]));
});

runner.test("evaluateAst(): should evaluate lists", () => {
	const env = new Env();
	const list = createListNode([createNumberNode(1)]);
	const result = evaluateAst(list, env);
	runner.assert(result, createListNode([createNumberNode(1)]));
});

runner.test("evaluateAst(): should evaluate dictionaries", () => {
	const env = new Env();
	const dict = createMapNode(new Map([["a", createNumberNode(1)]]));
	const result = evaluateAst(dict, env);
	runner.assert(result, createMapNode(new Map([["a", createNumberNode(1)]])));
});

runner.test("evaluateAst(): should evaluate DomNodes", () => {
	const env = new Env();
	const domNode = createDomNode(
		"a",
		new Map([["href", createStringNode("https://example.com")]]),
	);
	const result = evaluateAst(domNode, env);
	runner.assert(
		result,
		createDomNode(
			"a",
			new Map([["href", createStringNode("https://example.com")]]),
		),
	);
});

runner.test(
	"evaluateAst(): should return the input for unsupported types",
	() => {
		const env = new Env();
		const number_ = createNumberNode(1);
		const result = evaluateAst(number_, env);
		runner.assert(result, createNumberNode(1));
	},
);

runner.test("evaluate(): should handle 'var' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([
			createSymbolNode("var"),
			createSymbolNode("a"),
			createNumberNode(1),
		]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'const' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([
			createSymbolNode("const"),
			createListNode([]),
			createNumberNode(1),
		]),
		env,
	);
	// Tail-call
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'quote' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([createSymbolNode("quote"), createNumberNode(1)]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'quasiquoteexpand' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([createSymbolNode("quasiquoteexpand"), createNumberNode(1)]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'quasiquote' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([createSymbolNode("quasiquote"), createNumberNode(1)]),
		env,
	);
	// Tail-call
	runner.assert(isNumberNode(result), true);
});

// Test for debugging expansion:
runner.test("evaluate(): Should create a macro", () => {
	// Input MAL looks like this:
	// (defmacro! hotdog (fn* () "🌭") ;=>#<fn>
	// (hotdog) ;=> "🌭"

	const env = new Env();
	evaluate(
		createListNode([
			createSymbolNode("defmacro!"),
			createSymbolNode("hotdog"),
			createFunctionNode(() => createStringNode("🌭")),
		]),
		env,
	);

	const result = evaluate(createListNode([createSymbolNode("hotdog")]), env);

	runner.assert(result, createStringNode("🌭"));
});

runner.test("evaluate(): 'defmacro!' body can be anything", () => {
	const result = evaluate(
		createListNode([
			createSymbolNode("defmacro!"),
			createSymbolNode("a"),
			createNumberNode(1),
		]),
		new Env(),
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'macroexpand' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([createSymbolNode("macroexpand"), createNumberNode(1)]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'try' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([createSymbolNode("try"), createNumberNode(1)]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'do' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([createSymbolNode("do"), createNumberNode(1)]),
		env,
	);
	// Tail-call
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'if' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([
			createSymbolNode("if"),
			createBooleanNode(true),
			createNumberNode(1),
		]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluate(): should handle 'fn*' correctly", () => {
	const env = new Env();
	const result = evaluate(
		createListNode([
			createSymbolNode("fn*"),
			createListNode([]),
			createNumberNode(1),
		]),
		env,
	);
	runner.assert(isFunctionNode(result), true);
});

runner.test("evaluate(): should handle default case correctly", () => {
	const env = new Env();
	env.set(
		createSymbolNode("+"),
		createFunctionNode(() => createNumberNode(3)),
	);
	const result = evaluate(
		createListNode([
			createSymbolNode("+"),
			createNumberNode(1),
			createNumberNode(2),
		]),
		env,
	);
	runner.assert(isNumberNode(result), true);
});

runner.test("evaluateDef(): should define a global variable", () => {
	const env = new Env();
	const variableName = createSymbolNode("y");
	const variableValue = createNumberNode(3);
	const ast = createListNode([
		createSymbolNode("var"),
		variableName,
		variableValue,
	]);

	const result = evaluateDef(ast, env);

	// Validate the return type and value
	runner.assert(result.return, variableValue);

	// Validate if the variable is set in environment
	runner.assert(env.get(variableName), variableValue);
});

runner.test("evaluateDef(): should throw an error for incorrect AST", () => {
	const env = new Env();
	const ast = createListNode([createSymbolNode("def!")]);

	let threw = false;
	try {
		evaluateDef(ast, env);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateLet(): should define variables in a new scope", () => {
	const env = new Env();
	const varName1 = createSymbolNode("a");
	const varValue1 = createNumberNode(1);
	const varName2 = createSymbolNode("b");
	const varValue2 = createNumberNode(2);

	const bindings = createListNode([varName1, varValue1, varName2, varValue2]);
	const body = createSymbolNode("a");
	const ast = createListNode([createSymbolNode("const"), bindings, body]);

	const result = evaluateLet(ast, env);

	assertDefined(result.continue);
	runner.assert(result.continue?.ast, body);
	runner.assert(result.continue?.env.get(varName1), varValue1);
	runner.assert(result.continue?.env.get(varName2), varValue2);
});

runner.test("evaluateLet(): allows shadowing", () => {
	const env = new Env();
	env.set(createSymbolNode("a"), createNumberNode(2));
	const bindings = createListNode([createSymbolNode("a"), createNumberNode(3)]);
	const body = createSymbolNode("a");
	const ast = createListNode([createSymbolNode("const"), bindings, body]);

	const result = evaluateLet(ast, env);
	const newEnv = result.continue?.env;
	const finalAst = result.continue?.ast;

	runner.assert(finalAst !== undefined, true);
	runner.assert(newEnv !== undefined, true);
	runner.assert(finalAst !== undefined, true);
	if (finalAst === undefined || newEnv === undefined) {
		throw new Error("finalAst should not be undefined!");
	}
	runner.assert(evaluate(finalAst, newEnv), createNumberNode(3));
});

runner.test("evaluateLet(): throws for incorrect AST", () => {
	const env = new Env();
	const ast = createListNode([createSymbolNode("let*")]);

	let threw = false;
	try {
		evaluateLet(ast, env);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateQuote(): with a number", () => {
	const input = createNumberNode(7);
	const quoted = createListNode([createSymbolNode("quote"), input]);
	const result = evaluateQuote(quoted, new Env(undefined));
	runner.assert(result.return, input);
});

runner.test("evaluateQuote(): with a list of numbers", () => {
	const input = createListNode([
		createNumberNode(1),
		createNumberNode(2),
		createNumberNode(3),
	]);
	const quoted = createListNode([createSymbolNode("quote"), input]);
	const result = evaluateQuote(quoted, new Env(undefined));
	runner.assert(result.return, input);
});

runner.test("evaluateQuote(): with nested lists", () => {
	const input = createListNode([
		createNumberNode(1),
		createNumberNode(2),
		createListNode([createNumberNode(3), createNumberNode(4)]),
	]);
	const quoted = createListNode([createSymbolNode("quote"), input]);
	const result = evaluateQuote(quoted, new Env(undefined));
	runner.assert(result.return, input);
});

runner.test("evaluateQuote(): should return the quoted expression", () => {
	const env = new Env();
	const quotedExpr = createListNode([createNumberNode(1), createNumberNode(2)]);
	const ast = createListNode([createSymbolNode("quote"), quotedExpr]);

	const result = evaluateQuote(ast, env);

	runner.assert(result.return, quotedExpr);
});

runner.test("evaluateQuote(): should throw an error for incorrect AST", () => {
	const env = new Env();
	const ast = createListNode([createSymbolNode("quote")]);

	let threw = false;
	try {
		evaluateQuote(ast, env);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateQuasiQuoteExpand(): returns expanded form", () => {
	const ast = createListNode([
		createSymbolNode("quasiquoteexpand"),
		createListNode([createSymbolNode("unquote"), createSymbolNode("a")]),
	]);

	const result = evaluateQuasiQuoteExpand(ast, new Env());
	const expectedResult = quasiQuote(
		createListNode([createSymbolNode("unquote"), createSymbolNode("a")]),
	);

	runner.assert(result.return, expectedResult);
});

runner.test("evaluateQuasiQuoteExpand(): throws for incorrect AST", () => {
	const ast = createListNode([createSymbolNode("quasiquoteexpand")]);

	let threw = false;
	try {
		evaluateQuasiQuoteExpand(ast, new Env());
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateQuasiQuote(): performs quasiquote transformation", () => {
	const ast = createListNode([
		createSymbolNode("quasiquote"),
		createListNode([createSymbolNode("unquote"), createSymbolNode("a")]),
	]);

	const env = new Env();
	const result = evaluateQuasiQuote(ast, env);
	const expectedResult = quasiQuote(
		createListNode([createSymbolNode("unquote"), createSymbolNode("a")]),
	);

	runner.assert(result.continue?.ast, expectedResult);
	runner.assert(result.continue?.env, env);
});

runner.test("evaluateQuasiQuote(): throws for incorrect AST", () => {
	const ast = createListNode([createSymbolNode("quasiquote")]);

	let threw = false;
	try {
		evaluateQuasiQuote(ast, new Env());
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateDefMacro(): defines a macro", () => {
	const ast = createListNode([
		createSymbolNode("defmacro!"),
		createSymbolNode("one"),
		createListNode([
			createSymbolNode("fn*"),
			createListNode([]),
			createNumberNode(1),
		]),
	]);

	const env = new Env();
	const result = evaluateDefMacro(ast, env);
	const fn = env.get(createSymbolNode("one")) as FunctionNode;

	runner.assert(isFunctionNode(fn), true);
	runner.assert(fn.isMacro, true);
	runner.assert(result.return, fn);
});

runner.test("evaluateDefMacro(): throws for incorrect AST", () => {
	const ast = createListNode([createSymbolNode("defmacro!")]);

	let threw = false;
	try {
		evaluateDefMacro(ast, new Env());
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("evaluateDo(): processes a single action and returns it", () => {
	const ast = createListNode([createSymbolNode("do"), createNumberNode(3)]);
	const env = new Env();
	const result = evaluateDo(ast, env);
	runner.assert(result.continue?.ast, createNumberNode(3));
});

runner.test(
	"evaluateDo(): processes multiple actions and returns the last one",
	() => {
		const ast = createListNode([
			createSymbolNode("do"),
			createNumberNode(3),
			createNumberNode(4),
			createStringNode("hello"),
		]);

		const env = new Env();
		const result = evaluateDo(ast, env);
		runner.assert(result.continue?.ast, createStringNode("hello"));
	},
);

runner.test("evaluateTry(): evaluates without errors", () => {
	const ast = createListNode([createSymbolNode("try"), createNumberNode(42)]);
	const env = new Env();
	const result = evaluateTry(ast, env);
	runner.assert(result.return, createNumberNode(42));
});

runner.test("evaluateTry(): catches thrown error and handles it", () => {
	const ast = createListNode([
		createSymbolNode("try"),
		createListNode([
			createSymbolNode("custom-throw"),
			createStringNode("we shouldnt be here"),
		]),
		createListNode([
			createSymbolNode("catch"),
			createSymbolNode("e"),
			createListNode([createSymbolNode("str"), createStringNode("caught!")]),
		]),
	]);
	const env = initEnv();
	env.set(
		createSymbolNode("custom-throw"),
		createFunctionNode((_args, _env) => {
			throw "error!";
		}),
	);
	const result = evaluateTry(ast, env);
	runner.assert(result.return, createStringNode("caught!"));
});

runner.test("evaluateTry(): catches native error and handles it", () => {
	const ast = createListNode([
		createSymbolNode("try"),
		createListNode([
			createSymbolNode("throw-native"),
			createStringNode("native error!"),
		]),
		createListNode([
			createSymbolNode("catch"),
			createSymbolNode("e"),
			createListNode([createSymbolNode("str"), createStringNode("caught!")]),
		]),
	]);
	const env = initEnv();
	env.set(
		createSymbolNode("throw-native"),
		createFunctionNode((_args, _env) => {
			throw new Error("native error!");
		}),
	);
	const result = evaluateTry(ast, env);
	runner.assert(result.return, createStringNode("caught!"));
});

runner.test(
	"evaluateIf(): evaluates true condition and returns thenExpr",
	() => {
		const ast = createListNode([
			createSymbolNode("if"),
			createBooleanNode(true),
			createNumberNode(42),
			createNumberNode(0),
		]);
		const env = new Env();
		const result = evaluateIf(ast, env);
		runner.assert(result, {
			return: undefined,
			continue: { ast: createNumberNode(42), env: env },
		});
	},
);

runner.test(
	"evaluateIf(): evaluates false condition and returns elseExpr",
	() => {
		const ast = createListNode([
			createSymbolNode("if"),
			createBooleanNode(false),
			createNumberNode(42),
			createNumberNode(0),
		]);
		const env = new Env();
		const result = evaluateIf(ast, env);
		runner.assert(result, {
			return: undefined,
			continue: { ast: createNumberNode(0), env },
		});
	},
);

runner.test(
	"evaluateIf(): evaluates null condition and returns elseExpr",
	() => {
		const ast = createListNode([
			createSymbolNode("if"),
			createNilNode(),
			createNumberNode(42),
			createNumberNode(0),
		]);
		const env = new Env();
		const result = evaluateIf(ast, env);
		runner.assert(result, {
			return: undefined,
			continue: { ast: createNumberNode(0), env },
		});
	},
);

runner.test(
	"evaluateIf(): evaluates true condition without elseExpr returns thenExpr",
	() => {
		const ast = createListNode([
			createSymbolNode("if"),
			createBooleanNode(true),
			createNumberNode(42),
		]);
		const env = new Env();
		const result = evaluateIf(ast, env);
		runner.assert(result, {
			return: undefined,
			continue: { ast: createNumberNode(42), env },
		});
	},
);

runner.test(
	"evaluateIf(): evaluates false condition without elseExpr returns nil",
	() => {
		const ast = createListNode([
			createSymbolNode("if"),
			createBooleanNode(false),
			createNumberNode(42),
		]);
		const env = new Env();
		const result = evaluateIf(ast, env);
		runner.assert(result, {
			continue: undefined,
			return: createNilNode(),
		});
	},
);

runner.test(
	"evaluateIf(): evaluates null condition without elseExpr returns nil",
	() => {
		const ast = createListNode([
			createSymbolNode("if"),
			createNilNode(),
			createNumberNode(42),
		]);
		const env = new Env();
		const result = evaluateIf(ast, env);
		runner.assert(result, {
			continue: undefined,
			return: createNilNode(),
		});
	},
);

runner.test("evaluateFn(): creates a simple anonymous function", () => {
	const ast = createListNode([
		createSymbolNode("fn*"),
		createListNode([createSymbolNode("a"), createSymbolNode("b")]),
		createListNode([
			createSymbolNode("+"),
			createSymbolNode("a"),
			createSymbolNode("b"),
		]),
	]);
	const env = new Env();
	env.set(
		createSymbolNode("+"),
		createFunctionNode((...args: AstNode[]) =>
			createNumberNode(
				(args[0] as NumberNode).value + (args[1] as NumberNode).value,
			),
		),
	);
	const result = evaluateFn(ast, env);
	const fn = result.return as FunctionNode;
	runner.assert(fn !== undefined, true);
	const fnResult = fn.value(createNumberNode(2), createNumberNode(3));
	runner.assert(fnResult, createNumberNode(5));
});

runner.test(
	"evaluateFn(): creates a function with empty args and returns body value",
	() => {
		const ast = createListNode([
			createSymbolNode("fn*"),
			createListNode([]),
			createNumberNode(10),
		]);
		const env = new Env();
		const result = evaluateFn(ast, env);
		const fn = result.return as FunctionNode;
		runner.assert(fn !== undefined, true);
		const fnResult = fn.value();
		runner.assert(fnResult, createNumberNode(10));
	},
);

runner.test("evaluateFn(): captures environment in closure", () => {
	const ast = createListNode([
		createSymbolNode("fn*"),
		createListNode([createSymbolNode("a")]),
		createListNode([
			createSymbolNode("+"),
			createSymbolNode("a"),
			createSymbolNode("b"),
		]),
	]);
	const env = initEnv();
	env.set(
		createSymbolNode("+"),
		createFunctionNode((...args: AstNode[]) =>
			createNumberNode(
				(args[0] as NumberNode).value + (args[1] as NumberNode).value,
			),
		),
	);
	env.set(createSymbolNode("b"), createNumberNode(5));

	const result = evaluateFn(ast, env);
	const fn = result.return as FunctionNode;
	runner.assert(fn !== undefined, true);
	const fnResult = fn.value(createNumberNode(2));
	runner.assert(fnResult, createNumberNode(7));
});

runner.test("evaluateApply(): applies built-in function correctly", () => {
	const ast = createListNode([
		createSymbolNode("+"),
		createNumberNode(1),
		createNumberNode(2),
	]);
	const env = new Env();
	env.set(createSymbolNode("+"), createFunctionNode(add));
	const result = evaluateApply(ast, env);
	runner.assert(result.return, createNumberNode(3));
});

runner.test("evaluateApply(): applies closure correctly", () => {
	const ast = createListNode([createSymbolNode("add2"), createNumberNode(5)]);
	const closureMeta: ClosureMetadata = {
		ast: createListNode([
			createSymbolNode("+"),
			createSymbolNode("a"),
			createNumberNode(2),
		]),
		env: new Env(),
		parameters: [createSymbolNode("a")],
	};
	closureMeta.env.set(createSymbolNode("+"), createFunctionNode(add));
	const add2 = createFunctionNode(() => createNilNode(), closureMeta);
	const env = new Env();
	env.set(createSymbolNode("add2"), add2);
	const result = evaluateApply(ast, env);

	runner.assert(result.continue?.ast !== undefined, true);
	runner.assert(
		result.continue?.ast,
		createListNode([
			createSymbolNode("+"),
			createSymbolNode("a"),
			createNumberNode(2),
		]),
	);
});

runner.test(
	"evaluateApply(): returns function itself if it is not applicable",
	() => {
		const ast = createListNode([createStringNode("non-fn")]);
		const env = new Env();
		const result = evaluateApply(ast, env);
		runner.assert(result.return, createStringNode("non-fn"));
	},
);

runner.test("evaluateApply(): throws error for non-list input", () => {
	const ast = createNumberNode(42);
	const env = new Env();

	let threw = false;
	try {
		evaluateApply(ast, env);
	} catch (e) {
		threw = true;
	}

	runner.assert(threw, true);
});

runner.test("initEnv(): initEnv initializes the core functions", () => {
	const env = initEnv();
	runner.assert(typeof env.get(createSymbolNode("add")).value, "function");
});

runner.test("initEnv(): initEnv initializes eval function", () => {
	const env = initEnv();
	runner.assert(typeof env.get(createSymbolNode("eval")).value, "function");
});

runner.test("initEnv(): initEnv runs repl with predefined functions", () => {
	const env = initEnv();
	const fn = env.get(createSymbolNode("not")) as FunctionNode;
	runner.assert(isFunctionNode(fn), true);
	runner.assert(fn.value(createNumberNode(1)), createBooleanNode(false));
});

runner.report();
