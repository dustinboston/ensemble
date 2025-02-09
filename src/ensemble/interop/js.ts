import * as types from "../types.ts";
import { arrayFunctions } from "./js/array.ts";
import { booleanFunctions } from "./js/boolean.ts";
import { builtInFunctions } from "./js/builtin.ts";
import { dateFunctions } from "./js/date.ts";
import { errorFunctions } from "./js/error.ts";
import { functionFunctions } from "./js/function.ts";
import { mapFunctions } from "./js/map.ts";
import { mathFunctions } from "./js/math.ts";
import { numberFunctions } from "./js/number.ts";
import { operators } from "./js/operator.ts";
import { regExpFunctions } from "./js/regexp.ts";
import { stringFunctions } from "./js/string.ts";
import { symbolFunctions } from "./js/symbol.ts";

const nsValues: Array<[string, types.Closure]> = [
	...arrayFunctions,
	...booleanFunctions,
	...builtInFunctions,
	...operators,
	...dateFunctions,
	...errorFunctions,
	...functionFunctions,
	...mapFunctions,
	...mathFunctions,
	...numberFunctions,
	...regExpFunctions,
	...stringFunctions,
	...symbolFunctions,
];

export const ns = new Map<types.MapKeyNode, types.FunctionNode>();

for (const [sym, fn] of nsValues) {
	ns.set(types.createSymbolNode(sym), types.createFunctionNode(fn));

	// Add the shorthand :: as an alias to "prototype"
	if (sym.includes(".prototype.")) {
		const withPrototypeAlias = sym.replace(".prototype.", "::");
		ns.set(
			types.createSymbolNode(withPrototypeAlias),
			types.createFunctionNode(fn),
		);
	} else if (sym.includes(".prototype[")) {
		const withPrototypeAlias = sym.replace(".prototype[", "::[");
		ns.set(
			types.createSymbolNode(withPrototypeAlias),
			types.createFunctionNode(fn),
		);
	}
}
