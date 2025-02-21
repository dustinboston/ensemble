let passed = 0;
let failed = 0;
let skipped = 0;

export function test(name: string, fn: () => void) {
	try {
		fn();
		passed++;
		console.log(`PASS ${name}`);
	} catch (error) {
		failed++;
		console.log(`FAIL ${name}`);
		console.log(error);
	}
}

function assert(a: unknown, b: unknown) {
	if (a === b) return;
	if (!isDeepEqual(a, b)) throw new Error(`Expected ${a} to equal ${b}`);
}

function skip(name: string, fn: () => void) {
	skipped++;
	console.log(`SKIP ${name}`);
}

function report() {
	console.log(JSON.stringify({ passed, failed, skipped }));
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
