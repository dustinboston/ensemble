import * as printer from "../printer.ts";
import * as types from "../types.ts";

let passed = 0;
let failed = 0;
let skipped = 0;
let testCount = 0;

export function test(name: string, fn: () => void) {
	testCount++;
	
	// Capture console output during test execution
	const originalLog = console.log;
	const capturedOutput: string[] = [];
	console.log = (...args) => {
		const output = args.join(' ');
		// Only capture non-TAP output (doesn't start with 'ok', 'not ok', '#', or '1..')
		if (!output.match(/^(ok \d+|not ok \d+|#|1\.\.)/)) {
			capturedOutput.push(output);
		} else {
			// Pass through TAP output directly
			originalLog(output);
		}
	};
	
	try {
		fn();
		passed++;
		console.log = originalLog;
		console.log(`ok ${testCount} - ${name}`);
		// Output any captured non-TAP messages as comments
		capturedOutput.forEach(line => console.log(`# ${line}`));
	} catch (error) {
		failed++;
		console.log = originalLog;
		console.log(`not ok ${testCount} - ${name}`);
		// Output any captured non-TAP messages as comments
		capturedOutput.forEach(line => console.log(`# ${line}`));
		const errorLines = String(error).split('\n');
		errorLines.forEach(line => console.log(`# ${line}`));
	}
}

function assert(a: unknown, b: unknown) {
	if (a === b) return;
	
	// Use types.isEqualTo for AST node comparison
	if (types.isAstNode(a) && types.isAstNode(b)) {
		if (!types.isEqualTo(a, b).value) {
			const aStr = printer.printString(a, true);
			const bStr = printer.printString(b, true);
			throw new Error(`Expected ${aStr} to equal ${bStr}`);
		}
		return;
	}
	
	if (!isDeepEqual(a, b)) {
		const aStr = types.isAstNode(a) ? printer.printString(a, true) : JSON.stringify(a);
		const bStr = types.isAstNode(b) ? printer.printString(b, true) : JSON.stringify(b);
		throw new Error(`Expected ${aStr} to equal ${bStr}`);
	}
}

function skip(name: string, fn: () => void) {
	testCount++;
	skipped++;
	console.log(`ok ${testCount} - ${name} # SKIP`);
}

function report() {
	if (testCount === 0) {
		console.log('1..0');
	} else {
		console.log(`1..${testCount}`);
	}
	console.log(`# tests ${testCount}`);
	console.log(`# pass ${passed}`);
	console.log(`# fail ${failed}`);
	console.log(`# skip ${skipped}`);
}

export default {
	test,
	assert,
	skip,
	report,
};

// https://medium.com/syncfusion/5-different-ways-to-deep-compare-javascript-objects-6708a0da9f05
// biome-ignore lint/suspicious/noExplicitAny: any object can have keys.
export function isDeepEqual(object1: any, object2: any): boolean {
	const objKeys1 = Object.keys(object1);
	const objKeys2 = Object.keys(object2);

	if (objKeys1.length !== objKeys2.length) return false;

	for (const key of objKeys1) {
		const value1 = object1[key];
		const value2 = object2[key];

		const isObjects = isObject(value1) && isObject(value2);

		if (
			(isObjects && !isDeepEqual(value1, value2)) ||
			(!isObjects && value1 !== value2)
		) {
			return false;
		}
	}
	return true;
}

export function isObject(object: unknown): boolean {
	return object != null && typeof object === "object";
}
