/**
 * @file Step 4 Adds the special forms if, fn, and do. It also adds the core
 * namespace (core.ts) and implements =, pr-str, str, prn, println, <, <=, >,
 * >=, +, -, *, /, list, list?, empty, and count functions. Finally, it adds
 * not to the environment.
 */
import * as core from './core.ts';
import * as env from './env.ts';
import * as printer from './printer.ts';
import * as reader from './reader.ts';
import * as types from './types.ts';

export function read(malCode: string): types.AstNode {
	return reader.readString(malCode);
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
	if (!(ast instanceof types.ListNode) || ast.value.length === 0) {
		return evalAst(ast, appEnv);
	}

	const list = ast;
	const symbol = list.value[0] as types.SymbolNode;
	let result: types.AstNode;

	switch (symbol.value) {
		case 'def!': {
			result = handleDef(list, appEnv);
			break;
		}

		case 'let*': {
			result = handleLet(list, appEnv);
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

	return result;
}

export function handleDef(ast: types.AstNode, appEnv: env.Env): types.AstNode {
	types.assertDef(ast);
	const variableName = ast.value[1];
	const variableValue = ast.value[2];
	const evaluatedValue = evaluate(variableValue, appEnv);
	return appEnv.set(variableName, evaluatedValue);
}

export function handleLet(ast: types.AstNode, appEnv: env.Env): types.AstNode {
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

	return evaluate(ast.value[2], letEnv);
}

export function handleDo(ast: types.AstNode, appEnv: env.Env): types.AstNode {
	types.assertDo(ast);

	let lastResult: types.AstNode = new types.NilNode();
	for (let i = 1; i < ast.value.length; i++) {
		lastResult = evaluate(ast.value[i], appEnv);
	}

	return lastResult;
}

export function handleIf(ast: types.AstNode, appEnv: env.Env): types.AstNode {
	types.assertIf(ast);
	const condition = ast.value[1];
	const result = evaluate(condition, appEnv);
	if (result.value !== false && result.value !== null) {
		const thenExpr = ast.value[2];
		return evaluate(thenExpr, appEnv);
	}

	if (ast.value[3] !== undefined) {
		const elseExpr = ast.value[3];
		return evaluate(elseExpr, appEnv);
	}

	return new types.NilNode();
}

export function handleFn(ast: types.AstNode, appEnv: env.Env): types.AstNode {
	types.assertFn(ast);
	const parameters = ast.value[1].value;
	const bodyExpr = ast.value[2];
	const outerEnv = appEnv;
	return new types.FunctionNode((...args: types.AstNode[]): types.AstNode => {
		const fnEnv = new env.Env(outerEnv, parameters, args);
		return evaluate(bodyExpr, fnEnv);
	});
}

export function handleDefault(
	ast: types.AstNode,
	appEnv: env.Env,
): types.AstNode {
	const evaluatedList = evalAst(ast, appEnv);
	types.assertListNode(evaluatedList);

	const fn = evaluatedList.value[0];
	if (fn instanceof types.FunctionNode) {
		const args = evaluatedList.value.slice(1);

		return fn.value(...args);
	}

	return fn;
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

	rep('(def! not (fn* (a) (if a false true)))', replEnv);
	return replEnv;
}

export function main(): void {
	const replEnv = initEnv();

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
	main();
}
