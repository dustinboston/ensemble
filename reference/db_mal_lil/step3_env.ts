/**
 * @file Step 3 adds the let, def, and "apply" (default) special forms for
 * working with environments.
 */
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
	replEnv.set(
		new types.SymbolNode('+'),
		new types.FunctionNode((...args: types.AstNode[]): types.AstNode => {
			const a = args[0];
			types.assertNumberNode(a);

			const b = args[1];
			types.assertNumberNode(b);

			return new types.NumberNode(a.value + b.value);
		}),
	);
	replEnv.set(
		new types.SymbolNode('-'),
		new types.FunctionNode((...args: types.AstNode[]) => {
			const a = args[0];
			types.assertNumberNode(a);

			const b = args[1];
			types.assertNumberNode(b);
			return new types.NumberNode(a.value - b.value);
		}),
	);
	replEnv.set(
		new types.SymbolNode('*'),
		new types.FunctionNode((...args: types.AstNode[]) => {
			const a = args[0];
			types.assertNumberNode(a);

			const b = args[1];
			types.assertNumberNode(b);
			return new types.NumberNode(a.value * b.value);
		}),
	);
	replEnv.set(
		new types.SymbolNode('/'),
		new types.FunctionNode((...args: types.AstNode[]) => {
			const a = args[0];
			types.assertNumberNode(a);

			const b = args[1];
			types.assertNumberNode(b);
			return new types.NumberNode(a.value / b.value);
		}),
	);

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
