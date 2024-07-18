import {Env} from "./env.js";
import * as core from "./core.js";

const $ = core.$;

/**
 * Type definitions
 * @typedef {Ast[]} AstArray
 * @typedef {{[key: string]: Ast}} AstObject
 * @typedef {(...parameters: Ast[]) => Ast} AstFunction
 * @typedef {string|number|symbol|AstFunction|AstObject|AstArray} Ast
 */

/**
 * Define the application-level environment.
 */
const appEnv = new Env(core.ns, null);

// MARK: MAIN
function _quote() {}
function _quasiquote() {}
function _unquote() {}
function _spliceUnquote() {}

/**
 * @param {*} ast
 * @param {Env} env
 * @returns {*}
 * @throws {Error}
 */
function evalAst(ast, env) {
	if (typeof ast === "symbol") {
		return env.get(ast);
	}

	if (Array.isArray(ast)) {
		return ast.map(x => evaluate(x, env));
	}

	if (core.isObject(ast)) {
		return Object.fromEntries(
			Object.entries(ast).map(([k, v]) => [k, evaluate(v, env)]),
		);
	}

	return ast;
}

/**
 * NOTE: Because JSLDSL uses arrays for both lists and vectors the first
 * value of the array will not always be a symbol. In that case, return
 * the evaluated array.
 *
 * @param {AstArray} ast
 * @param {Env} env
 * @returns {*}
 */
function evaluate(ast, env) {
	// If (!ast) {
	// 	return null;
	// }

	if (!Array.isArray(ast) || core.isEmpty(ast)) {
		return evalAst(ast, env);
	}

	// If (!ast) {
	// 	return null;
	// }

	// if (core.isEmpty(ast)) {
	// 	return ast;
	// }

	const [a0] = ast;

	// If (typeof a0 !== 'symbol') {
	// 	return evalAst(ast, env);
	// }

	if (a0 === $.global) {
		return createGlobal(ast, env);
	}

	// For the time being const will be mutable
	if (a0 === $.let || a0 === $.const) {
		return createLocal(ast, env);
	}

	if (a0 === $.do) {
		return doSequence(ast, env);
	}

	if (a0 === $.if) {
		return ifElse(ast, env);
	}

	if (a0 === $.function) {
		return createFunction(ast, env);
	}

	return applyFunction(ast, env);
}

/**
 *
 * @param {*} ast - AstArray
 * @param {Env} env
 */
function applyFunction(ast, env) {
	if (!ast || !env || !Array.isArray(ast)) {
		throw new Error("missing argument");
	}

	const element = evalAst(ast, env);
	if (!element) {
		return null;
	}

	const [f, ...parameters] = element;
	if (typeof f !== "function") {
		return element;
	}

	return f(...parameters);
}

/**
 *
 * @param {*} ast - [symbol, bindings, bodyExpr]
 * @param {Env} env
 */
function createFunction(ast, env) {
	if (!ast || !env || core.length(ast) < 3) {
		throw new Error("missing argument");
	}

	function userFunction(/** @type {any[]} */ ...exprs) {
		return evaluate(ast.at(2), new Env([], env, ast.at(1), exprs));
	}

	return userFunction;
}

/**
 *
 * @param {*} ast - AstArray
 * @param {Env} env
 */
function ifElse(ast, env) {
	if (!ast || !env || (Array.isArray(ast) && ast.length < 3)) {
		throw new Error("missing argument");
	}

	const cond = evaluate(ast.at(1), env);
	// Use a falsy check (rather than checking for false or null)
	if (!cond) {
		if (ast.length > 3) {
			return evaluate(ast.at(3), env);
		}

		return null;
	}

	// True
	return evaluate(ast.at(2), env);
}

/**
 *
 * @param {AstArray} ast
 * @param {Env} env
 */
function doSequence(ast, env) {
	if (!ast || !env || !Array.isArray(ast)) {
		throw new Error("missing argument");
	}

	const element = evalAst(ast.slice(1), env);
	return element.at(-1);
}

/**
 *
 * @param {*} ast - AstArray
 * @param {Env} env
 */
function createLocal(ast, env) {
	if (!ast || !env || (Array.isArray(ast) && ast.length < 3)) {
		throw new Error("missing argument");
	}

	const a1 = ast.at(1);
	if (!Array.isArray(a1)) {
		throw new TypeError("bindings must be an array");
	}

	if (a1.length % 2 !== 0) {
		throw new TypeError("use an even number of bindings");
	}

	const letEnv = new Env(undefined, env);
	for (let i = 0; i < a1.length; i += 2) {
		const variableName = a1[i];
		const variableValue = evaluate(a1[i + 1], letEnv);
		letEnv.set(variableName, variableValue);
	}

	return evaluate(ast.at(2), letEnv);
}

/**
 *
 * @param {*} ast - AstArray
 * @param {Env} env
 */
function createGlobal(ast, env) {
	if (!ast || !env || (Array.isArray(ast) && ast.length < 3)) {
		throw new Error("missing argument");
	}

	return env.set(ast.at(1), evaluate(ast.at(2), env));
}

/**
 * The dsl function implements the READ, EVAL, PRINT cycle.
 * But there isn't a need to READ because it's already done.
 * @param {*} ast
 * @returns {string}
 * @throws {Error}
 */
export function dsl(ast) {
	const evaluated = evaluate(ast, appEnv);
	return evaluated;
}
