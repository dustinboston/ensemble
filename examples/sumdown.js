import {dsl} from "../ensemble.js";
import {$} from "../core.js";

// Compute n(n+1)/2 with a non tail-recursive call. Where n is a non-negative number.
export const sumdown = dsl([$.global,
	Symbol.for("sumdown"),
	[$.function,
		[Symbol.for("n")],
		[$.if,
			[$.equals, Symbol.for("n"), 0],
			0,
			[$.add, Symbol.for("n"),	[Symbol.for("sumdown"), [$.subtract, Symbol.for("n"), 1]]]]]]);
