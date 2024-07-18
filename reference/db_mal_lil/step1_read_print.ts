/**
 * @file Step 1 adds the read and print portion of the READ-EVAL-PRINT-LOOP.
 * The read file is created to parse a string code and convert it into an
 * Ast. The print file does the opposite - converts an Ast into a string.
 */
import * as printer from './printer.ts';
import * as reader from './reader.ts';
import type * as types from './types.ts';

function read(malCode: string): types.AstNode {
	const ast = reader.readString(malCode);
	return ast;
}

export function evaluate(ast: types.AstNode): types.AstNode {
	return ast;
}

export function print(value: types.AstNode): string {
	return printer.printString(value, true);
}

export function rep(input: string): string {
	return print(evaluate(read(input)));
}

export function main(): void {
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
