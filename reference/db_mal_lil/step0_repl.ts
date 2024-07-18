/**
 * @file Step 0 scaffolds out a basic READ-EVAL-PRINT-LOOP.
 */
export function read(arg: string): string {
	return arg;
}

export function evaluate(arg: string): string {
	return arg;
}

export function print(arg: string): string {
	return arg;
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
