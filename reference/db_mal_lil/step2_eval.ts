/**
 * @file Step 2 adds a repl environment with +, -, *, and / functions. Also
 * adds evalAst for processing symbols, lists, vecs, and hash-maps. And the
 * "apply" phase for executing functions.
 */
import * as printer from './printer.ts';
import * as reader from './reader.ts';
import * as types from './types.ts';

type Env = Map<string, types.AstNode>;

export function read(malCode: string): types.AstNode {
	return reader.readString(malCode);
}

export function evalAst(ast: types.AstNode, appEnv: Env): types.AstNode {
	const maybeSymbol = ast;
	if (
		maybeSymbol instanceof types.SymbolNode &&
		appEnv.has(maybeSymbol.value)
	) {
		return appEnv.get(maybeSymbol.value)!;
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

export function evaluate(ast: types.AstNode, appEnv: Env): types.AstNode {
	if (!(ast instanceof types.ListNode) || ast.value.length === 0) {
		return evalAst(ast, appEnv);
	}

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

const replEnv = new Map<string, types.AstNode>();
replEnv.set(
	'+',
	new types.FunctionNode((...args: types.AstNode[]): types.AstNode => {
		const a = args[0];
		types.assertNumberNode(a);

		const b = args[1];
		types.assertNumberNode(b);

		return new types.NumberNode(a.value + b.value);
	}),
);
replEnv.set(
	'-',
	new types.FunctionNode((...args: types.AstNode[]) => {
		const a = args[0];
		types.assertNumberNode(a);

		const b = args[1];
		types.assertNumberNode(b);
		return new types.NumberNode(a.value - b.value);
	}),
);
replEnv.set(
	'*',
	new types.FunctionNode((...args: types.AstNode[]) => {
		const a = args[0];
		types.assertNumberNode(a);

		const b = args[1];
		types.assertNumberNode(b);
		return new types.NumberNode(a.value * b.value);
	}),
);
replEnv.set(
	'/',
	new types.FunctionNode((...args: types.AstNode[]) => {
		const a = args[0];
		types.assertNumberNode(a);

		const b = args[1];
		types.assertNumberNode(b);
		return new types.NumberNode(a.value / b.value);
	}),
);

export function rep(input: string): string {
	return print(evaluate(read(input), replEnv));
}

function main(): void {
	for (;;) {
		const input = prompt('user>');
		if (input === null || input === undefined) {
			break;
		}

		if (input === '') {
			continue;
		}

		try {
			const result = rep(input);
			console.log(result);
		} catch (error: unknown) {
			console.error(error);
		}
	}
}

if (import.meta.main) {
	main();
}
