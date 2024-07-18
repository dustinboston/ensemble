/**
 * @file Step 8 adds macros! The core functions nth, first, and rest are added,
 * and "cond" is added via a defmacro! call.
 */
import * as core from './core.ts';
import * as env from './env.ts';
import * as printer from './printer.ts';
import * as reader from './reader.ts';
import * as types from './types.ts';

export function read(malCode: string): types.AstNode {
	return reader.readString(malCode);
}

export function quasiquote(ast: types.AstNode): types.AstNode {
	if (ast instanceof types.MapNode || ast instanceof types.SymbolNode) {
		return new types.ListNode([new types.SymbolNode('quote'), ast]);
	}

	if (!types.isSequentialNode(ast)) {
		return ast;
	}

	if (
		ast instanceof types.ListNode &&
		types.listStartsWithSymbol(ast, 'unquote')
	) {
		return ast.value[1];
	}

	let result = new types.ListNode([]);
	for (let i = ast.value.length - 1; i >= 0; i--) {
		const elt = ast.value[i];

		result =
			elt instanceof types.ListNode &&
			types.listStartsWithSymbol(elt, 'splice-unquote')
				? new types.ListNode([
						new types.SymbolNode('concat'),
						elt.value[1],
						result,
				  ])
				: new types.ListNode([
						new types.SymbolNode('cons'),
						quasiquote(elt),
						result,
				  ]);
	}

	if (ast instanceof types.VectorNode) {
		result = new types.ListNode([new types.SymbolNode('vec'), result]);
	}

	return result;
}

export function isMacroCall(ast: types.AstNode, appEnv: env.Env): boolean {
	if (
		!(ast instanceof types.ListNode) ||
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
	if (!(fn instanceof types.FunctionNode)) {
		return false;
	}

	return fn.isMacro;
}

export function macroExpand(
	ast: types.AstNode,
	appEnv: env.Env,
): types.AstNode {
	let resultAst = ast;
	while (isMacroCall(resultAst, appEnv)) {
		const list = resultAst as types.ListNode;
		const symbol = list.value[0] as types.SymbolNode;
		const fn = appEnv.get(symbol) as types.FunctionNode;
		resultAst = fn.value(...list.value.slice(1));
	}

	return resultAst;
}

export function evalAst(ast: types.AstNode, appEnv: env.Env): types.AstNode {
	const maybeSymbol = ast;
	if (maybeSymbol instanceof types.SymbolNode) {
		return appEnv.get(maybeSymbol);
	}

	const maybeVec = ast;
	if (maybeVec instanceof types.VectorNode) {
		const evaluated = maybeVec.value.map((v) => evaluate(v, appEnv));
		return new types.VectorNode(evaluated);
	}

	const maybeList = ast;
	if (maybeList instanceof types.ListNode) {
		const evaluated = maybeList.value.map((v) => evaluate(v, appEnv));
		return new types.ListNode(evaluated);
	}

	const maybeDict = ast;
	if (maybeDict instanceof types.MapNode) {
		const evaluated = new Map<string, types.AstNode>();
		for (const [key, value] of maybeDict.value.entries()) {
			evaluated.set(key, evaluate(value, appEnv));
		}

		return new types.MapNode(evaluated);
	}

	return ast;
}

export function evaluate(ast: types.AstNode, appEnv: env.Env): types.AstNode {
	for (;;) {
		if (!(ast instanceof types.ListNode) || ast.value.length === 0) {
			return evalAst(ast, appEnv);
		}

		ast = macroExpand(ast, appEnv);
		if (!(ast instanceof types.ListNode) || ast.value.length === 0) {
			return evalAst(ast, appEnv);
		}

		const list = ast;
		const symbol = list.value[0] as types.SymbolNode;
		let result: types.ContinueReturn;

		switch (symbol.value) {
			case 'def!': {
				result = handleDef(list, appEnv);
				break;
			}

			case 'let*': {
				result = handleLet(list, appEnv);
				break;
			}

			case 'quote': {
				result = handleQuote(list, appEnv);
				break;
			}

			case 'quasiquoteexpand': {
				result = handleQuasiQuoteExpand(list, appEnv);
				break;
			}

			case 'quasiquote': {
				result = handleQuasiQuote(ast, appEnv);
				break;
			}

			case 'defmacro!': {
				result = handleDefMacro(list, appEnv);
				break;
			}

			case 'macroexpand': {
				result = types.returnResult(macroExpand(list.value[1], appEnv));
				break;
			}

			case 'do': {
				result = handleDo(list, appEnv);
				break;
			}

			case 'if': {
				result = handleIf(ast, appEnv);
				break;
			}

			case 'fn*': {
				result = handleFn(list, appEnv);
				break;
			}

			default: {
				result = handleDefault(list, appEnv);
			}
		}

		if (result.return) {
			return result.return;
		}

		ast = result.continue.ast;
		appEnv = result.continue.env;
	}
}

export function handleDef(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertDef(ast);
	const variableName = ast.value[1];
	const variableValue = ast.value[2];
	const evaluatedValue = evaluate(variableValue, appEnv);
	return types.returnResult(appEnv.set(variableName, evaluatedValue));
}

export function handleLet(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertLet(ast);
	const bindings = ast.value[1];
	const bindingsCount = bindings.value.length;
	const letEnv = new env.Env(appEnv);
	for (let i = 0; i < bindingsCount; i += 2) {
		const varName = bindings.value[i] as types.SymbolNode;
		const varExpr = bindings.value[i + 1] as types.AstNode;
		const varValue = evaluate(varExpr, letEnv);
		letEnv.set(varName, varValue);
	}

	return types.continueResult(ast.value[2], letEnv);
}

export function handleQuote(
	ast: types.AstNode,
	_: env.Env,
): types.ContinueReturn {
	types.assertQuote(ast);
	return types.returnResult(ast.value[1]);
}

export function handleQuasiQuoteExpand(
	ast: types.AstNode,
	_env: env.Env,
): types.ContinueReturn {
	types.assertQuasiQuoteExpand(ast);
	return types.returnResult(quasiquote(ast.value[1]));
}

export function handleQuasiQuote(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertQuasiQuote(ast);
	const resultAst = quasiquote(ast.value[1]);
	return types.continueResult(resultAst, appEnv);
}

export function handleDefMacro(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertDefMacro(ast);
	const variableName = ast.value[1];
	const variableValue = ast.value[2];
	const evaluatedValue = evaluate(variableValue, appEnv);
	const copiedValue = types.copy(evaluatedValue);
	if (copiedValue instanceof types.FunctionNode) {
		copiedValue.isMacro = true;
	}

	return types.returnResult(appEnv.set(variableName, copiedValue));
}

export function handleDo(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertDo(ast);

	let lastResult: types.AstNode = new types.NilNode();
	for (let i = 1; i < ast.value.length; i++) {
		lastResult = evaluate(ast.value[i], appEnv);
	}

	return {continue: {ast: lastResult, env: appEnv}, return: undefined};
}

export function handleIf(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertIf(ast);
	const condition = ast.value[1];
	const result = evaluate(condition, appEnv);
	if (result.value !== false && result.value !== null) {
		const thenExpr = ast.value[2];
		return types.continueResult(thenExpr, appEnv);
	}

	if (ast.value[3] !== undefined) {
		const elseExpr = ast.value[3];
		return types.continueResult(elseExpr, appEnv);
	}

	return types.returnResult(new types.NilNode());
}

export function handleFn(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	types.assertFn(ast);
	const parameters = ast.value[1].value;
	const bodyExpr = ast.value[2];
	const outerEnv = appEnv;
	const closureMeta: types.ClosureMetadata = {
		ast: bodyExpr,
		env: outerEnv,
		parameters,
	};
	const fn = new types.FunctionNode(
		(...args: types.AstNode[]): types.AstNode => {
			const fnEnv = new env.Env(outerEnv, parameters, args);
			return evaluate(bodyExpr, fnEnv);
		},
		closureMeta,
	);
	return types.returnResult(fn);
}

export function handleDefault(
	ast: types.AstNode,
	appEnv: env.Env,
): types.ContinueReturn {
	const evaluatedList = evalAst(ast, appEnv);
	types.assertListNode(evaluatedList);

	const fn = evaluatedList.value[0];
	if (fn instanceof types.FunctionNode) {
		const args = evaluatedList.value.slice(1);
		if (fn.closureMeta) {
			const ast = fn.closureMeta.ast;
			const fnEnv = new env.Env(
				fn.closureMeta.env,
				fn.closureMeta.parameters,
				args,
			);
			return {continue: {ast, env: fnEnv}, return: undefined};
		}

		const called = fn.value(...args);
		return {return: called, continue: undefined};
	}

	return {return: fn, continue: undefined};
}

export function print(value: types.AstNode): string {
	return printer.printString(value, true);
}

export function rep(input: string, appEnv: env.Env): string {
	return print(evaluate(read(input), appEnv));
}

export function initEnv(): env.Env {
	const replEnv = new env.Env(undefined);

	for (const [coreSymbol, coreFunc] of core.ns.entries()) {
		replEnv.set(coreSymbol, coreFunc);
	}

	replEnv.set(
		new types.SymbolNode('eval'),
		new types.FunctionNode((...args: types.AstNode[]): types.AstNode => {
			types.assertArgumentCount(args.length, 1);
			return evaluate(args[0], replEnv);
		}),
	);

	rep('(def! not (fn* (a) (if a false true)))', replEnv);
	rep(
		`(def! load-file
		(fn* (f)
			(eval (read-string (str "(do " (slurp f) "\nnil)")))))`,
		replEnv,
	);
	rep(
		`(defmacro! cond (fn* (& xs)
		(if (> (count xs) 0)
			(list 'if (first xs)
				(if (> (count xs) 1)
					(nth xs 1)
					(throw "odd number of forms to cond"))
				(cons 'cond (rest (rest xs)))))))`,
		replEnv,
	);

	return replEnv;
}

export function main(...args: string[]): void {
	const replEnv = initEnv();

	const userScriptPath: string | undefined = args[0];
	const hostEnvArgs: types.StringNode[] = args
		.slice(1)
		.map((arg) => new types.StringNode(arg));

	replEnv.set(
		new types.SymbolNode('*ARGV*'),
		new types.ListNode(hostEnvArgs),
	);

	if (userScriptPath) {
		rep(`(load-file "${userScriptPath}")`, replEnv);
		return;
	}

	for (;;) {
		const input = prompt('user>');
		if (input === null || input === undefined) {
			break;
		}

		if (input === '') {
			continue;
		}

		try {
			const result = rep(input, replEnv);
			console.log(result);
		} catch (error: unknown) {
			console.error(error);
		}
	}
}

if (import.meta.main) {
	main(...Deno.args);
}
